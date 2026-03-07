import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sivua ei löydy</h2>
        <p className="text-lg text-gray-600 mb-8">
          Etsimääsi sivua ei valitettavasti löydy. Se saattaa olla poistettu tai siirretty.
        </p>
        <Button href="/" variant="primary">
          Palaa etusivulle
        </Button>
      </div>
    </div>
  );
}

