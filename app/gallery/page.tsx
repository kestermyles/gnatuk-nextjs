import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABlock } from '@/components/CTABlock';
import { GalleryGrid } from '@/components/GalleryGrid';
import { ImageGallerySchema } from '@/components/Schema';
import { GALLERY_TAGS, getGalleryImages } from '@/lib/gallery';
import { SITE } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Gallery — Robotic Demolition, Hydrodemolition & Specialist Equipment in Action',
  description:
    'Photo gallery of GNAT UK projects and equipment: Brokk and Husqvarna robotic demolition, Aquajet hydrodemolition, Hilti diamond drilling and cold cutting across UK water, infrastructure, refractory and heritage sites.',
  alternates: { canonical: `${SITE.url}/gallery` },
  openGraph: {
    title: 'Gallery | GNAT UK',
    description:
      'Photos of specialist demolition projects and equipment across UK infrastructure, water, refractory and heritage sites.',
    url: `${SITE.url}/gallery`,
  },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <ImageGallerySchema
        name="GNAT UK Project & Equipment Gallery"
        description="Photos of specialist demolition projects and equipment across the UK."
        url={`${SITE.url}/gallery`}
        imageCount={images.length}
      />

      <Breadcrumbs items={[{ name: 'Gallery', href: '/gallery' }]} />

      <section className="bg-white">
        <div className="container-prose py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gnat-orange">
              Gallery
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gnat-navy md:text-5xl">
              Specialist demolition, in pictures.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gnat-steel-dark">
              Robotic demolition, hydrodemolition, diamond drilling, cold cutting and the
              Brokk fleet — across UK water, infrastructure, refractory, healthcare and
              heritage sites. Filter by service to see specific work.
            </p>
          </div>

          <div className="mt-10">
            <GalleryGrid images={images} tags={GALLERY_TAGS} />
          </div>
        </div>
      </section>

      <CTABlock
        heading="See work like this on your site?"
        body="Tell us what you're dealing with — restricted access, live operations or sensitive structure. We'll define the right method and machine."
      />
    </>
  );
}
