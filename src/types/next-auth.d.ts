import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token?: string;
    id?: string | number;
  }

  interface Session {
    accessToken?: string;
    user?: {
      id?: string | number;
      username?: string | null;
      email?: string | null;
      token?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id?: string | number;
      username?: string | null;
      email?: string | null;
      token?: string;
    };
  }
}
