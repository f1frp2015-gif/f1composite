import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Facade Sunshade Panels — E40 Pultruded Plates";
const pageDescription =
  "Multi-layer fabric pultruded FRP plates, full-section modulus to 40 GPa (E40), for curtain-wall sunshades: long spans, no thermal bridge, no corrosion.";
const pagePath = "/products/facade-sunshade-panels";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/facade-sunshade-panels/opengraph-image",
});

const bladeEngineering = [
  {
    title: "Full-section modulus to 40 GPa (E40)",
    body:
      "EN 13706 grades pultruded structurals at E17 and E23 — a full-section modulus of 17 or 23 GPa. F1's multi-layer fabric-reinforced plate reaches E40: up to 40 GPa across the whole section, not just in a fiber-direction coupon. On a sunshade blade that stiffness translates directly into longer spans between brackets, thinner blades for the same deflection limit, and fewer penetrations through the curtain wall.",
  },
  {
    title: "Stiff in both directions — by design",
    body:
      "A roving-only pultrusion is stiff along its length and weak across it. The E40 plate stacks multiple layers of stitched multiaxial fabric (0°/90°/±45°) through the thickness, so transverse modulus and strength run at a multiple of conventional flat sheet. That is what lets one plate serve as a vertical fin, a horizontal louver, or an angled blade — the biaxial wind-load demands of facade shading are engineered into the laminate itself.",
  },
  {
    title: "No thermal bridge through the envelope",
    body:
      "Every aluminum sunshade bracket is a conductive path punched through the insulation line — the penalty shows up in the whole-facade U-value calculation and as condensation risk at the anchor. FRP conducts heat at roughly 0.3 W/m·K, about 1/500th of aluminum, so an FRP blade-and-bracket assembly leaves the envelope's thermal performance intact.",
  },
  {
    title: "Light on the wall",
    body:
      "At 1.9–2.0 g/cm³ the plate runs about a quarter of the density of steel and 25% under aluminum — and stiffness-for-weight it outperforms both as a thin blade. Lower dead load means lighter substructure, smaller anchors into the mullion or slab edge, and blades a two-person crew can set without mechanical lifting.",
  },
  {
    title: "Dimensionally quiet across sun cycles",
    body:
      "A sunshade blade lives in the harshest thermal-cycling position on the building — full sun to shade, every day. FRP's coefficient of thermal expansion (≈ 7–9 × 10⁻⁶/K) is close to glass and a third of aluminum's, so a 4 m blade moves under 2 mm across a 60°C swing where aluminum moves 5.5 mm. Joints stay tight; there is no thermal walk, bracket-slot wear, or the oil-canning that shows on aluminum sheet in raking light.",
  },
  {
    title: "No corrosion, no repaint cycle",
    body:
      "Coastal chloride, urban pollution, and constant wet-dry cycling attack coated aluminum and steel shading over a facade's life. The pultruded plate cannot corrode, carries a resin-rich surface veil under an architectural-grade AAMA 2604 / 2605 finish in any RAL color, and holds it without a recoating budget — the same finish system proven through a full polar irradiance season on our Antarctic fenestration.",
  },
];

const laminateStack = [
  {
    layer: "Surface veil + PU topcoat",
    role: "UV screen and finish carrier — a resin-rich synthetic veil under an AAMA 2604/2605 architectural coating in any RAL color, protecting the structural laminate from weathering.",
  },
  {
    layer: "Multiaxial stitched fabrics (0°/90°/±45°), multiple layers",
    role: "The F1 development that makes E40 possible in a thin plate: stitched fabric layers distributed through the thickness carry transverse bending at brackets, edgewise gravity loads, and bolt-bearing stresses that roving alone cannot.",
  },
  {
    layer: "Unidirectional E-glass roving core",
    role: "High-count continuous roving delivers the longitudinal stiffness that sets the span between brackets — the backbone of the 40 GPa full-section modulus.",
  },
  {
    layer: "Resin system",
    role: "Isophthalic polyester as standard; vinyl ester for coastal and chemical exposure; fire-retardant systems with BS 476-tested options where the facade specification demands reaction-to-fire performance.",
  },
];

