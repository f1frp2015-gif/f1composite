#!/usr/bin/env node
// Build the FRP Grating Product Manual (DOC-GR-2026-EN) as an A4 PDF.
//
// Specification rows come from the data the website renders:
// content/data/moldedGratingSpecs.ts (26 web rows),
// content/data/moldedGratingAdditionalSpecs.ts (23 additional mesh rows),
// content/data/pultrudedGratingSpecs.ts (36 series), content/data/gratingClips.ts
// (clips and starting layout), lib/gratingInquiry.ts (quotation inputs) and
// content/data/company.ts (publisher and contact). Change a value there and
// rebuild; do not edit numbers in this file.
//
// Layout follows scripts/build-design-manual.mjs: HTML with the site's fonts
// and palette, printed by headless Chromium, every page a fixed 210 × 297 mm
// box that is checked for overflow. Photographs are the JPEG copies in
// scripts/grating-manual-assets/ (product-catalog photographs, cropped; the
// same sources as the grating pages' "Catalog photo" figures).
//
//   node scripts/build-grating-manual.mjs             # writes the PDF
//   node scripts/build-grating-manual.mjs --html-only  # HTML only
//   node scripts/build-grating-manual.mjs --out x.pdf
//
// No allowable-load table is printed: load and span data are issued for the
// exact configuration on request (see docs/grating-upgrade/README.md).

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");
export const MANUAL = loadProjectModule("content/data/gratingManual.ts").GRATING_MANUAL;
const { company, companyStatements, supplyTerms } = loadProjectModule("content/data/company.ts");
const { moldedGratingSpecGroups } = loadProjectModule("content/data/moldedGratingSpecs.ts");
const { moldedAdditionalMeshSpecGroups } = loadProjectModule("content/data/moldedGratingAdditionalSpecs.ts");
const { pultrudedGratingSpecGroups } = loadProjectModule("content/data/pultrudedGratingSpecs.ts");
const { gratingClips, gratingClipTypicalStartingLayout, gratingClipLayoutDisclaimer, gratingClipNamingNote, GRATING_CLIP_MATERIAL } = loadProjectModule("content/data/gratingClips.ts");
const { gratingRequestItems } = loadProjectModule("lib/gratingInquiry.ts");
const { KG_M2_TO_LB_FT2 } = loadProjectModule("lib/gratingSelector.ts");

const SITE = "https://www.f1composite.com";
const count = (groups) => groups.reduce((n, g) => n + g.rows.length, 0);
const MOLDED_N = count(moldedGratingSpecGroups) + count(moldedAdditionalMeshSpecGroups);
const MOLDED_MESHES = moldedGratingSpecGroups.length + moldedAdditionalMeshSpecGroups.length;
const PULTRUDED_N = count(pultrudedGratingSpecGroups);
const allPultruded = pultrudedGratingSpecGroups.flatMap((g) => g.rows);
const pct = (rows) => rows.map((r) => Number.parseFloat(r.openArea));
const moldedOpen = pct([...moldedGratingSpecGroups, ...moldedAdditionalMeshSpecGroups].flatMap((g) => g.rows));
const pultrudedOpen = pct(allPultruded);
const depths = (rows) => rows.map((r) => Number.parseFloat(r.depth));
const moldedDepths = depths([...moldedGratingSpecGroups, ...moldedAdditionalMeshSpecGroups].flatMap((g) => g.rows));
const pultrudedDepths = depths(allPultruded);
const range = (a, unit = "") => `${Math.min(...a)}–${Math.max(...a)}${unit}`;

// Series whose product-catalog entry carries the reduced-opening mark.
const REDUCED_OPENING = new Set(["T-1210", "T-1810", "T-2510", "T-1215", "T-2515", "I-4010", "I-40125", "I-4015", "T-3320", "HL-4020"]);
for (const t of REDUCED_OPENING) if (!allPultruded.some((r) => r.type === t)) throw new Error(`Unknown pultruded series ${t}`);

// ── formatting ──────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const lb = (kg) => (Number.parseFloat(kg) * KG_M2_TO_LB_FT2).toFixed(2);
const inch = (mm) => (Number.parseFloat(mm) / 25.4).toFixed(2);
const p = (html) => `<p>${html}</p>`;
const h2 = (s, sub = "") => `<h2>${esc(s)}${sub ? `<span class="sub">${esc(sub)}</span>` : ""}</h2>`;
const h3 = (s) => `<h3>${esc(s)}</h3>`;
const note = (html) => `<div class="note">${html}</div>`;
const ul = (items, cls = "") => `<ul class="list ${cls}">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const ol = (items) => `<ol class="steps">${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
const img = (name) => `file://${join(root, "scripts/grating-manual-assets", `${name}.jpg`)}`;
const photo = (name, caption, cls = "") => `<figure class="ph ${cls}"><img src="${img(name)}" alt=""><figcaption>${caption}</figcaption></figure>`;
function table({ head, body, cls = "", widths = [], aligns = [] }) {
  const colgroup = widths.length ? `<colgroup>${widths.map((w) => `<col style="width:${w}">`).join("")}</colgroup>` : "";
  const th = head.map((c, i) => `<th class="${aligns[i] === "r" ? "num" : ""}">${c}</th>`).join("");
  const tr = body.map((r) => (r.group
    ? `<tr class="grp"><th colspan="${head.length}">${r.group}</th></tr>`
    : `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td class="${aligns[i] === "r" ? "num" : ""}">${c}</td>`)).join("")}</tr>`)).join("");
  return `<table class="t ${cls}">${colgroup}<thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}

// ── figures ─────────────────────────────────────────────────────────────────
const NAVY = "#0b1838", TEAL = "#0a9b91", T3 = "#626d80";
const dim = (x1, y1, x2, y2, label, lx, ly, anchor = "middle") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${TEAL}" stroke-width="0.35" marker-start="url(#a)" marker-end="url(#a)"/><text x="${lx}" y="${ly}" text-anchor="${anchor}" fill="${NAVY}">${label}</text>`;
const defs = `<defs><marker id="a" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse"><path d="M0 0L5 2.5L0 5Z" fill="${TEAL}"/></marker></defs>`;

function moldedFigure() {
  const cells = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) cells.push(`<rect x="${13 + i * 13}" y="${11 + j * 13}" width="10" height="10" fill="#fff"/>`);
  const bars = [0, 1, 2, 3, 4].map((i) => `<path d="M${92 + i * 13} 16 h4 l-0.6 22 h-2.8 Z" fill="${TEAL}" opacity="0.85"/>`).join("");
  return `<svg class="dia" viewBox="0 0 180 58" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace" font-size="2.7">${defs}
    <text x="37.5" y="4.6" text-anchor="middle" fill="${T3}">PLAN · LOAD BARS BOTH WAYS</text>
    <rect x="10" y="8" width="55" height="42" fill="${TEAL}" opacity="0.85"/>${cells.join("")}
    ${dim(13, 53.5, 26, 53.5, "mesh", 19.5, 57)}
    ${dim(68.5, 11, 68.5, 24, "mesh", 70.5, 18.4, "start")}
    <text x="120" y="4.6" text-anchor="middle" fill="${T3}">SECTION THROUGH THE BARS</text>
    <rect x="90" y="16" width="60" height="2.2" fill="${TEAL}" opacity="0.35"/>${bars}
    ${dim(155, 16, 155, 38, "depth", 157, 27.8, "start")}
    ${dim(92, 12.5, 96, 12.5, "top", 94, 10.6)}
    ${dim(105.6, 41.5, 108.4, 41.5, "bottom", 107, 45.6)}
    <text x="120" y="53" text-anchor="middle" fill="${T3}">Bar thickness is listed top / bottom: the bar tapers for demolding.</text>
  </svg>`;
}

