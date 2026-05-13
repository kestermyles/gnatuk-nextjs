/**
 * Sanity client + image helper.
 *
 * Once the Sanity project is set up and content is migrated, page-level data
 * fetching switches from importing BLOG/AUTHORS/ACCREDITATIONS arrays to
 * calling these query functions. See lib/sanity-queries.ts for the GROQ.
 */

import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-10-01',
  useCdn: process.env.NODE_ENV === 'production',
  // Read token only used server-side for draft/preview content.
  token: process.env.SANITY_API_READ_TOKEN,
};

export const sanityClient = createClient(config);

// Image URL builder — returns a fluent builder for Sanity's image CDN.
// Usage: urlFor(post.heroImage).width(1200).height(675).url()
const builder = imageUrlBuilder(sanityClient);
type ImageSource = Parameters<typeof builder.image>[0];
export function urlFor(source: ImageSource) {
  return builder.image(source);
}

/** True when Sanity credentials are configured. Lets pages fall back to the
 * static lib/blog.ts source while the project is being set up. */
export const sanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
