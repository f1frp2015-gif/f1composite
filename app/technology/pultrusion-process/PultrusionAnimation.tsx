"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════
   Animated schematic — injection pultrusion line
   Side-elevation cutaway, all motion driven by CSS
   keyframes at a single consistent line speed (25 px/s):
   spool rpm, belt treads, roller spin, and cut-length
   growth are all derived from it.
   ═══════════════════════════════════════════════════════ */

const CYCLE = 8; // s — one cut-off cycle (200 px of profile at 25 px/s)

export default function PultrusionAnimation() {
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Pause the whole scene while scrolled off-screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && inView;

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-[8px] border border-border-default bg-white"
    >
      {/* Card header */}
      <div className="flex items-center justify-between gap-[13px] border-b border-border-default px-[21px] py-[13px]">
        <p className="text-f11 font-bold uppercase tracking-[0.08em] text-t3">
          Animated Schematic — Injection Pultrusion Line
        </p>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause animation" : "Play animation"}
          className="flex shrink-0 items-center gap-[5px] rounded-full border border-teal-border bg-teal-bg px-[13px] py-[3px] text-f11 font-bold text-teal-text transition-colors hover:bg-teal-bg2"
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 1h2.4v8H2zM5.6 1H8v8H5.6z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 1l7 4-7 4z" fill="currentColor" />
            </svg>
          )}
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {/* Scene */}
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1060 392"
          role="img"
          aria-label="Animated cutaway of an injection pultrusion line: fiber spools on a creel pay off continuous roving through guide plates into a pressurized resin injection chamber, then through a three-zone heated die where the profile cures, and a caterpillar puller draws it to a flying cut-off saw."
          className={`pa-scene block h-auto w-full min-w-[880px] ${running ? "" : "pa-paused"}`}
        >
          <title>Injection pultrusion line — animated schematic</title>

          <defs>
            <linearGradient id="paChrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e6e9f1" />
              <stop offset="0.5" stopColor="#c2c8d6" />
              <stop offset="1" stopColor="#e2e5ee" />
            </linearGradient>
            <linearGradient
              id="paCure"
              gradientUnits="userSpaceOnUse"
              x1="268"
              y1="0"
              x2="520"
              y2="0"
            >
              <stop offset="0" stopColor="#e6c06a" />
              <stop offset="0.35" stopColor="#d9a441" />
              <stop offset="0.62" stopColor="#b08a54" />
              <stop offset="0.85" stopColor="#9aa2ab" />
              <stop offset="1" stopColor="#97a1ab" />
            </linearGradient>
            <radialGradient id="paHeat" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ff8a3d" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ff8a3d" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Backdrop + floor */}
          <rect x="0" y="0" width="1060" height="320" fill="#f4f5f9" />
          <g stroke="#0d0f24" strokeOpacity="0.03">
            {Array.from({ length: 19 }, (_, i) => (
              <line key={i} x1={53 + i * 53} y1="0" x2={53 + i * 53} y2="320" />
            ))}
          </g>
          <line x1="0" y1="320" x2="1060" y2="320" stroke="#4b4f6a" strokeWidth="2" />
          <g stroke="#4b4f6a" strokeOpacity="0.25">
            {Array.from({ length: 53 }, (_, i) => (
              <line key={i} x1={10 + i * 20} y1="320" x2={4 + i * 20} y2="326" />
            ))}
          </g>

          {/* Legend — material state */}
          <g fontSize="10" fill="#6e7189">
            <circle cx="26" cy="26" r="4" fill="#dfd6b8" stroke="#b8ab7f" strokeWidth="0.8" />
            <text x="36" y="29.5">Dry fiber</text>
            <circle cx="106" cy="26" r="4" fill="#d9a441" />
            <text x="116" y="29.5">Resin-wetted</text>
            <circle cx="204" cy="26" r="4" fill="#97a1ab" />
            <text x="214" y="29.5">Cured profile</text>
          </g>

          {/* ── 1 · Fiber creel ── */}
          <g>
            {/* rack frame */}
            <g stroke="#8b93a5" strokeWidth="4">
              <line x1="26" y1="120" x2="26" y2="320" />
              <line x1="142" y1="120" x2="142" y2="320" />
              <line x1="24" y1="122" x2="144" y2="122" />
            </g>
            <g stroke="#aab1c2" strokeWidth="2.5">
              <line x1="26" y1="184" x2="142" y2="184" />
              <line x1="26" y1="244" x2="142" y2="244" />
              <line x1="26" y1="304" x2="142" y2="304" />
            </g>
            {/* spools — rotation speed matches 25 px/s pay-off on a Ø40 spool */}
            {[
              { cx: 52, cy: 154, dur: 5.0 },
              { cx: 52, cy: 214, dur: 5.5 },
              { cx: 52, cy: 274, dur: 4.7 },
              { cx: 116, cy: 154, dur: 5.3 },
              { cx: 116, cy: 214, dur: 4.9 },
              { cx: 116, cy: 274, dur: 5.6 },
            ].map((s) => (
              <g key={`${s.cx}-${s.cy}`}>
                <g className="pa-rot" style={{ animationDuration: `${s.dur}s` }}>
                  <circle cx={s.cx} cy={s.cy} r="20" fill="#d8dbe4" stroke="#9aa1b3" strokeWidth="1.5" />
                  <circle cx={s.cx} cy={s.cy} r="16.5" fill="none" stroke="#dfd6b8" strokeWidth="2.5" />
                  <circle cx={s.cx} cy={s.cy} r="12.5" fill="none" stroke="#d4c9a4" strokeWidth="2" />
                  <line x1={s.cx - 20} y1={s.cy} x2={s.cx + 20} y2={s.cy} stroke="#8f96a8" strokeWidth="1.2" />
                  <line x1={s.cx} y1={s.cy - 20} x2={s.cx} y2={s.cy + 20} stroke="#8f96a8" strokeWidth="1.2" />
                  <circle cx={s.cx} cy={s.cy} r="4.5" fill="#6b7385" />
                </g>
              </g>
            ))}
          </g>

          {/* ── Fiber paths: creel → guide plates → injection chamber ── */}
          {(() => {
            const fibers = [
              `M68 148 C110 156, 150 182, 184 196`,
              `M68 210 C110 208, 150 204, 184 204`,
              `M68 270 C110 258, 150 228, 184 212`,
              `M130 150 C152 166, 170 204, 184 220`,
              `M130 212 C152 216, 170 224, 184 228`,
              `M130 270 C152 260, 170 244, 184 236`,
            ];
            const between = [
              [196, 201], [204, 205.5], [212, 208.5], [220, 211.5], [228, 214.5], [236, 219],
            ].map(([a, b]) => `M186 ${a} L208 ${b}`);
            const toDie = [
              [201, 203], [205.5, 206], [208.5, 209], [211.5, 212], [214.5, 215], [219, 217.5],
            ].map(([a, b]) => `M212 ${a} C232 ${a}, 252 ${b}, 270 ${b}`);
            const all = [...fibers, ...between, ...toDie];
            return (
              <g fill="none">
                {all.map((d, i) => (
                  <path key={`f${i}`} d={d} stroke="#dfd6b8" strokeWidth="1.6" />
                ))}
                {/* traveling flecks — visualize fiber motion at line speed */}
                {all.map((d, i) => (
                  <path
                    key={`k${i}`}
                    d={d}
                    stroke="#b8ab7f"
                    strokeWidth="1.6"
                    strokeDasharray="2 16"
                    className="pa-fleck"
                    style={{ animationDelay: `${-i * 0.13}s` }}
                  />
                ))}
              </g>
            );
          })()}

          {/* ── 2 · Guide plates ── */}
          {[184, 210].map((x) => (
            <g key={x}>
              <rect x={x - 3} y="176" width="6" height="94" rx="3" fill="#6b7385" />
              <line x1={x} y1="270" x2={x} y2="320" stroke="#8b93a5" strokeWidth="4" />
              {(x === 184
                ? [196, 204, 212, 220, 228, 236]
                : [201, 205.5, 209, 212.5, 216, 219.5]
              ).map((y) => (
                <circle key={y} cx={x} cy={y} r="2.4" fill="#f4f5f9" stroke="#4a5164" strokeWidth="0.8" />
              ))}
            </g>
          ))}

          {/* ── Bench under chamber + die ── */}
          <rect x="258" y="236" width="272" height="12" fill="#8b93a5" />
          <g stroke="#8b93a5" strokeWidth="5">
            <line x1="272" y1="248" x2="272" y2="320" />
            <line x1="516" y1="248" x2="516" y2="320" />
          </g>

          {/* saw gantry columns — straddle the line, drawn behind the profile */}
          <g stroke="#aab1c2" strokeWidth="7">
            <line x1="750" y1="108" x2="750" y2="320" />
            <line x1="850" y1="108" x2="850" y2="320" />
          </g>

          {/* ── Profile band: wet fibers → cured profile (cutaway view) ── */}
          <rect x="268" y="200" width="542" height="20" fill="url(#paCure)" />
          <rect x="520" y="200" width="290" height="20" fill="#97a1ab" />
          <g stroke="#7d8794" strokeWidth="1">
            <line x1="268" y1="200.6" x2="810" y2="200.6" />
            <line x1="268" y1="219.4" x2="810" y2="219.4" />
          </g>
          {/* fiber strands visible inside the wet zone */}
          <g stroke="#c9a75f" strokeWidth="0.9" opacity="0.75">
            {[204.5, 209, 213.5, 218].map((y) => (
              <line key={y} x1="270" y1={y} x2="500" y2={y} />
            ))}
          </g>
          {/* moving surface texture on the cured length */}
          <g stroke="#7d8794" strokeWidth="1.1" opacity="0.65">
            {[205, 210, 215].map((y, i) => (
              <line
                key={y}
                x1="505"
                y1={y}
                x2="808"
                y2={y}
                strokeDasharray="26 10"
                className="pa-flow"
                style={{ animationDelay: `${-i * 0.5}s` }}
              />
            ))}
          </g>

          {/* ── 3 · Resin tank, feed line, injection chamber ── */}
          <g>
            {/* tank */}
            <rect x="266" y="76" width="48" height="38" rx="4" fill="#dfe3ec" stroke="#8b93a5" strokeWidth="1.5" />
            <rect x="270" y="90" width="40" height="20" rx="2" fill="#e0aa4c" opacity="0.85" />
            <text x="290" y="70" textAnchor="middle" fontSize="10" fill="#6e7189">
              Resin + fillers
            </text>
            {/* feed pipe with flow */}
            <line x1="290" y1="114" x2="290" y2="192" stroke="#8b93a5" strokeWidth="6" />
            <line
              x1="290"
              y1="114"
              x2="290"
              y2="192"
              stroke="#d9a441"
              strokeWidth="3"
              strokeDasharray="4 5"
              className="pa-drip"
            />
            {/* metering pump */}
            <g className="pa-pump">
              <circle cx="290" cy="150" r="9" fill="#6b7385" />
              <circle cx="290" cy="150" r="3.5" fill="#d9a441" />
            </g>
            {/* pressure gauge */}
            <circle cx="316" cy="176" r="7.5" fill="#fff" stroke="#4a5164" strokeWidth="1.4" />
            <line x1="316" y1="183" x2="316" y2="188" stroke="#4a5164" strokeWidth="2" />
            <g className="pa-needle" style={{ transformOrigin: "316px 177px" }}>
              <line x1="316" y1="177" x2="316" y2="171.5" stroke="#c0392b" strokeWidth="1.4" />
            </g>
            <text x="316" y="163" textAnchor="middle" fontSize="9.5" fill="#6e7189">
              3–8 bar
            </text>
            {/* chamber body (cutaway: top + bottom walls) */}
            <rect x="268" y="188" width="56" height="12" fill="#6b7385" />
            <rect x="268" y="220" width="56" height="14" fill="#6b7385" />
            <rect x="266" y="186" width="6" height="17" fill="#5b6272" />
            <rect x="266" y="217" width="6" height="19" fill="#5b6272" />
            {[280, 296, 312].map((x) => (
              <g key={x} fill="#aab1c2">
                <circle cx={x} cy="194" r="1.6" />
                <circle cx={x} cy="227" r="1.6" />
              </g>
            ))}
          </g>

          {/* ── 4 · Heated die (cutaway, 3 heating zones) ── */}
          <g>
            <rect x="324" y="185" width="196" height="15" fill="url(#paChrome)" stroke="#9aa1b3" strokeWidth="1" />
            <rect x="324" y="220" width="196" height="15" fill="url(#paChrome)" stroke="#9aa1b3" strokeWidth="1" />
            {/* heater bands clamped on top and bottom plates */}
            {[
              { x: 336, delay: 0 },
              { x: 396, delay: 0.9 },
              { x: 456, delay: 1.7 },
            ].map((z) => (
              <g key={z.x}>
                <rect
                  x={z.x}
                  y="185"
                  width="46"
                  height="15"
                  fill="#ff8a3d"
                  className="pa-glow"
                  style={{ animationDelay: `${-z.delay}s` }}
                />
                <rect
                  x={z.x}
                  y="220"
                  width="46"
                  height="15"
                  fill="#ff8a3d"
                  className="pa-glow"
                  style={{ animationDelay: `${-z.delay - 0.4}s` }}
                />
              </g>
            ))}
            {/* thermocouple leads */}
            <g stroke="#4a5164" strokeWidth="1.2" fill="none">
              <path d="M359 185 v-8 h10" />
              <path d="M419 185 v-8 h10" />
              <path d="M479 185 v-8 h10" />
            </g>
            <g fontSize="9.5" fill="#6e7189" textAnchor="middle">
              <text x="359" y="170">Z1 · 130 °C</text>
              <text x="419" y="170">Z2 · 160 °C</text>
              <text x="479" y="170">Z3 · 175 °C</text>
            </g>
            {/* heat shimmer */}
            {[352, 394, 436, 478].map((x, i) => (
              <path
                key={x}
                d={`M${x} 156 q3 -5 0 -10 q-3 -5 0 -10`}
                fill="none"
                stroke="#ff8a3d"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="pa-shimmer"
                style={{ animationDelay: `${-i * 0.55}s` }}
              />
            ))}
            {/* gel-point marker inside cutaway */}
            <line x1="452" y1="201" x2="452" y2="219" stroke="#4b4f6a" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="452" y="256" textAnchor="middle" fontSize="9" fill="#6e7189">
              gel point
            </text>
          </g>

          {/* line speed chip */}
          <g>
            <rect x="588" y="86" width="86" height="18" rx="9" fill="rgba(0,161,153,0.08)" stroke="rgba(0,161,153,0.18)" />
            <text x="622" y="98.5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#00857e">
              0.9 m/min
            </text>
            <path d="M660 95 h6 m-2.5 -3 l3 3 -3 3" stroke="#00857e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* ── 5 · Caterpillar puller ── */}
          <g>
            <rect x="556" y="132" width="148" height="176" rx="4" fill="none" stroke="#8b93a5" strokeWidth="4" />
            <line x1="566" y1="308" x2="566" y2="320" stroke="#8b93a5" strokeWidth="5" />
            <line x1="694" y1="308" x2="694" y2="320" stroke="#8b93a5" strokeWidth="5" />
            {/* top belt — counterclockwise path so contact face moves right */}
            <path
              d="M592 199 H668 A20.5 20.5 0 0 0 668 158 H592 A20.5 20.5 0 0 0 592 199 Z"
              fill="#d8dbe4"
              stroke="#5b6272"
              strokeWidth="3"
            />
            <path
              d="M592 199 H668 A20.5 20.5 0 0 0 668 158 H592 A20.5 20.5 0 0 0 592 199 Z"
              fill="none"
              stroke="#31384a"
              strokeWidth="3"
              strokeDasharray="8 6"
              className="pa-belt"
            />
            {/* bottom belt — clockwise path so contact face moves right */}
            <path
              d="M592 221 H668 A20.5 20.5 0 0 1 668 262 H592 A20.5 20.5 0 0 1 592 221 Z"
              fill="#d8dbe4"
              stroke="#5b6272"
              strokeWidth="3"
            />
            <path
              d="M592 221 H668 A20.5 20.5 0 0 1 668 262 H592 A20.5 20.5 0 0 1 592 221 Z"
              fill="none"
              stroke="#31384a"
              strokeWidth="3"
              strokeDasharray="8 6"
              className="pa-belt"
            />
            {/* belt wheels */}
            {[
              { cx: 596, cy: 178.5 },
              { cx: 630, cy: 178.5 },
              { cx: 664, cy: 178.5 },
              { cx: 596, cy: 241.5 },
              { cx: 630, cy: 241.5 },
              { cx: 664, cy: 241.5 },
            ].map((w) => (
              <g key={`${w.cx}-${w.cy}`} className="pa-rot" style={{ animationDuration: "3.3s" }}>
                <circle cx={w.cx} cy={w.cy} r="12" fill="#aab1c2" stroke="#5b6272" strokeWidth="1.5" />
                <line x1={w.cx - 12} y1={w.cy} x2={w.cx + 12} y2={w.cy} stroke="#5b6272" strokeWidth="1.2" />
                <line x1={w.cx} y1={w.cy - 12} x2={w.cx} y2={w.cy + 12} stroke="#5b6272" strokeWidth="1.2" />
                <circle cx={w.cx} cy={w.cy} r="2.5" fill="#31384a" />
              </g>
            ))}
          </g>

          {/* ── Roller table ── */}
          {[840, 890, 940, 990, 1038].map((cx) => (
            <g key={cx}>
              <g className="pa-rot" style={{ animationDuration: "2s" }}>
                <circle cx={cx} cy="228" r="8" fill="#c2c8d6" stroke="#6b7385" strokeWidth="1.5" />
                <line x1={cx - 8} y1="228" x2={cx + 8} y2="228" stroke="#6b7385" strokeWidth="1" />
                <line x1={cx} y1="220" x2={cx} y2="236" stroke="#6b7385" strokeWidth="1" />
              </g>
              <line x1={cx} y1="236" x2={cx} y2="320" stroke="#aab1c2" strokeWidth="3" />
            </g>
          ))}

          {/* ── Advancing free end + detached cut piece ── */}
          {/* free end grows from the cut plane at exactly line speed */}
          <g className="pa-tail" style={{ transformOrigin: "810px 210px" }}>
            <rect x="810" y="200" width="200" height="20" fill="#97a1ab" />
          </g>
          {/* previous piece kicked off by the conveyor, then fades */}
          <g className="pa-piece">
            <rect x="810" y="200" width="200" height="20" fill="#97a1ab" />
            <line x1="810.8" y1="200" x2="810.8" y2="220" stroke="#7d8794" strokeWidth="1.6" />
            <line x1="1009.2" y1="200" x2="1009.2" y2="220" stroke="#7d8794" strokeWidth="1.6" />
          </g>

          {/* ── 6 · Flying cut-off saw ── */}
          <g>
            {/* gantry rail */}
            <rect x="744" y="104" width="112" height="8" rx="3" fill="#8b93a5" />
            <g className="pa-carriage">
              {/* slide rod + blade plunge as one head */}
              <g className="pa-sawhead">
                <rect x="768" y="100" width="8" height="70" rx="3" fill="#5b6272" />
                <circle cx="772" cy="98" r="4" fill="#4a5164" />
                {/* blade */}
                <g className="pa-rot" style={{ animationDuration: "0.4s" }}>
                  <circle cx="772" cy="168" r="28" fill="#dfe3ec" stroke="#4a5164" strokeWidth="2" />
                  <circle
                    cx="772"
                    cy="168"
                    r="26"
                    fill="none"
                    stroke="#4a5164"
                    strokeWidth="4"
                    strokeDasharray="4 5"
                  />
                  <circle cx="772" cy="168" r="4" fill="#31384a" />
                </g>
                {/* guard */}
                <path d="M744 168 A28 28 0 0 1 800 168" fill="none" stroke="#031697" strokeWidth="5" />
              </g>
              {/* carriage body */}
              <rect x="750" y="112" width="44" height="26" rx="3" fill="#6b7385" stroke="#4a5164" strokeWidth="1.5" />
              {/* sparks at the kerf */}
              <g className="pa-sparks" stroke="#ff9a3d" strokeWidth="1.6" strokeLinecap="round">
                <line x1="772" y1="222" x2="762" y2="230" className="pa-flick" />
                <line x1="772" y1="222" x2="782" y2="231" className="pa-flick" style={{ animationDelay: "-0.06s" }} />
                <line x1="772" y1="224" x2="772" y2="233" stroke="#ffcf3d" className="pa-flick" style={{ animationDelay: "-0.1s" }} />
                <line x1="772" y1="222" x2="765" y2="234" stroke="#ffcf3d" className="pa-flick" style={{ animationDelay: "-0.03s" }} />
              </g>
            </g>
          </g>

          {/* ── Station labels ── */}
          {[
            { x: 84, n: 1, name: "Fiber Creel", spec: "E-glass roving · CFM" },
            { x: 197, n: 2, name: "Guide Plates", spec: "spatial alignment" },
            { x: 296, n: 3, name: "Resin Injection", spec: "3–8 bar · ±1 %" },
            { x: 422, n: 4, name: "Heated Die", spec: "3 zones · 120–180 °C" },
            { x: 630, n: 5, name: "Puller", spec: "0.3–1.5 m/min" },
            { x: 800, n: 6, name: "Flying Cut-Off", spec: "±0.5 mm" },
          ].map((s) => (
            <a key={s.n} href={`#step-${s.n}`} aria-label={`Read about stage ${s.n}: ${s.name}`}>
              <g className="pa-label">
                <circle cx={s.x} cy="342" r="9" fill="#00a199" />
                <text x={s.x} y="345.5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">
                  {s.n}
                </text>
                <text x={s.x} y="366" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0d0f24">
                  {s.name}
                </text>
                <text x={s.x} y="380" textAnchor="middle" fontSize="9.5" fill="#6e7189">
                  {s.spec}
                </text>
              </g>
            </a>
          ))}

          <style>{`
            .pa-scene .pa-rot {
              transform-box: fill-box;
              transform-origin: center;
              animation: pa-spin 5s linear infinite;
            }
            .pa-scene .pa-fleck { animation: pa-fleck 0.72s linear infinite; }
            .pa-scene .pa-flow { animation: pa-flow 1.44s linear infinite; }
            .pa-scene .pa-belt { animation: pa-belt 0.56s linear infinite; }
            .pa-scene .pa-drip { animation: pa-drip 0.45s linear infinite; }
            .pa-scene .pa-glow { animation: pa-glow 2.6s ease-in-out infinite alternate; }
            .pa-scene .pa-shimmer { animation: pa-shimmer 2.2s linear infinite; }
            .pa-scene .pa-needle { animation: pa-needle 1.6s ease-in-out infinite alternate; }
            .pa-scene .pa-pump {
              transform-box: fill-box;
              transform-origin: center;
              animation: pa-pump 1.1s ease-in-out infinite;
            }
            .pa-scene .pa-tail { animation: pa-tail ${CYCLE}s linear infinite; }
            .pa-scene .pa-piece { animation: pa-piece ${CYCLE}s linear infinite; }
            .pa-scene .pa-carriage { animation: pa-carriage ${CYCLE}s linear infinite; }
            .pa-scene .pa-sawhead { animation: pa-sawhead ${CYCLE}s linear infinite; }
            .pa-scene .pa-sparks { animation: pa-sparks ${CYCLE}s linear infinite; }
            .pa-scene .pa-flick { animation-name: pa-flick; animation-duration: 0.12s; animation-iteration-count: infinite; }
            .pa-scene .pa-label { cursor: pointer; }
            .pa-scene a:hover .pa-label circle { fill: #031697; }

            .pa-scene.pa-paused *,
            .pa-scene.pa-paused .pa-rot { animation-play-state: paused !important; }
            @media (prefers-reduced-motion: reduce) {
              .pa-scene * { animation: none !important; }
            }

            @keyframes pa-spin { to { transform: rotate(360deg); } }
            @keyframes pa-fleck { to { stroke-dashoffset: -18; } }
            @keyframes pa-flow { to { stroke-dashoffset: -36; } }
            @keyframes pa-belt { to { stroke-dashoffset: -14; } }
            @keyframes pa-drip { to { stroke-dashoffset: -9; } }
            @keyframes pa-glow { from { opacity: 0.4; } to { opacity: 0.85; } }
            @keyframes pa-shimmer {
              0% { transform: translateY(0); opacity: 0; }
              25% { opacity: 0.55; }
              100% { transform: translateY(-26px); opacity: 0; }
            }
            @keyframes pa-needle { from { transform: rotate(-24deg); } to { transform: rotate(16deg); } }
            @keyframes pa-pump { 50% { transform: scale(1.14); } }
            @keyframes pa-tail { from { transform: scaleX(0); } to { transform: scaleX(1); } }
            @keyframes pa-piece {
              0% { transform: translateX(0); opacity: 1; }
              12% { transform: translateX(150px); opacity: 1; }
              20%, 100% { transform: translateX(230px); opacity: 0; }
            }
            @keyframes pa-carriage {
              0%, 80% { transform: translateX(0); }
              96% { transform: translateX(38px); }
              100% { transform: translateX(0); }
            }
            @keyframes pa-sawhead {
              0%, 80% { transform: translateY(0); }
              88%, 92% { transform: translateY(28px); }
              96%, 100% { transform: translateY(0); }
            }
            @keyframes pa-sparks {
              0%, 81% { opacity: 0; }
              83%, 91% { opacity: 1; }
              93%, 100% { opacity: 0; }
            }
            @keyframes pa-flick { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
          `}</style>
        </svg>
      </div>

      <p className="border-t border-border-default px-[21px] py-[8px] text-f11 leading-golden text-t3">
        Cutaway schematic of our standard injection pultrusion process — proportions
        simplified, parameters typical. Click a numbered station to jump to its
        detailed description below.
      </p>
    </div>
  );
}
