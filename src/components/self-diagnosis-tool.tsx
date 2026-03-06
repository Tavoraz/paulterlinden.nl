"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChartLine,
  ClipboardList,
  Compass,
  Copy,
  MessageSquareMore,
  Radar,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

interface Dimension {
  id: string;
  title: string;
  prompt: string;
}

interface Question {
  id: string;
  dimensionId: string;
  question: string;
  whyItMatters: string;
}

interface ScoreBand {
  label: string;
  tone: string;
  guidance: string;
}

const dimensions: Dimension[] = [
  {
    id: "mandate",
    title: "Mandaat en gezag",
    prompt: "Waar is je mandaat expliciet sterk, en waar nog stilzwijgend fragiel?",
  },
  {
    id: "strategy",
    title: "Strategie en prioriteiten",
    prompt: "Welke drie keuzes kun je de komende 90 dagen niet uitstellen?",
  },
  {
    id: "board-team",
    title: "Bestuur als team",
    prompt: "Welke afspraak in het bestuur voorkomt terugval naar ad-hocsturing?",
  },
  {
    id: "commercial",
    title: "Commerciele regie",
    prompt: "Waar verlies je nu commerciele kansen door gebrek aan gezamenlijke aanpak?",
  },
  {
    id: "talent",
    title: "Talent en opvolging",
    prompt: "Welke twee sleutelpersonen vragen nu actief ontwikkel- of retentiebeleid?",
  },
  {
    id: "execution",
    title: "Uitvoering en ritme",
    prompt: "Welke ritmes (review, besluitvorming, opvolging) moeten meteen strakker?",
  },
];

const questions: Question[] = [
  {
    id: "q-mandate-1",
    dimensionId: "mandate",
    question:
      "Ik kan als nieuwe managing partner richting geven zonder direct weerstand op kernbesluiten.",
    whyItMatters: "Snelle legitimiteit voorkomt bestuurlijke vertraging in de startfase.",
  },
  {
    id: "q-mandate-2",
    dimensionId: "mandate",
    question:
      "Ik kan spanning tussen partnerautonomie en collectief belang bespreekbaar maken.",
    whyItMatters: "Dit bepaalt of je met invloed of met frictie bestuurt.",
  },
  {
    id: "q-strategy-1",
    dimensionId: "strategy",
    question:
      "De kantoorstrategie is scherp genoeg om keuzes over focus, capaciteit en investeringen te sturen.",
    whyItMatters: "Zonder heldere focus blijft prioritering politiek in plaats van zakelijk.",
  },
  {
    id: "q-board-1",
    dimensionId: "board-team",
    question:
      "Binnen het bestuur zijn rollen, besluitregels en onderlinge verwachtingen expliciet en werkbaar.",
    whyItMatters: "Onuitgesproken rolverwachtingen ondermijnen uitvoering.",
  },
  {
    id: "q-board-2",
    dimensionId: "board-team",
    question:
      "We kunnen in het bestuur stevig van mening verschillen zonder relationele schade.",
    whyItMatters: "Strategische kwaliteit vraagt frictie met vertrouwen.",
  },
  {
    id: "q-commercial-1",
    dimensionId: "commercial",
    question:
      "Het kantoor werkt aantoonbaar als een firma richting key clients en business development.",
    whyItMatters: "Collectieve commerciele slagkracht moet georganiseerd worden, niet gehoopt.",
  },
  {
    id: "q-commercial-2",
    dimensionId: "commercial",
    question:
      "Ik heb zicht op welke toekomstige vaardigheden nodig zijn om opdrachten van morgen te winnen.",
    whyItMatters: "Vandaag sturen op toekomstige relevantie voorkomt latere inhaalstress.",
  },
  {
    id: "q-talent-1",
    dimensionId: "talent",
    question:
      "Er is een duidelijke aanpak voor doorstroom naar partnerrollen en behoud van seniors.",
    whyItMatters: "Zonder talentpijplijn ontstaat bestuurlijke druk op continuiteit.",
  },
  {
    id: "q-execution-1",
    dimensionId: "execution",
    question:
      "Besluiten worden consequent opgevolgd met eigenaarschap, ritme en zichtbare voortgang.",
    whyItMatters: "Executiediscipline bepaalt of strategie echt landt.",
  },
  {
    id: "q-execution-2",
    dimensionId: "execution",
    question:
      "Ik kan werkdruk, teamveiligheid en performance tegelijk op tafel leggen en bijsturen.",
    whyItMatters: "Duurzame prestaties vereisen balans tussen uitdaging en steun.",
  },
];

const options = [
  { value: 0, label: "Nog niet", hint: "nauwelijks zichtbaar" },
  { value: 1, label: "Deels", hint: "wisselend of incidenteel" },
  { value: 2, label: "Grotendeels", hint: "redelijk consistent" },
  { value: 3, label: "Sterk", hint: "duidelijk en structureel" },
] as const;

