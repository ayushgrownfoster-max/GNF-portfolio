# Grow N Foster — Case Study Portfolio Website

A premium, editorial, highly-animated case-study portfolio for a creative &
digital marketing agency. Next.js/TypeScript/Tailwind frontend, headless
WordPress CMS (not yet connected — see below).

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** for component-level animation (reveals, hovers, page transitions)
- **GSAP + ScrollTrigger** — installed and ready; wire into any component that needs scroll-pinned or timeline-based sequences beyond what Framer's `whileInView` covers (none of the current components strictly require it, but the brief calls for GSAP explicitly, so it's in `package.json` and free to reach for)
- **Lenis** for smooth scroll (`components/SmoothScroll.tsx`)
- **Swiper** — installed, not yet used; a natural fit if the testimonial or gallery sliders need swipe/touch gestures beyond the current Framer Motion crossfade
- **WordPress** as headless CMS/CRM (architecture ready, not yet connected — see "Connecting WordPress" below)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Every page currently renders from the
placeholder data in `lib/wordpress.ts`, so the full experience — homepage,
filterable work grid, case study detail pages, services, about, insights,
contact — is browsable immediately, with no CMS required.

## Project structure

```
app/
  page.tsx                 Homepage
  work/page.tsx             Filterable case study grid
  work/[slug]/page.tsx       Case study detail (dynamic SEO, JSON-LD)
  services/page.tsx
  about/page.tsx
  insights/page.tsx
  insights/[slug]/page.tsx
  contact/page.tsx
  api/contact/route.ts       Contact form handler
  sitemap.ts / robots.ts
  layout.tsx                 Fonts, cursor/scroll/transition providers, header/footer
  globals.css

components/                  All UI building blocks (see below)
lib/
  types.ts                   Content model shared by placeholder + real data
  wordpress.ts                API abstraction layer — the ONLY file that
                              talks to WordPress
```

### Components

| Component | Purpose |
|---|---|
| `Header` / `Footer` | Site chrome; header shrinks + solidifies on scroll |
| `Hero` | Homepage hero with staged reveal |
| `CustomCursor` | Desktop-only cursor with VIEW/CLICK/EXPLORE states via `useCursor()` context hook |
| `SmoothScroll` | Lenis wrapper, respects `prefers-reduced-motion` |
| `PageTransition` | Mask-wipe transition between routes |
| `RevealText` / `RevealImage` | Scroll-triggered line/image reveals used everywhere |
| `Marquee` / `ClientMarquee` | Infinite scrolling strips |
| `AnimatedCounter` | Counts stats up once in view |
| `MagneticButton` | Cursor-attraction CTA button |
| `CaseStudyCard` / `CaseStudyGrid` / `CaseStudyFilter` | Work listing + filtering, asymmetric large/medium/horizontal layout pattern |
| `CaseStudyHero` / `CaseStudyStats` / `CaseStudyGallery` / `CaseStudyTimeline` | Case study detail page building blocks |
| `ServiceList` | Expand-on-hover services list |
| `Testimonial` | Large editorial testimonial slider |
| `InsightCard` | Blog/insights card |
| `ContactForm` | Project enquiry form → `/api/contact` |

## Connecting WordPress

Everything currently reads from placeholder data at the bottom of
`lib/wordpress.ts`, shaped exactly like the real WP/ACF REST response will
be. To go live:

1. **Stand up WordPress** (WP Engine, Kinsta, or self-hosted) as a
   **headless CMS only** — it should never render the frontend.
2. **Register the custom post types and ACF field groups**:
   - `case_study` — see `lib/types.ts` → `CaseStudy` for every field the
     admin UI needs (client, industry, services, stats, challenge/insight/
     strategy/solution/execution/gallery, testimonial, SEO fields, etc.)
   - `insight` — see `Insight` type
   - `testimonial`, `service`, `client` as either their own post types or
     ACF repeater fields on an options page, depending on how often the
     agency team needs to reorder them independently of a case study
   - Enable the REST API for each (`show_in_rest: true`) and expose ACF
     fields via `acf/rest_api` or by adding them to the REST response with
     `register_rest_field()`.
3. **Set the env var**:
   ```
   WORDPRESS_API_URL=https://cms.grownfoster.com/wp-json
   ```
4. **Swap each function body in `lib/wordpress.ts`** from returning
   placeholder arrays to calling the already-stubbed `fetchWP()` helper,
   e.g.:
   ```ts
   export async function getCaseStudies(): Promise<CaseStudy[]> {
     const raw = await fetchWP<WPCaseStudyRaw[]>("/wp/v2/case_study?_embed");
     return raw.map(mapWPCaseStudy); // write this mapper alongside the raw type
   }
   ```
   No component or page needs to change — they only ever import from
   `lib/wordpress.ts`.
5. **Add the WordPress media host** to `next.config.mjs` →
   `images.remotePatterns` so `next/image` can optimize CMS-uploaded images.
6. **Contact form**: point `app/api/contact/route.ts` at a WP REST route,
   CRM, or transactional email provider (a few starting options are
   commented directly in that file).

## Notes on scope

This scaffold prioritizes getting the full route map, component
architecture, and data-layer contract right, over polishing every page to
the same visual depth as the homepage/hero. The animation system (reveal,
cursor, marquee, counter, magnetic button, page transition) is real and
reused everywhere rather than mocked, so extending visual polish on any
given page is a matter of composing existing pieces + adding page-specific
detail, not building new animation infrastructure.

Fonts are currently Space Grotesk (display) + Inter (body) via
`next/font/google` as a functional stand-in — swap for a licensed pairing
(e.g. PP Neue Montreal / Suisse Int'l) for full brand distinctiveness.

The accent color (`--accent` in `app/globals.css`) is a single CSS variable
by design, per the brief's requirement that it be easy to reconfigure later.
