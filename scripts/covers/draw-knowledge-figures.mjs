// node scripts/covers/draw-knowledge-figures.mjs
// Original schematics (1200x750 WebP) for the A069 keyword pages and articles:
//   products/siding-panels/fiberglass-siding-panel-profiles        panel profiles and a crown fixing
//   products/baffles/fiberglass-baffle-types-clarifier-contact-tank clarifier section and contact-tank plan
//   products/rtrc-conduit/rtrc-fiberglass-conduit-wall-types-joint  wall types, bell-and-spigot joint, elbow
//   blog/golden-hand-bridge-fiberglass-hand-layers                 steel frame, mesh, laminate, paint
//   blog/tower-bridge-frp-cantilever-sidewalk-section              FRP deck on stringers outside a truss
//   covers/blog/switchback-ramp-ada-plan                           worked 60 in rise switchback, ADA 405
//   covers/blog/ipe-alternatives-decking-comparison                Janka hardness bars (The Wood Database)
//   covers/blog/fiberglass-roof-deck-layers                        GRP laminate roof vs FRP roof panel
//   covers/blog/fiberglass-utility-pole-anatomy                    pole, crossarm, steps, no-drill zone, embedment
// Added for A071 (2026-11-25):
//   covers/blog/composite-utility-pole-cost-premium                published price premium over wood, by source
//   covers/blog/composite-retaining-wall-types                     FRP sheet pile wall vs composite sleeper wall
//   covers/blog/8-ft-fiberglass-tree-stake-depth                   8 ft stake, embedment and tie height
// No figure is an as-built or manufacturer drawing; proportions are illustrative.
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

const W = 1200, H = 750;
const TEAL = "#0f766e", TEAL_L = "#cfe8e4", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", AMBER = "#c2610c";
const STEEL = "#8a949b", STEEL_L = "#c7cdd1", WATER = "#d9ecf5", WATER_D = "#7fb3cf", WOOD = "#c99a5b", GROUND = "#e9e4da", CONC = "#d6d9dc";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" ${font} font-size="${o.size ?? 15}" font-weight="${o.weight ?? 400}" fill="${o.fill ?? INK}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}>${s}</text>`;
const leader = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.4"/><circle cx="${x2}" cy="${y2}" r="3" fill="${MUTED}"/>`;
const dim = (x1, y1, x2, y2, label, dx = 0, dy = -8) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="1.2" marker-start="url(#d)" marker-end="url(#d)"/>${t((x1 + x2) / 2 + dx, (y1 + y2) / 2 + dy, label, { size: 14, anchor: "middle" })}`;

function frame(heading, sub, body, footer) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><marker id="d" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0 0L8 4L0 8Z" fill="${INK}"/></marker>
  <marker id="a" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L8 4.5L0 9Z" fill="${AMBER}"/></marker></defs>
  <rect width="100%" height="100%" fill="#ffffff"/>
  ${t(60, 58, heading, { size: 20, weight: 600, fill: TEAL })}
  ${t(60, 88, sub, { size: 17, fill: MUTED })}
  ${body}
  <line x1="60" y1="696" x2="1140" y2="696" stroke="${LINE}"/>
  ${t(60, 724, footer, { size: 15, fill: MUTED })}
</svg>`;
}

