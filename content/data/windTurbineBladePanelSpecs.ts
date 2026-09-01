export const windBladePanelImages = {
  glass: "/images/products/wind-turbine-blade-panels/pultruded-fiberglass-wind-blade-panel.webp",
  carbon: "/images/products/wind-turbine-blade-panels/pultruded-carbon-fiber-wind-blade-panel.webp",
  hybrid: "/images/products/wind-turbine-blade-panels/carbon-glass-hybrid-wind-blade-panel.webp",
  submittedPanel:
    "/images/products/wind-turbine-blade-panels/gfp-we20-pultruded-panel-test-sample.webp",
  beforeTest:
    "/images/products/wind-turbine-blade-panels/gfp-we20-fatigue-specimens-before-test.webp",
  afterTest:
    "/images/products/wind-turbine-blade-panels/gfp-we20-fatigue-specimens-after-test.webp",
} as const;

export const windBladePanelPrograms = [
  {
    name: "GFRP pultruded panel",
    shortName: "Glass fiber",
    image: windBladePanelImages.glass,
    imageWidth: 492,
    imageHeight: 282,
    alt: "Pultruded fiberglass wind turbine blade panels with longitudinal identification lines",
    summary:
      "A high-glass-content laminate for spar-cap and reinforcement programs where repeatable axial performance and cost control lead the selection.",
    release:
      "Confirm glass grade, resin system, fiber content, surface, section, test plan and finished cut length on the order specification.",
  },
  {
    name: "CFRP pultruded panel",
    shortName: "Carbon fiber",
    image: windBladePanelImages.carbon,
    imageWidth: 605,
    imageHeight: 209,
    alt: "Straight and coiled pultruded carbon fiber wind turbine blade panels",
    summary:
      "A unidirectional carbon-fiber option for blade programs driven by axial stiffness and weight, including large-blade development.",
    release:
      "Carbon grade, tow, resin, cured properties, straightness, surface preparation and project qualification remain grade-specific.",
  },
  {
    name: "Carbon-glass hybrid panel",
    shortName: "Carbon-glass hybrid",
    image: windBladePanelImages.hybrid,
    imageWidth: 605,
    imageHeight: 165,
    alt: "Layered carbon-glass hybrid pultruded panels for wind turbine blade reinforcement",
    summary:
      "A layered hybrid architecture that combines carbon-fiber stiffness with glass-fiber reinforcement for a project-specific performance and cost balance.",
    release:
      "Layer order, carbon-to-glass ratio, interfaces, resin compatibility and allowable design values require an approved laminate definition.",
  },
] as const;

export const gfpWe20Report = {
  reportNumber: "R-L23011205a2.Rev00.EN",
  issueDate: "2023-03-29",
  laboratory: "Shanghai Accur Testing Technology Co., Ltd.",
  customer: "Fengdu New Material (Chongqing) Co., Ltd.",
  sampleName: "Fiber Reinforced Composite",
  material: "GFP-WE20 pultrusion profile",
  resin: "AP3280A",
  hardener: "AP3280B",
  reinforcement: "TM+ Glass",
  testPeriod: "2023-01-30 to 2023-03-28",
  fatigue: {
    specimenId: "L23011205-S01_TTF",
    standard: "ISO 13003:2003",
    atmosphere: "(23±2) °C, (50±10)% RH",
    conditioning: "At least 24 h at (23±2) °C, (50±10)% RH",
    frequency: "5 Hz for 10³ to 10⁷ load cycles",
    loadRatio: "R = 0.1, tension–tension",
    control: "Load control with sine wave; loaded until failure where possible",
    specimenGeometry: "L = 200 mm, b = 10 mm, l₁ = 67 mm; thickness depends on specimen",
    regression: "σa = 957 · N⁻⁰·¹¹⁷⁵",
    slopeExponent: "8.51",
    amplitudeAtOneCycle: "957 MPa",
    correlation: "−0.993",
    goodnessOfFit: "0.985",
  },
  physical: {
    specimenId: "L23011205-S01_W",
    standard: "ISO 1172:1996",
    fiberMassContent: "85.29%",
    fiberVolumeContent: "72.46%",
    resinMassContent: "14.71%",
    density: "2.172 g/cm³",
  },
} as const;

export const gfpWe20FatigueDesignTable = [
  { cycles: "10²", p50Amplitude: "556.8", p50Maximum: "1,237.3", p95Amplitude: "501.1", p95Maximum: "1,113.6" },
  { cycles: "10³", p50Amplitude: "424.8", p50Maximum: "944.0", p95Amplitude: "382.3", p95Maximum: "849.6" },
  { cycles: "10⁴", p50Amplitude: "324.1", p50Maximum: "720.1", p95Amplitude: "291.7", p95Maximum: "648.2" },
  { cycles: "10⁵", p50Amplitude: "247.2", p50Maximum: "549.4", p95Amplitude: "222.5", p95Maximum: "494.5" },
  { cycles: "10⁶", p50Amplitude: "188.6", p50Maximum: "419.1", p95Amplitude: "169.8", p95Maximum: "377.2" },
  { cycles: "10⁷", p50Amplitude: "143.9", p50Maximum: "319.8", p95Amplitude: "129.5", p95Maximum: "287.8" },
  { cycles: "10⁸", p50Amplitude: "109.8", p50Maximum: "244.0", p95Amplitude: "98.8", p95Maximum: "219.6" },
] as const;

export const gfpWe20SourceBoundary =
  "These results apply only to the GFP-WE20 pultruded profile specimens received and tested under report R-L23011205a2.Rev00.EN. They are measured and statistically fitted report values, not guaranteed minima for every panel grade, production lot or service environment.";
