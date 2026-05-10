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

// Auto-tag a post based on its title + body keywords. Returns 1+ tags.
function tagsForPost(p: (typeof BLOG)[number]): GalleryTag[] {
  const haystack = `${p.title} ${p.body.join(' ')}`.toLowerCase();
  const tags = new Set<GalleryTag>();

  // Hydrodemolition family
  if (/hydrodemolition|hydroblasting|hydro[-\s]?demo|aquajet|conjet|ergo|nalta|hand[-\s]?lancing/.test(haystack)) {
    tags.add('Hydrodemolition');
  }
  // Diamond / sawing / drilling
  if (/diamond|wire saw|stitch drilling|track saw|hilti|core drilling/.test(haystack)) {
    tags.add('Diamond Drilling');
  }
  // Cold cutting
  if (/cold[-\s]?cutting|abrasive (?:water[-\s]?jet|cold)|atex/.test(haystack)) {
    tags.add('Cold Cutting');
  }
  // Robotic demolition (Brokk, Husqvarna)
  if (/brokk|husqvarna|robotic demolition/.test(haystack)) {
    tags.add('Robotic Demolition');
  }
  // Machine hire — fleet-flavoured posts
  if (p.category === 'Fleet' || /machine hire|fleet|brokk \d+ (?:diesel|electric)/.test(haystack)) {
    tags.add('Machine Hire');
  }
  // Fallback: if no tag matched (rare), default to Robotic Demolition
  if (tags.size === 0) tags.add('Robotic Demolition');
  return Array.from(tags);
}

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
// Each extra image inherits its tags from the parent blog post.
function getExtraImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), 'public/images/blog-extras');
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  const extras: GalleryImage[] = [];
  for (const file of files) {
    if (!/^[a-z0-9-]+-extra-\d+\.[a-z]+$/i.test(file)) continue;
    const slug = file.replace(/-extra-\d+\.[a-z]+$/i, '');
    const parent = BLOG.find((p) => p.slug === slug);
    if (!parent) continue; // Skip orphans
    extras.push({
      src: `/images/blog-extras/${file}`,
      alt: `${parent.heroAlt} (additional view)`,
      tags: tagsForPost(parent),
      href: `/blog/${parent.slug}`,
      caption: parent.title,
      date: parent.date,
    });
  }
  // Stable order
  return extras.sort((a, b) => a.src.localeCompare(b.src));
}

// Manifest derived from BLOG hero images + carousel extras + standalone images.
export function getGalleryImages(): GalleryImage[] {
  const blogImages: GalleryImage[] = BLOG.map((p) => ({
    src: p.heroImage,
    alt: p.heroAlt,
    tags: tagsForPost(p),
    href: `/blog/${p.slug}`,
    caption: p.title,
    date: p.date,
  }));
  return [...blogImages, ...getExtraImages(), ...STANDALONE_IMAGES];
}
