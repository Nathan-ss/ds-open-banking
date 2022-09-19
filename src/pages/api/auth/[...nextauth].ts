import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { MongoClient } from "mongodb";

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

        //conectando com o banco
        const client = await MongoClient.connect(process.env.MONGODB_URI, {});

        const db = await client.db(process.env.MONGODB_DB);

        //pagango a coleçao user
        const users = await db.collection("users");

        //procurando email no banco
        const result = await users.findOne({
          email,
        });
        console.log(result);

        if (!result) {
          client.close();
          throw new Error("No user found with the email");
        }

        if (password != result.password) {
          client.close();
          throw new Error("Password doesnt match");
        }

        return {
          id: result._id,
          name: result.name,
          email: result.email,
          role: "admin",
        };
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
