export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://defoyhotelsandresorts.com${item.path}`,
    })),
  };
}

/**
 * Aggregate rating + visible reviews for the resort. Google requires the
 * reviews used in structured data to also be visible on the page, which they
 * are on `/reviews`.
 */
export function reviewListSchema({
  rating,
  count,
  reviews,
}: {
  rating: number;
  count: number;
  reviews: { name: string; rating: number; body: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Jade River Resort",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.body,
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
