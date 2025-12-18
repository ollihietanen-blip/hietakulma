import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ReferenceGrid from '@/components/sections/ReferenceGrid';
import StoryBlock from '@/components/sections/StoryBlock';
import ProductCircles from '@/components/sections/ProductCircles';
import ContactSection from '@/components/sections/ContactSection';
import { homepageContent } from '@/lib/content/homepage';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={homepageContent.hero.title}
        subtitle={homepageContent.hero.subtitle}
        backgroundImage={homepageContent.hero.backgroundImage}
        ctaText={homepageContent.hero.ctaText}
        ctaLink={homepageContent.hero.ctaLink}
      />

      {/* Talosta kodiksi */}
      <Section background="white">
        <div className="text-center mb-12">
          <h2 className="font-extrabold mb-6 text-text" style={{ lineHeight: '1.1' }}>
            {homepageContent.projects.title}
          </h2>
          <p className="text-text max-w-2xl mx-auto ingress">
            {homepageContent.projects.description}
          </p>
        </div>
        <ReferenceGrid images={homepageContent.projects.images} />
      </Section>

      {/* Hietakulman tarina */}
      <StoryBlock
        title={homepageContent.story.title}
        description={homepageContent.story.description}
        ctaText={homepageContent.story.ctaText}
        ctaLink={homepageContent.story.ctaLink}
      />

      {/* Tuotteemme */}
      <Section background="white">
        <div className="text-center mb-12">
          <h2 className="font-extrabold mb-12 text-text" style={{ lineHeight: '1.1' }}>
            Tuotteemme
          </h2>
        </div>
        <ProductCircles products={homepageContent.products} />
      </Section>

      {/* Ota yhteyttä */}
      <ContactSection />
    </>
  );
}
