import { defineField, defineType } from "sanity";

export const seoSettingsType = defineType({
  name: "seoSettings",
  title: "SEO settings",
  type: "document",
  fields: [
    defineField({ name: "defaultOgTitle", type: "string" }),
    defineField({ name: "defaultOgDescription", type: "text", rows: 3 }),
    defineField({ name: "defaultOgImage", type: "image" }),
    defineField({ name: "ga4MeasurementId", type: "string" }),
  ],
});
