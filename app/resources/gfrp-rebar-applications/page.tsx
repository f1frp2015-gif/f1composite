import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildRebarRfqHref } from "@/lib/rebarInquiry";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// Application guide for GFRP rebar: why each segment specifies a nonmetallic bar, the
// approval route in each market, typical sizes and public reference projects. Reference
// projects are attributed to the producers that supplied them; none is an F1 project.
// Sources: docs/research/frp-rebar-market-2026-10.md (§2b: the Pultron/Mateenbar application
// taxonomy that the buildings, flood and walls sections answer).

const pagePath = "/resources/gfrp-rebar-applications";
const PAGE_UPDATED = "2026-10-26";
const pageTitle = "GFRP Rebar Applications: Marine, Slabs, Bridges, Buildings";
const pageDescription =
  "Where GFRP rebar is specified: seawalls, precast, slabs, bridges, buildings, flood channels, walls, MRI and rail, soft-eyes and water plants, by market.";

export const metadata: Metadata = buildPageMetadata({ title: pageTitle, description: pageDescription, path: pagePath });

interface Application {
  id: string;
  label: string;
  title: string;
  why: string;
  detailing: string[];
  sizes: string;
  route: string;
  references: Array<{ text: string; href: string }>;
  send: string;
}

const applications: Application[] = [
  {
    id: "marine",
    label: "Marine & seawalls",
    title: "Seawalls, piles, ports, breakwaters and wharves",
    why: "Chloride-driven corrosion of steel is the failure mode in marine concrete: the rust expands, cracks the cover and the repair cycle starts within 15 to 25 years. A glass-fiber bar does not corrode electrochemically, so the exposure that drives seawall design stops being a reinforcement problem and becomes a concrete and detailing problem.",
    detailing: [
      "Cover is set by bond splitting and fire, not by corrosion; the designer may reduce it where the code allows, which is a design option rather than an automatic allowance.",
      "Cages are a quarter of the weight of steel, which matters for auger-cast and secant piles handled over water; some owners needed a variance before contractors could push GFRP cages into fresh concrete.",
      "Transverse thermal expansion of a GFRP bar is three to eight times its longitudinal value, so cover and spacing checks for splitting belong in the design record.",
      "Port pavements, boat ramps and precast breakwater units add joint dowels to the order; GFRP dowels to ASTM D8444 were specified with the bars at the Port of Rotterdam terminal upgrade.",
    ],
    sizes: "Ø10–Ø25 mm (No. 3–No. 8) straight bars, factory-formed U-bars and cage stirrups; smooth dowels for port slabs.",
    route: "Middle East owners such as Saudi Aramco now mandate GFRP in corrosion-risk concrete and buy by the million metres through pre-qualified suppliers. Florida DOT runs its own producer list and shipment testing. Private owners in the United States, Australia and Asia accept a third-party ASTM D7957 or ISO 10406-1 test package reviewed by the engineer of record.",
    references: [
      { text: "Jizan Flood Mitigation Channel, Saudi Arabia: a 21–23 km lined channel described as the largest GFRP project built, split between Mateenbar and Dextra", href: "https://dextragroup.com/jizan-flood-mitigation-channel" },
      { text: "Flagler Beach seawall, Florida DOT: 5,000 ft of GFRP-reinforced wall and piles, with cage installation reported up to 52% faster than steel", href: "https://acmanet.org/florida-community-protected-from-future-storms/" },
    ],
    send: "Exposure class and design life, the governing specification, bar schedule for piles, caps and panels, and whether cages are assembled on site or supplied formed.",
  },
  {
    id: "precast",
    label: "Precast",
    title: "Precast panels, tunnel segments and architectural concrete",
    why: "A precaster controls placement, cover and curing, so the arguments for GFRP are production arguments: lighter cages and mesh handled by one person, no rust staining on exposed architectural faces, reduced cover where the design allows and no spalling risk on thin elements. Repeat schedules suit factory-cut lengths and welded-pattern mesh.",
    detailing: [
      "ACI CODE-440.11-22 covers precast non-prestressed members; prestressing with GFRP is outside its scope and outside EN 1992-1-1 Annex R.",
      "Mesh is outside ASTM D7957, so sheet properties and joint strength need their own test scope agreed before the first lot.",
      "Thin elements benefit most, but deflection and crack width govern at a quarter of steel's stiffness; the design is redone, not converted bar for bar.",
    ],
    sizes: "Ø6–Ø16 mm bars cut to repeat lengths; mesh with Ø6–Ø10 rods at 100–200 mm centres; factory stirrups for segments.",
    route: "Precasters qualify one supplier and grade against their own quality system, usually starting with a sample lot and full test scope. In Europe an ETA under EAD 260023-00-0301 is the CE route; in the United States an ICC-ES report under AC454 supports building-code acceptance. Neither is held by an importer, so the project engineer reviews third-party test reports instead.",
    references: [
      { text: "Fontanamare–Gonnesa bridge, Sardinia: rebuilt with precast elements reinforced with Sireg Glasspree GFRP bars", href: "https://compositesworld.com/news/sireg-geotech-fiberglass-rebar-supports-italian-bridge-reconstruction" },
      { text: "COMPOSKE EU project: GFRP-reinforced tunnel segments designed for closed-loop recovery", href: "https://cordis.europa.eu/article/id/211137-newgeneration-gfrp-for-more-resistant-tunnels" },
    ],
    send: "Element drawings, repeat quantities per month, mesh pattern and sheet size, surface finish requirements and the test scope your quality plan needs.",
  },
  {
    id: "flatwork",
    label: "Slabs, pavements & pools",
    title: "Slabs on grade, industrial floors, pavements and pool shells",
    why: "This is the largest-volume use of GFRP rebar: house slabs, driveways, sidewalks and patios, pool shells, and the warehouse floors, truck aprons, loading docks and agricultural slabs of light industry. Flatwork is reinforced for shrinkage and temperature rather than flexure, so the low modulus matters less, while the weight saving speeds placement and the absence of rust staining and corrosion makes the slab tolerant of thin cover and wet service. Pool builders adopt it for chlorinated water and clean finishes.",
    detailing: [
      "In the United States one producer's No. 3 bar replaces No. 4 steel in prescriptive residential slabs and walls under an ICC-ES evaluation report; the substitution belongs to that listed product, and for any other bar the engineer confirms it for the slab in question.",
      "Light bars float: tie them to chairs so the mat does not lift during the pour.",
      "Pavement dowels are a separate product tested to ASTM D8444; GFRP dowels need a 20 to 30% larger diameter than steel for the same joint stiffness.",
    ],
    sizes: "Ø10–Ø16 mm (No. 3–No. 5) in 6 m, 12 m or 20 ft lengths; Ø6–Ø10 mm coils or mesh for light slabs.",
    route: "Distributors and contractors buy a stable size mix without a design approval; in the United States the flatwork grade is now a hardware-store item in 4 ft, 10 ft and 20 ft lengths, and residential and commercial permits accept bars with an ICC-ES report under AC521 or AC454, or an engineer's letter based on ASTM D7957 test data. Outside North America the engineer of record specifies the standard and the test package, and dealers stock 6 m or 12 m bars. The residential guide covers driveways, footings, pools and ICF walls element by element.",
    references: [
      { text: "King Salman Energy Park (SPARK), Saudi Arabia: about 700,000 GFRP bars in slabs and civil works supplied by Dextra", href: "https://dextragroup.com/king-salman-energy-park-spark" },
      { text: "US pool construction: builders report lighter cages and no rust staining with GFRP shells", href: "https://aquamagazine.com/builder/article/15660001/rethinking-rebar-for-pools" },
    ],
    send: "Slab area and thickness, bar size and spacing or the steel schedule to be converted, cut lengths, delivery rhythm and whether the order is for a project or for stock.",
  },
  {
    id: "bridges",
    label: "Bridges",
    title: "Bridge decks, approach slabs and barrier walls",
    why: "De-icing salts and traffic disruption make a corrosion-free deck worth a higher first cost. A Minnesota DOT scenario put a GFRP deck at $42 per square foot against $36 for epoxy-coated steel, and the 100-year present value at $67 against $87 because the GFRP deck carried no repair cycle. Decks, barriers and approach slabs are the mature structural use of GFRP.",
    detailing: [
      "Design follows AASHTO GFRP-2 (2018) in the United States and CSA S6 Section 16 in Canada; strength reduction and sustained-stress limits differ from steel.",
      "Owners specify high-modulus grades: CSA S807 Grade III (60 GPa) in Ontario, 7,500 to 8,700 ksi minimum modulus at Texas and Ohio DOT.",
      "Every shipment to a Florida DOT project is sampled and tested at the contractor's expense: six straight and five bent bars per size.",
    ],
    sizes: "Ø16–Ø32 mm (No. 5–No. 10) straight bars with factory-formed barrier stirrups and hooks.",
    route: "In the United States and Canada this work runs through state producer lists, Buy America rules effective for GFRP since October 2025, and CSA S807 Grade III requirements. An imported bar is not a candidate for that work. Outside North America, bridge owners specify project by project with a third-party test package and lot testing.",
    references: [
      { text: "Harkers Island Bridge, North Carolina: a 3,200 ft bridge with about 1.5 million linear feet of GFRP bars supplied by Mateenbar", href: "https://acmanet.org/fully-frp-reinforced-bridge-paves-way-for-future-projects" },
      { text: "Minnesota DOT TH-169: side-by-side GFRP and epoxy-coated steel decks monitored for four years", href: "https://rosap.ntl.bts.gov/view/dot/67149" },
    ],
    send: "Owner specification and design code, modulus grade required, bar schedule with bends, lot testing requirements and the destination country.",
  },
  {
    id: "mri",
    label: "MRI, rail & electrical",
    title: "MRI suites, electrified rail, data centers and electrical facilities",
    why: "A GFRP bar is nonmagnetic and electrically insulating. Imaging rooms, substations and transformer pads, track slabs with signalling currents, data-center floors, airport compass calibration pads, aluminium smelter potrooms and laboratories with sensitive instruments need a reinforcement mat that does not distort fields, carry stray current or form eddy-current loops. Concrete near MRI suites has used GFRP since the 1980s.",
    detailing: [
      "The whole mat must stay nonmetallic: chairs, spacers, ties and couplers included.",
      "Light-rail detection loops and track circuits are the growth case: a steel mat under the slab shorts the loop, a GFRP mat does not, which is why rail owners in Australia and Europe have re-specified slabs around detection loops.",
      "The equipment supplier's exclusion zone, not the structural engineer, usually defines where the nonmetallic reinforcement starts and ends.",
      "Track-slab research shows GFRP transverse bars preserving track-circuit current where steel would short it.",
    ],
    sizes: "Ø8–Ø20 mm bars and mesh with plastic or composite accessories.",
    route: "Specified by the equipment supplier and the structural engineer together; no approval regime beyond the project's own test package in most markets. Schöck Combar holds a German DIBt approval used for rail and research buildings in Europe.",
    references: [
      { text: "ACI MNL-6 cites GFRP reinforcement at the Mayo Clinic Gonda Building and NIH Bethesda as standard practice near MRI equipment", href: "https://www.concrete.org/Portals/0/Files/PDF/Previews/MNL-6(23)_preview.pdf" },
      { text: "Schöck Combar reference projects: Munich S-Bahn and tram slabs, Max Planck Institute Stuttgart", href: "https://www.schoeck.com/en/combar" },
    ],
    send: "The exclusion zone drawing, bar sizes and spacing, accessory requirements and the electrical or magnetic acceptance criteria the equipment supplier has issued.",
  },
  {
    id: "soft-eye",
    label: "Soft-eyes & mining",
    title: "TBM soft-eyes, diaphragm walls and temporary works",
    why: "A tunnel boring machine cannot cut through a steel-reinforced wall, so the breakthrough zone of a shaft or diaphragm wall is reinforced with GFRP that the cutterhead grinds away. The same cuttability serves roadheader faces in mining and temporary works that will be excavated later.",
    detailing: [
      "Soft-eyes are engineered packages: the designer sizes the GFRP zone for construction loads and the breakthrough sequence, and specifies the splice to the surrounding steel cage.",
      "A polyester matrix is acceptable only for temporary use; permanent works need vinyl ester and alkali-resistance data.",
      "Lower stiffness has led designers to thicken walls at the soft-eye; the Channel Tunnel Rail Link grew its wall from 1.2 to 1.5 m for this reason.",
    ],
    sizes: "Ø20–Ø32 mm cages with factory-formed U-bars and composite or steel-to-FRP couplers.",
    route: "Led by the contractor's designer and bought as a package; Dextra reports more than 500 soft-eyes supplied since the Bangkok MRT in 1996. An importer competes on the bar supply within the designer's package, with test data for every size and the coupler system agreed.",
    references: [
      { text: "Dextra ASTEC soft-eyes: more than 500 supplied since 1996, including Doha Metro and Singapore MRT", href: "https://dextragroup.com/ground-engineering/tunneling/astec-soft-eyes" },
      { text: "Hampton Roads Bridge-Tunnel, Virginia: GFRP soft-eye reinforcement supplied by Pultrall", href: "https://fiberglassrebar.com/project/hampton-roads-bridge/" },
    ],
    send: "The soft-eye zone drawing, bar sizes and cage geometry, coupler or splice detail, whether the works are temporary or permanent, and the construction program.",
  },
  {
    id: "water",
    label: "Water & chemical plants",
    title: "Water, wastewater and chemical plant concrete",
    why: "Chlorination tanks, channels, sumps and slabs in wet or chemically aggressive service would otherwise need coated or stainless steel. Life-cycle studies of chlorination tanks put GFRP's net present cost about 40% below black steel over 100 years with a breakeven around 35 years.",
    detailing: [
      "Chemical, concentration and temperature determine the resin and the test exposure; ask for alkali and, where relevant, acid exposure data for the offered grade.",
      "Crack-width limits for watertightness often govern the bar area at GFRP's modulus.",
      "Nonmetallic reinforcement also removes stray-current corrosion near cathodic-protection systems and electrical equipment.",
    ],
    sizes: "Ø10–Ø25 mm bars and mesh for walls, slabs and channels.",
    route: "Industrial owners and EPC contractors accept supplier qualification data with a project-specific exposure review; no listing regime applies in most markets.",
    references: [
      { text: "Thetford Mines water treatment plant, Québec: chlorination tank reinforced with about 2,500 GFRP bars, watertight after testing", href: "https://ascelibrary.com/doi/10.1061/%28ASCE%29CC.1943-5614.0000429" },
      { text: "Qatar University life-cycle study of a GFRP-reinforced chlorination tank", href: "https://qspace.qu.edu.qa/handle/10576/39115" },
    ],
    send: "Process chemistry and temperature, exposure classes, crack-width or watertightness criteria, element drawings and the bar schedule.",
  },
  {
    id: "buildings",
    label: "Buildings & parking",
    title: "Parking decks, balconies, foundations, wall panels and columns",
    why: "Building work is where the leading producers have grown fastest since ACI CODE-440.11-22 became a code that building officials can adopt by reference. Parking decks under de-icing salt, balconies and façade panels exposed to weather, foundations in chloride or sulfate soils, and refrigerated or energy-efficient envelopes where a steel bar bridges the insulation all have a corrosion or heat-flow reason to leave steel out.",
    detailing: [
      "ACI 440.11 neglects the contribution of GFRP bars in compression, so columns are designed on the concrete section with GFRP as confinement and crack control, not as compression reinforcement.",
      "Elevated slabs and beams are governed by deflection and crack width at a quarter of steel's stiffness; a shallow steel design is not converted bar for bar, the depth or the bar area changes.",
      "Members that need a fire-resistance rating or belong to the seismic-force-resisting system in higher seismic design categories are outside or limited by the code's scope; the engineer confirms which elements qualify before the schedule is drawn.",
    ],
    sizes: "Ø10–Ø20 mm (No. 3–No. 6) bars, factory stirrups and mesh; Ø25 mm in foundations and transfer elements.",
    route: "In the United States the engineer designs to ACI 440.11 and the building official reviews the design with the bar's ASTM D7957 test package or an ICC-ES report; in Canada CSA S806 applies and in Europe EN 1992-1-1:2023 Annex R with national acceptance. An imported bar competes on the completeness of its test package and the clarity of its design values, since no listing is available to it.",
    references: [
      { text: "Mateenbar60 featured projects include a Marriott hotel in Bellevue, Washington and the Mātai Medical Research Institute slab in New Zealand", href: "https://mateenbar.com/en-us/mateenbar-60/" },
      { text: "ACI CODE-440.11-22 preview: scope, materials and design provisions for GFRP-reinforced buildings", href: "https://www.concrete.org/Portals/0/Files/PDF/Previews/440.11-22_preview.pdf" },
    ],
    send: "The adopted building code and GFRP code edition, the elements proposed for GFRP with their fire and seismic classification, drawings or a bar schedule, and the documents the building official will ask for.",
  },
  {
    id: "flood",
    label: "Flood channels & culverts",
    title: "Flood channels, culverts, headwalls and stormwater tunnels",
    why: "Channel linings, box culverts, headwalls and drainage tunnels sit in wet-dry cycling, saline groundwater and sediment abrasion, and their reinforcement exists for crack control over a large thin area rather than for strength. That makes them the largest single GFRP orders on record: the Jizan flood mitigation channel in Saudi Arabia, about 23 km long and up to 80 m wide, was lined with GFRP from two producers, and municipal stormwater tunnels in Dubai and Sydney followed.",
    detailing: [
      "Lining slabs are sized for shrinkage, temperature and uplift; mesh or small bars at close spacing suit them, and the bar's low weight matters on long sloped linings placed by hand.",
      "Abrasion and cover: sediment-laden flow wears the lining, so cover is set by the concrete, not by corrosion, and the bar does not need the thicker cover a steel design would carry.",
      "Precast box culverts and pipe follow the precast provisions of ACI 440.11; joints in channel floors use GFRP dowels where load transfer is needed.",
    ],
    sizes: "Ø10–Ø16 mm (No. 3–No. 5) bars and mesh for linings; Ø16–Ø25 mm for culvert walls, headwalls and tunnel linings.",
    route: "Middle East owners such as Saudi Aramco and municipal authorities buy through pre-qualified suppliers against a project specification; Australian water utilities and Asian flood-control agencies specify project by project; in the United States the ASFPM community has started to specify GFRP in flood-mitigation concrete. An imported bar with a full test package and lot testing is a normal candidate outside North American public work.",
    references: [
      { text: "Pultron: Mateenbar as majority supplier to the Jizan flood mitigation channel, described as the largest GFRP rebar project built", href: "https://pultron.com/insights/pultron-composite-news/worlds-largest-frp-reinforcement-2/" },
      { text: "Mateenbar structural projects: Dubai deep stormwater tunnel, Ras Al-Khair arch culvert and the Sydney Northside storage tunnel", href: "https://mateenbar.com/en-us/structural-projects/" },
    ],
    send: "Channel or culvert drawings, exposure and abrasion conditions, the specification and lot-testing regime the owner applies, the lining area and the delivery program by section.",
  },
  {
    id: "walls",
    label: "Walls & masonry",
    title: "Basement, retaining and ICF walls, barrier posts and grouted masonry",
    why: "Vertical residential and light-commercial work is the second retail-sized segment after flatwork: basement and insulated-concrete-form walls, retaining walls, culvert headwalls, fence and barrier posts, and grouted masonry cells in stairwells, elevator shafts and exterior walls. The bar is chosen for the same reasons as in slabs, no rust staining and one-person handling, and the vertical height is what limits it.",
    detailing: [
      "Vertical bars in a basement or retaining wall act in flexure from soil pressure, so deflection and crack width at service load set the bar size; US producers limit their prescriptive tables to walls up to about 3 m (10 ft) high.",
      "Starter bars from the footing, corner bars and lintel hooks are factory-formed L-shapes because the bar cannot be bent on site; ICF clips hold the light bar in place and lap splices follow the GFRP development length, not steel's.",
      "TMS 402/602-22 added an appendix for GFRP reinforcement in grouted masonry, so the bar diameter is matched to the grout cell as it would be for steel.",
    ],
    sizes: "Ø10–Ø16 mm (No. 3–No. 5) straight bars in 6 m, 10 ft or 20 ft lengths with factory L-shaped starter bars and hooks.",
    route: "In the United States the prescriptive wall and lintel tables are published in producer-specific ICC-ES evaluation reports and apply only to the listed product; any other bar, imported ones included, goes through an engineer's design to ACI 440.11, ACI 332 or TMS 402 Appendix D. Elsewhere the engineer of record designs the wall and names the test package, and dealers stock the straight bars.",
    references: [
      { text: "ICC-ES EER-5548: prescriptive tables for IRC flat walls, ICF walls and lintels with one producer's No. 3 to No. 5 GFRP bars", href: "https://icc-es.org/wp-content/uploads/report-directory/EER-5548.pdf" },
      { text: "Mateenbar technical data page: masonry under TMS 402/602-22 and residential concrete under ACI 332 and ICC-ES EER/ESR 5548", href: "https://mateenbar.com/en-us/tech-data-and-approvals/" },
    ],
    send: "Wall height, backfill and surcharge, the code route the permit will follow, starter-bar and corner details, and whether the order is for a project or for dealer stock.",
  },
];

