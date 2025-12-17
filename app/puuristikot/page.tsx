import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Puuristikot - Hietakulma Oy',
  description:
    'Valmistamme sertifioituja NR-ristikoita valmiiden mallien tai pelkkien mittatietojen pohjalta.',
};

export default function PuuristikotPage() {
  const trussTypes = [
    'Harjaristikko',
    'Saksiristikko',
    'Murtoharjaristikko',
    'Käyttöullakkoristikko',
    'Kehäristikko',
    'Pulpettiristikko',
    'Pukkiristikko',
    'Palkkiristikko',
  ];

  return (
    <>
      <Hero
        title="Kattoristikot kokemuksella"
        subtitle="Valmistamme sertifioituja NR-ristikoita valmiiden mallien tai pelkkien mittatietojen pohjalta. CE-laatuvarmistettu tuotanto ja vuosikymmenten kokemus takaavat kestävän ja laadukkaan lopputuloksen."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="white" id="content">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">Valmiista mallista tai omista mitoista</h2>
            <p className="text-lg text-gray-700 mb-4">
              Toimitamme kattoristikoita omien kohteidemme lisäksi ammattirakentajien tarpeisiin
              ympäri Suomen. Suunnittelemme ja valmistamme kattoristikot tarpeen mukaan joko
              valmiista malleista tai mittotietojen mukaan.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Alla listattujen kattoristikkotyyppien lisäksi toimitamme erikoisristikoita niitä
              edellyttäviin kohteisiin. Ristikoiden kuljetukset ja toimitukset kohteeseen hoidamme
              yhteistyökumppaneidemme avulla, myös nostopalvelusta on mahdollista sopia
              tapauskohtaisesti. Ristikot suunnitellaan ja valmistetaan tehtaallamme Kankaanpäässä
              30 vuoden kokemuksella.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1745739487556-NEIPALA0AQZGO4UV9XZ8/unsplash-image-OLFA5DgSIFo.jpg"
              alt="Puuristikot"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Kattoristikkovaihtoehdot</h2>
          <p className="text-lg text-gray-700 mb-6">
            Toimitamme ristikot joko valmiista malleista tai mittatiedoista seuraavien
            ristikkotyyppien pohjalta:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trussTypes.map((type) => (
              <div
                key={type}
                className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 transition-colors"
              >
                <p className="font-semibold">{type}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Ota yhteyttä, niin autamme rakennuskohteeseesi sopivan kattoristikkotyypin valinnassa.
            </p>
            <Button href="/ota-yhteytta" variant="primary">
              Ota yhteyttä
            </Button>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Hietakulman tarina</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Hietakulma Oy on kankaanpääläinen perheyritys, joka on erikoistunut
            puuelementtitalojen ja kattoristikoiden tuotantoon.
          </p>
          <Button href="/tarina" variant="primary">
            TUTUSTU TARINAAMME
          </Button>
        </div>
      </Section>
    </>
  );
}

