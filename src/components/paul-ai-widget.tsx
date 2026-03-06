"use client";

import {
  Bot,
  Loader2,
  MessageCircle,
  SendHorizontal,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

import { AviMascot } from "@/components/avi-mascot";
import { ChatMarkdown } from "@/components/chat-markdown";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const quickPrompts = [
  "Ik begin als managing partner. Wat moet ik eerst aanpakken?",
  "Ons partnerteam functioneert niet als geheel. Waar starten we?",
];

const avatarSrc =
  process.env.NEXT_PUBLIC_PAUL_LINKEDIN_IMAGE_URL?.trim() || "/paul-ai-avatar.jpeg";

export function PaulAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Welkom, ik ben Paul AI. Stel je vraag over bestuur, teams of leiderschap. Ik geef je een praktisch antwoord met een concrete gesprekstarter.",
    },
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [mode, setMode] = useState<"live" | "fallback" | null>(null);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isOpen, messages, status]);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

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
    <div className="pointer-events-none fixed bottom-24 right-4 z-[70] flex w-[min(25rem,calc(100vw-2rem))] flex-col items-end gap-3 sm:bottom-24 sm:right-6 lg:bottom-6">
      {isOpen ? (
        <section className="shader-elevated pointer-events-auto animate-fade-up overflow-hidden rounded-2xl border border-[var(--ink-300)] bg-[var(--paper-100)] shadow-[0_18px_45px_rgba(18,28,45,0.25)]">
          <header className="shader-ink flex items-center gap-3 border-b border-white/10 bg-[var(--ink-950)] px-4 py-3 text-white">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/35">
              <Image src={avatarSrc} alt="Paul ter Linden" fill sizes="40px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Paul AI</p>
              <p className="truncate text-xs text-white/75">Sparringpartner voor bestuur en teams</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-white/20 p-1.5 text-white/90 transition hover:bg-white/10"
              aria-label="Sluit Paul AI chat"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={listRef} className="max-h-[19rem] space-y-2 overflow-y-auto bg-white/80 p-3">
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`max-w-[92%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "self-start border border-[var(--ink-200)] bg-[var(--paper-100)] text-[var(--ink-800)]"
                    : "ml-auto bg-[var(--ink-900)] text-white"
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
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--ink-200)] bg-[var(--paper-100)] px-3 py-2 text-sm text-[var(--ink-700)]">
                <Loader2 className="h-4 w-4 animate-spin" />
                Paul AI denkt mee...
              </div>
            ) : null}
          </div>

          <div className="space-y-3 p-3">
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  disabled={status === "loading"}
                  className="rounded-md border border-[var(--ink-300)] bg-white px-2.5 py-1 text-xs font-semibold text-[var(--ink-800)] transition hover:bg-[var(--paper-200)] disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form className="grid gap-2" onSubmit={onSubmit}>
              <label htmlFor="paul-ai-widget-input" className="sr-only">
                Typ je vraag aan Paul AI
              </label>
              <textarea
                id="paul-ai-widget-input"
                rows={2}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Stel je vraag..."
                className="rounded-lg border border-[var(--ink-300)] bg-white px-3 py-2 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--ink-600)] focus:ring-2 focus:ring-[var(--ink-200)]"
              />
              <div className="flex items-center justify-between gap-2">
                <button
                  type="submit"
                  disabled={status === "loading" || input.trim().length < 4}
                  className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--accent-500)] px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-65"
                >
                  <SendHorizontal className="h-4 w-4" />
                  Verstuur
                </button>
                <Link href="/contact" className="text-xs font-semibold text-[var(--ink-700)] underline-offset-2 hover:underline">
                  Plan gesprek
                </Link>
              </div>
            </form>

            {mode === "fallback" ? (
              <p className="text-xs text-[var(--ink-600)]">Ingebouwde kennismodus actief.</p>
            ) : null}
            {error ? <p className="text-xs text-[var(--accent-600)]">{error}</p> : null}
            <div className="flex items-center gap-2 rounded-md border border-[var(--ink-200)] bg-white/85 px-2 py-1.5 text-[11px] text-[var(--ink-700)]">
              <AviMascot size="xs" />
              <p>
                Powered by <span className="font-semibold text-[var(--ink-900)]">Avi</span> by{" "}
                <a
                  href="https://avoraz.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-[var(--ink-900)] underline underline-offset-2"
                >
                  avoraz.com
                </a>
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="pointer-events-auto group relative overflow-hidden rounded-full border border-white/40 bg-[var(--ink-950)] p-1 shadow-[0_14px_30px_rgba(18,28,45,0.34)] transition hover:-translate-y-0.5"
        aria-label={isOpen ? "Sluit Paul AI" : "Open Paul AI chat"}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--accent-400)]/45 ring-offset-2 ring-offset-[var(--paper-100)] animate-[portrait-orbit_3.2s_ease-in-out_infinite]" />
        <span className="portrait-shell relative block h-16 w-16 overflow-hidden rounded-full border border-white/35">
          <Image src={avatarSrc} alt="Paul ter Linden" fill sizes="64px" className="object-cover" />
        </span>
        {!isOpen ? (
          <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/60 bg-[var(--accent-500)] text-white shadow-sm">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </button>
    </div>
  );
}
