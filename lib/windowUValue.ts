/** EN ISO 10077-1 simplified whole-window calculation. */
export function calcWindowUw(
  width: number,
  height: number,
  faceWidth: number,
  Uf: number,
  Ug: number,
  psi: number,
  sashWidth: number,
) {
  const inputs = [width, height, faceWidth, Uf, Ug, psi, sashWidth];
  if (!inputs.every(Number.isFinite) || width <= 0 || height <= 0 || faceWidth <= 0 || Uf <= 0 || Ug <= 0 || psi < 0 || sashWidth < 0) {
    return null;
  }

  const W = width / 1000;
  const H = height / 1000;
  const totalFrameW = (faceWidth + sashWidth) / 1000;
  const Aw = W * H;
  const glassW = W - 2 * totalFrameW;
  const glassH = H - 2 * totalFrameW;
  if (glassW <= 0 || glassH <= 0) return null;

  const Ag = glassW * glassH;
  const Af = Aw - Ag;
  const lg = 2 * (glassW + glassH);
  const qGlass = Ag * Ug;
  const qFrame = Af * Uf;
  const qEdge = lg * psi;
  const L = qGlass + qFrame + qEdge;
  const Uw = L / Aw;

  return {
    Uw: Math.round(Uw * 1000) / 1000,
    Aw,
    Ag,
    Af,
    glassRatio: Math.round((Ag / Aw) * 100),
    lg,
    glassW,
    glassH,
    totalFrameW,
    qGlass,
    qFrame,
    qEdge,
    L,
  };
}
