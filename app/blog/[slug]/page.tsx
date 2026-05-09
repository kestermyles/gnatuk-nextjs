import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { BLOG, getBlogPostBySlug } from '@/lib/blog';
import { SITE } from '@/lib/constants';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BLOG.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | GNAT UK`,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      images: [{ url: post.heroImage, width: 1200, height: 675, alt: post.heroAlt }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
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

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const others = BLOG.filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article>
        <header className="bg-white">
          <div className="container-prose py-10 md:py-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                {post.category} &middot; {formatDate(post.date)} &middot; {post.author}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-gnat-navy md:text-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gnat-concrete-light md:aspect-[16/7]">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        <section className="bg-white">
          <div className="container-prose py-12 md:py-16">
            <div className="mx-auto max-w-3xl space-y-5">
              {post.body.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-gnat-navy">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="border-t border-gnat-concrete bg-gnat-concrete-light">
            <div className="container-prose py-14 md:py-16">
              <h2 className="text-2xl font-bold text-gnat-navy md:text-3xl">More from the blog</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/blog/${o.slug}`}
                    className="group rounded-lg border border-gnat-concrete bg-white p-5 transition hover:border-gnat-orange/50 hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                      {o.category} &middot; {formatDate(o.date)}
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
        heading="Got a brief?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