// ── 1. Siding panel profiles ────────────────────────────────────────────────
function siding() {
  const wave = (x0, y0, w, amp, n) => { let d = `M${x0} ${y0}`; const step = w / n; for (let i = 0; i < n; i++) d += ` q${step / 4} ${-amp} ${step / 2} 0 t${step / 2} 0`; return d; };
  const rib = (x0, y0) => `M${x0} ${y0} h40 l14 -34 h26 l14 34 h70 l14 -34 h26 l14 34 h70 l14 -34 h26 l14 34 h40`;
  const rpanel = (x0, y0) => `M${x0} ${y0} h30 l10 -30 h18 l10 30 h40 l4 -6 h16 l4 6 h40 l4 -6 h16 l4 6 h40 l10 -30 h18 l10 30 h30`;
  const rows = [
    { y: 180, label: "Corrugated", path: wave(110, 180, 360, 28, 6) },
    { y: 300, label: "Box rib", path: rib(110, 300) },
    { y: 420, label: "R-panel", path: rpanel(110, 420) },
    { y: 520, label: "Flat sheet", path: `M110 520 h360` },
  ];
  const body = rows.map((r) => `<path d="${r.path}" fill="none" stroke="${TEAL}" stroke-width="5" stroke-linejoin="round"/>${t(500, r.y - 4, r.label, { size: 17, weight: 600 })}`).join("") +
    t(500, 200, "Common for agricultural and industrial walls", { size: 14, fill: MUTED }) +
    t(500, 320, "Matches many metal wall panels", { size: 14, fill: MUTED }) +
    t(500, 440, "Ribbed profile for longer girt spacing", { size: 14, fill: MUTED }) +
    t(500, 540, "Liners, partitions and cut parts", { size: 14, fill: MUTED }) +
    // fixing detail
    `<rect x="800" y="430" width="300" height="40" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="2"/>${t(950, 495, "girt", { anchor: "middle", fill: MUTED })}
     <path d="${wave(800, 410, 300, 40, 2)}" fill="none" stroke="${TEAL}" stroke-width="5"/>
     <line x1="875" y1="356" x2="875" y2="450" stroke="${INK}" stroke-width="5"/>
     <rect x="860" y="350" width="30" height="8" rx="3" fill="${INK}"/>
     <rect x="858" y="358" width="34" height="6" rx="2" fill="#4b5563"/>
     <circle cx="875" cy="371" r="11" fill="none" stroke="${AMBER}" stroke-width="2" stroke-dasharray="4 3"/>
     ${leader(905, 300, 887, 362)}${t(910, 296, "sealing washer on the crown", { size: 14 })}
     ${leader(800, 260, 868, 372)}${t(800, 252, "hole ≥ 1/16 in oversize for movement", { size: 14 })}
     ${t(950, 200, "Crown fixing", { size: 17, weight: 600, anchor: "middle" })}`;
  return frame("FIBERGLASS SIDING PANELS", "Profiles and a crown fixing on a girt", body, "Original schematic, not to scale. Profiles, weights and fire class are confirmed per order.");
}

// ── 2. Baffles ───────────────────────────────────────────────────────────────
function baffles() {
  const body = `
    ${t(70, 140, "Circular clarifier, section at the outer wall", { size: 17, weight: 600 })}
    <rect x="70" y="170" width="20" height="360" fill="${CONC}" stroke="${STEEL}"/>
    <rect x="90" y="215" width="430" height="315" fill="${WATER}"/>
    <line x1="90" y1="215" x2="520" y2="215" stroke="${WATER_D}" stroke-width="2"/>
    <rect x="70" y="530" width="470" height="18" fill="${CONC}"/>
    <path d="M90 300 L200 360" stroke="${TEAL}" stroke-width="7"/>
    ${leader(260, 410, 175, 346)}${t(265, 418, "density current baffle", { size: 14, weight: 600 })}${t(265, 436, "turns the wall current back into the tank", { size: 13, fill: MUTED })}
    <path d="M118 190 v60" stroke="${TEAL}" stroke-width="7"/>
    <path d="M90 228 h26" stroke="${STEEL}" stroke-width="4"/>
    ${leader(200, 165, 124, 196)}${t(205, 162, "scum baffle ahead of the weir", { size: 14, weight: 600 })}
    <path d="M440 480 C360 430 250 420 160 470" fill="none" stroke="${AMBER}" stroke-width="3" stroke-dasharray="8 5" marker-end="url(#a)"/>
    ${t(330, 505, "density current", { size: 13, fill: AMBER, anchor: "middle" })}

    ${t(640, 140, "Chlorine contact tank, plan", { size: 17, weight: 600 })}
    <rect x="640" y="170" width="480" height="360" fill="${WATER}" stroke="${CONC}" stroke-width="10"/>
    ${[740, 840, 940, 1040].map((x, i) => `<rect x="${x}" y="${i % 2 ? 230 : 170}" width="10" height="300" fill="${TEAL}"/>`).join("")}
    <path d="M660 200 V500 H790 V200 H890 V500 H990 V200 H1090 V500" fill="none" stroke="${AMBER}" stroke-width="3" stroke-dasharray="8 5" marker-end="url(#a)"/>
    ${t(650, 560, "inlet", { size: 13, fill: MUTED })}${t(1110, 560, "outlet", { size: 13, fill: MUTED, anchor: "end" })}
    ${leader(760, 600, 845, 520)}${t(640, 616, "FRP baffle walls force a serpentine path", { size: 14, weight: 600 })}
    ${t(640, 636, "EPA baffling factor about 0.7 (superior) vs 0.1 unbaffled", { size: 13, fill: MUTED })}`;
  return frame("FIBERGLASS BAFFLES", "Where FRP baffles go in water and wastewater treatment", body, "Original schematic, not to scale. Baffling factor from the US EPA disinfection profiling manual; a tracer study sets the site value.");
}

