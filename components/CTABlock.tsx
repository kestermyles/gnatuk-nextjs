import { CTAButton } from './CTAButton';
import { SITE } from '@/lib/constants';

type CTABlockProps = {
  heading: string;
  body?: string;
};

export function CTABlock({ heading, body }: CTABlockProps) {
  return (
    <section className="bg-gnat-navy text-white">
      <div className="container-prose py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[2fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">{heading}</h2>
            {body && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gnat-concrete/80">
                {body}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
            <CTAButton href="/contact" variant="primary" size="lg">
              Request a Method Proposal
            </CTAButton>
            <CTAButton href={`tel:${SITE.phoneE164}`} variant="ghost" size="lg">
              Discuss Your Scheme: {SITE.phoneDisplay}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
