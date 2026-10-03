// The long-form application guides of three industry pages (marine,
// industrial, vehicle), shown by components/industries/IndustryPage between
// the areas table and the product cards. The rest of each page (areas,
// products, projects, questions, quote checklist) lives in industryPages.ts
// like every other industry.
//
// The same content rules apply: a guide describes design questions and the
// evidence to ask for. It does not approve an assembly, certify a product or
// promise a result (WEBSITE.md, content and fact rules).

export interface IndustryGuideApplication {
  id: string;
  /** Short name for the application cards and the figure title. */
  label: string;
  /** One line under the label on the application cards. */
  summary: string;
  title: string;
  /** The opening paragraph, set larger. */
  lead: string;
  paragraphs: string[];
  /** An image of the application; left out where the page header shows it. */
  image?: { src: string; alt: string };
  /** The thumbnail on the application card, when there is no article image. */
  thumbnail?: string;
  components?: string[];
  /** Heading of the checklist beside the article. */
  checksTitle: string;
  checks: string[];
  links: { label: string; href: string }[];
}

export interface IndustryGuide {
  applications: { title: string; intro: string; items: IndustryGuideApplication[] };
  selection: {
    title: string;
    intro: string;
    head: [string, string, string];
    rows: { need: string; product: string; href?: string; check: string }[];
    notes?: { title: string; text: string }[];
  };
  /** Further settings the same method covers, after the selection table. */
  adjacent?: {
    title: string;
    items: { title: string; text: string; link: { label: string; href: string } }[];
    note?: { text: string; link: { label: string; href: string } };
  };
  /** Standards and public references; none of them certifies an F1 product. */
  references?: { intro: string; links: { source: string; label: string; href: string; text?: string }[] };
  /** Internal data and guidance pages for the related links. */
  resources: { label: string; href: string }[];
}

