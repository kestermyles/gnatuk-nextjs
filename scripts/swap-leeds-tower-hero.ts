/**
 * Swap the low-res hero on post-top-down-robotic-demolition-leeds-tower
 * with the new high-res Top-down-Banner.webp (2560x950) Keith placed in
 * the repo root.
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

async function main() {
  const filepath = path.join(process.cwd(), 'Top-down-Banner.webp');
  const buffer = fs.readFileSync(filepath);
  const asset = await client.assets.upload('image', buffer, {
    filename: 'top-down-leeds-tower-banner.webp',
    contentType: 'image/webp',
  });
  console.log(`✓ Uploaded asset: ${asset._id}`);

  await client
    .patch('post-top-down-robotic-demolition-leeds-tower')
    .set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: 'Top-down robotic demolition in progress on the Leeds tower — Brokk excavator perched on a partially-deconstructed rooftop floor, GNAT UK operator in orange hi-vis and full harness watching from the working edge with the Leeds residential rooftops stretching out behind',
      },
    })
    .commit();
  console.log('✓ Patched post-top-down-robotic-demolition-leeds-tower heroImage');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
