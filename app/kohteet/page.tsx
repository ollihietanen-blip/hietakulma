import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ImageGallery from '@/components/sections/ImageGallery';
import Button from '@/components/ui/Button';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Kohteet - Hietakulma Oy',
  description:
    'Toteutamme rivi-, pari- ja omakotitalot yhteistyössä ammattirakentajien kanssa.',
};

export default function KohteetPage() {
  return (
    <>
      <Hero
        title="Talosta kodiksi"
        subtitle="Toteutamme rivi-, pari- ja omakotitalot yhteistyössä ammattirakentajien kanssa yksittäisistä kohteista aina useamman kohteen alueiksi saakka. Kaikkia kohteita yhdistää asiakaslähtöinen suunnittelu ja kustannustehokas tuotanto – me teemme taloja joihin on helppoa asettua kodiksi."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
      />

      <Section background="white">
        <ImageGallery images={homepageContent.projects.images} columns={3} />
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

