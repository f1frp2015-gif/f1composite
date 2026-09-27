import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";

const link = "mt-[8px] inline-block text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

/** Opening, surface and service conditions to settle before a thickness is chosen. */
export default function GratingSelectionCriteria({ figure, tone = "white" }: { figure: number; tone?: "white" | "muted" }) {
  return (
    <PageSection id="grating-selection" title="Specify the opening, surface and service conditions" tone={tone}>
      <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[40px]">
        <Figure
          number={figure}
          title="Pitch is not the clear opening"
          caption="A mesh designation or bar-center dimension is not the unobstructed opening. Confirm the top clear opening and direction of travel where footwear, dropped objects or accessibility govern."
        >
          <svg viewBox="0 0 440 230" role="img" aria-label="Schematic distinguishing center-to-center bar pitch from the clear opening between bar faces" className="mx-auto w-full max-w-[440px]">
            <g fill="var(--color-teal-text)"><rect x="70" y="88" width="44" height="100" rx="2" /><rect x="230" y="88" width="44" height="100" rx="2" /><rect x="390" y="88" width="30" height="100" rx="2" /></g>
            <g stroke="var(--color-t3)" strokeWidth="1.5" strokeDasharray="4 4"><path d="M92 50V205M252 50V205" /></g>
            <g stroke="var(--color-t1)" strokeWidth="2" fill="none"><path d="M92 58H252M92 52V64M252 52V64M114 135H230M114 129V141M230 129V141" /></g>
            <g fontSize="15" fill="var(--color-t1)" textAnchor="middle"><text x="172" y="36">Pitch: center to center</text><text x="172" y="116">Clear opening</text></g>
          </svg>
        </Figure>
        <div className="divide-y divide-border-default border-y border-border-default">
          <article className="py-[16px]">
            <h3 className="text-f18 font-bold text-t1">Match the resin to the environment</h3>
            <p className="mt-[6px] text-f14 leading-golden text-t2">Identify chemical names, concentrations, exposure type and operating temperature. Discuss polyester or vinyl ester against that service; resin names alone do not establish compatibility.</p>
            <Link className={link} href="/technology/pultrusion-resin-systems">Read about FRP resin systems</Link>
          </article>
          <article className="py-[16px]">
            <h3 className="text-f18 font-bold text-t1">Choose the walking surface</h3>
            <p className="mt-[6px] text-f14 leading-golden text-t2">For molded mesh, compare concave and gritted finishes. For pultruded bars, confirm the profile finish or bonded grit for the selected series. Match the surface to wet or dry use, footwear and cleaning, and specify the required slip-test method and acceptance criteria.</p>
          </article>
          <article className="py-[16px]">
            <h3 className="text-f18 font-bold text-t1">Check the full load case</h3>
            <p className="mt-[6px] text-f14 leading-golden text-t2">State clear span, support width, uniform and concentrated loads, contact area and deflection limit. Cutouts, edge support and bearing-bar direction belong on the panel layout.</p>
            <Link className={link} href="#grating-engineering">Request the applicable load data</Link>
          </article>
        </div>
      </div>
    </PageSection>
  );
}
