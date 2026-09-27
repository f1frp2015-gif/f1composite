import Link from "next/link";
import CoverCard from "@/components/ui/CoverCard";
import Figure from "@/components/ui/Figure";
import { productCovers } from "@/lib/covers";
import { windowBuyerPaths, windowPurchaseSteps, windowScopeRows, type WindowSupplyMode } from "@/content/data/windowBuying";
import { buildWindowRfqHref } from "@/lib/windowInquiry";

const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const link = "inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal";

/** The two supply routes as cover cards: profiles for local fabrication, or finished units. */
export function WindowSupplyRoutes() {
  const audience = "border-t border-border-default px-[18px] py-[10px] text-f14 text-t3 sm:px-[20px]";
  return <ul className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
    <li>
      <CoverCard
        href="/products/window-door-profiles"
        cover={productCovers["/products/window-door-profiles"]}
        label={<span className={mono}>For local fabrication</span>}
        title="Fiberglass system profiles"
        text="Source compatible frame, sash and mullion sections, with the accessories, samples and machining your production needs. A coated finish can give the profiles the look of aluminum."
        action="Explore profile systems"
        footer={<p className={audience}>Manufacturers · OEM system teams · Profile distributors</p>}
        sizes="(max-width: 767px) 94vw, 46vw"
      />
    </li>
    <li>
      <CoverCard
        href="/products/fiberglass-windows-doors"
        cover={productCovers["/products/fiberglass-windows-doors"]}
        label={<span className={mono}>For project &amp; dealer supply</span>}
        title="Finished windows & doors"
        text="Specify complete units by opening schedule, glass, hardware and project requirements. Confirm delivery and local installation responsibilities."
        action="Explore finished units"
        footer={<p className={audience}>Importers &amp; dealers · Contractors · Developers</p>}
        sizes="(max-width: 767px) 94vw, 46vw"
      />
    </li>
  </ul>;
}

// The numbered parts of Fig. "Window system components", in the drawing's order.
const windowParts = [
  ["01", "Frame", "The fixed outer member, fixed into the wall opening directly or through a subframe."],
  ["02", "Mullion", "Divides the frame into lights and carries wind load from head to sill."],
  ["03", "Sash", "The opening leaf: it carries its own glazing and moves on the hardware."],
  ["04", "Hardware", "Hinges, handles, locks and restrictors, set in the profile's hardware groove."],
  ["05", "Seals and beads", "Gaskets seal the sash to the frame; glazing beads hold the glass in its pocket."],
  ["06", "Glazing", "The insulated glass unit, set in the glazing pocket of the frame or sash."],
] as const;

