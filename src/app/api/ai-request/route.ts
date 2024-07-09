import { google_model } from "@/providers/google-genai";
import type { GenAiRequest } from "@/types/genai-types";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as GenAiRequest;

  try {
    const { text } = await generateText({
      model: google_model,
      prompt: `
      I will be giving you a small description about a story on genre ${body.genre}

      You are required to tell me a creative story according to this description.

      The description is as follows:-

      "
      ${body.message}
      "

      `,
    });

    return NextResponse.json({ message: text });
  } catch (e) {
    console.log("Error: ", e);
    return NextResponse.json("Not ok", { status: 500 });
  }
}
