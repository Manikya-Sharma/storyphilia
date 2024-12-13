import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const saveToLibrary = z
  .object({
    userId: z.string().min(1),
    content: z.string().min(1),
    genre: z.string().min(1),
  })
  .strict();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = saveToLibrary.parse(body);

  const user = await db.user.findFirst({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid user" }, { status: 401 });
  }

  const existing = await db.story.findFirst({
    where: {
      userId: data.userId,
      content: data.content,
      genre: data.genre,
    },
  });

  if (existing !== null) {
    return NextResponse.json(
      { message: "The story already exists" },
      { status: 400 }
    );
  }

  await db.story.create({
    data: {
      userId: data.userId,
      content: data.content,
      genre: data.genre,
    },
  });

  return NextResponse.json({ message: "ok" });
}

const deleteFromLibrary = z
  .object({
    userId: z.string().min(1),
    storyId: z.string().min(1),
  })
  .strict();

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const data = deleteFromLibrary.parse(body);

  const user = await db.user.findFirst({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid user" }, { status: 401 });
  }

  await db.story.delete({
    where: {
      id: data.storyId,
      userId: data.userId,
    },
  });

  return NextResponse.json({ message: "OK" });
}