/** Schematic of the parts a window system specifies, with a key to each numbered part. */
export function WindowComponentMap({ figure }: { figure: number }) {
  return <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-[48px]">
    <Figure number={figure} title="Window system components" caption="Component map, not a fabrication drawing. The selected system defines the actual interfaces.">
      <svg viewBox="0 0 660 440" role="img" aria-labelledby="window-map-title window-map-desc" className="w-full">
        <title id="window-map-title">Window system component map</title><desc id="window-map-desc">Schematic front view: outer frame surrounds a fixed glazed light and a moving sash divided by a mullion. Seals and hardware complete the assembly.</desc>
        <rect x="145" y="60" width="370" height="310" rx="4" fill="#fff" stroke="var(--color-t1)" strokeWidth="15" />
        <rect x="164" y="80" width="148" height="270" fill="#dcedf2" />
        <path d="M329 69V360" stroke="var(--color-t1)" strokeWidth="13" />
        <rect x="347" y="85" width="145" height="260" fill="#dcedf2" stroke="var(--color-teal)" strokeWidth="9" />
        <path d="M349 89L487 214L349 342" stroke="#97bac3" strokeWidth="2" fill="none" strokeDasharray="6 5" />
        <path d="M362 96h118v238H362z" fill="none" stroke="var(--color-t3)" strokeWidth="3" />
        <path d="M481 200v24" stroke="var(--color-t1)" strokeWidth="7" strokeLinecap="round" />
        <path d="M100 84h35M100 210h218M510 124h35M491 222h55M438 342l26 50M242 295l-46 97" stroke="var(--color-t3)" strokeWidth="1.5" fill="none" />
        <g fontSize="16" fill="var(--color-t1)"><text x="20" y="89">01 Frame</text><text x="12" y="215">02 Mullion</text><text x="548" y="129">03 Sash</text><text x="548" y="227">04 Hardware</text><text x="426" y="418">05 Seals / beads</text><text x="131" y="418">06 Glazing</text></g>
      </svg>
    </Figure>
    <div>
      <h3 className="text-f20 font-bold text-t1">Six parts that work as a set</h3>
      <ol className="mt-[12px] divide-y divide-border-default border-y border-border-default text-f14">
        {windowParts.map(([number, name, text]) => <li key={number} className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-[8px] py-[10px]"><span className="font-mono text-f12 leading-[1.9] text-teal-text">{number}</span><span><span className="font-semibold text-t1">{name}</span><span className="mt-[2px] block leading-golden text-t2">{text}</span></span></li>)}
      </ol>
      <p className="mt-[14px] text-f14 leading-golden text-t2"><span className="font-semibold text-t1">Reinforcement or a subframe?</span> A reinforcement stiffens a frame of another material; a subframe connects the window to its opening. Neither replaces the primary frame set. <Link href="/products/frp-window-reinforcement" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Window reinforcement</Link></p>
    </div>
  </div>;
}

export function WindowBuyerPaths({ mode }: { mode?: WindowSupplyMode }) {
  const paths = windowBuyerPaths.filter((buyer) => !mode || buyer.mode === mode || buyer.id === "specifier");
  return <div className="grid grid-cols-1 items-start gap-[12px] md:grid-cols-2">
    {paths.map((buyer) => <details key={buyer.id} className="group rounded-card border border-border-default bg-white px-[20px] py-[16px] sm:px-[24px]">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-[12px]"><span><span className={`block ${mono}`}>{buyer.mode === "profiles" ? "Profiles" : buyer.id === "specifier" ? "Specification" : "Finished units"}</span><span className="mt-[4px] block text-f16 font-bold text-t1">{buyer.name}</span><span className="mt-[4px] block text-f14 leading-golden text-t2">{buyer.question}</span></span><span aria-hidden="true" className="text-f18 font-bold text-teal-text transition-transform group-open:rotate-45">+</span></summary>
      <p className="mt-[14px] rounded-control bg-bg2 px-[14px] py-[10px] text-f14 leading-golden text-t1">{buyer.steps}</p>
      <dl className="mt-[12px] divide-y divide-border-default border-y border-border-default text-f14"><div className="py-[10px]"><dt className="font-semibold text-t1">You share</dt><dd className="mt-[2px] leading-golden text-t2">{buyer.prepare}</dd></div><div className="py-[10px]"><dt className="font-semibold text-t1">We review with you</dt><dd className="mt-[2px] leading-golden text-t2">{buyer.receive}</dd></div><div className="py-[10px]"><dt className="font-semibold text-t1">Before moving ahead</dt><dd className="mt-[2px] leading-golden text-t2">{buyer.decision}</dd></div></dl>
      <Link href={buildWindowRfqHref({ mode: buyer.id === "specifier" && mode ? mode : buyer.mode, role: buyer.id, stage: buyer.id === "specifier" || buyer.id === "oem" ? "technical" : "quote", source: "window-buyer-path" })} className={`mt-[4px] ${link}`}>{buyer.action} <span aria-hidden className="ml-[4px]">→</span></Link>
    </details>)}
  </div>;
}

/**
 * The purchase steps of one route. Compact: step cards with the confirmation
 * point only (the hub). Full: one row per step, with what you provide, what
 * comes back and the confirmation point in aligned columns.
 */
export function WindowPurchaseFlow({ mode, compact = false }: { mode: WindowSupplyMode; compact?: boolean }) {
  const steps = windowPurchaseSteps[mode];
  if (compact) {
    return <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]"><p className={mono}>Step {index + 1}</p><h3 className="mt-[4px] text-f16 font-bold text-t1">{step.title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{step.gate}</p></li>)}
    </ol>;
  }
  const columns = "md:grid-cols-[minmax(0,0.8fr)_repeat(3,minmax(0,1fr))]";
  const cell = "text-f14 leading-golden text-t2";
  const label = "font-semibold text-t1 md:hidden";
  return <div className="overflow-hidden rounded-card border border-border-default bg-white">
    <div aria-hidden className={`hidden border-b border-border-default bg-bg2 px-[20px] py-[8px] text-f14 font-semibold text-t1 md:grid md:gap-x-[24px] ${columns}`}><span>Step</span><span>You provide</span><span>We review and return</span><span>Confirmation point</span></div>
    <ol className="divide-y divide-border-default">
      {steps.map((step, index) => <li key={step.title} className={`grid grid-cols-1 gap-x-[24px] gap-y-[10px] px-[20px] py-[16px] ${columns}`}>
        <div><p className={mono}>Step {index + 1}</p><h3 className="mt-[2px] text-f16 font-bold text-t1">{step.title}</h3></div>
        <p className={cell}><span className={label}>You provide: </span>{step.input}</p>
        <p className={cell}><span className={label}>We review and return: </span>{step.output}</p>
        <p className="text-f14 leading-golden text-t1"><span className={label}>Confirmation point: </span>{step.gate}</p>
      </li>)}
    </ol>
  </div>;
}

export function WindowScopeTable({ mode }: { mode?: WindowSupplyMode }) {
  const th = "px-[14px] py-[8px] font-semibold text-t1";
  return <div className="relative overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[540px] border-collapse text-left text-f14"><caption className="sr-only">Profile and finished-window quotation scope</caption><thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className={th}>Supply item</th>{mode !== "finished" && <th scope="col" className={th}>Profiles for local fabrication</th>}{mode !== "profiles" && <th scope="col" className={th}>Finished units</th>}</tr></thead><tbody>{windowScopeRows.map((row) => <tr key={row.item} className="border-b border-border-default align-top last:border-b-0"><th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.item}</th>{mode !== "finished" && <td className="px-[14px] py-[10px] leading-golden text-t2">{row.profiles}</td>}{mode !== "profiles" && <td className="px-[14px] py-[10px] leading-golden text-t2">{row.finished}</td>}</tr>)}</tbody></table></div>;
}

