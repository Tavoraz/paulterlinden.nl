import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-config";

const routes = [
  "/",
  "/wat",
  "/voor-wie",
  "/hoe",
  "/paul-ai",
  "/zelfdiagnose",
  "/paul",
  "/contact",
  "/inzicht",
  "/privacy",
  "/cookiebeleid",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: updated,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
