import type {
  AboutPageContent,
  ApproachPageContent,
  AudiencesPageContent,
  ContactPageContent,
  HomePageContent,
  InsightPageContent,
  ServicesPageContent,
  SiteSettings,
} from "@/lib/types";

export const fallbackSiteSettings: SiteSettings = {
  siteName: "Paul ter Linden",
  defaultTitle: "Bestuursadviseur voor professional service firms",
  defaultDescription:
    "Paul ter Linden helpt managing partners, directies en professionals in professional service firms met bestuursadvies, teambegeleiding en coaching.",
  phone: "+31 (0)6 5882 5133",
  email: "contact@paulterlinden.nl",
  linkedinUrl: "https://www.linkedin.com/in/paulterlinden/",
  logoPath: "/ptl-logo.png",
  ctaLabel: "Plan een gesprek",
  ctaHref: "/contact",
};

export const fallbackHomePage: HomePageContent = {
  seo: {
    title: "Bestuursadviseur voor professional service firms",
    description:
      "Voor een bestuur dat het kantoor door roerige tijden leidt. Strategisch advies, teambegeleiding en coaching voor professional service firms.",
  },
  heroTitle: "Leid je kantoor, leid jezelf",
  heroSubtitle: "Bestuursadvies voor professional service firms",
  intro:
    "Ik help je een grote stap voorwaarts te zetten met focus, structuur en uitvoerbare verandering.",
  successFactors: [
    {
      title: "Strategie",
      challenge: "Focus in bestuur en kantoor",
      assignment: "Je kantoorstrategie vaststellen en realiseren",
      points: [
        "Lastige keuzes maken over focus, prioriteiten en prestaties",
        "Leiders op een gezamenlijke koers krijgen en houden",
      ],
    },
    {
      title: "Cultuur",
      challenge: "Net genoeg management",
      assignment: "Je kantoorgenoten op een gezamenlijke koers houden",
      points: [
        "Goed starten en effectief optreden als bestuur",
        "Middelpuntzoekend gedrag stimuleren binnen duidelijke spelregels",
      ],
    },
    {
      title: "Commercie",
      challenge: "Continue stroom waardevol werk",
      assignment: "Nu al werken aan de opdrachten van morgen",
      points: [
        "Optreden als een firma richting clienten",
        "Structureel sterker worden in clientontwikkeling en opdrachtwinst",
      ],
    },
    {
      title: "Uitvoering",
      challenge: "Krachtige teams",
      assignment: "Systematisch effectief met elkaar samenwerken",
      points: [
        "Projectteams efficient, effectief en werkbaar maken",
        "Conflicten tussen individuen, teams en onderdelen oplossen",
      ],
    },
    {
      title: "Talent",
      challenge: "Leiders voor de toekomst",
      assignment:
        "Jongerejaars helpen ontwikkelen en ouderejaars binden aan kantoor",
      points: [
        "De juiste mensen laten doorgroeien naar zwaardere rollen",
        "Een gestage stroom van toekomstige partners organiseren",
      ],
    },
  ],
  audiencePreview: [
    {
      title: "Managing partners",
      challenge: "Sturen zonder vanzelfsprekende macht",
    },
    {
      title: "Kantoordirecteuren / COOs",
      challenge: "Zorgdragen voor een gezonde basis",
    },
    {
      title: "Vakgroep- en clientteamleiders",
      challenge: "Vrije geesten verenigen rond een thema",
    },
    {
      title: "(Pre-)partners",
      challenge: "Steeds net boven je macht presteren",
    },
  ],
  serviceHighlights: [
    {
      id: "bestuursadvies",
      title: "Bestuursadvies",
      body: "Voor directie en managing partners die richting, samenwerking en executiekracht willen versterken.",
    },
    {
      id: "teambegeleiding",
      title: "Teambegeleiding",
      body: "Voor teams die kansrijk willen starten of effectief willen schakelen bij druk, verandering of frictie.",
    },
    {
      id: "coaching",
      title: "Coaching",
      body: "Voor professionals die helderheid zoeken en gedrag willen aanpassen om sneller te groeien in een nieuwe rol.",
    },
  ],
  aboutSnippet:
    "Na 14 jaar McKinsey en leidinggevende rollen in het bedrijfsleven werk ik sinds 2010 zelfstandig als coach, teambegeleider en adviseur voor professional service firms.",
};

