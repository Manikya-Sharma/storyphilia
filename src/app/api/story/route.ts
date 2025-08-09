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

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Invalid request" }, { status: 401 });
  }

  const story = await db.story.findFirst({
    where: { id },
  });

  return NextResponse.json(story);
}

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
      { status: 400 },
    );
  }

  const result = await db.story.create({
    data: {
      userId: data.userId,
      content: data.content,
      genre: data.genre,
    },
  });

  return NextResponse.json({ id: result.id });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const userId = req.nextUrl.searchParams.get("userId");

  if (!id || !userId) {
    return NextResponse.json({ message: "Invalid request" }, { status: 401 });
  }

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid user" }, { status: 401 });
  }

  await db.story.delete({
    where: {
      id,
      userId,
    },
  });

  return NextResponse.json({ message: "OK" });
}
