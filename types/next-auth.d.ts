import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    token?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
      token?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/react" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
      token?: string;
    };
  }
}

