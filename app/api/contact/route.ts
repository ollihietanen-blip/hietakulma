import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, company, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Täytä kaikki pakolliset kentät.' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send notification email to Hietakulma
    await resend.emails.send({
      from: 'Hietakulma.fi <noreply@hietakulma.fi>',
      to: ['talotehdas@hietakulma.fi'],
      subject: `Uusi yhteydenotto: ${firstName} ${lastName}`,
      html: `
        <h2>Uusi yhteydenotto verkkosivuilta</h2>
        <p><strong>Nimi:</strong> ${firstName} ${lastName}</p>
        <p><strong>Sähköposti:</strong> ${email}</p>
        <p><strong>Puhelin:</strong> ${phone}</p>
        ${company ? `<p><strong>Yritys:</strong> ${company}</p>` : ''}
        <p><strong>Viesti:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Viestin lähetys epäonnistui. Yritä uudelleen.' },
      { status: 500 }
    );
  }
}
