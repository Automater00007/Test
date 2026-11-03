# How Sanity CMS works in this project (beginner guide)

Sanity is a "headless" CMS. That means it stores your content (blog posts, authors,
categories) in the cloud, and your Next.js website fetches that content and renders it.
There is no WordPress-style theme — Sanity only provides the data and an editing
interface called the **Studio**.

---

## 1. The pieces involved

| Piece | Where | What it does |
| --- | --- | --- |
| Sanity project | Cloud (sanity.io) | Your content database. Project ID `tcbet7sh`, dataset `production`. |
| Sanity Studio | `/studio` route in this app | The editor UI where you write posts. |
| GROQ queries | `sanity/lib/queries.ts` | The "language" used to ask Sanity for data. |
| Data layer | `lib/posts.ts` | Fetches from Sanity, falls back to static posts if Sanity is off. |
| Images | `cdn.sanity.io` | Cover images are uploaded to Sanity and served from their CDN. |

---

## 2. Configuration (`.env.local`)

The site reads these environment variables (already set in your `.env.local`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=tcbet7sh
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
SANITY_API_TOKEN=skqOc...          # server-only, for drafts/private data
SANITY_PREVIEW_SECRET=...         # for draft previews
SANITY_REVALIDATE_SECRET=...      # for the publish webhook
```

- `NEXT_PUBLIC_*` variables are visible to the browser and identify which project to read.
- `SANITY_API_TOKEN` is secret (server only) and is needed for drafts and private datasets.
- If `NEXT_PUBLIC_SANITY_PROJECT_ID` is empty, the site uses the three static posts
  in `lib/content.ts` instead. This is why the site still works without Sanity.

---

## 3. Opening the Studio

1. Start the dev server:
   ```
   npm run dev
   ```
2. Open `http://localhost:3000/studio` in your browser.
3. You will see "Loading Studio…" briefly, then the Sanity login screen.
4. Log in with Google, GitHub, or email/password (the account that owns the project).

The Studio is a single-page app loaded only when you visit `/studio`, so it does not
slow down the public site. It is also hidden from search engines (`robots.txt`
disallows `/studio`).

---

## 4. What you can edit in the Studio

The schemas (defined in `sanity/schemaTypes/`) are:

- **Post** — a journal article.
  - Title, slug (URL), excerpt, author, category
  - Main image (cover) with alt text
  - Published date, read time, "featured" flag
  - Body (Portable Text: paragraphs, headings, quotes, lists, and custom blocks:
    tables, CTA buttons, callouts, raw HTML)
  - SEO fields: meta title, meta description, focus keyword, secondary keywords,
    canonical URL, no-index toggle, OG image
  - Article type (Article / TravelGuide)
  - Related posts
- **Author** — name, role, bio, photo
- **Category** — title, slug, description

---

## 5. How a post reaches the website

### Listing page (`/post`)
- `app/post/page.tsx` calls `getAllPosts()` from `lib/posts.ts`.
- That function asks Sanity (via GROQ `allPostsQuery`) for all published posts,
  newest first.
- Each post is mapped to a `JournalPost` with a formatted date and a CDN image URL.
- The homepage teaser (`JournalTeaser`) uses `getLatestPosts(3)`.

### Detail page (`/post/[slug]`)
- `app/post/[slug]/page.tsx` calls `getPostBySlug(slug)`.
- The body is rendered with `PortableText` (`components/blog/PostBody.tsx`), which
  turns Sanity's block content into styled HTML (including custom blocks).
- SEO metadata and JSON-LD are generated from the post's SEO fields.

### Image URLs
- Cover images are uploaded to Sanity and stored on `cdn.sanity.io`.
- `sanity/lib/image.ts` builds optimised URLs (width, height, crop) using
  `@sanity/image-url`.

---

## 6. Writing a new post (step by step)

1. Open `/studio` and log in.
2. Click **Post** in the left sidebar, then **Create new** (or the + button).
3. Fill in:
   - **Title** (e.g. "The sound of the Lidder at six")
   - **Slug** — click "Generate" to make it from the title
   - **Excerpt** — one or two sentences for previews and SEO
   - **Author** — pick "The Jade River team" (or create a new author)
   - **Category** — pick one of the three categories
   - **Main image** — upload a photo and add alt text
   - **Published at** — set the date
   - **Read time** — e.g. "4 min"
   - **Body** — write your article. Use the toolbar for headings, quotes, lists.
     Insert custom blocks (table, CTA button, callout, HTML) from the "+" menu.
   - **SEO** — fill meta title, meta description, focus keyword, etc.
   - **Related posts** — pick 2 other posts.
4. Click **Publish** (top right). The post is now live in Sanity.

---

## 7. How the website updates after publishing

The site caches Sanity data for 60 seconds and tags it with `"post"`. Two ways to
refresh:

### Automatic (webhook) — recommended
Configure a webhook in the Sanity dashboard:
- URL: `https://<your-deployed-domain>/api/revalidate`
- Secret: the value of `SANITY_REVALIDATE_SECRET` from `.env.local`
- Trigger on: create/update/delete of documents of type `post`

When you publish a post, Sanity sends a signed POST to `/api/revalidate`, which
calls `revalidateTag("post")` and `revalidatePath("/post")`. The new post appears
within seconds.

### Manual
Restart the dev server or wait up to 60 seconds for the cache to expire.

### Testing the webhook locally
```
node --env-file=.env.local -e '
const crypto = require("crypto");
const secret = process.env.SANITY_REVALIDATE_SECRET;
const body = JSON.stringify({ _type: "post" });
const t = Date.now();
const sig = crypto.createHmac("sha256", secret).update(`${t}.${body}`).digest("base64url");
fetch("http://localhost:3000/api/revalidate", {
  method: "POST",
  headers: { "content-type": "application/json", "sanity-webhook-signature": `t=${t},v1=${sig}` },
  body
}).then(async r => console.log(r.status, await r.text()));
'
```
An unsigned request returns `401`.

---

## 8. Draft preview (write without publishing)

You can preview a post before publishing:

1. In the Studio, edit a post but do **not** publish (leave it as a draft).
2. Open this URL in your browser:
   ```
   http://localhost:3000/api/draft?slug=<your-slug>&secret=<SANITY_PREVIEW_SECRET>
   ```
3. The site switches to draft mode and shows the unpublished version.
4. To exit draft mode:
   ```
   http://localhost:3000/api/disable-draft
   ```

The `SANITY_PREVIEW_SECRET` is in your `.env.local`.

---

## 9. Seeding the content (first-time setup)

If the dataset is empty, run:
```
npm run seed
```
This uploads the three sample posts (from `lib/content.ts`) into Sanity with
images and SEO fields. It is safe to re-run — it uses fixed document IDs.

---

## 10. Querying Sanity directly (optional)

The Studio includes the **Vision** tool (left sidebar). It lets you run GROQ
queries against your dataset, useful for debugging. Example:

```
*[_type == "post"] | order(publishedAt desc) { title, "slug": slug.current, publishedAt }
```

---

## 11. Fallback behaviour

- If `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing, `sanityConfigured` is `false`
  and the journal uses the three static posts in `lib/content.ts`.
- If a Sanity fetch fails at runtime, the data layer catches the error and falls
  back to static posts (for listings) or returns `null` (for a single post).
- The Studio shows a "needs a project" notice when credentials are missing.

---

## 12. Key files reference

| File | Purpose |
| --- | --- |
| `sanity/env.ts` | Reads env vars, exposes `sanityConfigured` |
| `sanity.config.ts` | Studio configuration (basePath `/studio`) |
| `sanity/schemaTypes/` | Schemas for post, author, category, blocks |
| `sanity/lib/client.ts` | Sanity client factory (published vs draft) |
| `sanity/lib/queries.ts` | GROQ queries |
| `sanity/lib/image.ts` | Image URL builder |
| `lib/posts.ts` | Unified data layer with static fallback |
| `components/blog/PostBody.tsx` | Portable Text renderer |
| `app/studio/[[...tool]]/page.tsx` | Studio route (lazy-loaded) |
| `app/api/draft/route.ts` | Enable draft mode |
| `app/api/disable-draft/route.ts` | Disable draft mode |
| `app/api/revalidate/route.ts` | Webhook handler |
| `scripts/seed-sanity.mjs` | Seed script (`npm run seed`) |

---

## 13. Common tasks

| Task | How |
| --- | --- |
| Add a new post | Studio → Post → Create → fill fields → Publish |
| Edit an existing post | Studio → Post → click the post → edit → Publish |
| Change an image | Open the post → replace the main image → Publish |
| Add a new category | Studio → Category → Create → Publish |
| Add a new author | Studio → Author → Create → Publish |
| Test a draft | Use `/api/draft?slug=...&secret=...` |
| Force a refresh | Call `/api/revalidate` with a valid signature, or wait 60s |
| Reset the dataset | Re-run `npm run seed` (uses fixed IDs, safe to re-run) |

---

## 14. Things to do later (not yet configured)

- Configure the Sanity publish webhook in the dashboard (needs a deployed URL).
- Add any extra production/preview origins to Sanity → API → CORS origins.
- Set up the Studio hostname if you want a custom Studio URL.

If anything is unclear, the official docs are at https://www.sanity.io/docs and the
GROQ reference is at https://www.sanity.io/docs/groq.
PY
echo "written"