# Post-level dedup — morning deep review brief

Keith's PDF (`~/Desktop/Dupes .pdf`, 15 May 08:40) flagged ~14 clusters where
multiple blog posts cover the same physical job. After the gallery hero-only
fix, the gallery is OK — but the underlying post-level duplication is still
there and Keith reports the /blog index still feels repetitive.

## Approach (Keith approved in principle)

1. **One canonical post per job.** Strongest title/content wins.
2. **Carousel on `/blog/[slug]`** for the merged-in imagery, with per-image
   alt text + caption (keeps SEO weight on the secondary keywords).
3. **301 redirects** from merged-out slugs → canonical slug, configured in
   `next.config.js` (or `middleware.ts`).
4. **Body merge** — best paragraphs from each dupe folded into the canonical
   post's portable-text body before deleting the dupe.

## Job clusters identified so far (from PDF screenshots + card titles visible)

| # | Probable job | Canonical candidate | Need to confirm |
|---|---|---|---|
| 1 | Railway Arch Refurbishment | "Railway Arch Refurbishment for a Safer Pedestrian Walkway" | what other posts feed in |
| 2 | Chromium Kiln debrick | "De-bricking a Contaminated Chromium Kiln with Brokk Robotics" | likely "top-down refractory vessel demolition" is same job |
| 3 | Bank of England vault | "Diamond-Cutting a Bank of England Vault in a Grade I Listed Building" | merge with "Breaking into bank vaults legally (LinkedIn)" |
| 4 | NALTA + Mast Climber hydro | TBD — Keith to pick title | merge into one |
| 5 | Refractory vessel cold-cut | "Precision Cold-Cutting & BROKK Debricking within the Complex Geometry of a Large Vessel" | which extras feed in |
| 6 | York Designer Outlet | "York Designer Outlet Walkway Demolition by Diamond Sawing" | confirm what feeds in |
| 7–14 | TBD — need to match remaining PDF clusters | | |

## Execution plan for morning deep review

1. Pull all 43 posts from Sanity → output as a markdown table with title/slug/hero image thumbnail
2. Match each post to a "job" using PDF + manual review
3. Share dedup map with Keith for sign-off BEFORE any destructive action
4. Build `<PostCarousel />` component for `/blog/[slug]` — uses
   `/public/images/blog-extras/<slug>-extra-*.jpg` files (already on disk)
5. Run consolidation script: merge bodies, copy extras under canonical slug,
   delete dupes from Sanity, add redirects to `next.config.js`
6. Re-audit `/gallery` and `/blog` to confirm no regression

## Open items still pending from tonight's session

- **Contact form 502** — Resend rejecting sends after env-var redeploy.
  Need Vercel function logs (`Logs → Function → /api/contact`) and/or
  Resend domain verification status to diagnose.
- **Likely culprit:** SPF/MX records were placed at `send.send.gnatuk.com`
  (Name=`send.send`) by Christine per Keith's instructions, but Resend
  may require them at `send.gnatuk.com` (Name=`send`). Worth checking
  before doing anything else.
