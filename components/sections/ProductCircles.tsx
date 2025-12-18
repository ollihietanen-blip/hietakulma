import Button from '@/components/ui/Button';
import { Product } from '@/types/content';

interface ProductCirclesProps {
  products: Product[];
}

export default function ProductCircles({ products }: ProductCirclesProps) {
  const letters = ['P', 'E', 'R'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
      {products.map((product, index) => (
        <div key={product.id} className="text-center">
          <div
            className="mx-auto mb-6 rounded-full flex items-center justify-center product-circle"
            style={{ backgroundColor: 'var(--dark)' }}
          >
            <span
              className="font-black product-letter"
              style={{ color: 'var(--blue)', fontWeight: 900 }}
            >
              {letters[index]}
            </span>
          </div>
          <p className="text-text mb-6 text-sm md:text-base leading-relaxed" style={{ minHeight: '60px' }}>
            {product.description}
          </p>
          <Button
            href={product.link}
            variant="outline"
            className="border border-text text-text hover:bg-muted px-6 py-3 transition-all uppercase text-sm tracking-wide"
            style={{ borderColor: 'var(--text)', borderRadius: '8px', height: '44px' }}
          >
            {product.title.toUpperCase()}
          </Button>
        </div>
      ))}
    </div>
  );
}

