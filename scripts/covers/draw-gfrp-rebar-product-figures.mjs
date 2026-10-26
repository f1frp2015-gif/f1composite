// node scripts/covers/draw-gfrp-rebar-product-figures.mjs
// Draws the schematic figures on the GFRP rebar product page (1200x750 WebP, white ground,
// brand teal #0f766e, graphite text) with sharp: the two modulus grades against steel, the
// 15-size ladder, bent-bar geometry, nonmetallic accessories and a rock bolt. Schematic,
// not to scale; class values, not a datasheet.
import sharp from "sharp";
const W = 1200, H = 750;
const TEAL = "#0f766e", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", GLASS = "#dfe3e6", GLASS_DARK = "#b9c0c6", STEEL = "#8a949b", AMBER = "#d97706";
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

function barBody(x, y, w, h, id, horizontal = true) {
  const grad = horizontal ? `x1="0" y1="0" x2="0" y2="1"` : `x1="0" y1="0" x2="1" y2="0"`;
  return `<defs><linearGradient id="${id}" ${grad}><stop offset="0" stop-color="#eef1f3"/><stop offset="0.5" stop-color="${GLASS}"/><stop offset="1" stop-color="${GLASS_DARK}"/></linearGradient></defs>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}" fill="url(#${id})" stroke="${GLASS_DARK}" stroke-width="1.5"/>`;
}

