// Author bios shown under each post. Used for E-E-A-T (Experience, Expertise,
// Authoritativeness, Trustworthiness) — Google and AI search both look for
// authoritative, named human authorship.
//
// Bios are intentionally factual and minimal. Expand with real backgrounds
// (qualifications, IDEng grades, years in the industry, specific expertise)
// once the company confirms them.

export type AuthorBio = {
  name: string;
  role: string;
  blurb: string;
  /** Stable URL slug for /authors/[slug] — derived from name when missing. */
  slug?: string;
  /** CDN URL of the author photo (Sanity) or static path. */
  image?: string;
};

/** Stable slug derived from author name — `Nick Turnbull` → `nick-turnbull`. */
export function authorSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const AUTHORS: Record<string, AuthorBio> = {
  'Nick Turnbull': {
    name: 'Nick Turnbull',
    role: 'Managing Director, GNAT UK Limited',
    blurb:
      'Nick is the Managing Director and founder of GNAT UK Limited, the specialist remote demolition and contracting firm operating across Great Britain and Ireland. With more than 30 years\' experience in the sector, he leads the company\'s work across robotic demolition (Brokk and Husqvarna fleet), diamond wire cutting, hydrodemolition and plant hire — typically on confined-access, structurally sensitive or live-environment schemes. His project portfolio spans COMAH-regulated industrial sites, oil &amp; gas, water infrastructure (AMP8), highways, offshore decommissioning and refractory environments.',
  },
  'Keith Hodgson': {
    name: 'Keith Hodgson',
    role: 'GNAT UK',
    blurb:
      'Keith writes about the heavier end of GNAT UK\'s work — bank vaults, foundations, and the Brokk fleet under load.',
  },
  Keith: {
    name: 'Keith',
    role: 'GNAT UK',
    blurb:
      'Keith writes about the heavier end of GNAT UK\'s work — bank vaults, foundations, and the Brokk fleet under load.',
  },
  'Steve Tempest-Mitchell': {
    name: 'Steve Tempest-Mitchell',
    role: 'GNAT UK',
    blurb:
      'Steve covers diamond drilling, sawing, hydroblasting and infrastructure-sector projects.',
  },
};

export function getAuthorBio(name: string): AuthorBio {
  return (
    AUTHORS[name] ?? {
      name,
      role: 'GNAT UK',
      blurb: 'Contributor to GNAT UK\'s technical content.',
    }
  );
}
