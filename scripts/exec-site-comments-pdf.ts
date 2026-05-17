/**
 * Executes the changes from "Site comments-in progress.pdf" (17 May 2026):
 *
 *   1. NALTA insight  — swap hero image (NALTA-Hydrodem-System.webp from Wix
 *      asset library); the existing hero stays as extra-1, new "concrete-
 *      removal" image is extra-2.
 *
 *   2. Chromium Kiln case study — swap hero image to the external Elementis
 *      kiln-strip building photo (elementis-Chromium-Kiln-Strip.jpg).
 *
 * Idempotent — reuploads the asset every run, but re-pointing the doc is
 * a no-op when the asset reference is unchanged.
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const PUBLIC_ROOT = path.join(process.cwd(), 'public');

type HeroSwap = {
  /** Sanity doc id (post-<slug>). */
  postId: string;
  /** Friendly label for log output. */
  label: string;
  /** New hero image path under /public. */
  newHeroPath: string;
  /** Alt text for the new hero. */
  newHeroAlt: string;
};

const HERO_SWAPS: HeroSwap[] = [
  {
    postId: 'post-nalta-hydrodemolition-system',
    label: 'NALTA Hydrodemolition System (Insight)',
    newHeroPath: '/images/blog-extras/nalta-hydrodemolition-system-hero.webp',
    newHeroAlt:
      'NALTA remote-controlled hydrodemolition lance close-up — the oscillating head working a concrete surface in a petrochemical environment',
  },
  {
    postId: 'post-chromium-kiln-debricking-elementis',
    label: 'Chromium Kiln Debricking — Elementis (Case Study)',
    newHeroPath: '/images/blog-extras/chromium-kiln-debricking-elementis-hero.jpg',
    newHeroAlt:
      'The Elementis chromium kiln building exterior — the industrial process plant where the six-kiln refractory strip-out was delivered',
  },
];

async function uploadAsset(publicPath: string): Promise<string> {
  const filepath = path.join(PUBLIC_ROOT, publicPath.replace(/^\//, ''));
  const buffer = fs.readFileSync(filepath);
  const ext = filepath.split('.').pop()?.toLowerCase();
  const mimeMap: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
  };
  const filename = path.basename(filepath);
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: mimeMap[ext ?? ''] ?? 'application/octet-stream',
  });
  return asset._id;
}

async function applyHeroSwap(swap: HeroSwap) {
  console.log(`\n━━━ ${swap.label} ━━━`);

  const post = await client.fetch(`*[_id == $id][0]{_id, title}`, { id: swap.postId });
  if (!post) {
    console.log(`  ✗ Post not found: ${swap.postId}`);
    return;
  }

  const assetId = await uploadAsset(swap.newHeroPath);
  console.log(`  ✓ Uploaded asset: ${assetId}`);

  await client
    .patch(swap.postId)
    .set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: swap.newHeroAlt,
      },
    })
    .commit();
  console.log(`  ✓ Patched ${swap.postId} heroImage`);
}

async function main() {
  console.log('Executing site-comments PDF actions…');
  for (const swap of HERO_SWAPS) {
    try {
      await applyHeroSwap(swap);
    } catch (err) {
      console.error(`  ✗ Failed: ${swap.label}`);
      console.error(err);
    }
  }
  console.log('\nDone. Per-post extras (on-disk files) are picked up by the carousel automatically on next ISR revalidation.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