const faqs = [
  { question: "What is GFRP rebar used for?", answer: "Concrete where steel's corrosion, magnetism, conductivity or uncuttability is the problem: seawalls and marine structures, bridge decks and barriers exposed to de-icing salt, slabs, pavements and pools, precast panels and tunnel segments, MRI suites and rail slabs, TBM soft-eyes, and water or chemical plant concrete." },
  { question: "Where is fiberglass rebar not allowed?", answer: "ACI CODE-440.11-22 excludes GFRP from seismic-force-resisting systems in higher seismic design categories and applies only where a fire-resistance rating is not required of the member; prestressing with GFRP is outside the code. Owners add their own limits. The engineer of record decides element by element." },
  { question: "Can an imported GFRP bar be used on a US DOT bridge?", answer: "In practice no. State DOTs buy from producer lists maintained through plant audits, Buy America rules have applied to GFRP since October 2025, and several states require a higher modulus than ASTM D7957's minimum. Private and commercial work, and projects outside North America, are specified project by project against a third-party test package." },
  { question: "Which application has the most GFRP volume?", answer: "By linear metres, slabs, pavements and channel linings in the Middle East and US flatwork; by single order size, marine and flood channels such as the Jizan channel in Saudi Arabia. Bridge decks are the mature structural use and TBM soft-eyes the oldest engineered niche." },
  { question: "What should I send to get an application reviewed?", answer: "The exposure or function that drives the choice, the governing specification and design code, element drawings or a bar schedule, the documents your engineer requires and the destination. A technical review before the schedule is complete is a normal first step." },
  { question: "Can GFRP rebar be used in a building, not just in slabs and seawalls?", answer: "Yes, within the scope of ACI CODE-440.11-22, CSA S806 or EN 1992-1-1 Annex R: foundations, walls, non-prestressed slabs and beams, parking decks and balconies. Columns are designed without counting the GFRP in compression, members that need a fire-resistance rating are checked against the code's scope, and the seismic-force-resisting system is excluded in higher seismic design categories. Producers list hotels, research institutes, stadiums and parking structures among their building projects." },
  { question: "Can fiberglass rebar be used in basement and ICF walls?", answer: "Yes, as an engineered design. Vertical bars act in flexure from soil pressure, so deflection and crack width set the bar size, and US producers limit their prescriptive tables to walls up to about 3 m high. Starter and corner bars are factory-formed L-shapes. The prescriptive tables themselves belong to listed products; any other bar goes through the engineer's design to ACI 440.11, ACI 332 or TMS 402 Appendix D for masonry." },
];

export default function GfrpRebarApplicationsPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: pageTitle, description: pageDescription, url: absoluteUrl(pagePath), mainEntityOfPage: absoluteUrl(pagePath), dateModified: PAGE_UPDATED, publisher: { "@id": "https://www.f1composite.com/#organization" }, about: { "@type": "Thing", name: "GFRP rebar applications" } }} />
      <PageHeader
        tag="Application guide"
        updated={PAGE_UPDATED}
        title="GFRP rebar applications"
        description={`${applications.length} places engineers replace steel reinforcement with glass fiber reinforced polymer bars, what changes in the detailing, how each market approves the bar, and which public projects to read before you specify. Reference projects are attributed to the producers that supplied them.`}
        facts={[
          { label: "Applications", value: `${applications.length} segments` },
          { label: "Why GFRP", value: "No corrosion · nonmagnetic · insulating · cuttable" },
          { label: "Design basis", value: "ACI 440.11 · AASHTO GFRP-2 · CSA S6" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "GFRP rebar applications" }]}
        actions={{ primary: { label: "Request a technical review", href: buildRebarRfqHref("technical") }, secondary: { label: "GFRP rebar supply", href: "/products/frp-rebar", variant: "secondary" } }}
      />
      <PageNav items={[...applications.map((app) => ({ id: app.id, label: app.label })), { id: "faq", label: "FAQ" }]} />

      {applications.map((app, index) => (
        <PageSection key={app.id} id={app.id} title={app.title} tone={index % 2 === 0 ? "white" : "muted"} intro={app.why}>
          <div className="grid gap-[24px] lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="text-f16 font-bold text-t1">What changes in the detailing</h3>
              <ul className="mt-[10px] space-y-[8px] text-f14 leading-golden text-t2">{app.detailing.map((item) => <li key={item} className="border-l-2 border-teal-border pl-[12px]">{item}</li>)}</ul>
              <h3 className="mt-[20px] text-f16 font-bold text-t1">Reference projects</h3>
              <ul className="mt-[10px] space-y-[8px] text-f14 leading-golden text-t2">{app.references.map((ref) => <li key={ref.href}><a href={ref.href} target="_blank" rel="noreferrer" className="font-semibold text-teal-text underline decoration-teal/30 underline-offset-4 hover:decoration-teal">{ref.text} ↗</a></li>)}</ul>
            </div>
            <div className={`rounded-card border border-border-default p-[20px] ${index % 2 === 0 ? "bg-bg2" : "bg-white"}`}>
              <dl className="space-y-[14px] text-f14 leading-golden">
                <div><dt className="font-semibold text-teal-text">Typical sizes</dt><dd className="mt-[4px] text-t2">{app.sizes}</dd></div>
                <div><dt className="font-semibold text-teal-text">Approval route by market</dt><dd className="mt-[4px] text-t2">{app.route}</dd></div>
                <div><dt className="font-semibold text-teal-text">What to send</dt><dd className="mt-[4px] text-t2">{app.send}</dd></div>
              </dl>
              <Link href={buildRebarRfqHref("technical")} className="mt-[16px] inline-flex min-h-[44px] items-center text-f14 font-bold text-teal-text hover:underline">Review this application with us →</Link>
            </div>
          </div>
        </PageSection>
      ))}

      <PageSection id="faq" title="GFRP rebar application questions" tone={applications.length % 2 === 0 ? "white" : "muted"}>
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "GFRP reinforcement", links: [
            { href: "/products/frp-rebar", label: "GFRP rebar: bars, stirrups and mesh" },
            { href: "/resources/gfrp-rebar-standards", label: "GFRP rebar standards by market" },
            { href: "/resources/gfrp-rebar-size-chart", label: "GFRP rebar size chart" },
          ] },
          { title: "Evidence and tools", links: [
            { href: "/technology/fiberglass-rebar-vs-steel", label: "Fiberglass rebar vs steel: test data" },
            { href: "/tools/gfrp-rebar-calculator", label: "GFRP rebar calculator" },
            { href: "/tools/frp-life-cycle-cost-calculator", label: "Life-cycle cost calculator" },
            { href: "/resources/blog/fiberglass-rebar-for-residential-concrete", label: "Fiberglass rebar for residential concrete" },
          ] },
          { title: "Industries", links: [
            { href: "/industries/marine", label: "Marine and offshore" },
            { href: "/industries/infrastructure", label: "Infrastructure" },
            { href: "/industries/water-wastewater", label: "Water and wastewater" },
          ] },
        ]}
      />
      <InnerCTA
        title="Bring the exposure, the code and the drawings"
        quoteHref={buildRebarRfqHref("technical")}
        text="Send the application, the governing specification and a bar schedule or element drawings. We confirm the bar forms, sizes and evidence available before you fix the design."
      />
    </>
  );
}
