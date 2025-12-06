import { betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/react";

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
  },
});

export const authClient = createAuthClient();

// export const { handlers, signIn, signOut } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//     }),
//     GitHub({
//       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//     }),
//   ],
//   callbacks: {
//     signIn: async ({ user: { email, id, name } }) => {
//       if (!id || !name || !email) return false;
//       const existing = db.user.findFirst({
//         where: {
//           externalId: id,
//         },
//       });
//       // already created an account
//       if (existing !== null) return true;
//       // create new account
//       await db.user.create({
//         data: {
//           externalId: id,
//           name,
//           email,
//         },
//       });
//       return true;
//     },
//   },
// });
