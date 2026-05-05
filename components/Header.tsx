'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CTAButton } from './CTAButton';
import { SERVICES, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
        'sticky top-0 z-40 w-full border-b transition-all',
        scrolled
          ? 'border-gnat-concrete bg-white/95 backdrop-blur'
          : 'border-transparent bg-white',
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-prose flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-gnat-navy"
          aria-label="GNAT UK Home"
        >
          <span className="font-extrabold">GNAT</span>
          <span className="text-gnat-orange">UK</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            <li
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium text-gnat-navy hover:text-gnat-orange"
              >
                Services
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full w-72 pt-2">
                  <div className="overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-lg">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${s.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="block border-b border-gnat-concrete px-4 py-3 text-[15px] text-gnat-navy last:border-b-0 hover:bg-gnat-concrete-light hover:text-gnat-orange"
                      >
                        {s.shortName}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link
                href="/contact"
                className="px-4 py-2 text-[15px] font-medium text-gnat-navy hover:text-gnat-orange"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${SITE.phoneE164}`}
            className="text-sm font-semibold text-gnat-navy hover:text-gnat-orange"
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
          className="flex h-11 w-11 items-center justify-center rounded text-gnat-navy md:hidden"
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
              <li className="pt-1 text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                Services
              </li>
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
              <li className="pt-2">
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