// ── 3. RTRC conduit ──────────────────────────────────────────────────────────
function rtrc() {
  const ring = (cx, cy, r, w, label, sub) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${TEAL}" stroke-width="${w}"/><circle cx="${cx}" cy="${cy}" r="${r - w / 2 - 2}" fill="#f3f6f7"/>${t(cx, cy + r + 34, label, { size: 15, weight: 600, anchor: "middle" })}${t(cx, cy + r + 54, sub, { size: 13, fill: MUTED, anchor: "middle" })}`;
  const body = `
    ${ring(170, 260, 70, 6, "Standard wall (AG)", "aboveground, UL 2515")}
    ${ring(370, 260, 70, 12, "Heavy / extra-heavy (XW)", "physical damage, UL 2515A")}
    ${ring(570, 260, 70, 4, "Belowground (BG)", "encased or buried, UL 2420")}
    ${t(170, 160, "same trade size, different wall", { size: 14, fill: MUTED })}
    <rect x="700" y="230" width="230" height="56" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="890" y="218" width="150" height="80" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="1040" y="230" width="70" height="56" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="3"/>
    <line x1="930" y1="222" x2="930" y2="294" stroke="${AMBER}" stroke-width="3" stroke-dasharray="5 4"/>
    ${leader(990, 180, 960, 222)}${t(995, 176, "bell", { size: 14, weight: 600 })}
    ${leader(800, 180, 820, 230)}${t(720, 176, "spigot", { size: 14, weight: 600 })}
    ${leader(860, 350, 928, 290)}${t(720, 370, "adhesive or gasket seal", { size: 14 })}
    ${t(900, 140, "Bell-and-spigot joint", { size: 17, weight: 600, anchor: "middle" })}
    <path d="M720 560 h160 a120 120 0 0 0 120 -120 v-30" fill="none" stroke="${TEAL}" stroke-width="40" stroke-opacity="0.25"/>
    <path d="M720 560 h160 a120 120 0 0 0 120 -120 v-30" fill="none" stroke="${TEAL}" stroke-width="3"/>
    ${t(860, 610, "factory elbow", { size: 15, weight: 600, anchor: "middle" })}
    ${t(170, 520, "NEC Article 355 · NEMA TC 14", { size: 16, weight: 600 })}
    ${t(170, 546, "Trade sizes ½–6 in, IPS or ID series", { size: 14, fill: MUTED })}
    ${t(170, 568, "Default ambient limit 50 °C unless listed higher", { size: 14, fill: MUTED })}`;
  return frame("RTRC FIBERGLASS CONDUIT", "Wall types, joint and elbow", body, "Original schematic, not to scale. Listings and sizes are confirmed for the offered product.");
}

// ── 4. Golden hand layers ───────────────────────────────────────────────────
function goldenHand() {
  const body = `
    <rect x="120" y="560" width="960" height="28" fill="${GROUND}"/>
    <rect x="150" y="300" width="760" height="22" fill="${WOOD}" stroke="#8d6a3b"/>
    <path d="M150 296 h760" stroke="#d4a017" stroke-width="4"/>
    ${t(530, 286, "deck", { size: 14, fill: MUTED, anchor: "middle" })}
    ${[280, 560, 840].map((x) => `<rect x="${x - 10}" y="322" width="20" height="238" fill="${STEEL}"/>`).join("")}
    ${leader(860, 470, 842, 450)}${t(866, 478, "steel pier carries the bridge", { size: 14, weight: 600 })}
    <path d="M430 560 C410 470 420 380 470 330 L480 250 C484 230 506 232 506 252 L506 330 L520 220 C524 198 548 200 548 222 L544 330 L566 236 C572 214 596 220 590 242 L572 340 C600 300 640 300 640 330 C620 380 600 430 600 470 C600 520 590 545 590 560 Z" fill="#cfd3cf" stroke="${INK}" stroke-width="2"/>
    <path d="M444 548 C428 470 438 392 482 344" fill="none" stroke="${STEEL}" stroke-width="6"/>
    <path d="M454 548 C438 470 448 392 492 344" fill="none" stroke="${STEEL}" stroke-width="2" stroke-dasharray="4 4"/>
    <path d="M466 546 C450 470 460 396 502 350" fill="none" stroke="${TEAL}" stroke-width="7"/>
    <path d="M476 546 C460 472 470 400 510 356" fill="none" stroke="#9aa39a" stroke-width="5"/>
    ${leader(260, 420, 445, 470)}${t(120, 400, "1 steel frame", { size: 14, weight: 600 })}
    ${leader(260, 460, 455, 500)}${t(120, 450, "2 wire mesh", { size: 14, weight: 600 })}
    ${leader(260, 500, 462, 530)}${t(120, 500, "3 fiberglass laminate", { size: 14, weight: 600 })}
    ${leader(660, 240, 520, 330)}${t(666, 226, "4 stone-effect paint: cracks and moss", { size: 14, weight: 600 })}
    ${t(666, 246, "the hand is a shell around the structure", { size: 13, fill: MUTED })}`;
  return frame("HOW A FIBERGLASS HAND IS BUILT", "Typical fiberglass-over-steel sculpture beside a steel-pier walkway", body, "Original editorial schematic of the general method, not an as-built drawing of the Golden Bridge.");
}

