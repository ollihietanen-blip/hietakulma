import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ReferenceGrid from '@/components/sections/ReferenceGrid';
import StoryBlock from '@/components/sections/StoryBlock';
import ProductCircles from '@/components/sections/ProductCircles';
import FadeIn from '@/components/ui/FadeIn';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Hietakulma Oy — Puutalot, puuelementit ja kattoristikot Kankaanpäästä',
  description: 'Suunnittelemme ja valmistamme tehdasvalmisteisia puutaloja, puuelementtejä ja CE-merkittyjä kattoristikoita yli 30 vuoden kokemuksella. Pyydä tarjous!',
};

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
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-extrabold mb-6 text-text" style={{ lineHeight: '1.1' }}>
              {homepageContent.projects.title}
            </h2>
            <p className="text-text max-w-2xl mx-auto ingress">
              {homepageContent.projects.description}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <ReferenceGrid images={homepageContent.projects.images} />
        </FadeIn>
      </Section>

      {/* Hietakulman tarina */}
      <StoryBlock
        title={homepageContent.story.title}
        description={homepageContent.story.description}
        ctaText={homepageContent.story.ctaText}
        ctaLink={homepageContent.story.ctaLink}
      />

      {/* Tuotteemme */}
      <Section background="sand" id="tuotteemme">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-extrabold mb-12 text-text" style={{ lineHeight: '1.1' }}>
              Tuotteemme
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <ProductCircles products={homepageContent.products} />
        </FadeIn>
      </Section>
    </>
  );
}
