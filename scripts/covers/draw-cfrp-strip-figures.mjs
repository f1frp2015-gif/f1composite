// node scripts/covers/draw-cfrp-strip-figures.mjs
// Draws the schematic figure for the CFRP strengthening strip page (1200x750 WebP): a beam
// cross-section strengthened three ways, externally bonded strip, near-surface-mounted strip in
// a sawn groove, and a bonded steel plate, with the numbers that separate them. Schematic, not
// to scale; class values, not a datasheet.
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", CARBON = "#2b3136", AMBER = "#d97706", CONCRETE = "#e4e7ea", CONCRETE_DARK = "#c9ced3", ADHESIVE = "#c9e3df", STEEL = "#8a949b";
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

// A beam section (width bw, depth h) with rebar dots, drawn with its bottom edge at y = base.
function beam(cx, base, bw, h) {
  const x = cx - bw / 2, y = base - h;
  let s = `<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="${CONCRETE}" stroke="${CONCRETE_DARK}" stroke-width="2"/>`;
  for (const dx of [-bw / 2 + 28, 0, bw / 2 - 28]) s += `<circle cx="${cx + dx}" cy="${base - 30}" r="7" fill="${STEEL}"/>`;
  s += `<text x="${cx}" y="${y - 12}" text-anchor="middle" ${font} font-size="14" fill="${MUTED}">existing beam · steel bars in the tension zone</text>`;
  return s;
}

function strengtheningSection() {
  const base = 440, bw = 240, h = 220;
  const cases = [
    { cx: 240, title: "Externally bonded (EB) strip", draw: (cx) => `<rect x="${cx - 90}" y="${base}" width="180" height="6" fill="${ADHESIVE}"/><rect x="${cx - 90}" y="${base + 6}" width="180" height="6" fill="${CARBON}"/>`, lines: ["50–120 × 1.2–1.4 mm strip on the soffit", "1–3 mm adhesive; no groove, fastest to install", "bond line and end peel govern", "exposed to fire and impact"] },
    { cx: 600, title: "Near-surface-mounted (NSM) strip", draw: (cx) => `<rect x="${cx - 8}" y="${base - 30}" width="16" height="30" fill="${ADHESIVE}"/><rect x="${cx - 2}" y="${base - 28}" width="4" height="28" fill="${CARBON}"/><rect x="${cx + 70}" y="${base - 30}" width="16" height="30" fill="${ADHESIVE}"/><circle cx="${cx + 78}" cy="${base - 15}" r="5" fill="${CARBON}"/>`, lines: ["10–20 × 2–3 mm strip or Ø6–Ø10 bar in a sawn groove", "bonded on three sides: 2–3 × the EB bond", "protected by the cover", "needs 15–25 mm of sound concrete below the bars"], accent: true },
    { cx: 960, title: "Bonded steel plate", draw: (cx) => `<rect x="${cx - 100}" y="${base}" width="200" height="6" fill="${ADHESIVE}"/><rect x="${cx - 100}" y="${base + 6}" width="200" height="16" fill="${STEEL}"/><rect x="${cx - 70}" y="${base - 20}" width="6" height="46" fill="${STEEL}"/><rect x="${cx + 64}" y="${base - 20}" width="6" height="46" fill="${STEEL}"/>`, lines: ["6–10 mm steel plate, bolted and bonded", "the method CFRP replaced: 5–8 × the weight", "rusts at the bond line", "needs a crane, bolts and a coating"] },
  ];
  let body = "";
  for (const c of cases) {
    body += beam(c.cx, base, bw, h) + c.draw(c.cx);
    body += `<text x="${c.cx}" y="${base + 64}" text-anchor="middle" ${font} font-size="19" font-weight="700" fill="${c.accent ? TEAL : INK}">${c.title}</text>`;
    c.lines.forEach((line, i) => { body += `<text x="${c.cx}" y="${base + 92 + i * 23}" text-anchor="middle" ${font} font-size="13" fill="${i >= 2 ? AMBER : INK}">${line}</text>`; });
  }
  body += `<rect x="90" y="150" width="1020" height="34" rx="6" fill="#f3f6f7"/><text x="600" y="173" text-anchor="middle" ${font} font-size="15" fill="${INK}">A 50 × 1.4 mm strip carries about the tension of a 50 × 8 mm steel plate at a tenth of the weight; the capacity added is set by the bond and the code.</text>`;
  return frame("THREE WAYS TO ADD TENSION TO A BEAM", "The same beam, strengthened with an EB strip, an NSM strip and a bonded steel plate; sections, not to scale.", body, "Schematic, not to scale. Sizes are the ranges strengthening systems publish; the design is to ACI 440.2R / 440.13, fib Bulletin 90 or TR55 by the engineer of record.");
}

await sharp(Buffer.from(strengtheningSection())).webp({ quality: 88 }).toFile(`${OUT}/eb-nsm-steel-plate-sections.webp`);
console.log("eb-nsm-steel-plate-sections.webp");
