import groq from "groq";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    defaultTitle,
    defaultDescription,
    phone,
    email,
    linkedinUrl,
    logoPath,
    ctaLabel,
    ctaHref
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    seo,
    heroTitle,
    heroSubtitle,
    intro,
    successFactors,
    audiencePreview,
    serviceHighlights,
    aboutSnippet
  }
`;

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0]{
    seo,
    introTitle,
    introBody,
    sections
  }
`;

export const audiencesPageQuery = groq`
  *[_type == "audiencesPage"][0]{
    seo,
    introTitle,
    introBody,
    segments
  }
`;

export const approachPageQuery = groq`
  *[_type == "approachPage"][0]{
    seo,
    introTitle,
    introBody,
    pillars
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    seo,
    introTitle,
    introBody,
    timeline,
    stylePillars
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    seo,
    introTitle,
    introBody,
    responseExpectation
  }
`;

export const insightPageQuery = groq`
  *[_type == "insightPage"][0]{
    seo,
    title,
    body
  }
`;
