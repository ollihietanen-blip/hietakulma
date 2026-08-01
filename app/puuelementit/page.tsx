import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Link from 'next/link';
import ImageCompare from '@/components/ui/ImageCompare';
import FadeIn from '@/components/ui/FadeIn';
import StoryBlock from '@/components/sections/StoryBlock';
import WallStructureTable from '@/components/sections/WallStructureTable';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Puuelementit — Tehdasvalmisteiset seinäelementit',
  description: 'Valmiiksi eristetyt ja pintakäsitellyt seinäelementit U-arvolla 0,17–0,21. Vaakapanelointi, pystypanelointi ja rappausalustat.',
};

type ImageCardOption = {
  name: string;
  image: string;
  description: string;
  imagePosition?: string;
  beforeImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforePosition?: string;
  afterPosition?: string;
};

const elementSolutions: ImageCardOption[] = [
  {
    name: 'Seinäelementit',
    image: '/images/puuelementit/elementti-seinaelementit.webp',
    description:
      'Ulkoseinäelementit valmistetaan rakennesuunnitelmien mukaan. Valmiusasteeseen voidaan sisällyttää runko, eristeet, levytykset, aukotukset ja ulkoverhous.',
  },
  {
    name: 'Väliseinäelementit',
    image: '/images/puuelementit/elementti-valiseinaelementit.webp',
    description:
      'Väliseinät voidaan valmistaa elementteinä aukotuksineen. Sähkörasiat, putkitukset ja levytykset tehdään piirustusten mukaan.',
  },
  {
    name: 'Välipohjaelementit',
    image: '/images/puuelementit/elementti-valipohjaelementit.webp',
    description:
      'Välipohjaelementit mitoitetaan kohteen kuormien, jännevälien ja talotekniikan mukaan. Esivalmistus nopeuttaa rungon etenemistä.',
  },
  {
    name: 'Kattoelementit',
    image: '/images/puuelementit/elementti-kattoelementit.webp',
    description:
      'Kattoelementit mitoitetaan kohteen rakenteiden ja nostojärjestyksen mukaan. Esivalmistus nopeuttaa vesikaton rungon asennusta.',
  },
  {
    name: 'Räystäselementit',
    image: '/images/puuelementit/elementti-katoselementit.webp',
    beforeImage: '/images/puuelementit/elementti-raystaselementit-rakenne.webp',
    beforeLabel: 'Rakenne',
    afterLabel: 'Valmis räystäs',
    afterPosition: 'center 42%',
    description:
      'Räystäät ja liittymädetaljit voidaan esivalmistaa tehtaalla. Näin linjat pysyvät yhtenäisinä ja työmaan viimeistely nopeutuu.',
  },
  {
    name: 'Katoselementit',
    image: '/images/puuelementit/elementti-katos-porraselementit.webp',
    imagePosition: 'center 44%',
    description:
      'Sisäänkäyntien ja kuistien katokset valmistetaan kohteen mittoihin. Esivalmistus nopeuttaa asennusta ja pitää liittymät siisteinä.',
  },
  {
    name: 'Porraselementit',
    image: '/images/puuelementit/elementti-porraselementit.webp',
    imagePosition: 'center 46%',
    description:
      'Sisäänkäyntien portaat voidaan toimittaa valmiiksi mitoitettuina elementteinä. Ratkaisu nopeuttaa työmaan viimeistelyä.',
  },
  {
    name: 'Terassielementit',
    image: '/images/puuelementit/elementti-terassielementit.webp',
    description:
      'Terassirakenteet voidaan valmistella elementteinä. Mittatarkka toteutus nopeuttaa asennusta ja viimeistelyä.',
  },
  {
    name: 'Parveke-elementit',
    image: '/images/puuelementit/elementti-parveke-elementit.webp',
    imagePosition: 'center 48%',
    description:
      'Parvekerakenteet mitoitetaan kohteen mukaan ja toimitetaan työmaalle asennusta nopeuttavina kokonaisuuksina.',
  },
];

const claddingOptions: ImageCardOption[] = [
  {
    name: 'AQUAPANEL®-verhous',
    image: '/images/puuelementit/rappaus-pinnoite.webp',
    beforeImage: '/images/puuelementit/aquapanel-outdoor-before-peilattu.webp',
    beforeLabel: 'Tehtaalta',
    afterLabel: 'Valmis pinta',
    description: 'Työmaalla rapattavaa julkisivua varten elementtiin voidaan asentaa AQUAPANEL® Outdoor -julkisivulevy. Levy toimii veden- ja säänkestävänä rappausalustana.',
  },
  { name: 'Vaakapanelointi', image: '/vaakapanelointi.jpg', description: 'Kuvassa UTW 28×195 mm -vaakapaneeli tehdasmaalattuna. Vakiovalikoiman vaakaverhouksia on saatavilla 95–220 mm paneelileveyksillä.' },
  { name: 'Pystypanelointi', image: '/Pystypanelointi.jpg', description: 'Kuvassa UTS 120 mm -pystypaneeli tehdasmaalattuna. Paneelijako suunnitellaan elementtien ja aukotusten mukaan, 95–220 mm leveysvalikoimasta.' },
  { name: 'Yhdistelmäverhoukset', image: '/images/puuelementit/yhdistelmaverhous-laaja.webp', description: 'Paneeleja voidaan yhdistellä samaan julkisivuun eri suuntiin ja leveyksiin. Suunnittelemme kohteeseen oman panelointijaon yhdessä asiakkaan kanssa.' },
  { name: 'Verhoamattomat elementit', image: '/images/puuelementit/verhoamattomat-elementit.webp', description: 'Elementit voidaan toimittaa ilman ulkoverhousta, kun verhous asennetaan työmaalla tai kuljetus sitä edellyttää. Koolaukset tehdään suunnitelmien mukaan.' },
];