const bladeFormats = [
  {
    name: "Flat plate blades",
    tag: "The E40 plate · stock format",
    detail:
      "The multi-layer fabric plate itself: 3–25 mm thick, widths to 600 mm, cut to blade length from a continuous pultrusion run. The workhorse format for fin and louver arrays — a clean rectangular section that reads crisp on the facade, machines with standard tooling, and takes concealed or clamped fixings. Practical maximum shipping length is container-limited at 11.8 m.",
  },
  {
    name: "Aerofoil & elliptical blades",
    tag: "Custom die · hollow section",
    detail:
      "Hollow aerofoil and elliptical sections pultruded on a dedicated die, for shading arrays where the architect wants a wing profile or the engineer wants more projected width per kilogram. The closed section adds torsional stiffness for blades on pivot mounts and operable-louver retrofits. Dies to 600 × 300 mm envelope through our custom pultrusion program.",
  },
  {
    name: "Box & trapezoid blades",
    tag: "Custom die · hollow section",
    detail:
      "Closed box and trapezoid sections for the longest fins and deepest louvers, where torsional restraint between widely spaced brackets governs the design. Wall thickness and internal webs are tuned to the wind-load report, and the same multi-layer fabric architecture carries the corner and web stresses.",
  },
];

const orientations = [
  {
    name: "Vertical fins",
    loads: "Wind pressure and suction flatwise · self-weight axial · floor-to-floor spans",
    detail:
      "Vertical fin arrays — the classic brise-soleil for east and west elevations — span floor to floor, typically 3–4 m between brackets. The load case is almost pure flatwise bending under wind pressure and suction, and deflection, not strength, governs the blade. This is exactly where the E40 modulus pays: a floor-to-floor fin on two anchors, no intermediate bracket, no visible sag line down the array. Self-weight acts along the blade axis, where the pultrusion is strongest.",
  },
  {
    name: "Horizontal louvers",
    loads: "Gravity edgewise · wind flatwise · combined biaxial bending",
    detail:
      "Horizontal louvers and projecting sunshades on south elevations carry a harder combination: self-weight bends the blade edgewise, wind bends it flatwise, and maintenance and drift loads add to the gravity case — biaxial bending at every span. A roving-only section handles the wind axis and fails the designer on the gravity axis; the multi-layer fabric plate carries both, which is why one E40 blade family serves the whole facade, horizontal and vertical.",
  },
];

const materialProperties = [
  { property: "Full-section flexural modulus", value: "Up to 40 GPa (E40)", note: "vs 17 / 23 GPa for EN 13706 E17 / E23 standard grades" },
  { property: "Transverse flexural modulus", value: "10 – 14 GPa", note: "Multi-layer multiaxial fabric; roving-only flat sheet runs 5 – 7 GPa" },
  { property: "Longitudinal tensile strength", value: "350 – 600 MPa", note: "Layup-dependent; tuned per blade span and section" },
  { property: "Density", value: "1.9 – 2.0 g/cm³", note: "≈ 25% of steel, 25% under aluminum" },
  { property: "Thermal expansion (CTE)", value: "7 – 9 × 10⁻⁶ /K", note: "Aluminum: 23 × 10⁻⁶ /K — three times the movement per blade" },
  { property: "Thermal conductivity", value: "≈ 0.3 W/m·K", note: "Aluminum: 160 W/m·K — no thermal bridge at brackets" },
  { property: "Fire performance", value: "FR resin systems", note: "Fire-retardant formulations with BS 476-tested options, per project spec" },
  { property: "Finish", value: "AAMA 2604 / 2605, any RAL", note: "Architectural PU topcoat over resin-rich veil; 10-year exposure rating" },
];

