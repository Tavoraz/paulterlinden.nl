import { defineField, defineType } from "sanity";

export const pageSEOType = defineType({
  name: "pageSEO",
  title: "Page SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({ name: "noindex", type: "boolean", initialValue: false }),
  ],
});

export const successFactorType = defineType({
  name: "successFactor",
  title: "Success factor",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "challenge", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "assignment", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "points",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

export const audiencePreviewType = defineType({
  name: "audiencePreview",
  title: "Audience preview",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "challenge", type: "string", validation: (rule) => rule.required() }),
  ],
});

export const serviceHighlightType = defineType({
  name: "serviceHighlight",
  title: "Service highlight",
  type: "object",
  fields: [
    defineField({
      name: "id",
      type: "string",
      options: {
        list: [
          { title: "Bestuursadvies", value: "bestuursadvies" },
          { title: "Teambegeleiding", value: "teambegeleiding" },
          { title: "Coaching", value: "coaching" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
});

export const serviceSectionType = defineType({
  name: "serviceSection",
  title: "Service section",
  type: "object",
  fields: [
    defineField({
      name: "id",
      type: "string",
      options: {
        list: [
          { title: "Bestuursadvies", value: "bestuursadvies" },
          { title: "Teambegeleiding", value: "teambegeleiding" },
          { title: "Coaching", value: "coaching" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subtitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "typicalQuestions",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "contribution",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "ctaLabel", type: "string", validation: (rule) => rule.required() }),
  ],
});

export const audienceSegmentType = defineType({
  name: "audienceSegment",
  title: "Audience segment",
  type: "object",
  fields: [
    defineField({ name: "id", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "challenge", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "assignment", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "outcomes",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "relevanceSignals",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

export const approachPillarType = defineType({
  name: "approachPillar",
  title: "Approach pillar",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", type: "text", rows: 4, validation: (rule) => rule.required() }),
  ],
});

export const timelineItemType = defineType({
  name: "timelineItem",
  title: "Timeline item",
  type: "object",
  fields: [
    defineField({ name: "period", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", type: "text", rows: 4, validation: (rule) => rule.required() }),
  ],
});
