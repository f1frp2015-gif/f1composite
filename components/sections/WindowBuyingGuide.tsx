import Image from "next/image";
import Link from "next/link";
import { windowBuyerPaths, windowPurchaseSteps, windowScopeRows, type WindowSupplyMode } from "@/content/data/windowBuying";
import { windowProcurement, windowSurfaceFinish } from "@/content/data/windowProcurement";
import { buildWindowRfqHref } from "@/lib/windowInquiry";

export const windowWrap = "site-container lg:px-9";

export function WindowSupplyRoutes() {
  return <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
    <Link href="/products/window-door-profiles" className="group overflow-hidden rounded-2xl border border-teal-border bg-teal-bg p-6 md:p-8">
      <div className="grid items-center gap-5 sm:grid-cols-[1.1fr_1fr]"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-text">For local fabrication</p><h2 className="mt-3 text-3xl font-bold leading-tight text-t1">Fiberglass system profiles</h2><p className="mt-4 text-sm leading-relaxed text-t2">Source compatible frame, sash and mullion sections. Define the accessories, samples and machining your production needs.</p><p className="mt-4 text-sm font-semibold leading-relaxed text-teal-text">{windowSurfaceFinish.title}</p><p className="mt-6 font-bold text-teal-text">Explore profile systems <span aria-hidden="true">→</span></p></div><div className="relative aspect-square rounded-xl bg-white"><Image src={windowProcurement.profiles.image} alt={windowProcurement.profiles.imageAlt} fill sizes="(max-width: 640px) 85vw, 28vw" className="object-contain p-4" /></div></div>
      <p className="mt-5 border-t border-teal-border pt-4 text-xs text-t2">Manufacturers · OEM system teams · Profile distributors</p>
    </Link>
    <Link href="/products/fiberglass-windows-doors" className="group flex flex-col rounded-2xl border border-border-default bg-white p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-t3">For project &amp; dealer supply</p><h2 className="mt-3 text-3xl font-bold leading-tight text-t1">Finished windows &amp; doors</h2><p className="mt-4 text-sm leading-relaxed text-t2">Specify complete units by opening schedule, glass, hardware and project requirements. Confirm delivery and local installation responsibilities.</p><p className="my-6 font-bold text-teal-text">Explore finished units <span aria-hidden="true">→</span></p><div className="relative mb-5 aspect-[2/1] rounded-xl bg-white"><Image src={windowProcurement.finished.image} alt={windowProcurement.finished.imageAlt} fill sizes="(max-width: 1024px) 85vw, 32vw" className="object-contain p-3" /></div><p className="mt-auto border-t border-border-default pt-4 text-xs text-t2">Importers &amp; dealers · Contractors · Developers</p>
    </Link>
  </div>;
}

