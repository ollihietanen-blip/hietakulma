import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ImageGallery from '@/components/sections/ImageGallery';
import Button from '@/components/ui/Button';
import { getKohdeBySlug, getAllKohdeSlugs } from '@/lib/content/kohteet';

interface KohdePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllKohdeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: KohdePageProps): Promise<Metadata> {
  const { slug } = await params;
  const kohde = getKohdeBySlug(slug);
  if (!kohde) return { title: 'Kohde ei löydy' };

  return {
    title: `${kohde.title} — Hietakulma Oy`,
    description: `${kohde.title}, ${kohde.location} — ${kohde.type}. ${kohde.description.slice(0, 140)}`,
  };
}

export default async function KohdePage({ params }: KohdePageProps) {
  const { slug } = await params;
  const kohde = getKohdeBySlug(slug);
  if (!kohde) notFound();

  return (
    <>
      <Hero
        title={kohde.title}
        subtitle={kohde.subtitle}
        backgroundImage={kohde.heroImage}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <span className="px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 rounded">
              {kohde.location}
            </span>
            <span className="px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 rounded">
              {kohde.type}
            </span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {kohde.description}
          </p>
        </div>
      </Section>

      <Section background="gray">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Kuvagalleria
        </h2>
        <ImageGallery
          images={kohde.galleryImages.map((img) => ({
            src: img.src,
            alt: img.alt,
          }))}
          columns={3}
        />
      </Section>

      <Section background="white">
        <div className="text-center space-y-4">
          <Button href="/kohteet" variant="outline"
            className="border-2 border-text text-text hover:bg-text hover:text-white px-8 py-3"
            style={{ borderRadius: '0' }}>
            KAIKKI KOHTEET
          </Button>
        </div>
      </Section>

      <Section background="sand">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-text" style={{ lineHeight: '1.1' }}>
            Kiinnostuitko?
          </h2>
          <p className="text-text mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Ota yhteyttä ja kerro meille kohteestasi. Suunnittelemme ja toteutamme puutalosi avaimet käteen.
          </p>
          <Button
            href="/ota-yhteytta"
            variant="outline"
            className="border-2 border-text text-text hover:bg-text hover:text-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base transition-all w-full sm:w-auto"
            style={{ borderColor: 'var(--text)', borderRadius: '0' }}
          >
            OTA YHTEYTTÄ
          </Button>
        </div>
      </Section>
    </>
  );
}
