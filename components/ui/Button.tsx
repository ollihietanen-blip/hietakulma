import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type,
  style,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 text-base font-medium transition-all duration-200';
  const variants = {
    primary: 'bg-dark text-white hover:bg-gray-800',
    secondary: 'bg-muted text-text hover:bg-gray-300',
    outline: 'border text-text hover:bg-muted',
  };
  
  // Korkeus 44-48px, kulmat 8-12px
  const heightStyle = { height: '44px', minHeight: '44px' };
  const borderRadius = '8px';

  const combinedClassName = cn(baseStyles, variants[variant], className);

  const defaultStyle = {
    ...heightStyle,
    borderRadius,
    ...(className?.includes('border') && { borderWidth: '1px' }),
    ...style, // Merge with provided style
  };

  if (href) {
    return (
      <Link href={href} className={combinedClassName} style={defaultStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type || 'button'} onClick={onClick} className={combinedClassName} style={defaultStyle}>
      {children}
    </button>
  );
}

