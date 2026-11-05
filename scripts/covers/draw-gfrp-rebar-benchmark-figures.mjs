// node scripts/covers/draw-gfrp-rebar-benchmark-figures.mjs
// Draws the benchmark and quality figures on the GFRP rebar product page (1200x750 WebP, white
// ground, brand teal, graphite text) with sharp, in the style of draw-gfrp-rebar-product-figures.mjs:
// the modulus tiers of the listed reference bars against the two FengDu grades, the anatomy of a
// bar with the ASTM D7957 property each part answers to, and a bar line with its quality checkpoints.
// Reference values: ICC-ES ESR-5548, ESR-4664, ESR-5751 and the producers' current data sheets
// (sources in docs/research/gfrp-rebar-benchmark-2026-11.md). Schematic, not to scale.
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", GLASS = "#dfe3e6", GLASS_DARK = "#b9c0c6", AMBER = "#b45309", SAND = "#c9b48a";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const OUT = "public/images/products/frp-rebar";

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

// Figure: published modulus of the reference bars, by tier, against the two FengDu grades.
function modulusBenchmark() {
  const x0 = 430, x1 = 1080, gMin = 40, gMax = 70; // plot spans 40–70 GPa
  const sx = (gpa) => x0 + ((gpa - gMin) / (gMax - gMin)) * (x1 - x0);
  const rows = [
    { tier: "Flatwork and general tier" },
    { label: "Mateenbar Greenbar2X", note: "ICC-ES ESR-5548", lo: 46.8 },
    { label: "Dextra Astec 45P", note: "Data sheet PDS-021", lo: 45 },
    { label: "F1 · FengDu GFRP 45", note: "45 GPa class", lo: 45, ours: true },
    { tier: "Structural tier · CSA S807 Grade III" },
    { label: "Mateenbar 60", note: "Data sheet, ESR-5548", lo: 60 },
    { label: "Pultrall V-ROD 60", note: "Data sheet, minimum", lo: 60 },
    { label: "MST-BAR 4EQ No. 3", note: "ICC-ES ESR-4664, mean", lo: 65.0 },
    { label: "Dextra Astec Plus", note: "ICC-ES ESR-5751, mean", lo: 64.8, hi: 67.8 },
    { label: "F1 · FengDu GFRP 60", note: "60 GPa class", lo: 60, ours: true },
  ];
  let y = 150, body = "";
  // Grid and reference lines.
  const top = 128, bottom = 640;
  for (const g of [40, 45, 50, 55, 60, 65, 70]) body += `<line x1="${sx(g)}" y1="${top}" x2="${sx(g)}" y2="${bottom}" stroke="${LINE}"/><text x="${sx(g)}" y="${bottom + 24}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">${g}</text>`;
  body += `<text x="${(x0 + x1) / 2}" y="${bottom + 50}" text-anchor="middle" ${font} font-size="16" fill="${INK}">Tensile modulus, GPa (steel is about 200)</text>`;
  const ref = (g, text, dy) => `<line x1="${sx(g)}" y1="${top}" x2="${sx(g)}" y2="${bottom}" stroke="${AMBER}" stroke-width="2" stroke-dasharray="7 6"/><text x="${sx(g) + 8}" y="${top + dy}" ${font} font-size="14" font-weight="700" fill="${AMBER}">${text}</text>`;
  body += ref(44.8, "ASTM D7957 minimum 44.8", 0) + ref(60, "CSA S807 Grade III ≥ 60", 0);
  for (const row of rows) {
    if (row.tier) { body += `<text x="90" y="${y + 16}" ${font} font-size="15" font-weight="700" fill="${MUTED}" letter-spacing="1">${row.tier.toUpperCase()}</text>`; y += 34; continue; }
    const color = row.ours ? TEAL : "#7d8b93";
    const end = sx(row.hi ?? row.lo);
    body += `<text x="90" y="${y + 17}" ${font} font-size="17" font-weight="${row.ours ? 700 : 600}" fill="${row.ours ? TEAL : INK}">${row.label}</text>
    <text x="${x0 - 16}" y="${y + 17}" text-anchor="end" ${font} font-size="13" fill="${MUTED}">${row.note}</text>
    <rect x="${x0}" y="${y + 2}" width="${sx(row.lo) - x0}" height="20" rx="4" fill="${color}" fill-opacity="${row.ours ? 1 : 0.55}"/>`;
    if (row.hi) body += `<rect x="${sx(row.lo)}" y="${y + 2}" width="${end - sx(row.lo)}" height="20" rx="4" fill="${color}" fill-opacity="0.3"/>`;
    body += `<text x="${end + 10}" y="${y + 18}" ${font} font-size="15" font-weight="700" fill="${row.ours ? TEAL : INK}">${row.hi ? `${row.lo}–${row.hi}` : row.lo}</text>`;
    y += 44;
  }
  return frame("WHERE THE TWO GRADES SIT AMONG THE LISTED BARS", "Published tensile modulus of the reference GFRP bars, grouped by tier. The market reads modulus as the quality tier.", body, "ESR values are measured means for the sizes in each report; data sheets give minimums. FengDu values are grade classes, confirmed per size.");
}