export function WindowComponentMap() {
  return <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
    <figure className="rounded-2xl border border-border-default bg-bg2 p-5">
      <svg viewBox="0 0 660 440" role="img" aria-labelledby="window-map-title window-map-desc" className="w-full">
        <title id="window-map-title">Window system component map</title><desc id="window-map-desc">Schematic front view: outer frame surrounds a fixed glazed light and a moving sash divided by a mullion. Seals and hardware complete the assembly.</desc>
        <rect x="145" y="60" width="370" height="310" rx="4" fill="#fff" stroke="#203956" strokeWidth="15" />
        <rect x="164" y="80" width="148" height="270" fill="#dcedf2" />
        <path d="M329 69V360" stroke="#203956" strokeWidth="13" />
        <rect x="347" y="85" width="145" height="260" fill="#dcedf2" stroke="#0a9b91" strokeWidth="9" />
        <path d="M349 89L487 214L349 342" stroke="#97bac3" strokeWidth="2" fill="none" strokeDasharray="6 5" />
        <path d="M362 96h118v238H362z" fill="none" stroke="#647b89" strokeWidth="3" />
        <path d="M481 200v24" stroke="#203956" strokeWidth="7" strokeLinecap="round" />
        <path d="M100 84h35M100 210h218M510 124h35M491 222h55M438 342l26 50M242 295l-46 97" stroke="#647b89" strokeWidth="1.5" fill="none" />
        <g fontFamily="system-ui, sans-serif" fontSize="16" fill="#203956"><text x="20" y="89">01 Frame</text><text x="12" y="215">02 Mullion</text><text x="548" y="129">03 Sash</text><text x="548" y="227">04 Hardware</text><text x="426" y="418">05 Seals / beads</text><text x="131" y="418">06 Glazing</text></g>
      </svg>
      <figcaption className="text-xs text-t3">Component map · schematic, not a fabrication drawing. The selected system defines the actual interfaces.</figcaption>
    </figure>
    <div><h3 className="text-2xl font-bold text-t1">Specify a compatible set</h3><p className="mt-4 text-t2">Frame, sash and mullion sections work with the glazing beads, gaskets, connectors and operating hardware. Confirm the mating interfaces before choosing individual lineals.</p><dl className="mt-6 space-y-4 text-sm"><div><dt className="font-bold text-t1">Profile supply</dt><dd className="mt-1 text-t2">Identify the sections, cut lengths and any agreed accessories. Define who cuts, joins, glazes and assembles.</dd></div><div><dt className="font-bold text-t1">Finished-unit supply</dt><dd className="mt-1 text-t2">Agree the complete configuration, window dimensions, factory work and installation interface.</dd></div><div><dt className="font-bold text-t1">Looking for reinforcement or a subframe?</dt><dd className="mt-1 text-t2">A reinforcement supports another frame material. A subframe connects the window to its opening. Neither is interchangeable with the primary frame set.</dd></div></dl></div>
  </div>;
}

export function WindowBuyerPaths({ mode }: { mode?: WindowSupplyMode }) {
  const paths = windowBuyerPaths.filter((buyer) => !mode || buyer.mode === mode || buyer.id === "specifier");
  return <div className="grid items-start gap-4 md:grid-cols-2">
    {paths.map((buyer) => <details key={buyer.id} className="group rounded-xl border border-border-default bg-white p-5">
      <summary className="cursor-pointer text-base font-bold text-t1"><span className="mr-2 text-teal-text">{buyer.mode === "profiles" ? "01" : "02"}</span>{buyer.name}<span className="mt-2 block pr-4 text-sm font-normal leading-relaxed text-t2">{buyer.question}</span></summary>
      <p className="mt-5 rounded-lg bg-bg2 p-3 text-xs font-semibold leading-loose text-teal-text">{buyer.steps}</p>
      <dl className="mt-4 space-y-4 text-sm"><div><dt className="font-bold text-t1">You share</dt><dd className="mt-1 text-t2">{buyer.prepare}</dd></div><div><dt className="font-bold text-t1">We review with you</dt><dd className="mt-1 text-t2">{buyer.receive}</dd></div><div><dt className="font-bold text-t1">Before moving ahead</dt><dd className="mt-1 text-t2">{buyer.decision}</dd></div></dl>
      <Link href={buildWindowRfqHref({ mode: buyer.id === "specifier" && mode ? mode : buyer.mode, role: buyer.id, stage: buyer.id === "specifier" || buyer.id === "oem" ? "technical" : "quote", source: "window-buyer-path" })} className="mt-4 inline-block py-3 text-sm font-bold text-teal-text">{buyer.action} →</Link>
    </details>)}
  </div>;
}

