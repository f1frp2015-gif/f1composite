// node scripts/covers/draw-third-rail-coverboard-figures.mjs
// Draws the four schematic figures for /products/frp-third-rail-coverboards (1200x750 WebP):
//   coverboard-run          an oblique view of a covered conductor-rail run, cover cut away at one end
//   contact-arrangements    top-, bottom- and side-contact rails and where the cover sits on each
//   section-anatomy         the features a coverboard section drawing has to fix
//   cover-family            which covers along a run are pultruded and which are molded
// Original schematics. No dimension, clearance or arrangement is taken from an operator's drawing.
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", AMBER = "#c2610c";
const COVER = "#e9b824", COVER_DARK = "#b88a06", COVER_LIGHT = "#f4d266";
const STEEL = "#8a949b", STEEL_DARK = "#59636b", STEEL_LIGHT = "#b4bcc2";
const INSUL = "#ddd5b5", INSUL_DARK = "#8c8362", MOLD = "#7f93a6", MOLD_DARK = "#56697b", GROUND = "#eef1f3";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const OUT = "public/images/products/third-rail-coverboards";
mkdirSync(OUT, { recursive: true });

const t = (x, y, s, opts = {}) => `<text x="${x}" y="${y}" ${font} font-size="${opts.size ?? 15}" font-weight="${opts.weight ?? 400}" fill="${opts.fill ?? INK}"${opts.anchor ? ` text-anchor="${opts.anchor}"` : ""}${opts.spacing ? ` letter-spacing="${opts.spacing}"` : ""}>${s}</text>`;
const leader = (pts) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${MUTED}" stroke-width="1.5"/><circle cx="${pts.at(-1)[0]}" cy="${pts.at(-1)[1]}" r="3" fill="${MUTED}"/>`;

function frame(heading, sub, body, footer) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L8 4.5L0 9Z" fill="${AMBER}"/></marker>
    <marker id="dim" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0 0L8 4L0 8Z" fill="${INK}"/></marker>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="60" y="58" ${font} font-size="20" font-weight="600" fill="${TEAL}" letter-spacing="2">${heading}</text>
  <text x="60" y="88" ${font} font-size="17" fill="${MUTED}">${sub}</text>
  ${body}
  <line x1="60" y1="696" x2="1140" y2="696" stroke="${LINE}"/>
  <text x="60" y="724" ${font} font-size="15" fill="${MUTED}">${footer}</text>
