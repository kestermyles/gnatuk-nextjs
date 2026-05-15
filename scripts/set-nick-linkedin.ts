/**
 * Adds Nick's LinkedIn URL to his Sanity author doc — surfaced as a visible
 * icon on /authors/nick-turnbull and emitted in the Person schema sameAs[].
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  await client
    .patch('author-nick-turnbull')
    .set({ linkedin: 'https://www.linkedin.com/in/nick-turnbull-55a3ab7b/' })
    .commit();
  console.log('✓ Added LinkedIn URL to author-nick-turnbull');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
