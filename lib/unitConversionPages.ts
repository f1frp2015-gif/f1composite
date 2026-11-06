import { convertAll, formatValue, quantity } from "@/lib/unitConverter";

/**
 * One page per unit pair that people search for on its own ("msi to gpa",
 * "ksi to mpa"), at /tools/frp-unit-converter/<slug>. Every number comes from
 * the converter's own factors (lib/unitConverter.ts), and the FRP reference
 * values are the converter's examples for that quantity, so a page can never
 * disagree with the tool.
 */

export interface UnitConversionPage {
  slug: string;
  quantity: "modulus" | "stress";
  from: string;
  to: string;
  /** Values in the table, in the "from" unit. */
  values: readonly number[];
  /** One sentence on where the from-unit shows up. */
  context: string;
}

export const UNIT_CONVERSION_PAGES: readonly UnitConversionPage[] = [
  {
    slug: "msi-to-gpa",
    quantity: "modulus",
    from: "Msi",
    to: "GPa",
    values: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 15, 20, 29, 30],
    context: "US data sheets give the elastic modulus of FRP, aluminum and steel in Msi (millions of psi); metric data sheets and EN 13706 use GPa.",
  },
  {
    slug: "gpa-to-msi",
    quantity: "modulus",
    from: "GPa",
    to: "Msi",
    values: [1, 5, 10, 15, 17, 20, 23, 25, 30, 35, 40, 50, 70, 100, 150, 200],
    context: "Converting a metric modulus, such as the 23 GPa EN 13706 E23 minimum, for comparison with a US data sheet that quotes Msi.",
  },
  {
    slug: "msi-to-mpa",
    quantity: "modulus",
    from: "Msi",
    to: "MPa",
    values: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 15, 20, 29, 30],
    context: "Calculation software and Eurocode-style checks often take the modulus in MPa (N/mm²), while US data sheets give it in Msi.",
  },
  {
    slug: "msi-to-ksi",
    quantity: "modulus",
    from: "Msi",
    to: "ksi",
    values: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 15, 20, 29, 30],
    context: "Both units are US customary: Msi is millions of psi and ksi thousands of psi, so a modulus in Msi times 1,000 is the same value in ksi.",
  },
  {
    slug: "ksi-to-mpa",
    quantity: "stress",
    from: "ksi",
    to: "MPa",
    values: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 80, 100],
    context: "US data sheets and ASTM test reports give strengths in ksi; EN 13706, ISO test methods and metric design checks use MPa.",
  },
  {
    slug: "mpa-to-ksi",
    quantity: "stress",
    from: "MPa",
    to: "ksi",
    values: [5, 10, 25, 50, 75, 100, 150, 170, 200, 240, 250, 300, 350, 400, 500, 600],
    context: "Converting a metric strength, such as the 240 MPa EN 13706 E23 tensile minimum, for a US specification or submittal in ksi.",
  },
];

const unit = (quantityId: string, id: string) => {
  const found = quantity(quantityId)?.units.find((u) => u.id === id);
  if (!found) throw new Error(`Unknown unit ${quantityId}/${id}`);
  return found;
};

/** Plain label without the parenthetical: "Msi (10⁶ psi)" → "Msi". */
const short = (label: string) => label.replace(/\s*\(.*\)$/, "");

export function conversionPage(slug: string): UnitConversionPage | undefined {
  return UNIT_CONVERSION_PAGES.find((page) => page.slug === slug);
}

export const conversionPath = (slug: string) => `/tools/frp-unit-converter/${slug}`;

/** The converted value of `value` from one unit to another, with full precision. */
export function convertPair(page: UnitConversionPage, value: number, from = page.from, to = page.to): number {
  return convertAll(page.quantity, value, from).find((row) => row.unit.id === to)?.value ?? NaN;
}

const significant = (value: number, digits: number) => value.toLocaleString("en-US", { maximumSignificantDigits: digits });

/** Factor printed on the page: 1 from = factor to, to 7 significant figures (exact factors print as such). */
export function conversionFactor(page: UnitConversionPage): { forward: string; reverse: string } {
  return {
    forward: significant(convertPair(page, 1), 7),
    reverse: significant(convertPair(page, 1, page.to, page.from), 6),
  };
}

export function conversionLabels(page: UnitConversionPage) {
  return { from: short(unit(page.quantity, page.from).label), to: short(unit(page.quantity, page.to).label) };
}

/** Rounded for the table: 4 significant figures, never more than 3 decimals. */
export function tableValue(value: number): string {
  const rounded = Number(value.toPrecision(4));
  return formatValue(Math.abs(rounded) >= 1000 ? Math.round(rounded) : rounded);
}

/** The converter's reference FRP values for this quantity, in both units. */
export function referenceRows(page: UnitConversionPage) {
  const q = quantity(page.quantity);
  return (q?.examples ?? []).map((example) => {
    const fromValue = convertAll(page.quantity, example.value, example.unit).find((row) => row.unit.id === page.from)?.value ?? NaN;
    return { label: example.label, from: tableValue(fromValue), to: tableValue(convertPair(page, fromValue)) };
  });
}

export function conversionTitle(page: UnitConversionPage): string {
  const { from, to } = conversionLabels(page);
  return `${from} to ${to} Converter: 1 ${from} = ${tableValue(convertPair(page, 1))} ${to}`;
}

export function conversionDescription(page: UnitConversionPage): string {
  const { from, to } = conversionLabels(page);
  const { forward } = conversionFactor(page);
  const refs = page.quantity === "modulus" ? "FRP and steel moduli" : "EN 13706 FRP strengths";
  const range = `${formatValue(page.values[0])} to ${formatValue(page.values[page.values.length - 1])} ${from}`;
  const base = `Convert ${from} to ${to}: 1 ${from} = ${forward} ${to}, so multiply by ${forward}. Conversion table from ${range}, plus ${refs} in both units.`;
  return base.length <= 160 ? base : `Convert ${from} to ${to}: multiply by ${forward}. Conversion table from ${range}, plus ${refs} in both units.`;
}