export function WindowSampleGuide() {
  const stroke = "var(--color-teal-text)";
  const fill = "var(--color-teal-bg2)";
  const samples = [
    { title: "Short section", purpose: "Check section geometry, surface and color.", shape: <><path d="M35 27h68v28H35z" fill={fill} stroke={stroke} strokeWidth="3" /><path d="M103 27l23-12v28l-23 12M35 27l23-12h68" fill="none" stroke={stroke} strokeWidth="3" /></> },
    { title: "Corner sample", purpose: "Review the joint, glazing pocket and mating parts.", shape: <path d="M37 13h21v36h69v21H37z" fill={fill} stroke={stroke} strokeWidth="3" /> },
    { title: "Sample window", purpose: "Trial assembly and the agreed performance checks.", shape: <><rect x="43" y="9" width="67" height="67" fill={fill} stroke={stroke} strokeWidth="5" /><path d="M50 16l52 26-52 27" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray="5 4" /></> },
    { title: "First batch", purpose: "Confirm production consistency and receiving checks.", shape: <>{[0, 1, 2].map((n) => <rect key={n} x={34 + n * 18} y={14 + n * 9} width="64" height="35" fill="#fff" stroke={stroke} strokeWidth="2" />)}</> },
  ];
  return <div>
    <ol className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 xl:grid-cols-4">{samples.map((sample, index) => <li key={sample.title} className="rounded-card border border-border-default bg-white p-[20px]"><svg viewBox="0 0 160 86" aria-hidden="true" className="h-[88px] w-full">{sample.shape}</svg><p className={`mt-[14px] ${mono}`}>Sample {index + 1}</p><h3 className="mt-[4px] text-f16 font-bold text-t1">{sample.title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{sample.purpose}</p></li>)}</ol>
    <p className="mt-[12px] max-w-[820px] text-f14 leading-golden text-t3">Sample types shown schematically. A short-section approval does not establish finished-window performance. Agree availability, sample fees, test scope and delivery before ordering.</p>
  </div>;
}

