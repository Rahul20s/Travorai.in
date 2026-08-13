import { ensureUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SavedClient } from "./SavedClient";

export default async function SavedPage() {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  const savedItems = await prisma.savedItem.findMany({
    where: { userId: user.id },
    orderBy: { savedAt: "desc" },
    select: {
      id: true,
      title: true,
      type: true,
      location: true,
      description: true,
      savedAt: true,
    }
  });

  return <SavedClient initialItems={savedItems} />;
}
