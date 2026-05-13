import { getAuthorBio } from '@/lib/authors';

type AuthorBioProps = {
  authorName: string;
};

export function AuthorBio({ authorName }: AuthorBioProps) {
  const author = getAuthorBio(authorName);
  // Initial(s) — used to generate a simple avatar circle when no photo is set.
  const initials = author.name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside
      className="mt-12 flex flex-col gap-4 rounded-lg border border-gnat-concrete bg-gnat-concrete-light p-6 sm:flex-row sm:items-start"
      aria-label={`About the author, ${author.name}`}
    >
      <div
        aria-hidden="true"
        className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gnat-orange text-base font-bold text-white"
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
          About the author
        </p>
        <p className="mt-1 text-lg font-bold text-gnat-navy">{author.name}</p>
        <p className="text-sm text-gnat-steel-dark">{author.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-gnat-navy">{author.blurb}</p>
      </div>
    </aside>
  );
}
