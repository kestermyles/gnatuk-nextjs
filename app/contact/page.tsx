import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CoverageMapClient } from '@/components/CoverageMapClient';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Request a Method Proposal',
  description:
    'Tell us about your scheme — restricted access, live operations or complex removal. We will define the right method and machine, with no obligation.',
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact | GNAT UK',
    description: 'Request a method proposal or discuss your scheme with a specialist.',
    url: `${SITE.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

      <section className="bg-white">
        <div className="container-prose grid gap-14 py-14 md:grid-cols-[1.4fr_1fr] md:py-20 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Request a Method Proposal.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Tell us what you&apos;re dealing with — we&apos;ll define the right method and machine.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-10">
            <div className="rounded-lg bg-gnat-concrete-light p-7">
              <h2 className="text-lg font-semibold text-gnat-navy">Prefer to talk it through?</h2>
              <p className="mt-2 text-gnat-steel-dark">
                Speak directly with a specialist.
              </p>
              <dl className="mt-5 space-y-3 text-[15px]">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    Telephone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${SITE.phoneE164}`}
                      className="text-lg font-semibold text-gnat-navy hover:text-gnat-orange"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-semibold text-gnat-navy hover:text-gnat-orange"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    Address
                  </dt>
                  <dd className="mt-1 leading-relaxed text-gnat-navy">
                    {SITE.address.streetAddress}
                    <br />
                    {SITE.address.locality}, {SITE.address.region}
                    <br />
                    {SITE.address.postalCode}, United Kingdom
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gnat-navy">
                Support services
              </h2>
              <ul className="mt-4 space-y-3">
                {[
                  'Early Contractor Engagement',
                  'Method Development',
                  'RAMS Support',
                  'Site Trials',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-gnat-concrete pb-3 text-gnat-navy"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 flex-none text-gnat-orange" aria-hidden="true">
                      <path d="M3 9L7 13L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-gnat-concrete bg-gnat-concrete-light">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Coverage
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gnat-navy md:text-4xl">
              Where we work.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gnat-steel-dark">
              Specialist demolition, robotic and confined-access work delivered nationwide
              from our Richmond head office and operational bases.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="h-[420px] overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-sm">
              <CoverageMapClient />
            </div>
            <ul className="space-y-4">
              <li className="rounded-lg border border-gnat-concrete bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                  Head Office
                </p>
                <p className="mt-2 text-base font-semibold text-gnat-navy">
                  Richmond, North Yorkshire
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gnat-steel-dark">
                  {SITE.address.streetAddress}
                  <br />
                  {SITE.address.locality}, {SITE.address.postalCode}
                </p>
              </li>
              <li className="rounded-lg border border-gnat-concrete bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                  Midlands Operational Base
                </p>
                <p className="mt-2 text-base font-semibold text-gnat-navy">
                  Birmingham (placeholder)
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gnat-steel-dark">
                  Mobilisation point for projects across the Midlands and Welsh Marches.
                </p>
              </li>
              <li className="rounded-lg border border-gnat-concrete bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                  Southern Operational Base
                </p>
                <p className="mt-2 text-base font-semibold text-gnat-navy">
                  Greater London (placeholder)
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gnat-steel-dark">
                  Mobilisation point for projects across the South East and Thames Valley.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
