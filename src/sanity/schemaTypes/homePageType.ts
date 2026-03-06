import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "pageSEO", validation: (rule) => rule.required() }),
    defineField({ name: "heroTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "heroSubtitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "intro", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "successFactors",
      type: "array",
      of: [{ type: "successFactor" }],
      validation: (rule) => rule.required().length(5),
    }),
    defineField({
      name: "audiencePreview",
      type: "array",
      of: [{ type: "audiencePreview" }],
      validation: (rule) => rule.required().min(4),
    }),
    defineField({
      name: "serviceHighlights",
      type: "array",
      of: [{ type: "serviceHighlight" }],
      validation: (rule) => rule.required().length(3),
    }),
    defineField({
      name: "aboutSnippet",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});
