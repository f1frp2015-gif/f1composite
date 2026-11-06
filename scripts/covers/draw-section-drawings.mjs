// node scripts/covers/draw-section-drawings.mjs
// Draws one dimensioned cross-section per standard catalog size (lib/catalog/standardProfiles.ts)
// as a 1200x900 WebP in public/images/sections, named by lib/sectionDrawings.ts. Geometry comes
// from the same section engine the datasheet pages use (lib/catalog/shapes.ts), so the file and
// the page always agree. White ground, brand teal section, graphite text, drawn to scale.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { loadProjectModule } from "../load-project-module.mjs";

const root = resolve(import.meta.dirname, "../..");
const { buildProducts } = loadProjectModule("lib/catalog/standardProfiles.ts");
const { buildSection, computeProperties, dimensionRows } = loadProjectModule("lib/catalog/shapes.ts");
const { catalogIdentity } = loadProjectModule("lib/catalog/identity.ts");
const { datasheetFamily } = loadProjectModule("lib/datasheetContent.ts");
const { sectionDrawingPath, sectionDrawingSize, SECTION_DRAWING_SIZE } = loadProjectModule("lib/sectionDrawings.ts");

const { width: W, height: H } = SECTION_DRAWING_SIZE;
const TEAL = "#0f766e", FILL = "#d7efec", INK = "#1f2a30", MUTED = "#6b7a82", LINE = "#d5d9dc", DIM = "#33424a";
const font = `font-family="DM Sans, Helvetica, Arial, sans-serif"`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = (value, digits = 0) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const mm = (value) => `${fmt(value, Number.isInteger(value) ? 0 : 1)}`;

// Drawing box (left), legend (right).
const BOX = { x0: 150, y0: 200, x1: 700, y1: 760 };

function ringPath(ring) {
  return ring.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z";
}

function arrowHead(x, y, dir) {
  const s = 9;
  const pts = {
    left: [[x, y], [x + s, y - s / 2], [x + s, y + s / 2]],
    right: [[x, y], [x - s, y - s / 2], [x - s, y + s / 2]],
    up: [[x, y], [x - s / 2, y + s], [x + s / 2, y + s]],
    down: [[x, y], [x - s / 2, y - s], [x + s / 2, y - s]],
  }[dir];
  return `<path d="M${pts.map((p) => p.join(" ")).join(" L")} Z" fill="${DIM}"/>`;
}

function horizontalDim(xa, xb, yEdge, yLine, label) {
  return `<line x1="${xa}" y1="${yEdge}" x2="${xa}" y2="${yLine - 8}" stroke="${DIM}" stroke-width="1"/>
  <line x1="${xb}" y1="${yEdge}" x2="${xb}" y2="${yLine - 8}" stroke="${DIM}" stroke-width="1"/>
  <line x1="${xa}" y1="${yLine}" x2="${xb}" y2="${yLine}" stroke="${DIM}" stroke-width="1.4"/>
  ${arrowHead(xa, yLine, "left")}${arrowHead(xb, yLine, "right")}
  <text x="${(xa + xb) / 2}" y="${yLine - 12}" ${font} font-size="24" font-weight="600" fill="${INK}" text-anchor="middle">${esc(label)}</text>`;
}

function verticalDim(ya, yb, xEdge, xLine, label) {
  const cy = (ya + yb) / 2;
  return `<line x1="${xEdge}" y1="${ya}" x2="${xLine - 8}" y2="${ya}" stroke="${DIM}" stroke-width="1"/>
  <line x1="${xEdge}" y1="${yb}" x2="${xLine - 8}" y2="${yb}" stroke="${DIM}" stroke-width="1"/>
  <line x1="${xLine}" y1="${ya}" x2="${xLine}" y2="${yb}" stroke="${DIM}" stroke-width="1.4"/>
  ${arrowHead(xLine, ya, "up")}${arrowHead(xLine, yb, "down")}
  ${yb - ya < 120
    ? `<text x="${xLine - 16}" y="${cy + 8}" ${font} font-size="24" font-weight="600" fill="${INK}" text-anchor="end">${esc(label)}</text>`
    : `<text x="${xLine - 14}" y="${cy}" ${font} font-size="24" font-weight="600" fill="${INK}" text-anchor="middle" transform="rotate(-90 ${xLine - 14} ${cy})">${esc(label)}</text>`}`;
}

