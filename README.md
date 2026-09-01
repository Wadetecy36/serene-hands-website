# Serene Hands — Website

Website for **Serene Hands Home Care Services**, a home-care provider for
children with special needs (Autism, Cerebral Palsy, ADHD, communication
disorders, learning differences, and more).

Built with **React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion +
React Router**.

## Getting started

```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`.

### Booking flow (`/book`) — needs one more env step

`/book` is the guardian ID-verification + child-details booking flow.
It calls a Supabase Edge Function (see the separate
`serene-hands-ekyc-supabase` project) for identity verification. Copy
`.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` /
`VITE_SUPABASE_ANON_KEY` once that project exists — until then, `/book`
still works end-to-end (guardian can still upload ID + take a selfie
and submit a booking), it just shows "verification is being finalized"
instead of an automatic result, and everything routes to manual review.

## Build & preview production

```bash
npm run build     # outputs to /dist
npm run preview   # serve the production build locally
```

## Deploying (Vercel)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** this repo.
3. Framework preset: **Vite** (should auto-detect).
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

`vercel.json` is already included with a rewrite rule so client-side routes
(`/services`, `/about`, etc.) don't 404 on a hard refresh or direct link —
no extra config needed.

## Project structure

```
src/
  data/siteConfig.ts     # all business content — services, FAQs, contact
                          # info, nav — in one place
  components/             # shared components (Navbar, Footer, forms,
                          # cards, the ring-motif graphic, etc.)
  pages/                  # one file per route
  lib/useSeo.ts           # per-page title/meta/canonical/JSON-LD
  lib/structuredData.ts   # JSON-LD builders (LocalBusiness, WebSite,
                          # Service, FAQPage)
```

## Before this goes live — open items

These are intentionally left as placeholders rather than guessed at:

- **Forms submit via Formspree + WhatsApp, but Formspree needs a real form
  ID.** `src/components/ContactForm.tsx` (Request Care) and
  `src/pages/CareersApply.tsx` (caregiver applications, including CV
  upload) both POST to Formspree and fall back to a pre-filled WhatsApp
  message if that fails. Sign up free at formspree.io, create a form, and
  paste the ID into `contactFormspreeId` / `careersFormspreeId` /
  `bookingFormspreeId` in `src/data/siteConfig.ts` — until then, email
  delivery will silently fail and every submission relies on the
  WhatsApp fallback, which works with no setup. (`/book`, the guardian
  ID-verification booking flow, uses `bookingFormspreeId`.)
- **Domain placeholder.** `PLACEHOLDER-DOMAIN.com` appears in
  `public/robots.txt`, `public/sitemap.xml`, `src/lib/structuredData.ts`,
  and `src/lib/useSeo.ts` (canonical URLs). Find/replace with the real
  domain once it's live — most easily once you're on Vercel with a custom
  domain attached.
- **TikTok handle unconfirmed.** The client's own Instagram/TikTok
  materials show two different handles (`serenehands010` and
  `@serenehandshomecare`); the site currently uses `@serenehandscare`
  (`tiktokHandle` in `src/data/siteConfig.ts`). Confirm the live one.
- **Resource articles** (`/resources`) are stub pages (title + excerpt
  only). Full content was intentionally left unwritten pending review,
  since these will touch health-adjacent topics.
- **Contact/social info** in `src/data/siteConfig.ts` was pulled from the
  flyer — worth a final check before launch.

## Content source

Service categories, support areas, contact details, and social handles
were sourced from the Serene Hands marketing flyer. Everything else
(page copy, structure, FAQs) was drafted to match that content and should
be reviewed before publishing.

## Social feed integration

See `SOCIAL_INTEGRATION.md` for the Instagram and TikTok API feed setup.
