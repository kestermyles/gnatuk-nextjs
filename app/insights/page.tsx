import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { INSIGHTS } from '@/lib/insights';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Insights — Method, Equipment & Sector Notes',
  description:
    'Technical insights from GNAT UK on robotic demolition, hydrodemolition, cold cutting and machine selection — written for procurement, engineering and site teams.',
  alternates: { canonical: `${SITE.url}/insights` },
  openGraph: {
    title: 'Insights | GNAT UK',
    description:
      'Method, equipment and sector notes from GNAT UK\'s specialist demolition team.',
    url: `${SITE.url}/insights`,
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function InsightsPage() {
  const sorted = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = sorted;

  return (
    <>
      <Breadcrumbs items={[{ name: 'Insights', href: '/insights' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Insights
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Method, equipment and sector notes.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Practical writing for the people who specify, procure and deliver specialist
              demolition. Decision frameworks, equipment comparisons, and the kind of
              detail that doesn&apos;t fit on a service page.
            </p>
          </div>

          {/* Featured (most recent) */}
          {featured && (
            <Link
              href={`/insights/${featured.slug}`}
              className="group mt-14 grid gap-8 overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-sm transition hover:border-gnat-orange/50 hover:shadow-md md:grid-cols-[1.4fr_1fr]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gnat-concrete-light md:aspect-auto">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroAlt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                  {featured.category} &middot; {formatDate(featured.date)}
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-gnat-navy md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gnat-steel-dark">
                  {featured.excerpt}
                </p>
                <p className="mt-5 text-sm font-semibold text-gnat-navy group-hover:text-gnat-orange">
                  Read the piece →
                </p>
              </div>
            </Link>
          )}

          {/* Rest */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gnat-concrete-light">
                  <Image
                    src={post.heroImage}
                    alt={post.heroAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                    {post.category} &middot; {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-gnat-navy">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gnat-steel-dark">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                    {post.readingTime} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        heading="Got a brief that doesn't fit a category?"
        body="If your scheme has unusual constraints — access, structure, environment — that's exactly the work we're set up for."
      />
    </>
  );
}
