'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Product } from '@/types/content';

interface ProductCirclesProps {
  products: Product[];
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Katto */}
      <path d="M50 12L8 50H92L50 12Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Piippu */}
      <path d="M68 42V22H76V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Seinät */}
      <path d="M16 50V90H84V50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ovi */}
      <rect x="38" y="64" width="24" height="26" rx="1" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Vasen ikkuna */}
      <rect x="22" y="58" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Oikea ikkuna */}
      <rect x="66" y="58" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function ElementIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Seinäelementin etupinta */}
      <path d="M10 30L10 92L58 92L58 30Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Yläsärmä – syvyys */}
      <path d="M10 30L34 14L82 14L58 30" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Oikea särmä – syvyys */}
      <path d="M58 30L82 14L82 76L58 92" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Ikkuna-aukko etupinnassa */}
      <rect x="23" y="50" width="22" height="20" rx="1" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function TrussIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pääkolmio */}
      <path d="M50 18L8 78H92L50 18Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Alapaarre */}
      <line x1="8" y1="78" x2="92" y2="78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Harjapilari */}
      <line x1="50" y1="18" x2="50" y2="78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* V-tuet */}
      <path d="M29 48L50 78L71 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Vaakatuki */}
      <line x1="29" y1="48" x2="71" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const icons = [HouseIcon, ElementIcon, TrussIcon];

export default function ProductCircles({ products }: ProductCirclesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-4 sm:px-0">
      {products.map((product, index) => {
        const Icon = icons[index];
        return (
          <ScrollReveal key={product.id} delay={index * 0.15} direction="up">
            <div className="text-center">
              <motion.a
                href={product.link}
                className="group mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center product-circle cursor-pointer"
                style={{ backgroundColor: 'var(--dark)', display: 'flex' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Icon className="product-icon transition-colors duration-300 text-[var(--blue)] group-hover:text-white" />
              </motion.a>
              <p className="text-text mb-4 sm:mb-6 text-sm md:text-base leading-relaxed px-2" style={{ minHeight: '60px' }}>
                {product.description}
              </p>
              <Button
                href={product.link}
                variant="outline"
                className="border border-text text-text hover:bg-muted px-5 py-2.5 sm:px-6 sm:py-3 transition-all uppercase text-xs sm:text-sm tracking-wide w-full sm:w-auto"
                style={{ borderColor: 'var(--text)', borderRadius: '8px', height: '44px' }}
              >
                {product.title.toUpperCase()}
              </Button>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
