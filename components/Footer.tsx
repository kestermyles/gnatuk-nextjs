import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-gnat-navy-deep text-gnat-concrete">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="inline-block" aria-label="GNAT UK Home">
            <Image
              src="/images/logo.png"
              alt="GNAT UK"
              width={160}
              height={81}
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-4 text-sm text-gnat-steel">
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
              aria-label="Follow GNAT UK on Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-gnat-orange"
            >
              <Image
                src="/images/social/instagram.png"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </a>
            <a
              href={SITE.social.facebook}
              aria-label="Follow GNAT UK on Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-gnat-orange"
            >
              <Image
                src="/images/social/facebook.png"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
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
