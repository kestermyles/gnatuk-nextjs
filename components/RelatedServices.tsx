import { ServiceCard } from './ServiceCard';
import { SERVICES, type ServiceSlug } from '@/lib/constants';

export function RelatedServices({ excludeSlug }: { excludeSlug: ServiceSlug }) {
  const others = SERVICES.filter((s) => s.slug !== excludeSlug);
  return (
    <section className="bg-gnat-concrete-light">
      <div className="container-prose py-16 md:py-20">
        <h2 className="text-3xl font-bold text-gnat-navy md:text-4xl">
          Integrated with specialist demolition methods
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-gnat-steel-dark">
          Methods are combined, not bolted on — selected based on the scheme&apos;s constraints.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <ServiceCard
              key={s.slug}
              title={s.shortName}
              description={s.blurb}
              href={`/${s.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
