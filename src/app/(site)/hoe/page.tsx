import { ArrowRight, Workflow } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import {
  primaryCtaLabel,
  serviceIllustrationById,
} from "@/lib/page-data";
import { primaryCtaHref } from "@/lib/site-config";
import { getServicesPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

const pageTheme = {
  "--section-accent": "#8a6f45",
  "--section-soft": "rgba(138, 111, 69, 0.15)",
  "--section-border": "rgba(138, 111, 69, 0.18)",
} as CSSProperties;

export async function generateMetadata() {
  const content = await getServicesPage();

  return createPageMetadata({
    title: "Hoe we samenwerken",
    description: content.seo.description,
    path: "/hoe",
  });
}

export default async function ApproachPage() {
  const [servicesContent, settings] = await Promise.all([
    getServicesPage(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="section-shell p-8" style={pageTheme}>
        <div className="max-w-4xl space-y-4">
          <p className="eyebrow">Hoe</p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
            <Workflow className="h-4 w-4 text-[var(--accent-500)]" />
            Samenwerkingsvormen
          </p>
          <h1 className="font-display text-4xl text-[var(--ink-900)]">
            Advies, teambegeleiding en coaching
          </h1>
          <p className="max-w-3xl text-[var(--ink-700)]">
            Op deze pagina staat niet mijn algemene stijl, maar vooral de vorm van
            samenwerken. Welke vorm past, hangt af van de opgave, het ritme dat nodig
            is en de mate waarin er al helderheid of beweging is.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {servicesContent.sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="btn-motion rounded-full border border-[var(--ink-300)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
            >
              {section.title}
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        {servicesContent.sections.map((section) => {
          const art = serviceIllustrationById[section.id];

          return (
            <section
              key={section.id}
              id={section.id}
              className="section-shell scroll-mt-28 p-6 sm:p-8"
              style={pageTheme}
            >
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-[var(--ink-200)] bg-[var(--paper-100)]">
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-600)]">
                      Samenwerkingsvorm
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-[var(--ink-900)]">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-lg text-[var(--ink-800)]">
                      {section.subtitle}
                    </p>
                  </div>
                  <p className="text-[var(--ink-700)]">{section.summary}</p>
                </div>

                <div className="grid gap-4">
                  <article className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]">
                      Wanneer dit past
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-[var(--ink-700)]">
                      {section.typicalQuestions.map((question) => (
                        <li key={question} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]">
                      Zo kan ik bijdragen
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-[var(--ink-700)]">
                      {section.contribution.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--ink-700)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <div className="rounded-[1.2rem] border border-[var(--ink-200)] bg-[var(--paper-100)] p-5">
                    <p className="text-sm text-[var(--ink-700)]">
                      Wil je verkennen of deze vorm past bij jouw situatie?
                    </p>
                    <Link
                      href={settings.ctaHref || primaryCtaHref}
                      className="btn-primary mt-4"
                    >
                      {primaryCtaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="section-shell p-6 sm:p-8" style={pageTheme}>
        <h2 className="font-display text-3xl text-[var(--ink-900)]">
          Meer over mijn achtergrond en manier van werken
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--ink-700)]">
          De meer persoonlijke toelichting op ervaring, stijl en werkwijze staat nu op
          de pagina Over mij, zodat deze pagina volledig over de samenwerkingsvormen kan gaan.
        </p>
        <Link
          href="/paul"
          className="btn-motion mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--ink-300)] bg-white px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
        >
          Naar Over mij
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <ContactStrip
        settings={settings}
        title="Welke samenwerkingsvorm brengt hier het meeste in beweging?"
        body="Plan een gesprek. Dan bepalen we samen of bestuursadvies, teambegeleiding of coaching het beste past."
      />
    </div>
  );
}
