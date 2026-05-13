import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { getAllPosts } from '@/lib/sanity-queries';
import { SITE } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Case Studies — Specialist Demolition Projects',
  description:
    'Selected GNAT UK projects across water, healthcare, COMAH, refractory, listed buildings, infrastructure and more. Real schemes, real methods, real outcomes.',
  alternates: { canonical: `${SITE.url}/case-studies` },
  openGraph: {
    title: 'Case Studies | GNAT UK',
    description:
      'Selected GNAT UK projects: confined access, structural sensitivity, live-environment demolition.',
    url: `${SITE.url}/case-studies`,
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function CaseStudiesPage() {
  const all = await getAllPosts();
  const caseStudies = all
    .filter((p) => p.surfaces.includes('case-study'))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Breadcrumbs items={[{ name: 'Case Studies', href: '/case-studies' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Case Studies
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Method-led delivery, proven on site.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Selected projects across refractory, listed-building, infrastructure and
              specialist civils — where the method was the difference between a workable
              programme and a stalled one.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/blog/${cs.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gnat-concrete-light">
                  <Image
                    src={cs.heroImage}
                    alt={cs.heroAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                    {cs.category} &middot; {formatDate(cs.date)}
                  </p>
                  <h2 className="mt-2 text-base font-bold leading-snug text-gnat-navy">
                    {cs.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gnat-steel-dark">
                    {cs.excerpt}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                    Read project →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        heading="A scheme that needs solving early?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
