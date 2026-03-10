import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ImageGallery from '@/components/sections/ImageGallery';
import Button from '@/components/ui/Button';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { kohteet } from '@/lib/content/kohteet';

export const metadata = {
  title: 'Referenssit ja kohteet — Hietakulma Oy',
  description: 'Tutustu toteuttamiimme kohteisiin: omakotitaloja, rivitaloja ja asuinalueita ympäri Suomea. Yli 3 750 toimitettua kohdetta.',
};

export default function KohteetPage() {
  const galleryImages = kohteet.map((k) => ({
    src: k.thumbnailImage,
    alt: k.title,
    title: k.title.toUpperCase(),
    href: `/kohteet/${k.slug}`,
  }));

  return (
    <>
      <Hero
        title="Talosta kodiksi"
        subtitle="Yli 3 750 toimitettua projektia — omakotitaloista rivitaloihin ja aluekohteisiin. Jokaisen takana on sama lupaus: asiakaslähtöinen suunnittelu, tehdasvalmistettu laatu ja toimitus ajallaan."
        backgroundImage="/images/hero/kirjavaisenkatu-drone-02.webp"
      />

      <Section background="sand">
        <KeyMetrics />
      </Section>

      <Section background="white">
        <ImageGallery images={galleryImages} columns={3} />
      </Section>

      <Section background="gray">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Hietakulman tarina</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Hietakulma syntyi Kankaanpäässä halusta tehdä puurakentaminen paremmin. Kolmen vuosikymmenen aikana olemme kasvaneet yhdeksi Suomen luotetuimmista puuelementtivalmistajista.
          </p>
          <Button href="/tarina" variant="primary">
            TUTUSTU TARINAAMME
          </Button>
        </div>
      </Section>
    </>
  );
}
