import SectionTag from "@/components/ui/SectionTag";
import {
  GRATING_CLIP_DXF_HREF,
  GRATING_CLIP_DXF_NAME,
  gratingClipInstallationPrinciples,
  gratingClipLayoutDisclaimer,
  gratingClipNamingNote,
  gratingClipTypicalStartingLayout,
  gratingClips,
  type GratingClipCode,
} from "@/content/data/gratingClips";
import {
  DARK,
  GRAY,
  TEAL,
} from "@/components/sections/FrpProcessShowcase";

const SUPPORT_FILL = "#e2e8f0";
const PANEL_FILL = "#dbe7e6";
const WHITE = "#ffffff";

function MClipFigure({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-auto w-full"
      role="img"
      aria-labelledby="m-clip-title m-clip-desc"
    >
      <title id="m-clip-title">M hold-down clip</title>
      <desc id="m-clip-desc">{alt}. Typical installation, not to scale.</desc>
      <rect x="55" y="160" width="250" height="28" rx="4" fill={SUPPORT_FILL} stroke={DARK} strokeWidth="2" />
      <text x="180" y="205" textAnchor="middle" fontSize="11" fill={DARK}>supporting member</text>
      <path d="M86 70 h52 v90 H86 z" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" />
      <path d="M222 70 h52 v90 h-52 z" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" />
      <path d="M84 91 h45 l18 -18 h66 l18 18 h45" fill="none" stroke={GRAY} strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="180" y1="73" x2="180" y2="178" stroke={DARK} strokeWidth="4" />
      <circle cx="180" cy="70" r="8" fill={GRAY} stroke={DARK} strokeWidth="2" />
      <rect x="166" y="174" width="28" height="10" rx="2" fill={GRAY} stroke={DARK} strokeWidth="2" />
      <path d="M180 38 v20" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      <path d="m174 51 6 7 6 -7" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="180" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEAL}>hold-down action</text>
      <text x="112" y="150" textAnchor="middle" fontSize="10" fill={DARK}>grating bar</text>
      <text x="248" y="150" textAnchor="middle" fontSize="10" fill={DARK}>grating bar</text>
    </svg>
  );
}

function CClipFigure({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-auto w-full"
      role="img"
      aria-labelledby="c-clip-title c-clip-desc"
    >
      <title id="c-clip-title">C panel connector</title>
      <desc id="c-clip-desc">{alt}. Typical installation, not to scale.</desc>
      <rect x="42" y="63" width="120" height="100" rx="4" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" />
      <rect x="198" y="63" width="120" height="100" rx="4" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" />
      {[76, 106, 136].map((y) => (
        <g key={y}>
          <line x1="54" y1={y} x2="150" y2={y} stroke={WHITE} strokeWidth="8" />
          <line x1="210" y1={y} x2="306" y2={y} stroke={WHITE} strokeWidth="8" />
        </g>
      ))}
      <path d="M145 89 h37 q22 0 22 22 v4 q0 22 -22 22 h-37" fill="none" stroke={GRAY} strokeWidth="10" strokeLinecap="round" />
      <line x1="180" y1="83" x2="180" y2="143" stroke={DARK} strokeWidth="4" />
      <circle cx="180" cy="82" r="7" fill={GRAY} stroke={DARK} strokeWidth="2" />
      <rect x="168" y="140" width="24" height="9" rx="2" fill={GRAY} stroke={DARK} strokeWidth="2" />
      <path d="M154 36 h52" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      <path d="m161 30 -7 6 7 6 M199 30 l7 6 -7 6" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="180" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEAL}>align adjacent molded panels</text>
      <text x="102" y="183" textAnchor="middle" fontSize="11" fill={DARK}>panel edge A</text>
      <text x="258" y="183" textAnchor="middle" fontSize="11" fill={DARK}>panel edge B</text>
      <text x="180" y="207" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>connector only — not a support or hold-down</text>
    </svg>
  );
}

