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
    <svg className={className} viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 2) scale(0.8)">
        <path d="M3 36L50 3L97 36V87H3V36Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M20 87V50H80V87" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="38" y="62" width="24" height="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M85 12V28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function ElementIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0, 5) scale(0.9)">
        <path d="M5 65L85 85L95 75L15 55L5 65Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M5 75L85 95L95 85L15 65L5 75Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M25 5L85 20V75L25 60V5Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="45" y="25" width="25" height="30" transform="skewY(15)" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

function TrussIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0, 0) scale(0.9)">
        <path d="M5 55L55 5L105 55H5Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M55 5V55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 30L55 55L80 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M5 55H105" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
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
