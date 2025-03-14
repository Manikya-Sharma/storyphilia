import { createGoogleGenerativeAI, google } from "@ai-sdk/google";

// for any custom google model
export const google_provider = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENAI_KEY,
});

// the default model I will use
// Alternative: Use gemini-pro, but it has more restrictions
export const google_model = google("gemini-2.0-flash-001", {
  safetySettings: [
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
  ],
});
