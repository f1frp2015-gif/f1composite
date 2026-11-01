// node scripts/covers/draw-carbon-plate-figures.mjs
// Draws the schematic figures for the pultruded carbon fiber plate page (1200x750 WebP, white
// ground, brand teal #0f766e, graphite text) with sharp: plate orientation (flat, on edge, stacked)
// and the bonded-strip detail (bond line, anchorage, end peel). Schematic, not to scale.
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", CARBON = "#2b3136", CARBON_LIGHT = "#596269", AMBER = "#d97706", CONCRETE = "#e4e7ea", ADHESIVE = "#c9e3df";
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

const plate = (x, y, w, h, id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${CARBON_LIGHT}"/><stop offset="1" stop-color="${CARBON}"/></linearGradient></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="url(#${id})"/>`;

// Figure: the same 50 x 3 mm strip flat, on edge and stacked three high, with I to one scale of ideas.
function orientation() {
  const base = 470, scale = 4.4; // mm to px
  const cases = [
    { cx: 240, w: 50, h: 3, title: "Flat · 50 × 3 mm", i: "I = 113 mm⁴", note: "bonded to a substrate: the substrate supplies the lever arm", stiff: "1 ×" },
    { cx: 600, w: 3, h: 50, title: "On edge · 3 × 50 mm", i: "I = 31,250 mm⁴", note: "the same strip, 278 × stiffer in bending", stiff: "278 ×", accent: true },
    { cx: 960, w: 50, h: 9, title: "Three stacked and bonded · 50 × 9 mm", i: "I = 3,038 mm⁴", note: "27 × the single strip; the bond lines must carry the shear", stiff: "27 ×" },
  ];
  let body = `<text x="600" y="150" text-anchor="middle" ${font} font-size="16" fill="${INK}">Bending stiffness is E × I, and I grows with the cube of the depth in the bending direction. Orientation, not material, is the first decision.</text>`;
  cases.forEach((c, k) => {
    const w = c.w * scale, h = c.h * scale;
    body += plate(c.cx - w / 2, base - h, w, h, `p${k}`);
    if (k === 2) body += `<line x1="${c.cx - w / 2}" y1="${base - h / 3}" x2="${c.cx + w / 2}" y2="${base - h / 3}" stroke="${ADHESIVE}" stroke-width="2"/><line x1="${c.cx - w / 2}" y1="${base - (2 * h) / 3}" x2="${c.cx + w / 2}" y2="${base - (2 * h) / 3}" stroke="${ADHESIVE}" stroke-width="2"/>`;
    // load arrow
    body += `<line x1="${c.cx}" y1="${base - h - 70}" x2="${c.cx}" y2="${base - h - 12}" stroke="${AMBER}" stroke-width="3"/><path d="M ${c.cx - 8} ${base - h - 24} L ${c.cx} ${base - h - 10} L ${c.cx + 8} ${base - h - 24}" fill="none" stroke="${AMBER}" stroke-width="3"/>`;
    body += `<text x="${c.cx}" y="${base + 40}" text-anchor="middle" ${font} font-size="19" font-weight="700" fill="${c.accent ? TEAL : INK}">${c.title}</text>
    <text x="${c.cx}" y="${base + 66}" text-anchor="middle" ${font} font-size="15" fill="${INK}">${c.i} · ${c.stiff}</text>
    <text x="${c.cx}" y="${base + 90}" text-anchor="middle" ${font} font-size="14" fill="${MUTED}">${c.note}</text>`;
  });
  body += `<line x1="110" y1="${base + 4}" x2="1090" y2="${base + 4}" stroke="${LINE}"/>`;
  return frame("PLATE ORIENTATION · ONE STRIP, THREE STIFFNESSES", "A 50 × 3 mm pultruded carbon strip under the same bending load, drawn to one scale.", body, "Schematic, drawn to one scale. I = b·h³/12 on nominal dimensions. A flat strip is a bonded reinforcement; a strip on edge or a stacked pack is a beam.");
}

// Figure: a strip bonded to a concrete or timber member, with the details that decide the joint.
function bondLine() {
  const sx = 110, sy = 330, sw = 980, sh = 150; // substrate
  const px = 250, pw = 700, pt = 16; // plate
  let body = `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" fill="${CONCRETE}"/>
  <text x="${sx + 16}" y="${sy + sh - 16}" ${font} font-size="15" fill="${MUTED}">substrate: concrete, timber or steel, ground, cleaned, dry, primed as the adhesive system requires</text>
  <rect x="${px}" y="${sy - 10}" width="${pw}" height="10" fill="${ADHESIVE}"/>
  ${plate(px, sy - 10 - pt, pw, pt, "bp")}
  <!-- tapered ends -->
  <path d="M ${px} ${sy - 10 - pt} L ${px - 40} ${sy - 10} L ${px} ${sy - 10} Z" fill="${ADHESIVE}"/>
  <path d="M ${px + pw} ${sy - 10 - pt} L ${px + pw + 40} ${sy - 10} L ${px + pw} ${sy - 10} Z" fill="${ADHESIVE}"/>
  <!-- labels -->
  <text x="${px + pw / 2}" y="${sy - 10 - pt - 14}" text-anchor="middle" ${font} font-size="16" font-weight="700" fill="${INK}">pultruded CFRP strip · fibers along the member · peel ply or abraded face down</text>
  <line x1="${px + pw / 2}" y1="${sy + 20}" x2="${px + pw / 2}" y2="${sy - 5}" stroke="${TEAL}" stroke-width="1.5"/>
  <text x="${px + pw / 2}" y="${sy + 40}" text-anchor="middle" ${font} font-size="15" fill="${TEAL}">adhesive bond line, 1–3 mm, thixotropic epoxy</text>
  <!-- anchorage -->
  <line x1="${px}" y1="${sy + 70}" x2="${px + 220}" y2="${sy + 70}" stroke="${AMBER}" stroke-width="2"/><line x1="${px}" y1="${sy + 62}" x2="${px}" y2="${sy + 78}" stroke="${AMBER}" stroke-width="2"/><line x1="${px + 220}" y1="${sy + 62}" x2="${px + 220}" y2="${sy + 78}" stroke="${AMBER}" stroke-width="2"/>
  <text x="${px + 110}" y="${sy + 96}" text-anchor="middle" ${font} font-size="15" font-weight="700" fill="${AMBER}">anchorage length past the point where the strip is needed</text>
  <!-- end peel callout -->
  <path d="M ${px + pw + 20} ${sy - 64} q 30 10 20 32" fill="none" stroke="${AMBER}" stroke-width="2"/><path d="M ${px + pw + 32} ${sy - 40} l 8 -8 l 4 11" fill="none" stroke="${AMBER}" stroke-width="2"/>
  <text x="${px + pw + 10}" y="${sy - 72}" text-anchor="end" ${font} font-size="15" fill="${AMBER}">end peel: tapered or clamped ends, never a square cut-off under load</text>
  <!-- rules box -->
  <rect x="110" y="520" width="980" height="150" rx="8" fill="#f3f6f7"/>
  <text x="130" y="552" ${font} font-size="16" font-weight="700" fill="${INK}">What the joint needs on the drawing</text>
  <text x="130" y="580" ${font} font-size="15" fill="${INK}">1. Substrate strength and preparation · 2. Adhesive and bond-line thickness · 3. Strip size, length and anchorage · 4. End detail</text>
  <text x="130" y="606" ${font} font-size="15" fill="${INK}">5. Service temperature against the adhesive’s Tg · 6. Isolation where the strip meets steel in wet service · 7. Pull-off tests on the real substrate</text>
  <text x="130" y="640" ${font} font-size="14" fill="${MUTED}">The strip almost never fails. The bond line, the substrate surface and the end detail do; that is where the design and the site work go.</text>`;
  return frame("BONDED STRIP · THE JOINT IS THE DESIGN", "A pultruded carbon strip adds tensile capacity only through its bond line.", body, "Schematic, not to scale. Strengthening is engineered to the governing code (ACI 440.2R, fib Bulletin 90, TR55) by the engineer of record.");
}

for (const [file, draw] of [["plate-orientation-flat-edge-stacked.webp", orientation], ["bonded-strip-bond-line-anchorage.webp", bondLine]]) {
  await sharp(Buffer.from(draw())).webp({ quality: 88 }).toFile(`${OUT}/${file}`);
  console.log(file);
}
