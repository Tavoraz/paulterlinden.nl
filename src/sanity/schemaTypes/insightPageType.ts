import { defineField, defineType } from "sanity";

export const insightPageType = defineType({
  name: "insightPage",
  title: "Insight placeholder page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "pageSEO", validation: (rule) => rule.required() }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", type: "text", rows: 5, validation: (rule) => rule.required() }),
  ],
});
