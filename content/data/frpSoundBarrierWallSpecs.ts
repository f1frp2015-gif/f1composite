export type SoundBarrierConfiguration = {
  name: string;
  searchTerms: string;
  construction: string;
  bestFit: string;
  releaseBoundary: string;
};

export const frpSoundBarrierImageAssets = {
  hero: "/images/products/frp-sound-barrier-wall/frp-sound-barrier-wall-highway.webp",
  system:
    "/images/products/frp-sound-barrier-wall/interlocking-frp-noise-barrier-panel-system.webp",
} as const;

/**
 * Configuration language for quote planning. These are not fixed F1 stock
 * assemblies or tested acoustic ratings. The offered wall is released against
 * project drawings and assembly-specific test evidence.
 */
export const soundBarrierConfigurations = [
  {
    name: "Reflective FRP sound barrier panels",
    searchTerms: "Reflective noise barrier · composite sound wall",
    construction:
      "Closed pultruded FRP planks form a continuous barrier between posts. Interlocking edges, perimeter closures and seals control open paths through the wall.",
    bestFit:
      "Projects where transmission control and a corrosion-resistant outdoor barrier are required, and reflected sound is acceptable in the acoustic model. Maintenance still depends on the resin, finish, seals, fasteners and exposure.",
    releaseBoundary:
      "A hollow or closed panel is not assigned an STC, OITC or transmission-loss value until the offered wall specimen or panel build-up is traceable to applicable test evidence. Posts, closures and site gaps are checked separately because they affect installed leakage.",
  },
  {
    name: "Absorptive FRP noise barrier panels",
    searchTerms: "Absorptive noise barrier · outdoor acoustic barrier",
    construction:
      "A source-side acoustically open face and protected porous infill may be combined with a solid composite back. A declared NRC requires the offered perforation, core, facing, weather protection and mounting to match applicable test evidence.",
    bestFit:
      "Parallel barriers, confined corridors, equipment yards and other layouts where the acoustic study calls for source-side absorption rather than reflection alone.",
    releaseBoundary:
      "NRC is assembly-specific. Core type, thickness, facing, drainage and test orientation must match the cited laboratory report; a generic FRP skin has no automatic NRC value.",
  },
] as const satisfies readonly SoundBarrierConfiguration[];

export const soundBarrierSystemComponents = [
  {
    title: "Interlocking wall planks",
    body:
      "Horizontal pultruded fiberglass planks create the visible barrier surface. Tongue-and-groove or another sealed joint is developed around the chosen wall height, support spacing and acoustic configuration.",
  },
  {
    title: "Posts and panel interfaces",
    body:
      "FRP, galvanized-steel or other engineered posts transfer wind and environmental loads to the foundation. The post slot, bearing allowance and closure detail must preserve both structural support and acoustic continuity.",
  },
  {
    title: "Base, top and end closures",
    body:
      "Sound can leak through gaps that look minor on a general arrangement. Bottom seals, cap rails, end returns, penetrations and transitions are detailed as part of the wall, not left to site improvisation.",
  },
  {
    title: "Optional absorptive build-up",
    body:
      "When the acoustic model requires absorption, the source-side face, porous core, water management and protective layers are released together. Substituting one layer can invalidate the tested result.",
  },
  {
    title: "Finish and environmental package",
    body:
      "Integral pigment, surface veil and optional coating are selected from UV exposure, chemical contact, temperature, cleaning, graffiti-removal and visual requirements. Color approval follows a project sample.",
  },
  {
    title: "Foundations and anchorage",
    body:
      "Footings, base plates, anchor cages or embedded posts depend on soil, overturning, drainage, utilities and roadside clear-zone requirements. They are civil and structural design items, not catalog accessories.",
  },
] as const;

export const soundBarrierMetricGuide = [
  {
    metric: "NRC",
    answers:
      "Single-number laboratory absorption rating calculated from coefficients at 250, 500, 1000 and 2000 Hz for the stated specimen and mounting.",
    doesNotAnswer: "The dB reduction at a home, property line or machine operator position.",
  },
  {
    metric: "STC",
    answers:
      "Single-number classification derived from laboratory transmission loss; primarily suited to speech and building-frequency comparisons.",
    doesNotAnswer:
      "Installed outdoor insertion loss after diffraction, leakage and the actual source spectrum are considered.",
  },
  {
    metric: "OITC",
    answers:
      "Single-number classification using an outdoor reference spectrum with stronger low-frequency weighting.",
    doesNotAnswer:
      "Installed outdoor insertion loss after diffraction, leakage and project geometry are considered.",
  },
  {
    metric: "Transmission loss",
    answers:
      "Frequency-by-frequency reduction in airborne sound power transmitted through the tested specimen.",
    doesNotAnswer: "Whether the wall is tall, long or continuous enough for the actual receiver geometry.",
  },
  {
    metric: "Insertion loss",
    answers:
      "Difference in measured or predicted sound level at a defined receiver before and after installing the barrier under comparable source and environmental conditions.",
    doesNotAnswer: "A transferable product rating independent of site, source, terrain and measurement conditions.",
  },
] as const;