// ── 5. Tower Bridge cantilever sidewalk ─────────────────────────────────────
function towerBridge() {
  const body = `
    <rect x="150" y="150" width="28" height="420" fill="#c9a227" stroke="#8a6d10"/>
    ${t(164, 140, "truss chord and posts", { size: 13, fill: MUTED, anchor: "middle" })}
    <path d="M178 470 L1000 470 L1000 492 L260 560 L178 560 Z" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="2"/>
    ${leader(330, 620, 360, 540)}${t(200, 640, "steel cantilever bracket from the truss", { size: 14, weight: 600 })}
    ${[420, 620, 820].map((x) => `<rect x="${x - 14}" y="430" width="28" height="40" fill="${STEEL}"/>`).join("")}
    ${leader(940, 560, 834, 456)}${t(870, 580, "steel stringers", { size: 14, weight: 600 })}
    <rect x="330" y="380" width="620" height="50" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="3"/>
    ${[360, 460, 560, 660, 760, 860].map((x) => `<path d="M${x} 428 L${x + 22} 384 L${x + 62} 384 L${x + 84} 428" fill="none" stroke="${TEAL}" stroke-width="2"/>`).join("")}
    <rect x="330" y="371" width="620" height="9" fill="#7c7f84"/>
    <rect x="950" y="336" width="26" height="94" fill="${CONC}" stroke="${STEEL}"/>
    <path d="M963 336 v-90 M930 260 h66" stroke="${INK}" stroke-width="3"/>
    ${leader(520, 300, 560, 372)}${t(400, 290, "polymer concrete overlay", { size: 14, weight: 600 })}
    ${leader(760, 300, 700, 405)}${t(700, 290, "FRP deck, trapezoidal tube core", { size: 14, weight: 600 })}
    ${t(1000, 300, "curb and", { size: 13, fill: MUTED })}${t(1000, 318, "rail", { size: 13, fill: MUTED })}
    ${dim(330, 350, 950, 350, "", 0, 0)}${t(640, 342, "widened sidewalk on the lift span", { size: 13, anchor: "middle" })}
    ${t(600, 660, "FRP deck about 13 psf vs 42 psf for 5 in lightweight concrete (Caltrans)", { size: 14, fill: MUTED, anchor: "middle" })}`;
  return frame("FRP CANTILEVER SIDEWALK", "Schematic section of a lightweight sidewalk on a weight-limited lift span", body, "Original editorial schematic. Proportions are illustrative; it is not the Caltrans construction drawing.");
}

