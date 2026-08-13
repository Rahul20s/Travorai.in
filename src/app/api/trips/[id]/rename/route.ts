import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const resolvedParams = await params;
    const tripId = resolvedParams.id;
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return new NextResponse("Invalid name", { status: 400 });
    }

    const trip = await prisma.trip.findFirst({
      where: { id: tripId, ownerId: user.id }
    });

    if (!trip) {
      return new NextResponse("Not Found or Unauthorized", { status: 404 });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: { name }
    });

    return NextResponse.json({ success: true, trip: updatedTrip });
  } catch (error) {
    console.error("Rename trip error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
