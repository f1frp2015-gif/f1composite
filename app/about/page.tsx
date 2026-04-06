import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import InnerCTA from "@/components/sections/InnerCTA";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About F1 Composite — Pultruded FRP Profiles Manufacturer in China",
  description:
    "F1 Composite: 5 manufacturing bases, 370 pultrusion lines, 150,000 tons annual capacity. ISO 9001 certified FRP profiles manufacturer headquartered in China, exporting to 30+ countries.",
};

const milestones = [
  { year: "2008", event: "F1 Composite founded by a team of FRP engineers" },
  { year: "2012", event: "First export shipment — profiles delivered to Southeast Asia" },
  { year: "2015", event: "KNOWHOW technical services launched for custom profile development" },
  { year: "2018", event: "Catalogue reaches 100+ standard pultruded profile types" },
  { year: "2020", event: "Fenestration systems division established" },
  { year: "2023", event: "200+ engineered profiles serving five continents" },
];

const certifications = [
  "ISO 9001:2015 Quality Management System",
  "CE Marking (EU Construction Products Regulation)",
  "EN 13706 Structural FRP Profile Compliance",
  "ASTM Standard Test Method Compliance",
];

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "F1 Composite Co., Ltd",
    url: absoluteUrl("/"),
    description:
      "Founded by engineers with deep fiber reinforced polymer expertise. Headquartered in China, serving global markets with pultruded FRP profiles.",
    foundingDate: "2008",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 153 Jinyu Avenue, Cuntan Street, Liangjiang New Area",
      addressLocality: "Chongqing",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "Doris.li@f1composite.com",
      telephone: "+86-138-8333-3993",
      contactType: "sales",
      availableLanguage: ["English", "Chinese"],
    },
    knowsAbout: [
      "Pultrusion",
      "Fiber Reinforced Polymer",
      "FRP Profiles",
      "Composite Manufacturing",
    ],
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <PageHeader
        tag="About"
        title="Engineering Composites for the World"
        description="F1 Composite Co., Ltd was founded by engineers with deep fiber reinforced polymer expertise. Headquartered in China, we serve global markets with precision-engineered pultruded profiles."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* Mission & Vision */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] md:grid-cols-2">
            <div>
              <SectionTag>Our Mission</SectionTag>
              <h2 className="mt-[21px] text-f31 font-extrabold leading-[1.2] text-t1">
                The most trusted pultruded composite profile service partner
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                We exist to be the world&apos;s most trusted partner for pultruded composite profiles.
                Every profile we engineer, every technical consultation we provide, and every
                KNOWHOW engagement we deliver is guided by this single commitment.
              </p>
            </div>
            <div>
              <SectionTag>Our Vision</SectionTag>
              <h2 className="mt-[21px] text-f31 font-extrabold leading-[1.2] text-t1">
                Advancing infrastructure through engineered composites
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                We envision a built environment where fiber reinforced polymers replace legacy
                materials wherever strength, durability, and corrosion resistance matter. Our
                engineering-first approach accelerates that transition across construction,
                infrastructure, energy, and marine industries worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Our Story</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-f31 font-extrabold leading-[1.2] text-t1">
            From engineering roots to global reach
          </h2>
          <div className="mt-[34px] grid gap-[34px] md:grid-cols-[1fr_1fr]">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                F1 Composite is the international brand of Chongqing FengDu New Material
                Co., Ltd — one of China&apos;s largest vertically integrated pultrusion
                manufacturers. We operate five production bases with 370 pultrusion lines,
                serving global markets with the same engineering team and production
                facilities that supply China&apos;s domestic infrastructure.
              </p>
              <p>
                F1 Composite was created to give overseas clients what they need beyond
                the factory floor: English-language engineering support, international
                quality documentation, application consulting, and responsive project
                management. When you work with F1, you work directly with the manufacturer.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Today, F1 Composite serves architects, engineers, distributors, and OEMs
                across 30+ countries — from standard structural profiles to PHI-certified
                fenestration systems. Our Fengdu Passive GFRP 90 Series window frame holds
                Passive House Institute certification (Component-ID 2491wi03), demonstrating
                the engineering depth behind every product we deliver.
              </p>
              <p>
                What sets us apart is not manufacturing scale alone — it is the combination
                of deep polymer expertise, proactive technical support, and a genuine
                commitment to making our clients more capable in specifying and deploying
                pultruded FRP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Capacity */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Production Scale</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-f31 font-extrabold leading-[1.2] text-t1">
            Manufacturing at scale, engineered to precision
          </h2>
          <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
            Our own production network spans five bases across China — giving F1 Composite clients the capacity, redundancy, and quality consistency that large-scale infrastructure projects demand.
          </p>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "5", label: "Manufacturing Bases", detail: "Nationwide production network" },
              { value: "370", label: "Pultrusion Lines", detail: "Continuous production capacity" },
              { value: "150,000", label: "Tons / Year", detail: "Annual profile output" },
              { value: "1,000+", label: "Die Sets", detail: "Custom tooling library" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[8px] border border-border-default bg-white p-[34px] text-center"
              >
                <span className="text-[clamp(32px,4vw,48px)] font-extrabold text-teal">{stat.value}</span>
                <p className="mt-[5px] text-f15 font-bold text-t1">{stat.label}</p>
                <p className="mt-[4px] text-f13 text-t3">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Milestones</SectionTag>
          <h2 className="mt-[21px] text-f31 font-extrabold leading-[1.2] text-t1">
            Key moments in our journey
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:border-teal-border"
              >
                <span className="text-f24 font-extrabold text-teal-text">{m.year}</span>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Global Reach */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] md:grid-cols-2">
            <div>
              <SectionTag>Certifications</SectionTag>
              <h2 className="mt-[21px] text-f31 font-extrabold leading-[1.2] text-t1">
                Quality you can verify
              </h2>
              <ul className="mt-[21px] space-y-[13px]">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-[13px] text-f15 leading-golden text-t2">
                    <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTag>Global Reach</SectionTag>
              <h2 className="mt-[21px] text-f31 font-extrabold leading-[1.2] text-t1">
                Engineered in China, delivered worldwide
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                From our production base in China, we ship pultruded FRP profiles to over 30
                countries across Asia-Pacific, Europe, the Middle East, Africa, and the Americas.
                Every order is backed by English-language documentation, international logistics
                coordination, and responsive project support.
              </p>
              <div className="mt-[21px] flex flex-wrap gap-[13px]">
                <LinkArrow href="/technology">Explore Our Technology</LinkArrow>
                <LinkArrow href="/contact">Get in Touch</LinkArrow>
                <a
                  href="https://www.youtube.com/@F1Composites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[5px] text-f15 font-semibold text-teal-text transition-colors hover:text-teal"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InnerCTA title="Ready to work with a trusted FRP partner?" />
    </>
  );
}
