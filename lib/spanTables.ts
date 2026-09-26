// Precomputed allowable-UDL span tables — the crawlable static twin of
// /frp-profile-calculator. The interactive calculator is client-rendered, so
// search engines never see a computed result; these tables put the same
// engineering output into SSR HTML (the Strongwell/Bedford design-manual
// pattern) and every row deep-links back into the calculator via client-only
// fragment state instead of a crawlable multi-parameter query URL.
//
// Section properties come from the same shared engine used by
// app/frp-profile-calculator/ProfileCalculator.tsx. This prevents the static
// tables and interactive results from drifting when a geometry formula changes.
//
// Fixed design basis (one published assumption set, stated on the page;
// other codes/environments/limits are what the calculator itself is for),
// taken from the shared design basis in lib/frpDesignBasis.ts:
//   Material    EN 13706-3 Grade E23 minimums (E_L 23 GPa, F_tL 240 MPa,
//               shear 25 MPa = the EN 13706 interlaminar shear minimum);
//               G_LT 3.5 GPa and F_cL 200 MPa are stated assumptions
//   Method      LRFD per ASCE/SEI 74-23: φ 0.65, λ 0.8 (occupancy live load),
//               γ_Q 1.6 (ASCE 7-22, live-dominated)
//   Environment outdoor exposed: 0.85 on characteristic strengths
//   Case        simply supported, uniform load, strong-axis bending
//   Deflection  L/250 at service load, Timoshenko shear correction included
//
// Section sizes and kg/m weights come from the published catalog seed
// (lib/catalog/seed.ts); weights are F1-published values, never computed.

import { buildProducts } from "@/lib/catalog/standardProfiles";
import { DESIGN_MATERIALS, designResistance, envFactor, loadDuration } from "@/lib/frpDesignBasis";
import { calcIx, calcShearArea, calcWx } from "@/lib/frpSectionProperties";
import { buildToolStateHref } from "@/lib/toolStateUrl";

/* Design basis constants */
const MATERIAL = DESIGN_MATERIALS["frp-e23"];
const METHOD = "lrfd-asce" as const;
const ENVIRONMENT = "outdoor";
const DURATION = "occupancy";
const RESISTANCE = designResistance({ material: MATERIAL, method: METHOD, envId: ENVIRONMENT, durationId: DURATION });
const E_MPA = MATERIAL.E * 1000 * RESISTANCE.envStiffness;
const G_MPA = (MATERIAL.G_LT ?? 3.5) * 1000 * RESISTANCE.envStiffness;
const GAMMA_Q = RESISTANCE.loadFactor;
const DEFL_LIMIT = 250; // L/250 serviceability
const UDL_FACTOR_S = 9.6; // Timoshenko c for UDL midspan (see calculator)

const F_B_ALLOW = RESISTANCE.bendingAllowable; // 0.65 × 0.8 × 200 × 0.85 = 88.4 MPa
const F_V_ALLOW = RESISTANCE.shearAllowable; // 0.65 × 0.8 × 25 × 0.85 = 11.05 MPa

const DESIGN_BASIS_PHI = RESISTANCE.basis.phiFlex;

export const SPANS_MM = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000] as const;

export const DESIGN_BASIS = {
  material: "EN 13706 Grade E23 (E-glass pultruded)",
  E_L_GPa: MATERIAL.E,
  G_LT_GPa: MATERIAL.G_LT ?? 3.5,
  shearStrengthMPa: MATERIAL.tau ?? 25,
  method: `LRFD, ASCE/SEI 74-23 (φ = ${DESIGN_BASIS_PHI}, λ = ${loadDuration(DURATION).lambda} for occupancy live load, γ_Q = ${GAMMA_Q})`,
  environment: `Outdoor exposed (${envFactor(ENVIRONMENT).factor} on strengths)`,
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
  return buildToolStateHref("/frp-profile-calculator", {
    shape,
    h: d.h,
    b: d.b,
    tw: d.tw,
    tf: d.tf,
    material: "frp-e23",
    env: ENVIRONMENT,
    method: METHOD,
    duration: DURATION,
    load_type: "udl",
    defl: DEFL_LIMIT,
  });
}

function makeRow(
  model: string,
  shape: SpanRow["shape"],
  dims: SpanRow["dims"],
  weightKgPerM: number,
): SpanRow {
  const Ix = calcIx(shape, dims.h, dims.b, dims.tw, dims.tf);
  const Wx = calcWx(Ix, dims.h, shape, dims.b, dims.tw);
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
        "This FRP span table lists allowable uniform service loads for pultruded fiberglass I-beams and wide-flange beams used in walkways, platforms, and pipe racks. Compare the required clear span and load, then open the linked calculator to review the governing deflection, bending, or shear check.",
      rows: iBeams,
    },
    {
      id: "channel",
      title: "FRP Channel Span Table",
      intro:
        "This FRP channel span table gives allowable uniform service loads for pultruded fiberglass U-profiles commonly used as stringers, cable-tray supports, and frame rails. Values use the design basis stated above; follow the calculator link when connection behavior, concentrated loads, or a different exposure condition governs.",
      rows: channels,
    },
    {
      id: "square-tube",
      title: "FRP Square & Rectangular Tube Span Table",
      intro:
        "This FRP span table covers pultruded fiberglass square and rectangular hollow sections used for solar purlins, guardrail posts, and light framing. The values represent simply supported strong-axis members under uniform load, so designers should separately check local attachment forces, post action, and project-specific load cases.",
      rows: tubes,
    },
    {
      id: "round-tube",
      title: "FRP Round Tube Span Table",
      intro:
        "This FRP round-tube span table provides allowable uniform service loads for pultruded fiberglass circular hollow sections used as handrails, cross-members, and light spanning members. Select the diameter and wall thickness, compare the clear span, and verify the result in the calculator before final project specification.",
      rows: roundTubes,
    },
  ];
}
