import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/case-studies';
import { SITE } from '@/lib/constants';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) return { title: 'Case Study Not Found' };
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `${SITE.url}/case-studies/${cs.slug}` },
    openGraph: {
      title: `${cs.title} | GNAT UK`,
      description: cs.summary,
      url: `${SITE.url}/case-studies/${cs.slug}`,
      images: [{ url: cs.heroImage, width: 1200, height: 675, alt: cs.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.title,
      description: cs.summary,
      images: [cs.heroImage],
    },
  };
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  const otherCases = CASE_STUDIES.filter((other) => other.slug !== cs.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Case Studies', href: '/case-studies' },
          { name: cs.title, href: `/case-studies/${cs.slug}` },
        ]}
      />

      <article>
        <header className="bg-gnat-navy text-white">
          <div className="container-prose py-14 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              {cs.sector}
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              {cs.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gnat-concrete/85">
              {cs.summary}
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-concrete/60">
                  Location
                </dt>
                <dd className="mt-1 text-base font-semibold">{cs.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-concrete/60">
                  Year
                </dt>
                <dd className="mt-1 text-base font-semibold">{cs.year}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-concrete/60">
                  Duration
                </dt>
                <dd className="mt-1 text-base font-semibold">{cs.duration}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="relative aspect-[16/7] w-full overflow-hidden bg-gnat-concrete-light">
          <Image
            src={cs.heroImage}
            alt={cs.heroAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        <section className="bg-white">
          <div className="container-prose grid gap-12 py-14 md:grid-cols-[1.6fr_1fr] md:py-20 lg:gap-16">
            <div className="space-y-10">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gnat-orange">
                  The challenge
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-gnat-navy">{cs.challenge}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gnat-orange">
                  The method
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-gnat-navy">{cs.method}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gnat-orange">
                  The outcome
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-gnat-navy">{cs.outcome}</p>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-lg border border-gnat-concrete bg-gnat-concrete-light p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                  Project highlights
                </h3>
                <dl className="mt-4 space-y-4">
                  {cs.highlights.map((h) => (
                    <div key={h.label}>
                      <dt className="text-xs uppercase tracking-wider text-gnat-steel-dark">
                        {h.label}
                      </dt>
                      <dd className="mt-1 text-2xl font-bold leading-tight text-gnat-navy">
                        {h.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-lg border border-gnat-concrete p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                  Equipment used
                </h3>
                <ul className="mt-4 space-y-2 text-gnat-navy">
                  {cs.equipment.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg
                        width="16"
                        height="16"
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {otherCases.length > 0 && (
          <section className="border-t border-gnat-concrete bg-gnat-concrete-light">
            <div className="container-prose py-14 md:py-20">
              <h2 className="text-2xl font-bold text-gnat-navy md:text-3xl">
                Other projects
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {otherCases.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/case-studies/${o.slug}`}
                    className="group rounded-lg border border-gnat-concrete bg-white p-5 transition hover:border-gnat-orange/50 hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                      {o.sector}
                    </p>
                    <p className="mt-2 text-base font-semibold leading-snug text-gnat-navy group-hover:text-gnat-orange">
                      {o.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTABlock
        heading="Got a similar scheme?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
