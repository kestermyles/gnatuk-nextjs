import type { MetadataRoute } from 'next';
import { SERVICES, SITE } from '@/lib/constants';

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
