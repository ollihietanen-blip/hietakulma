import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const deliveryError = 'Viestin lähetys epäonnistui. Yritä uudelleen tai ota yhteyttä sähköpostitse.';
const limits = { firstName: 100, lastName: 100, email: 254, phone: 40, company: 200, message: 10000 };

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Lomakkeen tiedot ovat virheelliset.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Lomakkeen tiedot ovat virheelliset.' }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const fields = {} as Record<keyof typeof limits, string>;
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    const value = input[key] ?? (key === 'company' ? '' : undefined);
    if (typeof value !== 'string' || value.length > limits[key]) {
      return NextResponse.json({ error: 'Tarkista lomakkeen kentät ja tekstien pituudet.' }, { status: 400 });
    }
    fields[key] = value.trim();
    if (key !== 'company' && !fields[key]) {
      return NextResponse.json({ error: 'Täytä kaikki pakolliset kentät.' }, { status: 400 });
    }
    if (key !== 'message' && /[\r\n\x00-\x1f\x7f]/.test(value)) {
      return NextResponse.json({ error: 'Tarkista lomakkeen kentät.' }, { status: 400 });
    }
  }

  const { firstName, lastName, email, phone, company, message } = fields;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Tarkista sähköpostiosoite.' }, { status: 400 });
  }
  if (!/^\+?[\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 5) {
    return NextResponse.json({ error: 'Tarkista puhelinnumero.' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: deliveryError }, { status: 503 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Hietakulma.fi <noreply@hietakulma.fi>',
      to: ['talotehdas@hietakulma.fi'],
      replyTo: email,
      subject: `Uusi yhteydenotto: ${firstName} ${lastName}`,
      text: [
        'Uusi yhteydenotto verkkosivuilta',
        `Nimi: ${firstName} ${lastName}`,
        `Sähköposti: ${email}`,
        `Puhelin: ${phone}`,
        ...(company ? [`Yritys: ${company}`] : []),
        '',
        'Viesti:',
        message,
      ].join('\n'),
    });

    // Resend can resolve with an error instead of throwing. Require acceptance.
    if (error || !data?.id) {
      console.error('Contact email was not accepted by the email service.');
      return NextResponse.json({ error: deliveryError }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact email service request failed.');
    return NextResponse.json({ error: deliveryError }, { status: 502 });
  }
}