</svg>`;
}

// ---------------------------------------------------------------- FIG: covered run, oblique view
// x runs along the track, y across it (0 = track side), z up. Millimetres, schematic proportions.
function coverboardRun() {
  const S = 0.4, OX = 62, OY = 566;
  const P = (x, y, z) => [OX + S * (x * 0.93 + y * 0.42), OY + S * (-x * 0.2 - y * 0.34 - z)];
  const VIEW = [-1, 2.214, -0.553]; // into the scene; a face is visible when its normal opposes it
  const faces = [];
  const shade = { top: 0, front: 1, end: 2 };
  // Extrude a closed (y, z) polygon from x0 to x1. Faces are painted far to near.
  function prism(poly, x0, x1, colors, order = 0) {
    for (let i = 0; i < poly.length; i++) {
      const [ya, za] = poly[i], [yb, zb] = poly[(i + 1) % poly.length];
      const ny = zb - za, nz = -(yb - ya); // outward for a clockwise polygon in (y, z)
      if (ny * VIEW[1] + nz * VIEW[2] >= 0) continue;
      const tone = Math.abs(nz) > Math.abs(ny) ? shade.top : shade.front;
      faces.push({ pts: [P(x0, ya, za), P(x1, ya, za), P(x1, yb, zb), P(x0, yb, zb)], fill: colors[tone], depth: ((ya + yb) / 2) * VIEW[1] + ((za + zb) / 2) * VIEW[2] + ((x0 + x1) / 2) * VIEW[0], order });
    }
    faces.push({ pts: poly.map(([y, z]) => P(x1, y, z)), fill: colors[shade.end], depth: poly.reduce((s, [y, z]) => s + y * VIEW[1] + z * VIEW[2], 0) / poly.length + x1 * VIEW[0] - 1, order });
  }
  const box = (y0, y1, z0, z1) => [[y0, z0], [y0, z1], [y1, z1], [y1, z0]];
  const concrete = ["#dfe3e6", "#c9cfd3", "#b9c0c5"], steel = [STEEL_LIGHT, STEEL, STEEL_DARK], insul = ["#ece6cb", INSUL, INSUL_DARK], cover = [COVER_LIGHT, COVER, COVER_DARK];
  const railPoly = [[70, 120], [70, 150], [106, 150], [106, 232], [80, 232], [80, 270], [160, 270], [160, 232], [134, 232], [134, 150], [170, 150], [170, 120]];
  // Hood: back leg, top, chamfered shoulder and a short front lip; 12 mm drawn wall.
  const hood = [[352, 250], [352, 452], [80, 452], [20, 410], [20, 360], [32, 360], [32, 404], [84, 440], [340, 440], [340, 250]];
  const sleeve = [[366, 236], [366, 466], [76, 466], [6, 418], [6, 348], [20, 348], [20, 412], [80, 452], [352, 452], [352, 236]];
  const ties = [260, 1060, 1860];
  const END = 1500;
  for (const x of ties) {
    prism(box(-40, 450, -70, 0), x - 120, x + 120, concrete, 0);
    prism(box(72, 168, 0, 120), x - 62, x + 62, insul, 1);
    prism(box(386, 414, 0, 440), x - 24, x + 24, steel, 1);
    prism(box(90, 414, 440, 452).map(([y, z]) => [y, z - 12]), x - 24, x + 24, steel, x > END ? 3 : 1);
  }
  prism(railPoly, 0, 2360, ["#aab3b9", "#737e86", "#4c565d"], 2);
  prism(hood, 0, 742, cover, 4);
  prism(hood, 758, END, cover, 4);
  prism(sleeve, 660, 840, [COVER_LIGHT, "#dba90f", COVER_DARK], 5);
  faces.sort((a, b) => a.order - b.order || b.depth - a.depth);
  const scene = faces.map((f) => `<polygon points="${f.pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="${f.fill}" stroke="#3b4449" stroke-width="0.8" stroke-linejoin="round"/>`).join("");
  const at = (x, y, z) => P(x, y, z).map((v) => Math.round(v));
  const ground = `<polygon points="${[P(-150, -260, -70), P(2500, -260, -70), P(2500, 600, -70), P(-150, 600, -70)].map((p) => p.join(",")).join(" ")}" fill="${GROUND}"/>`;
  // Collector shoe on the exposed rail head, reaching in from the track side.
  const shoe = `<polygon points="${[P(2080, 84, 270), P(2230, 84, 270), P(2230, 156, 270), P(2080, 156, 270)].map((p) => p.join(",")).join(" ")}" fill="${AMBER}" stroke="#7a3d08" stroke-width="1"/>
  <polyline points="${[P(2155, 84, 276), P(2155, -200, 276)].map((p) => p.join(",")).join(" ")}" stroke="${AMBER}" stroke-width="7" fill="none"/>`;
  const a = { cover: at(300, 200, 452), sleeve: at(750, 40, 440), bracket: at(1860, 414, 300), rail: at(1700, 70, 200), insulator: at(1860, 72, 60), shoe: at(2155, -150, 276) };
  const labels = `
  ${leader([[250, 196], [250, 236], a.cover])}${t(60, 170, "Pultruded FRP coverboard", { size: 17, weight: 700, fill: TEAL })}${t(60, 190, "one constant section, cut to length", { size: 14, fill: MUTED })}
  ${leader([[560, 536], [470, 536], a.sleeve])}${t(568, 532, "Joint sleeve", { size: 16, weight: 700 })}${t(568, 552, "laps two lengths, leaves room to expand", { size: 14, fill: MUTED })}
  ${leader([[1006, 196], [1006, 240], a.bracket])}${t(870, 170, "Cover bracket", { size: 16, weight: 700 })}${t(870, 190, "carries the cover, not the rail", { size: 14, fill: MUTED })}
  ${leader([[900, 470], [810, 470], a.rail])}${t(908, 466, "Conductor rail", { size: 16, weight: 700 })}${t(908, 486, "shown where the cover is cut away", { size: 14, fill: MUTED })}
  ${leader([[930, 584], [860, 584], a.insulator])}${t(938, 580, "Rail insulator", { size: 16, weight: 700 })}${t(938, 600, "a separate, separately qualified part", { size: 14, fill: MUTED })}
  ${leader([[1012, 372], a.shoe])}${t(1020, 378, "Collector shoe", { size: 16, weight: 700, fill: AMBER })}`;
  const body = `${ground}${scene}${shoe}${labels}
  ${t(60, 668, "Top-contact arrangement drawn; bottom- and side-contact rails take a different section. Wall thickness is exaggerated.", { size: 14, fill: MUTED })}`;
  return frame("A COVERED CONDUCTOR-RAIL RUN", "The coverboard is one part of the assembly: brackets, joints and the collector envelope decide its section.", body, "Schematic, not to scale. No dimension or clearance here is an operator's requirement; the contact-rail drawing governs.");
}

