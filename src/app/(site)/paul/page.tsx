import { Briefcase, UserRound } from "lucide-react";
import Image from "next/image";

import { ContactStrip } from "@/components/contact-strip";
import { createPageMetadata } from "@/lib/metadata";
import { getAboutPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

export async function generateMetadata() {
  const content = await getAboutPage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/paul",
  });
}

export default async function AboutPage() {
  const [content, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-surface space-y-4 rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <p className="eyebrow">Paul</p>
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
          <UserRound className="h-4 w-4 text-[var(--accent-500)]" />
          Achtergrond en werkwijze
        </p>
        <h1 className="font-display text-4xl text-[var(--ink-900)]">{content.introTitle}</h1>
        <p className="max-w-3xl text-[var(--ink-700)]">{content.introBody}</p>
      </section>

      <section className="shader-elevated overflow-hidden rounded-2xl border border-[var(--ink-300)] bg-white p-5 shadow-sm sm:p-7">
        <div className="grid items-end gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 space-y-4 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">Paul ter Linden</p>
            <h2 className="font-display text-3xl leading-tight text-[var(--ink-900)]">Strategisch adviseur en sparringpartner voor bestuur en partnerschap</h2>
            <p className="text-[var(--ink-700)]">
              Een combinatie van strategische scherpte, bestuurlijke ervaring en praktische executiekracht voor professional service firms.
            </p>
            <p className="text-sm text-[var(--ink-700)]">
              Toegankelijk, analytisch en direct. Gericht op heldere keuzes en duurzame beweging in bestuur, teams en samenwerking.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative isolate overflow-hidden rounded-[1.4rem] border border-[var(--ink-200)] bg-gradient-to-br from-[var(--paper-200)] via-[#f4f2ec] to-[#e8e3da] p-4 sm:p-5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--accent-500)]/15 blur-2xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[var(--ink-700)]/12 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/45">
                <Image
                  src="/media/paul-ter-linden-full.jpeg"
                  alt="Paul ter Linden portret met armen over elkaar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-contain object-bottom drop-shadow-[0_24px_42px_rgba(18,28,45,0.22)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {content.timeline.map((item) => (
          <article key={item.period} className="shader-surface hover-lift rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-600)]">
              <Briefcase className="mr-1 inline h-3.5 w-3.5" />
              {item.period}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-3xl text-[var(--ink-900)]">Manier van werken</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.stylePillars.map((pillar, index) => (
            <article key={pillar.title} className="hover-lift rounded-lg border border-[var(--ink-200)] p-4">
              <h3 className="text-lg font-semibold text-[var(--ink-900)]">{pillar.title}</h3>
              <p className="mt-2 text-sm text-[var(--ink-700)]">{pillar.body}</p>
              <div className="mt-3 h-1.5 w-12 rounded-full bg-[var(--accent-500)]/70" style={{ opacity: 0.5 + index * 0.1 }} />
            </article>
          ))}
        </div>
      </section>

      <ContactStrip settings={settings} />
    </div>
  );
}
