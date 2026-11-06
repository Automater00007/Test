import { reviews as siteReviews } from "@/lib/content";

/**
 * A single review, normalised so the same card markup can render both Google
 * reviews and the hand-written notes kept in `lib/content.ts`.
 */
export type Review = {
  name: string;
  from: string;
  rating: number;
  title?: string;
  body: string;
  date: string;
  source: "google" | "site";
  url?: string;
  photo?: string;
};

export type ReviewFeed = {
  reviews: Review[];
  /** Google's average rating, when available. */
  rating: number | null;
  /** Total number of Google reviews, not just the ones returned here. */
  total: number | null;
  /** Link to the place on Google Maps, used for attribution. */
  mapsUrl: string | null;
};

/**
 * Google's review data changes slowly, so once a day is plenty. Keeping the
 * window long also keeps us far inside the free Places API quota.
 */
const REVALIDATE_SECONDS = 60 * 60 * 24;

const EMPTY: ReviewFeed = {
  reviews: [],
  rating: null,
  total: null,
  mapsUrl: null,
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  googleMapsUri?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type PlacesResponse = {
  reviews?: PlacesReview[];
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
};

function clampRating(value: number | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.min(5, Math.max(0, Math.round(value)));
}

/**
 * Reads the public reviews for the resort from the Google Places API (New).
 * Returns an empty feed when the env vars are missing or the request fails, so
 * the site can fall back to its curated notes instead of breaking.
 */
export async function getGoogleReviews(): Promise<ReviewFeed> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return EMPTY;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "reviews,rating,userRatingCount,googleMapsUri",
        },
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ["google-reviews"],
        },
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.warn(
        `[google-reviews] Places API returned ${res.status}. ${detail.slice(0, 300)}`,
      );
      return EMPTY;
    }

    const data = (await res.json()) as PlacesResponse;
    const reviews: Review[] = [];

    for (const item of data.reviews ?? []) {
      const body = (item.text?.text ?? item.originalText?.text ?? "").trim();
      if (!body) continue;

      reviews.push({
        name: item.authorAttribution?.displayName?.trim() || "Google reviewer",
        from: "Google",
        rating: clampRating(item.rating),
        body,
        date: item.relativePublishTimeDescription ?? "",
        source: "google",
        url: item.googleMapsUri ?? item.authorAttribution?.uri,
        photo: item.authorAttribution?.photoUri,
      });
    }

    return {
      reviews,
      rating: typeof data.rating === "number" ? data.rating : null,
      total:
        typeof data.userRatingCount === "number"
          ? data.userRatingCount
          : null,
      mapsUrl: data.googleMapsUri ?? null,
    };
  } catch (error) {
    console.warn("[google-reviews] Could not reach the Places API.", error);
    return EMPTY;
  }
}

/**
 * The list the site should render: live Google reviews when we have them,
 * otherwise the curated notes shipped with the code.
 */
export async function getDisplayReviews(): Promise<ReviewFeed> {
  const google = await getGoogleReviews();
  if (google.reviews.length > 0) return google;

  return {
    reviews: siteReviews.map((review) => ({
      ...review,
      source: "site" as const,
    })),
    rating: null,
    total: null,
    mapsUrl: null,
  };
}
