// Geometry checks for fixed ladders, stairs and walkways, the access systems
// F1 supplies as FRP ladders, stair treads and grating.
//
// Each rule carries its clause. OSHA values are the regulation text; EN ISO
// 14122 values follow the 2016 editions as summarised in published guidance,
// and IBC values the 2024 edition. AS 1657 (Australia/NZ) and Canadian
// provincial OHS rules are not encoded yet: the checker names them instead
// (see docs/audits/2026-09-26-tools-standards-audit.md).

export type CheckStatus = "pass" | "fail" | "advice";

export interface GeometryCheck {
  label: string;
  value: string;
  requirement: string;
  status: CheckStatus;
  clause: string;
}

const IN = 25.4;
const mm = (value: number) => `${Math.round(value)} mm`;
const inches = (value: number) => `${(value / IN).toFixed(1)} in`;
const both = (value: number) => `${mm(value)} (${inches(value)})`;
const within = (value: number, min: number, max: number) => value >= min - 1e-9 && value <= max + 1e-9;

// ── Fixed ladders ──────────────────────────────────────────────────────────

export type LadderCode = "osha" | "iso14122-4";
export type FallProtection = "none" | "cage" | "ladder-safety-system" | "personal-fall-arrest";

export interface LadderInput {
  code: LadderCode;
  rungPitchMm: number;
  clearWidthMm: number;
  /** Rung centerline to the nearest permanent object behind the ladder. */
  toeClearanceMm: number;
  /** Height of the ladder above the lower level (OSHA) or the fall height (EN ISO 14122-4). */
  heightMm: number;
  /** Side-rail extension above the top landing. */
  railExtensionMm: number;
  fallProtection: FallProtection;
  /** OSHA: installed on or after 19 November 2018. */
  newInstallation: boolean;
}

export const LADDER_CODES: Record<LadderCode, string> = {
  osha: "OSHA 29 CFR 1910.23 and 1910.28(b)(9) (US general industry)",
  "iso14122-4": "EN ISO 14122-4:2016 (permanent access to machinery, EU/UK)",
};

export function ladderInputError(input: LadderInput): string | null {
  const values = [input.rungPitchMm, input.clearWidthMm, input.toeClearanceMm, input.heightMm, input.railExtensionMm];
  if (!values.every((value) => Number.isFinite(value) && value >= 0) || input.rungPitchMm <= 0 || input.clearWidthMm <= 0 || input.heightMm <= 0) {
    return "Enter positive dimensions in millimetres.";
  }
  return null;
}

