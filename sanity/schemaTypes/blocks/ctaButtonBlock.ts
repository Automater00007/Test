import { defineField, defineType } from "sanity";

export const ctaButtonBlock = defineType({
  name: "ctaButton",
  title: "CTA button",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Button text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary (walnut)", value: "primary" },
          { title: "Outlined", value: "secondary" },
          { title: "WhatsApp", value: "whatsapp" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "linkType",
      title: "Link type",
      type: "string",
      options: {
        list: [
          { title: "Internal page", value: "internal" },
          { title: "External URL", value: "external" },
          { title: "WhatsApp", value: "whatsapp" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "internalPath",
      title: "Internal path",
      type: "string",
      placeholder: "e.g. /rooms",
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp message",
      type: "text",
      rows: 2,
      hidden: ({ parent }) => parent?.linkType !== "whatsapp",
    }),
    defineField({
      name: "align",
      title: "Alignment",
      type: "string",
      options: { list: ["left", "center", "right"], layout: "radio" },
      initialValue: "left",
    }),
  ],
  preview: {
    select: { text: "text", style: "style" },
    prepare({ text, style }: { text?: string; style?: string }) {
      return {
        title: `${style === "whatsapp" ? "WhatsApp" : "Button"} — ${text || "Untitled"}`,
      };
    },
  },
});
