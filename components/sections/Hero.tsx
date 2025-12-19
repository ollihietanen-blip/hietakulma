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
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeIn">
        <h1 className="font-extrabold text-white mb-6 leading-tight whitespace-pre-line" style={{ lineHeight: '1.05', fontWeight: 900, color: '#F8E0C7' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-white mb-8 max-w-2xl mx-auto leading-relaxed ingress">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            href="/kohteet"
            variant="outline"
            className="border-2 text-white hover:bg-white/10 px-6 py-3 transition-all"
            style={{ borderColor: '#F8E0C7', borderRadius: '0', color: '#F8E0C7', boxSizing: 'content-box' }}
          >
            KOHTEEMME
          </Button>
          <Button
            href="/tarina"
            variant="outline"
            className="border-2 text-white hover:bg-white/10 px-6 py-3 transition-all"
            style={{ borderColor: '#F8E0C7', borderRadius: '0', color: '#F8E0C7', boxSizing: 'content-box' }}
          >
            TARINAMME
          </Button>
          <Button
            href="#tuotteemme"
            variant="outline"
            className="border-2 text-white hover:bg-white/10 px-6 py-3 transition-all"
            style={{ borderColor: '#F8E0C7', borderRadius: '0', color: '#F8E0C7', boxSizing: 'content-box' }}
          >
            TUOTTEEMME
          </Button>
        </div>
      </div>
    </section>
  );
}

