import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { hashActivationToken, isStrongEnoughPassword } from '@/lib/portal-registration';
import { allowAttempt } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (typeof body?.token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(body.token)) {
      return NextResponse.json({ error: 'Palautuslinkki ei ole voimassa.' }, { status: 410 });
    }
    if (typeof body.password !== 'string' || !isStrongEnoughPassword(body.password)) {
      return NextResponse.json({ error: 'Salasanan tulee olla vähintään 12 merkkiä ja enintään 72 tavua.' }, { status: 400 });
    }
    const tokenHash = hashActivationToken(body.token);
    if (!await allowAttempt('password-reset-confirm', tokenHash, 10)) {
      return NextResponse.json({ error: 'Liian monta yritystä. Yritä uudelleen 15 minuutin kuluttua.' }, { status: 429 });
    }
    const reset = await prisma.passwordResetRequest.findFirst({ where: {
      tokenHash, usedAt: null, expiresAt: { gt: new Date() },
    } });
    if (!reset) return NextResponse.json({ error: 'Palautuslinkki on vanhentunut tai jo käytetty.' }, { status: 410 });
    const password = await bcrypt.hash(body.password, 12);
    const changed = await prisma.$transaction(async tx => {
      const now = new Date();
      const claim = await tx.passwordResetRequest.updateMany({
        where: { id: reset.id, usedAt: null, expiresAt: { gt: now } }, data: { usedAt: now },
      });
      if (claim.count !== 1) return false;
      await tx.user.update({ where: { id: reset.userId }, data: { password, sessionVersion: { increment: 1 } } });
      await tx.passwordResetRequest.updateMany({ where: { userId: reset.userId, usedAt: null }, data: { usedAt: now } });
      return true;
    });
    if (!changed) return NextResponse.json({ error: 'Palautuslinkki on vanhentunut tai jo käytetty.' }, { status: 410 });
    return NextResponse.json({ success: true });
  } catch {
    console.error('Password reset confirmation failed.');
    return NextResponse.json({ error: 'Salasanan vaihtaminen epäonnistui. Yritä uudelleen.' }, { status: 500 });
  }
}
