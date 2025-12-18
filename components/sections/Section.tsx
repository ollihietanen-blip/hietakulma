import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
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
  };

  return (
    <section id={id} className={cn(backgrounds[background], className)}>
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16', !fullWidth && 'max-w-7xl')}>
        {children}
      </div>
    </section>
  );
}

