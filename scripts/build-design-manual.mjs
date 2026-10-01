#!/usr/bin/env node
// Build the FRP Profile Design Manual (DOC-PF-2026-EN) as an A4 PDF.
//
// Every number in the manual comes from the data the website renders:
// lib/catalog/en13706.ts (laminate), lib/catalog/standardProfiles.ts and the
// section engine (sizes and section properties), lib/spanTables.ts and
// lib/frpDesignBasis.ts (allowable loads and factors), content/data/company.ts
// (facts and supply terms), lib/applicationPages.ts, the handrail and ladder
// catalog data, the evidence library and the performance reference tables.
// Change a value there and rebuild; do not edit numbers in this file.
//
// The page is laid out in HTML with the site's fonts and palette, then printed
// by headless Chromium (the same route the Rev. A edition took). Each page is
// a fixed 210 × 297 mm box, so the script can check that nothing overflows.
//
//   node scripts/build-design-manual.mjs            # writes the PDF
//   node scripts/build-design-manual.mjs --html-only # HTML + checks, no browser
//
// Chromium: CHROMIUM_PATH, or $PLAYWRIGHT_BROWSERS_PATH/chromium, or chromium /
// chromium-browser / google-chrome on PATH.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");

// ── document identity ───────────────────────────────────────────────────────
export const MANUAL = {
  code: "DOC-PF-2026-EN",
  revision: "B",
  issued: "2026-10",
  issuedLabel: "October 2026",
  supersedes: "Rev. A, April 2026 (withdrawn September 2026)",
  file: "/downloads/f1composite-frp-profile-design-manual-2026-rev-b.pdf",
  title: "FRP Profile Design Manual",
  subtitle: "Pultruded structural profiles · EN 13706 grade E23",
};

// ── data ────────────────────────────────────────────────────────────────────
const { company, companyStatements, supplyTerms, weeks, usdRange } = loadProjectModule("content/data/company.ts");
const { E23_MIN, E17_MIN, E23_ISO_PUBLISHED, TYP_NOTE, PROPERTY_ROWS } = loadProjectModule("lib/catalog/en13706.ts");
const { SEED_FORMULATIONS } = loadProjectModule("lib/catalog/seed.ts");
const { buildProducts } = loadProjectModule("lib/catalog/standardProfiles.ts");
const { sectionRow } = loadProjectModule("lib/catalog/sectionRows.ts");
const { buildSection, computeProperties } = loadProjectModule("lib/catalog/shapes.ts");
const { PROFILE_FAMILIES } = loadProjectModule("lib/catalog/profileFamilies.ts");
const { buildSpanTables, DESIGN_BASIS, SPANS_MM } = loadProjectModule("lib/spanTables.ts");
const { DESIGN_MATERIALS, DESIGN_METHODS, LOAD_DURATIONS, ENV_FACTORS, MARKET_CODES, BEAM_LOAD_CASES, designResistance } = loadProjectModule("lib/frpDesignBasis.ts");
const { calcIx, calcWx, calcArea, calcShearArea } = loadProjectModule("lib/frpSectionProperties.ts");
const { checkColumn, END_CONDITIONS } = loadProjectModule("lib/frpColumn.ts");
const { THERMAL_MATERIALS } = loadProjectModule("lib/thermalMovement.ts");
const { STOCK_OPTIONS } = loadProjectModule("lib/cutList.ts");
const { GUARD_LOAD_CASES } = loadProjectModule("lib/guardrailLoads.ts");
const { applicationPages } = loadProjectModule("lib/applicationPages.ts");
const { industries } = loadProjectModule("content/data/industries.ts");
const { productFamilies } = loadProjectModule("content/data/productTaxonomy.ts");
const { frpHandrailCatalogSystems } = loadProjectModule("content/data/frpHandrailSpecs.ts");
const { frpFixedLadderCatalogSpecs, frpLadderCageLayoutReferences } = loadProjectModule("content/data/frpLadderSpecs.ts");
const { engineeringEvidence, reportedResults, commercialFacts, quotationChecklist } = loadProjectModule("content/data/engineeringEvidence.ts");
const { e40Reports, e40TestMethod, e40ReportDate } = loadProjectModule("content/data/e40Evidence.ts");
const { pvFrameReports } = loadProjectModule("content/data/pvFrameEvidence.ts");
const { performanceSections, chemicalExamples, performanceSources } = loadProjectModule("content/data/pultrudedPerformance.ts");
const { fallbackDownloads } = loadProjectModule("content/data/downloads.ts");
const { factoryStaircase, chongqingRooftopPv, beamBridgeGuide } = loadProjectModule("lib/familyApplications.ts");
const { authorsBySlug } = loadProjectModule("lib/authors.ts");

const SITE = "https://www.f1composite.com";
const products = buildProducts();
// sectionRow rounds to four significant figures for the web tables; the manual
// formats from the unrounded engine values so nothing is rounded twice.
const rows = products.map((p) => {
  const row = sectionRow(p.model, p.geometry.shape, p.geometry.dims, p.weight);
  if (!row) throw new Error(`${p.model} could not be described by the section engine`);
  const exact = computeProperties(p.geometry);
  return { ...row, A: exact.A, Ix: exact.Ix / 1e4, Iy: exact.Iy / 1e4, Wx: exact.Sx / 1e3, Wy: exact.Sy / 1e3, rx: exact.rx, ry: exact.ry };
});
const byShape = (shape) => rows.filter((r) => r.shape === shape);
const spanFamilies = buildSpanTables();
const epd = fallbackDownloads.find((d) => d.file === "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf");
const ul94 = pvFrameReports.find((r) => r.id === "sgs-gzmr260702529004");
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

// ── formatting ──────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const num = (v, max = 2, min = 0) => (v == null || !Number.isFinite(v) ? "—" : v.toLocaleString("en-US", { minimumFractionDigits: min, maximumFractionDigits: max }));
/** Published mass, with the catalog's own precision. */
const mass = (v) => (v == null ? "—" : String(v));
/** Four significant figures from the unrounded value, trailing zeros dropped. */
const sig4 = (v) => (v == null || !Number.isFinite(v) ? "—" : Number(v.toPrecision(4)).toLocaleString("en-US", { maximumFractionDigits: 6 }));
const code = (s) => `<span class="code">${esc(s)}</span>`;
/** Subscripts for the k_F, γ_M, T_g notation of the data strings (after esc). */
const sym = (s) => String(s).replace(/(?<!\w)([γkTEGF])_([A-Za-z]{1,3})\b/g, "$1<sub>$2</sub>").replace(/(T<sub>g<\/sub>) - /g, "$1 − ");
/** Keep standard designations on one line (ASCE/SEI 74-23, EN ISO 14122-3 …). */
const nb = (html) => html.replace(/\b((?:ASCE\/SEI|PD CEN\/TS|CEN\/TS|BS EN ISO|BS EN|EN ISO|EN|ISO|ASTM|IEC|CSA|AS\/NZS|GB\/T|GB|UL|IBC|OSHA|NBC|ACI|ANSI|BS|AS) \d[\w.]*(?:-[\w.]+)*(?::\d{4})?)/g, '<span class="nbsp">$1</span>');
/** Source labels of the performance registry use "BODY · number"; print "BODY number". */
const srcLabel = (label) => label.replace(/^([A-Z/]+) · /, "$1 ");
const tag = (s) => `<span class="tag">${esc(s)}</span>`;
const note = (html, cls = "") => `<div class="note ${cls}">${html}</div>`;
const p = (html) => `<p>${html}</p>`;
const h2 = (s, sub = "") => `<h2>${esc(s)}${sub ? `<span class="sub">${esc(sub)}</span>` : ""}</h2>`;
const h3 = (s) => `<h3>${esc(s)}</h3>`;
const fig = (n, title, body, caption = "") => `<figure class="fig"><figcaption><span class="mono">Fig. ${n}</span> <strong>${esc(title)}</strong>${caption ? `<span class="cap">${caption}</span>` : ""}</figcaption>${body}</figure>`;

function table({ head, body, cls = "", widths = [], aligns = [] }) {
  const colgroup = widths.length ? `<colgroup>${widths.map((w) => `<col style="width:${w}">`).join("")}</colgroup>` : "";
  const th = head.map((c, i) => `<th class="${aligns[i] === "r" ? "num" : ""}">${c}</th>`).join("");
  const tr = body.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td class="${aligns[i] === "r" ? "num" : ""}">${c}</td>`)).join("")}</tr>`).join("");
  return `<table class="t ${cls}">${colgroup}<thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}
function kv(pairs, cls = "") {
  return `<dl class="kv ${cls}">${pairs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}
