export const plantingApplications = [
  {
    title: "Nursery trees & container stock",
    task: "Keep a selected leader aligned through propagation, potting-on and handling.",
    inputs: "Species, current and target height, pot depth, growing medium, tie points and handling frequency.",
    check: "Trial insertion in the actual container. Check root clearance, stake movement and the contact between the tie, bark and rod.",
  },
  {
    title: "Vineyards & young vine training",
    task: "Guide a young shoot toward the fruiting wire as part of the chosen trellis system.",
    inputs: "Training height, wire elevation, row layout, tie or clip design, wind and machinery clearance.",
    check: "Confirm the stake-to-wire interface. Training rods do not replace engineered trellis end posts, anchors or tensioned-wire supports.",
  },
  {
    title: "Young orchards & landscape trees",
    task: "Provide temporary support where establishment conditions justify staking.",
    inputs: "Tree and canopy size, root-ball condition, ground type, exposure and the intended support period.",
    check: "Use flexible ties that allow movement; inspect for bark abrasion and constriction. Permanent high-density orchard supports need a separate system design.",
  },
  {
    title: "Vegetables, flowers & climbing crops",
    task: "Support individual stems or help train plants within a coordinated crop-support layout.",
    inputs: "Crop, fruit or flower load, mature height, support spacing, tie method and seasonal reuse plan.",
    check: "Check the loaded plant and unsupported rod height. A tomato, pepper or ornamental stem can need a different configuration even at the same height.",
  },
  {
    title: "Tree shelters & restoration planting",
    task: "Hold a compatible shelter or guard in position during early establishment.",
    inputs: "Shelter make, height, diameter, tie holes, inside/outside stake position, soil and exposure.",
    check: "Obtain the shelter supplier’s approval for the actual rod and attachment. A generic round stake is not an automatic replacement for a proprietary shelter stake.",
  },
] as const;

export const plantingSelectionChecks = [
  { title: "Height & embedment", body: "Write overall length, exposed height and ground or pot insertion depth separately. For example, a 1.80 m rod with 0.30 m inserted leaves 1.50 m above ground. This is geometry only; required embedment depends on soil, wind and the supported assembly." },
  { title: "Stiffness & plant movement", body: "Choose the required response before choosing diameter. For an otherwise identical solid round rod, bending stiffness rises with the fourth power of diameter. More stiffness is not always better for the plant, and tensile strength alone cannot select a stake." },
  { title: "Ties, clips & shelters", body: "Specify contact points, clip opening and tie spacing. Confirm rounded or capped upper ends where needed. Trial the whole assembly for slippage, rubbing and stem clearance, including movement in the wind." },
  { title: "Surface & end finish", body: "Discuss a smooth resin-rich surface or optional handling veil, color, a factory-finished insertion end and sealed cut ends. Inspect samples for exposed fibers, sharp edges and surface damage before approving repeated handling." },
  { title: "Outdoor exposure", body: "State climate, sunlight, irrigation, fertilizers, spray chemicals and expected reuse. Match the resin and UV package to those conditions. Color alone does not establish UV durability, chemical resistance or a guaranteed service life." },
  { title: "Order & delivery format", body: "Define each diameter/length/color SKU, pieces per bundle, pallet limits and labels. Include the destination and required arrival date so sample approval, production, freight and local delivery can be planned around planting." },
] as const;

export const plantingSteps = [
  { title: "Define the growing task", buyer: "Share the crop, support height, site, quantity and planting deadline. A photo or existing SKU is a useful starting point.", outcome: "A shortlist of configurations and the missing details to resolve." },
  { title: "Approve a sample & field trial", buyer: "Agree sample dimensions and finish; install with your own soil, ties and shelter or wire interface.", outcome: "Recorded fit, handling and support observations, plus an approved specification. Sample cost and timing are confirmed first." },
  { title: "Confirm the commercial offer", buyer: "Finalize SKU quantities, acceptance criteria, packing, destination and delivery terms.", outcome: "A scoped quotation with MOQ, price, agreed documents, production timing and freight responsibilities." },
  { title: "Release & inspect the order", buyer: "Approve the order and inspection plan before production release. Check dimensions, finish, ends, bundle counts and labels against the specification.", outcome: "An agreed shipment and traceable specification for receiving inspection and future orders." },
  { title: "Review the planting cycle", buyer: "Record installation effort, replacements, tie adjustments and recoverable stakes under actual field conditions.", outcome: "Evidence for the next order: retain, adjust or retire the configuration based on field results." },
] as const;

