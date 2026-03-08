import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ImageGallery from '@/components/sections/ImageGallery';
import Button from '@/components/ui/Button';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Referenssit ja kohteet — Hietakulma Oy',
  description: 'Tutustu toteuttamiimme kohteisiin: omakotitaloja, rivitaloja ja asuinalueita ympäri Suomea. Yli 3 750 toimitettua kohdetta.',
};

export default function KohteetPage() {
  return (
    <>
      <Hero
        title="Talosta kodiksi"
        subtitle="Toteutamme rivi-, pari- ja omakotitalot yhteistyössä ammattirakentajien kanssa yksittäisistä kohteista aina useamman kohteen alueiksi saakka. Kaikkia kohteita yhdistää asiakaslähtöinen suunnittelu ja kustannustehokas tuotanto – me teemme taloja joihin on helppoa asettua kodiksi."
        backgroundImage="/images/hero/kirjavaisenkatu-drone-02.webp"
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