export function checkLadder(input: LadderInput): GeometryCheck[] {
  if (ladderInputError(input)) return [];
  const checks: GeometryCheck[] = [];
  if (input.code === "osha") {
    checks.push({
      label: "Rung spacing",
      value: both(input.rungPitchMm),
      requirement: "10 to 14 in (254–356 mm), centerline to centerline",
      status: within(input.rungPitchMm, 10 * IN, 14 * IN) ? "pass" : "fail",
      clause: "1910.23(b)",
    });
    checks.push({
      label: "Clear width between side rails",
      value: both(input.clearWidthMm),
      requirement: "At least 16 in (406 mm) for fixed ladders",
      status: input.clearWidthMm >= 16 * IN - 1e-9 ? "pass" : "fail",
      clause: "1910.23(b)",
    });
    checks.push({
      label: "Clearance behind the rungs",
      value: both(input.toeClearanceMm),
      requirement: "At least 7 in (178 mm) from the rung centerline to the nearest permanent object",
      status: input.toeClearanceMm >= 7 * IN - 1e-9 ? "pass" : "fail",
      clause: "1910.23(d)",
    });
    checks.push({
      label: "Side-rail extension at the top",
      value: both(input.railExtensionMm),
      requirement: "42 in (1,067 mm) above the access level for through and side-step ladders, or grab bars",
      status: input.railExtensionMm >= 42 * IN - 1e-9 ? "pass" : "fail",
      clause: "1910.23(d)",
    });
    const tall = input.heightMm > 24 * 12 * IN;
    const system = input.fallProtection === "ladder-safety-system" || input.fallProtection === "personal-fall-arrest";
    let status: CheckStatus = "pass";
    let requirement = "Not required: the ladder does not extend more than 24 ft (7.3 m) above the lower level";
    if (tall && system) {
      requirement = "Ladder safety system or personal fall arrest system provided. Rest platforms at intervals of no more than 150 ft";
    } else if (tall && input.newInstallation) {
      status = "fail";
      requirement = "Installed on or after 19 Nov 2018: a ladder safety system or personal fall arrest system is required; a cage alone does not meet the rule";
    } else if (tall && input.fallProtection === "cage") {
      status = "advice";
      requirement = "Existing cage accepted until the ladder, cage or a section is replaced, and until 18 Nov 2036 (OSHA proposed in April 2026 to remove that date; not final). Sections of no more than 50 ft between landings";
    } else if (tall) {
      status = "fail";
      requirement = "More than 24 ft above the lower level: a cage or well (existing ladders only), ladder safety system or personal fall arrest system is required";
    }
    checks.push({ label: "Fall protection", value: `${(input.heightMm / 1000).toFixed(2)} m (${(input.heightMm / (12 * IN)).toFixed(1)} ft)`, requirement, status, clause: "1910.28(b)(9)" });
    return checks;
  }

  checks.push({
    label: "Rung pitch",
    value: mm(input.rungPitchMm),
    requirement: "225 to 300 mm, uniform along the flight",
    status: within(input.rungPitchMm, 225, 300) ? "pass" : "fail",
    clause: "EN ISO 14122-4:2016",
  });
  checks.push({
    label: "Clear width between stiles",
    value: mm(input.clearWidthMm),
    requirement: "400 to 600 mm",
    status: within(input.clearWidthMm, 400, 600) ? "pass" : "fail",
    clause: "EN ISO 14122-4:2016",
  });
  const needs = input.heightMm > 3000;
  const hasProtection = input.fallProtection === "cage" || input.fallProtection === "ladder-safety-system";
  checks.push({
    label: "Fall protection",
    value: `${(input.heightMm / 1000).toFixed(2)} m fall height`,
    requirement: needs
      ? "Above 3 m: a safety cage or a guided-type fall arrester; cage hoops typically start 2.2–3 m above the base and are no more than 1.5 m apart"
      : "Not required at a fall height of 3 m or less",
    status: !needs || hasProtection ? "pass" : "fail",
    clause: "EN ISO 14122-4:2016",
  });
  checks.push({
    label: "Landings, stile extension and clearances",
    value: "Not checked",
    requirement: "Rest landings, stile extension above the arrival level and clearances are set in the standard's clauses; confirm them on the drawing",
    status: "advice",
    clause: "EN ISO 14122-4:2016",
  });
  return checks;
}

// ── Stairs ─────────────────────────────────────────────────────────────────

export type StairCode = "osha-standard" | "osha-ship" | "iso14122-3" | "ibc";

export const STAIR_CODES: Record<StairCode, string> = {
  "osha-standard": "OSHA 29 CFR 1910.25(c), standard stairs (US workplaces)",
  "osha-ship": "OSHA 29 CFR 1910.25(e), ship stairs (US workplaces)",
  "iso14122-3": "EN ISO 14122-3:2016, stairs for machinery access (EU/UK)",
  ibc: "IBC 2024 §1011, stairways in buildings (US)",
};

export interface StairInput {
  code: StairCode;
  riserMm: number;
  goingMm: number;
  widthMm: number;
  headroomMm: number;
  /** Vertical rise of one flight between landings. */
  flightRiseMm: number;
}

