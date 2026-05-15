/**
 * One-shot: replaces Nick's Sanity headshot with the newer Nick-Turnbull-GnatUK.jpeg.
 * Uploads the new asset, repoints the author doc, leaves the old asset orphaned
 * (Sanity will GC eventually; no functional impact).
 *
 * Run: SANITY_API_WRITE_TOKEN=... pnpm tsx scripts/replace-nick-headshot.ts
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const file = '/Users/kesterhodgson/gnatuk/Nick-Turnbull-GnatUK.jpeg';
  const buffer = fs.readFileSync(file);
  const asset = await client.assets.upload('image', buffer, {
    filename: 'nick-turnbull-gnatuk.jpeg',
  });
  console.log(`✓ Uploaded new headshot asset: ${asset._id}`);

  await client
    .patch('author-nick-turnbull')
    .set({
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .commit();
  console.log('✓ Repointed author-nick-turnbull image to the new asset');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