export const industryGuides = {
  marine: {
    applications: {
      title: "Four places to put the specification to work",
      intro: "Salt air, splash and washdown make marine access a system decision. Each setting has its own load path and maintenance routine; use these notes to prepare an engineering discussion, then confirm the final assembly against project drawings and test evidence.",
      items: [
        {
          id: "marinas",
          label: "Marinas & finger piers",
          summary: "From the shore ramp to the berth, over a moving gangway.",
          title: "Plan the route from shore ramp to berth",
          lead: "A marina route changes from a moving gangway to the main dock and then to narrow finger piers. Each part needs its own walking surface, support and edge detail.",
          paragraphs: [
            "Open FRP grating gives rain and spray a path through the deck. Molded square or mini mesh can suit short panels with frequent utility cutouts; pultruded bearing-bar grating is a candidate when a defined one-way span governs. A closed FRP deck panel may suit a continuous walking surface, but its joints, slope and drainage need separate design.",
            "For a floating dock, show how panels bear on the frame, how hold-downs fit the supports, and how the deck meets hinged gangways, cleats, service pedestals and removable access covers. Gangway slope, heel and wheel openings, wet slip resistance, edge protection and maintenance access all affect the finished route.",
            "Where habitat rules apply, ask the permitting authority for the required light-transmitting deck area. Panel open area is only one input: joists, floats and service equipment also shade the water below. The open mesh still needs a load and accessibility check for the actual pier layout.",
          ],
          thumbnail: "/images/industries/marine-marina-access-grating.webp",
          checksTitle: "Bring to the specification",
          checks: [
            "Gangway movement, transitions and berth-side clear width",
            "Pedestrian, trolley and concentrated service loads",
            "Mesh opening, wet slip surface and accessibility rules",
            "Panel bearing, hold-downs, cutouts and permit conditions",
          ],
          links: [
            { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
            { label: "Pultruded FRP grating", href: "/products/frp-gratings" },
            { label: "Structural FRP deck panels", href: "/products/frp-deck-panels" },
          ],
        },
        {
          id: "boardwalks",
          label: "Coastal boardwalks",
          summary: "Public access over salt spray, sand and sensitive ground.",
          title: "Coordinate the deck with the shoreline below it",
          lead: "Tidal trails, viewing platforms and waterfront promenades put public access above salt spray, windblown sand and sensitive ground or water.",
          paragraphs: [
            "Open grating can shed water and allow some light through the walkway. The effect beneath a real boardwalk depends on its height, width, direction, support framing and surroundings, so habitat and permit requirements belong in the early layout.",
            "Match the panel to the route: a public promenade may need smaller openings or a continuous surface where mobility aids, narrow wheels or dropped-object concerns govern. A maintenance-only branch may use a different mesh and access arrangement. On either route, check the grit surface, panel edges, transitions and replaceable sections.",
            "Pultruded beams, channels or tubes can form an engineered support frame; FRP handrail components can complete the edge. The project engineer must check wind, pedestrian loads, deflection, connections, foundations and any flood or wave action at the site.",
          ],
          image: { src: "/images/industries/marine-coastal-boardwalk.webp", alt: "Raised coastal boardwalk with open fiberglass grating and edge rails beside a tidal shoreline" },
          checksTitle: "Bring to the specification",
          checks: [
            "Public-access loads, wheel paths and permitted openings",
            "Flood level, tidal splash, UV and cleaning exposure",
            "Under-deck shading, supports and local habitat conditions",
            "Guardrail loads, anchorage and replaceable deck details",
          ],
          links: [
            { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
            { label: "Fiberglass structural shapes", href: "/products/fiberglass-structural-shapes" },
            { label: "FRP handrail systems", href: "/products/frp-handrail-systems" },
          ],
        },
        {
          id: "offshore",
          label: "Offshore secondary access",
          summary: "Routes to equipment and inspection points in exposed, wet conditions.",
          title: "Specify walkways around the actual hazard area",
          lead: "Offshore wind and energy facilities need routes to equipment, inspection points and service landings that remain usable in exposed, wet conditions.",
          paragraphs: [
            "FRP grating, stair treads, ladders, handrails and pultruded members can be considered as a coordinated secondary access package. Identify the bearing direction and support spacing for each panel, then check personnel and equipment loads, deflection, fastening, dropped-object risk and the route to a safe exit.",
            "Fire and blast exposure, emergency escape function and platform rules can govern material choice. A resin description or a generic flame-spread result does not approve an installed offshore assembly. Request evidence for the proposed product and have the platform designer or relevant authority review it against the project's acceptance basis.",
            "On a vessel, a removable service grating or maintenance access member is a separate design case. Shipboard location, fire zone, flag-state and class requirements must be established before offering a part for that duty. Passenger spaces, primary escape routes and ship structures require their own approval path.",
          ],
          image: { src: "/images/industries/marine-offshore-access-platform.webp", alt: "Offshore service platform with open fiberglass walkway grating, handrails and a ladder near equipment" },
          checksTitle: "Bring to the specification",
          checks: [
            "Access function, personnel and equipment loading, escape route",
            "Fire scenario and project or class acceptance basis",
            "Wind uplift, vibration, support spacing and fixing inspection",
            "Product-specific reports for the proposed resin and assembly",
          ],
          links: [
            { label: "Pultruded FRP grating", href: "/products/frp-gratings" },
            { label: "FRP stair treads", href: "/products/frp-stair-treads" },
            { label: "Fiberglass fixed ladders", href: "/products/frp-ladders" },
          ],
        },
        {
          id: "seawater",
          label: "Seawater & aquaculture",
          summary: "Removable access around pumps, tanks and feeding equipment.",
          title: "Keep pumps, tanks and feeding equipment accessible",
          lead: "Intake structures, pump stations and aquaculture service areas need removable access around pipes and equipment, often with frequent washdown.",
          paragraphs: [
            "Molded grating is useful to evaluate where the plan contains multiple pipe penetrations or irregular panels; pultruded grating can be evaluated where one-way span or stiffness is the primary driver. Mark cutouts and lifting points on the panel drawing so each removable piece retains bearing and a defined hold-down pattern.",
            "A complete access package may combine structural channels or beams, grating, stairs, ladders and handrails. Lay out valve reach, pump withdrawal, hose routes and safe cleaning access before choosing panel widths or post positions. Equipment handling loads need their own check; a pedestrian grating selection does not establish machine support capacity.",
            "Specify the actual liquid and cleaning chemicals, concentration, temperature, immersion or splash frequency, outdoor exposure and fastener environment. Resin, surfacing veil, cut-edge sealing and metal hardware are then reviewed for the service conditions and documented in the approved order data.",
          ],
          image: { src: "/images/industries/marine-seawater-pump-platform.webp", alt: "Seawater pump service platform with fiberglass grating, structural supports and edge protection" },
          checksTitle: "Bring to the specification",
          checks: [
            "Pipe penetrations, removable panels and maintenance clearances",
            "Foot traffic versus equipment and lifting loads",
            "Seawater, cleaning chemicals, temperature and UV exposure",
            "Resin selection, cut-edge treatment and fastener material",
          ],
          links: [
            { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
            { label: "Fiberglass structural shapes", href: "/products/fiberglass-structural-shapes" },
            { label: "FRP handrail systems", href: "/products/frp-handrail-systems" },
          ],
        },
      ],
    },
    selection: {
      title: "Choose the component by its job",
      intro: "Molded grating, pultruded grating and closed deck panels are different constructions. Compare the proposed part with its supports, connections and surface treatment before selecting a fiberglass deck.",
      head: ["Design condition", "Product to evaluate", "Check before release"],
      rows: [
        { need: "Frequent cutouts or changing panel direction", product: "Molded grating", href: "/products/molded-frp-grating", check: "Mesh opening, local bearing at cuts, surface and hold-downs" },
        { need: "Defined one-way grating span", product: "Pultruded grating", href: "/products/frp-gratings", check: "Bearing-bar direction, load table, deflection and support width" },
        { need: "Continuous walking surface", product: "Closed deck panels", href: "/products/frp-deck-panels", check: "Joint load transfer, drainage, slip surface and edge closure" },
        { need: "Framing and edge protection", product: "Structural shapes and handrails", href: "/products/fiberglass-structural-shapes", check: "Member and connection loads, anchors, hardware and inspection access" },
      ],
    },
    references: {
      intro: "These references explain why deck layout, composite component design and shipboard fire context need separate checks. None of them certifies an F1 product or replaces local project requirements.",
      links: [
        { source: "NOAA", label: "Seagrass and overwater structures", href: "https://www.fisheries.noaa.gov/west-coast/habitat-conservation/seagrass-west-coast", text: "Shading and habitat considerations for docks and marinas." },
        { source: "DNV", label: "DNV-ST-C501: composite components", href: "https://www.dnv.com/energy/standards-guidelines/dnv-st-c501-composite-components/", text: "A framework covering composite design, fabrication and installation." },
        { source: "ASTM", label: "ASTM F3059-24: marine FRP grating", href: "https://store.astm.org/f3059-24.html", text: "Marine construction and shipbuilding grating specification; confirm whether it applies to your installation." },
        { source: "IMO", label: "FRP in ship structures", href: "https://www.imo.org/en/mediacentre/meetingsummaries/pages/sdc-12.aspx", text: "Fire-safety context for evaluating FRP elements on board ships." },
      ],
    },
    resources: [
      { label: "Test reports and their scope", href: "/resources/evidence" },
      { label: "How to install FRP grating", href: "/resources/blog/how-to-install-frp-grating" },
      { label: "Coastal marina walkway case study", href: "/case-studies/coastal-marina-walkway" },
    ],
  },
  industrial: {
    applications: {
      title: "Where FRP components do a specific job",
      intro: "F1 supplies pultruded profiles and coordinated access components. What a lighter, corrosion-resistant material is worth depends on the real operating route, the chemicals present and the full assembly, including its grating supports, connections and inspection plan.",
      items: [
        {
          id: "tank-platforms",
          label: "Tank-access platforms",
          summary: "Valve operation, sampling and inspection above bunds and process equipment.",
          title: "Chemical dosing and tank-access platforms",
          lead: "A tank-side platform may be used for valve operation every shift, sampling at a fixed point and occasional replacement of an agitator or instrument.",
          paragraphs: [
            "The walking route, clearances and escape path need to work around the actual vessels and pipework. Splash, vapor, rain and washdown can reach different parts of the assembly at different frequencies.",
            "Pultruded I-beams or channels can form the support frame; molded or pultruded grating provides the walking surface; stair treads, guardrails and toe boards complete the access route. The guardrail posts transfer their loads into the platform frame, while base plates and anchors transfer all reactions into the existing structure. A replacement for steel therefore needs a new member and connection check, even when the footprint is unchanged.",
            "Start resin selection with a list of chemicals, concentrations, temperatures and exposure modes, including cleaning agents. Define where cuts, drilled holes and metal fasteners will be exposed. Supply can be limited to profiles and panels or expanded to a cut, drilled and labeled component package against approved drawings.",
          ],
          thumbnail: "/images/industries/industrial-chemical-tank-platform.webp",
          components: ["I-beams and channels", "Grating and stair treads", "Handrails, toe boards and fittings"],
          checksTitle: "Confirm before selection",
          checks: ["Operating and maintenance loads, clear spans and deflection", "Guardrail layout, anchor substrate and local connection loads", "Chemical splash, washdown and fire requirements"],
          links: [
            { label: "Chemical platform application guide", href: "/applications/frp-chemical-plant-platforms" },
            { label: "Structural profiles", href: "/products/fiberglass-structural-shapes" },
            { label: "Handrail systems", href: "/products/frp-handrail-systems" },
          ],
        },
        {
          id: "plating-pickling",
          label: "Plating & pickling lines",
          summary: "Operator paths beside treatment baths, trenches and maintenance openings.",
          title: "Plating and pickling-line walkways",
          lead: "An operator beside a plating or pickling line needs access to bath controls, hoists and inspection points without stepping around open channels or loose covers.",
          paragraphs: [
            "Mist above the baths, drips from transferred parts and periodic cleaning create a different exposure from a dry production aisle. Set out the walkway width, removable sections, drainage path and barriers around every opening before selecting a panel.",
            "Molded grating is often a useful starting point for irregular layouts with several cutouts or support in two directions. Pultruded grating suits layouts organized around a defined bearing-bar direction and a checked span. In either case, the chosen mesh or bar opening, surface texture, edge supports, hold-down clips and the load from tools or carts belong on the panel schedule.",
            "Chemical compatibility is specific to the actual bath and cleaning chemistry. A resin family name alone cannot establish suitability for concentrated acids, oxidizers or elevated temperatures. Review the proposed laminate and any exposed cut edges with the material supplier before releasing the layout.",
          ],
          image: { src: "/images/industries/industrial-plating-line-walkway.webp", alt: "Plating line walkway with FRP grating panels alongside process baths and a guarded access route" },
          components: ["Molded or pultruded grating", "Stair treads and edge framing", "Guardrails and removable-panel hardware"],
          checksTitle: "Confirm before selection",
          checks: ["Bath chemistry, mist, spills and washdown temperature", "Cutout positions, support bearing and grating orientation", "Slip surface, drainage, clips and safe removal sequence"],
          links: [
            { label: "Molded grating", href: "/products/molded-frp-grating" },
            { label: "Pultruded grating", href: "/products/frp-gratings" },
            { label: "Stair treads", href: "/products/frp-stair-treads" },
          ],
        },
        {
          id: "cooling-towers",
          label: "Cooling towers",
          summary: "Service decks, support members and access around wet equipment.",
          title: "Cooling-tower framing and wet-zone access",
          lead: "Inside a cooling tower, the frame and access route see saturated air, water-treatment chemicals and repeated wet-dry cycles.",
          paragraphs: [
            "Fan-deck maintenance, louver access and inspection around the fill require members that work as a connected structure. Pultruded beams, channels, square tubes and angles can form framing, bracing and edge supports; grating and rails complete the service route.",
            "The design must account for the tower's maximum expected water temperature, sustained loads, member buckling, service deflection and the stiffness of bolted joints. Water chemistry and the biocide program affect resin selection. CTI STD-137 addresses pultruded structural products for cooling towers, including material and quality requirements; its use still requires the offered product and project design to be checked.",
            "For refurbishment, provide the existing tower drawings, support positions and the replacement sequence. A lighter component may simplify handling, but the existing anchors, remaining structure and temporary support during change-out still need engineering review.",
          ],
          image: { src: "/images/industries/industrial-cooling-tower-walkway.webp", alt: "Cooling tower wet zone with FRP grating walkway, beams, bracing and guardrails" },
          components: ["I-beams, channels and square tubes", "Angles, grating and louvers", "Guardrails and connection plates"],
          checksTitle: "Confirm before selection",
          checks: ["Water chemistry, biocides and maximum temperature", "Long-duration loads, buckling and service deflection", "Connections, cut-edge treatment and replacement staging"],
          links: [
            { label: "Cooling tower application guide", href: "/applications/frp-cooling-tower-profiles" },
            { label: "FRP I-beams", href: "/products/fiberglass-structural-shapes/frp-i-beam" },
            { label: "FRP square tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube" },
          ],
        },
        {
          id: "cable-routes",
          label: "Cable routes",
          summary: "Ladders, brackets and supports beside pipe racks and dosing equipment.",
          title: "Cable routes through corrosive process areas",
          lead: "Electrical and control cables often pass above chemical dosing skids, washdown aisles or outdoor pipe corridors.",
          paragraphs: [
            "The support schedule needs more than a route length: cable mass, future fill, support spacing, fittings, turns and the location of each splice all affect deflection and connection demand.",
            "Pultruded channels and angles can form wall brackets and secondary supports; square tubes can serve as posts in a free-standing frame. A cable ladder or tray is a complete system with side rails, rungs or base, splices and fittings. Confirm whether the inquiry is for component profiles, fabricated supports or a qualified complete tray system before citing IEC 61537 or another system standard.",
            "FRP members are nonmetallic, but they do not settle the electrical design. Cable bonding, metallic fasteners, static control, fire and smoke requirements, and any hazardous-area rules remain with the project engineer. State these requirements separately from the chemical exposure specification.",
          ],
          image: { src: "/images/industries/industrial-cable-ladder-support.webp", alt: "FRP cable ladder on wall brackets in a chemical processing corridor" },
          components: ["Channels and angles for brackets", "Square tubes for support posts", "Agreed tray, ladder and fitting package"],
          checksTitle: "Confirm before selection",
          checks: ["Cable load, future fill, route geometry and support spacing", "Bracket anchors, splices and concentrated maintenance loads", "Electrical, fire and hazardous-area requirements"],
          links: [
            { label: "Cable tray support guide", href: "/applications/frp-cable-tray-supports" },
            { label: "FRP channels", href: "/products/fiberglass-structural-shapes/frp-channel" },
            { label: "Custom profiles", href: "/products/custom-pultruded-profiles" },
          ],
        },
      ],
    },
    selection: {
      title: "Match the component to the load path",
      intro: "Profiles, grating and access assemblies have different reinforcement layouts and design checks. Select a product family only after locating its supports, loads, openings and connections.",
      head: ["Component function", "Start with", "What decides the specification"],
      rows: [
        { need: "Walkway with cutouts", product: "Molded grating", href: "/products/molded-frp-grating", check: "Mesh opening, local supports, clips and removable panels" },
        { need: "Span-led walking surface", product: "Pultruded grating", href: "/products/frp-gratings", check: "Bearing direction, clear span, loads and deflection" },
        { need: "Platform or tower frame", product: "I-beams, channels, tubes and angles", href: "/products/fiberglass-structural-shapes", check: "Member stability, connections, temperature and anchors" },
        { need: "Platform edge protection", product: "Handrail systems", href: "/products/frp-handrail-systems", check: "Guardrail loads, toe boards, post spacing and substrate" },
        { need: "Vertical and stepped access", product: "Fixed ladders", href: "/products/frp-ladders", check: "Ladder layout, landing transition and anchorage" },
        { need: "Stair access", product: "Stair treads", href: "/products/frp-stair-treads", check: "Tread span, nosing, slip surface and fixings" },
        { need: "Cable route supports", product: "Channels, angles and custom sections", href: "/applications/frp-cable-tray-supports", check: "Cable load, support spacing, fittings and system scope" },
      ],
      notes: [
        { title: "Chemical exposure", text: "Review the complete resin, reinforcement and surface package against concentration, temperature and contact mode. Cut edges and connection hardware are part of the exposure." },
        { title: "Structural performance", text: "Check member and panel deflection, local loads, buckling, bearing and anchor reactions. An identical steel and FRP section size does not imply identical performance." },
        { title: "Plant safety", text: "Set fire, smoke, electrical, static, slip and fall-protection criteria for the location. Confirm the offered assembly and its evidence against those requirements." },
      ],
    },
    adjacent: {
      title: "Extend the same method to adjacent equipment",
      items: [
        { title: "Pump rooms and scrubber access", text: "A maintenance route to pump seals, filter covers, scrubber nozzles or dampers may need removable grating, room for lifting a component and a guarded edge beside equipment. Check localized tool and equipment loads, clear headroom, panel removal sequence, support reactions and the cleaning or condensate chemistry. A grating panel should not obstruct drainage or access to a shut-off point.", link: { label: "Plan an access platform", href: "/applications/frp-chemical-plant-platforms" } },
        { title: "Wet production and washdown zones", text: "In beverage, food or other wet production buildings, FRP can be evaluated for non-product-contact mezzanines, service stairs and utility corridors exposed to repeated cleaning. Record the washdown temperature, detergents and sanitizers, drainage, slip-surface needs and cleanable joint details. Direct food contact or cleanroom use requires separate finished-product evidence and site approval.", link: { label: "Review stair treads and covers", href: "/products/frp-stair-treads" } },
      ],
      note: { text: "For basin edges, treatment tanks and dosing rooms, continue to the", link: { label: "water and wastewater industry guide", href: "/industries/water-wastewater" } },
    },
    references: {
      intro: "These sources define design questions; none of them is a certification claim for a particular F1 product. Use the edition and jurisdiction specified by the project. The engineer of record confirms the governing code, the complete load path and acceptance of the installed system.",
      links: [
        { source: "OSHA", label: "1910.22: walking-working surfaces", href: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22" },
        { source: "OSHA", label: "1910.29: guardrail systems", href: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.29" },
        { source: "ANSI / ACMA / FGMC", label: "FRP grating manual", href: "https://webstore.ansi.org/standards/ansi/ansiacmafgmcfg01172025" },
        { source: "CTI", label: "Pultruded products for cooling towers", href: "https://www.cti.org/blogs/posts/fiberglass-pultruded-structural-products-for-use-in-cooling-towers" },
        { source: "IEC", label: "IEC 61537: cable tray and ladder systems", href: "https://webstore.iec.ch/en/publication/31963" },
        { source: "ASCE", label: "ASCE/SEI 74-23: pultruded FRP structures", href: "https://sp360.asce.org/personifyebusiness/Merchandise/Product-Details/productId/309903818" },
      ],
    },
    resources: [
      { label: "FRP vs steel grating", href: "/technology/frp-vs-steel-gratings" },
      { label: "Test reports and their scope", href: "/resources/evidence" },
      { label: "Technical data", href: "/resources/technical-data" },
      { label: "Design guides", href: "/resources/design-guides" },
    ],
  },
  vehicle: {
    applications: {
      title: "Vehicle component opportunities",
      intro: "Pultrusion is suited to continuous, repeatable profiles with a constant cross-section. Straight lengths are the usual starting point; controlled curvature needs a separate manufacturing review. This application review covers possible positions from passenger-car beams and battery-pack rails to bus, truck and rail details. Each candidate needs its own section, laminate, joint design and vehicle-program acceptance basis.",
      items: [
        {
          id: "bus",
          label: "Bus & coach",
          summary: "Side skirts, racks, ducts and interior support rails.",
          title: "Long body details around the bus structure",
          lead: "Bus and coach bodies contain repeatable edge, support and enclosure sections where a custom pultruded profile can be studied alongside the metal body structure.",
          paragraphs: [
            "Candidates include side-skirt and wheel-arch edge profiles, luggage-rack rails, ceiling and interior-panel supports, HVAC duct edges, and luggage-door or service-hatch surrounds. The section may combine a mounting land, edge return and finished face. A complete bus frame, roof shell or crash structure is a different design and approval scope.",
            "Separate exterior and interior duties. A skirt edge sees road debris, water and repair activity; a rack or ceiling support carries fixture loads and repeated vibration; a hatch frame adds hinge and latch cycles. Define deflection, impact and attachment loads before sizing the section. The OEM also identifies any applicable material-burning requirement for the bus class and location.",
          ],
          thumbnail: "/images/industries/vehicle-bus-body-profiles.webp",
          components: ["Side-skirt, wheel-arch and roof-edge details", "Luggage-rack, ceiling and interior-panel support rails", "Luggage-door, service-hatch and HVAC duct framing"],
          checksTitle: "Design and approval checks",
          checks: ["Fixture loads, door cycles, vibration and allowable deflection", "Metal-interface bearing, bond or bolt detail and thermal movement", "Stone impact, cleanability, finish repair and applicable fire rules"],
          links: [
            { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" },
            { label: "FRP channels", href: "/products/fiberglass-structural-shapes/frp-channel" },
          ],
        },
        {
          id: "passenger",
          label: "Passenger cars",
          summary: "Bumper, sill and seat sections as OEM study candidates.",
          title: "Treat reinforcement beams as complete vehicle systems",
          lead: "A bumper reinforcement, side sill or seat crossmember may have a long, fairly constant section, making pultrusion a process candidate. Geometry alone does not establish crash or occupant-safety suitability.",
          paragraphs: [
            "A bumper beam works with crush cans, mounts and surrounding body structure. A side sill contributes to side-impact and underbody load paths. For either candidate, the OEM must set target force-displacement behavior, intrusion limits, failure mode, attachment loads and repair rules, then validate the installed system through its vehicle program.",
            "Seat crossmembers and selected backrest rails add occupant and restraint loads, repeated adjustment or vibration, and local fastening demands. Inserts, drilled holes and bond lines often govern the usable strength more than a coupon result; review them with the proposed laminate and production tolerances.",
          ],
          image: { src: "/images/industries/vehicle-passenger-car-profiles.svg", alt: "Technical illustration marking candidate bumper, side-sill and seat reinforcement locations on a passenger car; conceptual, not an F1-supplied vehicle" },
          components: ["Front or rear bumper reinforcement profiles", "Side-sill and door-opening reinforcement sections", "Seat crossmember or backrest-rail candidates"],
          checksTitle: "OEM study inputs",
          checks: ["Crash pulse, intrusion and energy absorption in the assembled load path", "Seat and restraint loads, fatigue and misuse cases where applicable", "Bonded or bolted joints, inserts, tolerances and repair method"],
          links: [
            { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" },
            { label: "Pultruded profile performance", href: "/technology/pultruded-profile-performance" },
          ],
        },
        {
          id: "battery",
          label: "EV battery packs",
          summary: "Pack rails, end members, cell restraints and edge frames.",
          title: "Define the duty of each battery-pack member",
          lead: "EV packs contain several long parts with different jobs. A cross rail or end member carries mechanical loads; a cell restraint bar controls local clamping; a cover or underbody edge profile supports a joint or seal.",
          paragraphs: [
            "Treat these as separate specifications. Cross members require pack-level bending, crush and attachment checks. Cell restraints need controlled clamp load and long-term dimensional stability. Cover-edge or floor-shield edging must fit the seal, drainage and service-opening design. A pultruded profile should be compared with the complete installed alternative, including metal inserts and fasteners.",
            "Glass FRP can be considered where an insulating section is useful, but laminate data alone do not qualify a high-voltage boundary. Moisture, coolant, contamination, metallic hardware and temperature cycling affect the assembly. The battery-system team defines dielectric, fire, venting, thermal-runaway and impact requirements for the actual location before selecting the material system.",
          ],
          image: { src: "/images/industries/vehicle-ev-battery-pack-profiles.svg", alt: "Technical illustration marking candidate perimeter-rail, crossmember, edge-frame and tray-interface zones in an EV battery enclosure; conceptual, not an F1-supplied pack" },
          components: ["Battery-pack cross rails and end members", "Cell restraint or compression-bar profiles", "Cover-edge and underbody-shield edge profiles"],
          checksTitle: "Pack-level checks",
          checks: ["Crush, impact, vibration and attachment load paths", "Sealing, thermal movement, coolant and moisture exposure", "Electrical insulation and fire behavior of the assembled configuration"],
          links: [
            { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" },
            { label: "Pultruded profile performance", href: "/technology/pultruded-profile-performance" },
          ],
        },
        {
          id: "reefer",
          label: "Trucks & refrigerated bodies",
          summary: "Body edge profiles and insulated-wall sideposts.",
          title: "Coordinate body rails with the wall and cargo duty",
          lead: "Truck and trailer bodies have long roof, floor and wall details. A refrigerated body adds insulation and sealing, so its sideposts must be assessed as part of the complete wall rather than as isolated profiles.",
          paragraphs: [
            "Candidates include box-body roof and floor edge rails, wall sideposts, liner fixing rails and door-edge details. A chassis crossmember or other primary vehicle member carries different safety and durability duties and needs a separate OEM-led program. For the body details, set cargo-restraint and handling loads, repeated door cycles, support spacing and replacement strategy before choosing a section.",
            "In a refrigerated wall, the sidepost geometry must suit panel spacing, insulation thickness and liner fastening. A fiberglass post conducts less heat than a metal post and reduces the thermal bridge through the wall, but energy use cannot be inferred from the profile alone. Compare complete wall or body assemblies under the same test method, including skins, foam, joints, doors and air leakage. Validate cargo impact, fastener pull-through, moisture ingress and temperature cycling alongside thermal performance.",
          ],
          image: { src: "/images/industries/vehicle-reefer-body-cutaway.webp", alt: "Cutaway of a refrigerated trailer wall showing fiberglass sideposts, insulated panels and an interior liner" },
          components: ["Truck-body roof, floor and wall edge rails", "Insulated-wall sideposts and liner fixing rails", "Door-edge, corner and panel-support details"],
          checksTitle: "Design and approval checks",
          checks: ["Body loads, cargo impact and fastener pull-through", "Wall-level heat transfer, sealing and condensation risk", "Washdown, road salt, moisture ingress and repair access"],
          links: [
            { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" },
            { label: "FRP square tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube" },
          ],
        },
        {
          id: "rail",
          label: "Rail vehicles",
          summary: "Exterior and interior secondary parts with a defined fire test route.",
          title: "Assign the fire requirement to each component before choosing the resin",
          lead: "Railcar body details need repeatable dimensions, a durable surface and clear installation interfaces. Pultruded profiles can be evaluated for roof-edge and skirt details, window reveals, interior ceiling supports, luggage-rack elements and cable covers.",
          paragraphs: [
            "These parts may be bonded or mechanically fixed to a metal carbody. The joint must transfer the specified service loads and accommodate tolerances, temperature movement, vibration and maintenance access. For exterior pieces, review weathering, cleaning agents and finish repair. For interior pieces, include passenger contact, fixture loads and the complete installed configuration in the design review.",
            "Fire performance is assigned to the particular component and its operating context. The rail customer should state the applicable requirement set and hazard level under EN 45545-2 or the governing local standard. Ask for test evidence for the offered resin, reinforcement, surface veil, coating and assembly; a generic statement about phenolic or fire-retardant resin is not product approval.",
          ],
          image: { src: "/images/industries/vehicle-rail-interior-rails.webp", alt: "Unfinished railcar body with light-colored ceiling support rails inside a metal shell" },
          components: ["Roof-edge, sidewall and skirt support details", "Interior ceiling, luggage-rack and window-surround profiles", "Cable-cover and equipment-enclosure sections"],
          checksTitle: "Design and approval checks",
          checks: ["Applicable fire requirement set, hazard level and tested configuration", "Bonded or bolted joint evidence and fatigue loads", "Exterior weathering or interior wear and cleaning regime"],
          links: [
            { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" },
            { label: "Rail interior profile guide", href: "/applications/frp-rail-interior-profiles" },
            { label: "Fire-retardant rail profile components", href: "/products/fire-retardant-rail-profiles" },
          ],
        },
        {
          id: "specialty",
          label: "Specialty vehicles",
          summary: "Equipment enclosures and service-body details exposed to hard use.",
          title: "Separate access-panel details from safety-critical load paths",
          lead: "Utility, maintenance and other specialty fleets carry equipment in wet, dirty and frequently washed compartments. FRP profiles can be considered for equipment-door frames, removable panel edges, cable-protection covers and secondary mounting rails.",
          paragraphs: [
            "The useful boundary is the component and its function. A profile that supports an access panel is different from a crash member, occupant restraint anchor or lifting point. The vehicle designer must identify those safety-critical load paths and approve any material change before supply.",
            "Define the actual exposure: road salt, detergents, oil mist, sunlight, standing water or chemical splash. Resin selection, finish, drainage and compatible hardware follow from that service profile. Where field repair matters, agree on a replaceable joint and inspection method early in the design.",
          ],
          image: { src: "/images/industries/vehicle-specialty-body-compartment.webp", alt: "Service vehicle equipment compartment with fiberglass panel edging and secondary support rails" },
          components: ["Equipment-door and removable-panel frames", "Cable-protection covers and compartment edging", "Secondary rails for approved equipment attachments"],
          checksTitle: "Design and approval checks",
          checks: ["Equipment mass, local loads and access-door cycles", "Chemical, UV and road-salt exposure", "Inspection, replacement and compatible fasteners"],
          links: [
            { label: "FRP square tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube" },
            { label: "FRP angles", href: "/products/fiberglass-structural-shapes/frp-angle" },
          ],
        },
      ],
    },
    selection: {
      title: "Match a starting profile to the component duty",
      intro: "A direct copy of a steel or aluminum section may miss the stiffness, crash response or joint performance required of a composite. Use these starting shapes to frame the inquiry; final geometry and material follow the installed-part requirements.",
      head: ["Candidate component", "Starting profile", "What decides the specification"],
      rows: [
        { need: "Bus skirt, luggage rack or duct support", product: "Custom flange, channel or hollow section", href: "/products/custom-pultruded-profiles", check: "Fixture, debris or latch loads; joint fatigue; finish; fire scope" },
        { need: "Passenger-car bumper, sill or seat member", product: "Custom multi-cell or reinforced beam section", href: "/products/custom-pultruded-profiles", check: "OEM crash or restraint cases; load path; inserts and repair" },
        { need: "EV pack rail, cell restraint or cover edge", product: "Custom rail, bar or edge profile", href: "/products/custom-pultruded-profiles", check: "Pack crush; clamp retention; seal; electrical and fire duty" },
        { need: "Truck body or refrigerated-wall sidepost", product: "Custom rail or sidepost matched to the wall stack", href: "/products/custom-pultruded-profiles", check: "Cargo impact; fastening; sealing; complete-wall thermal test" },
        { need: "Rail exterior or interior detail", product: "Custom rail, cover or formed edge profile", href: "/products/custom-pultruded-profiles", check: "Fire requirement set; joint fatigue; finish and access" },
        { need: "Specialty body compartment", product: "Custom section, or a standard tube or angle verified for the duty", href: "/products/fiberglass-structural-shapes", check: "Equipment loads; exposure; service replacement" },
      ],
      notes: [
        { title: "Specify the supplied state", text: "State whether the order covers raw lengths, cut and drilled parts, coated pieces or an assembly. The drawing should identify critical dimensions, appearance, inserts and the inspection points needed for that state." },
        { title: "State the acceptance basis per component", text: "Crash, restraint and high-voltage parts follow the OEM's or system supplier's tests. For refrigerated bodies, compare finished walls or bodies for thermal performance; for rail, specify the component's fire requirement set and hazard level." },
      ],
    },
    references: {
      intro: "Public context for lightweighting and location-specific fire requirements. Crash, restraint and battery-system acceptance references are set by each OEM program and are not listed here. These sources do not certify an F1 profile, establish an installed-part weight saving or replace the customer's acceptance plan.",
      links: [
        { source: "U.S. DOE", label: "Lightweight materials for cars and trucks", href: "https://www.energy.gov/cmei/vehicles/lightweight-materials-cars-and-trucks", text: "Background on vehicle lightweighting; installed-part savings still require a like-for-like design comparison." },
        { source: "BSI", label: "EN 45545-2:2020+A1:2023: fire behavior of materials and components for railway vehicles", href: "https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000030334174", text: "Rail fire requirements are assigned to the part and operating context by the customer." },
        { source: "EUR-Lex", label: "UN Regulation No. 118: burning behavior of materials in buses (EU Official Journal text)", href: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AL_202600535", text: "Applies to M3 Class II and III buses and specified material locations; confirm the series of amendments in force for the bus program." },
      ],
    },
    resources: [
      { label: "Test reports and their scope", href: "/resources/evidence" },
      { label: "Technical data", href: "/resources/technical-data" },
      { label: "Design guides", href: "/resources/design-guides" },
    ],
  },
} satisfies Record<string, IndustryGuide>;
