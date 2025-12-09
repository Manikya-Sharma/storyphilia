import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ message: "Invalid request" }, { status: 401 });
  }

  const stories = await db.story.findMany({
    where: { userId },
    select: {
      id: true,
    },
  });

  return NextResponse.json(stories);
}
