import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AuthorBio } from '@/components/AuthorBio';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { PostCarousel } from '@/components/PostCarousel';
import { ArticleSchema, PersonSchema, PostImageGallerySchema } from '@/components/Schema';
import { ShareButtons } from '@/components/ShareButtons';
import { authorSlug } from '@/lib/authors';
import { autoLinkText } from '@/lib/auto-link';
import { getPostExtras } from '@/lib/post-extras';
import { getAllPosts, getAuthorByName, getPostBySlug } from '@/lib/sanity-queries';
import { SITE } from '@/lib/constants';

// Revalidate cached pages every minute so CMS edits go live within ~60s
// without a redeploy. Webhook-driven on-demand revalidation can be added later.
export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
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

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  // Breadcrumb + "more from..." use the post's primary surface so context matches
  // however the user arrived (case-study reader sees more case studies, etc.).
  const primarySurface = post.surfaces[0] ?? 'blog';
  const surfaceMeta = {
    'case-study': { label: 'Case Studies', href: '/case-studies', moreLabel: 'More projects' },
    insight: { label: 'Insights', href: '/insights', moreLabel: 'More insights' },
    blog: { label: 'Blog', href: '/blog', moreLabel: 'More from the blog' },
  }[primarySurface];

  const allPosts = await getAllPosts();
  const others = allPosts
    .filter((p) => p.slug !== post.slug && p.surfaces.includes(primarySurface))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  // Per-post photo carousel — reads /public/images/blog-extras/<slug>-extra-*.
  // Empty array means no extras → component renders nothing.
  const extras = getPostExtras(post.slug, post.heroAlt, post.title);

  // Author record for the PersonSchema + AuthorBio. The query falls back to
  // the static AUTHORS map when Sanity isn't configured.
  const authorRecord = await getAuthorByName(post.author);
  const postUrl = `${SITE.url}/blog/${post.slug}`;

  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        imageUrl={post.heroImage}
        imageAlt={post.heroAlt}
        datePublished={post.date}
        authorName={post.author}
        url={postUrl}
        category={post.category}
      />
      {authorRecord && (
        <PersonSchema
          name={authorRecord.name}
          jobTitle={authorRecord.role}
          description={authorRecord.blurb}
          imageUrl={authorRecord.image}
          url={`${SITE.url}/authors/${authorRecord.slug ?? authorSlug(authorRecord.name)}`}
          sameAs={authorRecord.linkedin ? [authorRecord.linkedin] : undefined}
        />
      )}
      <PostImageGallerySchema
        postTitle={post.title}
        postUrl={postUrl}
        images={extras}
      />
      <Breadcrumbs
        items={[
          { name: surfaceMeta.label, href: surfaceMeta.href },
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
                  {autoLinkText(para)}
                </p>
              ))}

              <PostCarousel extras={extras} postSlug={post.slug} />

              <ShareButtons
                url={`${SITE.url}/blog/${post.slug}`}
                title={post.title}
              />

              <AuthorBio authorName={post.author} />
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="border-t border-gnat-concrete bg-gnat-concrete-light">
            <div className="container-prose py-14 md:py-16">
              <h2 className="text-2xl font-bold text-gnat-navy md:text-3xl">{surfaceMeta.moreLabel}</h2>
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
