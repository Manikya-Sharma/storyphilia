import { google_model } from "@/providers/google-genai";
import type { GenAiRequest } from "@/types/genai-types";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as GenAiRequest;

  try {
    const { text } = await generateText({
      model: google_model,
      prompt: String(body.message),
    });

    return NextResponse.json({ message: text });
  } catch (e) {
    console.log("Error: ", e);
    return NextResponse.json("Not ok", { status: 500 });
  }
}
