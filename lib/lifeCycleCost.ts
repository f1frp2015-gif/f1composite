// Life-cycle cost comparison of an FRP option against a steel option, as
// present values over a study period (the ISO 15686-5 life-cycle costing
// method; ASTM E917 and AS/NZS 4536 use the same arithmetic).
//
// Every cost is the user's: the page starts from example numbers on an index
// (steel installed cost = 100) and says so. The standards only help estimate
// when hot-dip galvanized steel first needs maintenance:
//  - ISO 9223:2012 Table 2: first-year corrosion rate of zinc for each
//    atmospheric corrosivity category (C3 checked against published guidance;
//    the other rows follow the same table and ISO 14713-1).
//  - ISO 1461: minimum mean coating thickness by steel thickness.
// Coating life ≈ thickness ÷ rate. First-year rates run higher than the
// long-term rates of ISO 9224, so the estimate leans short; the page shows the
// range and lets the user overwrite the year.

export const ZINC_CORROSIVITY = [
  { id: "C2", label: "C2 low: dry rural, unheated buildings", minRate: 0.1, maxRate: 0.7 },
  { id: "C3", label: "C3 medium: urban, mild coastal", minRate: 0.7, maxRate: 2.1 },
  { id: "C4", label: "C4 high: industrial, coastal", minRate: 2.1, maxRate: 4.2 },
  { id: "C5", label: "C5 very high: humid industrial, salt-laden coastal", minRate: 4.2, maxRate: 8.4 },
  { id: "CX", label: "CX extreme: offshore, extreme industrial", minRate: 8.4, maxRate: 25 },
] as const;

export type CorrosivityId = (typeof ZINC_CORROSIVITY)[number]["id"];

/** ISO 1461 minimum mean coating thickness, µm, by steel thickness. */
export const GALVANIZING_THICKNESS = [
  { id: "gt6", label: "Steel over 6 mm thick", microns: 85 },
  { id: "3to6", label: "Steel over 3 mm up to 6 mm", microns: 70 },
  { id: "1.5to3", label: "Steel 1.5 to 3 mm", microns: 55 },
] as const;

export function galvanizingLife(corrosivityId: string, microns: number) {
  const category = ZINC_CORROSIVITY.find((item) => item.id === corrosivityId) ?? ZINC_CORROSIVITY[2];
  const midRate = (category.minRate + category.maxRate) / 2;
  return {
    category,
    /** Years at the fastest rate in the category. */
    shortYears: microns / category.maxRate,
    /** Years at the slowest rate in the category. */
    longYears: microns / category.minRate,
    /** Years at the middle of the category's rate range. */
    midYears: microns / midRate,
  };
}

export interface CostOption {
  label: string;
  /** Material, fabrication and installation, year 0. */
  initial: number;
  /** Year of the first maintenance event; 0 or less for none. */
  firstMaintenanceYear: number;
  /** Years between later maintenance events; 0 for a single event. */
  maintenanceInterval: number;
  /** Cost of one maintenance event. */
  maintenanceCost: number;
  /** Inspection and cleaning, every year. */
  annualCost: number;
  /** Years until the option is replaced at its initial cost; 0 for no replacement in the study. */
  serviceLife: number;
}

export interface LccInput {
  studyYears: number;
  /** Real discount rate, per cent. */
  discountPercent: number;
  /** Shutdown, access or lost production per maintenance or replacement event. */
  downtimePerEvent: number;
  /** Credit the unused life at the end of the study (straight line). */
  residualValue: boolean;
  frp: CostOption;
  steel: CostOption;
}

export interface OptionResult {
  initial: number;
  maintenance: number;
  annual: number;
  replacement: number;
  downtime: number;
  residual: number;
  total: number;
  /** Equivalent annual cost of the total. */
  annualized: number;
  events: { year: number; kind: "maintenance" | "replacement"; cost: number }[];
  /** Cumulative present value at the end of each year, index 0 = year 0. */
  cumulative: number[];
}

export interface LccResult {
  frp: OptionResult;
  steel: OptionResult;
  /** steel − frp; positive when FRP costs less over the study. */
  saving: number;
  /** First year the FRP cumulative present value drops to or below steel's; null when it never does. */
  breakEvenYear: number | null;
}