export function stairInputError(input: StairInput): string | null {
  const values = [input.riserMm, input.goingMm, input.widthMm, input.headroomMm, input.flightRiseMm];
  if (!values.every((value) => Number.isFinite(value) && value > 0)) return "Enter positive dimensions in millimetres.";
  return null;
}

export function stairAngle(riserMm: number, goingMm: number): number {
  return (Math.atan(riserMm / goingMm) * 180) / Math.PI;
}

export function checkStair(input: StairInput): GeometryCheck[] {
  if (stairInputError(input)) return [];
  const angle = stairAngle(input.riserMm, input.goingMm);
  const angleText = `${angle.toFixed(1)}°`;
  const checks: GeometryCheck[] = [];
  const add = (label: string, value: string, requirement: string, ok: boolean, clause: string) =>
    checks.push({ label, value, requirement, status: ok ? "pass" : "fail", clause });

  if (input.code === "osha-standard") {
    add("Angle", angleText, "30° to 50° from horizontal", within(angle, 30, 50), "1910.25(c)(1)");
    add("Riser height", both(input.riserMm), "No more than 9.5 in (241 mm)", input.riserMm <= 9.5 * IN + 1e-9, "1910.25(c)(2)");
    add("Tread depth", both(input.goingMm), "At least 9.5 in (241 mm)", input.goingMm >= 9.5 * IN - 1e-9, "1910.25(c)(3)");
    add("Width", both(input.widthMm), "At least 22 in (559 mm) between vertical barriers", input.widthMm >= 22 * IN - 1e-9, "1910.25(c)(4)");
    add("Headroom", both(input.headroomMm), "At least 6 ft 8 in (2,032 mm) above the tread nosing", input.headroomMm >= 80 * IN - 1e-9, "1910.25(b)");
    checks.push({ label: "Strength and uniformity", value: "Not checked", requirement: "5 × the normal live load and at least 1,000 lb (454 kg) at any point; risers and treads uniform within 1/4 in per flight", status: "advice", clause: "1910.25(b)" });
  } else if (input.code === "osha-ship") {
    add("Angle", angleText, "50° to 70° from horizontal", within(angle, 50, 70), "1910.25(e)(1)");
    add("Riser height", both(input.riserMm), "6.5 to 12 in (165–305 mm), open risers", within(input.riserMm, 6.5 * IN, 12 * IN), "1910.25(e)(2)");
    add("Tread depth", both(input.goingMm), "At least 4 in (102 mm)", input.goingMm >= 4 * IN - 1e-9, "1910.25(e)(3)");
    add("Width", both(input.widthMm), "At least 18 in (457 mm)", input.widthMm >= 18 * IN - 1e-9, "1910.25(e)(4)");
    add("Headroom", both(input.headroomMm), "At least 6 ft 8 in (2,032 mm)", input.headroomMm >= 80 * IN - 1e-9, "1910.25(b)");
  } else if (input.code === "iso14122-3") {
    const pitch = input.goingMm + 2 * input.riserMm;
    add("Step formula g + 2h", mm(pitch), "600 to 660 mm", within(pitch, 600, 660), "EN ISO 14122-3:2016");
    add("Angle", angleText, "20° to 45°; 30° to 38° preferred", within(angle, 20, 45), "EN ISO 14122-3:2016");
    add("Clear width", mm(input.widthMm), "At least 600 mm; 800 mm recommended", input.widthMm >= 600, "EN ISO 14122-3:2016");
    add("Headroom", mm(input.headroomMm), "At least 2,300 mm", input.headroomMm >= 2300, "EN ISO 14122-3:2016");
    add("Flight rise between landings", mm(input.flightRiseMm), "No more than 3,000 mm", input.flightRiseMm <= 3000, "EN ISO 14122-3:2016");
  } else {
    add("Riser height", both(input.riserMm), "4 to 7 in (102–178 mm)", within(input.riserMm, 4 * IN, 7 * IN), "IBC 2024 §1011.5.2");
    add("Tread depth", both(input.goingMm), "At least 11 in (279 mm)", input.goingMm >= 11 * IN - 1e-9, "IBC 2024 §1011.5.2");
    add("Headroom", both(input.headroomMm), "At least 80 in (2,032 mm)", input.headroomMm >= 80 * IN - 1e-9, "IBC 2024 §1011.3");
    checks.push({ label: "Width", value: both(input.widthMm), requirement: "At least 44 in (1,118 mm), or 36 in (914 mm) where the occupant load is under 50", status: input.widthMm >= 44 * IN - 1e-9 ? "pass" : input.widthMm >= 36 * IN - 1e-9 ? "advice" : "fail", clause: "IBC 2024 §1011.2" });
  }
  return checks;
}

