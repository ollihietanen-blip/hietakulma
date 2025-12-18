import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'dark' | 'sand';
  fullWidth?: boolean;
  id?: string;
}

export default function Section({
  children,
  className,
  background = 'white',
  fullWidth = false,
  id,
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-muted',
    dark: 'bg-dark text-white',
    sand: '',
  };

  const sectionStyle = background === 'sand' ? { backgroundColor: '#F8E0C7' } : undefined;

  return (
    <section id={id} className={cn(backgrounds[background], className)} style={sectionStyle}>
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16', !fullWidth && 'max-w-7xl')}>
        {children}
      </div>
    </section>
  );
}

