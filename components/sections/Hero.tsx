import Image from 'next/image';
import Button from '@/components/ui/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaText?: string;
  ctaLink?: string;
  altText?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  ctaText,
  ctaLink,
  altText,
}: HeroProps) {
  return (
    <section className="hero-section relative -mt-[72px] flex w-full items-center justify-center pt-[72px]">
      {(backgroundImage || backgroundVideo) && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt={altText || title}
              fill
              className="object-cover animate-kenBurns"
              priority
              sizes="100vw"
            />
          )}
          {backgroundVideo && (
            <video
              className="absolute inset-0 hidden h-full w-full object-cover md:block motion-reduce:hidden"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={backgroundImage}
              aria-hidden="true"
            >
              <source
                src={backgroundVideo}
                type="video/mp4"
                media="(min-width: 768px) and (prefers-reduced-motion: no-preference)"
              />
            </video>
          )}
          {/* Radial gradient overlay for more depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-[1024px] px-4 py-12 text-center animate-fadeIn sm:px-6 sm:py-16 md:py-20">
        <h1 className="mx-auto mb-4 max-w-[980px] whitespace-pre-line text-3xl font-extrabold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-[clamp(64px,5.25vw,76px)]" style={{ lineHeight: '1', fontWeight: 900, color: '#F8E0C7' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-white mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg ingress px-2">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 px-4 sm:px-0">
          <Button
            href="/ota-yhteytta"
            variant="imagePrimary"
            className="w-full sm:w-auto min-w-[280px] whitespace-nowrap"
          >
            PYYDÄ TARJOUS
          </Button>
          <Button
            href={ctaLink || '/kohteet'}
            variant="image"
            className="w-full sm:w-auto min-w-[280px] whitespace-nowrap"
          >
            {ctaText || 'TUTUSTU KOHTEISIIN'}
          </Button>
        </div>
      </div>
    </section>
  );
}
