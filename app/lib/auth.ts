import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions:NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "you@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          await connectDB();
          const user = await User.findOne({ email: credentials?.email });
  
          if (user && credentials?.password) {
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
            if (isValidPassword) {
              return { id: user._id, email: user.email };
            }
          }
          throw new Error('Invalid credentials');
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
  };


export default authOptions;

