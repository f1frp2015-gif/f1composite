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
    "mt-1 w-full min-w-0 rounded-lg border border-border-default bg-white p-2 text-sm text-t1 focus-visible:outline-2 focus-visible:outline-teal";
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
    <div className="mt-6 rounded-xl border border-border-default bg-bg2 p-4">
      <h3 className="font-bold text-t1">Laminate formulation</h3>
      <p className="mt-2 text-sm leading-relaxed text-t2">
        Enter each constituent separately. Percentages describe the finished,
        cured material before voids; exclude solvents lost during curing.
        Example values are editable assumptions, not a certified production
        recipe.
      </p>
      <label
        className="mt-4 block text-sm font-medium text-t1"
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
      <p className="mt-2 text-xs text-t3">
        Switching basis converts a valid recipe to preserve density. Volume
        percentages sum to 100% of non-void material; voids are entered
        separately below.
      </p>
      <div className="mt-4 space-y-3">
        {rows.map((row, index) => (
          <fieldset
            key={index}
            className="rounded-lg border border-border-default bg-white p-3"
          >
            <legend className="px-1 text-xs font-semibold text-t2">
              Constituent {index + 1}
            </legend>
            <label className="block text-xs text-t2">
              Material name
              <input
                aria-label={`Constituent ${index + 1} name`}
                value={row.name}
                onChange={(e) => update(index, "name", e.target.value)}
                className={control}
              />
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label className="text-xs text-t2">
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
              <label className="text-xs text-t2">
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
                className="mt-2 text-xs text-teal-text underline"
                onClick={() => onRows(rows.filter((_, i) => i !== index))}
              >
                Remove constituent {index + 1}
              </button>
            )}
          </fieldset>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        <button
          type="button"
          className="text-sm font-semibold text-teal-text underline"
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
          className="text-sm text-teal-text underline"
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
        className="mt-4 block text-sm font-medium text-t1"
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
      <p className="mt-3 text-xs leading-relaxed text-t3">
        Use cured resin density and solid constituent density—not loose mat bulk
        density. Roving, mat and fabric made from the same glass share its
        density. Account for binders, stitching and fillers separately, or use
        an effective constituent density without double-counting.
      </p>
    </div>
  );
}
