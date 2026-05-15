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
import { AUTHORS as STATIC_AUTHORS, authorSlug } from './authors';
import type { AuthorBio } from './authors';

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

// ----- Authors -----
//
// Authors live in Sanity as documents (`author-<slug>`) once the CMS is up, with
// a fallback to the static AUTHORS map in lib/authors.ts. The static fallback
// keeps `/authors/[slug]` pages working in dev / broken-env scenarios.

const AUTHOR_PROJECTION = groq`{
  name,
  role,
  blurb,
  linkedin,
  "image": image.asset->url,
}`;

const AUTHORS_QUERY = groq`*[_type == "author"] | order(name asc) ${AUTHOR_PROJECTION}`;

function attachSlug(a: Omit<AuthorBio, 'slug'>): AuthorBio {
  return { ...a, slug: authorSlug(a.name) };
}

export async function getAllAuthors(): Promise<AuthorBio[]> {
  if (!sanityConfigured) return Object.values(STATIC_AUTHORS).map(attachSlug);
  const raw = await sanityClient.fetch<Omit<AuthorBio, 'slug'>[]>(AUTHORS_QUERY);
  return raw.map(attachSlug);
}

export async function getAuthorBySlug(slug: string): Promise<AuthorBio | null> {
  const all = await getAllAuthors();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getAuthorByName(name: string): Promise<AuthorBio | null> {
  const all = await getAllAuthors();
  return (
    all.find((a) => a.name === name) ??
    all.find((a) => a.name.toLowerCase() === name.toLowerCase()) ??
    null
  );
}