// ── Walkways and platforms (grating) ─────────────────────────────────────────

export interface WalkwayInput {
  widthMm: number;
  headroomMm: number;
  /** Largest clear opening in the walking surface, mm. */
  clearOpeningMm: number;
  /** People or workstations below the walkway (EN ISO 14122-2 smaller opening). */
  peopleBelow: boolean;
}

/** Reference floor loads for walkways and platforms, for the grating load table. */
export const WALKWAY_LOADS = [
  { rule: "ASCE 7-22 Table 4.3-1 (US)", use: "Catwalks for maintenance and service access", load: "40 psf (1.92 kPa) and 300 lb (1.33 kN) concentrated" },
  { rule: "ASCE 7-22 Table 4.3-1 (US)", use: "Walkways and elevated platforms other than exitways", load: "60 psf (2.87 kPa)" },
  { rule: "OSHA 29 CFR 1910.22(b) (US)", use: "Every walking-working surface", load: "Its maximum intended load; no fixed value" },
  { rule: "EN ISO 14122-2:2016 (EU/UK)", use: "Working platforms and walkways", load: "2 kN/m² on the structure; 1.5 kN on 200 × 200 mm on the flooring; deflection no more than span/200 and 4 mm step to the adjacent unloaded panel" },
  { rule: "AS/NZS 1170.1 and AS 1657:2018 (AU/NZ)", use: "Walkways and platforms", load: "Enter the values for the occupancy from the standard" },
  { rule: "NBC Part 4 (Canada)", use: "Service rooms, catwalks and platforms", load: "Enter the value from Table 4.1.5.3 of the code in force" },
] as const;

export function checkWalkway(input: WalkwayInput): GeometryCheck[] {
  if (![input.widthMm, input.headroomMm, input.clearOpeningMm].every((value) => Number.isFinite(value) && value > 0)) return [];
  const ball = input.peopleBelow ? 20 : 35;
  return [
    {
      label: "Clear width",
      value: mm(input.widthMm),
      requirement: "At least 600 mm; 800 mm recommended, 1,000 mm where several people pass",
      status: input.widthMm >= 600 ? "pass" : "fail",
      clause: "EN ISO 14122-2:2016",
    },
    {
      label: "Headroom",
      value: mm(input.headroomMm),
      requirement: "At least 2,100 mm",
      status: input.headroomMm >= 2100 ? "pass" : "fail",
      clause: "EN ISO 14122-2:2016",
    },
    {
      label: "Openings in the walking surface",
      value: `${input.clearOpeningMm.toFixed(1)} mm`,
      requirement: `A ${ball} mm ball must not pass${input.peopleBelow ? " (people or workstations below)" : "; 20 mm where people or workstations are below"}`,
      status: input.clearOpeningMm < ball ? "pass" : "fail",
      clause: "EN ISO 14122-2:2016",
    },
  ];
}

/**
 * Clear opening at the walking surface of a square-mesh molded grating:
 * mesh pitch minus the top width of the bars.
 */
export function moldedGratingClearOpening(meshPitchMm: number, topBarMm: number): number {
  return meshPitchMm - topBarMm;
}