const firstStepByDimension: Record<string, string> = {
  mandate:
    "Maak expliciet welke beslissingen jij zelfstandig neemt en waar collectieve afstemming nodig is.",
  strategy:
    "Beperk de komende 90 dagen tot drie strategische prioriteiten met heldere eigenaarschapstoedeling.",
  "board-team":
    "Leg een bestuurlijk werkritme vast: besluitmomenten, escalatieregels en terugkoppeling.",
  commercial:
    "Kies een beperkt aantal key clients waar het kantoor zichtbaar als firma optreedt.",
  talent:
    "Identificeer twee sleutelrollen waar direct ontwikkel- of opvolgingsbeleid nodig is.",
  execution:
    "Voer een strak opvolgritme in met wekelijkse voortgang op besluiten en actiepunten.",
};

function getScoreBand(score: number): ScoreBand {
  if (score < 35) {
    return {
      label: "Kritieke startfase",
      tone: "bg-[var(--accent-600)]/15 text-[var(--accent-600)]",
      guidance:
        "Je start vraagt snelle bestuurlijke scherpte. Kies direct een beperkt aantal hefbomen voor de eerste 90 dagen.",
    };
  }

  if (score < 60) {
    return {
      label: "Werkbare basis, maar kwetsbaar",
      tone: "bg-amber-100 text-amber-800",
      guidance:
        "Er is fundament, maar te veel onderdelen hangen af van individuen. Maak afspraken expliciet en toetsbaar.",
    };
  }

  if (score < 80) {
    return {
      label: "Goede basis voor versnelling",
      tone: "bg-emerald-100 text-emerald-800",
      guidance:
        "Je hebt tractie. Nu kun je gerichter versnellen op de thema's met het grootste strategische effect.",
    };
  }

  return {
    label: "Sterk startprofiel",
    tone: "bg-[var(--ink-900)]/10 text-[var(--ink-900)]",
    guidance:
      "Je bestuurlijke basis is sterk. Focus op het borgen van ritme en het ontwikkelen van de volgende leiderslaag.",
  };
}

