# Jade River Resort — TODO

Status legend: `[ ]` pending · `[~]` in progress · `[x]` done · `[!]` blocked

## 1. Project hygiene
- [x] Add `.gitignore` for Next.js, env files, editor files.
- [x] Remove `node_modules`, `.next`, and `next-env.d.ts` from Git tracking.
- [x] Rewrite history to a single clean commit.
- [x] Create `TODO.md` and `CONTEXT.md`.
- [x] Keep both docs updated after every work block.

## 2. Brand palette (new scheme only)
- [x] Replace old palette tokens in `app/globals.css`.
- [x] Map dark sections to Forest Green `#213329`.
- [x] Map CTA / primary buttons to Deep Walnut `#432911`.
- [x] Map small accents, icons, hover states to Muted Copper `#A87850`.
- [x] Use Warm Ivory `#FBF8F3` as the primary background.
- [x] Use Soft Sand `#F5EFE6` for alternate/card backgrounds.
- [x] Use Charcoal `#201B17` for primary text.
- [x] Use Warm Grey `#8B8176` for secondary text.
- [x] Remove every non-brand dark background.
- [x] No gradients anywhere.

## 3. Email placeholder
- [x] Remove `info@xogul.com`, `info@defoy.in`, and `accounts@defoy.in`.
- [x] Replace with one clearly marked placeholder (`hello@jaderiverresort.example`).
- [x] Update `lib/content.ts`, JSON-LD, contact, FAQ, policies, footer, location.
- [ ] Replace placeholder with the real address when provided.

## 4. Homepage cleanup
- [x] Remove the Experiences cursor-following hover preview.
- [x] Remove the "valley" / `StoryParallax` section from the homepage and delete the component.
- [x] Compact the Philosophy section copy and layout.
- [x] Simplify the closing CTA: remove text marquees, spinning badge, and heavy motion.
- [x] Keep the booking CTA obvious and accessible.

## 5. Hero video
- [x] Add a video-capable hero with an instant-loading image poster.
- [x] Defer video loading until the poster is painted.
- [x] Support `hero.mp4` / `hero.webm` in `public/video/`.
- [x] Gracefully keep the poster if no video file exists.
- [ ] Drop the real property video into `public/video/`.

## 6. Performance & motion
- [x] Prioritise the hero image/poster, lazy-load below-the-fold imagery.
- [x] Reduce Lenis duration/easing cost and keep native scroll on mobile.
- [x] Remove expensive hover preview and marquee work.
- [x] Reduce reveal/transition durations.
- [x] Respect `prefers-reduced-motion`.
- [x] Re-check bundle/runtime after Sanity is added. **(Studio is lazy-loaded; public routes unchanged at ~112–174 kB; Lighthouse 100/100/100.)**
- [x] Add scroll-triggered reveal/zoom variants across every homepage section and all inner pages. **(`data-reveal` + `data-reveal="zoom|fade|mask"`, staggered delays, mobile-first.)**
- [x] Keep every arrow static — no arrow hover-slide or scroll animation. **(`→` glyphs, nav arrow, CTA arrow icons.)**
- [x] Keep reveals compositor-only (opacity/transform) and re-scan on client navigation. **(Lighthouse 100/100/100 on `/` and `/post/[slug]` after the pass.)**

## 7. Sanity CMS + blog (SEO priority)
- [x] Confirm Sanity project ID, dataset, and API token. **Connected: project `tcbet7sh`, dataset `production`.**
- [x] Confirm blog URL structure: keep `/post` and `/post/[slug]`.
- [x] Install `sanity`, `next-sanity`, `@sanity/image-url`, `@portabletext/react`, `@portabletext/types`.
- [x] Create schemas: `post`, `author`, `category`, `blockContent`.
- [x] Add custom blocks: table, CTA button, callout, raw HTML.
- [x] Add SEO fields: meta title, meta description, keywords, canonical, no-index, OG image.
- [x] Add Studio route (`/studio`) and `sanity.config.ts`.
- [x] Add typed GROQ queries and image URL builder.
- [x] Add a unified journal data layer with a static fallback when credentials are absent.
- [x] Replace the static journal listing/detail reads with the data layer.
- [x] Render Portable Text (including custom blocks) on `/post/[slug]`.
- [x] Add draft preview (`/api/draft`, `/api/disable-draft`) and revalidation webhook (`/api/revalidate`).
- [x] Add the latest 3 posts to the homepage.
- [x] Add `cdn.sanity.io` to `next.config.ts`.
- [x] Build and verify the static fallback still renders without credentials.
- [x] Add the real credentials to `.env.local` and confirm live fetches.
- [x] Seed the Studio with authors, categories, and the three existing posts.
- [x] Configure CORS origins for `localhost:3000` and the production domains.
- [ ] Configure the Sanity webhook → `/api/revalidate` in the Sanity dashboard (needs a deployed URL).
- [ ] Add the Studio deployment/hostname to Sanity CORS origins when the final domain is known.

## 8. YouTube Guest Stories (deferred)
- [ ] Revisit when the owner is ready. The blog is the current priority.

## 9. Content & assets
- [ ] Replace Unsplash placeholders with real resort photography.
- [ ] Replace placeholder hero video with the real property film.
- [ ] Confirm final room descriptions, policies, and reviews.

## 10. Final QA
- [x] Responsive check at 390 / 768 / 1024 / 1440. **(Checked via headless Chrome at 390, 768, 1024, 1440; journal and post detail render cleanly.)**
- [x] Keyboard and screen-reader pass. **(Lighthouse accessibility 100; aria-labels fixed; contrast raised.)**
- [x] Lighthouse: performance, accessibility, SEO. **(Homepage and /post/[slug] all score 100/100/100.)**
- [x] Verify JSON-LD, sitemap, robots, `llms.txt`. **(Sitemap lists all 3 Sanity posts; robots disallows /studio and /api/.)**
- [x] Run `npm run build` and confirm all routes. **(Passed: 24 routes.)**
- [x] Re-run the build after Sanity/YouTube are added. **(Sanity is in; build passes.)**
