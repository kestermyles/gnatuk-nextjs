'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { GalleryImage, GalleryTag } from '@/lib/gallery';

type GalleryGridProps = {
  images: GalleryImage[];
  tags: GalleryTag[];
};

export function GalleryGrid({ images, tags }: GalleryGridProps) {
  const [activeTag, setActiveTag] = useState<GalleryTag | 'All'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeTag === 'All'
      ? images
      : images.filter((img) => img.tags.includes(activeTag));

  const tagCounts: Record<string, number> = { All: images.length };
  for (const t of tags) {
    tagCounts[t] = images.filter((img) => img.tags.includes(t)).length;
  }

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) =>
          i === null ? 0 : (i - 1 + filtered.length) % filtered.length,
        );
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filtered.length]);

  const lightboxImg = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div>
      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2">
        {(['All', ...tags] as const).map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag as GalleryTag | 'All')}
              className={
                'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                (active
                  ? 'bg-gnat-orange text-white shadow-sm'
                  : 'bg-gnat-concrete-light text-gnat-navy hover:bg-gnat-concrete')
              }
              aria-pressed={active}
            >
              {tag}
              <span className="ml-1.5 text-xs opacity-70">({tagCounts[tag] ?? 0})</span>
            </button>
          );
        })}
      </div>

      {/* Image grid */}
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img, idx) => (
          <li key={`${img.src}-${idx}`}>
            <button
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-gnat-concrete-light"
              aria-label={`View image: ${img.caption ?? img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-gnat-navy/80 via-gnat-navy/0 to-gnat-navy/0 opacity-0 transition group-hover:opacity-100">
                <div className="w-full p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                    {img.tags[0]}
                  </p>
                  {img.caption && (
                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-tight text-white">
                      {img.caption}
                    </p>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox modal */}
      {lightboxImg && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close + counter */}
          <div className="flex items-center justify-between p-4 text-white">
            <p className="text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close lightbox"
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

          {/* Image */}
          <div
            className="relative flex flex-1 items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length),
                )
              }
              aria-label="Previous image"
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

            {/* Next */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length))
              }
              aria-label="Next image"
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

          {/* Caption + link bar */}
          <div
            className="bg-gnat-navy/95 p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-prose flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-gnat-orange">
                  {lightboxImg.tags.join(' · ')}
                </p>
                {lightboxImg.caption && (
                  <p className="mt-1 truncate text-base font-semibold">
                    {lightboxImg.caption}
                  </p>
                )}
                <p className="mt-1 line-clamp-2 text-sm text-gnat-concrete">
                  {lightboxImg.alt}
                </p>
              </div>
              {lightboxImg.href && (
                <Link
                  href={lightboxImg.href}
                  className="shrink-0 rounded bg-gnat-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-gnat-orange/90"
                  onClick={() => setLightboxIndex(null)}
                >
                  Read more →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
