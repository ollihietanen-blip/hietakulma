import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ImageGallery from '@/components/sections/ImageGallery';
import ProductShowcase from '@/components/sections/ProductShowcase';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { homepageContent } from '@/lib/content/homepage';

export default function Home() {
  return (
    <>
      <Hero
        title={homepageContent.hero.title}
        subtitle={homepageContent.hero.subtitle}
        backgroundImage={homepageContent.hero.backgroundImage}
        ctaText={homepageContent.hero.ctaText}
        ctaLink={homepageContent.hero.ctaLink}
      />

      <Section background="white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{homepageContent.projects.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {homepageContent.projects.description}
          </p>
        </div>
        <ImageGallery images={homepageContent.projects.images} columns={3} />
        <div className="text-center mt-12">
          <Button href="/kohteet" variant="outline">
            Katso kaikki kohteet
          </Button>
        </div>
      </Section>

      <Section background="gray">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{homepageContent.story.title}</h2>
            <p className="text-lg text-gray-700 mb-8">{homepageContent.story.description}</p>
            <Button href={homepageContent.story.ctaLink} variant="primary">
              {homepageContent.story.ctaText}
            </Button>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={homepageContent.story.image}
              alt="Hietakulman tarina"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <Section background="white">
        <ProductShowcase
          products={homepageContent.products}
          title="Tuotteemme"
          description="Laadukkaita ratkaisuja puurakentamiseen"
        />
      </Section>
    </>
  );
}
