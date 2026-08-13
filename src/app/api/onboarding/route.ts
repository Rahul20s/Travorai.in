import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const onboardingSchema = z.object({
  travelStyles: z.array(z.string()).min(1),
  defaultBudget: z.number().int().positive(),
  homeCity: z.string().optional()
});

export async function POST(request: Request) {
  const user = await ensureUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const input = onboardingSchema.parse(body);

  const profile = await prisma.travelProfile.upsert({
    where: { userId: user.id },
    update: {
      travelStyles: input.travelStyles,
      defaultBudget: input.defaultBudget,
      homeCity: input.homeCity
    },
    create: {
      userId: user.id,
      travelStyles: input.travelStyles,
      defaultBudget: input.defaultBudget,
      homeCity: input.homeCity,
      languages: ["English", "Hindi"],
      companions: input.travelStyles,
      foodPreferences: [],
      preferredAirlines: []
    }
  });

  return NextResponse.json({ profile });
}
