import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { hashActivationToken, isStrongEnoughPassword } from '@/lib/portal-registration';

function activationToken(request: NextRequest, bodyToken?: unknown) {
  const token = typeof bodyToken === 'string' ? bodyToken : request.nextUrl.searchParams.get('token');
  return token?.trim() ?? '';
}

async function validRequest(token: string) {
  if (!token) return null;

  return prisma.registrationRequest.findFirst({
    where: {
      tokenHash: hashActivationToken(token),
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
  });
}

export async function GET(request: NextRequest) {
  const registration = await validRequest(activationToken(request));
  if (!registration) {
    return NextResponse.json({ valid: false }, { status: 404 });
  }

  return NextResponse.json({ valid: true, email: registration.email });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Aktivoinnin tiedot ovat virheelliset.' }, { status: 400 });
    }
    const token = activationToken(request, body.token);
    const password = typeof body.password === 'string' ? body.password : '';

    if (!isStrongEnoughPassword(password)) {
      return NextResponse.json(
        { error: 'Salasanan tulee olla vähintään 12 merkkiä ja enintään 72 tavua (erikoismerkit voivat käyttää useita tavuja).' },
        { status: 400 },
      );
    }

    const registration = await validRequest(token);
    if (!registration) {
      return NextResponse.json(
        { error: 'Aktivointilinkki on vanhentunut tai jo käytetty.' },
        { status: 410 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const activatedAt = new Date();

    const activated = await prisma.$transaction(async (transaction) => {
      // Claim the still-valid token inside the same transaction that creates the user.
      const claimed = await transaction.registrationRequest.updateMany({
        where: { id: registration.id, usedAt: null, expiresAt: { gt: new Date() } },
        data: { usedAt: activatedAt },
      });
      if (claimed.count !== 1) return false;
      await transaction.user.create({
        data: {
          email: registration.email,
          password: hashedPassword,
          name: `${registration.firstName} ${registration.lastName}`,
          firstName: registration.firstName,
          lastName: registration.lastName,
          company: registration.company,
          roleCategory: registration.roleCategory,
          jobTitle: registration.jobTitle,
          phone: registration.phone,
          useCase: registration.useCase,
          emailVerifiedAt: activatedAt,
          marketingConsent: registration.marketingConsent,
          marketingConsentAt: registration.marketingConsent ? registration.privacyAcceptedAt : null,
          privacyAcceptedAt: registration.privacyAcceptedAt,
        },
      });

      return true;
    });

    if (!activated) {
      return NextResponse.json({ error: 'Aktivointilinkki on vanhentunut tai jo käytetty.' }, { status: 410 });
    }
    return NextResponse.json({ success: true, email: registration.email });
  } catch {
    console.error('Account activation failed.');
    return NextResponse.json({ error: 'Tunnuksen aktivointi epäonnistui.' }, { status: 500 });
  }
}
