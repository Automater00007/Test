# Jade River Resort — Working Context

_Last updated: 3 November 2026 (final QA pass)_

## Project
Marketing website for **Jade River Resort**, Pahalgam, Jammu & Kashmir — a 13-room boutique resort on the Lidder River, part of Defoy Hotels & Resorts.

Primary goal: an exceptional, fast, smooth site with a Sanity-powered blog that can rank for Pahalgam / Kashmir travel searches. Direct bookings only — no OTAs.

## Stack
- Next.js 15 App Router + TypeScript
- Tailwind CSS v4
- Framer Motion 12
- Lenis smooth scroll (desktop pointer-fine only)
- Fonts: Fraunces (display), Manrope (body), DM Mono (labels)
- Sanity CMS + Portable Text (implemented; awaiting credentials/content)
- YouTube Data API v3 playlist feed (deferred)

## Brand palette (source of truth)
| Token | Hex | Use |
| --- | --- | --- |
| Warm Ivory | `#FBF8F3` | Primary background, main sections |
| Soft Sand | `#F5EFE6` | Alternate sections, cards, gallery backgrounds |
| Forest Green | `#213329` | Testimonials, dark sections, brand identity |
| Deep Walnut | `#432911` | CTA sections, primary buttons, wood accents |
| Walnut Brown | `#603020` | Secondary accents, borders, decorative elements |
| Muted Copper | `#A87850` | Small highlights, icons, hover accents |
| Charcoal | `#201B17` | Headings, primary text |
| Warm Grey | `#8B8176` | Descriptions, secondary text |

Rules: **no gradients**; every dark surface must be Forest Green (a deeper forest shade is allowed for image placeholders); Deep Walnut for CTA surfaces and primary buttons; Muted Copper for small accents.

## Resort facts (do not invent alternatives)
- 13 rooms: 9 Premium Balcony Rooms, 2 Executive Suites, 2 Executive Duplex Family Rooms.
- Rates: ₹6,000 / ₹8,000 / ₹13,000 per night.
- Direct bookings only; no MakeMyTrip, Booking.com, or other OTAs.
- Phone / WhatsApp: +91 7780868926.
- Coordinates: 33.883354, 75.269764.
- Elevation: 2,130 m.
- Address: Pahalgam, Jammu & Kashmir — 192125.
- Srinagar Airport: ~96 km, 2.5–3 hours by road.
- Check-in 2:00 PM; check-out 12:00 noon; 50% advance confirms a booking.
- Cancellation: 15+ days full refund; 15–10 days 50% retention; within 10 days 100% retention.

## Email
All previous addresses were removed. The site currently uses **`hello@jaderiverresort.example`** as a clearly marked placeholder (reserved `.example` TLD, non-functional). Replace in `lib/content.ts` when the real address is available; `site.email` feeds the footer, contact, location, FAQ, and policies.

## Current decisions
- **Blog route confirmed:** keep `/post` and `/post/[slug]`. The guide's `/blog/[slug]` structure will not be used.
- **Sanity is connected.** Project `tcbet7sh`, dataset `production`; credentials in `.env.local` (never committed). The journal reads from Sanity with a static fallback when unconfigured. Three posts, one author, and three categories are seeded; `npm run seed` re-runs the seed. CORS origins include `localhost:3000` and both production domains. The only remaining ops step is configuring the publish webhook in the Sanity dashboard once a deployed URL exists.
- **Studio lives at `/studio`.** It is lazy-loaded and hidden from search engines; the marketing chrome is suppressed on that route.
- **Draft preview** is at `/api/draft?slug=…` (optional `&secret=`), and the publish webhook is `/api/revalidate` with `SANITY_REVALIDATE_SECRET`.
- **YouTube:** deferred for now; the blog is the priority. The fetch/lightbox code is not being added yet.
- **Hero video:** use the instant poster until the real property film is supplied. The video layer is already wired and will activate automatically when files appear.
- The custom cursor was removed; use the normal system cursor. `components/Cursor.tsx` and all `data-cursor` attributes were deleted.
- The cinematic intro still shows once per session and can be skipped. Its full run is now ~1.75s (was ~2.25s).
- Hero now uses a video layer over an instantly rendered poster image. If `public/video/hero.mp4` is missing, the poster remains — no broken UI.
- Hero CTA card and corner labels render immediately (no opacity-gated Framer animation), so they cannot get stuck invisible.
- Philosophy is intentionally short; do not re-expand it into a long essay.
- Experiences hover preview and `StoryParallax` ("The valley") were removed permanently. The left-hand scroll-progress indicator (RiverProgress) was removed. All dark sections use Forest Green; CTA sections use ivory/soft sand (no walnut backgrounds). Footer is Forest Green. Reviews/testimonials section is Forest Green with ivory cards. Body copy stays charcoal for accessibility; large editorial copy (Philosophy) uses Warm Grey.
- Closing CTA is static and calm: no marquee, no spinning badge, no magnetic drift.
- The pinned Rooms rail runway was shortened from 340vh to 260vh so it feels faster.

## Palette implementation notes
- `--color-paper` = Warm Ivory; `--color-paper-2` = Soft Sand.
- `--color-ink` / `--color-charcoal` = Charcoal (text).
- `--color-forest` = Forest Green (all dark surfaces); `--color-forest-deep` = deep forest for image placeholders.
- `--color-walnut` = Deep Walnut (CTA sections, solid primary buttons); `--color-walnut-brown` = Walnut Brown (button/icon hover fills).
- `--color-copper` / `--color-clay` = Muted Copper (small highlights, dots, rules, accent words).
- `--color-line` = Walnut Brown at 18%; `--color-line-light` = Warm Ivory at 18%.
- `--color-warm-grey` = Warm Grey (available for secondary copy).
- No gradients. No `bg-black`/`bg-white`/non-brand dark surfaces remain.

