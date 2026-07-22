import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/ui/FadeIn';
import { getKohdeBySlug, getAllKohdeSlugs, kohteet } from '@/lib/content/kohteet';

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

  const canonicalUrl = `https://hietakulma.fi/kohteet/${kohde.slug}`;
  const imageUrl = `https://hietakulma.fi${kohde.heroImage}`;
  const description = `${kohde.title}, ${kohde.location} — ${kohde.type}. ${kohde.description.slice(0, 140)}`;

  return {
    title: kohde.title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { type: 'article', locale: 'fi_FI', url: canonicalUrl, title: kohde.title, description, images: [{ url: imageUrl, alt: kohde.title }] },
    twitter: { card: 'summary_large_image', title: kohde.title, description, images: [imageUrl] },
  };
}

export default async function KohdePage({ params }: KohdePageProps) {
  const { slug } = await params;
  const kohde = getKohdeBySlug(slug);
  if (!kohde) notFound();

  const currentIndex = kohteet.findIndex((project) => project.slug === kohde.slug);
  const nextProject = kohteet[(currentIndex + 1) % kohteet.length];

  return (
    <>
      <Hero title={kohde.title} subtitle={kohde.subtitle} backgroundImage={kohde.heroImage} />

      <Section background="white" contentClassName="py-14 md:py-24">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue">Kohde lyhyesti</p>
              <dl className="mt-6 border-t border-black/15">
                {[
                  ['Kohdetyyppi', kohde.type],
                  ['Sijainti', kohde.location],
                  ['Valmistunut', kohde.year],
                  ['Asiakas', kohde.customerType],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-black/15 py-4 text-sm">
                    <dt className="font-semibold text-gray-500">{label}</dt>
                    <dd className="font-semibold text-text">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="text-xl font-medium leading-relaxed text-text md:text-2xl md:leading-relaxed">{kohde.description}</p>
              <div className="mt-8 border-l-2 border-blue pl-5 md:mt-10 md:pl-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Hietakulman toimitus</p>
                <p className="text-base font-bold leading-relaxed text-text md:text-lg">{kohde.deliveryScope}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section background="sand" contentClassName="py-14 md:py-20">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-600">Miksi tämä kohde on mukana?</p>
              <h2 className="text-3xl font-extrabold leading-[1.06] text-text md:text-4xl">Referenssiarvo</h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700 md:text-lg">{kohde.referenceReason}</p>
            </div>
            <div className="border-t border-black/30 pt-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-600">Perustiedot</p>
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {kohde.facts?.map((fact) => (
                  <li key={fact} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-blue" aria-hidden="true" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </Section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex items-end justify-between gap-6 md:mb-12">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue">Kuvagalleria</p>
              <h2 className="text-3xl font-extrabold leading-[1.06] text-text md:text-5xl">Katso kohdetta lähempää.</h2>
            </div>
            <span className="hidden text-sm font-semibold text-gray-500 md:block">{String(kohde.galleryImages.length).padStart(2, '0')} kuvaa</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
            {kohde.galleryImages.map((image, index) => {
              const isWide = index === 0 || index % 5 === 0;
              return (
                <div key={image.src} className={`relative overflow-hidden bg-gray-100 ${isWide ? 'aspect-[16/9] md:col-span-12 md:aspect-[2/1]' : 'aspect-[4/3] md:col-span-6'}`}>
                  <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 hover:scale-[1.02]" sizes={isWide ? '100vw' : '(max-width: 768px) 100vw, 50vw'} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark">
        <Link href={`/kohteet/${nextProject.slug}`} className="group block min-h-[420px] md:min-h-[520px]">
          <Image src={nextProject.thumbnailImage} alt={nextProject.title} fill className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-[1.03]" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
          <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-end px-4 py-14 sm:px-6 md:min-h-[520px] md:py-20 lg:px-8">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue">Seuraava kohde · {nextProject.type}</p>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] text-white md:text-5xl">{nextProject.title}</h2>
              <span className="mt-7 inline-flex items-center gap-3 border-b border-white/60 pb-2 text-sm font-bold text-white transition-colors group-hover:border-blue group-hover:text-blue">TUTUSTU KOHTEESEEN <span aria-hidden="true">→</span></span>
            </div>
          </div>
        </Link>
      </section>

      <Section background="sand" contentClassName="py-14 md:py-20">
        <div className="flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-text md:text-4xl">Onko teillä vastaava hanke?</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">Kerro suunnitelmista — katsotaan yhdessä sopiva toimitussisältö.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button href="/kohteet" variant="light">KAIKKI KOHTEET</Button>
            <Button href="/ota-yhteytta" variant="primary">OTA YHTEYTTÄ</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
