# Serene Hands UI/UX Pro Max Design System

## Product
Warm, human home-care website for children, young people, and adults. The current detailed service catalogue is child/family focused; adult care is announced as coming soon without a booking form.

## Design direction
**Style:** Warm editorial care / human-first service design.
**Mood:** Loving, calm, optimistic, premium, intimate, trustworthy.
**Density:** Airy with intentional editorial rhythm.
**Surfaces:** Warm paper-like backgrounds, soft white surfaces, occasional deep plum panels.
**Borders:** Thin, low-contrast borders.
**Radius:** 16px controls/cards, 24px content cards, 32px hero/feature surfaces, pill only for compact controls.
**Shadows:** Soft, low-opacity elevation only where it improves hierarchy.
**Imagery:** Human, candid, natural-light family/caregiver imagery. Avoid clinical stock photography.
**Iconography:** Lucide SVG icons, never emoji as UI icons.

## Palette
- Canvas: `#FBF6F0`
- Surface: `#FFFDFC`
- Surface warm: `#F4E8DF`
- Primary plum: `#6F2947`
- Primary deep: `#4A1F34`
- Rose accent: `#C75A78`
- Sage: `#56745D`
- Sage soft: `#DDE9DE`
- Butter/gold: `#D9B66D`
- Ink: `#2B2530`
- Ink soft: `#6F6670`
- Border: `#E8DCD4`
- White: `#FFFFFF`

### Semantic use
- Primary CTA: primary plum with white text.
- Secondary CTA: white/warm surface with plum border.
- Accent: rose for editorial highlights and links.
- Success: sage. Warning: gold. Error: deep rose.
- Never communicate state by color alone.

## Typography
- Display: Fraunces, 500-600.
- Body/UI: Plus Jakarta Sans, 400-700.
- Hero H1: clamp(3rem, 7vw, 6.6rem), tight leading, balanced wrapping.
- H2: clamp(2.1rem, 4vw, 4rem).
- Body: 16-18px with 1.6 line-height.
- Eyebrow: 11-12px, uppercase, 0.18em tracking.

## Layout
- Max content width: 1180px.
- Desktop gutters: 32px.
- Mobile gutters: 20px.
- Section rhythm: 88-144px desktop, 64-96px mobile.
- Prefer asymmetrical editorial grids over repetitive 3-column card walls.

## Components
- Buttons: 14px radius, medium weight, clear focus ring.
- Cards: use cards only when grouping meaningfully; avoid card-everything layouts.
- Navigation: transparent over hero, becomes warm solid on scroll.
- CTA: one dominant action per section.
- Forms: labels always visible; clear validation and feedback.

## Motion
- Use opacity + transform.
- 180-500ms for interaction/entrance.
- Gentle section reveals, image drift, button micro-feedback.
- No motion required for comprehension.
- Respect `prefers-reduced-motion`.

## Responsive
Explicitly design for 320, 375, 390, 430, 768, 1024, 1280, 1440+.
Hero becomes stacked. Navigation becomes drawer. Decorative elements reduce or disappear. Cards may become horizontal/stacked compositions instead of tiny grids.

## Anti-patterns
No clinical hospital aesthetic, no medical dashboard styling, no neon, no purple AI gradients, no excessive glassmorphism, no giant rounded-card grid, no fake testimonials, no fake statistics, no emoji UI icons, no excessive floating elements, no animation overload.

## Conversion path
Attention → Emotional connection → Understanding → Trust → Services → Request Care.
Adult care is a future expansion and should be visible as a warm “coming soon” message, never as a fake service catalogue or booking form.
