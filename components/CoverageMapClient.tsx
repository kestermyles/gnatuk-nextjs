'use client';

import dynamic from 'next/dynamic';

// Leaflet uses `window`, so dynamic import with ssr: false.
const Map = dynamic(() => import('./CoverageMap'), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full animate-pulse bg-gnat-concrete-light"
      aria-label="Loading coverage map"
    />
  ),
});

export function CoverageMapClient() {
  return <Map />;
}
