'use client';

import { Suspense, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

function ActivationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'checking' | 'valid' | 'invalid'>('checking');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      return;
    }

    fetch(`/api/activate?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('invalid');
        return response.json();
      })
      .then((data) => {
        setEmail(data.email);
        setStatus('valid');
      })
      .catch(() => setStatus('invalid'));
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Salasanat eivät täsmää.');
      return;
    }

    if (password.length < 12) {
      setError('Salasanan tulee olla vähintään 12 merkkiä.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Tunnuksen aktivointi epäonnistui.');
        return;
      }

      const result = await signIn('credentials', {
        email: data.email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        router.push('/login?activated=true');
        return;
      }

      router.push('/tietopankki');
      router.refresh();
    } catch {
      setError('Jotain meni pieleen. Yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'checking') {
    return <p className="text-center text-gray-600">Tarkistetaan aktivointilinkkiä…</p>;
  }

  if (status === 'invalid') {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Aktivointilinkki ei ole voimassa</h1>
        <p className="mt-4 text-gray-600">Linkki on vanhentunut tai se on jo käytetty.</p>
        <Link href="/signup" className="mt-6 inline-block font-semibold text-[var(--blue)] underline">
          Pyydä uusi aktivointilinkki
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--blue)]">Sähköposti vahvistettu</p>
      <h1 className="mt-3 text-4xl font-extrabold">Aseta salasana</h1>
      <p className="mt-3 text-gray-600">Tunnus luodaan osoitteelle {email}.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {error && <div role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-red-800">{error}</div>}
        <label className="block text-sm font-semibold">
          Salasana
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={12}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 block w-full border border-black/20 px-4 py-3 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/20"
            placeholder="Vähintään 12 merkkiä"
          />
        </label>
        <label className="block text-sm font-semibold">
          Vahvista salasana
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={12}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-2 block w-full border border-black/20 px-4 py-3 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/20"
          />
        </label>
        <Button type="submit" variant="primary" className="w-full disabled:opacity-50" disabled={loading}>
          {loading ? 'Aktivoidaan…' : 'Aktivoi tunnus'}
        </Button>
      </form>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--sand)] px-4 py-16">
      <div className="w-full max-w-lg bg-white p-8 shadow-xl sm:p-12">
        <Suspense fallback={<p className="text-center text-gray-600">Ladataan…</p>}>
          <ActivationForm />
        </Suspense>
      </div>
    </main>
  );
}
