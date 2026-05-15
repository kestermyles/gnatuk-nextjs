/**
 * One-shot sync of the accreditations dataset to Sanity:
 *   1. Uploads each logo file from /public/images/accreditations/ as a Sanity
 *      asset (if not already present).
 *   2. Patches each existing accreditation doc with the matching logo + any
 *      copy refresh (level, blurb).
 *   3. Splits the old "SSIP — Acclaim Accreditation" combined doc:
 *      - renames it to "SSIP" with the SSIP umbrella branding/blurb
 *      - creates a fresh "Acclaim Accreditation" doc as a separate entry
 *   4. Renumbers sortOrder 1-12 to match the new banner left-to-right order.
 *
 * Idempotent — re-runnable; uses createOrReplace on stable IDs.
 *
 * Run: SANITY_API_WRITE_TOKEN=... pnpm tsx scripts/sync-accreditation-logos.ts
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';

const client = createClient({
  projectId: 'lw9tgrzb',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

type Entry = {
  /** Sanity doc id — stable, used for create-or-replace. */
  id: string;
  name: string;
  level?: string;
  blurb: string;
  schemeUrl: string;
  /** Filename under /public/images/accreditations/, or undefined for no logo. */
  logoFile?: string;
  sortOrder: number;
};

const ROOT = path.join(process.cwd(), 'public/images/accreditations');

const ENTRIES: Entry[] = [
  {
    id: 'accreditation-builder-s-profile',
    name: "Builder's Profile",
    blurb:
      'Pre-qualification information system used across the UK construction sector — verified company, insurance and competence data.',
    schemeUrl: 'https://www.builders-profile.co.uk',
    logoFile: 'builders-profile.png',
    sortOrder: 1,
  },
  {
    id: 'accreditation-water-jetting-association-wja',
    name: 'Water Jetting Association (WJA)',
    level: 'Audited Member',
    blurb:
      'The UK trade body for high-pressure water jetting. Membership requires audited compliance with the WJA Code of Practice for hydrodemolition and water-jetting operations.',
    schemeUrl: 'https://www.waterjetting.org.uk',
    logoFile: 'wja.svg',
    sortOrder: 2,
  },
  {
    id: 'accreditation-ssip',
    name: 'SSIP',
    level: 'Safety Schemes in Procurement',
    blurb:
      'The umbrella body that recognises compliant health-and-safety pre-qualification schemes across UK construction. Holding any one SSIP-recognised scheme is accepted across all others — eliminates duplicate H&S audits across major-contractor frameworks.',
    schemeUrl: 'https://ssip.org.uk',
    logoFile: 'ssip.png',
    sortOrder: 3,
  },
  {
    id: 'accreditation-acclaim-accreditation',
    name: 'Acclaim Accreditation',
    level: 'SSIP Recognised',
    blurb:
      'An SSIP-recognised member scheme (provided by Supplier Assessment Services / Capita, now under Once For All Health & Safety SSIP). Confirms independently-audited health-and-safety competence to SSIP Core Criteria — equivalent to CHAS for procurement purposes.',
    schemeUrl: 'https://www.constructionline.co.uk/products-services/acclaim/',
    logoFile: 'acclaim.jpg',
    sortOrder: 4,
  },
  {
    id: 'accreditation-achilles-buildingconfidence',
    name: 'Achilles BuildingConfidence',
    level: 'Audited',
    blurb:
      'Independent supply-chain audit programme used by major UK construction clients. Audited compliance with industry standards on safety, quality, environment and ethics.',
    schemeUrl: 'https://www.achilles.com',
    logoFile: 'achilles.svg',
    sortOrder: 5,
  },
  {
    id: 'accreditation-drilling-sawing-association-dsa',
    name: 'Drilling & Sawing Association (DSA)',
    level: 'Member',
    blurb:
      'The UK trade body for concrete cutting, drilling and sawing contractors. Membership signals adherence to DSA technical standards and safe-working practice.',
    schemeUrl: 'https://www.drillandsaw.org.uk',
    logoFile: 'dsa.png',
    sortOrder: 6,
  },
  {
    id: 'accreditation-chas',
    name: 'CHAS',
    level: 'Accredited Contractor',
    blurb:
      'Contractors Health & Safety Assessment Scheme — the founding member of SSIP. CHAS accreditation is a procurement requirement on the majority of UK infrastructure frameworks.',
    schemeUrl: 'https://www.chas.co.uk',
    logoFile: 'chas.png',
    sortOrder: 7,
  },
  {
    id: 'accreditation-risqs',
    name: 'RISQS',
    level: 'Verified',
    blurb:
      'Railway Industry Supplier Qualification Scheme — the standard pre-qualification system for the UK rail sector. RISQS verification is required for work on Network Rail and its supply chain.',
    schemeUrl: 'https://www.risqs.org',
    logoFile: 'risqs.png',
    sortOrder: 8,
  },
  {
    id: 'accreditation-constructionline',
    name: 'Constructionline',
    level: 'Gold Member',
    blurb:
      "The UK's largest pre-qualification certification body for the construction sector. Gold-level membership confirms enhanced financial, H&S, environmental and CSR verification.",
    schemeUrl: 'https://www.constructionline.co.uk',
    logoFile: 'constructionline.png',
    sortOrder: 9,
  },
  {
    id: 'accreditation-common-assessment-standard',
    name: 'Common Assessment Standard',
    blurb:
      'Industry-wide PQ standard developed by Build UK and CECA to streamline supply-chain assessment. Accredited via Constructionline.',
    schemeUrl: 'https://builduk.org/commonassessmentstandard',
    logoFile: 'cas.png',
    sortOrder: 10,
  },
  {
    id: 'accreditation-rospa',
    name: 'RoSPA',
    level: 'Member',
    blurb:
      'Royal Society for the Prevention of Accidents — UK occupational health-and-safety membership demonstrating ongoing investment in safe-working culture.',
    schemeUrl: 'https://www.rospa.com',
    logoFile: 'rospa.png',
    sortOrder: 11,
  },
  {
    id: 'accreditation-nfdc',
    name: 'NFDC',
    level: 'Industry Service Provider',
    blurb:
      "The National Federation of Demolition Contractors is the UK demolition industry's voice and standard-setter. NFDC membership signals adherence to the federation's Demolition Code of Practice and operative-competence schemes (CCDO).",
    schemeUrl: 'https://www.demolition-nfdc.com',
    logoFile: 'nfdc.png',
    sortOrder: 12,
  },
];

