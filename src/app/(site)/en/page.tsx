import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "English version coming soon",
  description: "The English version of paulterlinden.nl is currently in preparation.",
  path: "/en",
  noindex: true,
});

export default function EnglishPlaceholderPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="shader-elevated rounded-xl border border-[var(--ink-300)] bg-white p-8 shadow-sm">
        <p className="eyebrow">EN</p>
        <h1 className="mt-2 font-display text-4xl text-[var(--ink-900)]">
          English version in preparation
        </h1>
        <p className="mt-4 text-[var(--ink-700)]">
          The Dutch website is live first. The full English version will follow in
          phase two.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-md bg-[var(--ink-900)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--ink-800)]"
        >
          Contact
        </Link>
      </section>
    </div>
  );
}
