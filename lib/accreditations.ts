// Accreditations and memberships held by GNAT UK Limited.
// Source: company-provided list (May 2026). Verified by the listed scheme.
// Used by /accreditations page, LocalBusiness schema, and footer.

export type Accreditation = {
  name: string;
  /** Short tagline / membership level / audited status as shown on the logo. */
  level?: string;
  /** What this scheme tells a procurement team. ~one sentence. */
  blurb: string;
  /** Official scheme website — verifies the scheme exists. */
  schemeUrl: string;
  /** Path under /public/images/accreditations/ — omit to render a text badge. */
  logo?: string;
  /** Aspect-aware width in px the logo prefers (max — we constrain by height). */
  logoWidth?: number;
  logoHeight?: number;
};

export const ACCREDITATIONS: Accreditation[] = [
  {
    name: "Builder's Profile",
    blurb:
      "Pre-qualification information system used across the UK construction sector — verified company, insurance and competence data.",
    schemeUrl: 'https://www.builders-profile.co.uk',
    logo: '/images/accreditations/builders-profile.png',
    logoWidth: 280,
    logoHeight: 88,
  },
  {
    name: 'Water Jetting Association (WJA)',
    level: 'Audited Member',
    blurb:
      "The UK trade body for high-pressure water jetting. Membership requires audited compliance with the WJA Code of Practice for hydrodemolition and water-jetting operations.",
    schemeUrl: 'https://www.waterjetting.org.uk',
    logo: '/images/accreditations/wja.svg',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'SSIP — Acclaim / Once For All',
    level: 'SSIP Recognised',
    blurb:
      "Safety Schemes in Procurement (SSIP) recognised — Acclaim Accreditation, now operating as Once For All Health & Safety SSIP. Recognised across UK construction and infrastructure procurement; confirms audited health-and-safety competence.",
    schemeUrl: 'https://ssip.org.uk',
    logo: '/images/accreditations/ssip.png',
    logoWidth: 140,
    logoHeight: 88,
  },
  {
    name: 'Achilles BuildingConfidence',
    level: 'Audited',
    blurb:
      'Independent supply-chain audit programme used by major UK construction clients. Audited compliance with industry standards on safety, quality, environment and ethics.',
    schemeUrl: 'https://www.achilles.com',
    logo: '/images/accreditations/achilles.svg',
    logoWidth: 88,
    logoHeight: 88,
  },
  {
    name: 'Drilling & Sawing Association (DSA)',
    level: 'Member',
    blurb:
      "The UK trade body for concrete cutting, drilling and sawing contractors. Membership signals adherence to DSA technical standards and safe-working practice.",
    schemeUrl: 'https://www.drillandsaw.org.uk',
    logo: '/images/accreditations/dsa.png',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'CHAS',
    level: 'Accredited Contractor',
    blurb:
      "Contractors Health & Safety Assessment Scheme — the founding member of SSIP. CHAS accreditation is a procurement requirement on the majority of UK infrastructure frameworks.",
    schemeUrl: 'https://www.chas.co.uk',
    logo: '/images/accreditations/chas.png',
    logoWidth: 220,
    logoHeight: 88,
  },
  {
    name: 'RISQS',
    level: 'Verified',
    blurb:
      "Railway Industry Supplier Qualification Scheme — the standard pre-qualification system for the UK rail sector. RISQS verification is required for work on Network Rail and its supply chain.",
    schemeUrl: 'https://www.risqs.org',
    logo: '/images/accreditations/risqs.png',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'Constructionline',
    level: 'Gold Member',
    blurb:
      "The UK's largest pre-qualification certification body for the construction sector. Gold-level membership confirms enhanced financial, H&S, environmental and CSR verification.",
    schemeUrl: 'https://www.constructionline.co.uk',
    logo: '/images/accreditations/constructionline.png',
    logoWidth: 360,
    logoHeight: 88,
  },
  {
    name: 'Common Assessment Standard',
    blurb:
      "Industry-wide PQ standard developed by Build UK and CECA to streamline supply-chain assessment. Accredited via Constructionline.",
    schemeUrl: 'https://builduk.org/commonassessmentstandard',
    logo: '/images/accreditations/cas.png',
    logoWidth: 200,
    logoHeight: 88,
  },
  {
    name: 'RoSPA',
    level: 'Member',
    blurb:
      'Royal Society for the Prevention of Accidents — UK occupational health-and-safety membership demonstrating ongoing investment in safe-working culture.',
    schemeUrl: 'https://www.rospa.com',
    logo: '/images/accreditations/rospa.png',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'NFDC',
    level: 'Industry Service Provider',
    blurb:
      "The National Federation of Demolition Contractors is the UK demolition industry's voice and standard-setter. NFDC membership signals adherence to the federation's Demolition Code of Practice and operative-competence schemes (CCDO).",
    schemeUrl: 'https://www.demolition-nfdc.com',
    logo: '/images/accreditations/nfdc.png',
    logoWidth: 200,
    logoHeight: 80,
  },
];