export const fallbackServicesPage: ServicesPageContent = {
  seo: {
    title: "Wat ik doe",
    description:
      "Bestuursadvies, teambegeleiding en coaching voor professionals en professional service firms.",
  },
  introTitle: "Een waardevol kantoor voor clienten en collega's",
  introBody:
    "Ik werk op drie niveaus: het kantoor, het team en het individu. De rode draad is steeds hetzelfde: duidelijke keuzes maken, gedrag veranderen dat niet meer werkt, en praktisch realiseren wat nodig is.",
  sections: [
    {
      id: "bestuursadvies",
      title: "Bestuursadvies voor professional service firms",
      subtitle:
        "Een organisatie creeren waarin professionals de beste versie van zichzelf kunnen zijn",
      summary:
        "Ik adviseer primair op strategie, cultuur, commercie, teameffectiviteit en talentontwikkeling. Mijn anker ligt meestal op directie- of managing-partnerniveau.",
      typicalQuestions: [
        "Hoe wordt een nieuw bestuur snel effectief?",
        "Hoe verbeteren we samenwerking tussen partners en practices?",
        "Hoe maken we doorstroom en partnerschap aantrekkelijk en stevig?",
      ],
      contribution: [
        "Klankbord voor directie, managing partner en kantoordirectie",
        "Consultant voor concrete ontwerp- en uitvoeringskeuzes",
        "Programma-ontwikkelaar en begeleider van implementatie",
      ],
      ctaLabel: "Past mijn adviesbijdrage bij jou?",
    },
    {
      id: "teambegeleiding",
      title: "Teambegeleiding voor professionals",
      subtitle: "Goed beginnen en effectief schakelen bij verandering of frictie",
      summary:
        "Professionals werken in meerdere teams tegelijk. Ik help teams om goed te starten, scherp te blijven onder druk en vastgelopen samenwerking fundamenteel te herstellen.",
      typicalQuestions: [
        "Hoe maken we een nieuwe teamstart echt kansrijk?",
        "Hoe herstellen we vertrouwen en productiviteit na frictie?",
        "Hoe combineren we resultaatdruk met steun en veiligheid?",
      ],
      contribution: [
        "Korte, krachtige interventies voor tijdelijke teams",
        "Intensievere begeleiding voor langlopende teams",
        "Facilitatie van lastige gesprekken en besluitvorming",
      ],
      ctaLabel: "Past mijn teambegeleiding bij jou?",
    },
    {
      id: "coaching",
      title: "Coaching voor professionals",
      subtitle:
        "Ook als je de noodzaak voelt, ontstaat een doorbraak niet vanzelf",
      summary:
        "Ik coach professionals die veel zelfsturing moeten combineren met groei, zichtbaarheid en stevig presteren in complexe organisaties.",
      typicalQuestions: [
        "Hoe groei ik van vakexpert naar leider?",
        "Hoe combineer ik performance met ontwikkeling op langere termijn?",
        "Hoe bouw ik een eigen profiel op binnen de kaders van het kantoor?",
      ],
      contribution: [
        "Helderheid over wat je wilt behouden en wat moet veranderen",
        "Praktische experimenten om nieuw gedrag werkend te krijgen",
        "Stevige spiegel zonder standaardantwoorden op te dringen",
      ],
      ctaLabel: "Past mijn coaching bij jou?",
    },
  ],
};

export const fallbackAudiencesPage: AudiencesPageContent = {
  seo: {
    title: "Voor wie",
    description:
      "Voor managing partners, kantoordirecteuren, vakgroepleiders en (pre-)partners in professional service firms.",
  },
  introTitle:
    "Ik help professionals om individueel en collectief de beste versie van zichzelf te worden",
  introBody:
    "Elke rol kent een eigen opgave. Ik werk vooral met sleutelfiguren die tegelijk operationele prestaties moeten leveren en structurele vooruitgang moeten organiseren.",
  segments: [
    {
      id: "managing-partners",
      title: "Managing partners",
      challenge: "Sturen zonder vanzelfsprekende macht",
      assignment: "Je bestuursmandaat benutten zonder je hand te overspelen",
      outcomes: [
        "Snel gezag en leiderschapsmandaat vestigen",
        "KPI-inzicht vertalen naar korte- en langetermijndoelen",
        "Balans vinden tussen bestuurswerk en eigen praktijk",
      ],
      relevanceSignals: [
        "Je start in een nieuwe leiderschapsrol",
        "Partners trekken niet vanzelf in dezelfde richting",
      ],
    },
    {
      id: "coos",
      title: "Kantoordirecteuren / COOs",
      challenge: "Zorgdragen voor een gezonde basis",
      assignment: "Effectief meesturen en beinvloeden als niet-professional",
      outcomes: [
        "Gezag bouwen op scherp inzicht in prestatie en gezondheid",
        "Ondersteunende afdelingen strategisch en werkbaar organiseren",
        "Professionals actief betrekken in kantoortaken",
      ],
      relevanceSignals: [
        "Kantoorinfrastructuur groeit niet mee met ambitie",
        "Ondersteunende functies krijgen onvoldoende traction",
      ],
    },
    {
      id: "practice-leads",
      title: "Vakgroep- en clientteamleiders",
      challenge: "Vrije geesten verenigen rond een thema",
      assignment:
        "Casus-overstijgende doelen realiseren in vakgebied, sector of key-account",
      outcomes: [
        "Agenda opstellen voor kennisontwikkeling en business development",
        "Collega's stimuleren naast actuele casus ook op middellange termijn te bouwen",
        "Onderlinge frictie en grotere conflicten doelgericht oplossen",
      ],
      relevanceSignals: [
        "Veel talent maar weinig gezamenlijke executie",
        "Samenwerking stokt zodra werkdruk oploopt",
      ],
    },
    {
      id: "partners",
      title: "(Pre-)partners",
      challenge: "Steeds net boven je macht presteren",
      assignment:
        "Uitblinken in prestaties en tegelijk zichtbaar in ontwikkeling blijven",
      outcomes: [
        "Ontwikkelen naar zelfstandige professional met eigen praktijk",
        "Uniek profiel bouwen binnen de verwachtingen van het kantoor",
        "Carriere en privedoelen beter verenigen",
      ],
      relevanceSignals: [
        "Je wilt versnellen maar niet vastlopen op oude patronen",
        "De stap naar partner vraagt ander gedrag en ander leiderschap",
      ],
    },
  ],
};

