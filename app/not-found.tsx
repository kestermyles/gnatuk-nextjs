import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { SERVICES, SITE } from '@/lib/constants';

export const metadata = {
  title: 'Page not found — GNAT UK',
  description:
    'The page you were looking for has moved or never existed. Browse services, case studies, insights or contact a specialist.',
};

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-prose py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
            404
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
            Page not found.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gnat-steel-dark">
            The page you&apos;re after has moved or never existed. The site recently
            migrated from a different platform — old links may not have made it across.
            Here&apos;s where to go:
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/" variant="primary" size="lg" trackingLocation="404">
              Back to home
            </CTAButton>
            <CTAButton href="/contact" variant="secondary" size="lg" trackingLocation="404">
              Talk to a specialist
            </CTAButton>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gnat-orange">
              Services
            </h2>
            <ul className="mt-4 space-y-2 text-base text-gnat-navy">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="hover:text-gnat-orange hover:underline"
                  >
                    {s.shortName} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gnat-orange">
              Content
            </h2>
            <ul className="mt-4 space-y-2 text-base text-gnat-navy">
              <li>
                <Link href="/case-studies" className="hover:text-gnat-orange hover:underline">
                  Case studies →
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-gnat-orange hover:underline">
                  Method &amp; technique insights →
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gnat-orange hover:underline">
                  Project gallery →
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gnat-orange hover:underline">
                  Blog &amp; fleet updates →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gnat-orange">
              Talk to us
            </h2>
            <ul className="mt-4 space-y-2 text-base text-gnat-navy">
              <li>
                <Link href="/support-services" className="hover:text-gnat-orange hover:underline">
                  Support services →
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gnat-orange hover:underline">
                  Request a method proposal →
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="hover:text-gnat-orange hover:underline"
                >
                  Call {SITE.phoneDisplay} →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
