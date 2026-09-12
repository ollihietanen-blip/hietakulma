import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { allowAttempt } from '@/lib/rate-limit';
import { normalizeEmail, isValidEmail } from '@/lib/portal-registration';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = normalizeEmail(credentials.email);
        const password = credentials.password;
        if (!isValidEmail(email) || typeof password !== 'string' ||
            Buffer.byteLength(password, 'utf8') > 72) return null;

        if (!await allowAttempt('login', email, 10)) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLoginAt: new Date(),
            loginCount: { increment: 1 },
          },
        });

        return {
          id: user.id,
          email: user.email,
          sessionVersion: user.sessionVersion,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.sessionVersion = user.sessionVersion;
      }
      if (typeof token.id !== 'string' || !token.id) return null;
      const current = await prisma.user.findUnique({ where: { id: token.id }, select: { sessionVersion: true } });
      if (!current || current.sessionVersion !== token.sessionVersion) return null;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