// Old combined doc — to be deleted after we split it into separate SSIP +
// Acclaim docs.
const LEGACY_COMBINED_ID = 'accreditation-ssip-acclaim-accreditation';

async function uploadLogo(filename: string): Promise<string> {
  const filepath = path.join(ROOT, filename);
  const buffer = fs.readFileSync(filepath);
  const ext = filename.split('.').pop()?.toLowerCase();
  const mimeMap: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    svg: 'image/svg+xml',
    webp: 'image/webp',
  };
  const contentType = mimeMap[ext ?? ''] ?? 'application/octet-stream';
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
  });
  return asset._id;
}

async function syncEntry(entry: Entry) {
  const doc: Record<string, unknown> = {
    _id: entry.id,
    _type: 'accreditation',
    name: entry.name,
    blurb: entry.blurb,
    schemeUrl: entry.schemeUrl,
    sortOrder: entry.sortOrder,
  };
  if (entry.level) doc.level = entry.level;
  if (entry.logoFile) {
    const assetId = await uploadLogo(entry.logoFile);
    doc.logo = {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
    };
  }
  await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
  console.log(`  ✓ ${entry.sortOrder}. ${entry.name}${entry.logoFile ? ` (logo: ${entry.logoFile})` : ''}`);
}

async function deleteLegacyCombined() {
  const existing = await client.fetch(`*[_id == $id][0]{_id}`, { id: LEGACY_COMBINED_ID });
  if (existing) {
    await client.delete(LEGACY_COMBINED_ID);
    console.log(`  ✓ Deleted legacy combined doc ${LEGACY_COMBINED_ID}`);
  } else {
    console.log(`  ✓ Legacy combined doc already gone`);
  }
}

async function main() {
  console.log('Syncing accreditations to Sanity (12 entries)…');
  for (const entry of ENTRIES) {
    await syncEntry(entry);
  }
  console.log('\nCleaning up legacy combined SSIP+Acclaim doc…');
  await deleteLegacyCombined();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
