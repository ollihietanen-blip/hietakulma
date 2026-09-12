'use client';

import { useState } from 'react';
import { companyInfo } from '@/lib/content/contacts';

export default function ContactMap() {
  const [enabled, setEnabled] = useState(false);
  const address = `${companyInfo.address}, ${companyInfo.postalCode} ${companyInfo.city}`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const buttonClass = 'rounded-md border border-current px-5 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg overflow-hidden bg-white shadow-lg">
        {enabled ? (
          <iframe
            src={mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            referrerPolicy="no-referrer"
            title="Hietakulma Oy sijainti kartalla"
          />
        ) : (
          <div className="min-h-64 p-8 flex flex-col items-center justify-center text-center gap-4">
            <p className="font-semibold text-lg">{address}</p>
            <p className="max-w-xl text-gray-700">
              Kartan lataaminen yhdistää selaimesi Googleen. Google saa IP-osoitteesi ja
              selaimen tietoja ja voi käyttää evästeitä.
            </p>
            <a href="https://policies.google.com/privacy" className="underline">Googlen tietosuojakäytäntö</a>
          </div>
        )}
        <div className="p-5 text-center">
          <button type="button" className={buttonClass} aria-pressed={enabled} onClick={() => setEnabled(!enabled)}>
            {enabled ? 'Sulje Google-kartta' : 'Lataa Google-kartta'}
          </button>
        </div>
      </div>
      <p className="text-center text-gray-600 mt-4">{address}</p>
    </div>
  );
}
