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
      "(Glass) Fiber Reinforced Polymer or Plastic — the common UK, European, and Australian name for glass-fiber FRP. GRP and GFRP are interchangeable with 'fiberglass FRP'; the term specifies that the reinforcement is glass fiber.",
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
      "A matrix with superior resistance to acids, chlorides, hydrolysis, and osmotic blistering, specified for marine and aggressive chemical environments. Heat deflection temperature roughly 105–120 °C; typically adds 15–30% to profile cost.",
  },
  {
    id: "polyurethane-resin",
    term: "Polyurethane (PU) resin",
    category: "Materials & constituents",
    definition:
      "A tough, fast-curing matrix with 3–5× the flexural toughness of polyester, used where impact resistance matters — for example rail interiors and EV battery trays.",
  },
  {
    id: "phenolic-resin",
    term: "Phenolic resin",
    category: "Materials & constituents",
    definition:
      "A fire-performance matrix achieving Class 1 surface spread of flame (BS 476 Part 7) with low smoke and low toxicity. Specified for offshore platforms, tunnels, and rail interiors governed by EN 45545-2.",
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
      "A constant-cross-section FRP shape produced by pultrusion — I-beam, channel, angle, tube, flat bar, rod, window section, or custom geometry. Because the cross-section is constant, profiles can be made in effectively unlimited lengths (cut to 6 m or 12 m for shipping).",
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
      "The time to design and machine a new steel die for a custom profile — typically 4–8 weeks, after which production samples follow within 6–10 weeks. Tooling is a one-off cost amortized across the first production run.",
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
      "A measure of resistance to bending deflection — typically 12–20 GPa for pultruded FRP, roughly one tenth of steel's 200 GPa. Because modulus is low, deflection (not strength) usually governs FRP structural design. Measured per ASTM D790.",
  },
  {
    id: "interlaminar-shear-strength",
    term: "Interlaminar shear strength (ILSS)",
    category: "Mechanical & physical properties",
    definition:
      "The resistance to shear failure between the composite's layers, an indicator of fiber-resin bond quality — typically 20–30 MPa. Low ILSS shows up as delamination. Measured by the short-beam method, ASTM D2344.",
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
      "Slow deformation under sustained load over time. Polyester-matrix FRP creeps under long-term high stress, so design codes apply a reduction factor (typically 0.25–0.35) to allowable stresses for permanent loads.",
  },
  {
    id: "dielectric-strength",
    term: "Dielectric strength",
    category: "Mechanical & physical properties",
    definition:
      "The voltage a material insulates before electrical breakdown — 10–14 kV/mm for FRP. Combined with its non-conductivity, this is why FRP is specified for substations, rail insulators, and RF-transparent structures.",
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
      "A stock pultruded shape in a catalog size — I-beam, channel, angle, square/round tube, flat bar, or rod — available without custom tooling and with short lead times (typically 2–4 weeks).",
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
      "Grating assembled from pultruded I-bar or T-bar bearing bars, giving high unidirectional load capacity and long spans (up to ~5 m). Chosen over molded grating where higher load rating or longer span is required.",
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
      "A US highway bridge loading classification (a 20-ton design truck) used to rate FRP deck panels for vehicular traffic. H-5 and H-10 cover lighter loads; H-20 is the heavy-vehicle rating.",
  },

  // ── Fenestration ────────────────────────────────────────────────────────
  {
    id: "u-value",
    term: "U-value (thermal transmittance)",
    category: "Fenestration",
    definition:
      "The rate of heat loss through a window or frame, in W/m²·K — lower is better. F1 Composite FRP windows reach whole-window U-values down to 0.78 W/m²·K. Calculated per EN ISO 10077-1.",
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
      "A rigorous low-energy building standard from the Passive House Institute (PHI). F1 Composite's 90-series FRP window frame is PHI-certified, qualifying it for Passivhaus and ultra-low-energy buildings.",
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
      "The US standard specification for dimensional tolerance of thermosetting glass-reinforced pultruded shapes (typically ±0.25 mm). Often cited alongside EN 13706 to define acceptable profile geometry.",
  },
  {
    id: "asce-sei-74-23",
    term: "ASCE/SEI 74-23",
    category: "Standards & design codes",
    definition:
      "The US Pre-Standard for Load and Resistance Factor Design (LRFD) of pultruded FRP structures. It provides the design procedures — including essential buckling checks — for using FRP as primary structure. EN 13706 and the EUROCOMP Design Code are the European counterparts.",
  },
];
