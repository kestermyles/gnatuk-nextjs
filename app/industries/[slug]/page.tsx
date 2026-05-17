import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { ContentSection, FeatureGrid, CheckList } from '@/components/ContentSection';
import { ServiceHero } from '@/components/ServiceHero';
import { FAQAccordion } from '@/components/FAQAccordion';
import { FAQPageSchema } from '@/components/Schema';
import { INDUSTRIES, type IndustrySlug } from '@/lib/industries';
import { SERVICES, SITE } from '@/lib/constants';
import { getAllPosts } from '@/lib/sanity-queries';

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const ind = INDUSTRIES[params.slug as IndustrySlug];
  if (!ind) return { title: 'Industry Not Found' };
  return {
    title: ind.metaTitle,
    description: ind.metaDescription,
    alternates: { canonical: `${SITE.url}/industries/${ind.slug}` },
    openGraph: {
      title: `${ind.shortName} | GNAT UK`,
      description: ind.metaDescription,
      url: `${SITE.url}/industries/${ind.slug}`,
      images: [{ url: ind.heroImage, alt: ind.heroAlt }],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function IndustryHubPage({ params }: { params: Params }) {
  const ind = INDUSTRIES[params.slug as IndustrySlug];
  if (!ind) notFound();

  // Pull only the case studies named in the config — surfacing real,
  // documented projects rather than a generic "we work in this sector" stub.
  const allPosts = await getAllPosts();
  const caseStudies = ind.caseStudySlugs
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const primaryServices = ind.primaryServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <FAQPageSchema faqs={ind.faqs} />
      <Breadcrumbs
        items={[
          { name: 'Industries', href: '/industries' },
          { name: ind.shortName, href: `/industries/${ind.slug}` },
        ]}
      />

      <ServiceHero
        eyebrow={ind.eyebrow}
        title={ind.hero}
        subtitle={ind.subtitle}
        intro={ind.intro[0]}
        backgroundImage={ind.heroImage}
        backgroundAlt={ind.heroAlt}
        benefits={ind.benefits}
      />

      <section className="bg-white">
        <div className="container-prose py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-5">
            {ind.intro.slice(1).map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-gnat-navy">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ContentSection
        variant="concrete"
        eyebrow="What makes this sector different"
        heading="The constraints that shape every method choice."
      >
        <FeatureGrid columns={3} items={ind.whatMakesItDifferent} />
      </ContentSection>

      <ContentSection
        eyebrow="Disciplines applied"
        heading="The methods that anchor in this sector."
        intro="Each linked discipline covers the technique in full — equipment, applications, where it fits, where it doesn't."
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {primaryServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="group flex flex-col rounded-lg border border-gnat-concrete bg-white p-5 transition hover:border-gnat-orange/50 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                  Discipline
                </p>
                <h3 className="mt-1 text-lg font-bold text-gnat-navy group-hover:text-gnat-orange">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gnat-steel-dark">{s.blurb}</p>
                <p className="mt-3 text-xs font-semibold text-gnat-navy group-hover:text-gnat-orange">
                  Discipline page →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        variant="concrete"
        eyebrow="Sub-sectors covered"
        heading={`Where ${ind.shortName.toLowerCase()} work happens.`}
      >
        <CheckList items={ind.subSectors} />
      </ContentSection>

      {ind.projectGallery && ind.projectGallery.length > 0 && (
        <ContentSection
          variant="concrete"
          eyebrow="On site"
          heading="Project imagery from the sector."
          intro="Additional on-site photography from recent schemes — supplements the case studies below."
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ind.projectGallery.map((img) => (
              <li key={img.src}>
                <figure className="overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-sm">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gnat-concrete-light">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="p-3 text-xs leading-snug text-gnat-steel-dark">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </ContentSection>
      )}

      {caseStudies.length > 0 && (
        <ContentSection
          eyebrow="Documented projects"
          heading={`${ind.shortName} case studies on file.`}
          intro={`${caseStudies.length} project${caseStudies.length === 1 ? '' : 's'} in this sector — each with the method statement, the equipment used, and the outcome.`}
        >
          <ul className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs) => (
              <li key={cs.slug}>
                <Link
                  href={`/blog/${cs.slug}`}
                  className="group flex h-full overflow-hidden rounded-lg border border-gnat-concrete bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gnat-orange/50 hover:shadow-md"
                >
                  <div className="relative aspect-square w-32 flex-none overflow-hidden bg-gnat-concrete-light">
                    <Image
                      src={cs.heroImage}
                      alt={cs.heroAlt}
                      fill
                      sizes="128px"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                      {cs.category} &middot; {formatDate(cs.date)}
                    </p>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-gnat-navy group-hover:text-gnat-orange">
                      {cs.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gnat-steel-dark">
                      {cs.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </ContentSection>
      )}

      <ContentSection eyebrow="FAQ" heading={`${ind.shortName} — common questions.`}>
        <FAQAccordion faqs={ind.faqs} />
      </ContentSection>

      <CTABlock heading={ind.cta.heading} body={ind.cta.body} />
    </>
  );
}
