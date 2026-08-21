import { NextResponse } from "next/server";
import { z } from "zod";
import { buildTrip, refineTrip } from "@/features/trips/engine/trip-engine";
import { ensureUser } from "@/lib/auth";
import type { TripPlan } from "@/types/trip";

const tripRequestSchema = z.object({
  prompt: z.string().min(5),
  budget: z.number().positive().optional(),
  travelers: z.number().int().positive().optional(),
  origin: z.string().optional(),
  startDate: z.string().optional(),
  mood: z.enum(["relax", "adventure", "romantic", "family", "backpacking", "luxury"]).optional(),
  travelStyles: z.array(z.string()).optional()
});

const refineRequestSchema = z.object({
  instruction: z.string().min(2),
  currentTrip: z.unknown().optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const user = await ensureUser();

  // Refine mode: adjust an existing trip conversationally
  if (body.instruction) {
    const input = refineRequestSchema.parse(body);
    if (!input.currentTrip) {
      return NextResponse.json({ error: "currentTrip is required for refinement" }, { status: 400 });
    }
    const currentTrip = input.currentTrip as TripPlan;
    const result = await refineTrip({
      currentTrip,
      instruction: input.instruction,
      userId: user?.id
    });
    return NextResponse.json(result);
  }

  // New trip mode
  const input = tripRequestSchema.parse(body);
  const result = await buildTrip({
    ...input,
    userId: user?.id,
    travelStyles: input.travelStyles ?? user?.travelProfile?.travelStyles
  });

  return NextResponse.json(result);
}