export const fallbackApproachPage: ApproachPageContent = {
  seo: {
    title: "Hoe ik werk",
    description:
      "De werkwijze van Paul ter Linden: nieuwsgierig en analytisch, helder en interactief, creatief en pragmatisch.",
  },
  introTitle: "Samenwerkingsvormen die passen bij de opgave",
  introBody:
    "Ik werk in drie vormen: advies, teambegeleiding en coaching. De vorm kies ik niet vooraf dogmatisch, maar op basis van wat jouw opgave nodig heeft.",
  pillars: [
    {
      title: "Bestuursadvies",
      body: "Voor besturen en directies die scherpte willen in koers, besluitvorming, samenwerking en executie.",
    },
    {
      title: "Teambegeleiding",
      body: "Voor teams die goed willen starten, beter willen schakelen onder druk of patronen willen doorbreken die samenwerking blokkeren.",
    },
    {
      title: "Coaching",
      body: "Voor professionals die hun rol, gedrag en impact sneller willen laten aansluiten bij een volgende stap.",
    },
  ],
};

export const fallbackAboutPage: AboutPageContent = {
  seo: {
  title: "Paul",
  description:
    "Over Paul ter Linden: achtergrond, ervaring en manier van werken als coach, teambegeleider en bestuursadviseur.",
  },
  introTitle: "Ik ben Paul ter Linden",
  introBody:
    "Ik werk met professionals en professional service firms die zichtbaar beter willen presteren en tegelijk een gezonde, duurzame organisatie willen bouwen.",
  timeline: [
    {
      period: "McKinsey & Company",
      body: "In 14 jaar bij McKinsey ontwikkelde ik een stevige basis in problem solving, strategisch denken, teamleiderschap en clientwerk, met nadruk op financiele dienstverlening.",
    },
    {
      period: "Leiderschapsrollen na McKinsey",
      body: "Na McKinsey werkte ik als directeur in een internationale serviceomgeving. Daar verschoof mijn focus steeds meer naar mensen, teams en organisatieontwikkeling.",
    },
    {
      period: "Sinds 2010 zelfstandig",
      body: "Sinds 2010 werk ik zelfstandig als coach, teambegeleider en adviseur. Mijn praktijk richt zich op professionals die willen groeien in verantwoordelijkheid en impact.",
    },
  ],
  stylePillars: [
    {
      title: "Nieuwsgierig en analytisch",
      body: "Ik stel veel vragen, map beginpositie en ambitie, en scheid hoofd- van bijzaken. Probleemstructurering en hypothese-gericht denken zorgen voor scherpte in keuzes.",
    },
    {
      title: "Heldere, interactieve aanpak",
      body: "Keuzes en conclusies komen niet uit de lucht vallen. We bouwen ze samen op in sessies, gesprekken en workshops met duidelijke fasering en eigenaarschap.",
    },
    {
      title: "Creativiteit en plezier",
      body: "Serieuze vraagstukken vragen soms om experiment. Ik werk met energie, neem mezelf niet te serieus en maak ruimte voor werkvormen die nieuwe inzichten versnellen.",
    },
    {
      title: "Pragmatisme",
      body: "Niet alles tegelijk veranderen. We kiezen de paar interventies die het verschil maken en ontwerpen ze zo dat ze in de praktijk echt vol te houden zijn.",
    },
  ],
};

export const fallbackContactPage: ContactPageContent = {
  seo: {
    title: "Contact",
    description:
      "Plan een kennismaking met Paul ter Linden voor coaching, teambegeleiding of bestuursadvies.",
  },
  introTitle: "Laten we kennismaken",
  introBody:
    "Vertel kort waar je tegenaan loopt. Ik denk graag mee over de juiste vorm: bestuursadvies, teambegeleiding of coaching.",
  responseExpectation:
    "Je ontvangt normaal binnen twee werkdagen een reactie per e-mail of telefoon.",
};

export const fallbackInsightPage: InsightPageContent = {
  seo: {
    title: "Inzicht",
    description:
      "Publicaties en inzichten van Paul ter Linden over leiderschap, samenwerking en professional service firms.",
  },
  title: "Inzicht en opinie",
  body: "Deze sectie wordt momenteel opgebouwd. Binnenkort publiceer ik hier korte analyses, praktijkobservaties en concrete handvatten voor leiders in professional service firms.",
};