// ---------------------------------------------------------------- FIG: three contact arrangements
function contactArrangements() {
  const panel = (x, title, sub, art, notes) => `
  <rect x="${x}" y="116" width="340" height="556" rx="8" fill="#f7f9fa" stroke="${LINE}"/>
  ${t(x + 20, 150, title, { size: 19, weight: 700 })}${t(x + 20, 173, sub, { size: 14, fill: MUTED })}
  <g transform="translate(${x},190)">${art}</g>
  ${notes.map((n, i) => t(x + 20, 580 + i * 22, n, { size: 14, fill: i === 0 ? TEAL : INK, weight: i === 0 ? 700 : 400 })).join("")}`;
  const base = `<rect x="20" y="318" width="300" height="12" fill="#c9cfd3"/>${t(26, 356, "track side", { size: 13, fill: MUTED })}${t(314, 356, "field side", { size: 13, fill: MUTED, anchor: "end" })}`;
  const coverPath = (d) => `<path d="${d}" fill="none" stroke="${COVER_DARK}" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${COVER}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>`;
  const rail = (cx, top, flip = false) => {
    // Flat-bottom rail outline, 70 wide head down to a 96 wide foot, 96 tall.
    const pts = [[-24, 0], [24, 0], [24, 26], [8, 34], [8, 78], [48, 84], [48, 96], [-48, 96], [-48, 84], [-8, 78], [-8, 34], [-24, 26]];
    return `<polygon points="${pts.map(([px, py]) => `${cx + px},${top + (flip ? 96 - py : py)}`).join(" ")}" fill="#737e86" stroke="#3b4449" stroke-width="1.5"/>`;
  };
  const insulator = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${INSUL}" stroke="${INSUL_DARK}" stroke-width="1.5"/>${[0.3, 0.55, 0.8].map((f) => `<line x1="${x - 5}" y1="${y + h * f}" x2="${x + w + 5}" y2="${y + h * f}" stroke="${INSUL_DARK}" stroke-width="5" stroke-linecap="round"/>`).join("")}`;
  const steel = (d) => `<path d="${d}" fill="none" stroke="${STEEL}" stroke-width="9" stroke-linejoin="round"/>`;
  const shoe = (d, labelX, labelY) => `<path d="${d}" fill="none" stroke="${AMBER}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>${t(labelX, labelY, "shoe", { size: 13, fill: AMBER, weight: 700 })}`;
  const force = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${AMBER}" stroke-width="2.5" marker-end="url(#arr)"/>`;

  // Top contact: rail on a post insulator, shoe bears down, hood above on a field-side bracket.
  const top = `${base}
    ${insulator(152, 240, 56, 78)}${rail(180, 144)}
    ${steel("M288 318V76H210")}
    ${coverPath("M76 112V98L112 70H296V226")}
    ${shoe("M20 139H196", 24, 162)}${force(172, 92, 172, 128)}`;
  // Bottom contact: rail hangs head-down from an insulating bracket, shoe pushes up, cover wraps three sides.
  const bottom = `${base}
    ${steel("M288 318V60H180")}
    ${insulator(152, 64, 56, 52)}${rail(180, 116, true)}
    ${coverPath("M112 222V40H248V222")}
    ${shoe("M20 250H156V226H204", 24, 276)}${force(180, 274, 180, 238)}`;
  // Side contact: rail lies on its side against a bracket-mounted insulator, shoe presses across.
  const side = `${base}
    ${steel("M300 318V140H262")}
    ${insulator(212, 112, 50, 60).replaceAll("stroke-linecap=\"round\"", "stroke-linecap=\"round\" transform=\"rotate(90 237 142)\"")}
    <g transform="rotate(-90 164 142)">${rail(164, 94)}</g>
    ${coverPath("M100 82H318V236")}
    ${shoe("M20 142H104V118V166", 24, 132)}${force(52, 176, 96, 176)}`;
  const body = `
  ${panel(60, "Top contact", "shoe runs on the top of the rail", top, ["Cover: a hood above the rail", "Open on the track side for the shoe arm.", "Check: shoe and arm clearance under", "the hood, snow and ice load on top."])}
  ${panel(430, "Bottom contact", "shoe runs on the underside", bottom, ["Cover: wraps top and both sides", "The rail hangs from insulating brackets.", "Check: bracket notches, lower edge", "position, fit over rail joints."])}
  ${panel(800, "Side contact", "shoe presses on the rail face", side, ["Cover: top and field side", "The contact face stays open to the track.", "Check: shoe sweep at the open side,", "returns that stiffen the free edge."])}`;
  return frame("WHERE THE COVERBOARD SITS ON THREE KINDS OF CONDUCTOR RAIL", "Yellow: the FRP cover. Amber: collector shoe and contact force. Grey: rail and steelwork. Cream: insulator.", body, "Schematic, not to scale. Each operator's rail, insulator, bracket and collector envelope is different; the section is drawn to that envelope.");
}

// ---------------------------------------------------------------- FIG: section anatomy
function sectionAnatomy() {
  // Hood centreline, drawn as a 14 px stroke so the wall is constant around every bend.
  const d = "M196 520 L176 520 Q160 520 160 504 L160 268 Q160 240 184 226 L262 178 Q276 170 292 170 L560 170 Q588 170 588 198 L588 504 Q588 520 572 520 L552 520";
  const dimH = (x1, x2, y, label) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${INK}" stroke-width="1.3" marker-start="url(#dim)" marker-end="url(#dim)"/><rect x="${(x1 + x2) / 2 - 20}" y="${y - 12}" width="40" height="24" fill="#fff"/>${t((x1 + x2) / 2, y + 6, label, { size: 17, weight: 700, anchor: "middle" })}`;
  const dimV = (x, y1, y2, label) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${INK}" stroke-width="1.3" marker-start="url(#dim)" marker-end="url(#dim)"/><rect x="${x - 14}" y="${(y1 + y2) / 2 - 14}" width="28" height="28" fill="#fff"/>${t(x, (y1 + y2) / 2 + 6, label, { size: 17, weight: 700, anchor: "middle" })}`;
  const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="4 4"/>`;
  const tag = (n, x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="${TEAL}"/>${t(x, y + 5, n, { size: 14, weight: 700, fill: "#fff", anchor: "middle" })}`;
  const rows = [
    ["A · B", "Outside width and depth", "set by the rail, bracket and collector envelope"],
    ["t", "Wall, constant around every bend", "one thickness; local pads only where the die allows"],
    ["1", "Shoulder chamfer or radius", "sheds water and snow, clears the shoe arm"],
    ["2", "Inside corner radii", "generous radii keep the mat in the corner"],
    ["3", "Bracket seat", "the flat the bracket bears on; a datum on the drawing"],
    ["4", "Returned lips", "stiffen the free edges, give a clip something to hold"],
    ["5", "Envelope kept clear", "rail, joints and shoe sweep, after tolerance and sag"],
  ];
  const body = `
  <rect x="60" y="116" width="620" height="556" rx="8" fill="#f7f9fa" stroke="${LINE}"/>
  <rect x="268" y="262" width="214" height="258" fill="none" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="8 6"/>
  ${t(375, 396, "keep-clear envelope", { size: 14, fill: AMBER, anchor: "middle" })}${t(375, 416, "rail · joints · shoe", { size: 13, fill: AMBER, anchor: "middle" })}
  <path d="${d}" fill="none" stroke="${COVER_DARK}" stroke-width="17" stroke-linejoin="round"/>
  <path d="${d}" fill="none" stroke="${COVER}" stroke-width="13" stroke-linejoin="round"/>
  <line x1="330" y1="170" x2="540" y2="170" stroke="${TEAL}" stroke-width="5"/>
  ${ext(153, 540, 153, 610)}${ext(595, 540, 595, 610)}${dimH(153, 595, 600, "A")}
  ${ext(600, 163, 652, 163)}${ext(600, 527, 652, 527)}${dimV(640, 163, 527, "B")}
  <line x1="110" y1="380" x2="152" y2="380" stroke="${INK}" stroke-width="1.3" marker-end="url(#dim)"/><line x1="200" y1="380" x2="168" y2="380" stroke="${INK}" stroke-width="1.3" marker-end="url(#dim)"/>${t(96, 386, "t", { size: 17, weight: 700, anchor: "middle" })}
  ${tag(1, 208, 172)}${tag(2, 550, 208)}${tag(3, 435, 142)}${tag(4, 196, 556)}${tag(4, 552, 556)}${tag(5, 482, 290)}
  ${t(716, 146, "What the section drawing fixes", { size: 18, weight: 700 })}
  ${rows.map(([k, title, note], i) => `<line x1="716" y1="${166 + i * 70}" x2="1140" y2="${166 + i * 70}" stroke="${LINE}"/>${k.length > 1 ? t(716, 196 + i * 70, k, { size: 16, weight: 700, fill: INK }) : (/\d/.test(k) ? tag(k, 730, 190 + i * 70) : t(730, 196 + i * 70, k, { size: 17, weight: 700, anchor: "middle" }))}${t(770, 194 + i * 70, title, { size: 16, weight: 700 })}${t(770, 216 + i * 70, note, { size: 14, fill: MUTED })}`).join("")}`;
  return frame("ANATOMY OF A PULTRUDED COVERBOARD SECTION", "A hood section for a top- or bottom-contact rail. The die makes this shape continuously; every feature runs the full length.", body, "Schematic, not to scale and not a stock section. Letters and numbers are callouts, not dimensions.");
}

// ---------------------------------------------------------------- FIG: cover family along a run
function coverFamily() {
  const y = 372; // rail top
  const railLine = `<path d="M70 ${y + 74} L250 ${y} H640" stroke="#59636b" stroke-width="16" fill="none" stroke-linejoin="round"/><path d="M668 ${y} H1130" stroke="#59636b" stroke-width="16" fill="none"/>`;
  const insul = [300, 470, 600, 720, 880, 1040].map((x) => `<rect x="${x - 12}" y="${y + 8}" width="24" height="52" rx="3" fill="${INSUL}" stroke="${INSUL_DARK}"/>`).join("") + `<rect x="150" y="${y + 50}" width="24" height="42" rx="3" fill="${INSUL}" stroke="${INSUL_DARK}" transform="rotate(-22 162 ${y + 70})"/>`;
  const ground = `<rect x="60" y="${y + 60}" width="1080" height="14" fill="#c9cfd3"/>`;
  const pult = (x, w, label) => `<rect x="${x}" y="${y - 78}" width="${w}" height="46" rx="3" fill="${COVER}" stroke="${COVER_DARK}" stroke-width="1.5"/><line x1="${x}" y1="${y - 64}" x2="${x + w}" y2="${y - 64}" stroke="${COVER_DARK}" stroke-width="1" opacity="0.6"/>${label ? t(x + w / 2, y - 48, label, { size: 13, weight: 700, anchor: "middle", fill: "#5a4300" }) : ""}`;
  const sleeve = (x) => `<rect x="${x - 26}" y="${y - 86}" width="52" height="60" rx="3" fill="#dba90f" stroke="${COVER_DARK}" stroke-width="1.5"/>`;
  const ramp = `<polygon points="70,${y + 26} 256,${y - 78} 256,${y - 32} 70,${y + 66}" fill="${MOLD}" stroke="${MOLD_DARK}" stroke-width="1.5"/>`;
  const expansion = `<path d="M612 ${y - 32} V${y - 84} H630 V${y - 96} H642 V${y - 84} H654 V${y - 96} H666 V${y - 84} H678 V${y - 96} H690 V${y - 84} H704 V${y - 32} Z" fill="${MOLD}" stroke="${MOLD_DARK}" stroke-width="1.5"/>`;
  const cable = `<path d="M880 ${y - 32} V${y - 110} H960 V${y - 32} Z" fill="${MOLD}" stroke="${MOLD_DARK}" stroke-width="1.5"/><path d="M920 ${y + 8} C920 ${y + 60} 960 ${y + 40} 990 ${y + 96}" stroke="#3b4449" stroke-width="7" fill="none"/>`;
  const gap = `<rect x="640" y="${y - 8}" width="28" height="16" fill="#fff"/>`;
  const note = (x, tx, title, lines, colour, anchorY) => `${leader([[x, 552], [x, 524], [tx, 524], [tx, anchorY]])}<rect x="${x - 102}" y="552" width="204" height="112" rx="6" fill="#f7f9fa" stroke="${LINE}"/><rect x="${x - 102}" y="552" width="6" height="112" fill="${colour}"/>${t(x - 82, 578, title, { size: 15, weight: 700 })}${lines.map((l, i) => t(x - 82, 600 + i * 19, l, { size: 13, fill: i === lines.length - 1 ? (colour === COVER ? "#8a6500" : MOLD_DARK) : MUTED, weight: i === lines.length - 1 ? 700 : 400 })).join("")}`;
  const body = `
  <rect x="60" y="116" width="16" height="16" rx="3" fill="${COVER}" stroke="${COVER_DARK}"/>${t(86, 130, "Pultruded: one constant section, any cut length", { size: 15, weight: 700 })}
  <rect x="470" y="116" width="16" height="16" rx="3" fill="${MOLD}" stroke="${MOLD_DARK}"/>${t(496, 130, "Molded or fabricated: the shape changes along its length", { size: 15, weight: 700 })}
  ${t(60, 176, "Side elevation of one conductor-rail run, left to right: end approach, straight track, expansion joint, feeder cable connection.", { size: 15, fill: MUTED })}
  ${ground}${insul}${railLine}${gap}${ramp}
  ${pult(262, 170, "straight cover")}${pult(446, 160, "")}${sleeve(439)}${expansion}${pult(710, 166, "straight cover")}${cable}${pult(964, 166, "")}
  ${note(162, 165, "End-approach cover", ["follows the ramp where", "the shoe runs on and off", "molded · quoted separately"], MOLD, y - 20)}
  ${note(381, 347, "Straight coverboard", ["most of every run, cut and", "drilled to the bracket pitch", "pultruded · F1 die"], COVER, y - 30)}
  ${note(600, 439, "Joint sleeve", ["laps two lengths; a second", "section of the same family", "pultruded · second die"], COVER, y - 24)}
  ${note(819, 658, "Expansion-joint cover", ["spans the rail gap and", "lets both sides move", "molded · quoted separately"], MOLD, y - 30)}
  ${note(1038, 920, "Cable-connection cover", ["box over the feeder lug", "and its fasteners", "molded · quoted separately"], MOLD, y - 30)}`;
  return frame("THE COVERS ALONG ONE CONDUCTOR-RAIL RUN", "Straight covers and their joint sleeves are the pultruded parts; transitions are molded and listed as separate items.", body, "Schematic, not to scale. Which accessory covers a system needs, and their shapes, come from the contact-rail supplier's drawings.");
}

const figures = { "frp-third-rail-coverboard-run": coverboardRun(), "third-rail-contact-arrangements-cover-position": contactArrangements(), "pultruded-coverboard-section-anatomy": sectionAnatomy(), "third-rail-cover-family-pultruded-molded": coverFamily() };
for (const [name, svg] of Object.entries(figures)) {
  await sharp(Buffer.from(svg), { density: 144 }).resize(W * 2 > 2400 ? W : 1600).webp({ quality: 88 }).toFile(`${OUT}/${name}.webp`);
  console.log(`${name}.webp`);
}
