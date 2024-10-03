import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./app/_lib/data-service";
import { Guest } from "./app/_types/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized(params: { auth: Session | null; request: NextRequest }) {
      return !!params.auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email!);

        if (!existingGuest)
          await createGuest({ email: user.email!, fullName: user.name! });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest: Guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
