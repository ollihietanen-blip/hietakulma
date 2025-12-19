import Button from '@/components/ui/Button';
import { Product } from '@/types/content';

interface ProductCirclesProps {
  products: Product[];
}

export default function ProductCircles({ products }: ProductCirclesProps) {
  const letters = ['P', 'E', 'R'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-4 sm:px-0">
      {products.map((product, index) => (
        <div key={product.id} className="text-center">
          <div
            className="mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center product-circle"
            style={{ backgroundColor: 'var(--dark)' }}
          >
            <span
              className="font-black product-letter"
              style={{ color: 'var(--blue)', fontWeight: 900 }}
            >
              {letters[index]}
            </span>
          </div>
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
      ))}
    </div>
  );
}

