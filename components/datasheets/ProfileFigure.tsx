// Page-header figure for a standard profile family: the cross-section of one
// catalog size, drawn by the datasheet section engine, with its geometric
// properties and published mass. Values come from lib/catalog, never typed in.

import Figure from "@/components/ui/Figure";
import SectionSvg from "@/components/datasheets/SectionSvg";
import DatasheetModelLink from "@/components/datasheets/DatasheetModelLink";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { computeProperties, SHAPES, type Geometry, type ShapeId } from "@/lib/catalog/shapes";

const fmt = (value: number, digits: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function ProfileFigure({ model, number = 1 }: { model: string; number?: number }) {
  const product = buildProducts().find((item) => item.model === model);
  if (!product || !(product.geometry.shape in SHAPES)) throw new Error(`ProfileFigure: ${model} is not a parametric catalog profile`);
  const geometry: Geometry = { kind: "parametric", shape: product.geometry.shape as ShapeId, dims: product.geometry.dims };
  const props = computeProperties(geometry);
  const rows: [string, string][] = [
    ["A", `${fmt(props.A, 0)} mm²`],
    ["Ix", `${fmt(props.Ix / 1e4, 1)} cm⁴`],
    ["Mass", `${product.weight} kg/m`],
  ];
  return (
    <Figure number={number} title={model} caption={<>Cross-section of <DatasheetModelLink model={model} />, one catalog size. Mass is the published catalog value; A and Ix are calculated from the nominal section.</>}>
      <div className="grid items-center gap-[12px] sm:grid-cols-[minmax(0,1fr)_auto]">
        <SectionSvg geometry={geometry} size={220} className="mx-auto h-auto w-full max-w-[220px]" />
        <dl className="grid grid-cols-3 gap-x-[16px] gap-y-[2px] text-f14 sm:grid-cols-1 sm:gap-y-[10px]">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-f12 text-t3">{label}</dt>
              <dd className="font-semibold text-t1">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Figure>
  );
}
