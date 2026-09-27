"use client";
import {
  calculateMixture,
  exampleRecipe,
  type Constituent,
  type MixtureBasis,
} from "@/lib/frpMixture";

export default function RecipeFields({
  rows,
  basis,
  voids,
  onRows,
  onBasis,
  onVoids,
}: {
  rows: Constituent[];
  basis: MixtureBasis;
  voids: string;
  onRows: (rows: Constituent[]) => void;
  onBasis: (basis: MixtureBasis) => void;
  onVoids: (value: string) => void;
}) {
  const result = calculateMixture(rows, basis, voids);
  const control =
    "mt-[4px] w-full min-w-0 rounded-control border border-border-default bg-white px-[8px] py-[6px] text-f14 text-t1 outline-none focus:border-teal";
  const update = (index: number, key: keyof Constituent, value: string) =>
    onRows(
      rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  function changeBasis(next: MixtureBasis) {
    if (next === basis) return;
    if (!result.error)
      onRows(
        rows.map((row, index) => ({
          ...row,
          percent: String(
            next === "weight"
              ? result.fractions![index].weightPercent
              : result.fractions![index].solidVolumePercent,
          ),
        })),
      );
    onBasis(next);
  }
  return (
    <div className="mt-[24px] rounded-card border border-border-default bg-white p-[16px]">
      <h3 className="text-f16 font-bold text-t1">Laminate formulation</h3>
      <p className="mt-[8px] text-f14 leading-relaxed text-t2">
        Enter each constituent separately. Percentages describe the finished,
        cured material before voids; exclude solvents lost during curing.
        Example values are editable assumptions, not a certified production
        recipe.
      </p>
      <label
        className="mt-[16px] block text-f14 font-medium text-t1"
        htmlFor="recipe-basis"
      >
        Content basis
        <select
          id="recipe-basis"
          value={basis}
          onChange={(e) => changeBasis(e.target.value as MixtureBasis)}
          className={control}
        >
          <option value="weight">Weight percentage (wt%)</option>
          <option value="volume">Solid volume percentage (vol%)</option>
        </select>
      </label>
      <p className="mt-[8px] text-f12 text-t3">
        Switching basis converts a valid recipe to preserve density. Volume
        percentages sum to 100% of non-void material; voids are entered
        separately below.
      </p>
      <div className="mt-[16px] space-y-[12px]">
        {rows.map((row, index) => (
          <fieldset
            key={index}
            className="rounded-control border border-border-default bg-bg2 p-[12px]"
          >
            <legend className="px-[4px] text-f12 font-semibold text-t2">
              Constituent {index + 1}
            </legend>
            <label className="block text-f12 text-t2">
              Material name
              <input
                aria-label={`Constituent ${index + 1} name`}
                value={row.name}
                onChange={(e) => update(index, "name", e.target.value)}
                className={control}
              />
            </label>
            <div className="mt-[8px] grid grid-cols-2 gap-[12px]">
              <label className="text-f12 text-t2">
                Content ({basis === "weight" ? "wt%" : "solid vol%"})
                <input
                  aria-label={`Constituent ${index + 1} content`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  max="100"
                  value={row.percent}
                  onChange={(e) => update(index, "percent", e.target.value)}
                  className={control}
                />
              </label>
              <label className="text-f12 text-t2">
                Density (g/cm³)
                <input
                  aria-label={`Constituent ${index + 1} density`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  value={row.density}
                  onChange={(e) => update(index, "density", e.target.value)}
                  className={control}
                />
              </label>
            </div>
            {index >= 5 && (
              <button
                type="button"
                className="mt-[8px] text-f12 text-teal-text underline"
                onClick={() => onRows(rows.filter((_, i) => i !== index))}
              >
                Remove constituent {index + 1}
              </button>
            )}
          </fieldset>
        ))}
      </div>
      <div className="mt-[12px] flex flex-wrap gap-[16px]">
        <button
          type="button"
          className="text-f14 font-semibold text-teal-text underline"
          onClick={() =>
            onRows([
              ...rows,
              { name: "Additional constituent", percent: "0", density: "1.2" },
            ])
          }
        >
          + Add constituent
        </button>
        <button
          type="button"
          className="text-f14 text-teal-text underline"
          onClick={() => {
            onRows(exampleRecipe);
            onBasis("weight");
            onVoids("0");
          }}
        >
          Load 70 wt% glass example
        </button>
      </div>
      <label
        className="mt-[16px] block text-f14 font-medium text-t1"
        htmlFor="recipe-voids"
      >
        Void content (% of final laminate volume)
        <input
          id="recipe-voids"
          type="number"
          inputMode="decimal"
          min="0"
          max="99.99"
          step="any"
          value={voids}
          onChange={(e) => onVoids(e.target.value)}
          className={control}
        />
      </label>
      <p className="mt-[12px] text-f12 leading-relaxed text-t3">
        Use cured resin density and solid constituent density—not loose mat bulk
        density. Roving, mat and fabric made from the same glass share its
        density. Account for binders, stitching and fillers separately, or use
        an effective constituent density without double-counting.
      </p>
    </div>
  );
}
