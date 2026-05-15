import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { PersonSchema } from '@/components/Schema';
import { getAllAuthors, getAuthorBySlug, getAllPosts } from '@/lib/sanity-queries';
import { SITE } from '@/lib/constants';

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const authors = await getAllAuthors();
  return authors
    .filter((a) => a.slug)
    .map((a) => ({ slug: a.slug! }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return { title: 'Author Not Found' };
  const title = `${author.name} — ${author.role}`;
  return {
    title,
    description: author.blurb.slice(0, 160),
    alternates: { canonical: `${SITE.url}/authors/${author.slug}` },
    openGraph: {
      title: `${title} | GNAT UK`,
      description: author.blurb.slice(0, 160),
      url: `${SITE.url}/authors/${author.slug}`,
      images: author.image ? [{ url: author.image, alt: `Headshot of ${author.name}` }] : undefined,
      type: 'profile',
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

export default async function AuthorPage({ params }: { params: Params }) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) notFound();

  const allPosts = await getAllPosts();
  const authoredPosts = allPosts
    .filter((p) => p.author === author.name)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const profileUrl = `${SITE.url}/authors/${author.slug}`;

  // knowsAbout pulled from the company's specialties — gives Google explicit
  // signal that this author is an authoritative source on these topics.
  const knowsAbout = [
    'Robotic Demolition',
    'Hydrodemolition',
    'Diamond Wire Cutting',
    'Diamond Drilling',
    'Abrasive Cold Cutting',
    'Confined Space Demolition',
    'COMAH-regulated Demolition',
    'AMP8 Water Infrastructure',
    'Top-Down Demolition',
    'Refractory Demolition',
    'Offshore Decommissioning',
    'Process and Manufacturing Industries',
  ];

  return (
    <>
      <PersonSchema
        name={author.name}
        jobTitle={author.role}
        description={author.blurb}
        imageUrl={author.image}
        url={profileUrl}
        knowsAbout={knowsAbout}
        sameAs={author.linkedin ? [author.linkedin] : undefined}
      />

      <Breadcrumbs
        items={[
          { name: 'Authors', href: '/authors' },
          { name: author.name, href: `/authors/${author.slug}` },
        ]}
      />

      <article className="bg-white">
        <div className="container-prose py-12 md:py-16">
          <header className="flex flex-col gap-8 md:flex-row md:items-start">
            {author.image && (
              <div className="flex-none">
                <Image
                  src={author.image}
                  alt={`Headshot of ${author.name}, ${author.role}`}
                  width={220}
                  height={220}
                  className="h-44 w-44 rounded-full object-cover shadow-md md:h-52 md:w-52"
                  priority
                />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gnat-orange">
                {author.role}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-gnat-navy md:text-5xl">
                {author.name}
              </h1>
              {author.linkedin && (
                <p className="mt-4">
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gnat-navy hover:text-gnat-orange"
                    aria-label={`${author.name} on LinkedIn (opens in a new tab)`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.99 0 1.78-.78 1.78-1.73V1.72C24 .77 23.21 0 22.22 0z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                </p>
              )}
              <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-gnat-navy">
                {author.blurb.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </header>
        </div>
      </article>

      {authoredPosts.length > 0 && (
        <section className="border-t border-gnat-concrete bg-gnat-concrete-light">
          <div className="container-prose py-14 md:py-16">
            <h2 className="text-2xl font-bold text-gnat-navy md:text-3xl">
              Articles by {author.name.split(' ')[0]}
            </h2>
            <p className="mt-2 text-sm text-gnat-steel-dark">
              {authoredPosts.length} piece{authoredPosts.length === 1 ? '' : 's'} published.
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {authoredPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block rounded-lg border border-gnat-concrete bg-white p-5 transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                      {p.category} &middot; {formatDate(p.date)}
                    </p>
                    <h3 className="mt-2 text-base font-bold leading-snug text-gnat-navy group-hover:text-gnat-orange">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gnat-steel-dark">
                      {p.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABlock
        heading="Got a brief that needs an expert eye?"
        body={`Speak directly with the GNAT UK team. ${author.name.split(' ')[0]} and the wider team will tell you up-front whether the method fits — and what the right alternative is if it doesn't.`}
      />
    </>
  );
}
