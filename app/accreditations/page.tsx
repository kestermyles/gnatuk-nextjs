import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { getAccreditations } from '@/lib/sanity-queries';
import { SITE } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Accreditations — CHAS, NFDC, Constructionline Gold, RISQS, Achilles & more',
  description:
    "GNAT UK Limited's industry accreditations and memberships: CHAS, Constructionline Gold, RISQS Verified, Achilles BuildingConfidence, NFDC, WJA, SSIP, RoSPA, Builder's Profile, DSA and the Common Assessment Standard.",
  alternates: { canonical: `${SITE.url}/accreditations` },
  openGraph: {
    title: 'Accreditations | GNAT UK',
    description:
      "Industry accreditations and memberships held by GNAT UK Limited — the credentials Tier-1 contractors require for pre-qualification.",
    url: `${SITE.url}/accreditations`,
  },
};

export default async function AccreditationsPage() {
  const ACCREDITATIONS = await getAccreditations();
  return (
    <>
      <Breadcrumbs items={[{ name: 'Accreditations', href: '/accreditations' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Accreditations
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Audited, accredited, on every framework.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              GNAT UK Limited holds the pre-qualification credentials required for work
              with Tier-1 contractors, water utilities, Network Rail, COMAH-regulated
              sites, and major infrastructure clients. Each listed scheme independently
              audits or verifies our health-and-safety, quality, environmental, and
              commercial standards.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {ACCREDITATIONS.map((a) => (
              <li
                key={a.name}
                className="flex flex-col rounded-lg border border-gnat-concrete bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {a.logo ? (
                    <div className="flex h-14 w-28 flex-none items-center justify-center">
                      <Image
                        src={a.logo}
                        alt={`${a.name} logo`}
                        width={a.logoWidth ?? 200}
                        height={a.logoHeight ?? 80}
                        className="max-h-14 w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-28 flex-none items-center justify-center rounded border border-gnat-concrete bg-gnat-concrete-light px-2 text-center text-[10px] font-bold uppercase tracking-wider text-gnat-steel-dark">
                      {a.name.split(' ')[0]}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-base font-bold leading-snug text-gnat-navy">
                          {a.name}
                        </h2>
                        {a.level && (
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                            {a.level}
                          </p>
                        )}
                      </div>
                      <a
                        href={a.schemeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none text-xs font-semibold text-gnat-steel-dark hover:text-gnat-orange"
                        aria-label={`Visit the ${a.name} scheme website`}
                      >
                        Scheme ↗
                      </a>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gnat-steel-dark">
                      {a.blurb}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-lg border border-gnat-orange/20 bg-gnat-orange/5 p-6 md:p-8">
            <h2 className="text-lg font-bold text-gnat-navy">
              Need verification documents for pre-qualification?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gnat-steel-dark">
              We can supply current certificates for any of the schemes listed above on
              request, alongside our standard pre-construction pack (insurance,
              method-statement library, environmental policy, equality and modern-slavery
              statements).
            </p>
            <p className="mt-3 text-base text-gnat-steel-dark">
              Email{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="font-semibold text-gnat-navy underline hover:text-gnat-orange"
              >
                {SITE.email}
              </a>{' '}
              or call{' '}
              <a
                href={`tel:${SITE.phoneE164}`}
                className="font-semibold text-gnat-navy underline hover:text-gnat-orange"
              >
                {SITE.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABlock
        heading="Got a brief?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
