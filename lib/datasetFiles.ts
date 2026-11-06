import { buildSpanTables, DESIGN_BASIS, SPANS_MM } from "@/lib/spanTables";
import { astmGfrpChartRows, metricGfrpChartRows, GFRP_CHART_DENSITY_GCM3, STEEL_DENSITY_GCM3 } from "@/lib/gfrpRebar";
import { gratingSpecificationsCsv } from "@/lib/gratingInquiry";

/**
 * The site's tables as static CSV files under /downloads/data, plus the
 * schema.org Dataset that points at them. Static files (not /api routes,
 * which robots.txt disallows) let Google Dataset Search and ordinary search
 * fetch the data, and give engineers a file to cite.
 *
 * scripts/build-dataset-files.mjs writes each file from the builders below;
 * scripts/dataset-files.test.mjs fails when a committed file no longer matches
 * the data, so rerun the script after changing a table.
 */

const SITE_URL = "https://www.f1composite.com";
export const DATA_DIR = "/downloads/data";

const fixed = (value: number, digits: number) => value.toFixed(digits);
const cell = (value: string | number) => {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
// UTF-8 BOM so Excel reads ×, Ø, ² correctly (same as the grating files).
const toCsv = (rows: (string | number)[][]) => "\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n") + "\r\n";

function spanTablesCsv(): string {
  const spans = SPANS_MM.map((mm) => fixed(mm / 1000, 1));
  const header = [
    "family", "model", "depth_h_mm", "width_b_mm", "web_tw_mm", "flange_tf_mm", "published_mass_kg_per_m", "ix_cm4", "wx_cm3",
    ...spans.flatMap((m) => [`allowable_udl_${m}m_kn_per_m`, `governs_${m}m`]),
  ];
  const rows = buildSpanTables().flatMap((family) =>
    family.rows.map((row) => [
      family.id, row.model, row.dims.h, row.dims.b, row.dims.tw, row.dims.tf, row.weightKgPerM,
      fixed(row.IxMm4 / 1e4, 1), fixed(row.WxMm3 / 1e3, 2),
      ...row.cells.flatMap((c) => [fixed(c.w, 2), c.governs]),
    ]),
  );
  return toCsv([header, ...rows]);
}

function rebarSizeChartCsv(): string {
  const header = ["system", "designation", "diameter_mm", "diameter_in", "area_mm2", "area_in2", "gfrp_kg_per_m", "gfrp_lb_per_ft", "steel_kg_per_m", "steel_lb_per_ft", "closest_astm_designation"];
  const row = (system: string, r: ReturnType<typeof astmGfrpChartRows>[number], closest: string) => [
    system, r.designation, fixed(r.diameterMm, 1), fixed(r.diameterIn, 3), fixed(r.areaMm2, 1), fixed(r.areaIn2, 3),
    fixed(r.gfrpKgPerM, 3), fixed(r.gfrpLbPerFt, 3), fixed(r.steelKgPerM, 3), fixed(r.steelLbPerFt, 3), closest,
  ];
  return toCsv([
    header,
    ...astmGfrpChartRows().map((r) => row("ASTM D7957", r, r.designation)),
    ...metricGfrpChartRows().map((r) => row("Metric (F1 inquiry sizes)", r, r.closestAstm)),
  ]);
}

export interface DatasetFile {
  id: string;
  /** Public path of the CSV. */
  path: string;
  /** Page that shows the table and carries the Dataset markup. */
  pagePath: string;
  name: string;
  description: string;
  keywords: string[];
  variableMeasured: string[];
  csv: () => string;
}

