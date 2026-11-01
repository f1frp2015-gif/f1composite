// node scripts/covers/draw-basalt-rebar-figures.mjs
// Draws the schematic figures on the basalt FRP rebar product page (1200x750 WebP, white ground,
// brand teal #0f766e, graphite text) with sharp: the rock-to-bar process, BFRP against GFRP and
// steel in stress and strain, and the 11-size ladder. Schematic, not to scale; class values, not
// a datasheet. Also writes PNG copies for the product manual (scripts/build-basalt-rebar-manual.py).
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", BASALT = "#4b4f54", BASALT_LIGHT = "#8c9298", STEEL = "#8a949b", AMBER = "#d97706";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const OUT = "public/images/products/basalt-rebar";
const PNG_OUT = process.argv[2]; // optional directory for PNG copies

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

// Figure: from quarried rock to a finished bar, in seven stations.
function rockToBar() {
  const stations = [
    ["1", "Basalt rock", "Quarried, crushed, washed and graded. One raw material, no additives."],
    ["2", "Melt", "About 1,450 °C in a single furnace; the rock's own chemistry is the glass."],
    ["3", "Draw", "Continuous filament pulled through platinum bushings and sized."],
    ["4", "Roving", "Filaments gathered into roving and wound; the fiber the bar is made of."],
    ["5", "Pultrude", "Roving wetted in vinyl ester or epoxy and pulled through a heated die."],
    ["6", "Surface", "Helical fiber wrap, with sand coating on request, applied before cure."],
    ["7", "Bar", "Cured, cut to length or coiled (Ø≤10 mm), bundled and labeled."],
  ];
  const x0 = 90, y0 = 150, w = 132, gap = 16, h = 300;
  let body = "";
  stations.forEach(([n, title, text], i) => {
    const x = x0 + i * (w + gap);
    const fill = i < 4 ? "#eef1f3" : "#e6f2f0";
    body += `<rect x="${x}" y="${y0}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${i < 4 ? LINE : TEAL}" stroke-width="${i < 4 ? 1 : 2}"/>
    <text x="${x + 14}" y="${y0 + 34}" ${font} font-size="13" font-weight="700" fill="${i < 4 ? MUTED : TEAL}" letter-spacing="1">STATION ${n}</text>
    <text x="${x + 14}" y="${y0 + 62}" ${font} font-size="19" font-weight="700" fill="${INK}">${title}</text>`;
    // Wrap the text at about 18 characters.
    const words = text.split(" "), lines = [];
    let line = "";
    for (const word of words) { if ((line + " " + word).trim().length > 17) { lines.push(line.trim()); line = word; } else line = line + " " + word; }
    if (line.trim()) lines.push(line.trim());
    lines.forEach((l, k) => { body += `<text x="${x + 14}" y="${y0 + 92 + k * 19}" ${font} font-size="13.5" fill="${INK}">${l}</text>`; });
    if (i < stations.length - 1) body += `<path d="M ${x + w + 2} ${y0 + h / 2} l 10 0 m -4 -5 l 4 5 l -4 5" fill="none" stroke="${MUTED}" stroke-width="2"/>`;
  });
  // Little pictures under each station: rock, flame, filament, spool, die, wrap, bar.
  const py = y0 + 248;
  body += `<polygon points="${x0 + 30},${py + 30} ${x0 + 50},${py} ${x0 + 90},${py + 8} ${x0 + 104},${py + 30}" fill="${BASALT}"/>
  <path d="M ${x0 + 148 + 50} ${py + 32} q -30 -10 -12 -34 q 6 14 14 6 q 12 -14 18 6 q 10 14 -20 22 z" fill="${AMBER}"/>
  <line x1="${x0 + 296 + 20}" y1="${py}" x2="${x0 + 296 + 110}" y2="${py + 32}" stroke="${BASALT_LIGHT}" stroke-width="1.5"/><line x1="${x0 + 296 + 20}" y1="${py + 8}" x2="${x0 + 296 + 110}" y2="${py + 24}" stroke="${BASALT_LIGHT}" stroke-width="1.5"/><line x1="${x0 + 296 + 20}" y1="${py + 16}" x2="${x0 + 296 + 110}" y2="${py + 16}" stroke="${BASALT_LIGHT}" stroke-width="1.5"/>
  <rect x="${x0 + 444 + 36}" y="${py}" width="60" height="32" rx="6" fill="${BASALT_LIGHT}"/><rect x="${x0 + 444 + 30}" y="${py - 4}" width="6" height="40" fill="${BASALT}"/><rect x="${x0 + 444 + 96}" y="${py - 4}" width="6" height="40" fill="${BASALT}"/>
  <rect x="${x0 + 592 + 34}" y="${py + 4}" width="64" height="24" rx="4" fill="${TEAL}"/><rect x="${x0 + 592 + 14}" y="${py + 13}" width="104" height="6" fill="${BASALT}"/>
  <rect x="${x0 + 740 + 14}" y="${py + 12}" width="104" height="10" rx="5" fill="${BASALT}"/>${[0, 1, 2, 3, 4].map(k => `<line x1="${x0 + 740 + 22 + k * 20}" y1="${py + 8}" x2="${x0 + 740 + 34 + k * 20}" y2="${py + 26}" stroke="#d9d4c8" stroke-width="4"/>`).join("")}
  <rect x="${x0 + 888 + 14}" y="${py + 12}" width="104" height="10" rx="5" fill="${BASALT}"/><circle cx="${x0 + 888 + 118}" cy="${py + 17}" r="5" fill="${BASALT_LIGHT}"/>`;
  const notes = [
    ["Why the fiber matters, and why it is not the whole story", INK, true],
    ["Basalt filament is stiffer and stronger than E-glass and keeps its properties to a higher temperature: that is where the 1,100 MPa and 50 GPa classes come from.", INK],
    ["Fiber volume, resin, surface and process set what a bar guarantees, and the resin sets its temperature limit. The report per size, not the fiber, is what the engineer designs with.", INK],
    ["Stations 1 to 4 belong to the fiber producer, 5 to 7 to the pultruder. This manufacturer runs both, which keeps the fiber lot and the bar lot traceable to each other.", AMBER],
    ["Bends and mesh are not on this line: they are raised as an inquiry, and a project may pair straight basalt bars with GFRP shapes where the designer allows.", INK],
  ];
  body += `<rect x="90" y="496" width="1020" height="176" rx="8" fill="#f3f6f7"/>`;
  notes.forEach(([text, color, bold], i) => {
    body += `<text x="110" y="${526 + i * 30}" ${font} font-size="${bold ? 16 : 13.5}" ${bold ? 'font-weight="700"' : ""} fill="${color}">${text}</text>`;
  });
  return frame("FROM BASALT ROCK TO A REINFORCING BAR", "Seven stations; the same melt-and-draw route as glass fiber, with rock in place of a formulated batch.", body, "Schematic, not to scale. Temperatures and classes are typical published values; the process details of the offered bar are confirmed on the quotation.");
}

