import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";
import { extractSearchPages, OUTPUT, serialize } from "./search-pages.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const { buildSearchIndex } = loadProjectModule("lib/search/buildIndex.ts");
const { normalize, parseSizeQuery, prepareIndex, search } = loadProjectModule("lib/search/query.ts");
const entries = buildSearchIndex();
const index = prepareIndex(entries);
const titles = (query, kind) => search(index, query).groups.find((group) => group.kind === kind)?.hits.map((hit) => hit.entry.title) ?? [];

test("the committed page index matches the page sources", async () => {
  assert.equal(serialize(await extractSearchPages()), read(OUTPUT), "Page titles or descriptions changed: run `node scripts/search-pages.mjs` and commit lib/search/pages.generated.json");
});

test("every static page, catalog size and document is in the index", () => {
  const pageFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? pageFiles(join(dir, entry.name)) : entry.name === "page.tsx" ? [join(dir, entry.name)] : []));
  const routes = pageFiles(join(root, "app"))
    .map((file) => `/${relative(join(root, "app"), dirname(file)).split(sep).join("/")}`.replace(/^\/$/, "/"))
    .map((route) => (route === "/" ? route : route.replace(/\/$/, "")))
    .filter((route) => !route.includes("[") && !route.split("/").includes("embed") && route !== "/search");
  const ids = new Set(entries.map((entry) => entry.id));
  for (const route of routes) assert.ok(ids.has(`page:${route === "" ? "/" : route}`), `${route} is missing from the search index`);

  assert.equal(ids.size, entries.length, "search index ids must be unique");
  for (const entry of entries) assert.match(entry.url, /^\//, `${entry.id} links outside the site`);

  const sizes = entries.filter((entry) => entry.kind === "size");
  assert.equal(sizes.length, 114);
  for (const size of sizes) {
    assert.match(size.url, /^\/datasheets\/[a-z0-9-]+$/);
    if (size.size.dxf) assert.ok(existsSync(join(root, "public", size.size.dxf)), `${size.title}: ${size.size.dxf} does not exist`);
  }
  assert.ok(entries.some((entry) => entry.kind === "document" && /Intertek/.test(entry.title)));
  assert.ok(entries.some((entry) => entry.id === "term:pultrusion"), "glossary terms are indexed");
});

test("sizes are recognised in the ways buyers type them", () => {
  assert.equal(normalize("SHS 100 x 100 x 8"), "shs 100×100×8");
  assert.equal(normalize("I152"), "i 152");
  assert.equal(normalize("6,4 mm"), "6.4 mm");
  assert.deepEqual(parseSizeQuery("100 × 100 × 8 mm"), { dims: [100, 100, 8], shapes: null, bare: false });
  assert.equal(parseSizeQuery("EN 13706"), null);
  assert.equal(parseSizeQuery("grating 38"), null, "a number beside other words is text");

  assert.deepEqual(titles("100x100", "size").sort(), ["L 100×100×10", "L 100×100×8", "SHS 100×100×6", "SHS 100×100×8"]);
  assert.deepEqual(titles("100*100*8", "size").sort(), ["L 100×100×8", "SHS 100×100×8"]);
  assert.deepEqual(titles("I152", "size"), ["I 152×76×6.4"]);
  assert.deepEqual(titles("rod Ø25", "size"), ["Rod Ø25"]);
  assert.deepEqual(titles("60x100", "size"), ["RHS 100×60×8"], "rectangular tubes match with the sides swapped");
  assert.deepEqual(titles("152", "size").length, 5);

  const nearest = search(index, "SHS 100x100x7");
  assert.equal(nearest.closest, true);
  assert.deepEqual(nearest.groups[0].hits.map((hit) => hit.entry.title).sort(), ["SHS 100×100×6", "SHS 100×100×8"]);
});

test("text queries rank the owning page first", () => {
  const top = (query) => search(index, query).groups[0].hits[0].entry;
  assert.equal(top("grating").kind, "product");
  assert.equal(titles("rebar", "product")[0], "FRP Rebar");
  assert.equal(top("span table").url, "/frp-span-tables");
  assert.equal(top("cable tray").url, "/applications/frp-cable-tray-supports");
  assert.ok(titles("AS 2047", "document").some((title) => title.startsWith("Intertek AS 2047")));
  assert.match(search(index, "ISO 9001").groups[0].hits[0].entry.url, /^\/contact\?/, "on-request documents link to a request");
  assert.ok(titles("E23", "glossary").length <= 1, "codes match as a whole, not by their number alone");
  assert.equal(search(index, "xyzzy").total, 0);
});

test("the search code runs in older Safari", () => {
  // Safari before 16.4 rejects a whole script that contains a lookbehind.
  for (const file of ["lib/search/query.ts", "components/search/SearchPalette.tsx"]) {
    if (existsSync(join(root, file))) assert.doesNotMatch(read(file), /\(\?<[=!]/, `${file} uses a regular expression lookbehind`);
  }
});

test("the profile finder lists every catalog size with its section values", () => {
  const { finderRows } = loadProjectModule("lib/profileFinder.ts");
  const rows = finderRows();
  assert.equal(rows.length, 114);
  assert.equal(new Set(rows.map((row) => row.slug)).size, 114);
  const beam = rows.find((row) => row.model === "I 152×76×6.4");
  assert.deepEqual([beam.d, beam.b, beam.t, beam.mass, Math.round(beam.A), beam.Ix, beam.Wx], [152, 76, 6.4, 2.9, 1864, 659.8, 86.81]);
  const flat = rows.find((row) => row.model === "FB 100×10");
  assert.deepEqual([flat.d, flat.b, flat.t], [100, null, 10], "flat bars: width, no second leg, thickness");
  const rod = rows.find((row) => row.model === "Rod Ø25");
  assert.deepEqual([rod.d, rod.b, rod.t], [25, null, null]);
  const tube = rows.find((row) => row.model === "CHS 76×6.4");
  assert.deepEqual([tube.d, tube.b, tube.t], [76, null, 6.4]);
  for (const row of rows) {
    assert.ok(row.A > 0 && row.Ix > 0 && row.Wx > 0, `${row.model}: section values`);
    if (row.dxf) assert.ok(existsSync(join(root, "public/cad", `${row.slug}.dxf`)), `${row.model}: DXF missing`);
  }
});

test("the document library classifies every document by type, issuer and product", () => {
  const { assembleDocuments } = loadProjectModule("lib/documents.ts");
  const { withdrawnDownloads } = loadProjectModule("content/data/engineeringEvidence.ts");
  const documents = assembleDocuments();
  const byTitle = (text) => documents.find((document) => document.title.includes(text));
  assert.ok(documents[0].title.startsWith("E40 evidence"), "pinned E40 reports come first");
  assert.ok(!documents.some((document) => withdrawnDownloads.includes(document.file)), "withdrawn files stay out");

  const turnTilt = byTitle("Turn-and-Tilt");
  assert.deepEqual([turnTilt.type, turnTilt.issuer, turnTilt.product, turnTilt.date], ["Test report", "Intertek", "FRP windows and doors", { label: "Issued", value: "2024-12-11" }]);
  const phi = byTitle("PHI Component Certificate");
  assert.deepEqual([phi.type, phi.issuer, phi.date.label], ["Certificate", "Passive House Institute", "Valid until"]);
  assert.deepEqual([byTitle("BOM Template").type, byTitle("BOM Template").issuer], ["Template", "F1 Composite"]);
  assert.equal(byTitle("ISO 9001").issuer, null, "no issuer is invented for on-request certificates");
  for (const document of documents) assert.ok(document.type && document.product, `${document.title} is classified`);
});
