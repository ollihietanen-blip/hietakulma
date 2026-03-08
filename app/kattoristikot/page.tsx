import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'CE-merkityt kattoristikot — Hietakulma Oy',
  description: 'CE-merkityt kattoristikot vakioratkaisuina tai mittatilaustyönä. Harjaristikot, saksiristikot, kehäristikot ja muut ratkaisut.',
};

export default function KattoristikotPage() {
  const trussTypes = [
    { name: 'Harjaristikko', description: 'Yleisin ristikkomalli harjakattoisiin taloihin.', spanRange: '6\u201314 m', typicalUse: 'Omakotitalot' },
    { name: 'Saksiristikko', description: 'Mahdollistaa korkean ja avaran sis\u00e4katon.', spanRange: '8\u201316 m', typicalUse: 'Avarasis\u00e4tilat' },
    { name: 'Murtoharjaristikko', description: 'Monimuotoisiin kattorakenteisiin.', spanRange: '8\u201314 m', typicalUse: 'Monikerroksiset katot' },
    { name: 'K\u00e4ytt\u00f6ullakkoristikko', description: 'Luo lis\u00e4tilaa yl\u00e4pohjaan varastointia tai asumista varten.', spanRange: '8\u201314 m', typicalUse: 'Asuttava ullakko' },
    { name: 'Keh\u00e4ristikko', description: 'Suuriin j\u00e4nnev\u00e4leihin ja avoimiin tiloihin.', spanRange: '10\u201324 m', typicalUse: 'Hallit ja avoimet tilat' },
    { name: 'Pulpettiristikko', description: 'Yksilappeisiin kattoihin.', spanRange: '4\u201312 m', typicalUse: 'Yksilappeiset katot' },
    { name: 'Pukkiristikko', description: 'Erityisrakenteisiin ja tuentoihin.', spanRange: '10\u201320 m', typicalUse: 'Laajat kattoalueet' },
    { name: 'Palkkiristikko', description: 'V\u00e4lipohjiin ja tasakattoihin.', spanRange: '6\u201318 m', typicalUse: 'Tasakatot ja loivat katot' },
  ];

  return (
    <>
      <Hero
        title="Kattoristikot kokemuksella"
        subtitle="Valmistamme sertifioituja NR-ristikoita valmiiden mallien tai pelkkien mittatietojen pohjalta. CE-laatuvarmistettu tuotanto ja vuosikymmenten kokemus takaavat kestävän ja laadukkaan lopputuloksen."
        backgroundImage="/images/hero/tehdas-drone-02.webp"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="white" id="content">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">CE-Merkityt Kattoristikot</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-4xl">
            Valmistamme ristikot Kankaanpäässä kotimaisesta, lujuuslajitellusta puusta. Toimitukset suoraan tehtaalta työmaalle joko valmiista mallista tai kohteen mittatietojen mukaan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-6">Valmiista mallista tai omista mitoista</h3>
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
              src="/images/tehdas/ristikkotuotanto/IMG_4251.webp"
              alt="Kattoristikot"
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
                key={type.name}
                className="bg-gray-100 p-5 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <p className="font-semibold mb-2">{type.name}</p>
                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p><span className="font-medium text-gray-700">J\u00e4nnev\u00e4li:</span> {type.spanRange}</p>
                  <p><span className="font-medium text-gray-700">K\u00e4ytt\u00f6:</span> {type.typicalUse}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 rounded-lg" style={{ backgroundColor: 'var(--sand)' }}>
            <h3 className="text-2xl font-bold mb-4">CE-merkinn\u00e4n merkitys</h3>
            <p className="text-lg text-gray-700">
              Kaikki kattoristikkomme ovat CE-merkittyj\u00e4 EN 14250 -standardin mukaisesti. CE-merkint\u00e4 takaa,
              ett\u00e4 ristikot on suunniteltu ja valmistettu eurooppalaisen harmonisoidun standardin mukaisesti,
              ja niille on laadittu suoritustasoilmoitus (DoP). Suoritustasoilmoitukset l\u00f6yd\u00e4t{' '}
              <a href="/tietopankki" className="underline font-medium" style={{ color: 'var(--blue)' }}>
                Tietopankistamme
              </a>.
            </p>
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

