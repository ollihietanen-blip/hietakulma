import Button from '@/components/ui/Button';

interface StoryBlockProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function StoryBlock({ title, description, ctaText, ctaLink }: StoryBlockProps) {
  return (
    <section className="story-block-section py-12 sm:py-16" style={{ backgroundColor: 'var(--sand)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-text" style={{ lineHeight: '1.1', fontWeight: 900 }}>
          {title}
        </h2>
        <p className="text-text mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base ingress" style={{ maxWidth: '680px' }}>
          {description}
        </p>
        <Button
          href={ctaLink}
          variant="outline"
          className="border-2 border-text text-text hover:bg-text hover:text-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base transition-all w-full sm:w-auto"
          style={{ borderColor: 'var(--text)', borderRadius: '0' }}
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
}

