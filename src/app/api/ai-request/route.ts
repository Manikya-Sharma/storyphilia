import { google_model } from "@/providers/google-genai";
import type { GenAiRequest } from "@/types/genai-types";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as GenAiRequest;

  try {
    const response = streamText({
      model: google_model,
      prompt: body.customInvocation
        ? `
      You have to give me a small story on genre ${body.genre}.

      Max words: ${body.max_words}

      Creativity level: ${5 + Number(body.creativity)} out of 10

      Make the story text readable by splitting story in paragraphs but only single major title of story

      You are required to tell me a creative story according to this description.

      `
        : `
      I will be giving you a small description about a story on genre ${
        body.genre
      }.

      Max words: ${body.max_words}

      Creativity level: ${5 + Number(body.creativity)} out of 10

      Make the story text readable by splitting story in paragraphs but only single major title of story

      You are required to tell me a creative story according to this description.

      The description is as follows:-

      "
      ${body.message}
      "

      `,
    });

    return response.toTextStreamResponse({
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.log("Error: ", e);
    return NextResponse.json("Not ok", { status: 500 });
  }
}
