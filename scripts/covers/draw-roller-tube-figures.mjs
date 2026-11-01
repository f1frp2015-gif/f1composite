// node scripts/covers/draw-roller-tube-figures.mjs
// Draws the schematic figure for the carbon-fiber roller tube page (1200x750 WebP): a 4 m idler
// roller shell at the same outside diameter and wall in steel, aluminium and pultruded carbon,
// with mass, self-weight deflection and first critical speed relative to steel. Schematic; class
// values, not a datasheet.
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

// Same thin-wall shell, so EI/m ∝ E/ρ: mass ∝ ρ; self-weight sag ∝ ρ/E; first critical speed ∝ √(E/ρ).
// Steel 200 GPa / 7.85; aluminium 69 / 2.70; pultruded carbon 130 / 1.55 (class values).
function sameShell() {
  const rows = [
    { name: "Steel shell", color: STEEL, mass: "1.00 ×", sag: "1.00 ×", crit: "1.00 ×", bar: 1.0, note: "the reference: heavy, stiff, slow to spin up" },
    { name: "Aluminium shell", color: ALU, mass: "0.34 ×", sag: "1.00 ×", crit: "1.00 ×", bar: 1.0, note: "a third of the mass, but E/ρ is the same as steel: same sag, same critical speed" },
    { name: "Pultruded carbon shell", color: CARBON, mass: "0.20 ×", sag: "0.30 ×", crit: "1.81 ×", bar: 1.81, note: "a fifth of the mass, a third of the sag, 1.8 × the critical speed", accent: true },
  ];
  const y0 = 176, step = 118, x0 = 500, maxW = 480;
  let body = `<text x="90" y="140" ${font} font-size="16" font-weight="700" fill="${INK}">4 m idler shell, Ø200 × 6 mm wall, simply supported; values relative to steel</text>
  <text x="${x0}" y="162" ${font} font-size="13" fill="${MUTED}">bar: first critical speed, ∝ √(E/ρ)</text>`;
  rows.forEach((r, i) => {
    const y = y0 + i * step, w = (r.bar / 2) * maxW;
    body += `<rect x="90" y="${y}" width="18" height="56" rx="3" fill="${r.color}"/>
    <text x="120" y="${y + 22}" ${font} font-size="18" font-weight="700" fill="${r.accent ? TEAL : INK}">${r.name}</text>
    <text x="120" y="${y + 46}" ${font} font-size="13" fill="${INK}">mass ${r.mass} · sag ${r.sag} · critical ${r.crit}</text>
    <rect x="${x0}" y="${y}" width="${w}" height="56" rx="6" fill="${r.color}"/>
    <text x="${x0 + w + 12}" y="${y + 36}" ${font} font-size="20" font-weight="700" fill="${r.accent ? TEAL : INK}">${r.crit}</text>
    <text x="${x0}" y="${y + 80}" ${font} font-size="13" fill="${r.accent ? TEAL : MUTED}">${r.note}</text>`;
  });
  body += `<rect x="90" y="540" width="1020" height="118" rx="8" fill="#f3f6f7"/>
  <text x="110" y="568" ${font} font-size="16" font-weight="700" fill="${INK}">Why a roller cares about E/ρ, not E or ρ alone</text>
  <text x="110" y="594" ${font} font-size="15" fill="${INK}">Same shell: mass goes with ρ, self-weight sag with ρ/E, first critical speed with √(E/ρ). Aluminium saves mass and changes nothing else.</text>
  <text x="110" y="618" ${font} font-size="15" fill="${INK}">Carbon is the only shell material that raises the critical speed: a longer roller at the same speed, or the same roller faster, without a bigger diameter.</text>
  <text x="110" y="642" ${font} font-size="15" fill="${AMBER}">The shell is not the roller: journals, bonded end fittings, coating and balancing decide what the assembled rotor does.</text>`;
  return frame("THE SAME ROLLER SHELL IN THREE MATERIALS", "Same outside diameter, wall and length; only the material changes.", body, "Schematic. Class values: steel 200 GPa / 7.85, aluminium 69 / 2.70, carbon 130 GPa / 1.55 g/cm³; uniform thin shell, no journals. The offered laminate governs.");
}

await sharp(Buffer.from(sameShell())).webp({ quality: 88 }).toFile(`${OUT}/roller-shell-same-geometry.webp`);
console.log("roller-shell-same-geometry.webp");
