import Link from 'next/link';
import { SERVICES, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-gnat-navy-deep text-gnat-concrete">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-extrabold text-white">
            GNAT <span className="text-gnat-orange">UK</span>
          </Link>
          <p className="mt-3 text-sm text-gnat-steel">
            {SITE.tagline}
          </p>
          <p className="mt-6 text-sm text-gnat-steel">
            {SITE.legalName}
            <br />
            {SITE.address.streetAddress}
            <br />
            {SITE.address.locality}, {SITE.address.region}
            <br />
            {SITE.address.postalCode}, United Kingdom
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="text-sm text-gnat-steel hover:text-gnat-orange"
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/contact" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Get in touch
          </h2>
          <p className="mt-4 text-sm text-gnat-steel">
            Prefer to talk it through? Speak directly with a specialist.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a
              href={`tel:${SITE.phoneE164}`}
              className="flex items-center gap-2 text-white hover:text-gnat-orange"
            >
              <span className="text-gnat-steel">T</span>
              <span className="font-semibold">{SITE.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-white hover:text-gnat-orange"
            >
              <span className="text-gnat-steel">E</span>
              <span className="font-semibold">{SITE.email}</span>
            </a>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={SITE.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gnat-steel/40 text-gnat-steel transition hover:border-gnat-orange hover:text-gnat-orange"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href={SITE.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gnat-steel/40 text-gnat-steel transition hover:border-gnat-orange hover:text-gnat-orange"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 6.5h2.5V3h-3a4 4 0 0 0-4 4v2.5H8V13h1.5v8h3v-8H15l.5-3.5h-3V7a.5.5 0 0 1 .5-.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-prose flex flex-col items-start justify-between gap-2 py-6 text-xs text-gnat-steel sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} · Registered in England &amp; Wales · Company No: {SITE.companyNumber}
          </p>
          <p>Method-led demolition delivery.</p>
        </div>
      </div>
    </footer>
  );
}
