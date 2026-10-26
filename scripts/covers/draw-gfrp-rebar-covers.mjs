// node scripts/covers/draw-gfrp-rebar-covers.mjs
// Draws the schematic covers for the GFRP rebar manufacturer, import and residential-concrete articles
// (1200x750 WebP, white ground, brand teal #0f766e, graphite text) with sharp.
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", GLASS = "#dfe3e6", GLASS_DARK = "#b9c0c6";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;

function barBody(x, y, w, h, id) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f3"/><stop offset="0.5" stop-color="${GLASS}"/><stop offset="1" stop-color="${GLASS_DARK}"/></linearGradient></defs>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#${id})" stroke="${GLASS_DARK}" stroke-width="1.5"/>`;
}

// Cover 1: three surface types, one bar each.
function surfaceTypes() {
  const x = 150, w = 900, h = 70;
  const rows = [
    { y: 175, label: "Sand-coated", note: "Quartz sand bonded in the resin; the measured area includes the coating", draw: (y) => { let s = ""; for (let i = 0; i < 520; i++) { const px = x + 10 + ((i * 97) % 880); const py = y + 6 + ((i * 53) % (h - 12)); s += `<circle cx="${px}" cy="${py}" r="${1.4 + ((i * 7) % 3) * 0.6}" fill="${i % 3 ? "#9aa3aa" : "#7c868d"}"/>`; } return s; } },
    { y: 345, label: "Helical wrap with sand", note: "A fiber tow wound around the bar leaves a shallow spiral under the sand", draw: (y) => { let s = ""; for (let i = -1; i < 24; i++) { const px = x + i * 40; s += `<path d="M ${px} ${y + h} L ${px + 28} ${y}" stroke="${TEAL}" stroke-opacity="0.55" stroke-width="7" stroke-linecap="round"/>`; } for (let i = 0; i < 300; i++) { const px = x + 10 + ((i * 83) % 880); const py = y + 6 + ((i * 41) % (h - 12)); s += `<circle cx="${px}" cy="${py}" r="1.3" fill="#8e979e" fill-opacity="0.8"/>`; } return s; } },
    { y: 515, label: "Machined ribs", note: "Ribs cut into the cured bar, as on European approved systems; core diameter governs", draw: (y) => { let s = ""; for (let i = 0; i < 30; i++) { const px = x + 14 + i * 30; s += `<rect x="${px}" y="${y - 4}" width="12" height="${h + 8}" rx="4" fill="#c3c9ce" stroke="${GLASS_DARK}" stroke-width="1"/>`; } return s; } },
  ];
  let body = "";
  rows.forEach((row, i) => {
    body += `<g clip-path="url(#clip${i})">${barBody(x, row.y, w, h, `g${i}`)}${row.draw(row.y)}</g>
    <clipPath id="clip${i}"><rect x="${x}" y="${row.y - 6}" width="${w}" height="${h + 12}" rx="${h / 2}"/></clipPath>
    <text x="${x}" y="${row.y - 28}" ${font} font-size="26" font-weight="700" fill="${INK}">${row.label}</text>
    <text x="${x}" y="${row.y + h + 34}" ${font} font-size="17" fill="${MUTED}">${row.note}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="${x}" y="70" ${font} font-size="20" font-weight="600" fill="${TEAL}" letter-spacing="2">GFRP BAR SURFACE TYPES</text>
  <text x="${x}" y="100" ${font} font-size="17" fill="${MUTED}">All three must pass the same bond test (ASTM D7913 ≥ 7.6 MPa); the datasheet names which one you are buying.</text>
  ${body}
  <line x1="${x}" y1="700" x2="${x + w}" y2="700" stroke="${LINE}"/>
  <text x="${x}" y="728" ${font} font-size="15" fill="${MUTED}">Schematic, not to scale. Surface type alone does not identify a qualified grade.</text>
</svg>`;
}

// Cover 2: a 40 ft high-cube in side view with stacked bundles and a coil.
function containerLoading() {
  const cx = 110, cy = 200, cw = 980, ch = 300; // container outline
  let bundles = "";
  const bundleW = 880, bundleH = 42, rows = 5;
  for (let r = 0; r < rows; r++) {
    const y = cy + ch - 18 - (r + 1) * (bundleH + 6);
    const x = cx + 20 + (r % 2) * 8;
    bundles += `${barBody(x, y, bundleW - (r % 2) * 16, bundleH, `b${r}`)}
    ${[0.18, 0.5, 0.82].map((f) => `<rect x="${x + (bundleW - (r % 2) * 16) * f - 6}" y="${y - 3}" width="12" height="${bundleH + 6}" rx="2" fill="${TEAL}" fill-opacity="0.85"/>`).join("")}
    <text x="${x + 24 + bundleW * 0.18 + 14}" y="${y + bundleH / 2 + 6}" ${font} font-size="15" fill="${MUTED}">${r === rows - 1 ? "Bundle: diameter · length · count · lot no." : ""}</text>`;
  }
  // coil at the door end
  const coilX = cx + cw - 70, coilY = cy + ch - 90;
  let coil = "";
  for (let i = 0; i < 6; i++) coil += `<ellipse cx="${coilX}" cy="${coilY}" rx="${56 - i * 7}" ry="${56 - i * 7}" fill="none" stroke="${i % 2 ? GLASS_DARK : "#9aa3aa"}" stroke-width="5"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="${cx}" y="70" ${font} font-size="20" font-weight="600" fill="${TEAL}" letter-spacing="2">40 FT HIGH-CUBE · GFRP REBAR LOADING</text>
  <text x="${cx}" y="100" ${font} font-size="17" fill="${MUTED}">Straight bars up to about 11.8 m; roughly 12 to 20 t depending on diameter and packing.</text>
  <text x="${cx}" y="124" ${font} font-size="17" fill="${MUTED}">Small bars and bent shapes reach the space limit before the payload.</text>
  <rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="6" fill="#f7f9fa" stroke="${INK}" stroke-width="3"/>
  ${Array.from({ length: 24 }, (_, i) => `<line x1="${cx + 20 + i * 40}" y1="${cy}" x2="${cx + 20 + i * 40}" y2="${cy + ch}" stroke="${LINE}" stroke-width="1"/>`).join("")}
  <rect x="${cx + cw - 10}" y="${cy}" width="10" height="${ch}" fill="${INK}"/>
  ${bundles}
  ${coil}
  <text x="${coilX - 40}" y="${cy + ch + 34}" ${font} font-size="15" fill="${MUTED}">Ø6–Ø10 coils</text>
  <line x1="${cx}" y1="${cy + ch + 52}" x2="${cx + cw}" y2="${cy + ch + 52}" stroke="${TEAL}" stroke-width="2"/>
  <line x1="${cx}" y1="${cy + ch + 44}" x2="${cx}" y2="${cy + ch + 60}" stroke="${TEAL}" stroke-width="2"/>
  <line x1="${cx + cw}" y1="${cy + ch + 44}" x2="${cx + cw}" y2="${cy + ch + 60}" stroke="${TEAL}" stroke-width="2"/>
  <text x="${cx + cw / 2}" y="${cy + ch + 86}" text-anchor="middle" ${font} font-size="18" font-weight="700" fill="${INK}">Internal length 12.03 m · bars cut to ≈ 11.8 m · payload ≈ 26 t</text>
  <text x="${cx}" y="${cy + ch + 130}" ${font} font-size="17" fill="${MUTED}">1 t of Ø12 mm GFRP ≈ 4,400 m of bar (≈ 4× the length of a tonne of steel). Compare offers per metre and per container.</text>
  <text x="${cx}" y="728" ${font} font-size="15" fill="${MUTED}">Schematic, not to scale. The packing list for the actual size mix governs.</text>
</svg>`;
}

// Cover 3: section through a residential slab on grade with GFRP bars on chairs.
function residentialSlab() {
  const x0 = 110, x1 = 1070, grade = 400, slabTop = 260, slabBot = 360; // slab 100 mm drawn 100 px
  const edgeW = 160, edgeBot = 500; // thickened edge at the left
  const barY = 310, chairXs = [330, 530, 730, 930];
  let bars = `<line x1="${x0 + edgeW - 40}" y1="${barY}" x2="${x1 - 30}" y2="${barY}" stroke="${TEAL}" stroke-width="9" stroke-linecap="round"/>`;
  let chairs = "";
  for (const cx of chairXs) chairs += `<path d="M ${cx - 14} ${slabBot - 2} L ${cx} ${barY + 5} L ${cx + 14} ${slabBot - 2}" fill="none" stroke="${INK}" stroke-width="3"/><rect x="${cx - 20}" y="${slabBot - 6}" width="40" height="5" fill="${INK}"/>`;
  // cross-section dots for the transverse bars
  let dots = "";
  for (let i = 0; i < 9; i++) dots += `<circle cx="${x0 + edgeW + 10 + i * 100}" cy="${barY}" r="7" fill="#ffffff" stroke="${TEAL}" stroke-width="4"/>`;
  // footing bars (two) in the thickened edge
  const footBars = `<circle cx="${x0 + 45}" cy="${edgeBot - 45}" r="8" fill="#ffffff" stroke="${TEAL}" stroke-width="4"/><circle cx="${x0 + edgeW - 45}" cy="${edgeBot - 45}" r="8" fill="#ffffff" stroke="${TEAL}" stroke-width="4"/>
  <path d="M ${x0 + 45} ${edgeBot - 45} L ${x0 + 45} ${barY + 30} Q ${x0 + 45} ${barY} ${x0 + 75} ${barY}" fill="none" stroke="${TEAL}" stroke-width="7" stroke-linecap="round"/>`;
  // ground hatch
  let hatch = "";
  for (let i = 0; i < 40; i++) hatch += `<line x1="${x0 - 40 + i * 30}" y1="${grade + 20}" x2="${x0 - 20 + i * 30}" y2="${grade + 60}" stroke="${LINE}" stroke-width="2"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="${x0}" y="70" ${font} font-size="20" font-weight="600" fill="${TEAL}" letter-spacing="2">RESIDENTIAL SLAB ON GRADE · GFRP REINFORCEMENT</text>
  <text x="${x0}" y="100" ${font} font-size="17" fill="${MUTED}">No. 3 to No. 5 (Ø10–Ø16 mm) bars on chairs at mid-depth; factory L-bar at the thickened edge; vapor retarder on compacted base.</text>
  <text x="${x0}" y="124" ${font} font-size="17" fill="${MUTED}">GFRP floats in fresh concrete: tie every bar to its chair before the pour.</text>
  <!-- slab -->
  <path d="M ${x0} ${slabTop} L ${x1} ${slabTop} L ${x1} ${slabBot} L ${x0 + edgeW} ${slabBot} L ${x0 + edgeW} ${edgeBot} L ${x0} ${edgeBot} Z" fill="#eef1f3" stroke="${INK}" stroke-width="3"/>
  <!-- vapor retarder -->
  <path d="M ${x0 + edgeW} ${slabBot + 6} L ${x1} ${slabBot + 6}" stroke="${TEAL}" stroke-width="3" stroke-dasharray="14 8"/>
  <!-- base -->
  <rect x="${x0 + edgeW}" y="${slabBot + 10}" width="${x1 - x0 - edgeW}" height="${grade - slabBot - 10}" fill="#f7f9fa" stroke="${LINE}"/>
  ${hatch}
  <line x1="${x0 - 40}" y1="${grade + 20}" x2="${x1 + 40}" y2="${grade + 20}" stroke="${INK}" stroke-width="2"/>
  ${chairs}${bars}${dots}${footBars}
  <!-- labels -->
  <text x="${chairXs[1] + 24}" y="${barY - 18}" ${font} font-size="16" fill="${INK}" font-weight="700">GFRP bars each way, tied to chairs</text>
  <text x="${chairXs[1] + 24}" y="${slabBot + 32}" ${font} font-size="15" fill="${MUTED}">Vapor retarder · compacted base</text>
  <text x="${x0 + edgeW + 24}" y="${edgeBot - 20}" ${font} font-size="15" fill="${MUTED}">Thickened edge: 2 longitudinal bars + factory L-shaped starter</text>
  <line x1="${x1 + 20}" y1="${slabTop}" x2="${x1 + 20}" y2="${slabBot}" stroke="${TEAL}" stroke-width="2"/>
  <line x1="${x1 + 12}" y1="${slabTop}" x2="${x1 + 28}" y2="${slabTop}" stroke="${TEAL}" stroke-width="2"/>
  <line x1="${x1 + 12}" y1="${slabBot}" x2="${x1 + 28}" y2="${slabBot}" stroke="${TEAL}" stroke-width="2"/>
  <text x="${x1 + 30}" y="${(slabTop + slabBot) / 2 + 6}" ${font} font-size="15" fill="${INK}" font-weight="700">100–125</text>
  <text x="${x1 + 30}" y="${(slabTop + slabBot) / 2 + 26}" ${font} font-size="15" fill="${INK}" font-weight="700">mm</text>
  <text x="${x0}" y="${edgeBot + 60}" ${font} font-size="16" fill="${INK}">Spacing 300–450 mm each way as the slab designer confirms.</text>
  <text x="${x0}" y="${edgeBot + 86}" ${font} font-size="16" fill="${INK}">A listed No. 3 may replace No. 4 steel only under its own evaluation report; every other bar goes through the engineer’s design.</text>
  <text x="${x0}" y="728" ${font} font-size="15" fill="${MUTED}">Schematic, not to scale. The engineer's drawing governs bar size, spacing, cover and joints.</text>
</svg>`;
}

await sharp(Buffer.from(surfaceTypes())).webp({ quality: 86 }).toFile("public/images/covers/blog/gfrp-rebar-surface-types.webp");
await sharp(Buffer.from(containerLoading())).webp({ quality: 86 }).toFile("public/images/covers/blog/gfrp-rebar-container-loading.webp");
await sharp(Buffer.from(residentialSlab())).webp({ quality: 86 }).toFile("public/images/covers/blog/gfrp-rebar-residential-slab.webp");
console.log("covers written");
