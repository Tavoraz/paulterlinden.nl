import { defineField, defineType } from "sanity";

export const audiencesPageType = defineType({
  name: "audiencesPage",
  title: "Audiences page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "pageSEO", validation: (rule) => rule.required() }),
    defineField({ name: "introTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "introBody", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "segments",
      type: "array",
      of: [{ type: "audienceSegment" }],
      validation: (rule) => rule.required().length(4),
    }),
  ],
});
