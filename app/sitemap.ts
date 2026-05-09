import type { MetadataRoute } from 'next';
import { SERVICES, SITE } from '@/lib/constants';
import { CASE_STUDIES } from '@/lib/case-studies';
import { INSIGHTS } from '@/lib/insights';
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
    ...CASE_STUDIES.map((cs) => ({
      url: `${SITE.url}/case-studies/${cs.slug}`,
      lastModified,
      priority: 0.7,
      changeFrequency: 'yearly' as const,
    })),
    {
      url: `${SITE.url}/insights`,
      lastModified,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    ...INSIGHTS.map((p) => ({
      url: `${SITE.url}/insights/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.7,
      changeFrequency: 'yearly' as const,
    })),
    {
      url: `${SITE.url}/blog`,
      lastModified,
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    ...BLOG.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
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
