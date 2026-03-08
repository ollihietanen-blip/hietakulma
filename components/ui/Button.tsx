import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type,
  style,
  disabled,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 text-base font-medium transition-all duration-300 ease-out active:scale-[0.98] hover:-translate-y-[2px] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue relative overflow-hidden group';
  const variants = {
    primary: 'bg-dark text-white hover:bg-black',
    secondary: 'bg-muted text-text hover:bg-gray-200',
    outline: 'border-2 border-dark text-dark hover:bg-dark hover:text-white',
    ghost: 'bg-transparent border-2 border-white/70 text-white hover:bg-white/15',
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
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />}
      </Link>
    );
  }

  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className={combinedClassName}
      style={defaultStyle}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />}
    </button>
  );
}

