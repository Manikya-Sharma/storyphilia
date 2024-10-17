"use server";

import { signIn, signOut } from "@/auth";

export async function serverSignIn(provider: "github" | "google") {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function serverSignOut() {
  await signOut({ redirectTo: "/" });
}