// ── 6. Switchback ramp plan (60 in rise) ────────────────────────────────────
function switchback() {
  // scale: 1 in = 1.9 px along the run (480 in -> 912 px), width 88 in -> 167 px
  const s = 1.9, x0 = 130, y0 = 230, L = 480 * s, run = 36 * s, gap = 8 * s;
  const yA = y0, yB = y0 + run + gap;
  const body = `
    <rect x="${x0}" y="${yA}" width="${60 * s}" height="${run}" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="${x0}" y="${yB}" width="${60 * s}" height="${run}" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
    ${t(x0 + 57, yA + run / 2 + 5, "top landing", { size: 13, anchor: "middle" })}
    ${t(x0 + 57, yB + run / 2 + 5, "bottom landing", { size: 13, anchor: "middle" })}
    <rect x="${x0 + 60 * s}" y="${yA}" width="${360 * s}" height="${run}" fill="#f1f5f6" stroke="${INK}" stroke-width="2"/>
    <rect x="${x0 + 60 * s}" y="${yB}" width="${360 * s}" height="${run}" fill="#f1f5f6" stroke="${INK}" stroke-width="2"/>
    <line x1="${x0 + 90 * s}" y1="${yB + run / 2}" x2="${x0 + 390 * s}" y2="${yB + run / 2}" stroke="${AMBER}" stroke-width="3" marker-end="url(#a)"/>
    <line x1="${x0 + 390 * s}" y1="${yA + run / 2}" x2="${x0 + 90 * s}" y2="${yA + run / 2}" stroke="${AMBER}" stroke-width="3" marker-end="url(#a)"/>
    ${t(x0 + 240 * s, yB + run / 2 - 8, "run 2 ↑ 30 in rise, 1:12", { size: 13, anchor: "middle" })}
    ${t(x0 + 240 * s, yB + run / 2 + 20, "", {})}
    ${t(x0 + 240 * s, yA + run / 2 - 8, "run 1 ↑ 30 in rise, 1:12", { size: 13, anchor: "middle" })}
    <rect x="${x0 + 420 * s}" y="${yA}" width="${60 * s}" height="${2 * run + gap}" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
    ${t(x0 + 450 * s, yA + run + gap / 2 - 6, "turning", { size: 13, anchor: "middle" })}${t(x0 + 450 * s, yA + run + gap / 2 + 12, "landing", { size: 13, anchor: "middle" })}
    <path d="M${x0 + 60 * s} ${yA + run + gap / 2} H${x0 + 420 * s}" stroke="${INK}" stroke-width="4"/>
    <path d="M${x0 + 420 * s} ${yA + run + gap / 2} h1" stroke="${INK}" stroke-width="4"/>
    ${leader(x0 + 300 * s, yB + run + 70, x0 + 300 * s, yA + run + gap / 2 + 2)}${t(x0 + 300 * s - 150, yB + run + 90, "inside handrail continuous around the turn (505.3)", { size: 13 })}
    ${dim(x0, yA - 30, x0 + L, yA - 30, "480 in (40 ft) overall")}
    ${dim(x0 + 60 * s, yA - 70, x0 + 420 * s, yA - 70, "each run 360 in (30 ft)")}
    ${dim(x0 + L + 30, yA, x0 + L + 30, yB + run, "", 0, 0)}${t(x0 + L + 40, yA + run + 10, "2 × 36 in", { size: 13 })}${t(x0 + L + 40, yA + run + 28, "clear", { size: 13 })}
    ${t(x0, 560, "Rules used (2010 ADA Standards): slope ≤ 1:12 (405.2) · rise ≤ 30 in per run (405.6) · width ≥ 36 in (405.5)", { size: 14, fill: MUTED })}
    ${t(x0, 584, "landings ≥ 60 in long, 60 × 60 in at a change of direction (405.7) · handrails both sides above 6 in rise (405.8)", { size: 14, fill: MUTED })}
    ${t(x0, 616, "Straight equivalent for the same 60 in rise: about 900 in (75 ft) long.", { size: 14, weight: 600 })}`;
  return frame("SWITCHBACK RAMP, 60 IN RISE", "Worked ADA layout: two 1:12 runs and a 60 in turning landing", body, "Original schematic. Clear dimensions only; handrails, posts and edge protection add width. Check the adopted local code.");
}

// ── 7. Ipe alternatives chart ───────────────────────────────────────────────
function ipe() {
  const woods = [
    ["Ipe", 3490, "CITES App. II (2024)"],
    ["Cumaru", 3330, "CITES App. II (2024)"],
    ["Tigerwood", 2170, "not CITES-listed"],
    ["Black locust", 1700, "domestic (US)"],
    ["Garapa", 1650, "not CITES-listed"],
  ];
  const x0 = 260, max = 3600, wBar = 560;
  const bars = woods.map(([name, j, note], i) => {
    const y = 160 + i * 62, w = (j / max) * wBar;
    return `${t(x0 - 16, y + 26, name, { size: 16, weight: 600, anchor: "end" })}<rect x="${x0}" y="${y + 6}" width="${w}" height="30" fill="${i < 2 ? AMBER : TEAL}" opacity="${i < 2 ? 0.85 : 0.8}"/>${t(x0 + w + 10, y + 27, `${j.toLocaleString("en-US")} lbf`, { size: 14 })}${t(x0 + wBar + 120, y + 27, note, { size: 13, fill: MUTED })}`;
  }).join("");
  const others = [
    ["Modified wood", "stable, durable; thermal modification can cut bending strength up to 30%"],
    ["Composite / PVC", "no rot, low upkeep; less stiff, moves with heat, runs hot in sun"],
    ["Aluminum", "does not burn or rot; expensive, noisy, hot in sun"],
    ["FRP (fiberglass)", "no rot, rust or splinters; light, non-conductive; stiffness from the section"],
  ];
  const list = others.map(([n, d], i) => `${t(120, 500 + i * 40, n, { size: 15, weight: 600 })}${t(300, 500 + i * 40, d, { size: 14, fill: MUTED })}`).join("");
  return frame("IPE ALTERNATIVES", "Janka hardness of hardwoods, and what the other options trade", `${bars}<line x1="${x0}" y1="150" x2="${x0}" y2="470" stroke="${LINE}"/>${list}`, "Janka values from The Wood Database; CITES status from the US Fish and Wildlife Service, listing effective 25 Nov 2024.");
}

