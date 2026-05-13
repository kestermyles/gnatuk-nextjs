/**
 * One-time migration script: seed Sanity with the current static content.
 *
 * Run:   pnpm tsx scripts/migrate-to-sanity.ts
 * Needs: SANITY_API_WRITE_TOKEN env var (create one in Sanity → API → Tokens)
 *        plus NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.
 *
 * What it does:
 *   1. Reads the BLOG / AUTHORS / ACCREDITATIONS arrays from lib/
 *   2. Uploads every referenced image (hero + carousel extras + logos) as a
 *      Sanity asset, mapping local path -> asset _id
 *   3. Creates author + accreditation documents
 *   4. Creates blogPost documents with references to the authors and asset _ids
 *
 * Safe to re-run: uses createOrReplace on stable IDs so a second run updates
 * rather than duplicating.
 */

import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOG } from '../lib/blog';
import { AUTHORS } from '../lib/authors';
import { ACCREDITATIONS } from '../lib/accreditations';

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

// Slugify helper for deterministic Sanity _id values.
const idify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Upload a local image (path under /public) as a Sanity asset.
// Returns the asset _id. Caches by path so each image is only uploaded once
// per run. Includes throttling + retry to handle Sanity's 25 req/sec rate limit
// and occasional upstream 502s.
const assetCache = new Map<string, string>();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function uploadAsset(publicPath: string, attempt = 1): Promise<string | null> {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)!;
  const file = path.join(PROJECT_ROOT, 'public', publicPath.replace(/^\//, ''));
  if (!fs.existsSync(file)) {
    console.warn(`  skip (file missing): ${publicPath}`);
    return null;
  }
  // Throttle: 80ms between uploads = ~12 req/sec, well under the 25/sec limit.
  await sleep(80);
  const buf = fs.readFileSync(file);
  try {
    const asset = await client.assets.upload('image', buf, {
      filename: path.basename(file),
    });
    assetCache.set(publicPath, asset._id);
    return asset._id;
  } catch (err: unknown) {
    const e = err as { statusCode?: number; message?: string };
    const code = e.statusCode ?? 0;
    // Retry once on 5xx / network errors with exponential backoff.
    if (attempt <= 3 && (code >= 500 || code === 0)) {
      const wait = 1000 * attempt;
      console.warn(`  retry ${attempt}/3 after ${wait}ms: ${publicPath} (${code})`);
      await sleep(wait);
      return uploadAsset(publicPath, attempt + 1);
    }
    throw err;
  }
}

async function migrateAuthors() {
  console.log('--- Authors ---');
  for (const [, bio] of Object.entries(AUTHORS)) {
    const _id = `author-${idify(bio.name)}`;
    await client.createOrReplace({
      _id,
      _type: 'author',
      name: bio.name,
      role: bio.role,
      blurb: bio.blurb,
    });
    console.log(`  ✓ ${bio.name} (${_id})`);
  }
}

async function migrateAccreditations() {
  console.log('--- Accreditations ---');
  for (let i = 0; i < ACCREDITATIONS.length; i++) {
    const a = ACCREDITATIONS[i];
    const _id = `accreditation-${idify(a.name)}`;
    const logoAssetId = a.logo ? await uploadAsset(a.logo) : null;
    await client.createOrReplace({
      _id,
      _type: 'accreditation',
      name: a.name,
      level: a.level,
      blurb: a.blurb,
      schemeUrl: a.schemeUrl,
      sortOrder: i + 1,
      ...(logoAssetId
        ? { logo: { _type: 'image', asset: { _type: 'reference', _ref: logoAssetId } } }
        : {}),
    });
    console.log(`  ✓ ${a.name}`);
  }
}

async function migratePosts() {
  console.log('--- Blog posts ---');
  for (const p of BLOG) {
    const _id = `post-${idify(p.slug)}`;
    const heroAssetId = await uploadAsset(p.heroImage);

    // Carousel extras for this post (max 2 — same cap as the gallery).
    const extras: { _type: 'image'; asset: { _type: 'reference'; _ref: string }; alt?: string }[] = [];
    const extrasDir = path.join(PROJECT_ROOT, 'public', 'images', 'blog-extras');
    if (fs.existsSync(extrasDir)) {
      const matched = fs
        .readdirSync(extrasDir)
        .filter((f) => f.startsWith(`${p.slug}-extra-`))
        .sort()
        .slice(0, 2);
      for (const file of matched) {
        const assetId = await uploadAsset(`/images/blog-extras/${file}`);
        if (assetId) {
          extras.push({
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
            alt: `${p.heroAlt} (additional view)`,
          });
        }
      }
    }

    // Convert plain string paragraphs into Sanity portable-text blocks.
    const body = p.body.map((text) => ({
      _type: 'block' as const,
      _key: Math.random().toString(36).slice(2, 11),
      style: 'normal' as const,
      markDefs: [],
      children: [{ _type: 'span' as const, _key: Math.random().toString(36).slice(2, 11), text, marks: [] }],
    }));

    const authorRef = `author-${idify(p.author)}`;

    await client.createOrReplace({
      _id,
      _type: 'blogPost',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      originalTitle: p.originalTitle,
      wixSlug: p.wixSlug,
      excerpt: p.excerpt,
      body,
      date: p.date,
      category: p.category,
      surfaces: p.surfaces,
      galleryTags: p.galleryTags,
      heroImage: heroAssetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: heroAssetId },
            alt: p.heroAlt,
          }
        : undefined,
      galleryExtras: extras.length ? extras : undefined,
      author: { _type: 'reference', _ref: authorRef },
    });
    console.log(`  ✓ ${p.slug} (hero + ${extras.length} extras)`);
  }
}

async function main() {
  console.log(`Migrating to Sanity project "${projectId}" / dataset "${dataset}"\n`);
  await migrateAuthors();
  await migrateAccreditations();
  await migratePosts();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
