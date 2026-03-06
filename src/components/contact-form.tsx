"use client";

import { FormEvent, useState } from "react";

import type { ContactFormPayload, ContactFormResult } from "@/lib/types";

const initialState: ContactFormPayload = {
  name: "",
  email: "",
  organization: "",
  role: "",
  message: "",
  consent: false,
  honeypot: "",
  locale: "nl",
};

interface ContactFormProps {
  initialFrom?: string;
  initialIntake?: string;
}

export function ContactForm({ initialFrom, initialIntake }: ContactFormProps) {
  const fromSource = initialFrom;
  const intakeSummary = initialIntake?.trim()?.slice(0, 2400) ?? "";
  const [form, setForm] = useState(initialState);
  const [messageTouched, setMessageTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    const payload: ContactFormPayload = {
      ...form,
      message: form.message.trim().length > 0 ? form.message : intakeSummary,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactFormResult;

      if (!response.ok || !result.ok) {
        setStatus("error");
        setFeedback(result.message || "Er ging iets mis bij het verzenden.");
        return;
      }

      setStatus("success");
      setFeedback(result.message);
      setForm(initialState);
      setMessageTouched(false);
    } catch {
      setStatus("error");
      setFeedback("Verzenden lukt nu niet. Probeer het later opnieuw.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      {fromSource === "zelfdiagnose" && intakeSummary ? (
        <p className="rounded-md border border-[var(--ink-300)] bg-[var(--paper-200)] px-3 py-2 text-sm text-[var(--ink-700)]">
          Je zelfdiagnose-uitkomst staat alvast in het berichtveld. Vul aan wat je
          in een kennismaking wilt bespreken.
        </p>
      ) : null}

      <div className="grid gap-1">
        <label className="text-sm font-semibold text-[var(--ink-900)]" htmlFor="name">
          Naam
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="rounded-md border border-[var(--ink-300)] bg-white px-3 py-2 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--ink-600)] focus:ring-2 focus:ring-[var(--ink-200)]"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-semibold text-[var(--ink-900)]" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="rounded-md border border-[var(--ink-300)] bg-white px-3 py-2 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--ink-600)] focus:ring-2 focus:ring-[var(--ink-200)]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-[var(--ink-900)]" htmlFor="organization">
            Organisatie
          </label>
          <input
            id="organization"
            value={form.organization}
            onChange={(event) =>
              setForm((current) => ({ ...current, organization: event.target.value }))
            }
            className="rounded-md border border-[var(--ink-300)] bg-white px-3 py-2 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--ink-600)] focus:ring-2 focus:ring-[var(--ink-200)]"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-[var(--ink-900)]" htmlFor="role">
            Rol
          </label>
          <input
            id="role"
            value={form.role}
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            className="rounded-md border border-[var(--ink-300)] bg-white px-3 py-2 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--ink-600)] focus:ring-2 focus:ring-[var(--ink-200)]"
          />
        </div>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-semibold text-[var(--ink-900)]" htmlFor="message">
          Bericht
        </label>
        <textarea
          id="message"
          rows={6}
          required
          value={messageTouched ? form.message : form.message || intakeSummary}
          onChange={(event) => {
            setMessageTouched(true);
            setForm((current) => ({ ...current, message: event.target.value }));
          }}
          className="rounded-md border border-[var(--ink-300)] bg-white px-3 py-2 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--ink-600)] focus:ring-2 focus:ring-[var(--ink-200)]"
        />
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={form.honeypot}
        onChange={(event) => setForm((current) => ({ ...current, honeypot: event.target.value }))}
        className="hidden"
        aria-hidden="true"
      />

      <label className="flex items-start gap-3 text-sm text-[var(--ink-700)]">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
          className="mt-1 size-4 rounded border-[var(--ink-300)]"
        />
        <span>
          Ik ga akkoord dat mijn gegevens worden gebruikt om contact met mij op te
          nemen.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-motion inline-flex w-fit items-center rounded-md bg-[var(--ink-900)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Verzenden..." : "Verstuur aanvraag"}
      </button>

      {feedback ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-700" : "text-[var(--accent-600)]"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
