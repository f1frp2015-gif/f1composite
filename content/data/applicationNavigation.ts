/** Compact navigation shared by the menus and application directory. */
export const applicationNavigation = [
  {
    id: "power-electrical", label: "Power & electrical", href: "/applications#power-electrical",
    description: "Separate structural support, insulation and conductor duties before specifying the component.",
    links: [
      { label: "Transformer insulation", href: "/applications/frp-transformer-insulation-supports" },
      { label: "Switchgear components", href: "/applications/frp-switchgear-insulation-components" },
      { label: "Composite conductor cores", href: "/applications/composite-overhead-conductor-cores" },
      { label: "Live-line tool components", href: "/applications/frp-live-line-tool-components" },
      { label: "Utility crossarms", href: "/applications/frp-utility-crossarms" },
      { label: "Cable trays & ladders", href: "/applications/frp-cable-tray-supports" },
      { label: "Utility fencing", href: "/applications/frp-utility-fencing" },
      { label: "Solar mounting", href: "/applications/frp-solar-mounting-profiles" },
    ],
  },
  {
    id: "process-water", label: "Process plants & water", href: "/applications#process-water",
    description: "Match profiles to the fluid, temperature, mechanical load and maintenance access at each location.",
    links: [
      { label: "Wastewater clarifiers", href: "/applications/frp-wastewater-clarifier-components" },
      { label: "Pulp & paper mills", href: "/applications/frp-pulp-paper-mill-components" },
      { label: "Scrubbers & demisters", href: "/applications/frp-scrubber-demister-profiles" },
      { label: "Cooling towers", href: "/applications/frp-cooling-tower-profiles" },
      { label: "Chemical plant platforms", href: "/applications/frp-chemical-plant-platforms" },
      { label: "Swimming pool facilities", href: "/applications/frp-swimming-pool-facilities" },
    ],
  },
  {
    id: "transport-civil", label: "Transport & civil works", href: "/applications#transport-civil",
    description: "Coordinate the profile with the railway, civil or ground structure it serves and the responsible design team.",
    links: [
      { label: "Third-rail protection", href: "/applications/frp-third-rail-protection" },
      { label: "Rail vehicle interiors", href: "/applications/frp-rail-interior-profiles" },
      { label: "CFRP concrete strengthening", href: "/applications/cfrp-concrete-strengthening" },
      { label: "Bridge deck panels", href: "/applications/frp-bridge-deck-panels" },
      { label: "Pedestrian bridge structures", href: "/applications/frp-pedestrian-bridge-superstructures" },
      { label: "Waterfront retaining walls", href: "/applications/frp-waterfront-retaining-walls" },
      { label: "Mining & tunneling", href: "/applications/frp-mining-tunneling" },
    ],
  },
  {
    id: "precision-equipment", label: "Precision equipment", href: "/applications#precision-equipment",
    description: "Define the moving assembly, end connections and equipment qualification alongside laminate stiffness.",
    links: [
      { label: "Industrial rollers", href: "/applications/carbon-fiber-industrial-rollers" },
      { label: "Robot beams & struts", href: "/applications/cfrp-robotic-beams-struts" },
      { label: "MRI patient supports", href: "/applications/composite-mri-patient-supports" },
    ],
  },
  {
    id: "buildings-outdoors", label: "Buildings & outdoors", href: "/applications#buildings-outdoors",
    description: "Explore use-specific profiles and reinforcement with project, environmental and fabrication requirements.",
    links: [
      { label: "Agriculture & horticulture", href: "/applications/agriculture-horticulture-stakes" },
      { label: "Facades & sunshades", href: "/products/frp-facade-panels" },
      { label: "Noise barriers", href: "/products/frp-sound-barrier-wall" },
      { label: "Wind blade reinforcement", href: "/products/wind-turbine-blade-panels" },
    ],
  },
] as const;

/** Every specialist component belongs to one purchasing group. */
export const specialistProductCategories = [
  { id: "electrical-components", label: "Electrical components", slugs: ["fiberglass-live-line-tool-tubes-rods", "frp-switchgear-insulating-profiles", "composite-conductor-core-rods"] },
  { id: "process-components", label: "Process components", slugs: ["frp-sludge-collector-flights", "frp-demister-support-profiles"] },
  { id: "rail-civil-components", label: "Rail & civil components", slugs: ["frp-third-rail-coverboards", "fire-retardant-rail-profiles", "pultruded-cfrp-strengthening-strips"] },
  { id: "precision-components", label: "Precision equipment components", slugs: ["carbon-fiber-roller-tubes", "carbon-fiber-robotic-beams", "composite-medical-support-profiles"] },
] as const;
