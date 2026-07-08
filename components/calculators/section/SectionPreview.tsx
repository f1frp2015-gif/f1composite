"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { track } from "@/components/calculators/leadCapture";
import SectionDrawing from "./SectionDrawing";
import {
  buildAnnotations,
  buildSection,
  centroid,
  SECTION_LOOKS,
  type SectionLook,
} from "./geometry";

// three.js (~170 KB gz) stays out of the page bundle until the preview mounts.
const SectionViewer3D = dynamic(() => import("./SectionViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-f11 text-t3">Loading 3D viewer…</div>
  ),
});

/**
 * Live visual of the section the calculator dims describe: an orbitable 3D
 * extrusion with dimension callouts, plus a 2-D dimensioned drawing. Purely
 * presentational — all design numbers come from ProfileCalculator's own
 * engineering functions.
 */
export default function SectionPreview({
  shape,
  H,
  B,
  tw,
  tf,
  look,
}: {
  shape: string;
  H: number;
  B: number;
  tw: number;
  tf: number;
  look: SectionLook;
}) {
  const [view, setView] = useState<"3d" | "drawing">("3d");
  // flips false when the browser can't create a WebGL context — drawing only
  const [webglOk, setWebglOk] = useState(true);

  const section = useMemo(() => buildSection(shape, H, B, tw, tf), [shape, H, B, tw, tf]);
  const c = useMemo(() => (section ? centroid(section) : null), [section]);
  const annotations = useMemo(
    () => (section && c ? buildAnnotations(shape, { H, B, tw, tf }, section, c) : undefined),
    [section, c, shape, H, B, tw, tf],
  );

  function switchView(v: "3d" | "drawing") {
    setView(v);
    track("calculator_section_view", { view: v, shape });
  }

  const tabClass = (active: boolean) =>
    `rounded-[4px] px-[10px] py-[3px] text-f11 font-bold uppercase tracking-wide transition-colors ${
      active ? "bg-teal text-white" : "bg-bg2 text-t3 hover:text-teal-text"
    }`;

  return (
    <div className="rounded-[6px] bg-white p-[13px]">
      <div className="flex items-center justify-between">
        <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Section Preview</div>
        {webglOk && (
          <div className="flex gap-[3px]">
            <button type="button" onClick={() => switchView("3d")} className={tabClass(view === "3d")}>
              3D
            </button>
            <button type="button" onClick={() => switchView("drawing")} className={tabClass(view === "drawing")}>
              Drawing
            </button>
          </div>
        )}
      </div>

      <div className="mt-[8px] h-[280px] overflow-hidden">
        {!section || !c ? (
          <div className="flex h-full items-center justify-center px-[21px] text-center text-f13 text-t3">
            Enter valid dimensions above to preview the section (thicknesses must fit inside H and B).
          </div>
        ) : view === "3d" && webglOk ? (
          <SectionViewer3D
            section={section}
            pbr={SECTION_LOOKS[look]}
            annotations={annotations}
            className="h-full w-full"
            onUnavailable={() => setWebglOk(false)}
          />
        ) : (
          <SectionDrawing section={section} centroid={c} className="h-full w-full" />
        )}
      </div>

      <p className="mt-[5px] text-right text-f11 text-t3">
        {view === "3d" && webglOk && section ? "Drag to rotate · " : ""}
        Section viewer by{" "}
        <a
          href="https://dimviz.com"
          target="_blank"
          rel="noopener"
          className="underline decoration-border-default underline-offset-2 hover:text-teal-text"
        >
          DimViz
        </a>
      </p>
    </div>
  );
}
