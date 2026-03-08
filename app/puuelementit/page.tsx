import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import StoryBlock from '@/components/sections/StoryBlock';
import WallStructureTable from '@/components/sections/WallStructureTable';
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
                { name: 'Vaakapanelointi', image: '/vaakapanelointi.jpg', description: 'Perinteinen ja ajaton valinta. UTW-profiili 28\u00d7195 mm, tehdasmaalattu kolmeen kertaan.' },
                { name: 'Pystypanelointi', image: '/Pystypanelointi.jpg', description: 'Moderni ja ryhdik\u00e4s ilme. Sopii erityisesti nykyaikaiseen arkkitehtuuriin.' },
                { name: 'Pysty-vaaka-pystypanelointi', image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg', description: 'El\u00e4v\u00e4 ja persoonallinen julkisivu, joka yhdist\u00e4\u00e4 molempien suuntien parhaat puolet.' },
                { name: 'Lomalaudoitus', image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg', description: 'Luonnollinen ja perinteinen. Antaa julkisivulle el\u00e4v\u00e4n tekstuurin.' },
                { name: 'Rapattu pinnoite', image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg', description: 'Kivitalomainen ilme puurakenteella. Moderni ja huoltovapaa vaihtoehto.' },
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
                    <p className="font-semibold text-text mb-2">{option.name}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

