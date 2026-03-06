import { AnalyticsLoader } from "@/components/analytics-loader";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { PaulAiWidget } from "@/components/paul-ai-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site-config";
import { getSiteSettings } from "@/sanity/lib/loaders";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.siteName,
    url: siteUrl,
    telephone: settings.phone,
    email: settings.email,
    sameAs: [settings.linkedinUrl],
    areaServed: "NL",
    serviceType: ["Bestuursadvies", "Teambegeleiding", "Coaching"],
    founder: {
      "@type": "Person",
      name: "Paul ter Linden",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--paper-100)] text-[var(--ink-900)]">
      <a href="#main-content" className="skip-link">
        Direct naar inhoud
      </a>
      <SiteHeader settings={settings} />
      <main id="main-content" className="site-main">
        {children}
      </main>
      <SiteFooter settings={settings} />
      <PaulAiWidget />
      <CookieConsentBanner />
      <AnalyticsLoader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
