import { ArrowRight, CalendarClock, Mail } from "lucide-react";
import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

interface ContactStripProps {
  settings: SiteSettings;
  title?: string;
  body?: string;
}

export function ContactStrip({
  settings,
  title = "Wil je verkennen wat dit voor jouw kantoor betekent?",
  body = "Plan een korte kennismaking. Dan bepalen we samen welke vorm het beste past.",
}: ContactStripProps) {
  return (
    <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-700)]">
            <CalendarClock className="icon-pulse h-4 w-4 text-[var(--accent-500)]" />
            Kennismaking
          </p>
          <h2 className="font-display text-3xl text-[var(--ink-900)]">{title}</h2>
          <p className="text-[var(--ink-700)]">{body}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/contact"
            className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--ink-900)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
          >
            {settings.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`mailto:${settings.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--ink-300)] px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-100)]"
          >
            <Mail className="h-4 w-4 text-[var(--ink-700)]" />
            {settings.email}
          </a>
        </div>
      </div>
    </section>
  );
}
