/**
 * Deletes the Mast-Climber Manipulator System for Refractory Kiln De-Bricking
 * Insight post per Keith's review (17 May 2026 — "Delete X").
 *
 * Redirect target: /industries/process-refractory — same subject area, much
 * stronger sector context than the standalone post.
 *
 * Idempotent — re-runnable.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const DOC_ID = 'post-mast-climber-refractory-kiln-debricking';

async function main() {
  const existing = await client.fetch(`*[_id == $id][0]{_id, title}`, { id: DOC_ID });
  if (!existing) {
    console.log(`✓ Already gone: ${DOC_ID}`);
    return;
  }
  console.log(`Deleting: ${existing.title} (${existing._id})`);
  await client.delete(DOC_ID);
  console.log('✓ Deleted. Remember to add /blog/mast-climber-refractory-kiln-debricking → /industries/process-refractory redirect in next.config.js.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
