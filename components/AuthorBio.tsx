import Image from 'next/image';
import Link from 'next/link';
import { getAuthorByName } from '@/lib/sanity-queries';
import { authorSlug } from '@/lib/authors';

type AuthorBioProps = {
  authorName: string;
};

// Renders an "About the author" card under each blog post. Pulls the author
// record from Sanity (with static fallback) so the bio + photo update across
// every post the moment the CMS doc changes. The card name links to the
// dedicated /authors/[slug] page — important for E-E-A-T: Google treats a
// named author with a real profile page + photo + role as a much stronger
// trust signal than a bare byline.
export async function AuthorBio({ authorName }: AuthorBioProps) {
  const author = (await getAuthorByName(authorName)) ?? {
    name: authorName,
    role: 'GNAT UK',
    blurb: 'Contributor to GNAT UK\'s technical content.',
    slug: authorSlug(authorName),
    image: undefined,
  };

  const initials = author.name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const profileHref = `/authors/${author.slug ?? authorSlug(author.name)}`;

  return (
    <aside
      className="mt-12 flex flex-col gap-4 rounded-lg border border-gnat-concrete bg-gnat-concrete-light p-6 sm:flex-row sm:items-start"
      aria-label={`About the author, ${author.name}`}
    >
      {author.image ? (
        <Link
          href={profileHref}
          className="flex-none overflow-hidden rounded-full"
          aria-label={`Read more about ${author.name}`}
        >
          <Image
            src={author.image}
            alt={`Headshot of ${author.name}, ${author.role}`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        </Link>
      ) : (
        <div
          aria-hidden="true"
          className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gnat-orange text-base font-bold text-white"
        >
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
          About the author
        </p>
        <p className="mt-1 text-lg font-bold text-gnat-navy">
          <Link href={profileHref} className="hover:text-gnat-orange">
            {author.name}
          </Link>
        </p>
        <p className="text-sm text-gnat-steel-dark">{author.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-gnat-navy">{author.blurb}</p>
        <p className="mt-3">
          <Link
            href={profileHref}
            className="text-sm font-semibold text-gnat-orange hover:underline"
          >
            Read more about {author.name.split(' ')[0]} →
          </Link>
        </p>
      </div>
    </aside>
  );
}
