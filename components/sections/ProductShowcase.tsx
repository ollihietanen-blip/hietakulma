import { Product } from '@/types/content';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProductShowcaseProps {
  products: Product[];
  title?: string;
  description?: string;
}

export default function ProductShowcase({
  products,
  title,
  description,
}: ProductShowcaseProps) {
  return (
    <div className="py-16">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {description && <p className="text-xl text-gray-600">{description}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            imageAlt={product.title}
            href={product.link}
          >
            <p className="text-gray-600 mb-4">{product.description}</p>
            <Button href={product.link} variant="outline" className="w-full">
              Lue lisää
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

