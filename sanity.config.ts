import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "jade-river-resort",
  title: "Jade River Resort CMS",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
