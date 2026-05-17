/**
 * Swap heroes for the two remaining LinkedIn posts that shared the
 * Brokk-cab fallback image, killing the /blog visual duplication.
 *
 *   • AMP8 Infrastructure Wave   → still-jetty.jpg (riverside water-asset
 *     dock work — genuine water-industry context)
 *   • Costain Rugby Newbold AMP8 → ColdCutting.jpg (industrial chimneys
 *     + GnatUK fleet van — Tier-1 partnership scale)
 *
 * Both files are real GNAT project photos from Keith's archive.
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

const PICTURES = '/Users/kesterhodgson/Downloads/ci-media_pictures_2026-05-17_1700/Pictures';

type Swap = { postId: string; filename: string; alt: string };

const SWAPS: Swap[] = [
  {
    postId: 'post-amp8-mothballed-sites-infrastructure-readiness-linkedin',
    filename: 'still-jetty.jpg',
    alt: 'GNAT UK robotic plant on a riverside water-industry dock — selective demolition and removal works on an asset being brought back into service, water management hose running into the channel alongside',
  },
  {
    postId: 'post-costain-rugby-newbold-amp8-moving-to-delivery-linkedin',
    filename: 'ColdCutting.jpg',
    alt: 'GNAT UK Brokk Hire fleet van staged at a Tier-1 contractor project site — tall industrial chimneys above with crane and access platform deployed against a clear blue sky, hi-vis operator alongside the van',
  },
];

async function applySwap(swap: Swap) {
  const filepath = path.join(PICTURES, swap.filename);
  const buffer = fs.readFileSync(filepath);
  const ext = swap.filename.split('.').pop()?.toLowerCase() ?? 'jpg';
  const contentType = ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

  const asset = await client.assets.upload('image', buffer, {
    filename: swap.filename,
    contentType,
  });
  console.log(`  ✓ Uploaded asset: ${asset._id}`);

  await client
    .patch(swap.postId)
    .set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: swap.alt,
      },
    })
    .commit();
  console.log(`  ✓ Patched ${swap.postId}`);
}

async function main() {
  for (const swap of SWAPS) {
    console.log(`\n━━━ ${swap.postId} ← ${swap.filename} ━━━`);
    await applySwap(swap);
  }
  console.log('\nDone. /blog visual duplication resolved.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