// ── 8. Roof deck layers ─────────────────────────────────────────────────────
function roofDeck() {
  const layer = (x, y, w, h, fill, label, sub, ly) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${INK}" stroke-width="1"/>${leader(x + w + 70, ly - 5, x + w - 10, y + h / 2)}${t(x + w + 76, ly, label, { size: 14, weight: 600 })}${sub ? t(x + w + 76, ly + 18, sub, { size: 12, fill: MUTED }) : ""}`;
  const body = `
    ${t(80, 140, "Walkable GRP roof or balcony", { size: 17, weight: 600 })}
    ${layer(80, 180, 260, 12, "#9aa5ab", "topcoat (non-slip where walked)", "about 500 g/m²", 150)}
    ${layer(80, 192, 260, 18, TEAL_L, "glass mat + resin laminate", "450–600 g/m² CSM", 210)}
    ${layer(80, 210, 260, 30, WOOD, "18 mm OSB3 or plywood deck", "tongue-and-groove", 270)}
    ${[110, 190, 270].map((x) => `<rect x="${x}" y="240" width="22" height="90" fill="#b7894d"/>`).join("")}
    ${t(80, 360, "joists, laid to a fall of at least 1:80 (BS 6229)", { size: 13, fill: MUTED })}
    ${t(640, 140, "Industrial FRP roof panel", { size: 17, weight: 600 })}
    <path d="M640 230 q20 -30 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="${TEAL}" stroke-width="5"/>
    <rect x="640" y="236" width="280" height="16" fill="${STEEL_L}" stroke="${STEEL}"/>
    ${t(940, 230, "corrugated FRP panel (ASTM D3841)", { size: 14, weight: 600 })}${t(940, 248, "not walkable; translucent grades for daylight", { size: 12, fill: MUTED })}
    ${t(940, 266, "purlin", { size: 12, fill: MUTED })}
    <rect x="640" y="330" width="280" height="40" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
    ${[680, 760, 840].map((x) => `<line x1="${x}" y1="330" x2="${x}" y2="370" stroke="${TEAL}" stroke-width="2"/>`).join("")}
    ${t(940, 350, "structural FRP deck (closed cells)", { size: 14, weight: 600 })}${t(940, 368, "corrosive roofs; approved per project", { size: 12, fill: MUTED })}
    ${t(80, 470, "Fire: roof coverings are rated with ASTM E108 / UL 790 (US) or BROOF tests (EU) as tested systems.", { size: 14, fill: MUTED })}
    ${t(80, 494, "Light-transmitting plastic roof panels are limited in panel area and roof area by the building code.", { size: 14, fill: MUTED })}`;
  return frame("FIBERGLASS ROOF DECK", "Two different build-ups share the name", body, "Original schematic, not to scale. Laminate weights from UK system guidance; check the chosen system's instructions.");
}

// ── 9. Utility pole anatomy ─────────────────────────────────────────────────
function pole() {
  const body = `
    <rect x="0" y="540" width="${W}" height="150" fill="${GROUND}"/>
    <path d="M560 150 L600 150 L612 660 L548 660 Z" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="420" y="190" width="320" height="16" fill="${TEAL}"/>
    ${[440, 580, 720].map((x) => `<rect x="${x - 6}" y="160" width="12" height="30" fill="#e5e7eb" stroke="${INK}"/>`).join("")}
    ${leader(860, 190, 740, 198)}${t(866, 196, "FRP crossarm (tested to ASTM D8019)", { size: 14, weight: 600 })}
    ${[280, 340, 400].map((y, i) => `<line x1="${i % 2 ? 604 : 556}" y1="${y}" x2="${i % 2 ? 630 : 530}" y2="${y}" stroke="${INK}" stroke-width="5"/>`).join("")}
    ${leader(860, 380, 632, 360)}${t(866, 386, "steps or step holes", { size: 14, weight: 600 })}
    <rect x="540" y="444" width="80" height="96" fill="${AMBER}" opacity="0.18"/>
    ${leader(300, 470, 540, 490)}${t(110, 466, "no-drill zone up to about 8 ft above ground", { size: 14, weight: 600 })}
    ${dim(660, 540, 660, 660, "", 0, 0)}${t(675, 610, "embedment 10% of length + 2 ft", { size: 14, weight: 600 })}
    ${t(110, 250, "Specified as wood-equivalent ANSI O5.1 classes", { size: 14 })}
    ${t(110, 272, "with NESC strength factors", { size: 14 })}
    ${t(110, 300, "Standard: ANSI/ACMA/UCSC-FRP", { size: 14, weight: 600 })}
    ${t(110, 320, "Composite Utility Poles-1-2018", { size: 14, weight: 600 })}`;
  return frame("FIBERGLASS UTILITY POLE", "What the specification and field guides cover", body, "Original schematic, not to scale. Field rules vary by manufacturer and utility; follow the pole maker's guide.");
}