const MAX_YEARS = 100;

export function lccInputError(input: LccInput): string | null {
  if (!Number.isInteger(input.studyYears) || input.studyYears < 1 || input.studyYears > MAX_YEARS) return `Enter a study period of 1 to ${MAX_YEARS} whole years.`;
  if (!Number.isFinite(input.discountPercent) || input.discountPercent < 0 || input.discountPercent > 20) return "Enter a real discount rate from 0 to 20%.";
  if (!Number.isFinite(input.downtimePerEvent) || input.downtimePerEvent < 0) return "Enter a downtime cost of 0 or more.";
  for (const option of [input.frp, input.steel]) {
    const values = [option.initial, option.firstMaintenanceYear, option.maintenanceInterval, option.maintenanceCost, option.annualCost, option.serviceLife];
    if (!values.every((value) => Number.isFinite(value) && value >= 0)) return `${option.label}: enter costs and years of 0 or more.`;
    if (option.initial <= 0) return `${option.label}: enter the installed cost.`;
  }
  return null;
}

function evaluate(option: CostOption, input: LccInput): OptionResult {
  const r = input.discountPercent / 100;
  const P = input.studyYears;
  const pv = (cost: number, year: number) => cost / (1 + r) ** year;
  const events: OptionResult["events"] = [];
  const life = option.serviceLife > 0 ? option.serviceLife : Infinity;

  // Each life starts new (year 0, then at every replacement) and repeats the
  // same maintenance pattern; events at the end of the study are not counted.
  for (let start = 0; start < P; start += life) {
    if (start > 0) events.push({ year: start, kind: "replacement", cost: option.initial });
    const end = Math.min(start + life, P);
    if (option.firstMaintenanceYear > 0 && option.maintenanceCost > 0) {
      for (let year = start + option.firstMaintenanceYear; year < end - 1e-9; year += option.maintenanceInterval > 0 ? option.maintenanceInterval : Infinity) {
        events.push({ year, kind: "maintenance", cost: option.maintenanceCost });
      }
    }
    if (!Number.isFinite(life)) break;
  }
  events.sort((a, b) => a.year - b.year);

  let maintenance = 0;
  let replacement = 0;
  let downtime = 0;
  for (const event of events) {
    if (event.kind === "maintenance") maintenance += pv(event.cost, event.year);
    else replacement += pv(event.cost, event.year);
    downtime += pv(input.downtimePerEvent, event.year);
  }
  const annualFactor = r === 0 ? P : (1 - (1 + r) ** -P) / r;
  const annual = option.annualCost * annualFactor;

  let residual = 0;
  if (input.residualValue && Number.isFinite(life)) {
    const lastStart = Math.floor((P - 1e-9) / life) * life;
    const used = P - lastStart;
    if (used < life) residual = pv(option.initial * (1 - used / life), P);
  }

  const total = option.initial + maintenance + annual + replacement + downtime - residual;
  const cumulative: number[] = [];
  let running = option.initial;
  cumulative.push(running);
  for (let year = 1; year <= P; year += 1) {
    running += pv(option.annualCost, year);
    for (const event of events) {
      if (event.year > year - 1 && event.year <= year) running += pv(event.cost + input.downtimePerEvent, event.year);
    }
    if (year === P) running -= residual;
    cumulative.push(running);
  }
  const crf = r === 0 ? 1 / P : r / (1 - (1 + r) ** -P);
  return { initial: option.initial, maintenance, annual, replacement, downtime, residual, total, annualized: total * crf, events, cumulative };
}

export function calculateLcc(input: LccInput): LccResult | null {
  if (lccInputError(input)) return null;
  const frp = evaluate(input.frp, input);
  const steel = evaluate(input.steel, input);
  let breakEvenYear: number | null = null;
  for (let year = 0; year < frp.cumulative.length; year += 1) {
    if (frp.cumulative[year] <= steel.cumulative[year] + 1e-9) {
      breakEvenYear = year;
      break;
    }
  }
  return { frp, steel, saving: steel.total - frp.total, breakEvenYear };
}
