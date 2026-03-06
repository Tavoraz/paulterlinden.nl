import { aboutPageType } from "@/sanity/schemaTypes/aboutPageType";
import { approachPageType } from "@/sanity/schemaTypes/approachPageType";
import { audiencesPageType } from "@/sanity/schemaTypes/audiencesPageType";
import { contactPageType } from "@/sanity/schemaTypes/contactPageType";
import { homePageType } from "@/sanity/schemaTypes/homePageType";
import { insightPageType } from "@/sanity/schemaTypes/insightPageType";
import { redirectRuleType } from "@/sanity/schemaTypes/redirectRuleType";
import { seoSettingsType } from "@/sanity/schemaTypes/seoSettingsType";
import {
  approachPillarType,
  audiencePreviewType,
  audienceSegmentType,
  pageSEOType,
  serviceHighlightType,
  serviceSectionType,
  successFactorType,
  timelineItemType,
} from "@/sanity/schemaTypes/shared";
import { servicesPageType } from "@/sanity/schemaTypes/servicesPageType";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettingsType";

export const schemaTypes = [
  pageSEOType,
  successFactorType,
  audiencePreviewType,
  serviceHighlightType,
  serviceSectionType,
  audienceSegmentType,
  approachPillarType,
  timelineItemType,
  siteSettingsType,
  homePageType,
  servicesPageType,
  audiencesPageType,
  approachPageType,
  aboutPageType,
  contactPageType,
  insightPageType,
  seoSettingsType,
  redirectRuleType,
];
