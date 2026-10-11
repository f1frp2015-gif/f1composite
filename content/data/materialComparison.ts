import { E23_MIN, E23_ISO_PUBLISHED } from "@/lib/catalog/en13706";

const site = "https://www.f1composite.com";

/** Teaching model: equal Euler–Bernoulli bending stiffness, not member design. */
export const equalStiffnessExample = {
  spanMm: 3000,
  uniformLoadNPerMm: 1,
  steelModulusGPa: 200, // Explicit example input, not a supplied steel certificate.
  frpModulusGPa: E23_MIN.e_l_gpa,
  steelInertiaMm4: 1_000_000,
};
const example = equalStiffnessExample;
export const equalStiffnessResults = {
  requiredFrpInertiaMm4: example.steelInertiaMm4 * example.steelModulusGPa / example.frpModulusGPa,
  inertiaRatio: example.steelModulusGPa / example.frpModulusGPa,
  steelBendingDeflectionMm: 5 * example.uniformLoadNPerMm * example.spanMm ** 4 / (384 * example.steelModulusGPa * 1000 * example.steelInertiaMm4),
  sameSectionFrpBendingDeflectionMm: 5 * example.uniformLoadNPerMm * example.spanMm ** 4 / (384 * example.frpModulusGPa * 1000 * example.steelInertiaMm4),
};

/** Shared by the HTML comparison and machine-readable public knowledge. */
export const materialComparisonContext = {
  revision: "2026-10-11",
  url: `${site}/technology/frp-vs-traditional-materials`,
  materialData: `${site}/resources/technical-data`,
  costModel: `${site}/tools/frp-life-cycle-cost-calculator`,
  scope: "Compare alternatives for the same function, span, loads, deflection, environment and design life. Material properties alone do not establish equivalent member performance.",
  frpReference: {
    formulationCode: "E23-ISO",
    resin: E23_ISO_PUBLISHED.resin,
    publishedDensityGPerCm3: E23_ISO_PUBLISHED.density_g_cm3,
    densityBasis: "Published nominal laminate value, not a batch measurement or every FRP resin.",
    grade: "EN 13706 E23",
    gradeMinimums: {
      longitudinalTensileModulusGPa: E23_MIN.e_l_gpa,
      transverseTensileModulusGPa: E23_MIN.e_t_gpa,
      longitudinalTensileStrengthMPa: E23_MIN.tensile_l_mpa,
      transverseTensileStrengthMPa: E23_MIN.tensile_t_mpa,
    },
    basis: "EN 13706-3:2002 Table 1 grade requirements. These are not configuration-specific measured results, allowable stresses or a certificate for every catalog product.",
    sourceUrl: `${site}/resources/technical-data`,
    evidenceUrl: `${site}/resources/evidence`,
  },
  corrosion: "No steel-like rusting; chemical compatibility requires the named resin, chemical composition, concentration, temperature, contact conditions and surface system.",
  electrical: "Glass reinforcement can support insulating designs. The offered formulation, moisture, contamination, conductive additives and test configuration control electrical suitability.",
  maintenance: "Use the offered surface system, exposure, inspections and supplier recommendations. No universal recoating interval or service life is assumed.",
  environmentalComparison: "Compare an equivalent installed function using compatible EPD or LCA boundaries, service lives and end-of-life assumptions; no generic carbon advantage is assigned.",
  example: {
    ...equalStiffnessExample,
    ...equalStiffnessResults,
    status: "Illustrative calculation; steel modulus, span, load and inertia are chosen inputs. The FRP modulus is an E23 reference, not evidence for a selected member.",
    exclusions: "Shear deflection, creep, connections, local buckling, temperature, durability factors, strength checks and self-weight differences. No catalog section is approved by this example.",
  },
} as const;
