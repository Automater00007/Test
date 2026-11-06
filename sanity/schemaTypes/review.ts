import { defineField, defineType } from "sanity";

/**
 * Guest reviews arrive through the public form (`/review`) or the form on
 * `/reviews` and are created with `status: "pending"`. Only documents whose
 * status is `approved` are queried by the website.
 */
export const review = defineType({
  name: "review",
  title: "Guest review",
  type: "document",
  groups: [
    { name: "review", title: "Review", default: true },
    { name: "guest", title: "Guest" },
    { name: "moderation", title: "Moderation" },
  ],
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "moderation",
      initialValue: "pending",
      options: {
        layout: "radio",
        list: [
          { title: "Pending — not on the website", value: "pending" },
          { title: "Approved — visible on the website", value: "approved" },
          { title: "Rejected — hidden", value: "rejected" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      group: "review",
      initialValue: 5,
      options: {
        layout: "radio",
        list: [
          { title: "5 stars", value: 5 },
          { title: "4 stars", value: 4 },
          { title: "3 stars", value: 3 },
          { title: "2 stars", value: 2 },
          { title: "1 star", value: 1 },
        ],
      },
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "review",
      description: "Optional short headline, e.g. “We stayed an extra night”.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "body",
      title: "Review",
      type: "text",
      rows: 6,
      group: "review",
      validation: (rule) => rule.required().min(10).max(1500),
    }),
    defineField({
      name: "name",
      title: "Guest name",
      type: "string",
      group: "guest",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "location",
      title: "Where they came from",
      type: "string",
      group: "guest",
      description: "City or country shown under the review. Optional.",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "contact",
      title: "Email or phone (private)",
      type: "string",
      group: "guest",
      description:
        "Never shown on the website. Useful if the team needs to verify a stay.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      group: "moderation",
      readOnly: true,
      initialValue: "website",
      options: {
        list: [
          { title: "Website form", value: "website" },
          { title: "QR code", value: "qr" },
        ],
      },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      group: "moderation",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "publishedAt",
      title: "Approved at",
      type: "datetime",
      group: "moderation",
      description:
        "Set automatically when the review is approved. Used to order reviews on the website.",
      readOnly: true,
    }),
    defineField({
      name: "dateLabel",
      title: "Date label override",
      type: "string",
      group: "moderation",
      description:
        "Optional. Shown on the website instead of the month derived from the submitted date.",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "featured",
      title: "Feature this review",
      type: "boolean",
      group: "moderation",
      initialValue: false,
      description: "Reserved for future use on the homepage.",
    }),
    defineField({
      name: "internalNote",
      title: "Internal note",
      type: "text",
      rows: 3,
      group: "moderation",
      description: "Only visible in the Studio.",
    }),
  ],
  orderings: [
    {
      title: "Newest submissions",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Rating, high to low",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      body: "body",
      rating: "rating",
      status: "status",
    },
    prepare({ name, body, rating, status }) {
      const badge =
        status === "approved" ? "✓" : status === "rejected" ? "✕" : "…";
      return {
        title: `${badge} ${name || "Guest"} · ${rating ?? "–"}★`,
        subtitle: body ? String(body).slice(0, 90) : "No review text",
      };
    },
  },
});
