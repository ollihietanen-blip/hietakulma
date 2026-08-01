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
        backgroundVideo={homepageContent.hero.backgroundVideo}
        ctaText={homepageContent.hero.ctaText}
        ctaLink={homepageContent.hero.ctaLink}
      />

      {/* Talosta kodiksi */}
      <Section id="prosessi" background="sand" contentClassName="pb-16 pt-20 md:py-24">
        <div className="mx-auto mb-10 max-w-3xl text-center text-text md:mb-14">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
            {homepageContent.projects.subtitle}
          </p>
          <h2 className="mb-5 text-[2.15rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-text md:text-5xl">
            {homepageContent.projects.title}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-text/70 md:text-lg md:leading-8">
            {homepageContent.projects.description}
          </p>
        </div>
        <ol className="mx-auto grid max-w-6xl grid-cols-1 gap-3 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {homepageContent.projects.steps.map((step, index) => (
            <li key={step.title} className="px-4 py-5 md:px-5 md:py-6">
              <span className="mb-3 block text-3xl font-extrabold leading-none text-blue md:text-4xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-3 text-base font-bold leading-tight text-text md:text-lg">
                {step.title}
              </h3>
              <p className="mx-auto max-w-xs text-sm leading-6 text-text/65 md:text-[15px]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Toteutettuja kohteita */}
      <Section background="white" className="border-t border-black/10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-extrabold mb-6 text-text" style={{ lineHeight: '1.1' }}>
              {homepageContent.projects.referencesTitle}
            </h2>
            <p className="text-text max-w-2xl mx-auto ingress">
              {homepageContent.projects.referencesDescription}
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
