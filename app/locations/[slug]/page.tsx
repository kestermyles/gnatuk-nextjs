import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { ContentSection, CheckList } from '@/components/ContentSection';
import { ServiceHero } from '@/components/ServiceHero';
import { LocalBusinessSchema } from '@/components/Schema';
import { LOCATIONS, type LocationSlug } from '@/lib/locations';
import { SITE } from '@/lib/constants';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return Object.keys(LOCATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const loc = LOCATIONS[params.slug as LocationSlug];
  if (!loc) return { title: 'Location Not Found' };
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `${SITE.url}/locations/${loc.slug}` },
    openGraph: {
      title: `${loc.name} | GNAT UK`,
      description: loc.metaDescription,
      url: `${SITE.url}/locations/${loc.slug}`,
    },
  };
}

export default function LocationPage({ params }: { params: Params }) {
  const loc = LOCATIONS[params.slug as LocationSlug];
  if (!loc) notFound();

  const profileUrl = `${SITE.url}/locations/${loc.slug}`;

  return (
    <>
      <LocalBusinessSchema
        name={`GNAT UK — ${loc.shortName}`}
        description={loc.metaDescription}
        url={profileUrl}
        address={loc.address}
        geo={loc.geo}
        telephone={SITE.phoneE164}
        email={SITE.email}
        areaServed={loc.areasServed}
      />

      <Breadcrumbs
        items={[
          { name: 'Locations', href: '/locations' },
          { name: loc.shortName, href: `/locations/${loc.slug}` },
        ]}
      />

      <ServiceHero
        eyebrow={loc.eyebrow}
        title={loc.hero}
        subtitle={loc.subtitle}
        intro={loc.body[0]}
        backgroundImage={loc.heroImage}
        backgroundAlt={loc.heroAlt}
        benefits={loc.benefits}
      />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
            <div className="space-y-5">
              {loc.body.slice(1).map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-gnat-navy">
                  {para}
                </p>
              ))}
            </div>

            <aside className="rounded-lg border border-gnat-concrete bg-gnat-concrete-light p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gnat-orange">
                Office details
              </p>
              <h2 className="mt-2 text-lg font-bold text-gnat-navy">{loc.shortName}</h2>
              <address className="mt-4 not-italic text-sm leading-relaxed text-gnat-steel-dark">
                <strong className="block text-gnat-navy">GNAT UK Limited</strong>
                {loc.address.streetAddress}
                <br />
                {loc.address.locality}, {loc.address.region}
                <br />
                {loc.address.postalCode}
              </address>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${SITE.phoneE164}`}
                      className="font-semibold text-gnat-navy hover:text-gnat-orange"
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
                    Office hours
                  </dt>
                  <dd className="mt-1 text-gnat-navy">
                    Monday – Friday, 08:00 – 17:00
                    <br />
                    <span className="text-gnat-steel-dark">Closed weekends</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
                    Site coordinates
                  </dt>
                  <dd className="mt-1 text-sm text-gnat-steel-dark">
                    {loc.geo.latitude.toFixed(4)}, {loc.geo.longitude.toFixed(4)}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <ContentSection
        variant="concrete"
        eyebrow="Areas served from this base"
        heading="Coverage out of the depot."
      >
        <CheckList items={loc.areasServed} />
      </ContentSection>

      <CTABlock
        heading="A scheme in this region?"
        body="Tell us the site and the constraints — mobilisation from the closest base keeps the programme tight and the cost honest."
      />
    </>
  );
}
