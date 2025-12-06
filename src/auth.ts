import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user: { email, id, name } }) => {
      if (!id || !name || !email) return false;
      const existing = db.user.findFirst({
        where: {
          externalId: id,
        },
      });
      // already created an account
      if (existing !== null) return true;
      // create new account
      await db.user.create({
        data: {
          externalId: id,
          name,
          email,
        },
      });
      return true;
    },
  },
});
