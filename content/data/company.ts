/**
 * Company facts shared by schema.org markup, /llms.txt, /api/ai-context, the
 * AI assistant prompt and on-page copy. Change a fact here rather than in page
 * copy, so every surface (and every AI answer built from them) stays in step.
 */
export const company = {
  brand: "F1 Composite",
  legalName: "Chongqing F1 Composites Co., Ltd.",
  alternateNames: ["F1 Composites", "Chongqing F1 Composites Co., Ltd."],
  url: "https://www.f1composite.com",
  foundingYear: "2015",
  /** F1 Composite is FengDu New Material's export company. */
  parent: { name: "FengDu New Material" },
  /** FengDu subsidiary that manufactures and holds several product documents (PHI 2491wi03, SGS reports). */
  manufacturer: { name: "Chongqing Xianju New Material Co., Ltd." },
  production: {
    bases: 5,
    lines: 370,
    annualTonnes: 150_000,
    dieSets: 1_000,
    locations: ["Chongqing, China", "Yancheng, Jiangsu, China"],
  },
  exportCountries: "30+",
  address: {
    streetAddress: "No. 153 Jinyu Avenue, Cuntan Street",
    addressLocality: "Chongqing",
    addressRegion: "Liangjiang New Area",
    postalCode: "401121",
    addressCountry: "CN",
  },
  contact: {
    salesName: "Doris Li",
    email: "inquiry@f1composite.com",
    phone: "+86-138-8333-8993",
    languages: ["English", "Chinese"],
  },
  sameAs: ["https://www.youtube.com/@F1Composites"],
} as const;

export const companyStatements = {
  relationship:
    "F1 Composite (Chongqing F1 Composites Co., Ltd.) is the export company of FengDu New Material. FengDu is the parent company of Chongqing Xianju New Material Co., Ltd. and runs the production network; F1 handles international sales, engineering support, documentation and delivery.",
  short: "F1 Composite is the export company of FengDu New Material.",
  production:
    "FengDu's production network has 5 manufacturing bases and 370 pultrusion lines, with about 150,000 tonnes of annual capacity.",
  certificates:
    "ISO 9001, CE, fire-test and other certificates are provided on request, with the certificate holder, number and scope. Published test reports are listed on the evidence page.",
  disambiguation:
    "The \"F1\" in F1 Composite stands for \"Fiber One\" (fiberglass). F1 Composite is an industrial FRP company and is not affiliated with Formula 1, Formula One motorsport or the FIA.",
} as const;

/** F1's own supply terms. Industry benchmarks elsewhere must not override these. */
export const supplyTerms = {
  responseTime: "one business day",
  catalogLeadTimeWeeks: [2, 4],
  existingDieVariantLeadTimeWeeks: [4, 6],
  newDieLeadTimeWeeks: [6, 10],
  dieManufactureWeeks: [4, 8],
  fenestrationLeadTimeWeeks: [6, 12],
  customMoqMeters: { firstRun: 500, repeat: 200 },
  standardLengthM: 6,
} as const;

export const weeks = ([low, high]: readonly [number, number]) => `${low}–${high} weeks`;
