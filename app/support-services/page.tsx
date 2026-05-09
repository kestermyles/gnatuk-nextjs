import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Support Services — Early Engagement, Method Development, RAMS & Site Trials',
  description:
    'Pre-construction support from a specialist demolition contractor: early contractor engagement, bespoke method development, CDM-compliant RAMS, and on-site method validation trials.',
  alternates: { canonical: `${SITE.url}/support-services` },
  openGraph: {
    title: 'Support Services | GNAT UK',
    description:
      'Early contractor engagement, method development, RAMS support and site trials for specialist demolition.',
    url: `${SITE.url}/support-services`,
  },
};

type Service = {
  id: string;
  title: string;
  oneLine: string;
  what: string;
  why: string;
  when: string[];
};

const SERVICES: Service[] = [
  {
    id: 'early-contractor-engagement',
    title: 'Early Contractor Engagement',
    oneLine: 'Pre-tender involvement so the method is right before the price is locked in.',
    what:
      "Early Contractor Engagement (ECE) means bringing us in during pre-construction — before the demolition scope is priced. We walk the site, review drawings, and identify the constraints that determine the right method: access dimensions, structural sensitivity, vibration tolerance, sequencing dependencies with other trades. The output is a method-led scope and cost picture, not a guess based on what usually works.",
    why:
      "Demolition tenders are routinely priced on assumptions that don't survive contact with the site. Pricing manual breakers and a muck-away gang for a basement you can't actually fit a skip into leads to expensive variations once work starts. Early engagement turns those discoveries into design decisions before they become change-order conversations.",
    when: [
      'Refurbishment schemes with structural retention',
      'Constrained-access basements, plant rooms, tank farms or shafts',
      'Live operational environments (hospitals, data centres, occupied buildings, active process)',
      'Programme-critical work where post-award method change can\'t be absorbed',
      'Any scheme where the engineer is asking "can we even do this safely?" before it goes to tender',
    ],
  },
  {
    id: 'method-development',
    title: 'Method Development',
    oneLine: "Bespoke methods for schemes that don't fit a standard approach.",
    what:
      'Some sites resist standard methods. The structure is sensitive. Access is impossible for conventional plant. The environment is live. Method Development is the engineering work of designing a method that does fit — selecting and adapting equipment, sequencing operations, and combining techniques (hydrodemolition with diamond sawing, cold cutting with robotic breaking) so the work can actually be delivered. Past examples include adapted Brokk machines mounted inside a tunnel boring machine, mast-climbers carrying remote manipulators inside refractory vessels, and Husqvarna robots on internal mast climbers deconstructing a Grade I listed silo from the inside out.',
    why:
      "When the standard method doesn't fit, the choice is between forcing it (and accepting the safety, programme, and structural risk) or developing a method that does. Bespoke method development is what allows specialist demolition to happen on sites that conventional contractors decline.",
    when: [
      'Listed buildings or heritage-sensitive structures',
      'Confined spaces with non-standard access geometry',
      'Sensitive structures (post-tensioned concrete, partial retention, vibration-restricted)',
      'Live process environments with operational continuity requirements',
      'Schemes requiring multiple complementary techniques in sequence',
    ],
  },
  {
    id: 'rams-support',
    title: 'RAMS Support',
    oneLine:
      'Compliant Risk Assessments and Method Statements, written as a product of method development — not bolted on at the end.',
    what:
      "Risk Assessments and Method Statements (RAMS) are a CDM 2015 deliverable on every demolition scheme. Done well, RAMS document the thinking behind the method — sequence, equipment selection, access strategy, dust and water management, vibration control, emergency arrangements. Done badly, they're generic templates that don't survive site auditing. We deliver RAMS as a product of method development, tailored to the specific scope, and aligned with BS 6187 (the demolition code of practice) and the relevant CDM duties.",
    why:
      "Tier-1 contractors require compliant RAMS for every package. A sub-contractor who can't produce them — or whose RAMS visibly aren't fit for the scheme — creates programme risk before mobilisation. RAMS quality is a leading indicator of execution quality.",
    when: [
      'Every project we deliver as principal sub-contractor',
      'Contract Hire arrangements where the main contractor wants method-statement support alongside the equipment',
      'High-risk schemes requiring third-party DSEAR or structural sign-off',
      'Framework deliveries with standardised submission requirements',
    ],
  },
  {
    id: 'site-trials',
    title: 'Site Trials',
    oneLine: 'Method validation on a representative section before committing the full programme.',
    what:
      'Site trials are a small-scale execution of the proposed method on a representative area, with measurable outputs: productivity (m³/hr or m²/hr), vibration (mm/s PPV), water arisings, dust monitoring, substrate condition after removal. The trial confirms the method works, calibrates the method statement against measured results, and gives the main contractor confidence the programme is achievable.',
    why:
      "Some methods can't be guaranteed on paper. Hydrodemolition pressure and standoff need calibration against the specific concrete strength. Vibration limits in a live environment need validation, not assertion. Site trials reduce the risk of finding out the method doesn't work after the programme has committed to it.",
    when: [
      'Hydrodemolition pressure/output calibration on substrate of unknown strength',
      'Vibration validation before working adjacent to sensitive equipment or structure',
      'Productivity baseline-setting on unfamiliar materials',
      'Water management and treatment validation in environmentally sensitive areas',
      'Dust monitoring before scaling to full-area work',
    ],
  },
];

export default function SupportServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Support Services', href: '/support-services' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Support Services
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              The work that surrounds the work.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Specialist demolition is a method problem before it is an equipment problem.
              Our pre-construction and supporting services exist so the right method is
              defined, documented, and validated — before the programme commits to it.
            </p>
          </div>

          {/* Quick navigation overview */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group rounded-lg border border-gnat-concrete bg-gnat-concrete-light p-5 transition hover:border-gnat-orange/50 hover:bg-white hover:shadow-sm"
              >
                <p className="text-base font-bold leading-snug text-gnat-navy group-hover:text-gnat-orange">
                  {s.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gnat-steel-dark">{s.oneLine}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detail sections */}
      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={
            i % 2 === 0
              ? 'border-t border-gnat-concrete bg-gnat-concrete-light'
              : 'border-t border-gnat-concrete bg-white'
          }
        >
          <div className="container-prose py-14 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                  Support Service {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-gnat-navy md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-base font-semibold leading-relaxed text-gnat-navy">
                  {s.oneLine}
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    What it is
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-gnat-navy">{s.what}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    Why it matters
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-gnat-navy">{s.why}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    When to engage us
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.when.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gnat-navy">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          className="mt-1 flex-none text-gnat-orange"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9L7 13L15 5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Cross-link to evidence */}
      <section className="border-t border-gnat-concrete bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold leading-tight text-gnat-navy md:text-3xl">
              See it in practice.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gnat-steel-dark">
              The thinking behind these services is best illustrated by the projects they
              were used on.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/case-studies"
                className="rounded border border-gnat-orange/30 bg-gnat-orange/5 px-5 py-3 text-sm font-semibold text-gnat-navy transition hover:bg-gnat-orange/10"
              >
                Browse case studies →
              </Link>
              <Link
                href="/insights"
                className="rounded border border-gnat-concrete bg-white px-5 py-3 text-sm font-semibold text-gnat-navy transition hover:border-gnat-orange/50"
              >
                Read method insights →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABlock
        heading="Talk to us before you tender."
        body="Tell us what you're dealing with — we'll come back with the right method, the right machine, and a programme you can stand behind."
      />
    </>
  );
}
