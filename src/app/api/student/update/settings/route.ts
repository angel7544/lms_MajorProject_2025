import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: Response) {
  const { name, bio, roleChange, signature, profilePic } = await req.json();
  if (!name || !bio) {
    return NextResponse.json(
      { message: "Name and Bio are required" },
      { status: 400 }
    );
  }
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  let user;
  if (!roleChange) {
    user = await prisma.user.update({
      where: {
        authId: userId,
      },
      data: {
        name,
        bio,
        profilePic,
      },
    });
  } else {
    if (!name || !bio || !signature) {
      return NextResponse.json(
        { message: "Name and Bio are required" },
        { status: 400 }
      );
    }
    user = await prisma.user.update({
      where: {
        authId: userId,
      },
      data: {
        name,
        bio,
        role: "TEACHER",
        signature,
        profilePic,
      },
    });
  }
  return NextResponse.json(user, { status: 200 });
}