export const DATASET_FILES: DatasetFile[] = [
  {
    id: "span-tables",
    path: `${DATA_DIR}/f1-frp-span-tables-allowable-uniform-load.csv`,
    pagePath: "/frp-span-tables",
    name: "FRP Profile Span Tables — Allowable Uniform Load (EN 13706 E23)",
    description: `Allowable service uniform load for the published F1 pultruded FRP I-beams, channels, square and rectangular tubes and round tubes at simple spans of 1–6 m, with the governing check. Basis: ${DESIGN_BASIS.material}; ${DESIGN_BASIS.method}; ${DESIGN_BASIS.environment}; ${DESIGN_BASIS.loadCase}; deflection ${DESIGN_BASIS.deflectionLimit}.`,
    keywords: ["FRP span table", "fiberglass beam span chart", "pultruded profile load table", "FRP I-beam span table", "FRP channel load capacity", "fiberglass tube span chart", "EN 13706 E23", "ASCE/SEI 74-23"],
    variableMeasured: ["Allowable uniform distributed load (kN/m)", "Governing check (deflection, bending or shear)", "Moment of inertia Ix (cm⁴)", "Section modulus Wx (cm³)", "Published mass (kg/m)"],
    csv: spanTablesCsv,
  },
  {
    id: "gfrp-rebar-size-chart",
    path: `${DATA_DIR}/gfrp-rebar-size-chart.csv`,
    pagePath: "/resources/gfrp-rebar-size-chart",
    name: "GFRP Rebar Size Chart — Nominal Diameter, Area and Weight",
    description: `Nominal diameter and area for ASTM D7957 GFRP bar designations No. 2–No. 10 and the metric diameters F1 quotes (Ø6–Ø36 mm), with weight per meter and per foot calculated from the nominal area at ${GFRP_CHART_DENSITY_GCM3} g/cm³ for GFRP and ${STEEL_DENSITY_GCM3} g/cm³ for steel.`,
    keywords: ["GFRP rebar size chart", "fiberglass rebar weight per foot", "ASTM D7957 bar sizes", "GFRP bar area", "fiberglass rebar vs steel weight"],
    variableMeasured: ["Nominal diameter (mm, in)", "Nominal area (mm², in²)", "GFRP weight (kg/m, lb/ft)", "Steel weight of the same size (kg/m, lb/ft)"],
    csv: rebarSizeChartCsv,
  },
  {
    id: "molded-grating",
    path: `${DATA_DIR}/f1-molded-frp-grating-specifications.csv`,
    pagePath: "/products/molded-frp-grating",
    name: "Molded FRP Grating Specifications — Mesh, Depth, Weight and Open Area",
    description: "Nominal mesh designation, depth, bar top and bottom width, panel options, weight per square meter and open area for F1 molded FRP grating. Selection data; not a load table.",
    keywords: ["molded FRP grating specifications", "fiberglass grating weight per square meter", "FRP grating open area", "molded grating mesh sizes"],
    variableMeasured: ["Depth (mm)", "Bar width top / bottom (mm)", "Nominal weight (kg/m²)", "Open area (%)"],
    csv: () => gratingSpecificationsCsv("molded"),
  },
  {
    id: "pultruded-grating",
    path: `${DATA_DIR}/f1-pultruded-frp-grating-specifications.csv`,
    pagePath: "/products/frp-gratings",
    name: "Pultruded FRP Grating Specifications — Bar Type, Depth, Centers, Weight and Open Area",
    description: "Series family, bearing-bar type, depth, bearing-bar and cross-bar centers, weight per square meter and open area for F1 pultruded FRP grating. Selection data; not a load table.",
    keywords: ["pultruded FRP grating specifications", "I-bar T-bar fiberglass grating", "FRP grating bearing bar centers", "pultruded grating weight per square meter"],
    variableMeasured: ["Depth (mm)", "Bearing-bar center (mm)", "Cross-bar center (mm)", "Nominal weight (kg/m²)", "Open area (%)"],
    csv: () => gratingSpecificationsCsv("pultruded"),
  },
];

export function datasetFile(id: string): DatasetFile {
  const file = DATASET_FILES.find((item) => item.id === id);
  if (!file) throw new Error(`Unknown dataset ${id}`);
  return file;
}

/** schema.org Dataset for a page that shows one of the tables, with its CSV as the distribution. */
export function datasetSchema(id: string) {
  const file = datasetFile(id);
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}${file.pagePath}#dataset`,
    name: file.name,
    description: file.description,
    url: `${SITE_URL}${file.pagePath}`,
    keywords: file.keywords,
    variableMeasured: file.variableMeasured,
    creator: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    license: `${SITE_URL}/terms`,
    isAccessibleForFree: true,
    inLanguage: "en",
    distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE_URL}${file.path}` }],
  };
}
