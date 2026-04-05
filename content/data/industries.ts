export interface Industry {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export const industries: Industry[] = [
  {
    slug: "construction",
    title: "Construction",
    description: "Lightweight, corrosion-free structural profiles for modern building envelopes and facades.",
    icon: "building",
    href: "/industries/construction",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    description: "Durable FRP solutions for bridges, walkways, and civil engineering structures.",
    icon: "bridge",
    href: "/industries/infrastructure",
  },
  {
    slug: "energy",
    title: "Energy",
    description: "Electrically insulating and UV-resistant profiles for power and renewable energy installations.",
    icon: "bolt",
    href: "/industries/energy",
  },
  {
    slug: "marine",
    title: "Marine",
    description: "Saltwater-resistant gratings and profiles for docks, offshore platforms, and vessels.",
    icon: "anchor",
    href: "/industries/marine",
  },
  {
    slug: "industrial",
    title: "Industrial",
    description: "Chemical-resistant structural systems for processing plants and manufacturing facilities.",
    icon: "factory",
    href: "/industries/industrial",
  },
];
