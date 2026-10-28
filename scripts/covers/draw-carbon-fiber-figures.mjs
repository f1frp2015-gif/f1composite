// node scripts/covers/draw-carbon-fiber-figures.mjs
// Draws the schematic figures shared by the pultruded carbon fiber tube and rod pages
// (1200x750 WebP, white ground, brand teal #0f766e, graphite text) with sharp: hollow against
// solid sections at equal mass and equal outside diameter, specific stiffness of CFRP against
// GFRP, aluminium and steel, and what fiber direction does for a tube. Schematic, not to scale;
// class values from published ranges, not a datasheet.
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", CARBON = "#2b3136", CARBON_LIGHT = "#596269", AMBER = "#d97706";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const OUT = "public/images/products/carbon-fiber/figures";

function frame(heading, sub, body, footer) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="90" y="64" ${font} font-size="20" font-weight="600" fill="${TEAL}" letter-spacing="2">${heading}</text>
  <text x="90" y="94" ${font} font-size="17" fill="${MUTED}">${sub}</text>
  ${body}
  <line x1="90" y1="696" x2="1110" y2="696" stroke="${LINE}"/>
  <text x="90" y="724" ${font} font-size="15" fill="${MUTED}">${footer}</text>
</svg>`;
}

// Figure: a Ø10 solid rod against a 14×10 tube (same mass) and a 10×7 tube (same OD), to one scale.
function hollowVsSolid() {
  const scale = 17, cy = 360;
  const sections = [
    { cx: 260, od: 10, id: 0, title: "Ø10 solid rod", lines: ["A = 78.5 mm² · I = 491 mm⁴", "reference: mass 1.00 · stiffness 1.00"] },
    { cx: 600, od: 14, id: 10, title: "Ø14 × Ø10 tube", lines: ["A = 75.4 mm² · I = 1,395 mm⁴", "same mass · 2.8 × bending stiffness"], accent: true },
    { cx: 940, od: 10, id: 7, title: "Ø10 × Ø7 tube", lines: ["A = 40.1 mm² · I = 373 mm⁴", "same OD · 0.51 × mass · 0.76 × stiffness"] },
  ];
  let body = "";
  sections.forEach((s, i) => {
    const R = (s.od * scale) / 2, r = (s.id * scale) / 2;
    body += `<defs><radialGradient id="c${i}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="${CARBON_LIGHT}"/><stop offset="1" stop-color="${CARBON}"/></radialGradient></defs>
    <circle cx="${s.cx}" cy="${cy}" r="${R}" fill="url(#c${i})" stroke="${s.accent ? TEAL : INK}" stroke-width="${s.accent ? 4 : 2}"/>`;
    if (r > 0) body += `<circle cx="${s.cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`;
    body += `<text x="${s.cx}" y="${cy + R + 48}" text-anchor="middle" ${font} font-size="20" font-weight="700" fill="${s.accent ? TEAL : INK}">${s.title}</text>
    <text x="${s.cx}" y="${cy + R + 76}" text-anchor="middle" ${font} font-size="15" fill="${INK}">${s.lines[0]}</text>
    <text x="${s.cx}" y="${cy + R + 100}" text-anchor="middle" ${font} font-size="15" font-weight="${s.accent ? 700 : 400}" fill="${s.accent ? TEAL : MUTED}">${s.lines[1]}</text>`;
  });
  body += `<text x="600" y="160" text-anchor="middle" ${font} font-size="16" fill="${INK}">Bending stiffness is E × I; material placed far from the centre counts most. The bore is free space, not strength.</text>`;
  return frame("HOLLOW OR SOLID · WHAT THE SECTION DOES", "Three sections of the same unidirectional carbon laminate, drawn to one scale.", body, "Schematic, drawn to one scale. I = π(D⁴ − d⁴)/64 on nominal dimensions; wall stability, crushing at clamps and fittings still govern a thin tube.");
}

// Figure: longitudinal modulus divided by density for four materials a tube or rod is made of.
function specificStiffness() {
  const rows = [
    { name: "Pultruded carbon fiber (unidirectional)", e: "120–150 GPa", rho: "1.55 g/cm³", ratio: 87, color: TEAL, bold: true },
    { name: "Aluminium 6061-T6", e: "69 GPa", rho: "2.70 g/cm³", ratio: 26, color: "#8a949b" },
    { name: "Structural steel", e: "200 GPa", rho: "7.85 g/cm³", ratio: 25, color: "#8a949b" },
    { name: "Pultruded fiberglass (EN 13706 E23)", e: "23 GPa", rho: "1.90 g/cm³", ratio: 12, color: "#9bb7b3" },
  ];
  const x0 = 470, maxW = 580, y0 = 170, step = 115;
  let body = `<text x="90" y="150" ${font} font-size="16" font-weight="700" fill="${INK}">Specific stiffness, E / ρ (GPa per g/cm³)</text>`;
  rows.forEach((r, i) => {
    const y = y0 + i * step, w = (r.ratio / 90) * maxW;
    body += `<text x="90" y="${y + 26}" ${font} font-size="17" font-weight="${r.bold ? 700 : 400}" fill="${r.bold ? TEAL : INK}">${r.name}</text>
    <text x="90" y="${y + 50}" ${font} font-size="14" fill="${MUTED}">E ≈ ${r.e} · ρ ≈ ${r.rho}</text>
    <rect x="${x0}" y="${y}" width="${w}" height="56" rx="6" fill="${r.color}"/>
    <text x="${x0 + w + 14}" y="${y + 36}" ${font} font-size="22" font-weight="700" fill="${r.bold ? TEAL : INK}">${r.ratio}</text>`;
  });
  body += `<rect x="${x0}" y="${y0 + 4 * step - 10}" width="${maxW}" height="1" fill="${LINE}"/>
  <text x="${x0}" y="${y0 + 4 * step + 16}" ${font} font-size="15" fill="${MUTED}">Same mass per metre: about 3.4 × the stiffness of aluminium or steel along the fibers.</text>`;
  return frame("STIFFNESS PER UNIT MASS · ALONG THE FIBERS", "Why a moving arm, a boom or an instrument support ends up in carbon.", body, "Class values: ACI 440.1R and supplier datasheets for UD CFRP at 60% fiber volume; EN 13706 E23 minimum; handbook metals. The offered laminate governs.");
}

