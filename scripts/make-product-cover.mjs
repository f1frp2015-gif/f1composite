// node scripts/make-product-cover.mjs <src> <out> [fillW=0.78] [fillH=0.74]
// Trim a product cut-out (transparent or white margins) and centre it on a
// 1200x750 (16:10) white canvas, so every product card shows its product at
// a similar scale.
import sharp from "sharp";
const [, , src, out, fw = "0.78", fh = "0.74"] = process.argv;
const W = 1200, H = 750;
// Flatten on white first so transparent and white margins trim the same way,
// then lift the near-white studio backdrop some renders carry to pure white.
const base = await sharp(src).flatten({ background: "#ffffff" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const px = base.data;
for (let i = 0; i < px.length; i += 3) {
  const [r, g, b] = [px[i], px[i + 1], px[i + 2]];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (min >= 232 && max - min <= 10) {
    // Ease the last few levels so edges do not show a step.
    const k = Math.min(1, (min - 232) / 12);
    for (let c = 0; c < 3; c++) px[i + c] = Math.round(px[i + c] + (255 - px[i + c]) * k);
  }
}
const flat = await sharp(px, { raw: base.info }).png().toBuffer();
const trimmed = await sharp(flat).trim({ background: "#ffffff", threshold: 18 }).toBuffer({ resolveWithObject: true });
const { width: tw, height: th } = trimmed.info;
const scale = Math.min((W * Number(fw)) / tw, (H * Number(fh)) / th);
const rw = Math.round(tw * scale), rh = Math.round(th * scale);
const resized = await sharp(trimmed.data).resize(rw, rh).toBuffer();
await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
  .composite([{ input: resized, left: Math.round((W - rw) / 2), top: Math.round((H - rh) / 2) }])
  .webp({ quality: 86 })
  .toFile(out);
console.log(out, `${tw}x${th} -> ${rw}x${rh}`);
