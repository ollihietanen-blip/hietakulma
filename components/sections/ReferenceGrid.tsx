import Image from 'next/image';

interface ReferenceImage {
  src: string;
  alt: string;
  title: string;
}

interface ReferenceGridProps {
  images: ReferenceImage[];
}

export default function ReferenceGrid({ images }: ReferenceGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-square overflow-hidden group cursor-pointer"
          style={{ borderRadius: '0' }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="text-white text-xs sm:text-sm font-medium uppercase tracking-wide drop-shadow-lg">
              {image.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

