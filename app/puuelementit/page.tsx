import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
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

const elementSolutions = [
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
    image: '/images/puuelementit/elementti-valipohjaelementit-rakenne.webp',
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
    image: '/images/puuelementit/elementti-kattoelementit.webp',
    beforeImage: '/images/puuelementit/elementti-raystaselementit-rakenne-puhdistettu.webp',
    beforeLabel: 'Tehtaalla',
    afterLabel: 'Työmaalla',
    description:
      'Räystäät ja liittymädetaljit voidaan esivalmistaa tehtaalla. Näin linjat pysyvät yhtenäisinä ja työmaan viimeistely nopeutuu.',
  },
  {
    name: 'Katoselementit',
    image: '/images/puuelementit/elementti-katos-porraselementit.webp',
    description:
      'Sisäänkäyntien ja kuistien katokset valmistetaan kohteen mittoihin. Esivalmistus nopeuttaa asennusta ja pitää liittymät siisteinä.',
  },
  {
    name: 'Porraselementit',
    image: '/images/puuelementit/elementti-porraselementit.webp',
    description:
      'Sisäänkäyntien portaat voidaan toimittaa valmiiksi mitoitettuina elementteinä. Ratkaisu nopeuttaa työmaan viimeistelyä.',
  },
  {
    name: 'Terassi- ja parveke-elementit',
    image: '/images/puuelementit/elementti-parveke-elementit.webp',
    description:
      'Terassi- ja parvekerakenteet voidaan valmistella elementteinä. Mittatarkka toteutus nopeuttaa asennusta ja viimeistelyä.',
  },
];

const claddingOptions = [
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
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn delay={100}>
            <div>
              <h2 className="text-3xl font-bold mb-6">Turvallisuudesta ja laadusta tinkimättä</h2>
              <p className="text-lg text-gray-700 mb-4">
                Puuelementeistä rakentaminen on nopea, kustannustehokas ja laadukas tapa toteuttaa unelmien koti. Tehdasvalmistus tarkoittaa, että jokainen elementti syntyy kontrolloiduissa olosuhteissa — sääriippumattomasti, mittatarkasti ja toistettavasti. Pohjaratkaisu ja ulkoverhoilu mukautuvat tarpeidesi mukaan.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Toimitukseen sisältyy kantavien rakenteiden lujuuslaskelmat sekä elementtien että kattoristikoiden osalta. Ulkoseinärakenteet suunnitellaan täyttämään voimassa olevat määräykset, ja rungot rakennetaan CE-merkitystä, lujuuslajitellusta kuusesta.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tehdas/elementtituotanto/IMG_0293.JPG"
                alt="Puuelementit"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Ammattitaidolla viimeistelty</h2>
            <p className="text-lg text-gray-700 mb-6">
              Puuelementtitoimitus voidaan koostaa kohteen suunnitelmien mukaan seinä-, väliseinä-, välipohja-, katto-, räystäs-, katos-, porras-, terassi- ja parveke-elementeistä. Ulkoverhous voidaan toimittaa myös valmiiksi maalattuna — paneelit käsitellään homeenestopohjauksella sekä pohja- ja pintamaalataan tehtaallamme. Elementteihin voidaan asentaa myös sähkörasiat ja putkitukset valmiiksi toimittamiesi piirrosten mukaan.
            </p>
            <div className="mt-8">
              <h3 className="font-bold text-2xl mb-8">ELEMENTTIRATKAISUT</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elementSolutions.map((option) => (
                  <div key={option.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-52">
                      {option.beforeImage ? (
                        <ImageCompare
                          beforeSrc={option.beforeImage}
                          afterSrc={option.image}
                          beforeAlt={`${option.name} tehtaalla`}
                          afterAlt={`${option.name} työmaalla`}
                          beforeLabel={option.beforeLabel ?? 'Tehtaalla'}
                          afterLabel={option.afterLabel ?? 'Työmaalla'}
                        />
                      ) : (
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          className="object-cover"
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
                  <div key={option.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48">
                      {option.beforeImage ? (
                        <ImageCompare
                          beforeSrc={option.beforeImage}
                          afterSrc={option.image}
                          beforeAlt={`${option.name} tehtaalta`}
                          afterAlt={`${option.name} valmiilla pinnalla`}
                          beforeLabel={option.beforeLabel}
                          afterLabel={option.afterLabel}
                          afterPosition="center 44%"
                        />
                      ) : (
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          className="object-cover"
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
