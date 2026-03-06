import { defineField, defineType } from "sanity";

export const approachPageType = defineType({
  name: "approachPage",
  title: "Approach page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "pageSEO", validation: (rule) => rule.required() }),
    defineField({ name: "introTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "introBody", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "pillars",
      type: "array",
      of: [{ type: "approachPillar" }],
      validation: (rule) => rule.required().length(4),
    }),
  ],
});
