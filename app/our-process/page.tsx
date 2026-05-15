import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { ContentSection, FeatureGrid, CheckList } from '@/components/ContentSection';
import { ServiceHero } from '@/components/ServiceHero';
import { FAQAccordion } from '@/components/FAQAccordion';
import { FAQPageSchema } from '@/components/Schema';
import { SITE } from '@/lib/constants';

const PROCESS_DESC =
  'How GNAT UK defines, proposes, mobilises and delivers specialist demolition — the method-led process behind every case study on this site.';

export const metadata: Metadata = {
  title: 'Our Process — Method-Led Specialist Demolition',
  description:
    'Method-led specialist demolition: how GNAT UK defines the right approach for confined-access, COMAH and live-environment schemes. From brief intake to handover.',
  alternates: { canonical: `${SITE.url}/our-process` },
  openGraph: {
    title: 'Our Process | GNAT UK',
    description: PROCESS_DESC,
    url: `${SITE.url}/our-process`,
  },
};

const faqs = [
  {
    question: 'What does "method-led" mean in practice?',
    answer:
      "It means the method statement is defined before the equipment list — not the other way round. We work out what sequence of techniques actually solves the problem, then mobilise the kit that fits. The alternative — picking machines first because they're in the yard, then writing a method around them — is what produces stalled programmes and unsafe substitutions on site.",
  },
  {
    question: 'Will you tell us when our preferred method is wrong?',
    answer:
      "Yes. If the brief specifies a method that won't deliver — wrong access, wrong substrate, wrong environmental constraints — we say so upfront, before commercial submission. It's quicker for everyone than discovering it once mobilised. We'd rather lose a job on the brief than lose a programme on site.",
  },
  {
    question: 'How early do you want to be involved in a scheme?',
    answer:
      'The earlier the better. Method definition is most valuable at pre-construction stage when the design can still flex around the demolition sequence. We routinely contribute to early contractor involvement (ECI) and design-and-build temporary-works coordination.',
  },
  {
    question: 'Do you sub-contract any of the disciplines you advertise?',
    answer:
      'No. Robotic demolition, hydrodemolition, diamond drilling and cold cutting are all delivered by directly-employed GNAT UK teams operating GNAT UK plant. That direct chain is what lets us hold the commercial and safety responsibility end-to-end.',
  },
  {
    question: 'What documentation do you provide for pre-construction?',
    answer:
      'Method statement, risk assessment, COSHH where applicable, plant register with insurance and inspection records, operator competencies (CCDO, CSCS and discipline-specific cards), environmental controls and waste plan, plus our standard pre-construction information pack (insurance, modern-slavery, equality, policy library). Any client-specific PQQ items can be returned in their preferred template.',
  },
];

