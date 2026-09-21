/** Catalog references checked 2026-09-21. See docs/fasteners/product-sources.md. */
export const fastenersPath = "/products/frp-fasteners-fittings";

export const fastenerRanges = [
  {
    id: "vinyl-ester-rods",
    name: "Vinyl ester threaded rods",
    label: "UNC thread series",
    image: "vinyl-ester-threaded-rods.webp",
    alt: "Two grey fiberglass vinyl ester threaded rods",
    description: "All-thread rods for assemblies where the resin must be matched to chemical and wet-service exposure.",
    specification: '3/8″–16, 1/2″–13, 5/8″–11, 3/4″–10 and 1″–8 UNC; nominal lengths 4 ft and 8 ft.',
    confirm: "Specify thread, cut length, matching nuts and service conditions.",
  },
  {
    id: "epoxy-rods",
    name: "Epoxy threaded rods",
    label: "Metric thread series",
    image: "epoxy-threaded-rods.webp",
    alt: "Green epoxy fiberglass threaded rods in several diameters",
    description: "Metric composite rods for project connections and insulating assemblies, with electrical requirements reviewed for the selected grade.",
    specification: "M8, M10, M12, M16, M20 and M24; nominal lengths 1.5 m and 3 m.",
    confirm: "Confirm pitch, tolerance and nut engagement on the drawing.",
  },
  {
    id: "nuts",
    name: "FRP nuts & matched assemblies",
    label: "Match the complete thread",
    image: "frp-hex-nuts.webp",
    alt: "Composite hexagonal, flanged and square nuts in different sizes",
    description: "Hex nuts in metric and UNC series, with polyester (UP), vinyl ester (VE) and epoxy (EP) material options for review. Ask about square nuts and bolt-and-nut sets for your drawing.",
    specification: 'Metric: M8, M10, M12, M16, M20, M24. UNC: 3/8″–16 through 1″–8 in the listed rod series.',
    confirm: "Confirm nut height, bearing face, resin and compatible rod or bolt.",
  },
  {
    id: "washers",
    name: "FRP washers",
    label: "Bearing & interface details",
    image: "frp-washers.webp",
    alt: "Illustration of a grey flat composite washer",
    description: "Flat composite washers offered in UP and VE materials. Select the complete washer geometry with the fastener and supporting surface.",
    specification: "Catalog diameter labels: Ø9, Ø11, Ø13, Ø17, Ø21 and Ø26.",
    confirm: "Confirm bore, outside diameter and thickness; the catalog labels alone do not define the finished washer.",
  },
  {
    id: "molded-fittings",
    name: "Molded FRP fittings",
    label: "Drawing-based selection",
    image: "frp-molded-fittings.webp",
    alt: "Yellow molded composite connection fittings and mounting bases",
    description: "Molded connection pieces for tube and profile assemblies. Send the mating section and connection drawing to review fit, fastening and tooling.",
    specification: "Geometry, wall thickness, hole layout, color and molding requirements by approved drawing.",
    confirm: "Review the whole connection and required tests before release.",
  },
] as const;

export const threadedRodSeries = [
  { resin: "Vinyl ester", thread: '3/8″–16 UNC', diameter: "9.525 mm", length: "4 ft / 8 ft" },
  { resin: "Vinyl ester", thread: '1/2″–13 UNC', diameter: "12.7 mm", length: "4 ft / 8 ft" },
  { resin: "Vinyl ester", thread: '5/8″–11 UNC', diameter: "15.875 mm", length: "4 ft / 8 ft" },
  { resin: "Vinyl ester", thread: '3/4″–10 UNC', diameter: "19.05 mm", length: "4 ft / 8 ft" },
  { resin: "Vinyl ester", thread: '1″–8 UNC', diameter: "25.4 mm", length: "4 ft / 8 ft" },
  { resin: "Epoxy", thread: "M8", diameter: "8 mm", length: "1.5 m / 3 m" },
  { resin: "Epoxy", thread: "M10", diameter: "10 mm", length: "1.5 m / 3 m" },
  { resin: "Epoxy", thread: "M12", diameter: "12 mm", length: "1.5 m / 3 m" },
  { resin: "Epoxy", thread: "M16", diameter: "16 mm", length: "1.5 m / 3 m" },
  { resin: "Epoxy", thread: "M20", diameter: "20 mm", length: "1.5 m / 3 m" },
  { resin: "Epoxy", thread: "M24", diameter: "24 mm", length: "1.5 m / 3 m" },
] as const;

export const fastenerFaqs = [
  {
    question: "Are FRP and GRP fasteners the same product type?",
    answer: "GRP means glass-reinforced plastic. The FRP fasteners on this page use glass reinforcement, so fiberglass fasteners, GRP fasteners and GFRP fasteners refer to the same material family here. The resin, reinforcement and finished component still need to be specified.",
  },
  {
    question: "Can a metric nut be fitted to a similar-sized UNC rod?",
    answer: "No. Match the thread system, diameter, pitch, tolerance and engagement length. A similar outside diameter does not make metric and UNC threads compatible. Request a matched rod, nut and washer set when the connection is being specified together.",
  },
  {
    question: "Can FRP fasteners directly replace steel bolts?",
    answer: "Do not assume a size-for-size replacement. The joint needs its own review of tensile and shear demand, thread engagement, bearing area, creep, temperature and installation procedure. Provide the existing connection drawing and loads for assessment.",
  },
  {
    question: "What installation torque should be used?",
    answer: "Use the installation procedure approved for the supplied rod or bolt, nut, washer and joint. A generic steel-bolt torque table does not establish a suitable FRP installation torque. Request the applicable tightening limits and supporting test data with the quotation.",
  },
  {
    question: "Are grating clips also made of fiberglass?",
    answer: "The grating clips linked from this page are 316 stainless-steel hardware for FRP panels. Molded grating uses the M/C/J selection guide; pultruded grating uses M/J/T. These metal clips do not make an electrically insulating connection.",
  },
  {
    question: "Can I request custom lengths or molded fittings?",
    answer: "Yes. Send the drawing, dimensions, quantity, resin or exposure conditions and delivery destination. F1 will confirm available sizes, tooling, sample requirements, minimum order quantity and lead time in the quotation.",
  },
];
