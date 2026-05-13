// Studio runs full-bleed without the site chrome — and explicitly disallow
// indexing of /studio so editors don't end up in search results.

export const metadata = {
  title: 'GNAT UK — Content Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
