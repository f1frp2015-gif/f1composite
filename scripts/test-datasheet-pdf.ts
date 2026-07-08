// Local smoke test for the datasheet PDF pipeline — renders a 3-product
// catalog extract (I-beam / SHS / CHS) from in-memory rows, no DB required.
// Run: npx tsx scripts/test-datasheet-pdf.ts /tmp/out.pdf

import { writeFileSync } from "node:fs";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { DatasheetDocument } from "../lib/pdf/datasheet";
import type { CategoryRow, FormulationRow, ProductRow } from "../lib/catalog/db";

const formulation: FormulationRow = {
  id: 1,
  code: "E23-ISO",
  name: "E23 structural laminate (isophthalic polyester / E-glass)",
  resin: "Isophthalic unsaturated polyester",
  resin_family: "unsaturated_polyester",
  pin_bearing_l_mpa: 150,
  pin_bearing_t_mpa: 70,
  glass_content: "65–70% by weight",
  density_g_cm3: 1.9,
  en13706_grade: "E23",
  fire_rating: "ASTM E84 Class A (FSI ≤ 25)",
  e_l_gpa: 23,
  e_t_gpa: 7,
  tensile_l_mpa: 240,
  tensile_t_mpa: null,
  flexural_l_mpa: 240,
  flexural_t_mpa: null,
  shear_mpa: 30,
  compressive_l_mpa: null,
  barcol: null,
  water_abs_pct: null,
  notes: null,
};

const category: CategoryRow = { id: 1, slug: "i-beam", name: "I-Beams / Wide Flange", description: null, sort: 1 };

const products: ProductRow[] = [
  {
    id: 1, model: "I 240×120×12", name: null, category_id: 1, formulation_id: 1,
    geometry: { kind: "parametric", shape: "i_beam", dims: { H: 240, B: 120, tf: 12, tw: 12 } },
    weight_per_m: 8.4, standards: "EN 13706 Grade E23 · ASTM E84 Class A",
    applications: "Walkways, platforms, cooling towers", tolerances: null, status: "active", sort: 1,
  },
  {
    id: 2, model: "SHS 100×100×6", name: null, category_id: 1, formulation_id: 1,
    geometry: { kind: "parametric", shape: "shs", dims: { D: 100, t: 6 } },
    weight_per_m: 3.5, standards: "EN 13706 Grade E23", applications: null, tolerances: null, status: "active", sort: 2,
  },
  {
    id: 3, model: "CHS 100×6", name: null, category_id: 1, formulation_id: 1,
    geometry: { kind: "parametric", shape: "tube", dims: { OD: 100, t: 6 } },
    weight_per_m: 2.7, standards: "EN 13706 Grade E23", applications: null, tolerances: null, status: "active", sort: 3,
  },
];

async function main() {
  const out = process.argv[2] ?? "/tmp/datasheet-test.pdf";
  const element = React.createElement(DatasheetDocument, {
    data: {
      products,
      formulations: new Map([[1, formulation]]),
      categories: new Map([[1, category]]),
    },
  }) as unknown as Parameters<typeof renderToBuffer>[0];
  const buffer = await renderToBuffer(element);
  writeFileSync(out, buffer);
  console.log(`wrote ${out} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
