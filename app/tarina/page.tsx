import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ProductShowcase from '@/components/sections/ProductShowcase';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Tarina - Hietakulma Oy',
  description:
    'Hietakulman puutalot, -elementit ja kattoristikot suunnitellaan ja rakennetaan tehtaallamme Kankaanpäässä 30 vuoden kokemuksella.',
};

export default function TarinaPage() {
  return (
    <>
      <Hero
        title="Hietakulman tarina"
        subtitle="Hietakulman puutalot, -elementit ja kattoristikot suunnitellaan ja rakennetaan tehtaallamme Kankaanpäässä 30 vuoden kokemuksella kustannustehokkaasti, ammattitaidolla ja aina laadusta tinkimättä."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="white" id="content">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1745739487556-NEIPALA0AQZGO4UV9XZ8/unsplash-image-OLFA5DgSIFo.jpg"
              alt="Hietakulman tarina"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Puurakentamisen erikoisosaaja</h2>
            <p className="text-lg text-gray-700 mb-4">
              Hietakulma Oy on kankaanpääläinen perheyritys, joka on erikoistunut
              puuelementtitalojen ja kattoristikoiden tuotantoon. Suunnittelemme, valmistamme ja
              toimitamme puutaloja ja kattoristikoita sekä yritys- että yksityisasiakkaillemme
              ympäri Suomen.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Olemme erikoistuneet yritysyhteistyöhön ammattirakentajien kanssa ja pystymme
              toimittamaan laadukkaat ratkaisut rivi-, pari- ja omakotitaloista aina useamman
              kohteen alueiksi saakka. Kokenut ja ammattitaitoinen tiimimme on valmiina toimimaan
              niin alustavien ideoiden kuin valmiiden suunnitelmienkin pohjalta.
            </p>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <ProductShowcase
          products={homepageContent.products}
          title="Tuotteemme"
          description="Laadukkaita ratkaisuja puurakentamiseen"
        />
      </Section>
    </>
  );
}

