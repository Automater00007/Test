/**
 * Seeds the Sanity dataset with the journal content that currently lives in
 * `lib/content.ts`. Safe to re-run: documents use deterministic IDs.
 *
 *   node --env-file=.env.local scripts/seed-sanity.mjs
 */
import { createClient } from "@sanity/client";
import { img, posts } from "../lib/content.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  token,
  useCdn: false,
});

const categoryIds = {
  "Notes from the river": "category-notes-from-the-river",
  "Field guide": "category-field-guide",
  Philosophy: "category-philosophy",
};

const categories = Object.entries(categoryIds).map(([title, id]) => ({
  _id: id,
  _type: "category",
  title,
  slug: { _type: "slug", current: id.replace("category-", "") },
}));

const author = {
  _id: "author-jade-river-team",
  _type: "author",
  name: "The Jade River team",
  role: "Resort notes",
  bio: "Notes written from the property, between cups of tea.",
};

const postImages = {
  "the-sound-of-the-lidder-at-six": img.aerial,
  "a-slow-guide-to-aru-valley": img.green,
  "why-thirteen-rooms-is-the-point": img.cabin,
};

const seo = {
  "the-sound-of-the-lidder-at-six": {
    focusKeyword: "Lidder River Pahalgam",
    secondaryKeywords: ["Pahalgam morning", "riverside resort Kashmir"],
  },
  "a-slow-guide-to-aru-valley": {
    focusKeyword: "Aru Valley guide",
    secondaryKeywords: ["Aru Valley Pahalgam", "things to do in Pahalgam"],
  },
  "why-thirteen-rooms-is-the-point": {
    focusKeyword: "boutique resort Pahalgam",
    secondaryKeywords: ["small luxury hotel Kashmir", "Jade River Resort"],
  },
};

const related = {
  "the-sound-of-the-lidder-at-six": [
    "a-slow-guide-to-aru-valley",
    "why-thirteen-rooms-is-the-point",
  ],
  "a-slow-guide-to-aru-valley": [
    "the-sound-of-the-lidder-at-six",
    "why-thirteen-rooms-is-the-point",
  ],
  "why-thirteen-rooms-is-the-point": [
    "the-sound-of-the-lidder-at-six",
    "a-slow-guide-to-aru-valley",
  ],
};

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: `b-${Math.random().toString(36).slice(2, 10)}`,
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `s-${Math.random().toString(36).slice(2, 10)}`,
        text,
        marks: [],
      },
    ],
  };
}

function portableBody(post) {
  const body = [];
  post.body.forEach((paragraph, index) => {
    body.push(block(paragraph));
    if (index === 1 && post.quote) body.push(block(post.quote, "blockquote"));
  });
  return body;
}

async function uploadImage(url, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: response.headers.get("content-type") || "image/jpeg",
  });
  return asset;
}

async function main() {
  console.log("Seeding categories and author…");
  await Promise.all([
    ...categories.map((doc) => client.createOrReplace(doc)),
    client.createOrReplace(author),
  ]);

  const imageAssets = {};

  for (const [slug, url] of Object.entries(postImages)) {
    console.log(`Uploading image for ${slug}…`);
    imageAssets[slug] = await uploadImage(url, `${slug}.jpg`);
  }

  for (const post of posts) {
    const asset = imageAssets[post.slug];
    const image = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: post.title,
    };

    const doc = {
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      author: {
        _type: "reference",
        _ref: author._id,
      },
      category: {
        _type: "reference",
        _ref: categoryIds[post.category] || categoryIds["Notes from the river"],
      },
      mainImage: image,
      publishedAt: new Date(post.date).toISOString(),
      readTime: post.read,
      featured: post.slug === "the-sound-of-the-lidder-at-six",
      body: portableBody(post),
      seo: {
        metaTitle: post.title,
        metaDescription: post.excerpt,
        focusKeyword: seo[post.slug]?.focusKeyword,
        secondaryKeywords: seo[post.slug]?.secondaryKeywords,
        noIndex: false,
        ogImage: image,
      },
      articleType: post.slug === "a-slow-guide-to-aru-valley" ? "TravelGuide" : "Article",
    };

    await client.createOrReplace(doc);
    console.log(`Seeded post: ${post.slug}`);
  }

  console.log("Linking related posts…");
  for (const post of posts) {
    await client
      .patch(`post-${post.slug}`)
      .set({
        relatedPosts: related[post.slug].map((slug, index) => ({
          _type: "reference",
          _ref: `post-${slug}`,
          _key: `related-${index}`,
        })),
      })
      .commit();
  }

  const counts = await client.fetch(
    `{"posts": count(*[_type=="post"]), "authors": count(*[_type=="author"]), "categories": count(*[_type=="category"])}`,
  );
  console.log("Done:", counts);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
