import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/ui/FadeIn';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';

export const metadata = {
  title: 'CE-merkityt kattoristikot',
  description: 'CE-merkityt kattoristikot vakioratkaisuina tai mittatilaustyönä. Harjaristikot, saksiristikot, kehäristikot ja muut ratkaisut.',
};

export default function KattoristikotPage() {
  const trussTypes = [
    { name: 'Harjaristikko', description: 'Yleisin ristikkomalli harjakattoisiin taloihin.', spanRange: '6\u201314 m', typicalUse: 'Omakotitalot' },
    { name: 'Saksiristikko', description: 'Mahdollistaa korkean ja avaran sisäkaton.', spanRange: '8\u201316 m', typicalUse: 'Avarasisätilat' },
    { name: 'Murtoharjaristikko', description: 'Monimuotoisiin kattorakenteisiin.', spanRange: '8\u201314 m', typicalUse: 'Monikerroksiset katot' },
    { name: 'Käyttöullakkoristikko', description: 'Luo lisätilaa yläpohjaan varastointia tai asumista varten.', spanRange: '8\u201314 m', typicalUse: 'Asuttava ullakko' },
    { name: 'Kehäristikko', description: 'Suuriin jänneväleihin ja avoimiin tiloihin.', spanRange: '10\u201324 m', typicalUse: 'Hallit ja avoimet tilat' },
    { name: 'Pulpettiristikko', description: 'Yksilappeisiin kattoihin.', spanRange: '4\u201312 m', typicalUse: 'Yksilappeiset katot' },
    { name: 'Pukkiristikko', description: 'Erityisrakenteisiin ja tuentoihin.', spanRange: '10\u201320 m', typicalUse: 'Laajat kattoalueet' },
    { name: 'Palkkiristikko', description: 'Välipohjiin ja tasakattoihin.', spanRange: '6\u201318 m', typicalUse: 'Tasakatot ja loivat katot' },
  ];

  return (
    <>
      <Hero
        title="Kattoristikot kokemuksella"
        subtitle="Valmistamme CE-merkittyjä NR-ristikoita valmiiden mallien tai kohteen mittatietojen pohjalta. Kolmen vuosikymmenen kokemus ja sertifioitu tuotanto takaavat kestävän lopputuloksen joka kohteeseen."
        backgroundImage="/images/hero/tehdas-drone-02.webp"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="sand">
        <KeyMetrics metrics={keyMetricsByPage.kattoristikot} />
      </Section>

      <Section background="white" id="content">
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">CE-Merkityt Kattoristikot</h2>
            <p className="mb-6 max-w-4xl text-base text-gray-700 md:text-lg">
              Ristikkomme valmistetaan Kankaanpäässä kotimaisesta, lujuuslajitellusta puusta. Toimitamme suoraan tehtaalta työmaan tarpeisiin — joko valmiista mallista tai kohdekohtaisesti mitoitettuna.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn delay={100}>
            <div>
              <h3 className="text-2xl font-bold mb-6">Valmiista mallista tai omista mitoista</h3>
              <p className="mb-4 text-base text-gray-700 md:text-lg">
                Toimitamme kattoristikoita omien kohteidemme lisäksi ammattirakentajille ympäri Suomen. Ristikot suunnitellaan ja valmistetaan aina kohteen tarpeen mukaan — oli kyseessä sitten vakiomalli tai täysin räätälöity ratkaisu.
              </p>
              <p className="mb-6 text-base text-gray-700 md:text-lg">
                Listattujen ristikkotyyppien lisäksi valmistamme erikoisristikoita vaativiin kohteisiin. Kuljetukset ja toimitukset hoidamme luotettavien yhteistyökumppanien avulla — myös nostopalvelusta voidaan sopia tapauskohtaisesti.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tehdas/ristikkotuotanto/IMG_4251.webp"
                alt="Kattoristikot"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Kattoristikkovaihtoehdot</h2>
          <p className="mb-6 text-base text-gray-700 md:text-lg">
            Toimitamme ristikot joko valmiista malleista tai mittatiedoista seuraavien
            ristikkotyyppien pohjalta:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trussTypes.map((type) => (
              <div
                key={type.name}
                className="bg-gray-100 p-5 rounded-lg hover:bg-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <p className="font-semibold mb-2">{type.name}</p>
                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p><span className="font-medium text-gray-700">Jänneväli:</span> {type.spanRange}</p>
                  <p><span className="font-medium text-gray-700">Käyttö:</span> {type.typicalUse}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 rounded-lg" style={{ backgroundColor: 'var(--sand)' }}>
            <h3 className="text-2xl font-bold mb-4">CE-merkinnän merkitys</h3>
            <p className="text-base text-gray-700 md:text-lg">
              Kaikki kattoristikkomme ovat CE-merkittyjä EN 14250 -standardin mukaisesti. Merkintä takaa, että ristikot on suunniteltu ja valmistettu eurooppalaisen harmonisoidun standardin mukaan, ja niille on laadittu suoritustasoilmoitus (DoP). Suoritustasoilmoitukset löydät{' '}
              <a href="/tietopankki" className="underline font-medium" style={{ color: 'var(--blue)' }}>
                Tietopankistamme
              </a>.
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className="mb-4 text-base text-gray-700 md:text-lg">
              Ota yhteyttä, niin autamme rakennuskohteeseesi sopivan kattoristikkotyypin valinnassa.
            </p>
            <Button href="/ota-yhteytta" variant="primary">
              Ota yhteyttä
            </Button>
          </div>
        </div>
        </FadeIn>
      </Section>

      <Section background="gray">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Hietakulman tarina</h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-700 md:text-xl">
              Hietakulma Oy on kankaanpääläinen perheyritys, joka on erikoistunut
              puuelementtitalojen ja kattoristikoiden tuotantoon.
            </p>
            <Button href="/tarina" variant="primary">
              TUTUSTU TARINAAMME
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
