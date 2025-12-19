import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ProcessFlow from '@/components/sections/ProcessFlow';
import StoryBlock from '@/components/sections/StoryBlock';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Puutalot - Hietakulma Oy',
  description:
    'Toimitamme puuelementit rivi-, pari- ja omakotitaloista aina useamman kohteen alueiksi saakka.',
};

export default function PuutalotPage() {
  return (
    <>
      <Hero
        title="Puutalot kokemuksella"
        subtitle="Toimitamme puuelementit rivi-, pari- ja omakotitaloista aina useamman kohteen alueiksi saakka. Monipuolisista runko- ja verhousvaihtoehdoista syntyy juuri toiveidesi mukainen toimiva ja tyylikäs kokonaisuus."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="white" id="content">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold mb-6 text-center" style={{ lineHeight: '1.2' }}>
            Suunnitelmasta valmiiksi kohteeksi
          </h2>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1745739487556-NEIPALA0AQZGO4UV9XZ8/unsplash-image-OLFA5DgSIFo.jpg"
              alt="Puutalot"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Ymmärrämme alustavia suunnitelmia yhtä luontevasti kuin valmiita
              rakennuspiirrustuksiakin. Suunnittelupöydällä ideasi jäsentyvät oivaltaviksi
              pohjaratkaisuiksi ja tyyllikkäiksi kohteiksi nykyaikaista ja toimintavarmaa
              talotekniikkaa unohtamatta.
            </p>
            <p className="text-lg text-gray-700">
              Tämän lisäksi tunnemme rakennustyömaat kuin oman tehtaamme ja kykenemme siksi
              ottamaan työmaatyöskentelyn realiteetit huomioon niin suunnittelu- kuin
              tuotantovaiheessakin. Ammattimainen yhteistyö rakentajien ja urakoitsijoiden
              kanssa takaa sen, että lopputuloksena syntyy puutalo, joka kestää niin aikaa kuin
              arkeakin.
            </p>
          </div>
        </div>
      </Section>

      <Section background="white">
        <ProcessFlow
          steps={[
            {
              number: 1,
              title: 'TONTTI JA LUONNOS',
              description: 'Tontin valinta ja alustavat suunnitelmat.',
            },
            {
              number: 2,
              title: 'SUUNNITTELU JA LUVAT',
              description: 'Arkkitehti- ja rakennesuunnittelu sekä lupaprosessi.',
            },
            {
              number: 3,
              title: 'BUDJETOINTI',
              description: 'Kustannuslaskenta ja rahoitusratkaisut.',
            },
            {
              number: 4,
              title: 'VALMISTUS',
              description: 'Elementtien valmistus tehtaalla ja asennus.',
            },
            {
              number: 5,
              title: 'LUOVUTUS',
              description: 'Kohteen luovutus ja myynnin tuki.',
            },
          ]}
        />
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

