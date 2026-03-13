import { UsersRound } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import {
  audienceIllustrationById,
  primaryCtaLabel,
} from "@/lib/page-data";
import { primaryCtaHref } from "@/lib/site-config";
import { getAudiencesPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

const pageTheme = {
  "--section-accent": "#516783",
  "--section-soft": "rgba(81, 103, 131, 0.16)",
  "--section-border": "rgba(81, 103, 131, 0.18)",
} as CSSProperties;

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
      <section className="section-shell p-8" style={pageTheme}>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow">Voor wie</p>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
              <UsersRound className="h-4 w-4 text-[var(--accent-500)]" />
              Doelgroepen en opgaven
            </p>
            <h1 className="font-display text-4xl text-[var(--ink-900)]">
              {content.introTitle}
            </h1>
            <p className="max-w-3xl text-[var(--ink-700)]">{content.introBody}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-[var(--ink-200)] bg-[var(--paper-100)]">
            <Image
              src="/media/icons-line/group-professionals.png"
              alt="Illustratie van een groep professionals"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
        {content.segments.map((segment) => {
          const art = audienceIllustrationById[segment.id];

          return (
            <article
              key={segment.id}
              className="section-shell h-full p-6"
              style={pageTheme}
            >
              <div className="flex h-full flex-col gap-5">
                <div className="relative aspect-[5/3] overflow-hidden rounded-[1.2rem] border border-[var(--ink-200)] bg-[var(--paper-100)]">
                  <Image
                    src={art.src}
                    alt={art.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                    {art.eyebrow}
                  </p>
                  <h2 className="font-display text-2xl text-[var(--ink-900)]">
                    {segment.title}
                  </h2>
                  <p className="text-sm font-semibold text-[var(--accent-600)]">
                    {segment.challenge}
                  </p>
                  <p className="text-sm text-[var(--ink-700)]">
                    {segment.assignment}
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                      Waar dit op uitkomt
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
                      {segment.outcomes.map((outcome) => (
                        <li key={outcome} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--ink-700)]" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                      Wanneer dit relevant is
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
                      {segment.relevanceSignals.map((signal) => (
                        <li key={signal} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                          <span>{signal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <Link
                    href={settings.ctaHref || primaryCtaHref}
                    className="btn-primary"
                  >
                    {primaryCtaLabel}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="section-shell p-6 sm:p-8" style={pageTheme}>
        <h2 className="font-display text-3xl text-[var(--ink-900)]">
          Zelftest per rol
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--ink-700)]">
          De zelfdiagnose kan uiteindelijk per rol of persona verschillen. Voor nu is
          het een goede eerste stap om te bepalen waar jouw grootste bestuurlijke of
          professionele opgave zit.
        </p>
        <Link
          href="/zelfdiagnose"
          className="btn-motion mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--ink-300)] bg-white px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
        >
          Doe de zelftest
        </Link>
      </section>

      <ContactStrip
        settings={settings}
        title="Herken je je in een van deze rollen?"
        body="Plan een gesprek. Dan onderzoeken we welke opgave nu het meest aandacht vraagt en welke vorm daarbij past."
      />
    </div>
  );
}
