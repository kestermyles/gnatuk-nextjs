import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { INDUSTRY_LIST } from '@/lib/industries';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Industries — Specialist Demolition by Sector',
  description:
    'Specialist demolition by industry: UK water (AMP8), petrochemical & COMAH, refractory & process, highways & bridges, heritage & listed buildings, offshore & marine.',
  alternates: { canonical: `${SITE.url}/industries` },
  openGraph: {
    title: 'Industries | GNAT UK',
    description:
      'Specialist demolition by sector — water, petrochemical, process, highways, heritage, offshore.',
    url: `${SITE.url}/industries`,
  },
};

export default function IndustriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Industries', href: '/industries' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Industries
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Specialist demolition, by sector.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Buyers don&apos;t source demolition by tool — they source it by the brief in
              front of them. The pages below collect GNAT UK&apos;s sector-specific work
              under one roof: what the sector demands, which methods apply, the
              constraints that shape them and the projects that prove the approach.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gnat-steel-dark">
              Six industries, each with its own pre-qualification weight, regulatory
              regime and method discipline. Most of our project pipeline sits inside one
              of them.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {INDUSTRY_LIST.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-gnat-concrete bg-white p-6 transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                    {ind.eyebrow}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-gnat-navy group-hover:text-gnat-orange">
                    {ind.hero}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gnat-steel-dark">
                    {ind.subtitle}
                  </p>
                  <p className="mt-5 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                    Sector page →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABlock
        heading="Work that doesn&apos;t fit a sector?"
        body="Plenty of our schemes cross sectors or sit outside them entirely. If you&apos;re looking at confined access, structural sensitivity or live operations, we&apos;re probably the right call regardless."
      />
    </>
  );
}
