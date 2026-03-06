import { UsersRound } from "lucide-react";
import Image from "next/image";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import { getAudiencesPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

export async function generateMetadata() {
  const content = await getAudiencesPage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/voor-wie",
  });
}

export default async function AudiencesPage() {
  const [content, settings] = await Promise.all([
    getAudiencesPage(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-surface grid gap-5 rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-4">
          <p className="eyebrow">Voor wie</p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
            <UsersRound className="h-4 w-4 text-[var(--accent-500)]" />
            Doelgroepen en opgaven
          </p>
          <h1 className="font-display text-4xl text-[var(--ink-900)]">{content.introTitle}</h1>
          <p className="max-w-3xl text-[var(--ink-700)]">{content.introBody}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--ink-200)] bg-[var(--paper-100)]">
          <Image
            src="/media/icons-line/group-professionals.png"
            alt="Illustratie van een groep professionals"
            fill
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="object-contain p-4"
          />
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {content.segments.map((segment) => (
          <article key={segment.id} className="shader-surface hover-lift rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl text-[var(--ink-900)]">{segment.title}</h2>
            <p className="mt-2 text-sm font-semibold text-[var(--accent-600)]">{segment.challenge}</p>
            <p className="mt-2 text-sm text-[var(--ink-700)]">{segment.assignment}</p>

            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
              Waar dit op uitkomt
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-[var(--ink-700)]">
              {segment.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--ink-700)]" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
              Wanneer dit relevant is
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-[var(--ink-700)]">
              {segment.relevanceSignals.map((signal) => (
                <li key={signal} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <ContactStrip settings={settings} />
    </div>
  );
}