export const plantingFaqs = [
  { question: "Which diameter should I use for my crop?", answer: "Crop name alone is insufficient. Share exposed height, plant or shelter load, wind, soil, embedment and attachments. The 5–19 mm reference band helps describe an RFQ; it is not a load-rated crop sizing chart. An existing working sample can help define the required stiffness." },
  { question: "Can F1 stakes replace Plantra Trunk Builder stakes?", answer: "Do not assume interchangeability. Plantra describes a proprietary three-sided reinforced stake and a coordinated shelter installation. F1’s stakes page covers solid round pultruded rods. Send the shelter dimensions and attachment details for compatibility review and obtain the shelter supplier’s approval before substitution." },
  { question: "Do you supply grow tubes, ties or a complete trellis?", answer: "This application page covers F1 fiberglass stakes. Identify any required caps, ties, clips or guards separately; their availability and supply responsibility must be confirmed in the quotation. Grow tubes, netting, trellis posts, anchors and installation are not automatically included." },
  { question: "Can I request samples before a bulk order?", answer: "Yes. Use the sample request to describe the crop, target dimensions and trial conditions. Ask F1 to confirm sample availability, sample and shipping costs, timing, and which features represent the proposed production specification before proceeding." },
  { question: "What are the minimum order and lead time?", answer: "They depend on diameter, cut length, finish, color, tooling or setup, packing and order mix. Send quantities by SKU and the required arrival date. The quotation should separate sample timing, production lead time and freight; no fixed MOQ or delivery promise is implied here." },
  { question: "Can stakes be reused for several seasons?", answer: "Reuse depends on surface condition, UV exposure, chemicals, bending, installation damage and storage. Inspect recovered rods for cracking, permanent damage, exposed fibers and damaged ends. Remove unsuitable rods from service and agree acceptance criteria for your program; there is no universal season or year guarantee." },
  { question: "Should every newly planted tree be staked?", answer: "No. Determine the need from the tree’s stability and site conditions. If support is needed, allow appropriate movement, review ties as the trunk grows and remove temporary support when establishment allows. A nursery leader-training program and a transplanted landscape tree can require different approaches." },
  { question: "Can the same rods carry bird netting or shade cloth?", answer: "Do not extend a plant-stake selection to a net or canopy structure without a separate review. Nets and fabric change wind demand and require coordinated posts, anchors, connections and spacing. Send the cover geometry and site conditions as a separate support-system enquiry." },
] as const;

export const plantingSources = [
  { label: "Plantra: Trunk Builder stake and shelter pairing", href: "https://www.plantra.com/Trunk-Builder-Reinforced-Fiberglass-Stakes--6-ft-10-Pack_p_418.html" },
  { label: "Plantra: installation instructions", href: "https://www.plantra.com/product-instructions.html" },
  { label: "Pulwell: nursery stake application range", href: "https://www.pulwellfrp.com/en/Products.aspx?id=281" },
  { label: "Unicomposite: plant stake specification inputs", href: "https://www.unicomposite.com/product/frp-plant-stake/" },
  { label: "University of Maryland Extension: planting and staking", href: "https://www.extension.umd.edu/resource/planting-tree-or-shrub" },
  { label: "Penn State Extension: training young grapevines", href: "https://extension.psu.edu/a-stepwise-guide-to-dormant-pruning-and-training-young-grapevines" },
] as const;
