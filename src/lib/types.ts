export interface PageSEO {
  title: string;
  description: string;
  noindex?: boolean;
}

export interface SiteSettings {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  phone: string;
  email: string;
  linkedinUrl: string;
  logoPath: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface SuccessFactor {
  title: string;
  challenge: string;
  assignment: string;
  points: string[];
}

export interface ServiceSection {
  id: "bestuursadvies" | "teambegeleiding" | "coaching";
  title: string;
  subtitle: string;
  summary: string;
  typicalQuestions: string[];
  contribution: string[];
  ctaLabel: string;
}

export interface AudienceSegment {
  id: string;
  title: string;
  challenge: string;
  assignment: string;
  outcomes: string[];
  relevanceSignals: string[];
}

export interface ApproachPillar {
  title: string;
  body: string;
}

export interface HomePageContent {
  seo: PageSEO;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  successFactors: SuccessFactor[];
  audiencePreview: { title: string; challenge: string }[];
  serviceHighlights: {
    id: ServiceSection["id"];
    title: string;
    body: string;
  }[];
  aboutSnippet: string;
}

export interface ServicesPageContent {
  seo: PageSEO;
  introTitle: string;
  introBody: string;
  sections: ServiceSection[];
}

export interface AudiencesPageContent {
  seo: PageSEO;
  introTitle: string;
  introBody: string;
  segments: AudienceSegment[];
}

export interface ApproachPageContent {
  seo: PageSEO;
  introTitle: string;
  introBody: string;
  pillars: ApproachPillar[];
}

export interface AboutPageContent {
  seo: PageSEO;
  introTitle: string;
  introBody: string;
  timeline: { period: string; body: string }[];
  stylePillars: ApproachPillar[];
}

export interface ContactPageContent {
  seo: PageSEO;
  introTitle: string;
  introBody: string;
  responseExpectation: string;
}

export interface InsightPageContent {
  seo: PageSEO;
  title: string;
  body: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  organization?: string;
  role?: string;
  message: string;
  consent: boolean;
  honeypot?: string;
  locale: string;
}

export interface ContactFormResult {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormPayload, string>>;
}
