"use client";

import { useState } from "react";

import { consentCookieName, consentStorageKey } from "@/lib/site-config";

type ConsentValue = "accepted" | "declined";

function setCookie(value: ConsentValue) {
  document.cookie = `${consentCookieName}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function CookieConsentBanner() {
  const [choice, setChoice] = useState<ConsentValue | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const saved = localStorage.getItem(consentStorageKey);
    return saved === "accepted" || saved === "declined" ? saved : null;
  });

  function persist(value: ConsentValue) {
    localStorage.setItem(consentStorageKey, value);
    setCookie(value);
    setChoice(value);
    window.dispatchEvent(new Event("ptl-consent-change"));
  }

  if (choice) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-lg border border-[var(--ink-700)] bg-[var(--ink-950)] p-4 text-sm text-white shadow-2xl">
      <p className="leading-relaxed text-white/85">
        Deze website gebruikt analytische cookies (GA4) om anoniem inzicht te
        krijgen in gebruik en prestaties.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => persist("accepted")}
          className="btn-motion rounded-md bg-[var(--accent-500)] px-3 py-2 font-semibold text-white hover:bg-[var(--accent-600)]"
        >
          Accepteren
        </button>
        <button
          type="button"
          onClick={() => persist("declined")}
          className="rounded-md border border-white/25 px-3 py-2 font-semibold text-white/90 hover:bg-white/10"
        >
          Weigeren
        </button>
      </div>
    </div>
  );
}
