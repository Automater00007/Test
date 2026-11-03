import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId, sanityConfigured } from "../env";

const builder = sanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** Returns an image URL builder, or null when Sanity is not configured. */
export function urlFor(source: SanityImageSource) {
  return builder ? builder.image(source) : null;
}

export type { SanityImageSource };
