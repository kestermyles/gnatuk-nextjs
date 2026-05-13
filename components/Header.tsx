'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CTAButton } from './CTAButton';
import { SearchModal } from './SearchModal';
import { SERVICES, SITE } from '@/lib/constants';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ⌘K / Ctrl+K opens the search modal — standard pattern.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
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

      <div className="border-b border-gnat-concrete bg-gnat-concrete-light">
        <div className="container-prose flex h-10 items-center justify-between text-sm">
          <a
            href={`tel:${SITE.phoneE164}`}
            onClick={() => track({ event: 'phone_click', phone_location: 'utility_bar' })}
            className="flex items-center gap-2 text-gnat-navy transition-colors hover:text-gnat-orange"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-gnat-orange"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold">{SITE.phoneDisplay}</span>
          </a>
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={SITE.social.instagram}
              aria-label="Follow GNAT UK on Instagram"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track({ event: 'social_outbound', social_network: 'instagram', social_location: 'utility_bar' })
              }
              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white"
            >
              <Image
                src="/images/social/instagram.png"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </a>
            <a
              href={SITE.social.facebook}
              aria-label="Follow GNAT UK on Facebook"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track({ event: 'social_outbound', social_network: 'facebook', social_location: 'utility_bar' })
              }
              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white"
            >
              <Image
                src="/images/social/facebook.png"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="container-prose flex h-20 items-center justify-between gap-6 min-[1400px]:h-24">
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
            className="h-12 w-auto md:h-14 min-[1400px]:h-16"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-[1400px]:flex min-[1400px]:flex-1 min-[1400px]:justify-center"
        >
          <ul className="flex items-center">
            {/* Services dropdown */}
            <li className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                className="flex items-center gap-1.5 whitespace-nowrap px-5 py-2 text-base font-medium text-gnat-navy transition-colors hover:text-gnat-orange"
              >
                Services
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform group-hover:rotate-180"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="min-w-[240px] rounded-lg border border-gnat-concrete bg-white py-2 shadow-lg">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.slug}`}
                        className="block whitespace-nowrap px-5 py-2.5 text-sm text-gnat-navy transition-colors hover:bg-gnat-concrete-light hover:text-gnat-orange"
                      >
                        {s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link
                href="/case-studies"
                className="whitespace-nowrap px-5 py-2 text-base font-medium text-gnat-navy transition-colors hover:text-gnat-orange"
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                href="/insights"
                className="whitespace-nowrap px-5 py-2 text-base font-medium text-gnat-navy transition-colors hover:text-gnat-orange"
              >
                Insights
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="whitespace-nowrap px-5 py-2 text-base font-medium text-gnat-navy transition-colors hover:text-gnat-orange"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="whitespace-nowrap px-5 py-2 text-base font-medium text-gnat-navy transition-colors hover:text-gnat-orange"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Search the site"
            onClick={() => setSearchOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded text-gnat-navy transition-colors hover:bg-gnat-concrete-light hover:text-gnat-orange"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="hidden min-[1400px]:block">
            <CTAButton href="/contact" size="sm" variant="primary" trackingLocation="header">
              Request Method Proposal
            </CTAButton>
          </div>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-gnat-navy min-[1400px]:hidden"
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
        <div className="min-[1400px]:hidden">
          <nav aria-label="Mobile" className="border-t border-gnat-concrete bg-white">
            <ul className="container-prose space-y-1 py-4">
              <li className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
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
              <li className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                More
              </li>
              <li>
                <Link
                  href="/case-studies"
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-3 text-base text-gnat-navy hover:bg-gnat-concrete-light"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-3 text-base text-gnat-navy hover:bg-gnat-concrete-light"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-3 text-base text-gnat-navy hover:bg-gnat-concrete-light"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-3 text-base text-gnat-navy hover:bg-gnat-concrete-light"
                >
                  Contact
                </Link>
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

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
