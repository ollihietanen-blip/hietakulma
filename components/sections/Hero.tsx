import Image from 'next/image';
import Button from '@/components/ui/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
}: HeroProps) {
  return (
    <section className="relative w-full flex items-center justify-center hero-section">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black" style={{ opacity: 0.45 }} />
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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8 px-4 sm:px-0">
          <Button
            href="/kohteet"
            variant="outline"
            className="border-2 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:bg-blue hover:border-blue hover:text-white w-[200px] sm:w-[180px] opacity-70 hover:opacity-100 hover:-translate-y-0.5"
            style={{ borderColor: '#F8E0C7', borderRadius: '0', color: '#F8E0C7', boxSizing: 'content-box' }}
          >
            KOHTEEMME
          </Button>
          <Button
            href="/tarina"
            variant="outline"
            className="border-2 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:bg-blue hover:border-blue hover:text-white w-[200px] sm:w-[180px] opacity-70 hover:opacity-100 hover:-translate-y-0.5"
            style={{ borderColor: '#F8E0C7', borderRadius: '0', color: '#F8E0C7', boxSizing: 'content-box' }}
          >
            TARINAMME
          </Button>
          <Button
            href="#tuotteemme"
            variant="outline"
            className="border-2 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:bg-blue hover:border-blue hover:text-white w-[200px] sm:w-[180px] opacity-70 hover:opacity-100 hover:-translate-y-0.5"
            style={{ borderColor: '#F8E0C7', borderRadius: '0', color: '#F8E0C7', boxSizing: 'content-box' }}
          >
            TUOTTEEMME
          </Button>
        </div>
      </div>
    </section>
  );
}