function pultrudedFigure() {
  const bars = [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${14 + i * 9}" y="9" width="3.6" height="38" fill="${TEAL}" opacity="0.85"/>`).join("");
  const rods = [17, 37].map((y) => `<rect x="11" y="${y}" width="55" height="1.8" rx="0.9" fill="${NAVY}" opacity="0.7"/>`).join("");
  const tBar = (x) => `<path d="M${x} 16 h9 v2.4 h-3.2 v15.2 h1.6 v2.4 h-5.8 v-2.4 h1.6 v-15.2 h-3.2 Z" fill="${TEAL}" opacity="0.85"/>`;
  const iBar = (x) => `<path d="M${x} 16 h6 v2.4 h-1.8 v15.2 h1.8 v2.4 h-6 v-2.4 h1.8 v-15.2 h-1.8 Z" fill="${TEAL}" opacity="0.85"/>`;
  return `<svg class="dia" viewBox="0 0 180 58" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace" font-size="2.7">${defs}
    <text x="38.5" y="4.6" text-anchor="middle" fill="${T3}">PLAN · PANEL SPANS ALONG THE BEARING BARS</text>
    ${bars}${rods}
    ${dim(15.8, 51, 24.8, 51, "bearing bar c/c", 20.3, 55.2)}
    ${dim(69, 17.9, 69, 37.9, "cross-rod c/c", 71, 28.8, "start")}
    <text x="131" y="4.6" text-anchor="middle" fill="${T3}">SECTION ACROSS THE BARS</text>
    <line x1="104" y1="26" x2="156" y2="26" stroke="${NAVY}" stroke-width="1.2" opacity="0.5"/>
    ${tBar(106)}${tBar(119)}${iBar(137)}${iBar(147)}
    ${dim(160, 16, 160, 36, "depth", 162, 26.8, "start")}
    <text x="117" y="42" text-anchor="middle" fill="${NAVY}">T-bar</text><text x="145" y="42" text-anchor="middle" fill="${NAVY}">I-bar</text>
    <text x="131" y="51" text-anchor="middle" fill="${T3}">Cross-rods pass through the bar webs and are bonded.</text>
  </svg>`;
}

// ── page machinery ──────────────────────────────────────────────────────────
const pages = [];
export const toc = [];
let section = "";
function page(body, opts = {}) {
  pages.push({ body, section: opts.section ?? section, cls: opts.cls ?? "", bare: Boolean(opts.bare) });
  return pages.length;
}
function openSection(number, title, intro, body = "", short = title) {
  section = `${number} · ${short}`;
  toc.push({ number, title, page: pages.length + 1 });
  return page(`<div class="band"><div class="band-num">${number}</div><div class="band-text"><h1>${esc(title)}</h1><p>${intro}</p></div></div>${body}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════

// Cover ─────────────────────────────────────────────────────────────────────
const logoData = `data:image/png;base64,${readFileSync(join(root, "public/brand/f1-logo.png")).toString("base64")}`;
page(`
  <div class="cover-top">
    <img class="logo" src="${logoData}" alt="F1 Composites">
    <div class="cover-kicker mono">Product manual · ${esc(MANUAL.issuedLabel)} edition</div>
    <h1 class="cover-title">FRP Grating<br>Product Manual</h1>
    <p class="cover-sub">${esc(MANUAL.subtitle)}</p>
  </div>
  <div class="cover-bottom">
    <div class="cover-photos">
      <div><img src="${img("molded-coastal-walkway")}" alt=""><span class="mono">Molded grating · bidirectional mesh</span></div>
      <div><img src="${img("pultruded-rooftop-walkway")}" alt=""><span class="mono">Pultruded grating · one-way bearing bars</span></div>
    </div>
    <div class="cover-facts">
      <div><strong>${MOLDED_N}</strong><span>molded configurations in ${MOLDED_MESHES} meshes</span></div>
      <div><strong>${PULTRUDED_N}</strong><span>pultruded bearing-bar series</span></div>
      <div><strong>4</strong><span>catalog resin systems</span></div>
      <div><strong>6</strong><span>walking surfaces</span></div>
    </div>
    <div class="cover-meta mono">${esc(company.brand)} · ${esc(MANUAL.code)} · Rev. ${esc(MANUAL.revision)} · ${esc(MANUAL.issued)} · www.f1composite.com</div>
  </div>`, { bare: true, cls: "cover" });

// Contents and scope ────────────────────────────────────────────────────────
section = "Contents";
const tocSlot = page("{TOC}");

// 01 Range ──────────────────────────────────────────────────────────────────
openSection("01", "The F1-GRID grating range", `Two constructions cover most access floors: a molded mesh that carries load both ways, and a pultruded panel whose bearing bars carry it one way over longer spans. This section sets them side by side.`, `
  <div class="split">
    <div>
      ${h3("Molded or pultruded")}
      ${table({ cls: "small", head: ["", "Molded grating", "Pultruded grating"], widths: ["27mm", "auto", "auto"], body: [
        ["How it is made", "Glass rovings laid both ways in an open mold, wetted out with resin and cured as one panel", "Pultruded I-bar or T-bar bearing bars, drilled and bonded to cross-rods"],
        ["Glass content", "30–35% by weight", "60–65% by weight"],
        ["Load path", "Bidirectional; near-equal strength both ways", "One-way, along the bearing bars"],
        ["Spans", "Short to medium, supports on two or four sides", "Longer clear spans, usually governed by deflection"],
        ["Depths in this manual", `${range(moldedDepths, " mm")}`, `${range(pultrudedDepths, " mm")}`],
        ["Open area", `${range(moldedOpen, "%")}`, `${range(pultrudedOpen, "%")}`],
        ["Largest listed panel", "1788 × 4531 mm (mesh-dependent)", "1524 × 6100 mm"],
        ["Field cutting", "Cut in any direction around penetrations", "Plan cuts so the bearing bars still span between supports"],
        ["Corrosion barrier", "Resin-rich throughout", "Surface veil over a glass-rich bar"],
      ] })}
    </div>
    <div>
      ${photo("panel-comparison", "Molded mesh (left) and pultruded grating (right). Illustration, not a measured drawing.", "wide")}
      ${h3("Choosing in five questions")}
      ${ol([
        `<strong>Which way does the panel span?</strong> One clear direction over a long span points to pultruded; many cut-outs or two-way support point to molded.`,
        `<strong>What load and deflection limit?</strong> Uniform and point loads, clear span and the deflection criterion fix the depth.`,
        `<strong>What opening is allowed?</strong> Drainage and airflow want open area; pedestrian and heel-safe areas want a small top opening.`,
        `<strong>What is the exposure?</strong> Chemicals, concentration, temperature and UV select the resin (Section 2).`,
        `<strong>How is it fixed?</strong> Support flange, underside access and panel joints select the clips (Section 6).`,
      ])}
    </div>
  </div>
  ${h3("What the range includes")}
  <div class="facts">
    <div><strong>${MOLDED_N}</strong><span>molded configurations, ${MOLDED_MESHES} meshes, ${range(moldedDepths, " mm")} deep</span></div>
    <div><strong>${PULTRUDED_N}</strong><span>pultruded series, ${range(pultrudedDepths, " mm")} deep</span></div>
    <div><strong>${range(moldedOpen.concat(pultrudedOpen), "%")}</strong><span>open area across the range</span></div>
    <div><strong>4 × 6</strong><span>resin systems × walking surfaces</span></div>
  </div>
  ${table({ cls: "small", head: ["Product", "What it is", "Section"], widths: ["40mm", "auto", "16mm"], aligns: ["", "", "r"], body: [
    ["Molded grating", "One-piece square, mini and rectangular meshes; conductive and translucent types", "03"],
    ["Pultruded grating", "T-bar, I-bar, high-load and high-open bearing-bar series", "04"],
    ["Stair treads and covers", "Molded and pultruded treads, tread covers, anti-slip sheet, strip and ramps", "05"],
    ["Clips and fixing kits", "M, C, J and T clips in 316 stainless steel", "06"],
    ["Cut-to-size panels", "Panels cut to a marked panel schedule, with cut-outs, before shipment", "08"],
  ] })}
  ${note(`<strong>What the tables are.</strong> Dimensions, open areas and weights in this manual are nominal selection values for choosing a configuration and planning freight. The quotation, the approved panel-layout drawing and the order datasheet control final dimensions, tolerances, resin, surface, load capacity and delivered weight.`)}
`, "Range");

// 02 Materials and surfaces ─────────────────────────────────────────────────
openSection("02", "Resin systems and walking surfaces", `The resin sets chemical resistance, service temperature and fire behavior; the surface sets grip, drainage and cleaning. Both are chosen per order and written into the quotation.`, `
  ${h3("Catalog resin systems")}
  ${table({ cls: "small", head: ["Code", "Resin", "Use", "Molded", "Pultruded", "Guide temp."], widths: ["14mm", "40mm", "auto", "15mm", "17mm", "19mm"], aligns: ["", "", "", "", "", "r"], body: [
    ["VEFR", "Vinyl ester, fire-retardant", "Strongest chemical resistance of the range: acids, chlorides, offshore and chemical plant", "●", "●", "110 °C"],
    ["IFR", "Isophthalic polyester, fire-retardant", "Industrial corrosion service: water treatment, platforms, walkways, general plant", "●", "●", "80 °C"],
    ["FG", "Food-grade isophthalic polyester, fire-retardant", "Food and beverage processing areas with washdown", "●", "●", "80 °C"],
    ["OFR", "Orthophthalic polyester, fire-retardant", "Moderate exposure where corrosion demand is low", "●", "—", "70 °C"],
  ] })}
  <div class="cols2 top">
    ${h3("Reinforcement and filler")}
    ${p(`Reinforcement is E-glass roving (2400 and 4800 tex). Molded panels carry 30–35% glass by weight, so the mesh is resin-rich throughout; pultruded bearing bars carry 60–65% glass under a surface veil. Alumina trihydrate is the fire-retardant filler of the catalog formulations.`)}
    ${h3("Fire")}
    ${p(`The four catalog systems are fire-retardant formulations aimed at ASTM E84 Class 1 (flame-spread index of 25 or less). A fire classification belongs to a tested resin and panel configuration: ask for the report that matches the proposed panel, and state the classification and test standard the project requires before ordering.`)}
    ${h3("Chemical service")}
    ${p(`Guide temperatures are upper limits for continuous service in the catalog, not a compatibility statement. Send the chemical names, concentrations, exposure type (immersion, splash or fumes) and operating temperature; F1 answers with a resin recommendation for that service. A resin name alone does not establish compatibility.`)}
    ${h3("Color and UV")}
    ${p(`Yellow, gray and green are the common colors; others are matched per order. Outdoor panels are supplied with UV inhibitor in the resin. Other resin systems, including polyurethane for pultruded bars, are quoted per project.`)}
  </div>
  ${h3("Walking surfaces")}
  <div class="surf">
    <figure class="pie"><img src="${img("surface-types")}" alt=""></figure>
    ${table({ cls: "small", head: ["Surface", "Description", "Molded", "Pultruded"], widths: ["34mm", "auto", "15mm", "17mm"], body: [
      ["Concave (meniscus)", "Bar tops dished during molding; the standard slip-resistant molded finish for wet areas", "●", "—"],
      ["Gritted", "Angular grit bonded into the top; the highest grip for stairs, ramps and oily areas", "●", "●"],
      ["Corrugated", "Narrow grooves along the bar top; the basic pultruded anti-slip profile", "—", "●"],
      ["Smooth", "Flat top, machined on molded panels; for decorative and clean-down uses", "●", "●"],
      ["Solid top, checker", "Closed plate bonded on top with a checker pattern; stops falling objects and spray", "●", "●"],
      ["Solid top, gritted", "Closed plate with grit; one or both faces can be covered", "●", "●"],
    ] })}
  </div>
  <p class="small cap">Photograph, clockwise from top left: concave, gritted, smooth, solid top gritted, solid top checker, corrugated. Slip resistance is a tested property of a surface and contaminant; ask for the test that the project standard names.</p>
`, "Resins and surfaces");

// 03 Molded grating ─────────────────────────────────────────────────────────
const moldedRows = (groups, withSpan) => groups.flatMap((g) => [
  { group: `${esc(g.mesh)}${g.note ? `<span>${esc(g.note)}</span>` : ""}` },
  ...g.rows.map((r) => [esc(r.depth), inch(r.depth), esc(r.barThickness), ...(withSpan ? [esc(r.span ?? "Both")] : []), esc(r.panelSizes), r.weight, lb(r.weight), esc(r.openArea)]),
]);
openSection("03", "Molded grating", `One-piece panels with glass reinforcement running in both directions. The choice for layouts with frequent penetrations, loads from more than one direction and resin-rich corrosion resistance.`, `
  <div class="split">
    <div>
      ${p(`Continuous glass rovings are laid in alternating directions in an open mold, wetted out with resin and cured as a single panel. Because the bars are interlaced rather than assembled, a panel can be cut in any direction around pipes, columns and equipment without losing its load path, and offcuts stay usable.`)}
      ${h3("Reading the tables")}
      ${ul([
        `<strong>Mesh</strong> is the bar center-to-center spacing in each direction. Mini meshes add a finer top grid over a larger base mesh to reduce the top opening.`,
        `<strong>Depth</strong> is the panel thickness; HD rows are heavy-duty builds with thicker bars.`,
        `<strong>Bar thickness</strong> is given at the top and bottom of the tapered bar.`,
        `<strong>Panel sizes</strong> are the mold sizes for that row, width × length. Other sizes are cut from these.`,
        `<strong>Span</strong>, for rectangular meshes, names the panel direction in which the load bars run.`,
      ], "tight")}
    </div>
    <div>
      ${photo("molded-coastal-walkway", "Molded grating as a coastal walkway deck. Catalog photograph.")}
      ${photo("molded-grit-mesh-closeup", "Square mesh with a gritted top.", "strip")}
    </div>
  </div>
  <figure class="fig"><figcaption><span class="mono">Fig. 1</span> <strong>Molded grating terms</strong></figcaption>${moldedFigure()}</figure>
  <div class="split even">
    <div>
      ${h3("Conductive grating")}
      ${p(`A carbon-loaded surface layer gives a path to earth for static charge, for electronics production, munitions handling and other spark-sensitive areas. The catalog resistance is of the order of 10<sup>5</sup> Ω; the test method and limit are agreed for the order and the panels must be earthed through the support.`)}
    </div>
    <div>
      ${h3("Translucent grating")}
      ${p(`Molded from unfilled resin with little or no pigment, with UV stabilizer. The higher resin content suits severe chemical exposure, and the translucent panel is also used for screens, cladding and light-transmitting floors. Fire-retardant filler is absent, so state any fire requirement first.`)}
    </div>
  </div>
`, "Molded grating");

const moldedHead = ["Depth mm", "in", "Bar top / bottom mm", "Panel sizes mm (width × length)", "kg/m²", "lb/ft²", "Open area"];
page(`
  ${h2("Molded grating: square and mini meshes", `${count(moldedGratingSpecGroups)} configurations · the rows of the website table and CSV`)}
  ${table({ cls: "xs spec", head: moldedHead, widths: ["18mm", "11mm", "28mm", "auto", "13mm", "13mm", "16mm"], aligns: ["", "r", "", "", "r", "r", "r"], body: moldedRows(moldedGratingSpecGroups, false) })}
  <p class="small cap">Nominal values. The 40 × 40 mesh at 40 mm depth lists a 967 × 2967 mm panel where the neighboring depths list 1007 × 3007 mm; confirm the mold size when ordering that row. Weights in lb/ft² are converted from kg/m².</p>
`);
const moldedHeadSpan = ["Depth mm", "in", "Bar top / bottom mm", "Span", "Panel sizes mm (width × length)", "kg/m²", "lb/ft²", "Open area"];
page(`
  ${h2("Molded grating: additional mini and rectangular meshes", `${count(moldedAdditionalMeshSpecGroups)} configurations · made to order`)}
  ${table({ cls: "xs spec", head: moldedHeadSpan, widths: ["18mm", "11mm", "28mm", "25mm", "auto", "13mm", "13mm", "16mm"], aligns: ["", "r", "", "", "", "r", "r", "r"], body: moldedRows(moldedAdditionalMeshSpecGroups, true) })}
  <p class="small cap">Nominal values as cataloged. Rectangular meshes carry load in the span direction listed; “Both” means either panel direction. Several rectangular rows list the same weight at different depths, so the order datasheet confirms the delivered weight. Minimum quantities apply to made-to-order meshes.</p>
`);

// 04 Pultruded grating ──────────────────────────────────────────────────────
openSection("04", "Pultruded grating", `Open one-way panels assembled from pultruded I-bar or T-bar bearing bars and cross-rods. The choice for longer clear spans, higher stiffness along the bars and very small or very large open areas.`, `
  <div class="split">
    <div>
      ${p(`Bearing bars are pultruded with 60–65% glass by weight, cut to length, drilled on a fixed pitch and assembled on cross-rods that are bonded in place. All series in this manual use cross-rods at 152.4 mm (6 in) centers and are listed up to 1524 × 6100 mm panels, with the bearing bars along the length.`)}
      ${h3("Series")}
      ${table({ cls: "small", head: ["Series", "Use"], widths: ["42mm", "auto"], body: pultrudedGratingSpecGroups.map((g) => [esc(g.name), `${esc(g.description)} <span class="code">${g.rows.length} rows</span>`]) })}
      ${p(`<span class="small">A series name reads bar type, open area and depth: T-2510 is a T-bar at 25% open area in the 1.0 in (25 mm) depth; I-6015 an I-bar at 60% open area, 1.5 in (38 mm) deep.</span>`)}
    </div>
    <div>
      ${photo("pultruded-rooftop-walkway", "Pultruded T-bar grating as a rooftop walkway. Catalog photograph.")}
      ${photo("pultruded-t-bar-closeup", "Gritted T-bar bearing bars on cross-rods.", "strip")}
    </div>
  </div>
  <figure class="fig"><figcaption><span class="mono">Fig. 2</span> <strong>Pultruded grating terms</strong></figcaption>${pultrudedFigure()}</figure>
  ${h3("Design points")}
  <div class="cols2">
  ${ul([
    `<strong>Span direction is fixed.</strong> Bearing bars must run between the supports. Mark the bar direction on every panel of the cut plan.`,
    `<strong>Deflection usually governs.</strong> Give the clear span, load and deflection limit; the series and depth follow from the load table issued for that configuration.`,
    `<strong>Cut ends need support.</strong> A bar cut short of a support has no load path; frame penetrations or add a bearing member.`,
    `<strong>Open area and opening differ.</strong> A T-bar closes the top surface while keeping the bar spacing; check the clear opening, not only the percentage.`,
  ])}
  </div>
`, "Pultruded grating");

page(`
  ${h2("Pultruded grating: all series", `${PULTRUDED_N} configurations · the rows of the website table and CSV`)}
  ${table({ cls: "xs spec", head: ["Series", "Depth mm", "in", "Bearing bar c/c mm", "Cross-rod c/c mm", "Open area", "kg/m²", "lb/ft²"], widths: ["auto", "20mm", "14mm", "30mm", "30mm", "20mm", "17mm", "17mm"], aligns: ["", "r", "r", "r", "r", "r", "r", "r"], body: pultrudedGratingSpecGroups.flatMap((g) => [
    { group: `${esc(g.name)}<span>${esc(g.description)}</span>` },
    ...g.rows.map((r) => [`${esc(r.type)}${REDUCED_OPENING.has(r.type) ? ` <span class="dot">●</span>` : ""}`, r.depth, inch(r.depth), r.bearingBarCenter, r.crossBarCenter, esc(r.openArea), r.weight, lb(r.weight)]),
  ]) })}
  <p class="small cap"><span class="dot">●</span> Cataloged as a reduced-opening series: the clear opening is 13 mm (½ in) or less in one direction. Check it against the accessibility rule that governs the project. Nominal values from the series overview; the order datasheet controls. Weights in lb/ft² are converted from kg/m².</p>
`);

// 05 Stairs and anti-slip ───────────────────────────────────────────────────
openSection("05", "Stair treads, covers and anti-slip products", `Made from the same gratings and pultruded sections, with a gritted nosing in a contrasting color at the leading edge.`, `
  <div class="trio">
    ${photo("stair-treads-assorted", "Molded and pultruded treads with contrasting nosings.")}
    ${photo("stair-tread-pultruded", "Pultruded treads with a yellow gritted nosing.")}
    ${photo("stair-nosing-covers", "Tread covers over existing steps.")}
  </div>
  ${table({ cls: "small", head: ["Product", "Construction", "Reference sizes", "Use"], widths: ["30mm", "auto", "46mm", "42mm"], body: [
    ["Molded stair tread", "Molded grating cut to tread size, with a gritted nosing strip built into the leading edge", "38 mm deep; tread depth typically 235–287 mm", "New stairs needing drainage and two-way stiffness"],
    ["Molded tread panel", "Molded with a nosing along both long edges, then cut to tread length", "38 mm deep: 565 × 3050 mm (25.4 × 152.4 mesh) or 580 × 3660 mm (38.1 × 152.4 mesh)", "Fabricators cutting treads to their own schedule"],
    ["Pultruded stair tread", "Pultruded grating with a gritted tube or bar nosing", "Any pultruded series of Section 4", "Wider stairs and longer tread spans"],
    ["Stair tread cover", "Thin pultruded L-section with coarse grit and a colored nosing, fixed over a sound step", "305 or 343 mm deep × 3658 mm long × 3.2 mm thick", "Refurbishing steel, concrete or timber steps"],
    ["Anti-slip sheet and strip", "Flat pultruded sheet or strip with grit on one face", "Cut to order", "Decks, jetties, ramps and landings"],
    ["Edge ramp", "Molded grating ramp section for a level change at a panel edge", "For 25 or 50 mm panels", "Trolley and wheelchair transitions"],
  ] })}
  ${photo("anti-slip-strips", "Gritted anti-slip strips fixed to a timber deck.", "wide")}
  ${note(`<strong>Before ordering treads.</strong> Send the quantity by flight with finished width, tread depth and nose return; say whether the tread spans between stringers or covers an existing step; and give the load, the nosing color and any slip-test or visibility requirement. A cover relies on the old step for strength; a tread needs its own span check.`)}
`, "Stairs and anti-slip");

// 06 Clips ──────────────────────────────────────────────────────────────────
openSection("06", "Clips and fixing", `Every panel is held down at its supports. F1 supplies four clip definitions in ${esc(GRATING_CLIP_MATERIAL)}, matched to the grating family and the support detail.`, `
  ${photo("clips-hardware", "Hold-down hardware reference. Clip geometry is confirmed on the project drawing.", "wide")}
  ${table({ cls: "small", head: ["Clip", "Part number", "Connection", "Molded", "Pultruded", "What it does"], widths: ["34mm", "33mm", "27mm", "14mm", "17mm", "auto"], body: gratingClips.map((c) => [
    esc(c.name), `<span class="code">${esc(c.sku)}</span>`, esc(c.attachment), c.compatibleWith.includes("Molded grating") ? "●" : "—", c.compatibleWith.includes("Pultruded grating") ? "●" : "—", esc(c.purpose),
  ]) })}
  <div class="split even">
    <div>
      ${h3("Starting layout")}
      ${table({ cls: "small", head: ["Item", "Starting value"], widths: ["38mm", "auto"], body: gratingClipTypicalStartingLayout.map((r) => [esc(r.label), esc(r.value)]) })}
      ${p(`<span class="small">${esc(gratingClipLayoutDisclaimer)}</span>`)}
    </div>
    <div>
      ${h3("Cutting and installation")}
      ${ul([
        `Cut with carbide- or diamond-tipped tools, with dust extraction and suitable PPE.`,
        `Seal every cut surface with a compatible resin before the panel goes into service.`,
        `Support all four sides of a molded panel cut-out where load can reach the edge; support every cut bearing-bar end on a pultruded panel.`,
        `Lay pultruded panels with the bearing bars spanning between supports, as marked on the layout drawing.`,
        `Fit hold-downs at the supports after the panel is seated, then recheck them after any field cut.`,
      ], "tight")}
    </div>
  </div>
  ${note(`${esc(gratingClipNamingNote)} A C connector aligns panel edges and is never a substitute for support or for each panel's own hold-downs.`)}
`, "Clips and fixing");

// 07 Applications ───────────────────────────────────────────────────────────
openSection("07", "Applications", `Where the two constructions are typically specified, and what decides the configuration in each.`, `
  <div class="apps">
    ${photo("app-water-treatment", "Access stairs and platforms at process tanks.")}
    ${photo("app-marine-offshore", "Offshore process decks and walkways.")}
    ${photo("app-oil-gas", "Plant walkway with pultruded grating.")}
    ${photo("app-outdoor-walkway", "Outdoor stair and walkway in a coastal setting.")}
  </div>
  <div class="duo wide">
    ${photo("app-rail", "Trackside maintenance platform and stairs.")}
    ${photo("grating-ramp", "Molded grating as a loading ramp deck.")}
  </div>
  <p class="small cap">Reference photographs of the product type in service. They do not record F1 projects or establish a series, resin or rating.</p>
  ${table({ cls: "small", head: ["Application", "Typical choice", "What decides it"], widths: ["42mm", "62mm", "auto"], body: [
    ["Water and wastewater plants", "Molded 38.1 × 38.1 mesh, 25–38 mm, concave or gritted, IFR or VEFR", "Chemical dosing areas, cover and trench spans, frequent pipe penetrations"],
    ["Chemical and plating plants", "Molded square mesh in VEFR", "Named chemicals, concentration and temperature; splash or immersion"],
    ["Offshore and marine decks", "Molded or pultruded, gritted, VEFR", "Fire documentation, wave and wind uplift on fixings, salt exposure"],
    ["Oil, gas and power walkways", "Pultruded I-bar or T-bar series", "Long one-way spans between steelwork, deflection limit, electrical clearance"],
    ["Cooling towers", "Pultruded high-open SI series", "Airflow through the deck and wet service"],
    ["Rail and transit platforms", "Pultruded or molded, gritted or solid top", "Non-conductive walkway beside live equipment, slip rating, pedestrian opening"],
    ["Public and pedestrian areas", "Mini mesh or reduced-opening T-bar series", "Maximum opening, heel safety, slip rating and appearance"],
    ["Food and beverage", "Molded in FG resin, gritted", "Washdown, cleaning chemicals and hygiene rules"],
    ["Trench and drain covers", "Molded HD rows or pultruded HI / HL series", "Wheel load, footprint and the seat detail in the frame"],
  ] })}
  ${note(`The “typical choice” column is a starting point for a conversation, not a specification. Loads, supports, exposure and the governing standard of the project decide the configuration.`)}
`);

// 08 Ordering ───────────────────────────────────────────────────────────────
openSection("08", "Ordering, load data and documents", `What a quotation needs, how load and span data are issued, and what F1 confirms in writing.`, `
  ${h3("What a quotation needs")}
  <div class="req">${gratingRequestItems.map((r, i) => `<div><span class="mono">${String(i + 1).padStart(2, "0")}</span><strong>${esc(r.title)}</strong><p>${esc(r.text)}</p></div>`).join("")}</div>
  <div class="split even">
    <div>
      ${h3("Load and span data")}
      ${p(`This manual lists geometry and nominal weight. It does not print an allowable-load table, because a load table is only valid for the panel it was established on. F1 issues the applicable load and deflection data for the configuration you select. To match it to your design:`)}
      ${ol([
        `<strong>Identify the panel.</strong> Type, depth, mesh or bearing-bar series, resin and surface. A molded result does not transfer to pultruded grating.`,
        `<strong>Match the load case.</strong> Clear span, support width, bearing direction, uniform or point load and its footprint, deflection criterion, temperature and duration. Keep ultimate test load apart from allowable design load.`,
        `<strong>Check the finished layout.</strong> Cut edges, penetrations, local supports and clip layout can change the result.`,
      ])}
    </div>
    <div>
      ${h3("What F1 confirms in the quotation")}
      ${ul([
        `Configuration, resin, color and surface of every panel mark.`,
        `Panel sizes or the cut plan, with bearing-bar direction for pultruded panels.`,
        `Clip kits and quantities against the support detail.`,
        `Packing, delivery term and lead time. Reply within ${esc(supplyTerms.responseTime)}.`,
        `Prices in USD for the quoted quantity; the quotation, not this manual, is the offer.`,
      ], "tight")}
      ${h3("Documents")}
      ${p(esc(companyStatements.certificates))}
      ${p(`Fire, slip, electrical and chemical-resistance reports are supplied for the resin and panel they were tested on. Say which standard the project names so the right report is matched.`)}
    </div>
  </div>
  ${h3("Common questions")}
  <div class="faq">
    <div><strong>Are FRP, GRP and fiberglass grating different products?</strong><p>No. For the glass-reinforced panels in this manual the three names describe the same material. State the construction, resin, geometry and surface instead of relying on the name.</p></div>
    <div><strong>Can panels be supplied cut to size?</strong><p>Yes. Send a panel schedule or a marked drawing with panel marks, sizes, cut-outs and, for pultruded panels, the bearing-bar direction. Sealing of cut edges is confirmed in the quotation.</p></div>
    <div><strong>What drives the price?</strong><p>Construction, depth and mesh or series, resin, surface, quantity, the amount of cutting, clip kits, packing and destination. Give quantities by panel or the total area and the delivery port or postcode.</p></div>
    <div><strong>How are panels packed?</strong><p>Full panels are stacked flat on pallets and strapped; cut panels are marked to the schedule and packed by area or installation sequence when the order asks for it. Packing is stated in the quotation.</p></div>
  </div>
  <div class="doc-control">${table({ cls: "small", head: ["Document", ""], widths: ["34mm", "auto"], body: [
    ["Code and revision", `${esc(MANUAL.code)} · Rev. ${esc(MANUAL.revision)} · ${esc(MANUAL.issuedLabel)}`],
    ["Publisher", `${esc(company.legalName)}, ${esc(company.address.addressLocality)}, China`],
    ["Online data", `${SITE.replace("https://", "")}/products/grating · specification tables and CSV files carry the latest revision`],
    ["Contact", `${esc(company.contact.email)} · ${esc(company.contact.phone)} (phone and WhatsApp)`],
  ] })}</div>
`, "Ordering");

// Back cover ────────────────────────────────────────────────────────────────
page(`
  <div class="back">
    <div>
      <div class="wordmark">F1 COMPOSITES</div>
      <p class="back-tag">Molded and pultruded FRP grating, stair treads and fixing clips, quoted against your panel schedule.</p>
    </div>
    <div class="back-grid">
      <div><span class="mono">Quotations</span><strong>${esc(company.contact.email)}</strong><span>Send a panel schedule or a marked drawing</span></div>
      <div><span class="mono">Phone · WhatsApp</span><strong>${esc(company.contact.phone)}</strong><span>${esc(company.contact.salesName)}, sales</span></div>
      <div><span class="mono">Online</span><strong>www.f1composite.com/products/grating</strong><span>Selector, specification CSV and RFQ planner</span></div>
    </div>
    <div class="back-foot">
      <p>${esc(company.legalName)} · ${esc(company.address.streetAddress)}, ${esc(company.address.addressRegion)}, ${esc(company.address.addressLocality)} ${esc(company.address.postalCode)}, China</p>
      <p>Nominal selection data. The quotation, approved drawing and order datasheet control what is supplied. “F1” stands for “Fiber One”; F1 Composite is not affiliated with Formula 1.</p>
      <div class="mono">${esc(MANUAL.code)} · Rev. ${esc(MANUAL.revision)} · ${esc(MANUAL.issued)}</div>
    </div>
  </div>`, { bare: true, cls: "backcover" });

// Contents page, now that page numbers are known ────────────────────────────
const SUMMARIES = {
  "01": "Molded and pultruded construction side by side, and five questions that choose between them.",
  "02": "Four catalog resin systems with guide temperatures, fire and chemical notes, and six walking surfaces.",
  "03": `Construction, special types and all ${MOLDED_N} molded configurations in ${MOLDED_MESHES} meshes.`,
  "04": `Bearing-bar series, design points and all ${PULTRUDED_N} pultruded configurations.`,
  "05": "Molded and pultruded treads, tread covers, anti-slip sheet and ramps.",
  "06": "Four stainless-steel clip definitions, a starting layout and installation rules.",
  "07": "Typical configurations by industry and what decides each.",
  "08": "Quotation inputs, how load data is issued, documents and contact.",
};
pages[tocSlot - 1].body = `
  ${h2("Contents")}
  <div class="toc">${toc.map((t) => `<div class="toc-row"><span class="toc-num">${t.number}</span><span><span class="toc-title">${esc(t.title)}</span><span class="toc-sum">${esc(SUMMARIES[t.number])}</span></span><span class="toc-dots"></span><span class="toc-page">${t.page}</span></div>`).join("")}</div>
  <div class="split even">
    <div>
      ${h3("About this manual")}
      ${p(`This manual gathers the F1-GRID grating range in one document for specifiers, fabricators and buyers: the two constructions, the resin and surface options, every cataloged configuration with its nominal weight and open area, the stair and anti-slip products made from them, and the clips that hold them down.`)}
      ${p(`The specification rows are generated from the same data as the grating pages and CSV files of www.f1composite.com. Where the website and this PDF differ, the website carries the later revision.`)}
    </div>
    <div>
      ${h3("Units and conventions")}
      ${ul([
        `Dimensions are millimeters; inch depths and lb/ft² weights are conversions for reference.`,
        `Weights are nominal kg/m² of panel, before clips and packing.`,
        `Open area is the nominal free area of the panel in plan.`,
        `Panel sizes read width × length.`,
        `“FRP”, “GRP” and “fiberglass” grating name the same glass-reinforced products here.`,
      ], "tight")}
    </div>
  </div>`;

// ═══════════════════════════════════════════════════════════════════════════
// HTML
// ═══════════════════════════════════════════════════════════════════════════
const fontUrl = (f) => `file://${join(root, "app/fonts", f)}`;
const css = `
@font-face { font-family: "DM Sans"; src: url("${fontUrl("dm-sans-latin.woff2")}") format("woff2"); font-weight: 400 800; font-style: normal; }
@font-face { font-family: "DM Mono"; src: url("${fontUrl("dm-mono-latin-400.woff2")}") format("woff2"); font-weight: 400; }
@font-face { font-family: "DM Mono"; src: url("${fontUrl("dm-mono-latin-500.woff2")}") format("woff2"); font-weight: 500; }
:root { --navy: #0b1838; --teal: #0a9b91; --teal-text: #007a74; --teal-light: #8fd6ce; --teal-bg: rgba(10,155,145,0.05); --teal-bg2: rgba(10,155,145,0.09); --teal-border: rgba(10,155,145,0.24); --lime: #bbdf35; --t1: #0b1730; --t2: #4b566b; --t3: #626d80; --bg2: #f4f7f8; --border: rgba(11,24,56,0.1); }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; }
body { font-family: "DM Sans", system-ui, sans-serif; color: var(--t1); font-size: 9.2pt; line-height: 1.42; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { position: relative; width: 210mm; height: 297mm; overflow: hidden; padding: 17mm 15mm 16mm; break-after: page; page-break-after: always; }
.page:last-child { break-after: auto; page-break-after: auto; }
.hdr { position: absolute; top: 7mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; font-family: "DM Mono", monospace; font-size: 6.6pt; letter-spacing: .06em; text-transform: uppercase; color: var(--t3); border-bottom: 0.3pt solid var(--border); padding-bottom: 1.6mm; }
.ftr { position: absolute; bottom: 7mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: baseline; font-size: 7pt; color: var(--t3); border-top: 0.3pt solid var(--border); padding-top: 1.6mm; }
.ftr .pn { font-weight: 700; color: var(--t1); font-size: 8.5pt; }
.ftr .mono { font-size: 6.4pt; }
.mono { font-family: "DM Mono", monospace; font-size: 6.8pt; letter-spacing: .06em; text-transform: uppercase; color: var(--t3); }
h1, h2, h3 { margin: 0; text-wrap: balance; letter-spacing: -0.01em; }
h2 { font-size: 15pt; line-height: 1.15; font-weight: 700; color: var(--navy); margin: 0 0 3mm; }
h2 .sub { display: block; font-weight: 500; font-size: 8.6pt; color: var(--t3); margin-top: 1mm; letter-spacing: 0; }
h3 { font-size: 9.6pt; font-weight: 700; color: var(--t1); margin: 2.4mm 0 1.2mm; break-after: avoid; }
p { margin: 0 0 1.8mm; color: var(--t2); }
p strong, li strong { color: var(--t1); }
.small { font-size: 7.6pt; line-height: 1.4; }
.cap { color: var(--t3); margin-top: 1mm; }
sub, sup { font-size: 70%; line-height: 0; }
.cols2 { column-count: 2; column-gap: 7mm; column-fill: balance; }
.cols2.top { margin-top: 1mm; }
.cols2 h3:first-child { margin-top: 0; }
.cols2 p, .cols2 li { break-inside: avoid; }
.list { margin: 0 0 1.8mm; padding-left: 3.6mm; color: var(--t2); }
.list li { margin: 0 0 1mm; padding-left: 0.4mm; }
.list.tight li { margin: 0 0 0.6mm; }
.steps { margin: 0 0 1.8mm; padding-left: 0; list-style: none; counter-reset: s; color: var(--t2); }
.steps li { counter-increment: s; position: relative; padding-left: 7mm; margin: 0 0 1.3mm; }
.steps li::before { content: counter(s, decimal-leading-zero); position: absolute; left: 0; top: 0.1mm; font-family: "DM Mono", monospace; font-size: 7pt; color: var(--teal-text); letter-spacing: .04em; }
.note { break-inside: avoid; border-left: 1mm solid var(--teal); background: var(--teal-bg); border-radius: 0 1.6mm 1.6mm 0; padding: 2.4mm 3.2mm; margin: 2.6mm 0 0; color: var(--t2); font-size: 8.4pt; }
.note strong { color: var(--t1); }
.t { width: 100%; border-collapse: collapse; margin: 0 0 2.4mm; }
.t th, .t td { text-align: left; vertical-align: top; padding: 1.25mm 1.8mm; border-bottom: 0.3pt solid var(--border); font-size: 8pt; line-height: 1.32; }
.t thead th { background: var(--bg2); color: var(--t1); font-weight: 600; font-size: 7.2pt; border-bottom: 0.5pt solid rgba(11,24,56,0.22); }
.t tbody th { font-weight: 600; color: var(--t1); }
.t td { color: var(--t2); }
.t .num, .t td.num, .t th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.t.small th, .t.small td { font-size: 7.4pt; padding: 1.1mm 1.6mm; }
.t.xs th, .t.xs td { font-size: 7pt; padding: 0.95mm 1.5mm; line-height: 1.28; }
.t.spec td { font-variant-numeric: tabular-nums; }
.t tr.grp th { background: var(--navy); color: #fff; font-weight: 600; font-size: 7.4pt; padding: 1.2mm 1.8mm; border-bottom: 0; }
.t tr.grp th span { font-weight: 400; color: var(--teal-light); margin-left: 3mm; font-size: 6.8pt; }
.code { font-family: "DM Mono", monospace; font-size: 6.8pt; color: var(--t1); white-space: nowrap; }
.dot { color: var(--teal); font-size: 6pt; vertical-align: 0.3mm; }
.warn { display: block; color: var(--t3); font-size: 6.9pt; margin-top: 0.5mm; }
.band { margin: -17mm -15mm 5mm; background: var(--navy); color: #fff; padding: 16mm 15mm 8mm; display: grid; grid-template-columns: 24mm 1fr; gap: 6mm; align-items: start; min-height: 48mm; }
.band-num { font-family: "DM Mono", monospace; font-size: 30pt; font-weight: 500; color: var(--lime); line-height: 1; letter-spacing: -0.02em; }
.band h1 { font-size: 21pt; font-weight: 700; line-height: 1.12; color: #fff; margin: 0 0 2.6mm; }
.band p { color: var(--teal-light); font-size: 9.2pt; line-height: 1.45; margin: 0; max-width: 150mm; }
.split { display: grid; grid-template-columns: 1.15fr 1fr; gap: 7mm; align-items: start; }
.split.even { grid-template-columns: 1fr 1fr; }
.split h3:first-child { margin-top: 0; }
.ph { margin: 0 0 2.4mm; }
.ph img { display: block; width: 100%; height: 48mm; object-fit: cover; border-radius: 2mm; }
.ph.strip img { height: 24mm; }
.ph.wide img { height: 38mm; }
.ph figcaption { font-size: 7.2pt; color: var(--t3); margin-top: 1mm; line-height: 1.3; }
.trio { display: grid; grid-template-columns: 1.4fr 1.4fr 1fr; gap: 4mm; }
.trio .ph img { height: 46mm; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 1mm; }
.duo .ph img { height: 38mm; }
.apps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
.apps .ph { margin-bottom: 0; }
.apps .ph img { height: 42mm; }
.duo.wide { margin-top: 3mm; }
.duo.wide .ph img { height: 50mm; }
.fig { margin: 2mm 0 2.6mm; border: 0.3pt solid var(--border); border-radius: 2.4mm; padding: 2.4mm 3mm 1mm; }
.fig figcaption { font-size: 7.6pt; color: var(--t2); margin-bottom: 0.6mm; }
.fig figcaption strong { color: var(--t1); margin-left: 1.4mm; }
.fig .dia { display: block; width: 174mm; height: 56mm; margin: 0 auto; }
.surf { display: grid; grid-template-columns: 44mm 1fr; gap: 6mm; align-items: center; }
.pie { margin: 0; width: 44mm; height: 44mm; border-radius: 50%; overflow: hidden; }
.pie img { display: block; width: 103%; height: 103%; margin: -1.5% 0 0 -1.5%; object-fit: cover; }
.facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 1mm 0 3mm; }
.facts div { background: var(--bg2); border-radius: 2mm; padding: 2.6mm 3mm; }
.facts strong { display: block; font-size: 15pt; color: var(--navy); line-height: 1.1; letter-spacing: -0.01em; }
.facts span { display: block; font-size: 7.2pt; color: var(--t3); margin-top: 0.8mm; }
.req { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 1mm 0 3mm; }
.req div { background: var(--bg2); border-radius: 2mm; padding: 2.6mm 3mm; }
.req strong { display: block; color: var(--navy); font-size: 9pt; margin: 0.6mm 0 0.8mm; }
.req p { font-size: 7.6pt; line-height: 1.38; margin: 0; }
.faq { display: grid; grid-template-columns: 1fr 1fr; gap: 2.4mm 7mm; }
.faq strong { display: block; font-size: 8.4pt; color: var(--t1); margin-bottom: 0.6mm; }
.faq p { font-size: 7.9pt; line-height: 1.4; }
.doc-control { margin-top: 3mm; border: 0.3pt solid var(--border); border-radius: 2.4mm; padding: 2.4mm 3.2mm 0.4mm; }
.doc-control .t { margin-bottom: 1mm; }
.doc-control .t tr:last-child th, .doc-control .t tr:last-child td { border-bottom: 0; }
.toc { margin: 1mm 0 5mm; }
.toc-row { display: grid; grid-template-columns: 12mm auto 1fr 10mm; align-items: baseline; gap: 2mm; padding: 2.5mm 0; border-bottom: 0.3pt solid var(--border); }
.toc-num { font-family: "DM Mono", monospace; color: var(--teal-text); font-size: 9pt; letter-spacing: .04em; }
.toc-title { display: block; font-weight: 600; color: var(--t1); font-size: 11pt; }
.toc-sum { display: block; color: var(--t3); font-size: 7.8pt; margin-top: 0.4mm; max-width: 130mm; }
.toc-dots { border-bottom: 0.3pt dotted rgba(11,24,56,0.35); min-width: 6mm; align-self: start; height: 4.4mm; }
.toc-page { text-align: right; font-weight: 700; color: var(--navy); font-variant-numeric: tabular-nums; font-size: 11pt; }
/* cover */
.page.cover { padding: 0; background: #fff; }
.cover-top { height: 118mm; padding: 14mm 18mm 0; position: relative; }
.cover .logo { height: 28mm; width: auto; display: block; margin-left: -4mm; }
.cover-kicker { margin-top: 10mm; color: var(--teal-text); }
.cover-title { font-size: 40pt; font-weight: 700; line-height: 1.02; color: var(--navy); margin: 3mm 0 4mm; letter-spacing: -0.02em; }
.cover-sub { font-size: 12pt; color: var(--t2); margin: 0; }
.cover-bottom { height: 179mm; background: var(--navy); padding: 12mm 18mm 11mm; display: flex; flex-direction: column; justify-content: space-between; }
.cover-photos { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.cover-photos img { display: block; width: 100%; height: 86mm; object-fit: cover; border-radius: 2mm; }
.cover-photos .mono { display: block; color: var(--teal-light); margin-top: 2.4mm; }
.cover-facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
.cover-facts div { background: rgba(255,255,255,0.06); border: 0.3pt solid rgba(143,214,206,0.3); border-radius: 2mm; padding: 2.6mm 3mm; }
.cover-facts strong { display: block; color: #fff; font-size: 18pt; line-height: 1.1; }
.cover-facts span { display: block; color: var(--teal-light); font-size: 7.4pt; margin-top: 1mm; }
.cover-meta { color: var(--teal-light); border-top: 0.4pt solid rgba(143,214,206,0.35); padding-top: 3mm; }
/* back cover */
.page.backcover { background: var(--navy); color: #fff; padding: 22mm 18mm 16mm; }
.back { height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
.back .wordmark { font-weight: 800; letter-spacing: .14em; color: #fff; font-size: 13pt; }
.back-tag { color: var(--teal-light); font-size: 14pt; margin: 6mm 0 0; font-weight: 500; max-width: 125mm; line-height: 1.35; }
.back-grid { display: grid; grid-template-columns: 1fr 1fr 1.25fr; gap: 8mm; }
.back-grid div { display: grid; gap: 1mm; font-size: 8.8pt; color: var(--teal-light); border-top: 0.4pt solid rgba(143,214,206,0.35); padding-top: 3mm; align-content: start; }
.back-grid strong { color: #fff; font-size: 9.6pt; }
.back-grid .mono { color: var(--lime); margin-bottom: 1mm; }
.back-foot p { color: rgba(255,255,255,0.72); font-size: 8.4pt; }
.back-foot .mono { color: var(--teal-light); margin-top: 4mm; }
`;

function renderPage(pg, index) {
  const n = index + 1;
  if (pg.bare) return `<section class="page ${pg.cls}" id="p${n}">${pg.body}</section>`;
  return `<section class="page ${pg.cls}" id="p${n}">
    <div class="hdr"><span>${esc(company.brand)} · ${esc(MANUAL.title)} · ${esc(MANUAL.code)} Rev. ${esc(MANUAL.revision)}</span><span>${esc(pg.section)}</span></div>
    ${pg.body}
    <div class="ftr"><span class="mono">${SITE.replace("https://", "")} · ${esc(company.contact.email)} · ${esc(company.contact.phone)}</span><span class="pn">${n}</span></div>
  </section>`;
}

export function buildHtml() {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(company.brand)} ${esc(MANUAL.title)} ${esc(MANUAL.code)} Rev. ${esc(MANUAL.revision)}</title>
<meta name="author" content="${esc(company.legalName)}">
<meta name="description" content="${esc(MANUAL.subtitle)}: resin systems, surfaces, ${MOLDED_N} molded and ${PULTRUDED_N} pultruded configurations, stair treads, clips and ordering.">
<style>${css}</style>
<script>
window.addEventListener("load", () => {
  const over = [];
  document.querySelectorAll(".page").forEach((p, i) => {
    if (!p.querySelector(".ftr")) return;
    const limit = p.querySelector(".ftr").getBoundingClientRect().top;
    let low = 0;
    p.querySelectorAll(":scope > *:not(.ftr):not(.hdr)").forEach((el) => { low = Math.max(low, el.getBoundingClientRect().bottom); });
    if (low > limit - 4) over.push((i + 1) + ":" + Math.round(low - limit + 4));
  });
  document.documentElement.setAttribute("data-overflow", over.join(","));
});
</script>
</head><body>${pages.map(renderPage).join("\n")}</body></html>`;
}

function findChromium() {
  const candidates = [process.env.CHROMIUM_PATH, process.env.PLAYWRIGHT_BROWSERS_PATH && join(process.env.PLAYWRIGHT_BROWSERS_PATH, "chromium"), "/opt/pw-browsers/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  for (const name of ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable"]) {
    try { return execFileSync("which", [name], { encoding: "utf8" }).trim(); } catch { /* next */ }
  }
  return null;
}
function chromium(args) {
  const bin = findChromium();
  if (!bin) throw new Error("Chromium not found: set CHROMIUM_PATH or install chromium");
  const profile = join(tmpdir(), "f1-grating-manual", "profile");
  return execFileSync(bin, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", `--user-data-dir=${profile}`, "--virtual-time-budget=20000", ...args], { encoding: "utf8", timeout: 180_000, maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
}

export function build({ htmlOnly = false, out = join(root, "public", MANUAL.file) } = {}) {
  const workDir = join(tmpdir(), "f1-grating-manual");
  mkdirSync(workDir, { recursive: true });
  const htmlPath = join(workDir, "grating-manual.html");
  writeFileSync(htmlPath, buildHtml());
  const result = { htmlPath, pages: pages.length, pdfPath: null };
  if (htmlOnly) return result;
  const dom = chromium(["--dump-dom", `file://${htmlPath}`]);
  const overflow = dom.match(/data-overflow="([^"]*)"/)?.[1] ?? "unknown";
  if (overflow && !process.env.MANUAL_ALLOW_OVERFLOW) throw new Error(`Pages overflow (page:px): ${overflow}`);
  if (overflow) console.warn(`warning: pages overflow (page:px): ${overflow}`);
  mkdirSync(join(out, ".."), { recursive: true });
  chromium(["--no-pdf-header-footer", `--print-to-pdf=${out}`, `file://${htmlPath}`]);
  const pdf = readFileSync(out);
  result.pdfPath = out;
  result.pdfPages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  if (result.pdfPages !== pages.length) throw new Error(`PDF has ${result.pdfPages} pages, expected ${pages.length}`);
  if (pages.length !== MANUAL.pages) throw new Error(`Manual has ${pages.length} pages; content/data/gratingManual.ts says ${MANUAL.pages}`);
  result.bytes = statSync(out).size;
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const outIndex = process.argv.indexOf("--out");
  const r = build({ htmlOnly: process.argv.includes("--html-only"), ...(outIndex > 0 ? { out: resolve(process.argv[outIndex + 1]) } : {}) });
  console.log(`${pages.length} pages · HTML ${r.htmlPath}${r.pdfPath ? ` · PDF ${r.pdfPath} (${(r.bytes / 1024).toFixed(0)} KB)` : ""}`);
}
