import { buildPublicKnowledge } from "@/lib/publicKnowledge";
import { productCategories } from "@/content/data/products";
import { commercialFacts, engineeringEvidence, evidenceRevision } from "@/content/data/engineeringEvidence";

/** Human-readable source index, generated from the same records as /api/ai-context. */
export function buildLlmsContent(): string {
  const knowledge = buildPublicKnowledge();
  const products = productCategories.map((item) => `- ${item.title}: ${item.description} https://www.f1composite.com${item.href}`).join("\n");
  const families = knowledge.productFamilies.map((item) => `- ${item.family}: ${item.url}\n  Specification: ${JSON.stringify(item)}`).join("\n");
  const evidence = engineeringEvidence.map((item) => `- ${item.reference}: ${item.scope} https://www.f1composite.com${item.file}`).join("\n");
  return `# F1 Composite
> Brief revision: ${evidenceRevision}
> Public engineering and procurement reference. Product documents and quotation drawings control applicability.

## Company
${knowledge.entity.role}. ${knowledge.entity.manufacturingEntity.relationship}
Legal name: ${knowledge.entity.legalName}
Website: ${knowledge.entity.url}

## Products
${products}

## Product specification references
${families}

## Commercial and engineering boundaries
${Object.values(commercialFacts).map((value) => `- ${value}`).join("\n")}

## Documents and scope
${evidence}
Evidence index: https://www.f1composite.com/resources/evidence

## Applications
${knowledge.applications.map((item) => `- ${item.title}: https://www.f1composite.com/applications/${item.slug}`).join("\n")}

## Engineering tools
${knowledge.aiSurfaces.filter((item) => item.path).map((item) => `- ${item.name}: https://www.f1composite.com${item.path}`).join("\n")}
Tools support preliminary review. AI responses are not an engineer's approval or a quotation.

## Further reading
${Object.entries(knowledge.keyPages).map(([label, url]) => `- ${label}: ${url}`).join("\n")}

## Contact
inquiry@f1composite.com
${commercialFacts.response}
Structured version: https://www.f1composite.com/api/ai-context
`;
}
