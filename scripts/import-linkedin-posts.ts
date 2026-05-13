/**
 * One-time importer: ports Nick Turnbull's recent LinkedIn posts into Sanity.
 *
 * Source: /Users/kesterhodgson/Downloads/nick-linkedin-posts.json (scraped via
 * Chrome MCP). Each post becomes a blogPost document with surface "blog".
 *
 * Run:   pnpm tsx scripts/import-linkedin-posts.ts
 * Needs: same env vars as migrate-to-sanity.ts
 *
 * Hero images: the Chrome MCP scrape captured image filenames but didn't
 * download the actual image binaries. Each post gets a thematically-matched
 * fallback hero from the existing /public/images/ library (uploaded fresh
 * as a Sanity asset per post — small dedup loss, clean isolation).
 *
 * Safe to re-run: uses createOrReplace on stable IDs derived from the
 * LinkedIn postId.
 */

import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
});

// Hand-curated metadata per post — slug, title, excerpt, fallback hero, gallery tags.
// Order matches the JSON (newest first). Edit titles/heroes here if Nick wants
// any of these re-presented differently before publish.
type PostMeta = {
  postId: string;
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string; // /public/images/... path
  heroAlt: string;
  category: 'Method' | 'Fleet' | 'Industry' | 'Project';
  galleryTags?: string[];
};

const META: Record<string, PostMeta> = {
  '7459676786428203009': {
    postId: '7459676786428203009',
    slug: 'top-down-refractory-vessel-demolition-linkedin',
    title: 'Top-Down Refractory Demolition Inside the Vessel',
    excerpt:
      "Top-down work is hard at the best of times — top-down refractory demolition inside a vessel is a different ball game. Why specialist refractory contractors call us first.",
    heroImage: '/images/blog/refractory-vessel-cold-cut.jpg',
    heroAlt: 'Brokk robotic demolition machine working on refractory inside a large vessel',
    category: 'Method',
    galleryTags: ['Robotic Demolition'],
  },
  '7457715633057755137': {
    postId: '7457715633057755137',
    slug: 'comah-projects-bigger-jobs-bigger-challenge-linkedin',
    title: 'COMAH Projects: Bigger Jobs, Bigger Challenge',
    excerpt:
      'COMAH-regulated work brings its own set of constraints. Why specialist demolition matters when the site is hazardous, the access is restricted, and the safety regime is tight.',
    heroImage: '/images/services/cold-cutting-hero.jpg',
    heroAlt: 'Abrasive cold cutting on a COMAH-regulated industrial site',
    category: 'Industry',
    galleryTags: ['Cold Cutting'],
  },
  '7453500615659413504': {
    postId: '7453500615659413504',
    slug: 'wherever-whatever-difficult-projects-linkedin',
    title: 'Wherever, Whatever — Taking On the Difficult Projects',
    excerpt:
      'A note on why Gnat UK takes on the hardest projects — the ones other contractors decline. Method-led delivery in the toughest environments.',
    heroImage: '/images/services/hero-home.jpg',
    heroAlt: 'Confined-access robotic demolition in a restricted industrial environment',
    category: 'Industry',
  },
  '7452470462757941251': {
    postId: '7452470462757941251',
    slug: 'amp8-mothballed-sites-infrastructure-readiness-linkedin',
    title: 'Ready for the AMP8 Infrastructure Wave',
    excerpt:
      "The UK's mothballed sites and water assets need bringing back into service. Why specialist demolition is upstream of the AMP8 capital programme — and what readiness looks like.",
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt: 'Hydrodemolition on a UK water industry asset refurbishment',
    category: 'Industry',
    galleryTags: ['Hydrodemolition'],
  },
  '7450847249225375744': {
    postId: '7450847249225375744',
    slug: 'when-only-the-best-is-acceptable-linkedin',
    title: 'When Only the Best Is Acceptable',
    excerpt:
      'Some projects can\'t accept the second-best option on cost, availability, or support. When the brief leaves no margin for compromise, this is what we bring.',
    heroImage: '/images/machines/brokk800.jpg',
    heroAlt: 'Brokk 800 robotic demolition machine in heavy operation',
    category: 'Fleet',
    galleryTags: ['Robotic Demolition', 'Machine Hire'],
  },
  '7449365498489868290': {
    postId: '7449365498489868290',
    slug: 'monday-brokks-loading-up-linkedin',
    title: 'Monday Loading — Brokks and Husqvarnas Heading Out',
    excerpt:
      "It's Monday. The Brokks and Husqvarna systems are getting loaded up for another week contracting on client sites across Great Britain and Ireland.",
    heroImage: '/images/services/machine-hire-hero.jpg',
    heroAlt: 'Brokk and Husqvarna robotic demolition fleet being loaded for site work',
    category: 'Fleet',
    galleryTags: ['Machine Hire', 'Robotic Demolition'],
  },
  '7447932685961998336': {
    postId: '7447932685961998336',
    slug: 'breaking-into-bank-vaults-legally-linkedin',
    title: "Breaking Into Bank Vaults — Legally (No Sweeney Required)",
    excerpt:
      "Normally when you're breaking into bank vaults, you hear words made famous by The Sweeney. Thankfully, when we do it, it's the legal kind — for landlords converting former branches.",
    heroImage: '/images/projects/brokk-800-bank-vault.jpg',
    heroAlt: 'Brokk 800 robotic demolition machine breaking into a reinforced concrete bank vault',
    category: 'Project',
    galleryTags: ['Robotic Demolition'],
  },
  '7442177882300276736': {
    postId: '7442177882300276736',
    slug: 'highways-to-hell-thirty-years-remote-demolition-linkedin',
    title: 'Highways to Hell — Or Heaven, With Gnat UK',
    excerpt:
      'Thirty years of remote demolition across the highways and infrastructure sector. Robotic demolition, diamond cutting, hydrodemolition, cold cutting — under one roof, one method-led team.',
    heroImage: '/images/blog/hydroblasting-city-bridge-deck.jpg',
    heroAlt: 'Aquajet hydrodemolition robot working on a UK highway bridge deck',
    category: 'Industry',
    galleryTags: ['Hydrodemolition', 'Diamond Drilling', 'Robotic Demolition'],
  },
  '7439983421285662720': {
    postId: '7439983421285662720',
    slug: 'costain-rugby-newbold-amp8-moving-to-delivery-linkedin',
    title: "Costain's £45m at Rugby Newbold — AMP8 Moving to Delivery",
    excerpt:
      "Costain's £45m award at Rugby Newbold is another clear signal that AMP8 wastewater upgrades are moving into delivery. The challenge of working in live treatment environments.",
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt: 'Hydrodemolition work on a UK wastewater treatment asset',
    category: 'Industry',
    galleryTags: ['Hydrodemolition'],
  },
  '7440497868857126912': {
    postId: '7440497868857126912',
    slug: 'masterpiece-in-hydrodemolition-linkedin',
    title: 'A Masterpiece in Hydrodemolition',
    excerpt:
      "Not a Mona Lisa — but a masterpiece in hydrodemolition. When remote demolition is the preferred method, here's what good looks like.",
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt: 'Aquajet hydrodemolition robot mid-operation on a concrete element',
    category: 'Method',
    galleryTags: ['Hydrodemolition'],
  },
};

