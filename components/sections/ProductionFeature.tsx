import Image from 'next/image';

interface ProductionFeatureProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  imagePosition?: string;
}

export default function ProductionFeature({ title, description, image, alt, imagePosition = 'center' }: ProductionFeatureProps) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <h2 className="mb-6 text-2xl font-bold leading-tight md:text-3xl">{title}</h2>
        <p className="text-base leading-relaxed text-gray-700 md:text-lg">{description}</p>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: imagePosition }}
          sizes="(max-width: 767px) 100vw, (max-width: 1280px) 55vw, 680px"
        />
      </div>
    </div>
  );
}