// Figure: what a GFRP bar is made of, with the ASTM D7957 property each part answers to.
function barAnatomy() {
  // Side view of a bar: core, helical wrap, sand coat on the right part.
  const bx = 90, by = 210, bw = 620, bh = 110;
  let body = `<defs><linearGradient id="core" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f4f2"/><stop offset="0.5" stop-color="#dfe7e2"/><stop offset="1" stop-color="#b9c6bf"/></linearGradient>
  <pattern id="sand" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1.6" fill="${SAND}"/><circle cx="7" cy="8" r="1.3" fill="#a8946a"/><circle cx="8" cy="2" r="1" fill="${SAND}"/></pattern>
  <clipPath id="barClip"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12"/></clipPath></defs>
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" fill="url(#core)" stroke="${GLASS_DARK}" stroke-width="1.5"/>`;
  // Fibre lines in the exposed core (left third).
  for (let i = 1; i < 11; i++) body += `<line x1="${bx + 6}" y1="${by + i * 10}" x2="${bx + 210}" y2="${by + i * 10}" stroke="#c4d1ca" stroke-width="1.2" clip-path="url(#barClip)"/>`;
  // Helical wrap over the middle and right.
  for (let x = bx + 230; x < bx + bw - 10; x += 46) body += `<path d="M ${x} ${by - 4} C ${x + 14} ${by + 30}, ${x + 22} ${by + 80}, ${x + 34} ${by + bh + 4}" stroke="#ffffff" stroke-width="13" fill="none" clip-path="url(#barClip)"/><path d="M ${x} ${by - 4} C ${x + 14} ${by + 30}, ${x + 22} ${by + 80}, ${x + 34} ${by + bh + 4}" stroke="${GLASS_DARK}" stroke-width="1" fill="none" clip-path="url(#barClip)"/>`;
  // Sand coat on the right third.
  body += `<rect x="${bx + 440}" y="${by}" width="${bw - 440}" height="${bh}" fill="url(#sand)" opacity="0.85" clip-path="url(#barClip)"/>`;
  // Zone labels above the bar.
  const zone = (x, w, text) => `<line x1="${x}" y1="${by - 22}" x2="${x + w}" y2="${by - 22}" stroke="${INK}" stroke-width="1.5"/><line x1="${x}" y1="${by - 28}" x2="${x}" y2="${by - 16}" stroke="${INK}"/><line x1="${x + w}" y1="${by - 28}" x2="${x + w}" y2="${by - 16}" stroke="${INK}"/><text x="${x + w / 2}" y="${by - 34}" text-anchor="middle" ${font} font-size="15" font-weight="700" fill="${INK}">${text}</text>`;
  body += zone(bx, 210, "Core: glass rovings in resin") + zone(bx + 225, 205, "Helical wrap") + zone(bx + 445, bw - 445, "Sand coat");
  // Cross-section.
  const cx = 930, cy = 265, r = 92;
  body += `<circle cx="${cx}" cy="${cy}" r="${r + 9}" fill="url(#sand)" stroke="#a8946a" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#e6ece8" stroke="${GLASS_DARK}" stroke-width="1.5"/>`;
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 520; i++) { const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * (r - 5); body += `<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="2.6" fill="#ffffff" stroke="#9fb2a8" stroke-width="0.6"/>`; }
  body += `<text x="${cx}" y="${cy + r + 40}" text-anchor="middle" ${font} font-size="15" font-weight="700" fill="${INK}">Section: about 3 of every 4 kg is glass</text>`;
  // Property callouts in two columns.
  const cards = [
    ["Fiber mass fraction ≥ 70%", "ASTM D2584 burn-off · glass carries the load"],
    ["Degree of cure ≥ 95%", "ASTM E2160 (DSC) · under-cured resin takes up water"],
    ["Resin Tg ≥ 100 °C", "Glass transition of the matrix · sets the service limit"],
    ["Moisture ≤ 0.25% in 24 h", "ASTM D570 · the route for alkali attack on the glass"],
    ["Bond to concrete ≥ 7.6 MPa", "ASTM D7913 · qualifies the wrap and sand surface"],
    ["Transverse shear ≥ 131 MPa", "ASTM D7617 · dowel action across cracks and joints"],
  ];
  cards.forEach(([title, text], i) => {
    const col = i % 2, row = Math.floor(i / 2), x = 90 + col * 520, y = 430 + row * 82;
    body += `<rect x="${x}" y="${y}" width="500" height="68" rx="8" fill="#f3f6f7"/><rect x="${x}" y="${y}" width="5" height="68" fill="${TEAL}"/>
    <text x="${x + 20}" y="${y + 28}" ${font} font-size="17" font-weight="700" fill="${INK}">${title}</text>
    <text x="${x + 20}" y="${y + 53}" ${font} font-size="15" fill="${MUTED}">${text}</text>`;
  });
  return frame("INSIDE A GFRP BAR, AND THE TEST EACH PART ANSWERS TO", "Unidirectional glass rovings in a thermoset resin, with a wrap and sand surface for bond. ASTM D7957 minimums shown.", body, "Schematic, not to scale. The datasheet of the offered grade names its glass, resin and surface type; the qualification report gives the measured values.");
}

