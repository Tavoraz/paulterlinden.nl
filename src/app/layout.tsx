import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { fallbackSiteSettings } from "@/lib/content-fallback";
import { siteUrl } from "@/lib/site-config";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: fallbackSiteSettings.defaultTitle,
    template: `%s | ${fallbackSiteSettings.siteName}`,
  },
  description: fallbackSiteSettings.defaultDescription,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: fallbackSiteSettings.siteName,
    title: fallbackSiteSettings.defaultTitle,
    description: fallbackSiteSettings.defaultDescription,
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${fraunces.variable} ${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
