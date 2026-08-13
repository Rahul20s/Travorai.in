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

    const originalTrip = await prisma.trip.findFirst({
      where: { id: tripId, ownerId: user.id },
      include: {
        itineraryItems: true,
        selections: true
      }
    });

    if (!originalTrip) {
      return new NextResponse("Not Found or Unauthorized", { status: 404 });
    }

    // Create duplicated trip
    const newTrip = await prisma.trip.create({
      data: {
        ownerId: user.id,
        name: `${originalTrip.name} (Copy)`,
        destination: originalTrip.destination,
        coverImage: originalTrip.coverImage,
        startDate: originalTrip.startDate,
        endDate: originalTrip.endDate,
        status: "PLANNING",
        plan: originalTrip.plan || undefined,
        budget: originalTrip.budget,
        itineraryItems: {
          create: originalTrip.itineraryItems.map(item => ({
            type: item.type,
            dayIndex: item.dayIndex,
            orderIndex: item.orderIndex,
            title: item.title,
            details: item.details || undefined,
            startTime: item.startTime,
            endTime: item.endTime,
            latitude: item.latitude,
            longitude: item.longitude,
            source: item.source
          }))
        },
        selections: {
          create: originalTrip.selections.map(sel => ({
            user: { connect: { id: user.id } },
            type: sel.type,
            provider: sel.provider,
            providerOptionId: sel.providerOptionId,
            price: sel.price,
            currency: sel.currency,
            parsedData: sel.parsedData ?? {}
          }))
        }
      }
    });

    return NextResponse.json({ success: true, trip: newTrip });
  } catch (error) {
    console.error("Duplicate trip error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
