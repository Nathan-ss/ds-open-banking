import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "unknown-client-id",
      clientSecret: process.env.GITHUB_SECRET || "unknown-client-secret",
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email == "user@email.com" || password == "user1") {
          return {
            id: "1234",
            name: "user1",
            email: "user@email.com",
            role: "admin",
          };
        }
        if (email == "user2@email.com" || password == "user2") {
          return {
            id: "1234",
            name: "user2",
            email: "user2@email.com",
            role: "admin",
          };
        } else {
          throw new Error("invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/Dashboard",
    error: "/",
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
  jwt: {
    secret: process.env.SECRET,
  },
};

export default NextAuth(authOptions);
