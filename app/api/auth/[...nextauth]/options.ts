import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../libs/mongodb";
import User from "../../libs/models/User";
import {User as UserType} from '../../../../utils/types'
import bcrypt from "bcryptjs";
import Axios from "../../api-instance";
import { AxiosRequestConfig } from "axios";


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          await connectDB();

          const user: any = await User.findOne({ email: credentials.email });

          if (!user) return { error: "No such user exist" };

          if (!user?.password)
            return { error: "You are only able to connect with SSO" };

          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!match) return { error: "Incorrect password" };

          user.byCredentials = true;

          if (match) {
            delete user.password;
            return user;
          }
          return null;
        } catch (error) {
          throw new Error("Internal error");
        }
      },
    }),
    GoogleProvider({
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      profile(profile) {
        return profile;
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  pages: {
    signIn: "/signIn",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (user.error) throw new Error(user.error);

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectDB();

          const isUser = await User.findOne({ email: user.email });

          if (isUser) {
            user.id = isUser._id.toHexString();
            user.premium = isUser.premium;
            if (isUser?.image) user.image = isUser.image;
            return true;
          }

          let body: UserType = {
            name: user.name!,
            email: user.email!,
            freeUses: 0,
            premium: false,
            provider: [account.provider],
          };

          const { data } = await Axios("/api/users", body as AxiosRequestConfig) ;
          user.id = data._id;
          return true;
        } catch (error) {
          throw new Error(user.error);
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user?.image
          ? user.image
          : user?.picture
          ? user.picture
          : user.avatar_url;
        token.premium = user?.premium;
        if (user.byCredentials) token.byCredentials = true;

        return token;
      }

      //Update jwt token
      if (trigger === "update" && Object.keys(session).length) {
        for (let key in session) {
          token[key] = session[key];
        }

        return token;
      }

      return token;
    },

    async session({ session, token, trigger, newSession }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token?.image;
        session.user.premium = token?.premium;
        if (token?.byCredentials) session.user.byCredentials = true;

        return session;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
