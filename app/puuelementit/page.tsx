import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';

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
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">VERHOUSVAIHTOEHDOT</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Vaakapanelointi</li>
              <li>Pystypanelointi</li>
              <li>Pysty-vaaka-pystypanelointi</li>
              <li>Lomalaudoitus</li>
              <li>Rapattu pinnoite</li>
            </ul>
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

