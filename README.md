# Serene Hands — Website

React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion.

## Run locally

```
npm install
npm run dev
```

## Build for production

```
npm run build
npm run preview   # to check the production build locally
```

## Before launch — things left as placeholders

- **Forms don't submit anywhere yet.** `src/components/ContactForm.tsx` and
  `src/pages/CareersApply.tsx` validate input but need a real backend
  (Netlify Forms, Formspree, or a custom endpoint).
- **CV upload** on the careers application isn't wired up — needs a file
  upload handler once a backend is chosen.
- **Domain**: `PLACEHOLDER-DOMAIN.com` appears in `index.html` isn't there,
  but in `public/robots.txt`, `public/sitemap.xml`, and
  `src/lib/structuredData.ts` / `src/lib/useSeo.ts` (canonical URLs) —
  find/replace once the real domain is live.
- **Service area** (`serviceAreaLabel` in `src/data/siteConfig.ts`) is a
  generic placeholder — confirm exact coverage area.
- **Resource articles** (`/resources`) are stub pages with title/excerpt
  only — full content intentionally left unwritten pending review, since
  they'll touch health-adjacent topics.
- **Social/contact info** in `src/data/siteConfig.ts` is pulled from the
  flyer — double check before launch.

## Structure

- `src/data/siteConfig.ts` — all business content (services, FAQs, contact
  info, nav) in one place
- `src/components/` — shared components (Navbar, Footer, forms, etc.)
- `src/pages/` — one file per route
- `src/lib/useSeo.ts` — per-page title/meta/canonical/JSON-LD
- `src/lib/structuredData.ts` — JSON-LD builders (Organization, Service, FAQ)
