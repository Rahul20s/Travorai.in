import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireUser();

  const trips = await prisma.trip.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      destination: true,
      budget: true,
      status: true,
      createdAt: true,
      plan: true
    }
  });

  return NextResponse.json({ trips });
}

