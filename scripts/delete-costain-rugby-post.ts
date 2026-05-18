/**
 * Delete the Costain Rugby Newbold AMP8 LinkedIn cross-post per Keith Sr.'s
 * 18 May review. Hero options were all compromises (no genuine project
 * photo exists in the archive), and the post is shallow LinkedIn copy that
 * the AMP8 Infrastructure Wave post and /industries/water already cover
 * more comprehensively.
 *
 * Redirect target: /industries/water (canonical AMP8 destination).
 * Idempotent — re-runnable; skips if already gone.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const DOC_ID = 'post-costain-rugby-newbold-amp8-moving-to-delivery-linkedin';

async function main() {
  const existing = await client.fetch(`*[_id == $id][0]{_id, title}`, { id: DOC_ID });
  if (!existing) {
    console.log(`✓ Already gone: ${DOC_ID}`);
    return;
  }
  console.log(`Deleting: ${existing.title} (${existing._id})`);
  await client.delete(DOC_ID);
  console.log('✓ Deleted. Add 301 redirect in next.config.js → /industries/water');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
