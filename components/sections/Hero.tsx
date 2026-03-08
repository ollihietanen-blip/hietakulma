import Image from 'next/image';
import Button from '@/components/ui/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  altText?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
  altText,
}: HeroProps) {
  return (
    <section className="relative w-full flex items-center justify-center hero-section">
      {backgroundImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={backgroundImage}
            alt={altText || title}
            fill
            className="object-cover animate-kenBurns"
            priority
            sizes="100vw"
          />
          {/* Radial gradient overlay for more depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>
      )}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto animate-fadeIn py-12 sm:py-16 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight whitespace-pre-line" style={{ lineHeight: '1.05', fontWeight: 900, color: '#F8E0C7' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-white mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg ingress px-2">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 px-4 sm:px-0">
          <Button
            href="/ota-yhteytta"
            variant="ghost"
            className="px-6 py-3 text-sm sm:text-base font-bold w-[240px] transition-colors duration-300"
            style={{ borderRadius: '0' }}
          >
            PYYDÄ TARJOUS
          </Button>
          <Button
            href="/kohteet"
            variant="ghost"
            className="px-6 py-3 text-sm sm:text-base font-bold w-[240px] transition-colors duration-300"
            style={{ borderRadius: '0' }}
          >
            TUTUSTU KOHTEISIIMME
          </Button>
        </div>
      </div>
    </section>
  );
}

