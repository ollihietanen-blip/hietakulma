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
      <Section background="sand">
        <FadeIn>
          <div className="grid lg:grid-cols-[0.9fr_1.5fr] gap-10 lg:gap-16 items-start text-text">
            <div>
              <h2
                className="font-extrabold mb-6 text-text"
                style={{ lineHeight: '1.08', fontSize: 'clamp(38px, 4vw, 52px)' }}
              >
                {homepageContent.projects.title}
              </h2>
              <p className="text-xl md:text-2xl font-extrabold mb-5 text-text">
                {homepageContent.projects.subtitle}
              </p>
              <p className="text-text ingress">
                {homepageContent.projects.description}
              </p>
            </div>
            <ol className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {homepageContent.projects.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="border-t-2 pt-5"
                  style={{ borderColor: 'rgba(35, 32, 33, 0.78)' }}
                >
                  <span className="block text-sm font-bold mb-4" style={{ color: 'var(--blue)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-extrabold mb-3 text-text" style={{ lineHeight: '1.1' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-text">
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
