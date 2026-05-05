import type { Metadata } from 'next';
import { CTAButton } from '@/components/CTAButton';
import { ServiceCard } from '@/components/ServiceCard';
import { CTABlock } from '@/components/CTABlock';
import { SERVICES, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'GNAT UK | Specialist Demolition — Robotic & Confined Access',
  description:
    'Robotic demolition, hydrodemolition, diamond drilling and cold cutting — defined and delivered as a single controlled system for confined, live and high-risk environments.',
  alternates: { canonical: SITE.url },
};

const benefits = [
  'Specialists in confined & restricted access',
  'Live operational environments',
  'Reduced manual handling risk',
  'Method-led demolition delivery',
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gnat-navy text-white">
        <div className="container-prose py-16 md:py-24 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
            Specialist Demolition
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.05] md:text-6xl lg:text-[68px]">
            Controlled demolition for complex, constrained environments.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-gnat-concrete/85 md:text-2xl">
            Robotic demolition, hydrodemolition, precision cutting and cold cutting — defined and
            delivered as a single controlled system.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/contact" variant="primary" size="lg">
              Request a Method Proposal
            </CTAButton>
            <CTAButton href={`tel:${SITE.phoneE164}`} variant="ghost" size="lg">
              Discuss Your Scheme: {SITE.phoneDisplay}
            </CTAButton>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:max-w-4xl md:grid-cols-4 md:gap-5">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-sm font-medium text-gnat-concrete"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 flex-none text-gnat-orange" aria-hidden="true">
                  <path d="M3 9L7 13L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-prose py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Risk reduction
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gnat-navy md:text-5xl md:leading-tight">
              Reduce risk. Maintain programme. Stay in control.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Early method definition removes uncertainty, reduces rework and keeps complex
              demolition packages moving.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                title: 'Remove Risk',
                body: 'Keep people out of hazardous environments.',
              },
              {
                title: 'Reduce Temporary Works',
                body: 'Less scaffolding. Less manual intervention.',
              },
              {
                title: 'Maintain Programme',
                body: 'Controlled, predictable delivery.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-l-4 border-gnat-orange bg-gnat-concrete-light p-7"
              >
                <h3 className="text-xl font-semibold text-gnat-navy">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-gnat-steel-dark">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gnat-concrete-light">
        <div className="container-prose py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              The challenge
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gnat-navy md:text-5xl md:leading-tight">
              When access is restricted, conventional demolition creates risk.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Across infrastructure, water and industrial environments, demolition is rarely
              straightforward. Confined access, live assets, structural sensitivity and
              environmental constraints all limit what can be done — and how safely it can be
              delivered.
            </p>
          </div>

          <div className="mt-10">
            <p className="font-semibold text-gnat-navy">
              Standard methods often introduce unnecessary risk:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:max-w-3xl">
              {[
                'Excess vibration affecting live structures',
                'Manual handling in hazardous environments',
                'Dust, noise and uncontrolled material removal',
                'Limited access restricting productivity',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gnat-steel-dark">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-gnat-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-prose py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Specialist capability
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gnat-navy md:text-5xl md:leading-tight">
              Specialist capability, built around control.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              We combine multiple controlled demolition techniques to deliver safe, precise outcomes
              in the most constrained environments.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.slug}
                title={s.name}
                description={s.blurb}
                href={`/${s.slug}`}
              />
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-lg italic text-gnat-steel-dark">
            Each method is selected and applied based on the scheme&apos;s constraints — not a
            standard approach.
          </p>
        </div>
      </section>

      <section className="bg-gnat-concrete-light">
        <div className="container-prose py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
                Built for constrained infrastructure
              </p>
              <h2 className="mt-3 text-3xl font-bold text-gnat-navy md:text-4xl">
                Where access is limited, structures are live, and sequencing is critical.
              </h2>
            </div>
            <ul className="space-y-4">
              {[
                'Water and AMP8 infrastructure',
                'Tunnels, shafts and confined access',
                'Industrial and COMAH sites',
                'Live operational environments',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-gnat-concrete pb-4 text-lg text-gnat-navy"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-1 flex-none text-gnat-orange" aria-hidden="true">
                    <path d="M4 10L8.5 14.5L17 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-prose py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Early engagement
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gnat-navy md:text-5xl md:leading-tight">
              Bring us in early. Avoid solving it twice.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              The earlier we&apos;re involved, the safer — and more efficient — the outcome.
              We define the method before constraints become problems.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:max-w-3xl md:grid-cols-4 md:gap-5">
            {[
              'Method development',
              'Buildability input',
              'RAMS support',
              'Programme integration',
            ].map((item) => (
              <div
                key={item}
                className="rounded border border-gnat-concrete bg-white px-4 py-5 text-center text-sm font-semibold text-gnat-navy"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        heading="Tell us what you're dealing with."
        body="Whether it's restricted access, live operations or complex removal, we'll select the right method — not force the wrong one."
      />
    </>
  );
}
