import { createGoogleGenerativeAI, google } from "@ai-sdk/google";

// for any custom google model
export const google_provider = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENAI_KEY,
});

// the default model I will use
// Alternative: Use gemini-pro, but it has more restrictions
export const google_model = google("gemini-2.5-flash");
