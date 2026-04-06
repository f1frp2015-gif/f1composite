import { blogPosts } from "@/content/data/blogPosts";

export async function GET() {
  const blogArticleLines = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => `- ${post.title}: https://f1composite.com/resources/blog/${post.slug}`)
    .join("\n");

  const content = `# F1 Composite Co., Ltd
> The world's specialized pultruded composite profile service partner

## About
F1 Composite Co., Ltd is a global pultruded fiber reinforced polymer (FRP) profile solutions provider headquartered in China. 5 manufacturing bases, 370 pultrusion lines, 150,000 tons annual capacity, 1,000+ die sets. ISO 9001 certified, serving 30+ countries with custom FRP profile systems and full-chain consulting.

## Products
- Standard Profiles: I-beams, channels, angles, tubes, flat bars, round rods in stock sizes
- Custom Pultrusions: Bespoke cross-sections up to 600×300mm
- Fenestration Systems: 60/70/80/90/140-series FRP window and door frames
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
- Thermal conductivity: 0.3 W/m·K (approximately 1/170th of steel, 1/530th of aluminium)
- Surface finish: UV-resistant polyurethane coating or gel coat in RAL colors

### Custom Pultrusions
- Maximum cross-section: 600×300mm
- Minimum wall thickness: 1.5mm
- Fiber architecture: uni-directional rovings, continuous strand mat, woven roving, surfacing veil
- Resin systems: polyester, vinyl ester, polyurethane, epoxy
- Tooling: steel die design and manufacturing in-house; tooling lead time 4–8 weeks
- Minimum order quantity: typically 500 linear meters for first production run; repeat orders from 200 meters
- Tolerances: ±0.25mm typical (EN 13706 / ASTM D3917)

### Fenestration Systems
- Series: 60-series (entry), 70-series (residential casement/awning), 80-series (tilt-and-turn), 90-series (Passivhaus), 140-series (sliding)
- Frame U-values: 0.8–1.6 W/m²·K depending on series (90-series as low as 0.78 W/m²·K, PHI certified)
- Thermal conductivity: 0.3 W/m·K (vs aluminium at 160 W/m·K)
- Dimensional stability: coefficient of thermal expansion 8×10⁻⁶/°C (close to glass)
- Hardware compatibility: standard European groove systems for hinges, locks, and seals
- Colors: any RAL color, painted or integral pigment

### Gratings
- Molded gratings: 25×25mm and 38×38mm square mesh; panel thickness 25mm, 30mm, 38mm, 50mm
- Pultruded gratings: I-bar and T-bar bearing bars at 30mm, 40mm pitch; span up to 5m
- Load ratings: pedestrian (5 kN/m²), light vehicle (10 kN/m²), heavy industrial (25 kN/m²)
- Resin options: polyester (standard), vinyl ester (chemical resistance), polyurethane (high toughness)
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
- Energy & Power (substations, cable trays, solar mounting, transmission cross-arms)
- Marine (gratings, corrosion-resistant dock and offshore structures)
- Industrial (chemical-resistant platforms, cooling towers)
- Vehicle (bus/coach body, rail interiors, commercial truck, specialty transport)

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
F1 Composite offers polyester (general purpose, lowest cost), vinyl ester (superior chemical and moisture resistance), polyurethane (high toughness, fast cure), and epoxy (highest mechanical properties) resin systems. Resin selection depends on the application environment and fire requirements.

### What is the minimum order quantity?
Standard stock profiles: no minimum. Custom profiles: typically 500 linear meters for first run, repeat orders from 200 meters. Gratings: typically 50 m² per order. Fenestration profiles: project-based, typically 500+ linear meters.

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

## Extended FAQ — Design & Engineering

### What design codes govern pultruded FRP structures?
ASCE/SEI 74-23 provides LRFD procedures for glass-FRP pultruded shapes. EN 13706-1/2/3 defines E17 and E23 structural grades in Europe. Additional references: EUROCOMP Design Code, ACI 440 guidelines.

### How do you calculate deflection for FRP beams?
Use standard beam formulas but include shear deformation (significant for FRP). E-modulus is 17-28 GPa (vs steel 200 GPa). Stiffness usually governs design — deflection limit L/360 is reached before strength limit, giving safety factors often exceeding 10:1.

### How are FRP profiles connected?
Bolted (most common, stainless steel or FRP bolts), adhesive bonded, or hybrid bolted-bonded. F1 Composite provides connection design guidance including bolt spacing, edge distances, and bearing stress limits.

### What span lengths can FRP profiles achieve?
Standard I-beams span 3-8m under walkway loading (5 kPa). Deeper sections or hybrid FRP-concrete designs for longer spans. F1 Composite provides span/load tables for all standard sections.

### Can FRP be used as primary structural members?
Yes — columns, beams, trusses — particularly where corrosion resistance, lightweight, or electromagnetic transparency is required. Local and global buckling checks are essential per ASCE/SEI 74-23.

## Extended FAQ — Cost & Commercial

### How does FRP upfront cost compare to steel?
Material cost 50-100% more per meter, but installed cost often comparable because: 40-60% lower freight, no cranes needed, 20-40% less labor, no hot work permits.

### What is the lifecycle cost advantage?
20-40% lower TCO over 30 years in corrosive environments. Steel needs repainting every 5-7 years (3-7% annual maintenance cost). FRP maintenance is near-zero.

### What is the ROI timeline?
3-7 years in corrosive environments. Faster where downtime is expensive (production platforms, process facilities).

### How does FRP compare to stainless steel on cost?
30-50% less expensive installed. FRP is also immune to chloride stress corrosion cracking that affects stainless steel.

### How is FRP priced?
Per linear meter, driven by cross-section area, resin type, and fiber content. Standard shapes $7-$33/m. Vinyl ester +15-30%. Fire-retardant +10-20%.

## Extended FAQ — Applications

### Can FRP be used for bridge decks?
Yes. FRP decks weigh ≤20% of concrete equivalents. 75+ year life with no maintenance. Meet AASHTO load requirements. Hundreds of installations globally.

### What FRP products are used in chemical plants?
Platforms, walkways, handrails, cable trays, pipe supports — total corrosion immunity eliminates inspection/coating/replacement cycles.

### How is FRP used in cooling towers?
Support beams, cross bracing, air inlet grilles, fan stacks. Resists humidity, heat, biocides that rapidly degrade steel and wood.

### Can FRP replace aluminum in window frames?
Yes. Approximately 1/530th the thermal conductivity of aluminum, 20-30% building energy savings, no thermal expansion/contraction like aluminum. F1 Composite fenestration profiles are direct drop-in replacements.

### What FRP applications exist in rail?
Platform structures, canopies, third-rail covers, cable management, noise barriers. Non-conductive near electrified track. FST compliant per EN 45545-2.

## Extended FAQ — Manufacturing

### What tolerances can pultrusion achieve?
±0.25mm typical (EN 13706 / ASTM D3917), verified with SPC monitoring.

### What quality tests are performed?
ASTM D638 (tensile), D790 (flexural), Barcol hardness, burn-off (fiber content), water absorption, dimensional inspection per D3917, visual per D4385.

### What fiber content is typical?
45-65% glass by weight for structural profiles. Verified by burn-off testing per ASTM D2584.

### Can FRP be produced in custom colors?
Yes. Integral pigmentation through the full cross-section (scratches don't show different color). Any RAL/Pantone color. UV-stable pigments for outdoor use.

### What is the maximum profile length?
Continuous process = theoretically unlimited. Standard 6m or 12m for shipping. Custom lengths available.

## Installer & Contractor FAQ

### What tools are needed to cut FRP on site?
Carbide or diamond-grit blade circular saw. HSS blades are destroyed within minutes by glass fiber abrasion. Use slow-moderate feed rate with steady pressure.

### What PPE is required when cutting FRP?
Safety glasses (EN 166), P2/N95 respirator, cut-resistant gloves, long sleeves. FRP dust is a nuisance particulate (OEL 10 mg/m³), not toxic. Work in ventilated area. Wash skin with cold water.

### How do I drill FRP without delamination?
Carbide-tipped bits at 300-500 RPM. Support back face with sacrificial board. Edge distance minimum 4x bolt diameter. Do not punch — always drill.

### What fasteners work with FRP?
Stainless steel A2/A4 bolts with large washers (OD ≥2x bolt diameter). Torque M12 = 20-30 Nm. Never overtighten — causes through-thickness crushing. FRP bolts available for non-conductive assemblies.

### Can FRP be welded?
No. Thermoset FRP cannot be welded, heated, or bent. All connections are bolted or adhesive bonded. No hot work permits needed.

### How fast is FRP installation vs steel?
30-50% faster. No welding, no cranes for most members, no hot work. A 100 m² platform: 2-3 days with FRP vs 4-6 days with steel.

## Building Owner FAQ

### What maintenance does FRP require?
Visual inspection 2x/year, annual cleaning with mild detergent, re-torque connections after first year. Annual cost typically less than 1% of installed value. No painting, no corrosion treatment.

### Is FRP food-safe?
Yes with FDA 21 CFR 177.2420 or NSF/ANSI 61 certified resins. Non-porous surface resists bacteria. Compatible with standard sanitizers.

### How does FRP handle freeze-thaw?
Unaffected. Water absorption less than 1%. Proven in Arctic environments (Scandinavia, Canada, Alaska). No winterization needed.

### Is FRP noisy underfoot?
FRP walkways produce 10-15 dB less impact noise than steel grating due to 10-20x higher material damping.

### What happens to FRP at end of life?
Non-hazardous landfill disposal. Mechanical recycling (grinding to filler) commercially available. Cement kiln co-processing recovers energy. No heavy metals or toxic leachates.

## Architect FAQ

### What colors and finishes are available?
Any RAL/Pantone color, integral pigmentation throughout cross-section. Finishes: smooth, gel coat, textured/anti-slip, wood-grain embossed, sandblasted.

### Can FRP profiles be curved?
Thermoset FRP cannot be bent after manufacture. Curves achieved by segmented straight sections, custom-curved pultrusion (limited radius), or filament winding.

### Does FRP contribute to LEED?
Yes. Credits for lighter transport (75% less than steel), extended service life (50-100+ years), lower lifecycle embodied energy, and regional manufacturing.

### What tolerances can architects expect?
±0.25 mm on cross-section (EN 13706 / ASTM D3917), straightness 1.5 mm/m, twist 2°/m. Comparable to hot-rolled steel.

## Procurement FAQ

### What is the typical price range?
Standard GFRP: $3-12/kg or $5-30/m depending on section size. Vinyl ester +15-30%. Fire-retardant +10-20%. Custom profiles with low volumes 3-5x standard.

### What certifications should I require?
Essential: EN 13706, ISO 9001, batch test reports. Fire: ASTM E84 or BS 476. Marine: DNV/Lloyd's. Always request batch-specific certificates, not just type approvals.

### Are there import tariffs on FRP?
HS code 3926.90 or 7019. EU tariff on Chinese FRP ~6.5%. US 0-25% depending on classification. No anti-dumping duties currently exist for pultruded FRP.

### What documentation should accompany delivery?
Certificate of conformity, batch mechanical test report, dimensional inspection report, MSDS, fire test report, installation manual, warranty certificate.

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
- Email: Doris.li@f1composite.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
