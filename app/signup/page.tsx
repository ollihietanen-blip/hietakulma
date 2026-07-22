'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  roleCategory: string;
  jobTitle: string;
  phone: string;
  useCase: string;
  privacyAccepted: boolean;
  marketingConsent: boolean;
};

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  roleCategory: '',
  jobTitle: '',
  phone: '',
  useCase: '',
  privacyAccepted: false,
  marketingConsent: false,
};

export default function SignupPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activationUrl, setActivationUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const update = <Key extends keyof FormData>(key: Key, value: FormData[Key]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setActivationUrl('');
    setLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Rekisteröityminen epäonnistui.');
        return;
      }

      setMessage(data.message);
      setActivationUrl(data.activationUrl || '');
      setFormData(initialFormData);
    } catch {
      setError('Jotain meni pieleen. Yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  const fieldClassName =
    'mt-2 block w-full border border-black/20 bg-white px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/20';

  return (
    <main className="min-h-screen bg-[var(--sand)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="group mx-auto grid max-w-6xl overflow-hidden bg-white shadow-xl lg:grid-cols-[0.8fr_1.2fr]">
        <section className="relative isolate min-h-[620px] overflow-hidden p-8 text-white sm:p-12 lg:min-h-full">
          <Image
            src="/images/portal/tehdas-tietopankki.webp"
            alt="Hietakulman puuelementtitehtaan tuotantolinja työskentelyn aikana"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="-z-20 object-cover object-center transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-[var(--dark)]/50 to-[var(--dark)]/95" />

          <div className="flex h-full min-h-[556px] flex-col">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Hietakulman tietopankki
            </p>
            <div className="mt-auto pt-20">
              <h1 className="max-w-md text-4xl font-extrabold text-white sm:text-5xl">
                Tehtaalta suunnittelijan työpöydälle
              </h1>
              <p className="mt-6 max-w-md text-lg text-white/80">
                Rakennedetaljit, suunnitteluaineistot sekä asennus- ja tuoteohjeet yhdessä suojatussa palvelussa.
              </p>
              <p className="mt-10 text-sm text-white/70">
                Onko sinulla jo tunnus?{' '}
                <Link href="/login" className="font-semibold text-white underline underline-offset-4">
                  Kirjaudu sisään
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold">Hae käyttöoikeutta</h2>
          <p className="mt-3 text-gray-600">
            Käyttöoikeus myönnetään automaattisesti sähköpostin vahvistamisen jälkeen.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-red-800">
                {error}
              </div>
            )}
            {message && (
              <div role="status" className="border border-green-300 bg-green-50 px-4 py-3 text-green-800">
                <p>{message}</p>
                {activationUrl && (
                  <p className="mt-2 text-sm">
                    Paikallinen testilinkki:{' '}
                    <Link href={activationUrl} className="font-semibold underline">
                      aktivoi tunnus
                    </Link>
                  </p>
                )}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Etunimi *
                <input
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={(event) => update('firstName', event.target.value)}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-semibold">
                Sukunimi *
                <input
                  name="lastName"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={(event) => update('lastName', event.target.value)}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-semibold sm:col-span-2">
                Työsähköposti *
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(event) => update('email', event.target.value)}
                  className={fieldClassName}
                  placeholder="nimi@yritys.fi"
                />
              </label>
              <label className="text-sm font-semibold">
                Yritys *
                <input
                  name="company"
                  autoComplete="organization"
                  required
                  value={formData.company}
                  onChange={(event) => update('company', event.target.value)}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-semibold">
                Olen… *
                <select
                  name="roleCategory"
                  required
                  value={formData.roleCategory}
                  onChange={(event) => update('roleCategory', event.target.value)}
                  className={fieldClassName}
                >
                  <option value="">Valitse rooli</option>
                  <option value="DESIGNER">Suunnittelija</option>
                  <option value="BUILDER">Rakentaja</option>
                  <option value="DEVELOPER">Rakennuttaja tai tilaaja</option>
                  <option value="CONTRACTOR">Urakoitsija</option>
                  <option value="STUDENT">Opiskelija</option>
                  <option value="OTHER">Muu</option>
                </select>
              </label>
              <label className="text-sm font-semibold sm:col-span-2">
                Tehtävänimike
                <input
                  name="jobTitle"
                  autoComplete="organization-title"
                  value={formData.jobTitle}
                  onChange={(event) => update('jobTitle', event.target.value)}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-semibold sm:col-span-2">
                Puhelinnumero
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-semibold sm:col-span-2">
                Mihin tarvitset aineistoja? *
                <textarea
                  name="useCase"
                  required
                  rows={4}
                  maxLength={800}
                  value={formData.useCase}
                  onChange={(event) => update('useCase', event.target.value)}
                  className={fieldClassName}
                  placeholder="Esimerkiksi käynnissä oleva suunnittelu- tai rakennushanke"
                />
              </label>
            </div>

            <div className="space-y-4 border-t border-black/10 pt-6">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacyAccepted}
                  onChange={(event) => update('privacyAccepted', event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--blue)]"
                />
                <span>
                  Hyväksyn henkilötietojeni käsittelyn tietopankin käyttöoikeuden toteuttamiseksi ja olen tutustunut{' '}
                  <Link href="/tietosuoja" className="font-semibold underline" target="_blank">
                    tietosuojailmoitukseen
                  </Link>
                  . *
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(event) => update('marketingConsent', event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--blue)]"
                />
                <span>
                  Haluan vastaanottaa Hietakulman tuotteisiin, referensseihin ja palveluihin liittyvää markkinointiviestintää sähköpostitse. Suostumus on vapaaehtoinen.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Lähetetään vahvistuslinkkiä…' : 'Lähetä vahvistuslinkki'}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