const aluminumComparison = [
  {
    criterion: "Thermal bridging at brackets",
    aluminum: "Every bracket is a conductive penetration; thermal-break pads add parts and still leak heat",
    frp: "Blade and connection are intrinsically insulating — envelope U-value unaffected",
  },
  {
    criterion: "Thermal movement (4 m blade, ΔT 60°C)",
    aluminum: "≈ 5.5 mm — slotted fixings, expansion noise, joint wear",
    frp: "< 2 mm — CTE close to glass; fixed connections stay quiet",
  },
  {
    criterion: "Coastal & urban exposure",
    aluminum: "Coating breach → pitting; recoat cycle in aggressive environments",
    frp: "Cannot corrode; no recoating budget over the facade's life",
  },
  {
    criterion: "Surface quality in raking light",
    aluminum: "Sheet and plate show oil-canning and weld/fixing print-through",
    frp: "Pultruded section is die-formed — flat and consistent along the full run",
  },
  {
    criterion: "Span between brackets",
    aluminum: "Governed by extrusion alloy modulus (≈ 70 GPa) at 2.7 g/cm³",
    frp: "E40 at 2.0 g/cm³ — comparable deflection performance per weight, fewer brackets than thin-wall extrusions in practice",
  },
  {
    criterion: "Radio-frequency transparency",
    aluminum: "Shields antennas; conflicts with facade-integrated 5G / telecom zones",
    frp: "RF-transparent — shading arrays can run continuously across antenna zones",
  },
];

const faqItems = [
  {
    question: "What are FRP facade sunshade panels?",
    answer:
      "FRP facade sunshade panels — also specified as brise-soleil, solar shading fins, or sun louvers — are pultruded fiberglass blades fixed to a curtain wall or facade to control solar heat gain and glare. F1 Composite supplies them as high-modulus thin plates (and custom hollow sections) produced by pultrusion: continuous E-glass reinforcement pulled through a heated die with a thermoset resin. The result is a blade that is stiff, light, corrosion-free, and — unlike aluminum shading — thermally inert, so it does not bridge the building envelope at its brackets.",
  },
  {
    question: "What does E40 mean, and why does it matter for sunshades?",
    answer:
      "EN 13706, the European standard for pultruded structural profiles, defines two grades by full-section modulus: E17 (17 GPa) and E23 (23 GPa). F1's multi-layer fabric-reinforced plate reaches a full-section flexural modulus of up to 40 GPa — hence E40 — nearly double the highest standard grade. Sunshade blades are deflection-governed: they are long, thin, and loaded by wind. Modulus, not strength, sets how far a blade can span between brackets, so E40 directly buys longer spans, thinner blades, and fewer facade penetrations.",
  },
  {
    question: "How far can a blade span between brackets?",
    answer:
      "It depends on blade section, wind pressure, and the deflection limit in your facade specification (commonly L/180 to L/240 for shading elements). As an order of magnitude: vertical fins in the E40 flat plate typically span floor-to-floor — 3 to 4 m on two anchors — under common wind loads, and hollow custom sections extend that. We run the span check for your actual blade geometry and wind report (EN 1991-1-4 or ASCE 7) as part of quoting, and tune the laminate to the span rather than forcing the design onto a stock layup.",
  },
  {
    question: "Can the same plate be used for vertical fins and horizontal louvers?",
    answer:
      "Yes — that is the point of the multi-layer fabric architecture. Vertical fins see mostly flatwise wind bending; horizontal louvers add edgewise gravity bending on top of it, a biaxial load case that exposes the transverse weakness of roving-only pultrusions. The E40 plate carries multiple stitched multiaxial fabric layers through its thickness, giving it transverse modulus of 10–14 GPa — roughly double conventional flat sheet — so one blade family serves both orientations across the facade.",
  },
  {
    question: "What about fire performance?",
    answer:
      "Facade shading sits outside the insulated envelope, but many specifications still call for a reaction-to-fire class on every facade-mounted element. We produce the plate in fire-retardant resin systems with BS 476-tested options, and match the resin formulation to the fire clause in your specification. Tell us the standard your project is reviewed under and we will confirm the applicable test evidence with the quotation.",
  },
  {
    question: "What colors and finishes are available, and how do they weather?",
    answer:
      "Blades ship with an architectural-grade AAMA 2604 or 2605 polyurethane finish in any RAL color, applied over the plate's resin-rich surface veil. These are the same 10-year-exposure-rated finish systems we use on our fenestration range, proven through a full polar irradiance season at our Antarctic installation — including dark colors, which are the hardest to hold against UV fade on a fully sun-exposed shading blade.",
  },
  {
    question: "How do FRP sunshade blades compare with aluminum on cost?",
    answer:
      "On blade material alone, a high-modulus FRP plate typically prices above a commodity aluminum extrusion. The comparison changes at system level: FRP needs no thermal-break hardware at the brackets, fewer brackets per elevation because deflection performance per weight is higher, lighter substructure because the blades weigh less, and no recoat cycle over the facade's life. On coastal and high-rise projects — where access costs dominate maintenance — the lifecycle comparison generally favors FRP. We quote DDP so the landed comparison is explicit.",
  },
  {
    question: "Can you produce custom blade profiles — aerofoil or box sections?",
    answer:
      "Yes. Beyond the E40 flat plate, we pultrude custom hollow blade sections — aerofoil, elliptical, box, trapezoid — on dedicated dies up to a 600 × 300 mm envelope, through the same custom pultrusion program that serves our OEM clients. The multi-layer fabric architecture carries over to the hollow sections. Blades are cut to length, CNC-drilled to your bracket pattern, and finished before shipment, so they arrive install-ready.",
  },
];

export default function FacadeSunshadePanelsPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "Pultruded FRP Facade Sunshade Panels — E40 High-Modulus Plates",
          description:
            "Multi-layer fabric-reinforced pultruded FRP plates with full-section modulus up to 40 GPa (E40) for curtain-wall sunshades: vertical fins, horizontal louvers, and custom blade sections.",
          path: pagePath,
          image: "/images/products/facade-sunshade/pultruded-frp-sunshade-plate-multilayer-fabric-e40.webp",
          category: "FRP Facade Sunshade and Solar Shading Panels",
          material: ["E-glass unidirectional roving", "Multiaxial stitched fabrics", "Isophthalic polyester resin", "Vinyl ester resin", "Fire-retardant resin systems"],
          additionalProperty: [
            { name: "Also known as", value: "Brise-soleil blades, solar shading fins, sun louvers, facade shading panels, FRP louver blades" },
            { name: "Full-section flexural modulus", value: "Up to 40 GPa (E40) — vs EN 13706 E17/E23 standard grades" },
            { name: "Reinforcement architecture", value: "Multi-layer multiaxial stitched fabric + unidirectional roving, developed by F1 Composite" },
            { name: "Formats", value: "Flat plate 3–25 mm × up to 600 mm; custom aerofoil/box hollow sections to 600 × 300 mm" },
            { name: "Mounting orientations", value: "Vertical fins and horizontal louvers — biaxial load capability" },
            { name: "Thermal conductivity", value: "≈ 0.3 W/m·K (vs aluminum 160 W/m·K) — no thermal bridge at brackets" },
            { name: "Finish", value: "AAMA 2604 / 2605 architectural PU, any RAL color" },
            { name: "Fire options", value: "Fire-retardant resin systems, BS 476-tested options" },
          ],
        })}
      />
      <PageHeader
        tag="FRP Facade Sunshade · Curtain Wall"
        title="Pultruded FRP sunshade panels for curtain wall facades"
        description="High-modulus fiberglass blades for brise-soleil, fins, and louver arrays — built on F1's multi-layer fabric-reinforced pultruded plate with a full-section modulus up to 40 GPa (E40). Long spans between brackets, no thermal bridge through the envelope, no corrosion, and one blade family that works vertically and horizontally."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Facade Sunshade Panels" },
        ]}
      />

      {/* Application & product images */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-3">
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/facade-sunshade/pultruded-frp-sunshade-plate-multilayer-fabric-e40.webp"
                alt="Multi-layer fabric-reinforced pultruded FRP sunshade plate on the pultrusion line at F1 Composite"
                width={1200}
                height={1601}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="aspect-[4/3] w-full rounded-[8px] object-cover"
                loading="eager"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">
                The E40 plate — as pultruded, before finishing
              </p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/facade-sunshade/frp-facade-sunshade-vertical-fins-curtain-wall.webp"
                alt="Vertical fin sunshade array on a curtain wall facade — the blade format the E40 plate is engineered for"
                width={1232}
                height={928}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="aspect-[4/3] w-full rounded-[8px] object-cover"
                loading="eager"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">
                Vertical fin arrays — floor-to-floor spans
              </p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/facade-sunshade/frp-facade-sunshade-angled-louver-blades.webp"
                alt="Angled louver blade sunshade facade — biaxial wind and gravity loads carried by the blade section"
                width={2048}
                height={1536}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="aspect-[4/3] w-full rounded-[8px] object-cover"
                loading="eager"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">
                Angled louver blades — combined load case
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="max-w-[780px]">
            <p className="text-f19 leading-golden text-t2">
              <strong className="text-t1">A sunshade blade is a deceptively hard structural
              element.</strong> It is long, thin, fully exposed, loaded by wind in both
              directions, and judged by eye down a 40-blade array where a single sagging fin
              is visible from the street. Deflection governs everything — and deflection is
              set by the modulus of the blade material, not its strength.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              That is the problem F1 Composite&apos;s facade sunshade plate was developed to
              solve. Where standard pultruded flat sheet reaches the EN 13706 E17 or E23
              grades — 17 to 23 GPa full-section modulus — our multi-layer fabric-reinforced
              plate reaches <strong className="text-t1">E40: up to 40 GPa across the full
              section</strong>. The gain comes from a laminate F1 developed specifically for
              thin structural plate: multiple stitched multiaxial fabric layers distributed
              through the thickness over a high-count unidirectional roving core, so the
              blade is stiff along its span <em>and</em> across it.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              The biaxial capability is what makes one blade family serve a whole elevation:
              vertical fins spanning floor to floor, horizontal louvers carrying gravity and
              wind together, angled blades in between. Add what pultruded FRP brings to any
              facade element — no thermal bridge at the brackets, no corrosion in coastal
              exposure, a quarter the thermal movement of aluminum, and an architectural
              AAMA 2604/2605 finish in any RAL color — and the E40 plate becomes the
              rational blade material for high-performance envelopes.
            </p>
          </div>
        </div>
      </section>

      {/* Why FRP for blade duty */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Blade Engineering</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Six reasons the blade material decides the shading design
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Shading arrays fail on details: brackets that bridge the envelope, blades that
            sag or rattle, coatings that chalk on the sun side. The E40 plate is engineered
            against each failure mode.
          </p>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {bladeEngineering.map((item) => (
              <div
                key={item.title}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <h3 className="text-[17px] font-bold text-t1">{item.title}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the E40 laminate */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Inside The E40 Plate</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            The multi-layer fabric architecture behind 40 GPa
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Conventional pultruded sheet is mostly longitudinal roving with a mat skin — stiff
            one way, weak the other. The E40 plate replaces the mat with engineered fabric,
            layer by layer through the thickness.
          </p>

          <div className="mt-[34px] space-y-[13px]">
            {laminateStack.map((item) => (
              <div
                key={item.layer}
                className="rounded-[8px] border border-border-default bg-bg2 p-[34px]"
              >
                <div className="flex flex-col gap-[8px] md:flex-row md:items-start md:gap-[34px]">
                  <h3 className="shrink-0 text-[17px] font-bold text-t1 md:w-[340px]">
                    {item.layer}
                  </h3>
                  <p className="flex-1 text-f15 leading-golden text-t2">{item.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[34px] max-w-[780px]">
            <p className="text-f15 leading-golden text-t2">
              Because the fabric stack is specified per project, the laminate is tunable: a
              floor-to-floor vertical fin gets more unidirectional content for span, a wide
              horizontal louver gets more ±45° and 90° fabric for the gravity axis and the
              bolt group at its brackets. You send the blade geometry and the wind report;
              we return the layup and the deflection check.
            </p>
          </div>
        </div>
      </section>

      {/* Blade formats */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Blade Formats</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Flat plate, aerofoil, and closed-box blades
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            The E40 flat plate covers most fin and louver arrays; custom hollow sections
            extend the range where geometry or torsion demands it.
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {bladeFormats.map((format) => (
              <div
                key={format.name}
                className="flex flex-col rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  {format.tag}
                </div>
                <h3 className="mt-[8px] text-[17px] font-bold text-t1">{format.name}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{format.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orientations */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Vertical & Horizontal</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            One blade family, both orientations
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Vertical fins and horizontal louvers load a blade in fundamentally different
            ways. The multi-layer fabric laminate is what lets the same plate carry both.
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            {orientations.map((o) => (
              <div
                key={o.name}
                className="rounded-[8px] border border-border-default bg-bg2 p-[34px]"
              >
                <h3 className="text-[20px] font-extrabold text-t1">{o.name}</h3>
                <p className="mt-[5px] text-f13 font-semibold text-teal-text">{o.loads}</p>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{o.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material properties */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Material Properties</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            E40 plate — key properties for shading design
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            Representative values for the multi-layer fabric plate. Project laminates are
            tuned to the blade section and span, with test data supplied for submission.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Property
                  </th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Value
                  </th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Design relevance
                  </th>
                </tr>
              </thead>
              <tbody>
                {materialProperties.map((row) => (
                  <tr key={row.property} className="border-b border-border-default align-top">
                    <td className="py-[13px] pr-[21px] text-f15 font-semibold text-t1 md:w-[280px]">
                      {row.property}
                    </td>
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-teal-text md:w-[220px]">
                      {row.value}
                    </td>
                    <td className="py-[13px] text-f15 leading-golden text-t2">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* vs Aluminum */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>FRP vs Aluminum Shading</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Where the E40 blade beats the aluminum extrusion
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Aluminum is the incumbent shading material. These are the six criteria where the
            comparison decides itself at system level, not per kilogram of blade.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Criterion
                  </th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Aluminum blade
                  </th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    F1 E40 FRP blade
                  </th>
                </tr>
              </thead>
              <tbody>
                {aluminumComparison.map((row) => (
                  <tr key={row.criterion} className="border-b border-border-default align-top">
                    <td className="py-[13px] pr-[21px] text-f15 font-semibold text-t1 md:w-[240px]">
                      {row.criterion}
                    </td>
                    <td className="py-[13px] pr-[21px] text-f15 leading-golden text-t2">
                      {row.aluminum}
                    </td>
                    <td className="py-[13px] text-f15 leading-golden text-t2">{row.frp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Engineering support */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Engineering Support</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            From wind report to install-ready blades
          </h2>
          <div className="mt-[21px] max-w-[780px]">
            <p className="text-f15 leading-golden text-t2">
              Shading packages rarely arrive as a finished structural design — they arrive as
              an architect&apos;s blade geometry and a wind consultant&apos;s pressure map. Our
              KNOWHOW engineering service closes that gap: we run the span and deflection
              check against EN 1991-1-4 or ASCE 7 loads, tune the E40 laminate to the
              governing case, detail the bracket connections and bolt groups in the plate,
              and supply the calculation package with the quotation. Blades ship cut to
              length, CNC-drilled to the bracket pattern, finished in your RAL color, and
              palletized per elevation — quoted DDP to your port or jobsite.
            </p>
            <div className="mt-[21px] flex flex-wrap gap-[21px]">
              <LinkArrow href="/technology/knowhow-services">KNOWHOW engineering services</LinkArrow>
              <LinkArrow href="/frp-profile-calculator">FRP profile calculator</LinkArrow>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/products/custom-pultrusions", label: "Custom pultrusions — aerofoil & box blades" },
              { href: "/products/standard-profiles/flat-bar", label: "FRP flat bars & plates" },
              { href: "/products/fenestration-systems", label: "FRP windows & doors" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs aluminum, steel & PVC" },
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
              { href: "/technology/knowhow-services", label: "KNOWHOW engineering services" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
          {
            title: "Markets & proof",
            links: [
              { href: "/industries/construction", label: "FRP in construction" },
              { href: "/case-studies", label: "All case studies" },
              { href: "/resources/downloads", label: "Data sheets & certificates" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} suppressSchema />
        </div>
      </section>

      <AskAICard
        prefill="I'm designing a facade sunshade array: [vertical fins / horizontal louvers / angled blades]. Blade size roughly [width × thickness mm], span between brackets [m], wind load [kPa or wind speed], location [city / coastal?]. Deflection limit [L/180 / L/240 / other]. Can the E40 plate carry this, what thickness do you recommend, and how does it compare to the aluminum alternative?"
      />

      <InnerCTA title="Specify FRP sunshade blades for your facade project" />
    </>
  );
}
