import type { ServiceSection } from "@/lib/types";

export const primaryCtaLabel = "Plan een gesprek";

export const audienceIllustrationById: Record<
  string,
  { src: string; alt: string; eyebrow: string }
> = {
  "managing-partners": {
    src: "/media/icons-line/board-meeting.png",
    alt: "Lijntekening van overleg aan een bestuurstafel",
    eyebrow: "Bestuur",
  },
  coos: {
    src: "/media/icons-line/presenting-chart.png",
    alt: "Lijntekening van een presentatie met grafiek",
    eyebrow: "Kantoorbasis",
  },
  "practice-leads": {
    src: "/media/icons-line/group-professionals.png",
    alt: "Lijntekening van een groep professionals",
    eyebrow: "Samenwerking",
  },
  partners: {
    src: "/media/icons-line/thinking-coffee.png",
    alt: "Lijntekening van reflectie met koffie",
    eyebrow: "Ontwikkeling",
  },
};

export const audienceIllustrationByTitle: Record<
  string,
  { src: string; alt: string; eyebrow: string }
> = {
  "Managing partners": audienceIllustrationById["managing-partners"],
  "Kantoordirecteuren / COOs": audienceIllustrationById.coos,
  "Vakgroep- en clientteamleiders": audienceIllustrationById["practice-leads"],
  "(Pre-)partners": audienceIllustrationById.partners,
};

export const successFactorPowerPointIconByTitle: Record<
  string,
  { src: string; alt: string }
> = {
  Strategie: {
    src: "/media/icons-ppt/successfactor-strategie-target.png",
    alt: "PowerPoint-icoon voor strategie",
  },
  Cultuur: {
    src: "/media/icons-ppt/successfactor-cultuur-richting.png",
    alt: "PowerPoint-icoon voor cultuur",
  },
  Commercie: {
    src: "/media/icons-ppt/successfactor-commercie-handshake.png",
    alt: "PowerPoint-icoon voor commercie",
  },
  Uitvoering: {
    src: "/media/icons-ppt/successfactor-uitvoering-team.png",
    alt: "PowerPoint-icoon voor uitvoering",
  },
  Talent: {
    src: "/media/icons-ppt/successfactor-talent-groei.png",
    alt: "PowerPoint-icoon voor talent",
  },
};

export const keyFigurePowerPointIconById: Record<
  string,
  { src: string; alt: string }
> = {
  "managing-partners": {
    src: "/media/icons-ppt/sleutelfiguur-managing-partner.png",
    alt: "PowerPoint-icoon voor managing partner",
  },
  coos: {
    src: "/media/icons-ppt/sleutelfiguur-kantoor-directeur-coo.png",
    alt: "PowerPoint-icoon voor kantoordirecteur of COO",
  },
  "practice-leads": {
    src: "/media/icons-ppt/sleutelfiguur-praktijk-voorzitter.png",
    alt: "PowerPoint-icoon voor praktijkvoorzitter",
  },
  partners: {
    src: "/media/icons-ppt/sleutelfiguur-aankomend-partner.png",
    alt: "PowerPoint-icoon voor aankomend partner",
  },
};

export const serviceIllustrationById: Record<
  ServiceSection["id"],
  { src: string; alt: string }
> = {
  bestuursadvies: {
    src: "/media/icons-line/presenting-chart.png",
    alt: "Illustratie van strategische presentatie met grafiek",
  },
  teambegeleiding: {
    src: "/media/icons-line/board-meeting.png",
    alt: "Illustratie van teamoverleg aan tafel",
  },
  coaching: {
    src: "/media/icons-line/thinking-coffee.png",
    alt: "Illustratie van reflectie en coaching",
  },
};

export const successFactorDetailMap: Record<
  string,
  {
    lead: string;
    typicalQuestions: string[];
    contribution: string[];
  }
> = {
  Strategie: {
    lead:
      "Strategie gaat voor mij over bestuurlijke focus: kiezen wat echt telt en dat vervolgens met discipline volhouden.",
    typicalQuestions: [
      "Welke keuzes bepalen de komende 12 tot 24 maanden echt het verschil?",
      "Hoe vertalen we koers naar duidelijke prioriteiten, rollen en ritme?",
      "Hoe houden we partners bij lastige keuzes op een gedeelde lijn?",
    ],
    contribution: [
      "Ik help koersvragen ontleden en de echte keuzes zichtbaar maken.",
      "Ik begeleid gesprekken waarin bestuur en partners dezelfde taal vinden.",
      "Ik vertaal richting naar uitvoerbare besluitvorming en opvolging.",
    ],
  },
  Cultuur: {
    lead:
      "Cultuur wordt sterk wanneer gedrag, spelregels en voorbeeldgedrag elkaar versterken in plaats van tegenwerken.",
    typicalQuestions: [
      "Welk gedrag willen we expliciet stimuleren of begrenzen?",
      "Hoe maak je bestuur en partners samen verantwoordelijk voor de toon?",
      "Waar vraagt de huidige cultuur om meer duidelijkheid of meer ruimte?",
    ],
    contribution: [
      "Ik maak cultuurvraagstukken concreet in gedrag, rollen en afspraken.",
      "Ik help teams lastige patronen bespreekbaar en veranderbaar te maken.",
      "Ik ontwerp interventies die passen bij een professionele partnershipcultuur.",
    ],
  },
  Commercie: {
    lead:
      "Commercie vraagt een kantoorbrede manier van denken: niet alleen goed werk leveren, maar ook samen bouwen aan het volgende waardevolle werk.",
    typicalQuestions: [
      "Hoe worden we consistenter in clientontwikkeling en opdrachtwinst?",
      "Waar vraagt onze markt om scherpere positionering of samenwerking?",
      "Hoe organiseer je commercieel ritme zonder kunstmatigheid?",
    ],
    contribution: [
      "Ik help commerciële patronen en gemiste kansen zichtbaar maken.",
      "Ik breng focus aan in proposities, key-accounts en samenwerking.",
      "Ik vertaal ambitie naar praktisch gedrag in business development.",
    ],
  },
  Uitvoering: {
    lead:
      "Uitvoering gaat over teams die met elkaar presteren zonder vast te lopen op onduidelijkheid, frictie of versnippering.",
    typicalQuestions: [
      "Wat helpt dit team om sneller scherpte, vertrouwen en tempo te vinden?",
      "Hoe herstellen we samenwerking als druk of spanning oploopt?",
      "Welke interventies maken project- en leiderschapsteams aantoonbaar effectiever?",
    ],
    contribution: [
      "Ik begeleid teamstarts, resets en gesprekken die anders blijven hangen.",
      "Ik maak onderlinge verwachtingen en besluitvorming expliciet werkbaar.",
      "Ik help conflicten omzetten in helderheid, eigenaarschap en beweging.",
    ],
  },
  Talent: {
    lead:
      "Talentontwikkeling is pas sterk als groei, leiderschap en partnerschap systematisch aandacht krijgen in plaats van toevallig.",
    typicalQuestions: [
      "Hoe bouw je een geloofwaardige route naar zwaardere rollen en partnerschap?",
      "Wat helpt jongere en oudere professionals om zich duurzaam te verbinden?",
      "Hoe maak je ontwikkeling concreet in gedrag, feedback en keuzes?",
    ],
    contribution: [
      "Ik help talentvraagstukken koppelen aan de strategie van het kantoor.",
      "Ik ontwerp gesprekken en interventies die ontwikkeling echt versnellen.",
      "Ik ondersteun leiders om scherp en menselijk te begeleiden.",
    ],
  },
};
