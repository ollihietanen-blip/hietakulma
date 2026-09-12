'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function PortalAccount({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function logout() {
    setLoading(true);
    setError('');
    try {
      await signOut({ callbackUrl: '/login' });
    } catch {
      setError('Uloskirjautuminen epäonnistui. Yritä uudelleen.');
      setLoading(false);
    }
  }
  return <div className="bg-white px-4 pt-8 sm:px-6">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 text-sm">
      <p className="text-gray-600 break-all">Kirjautunut: {email}</p>
      <button onClick={logout} disabled={loading} className="font-semibold text-blue underline disabled:opacity-50">{loading ? 'Kirjaudutaan ulos…' : 'Kirjaudu ulos'}</button>
      {error && <p role="alert" className="w-full text-red-700">{error}</p>}
    </div>
  </div>;
}
