import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken, sanityConfigured } from "../env";

/**
 * Returns a Sanity client, or null when the project has not been configured.
 * Draft requests use the token and the `previewDrafts` perspective; published
 * requests use the CDN.
 */
export function getSanityClient({ draft = false } = {}): SanityClient | null {
  if (!sanityConfigured) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: draft ? false : !readToken,
    token: draft ? readToken : undefined,
    perspective: draft ? "previewDrafts" : "published",
    stega: draft
      ? { enabled: true, studioUrl: "/studio" }
      : false,
  });
}