// Figure: stress-strain of the two modulus classes against Grade 60 steel.
function gradesStressStrain() {
  const x0 = 150, y0 = 630, pw = 920, ph = 470; // plot origin and size
  const sx = (strain) => x0 + (strain / 2.5) * pw;
  const sy = (mpa) => y0 - (mpa / 1200) * ph;
  let axes = `<line x1="${x0}" y1="${y0}" x2="${x0 + pw}" y2="${y0}" stroke="${INK}" stroke-width="2"/>
  <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - ph}" stroke="${INK}" stroke-width="2"/>`;
  for (const mpa of [200, 400, 600, 800, 1000, 1200]) axes += `<line x1="${x0}" y1="${sy(mpa)}" x2="${x0 + pw}" y2="${sy(mpa)}" stroke="${LINE}"/><text x="${x0 - 14}" y="${sy(mpa) + 6}" text-anchor="end" ${font} font-size="15" fill="${MUTED}">${mpa.toLocaleString("en-US")}</text>`;
  for (const strain of [0.5, 1, 1.5, 2, 2.5]) axes += `<line x1="${sx(strain)}" y1="${y0}" x2="${sx(strain)}" y2="${y0 + 8}" stroke="${INK}"/><text x="${sx(strain)}" y="${y0 + 30}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">${strain.toFixed(1)}%</text>`;
  axes += `<text x="${x0 + pw / 2}" y="${y0 + 58}" text-anchor="middle" ${font} font-size="16" fill="${INK}">Tensile strain</text>
  <text x="${x0 - 92}" y="${y0 - ph / 2}" transform="rotate(-90 ${x0 - 92} ${y0 - ph / 2})" text-anchor="middle" ${font} font-size="16" fill="${INK}">Tensile stress, MPa</text>`;
  // Steel: 200 GPa to 420 MPa, then a plateau (schematic, strain hardening omitted).
  const steel = `<path d="M ${x0} ${y0} L ${sx(0.21)} ${sy(420)} L ${sx(2.4)} ${sy(420)}" fill="none" stroke="${STEEL}" stroke-width="5" stroke-linecap="round"/>
  <text x="${sx(1.45)}" y="${sy(420) - 14}" ${font} font-size="17" font-weight="700" fill="${STEEL}">Steel Grade 60 · 200 GPa · yields at 420 MPa</text>`;
  // GFRP 60: linear at 60 GPa to about 1,000 MPa. GFRP 45: linear at 45 GPa to about 900 MPa.
  const rupture = (x, y, color) => `<path d="M ${x - 9} ${y - 9} L ${x + 9} ${y + 9} M ${x - 9} ${y + 9} L ${x + 9} ${y - 9}" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
  const g60 = `<path d="M ${x0} ${y0} L ${sx(1000 / 600)} ${sy(1000)}" fill="none" stroke="${TEAL}" stroke-width="6" stroke-linecap="round"/>${rupture(sx(1000 / 600), sy(1000), TEAL)}
  <text x="${sx(1000 / 600) - 30}" y="${sy(1000) - 22}" text-anchor="end" ${font} font-size="19" font-weight="700" fill="${TEAL}">GFRP 60 · 60 GPa class</text>`;
  const g45 = `<path d="M ${x0} ${y0} L ${sx(900 / 450)} ${sy(900)}" fill="none" stroke="${TEAL}" stroke-opacity="0.55" stroke-width="6" stroke-linecap="round"/>${rupture(sx(900 / 450), sy(900), TEAL)}
  <text x="${sx(900 / 450) - 10}" y="${sy(900) - 26}" ${font} font-size="19" font-weight="700" fill="${TEAL}" fill-opacity="0.8">GFRP 45 · 45 GPa class</text>`;
  const nx = x0 + pw - 440, ny = y0 - 130;
  const note = `<rect x="${nx}" y="${ny}" width="420" height="78" rx="8" fill="#f3f6f7"/>
  <text x="${nx + 16}" y="${ny + 30}" ${font} font-size="16" font-weight="700" fill="${INK}">Linear to rupture, no yield plateau</text>
  <text x="${nx + 16}" y="${ny + 56}" ${font} font-size="15" fill="${MUTED}">Crack width and deflection, not strength, usually size the bar.</text>`;
  return frame("TWO MODULUS GRADES AGAINST STEEL", "Guaranteed strength is size-dependent (about 800 to 1,100 MPa); ASTM D7957 sets the modulus floor at 44.8 GPa.", axes + steel + g45 + g60 + note, "Schematic, not to scale. Class values for orientation; the qualification report of the offered grade states the guaranteed force and modulus per size.");
}

// Figure: the 15 metric diameters drawn to one scale with the closest ASTM designation.
function sizeLadder() {
  const sizes = [[6, "No. 2"], [8, "No. 3"], [10, "No. 3"], [12, "No. 4"], [14, "No. 4"], [16, "No. 5"], [18, "No. 6"], [20, "No. 6"], [22, "No. 7"], [25, "No. 8"], [28, "No. 9"], [30, "No. 9"], [32, "No. 10"], [34, "No. 10"], [36, "No. 10"]];
  const scale = 3.1, gap = 11, base = 470;
  const total = sizes.reduce((sum, [d]) => sum + d * scale, 0) + gap * (sizes.length - 1);
  let x = (W - total) / 2, body = "";
  sizes.forEach(([d, astm], i) => {
    const r = (d * scale) / 2, cx = x + r, cy = base - r;
    const tier = d <= 16 ? "flatwork, precast, walls" : d <= 25 ? "marine, buildings, water" : "bridges, soft-eyes";
    body += `<defs><radialGradient id="s${i}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#f1f4f6"/><stop offset="1" stop-color="${GLASS_DARK}"/></radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#s${i})" stroke="${d <= 16 ? TEAL : INK}" stroke-width="${d <= 16 ? 2.5 : 2}"/>
    <text x="${cx}" y="${base + 28}" text-anchor="middle" ${font} font-size="16" font-weight="700" fill="${INK}">${d}</text>
    <text x="${cx}" y="${base + (i < 4 && i % 2 ? 70 : 50)}" text-anchor="middle" ${font} font-size="13" fill="${MUTED}">${astm}</text>`;
    if (i === 0 || sizes[i - 1][0] > 16 !== d > 16 || sizes[i - 1][0] > 25 !== d > 25) body += `<text x="${cx - r}" y="${base - d * scale - 24}" ${font} font-size="15" fill="${TEAL}">${tier}</text>`;
    x += d * scale + gap;
  });
  body += `<text x="${(W - total) / 2}" y="${base + 108}" ${font} font-size="16" fill="${INK}">Ø mm (top) · closest ASTM D7957 bar number (below). US bar numbers and metric sizes are not interchangeable one for one.</text>
  <text x="${(W - total) / 2}" y="${base + 136}" ${font} font-size="16" fill="${INK}">Mass about a quarter of steel: Ø12 mm ≈ 0.21 kg/m, Ø25 mm ≈ 0.93 kg/m (calculated at 2.0 g/cm³).</text>
  <line x1="${(W - total) / 2}" y1="${base + 8}" x2="${(W + total) / 2}" y2="${base + 8}" stroke="${LINE}"/>`;
  return frame("15 DIAMETERS · Ø6 TO Ø36 MM", "One inquiry list covering No. 2 to No. 10; both modulus grades are offered in every size.", body, "Schematic, drawn to one scale. Inquiry sizes, not a stock list; measured area, tolerance and unit mass come from the quotation.");
}

// Figure: a closed stirrup and an L-shaped starter bar with the dimensions a bending schedule needs.
function bendGeometry() {
  const sx = 160, sy = 170, sw = 400, sh = 330, r = 60, t = 26; // stirrup outer box
  // One continuous bar: from the first hook tail round the four corners to the second hook tail, both ends lapping at the top-left corner.
  const stirrup = `<path d="M ${sx + 230} ${sy + 50} L ${sx + 190} ${sy} H ${sx + sw - r} A ${r} ${r} 0 0 1 ${sx + sw} ${sy + r} V ${sy + sh - r} A ${r} ${r} 0 0 1 ${sx + sw - r} ${sy + sh} H ${sx + r} A ${r} ${r} 0 0 1 ${sx} ${sy + sh - r} V ${sy + r} A ${r} ${r} 0 0 1 ${sx + r} ${sy} H ${sx + 110} L ${sx + 150} ${sy + 50}" fill="none" stroke="${TEAL}" stroke-width="${t}" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${sx + 190}" y="${sy + 90}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">135° hooks · tail length per code</text>
  <!-- inside radius callout -->
  <path d="M ${sx + t / 2} ${sy + r} A ${r - t / 2} ${r - t / 2} 0 0 1 ${sx + r} ${sy + t / 2}" fill="none" stroke="${AMBER}" stroke-width="3" stroke-dasharray="6 5"/>
  <line x1="${sx + r}" y1="${sy + r}" x2="${sx + t / 2 + 8}" y2="${sy + r - 8}" stroke="${AMBER}" stroke-width="2"/>
  <text x="${sx - 120}" y="${sy + r + 48}" ${font} font-size="16" font-weight="700" fill="${AMBER}">inside bend</text>
  <text x="${sx - 120}" y="${sy + r + 70}" ${font} font-size="16" font-weight="700" fill="${AMBER}">radius r</text>
  <!-- dimensions -->
  <line x1="${sx - t / 2}" y1="${sy + sh + 46}" x2="${sx + sw + t / 2}" y2="${sy + sh + 46}" stroke="${INK}" stroke-width="1.5"/>
  <line x1="${sx - t / 2}" y1="${sy + sh + 38}" x2="${sx - t / 2}" y2="${sy + sh + 54}" stroke="${INK}" stroke-width="1.5"/>
  <line x1="${sx + sw + t / 2}" y1="${sy + sh + 38}" x2="${sx + sw + t / 2}" y2="${sy + sh + 54}" stroke="${INK}" stroke-width="1.5"/>
  <text x="${sx + sw / 2}" y="${sy + sh + 74}" text-anchor="middle" ${font} font-size="16" fill="${INK}">A · out-to-out</text>
  <line x1="${sx + sw + 50}" y1="${sy - t / 2}" x2="${sx + sw + 50}" y2="${sy + sh + t / 2}" stroke="${INK}" stroke-width="1.5"/>
  <line x1="${sx + sw + 42}" y1="${sy - t / 2}" x2="${sx + sw + 58}" y2="${sy - t / 2}" stroke="${INK}" stroke-width="1.5"/>
  <line x1="${sx + sw + 42}" y1="${sy + sh + t / 2}" x2="${sx + sw + 58}" y2="${sy + sh + t / 2}" stroke="${INK}" stroke-width="1.5"/>
  <text x="${sx + sw + 66}" y="${sy + sh / 2 + 6}" ${font} font-size="16" fill="${INK}">B</text>
  <text x="${sx}" y="${sy + sh + 110}" ${font} font-size="18" font-weight="700" fill="${INK}">Closed stirrup · shape code, A × B, r, tail, quantity</text>`;
  // L-shaped starter bar
  const lx = 800, ly = 190, leg = 300, foot = 190, lr = 56;
  const starter = `<path d="M ${lx} ${ly} V ${ly + leg - lr} A ${lr} ${lr} 0 0 0 ${lx + lr} ${ly + leg} H ${lx + foot}" fill="none" stroke="${TEAL}" stroke-width="${t}" stroke-linecap="round"/>
  <rect x="${lx - 110}" y="${ly + leg + 30}" width="${foot + 170}" height="54" fill="#eceff1" stroke="${LINE}"/>
  <text x="${lx - 100}" y="${ly + leg + 64}" ${font} font-size="14" fill="${MUTED}">footing</text>
  <text x="${lx + 30}" y="${ly + 40}" ${font} font-size="16" fill="${INK}">vertical leg</text>
  <text x="${lx + 40}" y="${ly + leg - 30}" ${font} font-size="16" fill="${INK}">foot</text>
  <text x="${lx - 40}" y="${ly + leg + 140}" ${font} font-size="18" font-weight="700" fill="${INK}">L-shaped starter bar</text>
  <text x="${lx - 40}" y="${ly + leg + 166}" ${font} font-size="15" fill="${MUTED}">walls, columns, pile cages, corners</text>`;
  const rule = `<rect x="700" y="112" width="410" height="64" rx="8" fill="#f3f6f7"/>
  <text x="716" y="138" ${font} font-size="16" font-weight="700" fill="${INK}">Bent portion ≥ 60% of the straight-bar force</text>
  <text x="716" y="162" ${font} font-size="15" fill="${MUTED}">ASTM D7957 minimum; stirrups are designed with the bent value.</text>`;
  return frame("FACTORY-FORMED BENDS · WHAT THE SCHEDULE NEEDS", "Shapes are formed before the resin cures and cannot be bent, heated or welded on site.", stirrup + starter + rule, "Schematic, not to scale. Inside radius, leg dimensions and tolerances are confirmed against the drawing before manufacture.");
}

// Figure: the nonmetallic items that keep an MRI or rail mat free of steel.
function accessories() {
  const base = 520;
  // 1. plastic chair under a bar
  const c1 = `<path d="M 150 ${base} l 22 -70 h 46 l 22 70 Z" fill="#d7dde1" stroke="${INK}" stroke-width="2"/>
  <path d="M 172 ${base - 70} q 23 -22 46 0" fill="none" stroke="${INK}" stroke-width="2"/>
  ${barBody(60, base - 100, 270, 26, "a1")}
  <text x="195" y="${base + 40}" text-anchor="middle" ${font} font-size="18" font-weight="700" fill="${INK}">Plastic chair</text>
  <text x="195" y="${base + 64}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">sets the cover · no steel foot</text>`;
  // 2. tie at a crossing
  const cx = 600, cy = base - 100;
  const c2 = `${barBody(cx - 140, cy - 13, 280, 26, "a2")}${barBody(cx - 13, cy - 120, 26, 240, "a3", false)}
  <path d="M ${cx - 30} ${cy - 30} L ${cx + 30} ${cy + 30} M ${cx - 30} ${cy + 30} L ${cx + 30} ${cy - 30}" stroke="${TEAL}" stroke-width="7" stroke-linecap="round"/>
  <text x="${cx}" y="${base + 40}" text-anchor="middle" ${font} font-size="18" font-weight="700" fill="${INK}">Nylon or coated tie</text>
  <text x="${cx}" y="${base + 64}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">holds the mat against flotation</text>`;
  // 3. coupler sleeve between a GFRP bar and a steel bar
  const kx = 1000, ky = base - 100;
  const c3 = `${barBody(kx - 170, ky - 13, 170, 26, "a4")}
  <rect x="${kx}" y="${ky - 13}" width="170" height="26" rx="4" fill="${STEEL}"/>
  <rect x="${kx - 50}" y="${ky - 24}" width="100" height="48" rx="6" fill="${TEAL}"/>
  <text x="${kx}" y="${ky + 5}" text-anchor="middle" ${font} font-size="13" font-weight="700" fill="#ffffff">coupler</text>
  <text x="${kx - 90}" y="${ky - 34}" text-anchor="middle" ${font} font-size="14" fill="${MUTED}">GFRP</text>
  <text x="${kx + 100}" y="${ky - 34}" text-anchor="middle" ${font} font-size="14" fill="${MUTED}">steel, outside the zone</text>
  <text x="${kx}" y="${base + 40}" text-anchor="middle" ${font} font-size="18" font-weight="700" fill="${INK}">Coupler</text>
  <text x="${kx}" y="${base + 64}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">engineered splice to steel</text>`;
  const zone = `<rect x="60" y="130" width="780" height="480" rx="10" fill="none" stroke="${TEAL}" stroke-width="2" stroke-dasharray="10 8"/>
  <text x="76" y="160" ${font} font-size="15" font-weight="700" fill="${TEAL}">NONMETALLIC ZONE · MRI, rail detection, compass pad</text>`;
  return frame("ACCESSORIES THAT KEEP THE MAT NONMETALLIC", "Chairs, ties and couplers are raised with the bar schedule and sourced with the bars when the project needs them.", zone + c1 + c2 + c3, "Schematic, not to scale. Accessory types and quantities are confirmed per inquiry; the equipment supplier's exclusion zone governs.");
}

// Figure: a fully grouted GFRP rock bolt in section.
function rockBolt() {
  const gy = 150, gh = 440; // ground block
  let ground = `<rect x="330" y="${gy}" width="780" height="${gh}" fill="#eceff1" stroke="${LINE}"/>`;
  for (let i = 0; i < 40; i++) { const x = 340 + ((i * 97) % 760), y = gy + 12 + ((i * 53) % (gh - 24)); ground += `<path d="M ${x} ${y} l 12 6 l -4 10" fill="none" stroke="${GLASS_DARK}" stroke-width="1.5"/>`; }
  const by = gy + gh / 2;
  const hole = `<rect x="330" y="${by - 34}" width="700" height="68" rx="34" fill="#c9d1d6"/>
  <text x="700" y="${by - 48}" text-anchor="middle" ${font} font-size="15" fill="${MUTED}">resin or cement grout · full column</text>`;
  let bar = barBody(290, by - 14, 720, 28, "rb");
  for (let i = 0; i < 24; i++) { const x = 340 + i * 28; bar += `<line x1="${x}" y1="${by - 14}" x2="${x + 10}" y2="${by + 14}" stroke="${GLASS_DARK}" stroke-width="3"/>`; }
  const plate = `<rect x="296" y="${by - 90}" width="24" height="180" rx="3" fill="#d7dde1" stroke="${INK}" stroke-width="2"/>
  <rect x="256" y="${by - 26}" width="44" height="52" rx="6" fill="${TEAL}"/>
  <text x="300" y="${by + 110}" text-anchor="end" ${font} font-size="16" font-weight="700" fill="${INK}">plate + nut</text>
  <text x="300" y="${by + 134}" text-anchor="end" ${font} font-size="15" fill="${MUTED}">at the excavation face</text>
  <line x1="330" y1="${gy - 24}" x2="330" y2="${gy + gh + 24}" stroke="${INK}" stroke-width="2"/>
  <text x="340" y="${gy + gh + 40}" ${font} font-size="15" fill="${MUTED}">rock or soil</text>
  <text x="90" y="${gy + 40}" ${font} font-size="15" fill="${MUTED}">tunnel, shaft or slope</text>
  <text x="700" y="${by + 110}" text-anchor="middle" ${font} font-size="16" font-weight="700" fill="${INK}">threaded GFRP bar · cuttable by the machine on the next advance</text>`;
  return frame("ROCK BOLTS AND SOIL NAILS · SEPARATE PRODUCT FAMILY", "Threaded GFRP bolts have their own test basis; they are quoted after a review of the ground conditions and the bolt specification.", ground + hole + bar + plate, "Schematic, not to scale. Bolt diameter, thread, length, grout and plate are specified by the ground engineer.");
}

const figures = [
  ["gfrp-rebar-grades-stress-strain.webp", gradesStressStrain],
  ["gfrp-rebar-size-ladder.webp", sizeLadder],
  ["gfrp-rebar-bend-geometry.webp", bendGeometry],
  ["gfrp-rebar-nonmetallic-accessories.webp", accessories],
  ["gfrp-rock-bolt-section.webp", rockBolt],
];
for (const [file, draw] of figures) {
  await sharp(Buffer.from(draw())).webp({ quality: 88 }).toFile(`${OUT}/${file}`);
  console.log("wrote", `${OUT}/${file}`);
}
