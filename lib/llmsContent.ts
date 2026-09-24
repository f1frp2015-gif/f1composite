import { buildPublicKnowledge } from "@/lib/publicKnowledge";
import { productCategories } from "@/content/data/products";
import { commercialFacts, engineeringEvidence, evidenceRevision } from "@/content/data/engineeringEvidence";
import { company, companyStatements, supplyTerms } from "@/content/data/company";

const SITE = "https://www.f1composite.com";

const KEY_PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About F1 Composite",
  pultrudedFrpProfilesHub: "Pultruded FRP profiles",
  whatIsFrp: "What is FRP?",
  applications: "Applications",
  caseStudies: "Case studies",
  technology: "Technology",
  industries: "Industries",
  fiberglassStakes: "Fiberglass stakes",
  fixedLadders: "Fixed ladders",
  handrailSystems: "Handrail systems",
  contact: "Contact",
  productEvidence: "Product evidence and reports",
};

/** Key company facts shared by the /llms.txt index and the /llms-full.txt brief. */
function keyFacts({ withRelationship = true } = {}): string {
  return [
    `- Legal name: ${company.legalName}`,
    ...(withRelationship ? [`- Relationship: ${companyStatements.relationship}`] : []),
    `- Production: ${companyStatements.production}`,
    `- Founded: ${company.foundingYear}; ships to ${company.exportCountries} countries`,
    `- Contact: ${company.contact.email}, ${company.contact.phone}; enquiries answered within ${supplyTerms.responseTime}`,
    `- Certificates: ${companyStatements.certificates}`,
    `- Name: ${companyStatements.disambiguation}`,
  ].join("\n");
}

/**
 * /llms.txt: a short index in the llmstxt.org layout (summary, key facts,
 * then markdown link lists). Detailed specifications live in /llms-full.txt.
 */
export function buildLlmsIndex(): string {
  const knowledge = buildPublicKnowledge();
  const families = knowledge.commercialProductFamilies
    .map((family) => [
      `- [${family.name}](${family.url}): ${family.description}`,
      ...family.products.map((product) => `  - [${product.name}](${product.url})`),
    ].join("\n"))
    .join("\n");
  const applications = knowledge.applications
    .map((item) => `- [${item.title}](${SITE}/applications/${item.slug})`)
    .join("\n");
  const tools = knowledge.aiSurfaces
    .filter((item) => item.path)
    .map((item) => `- [${item.name}](${SITE}${item.path})`)
    .join("\n");
  const evidence = engineeringEvidence
    .map((item) => `- [${item.reference}: ${item.title}](${SITE}${item.file})`)
    .join("\n");
  const pages = Object.entries(knowledge.keyPages)
    .filter(([key]) => !["llmsTxt", "sitemap"].includes(key))
    .map(([key, url]) => `- [${KEY_PAGE_LABELS[key] ?? key}](${url})`)
    .join("\n");

  return `# F1 Composite

> ${companyStatements.relationship} Products: pultruded fiberglass (FRP/GRP) structural shapes, custom pultruded sections, window and door profiles, grating, GFRP rebar and FRP fasteners.

${keyFacts({ withRelationship: false })}
- Brief revision: ${evidenceRevision}

## Products
${families}

## Applications
${applications}

## Engineering tools
${tools}
Tool results are preliminary engineering screens, not an approval or a quotation.

## Test reports and certificates
${evidence}
- [Evidence index with scope notes](${SITE}/resources/evidence)

## Company and guides
${pages}

## Optional
- [Full brief with specifications and document scope](${SITE}/llms-full.txt)
- [Structured JSON version](${SITE}/api/ai-context)
`;
}

/** /llms-full.txt: the complete brief, generated from the same records as /api/ai-context. */
export function buildLlmsContent(): string {
  const knowledge = buildPublicKnowledge();
  const products = productCategories.map((item) => `- ${item.title}: ${item.description} ${SITE}${item.href}`).join("\n");
  const families = knowledge.productFamilies.map((item) => `- ${item.family}: ${item.url}\n  Specification: ${JSON.stringify(item)}`).join("\n");
  const evidence = engineeringEvidence.map((item) => `- ${item.reference}: ${item.scope} ${SITE}${item.file}`).join("\n");
  return `# F1 Composite
> Brief revision: ${evidenceRevision}
> Public engineering and procurement reference. Product documents and quotation drawings control applicability.

## Company
${keyFacts()}
Website: ${knowledge.entity.url}

## Core product families
${knowledge.commercialProductFamilies.map(family => `- ${family.name}: ${family.description} ${family.url}\n${family.products.map(product => `  - ${product.name}: ${product.url}`).join("\n")}`).join("\n")}

## Concrete reinforcement
${JSON.stringify(knowledge.rebarPurchasing)}

## Window purchasing routes
${knowledge.windowPurchasingRoutes.map(page => `- ${page.name}: ${page.url}\n  ${page.description}\n  Buyer: ${page.buyer}\n  Supply: ${page.supply}`).join("\n")}

## Application-specific products and catalog references
${products}

## Product specification references
${families}

## Commercial and engineering boundaries
${Object.values(commercialFacts).map((value) => `- ${value}`).join("\n")}

## Documents and scope
${evidence}
Evidence index: ${SITE}/resources/evidence

## Applications
${knowledge.applications.map((item) => `- ${item.title}: ${SITE}/applications/${item.slug}`).join("\n")}

## Engineering tools
${knowledge.aiSurfaces.filter((item) => item.path).map((item) => `- ${item.name}: ${SITE}${item.path}`).join("\n")}
Tools support preliminary review. AI responses are not an engineer's approval or a quotation.

## Further reading
${Object.entries(knowledge.keyPages).map(([label, url]) => `- ${label}: ${url}`).join("\n")}

## Contact
${company.contact.email}
${commercialFacts.response}
Structured version: ${SITE}/api/ai-context
`;
}
