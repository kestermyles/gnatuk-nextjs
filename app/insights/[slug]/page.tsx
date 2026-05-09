import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { INSIGHTS, getInsightBySlug, type InsightSection } from '@/lib/insights';
import { SITE } from '@/lib/constants';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return INSIGHTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getInsightBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE.url}/insights/${post.slug}` },
    openGraph: {
      title: `${post.title} | GNAT UK`,
      description: post.excerpt,
      url: `${SITE.url}/insights/${post.slug}`,
      images: [{ url: post.heroImage, width: 1200, height: 675, alt: post.heroAlt }],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function renderSection(section: InsightSection, idx: number) {
  switch (section.type) {
    case 'paragraph':
      return (
        <p key={idx} className="text-lg leading-relaxed text-gnat-navy">
          {section.text}
        </p>
      );
    case 'heading':
      if (section.level === 3) {
        return (
          <h3 key={idx} className="mt-2 text-xl font-bold text-gnat-navy">
            {section.text}
          </h3>
        );
      }
      return (
        <h2 key={idx} className="mt-4 text-2xl font-bold text-gnat-navy md:text-3xl">
          {section.text}
        </h2>
      );
    case 'list':
      return (
        <ul key={idx} className="space-y-3">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed text-gnat-navy">
              <span className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-gnat-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <blockquote
          key={idx}
          className="my-2 border-l-4 border-gnat-orange bg-gnat-concrete-light px-6 py-5 text-lg italic leading-relaxed text-gnat-navy"
        >
          {section.text}
        </blockquote>
      );
    case 'comparison':
      return (
        <div key={idx} className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-gnat-navy bg-gnat-concrete-light">
                {section.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-gnat-navy">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gnat-concrete">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-3 ${ci === 0 ? 'font-semibold text-gnat-navy' : 'text-gnat-steel-dark'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function InsightPage({ params }: { params: Params }) {
  const post = getInsightBySlug(params.slug);
  if (!post) notFound();

  const others = INSIGHTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Insights', href: '/insights' },
          { name: post.title, href: `/insights/${post.slug}` },
        ]}
      />

      <article>
        <header className="bg-white">
          <div className="container-prose py-10 md:py-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                {post.category} &middot; {formatDate(post.date)} &middot; {post.readingTime}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-gnat-navy md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-gnat-steel-dark">{post.dek}</p>
            </div>
          </div>
        </header>

        <div className="relative aspect-[16/7] w-full overflow-hidden bg-gnat-concrete-light">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        <section className="bg-white">
          <div className="container-prose py-14 md:py-20">
            <div className="mx-auto max-w-3xl space-y-6">
              {post.sections.map((s, i) => renderSection(s, i))}
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="border-t border-gnat-concrete bg-gnat-concrete-light">
            <div className="container-prose py-14 md:py-20">
              <h2 className="text-2xl font-bold text-gnat-navy md:text-3xl">More insights</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/insights/${o.slug}`}
                    className="group rounded-lg border border-gnat-concrete bg-white p-5 transition hover:border-gnat-orange/50 hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                      {o.category}
                    </p>
                    <p className="mt-2 text-base font-semibold leading-snug text-gnat-navy group-hover:text-gnat-orange">
                      {o.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTABlock
        heading="Got a brief?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
