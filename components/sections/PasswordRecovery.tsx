'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { companyInfo } from '@/lib/content/contacts';

export default function PasswordRecovery({ token }: { token?: string }) {
  const resetting = token !== undefined;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const sending = useRef(false);
  const inputClass = 'mt-2 block w-full border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue';

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending.current) return;
    setError('');
    if (resetting && password !== confirmation) {
      setError('Salasanat eivät täsmää.');
      return;
    }
    if (resetting && new TextEncoder().encode(password).length > 72) {
      setError('Salasana on liian pitkä. Käytä enintään 72 tavua; erikoismerkit voivat käyttää useita tavuja.');
      return;
    }
    sending.current = true;
    setLoading(true);
    try {
      const response = await fetch(`/api/password-reset/${resetting ? 'confirm' : 'request'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetting ? { token, password } : { email }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success !== true) {
        setError(typeof data?.error === 'string' ? data.error : 'Pyyntö epäonnistui. Yritä uudelleen.');
        return;
      }
      setDone(true);
      setPassword('');
      setConfirmation('');
    } catch {
      setError('Pyyntöä ei voitu vahvistaa. Tarkista verkkoyhteys ja yritä uudelleen.');
    } finally {
      sending.current = false;
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-32 sm:pt-40">
      <div className="mx-auto max-w-md bg-white p-6 sm:p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-900">{resetting ? 'Vaihda salasana' : 'Unohtuiko salasana?'}</h1>
        {done ? (
          <div className="mt-6 space-y-4">
            <p role="status" className="text-gray-700">
              {resetting ? 'Salasana on vaihdettu. Kirjaudu uudelleen uudella salasanallasi.' : 'Jos osoitteella on käyttäjätunnus, saat sähköpostiisi linkin salasanan vaihtamiseen. Linkki on voimassa 30 minuuttia.'}
            </p>
            {!resetting && <p className="text-sm text-gray-600">Jos viestiä ei tule, tarkista roskapostikansio ja sähköpostiosoite. Tarvittaessa ota yhteyttä:{' '}
              <a className="underline break-words" href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>.
            </p>}
            {!resetting && <button type="button" onClick={() => setDone(false)} className="text-blue underline">Tarkista osoite tai yritä uudelleen</button>}
          </div>
        ) : resetting && !token ? (
          <p role="alert" className="mt-6 text-gray-700">Palautuslinkki puuttuu. Pyydä uusi linkki alta.</p>
        ) : (
          <form onSubmit={submit} aria-busy={loading} className="mt-6 space-y-5">
            <p className="text-gray-600">{resetting ? 'Valitse uusi, vähintään 12 merkin salasana.' : 'Anna käyttäjätunnuksesi sähköpostiosoite.'}</p>
            {error && <p role="alert" className="border border-red-300 bg-red-50 p-3 text-red-800">{error}</p>}
            {resetting ? <>
              <label className="block text-sm font-semibold">Uusi salasana
                <input type="password" name="password" autoComplete="new-password" required minLength={12} maxLength={72} disabled={loading} value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
              </label>
              <label className="block text-sm font-semibold">Vahvista uusi salasana
                <input type="password" name="confirmation" autoComplete="new-password" required minLength={12} maxLength={72} disabled={loading} value={confirmation} onChange={e => setConfirmation(e.target.value)} className={inputClass} />
              </label>
            </> : <label className="block text-sm font-semibold">Sähköpostiosoite
              <input type="email" name="email" autoComplete="email" required maxLength={254} disabled={loading} value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
            </label>}
            <Button type="submit" disabled={loading} className="w-full disabled:opacity-50">{loading ? 'Käsitellään…' : resetting ? 'Vaihda salasana' : 'Lähetä palautuslinkki'}</Button>
          </form>
        )}
        <div className="mt-8 flex flex-col gap-3 text-sm">
          <Link href="/login" className="text-blue underline">Takaisin kirjautumiseen</Link>
          {resetting && !done && <Link href="/forgot-password" className="text-blue underline">Pyydä uusi palautuslinkki</Link>}
        </div>
      </div>
    </main>
  );
}
