import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getAuthUserId() {
  const { userId } = await auth();
  return userId;
}

export async function ensureUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const user = await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      email,
      name: clerkUser.fullName ?? clerkUser.firstName ?? null
    },
    create: {
      clerkId: clerkUser.id,
      email,
      name: clerkUser.fullName ?? clerkUser.firstName ?? null
    },
    include: {
      trips: true,
      collaborations: true,
      chatMessages: true,
      expensesPaid: true,
      inspirationPosts: true,
      savedItems: true,
      travelProfile: true
    }
  });

  return user;
}

export async function requireUser() {
  const user = await ensureUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}






