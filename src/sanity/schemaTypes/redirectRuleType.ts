import { defineField, defineType } from "sanity";

export const redirectRuleType = defineType({
  name: "redirectRule",
  title: "Redirect rule",
  type: "document",
  fields: [
    defineField({ name: "source", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "destination", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "permanent", type: "boolean", initialValue: true }),
  ],
});
