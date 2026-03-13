import { ArrowRight, Compass } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContactStrip } from "@/components/contact-strip";
import { InteractiveFlipCard } from "@/components/interactive-flip-card";
import { createPageMetadata } from "@/lib/metadata";
import {
  audienceIllustrationById,
  primaryCtaLabel,
  serviceIllustrationById,
  successFactorPowerPointIconByTitle,
  successFactorDetailMap,
} from "@/lib/page-data";
import { primaryCtaHref } from "@/lib/site-config";
import {
  getAudiencesPage,
  getHomePage,
  getServicesPage,
  getSiteSettings,
} from "@/sanity/lib/loaders";

export const revalidate = 120;

const homeSectionThemes = {
  audiences: {
    "--section-accent": "#516783",
    "--section-soft": "rgba(81, 103, 131, 0.16)",
    "--section-border": "rgba(81, 103, 131, 0.18)",
  } as CSSProperties,
  factors: {
    "--section-accent": "#a95b51",
    "--section-soft": "rgba(171, 69, 63, 0.16)",
    "--section-border": "rgba(171, 69, 63, 0.2)",
  } as CSSProperties,
  services: {
    "--section-accent": "#8a6f45",
    "--section-soft": "rgba(138, 111, 69, 0.15)",
    "--section-border": "rgba(138, 111, 69, 0.18)",
  } as CSSProperties,
  profile: {
    "--section-accent": "#425973",
    "--section-soft": "rgba(66, 89, 115, 0.16)",
    "--section-border": "rgba(66, 89, 115, 0.2)",
  } as CSSProperties,
};

export async function generateMetadata() {
  const content = await getHomePage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/",
  });
}