export default function OurProcessPage() {
  return (
    <>
      <FAQPageSchema faqs={faqs} />
      <Breadcrumbs items={[{ name: 'Our Process', href: '/our-process' }]} />

      <ServiceHero
        eyebrow="Our Process"
        title="Method-led specialist demolition."
        subtitle="The right method, defined before the kit list — and held all the way to handover."
        intro="Across 40+ years on confined-access, COMAH-regulated and live-environment schemes, the same lesson keeps surfacing: the method makes or breaks the programme. This is how GNAT UK works."
        backgroundImage="/images/services/hero-home.jpg"
        backgroundAlt="GNAT UK team mobilising robotic demolition equipment on a confined industrial site"
        benefits={[
          'Method defined before kit list',
          'Single team, end-to-end',
          'Upfront on what won\'t work',
          'Pre-construction PQQ-ready',
        ]}
      />

      <ContentSection
        eyebrow="Why method matters"
        heading="Picking the machine first is how programmes stall."
        intro="The fastest way to lose a fortnight on a specialist demolition scheme is to start with the equipment instead of the problem. Most projects come to us after the wrong method has already been priced — diamond cutting where hydrodemolition would clear the section in a quarter of the time; a 250kg robot specified for confined access where a 60kg machine could reach behind the steelwork; conventional breaking on a structure that won't take vibration. We define the method first, then commit to the kit that delivers it."
      />

      <ContentSection
        variant="concrete"
        eyebrow="The five stages"
        heading="From brief to handover, in five defined stages."
        intro="Every project moves through the same five-stage pipeline. The reason we publish it is that buyers consistently say the value isn't in the demolition itself — it's in knowing exactly where the project is at any given moment."
      >
        <FeatureGrid
          columns={3}
          items={[
            {
              title: '1. Brief intake',
              body: 'Site visit, structural review, environmental and access constraints, programme dependencies. We come back with a method recommendation — or, where the brief is structurally incompatible, an alternative.',
            },
            {
              title: '2. Method definition',
              body: 'The sequence of techniques, the equipment they require, the sequencing constraints, and the safety case. Written as a method statement, not a sales document — every assumption is auditable.',
            },
            {
              title: '3. Proposal',
              body: 'Method statement, risk assessment, COSHH where applicable, plant + operator list, programme, environmental plan and commercial submission as one consolidated pack. Buyer-side review-ready.',
            },
            {
              title: '4. Mobilisation',
              body: 'Operator pairings confirmed against scheme competencies, plant prepared from the nearest of our three operating bases (Richmond, Derby, Stevenage), site setup, pre-start safety induction and toolbox.',
            },
            {
              title: '5. Delivery + handover',
              body: 'Daily monitoring against the method statement, structural progress measurement, environmental checks, snagging and handover documentation. The site leaves audit-ready.',
            },
            {
              title: 'Ongoing — variations',
              body: 'Schemes change. When site reality diverges from the method, we re-run the method-definition step before committing extra cost — same auditable process at every variation.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="What you get from working this way"
        heading="The buyer-side outcomes."
      >
        <CheckList
          items={[
            'Method risks identified pre-commercial — not on site',
            'One commercial submission, one accountable team, end to end',
            'Programme confidence — the method drives the dates, not vice versa',
            'PQQ documentation pack returned in your preferred template',
            'Variations handled with the same audit trail as the original brief',
            'Direct access to the team delivering the work — no account-management layer',
          ]}
        />
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="Where this matters most"
        heading="Sectors where method definition is the whole job."
        intro="Some projects can be priced from a tool list. Specialist demolition isn't one of them — these are the sectors where the method-first approach pays back hardest."
      >
        <FeatureGrid
          columns={3}
          items={[
            {
              title: 'COMAH-regulated sites',
              body: 'Petrochemical, refining and major-hazard installations. Hot-work restrictions, ATEX zoning, DSEAR documentation and operator competency are non-negotiable starting points.',
            },
            {
              title: 'Water infrastructure (AMP8)',
              body: 'Reservoirs, treatment plant, sewer flumes and dockside structures — where structural sensitivity, water management and asset-owner safety regimes all bear on the method.',
            },
            {
              title: 'Listed and heritage buildings',
              body: 'Grade I and Grade II* schemes where the structure must be preserved while non-original elements come out. Method tolerance is millimetric.',
            },
            {
              title: 'Live operational assets',
              body: 'Where the surrounding facility cannot be taken offline. Vibration limits, dust controls, noise envelopes and site interface management are designed in from the start.',
            },
            {
              title: 'Refractory and process vessels',
              body: 'Kilns, furnaces, tanks. Confined-space access, contaminant control and post-operative environmental sign-off shape the method choice.',
            },
            {
              title: 'Offshore and tunnel works',
              body: 'Constrained working envelopes, restricted access for plant movements, and lift-plan integration with the wider project. Mobilisation logistics are part of the method, not bolted on.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection eyebrow="FAQ" heading="The questions buyers ask before commissioning.">
        <FAQAccordion faqs={faqs} />
      </ContentSection>

      <CTABlock
        heading="Have a brief that needs method-led thinking?"
        body="The earlier we're involved, the more value the process delivers. Pre-construction stage is ideal — we'll tell you upfront whether the method fits, and what the right alternative is if it doesn't."
      />
    </>
  );
}
