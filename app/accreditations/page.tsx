import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { FAQAccordion } from '@/components/FAQAccordion';
import { FAQPageSchema } from '@/components/Schema';
import { getAccreditations } from '@/lib/sanity-queries';
import { SITE } from '@/lib/constants';

// FAQ aimed at the high-intent queries a procurement/PQQ person types when
// vetting a contractor: "what is CHAS accredited?", "is X RISQS verified?".
// Triggers the FAQ rich result in SERPs and gives clear, indexable answers.
const accreditationFAQs = [
  {
    question: 'What does CHAS Accredited Contractor mean?',
    answer:
      'CHAS (the Contractors Health and Safety Assessment Scheme) is one of the UK\'s longest-established SSIP-recognised health-and-safety pre-qualification schemes. CHAS Accredited Contractor status confirms an organisation\'s health-and-safety policies, risk-assessment procedures and competence have been independently audited against a recognised national standard. GNAT UK Limited holds current CHAS accreditation and can supply certificates for pre-qualification on request.',
  },
  {
    question: 'What is RISQS Verified, and why does it matter for rail work?',
    answer:
      'RISQS (Railway Industry Supplier Qualification Scheme) is the pre-qualification scheme used by Network Rail and the wider GB rail industry. RISQS Verified status means a supplier has passed Network Rail\'s required audits for health, safety, quality, environmental and financial standards. Most rail-adjacent demolition and concrete-cutting work cannot proceed without a RISQS-verified contractor on site. GNAT UK Limited is currently RISQS Verified.',
  },
  {
    question: 'What is Constructionline Gold Member status?',
    answer:
      'Constructionline is the UK\'s largest pre-qualification database for the construction industry. Gold Member is the highest standard tier — beyond basic compliance (Bronze) and SSIP-equivalent verification (Silver), Gold adds independent verification of insurance, equality, modern-slavery, environmental and quality-management policies. Tier-1 contractors typically require Gold Member status before pre-qualification.',
  },
  {
    question: 'What is the Common Assessment Standard?',
    answer:
      'The Common Assessment Standard (CAS) is a unified UK construction pre-qualification framework developed by Build UK and CECA to replace the previous patchwork of duplicate PQQs. CAS-verified suppliers have been independently assessed against a single, standardised question set covering health and safety, quality, environment, financial standing, anti-bribery, modern slavery and equality. Holding CAS reduces duplicate paperwork across major contractor frameworks.',
  },
  {
    question: 'Is GNAT UK a member of NFDC (the National Federation of Demolition Contractors)?',
    answer:
      'Yes — GNAT UK Limited is a member of the National Federation of Demolition Contractors (NFDC), the trade body representing the UK demolition industry. NFDC members are independently audited against industry-specific competence standards including the NFDC Code of Conduct and operational safety requirements. Membership is restricted to demolition contractors who can demonstrate the necessary expertise, safety record and insurance cover.',
  },
  {
    question: 'What does WJA Audited Member mean for hydrodemolition work?',
    answer:
      'The Water Jetting Association (WJA) is the UK trade body for high-pressure water-jetting work, including hydrodemolition. WJA Audited Member status indicates the contractor has been independently assessed against the WJA Code of Practice covering operator training, equipment maintenance and on-site safety procedures specific to high-pressure water work. GNAT UK Limited is an Audited Member.',
  },
  {
    question: 'What is Achilles BuildingConfidence?',
    answer:
      'Achilles BuildingConfidence is a pre-qualification scheme used widely across UK construction, particularly by Tier-1 main contractors, to verify supply-chain compliance with health-and-safety and quality-management standards. BuildingConfidence Audited status reflects a third-party, on-site audit of the supplier\'s systems, beyond paper-based pre-qualification.',
  },
  {
    question: 'What is SSIP Acclaim Accreditation?',
    answer:
      'SSIP (Safety Schemes in Procurement) is the umbrella body recognising compliant H&S pre-qualification schemes across the UK construction industry. Acclaim Accreditation is one of the SSIP-recognised member schemes, providing equivalent verification to CHAS for buyer organisations. SSIP recognition means that holding one accredited member scheme is acknowledged across all others — reducing duplicate audits.',
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Accreditations — CHAS, NFDC, Constructionline Gold, RISQS, Achilles & more',
  description:
    "GNAT UK Limited's industry accreditations and memberships: CHAS, Constructionline Gold, RISQS Verified, Achilles BuildingConfidence, NFDC, WJA, SSIP, RoSPA, Builder's Profile, DSA and the Common Assessment Standard.",
  alternates: { canonical: `${SITE.url}/accreditations` },
  openGraph: {
    title: 'Accreditations | GNAT UK',
    description:
      "Industry accreditations and memberships held by GNAT UK Limited — the credentials Tier-1 contractors require for pre-qualification.",
    url: `${SITE.url}/accreditations`,
  },
};

export default async function AccreditationsPage() {
  const ACCREDITATIONS = await getAccreditations();
  return (
    <>
      <FAQPageSchema faqs={accreditationFAQs} />
      <Breadcrumbs items={[{ name: 'Accreditations', href: '/accreditations' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Accreditations
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Audited, accredited, on every framework.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              GNAT UK Limited holds the pre-qualification credentials required for work
              with Tier-1 contractors, water utilities, Network Rail, COMAH-regulated
              sites, and major infrastructure clients. Each listed scheme independently
              audits or verifies our health-and-safety, quality, environmental, and
              commercial standards.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {ACCREDITATIONS.map((a) => (
              <li
                key={a.name}
                className="flex flex-col rounded-lg border border-gnat-concrete bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {a.logo ? (
                    <div className="flex h-16 w-40 flex-none items-center justify-center">
                      <Image
                        src={a.logo}
                        alt={`${a.name} logo`}
                        width={a.logoWidth ?? 200}
                        height={a.logoHeight ?? 80}
                        className="max-h-16 max-w-full w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-40 flex-none items-center justify-center rounded border border-gnat-concrete bg-gnat-concrete-light px-2 text-center text-[10px] font-bold uppercase tracking-wider text-gnat-steel-dark">
                      {a.name.split(' ')[0]}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-base font-bold leading-snug text-gnat-navy">
                          {a.name}
                        </h2>
                        {a.level && (
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                            {a.level}
                          </p>
                        )}
                      </div>
                      <a
                        href={a.schemeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none text-xs font-semibold text-gnat-steel-dark hover:text-gnat-orange"
                        aria-label={`Visit the ${a.name} scheme website`}
                      >
                        Scheme ↗
                      </a>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gnat-steel-dark">
                      {a.blurb}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 border-t border-gnat-concrete pt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-bold text-gnat-navy md:text-3xl">
              What these accreditations actually mean.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gnat-steel-dark">
              The scheme acronyms can be a thicket — these are the questions
              procurement and PQQ teams most often ask when reviewing suppliers
              for the first time.
            </p>
            <div className="mt-8">
              <FAQAccordion faqs={accreditationFAQs} />
            </div>
          </div>

          <div className="mt-14 rounded-lg border border-gnat-orange/20 bg-gnat-orange/5 p-6 md:p-8">
            <h2 className="text-lg font-bold text-gnat-navy">
              Need verification documents for pre-qualification?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gnat-steel-dark">
              We can supply current certificates for any of the schemes listed above on
              request, alongside our standard pre-construction pack (insurance,
              method-statement library, environmental policy, equality and modern-slavery
              statements).
            </p>
            <p className="mt-3 text-base text-gnat-steel-dark">
              Email{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="font-semibold text-gnat-navy underline hover:text-gnat-orange"
              >
                {SITE.email}
              </a>{' '}
              or call{' '}
              <a
                href={`tel:${SITE.phoneE164}`}
                className="font-semibold text-gnat-navy underline hover:text-gnat-orange"
              >
                {SITE.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABlock
        heading="Got a brief?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
