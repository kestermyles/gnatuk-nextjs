import Link from 'next/link';

type GalleryCalloutProps = {
  /** Service tag for the deep link, e.g. "Hydrodemolition" — slugified via lowercase + hyphen. */
  tag: string;
  /** Display label, e.g. "hydrodemolition projects" */
  label?: string;
};

export function GalleryCallout({ tag, label }: GalleryCalloutProps) {
  const hash = tag.toLowerCase().replace(/\s+/g, '-');
  const text = label ?? `${tag.toLowerCase()} projects`;

  return (
    <div className="mx-auto my-12 flex max-w-3xl flex-col gap-4 rounded-lg border border-gnat-concrete bg-gnat-concrete-light px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
          See it in action
        </p>
        <p className="mt-1 text-base font-semibold text-gnat-navy">
          Browse {text} in the gallery
        </p>
      </div>
      <Link
        href={`/gallery#${hash}`}
        className="inline-flex shrink-0 items-center gap-2 rounded border border-gnat-navy bg-white px-4 py-2.5 text-sm font-semibold text-gnat-navy transition hover:border-gnat-orange hover:text-gnat-orange"
      >
        Open gallery →
      </Link>
    </div>
  );
}
