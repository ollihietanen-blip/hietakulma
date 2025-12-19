import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, marketingConsent } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email ja salasana vaaditaan' }, { status: 400 });
    }

    // Tarkista onko käyttäjä jo olemassa
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Käyttäjä on jo olemassa' }, { status: 400 });
    }

    // Hash salasana
    const hashedPassword = await bcrypt.hash(password, 10);

    // Luo käyttäjä
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        marketingConsent: marketingConsent || false,
      },
    });

    // Lähetä sähköposti tunnuksilla
    if (resend) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Hietakulma <noreply@hietakulma.fi>',
          to: email,
          subject: 'Tervetuloa Hietakulman tietopankkiin',
          html: `
            <h1>Tervetuloa Hietakulman tietopankkiin!</h1>
            <p>Kiitos rekisteröitymisestä. Tunnuksesi ovat:</p>
            <p><strong>Sähköposti:</strong> ${email}</p>
            <p><strong>Salasana:</strong> ${password}</p>
            <p>Voit nyt kirjautua sisään osoitteessa: <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login">${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login</a></p>
            <p>Ystävällisin terveisin,<br>Hietakulma Oy</p>
          `,
        });
      } catch (emailError) {
        console.error('Sähköpostin lähetys epäonnistui:', emailError);
        // Jatketaan vaikka sähköposti epäonnistui
      }
    } else {
      console.warn('RESEND_API_KEY ei ole asetettu. Sähköpostia ei lähetetä.');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Rekisteröityminen onnistui. Tarkista sähköpostisi tunnuksia varten.' 
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Rekisteröityminen epäonnistui' }, { status: 500 });
  }
}

