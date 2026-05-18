/**
 * Executes the changes from "pdf tweakss.pdf" (18 May 2026):
 *
 *   1. /blog/husqvarna-140-archimedes-screw-trough — swap hero to the new
 *      Archimedes-Banner.webp (wide shot of the Husqvarna inside the
 *      green-walled trough excavation). Two more carousel images
 *      (Archimedes-Screw-Remote-Access + ArchimedesScrew-Deconstructionbanner)
 *      already staged into /public/images/blog-extras/ — picked up
 *      automatically by the PostCarousel on next ISR.
 *
 *   2. /blog/brokk-330-steel-shears-spaghetti-junction — swap hero to the
 *      new Steel Shears-Banner.webp (wide industrial-roof shot with the
 *      Brokk 330 and steel shears in foreground, hi-vis operator visible).
 *
 * British Steel banner / process-refractory hub gallery handled directly in
 * lib/industries.ts (not Sanity-driven). Chromium Kiln cleanup confirmed
 * already complete in commit 518a24c.
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

const TWEAKED = path.join(process.cwd(), 'TWEAKED FILES');

type Swap = {
  postId: string;
  label: string;
  sourceFile: string;
  alt: string;
};

const SWAPS: Swap[] = [
  {
    postId: 'post-husqvarna-140-archimedes-screw-trough',
    label: 'Husqvarna 140 Archimedes Screw Trough (Case Study)',
    sourceFile: 'Archimedes-Banner.webp',
    alt: 'Husqvarna DXR140 robot inside a 40-degree Archimedes screw trough excavation — green algae-stained walls of the operational asset, twin work-lights illuminating the working face, concrete screed being selectively removed',
  },
  {
    postId: 'post-brokk-330-steel-shears-spaghetti-junction',
    label: 'Brokk 330 with Steel Shears Removes Factory Roof Pipework (Case Study)',
    sourceFile: 'Steel Shears-Banner.webp',
    alt: 'Brokk 330 robotic demolition machine deployed inside a factory roof void — GnatUK-branded plant in the foreground with Atlas Copco steel shears attachment, hi-vis operator observing remotely, twisted pipework being severed in the dimly-lit industrial space',
  },
];

async function uploadAsset(filename: string): Promise<string> {
  const filepath = path.join(TWEAKED, filename);
  const buffer = fs.readFileSync(filepath);
  const ext = filename.split('.').pop()?.toLowerCase();
  const mimeMap: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
  };
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: mimeMap[ext ?? ''] ?? 'application/octet-stream',
  });
  return asset._id;
}

async function applySwap(swap: Swap) {
  console.log(`\n━━━ ${swap.label} ━━━`);
  const post = await client.fetch(`*[_id == $id][0]{_id, title}`, { id: swap.postId });
  if (!post) {
    console.log(`  ✗ Post not found: ${swap.postId}`);
    return;
  }
  const assetId = await uploadAsset(swap.sourceFile);
  console.log(`  ✓ Uploaded asset: ${assetId}`);
  await client
    .patch(swap.postId)
    .set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: swap.alt,
      },
    })
    .commit();
  console.log(`  ✓ Patched ${swap.postId} heroImage`);
}

async function main() {
  console.log('Executing tweakss PDF swaps…');
  for (const swap of SWAPS) {
    await applySwap(swap);
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
