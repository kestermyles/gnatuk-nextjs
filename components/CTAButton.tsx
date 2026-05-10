'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

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
  /** Optional GTM tracking — passed to dataLayer on click. */
  trackingLocation?: string;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;

export function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  trackingLocation,
  ...rest
}: CTAButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  function onClickHandler(e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (!href) return;
    const label = typeof children === 'string' ? children : 'CTA';
    if (href.startsWith('tel:')) {
      track({ event: 'phone_click', phone_location: trackingLocation ?? 'cta_button' });
    } else {
      track({
        event: 'cta_click',
        cta_label: label,
        cta_destination: href,
        cta_location: trackingLocation ?? 'unknown',
      });
    }
    // Forward to any onClick the consumer passed
    const consumerOnClick = (rest as { onClick?: (e: MouseEvent<HTMLElement>) => void })
      .onClick;
    if (consumerOnClick) consumerOnClick(e as MouseEvent<HTMLElement>);
  }

  if (!href) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClickHandler}
        {...(rest as ComponentPropsWithoutRef<'button'>)}
      >
        {children}
      </button>
    );
  }

  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a href={href} className={classes} onClick={onClickHandler} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClickHandler}>
      {children}
    </Link>
  );
}
