// The design manual is generated from the site's data (scripts/build-design-manual.mjs).
// These tests build the HTML without a browser and check that it carries the
// catalog, the laminate values and the published design basis unchanged, that
// no retracted claim appears, and that the published PDF is the one the site
// links to.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";
import { MANUAL, build } from "./build-design-manual.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const { htmlPath, pages } = build({ htmlOnly: true });
const html = readFileSync(htmlPath, "utf8");
const text = html.replace(/<style>[\s\S]*?<\/style>/, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");

test("every catalog size and its published mass are in the section tables", () => {
  const { buildProducts } = loadProjectModule("lib/catalog/standardProfiles.ts");
  const products = buildProducts();
  assert.equal(products.length, 114);
  for (const product of products) {
    const row = html.match(new RegExp(`<th scope="row">${product.model.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</th><td class="num">([^<]*)</td>(?:<td class="num">[^<]*</td>){0,2}<td class="num">([^<]*)</td>`));
    assert.ok(row, `${product.model} is missing from the section tables`);
  }
  for (const product of products) {
    assert.ok(html.includes(`<th scope="row">${product.model}</th>`), `${product.model} row`);
    assert.ok(html.includes(`>${product.weight}</td>`), `${product.model} published mass ${product.weight}`);
  }
});

test("the laminate table prints the published E23 values and the EN minimums", () => {
  const { E23_ISO_PUBLISHED, E23_MIN, E17_MIN, PROPERTY_ROWS } = loadProjectModule("lib/catalog/en13706.ts");
  for (const row of PROPERTY_ROWS) {
    assert.ok(text.includes(row.label), row.label);
    assert.ok(text.includes(row.method), `${row.label} method ${row.method}`);
  }
  assert.ok(text.includes(`${E23_ISO_PUBLISHED.shear_mpa} MPa`));
  assert.ok(text.includes(`${E23_MIN.pin_bearing_l_mpa} MPa`));
  assert.ok(text.includes(`${E17_MIN.e_l_gpa} GPa`));
  assert.ok(text.includes(E23_ISO_PUBLISHED.resin), "the standard resin is named");
  assert.ok(text.includes("EN 13706-2 Annex E"), "pin bearing cites Annex E");
  assert.ok(!/EN ISO 1430\b/.test(text), "the wrong ILSS citation of Rev. A is gone");
});

test("the allowable-load tables match lib/spanTables.ts", () => {
  const { buildSpanTables } = loadProjectModule("lib/spanTables.ts");
  for (const family of buildSpanTables()) {
    for (const row of family.rows) {
      const cells = row.cells.map((c) => (c.w < 0.05 ? "—" : `${c.w < 1 ? c.w.toFixed(2) : c.w.toFixed(1)}<sup>${{ deflection: "d", bending: "b", shear: "v" }[c.governs]}</sup>`));
      const needle = cells.map((c) => `<td class="num">${c}</td>`).join("");
      assert.ok(html.includes(needle), `${row.model} span row`);
    }
  }
});

test("the design basis is the published one", () => {
  const { DESIGN_BASIS } = loadProjectModule("lib/spanTables.ts");
  assert.ok(text.includes(DESIGN_BASIS.method));
  assert.ok(text.includes(DESIGN_BASIS.deflectionLimit));
  assert.ok(text.includes(DESIGN_BASIS.environment));
});

test("no retracted claim and no Rev. A artefact appears", () => {
  const forbidden = [
    // The site's own rule (scripts/check-copy.mjs): the claim, not the word.
    [/maintenance[- ]free (design |service )?life|zero maintenance|\b0 maintenance\b/i, "maintenance-free claim"],
    [/\b(50|60|75|100)\+?[- ]year (design )?life/i, "service-life claim"],
    [/\b\d+-year warranty/i, "warranty claim"],
    [/ISO 9001(:\d{4})?[- ]certified/i, "ISO 9001 certified wording"],
    // The standard may be named in a list; the Rev. A classification claims may not.
    [/BS 476 Part 7 Class [12]|Class 2 & Class 1|B fl s1|Platform System \(Type/, "BS 476 classification table"],
    [/FL-P22/, "Rev. A epoxy formulation"],
    [/Aluminium Deck|Avtag|Avtur/, "copied catalogue rows"],
    [/supplied as standard in Epoxy/i, "epoxy as standard"],
    [/ISO 4892-2 .{0,30}Passed/i, "unsupported UV claim"],
  ];
  for (const [pattern, why] of forbidden) assert.ok(!pattern.test(text), `${why}: ${text.match(pattern)?.[0]}`);
});

test("company facts come from company.ts", () => {
  const { company, supplyTerms } = loadProjectModule("content/data/company.ts");
  assert.ok(text.includes(company.legalName));
  assert.ok(text.includes(company.contact.email));
  assert.ok(text.includes(company.contact.phone));
  assert.ok(text.includes(`${supplyTerms.standardLengthM} m`));
  assert.ok(!text.includes("f1frp2015@gmail.com"), "the private e-mail of Rev. A is gone");
});

test("the PDF the site links to exists and is this revision", () => {
  const pdfPath = join(root, "public", MANUAL.file);
  assert.ok(existsSync(pdfPath), `${MANUAL.file} is not built; run node scripts/build-design-manual.mjs`);
  const pdf = readFileSync(pdfPath);
  assert.equal(pdf.subarray(0, 5).toString("latin1"), "%PDF-");
  const pdfPages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  assert.equal(pdfPages, pages, "PDF page count matches the generated pages");
  const { engineeringEvidence } = loadProjectModule("content/data/engineeringEvidence.ts");
  const record = engineeringEvidence.find((item) => item.file === MANUAL.file);
  assert.ok(record, "the manual is in the evidence library");
  assert.ok(record.reference.includes(`Rev. ${MANUAL.revision}`));
  const { fallbackDownloads } = loadProjectModule("content/data/downloads.ts");
  assert.ok(fallbackDownloads.some((item) => item.file === MANUAL.file), "the manual is in the downloads list");
});
