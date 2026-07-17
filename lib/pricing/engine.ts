// Deterministic budgetary price engine for pultruded FRP profiles.
//
// COMMERCIALLY SENSITIVE — server-side only. Cost constants below must never
// be imported from a client component; the UI receives only the finished USD
// ranges (flat quoted band, no cost breakdown). This mirrors the calibrated
// engine that powers our internal quoting (price table 2026-05-30-r7): the
// public number here and a formal quotation start from the same baseline, so
// the estimator never contradicts a written quote.
//
// Chain: material (fiber+resin+additives, /yield) + process (line-hour rate /
// effective m/h + fixed per-m) + surface veil → × quantity curve → × (1+admin)
// → × (1+margin) → × (1+VAT) → ±band → CNY/m range → USD export display
// (× (1+EXPORT_MARKUP) ÷ USD_CNY_RATE).

export type Fiber = "e_glass" | "ecr_glass" | "carbon";
export type Resin = "up" | "ve" | "epoxy" | "pu" | "phenolic";

export type Geometry =
  | { type: "round"; od: number; id: number }
  | { type: "square"; side: number; t: number }
  | { type: "rect"; w: number; h: number; t: number }
  | { type: "angle"; leg: number; t: number }
  | { type: "channel"; w: number; h: number; t: number }
  | { type: "i_beam"; bf: number; tf: number; h: number; tw: number };

export type ProfileType = Geometry["type"];

export interface PriceInput {
  geometry: Geometry;
  fiber: Fiber;
  resin: Resin;
  /** Glass content by volume fraction percent, default 70 */
  fiberContentPct?: number;
  fireRetardant?: boolean;
  weatherproof?: boolean;
  surfaceVeil?: boolean;
  /** Total order length in meters */
  totalMeters: number;
}

export interface PriceResult {
  usdPerMeterLow: number;
  usdPerMeterHigh: number;
  usdPerKgLow: number;
  usdPerKgHigh: number;
  usdTotalLow: number;
  usdTotalHigh: number;
  kgPerMeter: number;
  totalMeters: number;
  band: number;
  warnings: string[];
  engineVersion: string;
}

export const ENGINE_VERSION = "f1c-price-1.0+2026-05-30-r7";
export const PRICE_BASIS_DATE = "2026-06-30";

// ── Material unit prices, CNY/kg (untaxed averages, 2026-Q2 basis) ──────────
const FIBER_PRICE_CNY_PER_KG: Record<Fiber, number> = {
  e_glass: 6.8,
  ecr_glass: 9.5,
  carbon: 95,
};
const RESIN_PRICE_CNY_PER_KG: Record<Resin, number> = {
  up: 12,
  epoxy: 22,
  ve: 24,
  phenolic: 28,
  pu: 26,
};
const ADDITIVE_CNY_PER_KG_COMPOSITE = 0.4;

// Formulated-resin premiums (multiplier additions on the resin unit price)
const PREMIUM_FIRE_RETARDANT = 0.18;
const PREMIUM_WEATHERPROOF = 0.25;

// Surface veil: perimeter × areal weight × unit price
const SURFACE_VEIL_GSM = 240;
const SURFACE_VEIL_CNY_PER_KG = 110;

// ── Process coefficients per profile family ─────────────────────────────────
type ProcessCoeff = {
  pullSpeedMperMin: number;
  laborCnyPerH: number;
  fixedCnyPerM: number;
  moqMeters: number;
};
const PROCESS_COEFF: Record<ProfileType, ProcessCoeff> = {
  round: { pullSpeedMperMin: 0.8, laborCnyPerH: 60, fixedCnyPerM: 2.5, moqMeters: 100 },
  square: { pullSpeedMperMin: 0.6, laborCnyPerH: 70, fixedCnyPerM: 3.0, moqMeters: 100 },
  rect: { pullSpeedMperMin: 0.5, laborCnyPerH: 75, fixedCnyPerM: 3.2, moqMeters: 150 },
  angle: { pullSpeedMperMin: 0.7, laborCnyPerH: 60, fixedCnyPerM: 2.8, moqMeters: 100 },
  channel: { pullSpeedMperMin: 0.4, laborCnyPerH: 80, fixedCnyPerM: 3.5, moqMeters: 200 },
  i_beam: { pullSpeedMperMin: 0.3, laborCnyPerH: 90, fixedCnyPerM: 4.0, moqMeters: 200 },
};

// ── Commercial layer ─────────────────────────────────────────────────────────
const YIELD_RATE = 0.98;
const ADMIN_FEE_RATE = 0.11;
const FACTORY_MARGIN = 0.2;
const VAT = 0.13;
const QUOTE_BAND = 0.15;
// Export service markup + FX — keep aligned with the export-quote workbook.
const EXPORT_MARKUP = 0.5;
const USD_CNY_RATE = 7.2;

function quantityMultiplier(totalMeters: number, moq: number): number {
  if (totalMeters < moq) return 1.25;
  if (totalMeters < 1000) return 1.0;
  if (totalMeters < 5000) return 0.95;
  if (totalMeters < 20000) return 0.92;
  return 0.88;
}

// ── Geometry ────────────────────────────────────────────────────────────────
const FIBER_DENSITY: Record<Fiber, number> = { e_glass: 2.55, ecr_glass: 2.62, carbon: 1.78 };
const RESIN_DENSITY: Record<Resin, number> = { up: 1.18, epoxy: 1.2, ve: 1.12, phenolic: 1.3, pu: 1.15 };

