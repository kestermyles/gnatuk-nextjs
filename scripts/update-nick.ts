/**
 * Updates Nick Turnbull's Sanity author doc:
 *   1. New bio copy (15 May 2026 — Nick's revised wording)
 *   2. Attaches /Users/kesterhodgson/gnatuk/Nick Headshot.jpg as the author photo
 *
 * Run once after Keith confirms.  Idempotent — re-running just re-sets the
 * fields to the same values.
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

const blurb = `Nick is the Managing Director and founder of GNAT UK Limited, the specialist remote demolition and contracting firm operating across Great Britain and Ireland. With more than 40 years' experience in the sector, he leads the company's work across Robotic Demolition (Brokk and Husqvarna fleet), Diamond Wire Cutting and Concrete Sawing, Hydrodemolition and Abrasive Cold Cutting — typically on confined-access, structurally sensitive or live-environment schemes.

His project portfolio spans COMAH-regulated industrial sites, oil & gas, water infrastructure (AMP8), Highways, Offshore Decommissioning, Tunneling and Process and Manufacturing Industry environments.`;

async function main() {
  await client.patch('author-nick-turnbull').set({ blurb }).commit();
  console.log('✓ Updated bio');

  const headshot = '/Users/kesterhodgson/gnatuk/Nick Headshot.jpg';
  const buffer = fs.readFileSync(headshot);
  const asset = await client.assets.upload('image', buffer, {
    filename: 'nick-turnbull-headshot.jpg',
  });
  console.log(`✓ Uploaded headshot asset: ${asset._id}`);

  await client
    .patch('author-nick-turnbull')
    .set({
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .commit();
  console.log('✓ Attached headshot to author-nick-turnbull');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
