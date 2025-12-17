import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
  title?: string;
  href?: string;
}

export default function Card({
  children,
  className,
  image,
  imageAlt,
  title,
  href,
}: CardProps) {
  const content = (
    <div className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}>
      {image && (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={imageAlt || title || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-90 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}

