import type { Metadata } from 'next';
import { ServiceHero } from '@/components/ServiceHero';
import { ContentSection, FeatureGrid, BulletList, CheckList } from '@/components/ContentSection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { FAQAccordion } from '@/components/FAQAccordion';
import { RelatedServices } from '@/components/RelatedServices';
import { GalleryCallout } from '@/components/GalleryCallout';
import { CoverageNote } from '@/components/CoverageNote';
import { ServiceSchema, FAQPageSchema } from '@/components/Schema';
import { SITE } from '@/lib/constants';

const SERVICE_DESC =
  'Remote-operated robotic demolition for confined-access, structural-removal, and high-risk environments — selected by method, not just machine.';

export const metadata: Metadata = {
  title: 'Robotic Demolition for Confined, Live & High-Risk Environments',
  description:
    'Specialist robotic demolition across the UK — confined access, live operational environments and reinforced concrete. Method-led delivery, not just equipment hire.',
  alternates: { canonical: `${SITE.url}/robotic-demolition` },
  openGraph: {
    title: 'Robotic Demolition | GNAT UK',
    description: SERVICE_DESC,
    url: `${SITE.url}/robotic-demolition`,
  },
};

const faqs = [
  {
    question: 'What access width do you need for robotic demolition?',
    answer:
      'Our ultra-compact units pass through openings under 600mm, so we can reach basements, plant rooms, tunnels and shafts that conventional plant cannot access. Larger systems are matched to the structure when access allows.',
  },
  {
    question: 'Can robotic systems work in live operational environments?',
    answer:
      'Yes. Electric robotic systems are routinely used in occupied or live operational structures where vibration, noise and personnel exposure must be controlled. Sequencing and isolation are defined as part of the method, not added afterwards.',
  },
  {
    question: 'How does vibration compare to manual breakers?',
    answer:
      'Robotic demolition transmits significantly less vibration into surrounding structure than handheld breakers, because the impact energy is reacted through the machine rather than the operator. This makes it suitable for vibration-sensitive structures, partially retained elements and live infrastructure.',
  },
  {
    question: 'What attachments do you use?',
    answer:
      'Hydraulic breakers, concrete crushers, steel shears and milling heads — selected per scheme based on the material being removed and the structural and environmental constraints.',
  },
  {
    question: 'Do you take a method statement and RAMS-led approach?',
    answer:
      'Always. Every scheme is delivered against a defined method statement, sequencing plan and RAMS pack. Where useful, we input into method development before mobilisation to remove problems before they reach site.',
  },
];

export default function RoboticDemolitionPage() {
  return (
    <>
      <ServiceSchema name="Robotic Demolition" description={SERVICE_DESC} slug="robotic-demolition" />
      <FAQPageSchema faqs={faqs} />
      <Breadcrumbs items={[{ name: 'Robotic Demolition', href: '/robotic-demolition' }]} />

      <ServiceHero
        eyebrow="Robotic Demolition"
        title="Robotic Demolition for Confined, Live & High-Risk Environments"
        subtitle="Remote-operated demolition systems selected by method — not just machine."
        intro="Built for restricted access, structural sensitivity and live infrastructure."
        backgroundImage="/images/services/robotic-demolition-hero.jpg"
        backgroundAlt="Remote-operated robotic demolition machine breaking out reinforced concrete in a confined live environment"
        benefits={[
          'Confined access specialists',
          'Live operational environments',
          'Reduced manual handling risk',
          'Method-led demolition delivery',
        ]}
      />

      <ContentSection
        eyebrow="When standard methods stop working"
        heading="When conventional demolition creates risk."
        intro="Robotic demolition isn't a substitute for standard methods — it's what's used when standard methods stop working."
      >
        <p className="font-semibold text-gnat-navy">Typical constraints:</p>
        <div className="mt-4">
          <BulletList
            items={[
              'Limited access (basements, tunnels, shafts, internal structures)',
              'Live operational environments',
              'Vibration-sensitive structures',
              'High manual handling risk',
              'Hazardous or restricted zones',
            ]}
          />
        </div>
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="Remote demolition systems"
        heading="Compact enough to access. Powerful enough to deliver."
      >
        <FeatureGrid
          items={[
            {
              title: 'Confined access',
              body: 'Compact enough to pass through restricted access points — basements, plant rooms, tunnels and shafts.',
            },
            {
              title: 'High output',
              body: 'Powerful enough to replace larger plant in heavy reinforced concrete works.',
            },
            {
              title: 'Personnel out of risk',
              body: 'Operated remotely to remove personnel from hazardous and restricted zones.',
            },
            {
              title: 'Task-specific tooling',
              body: 'Configured with attachments matched to the material and constraint — breakers, crushers, shears, milling heads.',
            },
          ]}
        />
        <p className="mt-10 font-semibold text-gnat-navy">Applications:</p>
        <div className="mt-4">
          <BulletList
            items={[
              'Internal structural demolition',
              'Reinforced concrete removal',
              'Shaft, tunnel and confined space works',
              'Industrial and high-risk environments',
              'Decommissioning and dismantling',
            ]}
          />
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Selected by method"
        heading="Defined by method — not just supplied."
        intro="We don't just supply machines. Each scheme is integrated with method statements, sequencing, structural constraints and programme requirements."
      >
        <CheckList
          items={[
            'Access constraints assessed up-front',
            'Structural behaviour modelled into the method',
            'Removal sequence defined and validated',
            'Risk reduction designed into delivery',
          ]}
        />
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="Infrastructure applications"
        heading="Where robotic demolition delivers."
      >
        <CheckList
          items={[
            'Water & AMP8 infrastructure',
            'Tunnels and shafts',
            'Industrial and COMAH sites',
            'Power generation and decommissioning',
            'Live operational facilities',
          ]}
        />
      </ContentSection>

      <GalleryCallout tag="Robotic Demolition" />

      <CoverageNote service="robotic-demolition" />

      <ContentSection
        eyebrow="FAQ"
        heading="Robotic demolition — common questions."
      >
        <FAQAccordion faqs={faqs} />
      </ContentSection>

      <RelatedServices excludeSlug="robotic-demolition" />

      <CTABlock
        heading="Define the method before the problem defines it."
        body="If your scheme involves restricted access, live assets or complex removal constraints — robotic demolition may be part of the solution. We'll define the method, then select the right system."
      />
    </>
  );
}
