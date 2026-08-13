import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const saveTripSchema = z.object({
  destination: z.string(),
  durationDays: z.number().int().min(1).max(30),
  budget: z.number().int().positive(),
  name: z.string().optional(),
  summary: z.string().optional(),
  weather: z.string().optional(),
  bestMonth: z.string().optional(),
  plan: z.unknown()
});

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const input = saveTripSchema.parse(body);

  const trip = await prisma.trip.create({
    data: {
      ownerId: user.id,
      name: input.name ?? `${input.durationDays}-day ${input.destination} trip`,
      destination: input.destination,
      startDate: null,
      endDate: null,
      status: "PLANNING",
      budget: input.budget,
      plan: {
        summary: input.summary ?? "",
        weather: input.weather ?? "",
        bestMonth: input.bestMonth ?? "",
        plan: JSON.parse(JSON.stringify(input.plan ?? null))
      }
    }
  });

  return NextResponse.json({ trip });
}

