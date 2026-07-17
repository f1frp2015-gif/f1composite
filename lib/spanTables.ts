// Precomputed allowable-UDL span tables — the crawlable static twin of
// /frp-profile-calculator. The interactive calculator is client-rendered, so
// search engines never see a computed result; these tables put the same
// engineering output into SSR HTML (the Strongwell/Bedford design-manual
// pattern) and every row deep-links back into the calculator via its
// ?shape&h&b&tw&tf query preset.
//
// Section-property and check formulas are kept in exact parity with
// app/frp-profile-calculator/ProfileCalculator.tsx (calcIx / calcWx /
// calcArea / calcShearArea and the LRFD + Timoshenko beam checks). If the
// calculator's math changes, change it here too.
//
// Fixed design basis (one published assumption set, stated on the page —
// other codes/environments/limits are what the calculator itself is for):
//   Material    EN 13706 Grade E23 (E_L 23 GPa, G_LT 3.5 GPa, F_tL 240 MPa,
//               F_cL 200 MPa, F_vLT 30 MPa)
//   Method      LRFD per ASCE/SEI 74-23 — φ 0.65, γ_Q 1.6 (live-dominated)
//   Environment outdoor exposed — Ω_E 0.85 on characteristic strengths
//   Case        simply supported, uniform load, strong-axis bending
//   Deflection  L/250 at service load, Timoshenko shear correction included
//
// Section sizes and kg/m weights come from the published catalog seed
// (lib/catalog/seed.ts) — weights are F1-published values, never computed.

import { buildProducts } from "@/lib/catalog/seed";

/* Design basis constants */
const E_MPA = 23_000;
const G_MPA = 3_500;
const F_B_CHAR = 200; // min(F_tL 240, F_cL 200) — compression face governs
const F_V_CHAR = 30;
const PHI = 0.65;
const GAMMA_Q = 1.6;
const ENV_FACTOR = 0.85;
const DEFL_LIMIT = 250; // L/250 serviceability
const UDL_FACTOR_S = 9.6; // Timoshenko c for UDL midspan (see calculator)

const F_B_ALLOW = PHI * F_B_CHAR * ENV_FACTOR; // 110.5 MPa
const F_V_ALLOW = PHI * F_V_CHAR * ENV_FACTOR; // 16.575 MPa

export const SPANS_MM = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000] as const;

export const DESIGN_BASIS = {
  material: "EN 13706 Grade E23 (E-glass pultruded)",
  E_L_GPa: 23,
  G_LT_GPa: 3.5,
  method: "LRFD — ASCE/SEI 74-23 (φ = 0.65, γ_Q = 1.6)",
  environment: "Outdoor exposed (Ω_E = 0.85)",
  loadCase: "Simply supported, uniform distributed load, strong-axis bending",
  deflectionLimit: `L/${DEFL_LIMIT} at service load (Timoshenko shear deflection included)`,
  bendingAllowableMPa: Number(F_B_ALLOW.toFixed(1)),
  shearAllowableMPa: Number(F_V_ALLOW.toFixed(1)),
} as const;

export type GoverningCheck = "deflection" | "bending" | "shear";

export interface SpanCell {
  /** Max allowable service UDL in kN/m (0 when below practical use). */
  w: number;
  governs: GoverningCheck;
}

export interface SpanRow {
  model: string;
  /** Calculator shape id, for the deep link. */
  shape: "i-beam" | "channel" | "square-tube" | "round-tube";
  dims: { h: number; b: number; tw: number; tf: number };
  /** F1-published weight, kg/m. */
  weightKgPerM: number;
  IxMm4: number;
  WxMm3: number;
  cells: SpanCell[];
  calculatorHref: string;
}

export interface SpanFamily {
  id: string;
  title: string;
  intro: string;
  rows: SpanRow[];
}

/* ── Section properties — parity with ProfileCalculator.tsx ── */

function calcIx(shape: string, h: number, b: number, tw: number, tf: number): number {
  if (shape === "i-beam" || shape === "channel") {
    return (b * h ** 3 - (b - tw) * (h - 2 * tf) ** 3) / 12;
  }
  if (shape === "square-tube") return (b * h ** 3 - (b - 2 * tw) * (h - 2 * tw) ** 3) / 12;
  if (shape === "round-tube") {
    const Ro = h / 2;
    const Ri = Ro - tw;
    return (Math.PI / 4) * (Ro ** 4 - Ri ** 4);
  }
  return 0;
}

function calcShearArea(shape: string, h: number, b: number, tw: number, tf: number): number {
  if (shape === "i-beam" || shape === "channel") return (h - 2 * tf) * tw;
  if (shape === "square-tube") return 2 * h * tw;
  if (shape === "round-tube") {
    const Ro = h / 2;
    const Ri = Ro - tw;
    return (Math.PI * (Ro ** 2 - Ri ** 2)) / 2;
  }
  return 0;
}

