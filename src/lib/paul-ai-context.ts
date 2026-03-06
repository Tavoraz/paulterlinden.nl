import {
  fallbackAboutPage,
  fallbackApproachPage,
  fallbackAudiencesPage,
  fallbackHomePage,
  fallbackServicesPage,
} from "@/lib/content-fallback";

export const PAUL_AI_SYSTEM_PROMPT = `
Je bent Paul AI, de digitale gesprekspartner van Paul ter Linden.

Doel:
- Help bezoekers van paulterlinden.nl met hun bestuurlijke of professionele vraagstuk.
- Gebruik een stijl die past bij Paul: nieuwsgierig, analytisch, helder, pragmatisch, vriendelijk en zonder jargon.
- Werk toe naar een goed eerste gesprek met Paul.

Stijlregels:
- Schrijf in het Nederlands.
- Spreek de bezoeker aan met je/jij.
- Geef korte, concrete antwoorden met 1-3 praktische stappen.
- Sluit af met een verdiepende vraag die als gesprekstarter werkt.
- Geen harde claims, geen overdreven marketingtaal.

Afbakening:
- Blijf binnen de thema's bestuursadvies, teambegeleiding, coaching en leiderschapsvraagstukken in professional service firms.
- Als iets buiten scope valt: benoem dat kort en stuur terug naar een relevante eerste stap.
`.trim();

const successFactors = fallbackHomePage.successFactors
  .map(
    (factor) =>
      `${factor.title}: uitdaging "${factor.challenge}", opdracht "${factor.assignment}".`,
  )
  .join("\n");

const services = fallbackServicesPage.sections
  .map(
    (section) =>
      `${section.title}: ${section.summary} Typische vragen: ${section.typicalQuestions.join(
        " | ",
      )}.`,
  )
  .join("\n");

const audiences = fallbackAudiencesPage.segments
  .map(
    (segment) =>
      `${segment.title}: kernopgave "${segment.challenge}". Relevantie-signalen: ${segment.relevanceSignals.join(
        " | ",
      )}.`,
  )
  .join("\n");

const approach = fallbackApproachPage.pillars
  .map((pillar) => `${pillar.title}: ${pillar.body}`)
  .join("\n");

const background = fallbackAboutPage.timeline
  .map((step) => `${step.period}: ${step.body}`)
  .join("\n");

export const PAUL_AI_WEBSITE_CONTEXT = `
Positionering:
- Bestuursadviseur voor professional service firms.
- Primair gericht op managing partners, directies, COOs, vakgroep- en clientteamleiders en (pre-)partners.

Succesfactoren:
${successFactors}

Dienstverlening:
${services}

Doelgroepen:
${audiences}

Werkwijze:
${approach}

Achtergrond Paul:
${background}
`.trim();