## Completed in this pass (3 Nov 2026)
- Replaced the entire palette in `app/globals.css` and migrated every component off the old tokens.
- Removed all old email addresses; placeholder wired through `site.email` and JSON-LD.
- Removed `StoryParallax`, the Experiences hover preview, the closing marquees, and the spinning CTA badge.
- Compacted Philosophy copy and spacing.
- Added hero video support with an instant poster fallback and `public/video/README.md`.
- Shortened intro, reveals, and Lenis timing; removed the expensive grain blend mode.
- Added `cdn.sanity.io`, `img.youtube.com`, and `i.ytimg.com` to `next.config.ts`.
- Verified desktop 1440 and mobile 390 renders; `npm run build` passes (21 pages).
- Wired Sanity end to end: schemas, Studio, typed GROQ, Portable Text, draft preview, webhook, homepage teaser, sitemap.
- The public journal now reads through `lib/posts.ts`, which falls back to static posts when Sanity is not configured.
- Re-verified `/post`, `/post/[slug]` and the `/studio` setup state; build passes with 24 routes.

## File map
- `app/globals.css` — palette tokens, reveal system, intro, lightbox, Lenis, reduced motion.
- `app/layout.tsx` — fonts, metadata, JSON-LD, intro script, skip link; renders `SiteChrome`.
- `components/SiteChrome.tsx` — hides nav/footer/motion on `/studio`.
- `app/page.tsx` — homepage order: Hero, Philosophy, RoomsRail, Experiences, GalleryMarquee, FilmSection, LocationSection, GuestNotes, JournalTeaser, ClosingCTA.
- `lib/content.ts` — resort facts, rooms, experiences, gallery, static fallback posts, reviews, FAQs, policies.
- `lib/posts.ts` — unified journal data layer (Sanity + static fallback, draft aware).
- `components/blog/PostBody.tsx` — Portable Text renderer and custom blocks.
- `components/home/JournalTeaser.tsx` — server component; latest 3 posts.
- `app/post/page.tsx` — journal listing (async, ISR 60s).
- `app/post/[slug]/page.tsx` — post detail, SEO metadata, JSON-LD, related/next post.
- `app/studio/[[...tool]]/` — lazy-loaded Sanity Studio with an unconfigured-state notice.
- `app/api/draft/route.ts` — enables Next.js draft mode.
- `app/api/disable-draft/route.ts` — disables draft mode.
- `app/api/revalidate/route.ts` — Sanity webhook → `revalidateTag("post")`.
- `sanity.config.ts` — Studio config (`basePath: /studio`).
- `sanity/schemaTypes/` — post, author, category, blockContent, custom blocks.
- `sanity/lib/` — client factory, GROQ queries, image builder, types.
- `sanity/env.ts` — env access and `sanityConfigured` flag.
- `scripts/seed-sanity.mjs` — seeds the author, categories, images, and posts (`npm run seed`).
- `components/home/Hero.tsx` — pinned hero video/poster, headline mask, booking card.
- `components/home/Philosophy.tsx` — compact word-reveal statement.
- `components/home/ClosingCTA.tsx` — simplified Deep Walnut CTA.
- `components/BookingForm.tsx` — WhatsApp direct-booking form.
- `components/providers/SmoothScroll.tsx` — Lenis setup.
- `components/providers/RevealObserver.tsx` — IntersectionObserver reveals.
- `public/video/` — drop `hero.mp4` / `hero.webm` here (see README).

## Sanity setup (connected)
Project `tcbet7sh`, dataset `production`. Credentials live in `.env.local` (never committed) and the schema is seeded with one author, three categories, and the three existing journal posts. `npm run seed` re-runs the seed script.

Remaining ops tasks:
1. Configure a Sanity webhook → `https://<domain>/api/revalidate` with `SANITY_REVALIDATE_SECRET` (needs the deployed URL).
2. Add any additional production/preview origins to Sanity → API → CORS origins (already added: `localhost:3000`, `defoyhotelsandresorts.com`, `www.defoyhotelsandresorts.com`).

Env vars (`.env.local`, never commit — see `.env.example`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
SANITY_API_TOKEN=
SANITY_PREVIEW_SECRET=
SANITY_REVALIDATE_SECRET=
```

Preview flow: `/api/draft?slug=<slug>&secret=<SANITY_PREVIEW_SECRET>` → draft mode → `/post/<slug>`; `/api/disable-draft` exits.

## YouTube requirements (deferred)
Skipped for now at the owner's request. When revisited:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=
NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=
```
Playlist must be public. Feed revalidates hourly. The YouTube key is read-only and should be restricted to the YouTube Data API v3.

## Hero video requirement
Drop the real film at `public/video/hero.mp4` and/or `public/video/hero.webm`. Until then the poster photograph is used; no layout changes are needed.

## Verification
- `npm run build` must pass before any handoff.
- Check 390 / 768 / 1024 / 1440 widths.
- Keep `prefers-reduced-motion` paths working.
- Do not add gradients.

## Known gaps
- No real resort photography or hero video yet; Unsplash placeholders remain.
- Sanity credentials have not been added, so the journal still uses the static fallback and `/studio` shows setup instructions.
- Reviews shown are sample copy, not verified guest submissions.
