import { supplyTerms, weeks } from "./company";

export type GlossaryTerm = {
  /** URL anchor slug, also used as the DefinedTerm @id fragment. */
  id: string;
  term: string;
  category: GlossaryCategory;
  definition: string;
};

export type GlossaryCategory =
  | "Materials & constituents"
  | "The pultrusion process"
  | "Mechanical & physical properties"
  | "Products & forms"
  | "Fenestration"
  | "Standards & design codes";

export const glossaryCategories: GlossaryCategory[] = [
  "Materials & constituents",
  "The pultrusion process",
  "Mechanical & physical properties",
  "Products & forms",
  "Fenestration",
  "Standards & design codes",
];

export const glossaryTerms: GlossaryTerm[] = [
  // ── Materials & constituents ────────────────────────────────────────────
  {
    id: "frp",
    term: "FRP (Fiber Reinforced Polymer)",
    category: "Materials & constituents",
    definition:
      "A composite material made of a thermoset polymer resin matrix reinforced with high-strength fibers, most commonly E-glass. The fibers carry the mechanical load; the resin transfers load between fibers and protects them from the environment. FRP is the generic North American term and may use glass, carbon, aramid, or basalt reinforcement.",
  },
  {
    id: "grp-gfrp",
    term: "GRP / GFRP",
    category: "Materials & constituents",
    definition:
      "GRP means Glass Reinforced Plastic; GFRP means Glass Fiber Reinforced Polymer or Plastic. Both specify the glass-reinforced subset of FRP, not carbon or basalt composites. GRP is common in UK and European product literature; other markets use both FRP and GRP. The abbreviation alone does not define a resin, grade or performance rating.",
  },
  {
    id: "fiberglass",
    term: "Fiberglass",
    category: "Materials & constituents",
    definition:
      "Informal term that refers either to the raw E-glass fiber reinforcement or to the finished glass-FRP composite. Strictly, fiberglass is the fiber and FRP is the finished composite — so a 'fiberglass I-beam' is a pultruded FRP I-beam reinforced with E-glass.",
  },
  {
    id: "resin-matrix",
    term: "Resin matrix",
    category: "Materials & constituents",
    definition:
      "The thermoset polymer that binds the reinforcement, transfers stress between fibers, and resists the service environment. Typical matrices are isophthalic polyester, vinyl ester, polyurethane, phenolic, and epoxy. Matrix choice sets chemical resistance, fire performance, and temperature limit.",
  },
  {
    id: "e-glass-roving",
    term: "E-glass roving",
    category: "Materials & constituents",
    definition:
      "Continuous bundles of electrical-grade glass filaments aligned in the lengthwise direction of a pultruded profile. Roving is the dominant reinforcement by mass and carries the axial (longitudinal) load. ECR-glass is a corrosion-resistant variant.",
  },
  {
    id: "continuous-strand-mat",
    term: "Continuous strand mat (CSM)",
    category: "Materials & constituents",
    definition:
      "A randomly oriented glass-fiber mat layered between roving to add transverse strength and through-thickness integrity, reducing the directional weakness of unidirectional roving alone.",
  },
  {
    id: "surfacing-veil",
    term: "Surfacing veil",
    category: "Materials & constituents",
    definition:
      "A thin (0.2–0.4 mm) polyester or C-glass veil applied at the profile surface to create a resin-rich, UV-stable outer skin that protects the structural reinforcement from weathering and chemical attack.",
  },
  {
    id: "polyester-resin",
    term: "Isophthalic polyester resin",
    category: "Materials & constituents",
    definition:
      "The general-purpose structural matrix offering the best cost/performance balance. Heat deflection temperature roughly 90–100 °C. Suitable for most dry, mildly corrosive, and outdoor applications when paired with a UV-stable veil.",
  },
  {
    id: "vinyl-ester-resin",
    term: "Vinyl ester resin",
    category: "Materials & constituents",
    definition:
      "A matrix with superior resistance to acids, chlorides, hydrolysis, and osmotic blistering, specified for marine and aggressive chemical environments. Heat deflection temperature roughly 105–120 °C; typically adds about 10–25% to profile cost.",
  },
  {
    id: "polyurethane-resin",
    term: "Polyurethane (PU) resin",
    category: "Materials & constituents",
    definition:
      "A tough, fast-curing matrix with markedly higher toughness than polyester, used where impact resistance matters, for example rail interiors and EV battery trays.",
  },
  {
    id: "phenolic-resin",
    term: "Phenolic resin",
    category: "Materials & constituents",
    definition:
      "A fire-performance matrix with low smoke and low toxicity; phenolic laminates can reach Class 1 surface spread of flame under BS 476 Part 7, confirmed by a report for the specific laminate. Specified for offshore platforms, tunnels, and rail interiors governed by EN 45545-2.",
  },
  {
    id: "fiber-volume-fraction",
    term: "Fiber content / fiber volume fraction",
    category: "Materials & constituents",
    definition:
      "The proportion of reinforcement in the composite, usually quoted as glass content by weight (typically 60–70% for pultruded structural profiles). Higher fiber content raises strength and stiffness. Verified by burn-off testing per ASTM D2584.",
  },

  // ── The pultrusion process ──────────────────────────────────────────────
  {
    id: "pultrusion",
    term: "Pultrusion",
    category: "The pultrusion process",
    definition:
      "A continuous, automated manufacturing process that pulls reinforcing fibers through a resin bath (or injection chamber) and then a heated steel die, where the resin cures into a constant-cross-section FRP profile. Production runs at 0.3–1.5 m/min and the name combines 'pull' and 'extrusion'.",
  },
  {
    id: "pultruded-profile",
    term: "Pultruded profile",
    category: "The pultrusion process",
    definition:
      `A constant-cross-section FRP shape produced by pultrusion — I-beam, channel, angle, tube, flat bar, rod, window section, or custom geometry. Because the cross-section is constant, profiles can be made in effectively unlimited lengths; the standard cut length is ${supplyTerms.standardLengthM} m, and other lengths are cut to order.`,
  },
  {
    id: "creel",
    term: "Creel",
    category: "The pultrusion process",
    definition:
      "The frame at the start of a pultrusion line that holds thousands of roving packages and feeds them, aligned and under tension, into the resin impregnation stage.",
  },
  {
    id: "heated-die",
    term: "Heated die",
    category: "The pultrusion process",
    definition:
      "The precision-machined steel tool (typically held at 120–180 °C) that shapes the impregnated fiber bundle and cures the resin into its final geometry. Die design and tolerance govern the profile's dimensional accuracy.",
  },
  {
    id: "gel-coat",
    term: "Gel coat",
    category: "The pultrusion process",
    definition:
      "A pigmented resin-rich surface layer that provides color, gloss, and additional UV and chemical protection. An alternative to a UV-stable polyurethane topcoat or integral pigmentation.",
  },
  {
    id: "tooling-lead-time",
    term: "Tooling lead time",
    category: "The pultrusion process",
    definition:
      `The time to design and machine a new steel die for a custom profile, typically ${weeks(supplyTerms.dieManufactureWeeks)}. From approved drawing to first delivery, a new-die profile typically takes ${weeks(supplyTerms.newDieLeadTimeWeeks)}, including the die, trial run and first production. Tooling is a one-off cost amortized across the first production run.`,
  },
  {
    id: "extrusion-plastics",
    term: "Extrusion (plastics)",
    category: "The pultrusion process",
    definition:
      "A process that pushes heated material through a die under pressure: unreinforced or short-fiber-filled thermoplastics such as PVC, and metals such as aluminum. Unlike pultrusion, extrusion does not pull continuous fiber reinforcement through the die, so extruded profiles cannot match the longitudinal tensile strength or stiffness of pultruded FRP. See a full process and property comparison at /technology/pultrusion-vs-extrusion-filament-winding.",
  },
  {
    id: "filament-winding",
    term: "Filament winding",
    category: "The pultrusion process",
    definition:
      "A process that winds continuous fiber, wetted with resin, around a rotating mandrel to build up hollow, typically round or tapered shapes such as tanks, pipes, and pressure vessels. Unlike pultrusion, filament winding is not a continuous constant-cross-section process and cannot economically produce open sections like I-beams, channels, or angles. See a full process and property comparison at /technology/pultrusion-vs-extrusion-filament-winding.",
  },

  // ── Mechanical & physical properties ────────────────────────────────────
  {
    id: "tensile-strength",
    term: "Tensile strength",
    category: "Mechanical & physical properties",
    definition:
      "The maximum lengthwise stress a profile withstands before failure — typically 240–400 MPa for E-glass/polyester pultrusions (comparable to A36 steel) at about one quarter of the weight. Measured per ASTM D638.",
  },
  {
    id: "flexural-modulus",
    term: "Flexural modulus (stiffness)",
    category: "Mechanical & physical properties",
    definition:
      "A measure of resistance to bending deflection. Longitudinal modulus for pultruded glass FRP is typically about 17–30 GPa (EN 13706-3 sets minimums of 23 GPa and 17 GPa for its two structural grades), roughly one ninth to one tenth of steel's 200 GPa. Because modulus is low, deflection (not strength) usually governs FRP structural design. Measured per ASTM D790.",
  },
  {
    id: "interlaminar-shear-strength",
    term: "Interlaminar shear strength (ILSS)",
    category: "Mechanical & physical properties",
    definition:
      "The resistance to shear failure between the composite's layers, an indicator of fiber-resin bond quality. EN 13706-3 sets minimums of 25 MPa and 15 MPa for its two structural grades. Low ILSS shows up as delamination. Measured by the short-beam method, ASTM D2344.",
  },
  {
    id: "barcol-hardness",
    term: "Barcol hardness",
    category: "Mechanical & physical properties",
    definition:
      "A quick surface-hardness reading (typically 40–55 for pultruded FRP) used as a production check that the resin is fully cured. Measured per ASTM D2583.",
  },
  {
    id: "cte",
    term: "Coefficient of thermal expansion (CTE)",
    category: "Mechanical & physical properties",
    definition:
      "How much the material expands per degree of temperature change — about 8 × 10⁻⁶ /°C lengthwise for pultruded FRP, close to glass and much lower than aluminum, which is why FRP window frames stay dimensionally stable.",
  },
  {
    id: "creep",
    term: "Creep",
    category: "Mechanical & physical properties",
    definition:
      "Slow deformation under sustained load over time, increasing with stress level and temperature. Design methods limit it: LRFD design of pultruded FRP applies a time-effect factor λ as low as 0.4 for permanent loads, and ACI CODE-440.11-22 limits sustained stress in GFRP bars to 0.30 of their design tensile strength.",
  },
  {
    id: "dielectric-strength",
    term: "Dielectric strength",
    category: "Mechanical & physical properties",
    definition:
      "The electric field a material withstands before breakdown, measured to ASTM D149 or IEC 60243-1. Published pultruded-profile references are around 7.9 kV/mm (200 V/mil) through the thickness; resin, glass content, thickness, moisture and test method change the value. Combined with its non-conductivity, this is why FRP is specified for substations, rail insulators, and RF-transparent structures.",
  },
  {
    id: "hdt-tg",
    term: "HDT / glass transition temperature (Tg)",
    category: "Mechanical & physical properties",
    definition:
      "Temperature limits of the cured resin. Heat deflection temperature (HDT) marks where the matrix softens under load — about 90–100 °C for polyester, 105–120 °C for vinyl ester, 140–160 °C for phenolic. Service temperature should stay safely below these.",
  },

  // ── Products & forms ────────────────────────────────────────────────────
  {
    id: "standard-profile",
    term: "Standard profile",
    category: "Products & forms",
    definition:
      `A catalog pultruded shape (I-beam, channel, angle, square or round tube, flat bar, or rod) made on an existing die, so no custom tooling is needed. Catalog sections are produced to order and ship in ${weeks(supplyTerms.catalogLeadTimeWeeks)}.`,
  },
  {
    id: "custom-pultrusion",
    term: "Custom pultrusion",
    category: "Products & forms",
    definition:
      "A bespoke cross-section produced from a purpose-built die — at F1 Composite up to 600 × 300 mm, with tailored fiber architecture and resin. Used when no standard profile fits the structural or assembly requirement.",
  },
  {
    id: "molded-grating",
    term: "Molded grating",
    category: "Products & forms",
    definition:
      "FRP grating made by laying reinforcement into a mold, giving bidirectional strength and good corrosion resistance. Common mesh sizes 25 × 25 mm and 38 × 38 mm; panel thickness 25–50 mm. Favored for chemical environments and lower load spans.",
  },
  {
    id: "pultruded-grating",
    term: "Pultruded grating",
    category: "Products & forms",
    definition:
      "Grating assembled from pultruded I-bar or T-bar bearing bars, giving high load capacity in the bearing-bar direction and longer spans than molded grating of the same depth. Chosen over molded grating where a higher load rating or longer span is required; the clear span is read from the load table for the chosen depth and load.",
  },
  {
    id: "structural-deck-panel",
    term: "Structural deck panel",
    category: "Products & forms",
    definition:
      "A closed-top pultruded plank (depth 40–100 mm) used for pedestrian and vehicular decks, including FRP bridge-deck replacement. Spans up to 3.6 m pedestrian, with AASHTO H-5/H-10/H-20 vehicular load ratings available.",
  },
  {
    id: "aashto-h20",
    term: "AASHTO H-20 load rating",
    category: "Products & forms",
    definition:
      "A US highway loading classification (a two-axle, 20-ton design truck) used to rate FRP deck panels for vehicular traffic. H-5 and H-10 cover lighter loads. The H trucks come from the legacy AASHTO Standard Specifications; new highway bridges are designed to the HL-93 live load of the AASHTO LRFD specifications, so state which basis the project uses.",
  },

  // ── Fenestration ────────────────────────────────────────────────────────
  {
    id: "u-value",
    term: "U-value (thermal transmittance)",
    category: "Fenestration",
    definition:
      "The rate of heat loss through a window or frame, in W/m²·K; lower is better. The PHI certificate for the 90-series GFRP window gives a whole-window U_w of 0.78 W/m²·K for the standard test size with 0.70 W/m²·K glazing. Calculated per EN ISO 10077-1, with frame values per EN ISO 10077-2.",
  },
  {
    id: "thermal-break",
    term: "Thermal break",
    category: "Fenestration",
    definition:
      "An insulating barrier inserted into a conductive frame (typically aluminum) to slow heat transfer. FRP frames need no thermal break because the composite already conducts heat at ~1/500 the rate of aluminum.",
  },
  {
    id: "passive-house-phi",
    term: "Passive House / PHI certification",
    category: "Fenestration",
    definition:
      "A rigorous low-energy building standard from the Passive House Institute (PHI). The 90-series GFRP window made by Chongqing Xianju New Material holds PHI component certificate 2491wi03 (efficiency class phB, cool-temperate climate), so it can be used in Passivhaus and ultra-low-energy buildings.",
  },

  // ── Standards & design codes ────────────────────────────────────────────
  {
    id: "en-13706",
    term: "EN 13706",
    category: "Standards & design codes",
    definition:
      "The European standard for structural pultruded profiles. It defines minimum-property grades E17 and E23, test methods, and classification — the usual specification reference for FRP profiles in Europe.",
  },
  {
    id: "astm-d3917",
    term: "ASTM D3917",
    category: "Standards & design codes",
    definition:
      "The US standard specification for dimensional tolerance of thermosetting glass-reinforced pultruded shapes. Its tolerances vary by feature and size (wall thickness, overall dimensions, angles, flatness, straightness, twist and length). Often cited alongside EN 13706 to define acceptable profile geometry.",
  },
  {
    id: "asce-sei-74-23",
    term: "ASCE/SEI 74-23",
    category: "Standards & design codes",
    definition:
      "The ASCE standard for Load and Resistance Factor Design (LRFD) of pultruded FRP structures, published in 2023 to replace the 2010 ASCE/ACMA pre-standard. It provides the design procedures for members and connections, including buckling checks, for using FRP as primary structure. In Europe, CEN/TS 19101:2022 is the design counterpart, while EN 13706 specifies the profiles.",
  },
];
