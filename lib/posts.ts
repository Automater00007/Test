import type { PortableTextBlock } from "@portabletext/types";
import { draftMode } from "next/headers";
import { cache } from "react";
import { img, posts as staticPosts } from "@/lib/content";
import { getSanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  allPostsQuery,
  allSlugsQuery,
  draftPostBySlugQuery,
  latestPostsQuery,
  postBySlugQuery,
} from "@/sanity/lib/queries";
import type { SanityImage, SanityPost, SanityPostListItem } from "@/sanity/lib/types";

const FALLBACK_IMAGE = img.aerial;

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Display date, e.g. "12 October 2025". */
  date: string;
  /** ISO timestamp used for metadata and JSON-LD. */
  publishedAt: string;
  category: string;
  /** Normalised read time without the trailing "read", e.g. "4 min". */
  read: string;
  image: string;
  imageAlt: string;
  /** Legacy paragraph array for the static fallback posts. */
  body: string[] | null;
  /** Portable Text body for CMS posts. */
  portableBody: PortableTextBlock[] | null;
  quote?: string;
  author?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    keywords?: string[];
    ogImage?: string;
  };
  related?: {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
  }[];
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function normaliseRead(readTime?: string) {
  if (!readTime) return "4 min";
  return readTime.replace(/\s*read$/i, "").trim() || "4 min";
}

function imageUrl(image?: SanityImage | null, width = 1600) {
  if (!image?.asset) return FALLBACK_IMAGE;
  const builder = urlFor(image);
  if (!builder) return FALLBACK_IMAGE;
  return builder.width(width).height(Math.round((width * 9) / 16)).fit("crop").url();
}

function mapSanityPost(post: SanityPostListItem | SanityPost): JournalPost {
  const full = post as SanityPost;
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: formatDate(post.publishedAt),
    publishedAt: post.publishedAt,
    category: post.category?.title || "Journal",
    read: normaliseRead(post.readTime),
    image: imageUrl(post.mainImage),
    imageAlt: post.mainImage?.alt || post.title,
    body: null,
    portableBody: full.body ?? null,
    author: post.author?.name,
    seo: full.seo
      ? {
          metaTitle: full.seo.metaTitle,
          metaDescription: full.seo.metaDescription,
          canonicalUrl: full.seo.canonicalUrl,
          noIndex: full.seo.noIndex,
          keywords: [
            ...(full.seo.focusKeyword ? [full.seo.focusKeyword] : []),
            ...(full.seo.secondaryKeywords ?? []),
          ],
          ogImage: full.seo.ogImage?.asset
            ? (urlFor(full.seo.ogImage)?.width(1200).height(630).fit("crop").url() ??
              undefined)
            : undefined,
        }
      : undefined,
    related: full.relatedPosts?.map((related) => ({
      slug: related.slug,
      title: related.title,
      excerpt: related.excerpt,
      image: imageUrl(related.mainImage, 800),
    })),
  };
}

function mapStaticPost(post: (typeof staticPosts)[number]): JournalPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    publishedAt: new Date(post.date).toISOString(),
    category: post.category,
    read: post.read,
    image: post.image,
    imageAlt: post.title,
    body: post.body,
    portableBody: null,
    quote: post.quote,
  };
}

const staticJournal = () => staticPosts.map(mapStaticPost);

/** All published posts, newest first. Falls back to static content without CMS credentials. */
export const getAllPosts = cache(async (): Promise<JournalPost[]> => {
  const client = getSanityClient();
  if (!client) return staticJournal();

  try {
    const posts = await client.fetch<SanityPostListItem[]>(
      allPostsQuery,
      {},
      { next: { revalidate: 60, tags: ["post"] } },
    );
    return posts.map(mapSanityPost);
  } catch {
    return staticJournal();
  }
});

/** Latest posts for the homepage teaser. */
export const getLatestPosts = cache(async (limit = 3): Promise<JournalPost[]> => {
  const client = getSanityClient();
  if (!client) return staticJournal().slice(0, limit);

  try {
    const posts = await client.fetch<SanityPostListItem[]>(
      latestPostsQuery,
      { limit },
      { next: { revalidate: 60, tags: ["post"] } },
    );
    return posts.map(mapSanityPost);
  } catch {
    return staticJournal().slice(0, limit);
  }
});

/** A single post, including drafts when Next.js draft mode is enabled. */
export const getPostBySlug = cache(async (slug: string): Promise<JournalPost | null> => {
  const client = getSanityClient();
  if (!client) {
    return staticJournal().find((post) => post.slug === slug) ?? null;
  }

  const { isEnabled } = await draftMode();

  try {
    const post = await client.fetch<SanityPost>(
      isEnabled ? draftPostBySlugQuery : postBySlugQuery,
      { slug },
      isEnabled ? { cache: "no-store" } : { next: { revalidate: 60, tags: ["post"] } },
    );
    return post ? mapSanityPost(post) : null;
  } catch {
    return null;
  }
});

/** Slugs for `generateStaticParams`. */
export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const client = getSanityClient();
  if (!client) return staticPosts.map((post) => post.slug);

  try {
    const slugs = await client.fetch<{ slug: string }[]>(
      allSlugsQuery,
      {},
      { next: { revalidate: 60, tags: ["post"] } },
    );
    return slugs.map((item) => item.slug).filter(Boolean);
  } catch {
    return [];
  }
});
