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
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Harjakatto */}
      <polygon points="40,8 8,35 72,35" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none" />
      {/* Seinät */}
      <rect x="14" y="35" width="52" height="37" stroke="currentColor" strokeWidth="3" fill="none" />
      {/* Ovi */}
      <rect x="32" y="48" width="16" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Ikkunat */}
      <rect x="20" y="42" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="50" y="42" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function ElementIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pinotut puuelementit / seinäelementit */}
      {/* Alin elementti */}
      <rect x="10" y="56" width="60" height="14" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="30" y1="56" x2="30" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="56" x2="50" y2="70" stroke="currentColor" strokeWidth="1.5" />
      {/* Keskimmäinen elementti */}
      <rect x="10" y="38" width="60" height="14" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="25" y1="38" x2="25" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="38" x2="40" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <line x1="55" y1="38" x2="55" y2="52" stroke="currentColor" strokeWidth="1.5" />
      {/* Ylin elementti */}
      <rect x="10" y="20" width="60" height="14" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="30" y1="20" x2="30" y2="34" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="20" x2="50" y2="34" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function TrussIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Kattoristikon ulkomuoto - kolmio */}
      <polygon points="40,10 6,62 74,62" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none" />
      {/* Alapalkki */}
      <line x1="6" y1="62" x2="74" y2="62" stroke="currentColor" strokeWidth="3" />
      {/* Pystytuki keskellä */}
      <line x1="40" y1="10" x2="40" y2="62" stroke="currentColor" strokeWidth="2.5" />
      {/* Vinotuki vasen */}
      <line x1="23" y1="36" x2="23" y2="62" stroke="currentColor" strokeWidth="2" />
      {/* Vinotuki oikea */}
      <line x1="57" y1="36" x2="57" y2="62" stroke="currentColor" strokeWidth="2" />
      {/* Vaakatuki */}
      <line x1="23" y1="36" x2="57" y2="36" stroke="currentColor" strokeWidth="2" />
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
