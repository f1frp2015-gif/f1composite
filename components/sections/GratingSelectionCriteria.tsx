import Link from "next/link";

export default function GratingSelectionCriteria() {
  return <section id="grating-selection" className="scroll-mt-[100px] border-y border-border-default bg-bg2 py-[44px] md:py-[60px]">
    <div className="site-container">
      <p className="text-f12 font-bold uppercase tracking-[0.12em] text-teal-text">Before choosing a thickness</p>
      <h2 className="mt-[10px] text-f32 font-bold text-t1">Specify the opening, surface and service conditions</h2>
      <div className="mt-[24px] grid gap-[24px] lg:grid-cols-[0.9fr_1.1fr]">
        <figure className="rounded-[10px] border border-border-default bg-white p-[22px]">
          <svg viewBox="0 0 440 230" role="img" aria-label="Schematic distinguishing center-to-center bar pitch from the clear opening between bar faces" className="mx-auto w-full max-w-[440px]">
            <rect x="1" y="1" width="438" height="228" rx="10" fill="#f3f8f7" />
            <g fill="#167c75"><rect x="70" y="88" width="44" height="100" rx="2" /><rect x="230" y="88" width="44" height="100" rx="2" /><rect x="390" y="88" width="30" height="100" rx="2" /></g>
            <g stroke="#526477" strokeWidth="1.5" strokeDasharray="4 4"><path d="M92 50V205M252 50V205" /></g>
            <g stroke="#0b1838" strokeWidth="2" fill="none"><path d="M92 58H252M92 52V64M252 52V64M114 135H230M114 129V141M230 129V141" /></g>
            <g fontFamily="Arial, sans-serif" fontSize="15" fill="#0b1838" textAnchor="middle"><text x="172" y="36">Pitch: center to center</text><text x="172" y="116">Clear opening</text><text x="244" y="218" fontSize="12">Schematic only · not to scale</text></g>
          </svg>
          <figcaption className="mt-[12px] text-f14 leading-relaxed text-t2">A mesh designation or bar-center dimension is not the unobstructed opening. Confirm the top clear opening and direction of travel where footwear, dropped objects or accessibility govern.</figcaption>
        </figure>
        <div className="space-y-[20px]">
          <article><h3 className="text-f18 font-bold text-t1">Match the resin to the environment</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">Identify chemical names, concentrations, exposure type and operating temperature. Discuss polyester or vinyl ester against that service; resin names alone do not establish compatibility.</p><Link className="mt-[8px] inline-block text-f14 font-bold text-teal-text underline underline-offset-4" href="/technology/pultrusion-resin-systems">Read about FRP resin systems →</Link></article>
          <article><h3 className="text-f18 font-bold text-t1">Choose the walking surface</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">For molded mesh, compare concave and gritted finishes. For pultruded bars, confirm the profile finish or bonded grit for the selected series. Match the surface to wet or dry use, footwear and cleaning, and specify the required slip-test method and acceptance criteria.</p></article>
          <article><h3 className="text-f18 font-bold text-t1">Check the full load case</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">State clear span, support width, uniform and concentrated loads, contact area and deflection limit. Cutouts, edge support and bearing-bar direction belong on the panel layout.</p><Link className="mt-[8px] inline-block text-f14 font-bold text-teal-text underline underline-offset-4" href="#grating-engineering">Request the applicable load data →</Link></article>
        </div>
      </div>
    </div>
  </section>;
}