export function WindowEvidenceCards() {
  const records = [
    { label: "Material data", title: "Material & section information", text: "Review the identified material system, dimensions and drawing revision. Confirm whether values are typical references or order-specific acceptance criteria.", href: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf", action: "View material reference" },
    { label: "Certificates & reports", title: "Window configuration evidence", text: "Uf is the frame, Ug the glazing and Uw the complete window. The PHI 90-series certificate covers its stated component configuration; it does not certify every size or series.", href: "/resources/evidence", action: "Review document scope" },
    { label: "Your project", title: "Project & installation requirements", text: "Share the destination, project specification and wall interface. Match the offered configuration and installation responsibilities before approving production.", href: "/technology/frp-u-value-calculator", action: "Explore thermal inputs" },
  ];
  return <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">{records.map((record) => <article key={record.title} className="flex flex-col rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]"><p className={mono}>{record.label}</p><h3 className="mt-[6px] text-f18 font-bold text-t1">{record.title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{record.text}</p><Link href={record.href} className={`mt-auto pt-[8px] ${link}`}>{record.action} <span aria-hidden className="ml-[4px]">→</span></Link></article>)}</div>;
}

/** How the order is packed: a schematic beside what to agree for each route. */
export function WindowPackingGuide({ mode, figure }: { mode: WindowSupplyMode; figure: number }) {
  const profiles = mode === "profiles";
  return <div className="grid grid-cols-1 items-center gap-[24px] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-[48px]">
    <Figure number={figure} title={profiles ? "Profile bundle" : "Window crate"} caption="Packing concept. The packing design is agreed for each order.">
      <svg viewBox="0 0 440 230" role="img" aria-label={profiles ? "Schematic bundle of long profiles on timber supports with protective straps" : "Schematic protective crate carrying identified window units"} className="w-full">{profiles ? <><path d="M30 138l300-78 81 42-300 83z" fill="var(--color-teal-bg2)" stroke="var(--color-teal-text)" strokeWidth="2" />{[0, 1, 2, 3].map((n) => <path key={n} d={`M${48 + n * 16} ${146 + n * 8}l300-78`} stroke="var(--color-teal)" strokeWidth="7" />)}<path d="M114 115l73 40M277 73l73 42" stroke="#d9ad73" strokeWidth="14" /><path d="M99 181v18h69v-25M292 132v23h66v-39" stroke="#d9ad73" fill="none" strokeWidth="12" /></> : <><path d="M113 47l85-24 152 39v128l-86 22-151-40z" fill="var(--color-deep)" stroke="#d3ae7c" strokeWidth="6" /><path d="M113 47l151 39 86-24M264 86v126" fill="none" stroke="#d3ae7c" strokeWidth="6" />{[0, 1, 2].map((n) => <path key={n} d={`M${141 + n * 30} ${58 + n * 8}v126`} stroke="var(--color-teal-light)" strokeWidth="7" />)}<rect x="281" y="104" width="46" height="36" fill="#fff" /><text x="288" y="127" fontSize="14" fill="var(--color-t1)">W01</text></>}</svg>
    </Figure>
    <div>
      <h3 className="text-f20 font-bold text-t1">{profiles ? "Plan around length and finish" : "Plan around each opening and crate"}</h3>
      <p className="mt-[8px] text-f16 leading-golden text-t2">{profiles ? "Agree bundle length, supports, surface protection, section labels and handling. Separate profiles by series, code and finish so the receiving fabricator can identify the complete set." : "Agree glass protection, crate size and weight, window-to-crate labels, unloading equipment and delivery phases. Check for damage at receipt and keep the window IDs with the installation schedule."}</p>
      <p className="mt-[12px] text-f14 leading-golden text-t2">{profiles ? "Packing, freight and delivery terms are confirmed in the quotation; catalog lengths are not a freight booking." : "Port delivery, site delivery, unloading and installation are separate scopes. Confirm the local installation team and spare parts before ordering."}</p>
    </div>
  </div>;
}
