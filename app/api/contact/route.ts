import { Resend } from 'resend';
import { NextResponse } from 'next/server';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  gdprConsent: boolean;
}

const SUBJECT_LABELS: Record<string, string> = {
  puutalot: 'Puutalot',
  puuelementit: 'Puuelementit',
  kattoristikot: 'Kattoristikot',
  muu: 'Muu',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    const { firstName, lastName, email, phone, subject, message, gdprConsent } = body;
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Kaikki pakolliset kentät tulee täyttää.' },
        { status: 400 }
      );
    }
    if (!gdprConsent) {
      return NextResponse.json(
        { error: 'Tietosuojasuostumus vaaditaan.' },
        { status: 400 }
      );
    }

    const subjectLabel = SUBJECT_LABELS[subject] || subject;

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCompany = body.company ? escapeHtml(body.company) : '';
    const safeMessage = escapeHtml(message);

    await getResend().emails.send({
      from: 'Hietakulma.fi <noreply@hietakulma.fi>',
      to: ['asiakaspalvelu@hietakulma.fi'],
      replyTo: email,
      subject: `Yhteydenotto: ${subjectLabel} - ${safeFirstName} ${safeLastName}`,
      html: `
        <h2>Uusi yhteydenotto hietakulma.fi-sivustolta</h2>
        <p><strong>Nimi:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>Sähköposti:</strong> ${safeEmail}</p>
        <p><strong>Puhelin:</strong> ${safePhone}</p>
        ${safeCompany ? `<p><strong>Yritys:</strong> ${safeCompany}</p>` : ''}
        <p><strong>Aihe:</strong> ${escapeHtml(subjectLabel)}</p>
        <hr />
        <p><strong>Viesti:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br />')}</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Tietosuojasuostumus annettu: Kyllä</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Viestin lähetys epäonnistui.' },
      { status: 500 }
    );
  }
}
