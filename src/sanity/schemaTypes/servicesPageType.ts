import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "pageSEO", validation: (rule) => rule.required() }),
    defineField({ name: "introTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "introBody", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "sections",
      type: "array",
      of: [{ type: "serviceSection" }],
      validation: (rule) => rule.required().length(3),
    }),
  ],
});
