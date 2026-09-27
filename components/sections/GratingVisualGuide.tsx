import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";

// Drawing colors come from the theme; the yellow stands for the cross-rods.
const INK = "var(--color-t1)";
const BAR = "var(--color-teal-text)";
const SUPPORT = "var(--color-t3)";
const ROD = "#ddb645";

/** Two schematics of what a grating request specifies: the span and the supply scope. */
export default function GratingVisualGuide({ firstFigure, tone = "muted" }: { firstFigure: number; tone?: "white" | "muted" }) {
  return (
    <PageSection id="grating-drawings" title="See what to specify" tone={tone} intro="Use these drawings to describe the support layout and the supply you need. Schematics only, not measured product or installation drawings.">
      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-2">
        <Figure
          number={firstFigure}
          title="Specify the span, not just the panel length"
          caption="For pultruded panels, mark bearing-bar direction on the layout. Cross-rods do not provide equivalent spanning capacity. Include support width, loads, cutouts and deflection requirements."
        >
          <svg viewBox="0 0 520 290" role="img" aria-label="Pultruded bearing bars bridge two supports. Clear span is between support faces, separate from overall panel length." className="w-full">
            <g fill={SUPPORT}><rect x="65" y="55" width="45" height="145" /><rect x="410" y="55" width="45" height="145" /></g>
            <g stroke={BAR} strokeWidth="12">{[80, 108, 136, 164].map((y) => <path key={y} d={`M45 ${y}H475`} />)}</g>
            <g stroke={ROD} strokeWidth="5"><path d="M165 65V180M260 65V180M355 65V180" /></g>
            <g stroke={INK} strokeWidth="2" fill="none"><path d="M110 218H410M110 210V226M410 210V226M180 32H340L330 25M340 32L330 39" /></g>
            <g fill={INK} fontSize="15" textAnchor="middle"><text x="260" y="19">Bearing bars bridge the supports →</text><text x="260" y="243">Clear span: between support faces</text><text x="85" y="275">Support</text><text x="435" y="275">Support</text></g>
          </svg>
        </Figure>
        <Figure
          number={firstFigure + 1}
          title="Choose the supply scope"
          caption="Request whole panels or finished pieces against a drawing. Add panel marks, openings and fixing requirements. Packing, kit contents and delivery arrangements are confirmed with the quotation."
        >
          <svg viewBox="0 0 520 290" role="img" aria-label="Supply options: whole panel, cut pieces with panel marks, and matched fixing kits. Packing is confirmed with the quote." className="w-full">
            <g stroke={BAR} strokeWidth="8">{[65, 90, 115, 140, 165, 190].map((y) => <path key={y} d={`M35 ${y}H175`} />)}{[40, 65, 90, 115, 140, 170].map((x) => <path key={x} d={`M${x} 60V195`} />)}</g>
            <g fill={BAR}><rect x="225" y="60" width="110" height="55" rx="4" /><rect x="225" y="135" width="70" height="60" rx="4" /></g>
            <g fill="white" fontSize="17"><text x="260" y="94">P01</text><text x="242" y="170">P02</text></g>
            <g stroke={SUPPORT} strokeWidth="9" fill="none"><path d="M400 75V100H465V75M414 140V178H455V140M432 99V129" /></g>
            <g fontSize="15" fill={INK} textAnchor="middle"><text x="105" y="230">Whole panels</text><text x="280" y="230">Cut & marked</text><text x="435" y="230">Fixing kits</text><text x="260" y="271">Confirm dimensions, cutting, packing and freight scope</text></g>
          </svg>
        </Figure>
      </div>
    </PageSection>
  );
}
