import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();

    const {
      homeCity,
      defaultCurrency,
      travelStyles,
      foodPreferences,
      companions
    } = body;

    const profile = await prisma.travelProfile.upsert({
      where: { userId: user.id },
      update: {
        homeCity,
        defaultCurrency,
        travelStyles,
        foodPreferences,
        companions
      },
      create: {
        userId: user.id,
        homeCity,
        defaultCurrency: defaultCurrency || "INR",
        travelStyles: travelStyles || [],
        foodPreferences: foodPreferences || [],
        companions: companions || []
      }
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Update profile error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