const idify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Image upload helper (same throttle/retry pattern as migrate-to-sanity.ts)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function uploadAsset(publicPath: string, attempt = 1): Promise<string | null> {
  const file = path.join(PROJECT_ROOT, 'public', publicPath.replace(/^\//, ''));
  if (!fs.existsSync(file)) {
    console.warn(`  skip (file missing): ${publicPath}`);
    return null;
  }
  await sleep(80);
  try {
    const asset = await client.assets.upload('image', fs.readFileSync(file), {
      filename: path.basename(file),
    });
    return asset._id;
  } catch (err) {
    const code = (err as { statusCode?: number }).statusCode ?? 0;
    if (attempt <= 3 && (code >= 500 || code === 0)) {
      await sleep(1000 * attempt);
      return uploadAsset(publicPath, attempt + 1);
    }
    throw err;
  }
}

type LinkedInPost = {
  url: string;
  postId: string;
  text: string;
  date: string;
  imageFiles?: string[];
};

function toPortableTextBlocks(text: string, sourceUrl: string) {
  // Split LinkedIn body on blank lines → paragraphs. Discard empty segments.
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Append a "Originally posted on LinkedIn" credit line as the last paragraph.
  paragraphs.push(`Originally posted on LinkedIn: ${sourceUrl}`);

  return paragraphs.map((paraText) => ({
    _type: 'block' as const,
    _key: Math.random().toString(36).slice(2, 11),
    style: 'normal' as const,
    markDefs: [],
    children: [
      {
        _type: 'span' as const,
        _key: Math.random().toString(36).slice(2, 11),
        text: paraText.replace(/\n/g, ' '), // collapse intra-paragraph newlines
        marks: [],
      },
    ],
  }));
}

async function importPosts() {
  const sourcePath = '/Users/kesterhodgson/Downloads/nick-linkedin-posts.json';
  const raw = JSON.parse(fs.readFileSync(sourcePath, 'utf8')) as LinkedInPost[];
  console.log(`Importing ${raw.length} LinkedIn posts to Sanity project ${projectId}\n`);

  const nickRef = { _type: 'reference' as const, _ref: 'author-nick-turnbull' };

  for (const post of raw) {
    // Find metadata by post ID — falls back to a generic if not curated.
    const meta =
      META[post.postId] ??
      Object.values(META).find((m) => post.text.toLowerCase().includes('masterpiece')) ??
      ({} as Partial<PostMeta>);

    if (!meta.slug) {
      console.warn(`  skip (no curated metadata for postId ${post.postId})`);
      continue;
    }

    const _id = `post-${idify(meta.slug)}`;
    const heroAssetId = meta.heroImage ? await uploadAsset(meta.heroImage) : null;

    await client.createOrReplace({
      _id,
      _type: 'blogPost',
      title: meta.title,
      slug: { _type: 'slug', current: meta.slug },
      excerpt: meta.excerpt,
      body: toPortableTextBlocks(post.text, post.url),
      date: post.date,
      category: meta.category,
      surfaces: ['blog'], // All LinkedIn ports are blog/news entries
      galleryTags: meta.galleryTags,
      heroImage: heroAssetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: heroAssetId },
            alt: meta.heroAlt,
          }
        : undefined,
      author: nickRef,
    });
    console.log(`  ✓ ${meta.slug}`);
  }

  console.log('\nDone.');
}

importPosts().catch((err) => {
  console.error(err);
  process.exit(1);
});
