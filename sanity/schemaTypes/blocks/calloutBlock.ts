import { defineField, defineType } from "sanity";

export const calloutBlock = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Note", value: "note" },
          { title: "Tip", value: "tip" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "note",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { tone: "tone", content: "content" },
    prepare({ tone, content }: { tone?: string; content?: string }) {
      return {
        title: `Callout — ${tone || "note"}`,
        subtitle: content?.slice(0, 80),
      };
    },
  },
});
