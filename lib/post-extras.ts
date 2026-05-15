import fs from 'fs';
import path from 'path';

export type PostExtra = {
  src: string;
  alt: string;
  caption: string;
};

// Returns the per-post carousel images for a /blog/[slug] page.
//
// Files live in /public/images/blog-extras/ and follow the naming convention
// `<slug>-extra-<n>.<ext>` — harvested from the original Wix posts at migration
// time. Each post can have any number; we render them all in filename order
// so dad can re-arrange just by renaming if he wants a different sequence.
//
// Captions auto-generate from the parent post for now (Title — Photo N).
// Per-image hand-written captions can be added later via a Sanity schema
// extension; not in scope for the initial carousel rollout.
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
  return matched.map((f, i) => ({
    src: `/images/blog-extras/${f}`,
    alt: `${heroAlt} — additional view ${i + 1}`,
    caption: `${title} — photo ${i + 1} of ${matched.length}`,
  }));
}