// ── 10. Composite pole premium over wood, as published (A071) ──────────────
function poleCost() {
  const x0 = 380, unit = 70; // 1x = 70 px, axis 0–10x
  const rows = [
    { y: 220, label: "Oak Ridge National Laboratory, 2021", sub: "distribution poles", from: 1.9, to: 2, text: "nearly 2×" },
    { y: 320, label: "CompositesWorld, 2004", sub: "small distribution pole", from: 1.9, to: 2, text: "2×" },
    { y: 420, label: "Manitoba Hydro, 2023", sub: "fibreglass vs wood", from: 3, to: 4, text: "3 to 4×" },
    { y: 520, label: "US Department of Energy, 2024", sub: "all non-wood; composite at the high end", from: 2, to: 10, text: "2 to 10×" },
  ];
  const axis = Array.from({ length: 11 }, (_, i) => `<line x1="${x0 + i * unit}" y1="170" x2="${x0 + i * unit}" y2="580" stroke="${LINE}"/>${t(x0 + i * unit, 606, `${i}×`, { size: 14, anchor: "middle", fill: MUTED })}`).join("");
  const body = axis +
    `<line x1="${x0 + unit}" y1="160" x2="${x0 + unit}" y2="580" stroke="${WOOD}" stroke-width="3"/>${t(x0 + unit + 8, 160, "wood pole = 1×", { size: 14, fill: MUTED })}` +
    rows.map((r) => `${t(60, r.y - 2, r.label, { size: 16, weight: 600 })}${t(60, r.y + 20, r.sub, { size: 14, fill: MUTED })}
      <rect x="${x0 + r.from * unit}" y="${r.y - 16}" width="${Math.max((r.to - r.from) * unit, 10)}" height="30" rx="4" fill="${TEAL}"/>
      ${t(x0 + r.to * unit + 14, r.y + 5, r.text, { size: 16, weight: 600 })}`).join("") +
    t(x0, 644, "Purchase price of a composite pole as a multiple of a wood pole", { size: 14, fill: MUTED });
  return frame("COMPOSITE UTILITY POLE COST", "Published price premium over wood, by source", body, "Original chart from the cited sources. Purchase price only; installed cost and service life change the comparison.");
}

// ── 11. Two walls called "composite retaining wall" (A071) ─────────────────
function retainingWall() {
  const body = `
    ${t(70, 140, "FRP sheet pile wall (waterfront)", { size: 17, weight: 600 })}
    <rect x="70" y="330" width="250" height="330" fill="${GROUND}"/>
    <rect x="330" y="380" width="230" height="170" fill="${WATER}"/>
    <rect x="330" y="550" width="230" height="110" fill="${GROUND}"/>
    <line x1="330" y1="380" x2="560" y2="380" stroke="${WATER_D}" stroke-width="2"/>
    <rect x="318" y="300" width="14" height="340" fill="${TEAL}"/>
    <rect x="306" y="290" width="38" height="14" fill="${INK}"/>
    <rect x="332" y="356" width="12" height="20" fill="${STEEL}"/>
    <line x1="120" y1="366" x2="332" y2="366" stroke="${INK}" stroke-width="3"/>
    <rect x="96" y="346" width="26" height="60" fill="${CONC}" stroke="${STEEL}" stroke-width="2"/>
    ${leader(420, 250, 326, 294)}${t(426, 254, "cap", { size: 14, weight: 600 })}
    ${leader(430, 330, 344, 364)}${t(436, 334, "waler and tie rod", { size: 14, weight: 600 })}
    ${leader(150, 300, 110, 346)}${t(110, 292, "deadman anchor", { size: 14, weight: 600 })}
    ${dim(580, 304, 580, 550, "", 0, 0)}${t(424, 470, "exposed height", { size: 14 })}
    ${dim(580, 550, 580, 640, "", 0, 0)}${t(424, 606, "embedment", { size: 14 })}
    ${t(70, 190, "Interlocking pultruded sections driven into the bed;", { size: 14, fill: MUTED })}
    ${t(70, 210, "taller walls add walers and tie-backs.", { size: 14, fill: MUTED })}
    <line x1="630" y1="130" x2="630" y2="670" stroke="${LINE}"/>
    ${t(670, 140, "Composite sleeper wall (landscape)", { size: 17, weight: 600 })}
    <rect x="900" y="400" width="240" height="260" fill="${GROUND}"/>
    <rect x="670" y="580" width="240" height="80" fill="${GROUND}"/>
    ${[400, 445, 490, 535].map((y) => `<rect x="884" y="${y}" width="18" height="41" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>`).join("")}
    <rect x="866" y="380" width="18" height="270" fill="${STEEL}"/>
    <path d="M902 400 h34 v180 h-34 Z" fill="#f3f4f6" stroke="${STEEL_L}" stroke-dasharray="5 4"/>
    <circle cx="918" cy="566" r="9" fill="none" stroke="${INK}" stroke-width="2"/>
    ${leader(760, 330, 892, 420)}${t(680, 322, "composite sleepers or panels", { size: 14, weight: 600 })}
    ${leader(760, 470, 870, 500)}${t(680, 462, "post in a", { size: 14, weight: 600 })}${t(680, 480, "concrete footing", { size: 14, weight: 600 })}
    ${leader(1010, 330, 922, 440)}${t(980, 322, "drainage gravel and pipe", { size: 14, weight: 600 })}
    ${t(670, 190, "Boards stacked between posts; height is usually kept", { size: 14, fill: MUTED })}
    ${t(670, 210, "under the local permit threshold (4 ft or 1 m).", { size: 14, fill: MUTED })}`;
  return frame("COMPOSITE RETAINING WALL", "The two products the term describes", body, "Original schematic, not to scale. Wall height, embedment and anchors are set by the geotechnical design.");
}

