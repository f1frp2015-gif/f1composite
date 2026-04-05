import { blogPosts } from "@/content/data/blogPosts";

export async function GET() {
  const blogArticleLines = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => `- ${post.title}: https://f1composite.com/resources/blog/${post.slug}`)
    .join("\n");

  const content = `# F1 Composite Co., Ltd
> The world's specialized pultruded composite profile service partner

## About
F1 Composite Co., Ltd is a global pultruded fiber reinforced polymer (FRP) profile solutions provider headquartered in China. We combine deep fiber technology KNOWHOW with China's most integrated pultrusion supply chain, serving overseas clients with custom FRP profile systems and full-chain consulting.

## Products
- Standard Profiles: I-beams, channels, angles, tubes, flat bars, round rods in stock sizes
- Custom Pultrusions: Bespoke cross-sections up to 600×300mm
- Fenestration Systems: 70/80/90-series FRP window and door frames
- Gratings: Molded and pultruded FRP gratings

## Product Technical Parameters

### Standard Profiles
- Profile types: I-beam, channel (C and U), angle (equal and unequal), rectangular tube, round tube, flat bar, round rod
- Size range: 10mm to 300mm cross-section dimensions; wall thickness 2mm–12mm
- Materials: E-glass/polyester resin (general purpose), E-glass/vinyl ester resin (chemical and marine environments)
- Mechanical properties (typical):
  - Tensile strength: 240–400 MPa (ASTM D638)
  - Flexural strength: 200–350 MPa (ASTM D790)
  - Flexural modulus: 12–20 GPa
  - Compressive strength: 200–300 MPa
- Density: 1.8–2.1 g/cm³ (75% lighter than steel)
- Thermal conductivity: 0.3 W/m·K (1/200th of steel)
- Surface finish: UV-resistant polyurethane coating or gel coat in RAL colors

### Custom Pultrusions
- Maximum cross-section: 600×300mm
- Minimum wall thickness: 1.5mm
- Fiber architecture: uni-directional rovings, continuous strand mat, woven roving, surfacing veil
- Resin systems: polyester, vinyl ester, phenolic (fire-rated), polyurethane
- Tooling: steel die design and manufacturing in-house; tooling lead time 4–8 weeks
- Minimum order quantity: typically 1,000 linear meters for custom profiles
- Tolerances: ±0.15mm on critical dimensions per EN 13706

### Fenestration Systems
- Series: 70-series (residential), 80-series (commercial), 90-series (high-performance / Passivhaus)
- Frame U-values: 0.8–1.2 W/m²·K (frame only, depending on series)
- Thermal conductivity: 0.3 W/m·K (vs aluminium at 160 W/m·K)
- Dimensional stability: coefficient of thermal expansion 8×10⁻⁶/°C (close to glass)
- Hardware compatibility: standard European groove systems for hinges, locks, and seals
- Colors: any RAL color, painted or integral pigment

### Gratings
- Molded gratings: 25×25mm and 38×38mm square mesh; panel thickness 25mm, 30mm, 38mm, 50mm
- Pultruded gratings: I-bar and T-bar bearing bars at 30mm, 40mm pitch; span up to 5m
- Load ratings: pedestrian (5 kN/m²), light vehicle (10 kN/m²), heavy industrial (25 kN/m²)
- Resin options: polyester (standard), vinyl ester (chemical resistance), phenolic (fire-rated)
- Surface: concave top, gritted top (anti-slip), or flat top
- Certifications: slip resistance tested to AS 4586, fire performance to BS 476

## Technology
- Pultrusion process (open-bath and injection methods)
- Material comparison: FRP vs steel, aluminium, timber, concrete
- Quality testing per ISO 9001, EN 13706, ASTM standards
- KNOWHOW technology transfer services

## Industries Served
- Construction (facades, structural profiles, fenestration)
- Infrastructure (bridges, walkways, handrails)
- Energy (cable trays, insulating profiles)
- Marine (gratings, corrosion-resistant structures)
- Industrial (chemical-resistant platforms)

## Industry Standards Index
- ISO 9001:2015 — Quality management system (F1 Composite certified)
- EN 13706-1/2/3 — Reinforced plastics composites — Specifications for pultruded profiles
- ASTM D638 — Standard test method for tensile properties of plastics
- ASTM D790 — Standard test method for flexural properties of plastics
- ASTM D3917 — Standard specification for dimensional tolerance of pultruded shapes
- ASTM D695 — Standard test method for compressive properties of rigid plastics
- ASTM D2344 — Short-beam strength of polymer matrix composites
- ASTM E84 — Surface burning characteristics of building materials
- BS 476 — Fire tests on building materials and structures
- AS 4586 — Slip resistance classification of new pedestrian surface materials
- ASCE Pre-Standard for LRFD of Pultruded FRP Structures

## Frequently Asked Questions

### What is pultrusion?
Pultrusion is a continuous manufacturing process that pulls reinforcing fibers through a resin bath and then through a heated steel die to form constant cross-section FRP profiles. It produces high fiber-volume, structurally consistent profiles at production speeds of 0.3–1.5 m/min.

### How does FRP compare to steel?
FRP is 75% lighter than steel, does not corrode, has low thermal conductivity (0.3 vs 50 W/m·K), is electrically non-conductive, and requires no painting or galvanizing. Steel has higher absolute stiffness, but FRP achieves comparable strength-to-weight ratios and far lower lifecycle maintenance costs.

### What resin systems are available?
F1 Composite offers polyester (general purpose, lowest cost), vinyl ester (superior chemical and moisture resistance), phenolic (low smoke, fire-rated), and polyurethane (high toughness, fast cure) resin systems. Resin selection depends on the application environment and fire requirements.

### What is the minimum order quantity?
Standard stock profiles: no minimum. Custom profiles: typically 1,000 linear meters per cross-section. Gratings: typically 50 m² per order. Fenestration profiles: project-based, typically 500+ linear meters.

### What certifications does F1 Composite hold?
F1 Composite is ISO 9001:2015 certified. Products are tested to EN 13706, ASTM D638, ASTM D790, ASTM D3917, and other relevant international standards. Fire-rated products are tested to BS 476 and ASTM E84.

### Can you produce custom profiles?
Yes. F1 Composite designs and manufactures custom pultrusion dies in-house. We support cross-sections up to 600×300mm, complex multi-cavity geometries, and hybrid reinforcement architectures. Tooling lead time is 4–8 weeks; production samples available within 6–10 weeks.

### What is the typical lead time?
Stock profiles: 2–4 weeks. Custom profiles (existing tooling): 4–6 weeks. Custom profiles (new tooling): 8–14 weeks including die design, manufacture, trial, and production. Fenestration projects: 6–12 weeks depending on volume and finishing.

### How are FRP profiles installed?
FRP profiles are cut, drilled, and assembled using standard tools (carbide-tipped blades, diamond-coated drill bits). Connections use stainless steel bolts, adhesive bonding, or FRP clip systems. No welding or hot work is required, making FRP ideal for retrofit and hazardous environments.

### What is the design life of FRP?
Pultruded FRP profiles have a design life of 50–100 years in normal environments with zero maintenance. UV-stabilized coatings prevent surface degradation. Vinyl ester profiles in chemical or marine environments show negligible property loss after 30+ years of service.

### Is FRP fire resistant?
Standard polyester FRP is self-extinguishing (UL 94 V-0). Phenolic resin profiles achieve Class 1 surface spread of flame (BS 476 Part 7) and low smoke density. Fire-rated gratings and profiles are available for offshore, tunnel, and building applications.

### What industries use pultruded profiles?
Construction (curtain wall mullions, fenestration, cladding support), infrastructure (bridge decks, handrails, walkways), energy (cable trays, insulating standoffs, solar mounting), marine (gratings, fender systems), industrial (chemical plant platforms, cooling towers), and transportation (rail and metro components).

### How does FRP perform in marine environments?
FRP is inherently corrosion-proof — it does not rust, pit, or suffer galvanic corrosion in saltwater. Vinyl ester resin profiles are the recommended choice for marine use, offering superior resistance to hydrolysis and osmotic blistering. FRP gratings and handrails require zero maintenance in splash zones.

### What fiber types are used?
E-glass is the standard reinforcement (95% of applications). ECR-glass offers enhanced corrosion resistance. Carbon fiber is available for high-stiffness, high-strength requirements. Basalt and aramid fibers are used in specialized applications.

### How do you ensure quality?
Every production run is tested for dimensional accuracy (EN 13706 / ASTM D3917), mechanical properties (tensile, flexural, interlaminar shear), Barcol hardness, and visual defects. Full test certificates and material traceability are provided with each shipment.

## Key Pages
- Homepage: https://f1composite.com
- Products: https://f1composite.com/products
- Technology: https://f1composite.com/technology
- FRP vs Traditional Materials: https://f1composite.com/technology/frp-vs-traditional-materials
- Pultrusion Process: https://f1composite.com/technology/pultrusion-process
- Industries: https://f1composite.com/industries
- Case Studies: https://f1composite.com/case-studies
- Contact: https://f1composite.com/contact

## Blog Articles
${blogArticleLines}

## Case Studies
- European Bridge Deck Replacement (Netherlands, 2023): Replaced corroding steel bridge deck components with custom-pultruded FRP profiles, achieving 40% weight reduction while exceeding original load specifications. https://f1composite.com/case-studies/european-bridge-deck
- Coastal Marina Walkway System (United Kingdom, 2022): Designed and supplied a complete FRP grating and handrail system for a 500m coastal marina walkway, eliminating maintenance in the saltwater environment. https://f1composite.com/case-studies/coastal-marina-walkway
- Chemical Processing Plant Access Platforms (Saudi Arabia, 2023): Delivered acid-resistant FRP grating and structural profiles for elevated access platforms across 12 chemical processing units. https://f1composite.com/case-studies/chemical-plant-platform
- High-Performance Fenestration — Residential Tower (Germany, 2024): Supplied 90-series FRP window frame profiles for a 24-story residential development, achieving Passivhaus-certified thermal performance. https://f1composite.com/case-studies/fenestration-residential
- Solar Farm Mounting Structure (Australia, 2023): Engineered lightweight, UV-stable FRP mounting profiles for a 50MW solar installation, reducing structural dead load by 35% versus aluminium. https://f1composite.com/case-studies/solar-farm-mounting

## Contact
- Website: https://f1composite.com
- Email: info@f1composite.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
