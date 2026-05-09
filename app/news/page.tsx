import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { NEWS } from '@/lib/news';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'News — Project Updates, Fleet & Industry',
  description:
    'Recent project completions, fleet updates, team certifications and industry events from GNAT UK\'s specialist demolition team.',
  alternates: { canonical: `${SITE.url}/news` },
  openGraph: {
    title: 'News | GNAT UK',
    description:
      'Recent project completions, fleet updates and industry news from GNAT UK.',
    url: `${SITE.url}/news`,
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsPage() {
  const sorted = [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Breadcrumbs items={[{ name: 'News', href: '/news' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              News
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              What we&apos;ve been doing.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Project completions, fleet updates, team certifications, awards and industry
              events. The shorter, sharper updates from the field.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gnat-concrete-light">
                  <Image
                    src={post.heroImage}
                    alt={post.heroAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded bg-gnat-navy/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 text-base font-bold leading-snug text-gnat-navy">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gnat-steel-dark">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                    Read →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        heading="Got a scheme to discuss?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
