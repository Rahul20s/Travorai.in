import { ensureUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfileClient } from "./ProfileClient";

export default async function ProfilePage() {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { travelProfile: true }
  });

  if (!fullUser) redirect("/sign-in");

  return <ProfileClient initialData={fullUser} />;
}