function JClipFigure({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-auto w-full"
      role="img"
      aria-labelledby="j-clip-title j-clip-desc"
    >
      <title id="j-clip-title">J support-hook clamp</title>
      <desc id="j-clip-desc">{alt}. Typical installation, not to scale.</desc>
      <rect x="88" y="150" width="220" height="28" rx="4" fill={SUPPORT_FILL} stroke={DARK} strokeWidth="2" />
      <text x="210" y="205" textAnchor="middle" fontSize="11" fill={DARK}>support flange — not drilled</text>
      <path d="M104 62 h46 v88 h-46 z" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" />
      <path d="M184 62 h46 v88 h-46 z" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" />
      <path d="M88 84 h88" fill="none" stroke={GRAY} strokeWidth="9" strokeLinecap="round" />
      <line x1="78" y1="79" x2="78" y2="169" stroke={DARK} strokeWidth="4" />
      <circle cx="78" cy="77" r="8" fill={GRAY} stroke={DARK} strokeWidth="2" />
      <path d="M78 166 v10 q0 17 17 17 h58" fill="none" stroke={GRAY} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M273 112 164 188" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      <path d="m174 187 -10 1 4 -9" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="285" y="103" textAnchor="end" fontSize="11" fontWeight="700" fill={TEAL}>lower J hook</text>
      <path d="M132 34 v24" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      <path d="m126 51 6 7 6 -7" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="132" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEAL}>approved upper clip</text>
      <text x="127" y="140" textAnchor="middle" fontSize="10" fill={DARK}>grating bar</text>
      <text x="207" y="140" textAnchor="middle" fontSize="10" fill={DARK}>grating bar</text>
    </svg>
  );
}

function TClipFigure({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-auto w-full"
      role="img"
      aria-labelledby="t-clip-title t-clip-desc"
    >
      <title id="t-clip-title">F1 T pultruded-grating clip</title>
      <desc id="t-clip-desc">{alt}. Typical installation, not to scale.</desc>
      <rect x="52" y="160" width="256" height="28" rx="4" fill={SUPPORT_FILL} stroke={DARK} strokeWidth="2" />
      <text x="180" y="205" textAnchor="middle" fontSize="11" fill={DARK}>support frame</text>
      <path d="M76 70 h74 v20 h-24 v70 H100 V90 H76 z" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" strokeLinejoin="round" />
      <path d="M210 70 h74 v20 h-24 v70 h-26 V90 h-24 z" fill={PANEL_FILL} stroke={TEAL} strokeWidth="3" strokeLinejoin="round" />
      <path d="M142 85 h76 M180 85 v75" fill="none" stroke={GRAY} strokeWidth="10" strokeLinecap="round" />
      <line x1="180" y1="82" x2="180" y2="178" stroke={DARK} strokeWidth="4" />
      <circle cx="180" cy="80" r="8" fill={GRAY} stroke={DARK} strokeWidth="2" />
      <rect x="166" y="174" width="28" height="10" rx="2" fill={GRAY} stroke={DARK} strokeWidth="2" />
      <path d="M180 38 v20" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      <path d="m174 51 6 7 6 -7" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="180" y="27" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEAL}>F1 series-specific hold-down</text>
      <text x="113" y="146" textAnchor="middle" fontSize="10" fill={DARK}>bearing bar</text>
      <text x="247" y="146" textAnchor="middle" fontSize="10" fill={DARK}>bearing bar</text>
    </svg>
  );
}

function ClipFigure({ code, alt }: { code: GratingClipCode; alt: string }) {
  switch (code) {
    case "M":
      return <MClipFigure alt={alt} />;
    case "C":
      return <CClipFigure alt={alt} />;
    case "J":
      return <JClipFigure alt={alt} />;
    case "T":
      return <TClipFigure alt={alt} />;
  }
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-[3px] border-t border-border-default py-[8px] sm:grid-cols-[118px_1fr] sm:gap-[13px]">
      <dt className="text-f11 font-bold uppercase tracking-[0.08em] text-t3">{label}</dt>
      <dd className="text-f13 leading-golden text-t2">{value}</dd>
    </div>
  );
}

