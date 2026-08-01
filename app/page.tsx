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
      <Section id="prosessi" background="sand" contentClassName="py-14 md:py-24">
        <FadeIn>
          <div className="grid items-start gap-12 text-text lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="max-w-xl">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
                {homepageContent.projects.subtitle}
              </p>
              <h2 className="mb-6 text-[2.15rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-text md:text-5xl">
                {homepageContent.projects.title}
              </h2>
              <p className="max-w-lg text-base leading-7 text-text/75 md:text-lg md:leading-8">
                {homepageContent.projects.description}
              </p>
            </div>
            <ol className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {homepageContent.projects.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="border-l border-black/20 pl-5 md:pl-6"
                >
                  <span className="mb-3 block text-[10px] font-bold tracking-[0.18em] text-blue">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mb-2.5 text-xl font-bold leading-tight tracking-[-0.02em] text-text">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-[15px] leading-6 text-text/70 md:text-base md:leading-7">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
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
