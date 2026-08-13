import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const resolvedParams = await params;
    const tripId = resolvedParams.id;

    // Verify ownership
    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        ownerId: user.id
      }
    });

    if (!trip) {
      return new NextResponse("Not Found or Unauthorized", { status: 404 });
    }

    const selections = await prisma.tripSelection.findMany({
      where: { tripId }
    });

    const flight = selections.find(s => s.type === "FLIGHT");
    const hotel = selections.find(s => s.type === "HOTEL");
    const activities = selections.filter(s => s.type === "ACTIVITY");
    const transport = selections.find(s => s.type === "TRANSPORT");

    return NextResponse.json({
      success: true,
      selections: {
        flight: flight ? flight.parsedData : null,
        hotel: hotel ? hotel.parsedData : null,
        activities: activities.map(a => a.parsedData),
        transport: transport ? transport.parsedData : null
      }
    });
  } catch (error) {
    console.error("Failed to fetch selections:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
