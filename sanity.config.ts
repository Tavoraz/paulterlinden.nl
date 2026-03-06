"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { sanityEnv } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Paul ter Linden CMS",
  projectId: sanityEnv.projectId || "your-project-id",
  dataset: sanityEnv.dataset || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
