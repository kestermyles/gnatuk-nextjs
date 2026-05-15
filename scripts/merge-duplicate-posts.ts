/**
 * Consolidate duplicate posts identified in the 15 May dedup review.
 *
 * For each (dupe → canonical) pair:
 *   1. Fetches both bodies, appends dupe body under an H2 separator
 *   2. Stores the dupe's wixSlug + slug on the canonical so legacy URLs still
 *      resolve via the redirects in next.config.js
 *   3. Renames /public/images/blog-extras/<dupe>-extra-*.jpg to extend the
 *      canonical's existing run (canonical-extra-N+1, N+2, …)
 *   4. Deletes the dupe Sanity document
 *
 * Run:   pnpm tsx scripts/merge-duplicate-posts.ts
 * Needs: SANITY_API_WRITE_TOKEN env var.
 *
 * Safe to re-run — uses idempotent operations and skips dupes already gone.
 */

import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const EXTRAS_DIR = path.join(process.cwd(), 'public/images/blog-extras');

// dupe slug → canonical slug. Confirmed visually + via hero-ref overlap.
const MERGES: Array<{ dupe: string; canonical: string; reason: string }> = [
  {
    dupe: 'top-down-refractory-vessel-demolition-linkedin',
    canonical: 'refractory-vessel-cold-cut-brokk-debricking',
    reason: 'Identical hero ref — LinkedIn restatement of the case study',
  },
  {
    dupe: 'breaking-into-bank-vaults-legally-linkedin',
    canonical: 'bank-of-england-vault-grade-1-london',
    reason: 'LinkedIn marketing post about the same Bank of England vault job',
  },
  {
    dupe: 'bank-vault-demolition-brokk-husqvarna',
    canonical: 'bank-of-england-vault-grade-1-london',
    reason: 'Insight piece on same bank vault project, different equipment angle',
  },
  {
    dupe: 'brokk-60-refractory-kiln-strip',
    canonical: 'chromium-kiln-debricking-elementis',
    reason: 'Same Elementis chromium kiln job — Brokk 60 in the same vessel',
  },
];

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

function existingExtraCount(canonicalSlug: string): number {
  let files: string[] = [];
  try {
    files = fs.readdirSync(EXTRAS_DIR);
  } catch {
    return 0;
  }
  const re = new RegExp(`^${canonicalSlug}-extra-(\\d+)\\.[a-z0-9]+$`, 'i');
  let max = 0;
  for (const f of files) {
    const m = f.match(re);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max;
}

function moveDupeExtras(dupeSlug: string, canonicalSlug: string): number {
  let files: string[] = [];
  try {
    files = fs.readdirSync(EXTRAS_DIR);
  } catch {
    return 0;
  }
  const re = new RegExp(`^${dupeSlug}-extra-(\\d+)\\.([a-z0-9]+)$`, 'i');
  const dupeFiles = files
    .map((f) => ({ f, m: f.match(re) }))
    .filter((x): x is { f: string; m: RegExpMatchArray } => Boolean(x.m))
    .sort((a, b) => parseInt(a.m[1], 10) - parseInt(b.m[1], 10));

  if (dupeFiles.length === 0) return 0;

  let next = existingExtraCount(canonicalSlug) + 1;
  for (const { f, m } of dupeFiles) {
    const ext = m[2];
    const newName = `${canonicalSlug}-extra-${next}.${ext}`;
    const from = path.join(EXTRAS_DIR, f);
    const to = path.join(EXTRAS_DIR, newName);
    if (fs.existsSync(to)) {
      console.log(`     ↷ skip ${f} → ${newName} (target already exists)`);
    } else {
      fs.renameSync(from, to);
      console.log(`     ↪ ${f} → ${newName}`);
    }
    next++;
  }
  return dupeFiles.length;
}

async function merge(dupeSlug: string, canonicalSlug: string, reason: string) {
  console.log(`\n━━━ ${dupeSlug} → ${canonicalSlug} ━━━`);
  console.log(`  Reason: ${reason}`);

  const [dupe, canonical] = await Promise.all([
    client.fetch<{ _id: string; title: string; body: PTBlock[]; wixSlug?: string } | null>(
      `*[_type == "blogPost" && slug.current == $s][0]{_id, title, body, wixSlug}`,
      { s: dupeSlug },
    ),
    client.fetch<{ _id: string; title: string; body: PTBlock[] } | null>(
      `*[_type == "blogPost" && slug.current == $s][0]{_id, title, body}`,
      { s: canonicalSlug },
    ),
  ]);

  if (!dupe) {
    console.log('  ✓ Dupe already removed — skipping.');
    return;
  }
  if (!canonical) {
    console.log(`  ✗ Canonical "${canonicalSlug}" missing. Aborting.`);
    return;
  }

  // 1. Append dupe body to canonical (with H2 separator)
  const separator = buildSeparatorBlock(dupe.title);
  const dupeBlocks = (dupe.body ?? []).map(rekeyBlock);
  const mergedBody = [...(canonical.body ?? []), separator, ...dupeBlocks];
  console.log(`  Appending ${dupeBlocks.length} blocks under H2 "Related context: ${dupe.title}"`);

  await client.patch(canonical._id).set({ body: mergedBody }).commit();
  console.log(`  ✓ Body merged into ${canonicalSlug}`);

  // 2. Move blog-extras files
  const moved = moveDupeExtras(dupeSlug, canonicalSlug);
  console.log(`  ✓ Moved ${moved} extras to ${canonicalSlug}-extra-*`);

  // 3. Delete dupe
  await client.delete(dupe._id);
  console.log(`  ✓ Deleted Sanity doc ${dupe._id}`);
}

async function main() {
  console.log('Consolidating duplicate posts…');
  for (const m of MERGES) {
    try {
      await merge(m.dupe, m.canonical, m.reason);
    } catch (err) {
      console.error(`  ✗ Failed: ${m.dupe} → ${m.canonical}`);
      console.error(err);
    }
  }
  console.log('\nDone. Remember to deploy redirects via next.config.js.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
