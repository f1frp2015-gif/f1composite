// node scripts/draw-flat-bar-cover.mjs public/images/covers/frp-flat-bar.webp
// Draw an isometric pultruded flat bar in the style of the product renders
// (light glass-fibre grey, soft shading, white ground) and save a 1200x750 cover.
import sharp from "sharp";
const [, , out] = process.argv;
const W = 1200, H = 750;
const s = 2.45;                // px per mm
const w = 60 * s, t = 12 * s, L = 380 * s;   // a flat bar about 60×12, long enough to read as bar stock
const cx = 0.866, sy = 0.5;
const P = (x, y, z) => [cx * (x + y), sy * x - sy * y - z];
const pts = { e0: P(0, 0, 0), e1: P(w, 0, 0), e2: P(w, 0, t), e3: P(0, 0, t), f1: P(w, L, 0), f2: P(w, L, t), f3: P(0, L, t) };
const all = Object.values(pts);
const minX = Math.min(...all.map((p) => p[0])), maxX = Math.max(...all.map((p) => p[0]));
const minY = Math.min(...all.map((p) => p[1])), maxY = Math.max(...all.map((p) => p[1]));
const ox = (W - (maxX - minX)) / 2 - minX, oy = (H - (maxY - minY)) / 2 - minY - 10;
const f = (p) => `${(p[0] + ox).toFixed(1)},${(p[1] + oy).toFixed(1)}`;
const poly = (...ps) => ps.map(f).join(" ");
// Brushed fibre lines along the length on the top face.
let lines = "";
for (let i = 1; i < 26; i++) {
  const x = (w * i) / 26 + (Math.sin(i * 12.9) * w) / 90;
  const a = P(x, 6, t), b = P(x, L - 6, t);
  lines += `<line x1="${(a[0] + ox).toFixed(1)}" y1="${(a[1] + oy).toFixed(1)}" x2="${(b[0] + ox).toFixed(1)}" y2="${(b[1] + oy).toFixed(1)}" stroke="#ffffff" stroke-opacity="${(0.25 + 0.35 * Math.abs(Math.sin(i * 7.1))).toFixed(2)}" stroke-width="${(0.8 + Math.abs(Math.sin(i * 3.3))).toFixed(1)}"/>`;
}
// Fibre ends on the cut face.
let dots = "";
for (let i = 0; i < 90; i++) {
  const x = ((i * 37) % 97) / 97 * w, z = ((i * 53) % 89) / 89 * t;
  const p = P(x, 0, z);
  dots += `<circle cx="${(p[0] + ox).toFixed(1)}" cy="${(p[1] + oy).toFixed(1)}" r="1.1" fill="#a4abb1" fill-opacity="0.8"/>`;
}
const shadowC = P(w / 2 + 10, L / 2, -2);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="top" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#d5d9dc"/><stop offset="0.55" stop-color="#e8eaec"/><stop offset="1" stop-color="#dadde0"/></linearGradient>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfc4c8"/><stop offset="1" stop-color="#cdd1d4"/></linearGradient>
    <linearGradient id="end" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9cdd1"/><stop offset="1" stop-color="#b8bdc2"/></linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff"/>
  <ellipse cx="${(shadowC[0] + ox).toFixed(1)}" cy="${(shadowC[1] + oy + 26).toFixed(1)}" rx="${(L * 0.52).toFixed(1)}" ry="36" fill="#0b1838" fill-opacity="0.10" filter="url(#blur)" transform="rotate(-30 ${(shadowC[0] + ox).toFixed(1)} ${(shadowC[1] + oy + 26).toFixed(1)})"/>
  <polygon points="${poly(pts.e1, pts.f1, pts.f2, pts.e2)}" fill="url(#side)"/>
  <polygon points="${poly(pts.e3, pts.e2, pts.f2, pts.f3)}" fill="url(#top)"/>
  ${lines}
  <polygon points="${poly(pts.e0, pts.e1, pts.e2, pts.e3)}" fill="url(#end)"/>
  ${dots}
  <polyline points="${poly(pts.e3, pts.e2, pts.f2)}" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.6"/>
  <polyline points="${poly(pts.e0, pts.e1, pts.f1)}" fill="none" stroke="#b7bcc1" stroke-width="1"/>
</svg>`;
await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(out);
console.log(out);