// Figure: fiber architecture of a pultruded tube against a roll-wrapped or pull-wound tube.
function fiberDirection() {
  const tube = (x, y, w, h, id, angles) => {
    let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${CARBON_LIGHT}"/><stop offset="0.5" stop-color="${CARBON}"/><stop offset="1" stop-color="#15191c"/></linearGradient><clipPath id="${id}clip"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/></clipPath></defs>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#${id})"/><g clip-path="url(#${id}clip)">`;
    if (angles.includes(0)) for (let k = 1; k < 6; k++) s += `<line x1="${x + 20}" y1="${y + (h / 6) * k}" x2="${x + w - 20}" y2="${y + (h / 6) * k}" stroke="#9aa5ab" stroke-width="1.5" stroke-opacity="0.7"/>`;
    if (angles.includes(45)) for (let k = -2; k < 9; k++) { const px = x + 40 + k * 60; s += `<line x1="${px}" y1="${y + 6}" x2="${px + 60}" y2="${y + h - 6}" stroke="${AMBER}" stroke-width="2" stroke-opacity="0.9"/><line x1="${px + 60}" y1="${y + 6}" x2="${px}" y2="${y + h - 6}" stroke="${AMBER}" stroke-width="2" stroke-opacity="0.9"/>`; }
    if (angles.includes(90)) for (let k = 1; k < 9; k++) s += `<line x1="${x + k * 50}" y1="${y + 4}" x2="${x + k * 50}" y2="${y + h - 4}" stroke="${TEAL}" stroke-width="2.5"/>`;
    return s + "</g>";
  };
  const left = tube(110, 190, 440, 96, "p1", [0]) + `<text x="110" y="166" ${font} font-size="19" font-weight="700" fill="${INK}">Pultruded · fibers at 0°</text>
  <text x="110" y="330" ${font} font-size="15" fill="${INK}">Carries: axial load, bending, buckling resistance</text>
  <text x="110" y="354" ${font} font-size="15" fill="${INK}">Highest longitudinal modulus per kg; lowest cost per metre</text>
  <text x="110" y="378" ${font} font-size="15" fill="${AMBER}">Weak in: torsion, hoop load, crushing at a clamp, cross-drilled holes</text>`;
  const right = tube(650, 190, 440, 96, "p2", [0, 45, 90]) + `<text x="650" y="166" ${font} font-size="19" font-weight="700" fill="${INK}">Roll-wrapped or pull-wound · 0° / ±45° / 90°</text>
  <text x="650" y="330" ${font} font-size="15" fill="${INK}">Carries: torque, internal pressure, off-axis and impact loads</text>
  <text x="650" y="354" ${font} font-size="15" fill="${INK}">Lower axial modulus for the same wall; made on a mandrel, batch by batch</text>
  <text x="650" y="378" ${font} font-size="15" fill="${AMBER}">Costs more per metre; the choice when the load is not along the tube</text>`;
  const legend = `<rect x="110" y="440" width="980" height="150" rx="8" fill="#f3f6f7"/>
  <text x="130" y="472" ${font} font-size="16" font-weight="700" fill="${INK}">How to choose</text>
  <text x="130" y="500" ${font} font-size="15" fill="${INK}">Load along the axis or in bending, straight, repeat length: pultruded. Torque, pressure, a clamp that bites the wall, side impact: off-axis plies or a sleeve.</text>
  <text x="130" y="526" ${font} font-size="15" fill="${INK}">A pultruded tube can be sleeved, wrapped or bonded into a fitting at the ends so the 0° laminate does the work in the span and the joint carries the rest.</text>
  <line x1="130" y1="556" x2="170" y2="556" stroke="#9aa5ab" stroke-width="2"/><text x="180" y="561" ${font} font-size="14" fill="${MUTED}">0° fibers</text>
  <line x1="290" y1="548" x2="330" y2="564" stroke="${AMBER}" stroke-width="2"/><text x="340" y="561" ${font} font-size="14" fill="${MUTED}">±45° plies</text>
  <line x1="460" y1="546" x2="460" y2="566" stroke="${TEAL}" stroke-width="2.5"/><text x="474" y="561" ${font} font-size="14" fill="${MUTED}">90° hoop</text>`;
  return frame("FIBER DIRECTION · WHAT A PULTRUDED TUBE IS GOOD AT", "The process fixes the laminate: pultrusion puts the fibers along the tube.", left + right + legend, "Schematic, not to scale. Pultrusion can add a surface veil or a light off-axis layer; a mainly 0° laminate is still the case to design around.");
}

for (const [file, draw] of [["hollow-vs-solid-section.webp", hollowVsSolid], ["specific-stiffness-cfrp-vs-metals.webp", specificStiffness], ["fiber-direction-pultruded-vs-wrapped.webp", fiberDirection]]) {
  await sharp(Buffer.from(draw())).webp({ quality: 88 }).toFile(`${OUT}/${file}`);
  console.log(file);
}
