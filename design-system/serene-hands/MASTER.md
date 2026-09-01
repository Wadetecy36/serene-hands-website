# Serene Hands — Design System (MASTER)

Generated with the UI/UX Pro Max skill (nextlevelbuilder/ui-ux-pro-max-skill),
direction **B — Warm pastel (pink/green)**, adapted for this brief rather
than applied verbatim.

## Why this direction, and why it's not the raw catalog match

The skill's raw `--design-system` search for this brief returns either an
"Accessible & Ethical" clinical blue/green pattern (institutional, cold for
a children's brand) or a "Childcare/Daycare" bubblegum-pink pattern aimed at
toddler apps. Neither fits: Serene Hands serves parents making a serious
care decision for a child with additional needs — it needs to read as warm
**and** credible, not clinical and not like a preschool app.

What was pulled from the catalog and kept:
- **Style family:** Soft UI Evolution (health/wellness-appropriate pastels,
  measured contrast, 8–12px+ radius) — not Claymorphism/Neumorphism, which
  the catalog also offers for "pastel" but which skew toy-like (thick
  borders, bounce animations, marked "children's apps" in its own data).
- **Palette seed:** the pink + trust-accent combination from the
  Parenting/Childcare palette rows, deepened until every pairing clears
  WCAG AA (the raw catalog rows do not ship contrast-checked).

What was deliberately kept from the site's prior identity rather than
replaced:
- **Typography** (Fraunces + Plus Jakarta Sans) — the catalog's "warm
  rounded" pairings (Varela Round, Fredoka) are explicitly children's-app
  fonts; the existing serif/sans pairing already reads distinctive and
  warm without tipping young. Recoloring only.
- **Radius/shadow scale** — already in the "soft, not chunky" range the
  matched style calls for.

## Color tokens

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#2E2530` | Primary text (warm near-black, not cool black) |
| `--color-ink-soft` | `#6B5D66` | Secondary text |
| `--color-rose` | `#A83358` | Primary structural color — buttons, dark section backgrounds |
| `--color-rose-deep` | `#6B2140` | Darkest rose — footer, button hover |
| `--color-blossom` | `#C2385F` | Accent — focus rings, active nav, links, error text, eyebrows |
| `--color-blossom-soft` | `#F0AFC2` | Light pink for text-on-dark contexts |
| `--color-sage` | `#3D6A50` | Secondary accent — success/trust icons, WhatsApp CTA |
| `--color-sage-deep` | `#2C4F3B` | Sage hover state |
| `--color-sage-soft` | `#B9D9C6` | Light mint tint |
| `--color-gold` | `#D9A54C` | Rare decorative accent (hero ring motif only — not used as text) |
| `--color-cream` | `#FCF4F1` | Page background |
| `--color-blush` | `#F8E8E6` | Section background (alternating sections) |
| `--color-blush-deep` | `#EFD6D2` | Borders, dividers |
| `--color-cloud` | `#FFFFFF` | Cards, surfaces |

All text/background and text/button pairings above were checked against
WCAG AA (4.5:1 for text, 3:1 for large text/icons) — see the "Anti-patterns
avoided" section below for the specific failures this caught.

## Typography

- Display/headings: **Fraunces** (variable, opsz 9–144, weights 400–700)
- Body/UI: **Plus Jakarta Sans** (weights 400–800)
- Base size 16px, headings tighten tracking slightly (`-0.01em`)

## Spacing & Radius

Unchanged from the prior system — already in the "soft, not chunky" range:
- `--radius-xl: 1.25rem` / `--radius-2xl: 1.75rem` / `--radius-3xl: 2.5rem`
- Section rhythm: `py-20` mobile → `py-28` desktop

## Anti-patterns avoided

- **Claymorphism/thick-border pastel** — rejected even though it's the
  catalog's other "pastel" match; its own data tags it for children's/toy
  apps, wrong register for a care-decision audience.
- **Emoji as icons** — none used; Lucide SVG icons throughout.
- **Contrast shortcuts** — the raw catalog pink (`#F472B6`/`#EC4899`)
  fails AA as text-on-cream and as white-on-button-background; both were
  deepened until they cleared 4.5:1.
- **Motion** — unchanged from prior pass: short, transform/opacity-based,
  respects `prefers-reduced-motion` globally.

## Retrieval

When building or editing a page in this project:
1. Read this file first.
2. Check `design-system/serene-hands/pages/<page-name>.md` for a
   page-specific override — none exist yet; all pages use Master as-is.
3. Use the Tailwind v4 `@theme` tokens in `src/index.css` directly
   (`bg-rose`, `text-blossom`, `bg-sage/10`, etc.) — never hardcode a hex
   in a component.
