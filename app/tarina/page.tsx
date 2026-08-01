import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/ui/FadeIn';
import ProductCircles from '@/components/sections/ProductCircles';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Hietakulman tarina — Yli 30 vuotta puurakentamista',
  description: 'Kankaanpääläinen elementtitalovalmistaja, joka toimittaa kokonaisvaltaisen palvelun suunnittelusta valmiiksi elementeiksi. Tutustu tarinaamme.',
};

export default function TarinaPage() {
  return (
    <>
      <Hero
        title="Hietakulman tarina"
        subtitle="Hietakulma syntyi Kankaanpäässä halusta tehdä puurakentaminen paremmin. Kolmen vuosikymmenen aikana olemme kasvaneet hiljaisesta tekijästä yhdeksi Suomen luotetuimmista puuelementtivalmistajista — yli 3 750 toimitettua projektia puhuvat puolestaan."
        backgroundImage="/images/hero/tehdas-drone-01.webp"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="sand">
        <KeyMetrics metrics={keyMetricsByPage.tarina} />
      </Section>

      <Section background="white" id="content">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={100}>
            <div>
              <div className="space-y-4">
                <p className="text-base text-gray-700 leading-relaxed md:text-lg">
                  Kaikki alkaa suunnittelupöydältä ja päättyy rakennuspaikalle. Suunnittelemme, valmistamme ja toimitamme — kaikki saman katon alta, omalla henkilöstöllä ja omalla vastuulla. Ei välikäsiä, ei epäselvyyksiä. Kun lupaamme jotain, pidämme sen.
                </p>
                <p className="text-base text-gray-700 leading-relaxed md:text-lg">
                  Viime vuosina olemme investoineet merkittävästi tuotantoomme: uusi automaattinen tuotantolinjamme Kankaanpään tehtaalla on rakennettu vastaamaan kasvavaan kysyntään — tinkimättä siitä, mistä emme koskaan tingi. Sama käsityötaito, nopeampi tahti.
                </p>
                <p className="mt-8 text-lg font-semibold text-text md:text-xl">
                  Tule mukaan rakentamaan. Me hoidamme rungon.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/tehdas/elementtituotanto/IMG_4225.webp"
                alt="Hietakulman tarina"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section background="gray">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold mb-10 text-center" style={{ lineHeight: '1.2' }}>
            Miksi Hietakulma?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Kokonaispalvelu',
              description: 'Yksi toimittaja, yksi vastuu. Hoidamme suunnittelun, valmistuksen ja toimituksen — sinä keskityt rakentamiseen.',
            },
            {
              title: 'Tehdaslaatu',
              description: 'Elementit syntyvät katettuna, mittatarkasti ja sääolosuhteista riippumatta. Laatu on sama joka kerta, joka kohteessa.',
            },
            {
              title: 'Joustavuus',
              description: 'Vakioratkaisu tai täysin räätälöity — toteutamme molemmat. Joustavuus näkyy myös aikatauluissa: reagoimme nopeasti muuttuviin tilanteisiin.',
            },
            {
              title: 'Energiatehokkuus',
              description: 'Elementtimme voidaan toteuttaa HUNTON-puukuitueristeellä ja -tuulensuojalevyllä — luonnonmukainen, hengittävä ja energiatehokas valinta, joka sopii vaativimpaankin rakentamiseen.',
            },
          ].map((card, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div
                className="bg-white rounded-lg p-6 md:p-8 shadow-sm text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section background="sand">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-extrabold mb-12 text-text" style={{ lineHeight: '1.1' }}>
              Tuotteemme
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <ProductCircles products={homepageContent.products} />
        </FadeIn>
      </Section>
    </>
  );
}
