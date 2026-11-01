/**
 * Pictures of each case study: Figure 1 (lead image and its head) and the further
 * figures. Shared by the case-study page and the image sitemap (lib/pageImages.ts).
 * A stock photo says so in `note`, so it is not read as a photograph of the project
 * (WEBSITE.md: case images must show the project).
 */

export const caseStudyImages: Record<string, string> = {
  "european-bridge-deck": "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg",
  "coastal-marina-walkway": "/images/case-studies/frp-coastal-marina-walkway-grating-system.jpg",
  "baotou-industrial-gfrp-pu-windows": "/images/case-studies/frp-baotou-industrial-park-aerial.webp",
  "wanhua-yantai-zero-carbon-windows": "/images/case-studies/frp-wanhua-yantai-zero-carbon-community-aerial.webp",
  "chongqing-rooftop-pv-frp-rail": "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
  "water-treatment-cable-tray": "/images/case-studies/frp-water-treatment-plant-aerial-cable-tray-handrail.webp",
  "factory-access-staircase": "/images/f1-photos/frp-factory-access-staircase-hero.webp",
  "yancheng-talent-apartment-fenestration": "/images/case-studies/frp-talent-apartment-yancheng-aerial-view.webp",
  "qinling-station-antarctic-passive-windows": "/images/case-studies/frp-qinling-station-antarctic-ross-sea-aerial.webp",
};

// Figure 1 of each case: a short title, the photo's source and its alt text.
// A stock photo says so, so it is not read as a photograph of the project
// (WEBSITE.md: case images must show the project).
export const caseStudyImageMeta: Record<string, { title: string; note?: string; alt: string }> = {
  "european-bridge-deck": {
    title: "Pedestrian bridge",
    note: "Illustrative photo",
    alt: "Covered pedestrian bridge with curved timber slats and a white steel arch",
  },
  "coastal-marina-walkway": {
    title: "Marina walkway",
    note: "Illustrative photo",
    alt: "Paved walkway with steel railings leading down to a marina on a lake",
  },
  "baotou-industrial-gfrp-pu-windows": {
    title: "Industrial park",
    alt: "Baotou industrial park, with workshop buildings, rooftop PV and an office block",
  },
  "wanhua-yantai-zero-carbon-windows": {
    title: "Zero-carbon community",
    alt: "Wanhua Yantai zero-carbon community seen from above",
  },
  "chongqing-rooftop-pv-frp-rail": {
    title: "Rooftop array",
    note: "Project photo",
    alt: "PV modules on pultruded FRP rails over a blue color steel-tile factory roof in Chongqing",
  },
  "qinling-station-antarctic-passive-windows": {
    title: "Qinling Station",
    alt: "Qinling Station on the Ross Sea coast, Antarctica, seen from above",
  },
  "yancheng-talent-apartment-fenestration": {
    title: "Apartment development",
    alt: "Yancheng talent apartment development seen from above",
  },
  "factory-access-staircase": {
    title: "Stair and platform",
    note: "Project photo",
    alt: "FRP access staircase and platform with orange handrails inside F1 Composite's Chongqing plant",
  },
  "water-treatment-cable-tray": {
    title: "Treatment plant",
    note: "Illustrative photo",
    alt: "Aerial view of circular clarifiers and rectangular basins at a water treatment plant",
  },
};

// Further figures, shown with what F1 supplied.
export const caseStudyContentImages: Record<string, { src: string; title: string; note?: string; alt: string }[]> = {
  "factory-access-staircase": [
    {
      src: "/images/f1-photos/frp-factory-staircase-structural-view.webp",
      title: "Stringers and frame",
      note: "Project photo",
      alt: "Side view of FRP I-beam stringers and pultruded structural profiles forming the staircase frame inside F1 Composite's Chongqing factory",
    },
    {
      src: "/images/f1-photos/frp-factory-staircase-platform-handrail.webp",
      title: "Stair flight from below",
      note: "Project photo",
      alt: "Underside of the stair flight: FRP I-beam stringers carrying the treads, with the orange FRP handrail alongside",
    },
    {
      src: "/images/f1-photos/frp-factory-staircase-grating-treads.webp",
      title: "Beam-to-post connection",
      note: "Project photo",
      alt: "Bolted connection between the platform beams and a post, all pultruded FRP profiles with stainless steel bolts",
    },
    {
      src: "/images/f1-photos/frp-factory-staircase-assembly-detail.webp",
      title: "Bolted connection",
      note: "Project photo",
      alt: "Bolted connection detail between pultruded FRP profiles and 316L stainless steel fasteners — no welding required",
    },
  ],
  "water-treatment-cable-tray": [
    {
      src: "/images/case-studies/frp-water-treatment-plant-aeration-basin-piping-system.webp",
      title: "Aeration basins",
      note: "Illustrative photo",
      alt: "Aerial view of aeration basins with walkways and piping between them",
    },
    {
      src: "/images/case-studies/frp-water-treatment-plant-walkway-handrail-installation.jpg",
      title: "Basin walkway",
      note: "Illustrative photo",
      alt: "Walkway with railings between treatment basins",
    },
  ],
  "wanhua-yantai-zero-carbon-windows": [
    {
      src: "/images/case-studies/frp-wanhua-yantai-passive-house-building.webp",
      title: "Dormitory building",
      alt: "Wanhua Yantai Zero-Carbon Community: a passive-house dormitory building with continuous pultruded GFRP-PU window frames and a high-glazing facade",
    },
    {
      src: "/images/case-studies/frp-wanhua-yantai-residential-tower-courtyard.webp",
      title: "Courtyard",
      note: "Photo",
      alt: "Ground-level courtyard at the Wanhua Yantai Zero-Carbon Community — residents and staff in the landscaped quad between dormitory buildings, with floor-to-ceiling pultruded GFRP-PU windows above",
    },
  ],
};
