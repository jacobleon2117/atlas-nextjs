import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { fetchUser } from "./lib/data";

export const runtime = 'nodejs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      authorize: async (credentials: { email: string; password: string }) => {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await fetchUser(credentials.email);
        if (!user) return null;
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});