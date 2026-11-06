import { createClient, type SanityClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  projectId,
  readToken,
  sanityConfigured,
  writeToken,
} from "../env";

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

/**
 * Write-capable client for server-only mutations, such as a guest submitting a
 * review. Returns null when the project or a write token is missing so callers
 * can fail cleanly instead of silently dropping the submission.
 */
export function getSanityWriteClient(): SanityClient | null {
  if (!sanityConfigured || !writeToken) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
    perspective: "published",
  });
}
