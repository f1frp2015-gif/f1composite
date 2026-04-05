import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import InnerCTA from "@/components/sections/InnerCTA";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "F1 Composite Co., Ltd — founded by engineers with deep fiber reinforced polymer expertise. Headquartered in China, serving global markets with pultruded FRP profiles.",
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
          <h2 className="mt-[21px] max-w-[640px] text-f31 font-extrabold leading-[1.2] text-t1">
            From engineering roots to global reach
          </h2>
          <div className="mt-[34px] grid gap-[34px] md:grid-cols-[1fr_1fr]">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                F1 Composite began in 2008 when a group of FRP engineers recognized a gap in
                the market: manufacturers who truly understood the science behind pultrusion
                were rare, and those willing to share that knowledge with clients were rarer
                still.
              </p>
              <p>
                We built our company around a different philosophy — that the best way to grow
                is to make our customers more capable. Our KNOWHOW services, launched in 2015,
                formalized this belief into a structured offering that helps clients design,
                specify, and deploy pultruded profiles with confidence.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Today, F1 Composite is headquartered in China with a catalogue of over 200
                pultruded profile types. We serve architects, engineers, distributors, and OEMs
                across five continents — from standard structural shapes to fully custom
                fenestration systems.
              </p>
              <p>
                What has not changed is our founding conviction: deep polymer expertise,
                shared openly, creates the strongest partnerships.
              </p>
            </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <InnerCTA title="Ready to work with a trusted FRP partner?" />
    </>
  );
}
