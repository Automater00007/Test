/**
 * Sanity environment.
 *
 * The site is designed to run without Sanity credentials: when
 * NEXT_PUBLIC_SANITY_PROJECT_ID is missing, the blog falls back to the
 * static posts in `lib/content.ts`. This keeps local development and builds
 * working before the CMS is connected.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** Server-only token. Needed for drafts, previews and private datasets. */
export const readToken = process.env.SANITY_API_TOKEN || "";

/**
 * Server-only token used to create review submissions. Falls back to
 * `SANITY_API_TOKEN` because an Editor/Developer token can already write.
 * Never expose either token with `NEXT_PUBLIC_`.
 */
export const writeToken =
  process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN || "";

export const sanityConfigured = projectId.length > 0;
