/** Audited against the supplied catalogue, source PDF pages 10–20.
 * Paired U-values and source classes are preserved without interpretation.
 * catalogPage refers to the published English F1 catalogue.
 */
export type FinishedWindowSystem = {
  id: string;
  series: string;
  name: string;
  kind: "window" | "door";
  summary: string;
  image: string;
  imageAlt: string;
  features: string[];
  applications: string;
  glazing: { buildUp: string; uValue: string }[];
  performance: { wind: string; water: string; air: string; sound: string };
  catalogPage: number;
};

export const finishedWindowCatalog = "/downloads/f1composite-finished-windows-doors-catalog-2026-11.pdf";

export const finishedWindowSystems: FinishedWindowSystem[] = [
  {
    "id": "pu-65",
    "series": "65",
    "name": "65 Casement Window",
    "kind": "window",
    "summary": "A chambered composite window system for everyday residential use, combining thermal insulation with a practical opening format.",
    "image": "/images/products/finished-windows/65-casement.webp",
    "imageAlt": "65 Casement Window illustrated catalogue configuration",
    "features": [
      "Chambered polyurethane composite frame",
      "Configurations for new-build and replacement windows",
      "Two listed Low-e glazing configurations"
    ],
    "applications": "Conventional housing, residential renovation and multi-storey homes.",
    "glazing": [
      {
        "buildUp": "5Low-e + 9A/Ar + 5 + 9A/Ar + 5",
        "uValue": "1.6 / 1.5"
      },
      {
        "buildUp": "5Low-e + 9A/Ar + 5Low-e + 9A/Ar + 5",
        "uValue": "1.35 / 1.3"
      }
    ],
    "performance": {
      "wind": "Class 8",
      "water": "Class 5",
      "air": "Class 7",
      "sound": ">40 dB"
    },
    "catalogPage": 4
  },
  {
    "id": "pu-72",
    "series": "72",
    "name": "72 Casement Window",
    "kind": "window",
    "summary": "A multi-chamber system for homes with demanding winter insulation requirements. The range includes A, B and C variants.",
    "image": "/images/products/finished-windows/72-casement.webp",
    "imageAlt": "72 Casement Window illustrated catalogue configuration",
    "features": [
      "Multi-chamber profile construction",
      "Three listed glazing configurations",
      "A / B / C variants; details on request"
    ],
    "applications": "Cold-climate housing and residential projects with demanding winter insulation requirements.",
    "glazing": [
      {
        "buildUp": "5 + 12A/Ar + 5 + 12A/Ar + 5",
        "uValue": "1.5 / 1.4"
      },
      {
        "buildUp": "5Low-e + 12A/Ar + 5 + 12A/Ar + 5",
        "uValue": "1.4 / 1.3"
      },
      {
        "buildUp": "5Low-e + 12A/Ar + 5Low-e + 12A/Ar + 5",
        "uValue": "1.3 / 1.2"
      }
    ],
    "performance": {
      "wind": "Class 8",
      "water": "Class 5",
      "air": "Class 8",
      "sound": ">40 dB"
    },
    "catalogPage": 5
  },
  {
    "id": "pu-83",
    "series": "83",
    "name": "83 Flush Window",
    "kind": "window",
    "summary": "Flush frame-and-sash styling creates clean sightlines for contemporary residential facades and interiors.",
    "image": "/images/products/finished-windows/83-flush.webp",
    "imageAlt": "83 Flush Window illustrated catalogue configuration",
    "features": [
      "Flush frame-and-sash appearance",
      "Choice of surface finishes",
      "Warm-edge glazing configuration listed"
    ],
    "applications": "Modern homes, large apartments and residential projects with a clean-lined facade.",
    "glazing": [
      {
        "buildUp": "5Low-e + 15A/Ar + 5 + 15A/Ar + 5",
        "uValue": "1.4 / 1.3"
      },
      {
        "buildUp": "5Low-e + 15A/Ar + 5Low-e + 15A/Ar + 5",
        "uValue": "1.2 / 1.1"
      },
      {
        "buildUp": "5Low-e + 16A/Ar (warm edge) + 5Low-e + 16A/Ar (warm edge) + 5",
        "uValue": "1.0 / 0.9"
      }
    ],
    "performance": {
      "wind": "Class 8",
      "water": "Class 6",
      "air": "Class 8",
      "sound": ">40 dB"
    },
    "catalogPage": 6
  },
  {
    "id": "pu-85",
    "series": "85",
    "name": "85 Casement Window",
    "kind": "window",
    "summary": "A multiple-seal window system with low reported whole-window U-values for buildings with demanding thermal targets.",
    "image": "/images/products/finished-windows/85-casement.webp",
    "imageAlt": "85 Casement Window illustrated catalogue configuration",
    "features": [
      "Multiple perimeter seals",
      "Three listed glazing configurations",
      "Warm-edge option for lower heat transfer"
    ],
    "applications": "Low-energy housing and projects targeting reduced envelope heat loss.",
    "glazing": [
      {
        "buildUp": "5Low-e + 16A/Ar + 5 + 16A/Ar + 5",
        "uValue": "1.3 / 1.2"
      },
      {
        "buildUp": "5Low-e + 16A/Ar + 5Low-e + 16A/Ar + 5",
        "uValue": "1.15 / 1.05"
      },
      {
        "buildUp": "5Low-e + 16A/Ar (warm edge) + 5Low-e + 16A/Ar (warm edge) + 5",
        "uValue": "0.9 / 0.8"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 6",
      "air": "Class 8",
      "sound": ">42 dB"
    },
    "catalogPage": 7
  },
  {
    "id": "pu-95",
    "series": "95",
    "name": "95 Casement Window",
    "kind": "window",
    "summary": "Enlarged profile sections support the design of larger glazed openings and facades with broad views.",
    "image": "/images/products/finished-windows/95-casement.webp",
    "imageAlt": "95 Casement Window illustrated catalogue configuration",
    "features": [
      "Enlarged profile sections",
      "Double Low-e glazing configurations",
      "Warm-edge configuration listed"
    ],
    "applications": "Large apartments, villas and panoramic residential facades with low-energy design targets.",
    "glazing": [
      {
        "buildUp": "5Low-e + 16A/Ar + 5Low-e + 16A/Ar + 5",
        "uValue": "1.1 / 1.0"
      },
      {
        "buildUp": "5Low-e + 16A/Ar (warm edge) + 5Low-e + 16A/Ar (warm edge) + 5",
        "uValue": "0.85 / 0.75"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 6",
      "air": "Class 8",
      "sound": ">42 dB"
    },
    "catalogPage": 8
  },
  {
    "id": "pu-103",
    "series": "103",
    "name": "103 Tilt-and-Turn Window",
    "kind": "window",
    "summary": "Inward-opening tilt-and-turn operation combines controlled ventilation with full opening for access and cleaning.",
    "image": "/images/products/finished-windows/103-tilt-turn.webp",
    "imageAlt": "103 Tilt-and-Turn Window illustrated catalogue configuration",
    "features": [
      "Inward-opening tilt-and-turn hardware",
      "Multi-point locking",
      "Continuous perimeter compression seals"
    ],
    "applications": "Bedrooms, studies and living spaces in houses and large apartments.",
    "glazing": [
      {
        "buildUp": "5Low-e + 18A/Ar (warm edge) + 5Low-e + 18A/Ar (warm edge) + 5",
        "uValue": "0.8 / 0.7"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 6",
      "air": "Class 8",
      "sound": ">42 dB"
    },
    "catalogPage": 9
  },
  {
    "id": "pu-103-microvent",
    "series": "103",
    "name": "103 Micro-Vent Window",
    "kind": "window",
    "summary": "A window format for larger residential openings, combining a broad glazed view with dedicated opening sections.",
    "image": "/images/products/finished-windows/103-microvent.webp",
    "imageAlt": "103 Micro-Vent Window illustrated catalogue configuration",
    "features": [
      "Large-opening design format",
      "Multiple seals for thermal and acoustic comfort",
      "Ventilation hardware to be confirmed by configuration"
    ],
    "applications": "Large apartments, sky-garden housing and courtyard-facing residential openings.",
    "glazing": [
      {
        "buildUp": "5Low-e + 18A/Ar (warm edge) + 5Low-e + 18A/Ar (warm edge) + 5",
        "uValue": "0.8 / 0.7"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 6",
      "air": "Class 8",
      "sound": ">42 dB"
    },
    "catalogPage": 10
  },
  {
    "id": "pu-114",
    "series": "114",
    "name": "114 Curtain-Wall Window",
    "kind": "window",
    "summary": "A curtain-wall-style window system with visible vertical framing and concealed horizontal framing for an integrated facade appearance.",
    "image": "/images/products/finished-windows/114-curtain-wall.webp",
    "imageAlt": "114 Curtain-Wall Window illustrated catalogue configuration",
    "features": [
      "Visible vertical / concealed horizontal framing",
      "Wide glazed composition",
      "Warm-edge glazing configuration listed"
    ],
    "applications": "Detached villas, townhouses and private residences with coordinated facade glazing.",
    "glazing": [
      {
        "buildUp": "5Low-e + 18A/Ar (warm edge) + 5Low-e + 18A/Ar (warm edge) + 5",
        "uValue": "0.9 / 0.8"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 6",
      "air": "Class 8",
      "sound": ">42 dB"
    },
    "catalogPage": 11
  },
  {
    "id": "pu-entry",
    "series": "Entry",
    "name": "Insulated Entrance Door",
    "kind": "door",
    "summary": "An insulated entrance system with a polyurethane door core and multiple perimeter seals for residential entrances.",
    "image": "/images/products/finished-windows/insulated-entrance-door.webp",
    "imageAlt": "Insulated Entrance Door illustrated catalogue configuration",
    "features": [
      "Polyurethane insulated door core",
      "Multiple perimeter seals",
      "Hardware and finish by project specification"
    ],
    "applications": "Villas, large homes and main entrances to low-energy buildings.",
    "glazing": [
      {
        "buildUp": "Insulated entrance-door assembly",
        "uValue": "0.8"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 6",
      "air": "Class 8",
      "sound": ">42 dB"
    },
    "catalogPage": 12
  },
  {
    "id": "pu-132",
    "series": "132",
    "name": "132 Lift-and-Slide Door",
    "kind": "door",
    "summary": "A lift-and-slide system for wide openings. The closing mechanism compresses the seals while sliding operation saves interior space.",
    "image": "/images/products/finished-windows/132-lift-slide.webp",
    "imageAlt": "132 Lift-and-Slide Door illustrated catalogue configuration",
    "features": [
      "Lift-and-slide operating mechanism",
      "Compression sealing when closed",
      "Wide-opening residential format"
    ],
    "applications": "Courtyards, panoramic balconies and garden entrances.",
    "glazing": [
      {
        "buildUp": "5Low-e + 9A/Ar + 5Low-e + 9A/Ar + 5",
        "uValue": "1.4 / 1.3"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 5",
      "air": "Class 7",
      "sound": ">40 dB"
    },
    "catalogPage": 13
  },
  {
    "id": "pu-145",
    "series": "145",
    "name": "145 Side-Pressure Door",
    "kind": "door",
    "summary": "A side-pressure closing mechanism compresses the gaskets around large glazed openings, combining wide views with a sealed closure.",
    "image": "/images/products/finished-windows/145-side-pressure.webp",
    "imageAlt": "145 Side-Pressure Door illustrated catalogue configuration",
    "features": [
      "Side-pressure gasket compression",
      "Large glazed opening format",
      "Glazing and operating layout by project"
    ],
    "applications": "Balcony renovations, sky-garden homes and large panoramic residential openings.",
    "glazing": [
      {
        "buildUp": "5Low-e + 9A/Ar + 5Low-e + 9A/Ar + 5",
        "uValue": "1.3 / 1.2"
      }
    ],
    "performance": {
      "wind": "Class 9",
      "water": "Class 5",
      "air": "Class 7",
      "sound": ">40 dB"
    },
    "catalogPage": 14
  }
];
