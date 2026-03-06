import {
  ArrowRight,
  BriefcaseBusiness,
  Compass,
  TimerReset,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ContactStrip } from "@/components/contact-strip";
import {
  audienceIconMap,
  defaultAccentIcon,
  serviceIconMap,
  successFactorIconMap,
} from "@/lib/icon-map";
import { createPageMetadata } from "@/lib/metadata";
import { getHomePage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

export async function generateMetadata() {
  const content = await getHomePage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/",
  });
}

export default async function HomePage() {
  const [content, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  const credibilityHighlights = [
    {
      title: "14 jaar McKinsey",
      body: "Stevige basis in probleemstructurering, strategie en clientwerk.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Sinds 2010 zelfstandig",
      body: "Lange praktijkervaring in coaching, teambegeleiding en bestuursadvies.",
      icon: TimerReset,
    },
    {
      title: "PSF-focus",
      body: "Dagelijkse realiteit van partners, directies en professionals als vertrekpunt.",
      icon: UserCheck,
    },
  ];
  const lineArtIcons = [
    {
      src: "/media/icons-line/board-meeting.png",
      alt: "Illustratie van overleg aan bestuurstafel",
      title: "Bestuurlijk overleg",
    },
    {
      src: "/media/icons-line/group-professionals.png",
      alt: "Illustratie van groep professionals",
      title: "Partners en professionals",
    },
    {
      src: "/media/icons-line/presenting-chart.png",
      alt: "Illustratie van presenteren bij grafiek",
      title: "Strategie en resultaat",
    },
    {
      src: "/media/icons-line/thinking-coffee.png",
      alt: "Illustratie van reflectie met koffie",
      title: "Reflectie en coaching",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-ink overflow-hidden rounded-2xl border border-[var(--ink-800)] bg-[var(--ink-950)] p-8 text-white shadow-2xl sm:p-12">
        <div className="hero-cycle absolute inset-0">
          <Image
            src="/media/hero-amstel-1.png"
            alt="Amsterdam skyline aan het water"
            fill
            priority
            sizes="100vw"
            className="hero-frame hero-frame--a object-cover object-center"
          />
          <Image
            src="/media/hero-amstel-2.png"
            alt="Amsterdam Amstel met passerende boot"
            fill
            priority
            sizes="100vw"
            className="hero-frame hero-frame--b object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(104deg,rgba(18,28,45,0.84)_0%,rgba(18,28,45,0.62)_42%,rgba(18,28,45,0.72)_100%)]" />
        </div>
        <div className="animate-fade-up relative z-[2] max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--paper-300)]">
            Paul ter Linden
          </p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            {content.heroTitle}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--paper-200)]">
            {content.heroSubtitle}
          </p>
          <p className="max-w-3xl text-[var(--paper-100)]/85">{content.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--accent-500)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-600)]"
            >
              Plan een kennismaking
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/wat"
              className="btn-motion rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Bekijk werkwijze en aanbod
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {credibilityHighlights.map((item, index) => (
          <article
            key={item.title}
            className="shader-surface hover-lift animate-fade-up rounded-xl border border-[var(--ink-300)] bg-white p-5 shadow-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-600)]">
              <item.icon className="h-4 w-4" />
              Profiel
            </p>
            <h2 className="mt-2 text-lg font-semibold text-[var(--ink-900)]">{item.title}</h2>
            <p className="mt-2 text-sm text-[var(--ink-700)]">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">In beeld</p>
          <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
            Typische contexten en vraagstukken
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lineArtIcons.map((item, index) => (
            <article
              key={item.src}
              className="shader-elevated hover-lift animate-fade-up rounded-xl border border-[var(--ink-300)] bg-white p-4 shadow-sm"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--ink-200)] bg-[var(--paper-100)]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-3"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-[var(--ink-900)]">{item.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">Vijf succesfactoren</p>
          <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
            Focus op wat bestuurlijk het verschil maakt
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.successFactors.map((factor, index) => {
            const FactorIcon = successFactorIconMap[factor.title] ?? defaultAccentIcon;

            return (
              <article
                key={factor.title}
                className="shader-surface hover-lift animate-fade-up rounded-xl border border-[var(--ink-300)] bg-white p-5 shadow-sm"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
                  <FactorIcon className="icon-pulse h-4 w-4" />
                  {factor.title}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--ink-900)]">
                  {factor.challenge}
                </h3>
                <p className="mt-1 text-sm text-[var(--ink-700)]">{factor.assignment}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--ink-700)]">
                  {factor.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--ink-600)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">Voor wie</p>
          <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
            Sleutelfiguren in professional service firms
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {content.audiencePreview.map((audience) => {
            const AudienceIcon = audienceIconMap[audience.title] ?? defaultAccentIcon;

            return (
              <article
                key={audience.title}
                className="shader-surface hover-lift rounded-xl border border-[var(--ink-300)] bg-[var(--paper-200)] p-5"
              >
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-700)]">
                  <AudienceIcon className="h-4 w-4 text-[var(--accent-500)]" />
                  Doelgroep
                </p>
                <h3 className="text-lg font-semibold text-[var(--ink-900)]">{audience.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-700)]">{audience.challenge}</p>
              </article>
            );
          })}
        </div>
        <Link
          href="/voor-wie"
          className="btn-motion inline-flex rounded-md border border-[var(--ink-300)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
        >
          Bekijk alle doelgroepopgaven
        </Link>
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">Wat</p>
          <h2 className="font-display text-3xl text-[var(--ink-900)] sm:text-4xl">
            Drie vormen van ondersteuning
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.serviceHighlights.map((service) => {
            const ServiceIcon = serviceIconMap[service.id] ?? defaultAccentIcon;

            return (
              <article key={service.id} className="shader-surface hover-lift rounded-xl border border-[var(--ink-300)] bg-white p-5">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-700)]">
                  <ServiceIcon className="h-4 w-4 text-[var(--accent-500)]" />
                  Dienst
                </p>
                <h3 className="text-lg font-semibold text-[var(--ink-900)]">{service.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-700)]">{service.body}</p>
                <Link
                  href={`/wat#${service.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink-800)] underline decoration-[var(--accent-500)] underline-offset-4"
                >
                  Lees meer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="shader-surface grid gap-6 rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm lg:grid-cols-[2fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">Paul</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--ink-900)]">Ervaring die richting geeft</h2>
          <p className="mt-3 max-w-2xl text-[var(--ink-700)]">{content.aboutSnippet}</p>
          <Link
            href="/paul"
            className="btn-motion mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--ink-300)] px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-200)]"
          >
            Lees meer over Paul
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="hidden h-40 rounded-lg bg-[radial-gradient(circle_at_top,_var(--accent-400),_transparent_55%),linear-gradient(145deg,_var(--ink-900),_var(--ink-700))] lg:block" />
      </section>

      <section className="editorial-grid shader-surface grid gap-6 rounded-xl border border-[var(--ink-300)] bg-[var(--paper-200)] p-6 shadow-sm lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div className="space-y-3">
          <p className="eyebrow">Zelfdiagnose</p>
          <h2 className="font-display text-3xl text-[var(--ink-900)]">
            Eerste keer managing partner? Start met een scherpe nulmeting
          </h2>
          <p className="max-w-2xl text-[var(--ink-700)]">
            In 5 tot 7 minuten krijg je inzicht in je bestuurlijke startprofiel, inclusief
            gesprekstarters voor een eerste sessie.
          </p>
          <Link
            href="/zelfdiagnose"
            className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--ink-900)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
          >
            <Compass className="h-4 w-4" />
            Start de zelfdiagnose
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/paul-ai"
            className="btn-motion inline-flex items-center gap-2 rounded-md border border-[var(--ink-300)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--paper-100)]"
          >
            Praat met Paul AI
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-xl border border-[var(--ink-300)] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-600)]">
            Verwachte uitkomst
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-500)]" />
              Direct zicht op sterke en kwetsbare bestuurlijke thema&apos;s
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-500)]" />
              Concreet gesprekstartdocument voor de intake
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-500)]" />
              Heldere prioriteiten voor de eerste 90 dagen
            </li>
          </ul>
        </div>
      </section>

      <ContactStrip settings={settings} />
    </div>
  );
}