export const soundBarrierEngineeringInputs = [
  {
    title: "Acoustic design basis",
    body:
      "Provide the noise source, operating spectrum, source height, receiver locations, existing levels, target criterion and the acoustic model. State whether the specification requires absorption, transmission loss, insertion loss or a combination.",
  },
  {
    title: "Wall geometry",
    body:
      "Issue the alignment, total length, finished height, steps, returns, corners, gates, openings and ground profile. Height and continuity often control performance more than the panel material name.",
  },
  {
    title: "Structural actions",
    body:
      "State governing wind, seismic, snow or ice, impact, fatigue and deflection criteria. Support spacing and plank section are released from calculations for the complete wall bay.",
  },
  {
    title: "Civil and roadside constraints",
    body:
      "Identify soil report, drainage, slope, buried services, foundation limits, vehicle clear zone, crash barrier interface, maintenance access and installation staging.",
  },
  {
    title: "Environment and fire",
    body:
      "List UV exposure, freeze/thaw, moisture, chemicals, temperature, cleaning and the exact fire test or classification required. ‘Weather resistant’ and ‘fire retardant’ are not complete acceptance criteria.",
  },
  {
    title: "Submittal and verification",
    body:
      "Define required drawings, calculations, material data, acoustic test reports, finish samples, inspection records and jurisdictional approvals before production release.",
  },
] as const;

export const soundBarrierApplications = [
  {
    title: "Highways and municipal corridors",
    body:
      "Roadside walls where low panel mass, corrosion resistance and modular replacement can simplify access-constrained construction. Highway-agency acceptance remains jurisdiction- and project-specific.",
  },
  {
    title: "Rail and transit",
    body:
      "Trackside and station-edge noise control with the wall geometry coordinated around electrification, vibration, maintenance clearance and rail-authority requirements.",
  },
  {
    title: "Industrial plants and mines",
    body:
      "Perimeter or source-adjacent barriers around process equipment, compressors, conveyors and material-handling areas exposed to corrosive air and washdown.",
  },
  {
    title: "Data centers and utilities",
    body:
      "Outdoor enclosures for generators, transformers, cooling equipment and substations, with airflow, access, fire separation and electrical clearances designed alongside acoustics.",
  },
  {
    title: "Commercial and logistics sites",
    body:
      "Loading docks, drive-through lanes, rooftop equipment and property-line walls where appearance, maintenance access and neighboring receivers all matter.",
  },
  {
    title: "Coastal and chemical environments",
    body:
      "Composite sound walls for salt, humidity or chemical exposure where the resin, veil, finish, fasteners and support materials are selected from the actual service conditions.",
  },
] as const;

export const soundBarrierTechnicalSources = [
  {
    label: "FHWA Highway Noise Barrier Design Handbook — acoustical considerations",
    href: "https://www.fhwa.dot.gov/Environment/noise/noise_barriers/design_construction/design/design03.cfm",
  },
  {
    label: "FHWA — keeping highway traffic noise down",
    href: "https://www.fhwa.dot.gov/Environment/noise/noise_barriers/design_construction/keepdown.cfm",
  },
  {
    label: "23 CFR 772.13 — highway traffic noise abatement",
    href: "https://www.ecfr.gov/current/title-23/chapter-I/subchapter-H/part-772/section-772.13",
  },
  {
    label: "Caltrans noise barrier system product acceptance criteria",
    href: "https://dot.ca.gov/-/media/dot-media/programs/engineering/documents/mets/noise-barrier-systems-criteria-a11y.pdf",
  },
  {
    label: "Caltrans noise barrier testing requirements",
    href: "https://dot.ca.gov/-/media/dot-media/programs/engineering/documents/mets/noise-barrier-testing-requirements-a11y.pdf",
  },
  {
    label: "ASTM C423 — sound absorption and NRC scope",
    href: "https://store.astm.org/standards/c423",
  },
  {
    label: "ASTM E90-23 — laboratory sound transmission loss scope",
    href: "https://store.astm.org/e0090-23.html",
  },
  {
    label: "ASTM E413-22 — sound transmission class scope and limitations",
    href: "https://store.astm.org/e0413-22.html",
  },
  {
    label: "ASTM E1332-22 — outdoor-indoor transmission class scope",
    href: "https://store.astm.org/e1332-22.html",
  },
] as const;