export function crossSectionMm2(g: Geometry): number {
  switch (g.type) {
    case "round": {
      const R = g.od / 2;
      const r = g.id / 2;
      return Math.PI * (R * R - r * r);
    }
    case "square": {
      const inner = Math.max(0, g.side - 2 * g.t);
      return g.side * g.side - inner * inner;
    }
    case "rect": {
      const innerW = Math.max(0, g.w - 2 * g.t);
      const innerH = Math.max(0, g.h - 2 * g.t);
      return g.w * g.h - innerW * innerH;
    }
    case "angle":
      return 2 * g.leg * g.t - g.t * g.t;
    case "channel": {
      const flange = Math.max(0, g.w - g.t) * g.t;
      return g.h * g.t + 2 * flange;
    }
    case "i_beam": {
      const webHeight = Math.max(0, g.h - 2 * g.tf);
      return 2 * g.bf * g.tf + webHeight * g.tw;
    }
  }
}

function outerPerimeterMm(g: Geometry): number {
  switch (g.type) {
    case "round": return Math.PI * g.od;
    case "square": return 4 * g.side;
    case "rect": return 2 * (g.w + g.h);
    case "angle": return 4 * g.leg;
    case "channel": return 2 * (g.w + g.h);
    case "i_beam": return 4 * g.bf - 2 * g.tw + 2 * g.h;
  }
}

export function compositeDensityGcm3(fiber: Fiber, resin: Resin, fiberContentPct = 70): number {
  // fiberContentPct is glass content BY WEIGHT (the industry convention for
  // pultrusion, e.g. "70% glass"). Convert to a volume fraction before mixing
  // densities — treating 70% as a volume fraction overstates density (~2.14
  // vs the ~1.9 g/cm³ real pultruded E-glass laminates measure) and would
  // contradict the published catalog weights on this site.
  const wf = Math.max(0.4, Math.min(0.85, fiberContentPct / 100));
  const vf =
    wf / FIBER_DENSITY[fiber] /
    (wf / FIBER_DENSITY[fiber] + (1 - wf) / RESIN_DENSITY[resin]);
  return vf * FIBER_DENSITY[fiber] + (1 - vf) * RESIN_DENSITY[resin];
}

export function weightKgPerMeter(g: Geometry, fiber: Fiber, resin: Resin, fiberContentPct = 70): number {
  return (crossSectionMm2(g) * compositeDensityGcm3(fiber, resin, fiberContentPct)) / 1000;
}

// ── Engine ──────────────────────────────────────────────────────────────────
export function estimatePrice(input: PriceInput): PriceResult {
  const warnings: string[] = [];
  // Glass content by weight — used both for the density model and the
  // material-cost split between fiber and resin.
  const fiberWf = (input.fiberContentPct ?? 70) / 100;

  const kgPerM = weightKgPerMeter(input.geometry, input.fiber, input.resin, input.fiberContentPct ?? 70);

  const fiberKgPerM = kgPerM * fiberWf;
  const resinKgPerM = kgPerM * (1 - fiberWf);
  const resinMultiplier =
    1 +
    (input.fireRetardant ? PREMIUM_FIRE_RETARDANT : 0) +
    (input.weatherproof ? PREMIUM_WEATHERPROOF : 0);
  const materialCnyPerM =
    (fiberKgPerM * FIBER_PRICE_CNY_PER_KG[input.fiber] +
      resinKgPerM * RESIN_PRICE_CNY_PER_KG[input.resin] * resinMultiplier +
      kgPerM * ADDITIVE_CNY_PER_KG_COMPOSITE) /
    YIELD_RATE;

  const coeff = PROCESS_COEFF[input.geometry.type];
  const effectiveMperH = coeff.pullSpeedMperMin * 60;
  const processCnyPerM = coeff.laborCnyPerH / effectiveMperH + coeff.fixedCnyPerM;

  const veilCnyPerM = input.surfaceVeil
    ? ((outerPerimeterMm(input.geometry) / 1000) * SURFACE_VEIL_GSM * SURFACE_VEIL_CNY_PER_KG) / 1000
    : 0;

  const manuCnyPerM = materialCnyPerM + processCnyPerM + veilCnyPerM;

  const qMul = quantityMultiplier(input.totalMeters, coeff.moqMeters);
  if (qMul > 1) {
    warnings.push(
      `Order length ${Math.round(input.totalMeters)} m is below the ${coeff.moqMeters} m MOQ for this family — a small-batch premium is included.`,
    );
  }

  const costCnyPerM = manuCnyPerM * qMul * (1 + ADMIN_FEE_RATE);
  const finalCnyPerM = costCnyPerM * (1 + FACTORY_MARGIN) * (1 + VAT);

  const lowCny = finalCnyPerM * (1 - QUOTE_BAND);
  const highCny = finalCnyPerM * (1 + QUOTE_BAND);

  // Export display: flat quoted USD, no breakdown.
  const toUsd = (cny: number) => (cny * (1 + EXPORT_MARKUP)) / USD_CNY_RATE;

  if (kgPerM > 50) warnings.push(`Section mass ${kgPerM.toFixed(1)} kg/m is unusually large — estimate accuracy drops; ask for a manual quote.`);
  if (kgPerM < 0.1) warnings.push("Section is very small — estimate accuracy drops; ask for a manual quote.");

  const usdPerMeterLow = round2(toUsd(lowCny));
  const usdPerMeterHigh = round2(toUsd(highCny));

  return {
    usdPerMeterLow,
    usdPerMeterHigh,
    usdPerKgLow: round2(usdPerMeterLow / kgPerM),
    usdPerKgHigh: round2(usdPerMeterHigh / kgPerM),
    usdTotalLow: Math.round(usdPerMeterLow * input.totalMeters),
    usdTotalHigh: Math.round(usdPerMeterHigh * input.totalMeters),
    kgPerMeter: round2(kgPerM),
    totalMeters: input.totalMeters,
    band: QUOTE_BAND,
    warnings,
    engineVersion: ENGINE_VERSION,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
