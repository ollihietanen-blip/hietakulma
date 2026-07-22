import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import {
  escapeHtml,
  hashActivationToken,
  isBlockedPortalEmail,
  normalizeEmail,
} from '@/lib/portal-registration';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ACTIVATION_TTL_MS = 30 * 60 * 1000;
const RESEND_COOLDOWN_MS = 10 * 60 * 1000;

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    if (!email || !email.includes('@') || !firstName || !lastName || !company || !roleCategory || !useCase) {
      return NextResponse.json(
        { error: 'Täytä etunimi, sukunimi, sähköposti, yritys, rooli ja käyttötarkoitus.' },
        { status: 400 },
      );
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
    const activationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/activate?token=${encodeURIComponent(activationToken)}`;
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
        await resend.emails.send({
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
      } catch (emailError) {
        await prisma.registrationRequest.delete({ where: { id: registrationRequest.id } });
        console.error('Aktivointisähköpostin lähetys epäonnistui:', emailError);
        return NextResponse.json(
          { error: 'Aktivointisähköpostin lähetys epäonnistui. Yritä hetken kuluttua uudelleen.' },
          { status: 502 },
        );
      }
    } else if (process.env.NODE_ENV === 'production') {
      await prisma.registrationRequest.delete({ where: { id: registrationRequest.id } });
      return NextResponse.json(
        { error: 'Sähköpostipalvelua ei ole vielä määritetty.' },
        { status: 503 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tarkista sähköpostisi ja aktivoi tunnus 30 minuutin kuluessa.',
      ...(process.env.NODE_ENV !== 'production' && !resend ? { activationUrl } : {}),
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Rekisteröityminen epäonnistui' }, { status: 500 });
  }
}
