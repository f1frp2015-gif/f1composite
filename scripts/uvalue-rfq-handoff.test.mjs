import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadProjectModule } from "./load-project-module.mjs";

const Calculator = loadProjectModule("app/technology/frp-u-value-calculator/UValueCalculator.tsx").default;
const { parseRfqFragment } = loadProjectModule("lib/rfq.ts");

test("rendered U-value quote preserves the complete calculation prefill outside the HTTP query", () => {
  const html = renderToStaticMarkup(createElement(Calculator));
  const match = html.match(/href="([^"]+)"[^>]*>Get a window quote<\/a>/);
  assert.ok(match, "The computed result must expose a quote link");
  const url = new URL(match[1].replaceAll("&amp;", "&"), "https://www.f1composite.com");
  assert.equal(url.pathname, "/contact");
  assert.deepEqual([...url.searchParams], [["source", "u-value-calculator"], ["inquiry_type", "rfq"]]);
  const prefill = parseRfqFragment(url.hash);
  assert.equal(prefill.error, undefined);
  assert.deepEqual(prefill.context, {
    tool: "u-value", frame: "F1 FRP 70-Series (70 mm, 3-chamber)", Uf: 1.2,
    glass: "Triple — 4/14Ar/4/14Ar/4 2×Low-E", Ug: 0.6,
    spacer: "Warm-edge (standard)", psi: 0.04, windowType: "Casement / Tilt-turn",
    width_mm: 1200, height_mm: 1400, Uw: 0.898, rating: "0.81–1.00 performance band",
    glass_ratio_pct: 67, vs_aluminum_pct: 44,
  });
  assert.equal(prefill.message, [
    "Please review this whole-window U-value calculation (EN ISO 10077-1):", "",
    "Frame: F1 FRP 70-Series (70 mm, 3-chamber) (Uf 1.2 W/m²·K)",
    "Glass: Triple — 4/14Ar/4/14Ar/4 2×Low-E (Ug 0.6 W/m²·K)",
    "Spacer: Warm-edge (standard) (Ψg 0.04 W/m·K)",
    "Window: Casement / Tilt-turn, 1200×1400 mm, glass ratio 67%", "",
    "Result: Uw = 0.90 W/m²·K (0.81–1.00 performance band), 44% better than an aluminum-no-break baseline", "",
    "Project location / target standard (please add): ____",
    "Quantities / sizes (please add): ____", "", "Thanks.",
  ].join("\n"));
});
