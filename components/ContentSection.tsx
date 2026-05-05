import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type ContentSectionProps = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  children?: ReactNode;
  variant?: 'light' | 'concrete';
  className?: string;
};

export function ContentSection({
  eyebrow,
  heading,
  intro,
  children,
  variant = 'light',
  className,
}: ContentSectionProps) {
  return (
    <section
      className={cn(
        variant === 'concrete' ? 'bg-gnat-concrete-light' : 'bg-white',
        className,
      )}
    >
      <div className="container-prose py-16 md:py-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 text-3xl font-bold text-gnat-navy md:text-4xl md:leading-tight">
            {heading}
          </h2>
          {intro && (
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">{intro}</p>
          )}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function FeatureGrid({
  items,
  columns = 4,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3 | 4;
}) {
  const colClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];
  return (
    <div className={cn('grid gap-5', colClass)}>
      {items.map((item) => (
        <div
          key={item.title}
          className="border-l-2 border-gnat-orange bg-gnat-concrete-light p-6"
        >
          <h3 className="text-lg font-semibold text-gnat-navy">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-gnat-steel-dark">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-gnat-steel-dark">
          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-gnat-orange" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-gnat-navy">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 flex-none text-gnat-orange" aria-hidden="true">
            <path d="M4 10L8.5 14.5L17 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
