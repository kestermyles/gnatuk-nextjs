/**
 * GROQ queries + typed fetchers for the public site.
 *
 * Falls back to the static lib/blog.ts arrays when Sanity isn't configured,
 * so the site keeps rendering even if env vars are unset (e.g. in a broken
 * Vercel deploy). When Sanity IS configured, this is the live source of truth.
 *
 * Body text — Sanity stores body as portable-text blocks (rich text); the
 * existing site treats body as `string[]` of paragraphs. We normalise on
 * fetch so consumers don't have to change.
 */

import { groq } from 'next-sanity';
import { sanityClient, sanityConfigured } from './sanity';
import { BLOG as STATIC_BLOG } from './blog';
import type { BlogPost as StaticBlogPost } from './blog';
import { ACCREDITATIONS as STATIC_ACCREDS } from './accreditations';
import type { Accreditation as StaticAccred } from './accreditations';

// ----- Portable-text normalisation -----

type PortableTextBlock = {
  _type: string;
  children?: { text?: string }[];
};

function blocksToParagraphs(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return (blocks as PortableTextBlock[])
    .filter((b) => b._type === 'block')
    .map((b) => (b.children ?? []).map((c) => c.text ?? '').join(''))
    .filter((s) => s.trim().length > 0);
}

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

type RawPost = Omit<StaticBlogPost, 'body'> & { body: unknown };
function normalisePost(raw: RawPost): StaticBlogPost {
  return { ...raw, body: blocksToParagraphs(raw.body) };
}

export async function getAllPosts(): Promise<SanityBlogPost[]> {
  if (!sanityConfigured) return STATIC_BLOG;
  const raw = await sanityClient.fetch<RawPost[]>(POSTS_BY_DATE_QUERY);
  return raw.map(normalisePost);
}

export async function getPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  if (!sanityConfigured) {
    return STATIC_BLOG.find((p) => p.slug === slug) ?? null;
  }
  const raw = await sanityClient.fetch<RawPost | null>(POST_BY_SLUG_QUERY, { slug });
  return raw ? normalisePost(raw) : null;
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
  return await sanityClient.fetch<SanityAccreditation[]>(ACCREDS_QUERY);
}
