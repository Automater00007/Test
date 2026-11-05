import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "jade-river-resort",
  title: "Jade River Resort CMS",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      title: "Preview",
      previewUrl: {
        initial: "/",
        previewMode: { enable: "/api/draft" },
      },
      resolve: {
        locations: {
          post: {
            select: { slug: "slug.current" },
            resolve: (value) =>
              value?.slug
                ? {
                    locations: [
                      {
                        title: "Blog post",
                        href: `/post/${value.slug}`,
                      },
                    ],
                  }
                : {
                    message: "Add a slug to preview this post.",
                  },
          },
        },
      },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