// Figure: a GFRP bar line, with where qualification and lot control happen.
function barLine() {
  const steps = [
    ["Creel", "Glass rovings, one\ntype per grade"],
    ["Resin bath", "Thermoset resin,\nwetted out in line"],
    ["Wrap &amp; sand", "Helical wrap and\nsand for bond"],
    ["Cure", "Heated die and oven,\ncured before cutting"],
    ["Pull &amp; cut", "Constant pull,\nsaw to length"],
    ["Label &amp; bundle", "Lot number on\nevery bundle"],
  ];
  const y = 200, w = 150, gap = 24, x0 = (W - (steps.length * w + (steps.length - 1) * gap)) / 2;
  let body = "";
  steps.forEach(([title, text], i) => {
    const x = x0 + i * (w + gap);
    body += `<rect x="${x}" y="${y}" width="${w}" height="120" rx="10" fill="${i === 3 ? "#e7f2f0" : "#f3f6f7"}" stroke="${i === 3 ? TEAL : LINE}" stroke-width="1.5"/>
    <text x="${x + w / 2}" y="${y + 34}" text-anchor="middle" ${font} font-size="18" font-weight="700" fill="${INK}">${title}</text>`;
    text.split("\n").forEach((line, j) => { body += `<text x="${x + w / 2}" y="${y + 66 + j * 22}" text-anchor="middle" ${font} font-size="14" fill="${MUTED}">${line}</text>`; });
    if (i < steps.length - 1) body += `<path d="M ${x + w + 4} ${y + 60} L ${x + w + gap - 4} ${y + 60}" stroke="${TEAL}" stroke-width="3"/><path d="M ${x + w + gap - 10} ${y + 53} L ${x + w + gap - 3} ${y + 60} L ${x + w + gap - 10} ${y + 67}" fill="none" stroke="${TEAL}" stroke-width="3"/>`;
  });
  // The continuous bar running under the line.
  body += `<rect x="${x0}" y="${y + 146}" width="${steps.length * w + (steps.length - 1) * gap}" height="16" rx="8" fill="${GLASS}" stroke="${GLASS_DARK}"/>`;
  // Two evidence tracks.
  const track = (yy, color, title, lines) => {
    let s = `<rect x="90" y="${yy}" width="1020" height="${48 + lines.length * 26}" rx="10" fill="#ffffff" stroke="${color}" stroke-width="2"/>
    <text x="114" y="${yy + 30}" ${font} font-size="17" font-weight="700" fill="${color}">${title}</text>`;
    lines.forEach((line, j) => { s += `<text x="114" y="${yy + 58 + j * 26}" ${font} font-size="15" fill="${INK}">${line}</text>`; });
    return s;
  };
  body += track(396, TEAL, "Qualification · once per grade and size, by an independent laboratory", [
    "Full ASTM D7957 property set: guaranteed tensile force, modulus, strain, transverse shear, bond, fiber content, cure, Tg, moisture, alkali",
    "Bent shapes tested separately to ASTM D7914 · the report names the laboratory, the standard and its edition",
  ]);
  body += track(540, AMBER, "Lot control · every production lot, traceable to the delivered bundles", [
    "Diameter, measured area and tensile tests on lot samples, at the frequency agreed for the order",
    "Lot certificate shipped with the bars; bundle labels carry lot, size, length and bar mark",
  ]);
  return frame("FROM ROVING TO LOT CERTIFICATE", "A GFRP bar is pultruded in one continuous pass. The evidence a buyer receives comes from two different tracks.", body, "Schematic of a GFRP bar line, not a plant layout. Lot test frequency and acceptance values are agreed with the order against the project specification.");
}

const figures = [
  ["gfrp-rebar-modulus-benchmark.webp", modulusBenchmark()],
  ["gfrp-rebar-anatomy.webp", barAnatomy()],
  ["gfrp-rebar-line-and-evidence.webp", barLine()],
];
for (const [name, svg] of figures) {
  await sharp(Buffer.from(svg)).webp({ quality: 86 }).toFile(`${OUT}/${name}`);
  console.log("wrote", `${OUT}/${name}`);
}