/* ── Allowable UDL at one span ──
   All in N and mm; a UDL in N/mm is numerically the same value in kN/m.
     bending     w_b = 8·F_b·Wx / (γ·L²)          (σ = γ·wL²/8 / Wx ≤ F_b)
     shear       w_v = 2·F_v·A_v / (γ·L)          (τ = γ·wL/2 / A_v ≤ F_v)
     deflection  w_d = 384·E·Ix / (5·n·L³·k)      (δ = k·5wL⁴/384EI ≤ L/n)
   with k = 1 + 9.6·E·Ix / (G·A_v·L²) the UDL Timoshenko correction. */
function allowableUdl(IxMm4: number, WxMm3: number, AvMm2: number, spanMm: number): SpanCell {
  const w_b = (8 * F_B_ALLOW * WxMm3) / (GAMMA_Q * spanMm ** 2);
  const w_v = (2 * F_V_ALLOW * AvMm2) / (GAMMA_Q * spanMm);
  const k = 1 + (UDL_FACTOR_S * E_MPA * IxMm4) / (G_MPA * AvMm2 * spanMm ** 2);
  const w_d = (384 * E_MPA * IxMm4) / (5 * DEFL_LIMIT * spanMm ** 3 * k);
  const w = Math.min(w_b, w_v, w_d);
  const governs: GoverningCheck = w === w_d ? "deflection" : w === w_b ? "bending" : "shear";
  return { w, governs };
}

function calculatorHref(shape: SpanRow["shape"], d: SpanRow["dims"]): string {
  const sp = new URLSearchParams({
    shape,
    h: String(d.h),
    b: String(d.b),
    tw: String(d.tw),
    tf: String(d.tf),
    material: "frp-e23",
    env: "outdoor",
    method: "lrfd-asce",
    load_type: "udl",
    defl: String(DEFL_LIMIT),
  });
  return `/frp-profile-calculator?${sp.toString()}`;
}

function makeRow(
  model: string,
  shape: SpanRow["shape"],
  dims: SpanRow["dims"],
  weightKgPerM: number,
): SpanRow {
  const Ix = calcIx(shape, dims.h, dims.b, dims.tw, dims.tf);
  const Wx = Ix / (dims.h / 2);
  const Av = calcShearArea(shape, dims.h, dims.b, dims.tw, dims.tf);
  return {
    model,
    shape,
    dims,
    weightKgPerM,
    IxMm4: Ix,
    WxMm3: Wx,
    cells: SPANS_MM.map((L) => allowableUdl(Ix, Wx, Av, L)),
    calculatorHref: calculatorHref(shape, dims),
  };
}

/* ── Build the four beam families from the published catalog seed ── */

type ParametricGeo = { kind: string; shape: string; dims: Record<string, number> };

export function buildSpanTables(): SpanFamily[] {
  const products = buildProducts();
  const iBeams: SpanRow[] = [];
  const channels: SpanRow[] = [];
  const tubes: SpanRow[] = [];
  const roundTubes: SpanRow[] = [];

  for (const p of products) {
    const geo = p.geometry as ParametricGeo;
    if (geo.kind !== "parametric") continue;
    const d = geo.dims;
    if (geo.shape === "i_beam") {
      iBeams.push(makeRow(p.model, "i-beam", { h: d.H, b: d.B, tw: d.tw, tf: d.tf }, p.weight));
    } else if (geo.shape === "channel") {
      channels.push(makeRow(p.model, "channel", { h: d.H, b: d.B, tw: d.tw, tf: d.tf }, p.weight));
    } else if (geo.shape === "shs") {
      tubes.push(makeRow(p.model, "square-tube", { h: d.D, b: d.D, tw: d.t, tf: d.t }, p.weight));
    } else if (geo.shape === "rhs") {
      tubes.push(makeRow(p.model, "square-tube", { h: d.H, b: d.B, tw: d.t, tf: d.t }, p.weight));
    } else if (geo.shape === "tube") {
      roundTubes.push(makeRow(p.model, "round-tube", { h: d.OD, b: d.OD, tw: d.t, tf: d.t }, p.weight));
    }
    // angles, rods, flats: not published as span tables — single-angle bending
    // needs a principal-axis check the UDL table format would misrepresent.
  }

  return [
    {
      id: "i-beam",
      title: "FRP I-Beam Span Table",
      intro:
        "Allowable uniform load for pultruded fiberglass I-beams and wide-flange beams — the primary walkway, platform, and pipe-rack members.",
      rows: iBeams,
    },
    {
      id: "channel",
      title: "FRP Channel Span Table",
      intro:
        "Allowable uniform load for pultruded fiberglass channels (U-profiles), commonly used as stringers, cable-tray supports, and frame rails.",
      rows: channels,
    },
    {
      id: "square-tube",
      title: "FRP Square & Rectangular Tube Span Table",
      intro:
        "Allowable uniform load for pultruded fiberglass SHS / RHS hollow sections — solar purlins, guardrail posts, and light framing.",
      rows: tubes,
    },
    {
      id: "round-tube",
      title: "FRP Round Tube Span Table",
      intro:
        "Allowable uniform load for pultruded fiberglass round tube (CHS) — handrails, cross-members, and light spanning duty.",
      rows: roundTubes,
    },
  ];
}
