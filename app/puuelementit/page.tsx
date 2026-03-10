import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/ui/FadeIn';
import StoryBlock from '@/components/sections/StoryBlock';
import WallStructureTable from '@/components/sections/WallStructureTable';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Puuelementit — Tehdasvalmisteiset seinäelementit',
  description: 'Valmiiksi eristetyt ja pintakäsitellyt seinäelementit U-arvolla 0,17–0,21. Vaakapanelointi, pystypanelointi ja rapattu pinnoite.',
};

export default function PuuelementitPage() {
  return (
    <>
      <Hero
        title="Puuelementit kokemuksella"
        subtitle="Suunnittelemme ja valmistamme puuelementit omakoti-, pari- ja rivitaloista aina suurempiin aluekohteisiin. Jokainen elementti tehdään mittatarkasti omalla tehtaallamme — valmiina toimitettavaksi suoraan rakennuspaikallesi."
        backgroundImage="/images/hero/tehdas-drone-03.webp"
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
              Ulkoverhousvaihtoehtoja on useita: vaaka-, pysty-, pysty-vaaka-pysty- sekä lomalautapanelointi. Ulkoverhous voidaan toimittaa myös valmiiksi maalattuna — paneelit käsitellään homeenestopohjauksella sekä pohja- ja pintamaalataan tehtaallamme. Ulko-, sisä- ja väliseinäelementteihin voidaan asentaa myös sähkörasiat ja putkitukset valmiiksi toimittamiesi piirrosten mukaan.
            </p>
          <div className="mt-8">
            <h3 className="font-bold text-2xl mb-8">VERHOUSVAIHTOEHDOT</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Vaakapanelointi', image: '/vaakapanelointi.jpg', description: 'Perinteinen ja ajaton valinta. UTW-profiili 28\u00d7195 mm, tehdasmaalattu kolmeen kertaan.' },
                { name: 'Pystypanelointi', image: '/Pystypanelointi.jpg', description: 'Moderni ja ryhdik\u00e4s ilme. Sopii erityisesti nykyaikaiseen arkkitehtuuriin.' },
                { name: 'Pysty-vaaka-pystypanelointi', image: '/images/tehdas/elementtituotanto/IMG_4224.webp', description: 'Elävä ja persoonallinen julkisivu, joka yhdistää molempien suuntien parhaat puolet.' },
                { name: 'Lomalaudoitus', image: '/images/tehdas/elementtituotanto/IMG_4226.webp', description: 'Luonnollinen ja perinteinen. Antaa julkisivulle elävän tekstuurin.' },
                { name: 'Rapattu pinnoite', image: '/images/tehdas/elementtituotanto/IMG_4236.webp', description: 'Kivitalomainen ilme puurakenteella. Moderni ja huoltovapaa vaihtoehto.' },
              ].map((option) => (
                <div key={option.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={option.image}
                      alt={option.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-text mb-2">{option.name}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
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

