import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gnat-navy-deep text-gnat-concrete">
      {/* Aquajet hydrodemolition rig as a textural backdrop. Heavy overlay
          keeps small footer text crisply readable while the brand imagery
          shows through enough to feel like a hero, not a flat block. */}
      <Image
        src="/images/services/hydrodemolition-hero.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-50"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gnat-navy-deep/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-gnat-navy-deep/40 via-gnat-navy-deep/70 to-gnat-navy-deep/95"
      />

      <div className="container-prose relative grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="inline-block" aria-label="GNAT UK Home">
            <Image
              src="/images/logo.png"
              alt="GNAT UK"
              width={160}
              height={81}
              className="h-12 w-auto"
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
              <Link href="/our-process" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Our Process
              </Link>
            </li>
            <li>
              <Link href="/industries" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Industries
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Locations
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/insights" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/support-services" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Support Services
              </Link>
            </li>
            <li>
              <Link href="/accreditations" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Accreditations
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-sm text-gnat-steel hover:text-gnat-orange">
                Gallery
              </Link>
            </li>
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

      {/* Accreditations banner — alt text + /accreditations page + LocalBusiness
          schema (hasCredential[]) carry the organic visibility for the 11 schemes. */}
      <div className="relative border-t border-white/10 bg-white">
        <div className="container-prose py-6">
          <Link href="/accreditations" className="block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gnat-steel-dark">
              Accredited &amp; audited
            </p>
            <Image
              src="/images/accreditations/banner.jpg"
              alt="GNAT UK accreditations: Builder's Profile, Water Jetting Association (WJA) Audited Member, SSIP Safety Schemes in Procurement, Acclaim Accreditation, Achilles BuildingConfidence Audited, Drilling and Sawing Association (DSA), CHAS Accredited Contractor, RISQS Verified, Constructionline Gold Member, Common Assessment Standard, RoSPA Member, NFDC National Federation of Demolition Contractors Industry Service Provider"
              width={1920}
              height={193}
              sizes="(min-width: 1400px) 1336px, 100vw"
              quality={90}
              className="mt-3 h-auto w-full"
            />
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
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
