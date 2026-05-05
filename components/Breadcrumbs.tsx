import Link from 'next/link';
import { BreadcrumbSchema } from './Schema';
import { SITE } from '@/lib/constants';

export type BreadcrumbItem = { name: string; href: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  const schemaItems = all.map((item) => ({
    name: item.name,
    url: `${SITE.url}${item.href === '/' ? '' : item.href}`,
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb" className="container-prose pt-6 text-sm text-gnat-steel-dark">
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-gnat-navy">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-gnat-orange transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-gnat-steel">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