export default async function HomePage() {
  const [homeContent, settings, audiencesContent, servicesContent] =
    await Promise.all([
      getHomePage(),
      getSiteSettings(),
      getAudiencesPage(),
      getServicesPage(),
    ]);

  const heroContent = {
    title: "Leid je kantoor, leid jezelf",
    subtitle: "Bestuursadvies voor professional service firms",
    intro:
      "Ik help je een grote stap voorwaarts te zetten met focus, structuur en uitvoerbare verandering.",
  };
  const profileHighlights = [
    {
      title: "14 jaar McKinsey",
      body: "Stevige basis in strategie, probleemstructurering en werken met directies en partners.",
    },
    {
      title: "Sinds 2010 zelfstandig",
      body: "Ruime praktijkervaring in coaching, teambegeleiding en bestuursadvies.",
    },
    {
      title: "PSF-focus",
      body: "Ik werk vanuit de dagelijkse realiteit van managing partners, directies en professionals.",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-ink overflow-hidden rounded-[2rem] border border-[var(--ink-800)] p-4 text-white shadow-2xl sm:p-5 lg:p-6">
        <div className="space-y-4">
          <div className="hero-visual-reveal relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[var(--ink-900)] sm:min-h-[500px] lg:min-h-[560px]">
            <Image
              src="/media/hero-amstel-1.png"
              alt="Amsterdamse gracht met skyline in de avond"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,28,45,0.04)_0%,rgba(18,28,45,0.2)_42%,rgba(8,14,28,0.82)_100%)]" />

            <div className="hero-overlay-reveal absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8">
              <div className="max-w-3xl rounded-[1.55rem] border border-white/10 bg-[rgba(10,18,34,0.8)] p-6 shadow-[0_22px_44px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper-300)]">
                  Paul ter Linden
                </p>
                <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  {heroContent.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
            <div
              className="hero-copy-reveal rounded-[1.45rem] border border-white/10 bg-white/96 p-6 text-[var(--ink-900)] shadow-xl"
              style={{ animationDelay: "0.5s" }}
            >
              <p className="eyebrow">Bestuursadvies</p>
              <p className="mt-3 text-xl font-semibold text-[var(--ink-900)]">
                {heroContent.subtitle}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-700)]">
                {heroContent.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={settings.ctaHref || primaryCtaHref} className="btn-primary">
                  {primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/hoe"
                  className="btn-motion inline-flex items-center gap-2 rounded-full border border-[var(--ink-300)] px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
                >
                  Bekijk samenwerkingsvormen
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
              <div
                className="hero-copy-reveal relative min-h-[240px] overflow-hidden rounded-[1.45rem] border border-white/10"
                style={{ animationDelay: "0.68s" }}
              >
                <Image
                  src="/media/hero-amstel-2.png"
                  alt="Amsterdamse Amstel met passerende boot"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(18,28,45,0.08)_0%,rgba(18,28,45,0.62)_100%)]" />
              </div>

              <div
                className="hero-copy-reveal rounded-[1.45rem] border border-white/18 bg-[linear-gradient(160deg,rgba(18,28,45,0.84),rgba(18,28,45,0.68))] p-5 shadow-[0_18px_34px_rgba(10,18,34,0.2)] backdrop-blur-md"
                style={{ animationDelay: "0.82s" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                  Zelftest
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Herken je jezelf vooral als managing partner, COO, teamleider of (pre-)partner?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/88">
                  Gebruik de persona&apos;s hieronder als vertrekpunt en kies daarna de zelftest die het best past.
                </p>
                <Link
                  href="/zelfdiagnose"
                  className="btn-motion mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  <Compass className="h-4 w-4" />
                  Doe de zelftest
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell p-6 sm:p-8" style={homeSectionThemes.audiences}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">Voor wie</p>
            <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
              Vier rollen, vier typische opgaven
            </h2>
            <p className="max-w-2xl text-[var(--ink-700)]">
              Ik werk met sleutelfiguren die tegelijk operationeel moeten leveren en structurele vooruitgang moeten organiseren.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/voor-wie" className="btn-primary">
              Bekijk de vier rollen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/zelfdiagnose"
              className="btn-motion inline-flex items-center gap-2 rounded-full border border-[var(--ink-300)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
            >
              Doe de zelftest
            </Link>
          </div>
        </div>

        <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audiencesContent.segments.map((segment) => {
            const art = audienceIllustrationById[segment.id];

            return (
              <InteractiveFlipCard
                key={segment.id}
                label={`${segment.title} omdraaien voor meer context`}
                className="min-h-[372px] xl:min-h-[396px]"
                front={
                  <>
                    <div className="space-y-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--ink-200)] bg-[var(--paper-100)]">
                        <Image
                          src={art.src}
                          alt={art.alt}
                          fill
                          sizes="(max-width: 1280px) 50vw, 25vw"
                          className="object-contain p-4"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                          {art.eyebrow}
                        </p>
                        <h3 className="min-h-[4.2rem] text-xl leading-tight font-semibold text-[var(--ink-900)]">
                          {segment.title}
                        </h3>
                        <p className="text-sm text-[var(--ink-700)]">
                          {segment.challenge}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                      Klik of hover voor meer
                    </p>
                  </>
                }
                back={
                  <>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                          {segment.title}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[var(--ink-900)]">
                          {segment.assignment}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                          Wanneer dit speelt
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
                          {segment.relevanceSignals.slice(0, 2).map((signal) => (
                            <li key={signal} className="flex gap-2">
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                              <span>{signal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                      Herkenbaar? Dan is dit een goed gesprekspunt.
                    </p>
                  </>
                }
              />
            );
          })}
        </div>
      </section>

      <section className="section-shell p-6 sm:p-8" style={homeSectionThemes.factors}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">Vijf succesfactoren</p>
            <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
              Focus op wat bestuurlijk echt het verschil maakt
            </h2>
            <p className="max-w-2xl text-[var(--ink-700)]">
              Op de voorkant zie je per succesfactor alleen de kern. De achterzijde laat zien waar de onderliggende beweging zit.
            </p>
          </div>
          <Link href="/wat" className="btn-primary">
            Bekijk alle succesfactoren
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeContent.successFactors.map((factor) => {
            const detail = successFactorDetailMap[factor.title];
            const factorIcon = successFactorPowerPointIconByTitle[factor.title];

            return (
              <InteractiveFlipCard
                key={factor.title}
                label={`${factor.title} omdraaien voor details`}
                className="min-h-[340px]"
                front={
                  <>
                    <div className="space-y-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-[var(--paper-200)] p-2">
                        <Image
                          src={factorIcon.src}
                          alt={factorIcon.alt}
                          fill
                          sizes="56px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                          Succesfactor
                        </p>
                        <h3 className="text-2xl font-semibold text-[var(--ink-900)]">
                          {factor.title}
                        </h3>
                        <p className="text-sm text-[var(--ink-700)]">
                          {factor.challenge}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                      Klik of hover voor meer
                    </p>
                  </>
                }
                back={
                  <>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                          {factor.title}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[var(--ink-900)]">
                          {factor.assignment}
                        </p>
                        <p className="mt-2 text-sm text-[var(--ink-700)]">
                          {detail?.lead}
                        </p>
                      </div>
                      <ul className="space-y-2 text-sm text-[var(--ink-700)]">
                        {factor.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
                      De uitwerking staat op de Wat-pagina.
                    </p>
                  </>
                }
              />
            );
          })}
        </div>
      </section>

      <section className="section-shell p-6 sm:p-8" style={homeSectionThemes.services}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">Drie vormen van ondersteuning</p>
            <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
              Advies, teambegeleiding en coaching
            </h2>
            <p className="max-w-2xl text-[var(--ink-700)]">
              De inhoudelijke opgave en de samenwerkingsvorm horen bij elkaar. Daarom staat de Hoe-pagina nu helemaal in het teken van deze drie vormen.
            </p>
          </div>
          <Link href="/hoe" className="btn-primary">
            Bekijk samenwerkingsvormen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {servicesContent.sections.map((section) => {
            const art = serviceIllustrationById[section.id];

            return (
              <article
                key={section.id}
                className="rounded-[1.3rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--ink-200)] bg-[var(--paper-100)]">
                  <Image
                    src={art.src}
                    alt={art.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-4"
                  />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                  {section.title}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--ink-900)]">
                  {section.subtitle}
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-700)]">
                  {section.summary}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--ink-700)]">
                  {section.contribution.slice(0, 2).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-500)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell p-6 sm:p-8" style={homeSectionThemes.profile}>
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-[var(--ink-200)] bg-[radial-gradient(circle_at_top,_rgba(171,69,63,0.16),_transparent_42%),linear-gradient(145deg,_#f5f1ea,_#ebe4d8)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(66,89,115,0.12),transparent_22%),radial-gradient(circle_at_18%_88%,rgba(171,69,63,0.14),transparent_26%)]" />
            <Image
              src="/media/paul-ter-linden-portrait.jpeg"
              alt="Portret van Paul ter Linden"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain object-bottom p-5"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="eyebrow">Paul / Profiel</p>
              <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
                Ik combineer strategische scherpte met werkbare verandering
              </h2>
              <p className="max-w-2xl text-[var(--ink-700)]">
                Na 14 jaar McKinsey en leidinggevende rollen in het bedrijfsleven werk ik sinds 2010 zelfstandig als coach, teambegeleider en adviseur voor professional service firms.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {profileHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.2rem] border border-[var(--ink-200)] bg-white/94 p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent-600)]">
                    Profiel
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--ink-900)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ink-700)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/paul" className="btn-primary">
                Lees meer over mij
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={settings.ctaHref || primaryCtaHref}
                className="btn-motion inline-flex items-center gap-2 rounded-full border border-[var(--ink-300)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
              >
                {primaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactStrip settings={settings} />
    </div>
  );
}
