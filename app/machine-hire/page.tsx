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
  'Brokk robotic demolition machine hire across the UK — supplied with method-led expertise, not just plant. The right machine, matched to the work.';

export const metadata: Metadata = {
  title: 'Brokk Robotic Demolition Machine Hire',
  description:
    'Compact robotic demolition machines (Brokk 70 to 800) for confined access and controlled removal. Supplied with method-led expertise — not just plant.',
  alternates: { canonical: `${SITE.url}/machine-hire` },
  openGraph: {
    title: 'Robotic Demolition Machine Hire | GNAT UK',
    description: SERVICE_DESC,
    url: `${SITE.url}/machine-hire`,
  },
};

const fleet = [
  {
    name: 'Brokk 70',
    spec: 'Ultra-compact | 560mm access',
    body: 'For the tightest internal access where nothing else fits.',
  },
  {
    name: 'Brokk 110',
    spec: 'Compact | confined access',
    body: 'For small-scale demolition in restricted internal spaces.',
  },
  {
    name: 'Brokk 170',
    spec: 'Compact power | internal structural work',
    body: 'For heavier internal removal where access is still limited.',
  },
  {
    name: 'Brokk 200',
    spec: 'High output | structural demolition',
    body: 'For core structural demolition across most site conditions.',
  },
  {
    name: 'Brokk 300',
    spec: 'Heavy duty | extended reach',
    body: 'For deeper structural removal where reach and power increase.',
  },
  {
    name: 'Brokk 500',
    spec: 'High impact | large-scale work',
    body: 'For major structural demolition where output matters.',
  },
  {
    name: 'Brokk 800',
    spec: 'Maximum power | extreme duty',
    body: 'For the heaviest demolition in the most demanding environments.',
  },
];

const faqs = [
  {
    question: 'Do you provide operators with machine hire?',
    answer:
      'Yes — operated hire is the default. Our operators are qualified on the Brokk fleet and bring the method-led delivery approach with them. Plant-only supply is considered case-by-case where the receiving site has the operator capability and the work suits it.',
  },
  {
    question: "What's the minimum hire period?",
    answer:
      "Hire is built around the works package, not a fixed minimum. Short-duration packages, framework call-offs and longer programmes are all supplied — we'll define duration alongside the method so the machine and the team are matched to the scope.",
  },
  {
    question: 'Is training included?',
    answer:
      'For operated hire, the operator is qualified and competent on arrival. For plant-only supply where training is needed, we will define what is required as part of mobilisation rather than leave it to the receiving site to discover on day one.',
  },
  {
    question: "I'm not sure which size machine I need.",
    answer:
      'Most enquiries start there. We will help you identify the right machine, the right setup, and where needed, the right method — based on access, structural behaviour and the work itself, not just output or weight class.',
  },
  {
    question: 'Can you mobilise nationally?',
    answer:
      'Yes — the fleet is mobilised across the UK, including water and AMP8 infrastructure, COMAH sites and live operational facilities. Programme integration and access constraints are reviewed up-front so the machine arrives able to start.',
  },
];

export default function MachineHirePage() {
  return (
    <>
      <ServiceSchema name="Brokk Robotic Demolition Machine Hire" description={SERVICE_DESC} slug="machine-hire" />
      <FAQPageSchema faqs={faqs} />
      <Breadcrumbs items={[{ name: 'Machine Hire', href: '/machine-hire' }]} />

      <ServiceHero
        eyebrow="Machine Hire — Brokk Fleet"
        title="Robotic Demolition Machine Hire"
        subtitle="Compact robotic demolition machines for confined access, controlled removal and safer delivery in live environments."
        backgroundImage="/images/services/machine-hire-hero.jpg"
        benefits={[
          'Confined access specialists',
          'Live operational environments',
          'Reduced manual handling risk',
          'Method-led demolition delivery',
        ]}
      />

      <ContentSection
        eyebrow="Start with the approach"
        heading="Most people start with the machine. That's the problem."
        intro="Access, structure and sequence determine what's actually workable on-site. Start with the approach. Then choose the machine."
      />

      <ContentSection
        variant="concrete"
        eyebrow="Available fleet"
        heading="Brokk fleet — sized to the work."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fleet.map((m) => (
            <div
              key={m.name}
              className="rounded-lg border border-gnat-concrete bg-white p-6 transition-all hover:border-gnat-orange hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                {m.spec}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-gnat-navy">{m.name}</h3>
              <p className="mt-3 leading-relaxed text-gnat-steel-dark">{m.body}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Matched to the work"
        heading="Matched to the job, not just the spec."
        intro="Each machine is selected based on how the work will actually be carried out — not just output or size."
      >
        <p className="font-semibold text-gnat-navy">What matters on-site:</p>
        <div className="mt-4">
          <BulletList
            items={[
              'How the machine gets in',
              'How the structure behaves',
              'How the work is sequenced',
              "What can and can't be disturbed",
            ]}
          />
        </div>
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="When to bring us in"
        heading="When to involve GNAT."
      >
        <CheckList
          items={[
            'Access is restricted or unusual',
            'The structure is sensitive or partially retained',
            'Work is taking place in a live environment',
            'Vibration, dust or disruption must be controlled',
            "The method isn't fully defined yet",
          ]}
        />
        <p className="mt-8 max-w-3xl text-lg italic text-gnat-steel-dark">
          Early input avoids costly changes later.
        </p>
      </ContentSection>

      <ContentSection
        eyebrow="Decision support"
        heading="Not sure which machine you need?"
        intro="Most enquiries start there. We help you identify the right machine, the right setup, and where needed, the right method. No over-spec. No guesswork."
      />

      <ContentSection eyebrow="FAQ" heading="Machine hire — common questions.">
        <FAQAccordion faqs={faqs} />
      </ContentSection>

      <RelatedServices excludeSlug="machine-hire" />

      <CTABlock
        heading="Start with the right approach."
        body="Tell us what you're dealing with — we'll point you in the right direction, whether that's a machine, a method, or both."
      />
    </>
  );
}
