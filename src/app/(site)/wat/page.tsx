import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import {
  primaryCtaLabel,
  successFactorPowerPointIconByTitle,
  successFactorDetailMap,
} from "@/lib/page-data";
import { primaryCtaHref } from "@/lib/site-config";
import { getHomePage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

const pageTheme = {
  "--section-accent": "#a95b51",
  "--section-soft": "rgba(171, 69, 63, 0.16)",
  "--section-border": "rgba(171, 69, 63, 0.2)",
} as CSSProperties;

export async function generateMetadata() {
  const content = await getHomePage();

  return createPageMetadata({
    title: "Wat ik versterk",
    description: content.seo.description,
    path: "/wat",
  });
}

export default async function ServicesPage() {
  const [homeContent, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="section-shell p-8" style={pageTheme}>
        <div className="max-w-4xl space-y-4">
          <p className="eyebrow">Wat</p>
          <h1 className="font-display text-4xl text-[var(--ink-900)]">
            Vijf succesfactoren voor bestuurlijke vooruitgang
          </h1>
          <p className="max-w-3xl text-[var(--ink-700)]">
            Deze pagina beschrijft de vijf thema&apos;s waarop ik het vaakst meewerk:
            strategie, cultuur, commercie, uitvoering en talent. Het zijn geen losse
            onderwerpen, maar samenhangende succesfactoren die bepalen of een kantoor
            werkelijk vooruitkomt.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {homeContent.successFactors.map((factor) => (
            <Link
              key={factor.title}
              href={`#${factor.title.toLowerCase()}`}
              className="btn-motion rounded-full border border-[var(--ink-300)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
            >
              {factor.title}
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        {homeContent.successFactors.map((factor) => {
          const detail = successFactorDetailMap[factor.title];
          const factorIcon = successFactorPowerPointIconByTitle[factor.title];

          return (
            <section
              key={factor.title}
              id={factor.title.toLowerCase()}
              className="section-shell scroll-mt-28 p-6 sm:p-8"
              style={pageTheme}
            >
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-[var(--paper-200)] p-2">
                    <Image
                      src={factorIcon.src}
                      alt={factorIcon.alt}
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-600)]">
                      Succesfactor
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-[var(--ink-900)]">
                      {factor.title}
                    </h2>
                    <p className="mt-2 text-lg text-[var(--ink-800)]">
                      {factor.challenge}
                    </p>
                  </div>
                  <p className="text-[var(--ink-700)]">{detail.lead}</p>

                  <div className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/92 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]">
                      Waar dit om draait
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--ink-900)]">
                      {factor.assignment}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-[var(--ink-700)]">
                      {factor.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4">
                  <article className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]">
                      Typische vragen
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-[var(--ink-700)]">
                      {detail.typicalQuestions.map((question) => (
                        <li key={question} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]">
                      Mijn bijdrage
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-[var(--ink-700)]">
                      {detail.contribution.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--ink-700)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <div className="rounded-[1.2rem] border border-[var(--ink-200)] bg-[var(--paper-100)] p-5">
                    <p className="text-sm text-[var(--ink-700)]">
                      Wil je dit succesfactor-thema vertalen naar jouw kantoor of bestuur?
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

      <ContactStrip
        settings={settings}
        title="Wil je een van deze succesfactoren concreet maken voor jouw kantoor?"
        body="Plan een gesprek. Dan kijken we samen welke succesfactor nu het meeste bestuurlijke verschil maakt."
      />
    </div>
  );
}
