import { defineField, defineType } from "sanity";
import HtmlInput from "../../../components/studio/HtmlInput";

export const htmlBlock = defineType({
  name: "htmlBlock",
  title: "Custom HTML",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label (internal reference)",
      type: "string",
      placeholder: "e.g. Booking table",
    }),
    defineField({
      name: "html",
      title: "HTML (inline styles only)",
      type: "text",
      rows: 10,
      description: "No <style> or <script> tags. Inline styles only.",
      validation: (rule) => rule.required(),
      components: { input: HtmlInput },
    }),
  ],
  preview: {
    select: { label: "label", html: "html" },
    prepare({ label, html }: { label?: string; html?: string }) {
      return {
        title: `HTML — ${label || "Custom block"}`,
        subtitle: html?.slice(0, 80),
      };
    },
  },
});
