import Button from '@/components/ui/Button';

interface StoryBlockProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function StoryBlock({ title, description, ctaText, ctaLink }: StoryBlockProps) {
  return (
    <section className="story-block-section" style={{ backgroundColor: 'var(--sand)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-extrabold mb-6 text-text" style={{ lineHeight: '1.1', fontWeight: 900 }}>
          {title}
        </h2>
        <p className="text-text mb-8 max-w-2xl mx-auto leading-relaxed ingress" style={{ maxWidth: '680px' }}>
          {description}
        </p>
        <Button
          href={ctaLink}
          variant="outline"
          className="border-2 border-text text-text hover:bg-text hover:text-white px-8 py-3 transition-all"
          style={{ borderColor: 'var(--text)', borderRadius: '8px' }}
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
}

