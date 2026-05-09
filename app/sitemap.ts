import type { MetadataRoute } from 'next';
import { SERVICES, SITE } from '@/lib/constants';
import { BLOG } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
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
    // Canonical detail URL for every post is /blog/[slug] (regardless of which
    // listing surfaces it). /case-studies and /insights are curated views.
    ...BLOG.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: p.surfaces.includes('case-study') ? 0.7 : 0.6,
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
