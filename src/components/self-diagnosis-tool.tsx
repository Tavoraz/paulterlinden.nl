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

interface PersonaTest {
  id: string;
  label: string;
  eyebrow: string;
  intro: string;
  dimensions: Dimension[];
  questions: Question[];
  firstStepByDimension: Record<string, string>;
  resultLabel: string;
}

const personaTests: PersonaTest[] = [
  {
    id: "managing-partner",
    label: "Managing partner",
    eyebrow: "Leiderschapstransitie",
    intro:
      "Deze zelfdiagnose helpt je snel zien waar je als managing partner al stevig staat en waar bestuurlijke risico's zitten in de eerste fase van je mandaat.",
    dimensions: [
      { id: "mandate", title: "Mandaat en gezag", prompt: "Waar is je mandaat expliciet sterk, en waar nog stilzwijgend fragiel?" },
      { id: "strategy", title: "Strategie en prioriteiten", prompt: "Welke drie keuzes kun je de komende 90 dagen niet uitstellen?" },
      { id: "board-team", title: "Bestuur als team", prompt: "Welke afspraak in het bestuur voorkomt terugval naar ad-hocsturing?" },
      { id: "commercial", title: "Commerciele regie", prompt: "Waar verlies je nu commerciele kansen door gebrek aan gezamenlijke aanpak?" },
      { id: "talent", title: "Talent en opvolging", prompt: "Welke twee sleutelpersonen vragen nu actief ontwikkel- of retentiebeleid?" },
      { id: "execution", title: "Uitvoering en ritme", prompt: "Welke ritmes moeten meteen strakker om besluiten echt te laten landen?" },
    ],
    questions: [
      { id: "q-mandate-1", dimensionId: "mandate", question: "Ik kan als managing partner richting geven zonder direct weerstand op kernbesluiten.", whyItMatters: "Snelle legitimiteit voorkomt bestuurlijke vertraging in de startfase." },
      { id: "q-mandate-2", dimensionId: "mandate", question: "Ik kan spanning tussen partnerautonomie en collectief belang bespreekbaar maken.", whyItMatters: "Dit bepaalt of je met invloed of met frictie bestuurt." },
      { id: "q-strategy-1", dimensionId: "strategy", question: "De kantoorstrategie is scherp genoeg om keuzes over focus, capaciteit en investeringen te sturen.", whyItMatters: "Zonder heldere focus blijft prioritering politiek in plaats van zakelijk." },
      { id: "q-board-1", dimensionId: "board-team", question: "Binnen het bestuur zijn rollen, besluitregels en onderlinge verwachtingen expliciet en werkbaar.", whyItMatters: "Onuitgesproken rolverwachtingen ondermijnen uitvoering." },
      { id: "q-board-2", dimensionId: "board-team", question: "We kunnen in het bestuur stevig van mening verschillen zonder relationele schade.", whyItMatters: "Strategische kwaliteit vraagt frictie met vertrouwen." },
      { id: "q-commercial-1", dimensionId: "commercial", question: "Het kantoor werkt aantoonbaar als een firma richting key clients en business development.", whyItMatters: "Collectieve commerciele slagkracht moet georganiseerd worden, niet gehoopt." },
      { id: "q-talent-1", dimensionId: "talent", question: "Er is een duidelijke aanpak voor doorstroom naar partnerrollen en behoud van seniors.", whyItMatters: "Zonder talentpijplijn ontstaat bestuurlijke druk op continuiteit." },
      { id: "q-execution-1", dimensionId: "execution", question: "Besluiten worden consequent opgevolgd met eigenaarschap, ritme en zichtbare voortgang.", whyItMatters: "Executiediscipline bepaalt of strategie echt landt." },
    ],
    firstStepByDimension: {
      mandate: "Maak expliciet welke beslissingen jij zelfstandig neemt en waar collectieve afstemming nodig is.",
      strategy: "Beperk de komende 90 dagen tot drie strategische prioriteiten met heldere eigenaarschapstoedeling.",
      "board-team": "Leg een bestuurlijk werkritme vast: besluitmomenten, escalatieregels en terugkoppeling.",
      commercial: "Kies een beperkt aantal key clients waar het kantoor zichtbaar als firma optreedt.",
      talent: "Identificeer twee sleutelrollen waar direct ontwikkel- of opvolgingsbeleid nodig is.",
      execution: "Voer een strak opvolgritme in met wekelijkse voortgang op besluiten en actiepunten.",
    },
    resultLabel: "Startprofiel managing partner",
  },
  {
    id: "kantoordirecteur-coo",
    label: "Kantoordirecteur / COO",
    eyebrow: "Kantoorbasis",
    intro:
      "Deze zelfdiagnose helpt je beoordelen waar de kantoororganisatie al tractie heeft en waar je als COO of kantoordirecteur steviger moet positioneren en verbinden.",
    dimensions: [
      { id: "positioning", title: "Positionering en invloed", prompt: "Waar moet jouw rol explicieter worden gepositioneerd om echt effect te hebben?" },
      { id: "operations", title: "Operationele basis", prompt: "Welke processen of voorzieningen remmen nu direct de kwaliteit van het kantoor?" },
      { id: "governance", title: "Governance en samenwerking", prompt: "Welke bestuurlijke afspraken zijn nodig om sneller van besluit naar uitvoering te gaan?" },
      { id: "change", title: "Verandering en adoptie", prompt: "Waar stokt verandering nu vooral doordat lijn en ondersteuning niet samen optrekken?" },
      { id: "commercial-support", title: "Commerciele ondersteuning", prompt: "Welke ondersteuning moet beter aansluiten op clientontwikkeling en opdrachtwinst?" },
      { id: "people", title: "Mensen en capaciteit", prompt: "Waar is de ondersteunende organisatie nu te kwetsbaar in bezetting of ontwikkeling?" },
    ],
    questions: [
      { id: "q-positioning-1", dimensionId: "positioning", question: "Mijn rol als kantoordirecteur / COO is helder genoeg om effectief mee te sturen in bestuurlijke keuzes.", whyItMatters: "Onduidelijke positionering maakt impact afhankelijk van toevallige goodwill." },
      { id: "q-positioning-2", dimensionId: "positioning", question: "Ik kan zonder omwegen signaleren waar de kantoororganisatie bestuurlijke aandacht nodig heeft.", whyItMatters: "Tijdige escalatie voorkomt dat operationele kwesties strategische schade veroorzaken." },
      { id: "q-operations-1", dimensionId: "operations", question: "Belangrijke processen en ondersteunende functies zijn stabiel genoeg om groei en kwaliteit te dragen.", whyItMatters: "Een zwakke basis ondermijnt zowel professionals als clienten." },
      { id: "q-governance-1", dimensionId: "governance", question: "Er zijn werkbare afspraken over eigenaarschap, besluitvorming en opvolging tussen bestuur en support.", whyItMatters: "Goede governance voorkomt gaten tussen besluit en uitvoering." },
      { id: "q-change-1", dimensionId: "change", question: "Veranderinitiatieven landen niet alleen in plannen, maar ook in dagelijks gedrag en routines.", whyItMatters: "Adoptie is vaak het verschil tussen cosmetische en werkbare verandering." },
      { id: "q-commercial-support-1", dimensionId: "commercial-support", question: "Kantoorondersteuning draagt zichtbaar bij aan clientbediening, business development en proposities.", whyItMatters: "Support moet commerciele slagkracht versterken, niet alleen faciliteren." },
      { id: "q-people-1", dimensionId: "people", question: "Ik heb voldoende zicht op kritieke rollen, capaciteit en ontwikkelbehoeften in de ondersteunende organisatie.", whyItMatters: "Kwetsbaarheid in sleutelrollen komt vaak te laat aan het licht." },
      { id: "q-people-2", dimensionId: "people", question: "Ik kan teams aanspreken op professionaliteit, samenwerking en eigenaarschap zonder defensieve reflex.", whyItMatters: "Leiderschap in support vraagt ook normstelling, niet alleen coordinatie." },
    ],
    firstStepByDimension: {
      positioning: "Maak met bestuur en managing partner expliciet waar jouw mandaat begint, eindigt en wanneer escalatie nodig is.",
      operations: "Kies de twee operationele knelpunten die nu het meeste effect hebben op kwaliteit of werkdruk en trek ze naar voren.",
      governance: "Spreek een eenvoudig ritme af voor besluitvorming, eigenaarschap en opvolging tussen bestuur en kantoororganisatie.",
      change: "Vertaal een lopend verandertraject naar concreet gedrag, meetpunten en een eigenaar per stap.",
      "commercial-support": "Bepaal met partners waar support direct zichtbaar kan bijdragen aan clientontwikkeling of proposities.",
      people: "Breng de kwetsbaarste rollen en bezettingsrisico's in beeld en maak daar direct een ontwikkel- of backupplan voor.",
    },
    resultLabel: "Startprofiel kantoordirecteur / COO",
  },
  {
    id: "vakgroep-clientteamleider",
    label: "Vakgroep- en clientteamleider",
    eyebrow: "Samenwerking",
    intro:
      "Deze zelfdiagnose helpt je toetsen of je team of vakgroep genoeg richting, ritme en onderlinge samenwerking heeft om boven individuele belangen uit te stijgen.",
    dimensions: [
      { id: "mandate", title: "Leiderschap zonder hiërarchie", prompt: "Waar is jouw invloed sterk, en waar blijft die nog te vrijblijvend?" },
      { id: "shared-direction", title: "Gezamenlijke richting", prompt: "Welke gedeelde ambitie of prioriteit is nog niet concreet genoeg gemaakt?" },
      { id: "collaboration", title: "Samenwerking en vertrouwen", prompt: "Waar stokt samenwerking nu door onduidelijkheid, rivaliteit of vermijding?" },
      { id: "commercial", title: "Client- en marktontwikkeling", prompt: "Waar laat het team nu kansen liggen doordat het te individueel opereert?" },
      { id: "cadence", title: "Ritme en opvolging", prompt: "Welke overleg- of opvolgstructuur moet anders om beweging vast te houden?" },
      { id: "development", title: "Ontwikkeling van mensen", prompt: "Welke twee mensen of rollen vragen nu gerichte aandacht om het team sterker te maken?" },
    ],
    questions: [
      { id: "q-mandate-1", dimensionId: "mandate", question: "Ik kan als vakgroep- of clientteamleider richting geven zonder formele macht te overspelen.", whyItMatters: "Leiderschap zonder hiërarchie vraagt precieze beïnvloeding." },
      { id: "q-shared-direction-1", dimensionId: "shared-direction", question: "Er is een voldoende scherpe gezamenlijke focus die keuzes in tijd, energie en commercie stuurt.", whyItMatters: "Zonder gedeelde focus valt samenwerking snel terug op vrijblijvende afstemming." },
      { id: "q-collaboration-1", dimensionId: "collaboration", question: "We kunnen spanningen of verschillen in aanpak tijdig op tafel leggen en productief maken.", whyItMatters: "Vermeden spanning gaat meestal ten koste van kwaliteit en snelheid." },
      { id: "q-collaboration-2", dimensionId: "collaboration", question: "Mensen ervaren genoeg vertrouwen om bij te dragen buiten hun directe eigenbelang.", whyItMatters: "Collectieve prestaties vragen psychologische en relationele veiligheid." },
      { id: "q-commercial-1", dimensionId: "commercial", question: "Het team werkt systematisch aan gezamenlijke clientkansen in plaats van alleen aan individuele dossiers.", whyItMatters: "Commerciele slagkracht ontstaat wanneer kansen gedeeld en opgevolgd worden." },
      { id: "q-cadence-1", dimensionId: "cadence", question: "Er is een werkbaar ritme voor overleg, keuzes en opvolging dat echt helpt om voortgang te boeken.", whyItMatters: "Zonder ritme ontstaat veel praten en weinig beweging." },
      { id: "q-development-1", dimensionId: "development", question: "Ik besteed gericht aandacht aan het ontwikkelen van mensen die het team of clientwerk sterker maken.", whyItMatters: "Teamlastige vraagstukken lossen vaak deels op via gerichte ontwikkeling." },
      { id: "q-development-2", dimensionId: "development", question: "Ik kan collega's aanspreken op bijdrage, gedrag en samenwerking zonder de relatie te verliezen.", whyItMatters: "Effectief teamleiderschap vraagt ook normstelling." },
    ],
    firstStepByDimension: {
      mandate: "Maak expliciet welk mandaat je nodig hebt en bespreek dat vooraf met de belangrijkste spelers in je team of vakgroep.",
      "shared-direction": "Vertaal de teamambitie naar een paar concrete keuzes die zichtbaar maken waar je wel en niet op inzet.",
      collaboration: "Maak een lastig samenwerkingspunt expliciet en spreek af hoe je spanning sneller en veiliger bespreekt.",
      commercial: "Kies een klein aantal gezamenlijke clientkansen waar het team als collectief zichtbaar op acteert.",
      cadence: "Herontwerp het overlegritme zodat beslissingen, acties en opvolging duidelijker worden bewaakt.",
      development: "Bepaal welke twee mensen of rollen nu het meeste verschil maken en voer daar gericht ontwikkelgesprekken mee.",
    },
    resultLabel: "Startprofiel vakgroep- en clientteamleider",
  },
  {
    id: "pre-partner",
    label: "(Pre-)partner",
    eyebrow: "Ontwikkeling",
    intro:
      "Deze zelfdiagnose helpt je zien waar je al partner-ready opereert en waar je nog moet versterken in zichtbaarheid, leiderschap, commercie en zelfsturing.",
    dimensions: [
      { id: "positioning", title: "Positionering en profiel", prompt: "Waar is je toegevoegde waarde al helder zichtbaar, en waar nog te impliciet?" },
      { id: "commercial", title: "Commerciele groei", prompt: "Welke client- of marktbeweging vraagt nu meer initiatief van jou?" },
      { id: "leadership", title: "Leiderschap en invloed", prompt: "Waar moet je meer richting geven in plaats van alleen sterk uitvoeren?" },
      { id: "collaboration", title: "Samenwerking in de firma", prompt: "Waar kun je meer als firmalid optreden en minder als individuele expert?" },
      { id: "stamina", title: "Zelfsturing en belastbaarheid", prompt: "Welke patronen bedreigen je duurzaamheid of effectiviteit onder druk?" },
      { id: "partner-readiness", title: "Partner-readiness", prompt: "Welke twee signalen moeten sterker worden om de volgende stap geloofwaardig te maken?" },
    ],
    questions: [
      { id: "q-positioning-1", dimensionId: "positioning", question: "Mijn profiel is scherp genoeg dat collega's en clienten mij vanzelf aan relevante vraagstukken koppelen.", whyItMatters: "Zichtbaarheid rond een helder profiel versnelt vertrouwen en kansen." },
      { id: "q-commercial-1", dimensionId: "commercial", question: "Ik neem zichtbaar initiatief in clientontwikkeling en wacht niet af tot werk vanzelf komt.", whyItMatters: "Partnerpotentieel wordt mede gemeten aan commercieel eigenaarschap." },
      { id: "q-commercial-2", dimensionId: "commercial", question: "Ik kan inhoudelijke expertise verbinden met concrete proposities of vervolgwerk.", whyItMatters: "Sterke inhoud wordt pas strategisch waardevol als die omzetbaar is in kansen." },
      { id: "q-leadership-1", dimensionId: "leadership", question: "Ik stuur teams, dossiers of collega's al op een manier die boven individueel presteren uitstijgt.", whyItMatters: "De stap naar partner vraagt meer dan persoonlijk sterk werk leveren." },
      { id: "q-collaboration-1", dimensionId: "collaboration", question: "Ik werk zichtbaar als firmalid samen over praktijken, sectoren of clientrelaties heen.", whyItMatters: "Partnerschap veronderstelt collectieve oriëntatie." },
      { id: "q-stamina-1", dimensionId: "stamina", question: "Ik kan onder hoge druk keuzes maken die mijn energie, focus en kwaliteit beschermen.", whyItMatters: "Duurzame groei vraagt meer dan alleen doorzetten." },
      { id: "q-partner-readiness-1", dimensionId: "partner-readiness", question: "Ik weet welke concrete signalen of prestaties nodig zijn om de volgende stap geloofwaardig te maken.", whyItMatters: "Onheldere criteria leiden vaak tot diffuse inspanning." },
      { id: "q-partner-readiness-2", dimensionId: "partner-readiness", question: "Ik krijg actief feedback op mijn partnerpotentieel en vertaal dat naar zichtbaar gedrag.", whyItMatters: "Gerichte feedback versnelt ontwikkeling veel meer dan alleen ervaring opdoen." },
    ],
    firstStepByDimension: {
      positioning: "Scherp je profiel aan in één kernbelofte: waar wil je voortaan het eerst mee geassocieerd worden?",
      commercial: "Kies één client- of marktinitiatief waar je zichtbaar eigenaarschap op neemt in plaats van alleen bijdraagt.",
      leadership: "Zoek een lopende situatie waarin je nadrukkelijker richting geeft in plaats van vooral sterk uitvoert.",
      collaboration: "Maak één bewuste stap om over je eigen domein heen als firmalid op te treden.",
      stamina: "Benoem welk patroon jou onder druk het meest verzwakt en maak daar een concreet tegenritme voor.",
      "partner-readiness": "Vraag twee gerichte feedbackgesprekken aan over wat jou nog geloofwaardiger maakt voor de volgende stap.",
    },
    resultLabel: "Startprofiel (pre-)partner",
  },
];

