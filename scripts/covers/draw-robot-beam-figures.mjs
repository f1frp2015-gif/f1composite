// node scripts/covers/draw-robot-beam-figures.mjs
// Draws the schematic figure for the carbon-fiber robotic beam page (1200x750 WebP): the same
// cantilever beam at equal tip stiffness in steel, aluminium and pultruded carbon, with the mass
// per metre and the first natural frequency that follow. Schematic; class values, not a datasheet.
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", CARBON = "#2b3136", AMBER = "#d97706", STEEL = "#8a949b", ALU = "#b9c0c6";
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

// A 1 m cantilever square tube sized for the same tip stiffness (EI) in each material.
// Reference: 60 x 60 x 3 mm steel tube, E 200 GPa, I = 3.58e5 mm^4 -> EI 71.6 kN m^2, mass 5.4 kg/m.
// Aluminium (69 GPa) needs I x 2.9: 80 x 80 x 4 (I 1.09e6), mass 3.3 kg/m.
// Carbon UD (130 GPa) needs I x 1.54: 70 x 70 x 3 (I 5.5e5), mass 1.25 kg/m at 1.55 g/cm3.
function equalStiffness() {
  const base = 470;
  const cases = [
    { cx: 240, side: 60, t: 3, name: "Steel", color: STEEL, lines: ["60 × 60 × 3 mm · E 200 GPa", "5.4 kg/m · f₁ ≈ 1.0 ×"], note: "the reference" },
    { cx: 600, side: 80, t: 4, name: "Aluminium 6061", color: ALU, lines: ["80 × 80 × 4 mm · E 69 GPa", "3.3 kg/m · f₁ ≈ 1.3 ×"], note: "bigger section, 60% of the mass" },
    { cx: 960, side: 70, t: 3, name: "Pultruded carbon", color: CARBON, lines: ["70 × 70 × 3 mm · E 130 GPa", "1.25 kg/m · f₁ ≈ 2.1 ×"], note: "23% of the mass, twice the first frequency", accent: true },
  ];
  const scale = 2.6;
  let body = `<text x="600" y="150" text-anchor="middle" ${font} font-size="16" fill="${INK}">Same tip stiffness E × I; what changes is the mass the motor must accelerate and how fast the arm stops ringing (f₁ ∝ √(EI / m)).</text>`;
  for (const c of cases) {
    const s = c.side * scale, t = c.t * scale, x = c.cx - s / 2, y = base - s;
    body += `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="6" fill="${c.color}"/><rect x="${x + t}" y="${y + t}" width="${s - 2 * t}" height="${s - 2 * t}" rx="4" fill="#ffffff"/>`;
    body += `<text x="${c.cx}" y="${base + 40}" text-anchor="middle" ${font} font-size="19" font-weight="700" fill="${c.accent ? TEAL : INK}">${c.name}</text>`;
    c.lines.forEach((line, i) => { body += `<text x="${c.cx}" y="${base + 68 + i * 24}" text-anchor="middle" ${font} font-size="15" fill="${INK}">${line}</text>`; });
    body += `<text x="${c.cx}" y="${base + 120}" text-anchor="middle" ${font} font-size="14" fill="${c.accent ? TEAL : MUTED}">${c.note}</text>`;
  }
  body += `<line x1="110" y1="${base + 4}" x2="1090" y2="${base + 4}" stroke="${LINE}"/>
  <rect x="90" y="618" width="1020" height="62" rx="8" fill="#f3f6f7"/>
  <text x="110" y="643" ${font} font-size="15" fill="${INK}">Lower moving mass: a smaller motor and gearbox, or the same motor at a higher acceleration. Higher first frequency: the tool settles sooner after each move.</text>
  <text x="110" y="667" ${font} font-size="15" fill="${AMBER}">The carbon tube needs bonded end fittings and a torsion check; its wall is the thinnest and clamps must not crush it.</text>`;
  return frame("ONE ARM, THREE MATERIALS, THE SAME STIFFNESS", "A 1 m cantilever square tube sized for equal tip stiffness; drawn to one scale.", body, "Schematic. I on nominal dimensions; carbon at 130 GPa and 1.55 g/cm³ class values; f₁ ratios for a uniform cantilever without tip mass. The offered laminate governs.");
}

await sharp(Buffer.from(equalStiffness())).webp({ quality: 88 }).toFile(`${OUT}/robot-beam-equal-stiffness.webp`);
console.log("robot-beam-equal-stiffness.webp");