export function SelfDiagnosisTool() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "done" | "error">("idle");

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const completionPercent = Math.round((answeredCount / totalQuestions) * 100);

  const overallScore = useMemo(() => {
    if (answeredCount === 0) {
      return 0;
    }

    const total = questions.reduce((sum, question) => {
      const value = answers[question.id];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);

    return Math.round((total / (totalQuestions * 3)) * 100);
  }, [answers, answeredCount, totalQuestions]);

  const scoresByDimension = useMemo(() => {
    return dimensions.map((dimension) => {
      const relatedQuestions = questions.filter(
        (question) => question.dimensionId === dimension.id,
      );
      const answeredValues = relatedQuestions
        .map((question) => answers[question.id])
        .filter((value): value is number => typeof value === "number");

      if (answeredValues.length === 0) {
        return {
          ...dimension,
          score: 0,
          complete: false,
        };
      }

      const average =
        answeredValues.reduce((sum, value) => sum + value, 0) /
        answeredValues.length;

      return {
        ...dimension,
        score: Math.round((average / 3) * 100),
        complete: answeredValues.length === relatedQuestions.length,
      };
    });
  }, [answers]);

  const weakestThemes = useMemo(() => {
    return [...scoresByDimension]
      .sort((left, right) => left.score - right.score)
      .slice(0, 3);
  }, [scoresByDimension]);
  const suggestedFirstSteps = useMemo(() => {
    return weakestThemes
      .slice(0, 2)
      .map((theme) => firstStepByDimension[theme.id])
      .filter(Boolean);
  }, [weakestThemes]);

  const scoreBand = getScoreBand(overallScore);
  const canShowResult = submitted && answeredCount === totalQuestions;
  const conversationStarterText = useMemo(() => {
    return [
      "Zelfdiagnose: eerste keer managing partner",
      `Totale score: ${overallScore}/100 (${scoreBand.label})`,
      "",
      "Gespreksstarters (laagste thema's):",
      ...weakestThemes.map((theme, index) =>
        `${index + 1}. ${theme.title} (${theme.score}/100) - ${theme.prompt}`,
      ),
    ].join("\n");
  }, [overallScore, scoreBand.label, weakestThemes]);
  const contactHref = useMemo(() => {
    const params = new URLSearchParams({
      from: "zelfdiagnose",
      intake: conversationStarterText,
    });
    return `/contact?${params.toString()}`;
  }, [conversationStarterText]);

  async function copyConversationStarter() {
    try {
      await navigator.clipboard.writeText(conversationStarterText);
      setCopyState("done");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="space-y-8">
      <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm sm:p-8">
        <p className="eyebrow">Case</p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
          <Compass className="icon-pulse h-4 w-4 text-[var(--accent-500)]" />
          Leiderschapstransitie
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--ink-900)]">
          Je wordt voor het eerst managing partner van een kantoor
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--ink-700)]">
          Deze zelfdiagnose helpt je snel zien waar je al stevig staat en waar
          je bestuurlijke risico&apos;s loopt. Gebruik de uitkomst als
          gesprekstarter voor een eerste verkenning.
        </p>
      </section>

      <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-800)]">
            <ClipboardList className="h-4 w-4 text-[var(--accent-500)]" />
            Voortgang: {answeredCount}/{totalQuestions} vragen ({completionPercent}%)
          </p>
          <div className="h-2 w-full rounded-full bg-[var(--paper-200)] sm:w-64">
            <div
              className="h-2 rounded-full bg-[var(--ink-800)] transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-5">
          {questions.map((question, index) => (
            <fieldset
              key={question.id}
              className="hover-lift rounded-lg border border-[var(--ink-200)] p-4"
            >
              <legend className="w-full text-sm font-semibold text-[var(--ink-900)]">
                {index + 1}. {question.question}
              </legend>
              <p className="mt-2 text-xs text-[var(--ink-600)]">{question.whyItMatters}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {options.map((option) => {
                  const inputId = `${question.id}-${option.value}`;
                  const selected = answers[question.id] === option.value;

                  return (
                    <label
                      key={option.value}
                      htmlFor={inputId}
                      className={`cursor-pointer rounded-md border p-3 text-sm transition ${
                        selected
                          ? "border-[var(--ink-800)] bg-[var(--ink-900)] text-white"
                          : "border-[var(--ink-300)] bg-white text-[var(--ink-800)] hover:bg-[var(--paper-200)]"
                      }`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={selected}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option.value,
                          }))
                        }
                        className="sr-only"
                      />
                      <span className="block font-semibold">{option.label}</span>
                      <span
                        className={`block text-xs ${
                          selected ? "text-white/95" : "text-[var(--ink-600)]"
                        }`}
                      >
                        {option.hint}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--ink-900)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--ink-800)]"
          >
            <Radar className="h-4 w-4" />
            Toon uitslag
          </button>
          {submitted && answeredCount < totalQuestions ? (
            <p className="text-sm text-[var(--accent-600)]">
              Beantwoord alle vragen om een volledige uitslag te krijgen.
            </p>
          ) : null}
        </div>
      </section>

      {canShowResult ? (
        <section className="shader-surface space-y-6 rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Uitslag</p>
              <h2 className="mt-2 inline-flex items-center gap-2 font-display text-3xl text-[var(--ink-900)]">
                <ChartLine className="h-6 w-6 text-[var(--accent-500)]" />
                {overallScore}/100 - {scoreBand.label}
              </h2>
              <p className="mt-2 max-w-3xl text-[var(--ink-700)]">{scoreBand.guidance}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreBand.tone}`}>
              Startprofiel
            </span>
          </div>

          <div className="grid gap-3">
            {scoresByDimension.map((dimension) => (
              <div key={dimension.id} className="hover-lift rounded-lg border border-[var(--ink-200)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--ink-900)]">
                    {dimension.title}
                  </p>
                  <p className="text-sm font-semibold text-[var(--ink-700)]">
                    {dimension.score}/100
                  </p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[var(--paper-200)]">
                  <div
                    className="h-2 rounded-full bg-[var(--ink-700)]"
                    style={{ width: `${dimension.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-[var(--ink-300)] bg-[var(--paper-200)] p-4">
            <h3 className="inline-flex items-center gap-2 font-display text-2xl text-[var(--ink-900)]">
              <MessageSquareMore className="h-5 w-5 text-[var(--accent-500)]" />
              Gesprekstarter voor een eerste sessie
            </h3>
            <p className="mt-2 text-sm text-[var(--ink-700)]">
              Gebruik onderstaande thema&apos;s als agenda voor een eerste gesprek.
            </p>
            <ol className="mt-4 space-y-3 text-sm text-[var(--ink-800)]">
              {weakestThemes.map((theme, index) => (
                <li key={theme.id} className="hover-lift rounded-md bg-white p-3">
                  <p className="font-semibold">
                    {index + 1}. {theme.title} ({theme.score}/100)
                  </p>
                  <p className="mt-1 text-[var(--ink-700)]">{theme.prompt}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-[var(--ink-300)] bg-white p-4">
            <h3 className="text-lg font-semibold text-[var(--ink-900)]">Aanbevolen eerste focus</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-700)]">
              {suggestedFirstSteps.map((step) => (
                <li key={step} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-500)]" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={contactHref}
              className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--accent-500)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-600)]"
            >
              <Sparkles className="h-4 w-4" />
              Plan kennismaking met uitslag
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={copyConversationStarter}
              className="btn-motion inline-flex items-center gap-2 rounded-md border border-[var(--ink-300)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ink-900)] hover:bg-[var(--paper-200)]"
            >
              <Copy className="h-4 w-4 text-[var(--ink-700)]" />
              Kopieer gesprekstarter
            </button>
            {copyState === "done" ? (
              <p className="text-sm text-emerald-700">Samenvatting gekopieerd.</p>
            ) : null}
            {copyState === "error" ? (
              <p className="text-sm text-[var(--accent-600)]">
                Kopieren lukte niet. Selecteer handmatig de tekst.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
