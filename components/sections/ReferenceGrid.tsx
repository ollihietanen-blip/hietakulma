import Image from 'next/image';
import Link from 'next/link';

interface ReferenceImage {
  src: string;
  alt: string;
  title: string;
  href?: string;
  /** Rotation in degrees for images that display upside down (e.g. 180) */
  rotate?: number;
}

interface ReferenceGridProps {
  images: ReferenceImage[];
}

export default function ReferenceGrid({ images }: ReferenceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" style={{ gap: '16px' }}>
      {images.map((image, index) => {
        const content = (
          <div
            className="relative aspect-square overflow-hidden group cursor-pointer"
            style={{ borderRadius: '0' }}
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={image.rotate ? {
                transform: image.rotate === 90
                  ? 'rotate(90deg) scale(1.5)'
                  : `rotate(${image.rotate}deg)`,
                transformOrigin: 'center center',
              } : undefined}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute top-4 left-4">
              <span className="text-white text-sm font-medium uppercase tracking-wide drop-shadow-lg">
                {image.title}
              </span>
            </div>
          </div>
        );

        return image.href ? (
          <Link key={index} href={image.href} className="block">
            {content}
          </Link>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </div>
  );
}
