export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  image?: string;
  imageScale?: number;
}

export const productCategories: ProductCategory[] = [
  {
    slug: "standard-profiles",
    title: "Standard Profiles",
    description: "I-beams, channels, angles, tubes, and flat bars in stock sizes with certified mechanical properties.",
    icon: "profiles",
    href: "/products/standard-profiles",
    image: "/images/products/standard-profiles-cover.jpg",
  },
  {
    slug: "custom-pultrusions",
    title: "Custom Pultrusions",
    description: "Bespoke cross-sections engineered to your exact specifications with dedicated tooling.",
    icon: "custom",
    href: "/products/custom-pultrusions",
    image: "/images/products/custom-pultrusions-cover.jpg",
    imageScale: 1.2,
  },
  {
    slug: "solar-mounting-systems",
    title: "Solar Module Frames & Mounting",
    description: "Pultruded FRP module frame profiles, structural PV supports, and lightweight rooftop rails for corrosive and weight-sensitive solar projects.",
    icon: "solar",
    href: "/products/solar-mounting-systems",
    image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
  },
  {
    slug: "gratings",
    title: "Gratings & Decks",
    description: "Molded and pultruded FRP gratings, solid-top cover plates, and structural deck panels for industrial platforms, marine environments, and pedestrian bridge decks.",
    icon: "gratings",
    href: "/products/gratings",
    image: "/images/products/gratings-cover.jpg",
  },
  {
    slug: "fenestration-systems",
    title: "FRP Windows & Doors",
    description: "Finished GFRP-PU windows and doors for extreme-cold and passive house buildings — 65–140 series, U_w to 0.78, proven to −60°C.",
    icon: "fenestration",
    href: "/products/fenestration-systems",
    image: "/images/products/fenestration-systems-cover.webp",
  },
];
