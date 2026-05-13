import { NextResponse } from 'next/server';
import { BLOG } from '@/lib/blog';
import { SERVICES } from '@/lib/constants';

// Statically generated at build time. Served from the CDN.
export const dynamic = 'force-static';

export type SearchEntry = {
  title: string;
  excerpt: string;
  body: string;
  href: string;
  type: 'service' | 'blog' | 'case-study' | 'insight' | 'page';
  /** ISO date — only set for blog-style entries. Used to sort recency ties. */
  date?: string;
};

export async function GET() {
  const entries: SearchEntry[] = [];

  for (const s of SERVICES) {
    entries.push({
      type: 'service',
      title: s.name,
      excerpt: s.blurb,
      body: s.blurb,
      href: `/${s.slug}`,
    });
  }

  for (const p of BLOG) {
    // A post may surface as case-study OR insight OR blog — use the primary
    // surface so the result label matches where it lives in the IA.
    const primary = p.surfaces[0] ?? 'blog';
    entries.push({
      type: primary,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body.join(' '),
      href: `/blog/${p.slug}`,
      date: p.date,
    });
  }

  // Static landing/aggregator pages
  entries.push(
    {
      type: 'page',
      title: 'Case Studies',
      excerpt: 'Project portfolio across water, refractory, healthcare and infrastructure.',
      body: 'case studies projects portfolio',
      href: '/case-studies',
    },
    {
      type: 'page',
      title: 'Insights',
      excerpt: 'Method, equipment and technique notes.',
      body: 'insights method technique equipment',
      href: '/insights',
    },
    {
      type: 'page',
      title: 'Blog',
      excerpt: 'Fleet updates and industry notes.',
      body: 'blog news fleet updates',
      href: '/blog',
    },
    {
      type: 'page',
      title: 'Gallery',
      excerpt: 'Photo gallery of equipment and projects.',
      body: 'gallery images photos brokk husqvarna aquajet hilti',
      href: '/gallery',
    },
    {
      type: 'page',
      title: 'Support Services',
      excerpt: 'Early Contractor Engagement, Method Development, RAMS Support, Site Trials.',
      body: 'early contractor engagement method development rams support site trials',
      href: '/support-services',
    },
    {
      type: 'page',
      title: 'Accreditations',
      excerpt:
        'CHAS, Constructionline Gold, RISQS, Achilles BuildingConfidence, NFDC, WJA, SSIP, RoSPA, Builder\'s Profile, DSA, Common Assessment Standard.',
      body:
        'accreditations chas constructionline gold risqs achilles building confidence nfdc wja water jetting ssip acclaim rospa builders profile dsa drilling sawing common assessment standard',
      href: '/accreditations',
    },
    {
      type: 'page',
      title: 'Contact',
      excerpt: 'Request a method proposal or speak to a specialist.',
      body: 'contact request method proposal phone email',
      href: '/contact',
    },
  );

  return NextResponse.json({ entries });
}
