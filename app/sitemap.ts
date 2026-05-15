import type { MetadataRoute } from 'next';
import { SERVICES, SITE } from '@/lib/constants';
import { getAllAuthors, getAllPosts } from '@/lib/sanity-queries';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [BLOG, AUTHORS] = await Promise.all([getAllPosts(), getAllAuthors()]);
  const lastModified = new Date();
  return [
    { url: SITE.url, lastModified, priority: 1.0, changeFrequency: 'monthly' },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/${s.slug}`,
      lastModified,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
    {
      url: `${SITE.url}/case-studies`,
      lastModified,
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${SITE.url}/insights`,
      lastModified,
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${SITE.url}/blog`,
      lastModified,
      priority: 0.7,
      changeFrequency: 'monthly',
    },
    {
      url: `${SITE.url}/support-services`,
      lastModified,
      priority: 0.8,
      changeFrequency: 'yearly',
    },
    {
      url: `${SITE.url}/accreditations`,
      lastModified,
      priority: 0.7,
      changeFrequency: 'yearly',
    },
    {
      url: `${SITE.url}/gallery`,
      lastModified,
      priority: 0.7,
      changeFrequency: 'monthly',
    },
    // Canonical detail URL for every post is /blog/[slug] (regardless of which
    // listing surfaces it). /case-studies and /insights are curated views.
    ...BLOG.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: p.surfaces.includes('case-study') ? 0.7 : 0.6,
      changeFrequency: 'yearly' as const,
    })),
    // Author profile pages — E-E-A-T anchors that link out to authored content.
    {
      url: `${SITE.url}/authors`,
      lastModified,
      priority: 0.5,
      changeFrequency: 'yearly',
    },
    ...AUTHORS.filter((a) => a.slug && a.name.includes(' ')).map((a) => ({
      url: `${SITE.url}/authors/${a.slug}`,
      lastModified,
      priority: 0.5,
      changeFrequency: 'yearly' as const,
    })),
    {
      url: `${SITE.url}/contact`,
      lastModified,
      priority: 0.8,
      changeFrequency: 'yearly',
    },
    {
      url: `${SITE.url}/privacy-policy`,
      lastModified,
      priority: 0.3,
      changeFrequency: 'yearly',
    },
  ];
}
