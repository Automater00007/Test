import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Journal post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "linking", title: "Linking" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule.required().max(70).warning("Keep under 70 characters for search results."),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Used on cards and as the fallback meta description.",
      validation: (rule) =>
        rule.required().max(160).warning("Keep under 160 characters."),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      group: "content",
      placeholder: "e.g. 5 min",
    }),
    defineField({
      name: "featured",
      title: "Featured post",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          description: "Leave empty to use the post title. Max 60 characters.",
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 3,
          description: "Max 160 characters.",
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: "focusKeyword",
          title: "Focus keyword",
          type: "string",
        }),
        defineField({
          name: "secondaryKeywords",
          title: "Secondary keywords",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.max(5),
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description: "Only for syndicated posts.",
        }),
        defineField({
          name: "noIndex",
          title: "Hide from search engines",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "ogImage",
          title: "Social share image",
          type: "image",
          description: "1200 × 630 recommended.",
        }),
      ],
    }),

    defineField({
      name: "articleType",
      title: "Schema.org article type",
      type: "string",
      group: "linking",
      options: {
        list: [
          { title: "Article", value: "Article" },
          { title: "Travel guide", value: "TravelGuide" },
          { title: "FAQ article", value: "FAQArticle" },
          { title: "How-to guide", value: "HowTo" },
        ],
      },
      initialValue: "Article",
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      type: "array",
      group: "linking",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (rule) => rule.max(3),
      description: "Pick 2–3 posts for internal linking.",
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "No date";
      return {
        title,
        subtitle: `${author ? `by ${author} · ` : ""}${date}`,
        media,
      };
    },
  },
});
