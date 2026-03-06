import {
  fallbackAboutPage,
  fallbackApproachPage,
  fallbackAudiencesPage,
  fallbackContactPage,
  fallbackHomePage,
  fallbackInsightPage,
  fallbackServicesPage,
  fallbackSiteSettings,
} from "@/lib/content-fallback";
import type {
  AboutPageContent,
  ApproachPageContent,
  AudiencesPageContent,
  ContactPageContent,
  HomePageContent,
  InsightPageContent,
  ServicesPageContent,
  SiteSettings,
} from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/client";
import {
  aboutPageQuery,
  approachPageQuery,
  audiencesPageQuery,
  contactPageQuery,
  homePageQuery,
  insightPageQuery,
  servicesPageQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

export const getSiteSettings = async (): Promise<SiteSettings> =>
  sanityFetch({
    query: siteSettingsQuery,
    fallback: fallbackSiteSettings,
  });

export const getHomePage = async (): Promise<HomePageContent> =>
  sanityFetch({
    query: homePageQuery,
    fallback: fallbackHomePage,
  });

export const getServicesPage = async (): Promise<ServicesPageContent> =>
  sanityFetch({
    query: servicesPageQuery,
    fallback: fallbackServicesPage,
  });

export const getAudiencesPage = async (): Promise<AudiencesPageContent> =>
  sanityFetch({
    query: audiencesPageQuery,
    fallback: fallbackAudiencesPage,
  });

export const getApproachPage = async (): Promise<ApproachPageContent> =>
  sanityFetch({
    query: approachPageQuery,
    fallback: fallbackApproachPage,
  });

export const getAboutPage = async (): Promise<AboutPageContent> =>
  sanityFetch({
    query: aboutPageQuery,
    fallback: fallbackAboutPage,
  });

export const getContactPage = async (): Promise<ContactPageContent> =>
  sanityFetch({
    query: contactPageQuery,
    fallback: fallbackContactPage,
  });

export const getInsightPage = async (): Promise<InsightPageContent> =>
  sanityFetch({
    query: insightPageQuery,
    fallback: fallbackInsightPage,
  });
