// node scripts/compose-family-cover.mjs <out> <src1> <src2> ...
// Arrange several product cut-outs side by side on a 1200x750 white canvas,
// for a family card that stands for more than one section.
import sharp from "sharp";
const [, , out, ...srcs] = process.argv;
const W = 1200, H = 750;
const n = srcs.length;
const slot = (W * 0.84) / n;
const layers = [];
for (const [i, src] of srcs.entries()) {
  const trimmed = await sharp(src).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  // Stagger the pieces slightly so they read as a group rather than a row of icons.
  const maxW = slot * 1.12, maxH = H * (0.56 + (i % 2) * 0.05);
  const scale = Math.min(maxW / width, maxH / height);
  const rw = Math.round(width * scale), rh = Math.round(height * scale);
  const input = await sharp(trimmed.data).resize(rw, rh).toBuffer();
  const cx = W * 0.08 + slot * (i + 0.5);
  const cy = H * 0.5 + (i % 2 === 0 ? 18 : -18);
  layers.push({ input, left: Math.round(cx - rw / 2), top: Math.round(cy - rh / 2) });
}
await sharp({ create: { width: W, height: H, channels: 4, background: "#ffffff" } }).composite(layers).flatten({ background: "#ffffff" }).webp({ quality: 86 }).toFile(out);
console.log(out);
