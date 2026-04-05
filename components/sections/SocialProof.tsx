import Link from "next/link";
import Image from "next/image";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";

const featuredCases = [
  {
    slug: "european-bridge-deck",
    title: "European Bridge Deck Replacement",
    industry: "Infrastructure",
    location: "Netherlands",
    description:
      "Replaced corroding steel bridge deck with custom-pultruded FRP profiles — 40% weight reduction, 100-year design life.",
    image: "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg",
    metrics: [
      { value: "1,200m²", label: "Deck Area" },
      { value: "40%", label: "Weight Reduction" },
      { value: "100yr", label: "Design Life" },
    ],
  },
  {
    slug: "coastal-marina-walkway",
    title: "Coastal Marina Walkway System",
    industry: "Marine",
    location: "United Kingdom",
    description:
      "Complete FRP grating and handrail system for a 500m coastal marina — zero corrosion maintenance in saltwater environment.",
    image: "/images/case-studies/frp-coastal-marina-walkway-grating-system.jpg",
    metrics: [
      { value: "500m", label: "Walkway Length" },
      { value: "60%", label: "Lifecycle Savings" },
      { value: "50yr", label: "Design Life" },
    ],
  },
  {
    slug: "solar-farm-mounting",
    title: "Solar Farm Mounting Structure",
    industry: "Energy",
    location: "Australia",
    description:
      "UV-stable FRP mounting profiles for a 50MW solar farm — 35% lighter than aluminium, non-conductive.",
    image: "/images/case-studies/frp-solar-farm-mounting-structure.jpg",
    metrics: [
      { value: "50MW", label: "Capacity" },
      { value: "35%", label: "Weight Reduction" },
      { value: "50,000+", label: "Mounting Points" },
    ],
  },
];

export default function SocialProof() {
  return (
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>Proven Results</SectionTag>
        <h2 className="mt-[13px] max-w-[540px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
          Real projects, measurable outcomes
        </h2>

        <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
          {featuredCases.map((item) => (
            <Link
              key={item.slug}
              href={`/case-studies/${item.slug}`}
              className="group overflow-hidden rounded-[8px] border border-border-default bg-bg2 transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-lg"
            >
              <div className="relative aspect-[1.618] overflow-hidden">
                <span className="absolute left-[13px] top-[13px] z-10 rounded-[4px] bg-teal/90 px-[8px] py-[3px] text-f11 font-bold uppercase tracking-[1px] text-white">
                  {item.industry} · {item.location}
                </span>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[0.34s] group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-[21px]">
                <h3 className="text-f19 font-bold text-t1 group-hover:text-teal-text">
                  {item.title}
                </h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">
                  {item.description}
                </p>

                <div className="mt-[13px] grid grid-cols-3 gap-[8px]">
                  {item.metrics.map((stat) => (
                    <div key={stat.label}>
                      <span className="block text-f19 font-extrabold text-teal">
                        {stat.value}
                      </span>
                      <span className="text-f11 font-bold uppercase tracking-[1px] text-t3">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-[21px]">
          <LinkArrow href="/case-studies">View all case studies</LinkArrow>
        </div>
      </div>
    </section>
  );
}
