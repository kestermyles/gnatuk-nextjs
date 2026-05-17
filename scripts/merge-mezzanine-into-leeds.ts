/**
 * Merges post-mezzanine-floor-deconstruction-warehouse INTO
 * post-leeds-factory-floor-cutting-track-saws (per "Site comments" PDF p.6 —
 * "These two are same job, so delete one"; Leeds wins on title strength
 * and SEO seniority).
 *
 * Steps:
 *   1. Append Mezzanine body to Leeds under an H2 separator.
 *   2. Delete the Mezzanine Sanity doc.
 *   3. Add 301 redirect /blog/mezzanine-floor-deconstruction-warehouse →
 *      /blog/leeds-factory-floor-cutting-track-saws via next.config.js
 *      (separate edit after this script runs).
 *
 * Idempotent — re-runnable; skips if Mezzanine already gone.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const DUPE_ID = 'post-mezzanine-floor-deconstruction-warehouse';
const CANONICAL_ID = 'post-leeds-factory-floor-cutting-track-saws';

type BlockChild = { _type: 'span'; _key: string; text: string; marks: string[] };
type PTBlock = {
  _type: 'block';
  _key: string;
  style: string;
  children: BlockChild[];
  markDefs?: unknown[];
};

function makeKey(): string {
  return Math.random().toString(36).slice(2, 14);
}

function buildSeparatorBlock(dupeTitle: string): PTBlock {
  return {
    _type: 'block',
    _key: makeKey(),
    style: 'h2',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: makeKey(),
        text: `Related context: ${dupeTitle}`,
        marks: [],
      },
    ],
  };
}

function rekeyBlock(block: PTBlock): PTBlock {
  return {
    ...block,
    _key: makeKey(),
    children: (block.children ?? []).map((c) => ({ ...c, _key: makeKey() })),
  };
}

async function main() {
  console.log('━━━ Mezzanine → Leeds Factory Floor merge ━━━');

  const [dupe, canonical] = await Promise.all([
    client.fetch<{ _id: string; title: string; body: PTBlock[] } | null>(
      `*[_id == $id][0]{_id, title, body}`,
      { id: DUPE_ID },
    ),
    client.fetch<{ _id: string; title: string; body: PTBlock[] } | null>(
      `*[_id == $id][0]{_id, title, body}`,
      { id: CANONICAL_ID },
    ),
  ]);

  if (!dupe) {
    console.log('  ✓ Mezzanine already removed — skipping.');
    return;
  }
  if (!canonical) {
    console.log('  ✗ Canonical Leeds post missing. Aborting.');
    return;
  }

  const separator = buildSeparatorBlock(dupe.title);
  const dupeBlocks = (dupe.body ?? []).map(rekeyBlock);
  const mergedBody = [...(canonical.body ?? []), separator, ...dupeBlocks];
  console.log(`  Appending ${dupeBlocks.length} blocks under H2 "Related context: ${dupe.title}"`);

  await client.patch(CANONICAL_ID).set({ body: mergedBody }).commit();
  console.log(`  ✓ Body merged into ${CANONICAL_ID}`);

  await client.delete(DUPE_ID);
  console.log(`  ✓ Deleted Sanity doc ${DUPE_ID}`);

  console.log('\nDone. Add the 301 redirect to next.config.js separately.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
