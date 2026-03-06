import type { Metadata } from "next";

import { fallbackSiteSettings } from "@/lib/content-fallback";

interface MetadataInput {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  noindex = false,
}: MetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: fallbackSiteSettings.siteName,
      locale: "nl_NL",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
