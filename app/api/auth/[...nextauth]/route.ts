// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import { JWT } from 'next-auth/jwt';

// Define a custom JWT type that extends the default JWT type
interface CustomJWT extends JWT {
  id?: string; // Add the id property
}

export const authOptions: NextAuthOptions = {
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
            return { id: user._id, email: user.email }; // Return user object with id and email
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
        token.id = user.id; // Add user ID to the token
      }
      return token as CustomJWT; // Cast token to CustomJWT
    },
    async session({ session, token }) {
      // Ensure token is of type CustomJWT
      const customToken = token as CustomJWT;
      if (customToken) {
        session.user.id = customToken.id as string; // Assert that token.id is a string
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };