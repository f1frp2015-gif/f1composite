export const doorThresholds = {
  path: "/products/fiberglass-door-thresholds",
  title: "Fiberglass Door Thresholds & GRP Sills | F1 Composite",
  h1: "Pultruded fiberglass door thresholds",
  description:
    "F1 pultruded fiberglass door thresholds and GRP sill profiles for door fabricators. Develop hinged and sliding door sill sections around your frame drawings.",
  intro:
    "F1 Composite supplies pultruded fiberglass door thresholds and GRP sill profiles for door fabricators and system developers. The composite section forms the base of the opening, with geometry developed around the frame, seals, drainage and floor connection.",
  image: "/images/products/door-thresholds/fiberglass-door-threshold-outward-hook.webp",
  profileVariants: [
    {
      id: "inward-closed",
      title: "Inward-opening · closed base",
      body: "A narrow raised deck above two hollow chambers, with a continuous closed base.",
      alt: "Dark fiberglass threshold with a narrow raised deck and two hollow chambers above a closed base, extruded continuously along its length",
    },
    {
      id: "inward-hook",
      title: "Inward-opening · hooked base",
      body: "A narrow raised deck with a shallow lower chamber and an open hooked edge.",
      alt: "Dark fiberglass threshold with a narrow raised deck, two through chambers and a continuous open hook along the lower edge",
    },
    {
      id: "outward-closed",
      title: "Outward-opening · closed base",
      body: "A wider raised deck with longitudinal ribs, a stepped chamber and a closed base.",
      alt: "Dark fiberglass threshold with a wide ribbed deck, a stepped hollow chamber and a second rectangular chamber above a closed base",
    },
    {
      id: "outward-hook",
      title: "Outward-opening · hooked base",
      body: "A wider ribbed deck and stepped chamber, with a continuous open hooked edge.",
      alt: "Dark fiberglass threshold with a wide ribbed deck, two through chambers and an open hooked edge extending the full profile length",
    },
  ],
  scope:
    "Custom pultruded threshold profiles, cut lengths and agreed secondary machining for integration into a specified door system. Seals, end blocks, tracks and assembly are defined separately in the quotation.",
  buyer: "Door fabricators, frame-system developers and OEM procurement teams",
  applications: [
    {
      title: "Hinged entrance & patio doors",
      tag: "Swing-door sills",
      body: "Develop the threshold around inward- or outward-opening leaves. Align the seal contact, jamb connections and exterior drainage with the frame section and finished floor levels.",
      inputs: "Opening direction · seal detail · frame depth",
    },
    {
      title: "Sliding & lift-and-slide doors",
      tag: "Track-support sills",
      body: "Review a wider sill section around the selected rail and panel layout. Roller loads, rail attachment, drainage outlets and support beneath the threshold are part of the system design.",
      inputs: "Track layout · panel weight · support locations",
    },
    {
      title: "Low-profile entrances",
      tag: "Floor-level coordination",
      body: "Coordinate the visible step with the interior floor, exterior paving and water-management detail. A low threshold needs the complete opening and installation to work together.",
      inputs: "Floor build-up · exposure · access requirements",
    },
  ],
  checklist: [
    "Door operation, opening width and frame-system section drawing",
    "Threshold width, height, wall thickness and critical interface tolerances",
    "Seal grooves, jamb connections, end blocks and any track interfaces",
    "Panel or pedestrian loads, fixing locations and support beneath the sill",
    "Drainage outlets, weather exposure and interior/exterior floor levels",
    "Resin and finish requirements, color, cut lengths and machining",
    "Order quantity, annual demand, destination and required supporting documents",
  ],
  message:
    "Please review my fiberglass door threshold requirements.\nDoor operation / frame system:\nSection drawing and threshold dimensions:\nSeals / tracks / end connections:\nLoading and base support:\nDrainage and floor levels:\nFinish / cut lengths / machining:\nQuantity and annual demand:\nDelivery destination and required documents:",
  faq: [
    {
      question: "What is a fiberglass door threshold?",
      answer:
        "It is a glass-fiber-reinforced polymer section used at the bottom of a door opening. A pultruded threshold has a continuous cross-section along its length. GRP door sill, FRP threshold and fiberglass sill profile are related purchasing terms; the drawing defines the actual component.",
    },
    {
      question: "Can the threshold be used with uPVC, timber or aluminum frames?",
      answer:
        "A threshold can be developed for these frame materials, but the interfaces must be checked for the specific system. Supply the mating frame, seal and fixing drawings. Material choice alone does not establish compatibility with an existing frame series.",
    },
    {
      question: "Do you supply profiles or complete threshold assemblies?",
      answer:
        "The starting scope is the pultruded profile, with cut lengths and machining agreed at quotation. Specify seals, end blocks, connectors, rails and assembly separately if needed. These components are not automatically included with a profile order.",
    },
    {
      question: "Does a fiberglass sill make a door thermally broken or watertight?",
      answer:
        "A composite section can help limit a conductive path through the sill, but whole-door performance also depends on the leaf, frame, glazing, metal components, seals and installation. Thermal and weather-performance claims require evidence for the complete proposed configuration.",
    },
    {
      question: "What sizes and minimum order quantities are available?",
      answer:
        "Send the section drawing, required lengths and demand. F1 will review tooling, manufacturing feasibility, sample requirements and order quantity before quoting. Published concept drawings are not a stocked-size catalog.",
    },
    {
      question: "Can you develop a low threshold for accessible entrances?",
      answer:
        "Low-profile geometry can be reviewed as a design requirement. Confirm the applicable project access requirements, allowable step, approach surfaces and weather exposure with the designer. A low section on its own does not establish compliance for the installed entrance.",
    },
  ],
} as const;