export default function PuuelementitPage() {
  return (
    <>
      <Hero
        title="Puuelementit kokemuksella"
        subtitle="Suunnittelemme ja valmistamme puuelementit omakoti-, pari- ja rivitaloista aina suurempiin aluekohteisiin. Jokainen elementti tehdään mittatarkasti omalla tehtaallamme — valmiina toimitettavaksi suoraan rakennuspaikallesi."
        backgroundImage="/images/hero/tehdas-drone-03.webp"
        backgroundVideo="/images/puuelementit/puuelementit-hero-loop-hidastettu.mp4"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="sand">
        <KeyMetrics metrics={keyMetricsByPage.puuelementit} />
      </Section>

      <Section background="white" id="content">
        <div className="max-w-2xl mx-auto py-8 md:py-12 text-center">
          <FadeIn delay={100}>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold mb-6 text-center" style={{ lineHeight: '1.2' }}>
                Turvallisuudesta ja laadusta tinkimättä
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-5">
                Puuelementeistä rakentaminen on nopea, kustannustehokas ja laadukas tapa toteuttaa unelmien koti. Tehdasvalmistus tarkoittaa, että jokainen elementti syntyy kontrolloiduissa olosuhteissa — sääriippumattomasti, mittatarkasti ja toistettavasti. Pohjaratkaisu ja ulkoverhoilu mukautuvat tarpeidesi mukaan.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Toimitukseen sisältyy kantavien rakenteiden lujuuslaskelmat sekä elementtien että kattoristikoiden osalta. Ulkoseinärakenteet suunnitellaan täyttämään voimassa olevat määräykset, ja rungot rakennetaan CE-merkitystä, lujuuslajitellusta kuusesta.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-12">
            <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Ammattitaidolla viimeistelty</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Puuelementtitoimitus voidaan koostaa kohteen suunnitelmien mukaan seinä-, väliseinä-, välipohja-, katto-, räystäs-, katos-, porras-, terassi- ja parveke-elementeistä. Ulkoverhous voidaan toimittaa myös valmiiksi maalattuna — paneelit käsitellään homeenestopohjauksella sekä pohja- ja pintamaalataan tehtaallamme. Elementteihin voidaan asentaa myös sähkörasiat ja putkitukset valmiiksi toimittamiesi piirrosten mukaan.
                </p>
              </div>
              <Link
                href="/kohteet/kirjavaisenkatu-40"
                className="group relative block min-h-[360px] overflow-hidden bg-dark md:min-h-[460px]"
                aria-label="Tutustu Huunalan Herttuan ja Paronin referenssiin"
              >
                <Image
                  src="/images/kohteet/kirjavaisenkatu-40/huunala-02-lasijulkisivu.webp"
                  alt="Huunalan Herttuan ja Paronin valmis lasitettu julkisivu"
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue">
                    Valmis referenssi
                  </p>
                  <h3 className="max-w-md text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                    Huunalan Herttua ja Paroni
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-3 border-b border-white/60 pb-2 text-sm font-bold transition-colors group-hover:border-blue group-hover:text-blue">
                    TUTUSTU KOHTEESEEN <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </div>
            <div className="mt-10">
              <h3 className="font-bold text-2xl mb-8">ELEMENTTIRATKAISUT</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elementSolutions.map((option) => (
                  <div key={option.name} className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-52">
                      {option.beforeImage ? (
                        <ImageCompare
                          beforeSrc={option.beforeImage}
                          afterSrc={option.image}
                          beforeAlt={`${option.name} tehtaalla`}
                          afterAlt={`${option.name} työmaalla`}
                          beforeLabel={option.beforeLabel ?? 'Tehtaalla'}
                          afterLabel={option.afterLabel ?? 'Työmaalla'}
                          beforePosition={option.beforePosition}
                          afterPosition={option.afterPosition}
                        />
                      ) : (
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          className="object-cover"
                          style={{ objectPosition: option.imagePosition ?? 'center' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-text mb-2">{option.name}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-bold text-2xl mb-8">VERHOUSVAIHTOEHDOT</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {claddingOptions.map((option) => (
                  <div key={option.name} className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48">
                      {option.beforeImage ? (
                        <ImageCompare
                          beforeSrc={option.beforeImage}
                          afterSrc={option.image}
                          beforeAlt={`${option.name} tehtaalta`}
                          afterAlt={`${option.name} valmiilla pinnalla`}
                          beforeLabel={option.beforeLabel ?? 'Tehtaalta'}
                          afterLabel={option.afterLabel ?? 'Valmis pinta'}
                          beforePosition={option.beforePosition}
                          afterPosition="center 44%"
                        />
                      ) : (
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          className="object-cover"
                          style={{ objectPosition: option.imagePosition ?? 'center' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-text mb-2">{option.name}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section background="gray">
        <WallStructureTable />
      </Section>

      <StoryBlock
        title={homepageContent.story.title}
        description={homepageContent.story.description}
        ctaText={homepageContent.story.ctaText}
        ctaLink={homepageContent.story.ctaLink}
      />
    </>
  );
}