/** Which dimension values label the overall width and height of the drawn outline. */
function overallLabels(shape, d) {
  switch (shape) {
    case "i_beam":
    case "channel":
    case "rhs":
      return { w: `B = ${mm(d.B)}`, h: `H = ${mm(d.H)}` };
    case "angle":
      return { w: `b = ${mm(d.b)}`, h: `a = ${mm(d.a)}` };
    case "shs":
      return { w: `D = ${mm(d.D)}`, h: `D = ${mm(d.D)}` };
    case "tube":
      return { w: `OD = ${mm(d.OD)}`, h: null };
    case "rod":
      return { w: `D = ${mm(d.D)}`, h: null };
    case "flat": // drawn lying down: width (H) across, thickness (B) up, as in the dimension table
      return { w: `H = ${mm(d.H)}`, h: `B = ${mm(d.B)}` };
    default:
      return { w: null, h: null };
  }
}

function drawing(product) {
  const { shape, dims } = product.geometry;
  const geometry = { kind: "parametric", shape, dims };
  const section = buildSection(geometry);
  const props = computeProperties(geometry);
  const family = datasheetFamily(shape);
  const { slug } = catalogIdentity(product.model, product.cat, dims);

  // Flat bars are stored standing (H = width); lay them down so they read as bars.
  const turn = shape === "flat" ? ([x, y]) => [y, x] : (p) => p;
  const outer = section.outer.map(turn);
  const holes = (section.holes ?? []).map((ring) => ring.map(turn));

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of outer) {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
  const w = maxX - minX, h = maxY - minY;
  const scale = Math.min((BOX.x1 - BOX.x0) / w, (BOX.y1 - BOX.y0) / h);
  const cx = (BOX.x0 + BOX.x1) / 2, cy = (BOX.y0 + BOX.y1) / 2;
  const tx = (x) => cx + (x - (minX + maxX) / 2) * scale;
  const ty = (y) => cy - (y - (minY + maxY) / 2) * scale;
  const map = (ring) => ring.map(([x, y]) => [tx(x), ty(y)]);
  const left = tx(minX), right = tx(maxX), top = ty(maxY), bottom = ty(minY);

  const labels = overallLabels(shape, dims);
  const dimsSvg = [
    labels.w ? horizontalDim(left, right, top - 6, top - 40, labels.w) : "",
    labels.h ? verticalDim(top, bottom, left - 6, left - 44, labels.h) : "",
  ].join("\n");

  const rows = [
    ...dimensionRows(geometry).map((r) => [r.symbol, r.label, `${mm(r.value)} mm`]),
    ["A", "Section area", `${fmt(props.A)} mm²`],
    ["Ix", "Moment of inertia", `${fmt(props.Ix / 1e4, 1)} cm⁴`],
    ["m", "Published mass", `${product.weight} kg/m`],
  ];
  const legend = rows
    .map(([symbol, label, value], i) => {
      const y = 236 + i * 58;
      return `<text x="790" y="${y}" ${font} font-size="22" font-weight="700" fill="${TEAL}">${esc(symbol)}</text>
  <text x="850" y="${y}" ${font} font-size="19" fill="${MUTED}">${esc(label)}</text>
  <text x="850" y="${y + 26}" ${font} font-size="23" font-weight="600" fill="${INK}">${esc(value)}</text>`;
    })
    .join("\n");

  const title = `${family.label} ${sectionDrawingSize(product.model)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="70" y="70" ${font} font-size="19" font-weight="600" fill="${TEAL}" letter-spacing="2">PULTRUDED FIBERGLASS CROSS-SECTION · DRAWN TO SCALE</text>
  <text x="70" y="116" ${font} font-size="38" font-weight="700" fill="${INK}">${esc(title)}</text>
  <line x1="760" y1="190" x2="760" y2="${190 + rows.length * 58}" stroke="${LINE}"/>
  <path d="${ringPath(map(outer))}" fill="${FILL}" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round"/>
  ${holes.map((ring) => `<path d="${ringPath(map(ring))}" fill="#ffffff" stroke="${TEAL}" stroke-width="2"/>`).join("\n")}
  ${dimsSvg}
  ${legend}
  <line x1="70" y1="826" x2="1130" y2="826" stroke="${LINE}"/>
  <text x="70" y="858" ${font} font-size="17" fill="${MUTED}">Nominal dimensions in mm. A and Ix calculated from the nominal section; mass is the published catalog value.</text>
  <text x="70" y="884" ${font} font-size="17" font-weight="600" fill="${TEAL}">f1composite.com/datasheets/${esc(slug)}</text>
</svg>`;
}

const outDir = resolve(root, "public/images/sections");
mkdirSync(outDir, { recursive: true });
const products = buildProducts();
const seen = new Set();
for (const product of products) {
  const path = sectionDrawingPath(product.model, product.geometry.shape);
  if (seen.has(path)) throw new Error(`duplicate drawing name ${path}`);
  seen.add(path);
  await sharp(Buffer.from(drawing(product))).webp({ quality: 86 }).toFile(resolve(root, `public${path}`));
}
console.log(`drew ${products.length} section drawings into public/images/sections`);
