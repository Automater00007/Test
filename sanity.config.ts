import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { PreviewDraftAction } from "./components/studio/PreviewDraftAction";
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
        // Open the most recently edited post (draft or published) so the
        // Preview tool starts on a real document instead of the homepage.
        initial: async ({ client }) => {
          const slug = await client.fetch<string | null>(
            `*[_type == "post" && defined(slug.current)] | order(_updatedAt desc)[0].slug.current`,
          );
          return slug ? `/post/${slug}` : "/post";
        },
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
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === "post" ? [PreviewDraftAction, ...prev] : prev,
  },
});
