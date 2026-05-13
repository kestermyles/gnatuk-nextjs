import fs from 'fs';
import path from 'path';
import { BLOG } from './blog';

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
function tagsForPost(p: (typeof BLOG)[number]): GalleryTag[] | null {
  if (p.galleryTags === undefined) return null;
  if (p.galleryTags.length === 0) return null;
  return p.galleryTags as GalleryTag[];
}

// How many carousel/extra images we surface in the gallery for a single post.
// Without a cap, a project with 14 carousel images would dominate the view.
const MAX_EXTRAS_PER_POST = 3;

// Standalone images that don't have a parent blog post — equipment fleet shots
// and additional project photos kept under /public/images/.
const STANDALONE_IMAGES: GalleryImage[] = [
  // Brokk fleet — each tagged Robotic Demolition + Machine Hire
  { src: '/images/machines/brokk70.jpg', alt: 'Brokk 70 robotic demolition machine — ultra-compact, 600mm access', tags: ['Robotic Demolition', 'Machine Hire'], caption: 'Brokk 70', href: '/machine-hire' },
  { src: '/images/machines/brokk110.jpg', alt: 'Brokk 110 robotic demolition machine — compact, doorway access', tags: ['Robotic Demolition', 'Machine Hire'], caption: 'Brokk 110', href: '/machine-hire' },
  { src: '/images/machines/brokk170.jpg', alt: 'Brokk 170 robotic demolition machine — compact power, internal structural work', tags: ['Robotic Demolition', 'Machine Hire'], caption: 'Brokk 170', href: '/machine-hire' },
  { src: '/images/machines/brokk200.jpg', alt: 'Brokk 200 robotic demolition machine — high output, structural demolition', tags: ['Robotic Demolition', 'Machine Hire'], caption: 'Brokk 200', href: '/machine-hire' },
  { src: '/images/machines/brokk300.jpg', alt: 'Brokk 300 robotic demolition machine — heavy duty, extended reach', tags: ['Robotic Demolition', 'Machine Hire'], caption: 'Brokk 300', href: '/machine-hire' },
  { src: '/images/machines/brokk500.jpg', alt: 'Brokk 500 robotic demolition machine — high impact, large-scale work', tags: ['Robotic Demolition', 'Machine Hire'], caption: 'Brokk 500', href: '/machine-hire' },
  { src: '/images/machines/brokk800.jpg', alt: 'Brokk 800 robotic demolition machine — maximum power, extreme duty', tags: ['Robotic Demolition', 'Machine Hire'], caption: 'Brokk 800', href: '/machine-hire' },
  // Project photos
  {
    src: '/images/projects/brokk-800-bank-vault.jpg',
    alt: 'Brokk 800 robotic demolition machine breaking into a high-security reinforced concrete bank vault',
    tags: ['Robotic Demolition'],
    caption: 'Brokk 800 — bank vault demolition',
    href: '/blog/bank-vault-demolition-brokk-husqvarna',
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

// Read carousel/extra images harvested from the original Wix posts.
// Files are named `<slug>-extra-N.jpg` in /public/images/blog-extras/.
// Each extra image inherits its tags from the parent blog post. Skipped if the
// parent post has no galleryTags or is explicitly excluded ([]). Capped per-post.
function getExtraImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), 'public/images/blog-extras');
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  // Group by parent slug so we can apply the cap per-post.
  const bySlug: Record<string, string[]> = {};
  for (const file of files) {
    if (!/^[a-z0-9-]+-extra-\d+\.[a-z]+$/i.test(file)) continue;
    const slug = file.replace(/-extra-\d+\.[a-z]+$/i, '');
    (bySlug[slug] ??= []).push(file);
  }

  const extras: GalleryImage[] = [];
  for (const [slug, slugFiles] of Object.entries(bySlug)) {
    const parent = BLOG.find((p) => p.slug === slug);
    if (!parent) continue;
    const tags = tagsForPost(parent);
    if (!tags) continue; // Parent excluded from gallery
    // Stable order, cap at MAX_EXTRAS_PER_POST so no project dominates.
    const ordered = [...slugFiles].sort();
    for (const file of ordered.slice(0, MAX_EXTRAS_PER_POST)) {
      extras.push({
        src: `/images/blog-extras/${file}`,
        alt: `${parent.heroAlt} (additional view)`,
        tags,
        href: `/blog/${parent.slug}`,
        caption: parent.title,
        date: parent.date,
      });
    }
  }
  return extras.sort((a, b) => a.src.localeCompare(b.src));
}

// Manifest derived from BLOG hero images (only for posts with galleryTags set)
// + capped carousel extras + standalone fleet/project images.
export function getGalleryImages(): GalleryImage[] {
  const blogImages: GalleryImage[] = [];
  for (const p of BLOG) {
    const tags = tagsForPost(p);
    if (!tags) continue; // Post excluded from gallery
    blogImages.push({
      src: p.heroImage,
      alt: p.heroAlt,
      tags,
      href: `/blog/${p.slug}`,
      caption: p.title,
      date: p.date,
    });
  }
  return [...blogImages, ...getExtraImages(), ...STANDALONE_IMAGES];
}
