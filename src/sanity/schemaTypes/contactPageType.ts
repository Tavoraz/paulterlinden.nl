import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "pageSEO", validation: (rule) => rule.required() }),
    defineField({ name: "introTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "introBody", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "responseExpectation",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
