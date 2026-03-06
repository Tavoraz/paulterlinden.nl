import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: "Privacyverklaring voor paulterlinden.nl.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <article className="shader-elevated space-y-6 rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl text-[var(--ink-900)]">Privacyverklaring</h1>
        <p className="text-[var(--ink-700)]">
          Op deze website worden persoonsgegevens uitsluitend verwerkt voor
          contactverzoeken en verbetering van de websiteprestatie. Gegevens worden
          niet verkocht aan derden.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-[var(--ink-900)]">Welke gegevens</h2>
          <p className="mt-2 text-[var(--ink-700)]">
            Via het contactformulier kunnen naam, e-mail, organisatie, rol en
            bericht worden verwerkt. Deze gegevens worden alleen gebruikt om op je
            aanvraag te reageren.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--ink-900)]">Bewaartermijn</h2>
          <p className="mt-2 text-[var(--ink-700)]">
            Contactgegevens worden niet langer bewaard dan nodig is voor opvolging
            van het verzoek en normale administratieve afhandeling.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--ink-900)]">Rechten</h2>
          <p className="mt-2 text-[var(--ink-700)]">
            Je kunt verzoeken om inzage, correctie of verwijdering via
            contact@paulterlinden.nl.
          </p>
        </section>
      </article>
    </div>
  );
}
