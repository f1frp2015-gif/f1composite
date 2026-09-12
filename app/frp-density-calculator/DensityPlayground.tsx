"use client";
import { useEffect, useState } from "react";
import type { calculateLayup, LayupLayer, RovingGroup } from "@/lib/frpLayup";

const colors = ["#008d86", "#369ca4", "#c17c28", "#655ac7", "#b4597c"];
const stages = [
  "Place reinforcement",
  "Fill matrix volume",
  "Read density & weight",
];

export default function DensityPlayground({
  result,
  area,
  layers,
  rovings,
  voids,
  onLayers,
  onRovings,
  onVoids,
}: {
  result: ReturnType<typeof calculateLayup>;
  area: number;
  layers: LayupLayer[];
  rovings: RovingGroup[];
  voids: string;
  onLayers: (v: LayupLayer[]) => void;
  onRovings: (v: RovingGroup[]) => void;
  onVoids: (v: string) => void;
}) {
  const [stage, setStage] = useState(2);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (stage >= 1) {
        setStage(2);
        setPlaying(false);
      } else setStage(stage + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [playing, stage]);
  const [selectedLayer, setSelectedLayer] = useState(0);
  const layerIndex = Math.min(selectedLayer, Math.max(0, layers.length - 1));
  const layer = layers[layerIndex];
  const roving = rovings[0];
  const valid = !result.error && area > 0;
  const bars = valid
    ? [
        ...result.breakdown!.map((part, index) => ({
          label: part.name,
          area: part.area,
          color: colors[index % colors.length],
          show: true,
        })),
        {
          label: "Cured matrix",
          area: result.matrixArea!,
          color: "#a8cbdc",
          show: stage >= 1,
        },
        {
          label: "Voids",
          area: result.voidArea!,
          color: "#e2e8f0",
          show: stage >= 1,
        },
      ]
    : [];
  let offset = 0;
  return (
    <div
      aria-live="off"
      className="mt-5 rounded-xl border border-border-default bg-bg2 p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold text-t1">Explore the material balance</h3>
        <button
          type="button"
          onClick={() => {
            if (playing) {
              setPlaying(false);
              return;
            }
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              setStage(2);
              return;
            }
            setStage(0);
            setPlaying(true);
          }}
          className="shrink-0 rounded-lg border border-border-default bg-white px-3 py-2 text-xs font-semibold text-teal-text"
        >
          {playing ? "Pause animation" : "Play fill animation"}
        </button>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {stages.map((name, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={stage === index}
            onClick={() => {
              setPlaying(false);
              setStage(index);
            }}
            className={`rounded-lg border p-2 text-left text-xs ${stage === index ? "border-teal bg-teal-bg text-teal-text" : "border-border-default bg-white text-t2"}`}
          >
            {index + 1}. {name}
          </button>
        ))}
      </div>
      {valid ? (
        <>
          <svg
            viewBox="0 0 400 120"
            role="img"
            aria-label={`Material volume balance: ${result.reinforcementVolumePercent!.toFixed(2)}% reinforcement, ${((result.matrixArea! / area) * 100).toFixed(2)}% matrix, ${voids}% voids. Stage ${stage + 1}.`}
            className="mt-4 w-full"
          >
            <rect
              x="10"
              y="20"
              width="380"
              height="50"
              fill="white"
              stroke="#cbd5e1"
            />
            {bars.map((bar, index) => {
              const x = 10 + (offset / area) * 380;
              offset += bar.area;
              return (
                <rect
                  key={index}
                  x={x}
                  y="20"
                  width={(bar.area / area) * 380}
                  height="50"
                  fill={bar.color}
                  style={{ opacity: bar.show ? 1 : 0 }}
                  className="transition-[x,width,opacity] duration-500 motion-reduce:transition-none"
                >
                  <title>
                    {`${bar.label}: ${((bar.area / area) * 100).toFixed(2)}% of net volume`}
                  </title>
                </rect>
              );
            })}
            <path d="M10 85V100M10 93H390M390 85V100" stroke="#64748b" />
            <text
              x="200"
              y="115"
              textAnchor="middle"
              fill="#475569"
              fontSize="12"
            >
              Material contained in 1 meter of profile
            </text>
          </svg>
          <p className="text-xs leading-relaxed text-t2">
            {stage === 0
              ? `${result.reinforcementArea!.toFixed(2)} mm² is occupied by retained reinforcement.`
              : stage === 1
                ? `${result.matrixArea!.toFixed(2)} mm² remains for the cured matrix; voids occupy ${result.voidArea!.toFixed(2)} mm².`
                : `One meter: ${result.kgPerM!.toFixed(4)} kg · density: ${result.density!.toFixed(4)} g/cm³.`}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-t2">
            {bars
              .filter((b) => b.area > 0)
              .map((bar, index) => (
                <span key={index} className="inline-flex items-center gap-1">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: bar.color }}
                  />
                  {bar.label}
                </span>
              ))}
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-t2">
          Adjust the inputs to restore a valid material balance. The animation
          resumes when the section can contain the reinforcement and matrix.
        </p>
      )}
      <p className="mt-3 text-xs text-t3">
        Band widths show volume proportions, not physical ply locations. Final
        results always use the complete material balance.
      </p>
      <details className="mt-4" open>
        <summary className="cursor-pointer text-sm font-semibold text-teal-text">
          Drag to calculate
        </summary>
        <div className="mt-4 space-y-4">
          {layer && (
            <div>
              <label
                htmlFor="interactive-layer"
                className="block text-xs text-t2"
              >
                Mat / fabric path
                <select
                  id="interactive-layer"
                  value={layerIndex}
                  onChange={(e) => setSelectedLayer(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-border-default bg-white p-2 text-sm"
                >
                  {layers.map((row, index) => (
                    <option key={index} value={index}>
                      {index + 1}. {row.name}
                    </option>
                  ))}
                </select>
              </label>
              <label
                htmlFor="interactive-gsm"
                className="mt-3 block text-sm text-t1"
              >
                Mat / fabric GSM: <strong>{layer.gsm} g/m²</strong>
                <input
                  id="interactive-gsm"
                  type="range"
                  min="50"
                  max={Math.max(1500, Number(layer.gsm) || 0)}
                  step="1"
                  value={Number(layer.gsm) || 50}
                  onChange={(e) =>
                    onLayers(
                      layers.map((row, index) =>
                        index === layerIndex
                          ? { ...row, gsm: e.target.value }
                          : row,
                      ),
                    )
                  }
                  className="mt-2 w-full accent-teal"
                />
              </label>
            </div>
          )}
          {roving && (
            <label htmlFor="interactive-ends" className="block text-sm text-t1">
              Roving group 1:{" "}
              <strong>
                {roving.ends} ends × {roving.tex} tex
              </strong>
              <input
                id="interactive-ends"
                type="range"
                min="0"
                max={Math.max(1200, Number(roving.ends) || 0)}
                step="1"
                value={Number(roving.ends) || 0}
                onChange={(e) =>
                  onRovings(
                    rovings.map((row, index) =>
                      index === 0 ? { ...row, ends: e.target.value } : row,
                    ),
                  )
                }
                className="mt-2 w-full accent-teal"
              />
            </label>
          )}
          <label htmlFor="interactive-voids" className="block text-sm text-t1">
            Void volume: <strong>{voids}%</strong>
            <input
              id="interactive-voids"
              type="range"
              min="0"
              max={Math.min(99, Math.max(10, Number(voids) || 0))}
              step="0.1"
              value={Number(voids) || 0}
              onChange={(e) => onVoids(e.target.value)}
              className="mt-2 w-full accent-teal"
            />
          </label>
        </div>
      </details>
    </div>
  );
}
