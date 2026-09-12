import { PrismaClient } from '@prisma/client';
import { PrismaClient as PostgresClient } from './generated/prisma-postgres';
import { databaseProvider } from './database-provider';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaProvider: string | undefined;
};

const provider = databaseProvider(process.env);
// Models are generated from the same source; retain one delegate type for callers.
// No connection is opened at import time. Missing PostgreSQL configuration fails
// on database access; it never falls back to a function-local SQLite file.
export const prisma = globalForPrisma.prismaProvider === provider && globalForPrisma.prisma
  ? globalForPrisma.prisma
  : provider === 'postgresql'
    ? new PostgresClient() as unknown as PrismaClient
    : new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaProvider = provider;
}
