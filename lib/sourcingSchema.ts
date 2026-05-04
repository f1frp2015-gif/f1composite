import { z } from "zod";

export const sourcingRecommendationSchema = z.object({
  summary: z
    .string()
    .describe(
      "One-paragraph executive summary of what F1 Composite would recommend for this project. Plain text, no markdown.",
    ),
  profileFamily: z.object({
    name: z
      .string()
      .describe(
        "Primary recommended FRP product family — one of: Standard structural profiles, Custom pultrusions, FRP fenestration systems, FRP gratings and deck panels, Mixed (multi-family).",
      ),
    why: z.string().describe("Why this family fits the application."),
    products: z
      .array(
        z.object({
          name: z.string().describe("Specific profile or product line"),
          path: z
            .string()
            .describe(
              "Internal F1 Composite URL path that documents this product, starting with /. Pick from /products/standard-profiles/{i-beam,channel,angle,square-tube,tube,flat-bar,rod}, /products/custom-pultrusions, /products/fenestration-systems, /products/gratings, /pultruded-frp-profiles. Never invent paths.",
            ),
        }),
      )
      .min(1)
      .max(5),
  }),
  resinSystem: z.object({
    recommended: z
      .string()
      .describe(
        "Primary resin recommendation: typically isophthalic polyester (general), vinyl ester (chemical/marine), or fire-retardant grades.",
      ),
    why: z.string(),
    alternatives: z.array(z.string()).max(3).optional(),
  }),
  standards: z
    .array(z.string())
    .min(1)
    .max(8)
    .describe("Relevant manufacturing, testing, or design standards (EN 13706, ASTM D3917, ISO 9001, etc.)."),
  caseStudyMatches: z
    .array(
      z.object({
        title: z.string(),
        slug: z
          .string()
          .describe(
            "Slug from /case-studies/[slug]. Pick from existing F1 Composite case studies if relevant, otherwise leave the array empty.",
          ),
        why: z.string(),
      }),
    )
    .max(3)
    .optional(),
  rfqInputs: z
    .array(z.string())
    .min(3)
    .max(8)
    .describe("Concrete inputs F1 Composite needs from the buyer to produce a binding quote."),
  nextSteps: z
    .array(
      z.object({
        label: z.string(),
        href: z
          .string()
          .describe(
            "Internal URL path starting with /. Common targets: /contact, /ask, /pultruded-frp-profiles, /resources/technical-data.",
          ),
      }),
    )
    .min(1)
    .max(4),
});

export type SourcingRecommendation = z.infer<typeof sourcingRecommendationSchema>;
