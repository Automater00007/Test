import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset?: { _ref?: string; _type?: string } | null;
  alt?: string;
  caption?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type SanitySeo = {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: SanityImage | null;
};

export type SanityPostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime?: string;
  featured?: boolean;
  mainImage?: SanityImage | null;
  author?: { name: string; role?: string } | null;
  category?: { title: string; slug?: string } | null;
  seo?: Pick<SanitySeo, "metaTitle" | "metaDescription" | "focusKeyword"> | null;
};

export type SanityPost = SanityPostListItem & {
  body?: PortableTextBlock[] | null;
  author?: { name: string; role?: string; image?: SanityImage | null; bio?: string } | null;
  seo?: SanitySeo | null;
  articleType?: string;
  relatedPosts?: SanityPostListItem[] | null;
};

export type SanityReview = {
  _id: string;
  name?: string;
  location?: string;
  rating?: number;
  title?: string;
  body?: string;
  dateLabel?: string;
  submittedAt?: string;
  publishedAt?: string;
};