// ── 12. An 8 ft fiberglass tree stake in the ground (A071) ─────────────────
function stake8ft() {
  const top = 150, ground = 560, bottom = 650; // 96 in total, about 16 in buried
  const body = `
    <rect x="0" y="${ground}" width="${W}" height="${690 - ground}" fill="${GROUND}"/>
    <ellipse cx="600" cy="${ground + 40}" rx="120" ry="38" fill="#d9cfbd"/>
    <path d="M592 ${ground + 20} C588 440 596 300 600 200" fill="none" stroke="${WOOD}" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="600" cy="170" rx="120" ry="70" fill="${TEAL_L}" opacity="0.8"/>
    <rect x="${760 - 4}" y="${top}" width="8" height="${bottom - top}" fill="${TEAL}"/>
    <rect x="${440 - 4}" y="${top}" width="8" height="${bottom - top}" fill="${TEAL}"/>
    <path d="M444 440 Q520 452 596 440 M604 440 Q680 452 756 440" fill="none" stroke="${AMBER}" stroke-width="6" stroke-linecap="round"/>
    ${dim(860, top, 860, bottom, "", 0, 0)}${t(876, 380, "8 ft (96 in, 2.44 m)", { size: 15, weight: 600 })}
    ${dim(820, ground, 820, bottom, "", 0, 0)}${t(876, ground + 52, "12 to 18 in in undisturbed soil", { size: 15, weight: 600 })}
    ${dim(380, 440, 380, ground, "", 0, 0)}${t(90, 496, "ties 18 to 24 in above ground,", { size: 15, weight: 600 })}${t(90, 518, "broad and loose", { size: 15, weight: 600 })}
    ${leader(330, 300, 436, 320)}${t(90, 296, "stake outside the root ball", { size: 15, weight: 600 })}
    ${t(876, 250, "6.5 to 7 ft stays above ground", { size: 15 })}
    ${t(876, 274, "for training a taller leader", { size: 15 })}`;
  return frame("8 FT FIBERGLASS TREE STAKE", "How much goes in the ground and where the ties sit", body, "Original schematic, not to scale. Depth and tie height from Kansas State University MF1120; the site and tree decide the final layout.");
}

const figures = [
  ["public/images/products/siding-panels/fiberglass-siding-panel-profiles.webp", siding],
  ["public/images/products/baffles/fiberglass-baffle-types-clarifier-contact-tank.webp", baffles],
  ["public/images/products/rtrc-conduit/rtrc-fiberglass-conduit-wall-types-joint.webp", rtrc],
  ["public/images/blog/golden-hand-bridge-fiberglass-hand-layers.webp", goldenHand],
  ["public/images/blog/tower-bridge-frp-cantilever-sidewalk-section.webp", towerBridge],
  ["public/images/covers/blog/switchback-ramp-ada-plan.webp", switchback],
  ["public/images/covers/blog/ipe-alternatives-decking-comparison.webp", ipe],
  ["public/images/covers/blog/fiberglass-roof-deck-layers.webp", roofDeck],
  ["public/images/covers/blog/fiberglass-utility-pole-anatomy.webp", pole],
  ["public/images/covers/blog/composite-utility-pole-cost-premium.webp", poleCost],
  ["public/images/covers/blog/composite-retaining-wall-types.webp", retainingWall],
  ["public/images/covers/blog/8-ft-fiberglass-tree-stake-depth.webp", stake8ft],
];

for (const [out, draw] of figures) {
  mkdirSync(dirname(out), { recursive: true });
  await sharp(Buffer.from(draw())).webp({ quality: 86 }).toFile(out);
  console.log("wrote", out);
}
