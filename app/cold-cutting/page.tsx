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
  'Abrasive cold cutting of steel, pipework and pressure vessels — spark-free, no heat-affected zone, controlled removal in volatile and live environments.';

export const metadata: Metadata = {
  title: 'Abrasive Cold Cutting for Controlled Industrial Isolation',
  description:
    'Spark-free cold cutting of steel, pipework and vessels in COMAH, petrochemical and live processing environments. No hot works. No ignition risk.',
  alternates: { canonical: `${SITE.url}/cold-cutting` },
  openGraph: {
    title: 'Abrasive Cold Cutting | GNAT UK',
    description: SERVICE_DESC,
    url: `${SITE.url}/cold-cutting`,
  },
};

const faqs = [
  {
    question: 'Why use abrasive cold cutting instead of thermal cutting?',
    answer:
      'Cold cutting removes the ignition source. In COMAH, petrochemical and live processing environments, hot works are either not permitted or carry significant isolation overhead. Abrasive cold cutting allows access, sectioning and isolation cuts to be made without sparks, flame or heat distortion — often without a full plant shutdown.',
  },
  {
    question: 'What ATEX zones can you work in?',
    answer:
      'Abrasive cold cutting is suitable for hazardous-area work where hot works are restricted or prohibited. Each scheme is assessed against the specific zoning, isolation status and site permit regime — not against a generic claim — and the method is defined to match.',
  },
  {
    question: 'What materials can you cut?',
    answer:
      'Carbon steel, stainless steel, alloy pipework, structural steel, pressure vessels, tanks and clad assemblies. Wall thickness and geometry drive the cutting parameters; material is rarely the limit.',
  },
  {
    question: 'Is there any heat-affected zone?',
    answer:
      'No — that is the point. The cut is made by abrasive media in a high-pressure water stream, so there is no heat-affected zone, no distortion and no metallurgical change either side of the kerf. Material remains in the condition it was supplied.',
  },
  {
    question: 'Can you cut live or pressurised systems?',
    answer:
      'Cuts on live or pressurised systems are assessed individually against the isolation status, residual energy and site procedure. We will define what is and is not appropriate up-front, including any depressurisation, drain-down or process-side conditions required before the cut is made.',
  },
];

export default function ColdCuttingPage() {
  return (
    <>
      <ServiceSchema name="Abrasive Cold Cutting" description={SERVICE_DESC} slug="cold-cutting" />
      <FAQPageSchema faqs={faqs} />
      <Breadcrumbs items={[{ name: 'Cold Cutting', href: '/cold-cutting' }]} />

      <ServiceHero
        eyebrow="Abrasive Cold Cutting"
        title="Abrasive Cold Cutting for Controlled Industrial Isolation"
        subtitle="Spark-free cutting of steel, pipework and vessels in live, hazardous or volatile environments — delivered with precision, control and minimal disruption."
        backgroundImage="/images/services/cold-cutting-hero.jpg"
        benefits={[
          'Spark-free cutting in hazardous zones',
          'No heat affected zone (no distortion)',
          'Controlled, precise material removal',
          'Safe isolation of live systems',
        ]}
      />

      <ContentSection
        eyebrow="Cold by design"
        heading="Cold cutting without heat, sparks or risk."
        intro="Abrasive cold cutting uses high-pressure water mixed with abrasive media to cut through steel, pipework and structural components — without heat, sparks or vibration. Primary applications include petrochemical, COMAH and live processing facilities."
      />

      <ContentSection
        variant="concrete"
        eyebrow="Built for hazardous environments"
        heading="Designed for live and high-risk environments."
        intro="Enables cutting and access without introducing ignition risk or structural disturbance."
      >
        <CheckList
          items={[
            'Petrochemical and COMAH sites',
            'Refineries and chemical processing plants',
            'Live pipelines and pressurised systems',
            'Storage tanks and pressure vessels',
            'Confined or restricted access environments',
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="Application range"
        heading="Controlled access, isolation and removal."
      >
        <BulletList
          items={[
            'Pipework and pipeline cutting',
            'Pressure vessel access openings',
            'Tank and containment entry cuts',
            'Structural steel sectioning',
            'Controlled removal of redundant plant',
          ]}
        />
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="Integrated method"
        heading="Part of a controlled demolition system."
        intro="Cold cutting is rarely used in isolation. It opens up the next step — and we plan it that way."
      >
        <FeatureGrid
          columns={3}
          items={[
            {
              title: 'Cut access → robotic removal',
              body: 'Spark-free access cuts that allow robotic demolition to work safely inside vessels and structures.',
            },
            {
              title: 'Cut isolation → hydrodemolition',
              body: 'Isolation cuts that release sections for non-percussive hydrodemolition or structural modification.',
            },
            {
              title: 'Section steel → lift / drill',
              body: 'Controlled steel sectioning that enables lifting, removal or follow-on diamond drilling and sawing.',
            },
          ]}
        />
        <p className="mt-8 max-w-3xl text-lg italic text-gnat-steel-dark">
          This is where GNAT differs — methods are combined, not bolted on.
        </p>
      </ContentSection>

      <ContentSection
        eyebrow="Why cold cutting"
        heading="Why abrasive cold cutting."
      >
        <CheckList
          items={[
            'Eliminates hot works risk',
            'No sparks, flames or heat distortion',
            'High precision cutting in sensitive environments',
            'Suitable for live, operational sites',
            'Reduces shutdown requirements',
          ]}
        />
      </ContentSection>

      <ContentSection eyebrow="FAQ" heading="Cold cutting — common questions.">
        <FAQAccordion faqs={faqs} />
      </ContentSection>

      <RelatedServices excludeSlug="cold-cutting" />

      <CTABlock
        heading="Need a safe cutting method for a live or hazardous environment?"
        body="Abrasive cold cutting provides controlled access without introducing risk."
      />
    </>
  );
}
