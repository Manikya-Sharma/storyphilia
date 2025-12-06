import { auth } from "@/auth"; // Referring to the auth.ts we just created
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
