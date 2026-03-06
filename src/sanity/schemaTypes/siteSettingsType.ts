import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "defaultTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "defaultDescription",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({ name: "phone", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "linkedinUrl", type: "url" }),
    defineField({
      name: "logoPath",
      title: "Logo path in frontend",
      type: "string",
      initialValue: "/ptl-logo.png",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      type: "string",
      initialValue: "Plan een kennismaking",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaHref",
      type: "string",
      initialValue: "/contact",
      validation: (rule) => rule.required(),
    }),
  ],
});