const options = [
  { value: 0, label: "Nog niet", hint: "nauwelijks zichtbaar" },
  { value: 1, label: "Deels", hint: "wisselend of incidenteel" },
  { value: 2, label: "Grotendeels", hint: "redelijk consistent" },
  { value: 3, label: "Sterk", hint: "duidelijk en structureel" },
] as const;

function getScoreBand(score: number): ScoreBand {
  if (score < 35) {
    return {
      label: "Kritieke startfase",
      tone: "bg-[var(--accent-600)]/15 text-[var(--accent-600)]",
      guidance:
        "Je uitgangspositie vraagt snelle focus. Kies direct een beperkt aantal hefbomen voor de komende 90 dagen.",
    };
  }

  if (score < 60) {
    return {
      label: "Werkbare basis, maar kwetsbaar",
      tone: "bg-amber-100 text-amber-800",
      guidance:
        "Er is fundament, maar te veel onderdelen hangen nog af van individuen of impliciete afspraken. Maak keuzes explicieter en toetsbaar.",
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
      "Je basis is sterk. Focus nu op borgen, verdiepen en zichtbaar maken van de volgende stap in leiderschap of impact.",
  };
}

export function SelfDiagnosisTool() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "done" | "error">("idle");

  const selectedPersona = useMemo(
    () => personaTests.find((persona) => persona.id === selectedPersonaId) ?? null,
    [selectedPersonaId],
  );

  const dimensions = selectedPersona?.dimensions ?? [];
  const questions = selectedPersona?.questions ?? [];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const completionPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const overallScore = useMemo(() => {
    if (!selectedPersona || answeredCount === 0 || totalQuestions === 0) {
      return 0;
    }

    const total = questions.reduce((sum, question) => {
      const value = answers[question.id];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);

    return Math.round((total / (totalQuestions * 3)) * 100);
  }, [answers, answeredCount, questions, selectedPersona, totalQuestions]);

  const scoresByDimension = useMemo(() => {
    return dimensions.map((dimension) => {
      const relatedQuestions = questions.filter(
        (question) => question.dimensionId === dimension.id,
      );
      const answeredValues = relatedQuestions
        .map((question) => answers[question.id])
        .filter((value): value is number => typeof value === "number");

      if (answeredValues.length === 0) {
        return { ...dimension, score: 0 };
      }

      const average =
        answeredValues.reduce((sum, value) => sum + value, 0) /
        answeredValues.length;

      return {
        ...dimension,
        score: Math.round((average / 3) * 100),
      };
    });
  }, [answers, dimensions, questions]);

  const weakestThemes = useMemo(
    () => [...scoresByDimension].sort((left, right) => left.score - right.score).slice(0, 3),
    [scoresByDimension],
  );

  const suggestedFirstSteps = useMemo(() => {
    if (!selectedPersona) {
      return [];
    }

    return weakestThemes
      .slice(0, 2)
      .map((theme) => selectedPersona.firstStepByDimension[theme.id])
      .filter(Boolean);
  }, [selectedPersona, weakestThemes]);

  const scoreBand = getScoreBand(overallScore);
  const canShowResult = Boolean(selectedPersona) && submitted && answeredCount === totalQuestions;

  const conversationStarterText = useMemo(() => {
    if (!selectedPersona) {
      return "";
    }

    return [
      `Zelfdiagnose: ${selectedPersona.label}`,
      `Totale score: ${overallScore}/100 (${scoreBand.label})`,
      "",
      "Gespreksstarters (laagste thema's):",
      ...weakestThemes.map(
        (theme, index) => `${index + 1}. ${theme.title} (${theme.score}/100) - ${theme.prompt}`,
      ),
    ].join("\n");
  }, [overallScore, scoreBand.label, selectedPersona, weakestThemes]);

  const contactHref = useMemo(() => {
    const params = new URLSearchParams({
      from: "zelfdiagnose",
      intake: conversationStarterText,
    });
    return `/contact?${params.toString()}`;
  }, [conversationStarterText]);

  function selectPersona(personaId: string) {
    setSelectedPersonaId(personaId);
    setAnswers({});
    setSubmitted(false);
    setCopyState("idle");
  }

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
        <p className="eyebrow">Zelfdiagnose</p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-700)]">
          <Compass className="icon-pulse h-4 w-4 text-[var(--accent-500)]" />
          Kies eerst je persona
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--ink-900)]">
          Welke rol past het meest bij jou?
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--ink-700)]">
          Definieer jezelf eerst als persona. Op basis daarvan krijg je de zelftest
          die het beste aansluit op je bestuurlijke of professionele opgave.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {personaTests.map((persona) => {
            const active = selectedPersonaId === persona.id;

            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => selectPersona(persona.id)}
                className={`rounded-[1.2rem] border p-5 text-left transition ${
                  active
                    ? "border-[var(--ink-800)] bg-[var(--ink-900)] text-white shadow-lg"
                    : "border-[var(--ink-200)] bg-white text-[var(--ink-900)] hover:border-[var(--ink-400)] hover:bg-[var(--paper-100)]"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${active ? "text-white/72" : "text-[var(--accent-600)]"}`}>
                  Persona
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight">{persona.label}</p>
                <p className={`mt-3 text-sm leading-relaxed ${active ? "text-white/82" : "text-[var(--ink-700)]"}`}>
                  {persona.intro}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {selectedPersona ? (
        <>
          <section className="shader-surface rounded-xl border border-[var(--ink-300)] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{selectedPersona.eyebrow}</p>
                <h2 className="mt-2 font-display text-3xl text-[var(--ink-900)]">
                  Zelftest voor {selectedPersona.label}
                </h2>
                <p className="mt-3 max-w-3xl text-[var(--ink-700)]">
                  {selectedPersona.intro}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPersonaId(null)}
                className="btn-motion rounded-full border border-[var(--ink-300)] px-4 py-2 text-sm font-semibold text-[var(--ink-900)] hover:bg-[var(--paper-200)]"
              >
                Kies andere persona
              </button>
            </div>
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
                <fieldset key={question.id} className="hover-lift rounded-lg border border-[var(--ink-200)] p-4">
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
                            onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))}
                            className="sr-only"
                          />
                          <span className="block font-semibold">{option.label}</span>
                          <span className={`block text-xs ${selected ? "text-white/95" : "text-[var(--ink-600)]"}`}>
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
        </>
      ) : null}

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
              {selectedPersona?.resultLabel}
            </span>
          </div>

          <div className="grid gap-3">
            {scoresByDimension.map((dimension) => (
              <div key={dimension.id} className="hover-lift rounded-lg border border-[var(--ink-200)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--ink-900)]">{dimension.title}</p>
                  <p className="text-sm font-semibold text-[var(--ink-700)]">{dimension.score}/100</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[var(--paper-200)]">
                  <div className="h-2 rounded-full bg-[var(--ink-700)]" style={{ width: `${dimension.score}%` }} />
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
            <Link href={contactHref} className="btn-motion inline-flex items-center gap-2 rounded-md bg-[var(--accent-500)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-600)]">
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
            {copyState === "done" ? <p className="text-sm text-emerald-700">Samenvatting gekopieerd.</p> : null}
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
