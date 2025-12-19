'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fi">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kriittinen virhe</h1>
            <p className="text-lg text-gray-600 mb-8">
              Tapahtui kriittinen virhe sovelluksessa. Yritä päivittää sivu.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Yritä uudelleen
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

