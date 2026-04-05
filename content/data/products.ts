export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  image?: string;
}

export const productCategories: ProductCategory[] = [
  {
    slug: "standard-profiles",
    title: "Standard Profiles",
    description: "I-beams, channels, angles, tubes, and flat bars in stock sizes with certified mechanical properties.",
    icon: "profiles",
    href: "/products/standard-profiles",
    image: "/images/products/pultruded-frp-structural-profiles-overview-engineering-drawing.png",
  },
  {
    slug: "custom-pultrusions",
    title: "Custom Pultrusions",
    description: "Bespoke cross-sections engineered to your exact specifications with dedicated tooling.",
    icon: "custom",
    href: "/products/custom-pultrusions",
    image: "/images/products/custom-frp-profile-engineering-drawing-3d-render.jpg",
  },
  {
    slug: "fenestration-systems",
    title: "Fenestration Systems",
    description: "70/80/90-series window and door frame systems with superior thermal insulation.",
    icon: "fenestration",
    href: "/products/fenestration-systems",
    image: "/images/products/window-door/window&door_frame_80_series_tilt&turn.png",
  },
  {
    slug: "gratings",
    title: "Gratings",
    description: "Molded and pultruded gratings with anti-slip surfaces for industrial and marine environments.",
    icon: "gratings",
    href: "/products/gratings",
    image: "/images/products/plank-grating.png",
  },
];
