import { calcArea, calcIx, type FrpSectionShape } from "@/lib/frpSectionProperties";

type BenchmarkDefinition = {
  name: string;
  shape: FrpSectionShape;
  h: number;
  b: number;
  tw: number;
  tf: number;
  expectedIx: number;
  expectedArea: number;
};

// Reference values are independently evaluated closed-form section-property
// results, stored as fixed constants. The live engine is recomputed against
// them during every build that renders the validation page.
const SECTION_BENCHMARKS: BenchmarkDefinition[] = [
  { name: "I 100×50×6", shape: "i-beam", h: 100, b: 50, tw: 6, tf: 6, expectedIx: 1667936, expectedArea: 1128 },
  { name: "I 152×76×6.4", shape: "i-beam", h: 152, b: 76, tw: 6.4, tf: 6.4, expectedIx: 6597526.596267, expectedArea: 1863.68 },
  { name: "I 240×120×12", shape: "i-beam", h: 240, b: 120, tw: 12, tf: 12, expectedIx: 47540736, expectedArea: 5472 },
  { name: "C 100×50×6", shape: "channel", h: 100, b: 50, tw: 6, tf: 6, expectedIx: 1667936, expectedArea: 1128 },
  { name: "C 152×43×6.4", shape: "channel", h: 152, b: 43, tw: 6.4, tf: 6.4, expectedIx: 4357432.388267, expectedArea: 1441.28 },
  { name: "L 75×75×6", shape: "angle", h: 75, b: 75, tw: 6, tf: 6, expectedIx: 468827.15625, expectedArea: 864 },
  { name: "L 100×50×8", shape: "angle", h: 100, b: 50, tw: 8, tf: 8, expectedIx: 1169145.99061, expectedArea: 1136 },
  { name: "SHS 50×50×5", shape: "square-tube", h: 50, b: 50, tw: 5, tf: 5, expectedIx: 307500, expectedArea: 900 },
  { name: "RHS 100×50×6", shape: "square-tube", h: 100, b: 50, tw: 6, tf: 6, expectedIx: 2008672, expectedArea: 1656 },
  { name: "SHS 150×150×10", shape: "square-tube", h: 150, b: 150, tw: 10, tf: 10, expectedIx: 18386666.666667, expectedArea: 5600 },
  { name: "Tube Ø50×5", shape: "round-tube", h: 50, b: 50, tw: 5, tf: 5, expectedIx: 181132.451434, expectedArea: 706.858347 },
  { name: "Tube Ø100×8", shape: "round-tube", h: 100, b: 100, tw: 8, tf: 8, expectedIx: 2464818.197783, expectedArea: 2312.212193 },
];

function relativeErrorPercent(actual: number, expected: number): number {
  return Math.abs((actual - expected) / expected) * 100;
}

export function runSectionPropertyBenchmarks() {
  return SECTION_BENCHMARKS.map((benchmark) => {
    const actualIx = calcIx(
      benchmark.shape,
      benchmark.h,
      benchmark.b,
      benchmark.tw,
      benchmark.tf,
    );
    const actualArea = calcArea(
      benchmark.shape,
      benchmark.h,
      benchmark.b,
      benchmark.tw,
      benchmark.tf,
    );

    return {
      ...benchmark,
      actualIx,
      actualArea,
      ixErrorPercent: relativeErrorPercent(actualIx, benchmark.expectedIx),
      areaErrorPercent: relativeErrorPercent(actualArea, benchmark.expectedArea),
    };
  });
}

export const BENCHMARK_TOLERANCE_PERCENT = 0.0001;
