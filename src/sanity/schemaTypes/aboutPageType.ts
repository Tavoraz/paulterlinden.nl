import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "pageSEO", validation: (rule) => rule.required() }),
    defineField({ name: "introTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "introBody", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "timeline",
      type: "array",
      of: [{ type: "timelineItem" }],
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "stylePillars",
      type: "array",
      of: [{ type: "approachPillar" }],
      validation: (rule) => rule.required().min(4),
    }),
  ],
});
