// Sector cross-links surfaced on each service page — points buyers from the
// "how" (method) to the "where" (sector). Builds internal link equity into
// the new industry hubs and helps users who arrived on a service page via
// search land on the sector context most relevant to them.

import Link from 'next/link';
import { INDUSTRIES, type IndustryHub } from '@/lib/industries';
import type { ServiceSlug } from '@/lib/constants';
import { ContentSection } from './ContentSection';

type IndustriesServedProps = {
  /** The service the visitor is currently on — used to pick which sectors apply. */
  service: ServiceSlug;
};

// Maps each service to the industry hubs where that method most clearly applies.
// Order is deliberate — most-relevant first.
const SERVICE_TO_INDUSTRIES: Record<ServiceSlug, IndustryHub['slug'][]> = {
  'robotic-demolition': [
    'process-refractory',
    'petrochemical-comah',
    'heritage',
    'water',
  ],
  hydrodemolition: ['water', 'highways', 'offshore-marine'],
  'diamond-drilling': ['heritage', 'highways', 'water'],
  'cold-cutting': ['petrochemical-comah', 'process-refractory', 'offshore-marine'],
  'machine-hire': ['process-refractory', 'petrochemical-comah', 'heritage'],
};

export function IndustriesServed({ service }: IndustriesServedProps) {
  const slugs = SERVICE_TO_INDUSTRIES[service];
  const industries = slugs.map((s) => INDUSTRIES[s]);

  return (
    <ContentSection
      eyebrow="Where this method anchors"
      heading="Industries served by this discipline."
      intro="Each linked hub explains the sector — the constraints, the case studies and the way method definition adapts to that industry's regulatory and operational regime."
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {industries.map((ind) => (
          <li key={ind.slug}>
            <Link
              href={`/industries/${ind.slug}`}
              className="group flex h-full flex-col rounded-lg border border-gnat-concrete bg-white p-5 transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                Industry hub
              </p>
              <h3 className="mt-1 text-base font-bold text-gnat-navy group-hover:text-gnat-orange">
                {ind.shortName}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gnat-steel-dark">
                {ind.subtitle}
              </p>
              <p className="mt-3 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                Sector page →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
