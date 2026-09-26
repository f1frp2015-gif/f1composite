// Application cards for a standard profile page: the application pages that
// recommend the family, each described by its own recommendation line, and
// the factory staircase case study where it used the family. Nothing here is
// written per product page, so a card can only say what its source says.

import type { ApplicationCard } from "@/components/products/ApplicationCards";
import { applicationPages } from "@/lib/applicationPages";
import type { ProfileCategory } from "@/lib/catalog/familySizes";

const FAMILY_WORDS: Record<ProfileCategory, RegExp> = {
  "i-beam": /\bI-beams?\b/i,
  channel: /\bchannels?\b/i,
  angle: /\bangles?\b/i,
  "square-tube": /\bsquare tubes?\b/i,
  "round-tube": /\bround tubes?\b/i,
  rod: /\bsolid round\b|\brods?\b/i,
  "flat-bar": /\bflat bars?\b/i,
};

// What the staircase case study says each family did in that stair.
const STAIRCASE_USE: Partial<Record<ProfileCategory, string>> = {
  "i-beam": "I-beam stringers and landing beams with square tubes, in vinyl ester",
  "square-tube": "Square tubes with the I-beam stringers and landing beams, in vinyl ester",
  "round-tube": "Round tube handrails in UV-stabilised polyester",
  "flat-bar": "Flat bar kick plates in UV-stabilised polyester",
};

export const factoryStaircase: Omit<ApplicationCard, "used"> = {
  href: "/case-studies/factory-access-staircase",
  kind: "Case study",
  title: "Factory access staircase",
  text: "A bolted FRP stair in our Chongqing plant, assembled by four people with hand tools: no welding, hot work or crane.",
  image: "/images/case-studies/frp-factory-staircase-structural-view.webp",
  imageAlt: "FRP I-beam stringers and pultruded profiles forming a staircase frame in F1 Composite's factory",
};

export function familyApplications(category: ProfileCategory, limit = 3): ApplicationCard[] {
  const cards: ApplicationCard[] = [];
  const staircase = STAIRCASE_USE[category];
  if (staircase) cards.push({ ...factoryStaircase, used: staircase });
  const matches = applicationPages
    .map((page) => ({ page, line: page.recommendedProfiles.find((profile) => FAMILY_WORDS[category].test(profile)) }))
    .filter((match): match is { page: (typeof applicationPages)[number]; line: string } => Boolean(match.line))
    // The application that names the family first relies on it most.
    .sort((a, b) => a.page.recommendedProfiles.indexOf(a.line) - b.page.recommendedProfiles.indexOf(b.line));
  for (const { page, line } of matches) {
    cards.push({
      href: `/applications/${page.slug}`,
      kind: "Application",
      title: page.shortTitle,
      text: `${line}.`,
      image: page.image,
      imageAlt: page.imageAlt,
    });
  }
  return cards.slice(0, limit);
}
