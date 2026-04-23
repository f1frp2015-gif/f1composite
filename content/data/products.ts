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
    slug: "gratings",
    title: "Gratings & Decks",
    description: "Molded and pultruded FRP gratings, solid-top cover plates, and structural deck panels for industrial platforms, marine environments, and pedestrian bridge decks.",
    icon: "gratings",
    href: "/products/gratings",
    image: "/images/products/gratings-cover.jpg",
  },
  {
    slug: "fenestration-systems",
    title: "Fenestration Systems",
    description: "70/80/90-series window and door frame systems with superior thermal insulation.",
    icon: "fenestration",
    href: "/products/fenestration-systems",
    image: "/images/products/fenestration-systems-cover.jpg",
  },
];
