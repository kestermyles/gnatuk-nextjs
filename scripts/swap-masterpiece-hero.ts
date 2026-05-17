/**
 * Swap the hero for post-masterpiece-in-hydrodemolition-linkedin to the
 * NALTA concrete-removal shot — gives the post genuine hydrodemolition
 * imagery instead of the shared LinkedIn-fallback Brokk close-up that
 * three different blog cards were rendering with.
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

const SOURCE = '/Users/kesterhodgson/Downloads/ci-media_pictures_2026-05-17_1700/Pictures/Nalta-Concrete-Removal.jpg';

async function main() {
  const buffer = fs.readFileSync(SOURCE);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(SOURCE),
    contentType: 'image/jpeg',
  });
  console.log(`✓ Uploaded asset: ${asset._id}`);

  await client
    .patch('post-masterpiece-in-hydrodemolition-linkedin')
    .set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: 'NALTA remote hydrodemolition rig stripping deteriorated concrete from reinforced rebar, the rebar emerging clean and bond-ready — selective concrete removal at its highest precision',
      },
    })
    .commit();
  console.log('✓ Patched post-masterpiece-in-hydrodemolition-linkedin heroImage');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
