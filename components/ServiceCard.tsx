import Link from 'next/link';

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-lg border border-gnat-concrete bg-white p-7 transition-all hover:border-gnat-orange hover:shadow-lg"
    >
      <div>
        <h3 className="text-xl font-semibold text-gnat-navy group-hover:text-gnat-orange">
          {title}
        </h3>
        <p className="mt-3 leading-relaxed text-gnat-steel-dark">{description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gnat-orange">
        Learn more
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M1 8H15M15 8L9 2M15 8L9 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
