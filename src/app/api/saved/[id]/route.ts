import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const resolvedParams = await params;
    
    await prisma.savedItem.deleteMany({
      where: { id: resolvedParams.id, userId: user.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete saved item error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