export default function GratingClipGuide() {
  return (
    <section id="grating-clips" className="bg-white py-[55px] md:py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <SectionTag>316SS Fastening Hardware</SectionTag>
        <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
          M, C, J, and T clips for FRP grating installation
        </h2>
        <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">
          F1-GRID clip kits define the connection function before the project drawing fixes the
          geometry. Select by panel family, support detail, and access; then confirm the exact
          hardware arrangement for the approved layout. The diagrams below explain the load path
          and compatibility only — they are not fabrication dimensions.
        </p>
        <p className="mt-[8px] max-w-[920px] rounded-[6px] border border-teal-border bg-teal-bg px-[13px] py-[10px] text-f13 leading-golden text-t2">
          {gratingClipNamingNote}
        </p>

        <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
          {gratingClips.map((clip) => (
            <article
              key={clip.code}
              className="overflow-hidden rounded-[8px] border border-border-default bg-white"
            >
              <div className="flex flex-wrap items-start justify-between gap-[10px] border-b border-border-default bg-bg2 px-[21px] py-[16px] sm:px-[34px]">
                <div>
                  <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">
                    F1-GRID clip {clip.code}
                  </p>
                  <h3 className="mt-[4px] text-f19 font-bold text-t1">{clip.name}</h3>
                </div>
                <span className="rounded-full border border-teal-border bg-white px-[10px] py-[5px] text-f11 font-bold text-teal-text">
                  {clip.sku}
                </span>
              </div>

              <figure className="px-[13px] pt-[16px] sm:px-[21px]">
                <div className="rounded-[8px] bg-bg2 p-[8px] sm:p-[13px]">
                  <ClipFigure code={clip.code} alt={clip.figureAlt} />
                </div>
                <figcaption className="mt-[8px] text-center text-f11 text-t3">
                  Typical installation — not to scale
                </figcaption>
              </figure>

              <div className="px-[21px] pb-[21px] pt-[13px] sm:px-[34px] sm:pb-[34px]">
                <p className="text-f15 leading-golden text-t2">{clip.purpose}</p>
                <dl className="mt-[13px]">
                  <SpecRow label="Material" value={clip.material} />
                  <SpecRow label="Connection" value={clip.attachment} />
                  <SpecRow label="Compatible" value={clip.compatibleWith.join(" · ")} />
                  <SpecRow label="Installation" value={clip.installation} />
                </dl>
                <p className="mt-[13px] rounded-[6px] border-l-[3px] border-teal bg-bg2 px-[13px] py-[10px] text-f13 leading-golden text-t2">
                  <strong className="text-t1">Boundary:</strong> {clip.caution}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[34px] grid gap-[21px] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px] sm:p-[34px]">
            <h3 className="text-f17 font-bold text-t1">Installation and spacing principles</h3>
            <ol className="mt-[13px] space-y-[10px]">
              {gratingClipInstallationPrinciples.map((principle, index) => (
                <li key={principle} className="flex gap-[10px] text-f13 leading-golden text-t2">
                  <span className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-teal text-f11 font-bold text-white">
                    {index + 1}
                  </span>
                  <span>{principle}</span>
                </li>
              ))}
            </ol>
            <div className="mt-[21px] rounded-[8px] border border-border-default bg-white p-[16px] sm:p-[21px]">
              <h4 className="text-f15 font-bold text-t1">Typical starting layout</h4>
              <p className="mt-[5px] text-f12 leading-golden text-t3">
                General coordination values before project-specific fastening design.
              </p>
              <dl className="mt-[13px]">
                {gratingClipTypicalStartingLayout.map((item) => (
                  <SpecRow key={item.label} label={item.label} value={item.value} />
                ))}
              </dl>
              <p className="mt-[13px] rounded-[6px] border-l-[3px] border-teal bg-teal-bg px-[13px] py-[10px] text-f12 leading-golden text-t2">
                {gratingClipLayoutDisclaimer}
              </p>
            </div>
          </div>

          <div className="rounded-[8px] border border-border-default bg-deep p-[21px] text-white sm:p-[34px]">
            <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal">
              Combined CAD detail
            </p>
            <h3 className="mt-[8px] text-f19 font-bold">{GRATING_CLIP_DXF_NAME}</h3>
            <p className="mt-[8px] text-f13 leading-golden text-white/75">
              One DXF containing the four typical installation details and F1 SKU references.
              Project-specific geometry remains governed by the approved project drawing.
            </p>
            <a
              href={GRATING_CLIP_DXF_HREF}
              download
              className="mt-[21px] inline-flex min-h-[46px] w-full items-center justify-center rounded-[7px] bg-teal-text px-[21px] py-[11px] text-center text-f13 font-bold text-white transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              Download combined M/C/J/T DXF
            </a>
            <p className="mt-[8px] text-f11 leading-golden text-white/60">
              Free DXF · no login · verify revision before issue for construction
            </p>
          </div>
        </div>

        <p className="mt-[21px] max-w-[980px] text-f13 leading-golden text-t3">
          Final clip geometry, bolt and washer selection, quantity, spacing, edge clearances,
          and tightening requirements must be shown on the approved project drawing. The clip
          guide does not change the grating span, bearing, support, or connection design checks.
        </p>
      </div>
    </section>
  );
}
