/**
 * Restructures Nick's Sanity bio into three paragraphs so the AuthorBio card
 * (which renders only para 1) becomes a tight 28-word summary, while the
 * /authors/nick-turnbull page still gets the full context.
 *
 * Run: SANITY_API_WRITE_TOKEN=... pnpm tsx scripts/restructure-nick-bio.ts
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const blurb = [
  "Nick is the Managing Director and founder of GNAT UK Limited, with more than 40 years' experience leading specialist demolition on confined-access, structurally sensitive and live-environment schemes.",
  'GNAT UK is the specialist remote demolition and contracting firm operating across Great Britain and Ireland. Under Nick\'s direction, the team delivers Robotic Demolition (Brokk and Husqvarna fleet), Diamond Wire Cutting and Concrete Sawing, Hydrodemolition and Abrasive Cold Cutting.',
  'His project portfolio spans COMAH-regulated industrial sites, oil & gas, water infrastructure (AMP8), Highways, Offshore Decommissioning, Tunneling and Process and Manufacturing Industry environments.',
].join('\n\n');

async function main() {
  await client.patch('author-nick-turnbull').set({ blurb }).commit();
  console.log('✓ Updated bio (3 paragraphs)');
  console.log('\nNew blurb:\n');
  console.log(blurb);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
