import fs from 'fs';
import path from 'path';

export type PostExtra = {
  src: string;
  alt: string;
  caption: string;
};

// Per-image caption + alt overrides keyed by full /images/blog-extras/<file>
// path. Use sparingly — most carousel images do fine with the auto-generated
// caption pattern below. Override when the image carries specific editorial
// meaning that the generic pattern would erase (e.g. a side-by-side
// comparison that's meaningless without the labels).
const EXTRA_OVERRIDES: Record<string, { alt: string; caption: string }> = {
  '/images/blog-extras/hydroblasting-factory-floor-rebates-extra-2.jpg': {
    alt: 'Side-by-side comparison of two concrete rebate cuts: left — hydraulic pecker leaves a rough, irregular edge (no clean cuts); right — diamond floor saw defines a clean cut perimeter, then hydrodemolition removes the bulk between the cut lines, leaving a precision-finished rebate',
    caption:
      'Left: hydraulic pecker — no clean cuts. Right: floor saw to define cut area, followed by hydrodemolition.',
  },
};

// Returns the per-post carousel images for a /blog/[slug] page.
//
// Files live in /public/images/blog-extras/ and follow the naming convention
// `<slug>-extra-<n>.<ext>` — harvested from the original Wix posts at migration
// time. Each post can have any number; we render them all in filename order
// so dad can re-arrange just by renaming if he wants a different sequence.
//
// Captions auto-generate from the parent post unless an override exists in
// EXTRA_OVERRIDES above.
export function getPostExtras(slug: string, heroAlt: string, title: string): PostExtra[] {
  const dir = path.join(process.cwd(), 'public/images/blog-extras');
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  const re = new RegExp(`^${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}-extra-\\d+\\.[a-z0-9]+$`, 'i');
  const matched = files.filter((f) => re.test(f)).sort();
  return matched.map((f, i) => {
    const src = `/images/blog-extras/${f}`;
    const override = EXTRA_OVERRIDES[src];
    return {
      src,
      alt: override?.alt ?? `${heroAlt} — additional view ${i + 1}`,
      caption: override?.caption ?? `${title} — photo ${i + 1} of ${matched.length}`,
    };
  });
}
