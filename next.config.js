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
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    // Wix /post/[slug] → new /blog/[slug] mapping for all 30 ported posts.
    // Preserves backlink equity post-DNS-cutover.
    const wixToBlog = [
      ['precision-cold-cutting-brokk-debricking-within-the-complex-geometry-of-a-large-refractory-vessel', 'refractory-vessel-cold-cut-brokk-debricking'],
      ['hydrodemolition-a-case-for-hand-lancing', 'hydrodemolition-hand-lancing'],
      ['turbine-hall-bulk-concrete-cutting-undertaken-by-our-wire-sawing-team', 'turbine-hall-wire-sawing'],
      ['one-of-our-brokk-500s-embarking-on-an-extended-project-in-london', 'brokk-500-london-deployment'],
      ['de-bricking-a-contaminated-chromium-kiln-circa-2012', 'chromium-kiln-debricking-elementis'],
      // brokk-60-refractory-kiln-strip merged into chromium-kiln-debricking-elementis (15 May dedup).
      ['as-easy-as-1-2-3-one-of-gnatuk-s-brokk-60-s-punching-well-above', 'chromium-kiln-debricking-elementis'],
      ['tunnel-vision-see-how-pedestrian-safety-concerns-trump-a-constipated-railway-arch', 'railway-arch-pedestrian-walkway-shotcrete'],
      ['troublesome-piles', 'robotic-pile-deconstruction-brokk-60'],
      ['shropshire-flax-mill-deconstruction', 'shropshire-flax-mill-silo-deconstruction'],
      ['a-brace-of-brokk-800-s-bullying-formidable-foundations', 'twin-brokk-800-foundation-demolition'],
      ['top-down-robotic-demolition-peck-cut-clear-repeat-x19-floors', 'top-down-robotic-demolition-leeds-tower'],
      ['one-of-the-biggest-facade-retention-schemes-outside-london', 'large-facade-retention-scheme'],
      ['abrasive-cold-cutting-in-tandem-with-brokk-800-saves-the-day', 'cold-cutting-brokk-800-oil-sludge-tank'],
      ['abrasive-cold-cutting', 'abrasive-cold-cutting-pressure-vessels'],
      // bank-vault-demolition-brokk-husqvarna merged into bank-of-england-vault-grade-1-london (15 May dedup).
      ['breaking-into-a-high-security-reinforced-concrete-bank-vaults-legally', 'bank-of-england-vault-grade-1-london'],
      ['gravity-defying-concrete-removal-on-a-40-degree-slope', 'husqvarna-140-archimedes-screw-trough'],
      ['gnat-uk-sitting-down-on-the-job', 'tunnel-benching-brokk-60-sewer'],
      ['hydrodemolition-diamond-wire-sawing-car-factory-floor-refurbishment', 'hydrodemolition-diamond-wire-car-factory'],
      ['access-all-areas-we-just-love-confined-space-demolition', 'high-reach-confined-space-husqvarna-dxr140'],
      ['a-safer-alternative-to-traditional-concrete-demolition', 'ergo-hydrodemolition-biomass-boiler'],
      ['hydroblasting-rebates-in-a-factory-floor', 'hydroblasting-factory-floor-rebates'],
      ['refractory-kiln-de-construction', 'mast-climber-refractory-kiln-debricking'],
      ['nalta-concrete-hydro-demolition', 'nalta-hydrodemolition-system'],
      ['diesel-do-nicely', 'brokk-800-diesel-foundation-demolition'],
      ['the-art-of-diamond-wire-sawing-raw-sewage-flume-pipes', 'diamond-wire-sawing-glasgow-sewer-flumes'],
      ['hydro-blasting-on-city-bridge-deck', 'hydroblasting-city-bridge-deck'],
      ['hydrodemolition-on-a-north-sea-jetty', 'hydrodemolition-north-sea-jetty'],
      ['railway-tunnel-reconstruction', 'farnworth-tunnel-brokk-330-fillie'],
      ['sensitive-bank-vault-deconstruction-in-a-grade-1-listed-building', 'bank-of-england-vault-grade-1-london'],
      ['york-walkway-diamond-sawing-saves-the-day', 'york-walkway-diamond-sawing-rougier-street'],
    ];
    // Post-merge redirects (15 May 2026 dedup pass).
    // These slugs were deleted from Sanity; their content lives on under the
    // canonical post. Permanent 301 so any LinkedIn / direct-link traffic
    // (and Google's cached index) flows through to the consolidated page.
    const mergedPosts = [
      ['/blog/top-down-refractory-vessel-demolition-linkedin', '/blog/refractory-vessel-cold-cut-brokk-debricking'],
      ['/blog/breaking-into-bank-vaults-legally-linkedin', '/blog/bank-of-england-vault-grade-1-london'],
      ['/blog/bank-vault-demolition-brokk-husqvarna', '/blog/bank-of-england-vault-grade-1-london'],
      ['/blog/brokk-60-refractory-kiln-strip', '/blog/chromium-kiln-debricking-elementis'],
      // Site comments PDF (17 May 2026) — mezzanine and Leeds were the same job.
      ['/blog/mezzanine-floor-deconstruction-warehouse', '/blog/leeds-factory-floor-cutting-track-saws'],
      // Mast-Climber Insight deleted (imagery used elsewhere; subject covered
      // more comprehensively on the process/refractory industry hub).
      ['/blog/mast-climber-refractory-kiln-debricking', '/industries/process-refractory'],
      // Costain Rugby Newbold LinkedIn cross-post deleted (18 May 2026) —
      // shallow announcement copy with no genuine project photography to
      // back it up. AMP8 narrative covered by /industries/water + the
      // "Ready for the AMP8 Infrastructure Wave" Insight.
      ['/blog/costain-rugby-newbold-amp8-moving-to-delivery-linkedin', '/industries/water'],
    ];
    // Old fabricated case-study and insight detail slugs (briefly live before being
    // replaced by the curated views). Redirect to the index pages.
    const retiredFabricated = [
      ['/case-studies/water-treatment-clarifier-refurbishment', '/case-studies'],
      ['/case-studies/hospital-plant-room-strip-out', '/case-studies'],
      ['/case-studies/comah-petrochemical-cold-cut-tie-in', '/case-studies'],
      ['/case-studies/data-centre-slab-penetration', '/case-studies'],
      ['/case-studies/nuclear-ancillary-building-deconstruction', '/case-studies'],
      ['/insights/early-method-definition-saves-money', '/insights'],
      ['/insights/brokk-70-110-170-comparison', '/insights'],
      ['/insights/hydrodemolition-vs-mechanical-breaking', '/insights'],
      ['/insights/amp8-demolition-supply-chain', '/insights'],
      ['/insights/cold-cutting-atex-zones-dsear', '/insights'],
    ];
    // Legacy Wix service-page aliases: single service had multiple entry points
    // (Google Ads landing pages, "-landing" variants, "confined-space" split,
    // AMP8 microsite). All collapse into their canonical service or hub.
    const legacyServiceAliases = [
      ['/brokk-800-hire', '/machine-hire'],
      ['/machine-hire-2', '/machine-hire'],
      ['/machine-hire-landing', '/machine-hire'],
      ['/cold-cutting-landing', '/cold-cutting'],
      ['/diamond-drilling-and-sawing-landing', '/diamond-drilling'],
      ['/diamond-drilling-sawing-and-concrete-cutting', '/diamond-drilling'],
      ['/robotic-demolition-confined-space', '/robotic-demolition'],
      ['/robotic-demolition-confined-spaces', '/robotic-demolition'],
      ['/robotic-demolition-amp8', '/industries/water'],
      ['/hydrodemolition-lp', '/hydrodemolition'],
      ['/top-down-demolition', '/robotic-demolition'],
      ['/projects-1', '/case-studies'],
      // Wix "Duplicate page" leftovers — Wix prefixes duplicated pages with "Copy of".
      ['/copy-of-contact', '/contact'],
      ['/copy-of-privacy-policy', '/privacy-policy'],
    ];
    // Old Wix /services/* structure. Wix's site tree nested each service under
    // /services/; the new site puts them at the root.
    const legacyServicesPaths = [
      ['/services', '/'],
      ['/services/brokk-and-husqvarna-robotic-demolition', '/robotic-demolition'],
      ['/services/robotic-hydrodemolition', '/hydrodemolition'],
      ['/services/cold-cutting-in-volatile-areas', '/cold-cutting'],
      ['/services/diamond-drilling-and-concrete-sawing', '/diamond-drilling'],
      ['/services/plunge-wire-sawing', '/diamond-drilling'],
      ['/services/top-down-demolition', '/robotic-demolition'],
    ];
    // Old Wix /robotic-solutions/* deep paths — a big product tree of robot
    // applications. Individual sub-pages route to whichever canonical page
    // best matches; catch-all fallback (added below the map) sends anything
    // unmatched to /robotic-demolition (safe default — the whole tree was
    // robot-application landing pages).
    const legacyRoboticSolutions = [
      // Cutting / drilling applications → /diamond-drilling
      ['/robotic-solutions/core-drilling', '/diamond-drilling'],
      ['/robotic-solutions/wall-sawing', '/diamond-drilling'],
      ['/robotic-solutions/floor-sawing', '/diamond-drilling'],
      ['/robotic-solutions/track-sawing', '/diamond-drilling'],
      ['/robotic-solutions/wire-sawing', '/diamond-drilling'],
      // Robotic breaking / preparation → /robotic-demolition
      ['/robotic-solutions/concrete-crunching', '/robotic-demolition'],
      ['/robotic-solutions/steel-shears', '/robotic-demolition'],
      ['/robotic-solutions/tunnelling', '/robotic-demolition'],
      ['/robotic-solutions/wall-preparation', '/robotic-demolition'],
      ['/robotic-solutions/floor-preparation', '/robotic-demolition'],
      // Slurry handling → /hydrodemolition
      ['/robotic-solutions/slurry-solutions', '/hydrodemolition'],
      // Marquee project pages → their canonical case-study post
      ['/robotic-solutions/bank-vault-demolition', '/blog/bank-of-england-vault-grade-1-london'],
      ['/robotic-solutions/facade-retention', '/blog/large-facade-retention-scheme'],
      // Sector / commercial pages. Default choices flagged for Keith's review:
      //   nuclear-industry → /robotic-demolition (upgrade to /industries/nuclear if we ever build the hub)
      //   sales-and-parts  → /machine-hire (nearest business surface; switch to 410 if machine sales is truly retired)
      ['/robotic-solutions/nuclear-industry', '/robotic-demolition'],
      ['/robotic-solutions/sales-and-parts', '/machine-hire'],
    ];
    return [
      { source: '/diamond-drilling-and-sawing', destination: '/diamond-drilling', permanent: true },
      { source: '/abrasive-cold-cutting', destination: '/cold-cutting', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      // /news was a brief intermediate route name; consolidated under /blog.
      { source: '/news', destination: '/blog', permanent: true },
      { source: '/news/:slug', destination: '/blog/:slug', permanent: true },
      // Wildcard alias for the old /machine-hire-old/... product tree.
      { source: '/machine-hire-old/:path*', destination: '/machine-hire', permanent: true },
      ...wixToBlog.map(([wix, blog]) => ({
        source: `/post/${wix}`,
        destination: `/blog/${blog}`,
        permanent: true,
      })),
      ...mergedPosts.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...retiredFabricated.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...legacyServiceAliases.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...legacyServicesPaths.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // /robotic-solutions bare + specifics BEFORE the catch-all — Next
      // evaluates in order, first match wins.
      { source: '/robotic-solutions', destination: '/robotic-demolition', permanent: true },
      ...legacyRoboticSolutions.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Catch-all for anything else under /robotic-solutions/*. MUST be last
      // in this block so the specific mappings above win first.
      { source: '/robotic-solutions/:path*', destination: '/robotic-demolition', permanent: true },
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
