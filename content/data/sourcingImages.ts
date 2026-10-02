/** FRPZS is an F1 supplier, confirmed by the owner on 2026-10-02.
 * Original files, source URLs and hashes are recorded in docs/frpzs-image-sources.json.
 * Images identify supplier equipment; they do not imply F1 factory ownership.
 */
export interface SupplierImage {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  caption: string;
}
export const supplierImageNote = "Supplier image · FRPZS";
export const frpzsImages = {
  hydraulicLine: {
    src: "/images/sourcing/frpzs/hydraulic-profile-pultrusion-line.jpg",
    width: 1200,
    height: 533,
    title: "Hydraulic pultrusion line",
    alt: "Long hydraulic profile pultrusion line with enclosed pulling units and an operator control panel",
    caption: "FRPZS hydraulic profile pultrusion line. The proposed model and included equipment are confirmed for the project."
  },
  crawlerLine: {
    src: "/images/sourcing/frpzs/crawler-profile-pultrusion-line.jpg",
    width: 500,
    height: 500,
    title: "Caterpillar pultrusion line",
    alt: "FRPZS caterpillar pultrusion line with twin clamping assemblies and a suspended control panel",
    caption: "FRPZS caterpillar-type profile line. Review the contact tooling and pulling arrangement against the intended profile."
  },
  channelDie: {
    src: "/images/sourcing/frpzs/channel-pultrusion-die-face.jpg",
    width: 450,
    height: 450,
    title: "Channel-profile die",
    alt: "Front face of a steel pultrusion die showing the channel-shaped cavity and mounting openings",
    caption: "FRPZS channel-profile die face. Cavity geometry, reinforcement and mating dimensions follow the approved tooling drawing."
  },
  dieGuides: {
    src: "/images/sourcing/frpzs/channel-die-guide-plate-assembly.jpg",
    width: 450,
    height: 450,
    title: "Die and guide-plate assembly",
    alt: "Long steel channel-profile die with a series of guide plates mounted behind it on the tooling frame",
    caption: "FRPZS channel die with guide plates on a tooling frame. Use the project drawing to define the final preforming sequence and alignment."
  },
  injectionUnit: {
    src: "/images/sourcing/frpzs/two-component-resin-injection-unit.jpg",
    width: 450,
    height: 450,
    title: "Two-component injection unit",
    alt: "Blue two-component resin injection unit with two stainless-steel tanks, control cabinets and a mixing-head support",
    caption: "FRPZS resin metering and injection unit. Tank conditioning, dosing and line interfaces are specified in the offered package."
  },
  injectionTanks: {
    src: "/images/sourcing/frpzs/resin-injection-tank-detail.jpg",
    width: 450,
    height: 450,
    title: "Resin tank detail",
    alt: "Two stainless-steel resin component tanks with agitator motors and flexible hoses in the supplier workshop",
    caption: "FRPZS component tanks and agitators. Confirm the included conditioning functions and the separate A/B material requirements."
  }
} satisfies Record<string, SupplierImage>;

export const sourcingHeroImages: Record<string, SupplierImage> = {
  "pultrusion-machines": frpzsImages.hydraulicLine,
  "pultrusion-dies": frpzsImages.channelDie,
  "resin-mixing-injection": frpzsImages.injectionUnit,
};
