import Image from 'next/image';
import { CTAButton } from './CTAButton';
import { SITE } from '@/lib/constants';

type ServiceHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro?: string;
  benefits: string[];
  backgroundImage?: string;
  backgroundAlt?: string;
};

export function ServiceHero({
  eyebrow,
  title,
  subtitle,
  intro,
  benefits,
  backgroundImage,
  backgroundAlt = '',
}: ServiceHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gnat-navy text-white">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Two-layer overlay for reliable text contrast across any hero image:
              the horizontal gradient anchors the left side where text sits,
              and a global navy wash keeps the right side cohesive even when
              the underlying photo is very light (e.g. diamond-drilling-hero).
              Together: WCAG-safe white-on-navy contrast everywhere the H1 sits. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gnat-navy/30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-gnat-navy/70 via-gnat-navy/45 to-gnat-navy/10"
          />
        </>
      )}
      <div className="container-prose relative py-14 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-gnat-concrete/85">
          {subtitle}
        </p>
        {intro && (
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gnat-concrete/75">
            {intro}
          </p>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/contact" variant="primary" size="lg">
            Request a Method Proposal
          </CTAButton>
          <CTAButton href={`tel:${SITE.phoneE164}`} variant="ghost" size="lg">
            Discuss Your Scheme: {SITE.phoneDisplay}
          </CTAButton>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:max-w-3xl md:grid-cols-4 md:gap-5">
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
  );
}
