import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ProductCircles from '@/components/sections/ProductCircles';
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
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text" style={{ lineHeight: '1.1' }}>Puurakentamisen erikoisosaaja</h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Hietakulma Oy on kankaanpääläinen puurakentamisen asiantuntija. Suunnittelemme, valmistamme ja toimitamme puuelementtiratkaisuja ja kattoristikoita ammattirakentajille ja rakennuttajille ympäri Suomen.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Erikoisosaamisemme on As Oy -mittakaavan rivi- ja paritalohankkeissa sekä toistettavissa runko- ja elementtiratkaisuissa. Toimimme luotettavana kumppanina hankkeissa, joissa korostuvat aikataulut, laatu ja kokonaisuuden hallinta.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kokenut tiimimme työskentelee joustavasti niin luonnossuunnitelmien kuin valmiiden piirustusten pohjalta.
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1745739487556-NEIPALA0AQZGO4UV9XZ8/unsplash-image-OLFA5DgSIFo.jpg"
              alt="Hietakulman tarina"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <Section background="sand">
        <div className="text-center mb-12">
          <h2 className="font-extrabold mb-12 text-text" style={{ lineHeight: '1.1' }}>
            Tuotteemme
          </h2>
        </div>
        <ProductCircles products={homepageContent.products} />
      </Section>
    </>
  );
}

