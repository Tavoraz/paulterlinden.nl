import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cookiebeleid",
  description: "Cookiebeleid voor paulterlinden.nl.",
  path: "/cookiebeleid",
});

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <article className="shader-elevated space-y-6 rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl text-[var(--ink-900)]">Cookiebeleid</h1>
        <p className="text-[var(--ink-700)]">
          Deze website gebruikt functionele cookies voor voorkeuren en optioneel
          analytische cookies (Google Analytics 4) na toestemming.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-[var(--ink-900)]">Functionele cookies</h2>
          <p className="mt-2 text-[var(--ink-700)]">
            Functionele cookies onthouden bijvoorbeeld je cookiekeuze zodat de banner
            niet steeds terugkomt.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--ink-900)]">Analytische cookies</h2>
          <p className="mt-2 text-[var(--ink-700)]">
            Na acceptatie wordt GA4 geladen om anonieme statistieken te verzamelen
            over gebruik en prestaties van pagina&apos;s.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--ink-900)]">Voorkeur wijzigen</h2>
          <p className="mt-2 text-[var(--ink-700)]">
            Je kunt cookies verwijderen via je browserinstellingen en daarna op
            deze site opnieuw je voorkeur aangeven.
          </p>
        </section>
      </article>
    </div>
  );
}