export function WindowPurchaseFlow({ mode, compact = false }: { mode: WindowSupplyMode; compact?: boolean }) {
  return <ol className={`grid gap-4 ${compact ? "md:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-2"}`}>
    {windowPurchaseSteps[mode].map((step, index) => <li key={step.title} className="rounded-xl border border-border-default bg-white p-5"><div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-bg2 text-xs font-bold text-teal-text">{String(index + 1).padStart(2, "0")}</span><h3 className="pt-1 text-base font-bold text-t1">{step.title}</h3></div>{compact ? <p className="mt-3 text-sm text-t2">{step.gate}</p> : <dl className="mt-4 space-y-3 text-sm"><div><dt className="font-semibold text-t1">You provide</dt><dd className="text-t2">{step.input}</dd></div><div><dt className="font-semibold text-t1">Review &amp; return</dt><dd className="text-t2">{step.output}</dd></div><div className="border-t border-border-default pt-3"><dt className="font-semibold text-teal-text">Confirmation point</dt><dd className="text-t2">{step.gate}</dd></div></dl>}</li>)}
  </ol>;
}

export function WindowScopeTable({ mode }: { mode?: WindowSupplyMode }) {
  return <div className="overflow-x-auto rounded-xl border border-border-default"><table className="w-full min-w-[540px] text-left text-sm"><caption className="sr-only">Profile and finished-window quotation scope</caption><thead className="bg-deep text-white"><tr><th className="p-4">Supply item</th>{mode !== "finished" && <th className="p-4">Profiles for local fabrication</th>}{mode !== "profiles" && <th className="p-4">Finished units</th>}</tr></thead><tbody className="divide-y divide-border-default">{windowScopeRows.map((row) => <tr key={row.item} className="bg-white even:bg-bg2"><th scope="row" className="p-4 align-top font-semibold text-t1">{row.item}</th>{mode !== "finished" && <td className="p-4 align-top text-t2">{row.profiles}</td>}{mode !== "profiles" && <td className="p-4 align-top text-t2">{row.finished}</td>}</tr>)}</tbody></table></div>;
}

export function WindowSampleGuide() {
  const samples = [
    { title: "Short section", purpose: "Check section geometry, surface and color.", shape: <><path d="M35 27h68v28H35z" fill="#d6e8e5" stroke="#0a7a74" strokeWidth="3" /><path d="M103 27l23-12v28l-23 12M35 27l23-12h68" fill="none" stroke="#0a7a74" strokeWidth="3" /></> },
    { title: "Corner sample", purpose: "Review the joint, glazing pocket and mating parts.", shape: <path d="M37 13h21v36h69v21H37z" fill="#d6e8e5" stroke="#0a7a74" strokeWidth="3" /> },
    { title: "Sample window", purpose: "Trial assembly and the agreed performance checks.", shape: <><rect x="43" y="9" width="67" height="67" fill="#dcedf2" stroke="#0a7a74" strokeWidth="5" /><path d="M50 16l52 26-52 27" fill="none" stroke="#0a7a74" strokeWidth="2" /></> },
    { title: "First batch", purpose: "Confirm production consistency and receiving checks.", shape: <>{[0, 1, 2].map((n) => <rect key={n} x={34 + n * 18} y={14 + n * 9} width="64" height="35" fill="#e8f1f0" stroke="#0a7a74" strokeWidth="2" />)}</> },
  ];
  return <div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{samples.map((sample, index) => <div key={sample.title} className="rounded-xl border border-border-default bg-white p-5"><svg viewBox="0 0 160 86" aria-hidden="true" className="h-24 w-full">{sample.shape}</svg><p className="mt-4 text-xs font-bold text-teal-text">SAMPLE {index + 1}</p><h3 className="mt-1 font-bold text-t1">{sample.title}</h3><p className="mt-2 text-sm text-t2">{sample.purpose}</p></div>)}</div><p className="mt-4 text-xs text-t3">Sample types shown schematically. A short-section approval does not establish finished-window performance. Agree availability, sample fees, test scope and delivery before ordering.</p></div>;
}

export function WindowEvidenceCards() {
  const records = [
    { title: "Material & section information", text: "Review the identified material system, dimensions and drawing revision. Confirm whether values are typical references or order-specific acceptance criteria.", href: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf", action: "View material reference" },
    { title: "Window configuration evidence", text: "Uf is the frame, Ug the glazing and Uw the complete window. The PHI 90-series certificate covers its stated component configuration; it does not certify every size or series.", href: "/resources/evidence", action: "Review document scope" },
    { title: "Project & installation requirements", text: "Share the destination, project specification and wall interface. Match the offered configuration and installation responsibilities before approving production.", href: "/technology/frp-u-value-calculator", action: "Explore thermal inputs" },
  ];
  return <div className="grid gap-5 md:grid-cols-3">{records.map((record, index) => <article key={record.title} className="rounded-xl border border-border-default bg-white p-6"><p className="text-xs font-bold uppercase tracking-wide text-teal-text">Evidence {index + 1}</p><h3 className="mt-3 text-xl font-bold text-t1">{record.title}</h3><p className="mt-3 text-sm leading-relaxed text-t2">{record.text}</p><Link href={record.href} className="mt-5 inline-block py-2 text-sm font-semibold text-teal-text">{record.action} →</Link></article>)}</div>;
}

export function WindowPackingGuide({ mode }: { mode: WindowSupplyMode }) {
  const profiles = mode === "profiles";
  return <div className="grid items-center gap-7 rounded-2xl bg-deep p-6 text-white md:grid-cols-[0.8fr_1.2fr] md:p-8"><figure><svg viewBox="0 0 440 230" role="img" aria-label={profiles ? "Schematic bundled long profiles with supports and protective straps" : "Schematic protective crate carrying identified window units"} className="w-full">{profiles ? <><path d="M30 138l300-78 81 42-300 83z" fill="#d8e9e6" stroke="#fff" strokeWidth="2" />{[0,1,2,3].map((n) => <path key={n} d={`M${48+n*16} ${146+n*8}l300-78`} stroke="#4ba59c" strokeWidth="7" />)}<path d="M114 115l73 40M277 73l73 42" stroke="#d9ad73" strokeWidth="14" /><path d="M99 181v18h69v-25M292 132v23h66v-39" stroke="#d9ad73" fill="none" strokeWidth="12" /></> : <><path d="M113 47l85-24 152 39v128l-86 22-151-40z" fill="#294761" stroke="#d3ae7c" strokeWidth="6" /><path d="M113 47l151 39 86-24M264 86v126" fill="none" stroke="#d3ae7c" strokeWidth="6" />{[0,1,2].map((n) => <path key={n} d={`M${141+n*30} ${58+n*8}v126`} stroke="#91bebf" strokeWidth="7" />)}<rect x="281" y="104" width="46" height="36" fill="#fff" /><text x="288" y="127" fontSize="14" fontFamily="system-ui" fill="#152d48">W01</text></>}</svg><figcaption className="text-center text-xs text-white/65">Packing concept · confirm the order-specific design</figcaption></figure><div><p className="text-xs font-semibold uppercase tracking-widest text-[#9bdbd4]">Packing &amp; delivery</p><h3 className="mt-3 text-2xl font-bold">{profiles ? "Plan around length and finish" : "Plan around each opening and crate"}</h3><p className="mt-4 text-sm leading-relaxed text-white/80">{profiles ? "Agree bundle length, supports, surface protection, section labels and handling requirements. Separate profiles by series, code and finish so the receiving fabricator can identify the complete set." : "Agree glass protection, crate dimensions and weight, opening-to-crate labels, unloading equipment and delivery phases. Check for damage at receipt and keep the window IDs with the installation schedule."}</p><p className="mt-4 text-sm text-white/80">{profiles ? "Confirm packing, freight and delivery terms in the quotation; catalog lengths are not a freight booking." : "Port delivery, site delivery, unloading and installation are separate scopes. Confirm the local installation team and spare parts before ordering."}</p></div></div>;
}

export function WindowRfqClose({ mode }: { mode: WindowSupplyMode }) {
  return <div className="flex flex-col gap-6 rounded-2xl border border-teal-border bg-teal-bg p-7 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-wide text-teal-text">Your next step</p><h2 className="mt-2 text-2xl font-bold text-t1">{mode === "profiles" ? "Bring us your profile set or drawing" : "Bring us your window schedule"}</h2><p className="mt-3 text-sm text-t2">Not ready for a formal quote? Choose sample evaluation, budget pricing or technical selection. Share what you know; we will identify what needs clarification.</p></div><Link href={buildWindowRfqHref({ mode, source: "window-next-step" })} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-teal-text px-6 py-3 text-sm font-bold text-white">{mode === "profiles" ? "Request a profile quote" : "Request a finished-unit quote"} →</Link></div>;
}