// Figure: BFRP, GFRP 45 and Grade 60 steel in stress and strain.
function stressStrain() {
  const x0 = 150, y0 = 630, pw = 920, ph = 470;
  const sx = (strain) => x0 + (strain / 3) * pw;
  const sy = (mpa) => y0 - (mpa / 1200) * ph;
  let axes = `<line x1="${x0}" y1="${y0}" x2="${x0 + pw}" y2="${y0}" stroke="${INK}" stroke-width="2"/>
  <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - ph}" stroke="${INK}" stroke-width="2"/>`;
  for (const mpa of [200, 400, 600, 800, 1000, 1200]) axes += `<line x1="${x0}" y1="${sy(mpa)}" x2="${x0 + pw}" y2="${sy(mpa)}" stroke="${LINE}"/><text x="${x0 - 14}" y="${sy(mpa) + 6}" text-anchor="end" ${font} font-size="15" fill="${MUTED}">${mpa.toLocaleString("en-US")}</text>`;
  for (const strain of [0.5, 1, 1.5, 2, 2.5, 3]) axes += `<line x1="${sx(strain)}" y1="${y0}" x2="${sx(strain)}" y2="${y0 + 8}" stroke="${INK}"/><text x="${sx(strain)}" y="${y0 + 30}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">${strain}%</text>`;
  axes += `<text x="${x0 + pw / 2}" y="${y0 + 58}" text-anchor="middle" ${font} font-size="16" fill="${INK}">Tensile strain</text>
  <text x="${x0 - 92}" y="${y0 - ph / 2}" transform="rotate(-90 ${x0 - 92} ${y0 - ph / 2})" text-anchor="middle" ${font} font-size="16" fill="${INK}">Tensile stress, MPa</text>`;
  const rupture = (x, y, color) => `<path d="M ${x - 9} ${y - 9} L ${x + 9} ${y + 9} M ${x - 9} ${y + 9} L ${x + 9} ${y - 9}" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
  const steel = `<path d="M ${x0} ${y0} L ${sx(0.21)} ${sy(420)} L ${sx(2.9)} ${sy(420)}" fill="none" stroke="${STEEL}" stroke-width="5" stroke-linecap="round"/>
  <text x="${sx(1.7)}" y="${sy(420) - 14}" ${font} font-size="17" font-weight="700" fill="${STEEL}">Steel Grade 60 · 200 GPa · yields at 420 MPa</text>`;
  // GFRP 45: linear at 45 GPa to about 900 MPa (2.0%). BFRP: linear at 50 GPa to 1,100 MPa (2.2%); published elongation about 2.6% reflects the as-tested bar.
  const g45 = `<path d="M ${x0} ${y0} L ${sx(900 / 450)} ${sy(900)}" fill="none" stroke="${TEAL}" stroke-opacity="0.5" stroke-width="6" stroke-linecap="round"/>${rupture(sx(900 / 450), sy(900), TEAL)}
  <text x="${sx(900 / 450) + 18}" y="${sy(900) + 8}" ${font} font-size="18" font-weight="700" fill="${TEAL}" fill-opacity="0.8">GFRP 45 · 45 GPa class · about 900 MPa</text>`;
  const bfrp = `<path d="M ${x0} ${y0} L ${sx(1100 / 500)} ${sy(1100)}" fill="none" stroke="${BASALT}" stroke-width="6" stroke-linecap="round"/>${rupture(sx(1100 / 500), sy(1100), BASALT)}
  <text x="${sx(1100 / 500) + 18}" y="${sy(1100) + 8}" ${font} font-size="19" font-weight="700" fill="${BASALT}">BFRP · 50 GPa class · 1,100 MPa</text>`;
  const nx = x0 + pw - 440, ny = y0 - 150;
  const note = `<rect x="${nx}" y="${ny}" width="420" height="98" rx="8" fill="#f3f6f7"/>
  <text x="${nx + 16}" y="${ny + 30}" ${font} font-size="16" font-weight="700" fill="${INK}">Linear to rupture, no yield plateau</text>
  <text x="${nx + 16}" y="${ny + 54}" ${font} font-size="15" fill="${MUTED}">The slope sets crack width and deflection; a 50 GPa</text>
  <text x="${nx + 16}" y="${ny + 76}" ${font} font-size="15" fill="${MUTED}">class sits between GFRP 45 and GFRP 60.</text>`;
  return frame("BASALT, GLASS AND STEEL IN TENSION", "The manufacturer's published classes for BFRP against the GFRP 45 class and Grade 60 steel.", axes + steel + g45 + bfrp + note, "Schematic, not to scale. BFRP 1,100 MPa / 50 GPa (published classes); GFRP 45 about 900 MPa; steel ASTM A615 Grade 60. The report per size governs.");
}

// Figure: the 11 inquiry diameters to one scale with calculated unit mass.
function sizeLadder() {
  const sizes = [3, 6, 8, 10, 12, 14, 16, 18, 20, 22, 25];
  const scale = 5.2, gap = 22, base = 440;
  const total = sizes.reduce((sum, d) => sum + d * scale, 0) + gap * (sizes.length - 1);
  let x = (W - total) / 2, body = "";
  sizes.forEach((d, i) => {
    const r = (d * scale) / 2, cx = x + r, cy = base - r;
    const mass = (Math.PI * d * d) / 4 * 1.9 / 1000;
    const tier = d <= 12 ? "slabs, pavements, pools" : d <= 20 ? "walls, foundations, marine" : "decks, cages, soft-eyes";
    body += `<defs><radialGradient id="s${i}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#c9ced3"/><stop offset="1" stop-color="${BASALT}"/></radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#s${i})" stroke="${d <= 12 ? TEAL : INK}" stroke-width="${d <= 12 ? 2.5 : 2}"/>
    <text x="${cx}" y="${base + 30}" text-anchor="middle" ${font} font-size="17" font-weight="700" fill="${INK}">${d}</text>
    <text x="${cx}" y="${base + (i % 2 ? 76 : 54)}" text-anchor="middle" ${font} font-size="13" fill="${MUTED}">${mass < 0.1 ? mass.toFixed(3) : mass.toFixed(2)} kg/m</text>`;
    if (i === 0 || (sizes[i - 1] > 12) !== (d > 12) || (sizes[i - 1] > 20) !== (d > 20)) body += `<text x="${cx - r}" y="${base - (d <= 12 ? 12 : d) * scale - 24}" ${font} font-size="15" fill="${TEAL}">${tier}</text>`;
    x += d * scale + gap;
  });
  const left = (W - total) / 2;
  body += `<line x1="${left}" y1="${base + 8}" x2="${(W + total) / 2}" y2="${base + 8}" stroke="${LINE}"/>
  <text x="${left}" y="${base + 118}" ${font} font-size="16" fill="${INK}">Ø mm (top) · calculated unit mass at 1.9 g/cm³ (below), which matches the manufacturer's published g/m. Ø6–Ø10 mm also coiled.</text>
  <text x="${left}" y="${base + 146}" ${font} font-size="16" fill="${INK}">Nominal tensile capacity at the published class: Ø8 about 55 kN, Ø10 86 kN, Ø16 201 kN, Ø20 314 kN (area × 1,100 or 1,000 MPa).</text>
  <text x="${left}" y="${base + 174}" ${font} font-size="16" fill="${AMBER}">Nominal values from area and class, not guaranteed forces. ASTM D8505 and CSA S807 guarantee per size from the qualification report.</text>`;
  return frame("11 DIAMETERS · Ø3 TO Ø25 MM", "One inquiry list from micro-bars for thin precast to Ø25 mm cage bars; one modulus class across the range.", body, "Schematic, drawn to one scale. Inquiry sizes, not a stock list; measured area, tolerance and unit mass come from the quotation.");
}

const figures = [
  ["basalt-rebar-rock-to-bar.webp", rockToBar],
  ["basalt-rebar-stress-strain.webp", stressStrain],
  ["basalt-rebar-size-ladder.webp", sizeLadder],
];
for (const [file, draw] of figures) {
  const svg = Buffer.from(draw());
  await sharp(svg).webp({ quality: 88 }).toFile(`${OUT}/${file}`);
  console.log("wrote", `${OUT}/${file}`);
  if (PNG_OUT) await sharp(svg).png().toFile(`${PNG_OUT}/${file.replace(/\.webp$/, ".png")}`);
}
// PNG copies of the manufacturer's photographs for the manual (reportlab reads PNG, not WebP).
if (PNG_OUT) for (const file of ["bfrp-rebar-cut-pieces", "bfrp-rebar-helical-surface", "bfrp-rebar-bar-ends"]) await sharp(`${OUT}/${file}.webp`).png().toFile(`${PNG_OUT}/${file}.png`);
