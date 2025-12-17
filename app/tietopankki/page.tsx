import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Tietopankki - Hietakulma Oy',
  description:
    'Lataa ohjeet, detaljit ja rakenneratkaisut Hietakulman puuelementeillä ja kattoristikoilla toteutettuun rakentamiseen.',
};

interface Document {
  title: string;
  url: string;
  category: string;
}

const documents: Document[] = [
  {
    title: 'HK-seinä 198mm (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
  },
  {
    title: 'Sähkövalmiit elementit (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
  },
  {
    title: 'HK-seinä 248mm (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
  },
  {
    title: 'Ulkoverhousdetaljit (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
  },
  {
    title: 'Elementtien asennusohje (test)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'ohjeet',
  },
  {
    title: 'Sähkö- ja LVI-suunnitteluopas (test)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'ohjeet',
  },
  {
    title: 'Ristikoiden tuentaohje (test)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'ohjeet',
  },
  {
    title: 'Suoritustasoilmoitus (DoP) - Seinäelementit',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
  },
  {
    title: 'Suoritustasoilmoitus (DoP) - Kattoristikot',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
  },
  {
    title: 'Hietakulma Tuoteluettelo 2025',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
  },
  {
    title: 'Materiaalierittelypohja',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
  },
];

const categories = {
  rakennetyypit: 'Rakennetyypit ja detaljit',
  ohjeet: 'Asennus- ja suunnitteluohjeet',
  tuotedokumentit: 'Tuotedokumentit',
};

export default function TietopankkiPage() {
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <>
      <Hero
        title="Tietopankki"
        subtitle="Lataa ohjeet, detaljit ja rakenneratkaisut Hietakulman puuelementeillä ja kattoristikoilla toteutettuun rakentamiseen."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-8 text-center">
            Hietakulman tietopankki kokoaa yhteen suunnittelun tueksi tarvittavat materiaalit:
            detaljipiirrustukset, rakennetyypit, asennus- ja suunnitteluohjeet sekä valmiit
            tuotedokumentit.
          </p>
          <p className="text-lg text-gray-700 mb-12 text-center">
            Meiltä saat myös sähkövalmiit elementit, CE-merkityt kattoristikot ja valmiiksi
            maalatut ulkoverhoukset – nyt kaikki tieto yhdessä paikassa.
          </p>

          <div className="space-y-12">
            {Object.entries(groupedDocuments).map(([category, docs]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-6">{categories[category as keyof typeof categories]}</h2>
                {category === 'rakennetyypit' && (
                  <p className="text-gray-600 mb-4">
                    Täältä löydät Hietakulman vakioitujen seinä-, katto- ja välipohjaelementtien
                    rakenneleikkaukset. Suunnittelijan työtä helpottavat valmiit DWG- ja PDF-kuvat.
                  </p>
                )}
                {category === 'ohjeet' && (
                  <p className="text-gray-600 mb-4">
                    Lataa oppat elementtien turvalliseen käsittelyyn, nostoihin ja kiinnitykseen,
                    LVI- ja sähkövarausten huomioimiseen sekä kattoristikoiden tuentaan täältä.
                  </p>
                )}
                <div className="grid gap-4">
                  {docs.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-gray-900">{doc.title}</span>
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

