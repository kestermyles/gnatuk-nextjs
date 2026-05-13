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
};

export const AUTHORS: Record<string, AuthorBio> = {
  'Nick Turnbull': {
    name: 'Nick Turnbull',
    role: 'Managing Director, GNAT UK Limited',
    blurb:
      'Nick is the Managing Director of GNAT UK and the primary author of the company\'s technical content. He leads method development on confined-access, structurally sensitive and live-environment schemes across the UK.',
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
