import { ArrowRight, Briefcase, UserRound } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import { primaryCtaLabel } from "@/lib/page-data";
import { primaryCtaHref } from "@/lib/site-config";
import { getAboutPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

const pageTheme = {
  "--section-accent": "#425973",
  "--section-soft": "rgba(66, 89, 115, 0.16)",
  "--section-border": "rgba(66, 89, 115, 0.2)",
} as CSSProperties;

export async function generateMetadata() {
  const content = await getAboutPage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/paul",
  });
}

export default async function AboutPage() {
  const [content, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  const profileHighlights = [
    {
      title: "14 jaar McKinsey",
      body: "Ik leerde daar hoe je complexe vraagstukken scherp structureert en met leiders tot werkbare keuzes komt.",
    },
    {
      title: "Leiderschapservaring",
      body: "Na McKinsey werkte ik zelf in leidinggevende rollen, waardoor ik de bestuurlijke realiteit niet alleen van buiten ken.",
    },
    {
      title: "Sinds 2010 zelfstandig",
      body: "Ik begeleid sindsdien besturen, teams en professionals die zichtbaar vooruit willen.",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="section-shell p-8" style={pageTheme}>
        <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow">Over mij</p>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
              <UserRound className="h-4 w-4 text-[var(--accent-500)]" />
              Achtergrond en werkwijze
            </p>
            <h1 className="font-display text-4xl text-[var(--ink-900)]">
              Ik help besturen en professionals om scherpte te koppelen aan beweging
            </h1>
            <p className="max-w-3xl text-[var(--ink-700)]">
              Na 14 jaar McKinsey en leidinggevende rollen in het bedrijfsleven werk
              ik sinds 2010 zelfstandig als coach, teambegeleider en adviseur voor
              professional service firms.
            </p>
            <p className="max-w-3xl text-[var(--ink-700)]">
              Ik combineer analytische scherpte met praktische uitvoerbaarheid. Dat
              betekent: hoofd- en bijzaken scheiden, lastige gesprekken niet ontwijken
              en veranderingen zo ontwerpen dat ze ook echt blijven werken.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={settings.ctaHref || primaryCtaHref} className="btn-primary">
                {primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hoe"
                className="btn-motion inline-flex items-center gap-2 rounded-full border border-[var(--ink-300)] bg-white px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
              >
                Bekijk samenwerkingsvormen
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.55rem] border border-[var(--ink-200)] bg-[radial-gradient(circle_at_18%_18%,rgba(171,69,63,0.16),transparent_28%),radial-gradient(circle_at_80%_14%,rgba(66,89,115,0.16),transparent_26%),linear-gradient(145deg,#f7f2ea,#ece3d7)]">
            <div className="absolute inset-x-6 top-6 rounded-full border border-white/40 bg-white/56 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-700)] backdrop-blur-sm">
              Strategische scherpte, menselijke maat
            </div>
            <Image
              src="/media/paul-ter-linden-portrait.jpeg"
              alt="Portret van Paul ter Linden"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain object-bottom p-6"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {profileHighlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                Profiel
              </p>
              <h2 className="mt-3 text-lg font-semibold text-[var(--ink-900)]">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--ink-700)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell p-6 sm:p-8" style={pageTheme}>
        <h2 className="font-display text-3xl text-[var(--ink-900)]">
          Ervaring die ik meebreng
        </h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {content.timeline.map((item) => (
            <article
              key={item.period}
              className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/94 p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                <Briefcase className="mr-1 inline h-3.5 w-3.5" />
                {item.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell p-6 sm:p-8" style={pageTheme}>
        <h2 className="font-display text-3xl text-[var(--ink-900)]">Zo werk ik</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.stylePillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="rounded-[1.15rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[var(--ink-900)]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--ink-700)]">{pillar.body}</p>
              <div
                className="mt-4 h-1.5 w-14 rounded-full bg-[var(--accent-500)]/70"
                style={{ opacity: 0.5 + index * 0.12 }}
              />
            </article>
          ))}
        </div>
      </section>

      <ContactStrip
        settings={settings}
        title="Wil je toetsen of ik goed pas bij jouw vraagstuk?"
        body="Plan een gesprek. Dan verkennen we kort de opgave, de context en welke vorm van samenwerking daarbij past."
      />
    </div>
  );
}
