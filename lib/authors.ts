export type AuthorBucket = "engineering-case" | "rd-tech" | "education";

export interface Author {
  slug: string;
  name: string;
  fullName: string;
  credentials: string;
  jobTitle: string;
  bucket: AuthorBucket;
  bucketLabel: string;
  bio: string;
  expertise: string[];
  knowsAbout: string[];
  accent: string;
  // Optional external profile links — fill these in when available; an empty
  // string is filtered out before being emitted into Person schema sameAs.
  linkedinUrl?: string;
  orcidUrl?: string;
}

export const authors: Author[] = [
  {
    slug: "yifan-liu",
    name: "Yifan Liu",
    fullName: "Yifan Liu, Application Engineer",
    credentials: "Application Engineer",
    jobTitle:
      "Senior Application Engineer — pultruded FRP structural design and project specification",
    bucket: "engineering-case",
    bucketLabel: "Engineering & Case Studies",
    bio: "Yifan leads project-side application engineering at F1 Composite. The work is the practical translation between client load cases, environmental constraints, and the stock or custom pultruded section that actually meets the brief — including connection detailing, field installation guidance, and lifecycle-cost framing for procurement.",
    expertise: [
      "Pultruded FRP structural design",
      "Bridge deck and walkway specification",
      "Connection detailing (bolted, bonded, hybrid)",
      "Coastal and marine application engineering",
      "Lifecycle cost analysis for engineers and owners",
    ],
    knowsAbout: [
      "Pultruded FRP profiles",
      "EN 13706 specification",
      "ASTM D3917 dimensional tolerance",
      "ASCE/SEI 74-23 LRFD design",
      "FRP cable tray engineering",
      "AS/NZS 4420 fenestration installation",
    ],
    accent: "#0f8a83",
  },
  {
    slug: "haifeng-gong",
    name: "Haifeng Gong",
    fullName: "Haifeng Gong, Ph.D.",
    credentials: "Ph.D.",
    jobTitle:
      "R&D Lead — composite materials, pultrusion process development, and standards",
    bucket: "rd-tech",
    bucketLabel: "R&D & Materials Science",
    bio: "Haifeng leads materials and process R&D at F1 Composite. The focus areas are resin chemistry selection (polyester, vinyl ester, polyurethane, phenolic), fiber architecture for cross-direction strength without surface telegraph, fire and thermal performance, and standards research that turns lab capability into specifications customers can defend in design review.",
    expertise: [
      "Composite materials science",
      "Pultrusion process development and simulation",
      "Resin chemistry and fire-retardant systems",
      "Thermal performance and Passivhaus certification work",
      "Thermoset FRP recycling and sustainability research",
    ],
    knowsAbout: [
      "Vinyl ester and polyurethane pultrusion",
      "Phenolic FRP for fire-rated applications",
      "EN 45545-2 rolling stock fire compliance",
      "PHI Passivhaus component certification",
      "Pultrusion patent and forum landscape",
      "Chemical degradation recycling of thermoset composites",
    ],
    accent: "#117d76",
  },
  {
    slug: "duowei-wang",
    name: "Duowei Wang",
    fullName: "Duowei Wang, Ph.D.",
    credentials: "Ph.D.",
    jobTitle:
      "Industry research and education — markets, standards, and pultrusion adoption",
    bucket: "education",
    bucketLabel: "Industry Research & Education",
    bio: "Duowei leads industry research at F1 Composite. The work is to keep the picture of the global pultrusion market — peer activity, association priorities, exhibition signals, patent themes, and procurement reality — grounded in primary sources, then translate that picture into education content engineers and buyers can actually use.",
    expertise: [
      "Pultrusion industry research and competitive benchmarking",
      "Standards tracking (ACMA, EPTA, EuCIA, ISO, EN, ASTM)",
      "Global market analysis (EU, NA, ME, AU)",
      "Procurement and direct-from-China sourcing education",
      "Patent landscape and technology-path scouting",
    ],
    knowsAbout: [
      "Pultrusion industry trends",
      "ACMA / EPTA / EuCIA standards work",
      "JEC World and CAMX exhibition signals",
      "EN 15804 / ISO 14025 environmental product declarations",
      "China-to-EU/US/AU pultrusion sourcing economics",
      "Recent pultrusion patent filings (US / CN / EU)",
    ],
    accent: "#0d9a92",
  },
];

export const authorsBySlug: Record<string, Author> = Object.fromEntries(
  authors.map((a) => [a.slug, a]),
);

// Reverse-lookup helper: given a stored authorName from blogPosts.ts,
// return the corresponding author slug. Falls back to undefined if the
// name does not match any registered author.
export function authorSlugByName(name: string): string | undefined {
  return authors.find((a) => a.fullName === name || a.name === name)?.slug;
}
