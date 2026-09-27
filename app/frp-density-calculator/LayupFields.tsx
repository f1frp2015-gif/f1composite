"use client";
import type { LayupLayer, RovingGroup } from "@/lib/frpLayup";
export default function LayupFields({
  layers,
  rovings,
  matrix,
  voids,
  perimeters,
  onLayers,
  onRovings,
  onMatrix,
  onVoids,
}: {
  layers: LayupLayer[];
  rovings: RovingGroup[];
  matrix: string;
  voids: string;
  perimeters: { outer: number; inner: number };
  onLayers: (v: LayupLayer[]) => void;
  onRovings: (v: RovingGroup[]) => void;
  onMatrix: (v: string) => void;
  onVoids: (v: string) => void;
}) {
  const control =
    "mt-[4px] w-full min-w-0 rounded-control border border-border-default bg-white px-[8px] py-[6px] text-f14 text-t1 outline-none focus:border-teal";
  const input = (label: string, value: string, change: (v: string) => void) => (
    <label className="block text-f12 text-t2">
      {label}
      <input
        type="number"
        step="any"
        min="0"
        aria-label={label}
        value={value}
        onChange={(e) => change(e.target.value)}
        className={control}
      />
    </label>
  );
  return (
    <div className="mt-[24px] rounded-card border border-border-default bg-white p-[16px]">
      <h3 className="text-f16 font-bold text-t1">Reinforcement layup per meter</h3>
      <p className="mt-[8px] text-f14 leading-relaxed text-t2">
        Start with the net section above. Add each mat, fabric or veil path and
        the longitudinal roving groups. The remaining volume is filled by the
        cured resin / filler matrix.
      </p>
      <p className="mt-[12px] rounded-control bg-bg2 p-[12px] text-f14 text-t1">
        Surface reference: outer boundary {perimeters.outer.toFixed(2)} mm ·
        inner boundary {perimeters.inner.toFixed(2)} mm.
      </p>
      <p className="mt-[8px] text-f12 leading-relaxed text-t3">
        Surface perimeters are thin-layer approximations. For each actual ply
        centerline, radiused corner or internal web, choose “Measured developed
        width” and enter its CAD or shop-floor width. Use separate rows when
        paths differ.
      </p>
      <div className="mt-[16px] space-y-[12px]">
        {layers.map((row, i) => {
          const update = (key: keyof LayupLayer, value: string) =>
            onLayers(
              layers.map((r, j) => (j === i ? { ...r, [key]: value } : r)),
            );
          return (
            <details
              key={i}
              open={i === 0}
              className="rounded-control border border-border-default bg-bg2 p-[12px]"
            >
              <summary className="cursor-pointer text-f14 font-semibold text-t1">
                Layer {i + 1}: {row.name}
              </summary>
              <label className="mt-[12px] block text-f12 text-t2">
                Material / placement
                <input
                  aria-label={`Layer ${i + 1} name`}
                  value={row.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={control}
                />
              </label>
              <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
                {input(`Layer ${i + 1} GSM (g/m²)`, row.gsm, (v) =>
                  update("gsm", v),
                )}
                {input(`Layer ${i + 1} count`, row.layers, (v) =>
                  update("layers", v),
                )}
                <label className="col-span-2 text-f12 text-t2">
                  Developed path
                  <select
                    aria-label={`Layer ${i + 1} path`}
                    value={row.path}
                    onChange={(e) => update("path", e.target.value)}
                    className={control}
                  >
                    <option value="outer">
                      Outer surface perimeter (approx.)
                    </option>
                    <option value="inner">
                      Inner surface perimeter (approx.)
                    </option>
                    <option value="custom">
                      Measured developed width / ply path
                    </option>
                  </select>
                </label>
                {row.path === "custom" &&
                  input(`Layer ${i + 1} width (mm)`, row.width, (v) =>
                    update("width", v),
                  )}
                {input(`Layer ${i + 1} coverage (%)`, row.coverage, (v) =>
                  update("coverage", v),
                )}
                {input(`Layer ${i + 1} total overlap (mm)`, row.overlap, (v) =>
                  update("overlap", v),
                )}
                {input(`Layer ${i + 1} consumption factor`, row.factor, (v) =>
                  update("factor", v),
                )}
                {input(`Layer ${i + 1} density (g/cm³)`, row.density, (v) =>
                  update("density", v),
                )}
              </div>
              <button
                type="button"
                onClick={() => onLayers(layers.filter((_, j) => j !== i))}
                className="mt-[12px] text-f12 text-teal-text underline"
              >
                Remove layer {i + 1}
              </button>
            </details>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() =>
          onLayers([
            ...layers,
            {
              name: "Additional fabric / veil",
              gsm: "450",
              path: "custom",
              width: "100",
              coverage: "100",
              overlap: "0",
              layers: "1",
              factor: "1",
              density: "2.54",
            },
          ])
        }
        className="mt-[12px] text-f14 font-semibold text-teal-text underline"
      >
        + Add mat / fabric / veil path
      </button>
      <p className="mt-[12px] text-f12 leading-relaxed text-t3">
        Coverage applies to the path before overlap. Overlap is the total extra
        retained width per ply. Factor 1 means one meter of fabric feed per
        axial meter; use measured consumption for helical or draped feed. A ±45°
        stitched fabric does not automatically need an angle multiplier: its GSM
        already includes its fibers. Do not include discarded trim or waste.
      </p>
      <h4 className="mt-[20px] text-f14 font-bold text-t1">
        Longitudinal roving groups
      </h4>
      {rovings.map((row, i) => (
        <div
          key={i}
          className="mt-[12px] rounded-control border border-border-default bg-bg2 p-[12px]"
        >
          <div className="grid grid-cols-2 gap-[12px]">
            {(
              [
                ["tex", "Tex (g/km)"],
                ["ends", "Number of ends"],
                ["factor", "Feed length / axial length"],
                ["density", "Density (g/cm³)"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                {input(`Roving ${i + 1} ${label}`, row[key], (v) =>
                  onRovings(
                    rovings.map((r, j) => (j === i ? { ...r, [key]: v } : r)),
                  ),
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-[12px] text-f12 text-teal-text underline"
            onClick={() => onRovings(rovings.filter((_, j) => j !== i))}
          >
            Remove roving group {i + 1}
          </button>
        </div>
      ))}
      <button
        type="button"
        className="mt-[12px] text-f14 font-semibold text-teal-text underline"
        onClick={() =>
          onRovings([
            ...rovings,
            { tex: "2400", ends: "0", factor: "1", density: "2.54" },
          ])
        }
      >
        + Add roving group
      </button>
      <div className="mt-[20px] grid grid-cols-2 gap-[12px]">
        {input("Cured resin / filler matrix density (g/cm³)", matrix, onMatrix)}
        {input("Layup void volume (%)", voids, onVoids)}
      </div>
      <p className="mt-[12px] text-f12 leading-relaxed text-t3">
        Use effective density of the cured resin plus retained fillers and
        additives. For a filled matrix, calculate it separately from its own
        weight fractions: ρmatrix = 1 / Σ(wi / ρi). Reinforcement densities must
        include retained binders / stitching, or model these separately.
      </p>
    </div>
  );
}
