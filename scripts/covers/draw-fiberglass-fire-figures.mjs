// node scripts/covers/draw-fiberglass-fire-figures.mjs
// Draws the temperature figure in the fiberglass fire guide (1294x800 WebP, white ground,
// graphite text) with sharp. Resin rows are orange, glass rows teal (pair checked with the
// dataviz palette validator, light surface). Every range is quoted from Chowdhury et al.,
// PROTECT 2007, sections 3.1-3.2 (NRC archive); the 750 °C line is the ASTM E136 furnace.
// Literature ranges, not F1 product data.
import sharp from "sharp";
const W = 1294, H = 800; // golden-ratio frame, matching the article figure box
const INK = "#1f2a30", MUTED = "#5f6d75", LINE = "#d5d9dc", RESIN = "#c2410c", GLASS = "#0d9488", REF = "#475569";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const OUT = "public/images/blog/frp-fire-resistance";

const x0 = 470, x1 = 1204, tMax = 1300, axisY = 660;
const sx = (t) => x0 + (t / tMax) * (x1 - x0);

// [label, note, from °C, to °C or null for "above", value label, color]
const rows = [
  ["group", "RESIN MATRIX", RESIN, 150],
  ["Glass transition (Tg)", "Typical construction resins; stress transfer falls", 65, 120, "65–120 °C", RESIN, 200],
  ["Ignition of the resin", "Epoxy- and polyester-based composites", 300, 400, "300–400 °C", RESIN, 275],
  ["group", "GLASS FIBRES", GLASS, 360],
  ["Tensile strength about halved", "Reported for glass fibres above this temperature", 550, null, "above 550 °C", GLASS, 410],
  ["Glass begins to soften", "Range reported across glass fibre types", 650, 970, "650–970 °C", GLASS, 485],
  ["Glass melts", "Far above the resin ignition range", 1225, null, "above 1,225 °C", GLASS, 560],
];

function row([label, note, from, to, value, color, y]) {
  const barY = y - 8, h = 16;
  const a = sx(from);
  let mark;
  if (to === null) {
    // Open-ended: a solid start marker, then a dashed run to the axis end with an arrowhead.
    const end = x1 - 6;
    mark = `<line x1="${a}" y1="${y}" x2="${end}" y2="${y}" stroke="${color}" stroke-width="3" stroke-dasharray="7 6"/>
  <path d="M ${end - 10} ${y - 7} L ${end + 2} ${y} L ${end - 10} ${y + 7}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="${a}" cy="${y}" r="8" fill="${color}" stroke="#ffffff" stroke-width="2"/>`;
  } else {
    mark = `<rect x="${a}" y="${barY}" width="${sx(to) - a}" height="${h}" rx="4" fill="${color}"/>`;
  }
  // Open-ended labels sit above the dashed run; near the axis end they align right.
  const nearEnd = to === null && a > x1 - 200;
  const valueX = to === null ? (nearEnd ? x1 : a - 8) : sx(to) + 12;
  const valueAnchor = nearEnd ? "end" : "start";
  const valueY = to === null ? y - 16 : y + 7;
  return `<text x="90" y="${y - 2}" ${font} font-size="21" font-weight="700" fill="${INK}">${label}</text>
  <text x="90" y="${y + 24}" ${font} font-size="16" fill="${MUTED}">${note}</text>
  ${mark}
  <text x="${valueX}" y="${valueY}" text-anchor="${valueAnchor}" ${font} font-size="18" font-weight="700" fill="${INK}">${value}</text>`;
}

function heatingStages() {
  let body = "";
  for (const t of [0, 200, 400, 600, 800, 1000, 1200]) {
    body += `<line x1="${sx(t)}" y1="140" x2="${sx(t)}" y2="${axisY}" stroke="${LINE}"/>
  <text x="${sx(t)}" y="${axisY + 30}" text-anchor="middle" ${font} font-size="16" fill="${MUTED}">${t.toLocaleString("en-US")}</text>`;
  }
  body += `<line x1="${x0}" y1="${axisY}" x2="${x1}" y2="${axisY}" stroke="${INK}" stroke-width="2"/>
  <text x="${(x0 + x1) / 2}" y="${axisY + 60}" text-anchor="middle" ${font} font-size="17" fill="${INK}">Temperature, °C</text>`;
  // Reference: the E136 furnace temperature, so readers can place a familiar test on the scale.
  body += `<line x1="${sx(750)}" y1="128" x2="${sx(750)}" y2="${axisY}" stroke="${REF}" stroke-width="2" stroke-dasharray="3 5"/>
  <text x="${sx(750) + 8}" y="132" ${font} font-size="15" font-weight="600" fill="${REF}">ASTM E136 furnace, 750 °C</text>`;
  for (const r of rows) {
    if (r[0] === "group") {
      const [, name, color, y] = r;
      body += `<rect x="90" y="${y - 14}" width="12" height="12" rx="2" fill="${color}"/>
  <text x="112" y="${y - 2}" ${font} font-size="16" font-weight="700" fill="${INK}" letter-spacing="1.5">${name}</text>`;
    } else body += row(r);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="90" y="62" ${font} font-size="26" font-weight="700" fill="${INK}">What changes as a glass-fibre composite heats up</text>
  <text x="90" y="94" ${font} font-size="17" fill="${MUTED}">The resin softens and ignites hundreds of degrees before the glass fibres soften or melt.</text>
  ${body}
  <line x1="90" y1="${H - 66}" x2="${x1}" y2="${H - 66}" stroke="${LINE}"/>
  <text x="90" y="${H - 38}" ${font} font-size="15" fill="${MUTED}">Source: Chowdhury, Green, Bisby, Bénichou and Kodur, PROTECT 2007 (NRC Publications Archive), sections 3.1–3.2.</text>
  <text x="90" y="${H - 14}" ${font} font-size="15" fill="${MUTED}">Literature ranges for construction FRP, not F1 product data. Values vary with resin formulation and test method.</text>
</svg>`;
}

await sharp(Buffer.from(heatingStages())).webp({ quality: 88 }).toFile(`${OUT}/composite-heating-stages.webp`);
console.log(`wrote ${OUT}/composite-heating-stages.webp`);
