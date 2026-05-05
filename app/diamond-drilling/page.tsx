import type { Metadata } from 'next';
import { ServiceHero } from '@/components/ServiceHero';
import { ContentSection, FeatureGrid, BulletList, CheckList } from '@/components/ContentSection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { FAQAccordion } from '@/components/FAQAccordion';
import { RelatedServices } from '@/components/RelatedServices';
import { ServiceSchema, FAQPageSchema } from '@/components/Schema';
import { SITE } from '@/lib/constants';

const SERVICE_DESC =
  'Diamond drilling and concrete sawing for controlled structural removal — precision cutting in reinforced concrete and heavy plant, without overbreak or vibration.';

export const metadata: Metadata = {
  title: 'Diamond Drilling & Sawing for Controlled Structural Removal',
  description:
    'Precision diamond drilling, wall and floor sawing, and wire sawing across the UK. Confined access specialists, vibration-controlled cutting, defined methods.',
  alternates: { canonical: `${SITE.url}/diamond-drilling` },
  openGraph: {
    title: 'Diamond Drilling & Sawing | GNAT UK',
    description: SERVICE_DESC,
    url: `${SITE.url}/diamond-drilling`,
  },
};

const faqs = [
  {
    question: "What's the maximum drilling depth and diameter?",
    answer:
      'Core drilling is typically delivered up to 1200mm diameter, with depth driven by the structure and access. For very deep penetrations or unusual geometries, we plan the cut sequence and rig set-up as part of the method rather than working to a fixed catalogue limit.',
  },
  {
    question: 'Can you drill through post-tensioned concrete?',
    answer:
      'Yes — but only with the strand layout established before the rig goes anywhere near the slab. We work with the structural information you have and, where it does not exist, recommend scanning so the cut never sits in line with a tendon.',
  },
  {
    question: 'How do you manage slurry in confined spaces?',
    answer:
      'Slurry capture, vacuum extraction and bunded set-ups are designed into the method, not added on. In live or sensitive environments we confirm the route and the end-point before drilling starts so nothing escapes the work area.',
  },
  {
    question: 'When is wire sawing the right choice over a wall saw?',
    answer:
      'Wire sawing comes in for large reinforced sections, complex geometries, and any cut where a wall or track saw cannot reach — separation of plant and large concrete elements being the typical case. The shape and size of the cut, not the equipment, drives the choice.',
  },
  {
    question: 'Can you cut in live operational environments?',
    answer:
      'Yes. Vibration-controlled cutting, sequenced removal and isolation planning are part of how we deliver in live infrastructure and operational plant — the cut is defined to avoid disturbance, not just to make the opening.',
  },
];

export default function DiamondDrillingPage() {
  return (
    <>
      <ServiceSchema name="Diamond Drilling & Sawing" description={SERVICE_DESC} slug="diamond-drilling" />
      <FAQPageSchema faqs={faqs} />
      <Breadcrumbs items={[{ name: 'Diamond Drilling', href: '/diamond-drilling' }]} />

      <ServiceHero
        eyebrow="Diamond Drilling & Sawing"
        title="Diamond Drilling & Sawing for Controlled Structural Removal"
        subtitle="Precision cutting in reinforced concrete, structures and heavy plant — delivered safely, accurately, and without compromise."
        intro="From confined internal works to large-scale structural separation, we deliver clean, controlled outcomes where conventional methods introduce risk."
        backgroundImage="/images/services/diamond-drilling-hero.jpg"
        benefits={[
          'Confined access specialists',
          'Live operational environments',
          'Vibration-controlled cutting',
          'High-precision structural removal',
        ]}
      />

      <ContentSection
        eyebrow="When accuracy matters"
        heading="Cut only what needs to go — nothing else."
        intro="Uncontrolled breaking introduces vibration, overbreak, and risk to surrounding structures. In live environments, restricted access conditions, or complex builds, that lack of control quickly becomes a programme and safety issue. Diamond drilling and sawing provide a defined, engineered approach — cutting exactly where required, without collateral damage."
      />

      <ContentSection
        variant="concrete"
        eyebrow="Capability"
        heading="Precision cutting, built around control."
      >
        <FeatureGrid
          items={[
            {
              title: 'Diamond Core Drilling',
              body: 'Accurate openings through reinforced concrete, walls, slabs and structures — clean, precise and to exact specification.',
            },
            {
              title: 'Wall & Floor Sawing',
              body: 'Controlled cutting for structural modifications, openings and sectional removal — minimising disruption and overbreak.',
            },
            {
              title: 'Diamond Wire Sawing',
              body: 'Heavy-duty cutting for large reinforced structures, plant and complex sections — where conventional saws cannot operate.',
            },
            {
              title: 'Integrated Cutting Solutions',
              body: 'Combined with robotic demolition and hydrodemolition to deliver complete, method-led removal strategies.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="Where it delivers"
        heading="Where this approach delivers."
        intro="Diamond drilling and sawing is used where control is critical — particularly in reinforced concrete structures and live environments where vibration, impact or overbreak cannot be tolerated."
      >
        <p className="font-semibold text-gnat-navy">Typical scenarios:</p>
        <div className="mt-4">
          <BulletList
            items={[
              'Structural alterations and openings',
              'Reinforced concrete separation',
              'Plant and equipment decommissioning',
              'Confined internal demolition works',
              'Infrastructure and live asset environments',
            ]}
          />
        </div>
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="Proven applications"
        heading="Proven in complex, high-constraint environments."
      >
        <FeatureGrid
          columns={3}
          items={[
            {
              title: 'Vault Deconstruction',
              body: 'Highly reinforced concrete vaults removed within restricted footprints — precise cutting without compromising surrounding structures.',
            },
            {
              title: 'Turbine Hall Decommissioning',
              body: 'Large-scale wire sawing of concrete and steel components — controlled dismantling without vibration impact to adjacent systems.',
            },
            {
              title: 'Plant Room Alterations',
              body: 'Complex internal modifications delivered within live environments — clean cuts, controlled sequencing, minimal disruption.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="Methodology"
        heading="Defined methods. Predictable outcomes."
        intro="We don't approach cutting as a standalone service. Each scheme is assessed, sequenced and delivered as part of a defined method — ensuring safety, accuracy and programme certainty. Early engagement allows constraints to be addressed before they become problems."
      >
        <CheckList
          items={[
            'Method-led, not equipment-led',
            'Sequenced into the wider works',
            'Defined tolerances and finishes',
            'Integrated with follow-on activity',
          ]}
        />
      </ContentSection>

      <ContentSection eyebrow="FAQ" heading="Diamond drilling — common questions.">
        <FAQAccordion faqs={faqs} />
      </ContentSection>

      <RelatedServices excludeSlug="diamond-drilling" />

      <CTABlock
        heading="Define the right approach from the start."
        body="If your scheme involves structural modification, restricted access, or live environments, early method definition will improve safety and delivery certainty."
      />
    </>
  );
}
