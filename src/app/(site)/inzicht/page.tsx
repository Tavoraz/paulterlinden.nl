import { Lightbulb } from "lucide-react";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import { getInsightPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

export async function generateMetadata() {
  const content = await getInsightPage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/inzicht",
  });
}

export default async function InsightPage() {
  const [content, settings] = await Promise.all([
    getInsightPage(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-elevated rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <p className="eyebrow">Inzicht</p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
          <Lightbulb className="h-4 w-4 text-[var(--accent-500)]" />
          Analyse en opinie
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--ink-900)]">{content.title}</h1>
        <p className="mt-4 text-[var(--ink-700)]">{content.body}</p>
      </section>

      <ContactStrip
        settings={settings}
        title="Wil je nu al sparren over een concreet vraagstuk?"
        body="Tot de eerste publicaties live staan, kun je direct contact opnemen voor een korte verkenning."
      />
    </div>
  );
}
