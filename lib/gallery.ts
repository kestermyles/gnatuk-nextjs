import { getAllPosts } from './sanity-queries';
import type { BlogPost } from './blog';

export type GalleryTag =
  | 'Robotic Demolition'
  | 'Hydrodemolition'
  | 'Diamond Drilling'
  | 'Cold Cutting'
  | 'Machine Hire';

export const GALLERY_TAGS: GalleryTag[] = [
  'Robotic Demolition',
  'Hydrodemolition',
  'Diamond Drilling',
  'Cold Cutting',
  'Machine Hire',
];

export type GalleryImage = {
  src: string;
  alt: string;
  tags: GalleryTag[];
  /** Optional link to the source post on /blog/[slug]. */
  href?: string;
  /** Optional caption — used as title in the lightbox. */
  caption?: string;
  /** ISO date — used for sort order on the "all" view. */
  date?: string;
};

// Tags for a post. The explicit `galleryTags` field on the post is the source
// of truth — set to [] to exclude the post from the gallery, or a list of tags
// to include it under those filters. If `galleryTags` is undefined (legacy
// posts), the function returns null so the caller can skip the entry.
function tagsForPost(p: BlogPost): GalleryTag[] | null {
  // Treat null (Sanity unset value) and undefined (static fallback) the same.
  if (p.galleryTags == null) return null;
  if (p.galleryTags.length === 0) return null;
  return p.galleryTags as GalleryTag[];
}

// Standalone images that don't have a parent blog post — project shots and
// service-page heroes that work as gallery imagery. The 7 Brokk fleet thumbnails
// (/images/machines/brokk{70,110,...,800}.jpg) used to be here but they're
// product-catalogue shots, not project photos, so they're scoped to the
// /machine-hire page only and excluded from the gallery.
const STANDALONE_IMAGES: GalleryImage[] = [
  // Project photos
  {
    src: '/images/projects/brokk-800-bank-vault.jpg',
    alt: 'Brokk 800 robotic demolition machine breaking into a high-security reinforced concrete bank vault',
    tags: ['Robotic Demolition'],
    caption: 'Brokk 800 — bank vault demolition',
    // bank-vault-demolition-brokk-husqvarna was merged into the BoE case study
    // (15 May 2026 dedup). Pointing directly at the canonical avoids a redirect hop.
    href: '/blog/bank-of-england-vault-grade-1-london',
  },
  {
    src: '/images/projects/confined-space.jpg',
    alt: 'Robotic demolition equipment working in a tight confined space',
    tags: ['Robotic Demolition'],
    caption: 'Confined-space deconstruction',
  },
  {
    src: '/images/projects/top-down-demolition.jpg',
    alt: 'Top-down robotic demolition of a multi-storey structure',
    tags: ['Robotic Demolition'],
    caption: 'Top-down robotic demolition',
    href: '/blog/top-down-robotic-demolition-leeds-tower',
  },
  // Service hero images that double as gallery shots
  {
    src: '/images/services/hydrodemolition-hero.jpg',
    alt: 'Aquajet hydrodemolition robot removing concrete from a structural element',
    tags: ['Hydrodemolition'],
    href: '/hydrodemolition',
  },
  {
    src: '/images/services/diamond-drilling-hero.jpg',
    alt: 'Diamond core drilling rig cutting through reinforced concrete',
    tags: ['Diamond Drilling'],
    href: '/diamond-drilling',
  },
  {
    src: '/images/services/cold-cutting-hero.jpg',
    alt: 'Abrasive cold cutting equipment working on industrial pipework',
    tags: ['Cold Cutting'],
    href: '/cold-cutting',
  },
];

// Manifest is hero-only: one tile per post. Per-post carousel extras used to
// be piped in here but they all linked back to the same /blog/[slug], which
// made filters feel like a loop ("Read more →" kept landing on the same
// handful of pages). The blog-extras/ files are kept on disk for a possible
// future per-post carousel on /blog/[slug].
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const posts = await getAllPosts();
  const blogImages: GalleryImage[] = [];
  for (const p of posts) {
    const tags = tagsForPost(p);
    if (!tags) continue;
    blogImages.push({
      src: p.heroImage,
      alt: p.heroAlt,
      tags,
      href: `/blog/${p.slug}`,
      caption: p.title,
      date: p.date,
    });
  }
  return [...blogImages, ...STANDALONE_IMAGES];
}
