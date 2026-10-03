/** Original application guidance. References describe scope, never F1 certification. */
export interface GuideSource {
  id: string;
  title: string;
  url: string;
  kind: "authority" | "industry";
  note: string;
}

export interface GuideSection {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  table?: { columns: string[]; rows: string[][] };
  sourceIds: string[];
}

export interface GuideStandard {
  name: string;
  category: "Regulation" | "Standard" | "Guidance" | "Assessment route";
  jurisdiction: string;
  applies: string;
  limits: string;
  sourceIds: string[];
}

export interface PultrusionGuide {
  kind: "application" | "product";
  slug: string;
  name: string;
  title: string;
  description: string;
  heading: string;
  summary: string;
  /** The component inquiry F1 can assess, with qualification boundaries. */
  scope: string;
  material: string;
  profiles: string[];
  /** Existing site asset, or an original schematic supplied by the root task. */
  image: string;
  imageAlt: string;
  imageCaption: string;
  sections: GuideSection[];
  standards: GuideStandard[];
  specification: string[];
  faqs: { question: string; answer: string }[];
  sources: GuideSource[];
  related: { href: string; label: string }[];
}

export const pultrusionGuideReviewed = "2026-10-03";

export function pultrusionGuidePath(page: Pick<PultrusionGuide, "kind" | "slug">) {
  return `/${page.kind === "application" ? "applications" : "products"}/${page.slug}`;
}
