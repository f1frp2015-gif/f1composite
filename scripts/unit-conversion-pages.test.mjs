// Single-pair conversion pages (lib/unitConversionPages.ts) at /tools/frp-unit-converter/<pair>.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const m = loadProjectModule("lib/unitConversionPages.ts");

test("factors are the exact psi definition in both directions", () => {
  const msiGpa = m.conversionPage("msi-to-gpa");
  assert.ok(Math.abs(m.convertPair(msiGpa, 1) - 6.894757293168) < 1e-9);
  assert.equal(m.conversionFactor(msiGpa).forward, "6.894757");
  assert.equal(m.conversionFactor(m.conversionPage("mpa-to-ksi")).forward, "0.1450377");
  assert.equal(m.conversionFactor(m.conversionPage("msi-to-ksi")).forward, "1,000");
  for (const page of m.UNIT_CONVERSION_PAGES) {
    const there = m.convertPair(page, 7.5);
    assert.ok(Math.abs(m.convertPair(page, there, page.to, page.from) - 7.5) < 1e-9, page.slug);
  }
});

test("titles and descriptions fit the metadata limits and name the pair", () => {
  for (const page of m.UNIT_CONVERSION_PAGES) {
    const { from, to } = m.conversionLabels(page);
    const title = m.conversionTitle(page), description = m.conversionDescription(page);
    assert.ok(title.length <= 60 && title.startsWith(`${from} to ${to}`), title);
    assert.ok(description.length >= 120 && description.length <= 160, `${description.length}: ${description}`);
    assert.match(page.slug, /^[a-z]+-to-[a-z]+$/);
  }
});

test("FRP reference rows come from the converter's own examples", () => {
  const rows = m.referenceRows(m.conversionPage("gpa-to-msi"));
  assert.deepEqual(rows.find((row) => row.label === "E23 lengthwise modulus"), { label: "E23 lengthwise modulus", from: "23", to: "3.336" });
  assert.equal(m.referenceRows(m.conversionPage("mpa-to-ksi")).find((row) => row.label.includes("E23 tensile")).to, "34.81");
});

test("pages are in the sitemap and linked from the converter", () => {
  assert.match(read("app/sitemap.ts"), /UNIT_CONVERSION_PAGES\.map\(\(page\) => \(\{ url: `\$\{BASE\}\$\{conversionPath\(page\.slug\)\}`/);
  const converter = read("app/tools/frp-unit-converter/page.tsx");
  assert.match(converter, /title: "Single conversions", links: UNIT_CONVERSION_PAGES\.map/);
  assert.match(converter, /"@id": `\$\{absoluteUrl\(pagePath\)\}#webapp`/);
  assert.match(read("app/tools/frp-unit-converter/[pair]/page.tsx"), /export const dynamicParams = false;/);
});
