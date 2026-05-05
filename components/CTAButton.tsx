import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gnat-orange text-white hover:bg-gnat-orange-hover shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-gnat-navy ring-1 ring-inset ring-gnat-navy hover:bg-gnat-navy hover:text-white',
  ghost: 'text-white ring-1 ring-inset ring-white/40 hover:bg-white/10',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gnat-orange';

type CTAButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;

export function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CTAButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (!href) {
    return (
      <button type="button" className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
        {children}
      </button>
    );
  }

  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
