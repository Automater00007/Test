import { defineField, defineType } from "sanity";

export const tableBlock = defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "headers",
      title: "Column headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }: { cells?: string[] }) {
              return { title: cells?.join(" | ") || "Empty row" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { caption: "caption", headers: "headers" },
    prepare({ caption, headers }: { caption?: string; headers?: string[] }) {
      return {
        title: caption || "Table",
        subtitle: headers?.join(", "),
      };
    },
  },
});
