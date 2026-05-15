import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { LOCATION_LIST } from '@/lib/locations';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Locations — GNAT UK Offices Across the UK',
  description:
    'Three operational bases — Richmond (North Yorkshire HQ), Derby (Midlands) and Stevenage (Hertfordshire) — covering the whole of Great Britain and Ireland.',
  alternates: { canonical: `${SITE.url}/locations` },
  openGraph: {
    title: 'Locations | GNAT UK',
    description:
      'Three operational bases across the UK — Yorkshire HQ, Midlands office, Hertfordshire office.',
    url: `${SITE.url}/locations`,
  },
};

export default function LocationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Locations', href: '/locations' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Locations
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Three bases, nationwide delivery.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              GNAT UK operates from three locations across the UK — Richmond (North
              Yorkshire HQ), Derby (Midlands) and Stevenage (Hertfordshire). Plant and
              specialist crews mobilise from whichever base is nearest the work, with
              the head office holding overall pre-construction and method-definition
              ownership.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {LOCATION_LIST.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-gnat-concrete bg-white p-6 transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                    {loc.eyebrow}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-gnat-navy group-hover:text-gnat-orange">
                    {loc.shortName}
                  </h2>
                  <address className="mt-3 not-italic text-sm text-gnat-steel-dark">
                    {loc.address.streetAddress}
                    <br />
                    {loc.address.locality}, {loc.address.region}
                    <br />
                    {loc.address.postalCode}
                  </address>
                  <p className="mt-4 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                    Office details →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABlock
        heading="Got a scheme that needs the closest base?"
        body="Tell us where the site is and we'll mobilise from the depot best placed to keep the programme tight."
      />
    </>
  );
}
