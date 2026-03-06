"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { consentStorageKey } from "@/lib/site-config";

const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

function hasAcceptedConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(consentStorageKey) === "accepted";
}

export function AnalyticsLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(hasAcceptedConsent());
    sync();

    window.addEventListener("ptl-consent-change", sync);

    return () => {
      window.removeEventListener("ptl-consent-change", sync);
    };
  }, []);

  if (!measurementId || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
