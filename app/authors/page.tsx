import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { getAllAuthors } from '@/lib/sanity-queries';
import { SITE } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Authors — The Specialists Behind GNAT UK',
  description:
    'The specialists who write GNAT UK\'s case studies and method notes — Managing Director Nick Turnbull and team, with combined experience across robotic demolition, hydrodemolition, diamond cutting and cold cutting.',
  alternates: { canonical: `${SITE.url}/authors` },
  openGraph: {
    title: 'Authors | GNAT UK',
    description: 'The GNAT UK specialists behind our case studies and method notes.',
    url: `${SITE.url}/authors`,
  },
};

export default async function AuthorsIndexPage() {
  const authors = await getAllAuthors();
  // Filter out generic single-name placeholders (e.g. "Keith") if a fuller
  // entry (e.g. "Keith Hodgson") exists — avoids duplicate cards.
  const seen = new Set<string>();
  const display = authors
    .filter((a) => a.name.includes(' '))
    .filter((a) => {
      const key = a.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return (
    <>
      <Breadcrumbs items={[{ name: 'Authors', href: '/authors' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Authors
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              The specialists behind the work.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Every case study and method note on this site is written by one of
              the team. Real names, real experience, real responsibility — that&apos;s
              the standard we hold ourselves to.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {display.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/authors/${a.slug}`}
                  className="group flex gap-5 rounded-lg border border-gnat-concrete bg-white p-5 transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
                >
                  {a.image ? (
                    <Image
                      src={a.image}
                      alt={`Headshot of ${a.name}, ${a.role}`}
                      width={96}
                      height={96}
                      className="h-24 w-24 flex-none rounded-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-24 w-24 flex-none items-center justify-center rounded-full bg-gnat-orange text-xl font-bold text-white"
                    >
                      {a.name
                        .split(/\s+/)
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                      {a.role}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-gnat-navy group-hover:text-gnat-orange">
                      {a.name}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gnat-steel-dark">
                      {a.blurb}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                      Read profile →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABlock
        heading="Talk to the team directly."
        body="Got a brief that needs an experienced eye? Reach out and you'll speak to a specialist — not a salesperson."
      />
    </>
  );
}
