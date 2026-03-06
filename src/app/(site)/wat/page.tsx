import { ArrowRight, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ContactStrip } from "@/components/contact-strip";
import { defaultAccentIcon, serviceIconMap } from "@/lib/icon-map";
import { createPageMetadata } from "@/lib/metadata";
import { getServicesPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

export async function generateMetadata() {
  const content = await getServicesPage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/wat",
  });
}

export default async function ServicesPage() {
  const [content, settings] = await Promise.all([
    getServicesPage(),
    getSiteSettings(),
  ]);
  const ctaFallbackBySection = {
    bestuursadvies: "Plan een gesprek over bestuursadvies",
    teambegeleiding: "Plan een gesprek over teambegeleiding",
    coaching: "Plan een gesprek over coaching",
  } as const;
  const sectionIllustrationById = {
    bestuursadvies: {
      src: "/media/icons-line/presenting-chart.png",
      alt: "Illustratie van strategische presentatie met grafiek",
    },
    teambegeleiding: {
      src: "/media/icons-line/board-meeting.png",
      alt: "Illustratie van teamoverleg aan tafel",
    },
    coaching: {
      src: "/media/icons-line/thinking-coffee.png",
      alt: "Illustratie van reflectie en coaching",
    },
  } as const;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-surface space-y-4 rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <p className="eyebrow">Wat</p>
        <h1 className="font-display text-4xl text-[var(--ink-900)]">{content.introTitle}</h1>
        <p className="max-w-3xl text-[var(--ink-700)]">{content.introBody}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {content.sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="btn-motion rounded-md border border-[var(--ink-300)] px-3 py-1.5 text-sm font-semibold text-[var(--ink-900)] hover:bg-[var(--paper-200)]"
            >
              {section.title}
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        {content.sections.map((section) => {
          const ServiceIcon = serviceIconMap[section.id] ?? defaultAccentIcon;
          const ctaLabel = section.ctaLabel?.trim() || ctaFallbackBySection[section.id];

          return (
            <section
              key={section.id}
              id={section.id}
              className="shader-surface hover-lift scroll-mt-24 rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                <ServiceIcon className="icon-pulse h-4 w-4" />
                {section.id}
              </p>
              <div className="mt-2 grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
                <div>
                  <h2 className="font-display text-3xl text-[var(--ink-900)]">{section.title}</h2>
                  <p className="mt-2 text-lg text-[var(--ink-800)]">{section.subtitle}</p>
                  <p className="mt-4 max-w-3xl text-[var(--ink-700)]">{section.summary}</p>
                </div>
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg border border-[var(--ink-200)] bg-[var(--paper-100)] lg:block">
                  <Image
                    src={sectionIllustrationById[section.id].src}
                    alt={sectionIllustrationById[section.id].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    className="object-contain p-3"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                    Typische vragen
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
                    {section.typicalQuestions.map((question) => (
                      <li key={question} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                    Mijn bijdrage
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
                    {section.contribution.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--ink-700)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/contact"
                className="btn-motion mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--ink-900)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--ink-800)]"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          );
        })}
      </div>

      <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-[var(--paper-200)] p-6 sm:p-8">
        <p className="eyebrow">Twijfel over de beste start?</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--ink-900)]">
          Begin met de zelfdiagnose en kom gericht in gesprek
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--ink-700)]">
          De case &ldquo;eerste keer managing partner&rdquo; geeft in enkele minuten zicht op
          wat al staat en wat nu bestuurlijke aandacht vraagt.
        </p>
        <Link
          href="/zelfdiagnose"
          className="btn-motion mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--ink-300)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] hover:bg-[var(--paper-100)]"
        >
          <Compass className="h-4 w-4 text-[var(--accent-500)]" />
          Start de zelfdiagnose
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <ContactStrip settings={settings} />
    </div>
  );
}
