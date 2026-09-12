import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { hashActivationToken, isValidEmail, normalizeEmail, portalBaseUrl } from '@/lib/portal-registration';
import { allowAttempt } from '@/lib/rate-limit';

const message = 'Jos osoitteella on käyttäjätunnus, saat sähköpostiisi linkin salasanan vaihtamiseen.';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = normalizeEmail(body?.email);
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Tarkista sähköpostiosoite.' }, { status: 400 });
    }
    let baseUrl: string;
    try { baseUrl = portalBaseUrl(); } catch {
      return NextResponse.json({ error: 'Salasanan palautus ei ole juuri nyt käytettävissä.' }, { status: 503 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Salasanan palautus ei ole juuri nyt käytettävissä.' }, { status: 503 });
    }
    if (!await allowAttempt('password-reset-request', email, 5)) {
      return NextResponse.json({ error: 'Liian monta yritystä. Yritä uudelleen 15 minuutin kuluttua.' }, { status: 429 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ success: true, message });

    const recent = await prisma.passwordResetRequest.findFirst({ where: {
      userId: user.id, usedAt: null, createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) },
    } });
    if (recent) return NextResponse.json({ success: true, message });

    const token = randomBytes(32).toString('base64url');
    const reset = await prisma.passwordResetRequest.create({ data: {
      userId: user.id, tokenHash: hashActivationToken(token), expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    } });
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const delivery = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Hietakulma <noreply@hietakulma.fi>',
        to: email,
        subject: 'Vaihda Hietakulman tietopankin salasana',
        text: `Vaihda salasanasi tästä linkistä:\n${baseUrl}/reset-password?token=${encodeURIComponent(token)}\n\nLinkki on voimassa 30 minuuttia ja toimii kerran.\n\nJos et pyytänyt salasanan vaihtoa, voit jättää viestin huomiotta. Nykyinen salasanasi pysyy voimassa.\n\nHietakulma Oy`,
      });
      if (delivery.error || !delivery.data?.id) throw new Error('Delivery rejected');
    } catch {
      await prisma.passwordResetRequest.delete({ where: { id: reset.id } });
      console.error('Password reset email delivery failed.');
      // Same public response for known and unknown accounts. A failed delivery
      // leaves no cooldown record, so the request can be retried.
    }
    return NextResponse.json({ success: true, message });
  } catch {
    console.error('Password reset request failed.');
    return NextResponse.json({ error: 'Salasanan palautus epäonnistui. Yritä uudelleen.' }, { status: 500 });
  }
}
