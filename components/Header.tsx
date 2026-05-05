'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CTAButton } from './CTAButton';
import { SERVICES, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-150',
        scrolled
          ? 'border-gnat-concrete bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-white',
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-prose flex h-20 items-center justify-between gap-4 md:h-24 md:gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="GNAT UK Home"
        >
          <Image
            src="/images/logo.png"
            alt="GNAT UK"
            width={160}
            height={81}
            priority
            className="h-12 w-auto md:h-14 lg:h-16"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex items-center">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="px-2.5 py-2 text-[13px] font-medium text-gnat-navy transition-colors hover:text-gnat-orange lg:px-3.5 lg:text-[15px]"
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="px-2.5 py-2 text-[13px] font-medium text-gnat-navy transition-colors hover:text-gnat-orange lg:px-3.5 lg:text-[15px]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">
          <a
            href={`tel:${SITE.phoneE164}`}
            className="hidden text-sm font-semibold text-gnat-navy transition-colors hover:text-gnat-orange lg:block"
          >
            {SITE.phoneDisplay}
          </a>
          <CTAButton href="/contact" size="sm" variant="primary">
            Request Method Proposal
          </CTAButton>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-gnat-navy md:hidden"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M2 5H20M2 11H20M2 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <nav aria-label="Mobile" className="border-t border-gnat-concrete bg-white">
            <ul className="container-prose space-y-1 py-4">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-3 text-base text-gnat-navy hover:bg-gnat-concrete-light"
                  >
                    {s.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-3 text-base text-gnat-navy hover:bg-gnat-concrete-light"
                >
                  Contact
                </Link>
              </li>
              <li className="pt-3">
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="block rounded px-3 py-3 text-base font-semibold text-gnat-orange"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="pt-2">
                <CTAButton href="/contact" variant="primary" size="md" className="w-full">
                  Request Method Proposal
                </CTAButton>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
