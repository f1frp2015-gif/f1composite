// node scripts/covers/draw-incomepultrusion-wave-figures.mjs
// Original schematics (1200x750 WebP) for the 6 new knowledge articles; proportions illustrative.
//   covers/blog/phenolic-resin-condensation-voids
//   covers/blog/phenolic-vs-polyester-fire-char
//   covers/blog/isophthalic-vs-orthophthalic-backbone
//   covers/blog/isophthalic-resin-selection-ladder
//   covers/blog/vacuum-infusion-bag-stack-schematic
//   covers/blog/vacuum-infusion-darcy-fill-time
//   covers/blog/fiberglass-vs-carbon-specific-stiffness
//   covers/blog/fiberglass-vs-carbon-equal-deflection-beam
//   covers/blog/telescopic-pole-locking-mechanisms
//   covers/blog/telescopic-tube-nesting-clearance
//   covers/blog/bendable-fiberglass-rod-bend-radius-strain
//   covers/blog/bendable-fiberglass-rod-min-radius-chart
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

const W = 1200, H = 750;
const TEAL = "#0f766e", TEAL_L = "#cfe8e4", TEAL_BG = "#eef7f5", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", AMBER = "#c2610c", AMBER_L = "#fde8d8";
const STEEL = "#7b8790", STEEL_L = "#dce2e6", CHAR = "#374151";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" ${font} font-size="${o.size ?? 15}" font-weight="${o.weight ?? 400}" fill="${o.fill ?? INK}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}>${esc(s)}</text>`;
const leader = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.4"/><circle cx="${x2}" cy="${y2}" r="3.2" fill="${MUTED}"/>`;
const dim = (x1, y1, x2, y2, label, dx = 0, dy = -8) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="1.3" marker-start="url(#d)" marker-end="url(#d)"/>${label ? t((x1 + x2) / 2 + dx, (y1 + y2) / 2 + dy, label, { size: 14, anchor: "middle" }) : ""}`;

function polyArc(cx, cy, r, degStart, degEnd, steps = 60) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const a = ((degStart + ((degEnd - degStart) * i) / steps) * Math.PI) / 180;
    pts.push(`${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function frame(heading, sub, body, footer) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <marker id="d" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0 0L8 4L0 8Z" fill="${INK}"/></marker>
    <marker id="a" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L8 4.5L0 9Z" fill="${AMBER}"/></marker>
    <marker id="t" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L8 4.5L0 9Z" fill="${TEAL}"/></marker>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff"/>
  ${t(60, 56, heading, { size: 20, weight: 600, fill: TEAL })}
  ${t(60, 86, sub, { size: 16, fill: MUTED })}
  ${body}
  <line x1="60" y1="694" x2="1140" y2="694" stroke="${LINE}"/>
  ${t(60, 722, footer, { size: 14, fill: MUTED })}
</svg>`;
}

// ── 1. Phenolic: Addition cure vs Condensation cure in a heated die ─────────
function phenolicVoids() {
  const die = (x, y, label, sub, isCond) => {
    const steam = isCond
      ? [
          [x + 175, y + 72], [x + 220, y + 92], [x + 260, y + 66], [x + 305, y + 88], [x + 345, y + 74], [x + 385, y + 84],
        ].map(([vx, vy]) => `<circle cx="${vx}" cy="${vy}" r="5.5" fill="#ffffff" stroke="${AMBER}" stroke-width="2"/>`).join("")
      : "";
    const skin = isCond
      ? `<rect x="${x + 130}" y="${y + 44}" width="310" height="8" fill="${CHAR}" opacity="0.55"/>
         <rect x="${x + 130}" y="${y + 108}" width="310" height="8" fill="${CHAR}" opacity="0.55"/>`
      : "";
    return `
      ${t(x, y - 16, label, { size: 18, weight: 600, fill: isCond ? AMBER : TEAL })}
      ${t(x, y + 6, sub, { size: 14, fill: MUTED })}
      <rect x="${x + 120}" y="${y + 24}" width="320" height="20" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="1.5"/>
      <rect x="${x + 120}" y="${y + 116}" width="320" height="20" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="1.5"/>
      ${t(x + 280, y + 39, "HEATED PULTRUSION DIE", { size: 11, weight: 600, fill: INK, anchor: "middle" })}
      <rect x="${x + 40}" y="${y + 44}" width="440" height="72" fill="${isCond ? AMBER_L : TEAL_L}" stroke="${isCond ? AMBER : TEAL}" stroke-width="2"/>
      ${[58, 72, 86, 100].map((dy) => `<line x1="${x + 42}" y1="${y + dy}" x2="${x + 478}" y2="${y + dy}" stroke="${isCond ? AMBER : TEAL}" stroke-width="1.2" opacity="0.5"/>`).join("")}
      ${skin}${steam}
      <line x1="${x + 10}" y1="${y + 80}" x2="${x + 36}" y2="${y + 80}" stroke="${INK}" stroke-width="2" marker-end="url(#d)"/>
      <line x1="${x + 484}" y1="${y + 80}" x2="${x + 516}" y2="${y + 80}" stroke="${INK}" stroke-width="2" marker-end="url(#d)"/>
      ${t(x + 22, y + 102, "wet tow", { size: 12, fill: MUTED, anchor: "middle" })}
      ${t(x + 502, y + 102, "cured", { size: 12, fill: MUTED, anchor: "middle" })}`;
  };
  const body = `
    ${die(60, 148, "Addition cure: isophthalic polyester & vinyl ester", "Free-radical styrene cross-linking; no water liberated inside the die", false)}
    <rect x="610" y="168" width="530" height="120" rx="8" fill="${TEAL_BG}" stroke="${LINE}"/>
    ${t(634, 198, "Why standard structural profiles run smoothly", { size: 15, weight: 600, fill: TEAL })}
    ${t(634, 224, "• No condensation water is created during cross-linking.", { size: 14 })}
    ${t(634, 248, "• High line speed and uniform density (~1.9 g/cm³ at 65–70% glass).", { size: 14 })}
    ${t(634, 272, "• Neutral steel dies; no acid-catalyst corrosion inside tooling.", { size: 14 })}

    <line x1="60" y1="334" x2="1140" y2="334" stroke="${LINE}"/>

    ${die(60, 386, "Condensation cure: phenolic resole resin", "Methylol groups condense and release H₂O; outer skin seals before core vents", true)}
    ${leader(260, 566, 260, 456)}${t(270, 570, "trapped H₂O steam creates micro-voids or blisters", { size: 14, weight: 600, fill: AMBER })}
    ${leader(170, 610, 175, 496)}${t(180, 614, "outer skin gels first against hot die wall, blocking escape", { size: 14, fill: MUTED })}

    <rect x="610" y="406" width="530" height="232" rx="8" fill="#fdf7f2" stroke="${AMBER}" stroke-opacity="0.4"/>
    ${t(634, 436, "Process controls required for phenolic pultrusion", { size: 15, weight: 600, fill: AMBER })}
    ${t(634, 464, "• Staged die temperature profile so volatiles vent early.", { size: 14 })}
    ${t(634, 490, "• Acid-resistant die steel or chrome plating for acid catalysts.", { size: 14 })}
    ${t(634, 516, "• Slower pull speed and higher glass/filler tuning to hold voids low.", { size: 14 })}
    ${t(634, 542, "• Separate fire, smoke and mechanical qualification per section.", { size: 14 })}
    ${t(634, 580, "Resole vs Novolac:", { size: 14, weight: 600, fill: INK })}
    ${t(634, 602, "Liquid resoles (F:P > 1) are used in FRP wet-out and pultrusion.", { size: 13, fill: MUTED })}
    ${t(634, 622, "Solid novolacs (F:P < 1) need HMTA hardener; mainly molding/friction.", { size: 13, fill: MUTED })}`;
  return frame("PHENOLIC RESIN CURE MECHANICS IN FRP", "Why condensation water makes phenolic pultrusion harder than polyester or vinyl ester", body, "Original schematic; proportions illustrative. Cure chemistry differs by formulation; confirm process and test scope per order.");
}

// ── 2. Phenolic fire behavior & rail/tunnel standards ───────────────────────
function phenolicFire() {
  const body = `
    ${t(60, 138, "Reaction to flame: char barrier vs flaming pyrolysis", { size: 17, weight: 600 })}
    <rect x="60" y="162" width="510" height="220" rx="8" fill="#f8fafb" stroke="${LINE}"/>
    ${t(84, 192, "Phenolic FRP laminate", { size: 16, weight: 600, fill: TEAL })}
    <rect x="84" y="212" width="210" height="30" fill="${CHAR}"/>
    <rect x="84" y="242" width="210" height="58" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="1.5"/>
    ${t(189, 232, "rigid carbonaceous char layer", { size: 12, weight: 600, fill: "#ffffff", anchor: "middle" })}
    ${t(189, 276, "unburned phenolic + glass", { size: 12, fill: TEAL, anchor: "middle" })}
    ${t(314, 224, "• High aromatic ring content", { size: 13 })}
    ${t(314, 246, "  forms insulating char.", { size: 13 })}
    ${t(314, 272, "• Very low smoke density", { size: 13 })}
    ${t(314, 294, "  and low toxic gas yield.", { size: 13 })}
    ${t(314, 320, "• No flaming droplets;", { size: 13 })}
    ${t(314, 342, "  still combustible organic.", { size: 13, fill: MUTED })}

    <rect x="610" y="162" width="530" height="220" rx="8" fill="#fdf7f2" stroke="${LINE}"/>
    ${t(634, 192, "General-purpose (unmodified) polyester FRP", { size: 16, weight: 600, fill: AMBER })}
    <path d="M644 212 q18 -24 36 0 t36 0 t36 0 t36 0 t36 0" fill="${AMBER_L}" stroke="${AMBER}" stroke-width="2"/>
    <rect x="634" y="216" width="210" height="84" fill="${AMBER_L}" stroke="${AMBER}" stroke-width="1.5"/>
    ${t(739, 262, "styrene-rich polymer + glass", { size: 12, fill: AMBER, anchor: "middle" })}
    ${t(864, 224, "• Releases flammable styrene", { size: 13 })}
    ${t(864, 246, "  vapors without FR fillers.", { size: 13 })}
    ${t(864, 272, "• Higher smoke output;", { size: 13 })}
    ${t(864, 294, "  needs ATH or halogenated", { size: 13 })}
    ${t(864, 316, "  FR package for Class A.", { size: 13 })}
    ${t(864, 342, "• Halogen FR cuts flame", { size: 13, fill: MUTED })}
    ${t(864, 362, "  but can raise smoke/acid gas.", { size: 13, fill: MUTED })}

    ${t(60, 430, "Fire, smoke and toxicity (FST) standards where phenolic FRP is typically shortlisted", { size: 17, weight: 600 })}
    ${[
      ["EN 45545-2", "European passenger rail", "Hazard levels HL1–HL3; heat release, flame spread, smoke Ds & toxicity CIT"],
      ["NFPA 130", "North American rail & transit", "References ASTM E162 (flame spread) and ASTM E662 (smoke optical density)"],
      ["ASTM E84 / UL 723", "Building interior finishes", "10-min tunnel test; Flame Spread Index (FSI) and Smoke Developed Index (SDI)"],
      ["ASTM E1354 / ISO 5660", "Cone calorimeter", "Heat release rate (HRR, MARHE) used in rail and marine qualification"],
    ].map(([std, scope, note], i) => {
      const y = 456 + i * 54;
      return `<rect x="60" y="${y}" width="1080" height="44" rx="6" fill="${i % 2 ? "#f8fafb" : "#ffffff"}" stroke="${LINE}"/>
        ${t(80, y + 27, std, { size: 14, weight: 600, fill: TEAL })}
        ${t(290, y + 27, scope, { size: 14, weight: 600 })}
        ${t(540, y + 27, note, { size: 13, fill: MUTED })}`;
    }).join("")}`;
  return frame("PHENOLIC FRP FIRE & SMOKE BEHAVIOR", "Why rail, tunnel and offshore specifications ask for phenolic—and what tests prove it", body, "Original schematic; not a test report. A resin family name does not confer EN 45545-2, NFPA 130 or ASTM E84 compliance.");
}

// ── 3. Isophthalic vs Orthophthalic molecular packing schematic ─────────────
function isoVsOrtho() {
  const hex = (cx, cy, r) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = ((i * 60 - 90) * Math.PI) / 180;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="${TEAL_BG}" stroke="${TEAL}" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="${(r * 0.56).toFixed(1)}" fill="none" stroke="${TEAL}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  };
  const body = `
    <rect x="60" y="130" width="510" height="530" rx="10" fill="#fcfdfd" stroke="${LINE}"/>
    ${t(90, 168, "Orthophthalic polyester (ortho)", { size: 18, weight: 600, fill: AMBER })}
    ${t(90, 194, "From phthalic anhydride — 1,2 (ortho) ring positions", { size: 14, fill: MUTED })}
    ${hex(315, 332, 54)}
    <line x1="315" y1="278" x2="315" y2="238" stroke="${AMBER}" stroke-width="3"/>
    <line x1="362" y1="305" x2="402" y2="281" stroke="${AMBER}" stroke-width="3"/>
    ${t(315, 229, "1 — Ester chain", { size: 13, weight: 600, fill: AMBER, anchor: "middle" })}
    ${t(410, 285, "2 — Ester chain", { size: 13, weight: 600, fill: AMBER })}
    ${t(315, 420, "Adjacent 1,2 ester links kink the polymer backbone", { size: 14, weight: 600, anchor: "middle" })}
    <path d="M125 466 L215 444 L265 490 L345 454 L415 494 L505 464" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linejoin="round"/>
    ${t(90, 534, "Typical neat casting (published TDS ranges):", { size: 14, weight: 600 })}
    ${t(90, 560, "• HDT (ASTM D648): ~55–70 °C", { size: 14, fill: MUTED })}
    ${t(90, 584, "• Tensile strength: ~40–60 MPa", { size: 14, fill: MUTED })}
    ${t(90, 608, "• Elongation at break: ~1.5–2.5%", { size: 14, fill: MUTED })}
    ${t(90, 634, "• Faster water hydrolysis; general-purpose indoor parts.", { size: 14, fill: MUTED })}

    <rect x="610" y="130" width="530" height="530" rx="10" fill="${TEAL_BG}" stroke="${TEAL}" stroke-opacity="0.35"/>
    ${t(640, 168, "Isophthalic polyester (iso)", { size: 18, weight: 600, fill: TEAL })}
    ${t(640, 194, "From isophthalic acid — 1,3 (meta) ring positions", { size: 14, fill: MUTED })}
    ${hex(875, 332, 54)}
    <line x1="875" y1="278" x2="875" y2="238" stroke="${TEAL}" stroke-width="3"/>
    <line x1="922" y1="359" x2="962" y2="383" stroke="${TEAL}" stroke-width="3"/>
    ${t(875, 229, "1 — Ester chain", { size: 13, weight: 600, fill: TEAL, anchor: "middle" })}
    ${t(970, 387, "3 — Ester chain", { size: 13, weight: 600, fill: TEAL })}
    ${t(875, 420, "Wider 1,3 spacing yields straighter, tighter chains", { size: 14, weight: 600, anchor: "middle" })}
    <path d="M675 460 L1075 460 M675 482 L1075 482" fill="none" stroke="${TEAL}" stroke-width="4"/>
    ${[730, 810, 890, 970, 1030].map((x) => `<line x1="${x}" y1="460" x2="${x}" y2="482" stroke="${INK}" stroke-width="2"/>`).join("")}
    ${t(640, 534, "Typical neat casting (published TDS ranges):", { size: 14, weight: 600 })}
    ${t(640, 560, "• HDT (ASTM D648): ~80–110 °C", { size: 14 })}
    ${t(640, 584, "• Tensile strength: ~70–85 MPa", { size: 14 })}
    ${t(640, 608, "• Elongation at break: ~2.5–4.5% (tougher matrix)", { size: 14 })}
    ${t(640, 634, "• F1 standard EN 13706 E23 profile baseline matrix.", { size: 14, weight: 600, fill: TEAL })}`;
  return frame("ISOPHTHALIC VS ORTHOPHTHALIC POLYESTER", "One shift on the benzene ring changes chain packing, HDT, toughness and water resistance", body, "Original schematic; proportions illustrative. Neat casting ranges are published industry benchmarks, not an F1 test report.");
}

// ── 4. Resin selection ladder (Ortho -> Iso -> Vinyl Ester -> Phenolic) ─────
function isoLadder() {
  const cols = [
    { name: "Orthophthalic", sub: "General purpose", hdt: "55–70 °C", elong: "1.5–2.5%", use: "Dry, non-structural panels and low-cost moldings", f1: "Not used for F1 E23 profiles", color: STEEL },
    { name: "Isophthalic (ISO)", sub: "Structural baseline", hdt: "80–110 °C", elong: "2.5–4.5%", use: "Outdoor structural shapes, grating, mild splash, marine", f1: "F1 standard E23-ISO (65–70% glass)", color: TEAL },
    { name: "Epoxy Vinyl Ester", sub: "Corrosion barrier", hdt: "100–130 °C", elong: "4.0–6.0%", use: "Acids, caustics, chlorine, hot immersion, FGD", f1: "Optional upgrade by chemical schedule", color: "#0b5c8a" },
    { name: "Phenolic", sub: "FST specialty", hdt: ">180 °C", elong: "<1.5%", use: "Passenger rail interiors, tunnels, strict smoke/toxicity", f1: "Project review & FST qualification", color: AMBER },
  ];
  const cards = cols.map((c, i) => {
    const x = 60 + i * 276;
    const isF1 = i === 1;
    return `
      <rect x="${x}" y="150" width="252" height="494" rx="10" fill="${isF1 ? TEAL_BG : "#ffffff"}" stroke="${isF1 ? TEAL : LINE}" stroke-width="${isF1 ? 2.5 : 1.5}"/>
      <rect x="${x}" y="150" width="252" height="10" rx="5" fill="${c.color}"/>
      ${t(x + 18, 192, c.name, { size: 17, weight: 600, fill: c.color })}
      ${t(x + 18, 214, c.sub, { size: 13, fill: MUTED })}
      <line x1="${x + 18}" y1="234" x2="${x + 234}" y2="234" stroke="${LINE}"/>
      ${t(x + 18, 262, "NEAT HDT (TYPICAL)", { size: 11, weight: 600, fill: MUTED })}
      ${t(x + 18, 286, c.hdt, { size: 18, weight: 600 })}
      ${t(x + 18, 326, "NEAT ELONGATION", { size: 11, weight: 600, fill: MUTED })}
      ${t(x + 18, 350, c.elong, { size: 18, weight: 600 })}
      <line x1="${x + 18}" y1="372" x2="${x + 234}" y2="372" stroke="${LINE}"/>
      ${t(x + 18, 398, "WHERE IT FITS", { size: 11, weight: 600, fill: MUTED })}
      ${wrapText(c.use, 26).map((ln, li) => t(x + 18, 422 + li * 20, ln, { size: 13.5 })).join("")}
      <rect x="${x + 14}" y="556" width="224" height="72" rx="6" fill="${isF1 ? "#ffffff" : "#f6f8f9"}" stroke="${LINE}"/>
      ${t(x + 26, 578, "F1 PULTRUSION ROLE", { size: 10.5, weight: 600, fill: MUTED })}
      ${wrapText(c.f1, 26).map((ln, li) => t(x + 26, 598 + li * 17, ln, { size: 12.5, weight: isF1 ? 600 : 400, fill: isF1 ? TEAL : INK })).join("")}`;
  }).join("");
  return frame("WHERE ISOPHTHALIC RESIN SITS IN PULTRUSION", "Step-up map from general-purpose ortho to vinyl ester and phenolic matrices", cards, "Original selection summary. Neat resin ranges vary by grade; confirm chemical compatibility against the named resin TDS.");
}

function wrapText(str, maxLen) {
  const words = str.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxLen) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── 5. Vacuum Infusion (VARTM) stack cross-section ──────────────────────────
function infusionStack() {
  const body = `
    ${t(60, 134, "Cross-section through a single-sided vacuum infusion (VARTM) layup", { size: 16, weight: 600 })}
    <rect x="80" y="510" width="980" height="44" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="2"/>
    ${t(570, 537, "RIGID ONE-SIDED MOLD TOOL (waxed / release-coated)", { size: 14, weight: 600, fill: INK, anchor: "middle" })}

    <!-- Sealant tape -->
    <rect x="110" y="492" width="26" height="18" fill="${CHAR}"/>
    <rect x="1004" y="492" width="26" height="18" fill="${CHAR}"/>

    <!-- Dry + wetted laminate -->
    <rect x="170" y="446" width="460" height="64" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="630" y="446" width="330" height="64" fill="#f3f5f6" stroke="${STEEL}" stroke-width="2" stroke-dasharray="6 4"/>
    ${t(400, 483, "RESIN-SATURATED FIBER STACK", { size: 13, weight: 600, fill: TEAL, anchor: "middle" })}
    ${t(795, 483, "DRY FIBER PREFORM (under vacuum)", { size: 13, fill: MUTED, anchor: "middle" })}

    <!-- Peel ply -->
    <rect x="170" y="432" width="790" height="14" fill="#e5e7eb" stroke="${MUTED}" stroke-width="1"/>
    <!-- Flow media (stops short of vacuum line) -->
    <rect x="180" y="414" width="660" height="18" fill="${AMBER_L}" stroke="${AMBER}" stroke-width="1.5"/>
    ${Array.from({ length: 22 }, (_, i) => `<line x1="${195 + i * 30}" y1="414" x2="${205 + i * 30}" y2="432" stroke="${AMBER}" stroke-width="1.2"/>`).join("")}

    <!-- Resin feed spiral & vacuum port -->
    <circle cx="195" cy="400" r="14" fill="${TEAL}" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="940" cy="400" r="14" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <line x1="195" y1="386" x2="195" y2="270" stroke="${TEAL}" stroke-width="4"/>
    <line x1="940" y1="386" x2="940" y2="270" stroke="${INK}" stroke-width="4"/>

    <!-- Vacuum bag film draped over -->
    <path d="M123 492 L162 400 L180 384 L956 384 L980 400 L1017 492" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="10 4"/>

    <!-- Flow front arrows -->
    <line x1="590" y1="423" x2="660" y2="423" stroke="${AMBER}" stroke-width="3" marker-end="url(#a)"/>
    <line x1="590" y1="478" x2="648" y2="478" stroke="${TEAL}" stroke-width="3" marker-end="url(#t)"/>
    ${t(655, 368, "flow media leads; resin drops through thickness", { size: 13, weight: 600, fill: AMBER, anchor: "middle" })}

    <!-- Resin pot & vacuum pump boxes -->
    <rect x="115" y="180" width="160" height="90" rx="8" fill="${TEAL_BG}" stroke="${TEAL}" stroke-width="2"/>
    ${t(195, 216, "Resin reservoir", { size: 15, weight: 600, fill: TEAL, anchor: "middle" })}
    ${t(195, 238, "1 atm ambient", { size: 13, fill: MUTED, anchor: "middle" })}
    ${t(195, 256, "100–400 cP resin", { size: 13, fill: MUTED, anchor: "middle" })}

    <rect x="850" y="180" width="190" height="90" rx="8" fill="#f3f5f6" stroke="${INK}" stroke-width="2"/>
    ${t(945, 216, "Vacuum pump + trap", { size: 15, weight: 600, anchor: "middle" })}
    ${t(945, 238, "~0.02–0.05 bar abs", { size: 13, fill: MUTED, anchor: "middle" })}
    ${t(945, 256, "ΔP ≈ 0.95 bar max", { size: 13, fill: MUTED, anchor: "middle" })}

    <!-- Atmospheric pressure arrows pushing down on bag -->
    ${[360, 480, 600, 720].map((x) => `<line x1="${x}" y1="292" x2="${x}" y2="346" stroke="${MUTED}" stroke-width="1.8" marker-end="url(#d)"/>`).join("")}
    ${t(540, 282, "Atmospheric pressure compacts the bag (~101 kPa / 14.7 psi)", { size: 14, weight: 600, fill: MUTED, anchor: "middle" })}

    <!-- Callouts below mold -->
    ${leader(123, 594, 123, 506)}${t(132, 598, "tacky sealant tape", { size: 13, weight: 600 })}
    ${leader(420, 636, 420, 439)}${t(430, 640, "peel ply (strips off after cure)", { size: 13, weight: 600 })}
    ${leader(760, 594, 835, 424)}${t(768, 598, "flow media stops short (brake zone prevents resin race-out)", { size: 13, weight: 600, fill: AMBER })}`;
  return frame("VACUUM INFUSION (VARTM) PROCESS SCHEMATIC", "Atmospheric pressure drives low-viscosity resin through dry fiber under a flexible bag", body, "Original schematic; proportions illustrative. F1 Composite specializes in pultrusion, not vacuum infusion.");
}

// ── 6. Vacuum Infusion Darcy fill-time chart ────────────────────────────────
function infusionDarcy() {
  const x0 = 130, y0 = 590, w = 720, h = 420;
  const maxL = 2.0, maxMin = 120;
  const sx = (L) => x0 + (L / maxL) * w;
  const sy = (m) => y0 - (Math.min(m, maxMin) / maxMin) * h;

  const curve = (K, mu) => {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const L = (maxL * i) / 40;
      const mins = (0.45 * mu * L * L) / (2 * K * 95000) / 60;
      if (mins <= maxMin) pts.push(`${pts.length === 0 ? "M" : "L"}${sx(L).toFixed(1)} ${sy(mins).toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const gridX = [0, 0.5, 1.0, 1.5, 2.0].map((L) => `<line x1="${sx(L)}" y1="${y0 - h}" x2="${sx(L)}" y2="${y0}" stroke="${LINE}"/>${t(sx(L), y0 + 24, `${L.toFixed(1)} m`, { size: 13, fill: MUTED, anchor: "middle" })}`).join("");
  const gridY = [0, 20, 40, 60, 80, 100, 120].map((m) => `<line x1="${x0}" y1="${sy(m)}" x2="${x0 + w}" y2="${sy(m)}" stroke="${LINE}"/>${t(x0 - 14, sy(m) + 5, `${m} min`, { size: 13, fill: MUTED, anchor: "end" })}`).join("");

  const body = `
    ${gridX}${gridY}
    <line x1="${x0}" y1="${y0}" x2="${x0 + w}" y2="${y0}" stroke="${INK}" stroke-width="1.8"/>
    <line x1="${x0}" y1="${y0 - h}" x2="${x0}" y2="${y0}" stroke="${INK}" stroke-width="1.8"/>
    ${t(x0 + w / 2, y0 + 54, "Infusion flow distance L (meters)", { size: 14, weight: 600, anchor: "middle" })}

    <!-- 45-min typical gel window guide -->
    <line x1="${x0}" y1="${sy(45)}" x2="${x0 + w}" y2="${sy(45)}" stroke="${AMBER}" stroke-width="1.5" stroke-dasharray="7 5"/>
    ${t(x0 + 12, sy(45) - 8, "illustrative 45 min resin gel window", { size: 13, weight: 600, fill: AMBER })}

    <!-- Curves -->
    <path d="${curve(1e-10, 0.25)}" fill="none" stroke="${STEEL}" stroke-width="3.2" stroke-dasharray="6 4"/>
    <path d="${curve(2e-9, 0.60)}" fill="none" stroke="${AMBER}" stroke-width="3.2"/>
    <path d="${curve(2e-9, 0.25)}" fill="none" stroke="${TEAL}" stroke-width="3.5"/>

    <!-- Direct curve end dots & labels -->
    <circle cx="${sx(1.0)}" cy="${sy(98.7)}" r="5" fill="${STEEL}"/>
    ${t(sx(1.0) + 12, sy(98.7) + 4, "Bare fabric (K = 1×10⁻¹⁰ m², 250 cP): 99 min at 1.0 m", { size: 13, weight: 600, fill: STEEL })}

    <circle cx="${sx(2.0)}" cy="${sy(47.4)}" r="5" fill="${AMBER}"/>
    ${t(sx(2.0) + 12, sy(47.4) + 4, "Flow media + 600 cP resin: 47 min at 2.0 m", { size: 13, weight: 600, fill: AMBER })}

    <circle cx="${sx(2.0)}" cy="${sy(19.7)}" r="5" fill="${TEAL}"/>
    ${t(sx(2.0) + 12, sy(19.7) + 4, "Flow media + 250 cP resin: 20 min at 2.0 m", { size: 13, weight: 600, fill: TEAL })}

    <rect x="874" y="170" width="268" height="200" rx="8" fill="#f7f9fa" stroke="${LINE}"/>
    ${t(892, 200, "1D Darcy fill-time model", { size: 15, weight: 600, fill: TEAL })}
    ${t(892, 230, "t = φ · μ · L² / (2 · K · ΔP)", { size: 15, weight: 600 })}
    ${t(892, 260, "Assumptions:", { size: 13, weight: 600, fill: MUTED })}
    ${t(892, 282, "• Porosity φ = 0.45 (Vf = 55%)", { size: 13, fill: MUTED })}
    ${t(892, 302, "• ΔP = 95 kPa (0.95 bar)", { size: 13, fill: MUTED })}
    ${t(892, 322, "• Constant μ (isothermal)", { size: 13, fill: MUTED })}
    ${t(892, 346, "Doubling L quadruples t (L²).", { size: 13, weight: 600, fill: INK })}`;
  return frame("WORKED DARCY FILL-TIME ESTIMATE FOR VACUUM INFUSION", "Why flow distance scales with L², and why low-viscosity resin and flow media prevent dry spots", body, "Original calculation from 1D Darcy's law. Real parts vary with compaction gradient, resin exotherm and 3D flow.");
}

// ── 7. Fiberglass vs Carbon Fiber: Specific stiffness & specific strength ───
function glassVsCarbonBars() {
  const items = [
    { name: "Pultruded UD CFRP", sub: "135 GPa · 2,000 MPa · 1.55 g/cm³", spE: 87.1, spS: 1290, hi: true },
    { name: "Structural steel S355", sub: "210 GPa · 355 MPa yield · 7.85 g/cm³", spE: 26.8, spS: 45, hi: false },
    { name: "Aluminum 6061-T6", sub: "70 GPa · 240 MPa yield · 2.70 g/cm³", spE: 25.9, spS: 89, hi: false },
    { name: "Pultruded GFRP (E23)", sub: "23 GPa · 240 MPa · 1.90 g/cm³", spE: 12.1, spS: 126, hi: false },
  ];
  const drawPanel = (x0, title, unit, key, maxV) => {
    const barW = 360;
    const rows = items.map((it, i) => {
      const y = 215 + i * 106;
      const w = (it[key] / maxV) * barW;
      const fill = it.hi ? TEAL : i === 3 ? AMBER : STEEL;
      return `
        ${t(x0, y, it.name, { size: 15, weight: 600, fill: it.hi ? TEAL : INK })}
        ${t(x0, y + 19, it.sub, { size: 12.5, fill: MUTED })}
        <rect x="${x0}" y="${y + 28}" width="${barW}" height="28" rx="4" fill="#f1f4f6"/>
        <rect x="${x0}" y="${y + 28}" width="${Math.max(w, 6).toFixed(1)}" height="28" rx="4" fill="${fill}"/>
        ${t(x0 + w + 10, y + 48, `${it[key].toLocaleString("en-US")} ${unit}`, { size: 14, weight: 600, fill })}`;
    }).join("");
    return `${t(x0, 158, title, { size: 17, weight: 600 })}<line x1="${x0}" y1="174" x2="${x0 + 490}" y2="174" stroke="${LINE}"/>${rows}`;
  };
  const body = `
    ${drawPanel(60, "Specific stiffness (E / ρ)", "MN·m/kg", "spE", 100)}
    <line x1="600" y1="140" x2="600" y2="650" stroke="${LINE}"/>
    ${drawPanel(640, "Specific strength (σ / ρ)", "kN·m/kg", "spS", 1450)}
    <rect x="60" y="630" width="1080" height="44" rx="6" fill="${TEAL_BG}"/>
    ${t(80, 657, "Takeaway: Along the fibers, UD pultruded CFRP gives ~7.2× the specific stiffness of E23 GFRP—and ~10× the specific tensile strength.", { size: 14, weight: 600, fill: TEAL })}`;
  return frame("FIBERGLASS VS CARBON FIBER: PER-KILOGRAM PERFORMANCE", "Longitudinal laminate values divided by density (F1 E23 GFRP reference vs standard-modulus UD CFRP class)", body, "Original chart from EN 13706 E23 minimums, ACI 440.1R / class CFRP mid-range and Eurocode metal handbook values.");
}

// ── 8. Equal-deflection beam comparison + galvanic isolation callout ────────
function glassVsCarbonBeam() {
  const body = `
    ${t(60, 134, "Worked case: 2.0 m simply supported square tube, w = 1 kN/m, max deflection L/250 = 8.0 mm (wall = width / 10)", { size: 15, weight: 600 })}

    <!-- GFRP card -->
    <rect x="60" y="162" width="510" height="330" rx="10" fill="#fdf7f2" stroke="${AMBER}" stroke-opacity="0.45"/>
    ${t(86, 198, "Pultruded GFRP (EN 13706 E23)", { size: 18, weight: 600, fill: AMBER })}
    ${t(86, 222, "E = 23 GPa · ρ = 1.90 g/cm³ · required I = 113.2 cm⁴", { size: 13.5, fill: MUTED })}
    <rect x="108" y="256" width="144" height="144" fill="${AMBER_L}" stroke="${AMBER}" stroke-width="3"/>
    <rect x="124" y="272" width="112" height="112" fill="#ffffff" stroke="${AMBER}" stroke-width="2"/>
    ${t(180, 333, "69.3 mm", { size: 14, weight: 600, fill: AMBER, anchor: "middle" })}
    ${t(180, 424, "wall ≈ 6.9 mm", { size: 13, fill: MUTED, anchor: "middle" })}
    ${t(290, 286, "Cross-section area:", { size: 13, fill: MUTED })}${t(290, 308, "1,727 mm²", { size: 17, weight: 600 })}
    ${t(290, 348, "Mass per meter:", { size: 13, fill: MUTED })}${t(290, 372, "3.28 kg/m", { size: 22, weight: 600, fill: AMBER })}
    ${t(290, 408, "Electrically insulating", { size: 13.5, weight: 600, fill: TEAL })}
    ${t(290, 430, "Raw fiber ~10–15× cheaper", { size: 13.5, fill: MUTED })}
    ${t(290, 452, "Safe against aluminum fasteners", { size: 13.5, fill: MUTED })}

    <!-- CFRP card -->
    <rect x="610" y="162" width="530" height="330" rx="10" fill="${TEAL_BG}" stroke="${TEAL}" stroke-width="2"/>
    ${t(636, 198, "Pultruded UD CFRP (standard modulus)", { size: 18, weight: 600, fill: TEAL })}
    ${t(636, 222, "E = 135 GPa · ρ = 1.55 g/cm³ · required I = 19.3 cm⁴", { size: 13.5, fill: MUTED })}
    <rect x="686" y="282" width="92" height="92" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="696" y="292" width="72" height="72" fill="#ffffff" stroke="${TEAL}" stroke-width="2"/>
    ${t(732, 333, "44.5 mm", { size: 13.5, weight: 600, fill: TEAL, anchor: "middle" })}
    ${t(732, 398, "wall ≈ 4.4 mm", { size: 13, fill: MUTED, anchor: "middle" })}
    ${t(840, 286, "Cross-section area:", { size: 13, fill: MUTED })}${t(840, 308, "713 mm²", { size: 17, weight: 600 })}
    ${t(840, 348, "Mass per meter:", { size: 13, fill: MUTED })}${t(840, 372, "1.10 kg/m  (3.0× lighter)", { size: 20, weight: 600, fill: TEAL })}
    ${t(840, 408, "Electrically conductive", { size: 13.5, weight: 600, fill: AMBER })}
    ${t(840, 430, "Needs glass veil/barrier vs Al", { size: 13.5, fill: MUTED })}
    ${t(840, 452, "Near-zero axial CTE", { size: 13.5, fill: MUTED })}

    <!-- Bottom galvanic isolation bar -->
    <rect x="60" y="520" width="1080" height="142" rx="8" fill="#ffffff" stroke="${LINE}"/>
    ${t(86, 552, "Critical assembly difference: galvanic corrosion at metal joints", { size: 16, weight: 600 })}
    <rect x="86" y="574" width="220" height="26" fill="${CHAR}"/>${t(196, 592, "CFRP laminate (cathodic)", { size: 12, weight: 600, fill: "#ffffff", anchor: "middle" })}
    <rect x="86" y="600" width="220" height="14" fill="${TEAL_L}" stroke="${TEAL}"/>
    <rect x="86" y="614" width="220" height="26" fill="${STEEL_L}" stroke="${STEEL}"/>${t(196, 632, "Aluminum bracket (anodic)", { size: 12, weight: 600, fill: INK, anchor: "middle" })}
    ${leader(350, 607, 308, 607)}${t(358, 602, "Required E-glass isolation ply or adhesive bondline", { size: 14, weight: 600, fill: TEAL })}
    ${t(358, 624, "Without an insulating barrier, wet contact between carbon and aluminum rapidly corrodes the aluminum.", { size: 13.5, fill: MUTED })}
    ${t(358, 646, "E-glass FRP is non-conductive and forms no galvanic cell with aluminum or steel.", { size: 13.5, fill: MUTED })}`;
  return frame("SAME DEFLECTION, DIFFERENT SECTION & MASS", "Pure bending comparison (δ = 5wL⁴ / 384EI); shear, buckling and connections checked separately", body, "Original calculation; illustrative section sizing (t = b/10), not a catalog product approval.");
}

// ── 9. Telescopic pole locking mechanisms ───────────────────────────────────
function telescopicLocks() {
  const card = (x, y, num, title, best, limit, art) => `
    <rect x="${x}" y="${y}" width="524" height="252" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
    <rect x="${x}" y="${y}" width="524" height="38" rx="10" fill="${TEAL_BG}"/>
    ${t(x + 18, y + 25, `${num}. ${title}`, { size: 16, weight: 600, fill: TEAL })}
    ${art}
    ${t(x + 18, y + 204, `Strength: ${best}`, { size: 13, weight: 600 })}
    ${t(x + 18, y + 228, `Watch-out: ${limit}`, { size: 13, fill: MUTED })}`;

  const body = `
    ${card(60, 130, "1", "Internal twist cam lock", "Clean outside profile; stepless length", "Hard to inspect wear; can slip if wet or over-torqued", `
      <rect x="92" y="204" width="220" height="58" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="2"/>
      <rect x="260" y="216" width="270" height="34" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
      <polygon points="212,216 254,209 254,257 212,250" fill="${AMBER_L}" stroke="${AMBER}" stroke-width="2"/>
      ${t(233, 276, "expanding cam wedge", { size: 12, fill: AMBER, anchor: "middle" })}
      ${t(405, 237, "inner tube twists to wedge", { size: 12.5, fill: TEAL, anchor: "middle" })}
    `)}
    ${card(616, 130, "2", "External flip / lever clamp", "Fast gloved operation; visible lock state", "Snag risk; excess clamp force can crush thin FRP walls", `
      <rect x="648" y="206" width="200" height="54" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="2"/>
      <rect x="840" y="217" width="250" height="32" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
      <rect x="826" y="198" width="44" height="70" rx="5" fill="${CHAR}"/>
      <path d="M848 198 L898 182 L904 192 L858 206 Z" fill="${AMBER}"/>
      ${t(930, 192, "cam lever", { size: 12, weight: 600, fill: AMBER })}
      ${t(848, 286, "split collar squeezes OD", { size: 12, fill: MUTED, anchor: "middle" })}
    `)}
    ${card(60, 410, "3", "Spring push-button (utility standard)", "Positive shear lock; no slip under axial load", "Fixed length steps; needs non-round tube to keep holes aligned", `
      <rect x="92" y="486" width="240" height="56" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="2"/>
      <rect x="190" y="497" width="330" height="34" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
      <rect x="242" y="476" width="22" height="24" rx="4" fill="${AMBER}"/>
      <path d="M232 514 Q253 502 274 514" fill="none" stroke="${INK}" stroke-width="2.5"/>
      ${t(253, 470, "solid polymer button locks into hole", { size: 12, weight: 600, fill: AMBER, anchor: "middle" })}
      ${t(400, 518, "ASTM F1826 hot sticks", { size: 12.5, fill: TEAL, anchor: "middle" })}
    `)}
    ${card(616, 410, "4", "Threaded compression collet", "360° even grip; sheds grit better than cams", "Slower to adjust; sand in threads binds nut", `
      <rect x="648" y="486" width="200" height="56" fill="${STEEL_L}" stroke="${STEEL}" stroke-width="2"/>
      <rect x="840" y="498" width="250" height="32" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="2"/>
      <rect x="826" y="478" width="54" height="72" rx="4" fill="${TEAL}" opacity="0.88"/>
      ${[836, 848, 860, 872].map((lx) => `<line x1="${lx}" y1="482" x2="${lx}" y2="546" stroke="#ffffff" stroke-width="1.5" opacity="0.55"/>`).join("")}
      ${t(853, 568, "knurled nut compresses split collet", { size: 12, fill: MUTED, anchor: "middle" })}
    `)}`;
  return frame("TELESCOPIC FIBERGLASS POLE LOCKING MECHANISMS", "How nested FRP tubes lock—and what each mechanism demands from tube tolerances", body, "Original schematic; proportions illustrative. Live-line tools require qualified ASTM F711 / F1826 assemblies.");
}

// ── 10. F1 Catalog Round-Tube Nesting Stack & Clearances ────────────────────
function telescopicNesting() {
  // 5-stage nested stack directly from lib/catalog/standardProfiles.ts:
  // CHS 76x6.4 (ID 63.2) -> CHS 60x5 (OD 60, ID 50) -> CHS 42x4 (OD 42, ID 34) -> CHS 32x3 (OD 32, ID 26) -> CHS 25x3 (OD 25)
  const rings = [
    { od: 76, t: 6.4, name: "CHS 76×6.4", gap: "" },
    { od: 60, t: 5, name: "CHS 60×5", gap: "1.6 mm radial gap" },
    { od: 42, t: 4, name: "CHS 42×4", gap: "4.0 mm radial gap" },
    { od: 32, t: 3, name: "CHS 32×3", gap: "1.0 mm radial gap" },
    { od: 25, t: 3, name: "CHS 25×3", gap: "0.5 mm radial gap" },
  ];
  const cx = 290, cy = 400, scale = 4.5;
  const concentric = rings.map((r, i) => {
    const rOut = (r.od / 2) * scale;
    const rIn = ((r.od - 2 * r.t) / 2) * scale;
    const fill = i % 2 === 0 ? TEAL_L : STEEL_L;
    const stroke = i % 2 === 0 ? TEAL : STEEL;
    return `<circle cx="${cx}" cy="${cy}" r="${rOut.toFixed(1)}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
            <circle cx="${cx}" cy="${cy}" r="${rIn.toFixed(1)}" fill="#ffffff" stroke="${stroke}" stroke-width="1.4"/>`;
  }).join("");

  const rows = [
    ["CHS 76×6.4 → CHS 60×5", "63.2 → 60.0 mm", "1.6 mm", "Fits polymer bushing or collet"],
    ["CHS 60×5 → CHS 42×4", "50.0 → 42.0 mm", "4.0 mm", "Wide gap; needs stepped sleeve"],
    ["CHS 50×4 → CHS 38×3.2", "42.0 → 38.0 mm", "2.0 mm", "Good sleeve / collet clearance"],
    ["CHS 42×4 → CHS 32×3", "34.0 → 32.0 mm", "1.0 mm", "Close slip fit; check ovality"],
    ["CHS 32×3 → CHS 25×3", "26.0 → 25.0 mm", "0.5 mm", "Tight; verify OD/ID tolerance"],
    ["CHS 89×6.4 → CHS 76×6.4", "76.2 → 76.0 mm", "0.1 mm", "Too tight raw; step down to Ø70"],
  ];

  const table = rows.map(([pair, , rad, note], i) => {
    const y = 212 + i * 52;
    const tight = rad === "0.1 mm";
    return `<rect x="550" y="${y}" width="590" height="44" rx="5" fill="${tight ? "#fdf7f2" : i % 2 ? "#f8fafb" : "#ffffff"}" stroke="${tight ? AMBER : LINE}"/>
      ${t(564, y + 27, pair, { size: 13.5, weight: 600, fill: tight ? AMBER : TEAL })}
      ${t(752, y + 27, rad, { size: 13.5, weight: 600, fill: tight ? AMBER : INK })}
      ${t(826, y + 27, note, { size: 13, fill: MUTED })}`;
  }).join("");

  const body = `
    ${t(290, 144, "5-section nested stack from F1 catalog round tubes", { size: 16, weight: 600, anchor: "middle" })}
    ${t(290, 166, "Nominal cross-section (drawn to scale)", { size: 13, fill: MUTED, anchor: "middle" })}
    ${concentric}
    ${t(290, 610, "Outer Ø76 mm down to Ø25 mm", { size: 14, weight: 600, anchor: "middle" })}
    ${t(290, 632, "Nominal ID = OD − 2 × wall; verify real tolerances", { size: 13, fill: MUTED, anchor: "middle" })}

    ${t(550, 152, "Nominal radial clearance = (Outer ID − Inner OD) / 2", { size: 16, weight: 600 })}
    ${t(564, 194, "CATALOG TUBE PAIR", { size: 11.5, weight: 600, fill: MUTED })}
    ${t(752, 194, "RADIAL", { size: 11.5, weight: 600, fill: MUTED })}
    ${t(826, 194, "FIT GUIDANCE", { size: 11.5, weight: 600, fill: MUTED })}
    ${table}

    <!-- Overlap bar -->
    <rect x="550" y="544" width="590" height="114" rx="8" fill="${TEAL_BG}" stroke="${TEAL}" stroke-opacity="0.35"/>
    ${t(570, 574, "Why overlap length controls pole stiffness", { size: 15, weight: 600, fill: TEAL })}
    <rect x="570" y="592" width="190" height="24" fill="${STEEL_L}" stroke="${STEEL}"/>
    <rect x="690" y="597" width="180" height="14" fill="${TEAL_L}" stroke="${TEAL}"/>
    ${dim(690, 634, 760, 634, "overlap", 0, 15)}
    ${t(890, 602, "Typical rule: 10–15% of section", { size: 13, fill: MUTED })}
    ${t(890, 622, "length engaged (≥3–5× outer OD).", { size: 13, fill: MUTED })}`;
  return frame("TELESCOPIC FIBERGLASS TUBE NESTING (F1 CATALOG)", "Exact nominal clearances computed from F1 pultruded round tubes—and why 0.1 mm gaps jam", body, "Original calculation from lib/catalog/standardProfiles.ts. F1 supplies pultruded tubes, not finished poles; confirm tolerances on drawing.");
}

// ── 11. Bendable rods: FIXED smooth polyline arc ────────────────────────────
function bendMechanics() {
  const cx = 360, cy = 620, R = 270, half = 17;
  const deg = (a) => (a * Math.PI) / 180;
  const X = (r, a) => cx + r * Math.cos(deg(a));
  const Y = (r, a) => cy + r * Math.sin(deg(a));
  const body = `
    <path d="${polyArc(cx, cy, R, 200, 340)}" fill="none" stroke="${TEAL_L}" stroke-width="${half * 2}"/>
    <path d="${polyArc(cx, cy, R + half, 200, 340)}" fill="none" stroke="${AMBER}" stroke-width="3.2"/>
    <path d="${polyArc(cx, cy, R - half, 200, 340)}" fill="none" stroke="${TEAL}" stroke-width="3.2"/>
    <path d="${polyArc(cx, cy, R, 200, 340)}" fill="none" stroke="${MUTED}" stroke-width="1.6" stroke-dasharray="7 5"/>
    <circle cx="${cx}" cy="${cy}" r="4.5" fill="${INK}"/>
    <line x1="${cx}" y1="${cy}" x2="${X(R, 245).toFixed(1)}" y2="${Y(R, 245).toFixed(1)}" stroke="${INK}" stroke-width="1.6" marker-end="url(#d)"/>
    ${t(cx + 14, cy + 5, "center of bend", { size: 13.5, fill: MUTED })}
    ${t(278, 514, "R", { size: 22, weight: 600 })}

    ${leader(656, 286, X(R + half, 304).toFixed(1), Y(R + half, 304).toFixed(1))}${t(666, 284, "outer surface stretched", { size: 14.5, weight: 600 })}${t(666, 304, "tension strain ε = d / (2R)", { size: 14, fill: AMBER })}
    ${leader(656, 404, X(R - half, 322).toFixed(1), Y(R - half, 322).toFixed(1))}${t(666, 402, "inner surface compressed", { size: 14.5, weight: 600 })}${t(666, 422, "equal magnitude, opposite sign", { size: 14, fill: MUTED })}
    ${leader(190, 260, X(R, 232).toFixed(1), Y(R, 232).toFixed(1))}${t(74, 254, "neutral axis: zero strain", { size: 14.5, weight: 600 })}

    <circle cx="1010" cy="212" r="52" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="3"/>
    <line x1="958" y1="212" x2="1062" y2="212" stroke="${MUTED}" stroke-dasharray="6 4"/>
    <line x1="1086" y1="160" x2="1086" y2="264" stroke="${INK}" stroke-width="1.3" marker-start="url(#d)" marker-end="url(#d)"/>
    ${t(1098, 218, "d", { size: 18, weight: 600 })}
    ${t(1010, 292, "solid rod section", { size: 13, fill: MUTED, anchor: "middle" })}

    <rect x="676" y="476" width="464" height="190" rx="8" fill="#f3f6f7" stroke="${LINE}"/>
    ${t(700, 516, "Surface strain    ε = d / (2R)", { size: 16.5, weight: 600 })}
    ${t(700, 548, "Surface stress    σ = E · ε = E · d / (2R)", { size: 16.5, weight: 600 })}
    ${t(700, 586, "Minimum radius  R_min = E · d / (2 σ_allow)", { size: 16.5, weight: 600, fill: TEAL })}
    ${t(700, 620, "Half the diameter cuts minimum bend radius in half.", { size: 14, fill: MUTED })}
    ${t(700, 644, "Thermoset glass rod is elastic: it springs back straight.", { size: 14, fill: MUTED })}`;
  return frame("HOW FAR A FIBERGLASS ROD CAN BEND", "Outer-surface strain sets the limit, and it scales linearly with rod diameter", body, "Original schematic; proportions illustrative. Pure Euler-Bernoulli bending; fiberglass does not hold a permanent bend.");
}

// ── 12. Bendable rods: R_min chart for all 16 F1 solid rod diameters ────────
function bendChart() {
  const E = 23000, F = 240;
  const RODS = [6, 8, 10, 12, 13, 16, 19, 20, 22, 25, 28, 30, 32, 38, 40, 50];
  const rMin = (d, sigma) => (E * d) / (2 * sigma);
  const fmt = (mm) => (Math.round(mm / 10) / 100).toFixed(2);
  const x0 = 200, wMax = 820, maxR = 12000, top = 152, row = 31;
  const sx = (r) => x0 + (r / maxR) * wMax;
  const grid = [0, 2000, 4000, 6000, 8000, 10000, 12000].map((r) => `<line x1="${sx(r)}" y1="${top - 10}" x2="${sx(r)}" y2="${top + RODS.length * row}" stroke="${LINE}"/>${t(sx(r), top + RODS.length * row + 22, `${r / 1000} m`, { size: 13, fill: MUTED, anchor: "middle" })}`).join("");
  const bars = RODS.map((d, i) => {
    const y = top + i * row;
    const rs = rMin(d, 0.2 * F), rm = rMin(d, F / 2);
    return `${t(x0 - 14, y + 19, `Ø${d} mm`, { size: 14, weight: 600, anchor: "end" })}
      <rect x="${x0}" y="${y + 5}" width="${(sx(rs) - x0).toFixed(1)}" height="20" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="1"/>
      <rect x="${x0}" y="${y + 5}" width="${(sx(rm) - x0).toFixed(1)}" height="20" fill="${TEAL}"/>
      ${t(sx(rs) + 8, y + 20, `${fmt(rm)} / ${fmt(rs)} m`, { size: 12.5, fill: MUTED })}`;
  }).join("");
  const legend = `
    <rect x="${x0}" y="118" width="16" height="12" fill="${TEAL}"/>${t(x0 + 22, 129, "momentary bend, SF = 2 (120 MPa)", { size: 13 })}
    <rect x="${x0 + 310}" y="118" width="16" height="12" fill="${TEAL_L}" stroke="${TEAL}"/>${t(x0 + 332, 129, "held bent long-term, 20% strength (48 MPa)", { size: 13 })}`;
  return frame("MINIMUM BEND RADIUS FOR F1 SOLID FIBERGLASS RODS", "R_min = E · d / (2 σ_allow), E = 23 GPa, flexural strength 240 MPa (EN 13706 E23)", grid + legend + bars, "Original chart from F1 catalog diameters and E23 minimums. Unidirectional rod laminates with higher tested strength bend tighter.");
}

const figures = [
  ["public/images/covers/blog/phenolic-resin-condensation-voids.webp", phenolicVoids],
  ["public/images/covers/blog/phenolic-vs-polyester-fire-char.webp", phenolicFire],
  ["public/images/covers/blog/isophthalic-vs-orthophthalic-backbone.webp", isoVsOrtho],
  ["public/images/covers/blog/isophthalic-resin-selection-ladder.webp", isoLadder],
  ["public/images/covers/blog/vacuum-infusion-bag-stack-schematic.webp", infusionStack],
  ["public/images/covers/blog/vacuum-infusion-darcy-fill-time.webp", infusionDarcy],
  ["public/images/covers/blog/fiberglass-vs-carbon-specific-stiffness.webp", glassVsCarbonBars],
  ["public/images/covers/blog/fiberglass-vs-carbon-equal-deflection-beam.webp", glassVsCarbonBeam],
  ["public/images/covers/blog/telescopic-pole-locking-mechanisms.webp", telescopicLocks],
  ["public/images/covers/blog/telescopic-tube-nesting-clearance.webp", telescopicNesting],
  ["public/images/covers/blog/bendable-fiberglass-rod-bend-radius-strain.webp", bendMechanics],
  ["public/images/covers/blog/bendable-fiberglass-rod-min-radius-chart.webp", bendChart],
];

for (const [out, draw] of figures) {
  mkdirSync(dirname(out), { recursive: true });
  await sharp(Buffer.from(draw())).webp({ quality: 86 }).toFile(out);
  console.log("wrote", out);
}
