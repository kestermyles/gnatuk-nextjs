/**
 * Audit script — surfaces duplicates and overlaps across the site content.
 *
 * Run:   pnpm tsx scripts/audit-duplicates.ts
 * Needs: same env vars as migrate-to-sanity.ts (just read access required).
 *
 * Reports:
 *   1. Author duplicates (e.g. "Keith" vs "Keith Hodgson")
 *   2. Duplicate hero images (same image file used by ≥2 posts)
 *   3. Same-slug posts (shouldn't exist; data corruption check)
 *   4. Highly similar titles / themes
 *   5. Gallery-surface posts sharing a hero (= visual dupes in /gallery)
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

type Post = {
  _id: string;
  slug: string;
  title: string;
  date: string;
  heroImageUrl: string | null;
  heroImageRef: string | null;
  surfaces: string[];
  galleryTags: string[] | null;
  authorRef: string;
  authorName: string;
};

type Author = { _id: string; name: string; role: string };

async function audit() {
  const authors: Author[] = await client.fetch(
    `*[_type == "author"]{_id, name, role}`,
  );
  const posts: Post[] = await client.fetch(`*[_type == "blogPost"]{
    _id,
    "slug": slug.current,
    title,
    date,
    "heroImageUrl": heroImage.asset->url,
    "heroImageRef": heroImage.asset._ref,
    surfaces,
    galleryTags,
    "authorRef": author._ref,
    "authorName": author->name,
  } | order(date desc)`);

  console.log(`Loaded ${authors.length} authors, ${posts.length} posts.\n`);

  // 1. Author duplicates
  console.log('━━━ 1. AUTHOR RECORDS ━━━');
  const authorsByNormalised = new Map<string, Author[]>();
  for (const a of authors) {
    const key = a.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12);
    (authorsByNormalised.get(key) ?? authorsByNormalised.set(key, []).get(key)!).push(a);
  }
  let authorDupes = 0;
  for (const [, group] of authorsByNormalised) {
    if (group.length > 1) {
      authorDupes++;
      console.log(`  ⚠ Probable dup: ${group.map((a) => `"${a.name}" (${a._id})`).join(' vs ')}`);
      // How many posts reference each?
      for (const a of group) {
        const count = posts.filter((p) => p.authorRef === a._id).length;
        console.log(`     • ${a._id} → ${count} posts`);
      }
    }
  }
  if (authorDupes === 0) console.log('  ✓ No author duplicates.');

  // 2. Duplicate hero images (same asset reference)
  console.log('\n━━━ 2. HERO IMAGE REUSE ━━━');
  const byHeroRef = new Map<string, Post[]>();
  for (const p of posts) {
    if (!p.heroImageRef) continue;
    (byHeroRef.get(p.heroImageRef) ?? byHeroRef.set(p.heroImageRef, []).get(p.heroImageRef)!).push(p);
  }
  let heroDupes = 0;
  for (const [, group] of byHeroRef) {
    if (group.length > 1) {
      heroDupes++;
      const url = group[0].heroImageUrl?.split('/').pop() ?? '<unknown>';
      console.log(`  ⚠ ${group.length} posts share hero "${url}":`);
      for (const p of group) console.log(`     • ${p.slug}`);
    }
  }
  if (heroDupes === 0) console.log('  ✓ No hero image reuse.');

  // 3. Slug duplicates (shouldn't exist)
  console.log('\n━━━ 3. SLUG UNIQUENESS ━━━');
  const slugCounts = new Map<string, number>();
  for (const p of posts) slugCounts.set(p.slug, (slugCounts.get(p.slug) ?? 0) + 1);
  let slugDupes = 0;
  for (const [slug, count] of slugCounts) {
    if (count > 1) {
      slugDupes++;
      console.log(`  ⚠ slug "${slug}" used ${count} times`);
    }
  }
  if (slugDupes === 0) console.log('  ✓ All slugs unique.');

  // 4. Thematic overlap by keyword
  console.log('\n━━━ 4. THEMATIC OVERLAP (posts grouped by keyword) ━━━');
  const themes: Record<string, RegExp> = {
    'bank vault': /bank\s*vault/i,
    'AMP8 / water': /amp8|wastewater|water (treatment|industry|utility)/i,
    refractory: /refractory|kiln/i,
    'top-down demolition': /top[\s-]?down/i,
    'fleet / Brokk specs': /brokk.*?(fleet|loaded|deploy|monday|diesel)/i,
    'hydrodemolition method': /(masterpiece|hand lancing|water jetting|aquajet) hydrodemolition|hydrodemolition (method|magic|masterpiece)/i,
    highways: /highway|motorway|bridge deck|parapet/i,
  };
  for (const [label, re] of Object.entries(themes)) {
    const matches = posts.filter((p) => re.test(p.title));
    if (matches.length > 1) {
      console.log(`  ◇ ${matches.length} posts touching "${label}":`);
      for (const m of matches) console.log(`     • ${m.slug}  [surfaces: ${m.surfaces.join(',')}]`);
    }
  }

  // 5. Gallery overlap — same hero used by multiple gallery-tagged posts
  console.log('\n━━━ 5. GALLERY VISUAL DUPLICATES ━━━');
  let galleryDupes = 0;
  for (const [, group] of byHeroRef) {
    const inGallery = group.filter((p) => p.galleryTags && p.galleryTags.length > 0);
    if (inGallery.length > 1) {
      galleryDupes++;
      const url = inGallery[0].heroImageUrl?.split('/').pop() ?? '<unknown>';
      console.log(`  ⚠ "${url}" appears ${inGallery.length}x in /gallery:`);
      for (const p of inGallery)
        console.log(`     • ${p.slug}  [tags: ${(p.galleryTags ?? []).join(',')}]`);
    }
  }
  if (galleryDupes === 0) console.log('  ✓ No gallery-image duplicates.');

  // Summary
  console.log('\n━━━ SUMMARY ━━━');
  console.log(`  Posts:               ${posts.length}`);
  console.log(`  Authors:             ${authors.length}`);
  console.log(`  Author duplicates:   ${authorDupes}`);
  console.log(`  Hero-image reuses:   ${heroDupes}`);
  console.log(`  Slug collisions:     ${slugDupes}`);
  console.log(`  Gallery dup heroes:  ${galleryDupes}`);
}

audit().catch((err) => {
  console.error(err);
  process.exit(1);
});
