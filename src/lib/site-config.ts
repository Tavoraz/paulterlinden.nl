import { primaryCtaLabel } from "@/lib/page-data";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://paulterlinden.nl";

export const mainNavigation = [
  { href: "/voor-wie", label: "Voor wie" },
  { href: "/wat", label: "Wat" },
  { href: "/hoe", label: "Hoe" },
  { href: "/paul", label: "Over mij" },
  { href: "/inzicht", label: "Inzicht" },
] as const;

export const footerNavigation = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookiebeleid", label: "Cookiebeleid" },
  { href: "/en", label: "EN (binnenkort)" },
] as const;

export const consentStorageKey = "ptl-cookie-consent";
export const consentCookieName = "ptl_cookie_consent";
export const primaryCtaHref = "/contact";
export { primaryCtaLabel };
