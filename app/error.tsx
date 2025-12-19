'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Error({
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Jotain meni pieleen</h1>
        <p className="text-lg text-gray-600 mb-8">
          Pahoittelut, tapahtui odottamaton virhe. Yritä uudelleen tai palaa etusivulle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Yritä uudelleen
          </Button>
          <Button href="/" variant="outline">
            Etusivulle
          </Button>
        </div>
      </div>
    </div>
  );
}

