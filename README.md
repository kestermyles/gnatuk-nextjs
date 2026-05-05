# GNAT UK — gnatuk.com

Next.js 14 (App Router) rebuild of gnatuk.com. Static-first, schema-rich, conversion-focused.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Resend (transactional email)
- Vercel (hosting)

## Local development

```bash
pnpm install
cp .env.example .env.local   # fill in RESEND_API_KEY etc.
pnpm dev                      # http://localhost:3000
```

## Environment variables

| Var | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Get from <https://resend.com/api-keys> |
| `FROM_EMAIL` | yes | e.g. `GNAT UK Website <noreply@gnatuk.com>` — must use a verified Resend domain |
| `CONTACT_EMAIL` | yes | Primary recipient (default `office@gnatuk.com`) |
| `BCC_EMAIL` | optional | Lead-flow visibility (currently `keith@ci-media.co.uk`) |
| `NEXT_PUBLIC_SITE_URL` | optional | Defaults to `https://www.gnatuk.com` |
| `NEXT_PUBLIC_GTM_ID` | optional | Defaults to `GTM-5RHLSCR` |

In Vercel, set these under **Project → Settings → Environment Variables**.

## Build

```bash
pnpm build
pnpm start
```

## Routes

| Path | Notes |
| --- | --- |
| `/` | Home |
| `/robotic-demolition` | Service page |
| `/hydrodemolition` | Service page |
| `/diamond-drilling` | Service page (was `/diamond-drilling-and-sawing` — 301 redirect) |
| `/cold-cutting` | Service page (was `/abrasive-cold-cutting` — 301 redirect) |
| `/machine-hire` | Brokk fleet |
| `/contact` | Form page (was `/contact-us` — 301 redirect) |
| `/privacy-policy` | Privacy policy |
| `/api/contact` | Form submission endpoint (Resend) |

## SEO

- Per-page `<title>` and meta description
- `Organization` JSON-LD (site-wide)
- `Service` + `FAQPage` + `BreadcrumbList` JSON-LD per service page
- `sitemap.xml` and `robots.txt` auto-generated
- Canonical URLs set per page
- 301 redirects from old Wix URLs in `next.config.js`

## Email delivery

- Resend transactional email — verify `gnatuk.com` in the Resend dashboard before going live (DNS records).
- Form sends to `CONTACT_EMAIL`, BCCs `BCC_EMAIL`, sets `Reply-To` to the submitter.
- Honeypot field plus simple in-memory rate limiting (5/hr per IP).

## Deployment to Vercel

1. Create new Vercel project pointing at this repo.
2. Add the env vars above (Production + Preview).
3. Add domains: `gnatuk.com` and `www.gnatuk.com`. Set `www` → apex (or vice versa) as preferred.
4. Update DNS (A/CNAME) at the registrar to Vercel.
5. Once Resend is verified for `gnatuk.com`, test the contact form on the live domain.

## Asset notes

- Logo placeholder: text "GNAT UK" in header/footer. Drop a `logo.svg` into `/public` and swap the `<Link>` in `components/Header.tsx` to use `next/image`.
- Hero/project images: not yet ported from Wix CDN — add to `/public/images/` and reference via `next/image` for full optimization.
- Open Graph images: drop 1200×630 JPGs into `/public/og-images/` and reference per-page via `metadata.openGraph.images`.
