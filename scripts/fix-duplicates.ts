/**
 * Cleanup script — fixes the duplicates surfaced by audit-duplicates.ts.
 *
 * Run:   pnpm tsx scripts/fix-duplicates.ts
 *
 * What it does:
 *   1. Consolidates the duplicate "Keith" author record into "Keith Hodgson"
 *      (they refer to the same person). Reassigns all posts authored by
 *      author-keith to author-keith-hodgson, then deletes author-keith.
 *
 *   2. Removes galleryTags from all LinkedIn-sourced posts. These are blog/
 *      marketing posts using generic fallback hero images already in use by
 *      actual case studies — they shouldn't appear in the gallery (which is
 *      for project imagery), and removing them eliminates the visual
 *      duplicates flagged in the audit.
 *
 * Safe to re-run.
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const KEITH_DUP_ID = 'author-keith';
const KEITH_CANONICAL_ID = 'author-keith-hodgson';

async function consolidateKeith() {
  console.log('━━━ Consolidating Keith author records ━━━');

  const dup = await client.fetch(`*[_id == $id][0]`, { id: KEITH_DUP_ID });
  const canonical = await client.fetch(`*[_id == $id][0]`, { id: KEITH_CANONICAL_ID });

  if (!dup) {
    console.log('  ✓ No "Keith" duplicate found — already consolidated.');
    return;
  }
  if (!canonical) {
    console.log('  ✗ Canonical "Keith Hodgson" record missing. Aborting.');
    return;
  }

  const postsToUpdate = await client.fetch<{ _id: string; slug: { current: string } }[]>(
    `*[_type == "blogPost" && author._ref == $id]{_id, slug}`,
    { id: KEITH_DUP_ID },
  );
  console.log(`  Reassigning ${postsToUpdate.length} posts to Keith Hodgson:`);
  for (const p of postsToUpdate) {
    await client
      .patch(p._id)
      .set({ author: { _type: 'reference', _ref: KEITH_CANONICAL_ID } })
      .commit();
    console.log(`     • ${p.slug.current}`);
  }

  await client.delete(KEITH_DUP_ID);
  console.log(`  ✓ Deleted ${KEITH_DUP_ID}`);
}

async function removeLinkedInGalleryTags() {
  console.log('\n━━━ Removing galleryTags from LinkedIn posts ━━━');
  // LinkedIn-imported posts have slugs ending in "-linkedin"
  const posts = await client.fetch<{ _id: string; slug: { current: string }; galleryTags: string[] | null }[]>(
    `*[_type == "blogPost" && slug.current match "*-linkedin"]{_id, slug, galleryTags}`,
  );
  console.log(`  Found ${posts.length} LinkedIn posts`);
  let unset = 0;
  for (const p of posts) {
    if (!p.galleryTags || p.galleryTags.length === 0) continue;
    await client.patch(p._id).unset(['galleryTags']).commit();
    console.log(`     • ${p.slug.current} (had ${p.galleryTags.length} tags)`);
    unset++;
  }
  if (unset === 0) console.log('  ✓ No LinkedIn posts had galleryTags set.');
  else console.log(`  ✓ Removed galleryTags from ${unset} posts.`);
}

async function main() {
  await consolidateKeith();
  await removeLinkedInGalleryTags();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
