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
  'Hydrodemolition for selective concrete removal — non-percussive, controlled and reinforcement-safe. Built for repair, strengthening and live environments.';

export const metadata: Metadata = {
  title: 'Hydrodemolition for Structural Concrete Removal',
  description:
    'Precision hydrodemolition across the UK — selective concrete removal, no vibration, rebar preserved. For bridges, tanks, marine and live infrastructure.',
  alternates: { canonical: `${SITE.url}/hydrodemolition` },
  openGraph: {
    title: 'Hydrodemolition | GNAT UK',
    description: SERVICE_DESC,
    url: `${SITE.url}/hydrodemolition`,
  },
};

const faqs = [
  {
    question: 'Does hydrodemolition damage rebar?',
    answer:
      'No — hydrodemolition is selective. The high-pressure water removes deteriorated or specified concrete while leaving the reinforcement clean, undamaged and ready for bonding. That makes it the standard method for concrete repair and strengthening.',
  },
  {
    question: "What's the removal rate compared to conventional methods?",
    answer:
      'Removal rate depends on concrete strength, reinforcement density and required depth, but on suitable substrates hydrodemolition typically outpaces handheld breakers significantly while delivering a more bond-ready surface — so follow-on reinstatement is faster too.',
  },
  {
    question: 'Can you control depth of removal?',
    answer:
      'Yes. Equipment is calibrated for the specific concrete strength and the target depth — selective removal of cover concrete, removal to a defined depth, or full-depth removal can all be delivered to specification.',
  },
  {
    question: 'How is water managed on site?',
    answer:
      'Capture, filtration and pH control are designed into the delivery from the outset. We work with site teams to integrate water management with environmental and discharge constraints, including in marine, water-retaining and live operational environments.',
  },
  {
    question: 'Where is hydrodemolition the wrong choice?',
    answer:
      'Where the structure cannot tolerate water exposure, where containment is genuinely impossible, or where the required removal volume is small enough that mobilisation overhead outweighs the benefit. We will say so up front rather than force the method.',
  },
];

export default function HydrodemolitionPage() {
  return (
    <>
      <ServiceSchema name="Hydrodemolition" description={SERVICE_DESC} slug="hydrodemolition" />
      <FAQPageSchema faqs={faqs} />
      <Breadcrumbs items={[{ name: 'Hydrodemolition', href: '/hydrodemolition' }]} />

      <ServiceHero
        eyebrow="Hydrodemolition"
        title="Hydrodemolition for Structural Concrete Removal"
        subtitle="Precision concrete removal without damage to the structure beneath."
        intro="Non-percussive, controlled removal for live infrastructure, repair and strengthening works."
        backgroundImage="/images/services/hydrodemolition-hero.jpg"
        backgroundAlt="High-pressure water lance removing deteriorated concrete from a reinforced structure during hydrodemolition works"
        benefits={[
          'Selective concrete removal',
          'Reinforcement preserved',
          'No vibration, no impact',
          'Managed water systems',
        ]}
      />

      <ContentSection
        eyebrow="When breaking risks the structure"
        heading="When conventional breaking risks the structure, hydrodemolition takes control."
        intro="Traditional mechanical breaking introduces vibration, micro-cracking and the risk of unintended damage — especially in critical structures. In live infrastructure, repair and strengthening works, that risk isn't acceptable. Hydrodemolition removes only the damaged or specified concrete — leaving the remaining structure intact, sound and ready for reinstatement."
      />

      <ContentSection
        variant="concrete"
        eyebrow="What makes it different"
        heading="Controlled concrete removal. Nothing more, nothing less."
      >
        <FeatureGrid
          items={[
            {
              title: 'Selective Removal',
              body: 'Removes deteriorated or specified concrete without overbreak.',
            },
            {
              title: 'Reinforcement Preservation',
              body: 'Leaves rebar clean, undamaged and ready for bonding.',
            },
            {
              title: 'No Vibration / No Impact',
              body: 'Protects surrounding structure and avoids micro-fracturing.',
            },
            {
              title: 'Managed Water Systems',
              body: 'Capture, filtration and pH control built into delivery.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="Where it's used"
        heading="Built for repair, strengthening and live environments."
        intro="Hydrodemolition is used where precision matters more than speed alone."
      >
        <CheckList
          items={[
            'Bridges and viaduct strengthening',
            'Reservoirs, tanks and water-retaining structures',
            'Marine and coastal infrastructure',
            'Nuclear and power generation facilities',
            'Live operational assets where vibration is not acceptable',
          ]}
        />
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="Application gallery"
        heading="Selective concrete removal without compromise."
      >
        <FeatureGrid
          columns={3}
          items={[
            {
              title: 'Large surface removal',
              body: 'Consistent, depth-controlled removal across horizontal and inclined surfaces.',
            },
            {
              title: 'Reinforcement preservation',
              body: 'Defective concrete removed while maintaining structural steel integrity.',
            },
            {
              title: 'Controlled water management',
              body: 'Runoff captured, filtered and managed to meet environmental and site constraints.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="Process & planning"
        heading="Defined early. Delivered properly."
        intro="Hydrodemolition is most effective when it's planned as part of the wider sequence — not brought in as a last resort. We work with contractors to define:"
      >
        <BulletList
          items={[
            'Removal depth and tolerances',
            'Access and sequencing',
            'Water management and environmental control',
            'Integration with follow-on works',
          ]}
        />
        <p className="mt-6 max-w-3xl text-lg italic text-gnat-steel-dark">
          Early definition removes risk, reduces rework and improves delivery certainty.
        </p>
      </ContentSection>

      <GalleryCallout tag="Hydrodemolition" />

      <CoverageNote service="hydrodemolition" />

      <ContentSection eyebrow="FAQ" heading="Hydrodemolition — common questions.">
        <FAQAccordion faqs={faqs} />
      </ContentSection>

      <RelatedServices excludeSlug="hydrodemolition" />

      <CTABlock
        heading="Not sure if hydrodemolition is the right approach?"
        body="We'll define the method before the problem escalates."
      />
    </>
  );
}
