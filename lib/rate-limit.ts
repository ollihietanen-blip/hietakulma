import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';

// Database-backed buckets work across application instances. The identifier is
// hashed; a fixed window keeps the increment atomic without a read/write race.
export async function allowAttempt(action: string, identifier: string, limit: number, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const window = Math.floor(now / windowMs);
  const key = createHash('sha256').update(`${action}:${identifier}:${window}`).digest('hex');
  await prisma.rateLimitBucket.deleteMany({ where: { expiresAt: { lt: new Date(now) } } });
  const bucket = await prisma.rateLimitBucket.upsert({
    where: { key },
    create: { key, expiresAt: new Date((window + 1) * windowMs) },
    update: { count: { increment: 1 } },
  });
  return bucket.count <= limit;
}
