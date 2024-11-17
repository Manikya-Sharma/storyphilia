"use server";

import { auth, signIn, signOut } from "@/auth";
import type { User } from "@prisma/client";
import { db } from "./db";

export async function serverSignIn(provider: "github" | "google") {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function serverSignOut() {
  await signOut({ redirectTo: "/" });
}

export async function getUser(): Promise<User | null> {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  const account = await db.user.findFirst({
    where: {
      externalId: session.user.id,
    },
  });

  return account;
}
