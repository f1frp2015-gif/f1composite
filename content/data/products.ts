export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  imageScale?: number;
  imageFit?: "cover" | "contain";
}

export const productCategories: ProductCategory[] = [
  {
    slug: "fiberglass-structural-shapes",
    title: "Fiberglass Structural Shapes",
    description: "I-beams, channels, angles, tubes, and flat bars in stock sizes with certified mechanical properties.",
    icon: "profiles",
    href: "/products/fiberglass-structural-shapes",
    image: "/images/products/standard-profiles-cover.jpg",
    imageWidth: 1600,
    imageHeight: 1600,
  },
  {
    slug: "custom-pultruded-profiles",
    title: "Custom Pultruded Profiles",
    description: "Bespoke cross-sections engineered to your exact specifications with dedicated tooling.",
    icon: "custom",
    href: "/products/custom-pultruded-profiles",
    image: "/images/products/custom-pultrusions-cover.jpg",
    imageWidth: 1600,
    imageHeight: 1600,
    imageScale: 1.2,
  },
  {
    slug: "frp-solar-mounting-systems",
    title: "Solar Module Frames & Mounting",
    description: "Pultruded FRP module frame profiles, structural PV supports, and lightweight rooftop rails for corrosive and weight-sensitive solar projects.",
    icon: "solar",
    href: "/products/frp-solar-mounting-systems",
    image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
    imageWidth: 1600,
    imageHeight: 1205,
  },
  {
    slug: "frp-gratings",
    title: "FRP Grating Manufacturer",
    description: "Molded and pultruded FRP gratings, solid-top cover plates, and structural deck panels for industrial platforms, marine environments, and pedestrian bridge decks.",
    icon: "gratings",
    href: "/products/frp-gratings",
    image: "/images/products/frp-structural-deck-panel-cover.webp",
    imageWidth: 1254,
    imageHeight: 1254,
    imageAlt: "Pultruded FRP structural deck panel with internal reinforcing webs and an interlocking edge profile",
  },
  {
    slug: "fenestration-systems",
    title: "FRP Window Frames Manufacturer",
    description: "Finished GFRP-PU windows and doors for extreme-cold and passive house buildings — 65–140 series, U_w to 0.78, proven to −60°C.",
    icon: "fenestration",
    href: "/products/frp-window-frames",
    image: "/images/products/window-door/frp-window-frame-70-series-inward-hero.webp",
    imageWidth: 1600,
    imageHeight: 1600,
    imageFit: "contain",
  },
];
