import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gnat-navy-deep text-gnat-concrete">
      {/* Aquajet hydrodemolition rig as a textural backdrop. Lighter overlay
          (45%) lets the brand imagery dominate; vertical gradient anchors
          the copyright row at the bottom to near-solid navy so the small
          legal text stays readable. */}
      <Image
        src="/images/services/hydrodemolition-hero.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gnat-navy-deep/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gnat-navy-deep/85"
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
          <p className="mt-4 text-sm text-gnat-concrete">
            {SITE.tagline}
          </p>
          <p className="mt-6 text-sm text-gnat-concrete">
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
                  className="text-sm text-gnat-concrete hover:text-gnat-orange"
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
              <Link href="/our-process" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Our Process
              </Link>
            </li>
            <li>
              <Link href="/industries" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Industries
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Locations
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/insights" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/support-services" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Support Services
              </Link>
            </li>
            <li>
              <Link href="/accreditations" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Accreditations
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-gnat-concrete hover:text-gnat-orange">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Get in touch
          </h2>
          <p className="mt-4 text-sm text-gnat-concrete">
            Prefer to talk it through? Speak directly with a specialist.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a
              href={`tel:${SITE.phoneE164}`}
              className="flex items-center gap-2 text-white hover:text-gnat-orange"
            >
              <span className="text-gnat-concrete">T</span>
              <span className="font-semibold">{SITE.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-white hover:text-gnat-orange"
            >
              <span className="text-gnat-concrete">E</span>
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
            <a
              href={SITE.social.linkedin}
              aria-label="Follow GNAT UK on LinkedIn"
              target="_blank"
              rel="noopener noreferrer me"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-gnat-orange"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.99 0 1.78-.78 1.78-1.73V1.72C24 .77 23.21 0 22.22 0z" />
              </svg>
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
        <div className="container-prose flex flex-col items-start justify-between gap-2 py-6 text-xs text-gnat-concrete sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} · Registered in England &amp; Wales · Company No: {SITE.companyNumber}
          </p>
          <p>Method-led demolition delivery.</p>
        </div>
      </div>
    </footer>
  );
}
