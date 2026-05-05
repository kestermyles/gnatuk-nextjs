export const SITE = {
  name: 'GNAT UK',
  legalName: 'GNAT UK Limited',
  url: 'https://www.gnatuk.com',
  description:
    'Specialist demolition contractor: robotic demolition, hydrodemolition, diamond drilling, and cold cutting for confined, live, and high-risk environments.',
  tagline: 'Specialist Demolition — Robotic & Confined Access',
  phoneDisplay: '01748 826046',
  phoneE164: '+441748826046',
  email: 'office@gnatuk.com',
  companyNumber: '05590884',
  address: {
    streetAddress: 'Unit 5, Jackson Court, Olympic Way',
    locality: 'Richmond',
    region: 'North Yorkshire',
    postalCode: 'DL10 4FD',
    country: 'GB',
  },
  social: {
    instagram: 'https://www.instagram.com/gnatuk_roboticdemolition/',
    facebook: 'https://www.facebook.com/GnatUKDemolitionSpecialists',
  },
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5RHLSCR',
} as const;

export type ServiceSlug =
  | 'robotic-demolition'
  | 'hydrodemolition'
  | 'diamond-drilling'
  | 'cold-cutting'
  | 'machine-hire';

export const SERVICES: {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  blurb: string;
}[] = [
  {
    slug: 'robotic-demolition',
    name: 'Robotic Demolition',
    shortName: 'Robotic Demolition',
    blurb:
      'Remote-operated machines for confined-access, structural-removal, and high-risk environments.',
  },
  {
    slug: 'hydrodemolition',
    name: 'Hydrodemolition',
    shortName: 'Hydrodemolition',
    blurb: 'Non-percussive concrete removal — preserving structure and eliminating vibration.',
  },
  {
    slug: 'diamond-drilling',
    name: 'Diamond Drilling & Sawing',
    shortName: 'Diamond Drilling',
    blurb: 'Precision cutting in reinforced concrete and structural elements.',
  },
  {
    slug: 'cold-cutting',
    name: 'Abrasive Cold Cutting',
    shortName: 'Cold Cutting',
    blurb: 'Spark-free cutting for volatile and safety-critical environments.',
  },
  {
    slug: 'machine-hire',
    name: 'Machine Hire — Brokk Fleet',
    shortName: 'Machine Hire',
    blurb: 'Robotic demolition fleet supplied with method-led expertise — not just machines.',
  },
];
