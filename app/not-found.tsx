import { CTAButton } from '@/components/CTAButton';

export default function NotFound() {
  return (
    <section className="container-prose py-24 md:py-32">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold text-gnat-navy md:text-5xl">
        Page not found.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-gnat-steel-dark">
        The page you&apos;re after has moved or never existed. Head back to the home page,
        or talk to a specialist about your scheme.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CTAButton href="/" variant="primary" size="lg">
          Back to home
        </CTAButton>
        <CTAButton href="/contact" variant="secondary" size="lg">
          Request a Method Proposal
        </CTAButton>
      </div>
    </section>
  );
}
