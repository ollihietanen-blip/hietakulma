import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { allowAttempt } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import {
  escapeHtml,
  hashActivationToken,
  isBlockedPortalEmail,
  normalizeEmail,
  isValidEmail,
  portalBaseUrl,
} from '@/lib/portal-registration';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ACTIVATION_TTL_MS = 30 * 60 * 1000;
const RESEND_COOLDOWN_MS = 10 * 60 * 1000;

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' && value.length <= maxLength ? value.trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Lomakkeen tiedot ovat virheelliset.' }, { status: 400 });
    }
    const email = normalizeEmail(body.email);
    const firstName = text(body.firstName, 80);
    const lastName = text(body.lastName, 100);
    const company = text(body.company, 160);
    const roleCategory = text(body.roleCategory, 60);
    const jobTitle = text(body.jobTitle, 120) || null;
    const phone = text(body.phone, 40) || null;
    const useCase = text(body.useCase, 800);
    const marketingConsent = body.marketingConsent === true;
    const privacyAccepted = body.privacyAccepted === true;

    if (!isValidEmail(email) || !firstName || !lastName || !company || !roleCategory || !useCase) {
      return NextResponse.json(
        { error: 'Täytä etunimi, sukunimi, sähköposti, yritys, rooli ja käyttötarkoitus.' },
        { status: 400 },
      );
    }

    if (!['DESIGNER', 'BUILDER', 'DEVELOPER', 'CONTRACTOR', 'STUDENT', 'OTHER'].includes(roleCategory)) {
      return NextResponse.json({ error: 'Valitse rooli luettelosta.' }, { status: 400 });
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: 'Tietosuojailmoitus täytyy hyväksyä ennen rekisteröitymistä.' },
        { status: 400 },
      );
    }

    if (isBlockedPortalEmail(email)) {
      return NextResponse.json(
        { error: 'Tätä yrityssähköpostia ei voida käyttää tietopankissa.' },
        { status: 403 },
      );
    }

    // Check deployment configuration before creating requests or starting cooldowns.
    let baseUrl: string;
    try {
      baseUrl = portalBaseUrl();
    } catch {
      return NextResponse.json({ error: 'Rekisteröityminen ei ole juuri nyt käytettävissä.' }, { status: 503 });
    }
    if (!resend && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Sähköpostipalvelua ei ole vielä määritetty.' }, { status: 503 });
    }

    if (!await allowAttempt('signup', email, 5)) {
      return NextResponse.json({ error: 'Liian monta yritystä. Yritä uudelleen 15 minuutin kuluttua.' }, { status: 429 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: 'Jos osoite voidaan rekisteröidä, saat pian sähköpostin jatko-ohjeineen.',
      });
    }

    const recentRequest = await prisma.registrationRequest.findFirst({
      where: {
        email,
        createdAt: { gt: new Date(Date.now() - RESEND_COOLDOWN_MS) },
        usedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (recentRequest) {
      return NextResponse.json({
        success: true,
        message: 'Jos osoite voidaan rekisteröidä, saat pian sähköpostin jatko-ohjeineen.',
      });
    }

    await prisma.registrationRequest.deleteMany({
      where: { email, usedAt: null },
    });

    const activationToken = randomBytes(32).toString('base64url');
    const activationUrl = `${baseUrl}/activate?token=${encodeURIComponent(activationToken)}`;
    const registrationRequest = await prisma.registrationRequest.create({
      data: {
        email,
        tokenHash: hashActivationToken(activationToken),
        firstName,
        lastName,
        company,
        roleCategory,
        jobTitle,
        phone,
        useCase,
        marketingConsent,
        privacyAcceptedAt: new Date(),
        expiresAt: new Date(Date.now() + ACTIVATION_TTL_MS),
      },
    });

    if (resend) {
      try {
        const delivery = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Hietakulma <noreply@hietakulma.fi>',
          to: email,
          subject: 'Vahvista Hietakulman tietopankin käyttöoikeus',
          html: `
            <h1>Vahvista sähköpostiosoitteesi</h1>
            <p>Hei ${escapeHtml(firstName)},</p>
            <p>Viimeistele Hietakulman tietopankin käyttöoikeus asettamalla oma salasanasi alla olevasta linkistä.</p>
            <p><a href="${activationUrl}">Aktivoi tietopankin tunnus</a></p>
            <p>Linkki on voimassa 30 minuuttia ja sen voi käyttää vain kerran.</p>
            <p>Jos et tehnyt pyyntöä, voit jättää tämän viestin huomiotta.</p>
            <p>Ystävällisin terveisin,<br>Hietakulma Oy</p>
          `,
        });
        if (delivery.error || !delivery.data?.id) {
          throw new Error('Activation email was not accepted.');
        }
      } catch {
        await prisma.registrationRequest.delete({ where: { id: registrationRequest.id } });
        console.error('Aktivointisähköpostin lähetys epäonnistui.');
        return NextResponse.json(
          { error: 'Aktivointisähköpostin lähetys epäonnistui. Yritä hetken kuluttua uudelleen.' },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Tarkista sähköpostisi ja aktivoi tunnus 30 minuutin kuluessa.',
      ...(process.env.NODE_ENV !== 'production' && !resend ? { activationUrl } : {}),
    });
  } catch {
    console.error('Registration request failed.');
    return NextResponse.json({ error: 'Rekisteröityminen epäonnistui' }, { status: 500 });
  }
}
