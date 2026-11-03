import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({
                name: "openInNewTab",
                title: "Open in a new tab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineArrayMember({ type: "tableBlock" }),
    defineArrayMember({ type: "ctaButton" }),
    defineArrayMember({ type: "callout" }),
    defineArrayMember({ type: "htmlBlock" }),
  ],
});
