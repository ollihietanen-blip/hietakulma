import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    href?: string;
    meta?: string;
    rotate?: number;
    imagePosition?: string;
  }>;
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'references';
}

export default function ImageGallery({ images, columns = 3, variant = 'default' }: ImageGalleryProps) {
  const isReferences = variant === 'references';
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid', gridCols[columns], isReferences ? 'gap-3 md:gap-4' : 'gap-6')}>
      {images.map((image, index) => {
        const imageElement = (
          <div
            className="absolute inset-0"
            style={image.rotate ? {
              transform: image.rotate === 90
                ? 'rotate(90deg) scale(1.36)'
                : `rotate(${image.rotate}deg)`,
              transformOrigin: 'center center',
            } : undefined}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={cn(
                'object-cover transition-transform duration-500 ease-out',
                isReferences ? 'group-hover:scale-[1.035]' : 'group-hover:scale-110'
              )}
              style={{ objectPosition: image.imagePosition ?? 'center' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        );

        const content = (
          <div className={cn(
            'relative group overflow-hidden',
            isReferences ? 'bg-[var(--dark)] shadow-sm' : 'rounded-lg'
          )}>
            <div className="relative aspect-[4/3] overflow-hidden">
              {imageElement}
              {isReferences && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-black/0 transition-colors duration-300 group-hover:from-black/88 group-hover:via-black/12" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                </>
              )}
            </div>
            {image.title && (
              <div className={cn(
                'absolute bottom-0 left-0 right-0 text-white',
                isReferences ? 'p-4 sm:p-5' : 'bg-black/70 p-4'
              )}>
                {isReferences && (
                  <span className="mb-2 block h-px w-10 bg-[var(--blue)] transition-all duration-300 group-hover:w-16" />
                )}
                {image.meta && (
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/76 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    {image.meta}
                  </p>
                )}
                <h3 className={cn(
                  'font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]',
                  isReferences
                    ? 'text-base sm:text-lg leading-tight tracking-[0.01em]'
                    : 'text-lg'
                )}>
                  {image.title}
                </h3>
              </div>
            )}
          </div>
        );

        return image.href ? (
          <Link
            key={index}
            href={image.href}
            className={cn(
              'block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2',
              isReferences && 'transition-transform duration-300 hover:-translate-y-0.5'
            )}
          >
            {content}
          </Link>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </div>
  );
}
