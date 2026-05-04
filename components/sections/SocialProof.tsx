import Link from "next/link";
import Image from "next/image";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";

const featuredCases = [
  {
    slug: "qinling-station-antarctic-passive-windows",
    title: "Qinling Station, Antarctic Ross Sea",
    industry: "Construction",
    location: "Ross Sea, Antarctica",
    description:
      "PHI-certified (Component-ID 2491wi03) 90-series pultruded GFRP Passive House windows at China's fifth Antarctic research station — phA arctic climate class.",
    image: "/images/case-studies/frp-qinling-station-antarctic-ross-sea-aerial.webp",
    metrics: [
      { value: "phA / A+", label: "PHI Class" },
      { value: "−60°C", label: "Design Low" },
      { value: "45 m/s", label: "Wind Loading" },
    ],
  },
  {
    slug: "factory-access-staircase",
    title: "F1 Factory FRP Access Staircase",
    industry: "Industrial",
    location: "Chongqing, China",
    description:
      "F1 Composite's own production base — staircase and platform built entirely from our pultruded FRP profiles. 18 months of live, walkable reference for visiting customers.",
    image: "/images/case-studies/frp-factory-access-staircase-hero.webp",
    metrics: [
      { value: "68%", label: "Weight Reduction" },
      { value: "0", label: "Maintenance Cost" },
      { value: "3-day", label: "Install Window" },
    ],
  },
  {
    slug: "yancheng-talent-apartment-fenestration",
    title: "Yancheng Talent Apartment",
    industry: "Construction",
    location: "Yancheng, Jiangsu, China",
    description:
      "Complete FRP fenestration package — 65-series casement (inward + outward), 90-series sliding, and matching facade frames — across ~20 residential and commercial buildings in a coastal talent-housing development.",
    image: "/images/case-studies/frp-talent-apartment-yancheng-aerial-view.webp",
    metrics: [
      { value: "~20", label: "Buildings Glazed" },
      { value: "1.6", label: "U-Value (W/m²K)" },
      { value: "65 + 90", label: "Series Supplied" },
    ],
  },
];

export default function SocialProof() {
  return (
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>Proven Results</SectionTag>
        <h2 className="mt-[13px] max-w-[800px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
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
