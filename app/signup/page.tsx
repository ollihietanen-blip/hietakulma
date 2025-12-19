'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    marketingConsent: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Salasanat eivät täsmää');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Salasanan tulee olla vähintään 8 merkkiä');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          marketingConsent: formData.marketingConsent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Rekisteröityminen epäonnistui');
        setLoading(false);
        return;
      }

      // Ohjaa login-sivulle onnistuneen rekisteröitymisen jälkeen
      router.push('/login?registered=true');
    } catch (err) {
      setError('Jotain meni pieleen. Yritä uudelleen.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Rekisteröidy tietopankkiin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Tai{' '}
            <Link href="/login" className="font-medium text-blue hover:text-blue/80">
              kirjaudu sisään
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Sähköposti
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm"
                placeholder="nimi@esimerkki.fi"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Salasana
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm"
                placeholder="Vähintään 8 merkkiä"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Vahvista salasana
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm"
                placeholder="Vahvista salasana"
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketingConsent"
                  name="marketingConsent"
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                  className="h-4 w-4 text-blue focus:ring-blue border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="marketingConsent" className="font-medium text-gray-700">
                  Sallin markkinoinnin
                </label>
                <p className="text-gray-500">
                  Hyväksyn että Hietakulma Oy voi lähettää minulle markkinointiviestintää sähköpostitse.
                </p>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Rekisteröidään...' : 'Rekisteröidy'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

