"use client";

import { Bot, Loader2, SendHorizontal, Sparkles, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

import { AviMascot } from "@/components/avi-mascot";
import { ChatMarkdown } from "@/components/chat-markdown";
import { primaryCtaLabel } from "@/lib/page-data";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const quickPrompts = [
  "Ik begin als managing partner. Wat moet ik in de eerste 90 dagen prioriteren?",
  "Ons partnerteam werkt niet als een geheel. Waar begin ik?",
  "Hoe combineer ik resultaatdruk en teamveiligheid in mijn praktijk?",
];

const linkedinImageUrl =
  process.env.NEXT_PUBLIC_PAUL_LINKEDIN_IMAGE_URL?.trim() ||
  "/paul-ai-avatar.jpeg";

export function PaulAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Welkom, ik ben Paul AI. Stel je vraag over bestuur, teams of leiderschap in professional service firms. Ik denk praktisch met je mee en sluit af met een gesprekstarter.",
    },
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [mode, setMode] = useState<"live" | "fallback" | null>(null);
  const [error, setError] = useState<string>("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || status === "loading") {
      return;
    }

    const history = messages
      .filter((message) => message.role === "assistant" || message.role === "user")
      .slice(-8);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];

    setMessages(nextMessages);
    setInput("");
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/paul-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        reply?: string;
        mode?: "live" | "fallback";
        message?: string;
      };

      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.message || "Paul AI is tijdelijk niet beschikbaar.");
      }

      setMode(data.mode || null);
      setMessages((current) => [...current, { role: "assistant", content: data.reply || "" }]);
      setStatus("idle");
    } catch (requestError) {
      setStatus("error");
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Er ging iets mis. Probeer het opnieuw.",
      );
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <aside className="shader-elevated rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm">
        <p className="eyebrow">Paul AI</p>
        <h1 className="mt-2 font-display text-3xl text-[var(--ink-900)]">
          Praat met Paul over je vraagstuk
        </h1>
        <p className="mt-3 text-sm text-[var(--ink-700)]">
          Gericht op leiderschap en organisatievraagstukken in professional service firms.
          Zakelijk, scherp en praktisch.
        </p>

        <div className="mt-6 flex items-center gap-4 rounded-lg border border-[var(--ink-300)] bg-[var(--paper-200)] p-4">
          <div className="portrait-shell relative h-20 w-20 shrink-0 rounded-full border border-white/50 bg-white p-1 shadow-sm">
            <span className="portrait-ring absolute inset-0 rounded-full border border-[var(--accent-500)]/40" />
            <Image
              src={linkedinImageUrl}
              alt="Paul ter Linden"
              fill
              sizes="80px"
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--ink-900)]">Paul ter Linden</p>
            <p className="text-xs text-[var(--ink-700)]">
              Gebaseerd op de inhoud, stijl en aanpak van paulterlinden.nl.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm text-[var(--ink-700)]">
          <p className="font-semibold text-[var(--ink-900)]">Waar Paul AI op let:</p>
          <ul className="space-y-1.5">
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-500)]" />
              Strategie, cultuur, commercie, uitvoering en talent
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-500)]" />
              Bestuursadvies eerst, met teambegeleiding/coaching als aanvulling
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-500)]" />
              Concrete gesprekstarters voor een effectieve kennismaking
            </li>
          </ul>
        </div>

        <Link
          href="/contact"
          className="btn-primary mt-6"
        >
          <Sparkles className="h-4 w-4" />
          {primaryCtaLabel}
        </Link>
      </aside>

      <section className="shader-elevated rounded-xl border border-[var(--ink-300)] bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--ink-200)] pb-3">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-900)]">
            <Bot className="h-4 w-4 text-[var(--accent-500)]" />
            Paul AI Chat
          </p>
          {mode === "fallback" ? (
            <span className="rounded-full bg-[var(--paper-200)] px-2.5 py-1 text-xs font-semibold text-[var(--ink-700)]">
              ingebouwde kennismodus
            </span>
          ) : null}
        </div>

        <div ref={listRef} className="mt-4 flex max-h-[28rem] flex-col gap-3 overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <article
              key={`${message.role}-${index}`}
              className={`max-w-[92%] rounded-lg px-3 py-2.5 text-sm leading-relaxed ${
                message.role === "assistant"
                  ? "self-start border border-[var(--ink-200)] bg-[var(--paper-100)] text-[var(--ink-800)]"
                  : "self-end bg-[var(--ink-900)] text-white"
              }`}
            >
              <p className="mb-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] opacity-85">
                {message.role === "assistant" ? (
                  <>
                    <Bot className="h-3.5 w-3.5" />
                    Paul AI
                  </>
                ) : (
                  <>
                    <UserRound className="h-3.5 w-3.5" />
                    Jij
                  </>
                )}
              </p>
              <ChatMarkdown
                content={message.content}
                tone={message.role === "assistant" ? "light" : "dark"}
              />
            </article>
          ))}
          {status === "loading" ? (
            <div className="inline-flex items-center gap-2 self-start rounded-lg border border-[var(--ink-200)] bg-[var(--paper-100)] px-3 py-2 text-sm text-[var(--ink-700)]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Paul AI denkt mee...
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void sendMessage(prompt)}
              className="rounded-md border border-[var(--ink-300)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-800)] transition hover:bg-[var(--paper-200)]"
              disabled={status === "loading"}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
          <label htmlFor="paul-ai-input" className="sr-only">
            Typ je vraag aan Paul AI
          </label>
          <textarea
            id="paul-ai-input"
            rows={3}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Bijvoorbeeld: hoe maak ik mijn bestuur in 90 dagen effectiever?"
            className="rounded-lg border border-[var(--ink-300)] bg-white px-3 py-2 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--ink-600)] focus:ring-2 focus:ring-[var(--ink-200)]"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading" || input.trim().length < 4}
              className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--accent-500)] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-65"
            >
              <SendHorizontal className="h-4 w-4" />
              Verstuur
            </button>
            {error ? <p className="text-sm text-[var(--accent-600)]">{error}</p> : null}
          </div>
        </form>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--ink-200)] bg-[var(--paper-100)] px-2.5 py-2 text-[11px] text-[var(--ink-700)]">
          <AviMascot size="sm" />
          <p>
            Paul AI wordt aangedreven door <span className="font-semibold text-[var(--ink-900)]">Avi</span>, gemaakt door{" "}
            <a
              href="https://avoraz.com"
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-[var(--ink-900)] underline underline-offset-2"
            >
              avoraz.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
