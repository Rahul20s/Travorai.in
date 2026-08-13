import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { TripSelectionType } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string, type: string }> }
) {
  try {
    const user = await requireUser();
    const resolvedParams = await params;
    const tripId = resolvedParams.id;
    const typeParam = resolvedParams.type.toUpperCase() as TripSelectionType;

    if (!["FLIGHT", "HOTEL", "ACTIVITY", "TRANSPORT"].includes(typeParam)) {
      return new NextResponse("Invalid selection type", { status: 400 });
    }

    // Verify ownership
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, ownerId: user.id }
    });
    if (!trip) return new NextResponse("Not Found or Unauthorized", { status: 404 });

    const body = await request.json();
    const { provider, providerOptionId, price, currency, parsedData } = body;

    if (!provider || !providerOptionId || price === undefined || !currency || !parsedData) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (typeParam === "ACTIVITY") {
      // Activity allows multiple, so we just create if not exists
      const existing = await prisma.tripSelection.findFirst({
        where: { tripId, userId: user.id, type: typeParam, providerOptionId }
      });
      if (existing) {
        return NextResponse.json({ success: true, selection: existing });
      }
      const selection = await prisma.tripSelection.create({
        data: {
          tripId,
          userId: user.id,
          type: typeParam,
          provider,
          providerOptionId,
          price,
          currency,
          parsedData
        }
      });
      return NextResponse.json({ success: true, selection });
    } else {
      // Singleton types: FLIGHT, HOTEL, TRANSPORT
      // Delete existing
      await prisma.tripSelection.deleteMany({
        where: { tripId, userId: user.id, type: typeParam }
      });

      // Create new
      const selection = await prisma.tripSelection.create({
        data: {
          tripId,
          userId: user.id,
          type: typeParam,
          provider,
          providerOptionId,
          price,
          currency,
          parsedData
        }
      });
      return NextResponse.json({ success: true, selection });
    }
  } catch (error) {
    console.error("Save selection error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string, type: string }> }
) {
  try {
    const user = await requireUser();
    const resolvedParams = await params;
    const tripId = resolvedParams.id;
    const typeParam = resolvedParams.type.toUpperCase() as TripSelectionType;

    if (!["FLIGHT", "HOTEL", "ACTIVITY", "TRANSPORT"].includes(typeParam)) {
      return new NextResponse("Invalid selection type", { status: 400 });
    }

    // Verify ownership
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, ownerId: user.id }
    });
    if (!trip) return new NextResponse("Not Found or Unauthorized", { status: 404 });

    if (typeParam === "ACTIVITY") {
      // For activity we need providerOptionId to delete a specific one
      const { searchParams } = new URL(request.url);
      const providerOptionId = searchParams.get("providerOptionId");
      if (!providerOptionId) {
        return new NextResponse("Missing providerOptionId for activity", { status: 400 });
      }
      await prisma.tripSelection.deleteMany({
        where: { tripId, userId: user.id, type: typeParam, providerOptionId }
      });
    } else {
      await prisma.tripSelection.deleteMany({
        where: { tripId, userId: user.id, type: typeParam }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete selection error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
