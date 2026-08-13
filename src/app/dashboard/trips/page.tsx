import { ensureUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TripsClient } from "./TripsClient";

export default async function TripsPage() {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  const trips = await prisma.trip.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      destination: true,
      status: true,
      budget: true,
      startDate: true,
      createdAt: true,
      plan: true,
    },
  });

  return <TripsClient initialTrips={trips} />;
}
