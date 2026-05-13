/**
 * GROQ queries + typed fetchers for the public site.
 *
 * Mirrors the shape consumers (the listing pages, /blog/[slug], /gallery, the
 * search-index route) already expect — so the switchover from lib/blog.ts is
 * a one-line import change in each consumer.
 */

import { groq } from 'next-sanity';
import { sanityClient, sanityConfigured } from './sanity';
import { BLOG as STATIC_BLOG } from './blog';
import type { BlogPost as StaticBlogPost } from './blog';
import { ACCREDITATIONS as STATIC_ACCREDS } from './accreditations';
import type { Accreditation as StaticAccred } from './accreditations';

// ----- Blog posts -----

const POST_PROJECTION = groq`{
  "slug": slug.current,
  title,
  originalTitle,
  wixSlug,
  excerpt,
  body,
  date,
  category,
  surfaces,
  galleryTags,
  "heroImage": heroImage.asset->url,
  "heroAlt": heroImage.alt,
  "author": author->name,
}`;

const POSTS_BY_DATE_QUERY = groq`*[_type == "blogPost"] | order(date desc) ${POST_PROJECTION}`;
const POST_BY_SLUG_QUERY = groq`*[_type == "blogPost" && slug.current == $slug][0] ${POST_PROJECTION}`;

export type SanityBlogPost = StaticBlogPost;

export async function getAllPosts(): Promise<SanityBlogPost[]> {
  if (!sanityConfigured) return STATIC_BLOG;
  return await sanityClient.fetch(POSTS_BY_DATE_QUERY);
}

export async function getPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  if (!sanityConfigured) {
    return STATIC_BLOG.find((p) => p.slug === slug) ?? null;
  }
  return await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
}

// ----- Accreditations -----

const ACCRED_PROJECTION = groq`{
  name,
  level,
  blurb,
  schemeUrl,
  "logo": logo.asset->url,
}`;

const ACCREDS_QUERY = groq`*[_type == "accreditation"] | order(sortOrder asc) ${ACCRED_PROJECTION}`;

export type SanityAccreditation = StaticAccred;

export async function getAccreditations(): Promise<SanityAccreditation[]> {
  if (!sanityConfigured) return STATIC_ACCREDS;
  return await sanityClient.fetch(ACCREDS_QUERY);
}
