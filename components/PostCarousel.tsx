'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { PostExtra } from '@/lib/post-extras';
import { track } from '@/lib/analytics';

type PostCarouselProps = {
  /** Images to surface beneath the post body. Empty array → component renders nothing. */
  extras: PostExtra[];
  /** Slug of the parent post — used as a stable key for analytics. */
  postSlug: string;
};

// Per-post image carousel. Lives under /blog/[slug] beneath the body content.
//
// Three things matter here:
//   1. SEO — every image renders server-side with proper alt text AND a visible
//      caption, so Google sees real content per image (not "view 1" / "view 2").
//   2. UX — thumbnails wrap on a grid (mobile-first) and clicking opens a
//      lightbox with prev/next + keyboard nav, mirroring the /gallery pattern
//      so the interaction feels consistent across the site.
//   3. Performance — first ~6 thumbs eager-load (priority on hero only), the
//      rest are lazy. Lightbox image gets priority once opened.
export function PostCarousel({ extras, postSlug }: PostCarouselProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % extras.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) =>
          i === null ? 0 : (i - 1 + extras.length) % extras.length,
        );
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, extras.length]);

  if (extras.length === 0) return null;

  const lightboxImg = lightboxIndex !== null ? extras[lightboxIndex] : null;

  return (
    <section
      aria-label="More photos from this project"
      className="mt-12 border-t border-gnat-concrete pt-8"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
        On site — more from this project
      </p>
      <p className="mt-1 text-sm text-gnat-steel-dark">
        {extras.length} additional photo{extras.length === 1 ? '' : 's'}. Tap any image to view full size.
      </p>

      <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {extras.map((img, idx) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => {
                setLightboxIndex(idx);
                track({
                  event: 'post_carousel_open',
                  post_slug: postSlug,
                  carousel_image_index: idx,
                });
              }}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-gnat-concrete-light"
              aria-label={`View full size: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-gnat-navy/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
                <p className="w-full p-2 text-[11px] font-semibold leading-tight text-white">
                  Photo {idx + 1} of {extras.length}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {lightboxImg && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <p className="text-sm">
              {lightboxIndex + 1} / {extras.length}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close photo viewer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M2 2L20 20M20 2L2 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (i) => (i === null ? 0 : (i - 1 + extras.length) % extras.length),
                )
              }
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M14 4L6 11L14 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="relative h-full max-h-[78vh] w-full max-w-5xl">
              <Image
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((i) => (i === null ? 0 : (i + 1) % extras.length))
              }
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M8 4L16 11L8 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="bg-gnat-navy/95 p-4 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="container-prose">
              <p className="text-sm font-semibold">{lightboxImg.caption}</p>
              <p className="mt-1 text-xs text-gnat-concrete">{lightboxImg.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
