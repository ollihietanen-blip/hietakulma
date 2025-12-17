import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';

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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1745739487556-NEIPALA0AQZGO4UV9XZ8/unsplash-image-OLFA5DgSIFo.jpg"
              alt="Puutalot"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Suunnitelmasta valmiiksi kohteeksi</h2>
            <p className="text-lg text-gray-700 mb-4">
              Ymmärrämme alustavia suunnitelmia yhtä luontevasti kuin valmiita
              rakennuspiirrustuksiakin. Suunnittelupöydällä ideasi jäsentyvät oivaltaviksi
              pohjaratkaisuiksi ja tyyllikkäiksi kohteiksi nykyaikaista ja toimintavarmaa
              talotekniikkaa unohtamatta.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Tämän lisäksi tunnemme rakennustyömaat kuin oman tehtaamme ja kykenemme siksi
              ottamaan työmaatyöskentelyn realiteetit huomioon niin suunnittelu- kuin
              tuotantovaiheessakin. Ammattimainen yhteistyö rakentajien ja urakoitsijoiden
              kanssa takaa sen, että lopputuloksena syntyy puutalo, joka kestää niin aikaa kuin
              arkeakin.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">PROSESSIKAAVIO</h3>
              <p className="text-sm text-gray-600">
                Suunnittelu → Valmistus → Toimitus → Asennus
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Hietakulman tarina</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Hietakulma Oy on kankaanpääläinen perheyritys, joka on erikoistunut
            puuelementtitalojen ja kattoristikoiden tuotantoon. Suunnittelemme, valmistamme ja
            toimitamme puutaloja ja kattoristikoita sekä yritys- että yksityisasiakkaillemme
            ympäri Suomen.
          </p>
          <Button href="/tarina" variant="primary">
            TUTUSTU TARINAAMME
          </Button>
        </div>
      </Section>
    </>
  );
}

