// Accreditations and memberships held by GNAT UK Limited.
// Source: company-provided list (May 2026). Verified by the listed scheme.
// Used by /accreditations page, LocalBusiness schema, and footer.
//
// Logo files are the company-supplied greyscale set (16 May 2026) — consistent
// treatment across all 12 schemes for a clean, unified accreditations row.

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
    logo: '/images/accreditations/builders-profile.jpg',
    logoWidth: 280,
    logoHeight: 88,
  },
  {
    name: 'Water Jetting Association (WJA)',
    level: 'Audited Member',
    blurb:
      "The UK trade body for high-pressure water jetting. Membership requires audited compliance with the WJA Code of Practice for hydrodemolition and water-jetting operations.",
    schemeUrl: 'https://www.waterjetting.org.uk',
    logo: '/images/accreditations/wja.jpg',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'SSIP',
    level: 'Safety Schemes in Procurement',
    blurb:
      "The umbrella body that recognises compliant health-and-safety pre-qualification schemes across UK construction. Holding any one SSIP-recognised scheme is accepted across all others — eliminates duplicate H&S audits across major-contractor frameworks.",
    schemeUrl: 'https://ssip.org.uk',
    logo: '/images/accreditations/ssip.jpg',
    logoWidth: 140,
    logoHeight: 88,
  },
  {
    name: 'Acclaim Accreditation',
    level: 'SSIP Recognised',
    blurb:
      "An SSIP-recognised member scheme (provided by Supplier Assessment Services / Capita, now under Once For All Health & Safety SSIP). Confirms independently-audited health-and-safety competence to SSIP Core Criteria — equivalent to CHAS for procurement purposes.",
    schemeUrl: 'https://www.constructionline.co.uk/products-services/acclaim/',
    logo: '/images/accreditations/acclaim.jpg',
    logoWidth: 200,
    logoHeight: 88,
  },
  {
    name: 'Achilles BuildingConfidence',
    level: 'Audited',
    blurb:
      'Independent supply-chain audit programme used by major UK construction clients. Audited compliance with industry standards on safety, quality, environment and ethics.',
    schemeUrl: 'https://www.achilles.com',
    logo: '/images/accreditations/achilles.jpg',
    logoWidth: 88,
    logoHeight: 88,
  },
  {
    name: 'Drilling & Sawing Association (DSA)',
    level: 'Member',
    blurb:
      "The UK trade body for concrete cutting, drilling and sawing contractors. Membership signals adherence to DSA technical standards and safe-working practice.",
    schemeUrl: 'https://www.drillandsaw.org.uk',
    logo: '/images/accreditations/dsa.jpg',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'CHAS',
    level: 'Accredited Contractor',
    blurb:
      "Contractors Health & Safety Assessment Scheme — the founding member of SSIP. CHAS accreditation is a procurement requirement on the majority of UK infrastructure frameworks.",
    schemeUrl: 'https://www.chas.co.uk',
    logo: '/images/accreditations/chas.jpg',
    logoWidth: 220,
    logoHeight: 88,
  },
  {
    name: 'RISQS',
    level: 'Verified',
    blurb:
      "Railway Industry Supplier Qualification Scheme — the standard pre-qualification system for the UK rail sector. RISQS verification is required for work on Network Rail and its supply chain.",
    schemeUrl: 'https://www.risqs.org',
    logo: '/images/accreditations/risqs.jpg',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'Constructionline',
    level: 'Gold Member',
    blurb:
      "The UK's largest pre-qualification certification body for the construction sector. Gold-level membership confirms enhanced financial, H&S, environmental and CSR verification.",
    schemeUrl: 'https://www.constructionline.co.uk',
    logo: '/images/accreditations/constructionline.jpg',
    logoWidth: 360,
    logoHeight: 88,
  },
  {
    name: 'Common Assessment Standard',
    blurb:
      "Industry-wide PQ standard developed by Build UK and CECA to streamline supply-chain assessment. Accredited via Constructionline.",
    schemeUrl: 'https://builduk.org/commonassessmentstandard',
    logo: '/images/accreditations/cas.jpg',
    logoWidth: 200,
    logoHeight: 88,
  },
  {
    name: 'RoSPA',
    level: 'Member',
    blurb:
      'Royal Society for the Prevention of Accidents — UK occupational health-and-safety membership demonstrating ongoing investment in safe-working culture.',
    schemeUrl: 'https://www.rospa.com',
    logo: '/images/accreditations/rospa.jpg',
    logoWidth: 200,
    logoHeight: 80,
  },
  {
    name: 'NFDC',
    level: 'Industry Service Provider',
    blurb:
      "The National Federation of Demolition Contractors is the UK demolition industry's voice and standard-setter. NFDC membership signals adherence to the federation's Demolition Code of Practice and operative-competence schemes (CCDO).",
    schemeUrl: 'https://www.demolition-nfdc.com',
    logo: '/images/accreditations/nfdc.jpg',
    logoWidth: 200,
    logoHeight: 80,
  },
];
