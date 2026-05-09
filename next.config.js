/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/diamond-drilling-and-sawing', destination: '/diamond-drilling', permanent: true },
      { source: '/abrasive-cold-cutting', destination: '/cold-cutting', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      // /news was a brief intermediate route name; consolidated under /blog.
      { source: '/news', destination: '/blog', permanent: true },
      { source: '/news/:slug', destination: '/blog/:slug', permanent: true },
      // Wix blog post URLs → new /blog/[slug]. Preserves backlink equity post-cutover.
      {
        source: '/post/precision-cold-cutting-brokk-debricking-within-the-complex-geometry-of-a-large-refractory-vessel',
        destination: '/blog/refractory-vessel-cold-cut-brokk-debricking',
        permanent: true,
      },
      {
        source: '/post/hydrodemolition-a-case-for-hand-lancing',
        destination: '/blog/hydrodemolition-hand-lancing',
        permanent: true,
      },
      {
        source: '/post/turbine-hall-bulk-concrete-cutting-undertaken-by-our-wire-sawing-team',
        destination: '/blog/turbine-hall-wire-sawing',
        permanent: true,
      },
      {
        source: '/post/one-of-our-brokk-500s-embarking-on-an-extended-project-in-london',
        destination: '/blog/brokk-500-london-deployment',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
