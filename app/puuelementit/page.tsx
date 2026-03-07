import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import StoryBlock from '@/components/sections/StoryBlock';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Puuelementit - Hietakulma Oy',
  description:
    'Puuelementeistä rakentaminen on nykyaikainen ja kustannustehokas toteutustapa.',
};

export default function PuuelementitPage() {
  return (
    <>
      <Hero
        title="Puuelementit kokemuksella"
        subtitle="Toimitamme puuelementit rivi-, pari- ja omakotitaloista aina useamman kohteen alueiksi saakka. Monipuolisista runko- ja verhousvaihtoehdoista syntyy juuri toiveidesi mukainen toimiva ja tyylikäs kokonaisuus."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="white" id="content">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">Turvallisuudesta ja laadusta tinkimättä</h2>
            <p className="text-lg text-gray-700 mb-4">
              Puuelementeistä rakentaminen on nykyaikainen ja kustannustehokas toteutustapa, joka
              mahdollistaa tyylikkään ja energiatehokkaan lopputuloksen tilanteessa kuin
              tilanteessa. Sekä pohjaratkaisu että ulkoverhoilu ovat mukautettavissa tapauskohtaisesti
              vastamaan toiveitasi turvallisuudesta ja laadusta tinkimättä.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Toimituksemme sisältyy kantavien rakenteiden lujuuslaskelmat sekä elementtien että
              kattoristikoiden osalta. Ulkoseinän rakenteet suunnitellaan täyttäämään määräykset ja
              rungot rakennetaan CE-merkistystä, lujuuslajitellusta kuusesta.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1745739487556-NEIPALA0AQZGO4UV9XZ8/unsplash-image-OLFA5DgSIFo.jpg"
              alt="Puuelementit"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Ammattitaidolla viimeistelty</h2>
          <p className="text-lg text-gray-700 mb-6">
            Ulkoverhoiluvaihtoehtoja on useita: vaakapanelointi, pystypanelointi,
            pysty-vaaka-pystypanelointi sekä lomalaudoitus. Ulkoverhous on myös mahdollista tilata
            valmiiksi maalattuna. Paneelit tilataan homeenestokäsiteltynä sekä pohja- ja
            pintamaalattuna minkä jälkeen maalaamme ne valmiiksi tehtaallaamme. Ulko-, sisä- ja
            väliseinäelementteihin on myös mahdollista asentaa sähkörasiat ja putkitukset valmiiksi
            toimittamiesi piirrustusten mukaan. Rasiat ja putkitukset voidaan asentaa joko elementin
            sisä- tai ulkopuolelle.
          </p>
          <div className="mt-8">
            <h3 className="font-bold text-2xl mb-8">VERHOUSVAIHTOEHDOT</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Vaakapanelointi', image: '/vaakapanelointi.jpg' },
                { name: 'Pystypanelointi', image: '/Pystypanelointi.jpg' },
                { name: 'Pysty-vaaka-pystypanelointi', image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg' },
                { name: 'Lomalaudoitus', image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg' },
                { name: 'Rapattu pinnoite', image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg' },
              ].map((option) => (
                <div key={option.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
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
                    <p className="font-semibold text-text">{option.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