function ul(items, cls = "") {
  return `<ul class="list ${cls}">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}
function ol(items, cls = "") {
  return `<ol class="steps ${cls}">${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
}

// ── section drawings (same geometry engine as the datasheets) ───────────────
const DIM_SYMBOLS = {
  i_beam: { v: ["H", "H"], h: ["B", "B"], t: (d) => `t = ${d.tf}`, name: (d) => `I ${d.H}×${d.B}×${d.tw}` },
  channel: { v: ["H", "H"], h: ["B", "B"], t: (d) => `t = ${d.tf}`, name: (d) => `U ${d.H}×${d.B}×${d.tw}` },
  angle: { v: ["a", "a"], h: ["b", "b"], t: (d) => `t = ${d.t}`, name: (d) => `L ${d.a}×${d.b}×${d.t}` },
  shs: { v: ["D", "D"], h: ["D", "D"], t: (d) => `t = ${d.t}`, name: (d) => `SHS ${d.D}×${d.D}×${d.t}` },
  rhs: { v: ["H", "H"], h: ["B", "B"], t: (d) => `t = ${d.t}`, name: (d) => `RHS ${d.H}×${d.B}×${d.t}` },
  tube: { v: ["OD", "OD"], h: null, t: (d) => `t = ${d.t}`, name: (d) => `CHS ${d.OD}×${d.t}` },
  rod: { v: ["D", "D"], h: null, t: null, name: (d) => `Rod Ø${d.D}` },
  flat: { v: ["W", "H"], h: ["T", "B"], t: null, name: (d) => `FB ${d.H}×${d.B}` },
};

/**
 * A dimensioned cross-section of one catalog size, drawn to a clean scale
 * (1:1, 1:2, 1:2.5, 1:4 or 1:5) so that millimetres on paper are honest.
 */
function sectionDrawing(shape, dims, { maxMm = 54 } = {}) {
  const section = buildSection({ kind: "parametric", shape, dims });
  const props = computeProperties({ kind: "parametric", shape, dims });
  const pts = section.outer;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = maxX - minX, h = maxY - minY;
  const scale = [1, 2, 2.5, 4, 5, 8].find((k) => Math.max(w, h) / k <= maxMm) ?? 10;
  const s = 1 / scale;
  const padL = 22, padR = 20, padT = 7, padB = 17;
  const W = Math.max(w * s + padL + padR, 62), H = h * s + padT + padB;
  const X = (x) => padL + (x - minX) * s;
  const Y = (y) => padT + (maxY - y) * s;
  const ring = (r) => r.map(([x, y], i) => `${i ? "L" : "M"}${X(x).toFixed(2)} ${Y(y).toFixed(2)}`).join(" ") + "Z";
  const path = [section.outer, ...(section.holes ?? [])].map(ring).join(" ");
  const cx = X(props.cx), cy = Y(props.cy);
  const sym = DIM_SYMBOLS[shape];
  const out = [];
  out.push(`<svg class="sec" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace" font-size="2.6">`);
  // centroidal axes
  out.push(`<line x1="${(padL - 6).toFixed(2)}" y1="${cy.toFixed(2)}" x2="${(X(maxX) + 7).toFixed(2)}" y2="${cy.toFixed(2)}" stroke="#9aa3b2" stroke-width="0.18" stroke-dasharray="1.6 0.8 0.3 0.8"/>`);
  out.push(`<line x1="${cx.toFixed(2)}" y1="${(padT - 5).toFixed(2)}" x2="${cx.toFixed(2)}" y2="${(Y(minY) + 6).toFixed(2)}" stroke="#9aa3b2" stroke-width="0.18" stroke-dasharray="1.6 0.8 0.3 0.8"/>`);
  out.push(`<text x="${(X(maxX) + 7.6).toFixed(2)}" y="${(cy + 0.9).toFixed(2)}" fill="#626d80">x</text>`);
  out.push(`<text x="${(cx + 1).toFixed(2)}" y="${(padT - 5.4).toFixed(2)}" fill="#626d80">y</text>`);
  // section
  out.push(`<path d="${path}" fill="rgba(10,155,145,0.12)" stroke="#007a74" stroke-width="0.35" fill-rule="evenodd" stroke-linejoin="round"/>`);
  // vertical dimension (left)
  const dx = padL - 7;
  const tick = (x1, y1, x2, y2) => `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="#0b1838" stroke-width="0.22"/>`;
  out.push(tick(dx, Y(maxY), dx, Y(minY)));
  out.push(tick(dx - 1.5, Y(maxY), X(minX) - 1.2, Y(maxY)));
  out.push(tick(dx - 1.5, Y(minY), X(minX) - 1.2, Y(minY)));
  const vLabel = `${sym.v[0]} = ${dims[sym.v[1]]}`;
  out.push(`<text x="${(dx - 1.6).toFixed(2)}" y="${((Y(maxY) + Y(minY)) / 2).toFixed(2)}" fill="#0b1838" text-anchor="end" dominant-baseline="middle">${vLabel}</text>`);
  // horizontal dimension (bottom)
  if (sym.h) {
    const dy = Y(minY) + 7;
    out.push(tick(X(minX), dy, X(maxX), dy));
    out.push(tick(X(minX), dy + 1.5, X(minX), Y(minY) + 1.2));
    out.push(tick(X(maxX), dy + 1.5, X(maxX), Y(minY) + 1.2));
    out.push(`<text x="${((X(minX) + X(maxX)) / 2).toFixed(2)}" y="${(dy + 3.6).toFixed(2)}" fill="#0b1838" text-anchor="middle">${sym.h[0]} = ${dims[sym.h[1]]}</text>`);
  }
  // wall thickness leader (right side)
  if (sym.t) {
    const t = shape === "i_beam" || shape === "channel" ? dims.tf : dims.t;
    // a point on the right-hand wall at mid height for closed sections / angle vertical leg top for angle
    let px, py;
    if (shape === "angle") { px = X(minX + dims.t / 2); py = Y(maxY - h * 0.2); }
    else if (shape === "i_beam" || shape === "channel") { px = X(maxX - dims.B / 2); py = Y(maxY - t / 2); }
    else { px = X(maxX - t / 2); py = Y(maxY - h * 0.3); }
    const lx = X(maxX) + 9, ly = Math.min(py, padT + 3);
    out.push(`<line x1="${px.toFixed(2)}" y1="${py.toFixed(2)}" x2="${lx.toFixed(2)}" y2="${ly.toFixed(2)}" stroke="#0b1838" stroke-width="0.22"/>`);
    out.push(`<circle cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" r="0.45" fill="#0b1838"/>`);
    out.push(`<text x="${(lx + 0.8).toFixed(2)}" y="${(ly + 0.9).toFixed(2)}" fill="#0b1838">${sym.t(dims)}</text>`);
  }
  out.push(`<text x="${padL.toFixed(2)}" y="${(H - 1.2).toFixed(2)}" fill="#626d80" font-size="2.3">${sym.name(dims)} · scale 1:${scale}</text>`);
  out.push("</svg>");
  return out.join("");
}

/** Small outline glyph of a family at representative proportions (cover and cards). */
const GLYPH_DIMS = {
  i_beam: { H: 100, B: 66, tf: 10, tw: 10 }, channel: { H: 100, B: 52, tf: 10, tw: 10 }, angle: { a: 90, b: 90, t: 12 },
  shs: { D: 90, t: 12 }, rhs: { H: 62, B: 100, t: 11 }, tube: { OD: 90, t: 12 }, rod: { D: 72 }, flat: { H: 100, B: 20 },
};
function glyph(shape, size = 12, stroke = "#007a74", fill = "rgba(10,155,145,0.12)") {
  const section = buildSection({ kind: "parametric", shape, dims: GLYPH_DIMS[shape] });
  const xs = section.outer.map((p) => p[0]), ys = section.outer.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const sc = 40 / Math.max(maxX - minX, maxY - minY);
  const m = ([x, y]) => [24 + (x - (minX + maxX) / 2) * sc, 24 - (y - (minY + maxY) / 2) * sc];
  const ring = (r) => r.map((pt, i) => { const [x, y] = m(pt); return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ") + "Z";
  const d = [section.outer, ...(section.holes ?? [])].map(ring).join(" ");
  return `<svg width="${size}mm" height="${size}mm" viewBox="0 0 48 48" aria-hidden="true"><path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="1.6" fill-rule="evenodd" stroke-linejoin="round"/></svg>`;
}

// ── page machinery ──────────────────────────────────────────────────────────
const pages = [];
const toc = [];
/** Running-header labels: the full titles wrap the header line. */
const SHORT_TITLES = { "01": "Company and range", "02": "Material", "03": "Design basis", "04": "Section tables", "05": "Allowable load tables", "06": "Applications and systems", "07": "Durability", "08": "Fabrication and maintenance", "09": "Ordering and contact" };
let section = "";
function page(body, opts = {}) {
  pages.push({ body, section: opts.section ?? section, cls: opts.cls ?? "", bare: Boolean(opts.bare) });
  return pages.length;
}
function openSection(number, title, intro, body = "", short = title) {
  section = `${number} · ${SHORT_TITLES[number] ?? short}`;
  const n = pages.length + 1;
  toc.push({ number, title, page: n });
  const band = `<div class="band"><div class="band-num">${number}</div><div class="band-text"><h1>${esc(title)}</h1><p>${intro}</p></div></div>`;
  return page(band + body);
}
let figNo = 0;
const nextFig = () => ++figNo;

// ── derived numbers used in prose (never typed by hand) ────────────────────
const fam = (shape) => byShape(shape);
const familyCards = [
  { shape: "i_beam", label: "I-beams and wide flanges", rows: fam("i_beam"), range: (r) => `${r[0].d}×${r[0].b} to ${r.at(-1).d}×${r.at(-1).b} mm`, use: "Primary beams for walkways, platforms and bridges; the most bending stiffness per kilogram." },
  { shape: "channel", label: "Channels", rows: fam("channel"), range: (r) => `${r[0].d}×${r[0].b} to ${r.at(-1).d}×${r.at(-1).b} mm`, use: "Secondary framing, cable-tray stringers, stair stringers and modular skids; open section for bolted connections." },
  { shape: "angle", label: "Angles", rows: fam("angle"), range: (r) => `${r[0].d}×${r[0].b} to ${r.at(-1).d}×${r.at(-1).b} mm`, use: "Stiffeners, bracing, ledgers, cleats and corner connections." },
  { shape: "shs", label: "Square tubes (SHS)", rows: fam("shs"), range: (r) => `${r[0].d}×${r[0].b} to ${r.at(-1).d}×${r.at(-1).b} mm`, use: "Columns, posts, trusses and frames; closed section with high torsional stiffness." },
  { shape: "rhs", label: "Rectangular tubes (RHS)", rows: fam("rhs"), range: (r) => `${r[0].d}×${r[0].b} to ${r.at(-1).d}×${r.at(-1).b} mm`, use: "Purlins, crossarms and frame rails where one axis carries more load." },
  { shape: "tube", label: "Round tubes (CHS)", rows: fam("tube"), range: (r) => `Ø${r[0].d} to Ø${r.at(-1).d} mm`, use: "Handrails, guardrail posts, masts, conduits and insulating stand-offs." },
  { shape: "rod", label: "Solid rods", rows: fam("rod"), range: (r) => `Ø${r[0].d} to Ø${r.at(-1).d} mm`, use: "Tie rods, spacers, insulators and stakes; unidirectional rovings." },
  { shape: "flat", label: "Flat bars", rows: fam("flat"), range: (r) => `${r[0].d}×${r[0].t} to ${r.at(-1).d}×${r.at(-1).t} mm`, use: "Stiffeners, splice plates, kick plates, wear strips and spacers." },
];
const massMin = Math.min(...rows.map((r) => r.mass)), massMax = Math.max(...rows.map((r) => r.mass));

// Worked beam example: the I 200×100×10 the span-table FAQ quotes, at 3 m.
const EX = { model: "I 200×100×10", h: 200, b: 100, t: 10, span: 3000 };
const exRow = spanFamilies.find((f) => f.id === "i-beam").rows.find((r) => r.model === EX.model);
const exCell = exRow.cells[SPANS_MM.indexOf(EX.span)];
const exIx = calcIx("i-beam", EX.h, EX.b, EX.t, EX.t);
const exWx = calcWx(exIx, EX.h);
const exA = calcArea("i-beam", EX.h, EX.b, EX.t, EX.t);
const exAv = calcShearArea("i-beam", EX.h, EX.b, EX.t, EX.t);
const E_MPA = DESIGN_BASIS.E_L_GPa * 1000, G_MPA = DESIGN_BASIS.G_LT_GPa * 1000, GAMMA_Q = 1.6, DEFL_N = 250;
const exResist = designResistance({ material: DESIGN_MATERIALS["frp-e23"], method: "lrfd-asce", envId: "outdoor", durationId: "occupancy" });
const ex_wb = (8 * exResist.bendingAllowable * exWx) / (GAMMA_Q * EX.span ** 2);
const ex_wv = (2 * exResist.shearAllowable * exAv) / (GAMMA_Q * EX.span);
const ex_k = 1 + (9.6 * E_MPA * exIx) / (G_MPA * exAv * EX.span ** 2);
const ex_wd = (384 * E_MPA * exIx) / (5 * DEFL_N * EX.span ** 3 * ex_k);
const ex_w = Math.min(ex_wb, ex_wv, ex_wd);
if (Math.abs(ex_w - exCell.w) > 0.02 * exCell.w) throw new Error(`Worked example (${ex_w.toFixed(3)}) disagrees with the span table (${exCell.w.toFixed(3)})`);

// Worked column example: the same section as a 3 m pinned column, indoor.
const colInput = { section: { shape: "i-beam", h: EX.h, b: EX.b, tf: EX.t, tw: EX.t }, lengthMm: 3000, K: 1, weakAxisDivisor: 1, loadKn: 20, materialId: "frp-e23", method: "lrfd-asce", envId: "indoor-dry", durationId: "occupancy" };
const col = checkColumn(colInput);
if (!col) throw new Error("Column example did not compute");
const colBraced = { 2: checkColumn({ ...colInput, weakAxisDivisor: 2 }), 3: checkColumn({ ...colInput, weakAxisDivisor: 3 }) };
const weakKn = (c) => c.modes.find((m) => m.mode === "global-y").nominalKn;

// Thermal example: a 6 m member, installed at 20 °C, service −10 to +50 °C.
const thermal = (id) => THERMAL_MATERIALS.find((m) => m.id === id);
const TH = { L: supplyTerms.standardLengthM * 1000, dTh: 30, dTc: 30 };
const thMove = (m, dT) => m.alpha * 1e-6 * TH.L * dT;


// Resin "use" sentence: the seed notes minus the shared provenance sentences.
const EN_NOTE_RE = /Minimum requirements per EN 13706-3:2002 Table 1, grade E\d+\. Guaranteed minimums for laminates declared to this grade; replace with measured values where certified test data exists\.\s*/;
const DG_TYP = "Density and glass content shown are typical for the resin system, not certified F1 values.";
const resinUse = (f) => f.code === "E23-ISO"
  ? "Standard laminate for general structural use: the published values of this section. Not fire-retardant; specify FR-E23 for an ASTM E84 Class 1 requirement."
  : (f.notes ?? "").replace(EN_NOTE_RE, "").replace(DG_TYP, "").replace(TYP_NOTE, "").replace(/\s+/g, " ").trim().split(";")[0].replace(/\.?$/, ".");

const FAMILY_WORDS = {
  i_beam: /\bI-beams?\b/i, channel: /\bchannels?\b/i, angle: /\bangles?\b/i, shs: /\bsquare tubes?\b|\bsquare hollow\b/i,
  rhs: /\brectangular\b/i, tube: /\bround tubes?\b|\bround-tube\b/i, rod: /\bsolid round\b|\brods?\b/i, flat: /\bflat bars?\b/i,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════

// Cover ─────────────────────────────────────────────────────────────────────
const logoPath = join(root, "public/brand/f1-logo.png");
const logoData = existsSync(logoPath) ? `data:image/png;base64,${readFileSync(logoPath).toString("base64")}` : "";
page(`
  <div class="cover-top">
    ${logoData ? `<img class="logo" src="${logoData}" alt="F1 Composites">` : `<div class="wordmark">F1 COMPOSITES</div>`}
    <div class="cover-kicker mono">Technical manual · ${esc(MANUAL.issuedLabel)} edition</div>
    <h1 class="cover-title">FRP Profile<br>Design Manual</h1>
    <p class="cover-sub">${esc(MANUAL.subtitle)}</p>
  </div>
  <div class="cover-bottom">
    <div class="cover-grid">
      ${["i_beam", "channel", "angle", "shs", "rhs", "tube", "rod", "flat"].map((s) => `<div class="cover-cell">${glyph(s, 17, "#8fd6ce", "rgba(143,214,206,0.14)")}<span class="mono">${esc(PROFILE_FAMILIES[s].label)}</span></div>`).join("")}
    </div>
    <div class="cover-facts">
      <div><strong>${rows.length}</strong><span>catalog sizes</span></div>
      <div><strong>${familyCards.length}</strong><span>section families</span></div>
      <div><strong>${E23_ISO_PUBLISHED.e_l_gpa} GPa</strong><span>E23 longitudinal modulus</span></div>
      <div><strong>${supplyTerms.standardLengthM} m</strong><span>standard length</span></div>
    </div>
    <div class="cover-meta mono">${esc(company.brand)} · ${esc(MANUAL.code)} · Rev. ${esc(MANUAL.revision)} · ${esc(MANUAL.issued)} · supersedes ${esc(MANUAL.supersedes.split(",")[0])}</div>
  </div>`, { bare: true, cls: "cover" });

// Inside cover: about this edition ──────────────────────────────────────────
section = "About this edition";
page(`
  ${h2("About this edition")}
  <div class="cols2">
  ${p(`Revision ${esc(MANUAL.revision)} replaces the April 2026 edition (Rev. A), which was withdrawn in September 2026 because it described a laminate, a service life and fire and chemical data that F1 Composite does not publish. This edition is generated from the same data that the website, the per-size datasheets and the engineering tools use, so a value here is the value you will find there.`)}
  ${h3("What changed from Rev. A")}
  ${ul([
    `The standard laminate is the <strong>isophthalic polyester E23 laminate</strong> printed on every F1 datasheet. Rev. A described an epoxy laminate as standard; epoxy is a project option.`,
    `Section tables cover <strong>all ${rows.length} catalog sizes</strong> with the published mass and section properties computed from the nominal section, in place of five section types (about fifteen imperial sizes) whose properties could not be reproduced.`,
    `Load tables follow the <strong>published design basis</strong> (LRFD to ASCE/SEI 74-23 factors, L/250, shear deflection included) and give allowable loads, not unfactored deflections at L/200.`,
    `Fire and chemical performance are stated <strong>by resin formulation with their evidence status</strong>. The UK fire-classification table (which included an aluminum deck and cladding row and platform-system rows) and the unattributed chemical table were removed.`,
    `No design-life, warranty or maintenance-interval promise is made; durability depends on the formulation, the exposure and the inspection plan (Section 7).`,
    `Standard citations were corrected: interlaminar shear is EN ISO 14130 (Rev. A printed a truncated standard number) and the grade minimums are cited to EN 13706-3 Table 1; the pin-bearing method is EN 13706-2 Annex E, as the datasheets now also state.`,
  ])}
  ${h3("How values are labeled")}
  ${table({ head: ["Label", "Meaning"], widths: ["26mm", "auto"], body: [
    [tag("Published"), "An F1 catalog value: the mass per meter of every size, and the laminate values F1 publishes above the grade minimum."],
    [tag("EN minimum"), "The requirement of EN 13706-3:2002 Table 1 for the declared grade. A laminate declared to E23 meets or exceeds it."],
    [tag("Typical"), "An industry value for the resin system that EN 13706 does not specify, pending F1 certified test data."],
    [tag("Reference"), "An attributed published value (a standard, an industry association or a supplier chart). It is not an F1 test result."],
    [tag("Calculated"), "Derived from the nominal, sharp-cornered section or from the stated formulas and factors."],
    [tag("Test report"), "A result from a named third-party report, quoted with its scope. It applies to the tested specimen."],
  ] })}
  </div>
  ${h3("Using this manual")}
  ${p(`The tables are a preliminary-sizing aid for engineers who know steel or aluminum and are specifying pultruded FRP for the first or second time. They compare candidate sections, reproduce assumptions and prepare a request for quotation. A qualified engineer establishes the governing loads, combinations, restraint, code edition, material qualification, connection details and final limit states for the actual project. ${esc(commercialFacts.compliance)}`)}
  <div class="doc-control">
    ${kv([
      ["Document", `${esc(MANUAL.code)} · Rev. ${esc(MANUAL.revision)}`],
      ["Issued", esc(MANUAL.issuedLabel)],
      ["Supersedes", esc(MANUAL.supersedes)],
      ["Prepared by", `${esc(author.name)}, ${esc(author.role)}`],
      ["Reviewed by", `${esc(reviewer.fullName)}, ${esc(reviewer.role)}`],
      ["Data revision", `Website data as of ${esc(MANUAL.issued)}; evidence index ${esc(loadProjectModule("content/data/engineeringEvidence.ts").evidenceRevision)}`],
      ["Publisher", `${esc(company.legalName)}, ${esc(company.address.addressLocality)}, China · ${SITE.replace("https://", "")}`],
    ], "two")}
  </div>`);

// Contents placeholder (filled after all sections are known) ───────────────
const TOC_INDEX = page("", { section: "Contents" }) - 1;

// ───────────────────────────────────────────────────────────────────────────
// 01 · F1 Composite and the F1-STRUX range
// ───────────────────────────────────────────────────────────────────────────
openSection("01", "F1 Composite and the F1-STRUX range",
  `${esc(companyStatements.short)} This manual covers the F1-STRUX standard pultruded profile range: ${rows.length} catalog sizes in ${familyCards.length} section families, declared to EN 13706 grade E23, with the design basis, section data, allowable-load tables and application guidance needed to specify them.`,
  `
  <div class="cols2">
  ${h3("The company")}
  ${p(esc(companyStatements.relationship))}
  ${p(`The group's production network has ${company.production.bases} manufacturing bases and ${company.production.lines} pultrusion lines with about ${num(company.production.annualTonnes, 0)} metric tons of annual capacity and ${num(company.production.dieSets, 0)} die sets, in ${company.production.locations.map(esc).join(" and ")}. F1 Composite was founded in ${esc(company.foundingYear)} and supplies ${esc(company.exportCountries)} countries. ${esc(company.manufacturer.name)} is the FengDu subsidiary named on several product documents, including the SGS full-section reports in Section 2.`)}
  ${p(`The "F1" stands for "Fiber One". F1 Composite is an industrial FRP company with no connection to motorsport.`)}
  ${h3("Certificates and evidence")}
  ${p(esc(companyStatements.certificates))}
  </div>
  ${h3("Product lines")}
  ${table({ head: ["Product line", "Products", "Scope"], widths: ["26mm", "44mm", "auto"], cls: "small", body: productFamilies.map((f) => [esc(f.brand), esc(f.label), esc(f.description)]) })}
  <div class="facts">
    <div><strong>${company.production.bases}</strong><span>production bases</span></div>
    <div><strong>${company.production.lines}</strong><span>pultrusion lines</span></div>
    <div><strong>${num(company.production.annualTonnes / 1000, 0)}k t</strong><span>annual capacity</span></div>
    <div><strong>${num(company.production.dieSets, 0)}</strong><span>die sets</span></div>
    <div><strong>${esc(company.exportCountries)}</strong><span>export markets</span></div>
  </div>`);

page(`
  ${h2("Supply terms and what the catalog is")}
  <div class="cols2">
  ${p(`<strong>Catalog sizes are standard section options, not stock.</strong> ${esc(commercialFacts.availability)} ${esc(commercialFacts.pricing)}`)}
  ${table({ head: ["Item", "F1 term"], widths: ["48mm", "auto"], body: [
    ["Reply to an inquiry", `Within ${esc(supplyTerms.responseTime)}`],
    ["Catalog section, existing die", weeks(supplyTerms.catalogLeadTimeWeeks)],
    ["Variant on an existing die", weeks(supplyTerms.existingDieVariantLeadTimeWeeks)],
    ["New section, new die", `${weeks(supplyTerms.newDieLeadTimeWeeks)} (die manufacture ${weeks(supplyTerms.dieManufactureWeeks)})`],
    ["Minimum run, custom section", `${num(supplyTerms.customMoqMeters.firstRun, 0)} m first run; ${num(supplyTerms.customMoqMeters.repeat, 0)} m repeat`],
    ["One-time die cost", `${usdRange(supplyTerms.dieCostUsd.singleCavity)} small single-cavity; ${usdRange(supplyTerms.dieCostUsd.largeOrMultiCavity)} large or multi-cavity`],
    ["Standard length", `${supplyTerms.standardLengthM} m; cut to length on request`],
  ] })}
  ${h3("Stock lengths and containers")}
  ${table({ head: ["Length", "Note"], widths: ["18mm", "auto"], cls: "small", body: STOCK_OPTIONS.map((o) => [esc(o.label), esc(o.note)]) })}
  ${h3("Colors, surface and tolerances")}
  ${p(`Standard colors are gray and safety yellow; custom RAL colors are available for orders that meet the minimum quantity, typically 200 linear meters. Standard profiles are pultruded with a surface veil that forms a resin-rich outer layer; UV-stabilized resin and a compatible coating can be specified for exposed service (Section 7).`)}
  ${p(`Dimensional tolerances follow ASTM D3917 unless the drawing calls up EN 13706-2 or GB/T 31539 classes. There is no single ± value for every shape: agree the size band, the datum, the wall and corner limits, straightness over a stated gauge length, twist and cut length on the approved drawing (Section 9). Flat bars are held to ±0.25 mm on thickness and ±0.5 mm on width, with ±5 mm on a 6 m length.`)}
  </div>
  ${note(`<strong>Resin is chosen per production run.</strong> The same die runs isophthalic polyester, fire-retardant polyester, vinyl ester, polyurethane, epoxy or phenolic; the resin system becomes part of the quoted specification and is recorded on the mill certificate. State chemicals, temperature, fire code and UV exposure in the inquiry.`)}
  ${h3("Standards the range is specified against")}
  ${table({ head: ["Topic", "Europe", "North America", "China"], widths: ["38mm", "auto", "auto", "auto"], cls: "small", body: [
    ["Profile grade and test methods", "EN 13706-1/-2/-3 (grades E17, E23)", "ASTM D7290 characteristic values; ASTM D638, D790, D695, D2344 coupon methods", "GB/T 31539-2015"],
    ["Dimensional tolerances", "EN 13706-2", "ASTM D3917-23", "GB/T 31539"],
    ["Structural design", "CEN/TS 19101:2022 with EN 1990/1991 actions", "ASCE/SEI 74-23 with ASCE 7-22 loads", "GB 50608-2020; T/CECS 692-2020"],
    ["Workplace access", "EN ISO 14122 series", "OSHA 29 CFR 1910 Subpart D; IBC 2024", "GB 4053"],
    ["Reaction to fire", "EN 13501-1; EN 45545-2 (rail)", "ASTM E84; UL 94 (plastic parts)", "GB 8624-2012 (2025 edition from 1 January 2027)"],
  ] })}`);

page(`
  ${h2("The catalog at a glance", `${familyCards.length} families · ${rows.length} sizes · ${mass(massMin)} to ${mass(massMax)} kg/m`)}
  <div class="cards">
    ${familyCards.map((f) => `<div class="card">${glyph(f.shape, 13)}<div><div class="card-title">${esc(f.label)}</div><div class="card-fact mono">${f.rows.length} sizes · ${esc(f.range(f.rows))}</div><div class="card-text">${esc(f.use)}</div><div class="card-fact mono">${mass(Math.min(...f.rows.map((r) => r.mass)))}–${mass(Math.max(...f.rows.map((r) => r.mass)))} kg/m</div></div></div>`).join("")}
  </div>
  ${h3("Beyond the catalog")}
  <div class="cols2">
  ${p(`A section the catalog does not cover is developed from your drawing on new tooling (F1-FORM): cross-sections up to about 600 × 300 mm, multi-cell hollows, dog-bone and strut profiles, and sections with integrated screw channels. Tooling, sampling and secondary fabrication are reviewed before production; the minimum runs and die costs on the previous page apply.`)}
  ${p(`Handrail and fixed-ladder systems assembled from square and round tube, angles and flat bars of the handrail and ladder catalogs (some wall thicknesses differ from the Section 4 profile sizes) are described in Section 6, with the catalog dimensions and the load cases they are checked against. Grating, stair treads, GFRP rebar, window profiles and fasteners have their own catalogs on the website.`)}
  </div>
  ${h3("How a catalog designation reads")}
  ${table({ head: ["Prefix", "Family", "Designation", "Dimensions in order"], widths: ["16mm", "40mm", "34mm", "auto"], cls: "small", body: [
    ["I", "I-beams and wide flanges", "I 200×100×10", "depth H × flange width B × thickness t (flange and web)"],
    ["U", "Channels", "U 200×60×8", "depth H × flange width B × thickness t"],
    ["L", "Angles", "L 100×100×10", "leg a × leg b × thickness t"],
    ["SHS / RHS", "Square and rectangular tubes", "SHS 100×100×8, RHS 120×60×5", "outside depth × outside width × wall t"],
    ["CHS", "Round tubes", "CHS 100×6", "outside diameter × wall t"],
    ["Rod", "Solid rods", "Rod Ø25", "diameter"],
    ["FB", "Flat bars", "FB 100×10", "width × thickness"],
  ] })}
  ${p(`<span class="small">The datasheet of a size is at ${SITE.replace("https://", "")}/datasheets/‹designation›, with the designation written in lower case and "x" between the numbers (i-200x100x10, chs-100x6, rod-25, fb-100x10).</span>`)}`);

// ───────────────────────────────────────────────────────────────────────────
// 02 · Material
// ───────────────────────────────────────────────────────────────────────────
openSection("02", "Material: the E23 laminate and resin systems",
  `A pultruded profile is a stack of continuous glass reinforcement in a thermoset matrix. The glass sets stiffness and strength along the profile; the resin sets what happens off-axis and over time: chemical and fire behavior, temperature limit, transverse strength and durability. This section gives the laminate values F1 publishes, the EN 13706 grade minimums beside them, and the resin systems the same dies run.`,
  `
  <div class="cols2">
  ${h3("Fiber architecture")}
  ${p(`<strong>Unidirectional rovings</strong> in the core carry axial tension, compression and bending; they give the longitudinal modulus of ${E23_ISO_PUBLISHED.e_l_gpa} GPa. <strong>Continuous filament mat</strong> layers add transverse strength and hold the rovings together under shear; without them the transverse modulus would fall well below the ${E23_ISO_PUBLISHED.e_t_gpa} GPa grade minimum. A <strong>surface veil</strong> forms a resin-rich skin that protects the glass from UV, moisture and chemicals and gives the finish. Glass content is ${esc(E23_ISO_PUBLISHED.glass_content)} and density ${E23_ISO_PUBLISHED.density_g_cm3} g/cm³ for the standard laminate.`)}
  ${h3("Why direction matters")}
  ${p(`Longitudinal properties are two to five times the transverse ones (tensile strength ${E23_MIN.tensile_l_mpa} against ${E23_MIN.tensile_t_mpa} MPa at the E23 minimum). Member checks use the longitudinal values; connections, bearing at bolts, web crippling and local buckling depend on the transverse and shear values. Every table in this manual states the direction.`)}
  ${h3("Matrix role")}
  ${p(`The cured resin, about ${100 - Number(String(E23_ISO_PUBLISHED.glass_content).match(/–(\d+)/)[1])} to ${100 - Number(String(E23_ISO_PUBLISHED.glass_content).match(/(\d+)–/)[1])} percent of the standard laminate by weight and roughly half by volume, binds the fibers, transfers load between them in shear, stops fiber micro-buckling in compression and forms the barrier to the environment. Two profiles with identical E23 stiffness can have very different service lives if one has the wrong matrix for the exposure (Section 7).`)}
  </div>
  ${fig(nextFig(), "Laminate build-up of a pultruded flange or wall", `
    <svg width="180mm" height="34mm" viewBox="0 0 180 34" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans, sans-serif" font-size="2.7">
      <rect x="2" y="3" width="90" height="3" fill="#bbdf35" opacity="0.9"/>
      <rect x="2" y="6" width="90" height="4" fill="rgba(10,155,145,0.35)"/>
      <rect x="2" y="10" width="90" height="12" fill="rgba(10,155,145,0.14)"/>
      ${Array.from({ length: 9 }, (_, i) => `<line x1="4" y1="${11.5 + i * 1.2}" x2="90" y2="${11.5 + i * 1.2}" stroke="#007a74" stroke-width="0.35"/>`).join("")}
      <rect x="2" y="22" width="90" height="4" fill="rgba(10,155,145,0.35)"/>
      <rect x="2" y="26" width="90" height="3" fill="#bbdf35" opacity="0.9"/>
      <rect x="2" y="3" width="90" height="26" fill="none" stroke="#0b1838" stroke-width="0.35"/>
      <g fill="#0b1730">
        <text x="96" y="5.6">Surface veil: resin-rich skin, UV and chemical barrier</text>
        <text x="96" y="9.4">Continuous filament mat: transverse strength and shear</text>
        <text x="96" y="17">Unidirectional rovings: axial stiffness and strength</text>
        <text x="96" y="25">Continuous filament mat</text>
        <text x="96" y="28.8">Surface veil</text>
      </g>
      <text x="2" y="33" fill="#626d80" font-size="2.4">Schematic, not to scale. Layer count and mat weight vary by section and wall thickness.</text>
    </svg>`)}`);

page(`
  ${h2("The standard E23 laminate", "E-glass / isophthalic polyester, EN 13706 grade E23")}
  ${p(`The values printed on every F1 product datasheet, with the EN 13706-3:2002 Table 1 minimums for grades E23 and E17 beside them. Read them as material characterization: member capacity comes from these values combined with section properties, factors, connections and the project code (Section 3).`)}
  ${table({ head: ["Property", "Published E23 laminate", "EN 13706 E23 minimum", "EN 13706 E17 minimum", "Test method"], widths: ["48mm", "30mm", "30mm", "30mm", "auto"], aligns: ["", "r", "r", "r", ""], body: [
    ...PROPERTY_ROWS.map((r) => {
      const pub = E23_ISO_PUBLISHED[r.key], min = E23_MIN[r.key], min17 = E17_MIN[r.key];
      const unit = r.unit ? ` ${r.unit}` : "";
      const pubCell = typeof pub === "number" ? `${pub}${unit} ${typeof min === "number" ? (pub > min ? tag("Published") : tag("EN minimum")) : tag("Typical")}` : "—";
      return [esc(r.label), pubCell, typeof min === "number" ? `${min}${unit}` : "Not specified", typeof min17 === "number" ? `${min17}${unit}` : "Not specified", esc(r.method)];
    }),
    ["Density", `${E23_ISO_PUBLISHED.density_g_cm3} g/cm³ ${tag("Published")}`, "Not specified", "Not specified", "EN ISO 1183"],
    ["Glass content", `${esc(E23_ISO_PUBLISHED.glass_content)} ${tag("Published")}`, "Not specified", "Not specified", "EN ISO 1172"],
    ["Full-section flexural modulus (grade test)", `≥ ${E23_MIN.e_l_gpa} GPa ${tag("EN minimum")}`, `${E23_MIN.e_l_gpa} GPa`, `${E17_MIN.e_l_gpa} GPa`, `${esc(e40TestMethod)}, full section`],
  ] })}
  <div class="cols2 top">
  ${p(`<strong>Reading the table.</strong> Interlaminar shear strength is published at ${E23_ISO_PUBLISHED.shear_mpa} MPa, above the EN 13706 minimum of ${E23_MIN.shear_mpa} MPa. The moduli, tensile, flexural and pin-bearing strengths are published at the E23 minimums, which is what a laminate declared to the grade guarantees; batch values are higher and are reported on request. Transverse values are much lower than longitudinal, so connections need their own check.`)}
  ${p(`${esc(TYP_NOTE)} The ILSS value is an apparent interlaminar shear strength from the short-beam method (EN ISO 14130); it is not an in-plane shear strength. The design tools and the span tables of Section 5 take the EN minimum of ${E23_MIN.shear_mpa} MPa, not the published ${E23_ISO_PUBLISHED.shear_mpa} MPa, as the shear strength, because EN 13706 gives no in-plane value and the minimum is what every batch guarantees.`)}
  </div>
  ${note(`<strong>E23 establishes stiffness and strength, nothing else.</strong> Fire behavior, electrical insulation and resistance to a particular chemical need their own evidence for the supplied formulation and configuration. EN 13706 and ASTM D3917 are specification references, not proof of blanket certification.`)}`);

page(`
  ${h2("Grades, higher-modulus tiers and the SGS full-section reports")}
  <div class="cols2">
  ${h3("E17 and E23")}
  ${p(`EN 13706-3 defines two structural grades, named for the minimum full-section flexural modulus in GPa. E23 is the F1 standard for load-bearing members; E17 (glass content ${esc(SEED_FORMULATIONS.find((f) => f.code === "UP-E17").glass_content)}, density ${SEED_FORMULATIONS.find((f) => f.code === "UP-E17").density_g_cm3} g/cm³, both ${tag("Typical")}) is offered for secondary and lightly loaded members where cost matters more than stiffness. The E17 minimums are in the table on the previous page.`)}
  ${h3("Higher-modulus laminates")}
  ${p(`Above E23 the names are commercial, not EN grades. <strong>E30</strong> is a vendor tier defined by a full-section modulus of at least 30 GPa. <strong>"E40"</strong> is a bridge-grade threshold used by Austroads ATS 5880 (full-section modulus of at least 40 GPa); its benchmark construction, as published for an Australian pultruder's bridge product (industry reference, not F1 data), is a fire-retardant vinyl ester laminate with about 77 percent glass by weight. For both tiers only the defining modulus is set; every strength requires program test data before release, and the bridge specification a project adopts may additionally call for characteristic values to ASTM D7290 and a full-section bending test (for example ASTM D6109 or EN 13706-2 Annex D).`)}
  ${h3("What the SGS reports show")}
  ${p(`Two SGS full-section tests to ${esc(e40TestMethod)} on square tubes, issued ${esc(e40ReportDate)} to ${esc(company.manufacturer.name)}, gave averages of ${e40Reports.map((r) => r.average).join(" and ")} GPa. They support a 40 GPa-class laminate for the tested samples. They are not EN 13706 certification, not a design allowable and not size-specific qualification: the specification code on page 1 of each report and the specimen size on page 3 do not match, and the laboratory's clarification is needed before a result is assigned to a catalog size. Both originals are published on the website evidence page.`)}
  </div>
  ${table({ head: ["Report", "Page 1 specification", "Specimen (page 3)", "Span", "Rate", "Individual results (GPa)", "Average"], widths: ["38mm", "24mm", "30mm", "16mm", "16mm", "auto", "18mm"], aligns: ["", "", "", "r", "r", "r", "r"], cls: "small", body: e40Reports.map((r) => [esc(`SGS ${r.reference}`), esc(r.specification), esc(r.specimen), `${num(r.span, 0)} mm`, `${r.rate} mm/min`, r.values.join(" / "), `<strong>${r.average}</strong> ${tag("Test report")}`]) })}
  ${note(`Each report limits its results to the tested samples and carries an internal-reference use note. Quote them as "SGS full-section test, ${esc(e40TestMethod)}, ${e40Reports.map((r) => r.average).join(" / ")} GPa average of three specimens", never as "E40 certified".`)}`);

const resinRows = SEED_FORMULATIONS.filter((f) => f.resin);
page(`
  ${h2("Resin systems", "Declared to EN 13706 grade E23 (UP-E17 to grade E17); the resin sets chemical and fire behavior, not stiffness")}
  ${table({ head: ["Code", "Matrix", "Glass (by weight)", "Density", "Fire behavior of the formulation", "Where it is used"], widths: ["16mm", "30mm", "20mm", "16mm", "48mm", "auto"], aligns: ["", "", "r", "r", "", ""], cls: "xs", body: resinRows.map((f) => [
    `<strong>${esc(f.code)}</strong>`, esc(f.resin), esc(f.glass_content ?? "—"), f.density_g_cm3 ? `${f.density_g_cm3} g/cm³` : "—", esc(f.fire_rating ?? "—"), esc(resinUse(f)),
  ]) })}
  <div class="cols2 top">
  ${p(`<strong>Provenance.</strong> The E23-ISO row is the published standard laminate. For the other rows the glass content and density are typical for the resin system, not certified F1 values, and the mechanical minimums are the EN 13706-3 values of the declared grade. ${esc(TYP_NOTE)}`)}
  ${p(`<strong>Choosing.</strong> Work through the service conditions in order; the first that applies usually decides the matrix. Fire code governs (rail interiors, tunnels, offshore): phenolic, or a fire-retardant polyester or vinyl ester with the test report for the exact formulation. Chemical or marine exposure: vinyl ester checked against the resin supplier's corrosion guide for the chemical, concentration and temperature, with a surface veil. Sustained heat or high-cycle fatigue: epoxy or a high-HDT vinyl ester. Thin walls, fasteners or impact: polyurethane. Otherwise: isophthalic polyester.`)}
  </div>
  ${table({ head: ["Resin system", "HDT or Tg (typical)", "Signature property", "Chemical duty", "Fire route"], cls: "small", widths: ["28mm", "26mm", "auto", "auto", "auto"], body: [
    ["Isophthalic polyester", "HDT 80–110 °C", "Fastest line speeds, most economical", "General atmospheric, mild chemical", "ATH-filled grades reach ASTM E84 Class A"],
    ["Vinyl ester", "HDT 100–150 °C", "Chemical resistance, toughness, hydrolysis resistance", "Acids, chlorides, caustics, immersion, marine", "Brominated or ATH grades; Class A available"],
    ["Polyurethane", "HDT 80–110 °C", "Transverse strength and impact toughness; thinner walls, screw retention", "General duty", "FR grades emerging; verify per project"],
    ["Epoxy", "Tg 120–180 °C", "Highest mechanicals and fatigue life, low cure shrinkage", "Very good, solvent resistant", "Add-on FR systems only"],
    ["Phenolic", "Highest service temperature", "Inherently low flame spread, smoke and toxicity", "Good general duty", "Inherent; specified for EN 45545-2 rail, tunnels, offshore"],
  ] })}
  ${p(`<span class="small">Typical ranges for pultrusion-grade formulations, compiled from resin-supplier technical data sheets and industry references ${tag("Typical")}; they are not F1 measurements. Formulation-specific values, including every fire result, come from the test report of the formulation quoted.</span>`)}`);

const perfRows = (id) => performanceSections.find((s) => s.id === id);
const perfTable = (id) => {
  const s = perfRows(id);
  return `${h3(s.title)}${p(`<span class="small">${esc(s.intro)}</span>`)}${table({ head: ["Property", "Reference value or requirement", "Basis", "Methods"], widths: ["40mm", "48mm", "26mm", "auto"], cls: "small", body: s.rows.map((r) => [esc(r.property), `${esc(r.reference)}${r.unit ? ` <span class="small">(${esc(r.unit)})</span>` : ""}`, tag(r.basis), esc(r.methods)]) })}${p(`<span class="small"><strong>Takeaway.</strong> ${esc(s.takeaway)}</span>`)}`;
};
page(`
  ${h2("Physical, thermal and electrical reference values")}
  ${p(`Reference values are explicitly attributed and are not F1 batch results. "Published reference" rows name their source; "Product-specific" rows must be measured for the offered formulation and are listed so that a specification asks for the right test.`)}
  ${perfTable("thermal")}
  ${perfTable("electrical")}
  ${p(`<span class="small">Sources: ${["epta", "gbThermal", "isoThermal", "dielectric", "volumeResistivity", "surfaceResistivity", "arc", "nhcElectrical"].map((k) => esc(srcLabel(performanceSources[k].label))).join("; ")}. The pultruded profile performance guide on the website lists the full registry with links.</span>`)}`);

// ───────────────────────────────────────────────────────────────────────────
// 03 · Design basis
// ───────────────────────────────────────────────────────────────────────────
openSection("03", "Design basis",
  `Pultruded FRP is anisotropic, stiffness-driven rather than strength-driven, and it creeps under sustained load. Engineers who specify it well treat it as a discipline of its own rather than as lighter steel. This section sets out the resistance model, factors and load cases behind every table in this manual, so that each value can be reproduced or recalculated for another code.`,
  `
  <div class="cols2">
  ${h3("Six things that differ from steel")}
  ${ol([
    `<strong>Deflection governs.</strong> With E<sub>L</sub> about a tenth of steel, a member sized for strength alone deflects far past any serviceability limit. Size by stiffness first, then check strength.`,
    `<strong>Direction matters.</strong> Longitudinal values apply to member checks; transverse and shear values govern connections, bearing and local buckling.`,
    `<strong>The connection decides.</strong> Bolt bearing, edge distance and the load direction at a hole often decide whether the structure performs, not the cross-section.`,
    `<strong>Time and environment reduce strength.</strong> Sustained load, moisture, chemicals and temperature carry explicit factors (next pages); none is optional.`,
    `<strong>Thin walls buckle.</strong> Flange outstands and tube walls need local-buckling checks; open sections need lateral-torsional checks.`,
    `<strong>Shear deflection is real.</strong> G<sub>LT</sub> is only about ${DESIGN_BASIS.G_LT_GPa} GPa against E<sub>L</sub> ${DESIGN_BASIS.E_L_GPa} GPa, so shear adds 5 to 15 percent to the deflection of ordinary spans and more on short, deep members.`,
  ])}
  ${h3("Design workflow")}
  ${ol([
    "Fix the loads, combinations and deflection limit from the code adopted where the structure is built (codes by market, in this section).",
    "Select the laminate and resin for the exposure; take the environment and load-duration factors from this section.",
    "Size the member for deflection with the section properties of Section 4, shear deflection included.",
    "Check bending and shear strength against the factored demand; check local and lateral-torsional stability.",
    "Detail the connections: bearing, edge distances, washers, isolation from steel.",
    "Send span, loads, support conditions and code to F1 engineering for a checked section before the order.",
  ])}
  </div>
  ${note(`<strong>Scope of the tables.</strong> Simply supported prismatic members under one idealized load case, strong-axis bending, uniform section. Not covered: lateral-torsional buckling, local plate buckling, web crippling, bearing, connections, fatigue, fire, creep deflection and rupture, vibration, combined axial and bending, biaxial bending, principal-axis angle design, continuous beams, frames and second-order effects. The F1 column tool screens axial members (page ${"{COLPAGE}"}).`)}`);

page(`
  ${h2("Codes by market", "Loads come from where the structure is built; only two documents design pultruded shapes")}
  ${table({ head: ["Market", "Loads and main combinations", "Pultruded FRP design document", "Related documents"], widths: ["24mm", "auto", "auto", "auto"], cls: "small", body: MARKET_CODES.map((m) => [esc(m.market), sym(esc(m.loads)), esc(m.design), esc(m.related)]) })}
  <div class="cols2 top">
  ${h3("What each document contributes")}
  ${p(`<strong>ASCE/SEI 74-23</strong> is the US load-and-resistance-factor design standard for structures of pultruded GFRP shapes, connections and prefabricated products. This manual uses its resistance factors and the time-effect factors of the 2010 ASCE LRFD Pre-Standard it builds on; it does not reproduce the standard chapter by chapter.`)}
  ${p(`<strong>CEN/TS 19101:2022</strong> is the European technical specification for fiber-polymer composite structures; CEN intends to turn it into a Eurocode by 2028, and until then a project adopts it explicitly. Its actions come from EN 1990:2023, where the partial factors are 1.35·k<sub>F</sub> and 1.5·k<sub>F</sub> with k<sub>F</sub> = 1.0 for consequence class CC2.`)}
  ${p(`<strong>EN 13706</strong> is a product specification, not a design standard: it fixes the grade minimums and test methods used in Section 2. <strong>ASTM D3917</strong> covers dimensional tolerances only. <strong>GB 50608-2020</strong> and <strong>T/CECS 692-2020</strong> form the Chinese design path and keep their own load and resistance factors together.`)}
  ${p(`Where no national document exists (Canada, Australia, New Zealand), the engineer adopts ASCE/SEI 74-23 or CEN/TS 19101 as the resistance model with the local loads, and justifies it to the authority having jurisdiction. The ASCE live-load factor of 1.6 is conservative against the 1.5 of AS/NZS 1170.0 and the NBC.`)}
  </div>`);

page(`
  ${h2("Resistance model, load duration and environment")}
  ${p(`Design strength = φ · λ · F<sub>k</sub> · C<sub>env</sub>, compared with the factored stress. F<sub>k</sub> is min(F<sub>tL</sub>, F<sub>cL</sub>) for bending and the shear strength for shear. On the ASCE path λ is the time-effect factor of the load duration; the CEN path uses γ<sub>M</sub> with the EN 1990 variable-action factor and no creep conversion for permanent loads, which therefore need a separate check.`)}
  ${table({ head: ["Method", "φ bending", "φ shear", "Load factor on the variable action", "Basis"], widths: ["52mm", "16mm", "16mm", "30mm", "auto"], aligns: ["", "r", "r", "r", ""], cls: "small", body: Object.values(DESIGN_METHODS).map((m) => [esc(m.label), num(m.phiFlex, 3), num(m.phiShear, 3), num(m.loadFactor, 2), sym(esc(m.basis))]) })}
  <div class="cols2 top">
  ${h3("Time-effect factor λ (ASCE path)")}
  ${table({ head: ["Load duration", "λ", "Load factor"], widths: ["auto", "12mm", "18mm"], aligns: ["", "r", "r"], cls: "small", body: LOAD_DURATIONS.map((d) => [esc(d.label), num(d.lambda, 1), num(d.loadFactor, 1)]) })}
  ${p(`<span class="small">Values of the ASCE LRFD Pre-Standard for pultruded FRP (2010), Table 2.3-1, on which ASCE/SEI 74-23 builds. A member under permanent load alone keeps only 40 percent of its short-term design strength.</span>`)}
  ${h3("Environment factors (screening)")}
  ${table({ head: ["Service environment", "Strength", "Stiffness"], widths: ["auto", "16mm", "16mm"], aligns: ["", "r", "r"], cls: "small", body: ENV_FACTORS.map((e) => [esc(e.label), num(e.factor, 2), num(e.stiffness, 2)]) })}
  ${p(`<span class="small">${ENV_FACTORS.map((e) => `<strong>${esc(e.label.split(",")[0])}:</strong> ${sym(esc(e.note))}.`).join(" ")}</span>`)}
  </div>
`);

page(`
  ${h2("Material inputs and deflection limits")}
  ${h3("Materials the tools compare")}
  ${table({ head: ["Material", "Standard", "E (GPa)", "E<sub>T</sub> (GPa)", "G<sub>LT</sub> (GPa)", "Strength (MPa)", "F<sub>cL</sub> (MPa)", "Shear (MPa)", "Density (g/cm³)"], widths: ["44mm", "auto", "13mm", "13mm", "14mm", "17mm", "14mm", "14mm", "16mm"], aligns: ["", "", "r", "r", "r", "r", "r", "r", "r"], cls: "xs", body: ["frp-e17", "frp-e23", "frp-gb50608-i", "frp-gb50608-ii", "steel-s235", "steel-s355", "steel-a36", "steel-a992", "steel-350w", "steel-as300", "steel-q235", "steel-q355", "alu-6061", "alu-6063"].map((id) => { const m = DESIGN_MATERIALS[id]; return [esc(m.label), esc(m.standard.split(";")[0].replace(/\s*\(G_LT, F_cL assumed\)/, "")), num(m.E, 1), m.E_T ? num(m.E_T, 1) : "—", m.G_LT ? num(m.G_LT, 1) : "—", num(m.sigma, 0), m.sigma_c ? num(m.sigma_c, 0) : "—", m.tau ? num(m.tau, 0) : "—", num(m.density, 2)]; }) })}
  ${p(`<span class="small">FRP rows: EN 13706-3 minimums for E, E<sub>T</sub>, tensile strength and interlaminar shear; G<sub>LT</sub> and F<sub>cL</sub> are stated assumptions (not in EN 13706), and "strength" is the longitudinal tensile strength. Metals: minimum yield strength of the product standard and the modulus of the matching design code. A stiffness comparison at equal section uses E; a like-for-like member comparison needs the deflection limit, because the FRP member is deflection-governed and the steel one usually strength-governed.</span>`)}
  ${h3("Deflection limits in common use")}
  ${table({ head: ["Limit", "Where it is used", "Note"], widths: ["18mm", "auto", "auto"], cls: "small", body: [
    ["L/180", "Industrial platforms and equipment supports where economy governs", "Lowest limit normally accepted for walking surfaces; IBC Table 1604.3 live-load limit for roof members not supporting a ceiling"],
    ["L/240", "Floors under dead plus live load; roofs with non-plaster ceilings", "IBC Table 1604.3: D + L limit for floor members, live-load limit for roof members with non-plaster ceilings"],
    ["L/250", "The span tables in Section 5", "Common serviceability limit for walkways; EN 1990 national annexes often use L/250 for floors"],
    ["L/360", "Floors under live load, public access, brittle finishes", "IBC Table 1604.3 live-load limit for floor members and for roof members supporting plaster; bridges often tighter, with a vibration check"],
    ["30 mm", "Guard rails to EN ISO 14122-3 under the test load", "Horizontal deflection at the hand rail, not a ratio"],
  ] })}
  ${p(`<span class="small">Limits are the project's to set; the ranking of sections does not change between them, but the deflection-governed values scale with the limit (shear-governed cells do not), so run the calculator with the exact limit when it differs from L/250.</span>`)}`);

page(`
  ${h2("Load effects, deflection and section formulas")}
  <div class="cols2">
  ${table({ head: ["Load case", "Maximum moment", "Bending deflection", "Shear coefficient c"], widths: ["auto", "20mm", "26mm", "16mm"], aligns: ["", "", "", "r"], cls: "small", body: BEAM_LOAD_CASES.map((c) => [esc(c.name), code(c.moment), code(c.deflection), c.c]) })}
  ${p(`Bending stress is M/W<sub>x</sub>; the average shear check is V/A<sub>v</sub>. Total deflection applies a load-case-matched Timoshenko correction:`)}
  <div class="formula">δ<sub>total</sub> = δ<sub>b</sub> · [1 + c·E·I<sub>x</sub> / (G·A<sub>v</sub>·L²)]</div>
  ${p(`For wet service both moduli are reduced by the stiffness factor before the deflection is calculated. Strength checks use the factored load; deflection stays a service-load calculation, so a load factor is never applied twice.`)}
  ${h3("Section properties")}
  ${p(`I-beams and channels: I<sub>x</sub> = [B·H³ − (B − t<sub>w</sub>)·(H − 2t<sub>f</sub>)³] / 12. Square and rectangular tubes: outer rectangle minus the concentric inner rectangle. Round tubes: I = π·(R<sub>o</sub>⁴ − R<sub>i</sub>⁴) / 4 and A = π·(R<sub>o</sub>² − R<sub>i</sub>²). Angles: two non-overlapping rectangles, centroid first, then the parallel-axis theorem; W<sub>x</sub> uses the farther extreme fiber from the calculated centroid. The shear area A<sub>v</sub> is the clear web for I-beams and channels, the two side walls between the flanges, 2·(H − 2t)·t, for box sections, half the annulus for round tubes and the loaded leg for angles. These are classical geometry identities; Section 4 tabulates them for every size.`)}
  </div>
  ${h3("Checking a member by hand")}
  ${ol([
    "Service moment M = wL²/8 (or the case above); bending stress σ = M / W<sub>x</sub>; compare γ·σ with the design bending strength of the chosen method.",
    "Service shear V = wL/2; average shear stress τ = V / A<sub>v</sub>; compare γ·τ with the design shear strength.",
    "Service deflection δ = 5wL⁴ / (384·E·I<sub>x</sub>) × [1 + 9.6·E·I<sub>x</sub> / (G·A<sub>v</sub>·L²)]; compare with L/n.",
    "The lowest of the three allowable loads governs; the worked example on the next page shows the arithmetic for one catalog section.",
  ], "small")}`);

page(`
  ${h2("Worked example: a walkway beam", `${EX.model} · ${EX.span / 1000} m simple span · uniform load`)}
  <div class="cols2">
  ${h3("Inputs")}
  ${kv([
    ["Section", `${esc(EX.model)} (H ${EX.h}, B ${EX.b}, t<sub>f</sub> = t<sub>w</sub> = ${EX.t} mm)`],
    ["A, I<sub>x</sub>, W<sub>x</sub>, A<sub>v</sub>", `${num(exA, 0)} mm², ${num(exIx / 1e4, 1)} cm⁴, ${num(exWx / 1e3, 1)} cm³, ${num(exAv, 0)} mm² ${tag("Calculated")}`],
    ["Material", `${esc(DESIGN_BASIS.material)}: E<sub>L</sub> ${DESIGN_BASIS.E_L_GPa} GPa, G<sub>LT</sub> ${DESIGN_BASIS.G_LT_GPa} GPa (assumed), F<sub>cL</sub> ${DESIGN_MATERIALS["frp-e23"].sigma_c} MPa (assumed, below the ${E23_ISO_PUBLISHED.compressive_l_mpa} MPa typical value of Section 2 because EN 13706 specifies no compressive strength and the typical value is not certified), shear ${DESIGN_BASIS.shearStrengthMPa} MPa`],
    ["Method", sym(esc(DESIGN_BASIS.method))],
    ["Environment", `${esc(DESIGN_BASIS.environment)}; stiffness factor 1.0`],
    ["Design strengths", `bending ${exResist.basis.phiFlex} × ${exResist.lambda} × ${DESIGN_MATERIALS["frp-e23"].sigma_c} × ${exResist.envStrength} = <strong>${num(exResist.bendingAllowable, 2)} MPa</strong>; shear ${exResist.basis.phiShear} × ${exResist.lambda} × ${DESIGN_BASIS.shearStrengthMPa} × ${exResist.envStrength} = <strong>${num(exResist.shearAllowable, 2)} MPa</strong>`],
    ["Serviceability", `L/${DEFL_N} = ${num(EX.span / DEFL_N, 0)} mm at service load`],
  ])}
  ${h3("Allowable service UDL, w (N/mm = kN/m)")}
  ${kv([
    ["Bending", `w<sub>b</sub> = 8·F<sub>b</sub>·W<sub>x</sub> / (γ<sub>Q</sub>·L²) = <strong>${num(ex_wb, 2)} kN/m</strong>`],
    ["Shear", `w<sub>v</sub> = 2·F<sub>v</sub>·A<sub>v</sub> / (γ<sub>Q</sub>·L) = <strong>${num(ex_wv, 2)} kN/m</strong>`],
    ["Shear correction", `k = 1 + 9.6·E·I<sub>x</sub> / (G·A<sub>v</sub>·L²) = <strong>${num(ex_k, 3)}</strong>`],
    ["Deflection", `w<sub>d</sub> = 384·E·I<sub>x</sub> / (5·${DEFL_N}·L³·k) = <strong>${num(ex_wd, 2)} kN/m</strong>`],
    ["Governing", `<strong>${num(ex_w, 2)} kN/m</strong>, ${exCell.governs} governs (Section 5 table: ${num(exCell.w, 1)} kN/m, "${exCell.governs[0]}")`],
  ])}
  </div>
  ${p(`At ${num(ex_w, 2)} kN/m the beam uses ${num((ex_w / ex_wb) * 100, 0)} percent of its bending capacity and ${num((ex_w / ex_wv) * 100, 0)} percent of its shear capacity, which is the normal picture for pultruded FRP: the deflection limit, not strength, sets the load. Shear deformation adds ${num((ex_k - 1) * 100, 0)} percent to the bending deflection at this span-to-depth ratio of ${num(EX.span / EX.h, 0)}.`)}
  ${h3("The same section in steel")}
  ${p(`For a like-for-like stiffness comparison, a steel member needs only E<sub>FRP</sub>/E<sub>steel</sub> = ${DESIGN_BASIS.E_L_GPa}/${DESIGN_MATERIALS["steel-s355"].E} ≈ ${num(DESIGN_BASIS.E_L_GPa / DESIGN_MATERIALS["steel-s355"].E, 2)} of the second moment of area to deflect the same amount, so the FRP replacement for a steel beam is usually deeper. Its mass is not: at the nominal area this ${esc(EX.model)} is ${num(exA * E23_ISO_PUBLISHED.density_g_cm3 / 1000, 1)} kg/m in FRP (${E23_ISO_PUBLISHED.density_g_cm3} g/cm³; catalog mass ${mass(products.find((pr) => pr.model === EX.model).weight)} kg/m) against ${num(exA * DESIGN_MATERIALS["steel-s355"].density / 1000, 1)} kg/m in steel (${DESIGN_MATERIALS["steel-s355"].density} g/cm³).`)}
  ${note(`The FRP profile calculator on the website reproduces this example and accepts another section, span, load type, code, environment and deflection limit. Its validation page recomputes published benchmarks from the same engine on every site build.`)}`);

const COLPAGE = page(`
  ${h2("Compression members", "Global buckling with shear correction, local plate buckling, crushing")}
  <div class="cols2">
  ${p(`Pultruded columns fail by one of three mechanisms, and all three are plate or column mechanics rather than code coefficients:`)}
  ${ul([
    `<strong>Global flexural buckling</strong> about each axis, Euler with the Engesser shear correction: P = P<sub>E</sub> / (1 + P<sub>E</sub> / (G·A<sub>v</sub>)), P<sub>E</sub> = π²·E<sub>L</sub>·I / (K·L)². The correction is worth a few percent on stocky members.`,
    `<strong>Local buckling</strong> of each wall as a long orthotropic plate with simply supported junctions (a lower bound): flange outstand with one free edge, b = B/2, σ = G<sub>LT</sub>·(t/b)²; web or tube wall held on both edges, b = H − t (the widest wall for a tube), σ = (π²/6)·(t/b)²·[√(E<sub>L</sub>·E<sub>T</sub>) + ν<sub>LT</sub>·E<sub>T</sub> + 2·G<sub>LT</sub>], with ν<sub>LT</sub> = 0.3 unless measured.`,
    `<strong>Crushing</strong>: F<sub>cL</sub> · A.`,
  ])}
  ${p(`Every mode takes the bending resistance factor of the chosen method (and λ on the ASCE path). ASCE/SEI 74-23 is understood to allow higher factors for buckling, but they were not confirmed against the published text, so the lower factor is used as the conservative choice. Flexural-torsional buckling of open sections, local–global interaction, eccentric load and creep are flagged, not calculated: channels and angles as columns need a separate check.`)}
  ${h3("Effective length factors K")}
  ${table({ head: ["End conditions", "K"], widths: ["auto", "14mm"], aligns: ["", "r"], cls: "small", body: END_CONDITIONS.map((e) => [esc(e.label), num(e.K, 2)]) })}
  ${p(`<span class="small">Recommended design values for ideal end conditions, AISC 360 Commentary Table C-A-7.1. Keep KL/r below 200.</span>`)}
  </div>
  ${h3(`Example: ${EX.model} as a ${colInput.lengthMm / 1000} m pinned column, indoor, occupancy live load`)}
  ${table({ head: ["Mode", "Critical stress (MPa)", "Nominal capacity (kN)", "Design capacity (kN)"], widths: ["auto", "30mm", "30mm", "30mm"], aligns: ["", "r", "r", "r"], cls: "small", body: col.modes.map((m) => [`${esc(m.label)}${m.mode === col.governing.mode ? ` ${tag("governs")}` : ""}`, num(m.stressMPa, 1), num(m.nominalKn, 1), num(m.designKn, 1)]) })}
  ${p(`<span class="small">Slenderness KL/r: ${num(col.slenderness.x, 0)} about x, ${num(col.slenderness.y, 0)} about y. Resistance factor ${num(col.resistanceFactor, 2)}, λ ${num(col.lambda, 1)}; the design capacity is the nominal capacity × ${num(col.resistanceFactor * col.lambda, 2)}. The weak-axis Euler load of ${num(col.modes.find((m) => m.mode === "global-y").nominalKn, 0)} kN is the hand-calculation check: π² × ${DESIGN_BASIS.E_L_GPa} GPa × ${num(col.props.Iy / 1e4, 0)} cm⁴ / (3 m)² corrected for shear. Bracing the weak axis at mid-height raises that mode to about ${num(weakKn(colBraced[2]), 0)} kN nominal (just under four times, because the shear correction grows with the Euler load) and it still governs (${esc(colBraced[2].governing.label.toLowerCase())}); at third points it reaches about ${num(weakKn(colBraced[3]), 0)} kN, close to the local-buckling values of the walls (web ${num(col.modes.find((m) => m.mode === "local-web").nominalKn, 0)} kN, flange ${num(col.modes.find((m) => m.mode === "local-flange").nominalKn, 0)} kN), which set the limit of any more closely braced wide-flange FRP column.</span>`)}`);

page(`
  ${h2("Connections and thermal movement")}
  <div class="cols2">
  ${h3("Bolted connections")}
  ${p(`Bearing at the hole is the usual limit. EN 13706 E23 guarantees a pin-bearing strength of ${E23_MIN.pin_bearing_l_mpa} MPa along the profile and ${E23_MIN.pin_bearing_t_mpa} MPa across it (${esc(PROPERTY_ROWS.find((r) => r.key === "pin_bearing_l_mpa").method)}). The design bearing stress takes the connection resistance factor of the project code (ASCE/SEI 74-23 Chapter 8, lower than the flexural φ used for members, with λ and the environment factor; CEN/TS 19101 its own γ<sub>M</sub>), which is why this manual tabulates no bolt capacities. Detail with:`)}
  ${ul([
    "Edge and end distance at least 3d for through-bolts and 4d for blind fasteners (F1 detailing minimums from the connection design guide, stricter than typical code minimums; confirm the end and side distances of the project code); hole clearance as for steel, never slotted in the bearing direction.",
    "Flat washers under head and nut, large enough to spread the clamping force over the laminate, and snug-tight torque: an over-torqued bolt crushes the laminate through the thickness and the joint loses its preload.",
    "Load along the profile wherever the detail allows; a transverse bearing load has less than half the capacity.",
    "Stainless-steel (A2/A4) or FRP fasteners. Where carbon-steel hardware is unavoidable, isolate it with sleeves and washers and keep water out of the joint: \"FRP corrosion\" at a joint is normally an unprotected steel fastener rusting in trapped moisture or a galvanic couple between dissimilar metals; the laminate itself is an insulator.",
    "Net-section tension, shear-out and block-shear checks to ASCE/SEI 74-23 Chapter 8 or CEN/TS 19101 for the governing case; this manual does not tabulate bolt-group capacities.",
  ])}
  ${h3("Bonded and hybrid joints")}
  ${p(`Adhesive joints spread load over an area instead of a hole and suit fatigue-loaded and sealed details; mostly static joints do not need them. Use a structural adhesive qualified for the resin system, abrade and solvent-clean the faying surfaces, control the bond-line thickness and allow full cure before loading. Hybrid (bonded plus bolted) joints hold the parts during cure and give a second load path.`)}
  </div>
  ${h3("Thermal movement")}
  <div class="cols2">
  ${p(`Free movement ΔL = α·L·ΔT; fully restrained axial stress σ = E·α·ΔT. Lengthwise, pultruded GFRP moves about as much as glass or concrete and less than steel or aluminum, so an FRP member fixed to a steel or aluminum frame moves relative to it; crosswise the coefficient is several times higher because the resin controls it. Declare the value measured for the supplied profile when the specification needs it.`)}
  ${p(`<span class="small">Example: a ${supplyTerms.standardLengthM} m FRP rail installed at 20 °C and reaching 50 °C grows ${num(thMove(thermal("gfrp-pultruded-longitudinal"), TH.dTh), 1)} mm; the same rail in aluminum grows ${num(thMove(thermal("aluminium"), TH.dTh), 1)} mm. Allow for the difference at every fixing to a dissimilar frame, and size sealant joints for the full annual range with the sealant's movement class.</span>`)}
  </div>
  ${table({ head: ["Material", "α (10⁻⁶/K)", "E (GPa)", `Movement, ${supplyTerms.standardLengthM} m, ±${TH.dTh} K`, "Source"], widths: ["auto", "16mm", "14mm", "26mm", "auto"], aligns: ["", "r", "r", "r", ""], cls: "small", body: THERMAL_MATERIALS.filter((m) => !["pvc-u"].includes(m.id)).map((m) => [esc(m.label), num(m.alpha, 0), num(m.E, 0), `±${num(thMove(m, TH.dTh), 1)} mm`, `<span class="small">${esc(m.source)}</span>`]) })}
  ${p(`<span class="small">The EPTA comparison value of 11 × 10⁻⁶/K in Section 2 lies at the top of the lengthwise range manufacturer manuals give for E-glass pultrusions and would make the ${supplyTerms.standardLengthM} m example ${num(11e-6 * TH.L * TH.dTh, 1)} mm; the website tools and this table use 8 × 10⁻⁶/K. Use the value declared for the supplied profile when the specification needs it.</span>`)}`);

// ───────────────────────────────────────────────────────────────────────────
// 04 · Section tables
// ───────────────────────────────────────────────────────────────────────────
const SECTION_COLS = {
  i_beam: { dims: [["H", "d"], ["B", "b"], ["t", "t"]], drawing: { shape: "i_beam", dims: { H: 200, B: 100, tf: 10, tw: 10 } } },
  channel: { dims: [["H", "d"], ["B", "b"], ["t", "t"]], drawing: { shape: "channel", dims: { H: 200, B: 60, tf: 8, tw: 8 } } },
  angle: { dims: [["a", "d"], ["b", "b"], ["t", "t"]], drawing: { shape: "angle", dims: { a: 100, b: 100, t: 10 } } },
  shs: { dims: [["D", "d"], ["t", "t"]], drawing: { shape: "shs", dims: { D: 100, t: 8 } } },
  rhs: { dims: [["H", "d"], ["B", "b"], ["t", "t"]], drawing: { shape: "rhs", dims: { H: 120, B: 60, t: 5 } } },
  tube: { dims: [["OD", "d"], ["t", "t"]], drawing: { shape: "tube", dims: { OD: 100, t: 6 } } },
  rod: { dims: [["D", "d"]], drawing: { shape: "rod", dims: { D: 25 } } },
  flat: { dims: [["W", "d"], ["T", "t"]], drawing: { shape: "flat", dims: { H: 100, B: 10 } } },
};
function sectionTable(shape) {
  const cfg = SECTION_COLS[shape];
  const list = byShape(shape);
  const symmetric = shape === "tube" || shape === "rod";
  const head = ["Designation", ...cfg.dims.map(([s]) => `${s} (mm)`), "Mass (kg/m)", "A (mm²)", "I<sub>x</sub> (cm⁴)", "W<sub>x</sub> (cm³)", "r<sub>x</sub> (mm)", ...(symmetric ? [] : ["I<sub>y</sub> (cm⁴)", "W<sub>y</sub> (cm³)", "r<sub>y</sub> (mm)"]), "DXF"];
  const aligns = ["", ...head.slice(1).map(() => "r")];
  const body = list.map((r) => [
    esc(r.model), ...cfg.dims.map(([, k]) => num(r[k], 2)), mass(r.mass), sig4(r.A), sig4(r.Ix), sig4(r.Wx), sig4(r.rx),
    ...(symmetric ? [] : [sig4(r.Iy), sig4(r.Wy), sig4(r.ry)]), r.dxf ? "●" : "",
  ]);
  return table({ head, body, aligns, cls: "spec small" });
}
const sectionIntro = {
  i_beam: `Equal-flange I-beams and wide flanges. I<sub>x</sub> is about the horizontal axis through the web, the normal spanning direction. The wide-flange ${esc(byShape("i_beam").at(-1).model)} is the imperial 12 × 12 in section.`,
  channel: `U-profiles, web vertical. I<sub>x</sub> is about the axis parallel to the flanges (web spanning), the way a stringer or a cable-tray rail is loaded; I<sub>y</sub> is about the axis through the web and back-to-back pairs double it. Single channels loaded away from the shear center twist: brace or pair them.`,
  angle: `Equal-leg angles. I<sub>x</sub> is about the centroidal axis parallel to a leg, for preliminary sizing only: a single angle bends about its principal axes, which lie at 45°, so a span check needs the principal-axis properties and a restraint check. Angles are not in the span tables for that reason.`,
  shs: `Square hollow sections. Side D, wall t; I<sub>x</sub> = I<sub>y</sub>. The closed section gives the torsional stiffness that frames, posts and trusses need.`,
  rhs: `Rectangular hollow sections, H deep and B wide; I<sub>x</sub> is about the axis parallel to B (depth spanning). The span tables use the deep orientation.`,
  tube: `Circular hollow sections, outside diameter and wall. I and W are the same about every axis. The dimensions define a structural section, not a pressure rating.`,
  rod: `Solid round rods. Unidirectional rovings give the highest longitudinal properties of the range; bending capacity is modest. Smooth rods are not concrete reinforcement: GFRP rebar is a separate, bar-specific product.`,
  flat: `Flat bars, W wide and T thick. I<sub>x</sub> is the edgewise (strong) value about the axis parallel to T; I<sub>y</sub> is flatwise. Used as stiffeners, splice and kick plates, wear strips and spacers.`,
};
openSection("04", "Section tables",
  `All ${rows.length} catalog sizes with the published mass per meter and the section properties of the nominal, sharp-cornered section, computed by the same engine as the per-size datasheets and the span tables. Masses are F1-published values, never computed from the area; areas and second moments are geometric derivations. Each size has a datasheet at ${SITE.replace("https://", "")}/datasheets/‹designation›, and a DXF drawing where marked.`,
  `
  <div class="cols2">
  ${h3("Conventions")}
  ${ul([
    `<strong>Axes.</strong> x–x is the horizontal centroidal axis in the drawing, y–y the vertical one; I<sub>x</sub> is the second moment of area about x–x, W<sub>x</sub> = I<sub>x</sub>/c with c the farther extreme fiber, r<sub>x</sub> = √(I<sub>x</sub>/A).`,
    `<strong>Units.</strong> Dimensions in mm, A in mm², I in cm⁴ (1 cm⁴ = 10⁴ mm⁴), W in cm³ (1 cm³ = 10³ mm³), r in mm. Four significant figures, as on the datasheets.`,
    `<strong>Mass.</strong> The catalog value in kg/m, with its own precision; it includes the surface veil and the as-pultruded corners, so it is not exactly A × density.`,
    `<strong>Thickness.</strong> Catalog I-beams and channels have equal flange and web thickness t; tubes a uniform wall t.`,
    `<strong>Inch sizes.</strong> ${esc(byShape("angle").filter((r) => r.model.includes("152")).length ? "Sizes such as 76×38×6.4, 152×152×12.7 and 305×305×12.7 are the imperial 3, 6 and 12 in sections; the website unit converter matches an inch size to the nearest catalog size." : "")}`,
  ])}
  ${h3("Tolerances and drawings")}
  ${p(`The properties are nominal. Production tolerances to ASTM D3917 (or the EN 13706-2 or GB/T 31539 class on the drawing) change thin-wall properties by a few percent; confirm them on the production datasheet before a final capacity is accepted. DXF drawings (●) are the nominal outline for CAD; STEP models are supplied on request.`)}
  </div>
  ${fig(nextFig(), "I-beams", sectionDrawing("i_beam", SECTION_COLS.i_beam.drawing.dims, { maxMm: 44 }) + `<div class="fig-text">${sectionIntro.i_beam}</div>`, "")}
  ${sectionTable("i_beam")}`);

for (const shape of ["channel", "angle"]) {
  page(`${h2(PROFILE_FAMILIES[shape].label === "Angle" ? "Angles" : "Channels", `${byShape(shape).length} sizes`)}
    ${fig(nextFig(), PROFILE_FAMILIES[shape].label === "Angle" ? "Equal-leg angles" : "Channels", sectionDrawing(shape, SECTION_COLS[shape].drawing.dims, { maxMm: 44 }) + `<div class="fig-text">${sectionIntro[shape]}</div>`)}
    ${sectionTable(shape)}`);
}
page(`${h2("Square and rectangular tubes", `${byShape("shs").length} square + ${byShape("rhs").length} rectangular sizes`)}
  <div class="figs2">
  ${fig(nextFig(), "Square hollow section", sectionDrawing("shs", SECTION_COLS.shs.drawing.dims, { maxMm: 36 }) + `<div class="fig-text">${sectionIntro.shs}</div>`)}
  ${fig(nextFig(), "Rectangular hollow section", sectionDrawing("rhs", SECTION_COLS.rhs.drawing.dims, { maxMm: 36 }) + `<div class="fig-text">${sectionIntro.rhs}</div>`)}
  </div>
  ${sectionTable("shs")}
  <div style="height:3mm"></div>
  ${sectionTable("rhs")}`);
page(`${h2("Round tubes", `${byShape("tube").length} sizes`)}
  ${fig(nextFig(), "Circular hollow section", sectionDrawing("tube", SECTION_COLS.tube.drawing.dims, { maxMm: 40 }) + `<div class="fig-text">${sectionIntro.tube}</div>`)}
  ${sectionTable("tube")}
  ${p(`<span class="small">Approximate inch sizes: Ø25 ≈ 1 in, Ø38 ≈ 1½ in, Ø50 ≈ 2 in, Ø63.5 = 2½ in, Ø76 ≈ 3 in, Ø89 ≈ 3½ in, Ø114 ≈ 4½ in, Ø127 = 5 in outside diameter. Inch figures are references, not separate inch tooling or tolerances.</span>`)}`);
page(`${h2("Solid rods", `${byShape("rod").length} sizes`)}
  ${fig(nextFig(), "Solid rod", sectionDrawing("rod", SECTION_COLS.rod.drawing.dims, { maxMm: 30 }) + `<div class="fig-text">${sectionIntro.rod}</div>`)}
  ${sectionTable("rod")}
  ${p(`<span class="small">Rods are also supplied as agriculture and horticulture stakes with agreed cut length, surface and end treatment; GFRP rebar for concrete is a separate, bar-specific product qualified to its own product standards (ASTM D7957, CSA S807, ISO 10406-1 test methods) and designed to ACI CODE-440.11 or CSA S806.</span>`)}`);
page(`${h2("Flat bars", `${byShape("flat").length} sizes`)}
  ${fig(nextFig(), "Flat bar", sectionDrawing("flat", SECTION_COLS.flat.drawing.dims, { maxMm: 36 }) + `<div class="fig-text">${sectionIntro.flat}</div>`)}
  ${sectionTable("flat")}
  ${p(`<span class="small">Flat bars are held to ±0.25 mm on thickness and ±0.5 mm on width. Thicker plate and sheet (fiberglass sheets and plates) are a separate product with their own size list.</span>`)}`);

// ───────────────────────────────────────────────────────────────────────────
// 05 · Span tables
// ───────────────────────────────────────────────────────────────────────────
const fmtLoad = (w) => (w < 0.05 ? "—" : w < 1 ? w.toFixed(2) : w.toFixed(1));
const GOV = { deflection: "d", bending: "b", shear: "v" };
function spanTable(family) {
  const head = ["Section", "kg/m", "I<sub>x</sub> (cm⁴)", ...SPANS_MM.map((L) => `${(L / 1000).toFixed(1).replace(/\.0$/, "")} m`)];
  const body = family.rows.map((r) => [esc(r.model), mass(r.weightKgPerM), sig4(r.IxMm4 / 1e4), ...r.cells.map((c) => (c.w < 0.05 ? "—" : `${fmtLoad(c.w)}<sup>${GOV[c.governs]}</sup>`))]);
  return table({ head, body, aligns: ["", "r", "r", ...SPANS_MM.map(() => "r")], cls: "spec small span" });
}
openSection("05", "Allowable load tables",
  `Maximum uniformly distributed service load, in kN/m, for every published I-beam, channel, square, rectangular and round tube over simple spans of ${SPANS_MM[0] / 1000} to ${SPANS_MM.at(-1) / 1000} m, with the check that governs each value. The tables are the printed twin of the website span tables and are computed by the same code from the section data of Section 4 and the design basis of Section 3.`,
  `
  <div class="cols2">
  ${h3("Design basis of every value")}
  ${kv([
    ["Material", `${esc(DESIGN_BASIS.material)}: E<sub>L</sub> ${DESIGN_BASIS.E_L_GPa} GPa and shear strength ${DESIGN_BASIS.shearStrengthMPa} MPa (EN 13706 minimums), G<sub>LT</sub> ${DESIGN_BASIS.G_LT_GPa} GPa (assumed)`],
    ["Strength", `${sym(esc(DESIGN_BASIS.method))}; design bending strength ${num(exResist.bendingAllowable, 2)} MPa and shear ${num(exResist.shearAllowable, 2)} MPa after λ and the environment factor`],
    ["Environment", esc(DESIGN_BASIS.environment)],
    ["Load case", esc(DESIGN_BASIS.loadCase)],
    ["Deflection", esc(DESIGN_BASIS.deflectionLimit)],
  ])}
  ${h3("How to read a value")}
  ${p(`Find the section and read across to the span: the value is the largest uniformly distributed <em>service</em> load the member carries with every check passing. The superscript marks the governing check: <strong>d</strong> deflection, <strong>b</strong> bending, <strong>v</strong> shear; a dash means below practical loading. 1 kN/m ≈ 68.5 lb/ft; a 1.2 m wide walkway at 5 kPa live load puts 6 kN/m on its pair of stringers, 3 kN/m on each.`)}
  ${p(`Nearly every value is deflection-governed, the defining feature of fiberglass design. Shear governs only short, deep sections; bending rarely governs under L/250. For a different limit, a point load, a cantilever or another code, use the website calculator, which opens each row pre-loaded; for a member these tables cannot represent (angles, continuous spans, frames), send the case to engineering.`)}
  </div>
  ${note(`Not covered: local and lateral-torsional buckling, connections, concentrated loads, dynamic effects and long-term creep; review them to ASCE/SEI 74-23 or CEN/TS 19101. The values are a preliminary screen for comparing sections and preparing an inquiry, not a certified capacity.`)}
  ${h3(spanFamilies[0].title.replace(/^FRP /, "").replace(/^./, (c) => c.toUpperCase()))}
  ${p(`<span class="small">${esc(spanFamilies[0].intro)}</span>`)}
  ${spanTable(spanFamilies[0])}`);
for (const family of spanFamilies.slice(1)) {
  page(`${h2(family.title.replace(/^FRP /, "").replace(/^./, (c) => c.toUpperCase()), `${family.rows.length} sizes · service UDL in kN/m · d deflection, b bending, v shear`)}
    ${p(`<span class="small">${esc(family.intro)}</span>`)}
    ${spanTable(family)}
    ${family.id === "square-tube" ? p(`<span class="small">Rectangular tubes are tabulated in the deep orientation (H vertical). A tube used as a guardrail post is a cantilever under a horizontal load and is checked in Section 6, not here.</span>`) : ""}`);
}

// ───────────────────────────────────────────────────────────────────────────
// 06 · Applications and systems
// ───────────────────────────────────────────────────────────────────────────
const appsForMatrix = applicationPages.filter((a) => a.slug !== "agriculture-horticulture-stakes");
const matrixShapes = ["i_beam", "channel", "angle", "shs", "rhs", "tube", "rod", "flat"];
openSection("06", "Applications and systems",
  `Which profile family carries which job, the application guides published on the website in condensed form, and the handrail and ladder systems assembled from catalog sections with the load cases they are checked against. An application page writes "what profile, which resin, which standards"; the industries table below describes who buys and why.`,
  `
  ${h3("Selection matrix")}
  ${p(`<span class="small">A mark means the application guide recommends the family. Custom pultrusions (brackets, strut, tray sections, crossarm profiles) appear in most guides and are not shown.</span>`)}
  ${table({ head: ["Application", ...matrixShapes.map((s) => `<span class="vert">${esc(PROFILE_FAMILIES[s].label)}</span>`), "Resin the guide names first"], widths: ["48mm", ...matrixShapes.map(() => "9mm"), "auto"], aligns: ["", ...matrixShapes.map(() => "c"), ""], cls: "small matrix", body: appsForMatrix.map((a) => [esc(a.shortTitle), ...matrixShapes.map((s) => (a.recommendedProfiles.some((line) => FAMILY_WORDS[s].test(line)) ? "●" : "")), `<span class="small">${esc((a.resinSystem.match(/isophthalic polyester|vinyl ester|phenolic|polyurethane|fire-retardant|UV-stabili[sz]ed/i)?.[0] ?? "per exposure").replace(/^./, (c) => c.toUpperCase()))}</span>`]) })}
  {INDUSTRIES}`);

const appGuide = (a) => `
  <div class="app">
    <div class="app-head"><strong>${esc(a.shortTitle)}</strong><span class="small">${esc(a.environment)}</span></div>
    <div class="app-body">
      <div><span class="mono">Profiles</span>${ul(a.recommendedProfiles.map(esc), "tight")}</div>
      <div><span class="mono">Resin</span><p class="small">${esc(a.resinSystem)}</p>${a.standards.length ? `<span class="mono">Standards</span><p class="small">${a.standards.map(esc).join(" · ")}</p>` : ""}</div>
      <div><span class="mono">Design checks</span>${ul(a.designChecks.map((c) => `<strong>${esc(c.title)}.</strong> ${esc(c.body)}`), "tight small")}</div>
    </div>
  </div>`;
const guideApps = applicationPages.filter((a) => a.slug !== "agriculture-horticulture-stakes");
const industriesBlock = `
  <div class="cols2 top">
  ${h3("Industries served")}
  ${table({ head: ["Industry", "Typical scope"], widths: ["34mm", "auto"], cls: "small", body: industries.map((i) => [esc(i.title), esc(i.description)]) })}
  ${h3("Project references")}
  ${[factoryStaircase, chongqingRooftopPv, beamBridgeGuide].map((c) => `<div class="ref"><span class="mono">${esc(c.kind)}</span><strong>${esc(c.title)}</strong><span>${esc(c.text)}</span></div>`).join("")}
  ${p(`<span class="small">Each reference is documented on the website with project photographs or the design drawings; sizes, resins and connections are project-specific and are not transferable without design.</span>`)}
  </div>`;
// The opener carries the first two guides; three fit on a continuation page; the
// last page holds what remains with the industries and references.
pages[pages.length - 1].body = pages[pages.length - 1].body.replace("{INDUSTRIES}", industriesBlock);
const rfqTable = `${h3("What each guide asks for in an inquiry")}${table({ head: ["Application", "Inquiry inputs"], widths: ["40mm", "auto"], cls: "small", body: guideApps.map((a) => [esc(a.shortTitle), a.rfqInputs.map(esc).join(" · ")]) })}`;
for (let i = 0; i < guideApps.length; i += 2) {
  const pair = guideApps.slice(i, i + 2);
  const last = i + 2 >= guideApps.length;
  page(`${i === 0 ? h2("Application guides", "Condensed from the website guides; each names the profiles, resin, standards and checks that apply") : h2("Application guides, continued")}${pair.map(appGuide).join("")}${last ? rfqTable : ""}`);
}

const guardRows = GUARD_LOAD_CASES.filter((c) => !c.userEntry);
page(`
  ${h2("Handrail and guardrail systems", "Catalog assemblies in handrail-system tube sizes (wall thicknesses differ from Section 4); the post is a cantilever under the code load")}
  <div class="two-tables even">
  ${frpHandrailCatalogSystems.map((s) => `<div>${h3(s.name)}${p(`<span class="small">${esc(s.description)}</span>`)}${table({ head: ["Item", "Catalog value"], widths: ["38mm", "auto"], cls: "small", body: s.rows.map((r) => [esc(r.item), esc(r.nominalValue)]) })}${p(`<span class="small">${esc(s.releaseNote)}</span>`)}</div>`).join("")}
  </div>
  ${h3("How a post-and-rail system is checked")}
  ${p(`The post is a cantilever fixed at its base plate under the horizontal rail load; the top rail spans simply between posts, which is conservative for a continuous rail. The line load and the concentrated load are separate cases, as the codes apply them. The check compares the post bending stress at the base and the rail stress at mid-span with the design strengths of Section 3, reports the horizontal deflection at the hand rail and the anchor-bolt reactions, and gives the characteristic (unfactored) capacity beside the design capacity so that a test load can be compared with it. The load cases are on the next page.`)}
  ${note(`<strong>Verify the post, not just the rail.</strong> Screening the square system's 50 × 50 × 6.4 mm tube as the post at 1,067 mm under the OSHA 200 lb load with the ASCE factors gives a utilization above 100 percent, so a project relies on a whole-assembly load test or a project-specific post and base design, which F1 prepares with the handrail load calculator on the website. The installed rail height comes from the rule, not from the catalog maximum: the catalog's 1,220 mm exceeds the 1,143 mm (45 in) OSHA maximum, so a US system is built lower. Under the downward 200 lb load the OSHA rail must stay at or above 991 mm; EN ISO 14122-3 limits the horizontal deflection to 30 mm under 300 N/m × post spacing.`)}`);

page(`
  ${h2("Guardrail load cases", "The rules the handrail systems are checked against")}
  ${table({ head: ["Region", "Rule", "Clause", "Line load (kN/m)", "Concentrated (kN)", "Rail height (mm)"], widths: ["12mm", "auto", "auto", "20mm", "24mm", "24mm"], aligns: ["", "", "", "r", "r", "r"], cls: "xs", body: guardRows.map((c) => [esc(c.region), esc(c.label), `<span class="small">${esc(c.clause)}</span>`, c.lineKnPerM ? num(c.lineKnPerM, 2) : "—", c.pointKn != null ? num(c.pointKn, 2) : c.pointPerSpacingKnPerM ? `${num(c.pointPerSpacingKnPerM, 2)} × spacing` : "per clause", c.heightMinMm ? `${num(c.heightMinMm, 0)}${c.heightMaxMm ? `–${num(c.heightMaxMm, 0)}` : " min"}` : "per clause"]) })}
  ${h3("Notes by rule")}
  ${table({ head: ["Rule", "Note (the first of each rule; the website tool lists all)"], widths: ["44mm", "auto"], cls: "xs", body: guardRows.filter((c) => c.notes.length).map((c) => [esc(c.label), esc(c.notes[0])]) })}
  ${p(`<span class="small">The US and EN ISO 14122-3 rows were checked against the rule text or secondary sources that agree; the UK, Canadian and Australian rows were checked against secondary sources only and say so on the website tool. Verify against the current edition before a compliance statement. Each region also offers a "manual entry" case on the website for categories not listed here.</span>`)}`);

page(`
  ${h2("Fixed ladders and access geometry")}
  <div class="cols2">
  ${h3("Catalog fixed ladder")}
  ${table({ head: ["Item", "Catalog value"], widths: ["44mm", "auto"], cls: "small", body: frpFixedLadderCatalogSpecs.map((r) => [esc(r.item), esc(r.nominalValue)]) })}
  ${h3("Cage layout references")}
  ${table({ head: ["Item", "Catalog value"], widths: ["44mm", "auto"], cls: "small", body: frpLadderCageLayoutReferences.map((r) => [esc(r.item), esc(r.nominalValue)]) })}
  </div>
  ${note(`<strong>Check the clear width on the drawing.</strong> The catalog lists an outside width of 500 mm rail to rail with 50.8 mm rails, which leaves about 398 mm clear, below the 406 mm (16 in) of OSHA 1910.23 and the 400 mm of EN ISO 14122-4. Confirm which dimension the 500 mm controls before release; if it is the outside width, the ladder is widened for the project. In the United States a new fixed ladder over 24 ft (7.3 m) needs a ladder safety or personal fall-arrest system; a cage alone no longer satisfies OSHA.`)}
  ${h3("Access rules the geometry is checked against")}
  ${table({ head: ["Element", "United States", "Europe and United Kingdom", "Australia"], cls: "small", widths: ["26mm", "auto", "auto", "auto"], body: [
    ["Fixed ladders", "OSHA 1910.23 and 1910.28(b)(9)", "EN ISO 14122-4:2016", "AS 1657:2018: rungs 250–300 mm, 375–525 mm between stiles, 200 mm behind rungs"],
    ["Stairs", "OSHA 1910.25 standard and ship stairs; IBC 2024 §1011", "EN ISO 14122-3:2016", "AS 1657: 20–45°, risers 130–225 mm, goings 215–355 mm, 2R + G 540–700 mm, ≤ 18 risers per flight"],
    ["Walkways and platforms", "ASCE 7-22 Table 4.3-1 loads; OSHA 1910 Subpart D", "EN ISO 14122-2:2016", "AS 1657: headroom ≥ 2,000 mm; AS/NZS 1170.1 loads"],
    ["Guard rails", "OSHA 1910.29; IBC 2024 §1607.9.1", "EN ISO 14122-3: 1,100 mm, 300 N/m × spacing, 30 mm", "AS 1657: 900–1,100 mm; 0.35 kN/m or 0.6 kN"],
  ] })}
  ${p(`<span class="small">The Australian and some European values were checked against secondary sources only; verify them against the current edition before a compliance statement. Canadian provincial ladder rules differ by province. The website access-geometry checker applies these rules to a proposed layout.</span>`)}`);

// ───────────────────────────────────────────────────────────────────────────
// 07 · Durability
// ───────────────────────────────────────────────────────────────────────────
openSection("07", "Durability: chemical, fire, weathering and temperature",
  `Durability belongs to the cured laminate in its exposure, not to fiberglass as a category. This section says how F1 states each property, what evidence exists today, and what a specification has to ask for. No universal service life or maintenance interval applies to the catalog: design life depends on the material system, loads, exposure, connections and the inspection plan agreed for the project.`,
  `
  ${h3("Chemical resistance")}
  <div class="cols2">
  ${p(`Build the compatibility decision around the chemical, its concentration, the temperature and the contact mode (immersion, splash or vapor). Resin-family charts are useful for screening; the exact cured laminate determines the offered performance, so F1 confirms compatibility for the proposed application rather than publishing a blanket table. The matrix sets the resistance: isophthalic polyester for general atmospheric and mild chemical service, vinyl ester for acids, chlorides, caustics, immersion and marine splash, with a surface veil in either case, because the barrier is the veil-plus-resin skin rather than the structural core.`)}
  ${p(`<strong>Four examples that show the role of resin and temperature.</strong> From a published supplier comparison of isophthalic polyester and vinyl ester laminates at 20 °C and 50 °C (${esc(performanceSources.nhcChemical.label)}) ${tag("Reference")}. Duration, stress and the exact laminate are not stated in the source; the rows are not a project approval.`)}
  </div>
  ${table({ head: ["Chemical", "Isophthalic polyester, 20 °C", "Isophthalic polyester, 50 °C", "Vinyl ester, 20 °C", "Vinyl ester, 50 °C"], widths: ["auto", "30mm", "30mm", "30mm", "30mm"], aligns: ["", "c", "c", "c", "c"], cls: "small", body: chemicalExamples.map((c) => [esc(c.chemical), ...[c.iso20, c.iso50, c.ve20, c.ve50].map((v) => ({ "+": "<strong>+</strong> resistant", "0": "0 limited", "−": "− not resistant" })[v])]) })}
  ${p(`<span class="small">+ resistant, 0 limited resistance (check with the supplier), − not resistant. Methyl ethyl ketone attacks both matrices: solvents are a separate screening question.</span>`)}
  ${h3("What a chemical specification states")}
  ${table({ head: ["Property", "What to agree", "Methods"], widths: ["40mm", "auto", "44mm"], cls: "small", body: perfRows("chemical").rows.map((r) => [esc(r.property), `<span class="small">${esc(r.conditions)}</span>`, esc(r.methods)]) })}
  ${p(`<span class="small"><strong>Takeaway.</strong> ${esc(perfRows("chemical").takeaway)} A 2,000 h third-party immersion program (sulfuric acid, sodium hydroxide, chlorine; ASTM D543 and ISO 175 methodology) on vinyl ester and isophthalic polyester profiles is being commissioned; ask whether its results bear on a current project.</span>`)}`);

page(`
  ${h2("Fire and smoke")}
  ${table({ head: ["Formulation", "Fire behavior F1 states for it"], widths: ["24mm", "auto"], cls: "small", body: resinRows.map((f) => [`<strong>${esc(f.code)}</strong>`, esc(f.fire_rating ?? "—")]) })}
  <div class="cols2">
  ${p(`Fire performance belongs to the resin formulation, its thickness, finish and installation, never to the E23 grade or to fiberglass in general. Standard isophthalic polyester is <strong>not</strong> fire-retardant. Fire-retardant polyester and vinyl ester carry halogen or alumina-trihydrate packages that reach ASTM E84 Class A (Class 1, flame-spread index 25 or less) in building applications; phenolic is inherently low in flame spread, smoke and toxicity (reaction to fire, not fire resistance in minutes) and is the choice for rail interiors, tunnels and offshore. In every case the classification comes from the test report of the exact formulation quoted, per profile where the standard requires it.`)}
  </div>
  ${h3("Classifications are not interchangeable")}
  ${table({ head: ["Test or class", "What it measures", "What it does not establish"], widths: ["40mm", "auto", "auto"], cls: "small", body: [
    ["UL 94 (V-0, V-1, HB)", "Small-flame burning of a plastic specimen at a stated thickness", "Building-product fire performance; a result at 10 mm does not cover a 3 mm wall"],
    ["ASTM E84 (Class A/B/C)", "Flame-spread and smoke-developed indices in the 25 ft tunnel; Class A ≤ 25 / ≤ 450", "Fire resistance; a flame-spread index without the smoke index and mounting details is incomplete"],
    ["EN 13501-1 (A1 to F, s, d)", "Reaction to fire of a construction product in its end-use condition, with smoke and droplet classes", "A UL 94 or E84 result; each European class needs its own classification report"],
    ["EN 45545-2 (HL1–HL3)", "Rolling-stock requirement sets by hazard level and product listing", "Building classifications; rail projects need the listed tests for the part"],
    ["GB 8624", "Chinese reaction-to-fire classes (2012 edition current; 2025 edition from 1 January 2027)", "European or North American classes"],
    ["EN 13501-2, ASTM E119", "Load-bearing fire resistance (minutes of integrity, insulation and load) of an element", "Nothing above; F1 makes no fire-resistance claim for catalog profiles"],
  ] })}
  <div class="cols2 top">
  ${h3("Evidence on file")}
  ${p(`<strong>${esc(ul94.issuer)} ${esc(ul94.reference)}</strong> (${esc(ul94.issued)}): ${esc(ul94.detail)} ${esc(ul94.scope.replace("the separate Wuxi frame report", "the separate Wuxi frame report (CPVT 2025DACS20319, on the website evidence page)"))} ${tag("Test report")}`)}
  ${p(`Flame-spread reports for fire-retardant grades are issued per profile on request. A third-party program on phenolic and fire-retardant polyester variants (EN 45545-2 hazard levels and ASTM E84 with smoke density and toxicity) is being commissioned; its reports will be added to the website evidence index.`)}
  ${h3("Specifying fire")}
  ${ul([
    "Name the market classification and the end-use condition (wall thickness, finish, orientation, substrate), not just \"fire retardant\".",
    "Ask for the test report of the quoted formulation, with the laboratory, specimen and date, and check that it covers the supplied thickness.",
    "State smoke and toxicity requirements separately; optical smoke density does not quantify toxicity.",
    "Treat fire resistance (minutes) as a separate structural question with its own evidence.",
  ], "small")}
  </div>`);

page(`
  ${h2("Weathering, temperature, moisture and electrical insulation")}
  <div class="cols2">
  ${h3("UV and outdoor exposure")}
  ${p(`The resin at the surface, not the glass, degrades under UV: unprotected laminates chalk and expose fiber ("fiber bloom"), which is cosmetic first and structural only after years of neglect. Outdoor configurations use a UV-stabilized resin, a surface veil and, where the project needs color retention, a compatible coating. Appearance retention and structural retention are separate acceptance criteria: ask for exposure cycle, hours and retained flexural properties (ISO 4892-3, ASTM G154 or GB/T 2573) for the offered surface system. A 5,000 h ASTM G154 Cycle 1 program on polyester, vinyl ester and UV-stabilized systems is being commissioned to publish original data; until it is, no weathering rating is claimed for the catalog.`)}
  ${h3("Temperature")}
  ${p(`Glass-transition temperature, heat-deflection temperature and continuous service temperature are different quantities. Stiffness falls as the matrix approaches its T<sub>g</sub>; the ASCE screening path limits service temperature to T<sub>g</sub> − 22 °C, and the environment factor for 32 to 60 °C service is 0.7 on strength. Typical heat-deflection and T<sub>g</sub> ranges by resin are in the resin table of Section 2; they are supplier ranges, not F1 measurements. Specify the continuous and peak temperatures, their duration, moisture and sustained load together, and ask for the measured T<sub>g</sub> (ISO 11357-2 or ASTM E1640) of the formulation. For service below −20 °C ask for low-temperature impact and flexural data of the formulation; none is published for the catalog laminate.`)}
  ${h3("Moisture")}
  ${p(`Water absorption of the standard laminate is ${E23_ISO_PUBLISHED.water_abs_pct} percent at 24 h (EN ISO 62) ${tag("Typical")}. Wet or immersed service takes the 0.75 strength and 0.90 stiffness factors of Section 3 for a polyester matrix; vinyl ester resists hydrolysis better. Seal cut ends and drilled holes so that water does not wick along the rovings. A 28-day boiling-water program (ASTM D570, extended) is being commissioned for water-treatment and marina specifiers.`)}
  </div>
  <div class="cols2 top">
  ${h3("Electrical insulation")}
  ${p(`Glass-fiber profiles are selected for electrical insulation; carbon reinforcement or conductive additives change that. Dielectric strength is a laboratory result at a stated thickness and conditioning, not an operating-voltage rating: equipment design must account for creepage, clearance, moisture, contamination, joints and the applicable equipment standard. Request the volume and surface resistivity (IEC 62631-3-1/-3-2 or ASTM D257), dielectric strength (ASTM D149 or IEC 60243-1) and, for crossarms and switchgear, tracking (ASTM D2303, IEC 60112) for the exact laminate, with the test direction stated.`)}
  ${h3("Service life and maintenance")}
  ${p(`${esc(commercialFacts.serviceLife)} ${esc(commercialFacts.corrosion)} What FRP removes is the recoating cycle of steel and the galvanic couple of aluminum; what remains is periodic cleaning, an annual inspection of fixings, joints and cut edges (Section 8), and replacement of any damaged member. The website life-cycle cost calculator compares that against galvanized or painted steel as present values, and reports the cases where steel is cheaper.`)}
  </div>`);

// ───────────────────────────────────────────────────────────────────────────
// 08 · Fabrication, installation, maintenance
// ───────────────────────────────────────────────────────────────────────────
openSection("08", "Fabrication, installation and maintenance",
  `Pultruded profiles are cut, drilled and bolted with ordinary tools and no hot work, which is why a four-person crew assembled the factory staircase in Section 6 without welding or a crane. Dust control, edge sealing and fastener practice decide the quality of the result.`,
  `
  ${h3("Cutting and drilling")}
  ${table({ head: ["Operation", "Tool", "Practice"], widths: ["26mm", "58mm", "auto"], cls: "small", body: [
    ["Straight cuts", "Circular saw with a carbide-tipped or diamond (continuous-rim) blade", "Support both sides of the cut; feed steadily; a fine-tooth blade leaves the cleanest edge. Coolant is not required."],
    ["Curves and notches", "Jigsaw or band saw, carbide or diamond-grit blade", "Drill a relief hole at inside corners; do not notch the tension flange of a beam."],
    ["Holes", "Carbide-tipped or diamond-coated drill bits; hole saws for large diameters", "Back the exit face to avoid breakout; no countersinking in load-bearing holes. HSS bits work but dull quickly."],
    ["Finishing", "Abrasive paper or a flap disc", "Chamfer cut edges lightly; do not grind through the veil elsewhere."],
    ["Dust", "Extraction at the tool; FFP3 (EU) or N95 (US) respirator, goggles, gloves, long sleeves", "Cured FRP dust is a mechanical irritant to skin, eyes and airways. Wash before eating."],
  ] })}
  <div class="cols2">
  ${h3("Seal every cut")}
  ${p(`A cut end or a drilled hole exposes glass that would otherwise be behind the veil. Coat cut ends, holes and notches with a compatible resin or a two-part sealant before assembly, especially outdoors, in wet service and in chemical exposure. Cut-face sealing is part of the machining scope in the quotation when F1 cuts to length.`)}
  </div>
  <div class="cols2 top">
  ${h3("Fasteners")}
  ${ul([
    "Stainless-steel A2 (304) or A4 (316) bolts for most service; A4 in marine and chemical plants; FRP studs and nuts where a non-conductive or non-magnetic joint is required.",
    "Large flat washers under head and nut; snug-tight torque. Preload beyond snug-tight crushes the laminate and is lost by creep.",
    "Edge distances of Section 3 (3d through-bolted, 4d blind); holes drilled, not punched.",
    "Isolate carbon-steel hardware with sleeves and washers; never let a steel bolt bear directly on FRP in wet service.",
  ], "small")}
  ${h3("Storage and handling")}
  ${ul([
    `Store flat on level dunnage at 1 m centers or closer for thin sections, in the original packaging, out of direct sun where possible; a ${supplyTerms.standardLengthM} m I-beam sags over two supports.`,
    "Lift bundles with slings, not chains or hooks; a profile weighs about a quarter of steel, so manual handling is easy, but cut ends are sharp: wear gloves.",
    "Protect edges from impact; a chipped flange edge is a crack initiator and is repaired with resin before installation.",
    "Keep profiles dry before bonding; abrade and solvent-clean bonding surfaces.",
  ], "small")}
  </div>
  ${note(`<strong>Before work starts.</strong> Confirm that the design has been accepted by the engineer of record and the authority having jurisdiction, brace the structure before releasing the crane or props, follow the power-tool manuals, and use the gloves, eye protection and respirator the task needs.`)}`);

page(`
  ${h2("Installation, safety data, cleaning and inspection")}
  <div class="cols2">
  ${h3("Bolt-up sequence for a platform or stair")}
  ${ol([
    "Set out and anchor the base plates; check level and the anchor edge distances in the concrete.",
    "Erect columns and primary beams loose-bolted; plumb and square, then brace before releasing the crane or props.",
    "Add secondary beams, stair stringers and landings; drill on site only through members that are drawn for it.",
    "Fit grating, treads and kick plates; grating clips at every bearing, not only at the corners.",
    "Install posts, rails and splices; check rail height and post spacing against the code case in Section 6.",
    "Tighten all bolts to snug-tight, seal exposed cut edges, remove swarf and dust, and record the inspection.",
  ], "small")}
  ${h3("Annual inspection")}
  ${ul([
    "Bolted connections: tightness, washer condition, corrosion of steel hardware, cracking around holes.",
    "Adhesive joints: bond-line cracks, debonding at the edges, discoloration.",
    "Cut edges, holes and notches: sealing intact, no fiber bloom or wicking.",
    "Surfaces: chalking, fiber bloom, impact damage, wear-through of anti-slip grit on treads and grating.",
    "Members: deflection under the normal load compared with the first inspection; local crushing at bearings; cracks at re-entrant corners.",
    "Record findings with photographs and repair before the next season: seal exposed fiber with resin, replace damaged members, retorque to snug-tight.",
  ], "small")}
  ${h3("Repairs")}
  ${p(`<span class="small">Surface damage that has not cut rovings is abraded, cleaned and recoated with a compatible resin or gel coat. Damage that cuts rovings in a load-bearing member is a structural repair: replace the member or splice it to an engineer's detail. Keep a record of repairs with the inspection file.</span>`)}
  </div>
  ${h3("Safety data summary")}
  ${p(`<span class="small">General statements for a cured glass-fiber thermoset laminate; the safety data sheet of the supplied formulation governs and is sent with the order on request.</span>`)}
  ${table({ head: ["Item", "Information"], widths: ["30mm", "auto"], cls: "xs", body: [
    ["Product", "Glass-fiber reinforced thermoset profile (isophthalic polyester standard; other matrices as ordered). Common names: GRP, FRP, fiberglass."],
    ["Normal handling", "Not hazardous; the cured laminate is inert and does not release monomer."],
    ["Cutting and grinding", "Dust may irritate eyes, skin and the respiratory tract. Use extraction and the PPE above; wash exposed skin with soap and water."],
    ["Fire", "Combustible; burning resin releases dense smoke and irritant gases. Use water spray, foam or dry powder; firefighters wear breathing apparatus."],
    ["First aid", "Eyes: rinse with clean water for at least 10 minutes, lids held open; seek attention if irritation persists. Skin: wash; moisturize. Inhalation of dust or fumes: fresh air; medical attention for decomposition fumes. Ingestion: rinse the mouth, do not induce vomiting."],
    ["Disposal", "Inert, non-leaching solid; dispose of off-cuts and dust as construction waste under local rules."],
  ] })}
  ${h3("Cleaning")}
  ${p(`<span class="small">Ordinary dirt leaves with a stiff brush and warm water with a mild alkaline detergent, followed by rinsing; use a water-based degreaser at the maker's dilution for traffic film or grease. A pressure washer may be used up to about 100 bar (1,500 psi) with the nozzle kept well clear of the surface and moving; closer or hotter jets erode the veil. Clean more often in high-traffic and food areas and on anti-slip surfaces, whose grit holds dirt.</span>`)}
  ${table({ head: ["Do", "Do not"], cls: "xs", body: [
    ["Clean before first use and remove spills of oil, grease, food and chemicals promptly", "Exceed the cleaner's recommended concentration or mix cleaning chemicals"],
    ["Use brushes rather than mops; rinse thoroughly", "Use solvent or strong-acid cleaners: they attack the resin surface"],
    ["Remove mold at first appearance with warm soapy water", "Use abrasive pads or wire brushes on textured or coated surfaces"],
    ["Clear snow and ice with a plastic shovel or broom", "Use metal tools, which score the finish and expose fiber"],
    ["Refer chemical spills to the resistance review in Section 7; dilute and rinse", "Flood electrical interfaces or bolted joints with high-pressure water"],
  ] })}`);

// ───────────────────────────────────────────────────────────────────────────
// 09 · Ordering and documents
// ───────────────────────────────────────────────────────────────────────────
const profileEvidence = engineeringEvidence.filter((e) => e.file !== MANUAL.file && ["/products/fiberglass-structural-shapes", "/products/fiberglass-structural-shapes/frp-square-tube", "/products/custom-pultruded-profiles"].includes(e.product));
const resultsByFile = new Map(reportedResults.map((r) => [r.file, r]));
openSection("09", "Ordering, documents and contact",
  `What a quotation needs, what F1 confirms in it, the documents that exist today for the profile range and how to reach the engineering team. ${esc(commercialFacts.response)}`,
  `
  <div class="cols2">
  ${h3("What to send with an inquiry")}
  ${ul([
    "Section designation or drawing, with the dimensional tolerance class or the agreed limits.",
    "Cut length and number of pieces, end cuts, holes and machining; whether F1 seals cut faces.",
    "Service environment: chemicals and concentrations, temperature range, UV, immersion or splash, fire requirement and market.",
    "Resin system, color and finish; or the exposure, and F1 proposes them.",
    "Load case and design code, or the span, loads and support conditions for a checked section.",
    "Required documents: mill certificate, inspection plan, test reports, STEP or DXF, submittal package.",
    "Delivery country and postcode, target date, sample requirement, Incoterm.",
  ], "small")}
  ${h3("Comparing quotations")}
  ${table({ head: ["Topic", "Compare on the same basis"], widths: ["32mm", "auto"], cls: "small", body: quotationChecklist.map((q) => [esc(q.topic), esc(q.requirement)]) })}
  </div>
  <div class="cols2 top">
  ${h3("Dimensional acceptance fields on the drawing")}
  ${table({ head: ["Feature", "Agree"], widths: ["40mm", "auto"], cls: "small", body: perfRows("dimensions").rows.map((r) => [esc(r.property), `<span class="small">${esc(r.conditions)}</span>`]) })}
  ${p(`<span class="small"><strong>Takeaway.</strong> ${esc(perfRows("dimensions").takeaway)}</span>`)}
  </div>`);

page(`
  ${h2("Documents for the profile range")}
  ${h3("Published on the website evidence page")}
  ${table({ head: ["Document", "Issuer and reference", "Tested or described", "Result or scope", "Date"], widths: ["40mm", "34mm", "auto", "auto", "20mm"], cls: "small", body: [
    ...profileEvidence.map((e) => { const r = resultsByFile.get(e.file); return [esc(e.title), esc(e.reference), r ? esc(r.tested) : esc(e.productLabel), r ? esc(r.result) : `<span class="small">${esc(e.scope)}</span>`, r ? `${esc(r.dateLabel)} ${esc(r.date)}` : "—"]; }),
    [esc(ul94.indexTitle), esc(`${ul94.issuer} ${ul94.reference}`), esc(ul94.tested), esc(ul94.result), `Issued ${esc(ul94.issued)}`],
    ...(epd ? [[esc(epd.title), "CABR Certification Center", "Pultruded GFRP composite profile products, 1 m² functional unit", "Cradle-to-gate 33,934 g CO₂e/m²; cradle-to-grave 36,099 g CO₂e/m² (GB/T 24025, ISO 14067, PAS 2050)", "Issued 2025-04-30"]] : []),
  ] })}
  <div class="cols2 top">
  ${h3("On request, with holder, number and scope")}
  ${ul(["ISO 9001 quality-management certificate of the manufacturing entity.", "CE declaration of performance where the product and intended use have an assessment route.", "Fire test reports for fire-retardant and phenolic formulations, per profile.", "Chemical-resistance data of the resin supplier for the quoted system.", "Batch mill certificates and inspection records as agreed before production.", "STEP models, project submittal packages and third-country compliance dossiers."], "small")}
  </div>
  ${h3("Engineering tools on the website")}
  ${table({ head: ["Tool", "Address"], widths: ["auto", "74mm"], cls: "small", body: [
    ["Profile finder (filter the catalog, compare four sizes)", `${SITE.replace("https://", "")}/tools/profile-finder`],
    ["Profile calculator (bending, shear, deflection; any code)", `${SITE.replace("https://", "")}/frp-profile-calculator`],
    ["Span tables (this manual's Section 5, live)", `${SITE.replace("https://", "")}/frp-span-tables`],
    ["Column buckling", `${SITE.replace("https://", "")}/tools/frp-column-calculator`],
    ["Handrail load check", `${SITE.replace("https://", "")}/tools/handrail-load-calculator`],
    ["Access geometry checker (ladders, stairs, walkways)", `${SITE.replace("https://", "")}/tools/access-geometry-checker`],
    ["Thermal expansion, unit converter, cut-list optimizer, life-cycle cost", `${SITE.replace("https://", "")}/tools`],
    ["Datasheet and DXF of every size", `${SITE.replace("https://", "")}/datasheets`],
    ["Evidence index (all reports and certificates)", `${SITE.replace("https://", "")}/resources/evidence`],
  ] })}`);

// Back cover ────────────────────────────────────────────────────────────────
page(`
  <div class="back">
    <div class="back-top">
      <div class="wordmark">F1 COMPOSITE</div>
      <p class="back-tag">Pultruded FRP profiles, engineered and documented.</p>
    </div>
    <div class="back-grid">
      <div><span class="mono">Sales and engineering</span><strong>${esc(company.contact.salesName)}</strong><span>${esc(company.contact.email)}</span><span>${esc(company.contact.phone)} · WhatsApp</span><span>${esc(company.contact.languages.join(" · "))}</span></div>
      <div><span class="mono">Address</span><strong>${esc(company.legalName)}</strong><span>${esc(company.address.streetAddress)}</span><span>${esc(company.address.addressRegion)}, ${esc(company.address.addressLocality)} ${esc(company.address.postalCode)}, China</span></div>
      <div><span class="mono">Online</span><strong>${SITE.replace("https://", "")}</strong><span>${SITE.replace("https://", "")}/contact</span><span>${SITE.replace("https://", "")}/resources/evidence</span><span>youtube.com/@F1Composites</span></div>
    </div>
    <div class="back-foot">
      <p class="small">${esc(companyStatements.relationship)}</p>
      <p class="small">Specifications may change without notice as the catalog and its evidence are revised; the website carries the current data and the revision of this document. The tables are preliminary-sizing aids, not a project approval or a batch certificate. ${esc(companyStatements.disambiguation)}</p>
      <p class="mono">© 2026 ${esc(company.legalName)} · ${esc(MANUAL.code)} · Rev. ${esc(MANUAL.revision)} · ${esc(MANUAL.issued)}</p>
    </div>
  </div>`, { bare: true, cls: "backcover" });

// Fill the contents page and the column-page reference ─────────────────────
pages[TOC_INDEX].body = `
  ${h2("Contents")}
  <div class="toc">${toc.map((t) => `<div class="toc-row"><span class="toc-num">${t.number}</span><span class="toc-title">${esc(t.title)}</span><span class="toc-dots"></span><span class="toc-page">${t.page}</span></div>`).join("")}</div>
  <div class="cols2 top">
  ${h3("Figures and tables")}
  ${ul([
    `Section 2: laminate build-up (Fig. 1), E23 laminate with EN minimums, SGS full-section reports, resin systems, reference values.`,
    `Section 3: codes by market, resistance factors, λ and environment factors, material inputs, load cases, worked beam and column examples, connections, thermal movement.`,
    `Section 4: dimensioned section drawings (Figs. 2 to ${figNo}) and properties of all ${rows.length} sizes.`,
    `Section 5: allowable uniform loads for ${spanFamilies.reduce((n, f) => n + f.rows.length, 0)} sections over ${SPANS_MM.length} spans.`,
    `Section 6: selection matrix, ${guideApps.length} application guides, handrail and ladder catalog data, access rules.`,
  ], "small")}
  ${h3("Finding a value on the website")}
  ${p(`<span class="small">Every size in Section 4 has a datasheet page with the same properties, a DXF and the laminate data; every row of Section 5 opens pre-loaded in the profile calculator; every report in Section 9 is downloadable from the evidence page. Where the website and this PDF differ, the website carries the later revision.</span>`)}
  </div>`;
for (const pg of pages) pg.body = pg.body.replace("{COLPAGE}", String(COLPAGE));

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
.tag { display: inline-block; font-family: "DM Mono", monospace; font-size: 5.9pt; letter-spacing: .05em; text-transform: uppercase; color: var(--teal-text); background: var(--teal-bg2); border-radius: 0.6mm; padding: 0 1.1mm; line-height: 1.7; vertical-align: 0.3mm; white-space: nowrap; }
h1, h2, h3 { margin: 0; text-wrap: balance; letter-spacing: -0.01em; }
h2 { font-size: 15pt; line-height: 1.15; font-weight: 700; color: var(--navy); margin: 0 0 3mm; }
h2 .sub { display: block; font-weight: 500; font-size: 8.6pt; color: var(--t3); margin-top: 1mm; letter-spacing: 0; }
h3 { font-size: 9.6pt; font-weight: 700; color: var(--t1); margin: 2.2mm 0 1.2mm; break-after: avoid; }
p { margin: 0 0 1.8mm; color: var(--t2); }
p strong, li strong { color: var(--t1); }
.small { font-size: 7.6pt; line-height: 1.4; }
sub, sup { font-size: 70%; line-height: 0; }
.cols2 { column-count: 2; column-gap: 7mm; column-fill: balance; }
.cols2.top { margin-top: 3mm; }
.cols2 h3:first-child { margin-top: 0; }
.list { margin: 0 0 1.8mm; padding-left: 3.6mm; color: var(--t2); }
.list li { margin: 0 0 1mm; padding-left: 0.4mm; }
.list.tight li { margin: 0 0 0.4mm; }
.steps { margin: 0 0 1.8mm; padding-left: 0; list-style: none; counter-reset: s; color: var(--t2); }
.steps li { counter-increment: s; position: relative; padding-left: 7mm; margin: 0 0 1.4mm; }
.steps li::before { content: counter(s, decimal-leading-zero); position: absolute; left: 0; top: 0.1mm; font-family: "DM Mono", monospace; font-size: 7pt; color: var(--teal-text); letter-spacing: .04em; }
.note { break-inside: avoid; border-left: 1mm solid var(--teal); background: var(--teal-bg); border-radius: 0 1.6mm 1.6mm 0; padding: 2.4mm 3.2mm; margin: 2.4mm 0; color: var(--t2); font-size: 8.4pt; }
.note strong { color: var(--t1); }
.formula { font-family: "DM Mono", monospace; font-size: 7.6pt; color: var(--t1); background: var(--bg2); border-radius: 1.6mm; padding: 1.8mm 3mm; margin: 1.6mm 0 2.2mm; white-space: nowrap; }
.t { width: 100%; border-collapse: collapse; margin: 0 0 2.6mm; break-inside: auto; }
.t th, .t td { text-align: left; vertical-align: top; padding: 1.25mm 1.8mm; border-bottom: 0.3pt solid var(--border); font-size: 8pt; line-height: 1.32; }
.t thead th { background: var(--bg2); color: var(--t1); font-weight: 600; font-size: 7.2pt; border-bottom: 0.5pt solid rgba(11,24,56,0.22); }
.t tbody th { font-weight: 600; color: var(--t1); }
.t td { color: var(--t2); }
.t .num, .t td.num, .t th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.t td.c, .t th.c { text-align: center; }
.t.small th, .t.small td { font-size: 7.3pt; padding: 1.05mm 1.6mm; }
.t.xs th, .t.xs td { font-size: 6.8pt; padding: 0.85mm 1.4mm; line-height: 1.28; }
.cols2 .t, .cols2 .note, .cols2 .fig { break-inside: avoid; }
.cols2 h3 { break-after: avoid; }
.t tr { break-inside: avoid; }
.nbsp { white-space: nowrap; }
.code { font-family: "DM Mono", monospace; font-size: 7.4pt; color: var(--t1); }
.two-tables.even { grid-template-columns: 1fr 1fr; }
.t.spec tbody th { white-space: nowrap; }
.t.spec td { font-variant-numeric: tabular-nums; }
.t.span td sup { color: var(--teal-text); font-size: 65%; margin-left: 0.2mm; }
.t.matrix th .vert { writing-mode: vertical-rl; transform: rotate(180deg); display: inline-block; font-size: 6.6pt; white-space: nowrap; }
.t.matrix td.c { color: var(--teal-text); font-size: 9pt; }
.kv { margin: 0 0 2mm; }
.kv div { display: grid; grid-template-columns: 34mm 1fr; gap: 3mm; padding: 1.1mm 0; border-bottom: 0.3pt solid var(--border); font-size: 8pt; }
.kv dt { color: var(--t3); font-weight: 600; }
.kv dd { margin: 0; color: var(--t2); }
.kv.two div { grid-template-columns: 28mm 1fr; }
.band { margin: -17mm -15mm 6mm; background: var(--navy); color: #fff; padding: 16mm 15mm 9mm; display: grid; grid-template-columns: 24mm 1fr; gap: 6mm; align-items: start; min-height: 54mm; }
.band-num { font-family: "DM Mono", monospace; font-size: 30pt; font-weight: 500; color: var(--lime); line-height: 1; letter-spacing: -0.02em; }
.band h1 { font-size: 21pt; font-weight: 700; line-height: 1.12; color: #fff; margin: 0 0 2.6mm; }
.band p { color: var(--teal-light); font-size: 9.2pt; line-height: 1.45; margin: 0; max-width: 150mm; }
.facts { display: grid; grid-template-columns: repeat(5, 1fr); gap: 3mm; margin: 3mm 0; }
.facts div, .cover-facts div { background: var(--bg2); border-radius: 2mm; padding: 2.6mm 3mm; }
.facts strong { display: block; font-size: 15pt; color: var(--navy); line-height: 1.1; letter-spacing: -0.01em; }
.facts span { display: block; font-size: 7.2pt; color: var(--t3); margin-top: 0.8mm; }
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; margin: 1mm 0 3mm; }
.card { display: grid; grid-template-columns: 15mm 1fr; gap: 2.4mm; border: 0.3pt solid var(--border); border-radius: 2.4mm; padding: 2.6mm 3mm; align-items: start; }
.card-title { font-weight: 700; color: var(--t1); font-size: 9pt; }
.card-text { color: var(--t2); font-size: 7.8pt; line-height: 1.35; margin: 0.6mm 0; }
.card-fact { margin-top: 0.4mm; }
.fig { margin: 1mm 0 3mm; break-inside: avoid; }
.fig figcaption { font-size: 7.6pt; color: var(--t2); margin-bottom: 1mm; }
.fig figcaption strong { color: var(--t1); margin-left: 1.4mm; }
.fig .cap { display: block; margin-top: 0.6mm; color: var(--t3); }
.fig .sec { float: left; margin: 0 5mm 1mm 0; }
.fig .fig-text { font-size: 8pt; color: var(--t2); line-height: 1.4; padding-top: 1mm; }
.fig::after { content: ""; display: block; clear: both; }
.figs2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.figs2 .fig .sec { float: none; display: block; margin: 0 0 1.4mm; }
.two-tables { display: grid; grid-template-columns: 1fr 1.25fr; gap: 5mm; align-items: start; }
.app { border: 0.3pt solid var(--border); border-radius: 2.4mm; padding: 3mm 3.4mm; margin: 0 0 3.2mm; break-inside: avoid; }
.app-head { display: grid; grid-template-columns: 50mm 1fr; gap: 4mm; align-items: baseline; border-bottom: 0.3pt solid var(--border); padding-bottom: 1.6mm; margin-bottom: 1.8mm; }
.app-head strong { font-size: 10.5pt; color: var(--navy); }
.app-head .small { color: var(--t2); }
.app-body { display: grid; grid-template-columns: 1fr 1fr 1.3fr; gap: 4mm; }
.app-body .mono { display: block; margin-bottom: 0.8mm; }
.app-body p { margin-bottom: 1.4mm; }
.app-body .list { padding-left: 3.2mm; font-size: 7.8pt; }
.ref { display: grid; grid-template-columns: 1fr; gap: 0.3mm; border-left: 0.6mm solid var(--teal-border); padding: 0.6mm 0 0.6mm 2.6mm; margin: 0 0 2mm; font-size: 7.8pt; color: var(--t2); }
.ref strong { color: var(--t1); }
.doc-control { margin-top: 3mm; border: 0.3pt solid var(--border); border-radius: 2.4mm; padding: 2.6mm 3.4mm 1mm; }
.toc { margin: 2mm 0 4mm; }
.toc-row { display: grid; grid-template-columns: 12mm 1fr auto 12mm; align-items: baseline; gap: 2mm; padding: 2.6mm 0; border-bottom: 0.3pt solid var(--border); font-size: 11pt; }
.toc-num { font-family: "DM Mono", monospace; color: var(--teal-text); font-size: 9pt; letter-spacing: .04em; }
.toc-title { font-weight: 600; color: var(--t1); }
.toc-dots { border-bottom: 0.3pt dotted rgba(11,24,56,0.35); min-width: 20mm; align-self: end; margin-bottom: 1mm; }
.toc-page { text-align: right; font-weight: 700; color: var(--navy); font-variant-numeric: tabular-nums; }
/* cover */
.page.cover { padding: 0; background: #fff; }
.cover-top { height: 128mm; padding: 16mm 18mm 0; position: relative; }
.cover .logo { height: 28mm; width: auto; display: block; margin-left: -4mm; }
.cover .wordmark, .back .wordmark { font-weight: 800; letter-spacing: .14em; color: var(--navy); font-size: 13pt; }
.cover-kicker { margin-top: 12mm; color: var(--teal-text); }
.cover-title { font-size: 40pt; font-weight: 700; line-height: 1.02; color: var(--navy); margin: 3mm 0 4mm; letter-spacing: -0.02em; }
.cover-sub { font-size: 12pt; color: var(--t2); margin: 0; }
.cover-bottom { height: 169mm; background: var(--navy); padding: 14mm 18mm 12mm; display: flex; flex-direction: column; justify-content: space-between; }
.cover-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm 6mm; }
.cover-cell { display: flex; flex-direction: column; align-items: flex-start; gap: 1.6mm; border-top: 0.4pt solid rgba(143,214,206,0.35); padding-top: 3mm; }
.cover-cell .mono { color: var(--teal-light); }
.cover-facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
.cover-facts div { background: rgba(255,255,255,0.06); border: 0.3pt solid rgba(143,214,206,0.3); }
.cover-facts strong { display: block; color: #fff; font-size: 16pt; line-height: 1.1; }
.cover-facts span { display: block; color: var(--teal-light); font-size: 7.4pt; margin-top: 1mm; }
.cover-meta { color: var(--teal-light); border-top: 0.4pt solid rgba(143,214,206,0.35); padding-top: 3mm; }
/* back cover */
.page.backcover { background: var(--navy); color: #fff; padding: 22mm 18mm 16mm; }
.back { height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
.back .wordmark { color: #fff; }
.back-tag { color: var(--teal-light); font-size: 14pt; margin: 6mm 0 0; font-weight: 500; max-width: 120mm; }
.back-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8mm; }
.back-grid div { display: grid; gap: 1mm; font-size: 8.8pt; color: var(--teal-light); border-top: 0.4pt solid rgba(143,214,206,0.35); padding-top: 3mm; }
.back-grid strong { color: #fff; font-size: 10pt; }
.back-grid .mono { color: var(--lime); margin-bottom: 1mm; }
.back-foot p { color: rgba(255,255,255,0.72); }
.back-foot .mono { color: var(--teal-light); margin-top: 4mm; }
`;

function renderPage(pg, index) {
  const n = index + 1;
  if (pg.bare) return `<section class="page ${pg.cls}" id="p${n}">${pg.body}</section>`;
  pg.body = nb(pg.body);
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
<meta name="description" content="${esc(MANUAL.subtitle)}: design basis, section properties of ${rows.length} catalog sizes, allowable load tables, applications, durability and fabrication guidance.">
<style>${css}</style>
<script>
window.addEventListener("load", () => {
  const over = [];
  document.querySelectorAll(".page").forEach((p, i) => { if (p.scrollHeight > p.clientHeight + 1) over.push((i + 1) + ":" + (p.scrollHeight - p.clientHeight)); });
  document.documentElement.setAttribute("data-overflow", over.join(","));
  document.documentElement.setAttribute("data-pages", String(document.querySelectorAll(".page").length));
});
</script>
</head><body>${pages.map(renderPage).join("\n")}</body></html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// Build
// ═══════════════════════════════════════════════════════════════════════════
function findChromium() {
  const candidates = [process.env.CHROMIUM_PATH, process.env.PLAYWRIGHT_BROWSERS_PATH && join(process.env.PLAYWRIGHT_BROWSERS_PATH, "chromium"), "/opt/pw-browsers/chromium"].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  for (const name of ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable"]) {
    try { return execFileSync("which", [name], { encoding: "utf8" }).trim(); } catch { /* next */ }
  }
  return null;
}

function chromium(args, timeout = 180_000) {
  const bin = findChromium();
  if (!bin) throw new Error("Chromium not found: set CHROMIUM_PATH or install chromium");
  return execFileSync(bin, ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--hide-scrollbars", "--virtual-time-budget=20000", ...args], { encoding: "utf8", timeout, maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
}

export function build({ htmlOnly = false, out = join(root, "public", MANUAL.file) } = {}) {
  const html = buildHtml();
  const workDir = join(tmpdir(), "f1-design-manual");
  mkdirSync(workDir, { recursive: true });
  const htmlPath = join(workDir, "design-manual.html");
  writeFileSync(htmlPath, html);
  const result = { htmlPath, pages: pages.length, pdfPath: null, pdfPages: null, overflow: null };
  if (htmlOnly) return result;
  // Layout check: every page must hold its content.
  const dom = chromium(["--dump-dom", `file://${htmlPath}`]);
  const overflow = dom.match(/data-overflow="([^"]*)"/)?.[1] ?? "unknown";
  result.overflow = overflow;
  if (overflow && !process.env.MANUAL_ALLOW_OVERFLOW) throw new Error(`Pages overflow (page:px): ${overflow}`);
  if (overflow) console.warn(`warning: pages overflow (page:px): ${overflow}`);
  mkdirSync(join(out, ".."), { recursive: true });
  chromium(["--no-pdf-header-footer", `--print-to-pdf=${out}`, `file://${htmlPath}`]);
  const pdf = readFileSync(out);
  result.pdfPath = out;
  result.pdfPages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  if (result.pdfPages !== pages.length) throw new Error(`PDF has ${result.pdfPages} pages, expected ${pages.length}`);
  result.bytes = statSync(out).size;
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const htmlOnly = process.argv.includes("--html-only");
  const outIndex = process.argv.indexOf("--out");
  const r = build({ htmlOnly, ...(outIndex > 0 ? { out: resolve(process.argv[outIndex + 1]) } : {}) });
  console.log(`${pages.length} pages · HTML ${r.htmlPath}${r.pdfPath ? ` · PDF ${r.pdfPath} (${(r.bytes / 1024).toFixed(0)} KB, ${r.pdfPages} pages)` : ""}`);
}
