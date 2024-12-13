import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getStory = z
  .object({
    userId: z.string().min(1),
  })
  .strict();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = getStory.parse(body);

  const user = await db.user.findFirst({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid user" }, { status: 401 });
  }

  const stories = await db.story.findMany({
    where: {
      userId: data.userId,
    },
  });

  return NextResponse.json(stories);
}
