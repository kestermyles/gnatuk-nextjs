import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How GNAT UK Limited collects, uses and protects your personal data.',
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />

      <article className="container-prose py-14 md:py-20">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gnat-navy md:text-5xl">Privacy Policy</h1>
          <p className="mt-5 text-lg text-gnat-steel-dark">
            This Privacy Policy describes how {SITE.legalName} collects, uses and discloses
            information when you use our Service, and outlines your privacy rights and legal
            protections.
          </p>
        </header>

        <div className="prose prose-lg mt-12 max-w-3xl space-y-8 text-gnat-steel-dark">
          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Interpretation and Definitions</h2>
            <p>
              <strong className="text-gnat-navy">Company:</strong> {SITE.legalName}, Head Office,{' '}
              {SITE.address.streetAddress}, {SITE.address.locality}, {SITE.address.region}{' '}
              {SITE.address.postalCode}. The Company is the Data Controller under GDPR.
            </p>
            <p>
              <strong className="text-gnat-navy">Personal Data:</strong> information relating to an
              identified or identifiable individual, including name, identification number,
              location data, and online identifiers.
            </p>
            <p>
              <strong className="text-gnat-navy">Service:</strong> the website accessible at{' '}
              {SITE.url}.
            </p>
            <p>
              <strong className="text-gnat-navy">Usage Data:</strong> information collected
              automatically during Service use, such as IP address, browser type, pages visited and
              time spent on pages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Personal Data we collect</h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>Email address</li>
              <li>First and last name</li>
              <li>Phone number</li>
              <li>Address, postal code, city</li>
              <li>Usage Data</li>
            </ul>
            <p>
              Usage Data is collected automatically and includes device IP address, browser
              information, pages visited, timestamps and unique device identifiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">How we use your data</h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>Provide and maintain the Service</li>
              <li>Manage user accounts and respond to enquiries</li>
              <li>Fulfil contracts and follow-up communication</li>
              <li>Provide news and information about similar services where you have consented</li>
              <li>Analyse data and improve the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Sharing your Personal Data</h2>
            <p>
              We may share information with: service providers who support the Service, parties
              involved in business transfers, affiliates required to honour this Privacy Policy,
              business partners offering relevant products or services, and third parties with your
              explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Retention</h2>
            <p>
              Personal Data is retained only as long as necessary for the stated purposes. Usage
              Data is generally retained for shorter periods, except where required for security or
              legal compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Cookies and tracking</h2>
            <p>
              The Service uses essential cookies, functionality cookies and analytics cookies.
              Analytics is provided via Google Tag Manager and Google Analytics. You may opt out of
              Google Analytics via the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gnat-orange underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Your rights under GDPR</h2>
            <p>
              You have the right to: access your data, correct it, object to processing, request
              erasure, request data portability, and withdraw consent. To exercise these rights,
              contact us at{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gnat-orange underline"
              >
                {SITE.email}
              </a>
              . You may also lodge a complaint with the UK Information Commissioner&apos;s Office
              (ICO).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Security</h2>
            <p>
              We use commercially acceptable means to protect Personal Data, but no transmission or
              electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Children&apos;s privacy</h2>
            <p>
              The Service does not target anyone under 13 and does not knowingly collect personally
              identifiable information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Changes to this policy</h2>
            <p>
              We may update this Privacy Policy periodically. Material changes will be communicated
              via the Service or by email where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gnat-navy">Contact</h2>
            <p>
              For privacy questions, contact:
              <br />
              <a href={`mailto:${SITE.email}`} className="text-gnat-orange underline">
                {SITE.email}
              </a>
              <br />
              {SITE.legalName}
              <br />
              {SITE.address.streetAddress}
              <br />
              {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
              <br />
              United Kingdom
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
