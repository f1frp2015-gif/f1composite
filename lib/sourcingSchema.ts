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
        "Primary recommended FRP product family — one of: Standard structural profiles, Fiberglass sheets, Pultruded FRP plate profiles, Fiberglass stakes and marker rods, Fiberglass snow markers, Custom pultrusions, FRP fenestration systems, FRP grating, Structural FRP deck panels, Industrial FRP fixed ladders, FRP handrail/guardrail systems, Mixed (multi-family).",
      ),
    why: z.string().describe("Why this family fits the application."),
    products: z
      .array(
        z.object({
          name: z.string().describe("Specific profile or product line"),
          path: z
            .string()
            .describe(
              "Internal F1 Composite URL path that documents this product, starting with /. Pick from /products/fiberglass-structural-shapes/{frp-i-beam,frp-channel,frp-angle,frp-square-tube,frp-tube,frp-flat-bar,frp-rod}, /products/fiberglass-sheets, /products/fiberglass-plates, /products/fiberglass-stakes, /products/fiberglass-snow-markers, /products/custom-pultruded-profiles, /products/frp-window-frames, /products/frp-facade-panels, /products/frp-gratings (open pultruded grating), /products/molded-frp-grating, /products/frp-deck-panels, /products/frp-ladders, /products/frp-handrail-systems, /pultruded-frp-profiles. Never invent paths.",
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
    alternatives: z
      .array(z.string())
      .max(3)
      .describe("Up to three viable alternative resin systems. Return an empty array when none apply."),
  }),
  standards: z
    .array(z.string())
    .min(1)
    .max(8)
    .describe("Relevant manufacturing, testing, or design standards (for example EN 13706, ASTM D3917, ISO 9001; OSHA 1910.23/28/29 or ISO 14122-3/4 only when access-system scope applies)."),
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
    .describe("Matching published case studies. Return an empty array when no existing case study is relevant."),
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
