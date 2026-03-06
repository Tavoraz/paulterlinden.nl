import { Workflow } from "lucide-react";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import { getApproachPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

export async function generateMetadata() {
  const content = await getApproachPage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/hoe",
  });
}

export default async function ApproachPage() {
  const [content, settings] = await Promise.all([
    getApproachPage(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-surface space-y-4 rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <p className="eyebrow">Hoe</p>
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
          <Workflow className="h-4 w-4 text-[var(--accent-500)]" />
          Aanpak en ritme
        </p>
        <h1 className="font-display text-4xl text-[var(--ink-900)]">{content.introTitle}</h1>
        <p className="max-w-3xl text-[var(--ink-700)]">{content.introBody}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {content.pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="shader-surface hover-lift rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-2xl text-[var(--ink-900)]">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">{pillar.body}</p>
          </article>
        ))}
      </div>

      <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-[var(--paper-200)] p-6 sm:p-8">
        <h2 className="font-display text-3xl text-[var(--ink-900)]">Van inzicht naar gedrag</h2>
        <p className="mt-3 max-w-3xl text-[var(--ink-700)]">
          Het doel is niet de perfecte theorie, maar een werkende verandering in de
          dagelijkse praktijk. Daarom vertaal ik keuzes altijd naar concreet gedrag,
          ritme en opvolging.
        </p>
      </section>

      <ContactStrip settings={settings} />
    </div>
  );
}
