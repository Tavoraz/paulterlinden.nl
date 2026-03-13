import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { createPageMetadata } from "@/lib/metadata";
import { getContactPage, getSiteSettings } from "@/sanity/lib/loaders";

export const revalidate = 120;

export async function generateMetadata() {
  const content = await getContactPage();

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/contact",
  });
}

interface ContactPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [content, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);
  const params = await searchParams;
  const from =
    typeof params.from === "string"
      ? params.from
      : Array.isArray(params.from)
        ? params.from[0]
        : undefined;
  const intakeRaw =
    typeof params.intake === "string"
      ? params.intake
      : Array.isArray(params.intake)
        ? params.intake[0]
        : undefined;

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
      <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <p className="eyebrow">Contact</p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
          <Building2 className="h-4 w-4 text-[var(--accent-500)]" />
          Directe kennismaking
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--ink-900)]">{content.introTitle}</h1>
        <p className="mt-3 max-w-2xl text-[var(--ink-700)]">{content.introBody}</p>
        <p className="mt-3 text-sm text-[var(--ink-600)]">{content.responseExpectation}</p>

        <div className="mt-8">
          <ContactForm initialFrom={from} initialIntake={intakeRaw} />
        </div>
      </section>

      <aside className="space-y-4">
        <section className="shader-elevated rounded-xl border border-[var(--ink-300)] bg-white p-4 shadow-sm sm:p-5">
          <div className="relative mx-auto w-full max-w-[330px]">
            <div className="pointer-events-none absolute -inset-2 rounded-[1.65rem] bg-gradient-to-br from-[var(--accent-500)]/25 to-[var(--ink-700)]/30 blur-xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-white/80 bg-gradient-to-br from-[var(--paper-100)] to-[var(--paper-300)] p-2 shadow-[0_20px_40px_rgba(18,28,45,0.16)]">
              <div className="relative h-full w-full overflow-hidden rounded-[1rem]">
                <Image
                  src="/media/paul-ter-linden-portrait.jpeg"
                  alt="Paul ter Linden portret"
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover object-[50%_16%]"
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--ink-700)]">
            Plan een gesprek met Paul ter Linden voor een eerste verkenning van jouw vraagstuk.
          </p>
        </section>

        <section className="shader-surface hover-lift rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm">
          <h2 className="font-display text-2xl text-[var(--ink-900)]">Direct contact</h2>
          <div className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
            <p>
              <Mail className="mr-1 inline h-4 w-4 text-[var(--accent-500)]" />
              E-mail: <a className="font-semibold" href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>
            <p>
              <Phone className="mr-1 inline h-4 w-4 text-[var(--accent-500)]" />
              Telefoon: <a className="font-semibold" href={`tel:${settings.phone}`}>{settings.phone}</a>
            </p>
          </div>
        </section>

        <section className="shader-accent hover-lift rounded-xl border border-[var(--ink-300)] bg-[var(--paper-200)] p-6">
          <h2 className="font-display text-2xl text-[var(--ink-900)]">Werkgebied</h2>
          <p className="mt-3 text-sm text-[var(--ink-700)]">
            <MapPin className="mr-1 inline h-4 w-4 text-[var(--accent-500)]" />
            Standplaats Amsterdam. Afspraken kunnen op locatie, online of op een
            externe vergaderplek plaatsvinden.
          </p>
        </section>
      </aside>
    </div>
  );
}
