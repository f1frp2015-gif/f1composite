import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "DDP, Tariffs & HS Codes for FRP Profile Imports";
const pageDescription =
  "Import pultruded FRP profiles: DDP vs FOB vs CIF, HTSUS/HS classification (3926.90 vs 7019), and Section 301 tariff exposure explained for US and Canada buyers.";
const pagePath = "/resources/ddp-tariff-hs-code-guide";
const publishedAt = "2026-07-03";
const updatedAt = "2026-07-03";
const authorName = "Duowei Wang, Ph.D.";
const authorRole = "Industry research and education — markets, standards, and pultrusion adoption";
const authorHref = "/about/authors/duowei-wang";
const reviewedBy = "Yifan Liu, Application Engineer";
const referencedStandards = ["HTSUS 3926.90", "HTSUS 7019", "Section 301 (USTR)", "Incoterms® 2020"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

interface IncotermRow {
  term: string;
  freight: string;
  customsClearance: string;
  dutyPaidBy: string;
  bestFor: string;
}

const incoterms: IncotermRow[] = [
  {
    term: "FOB (Free on Board)",
    freight: "Buyer books and pays ocean/air freight from the origin port",
    customsClearance: "Buyer clears import customs at destination",
    dutyPaidBy: "Buyer",
    bestFor: "Buyers with an existing customs broker and freight forwarder who want direct control over the import leg",
  },
  {
    term: "CIF (Cost, Insurance & Freight)",
    freight: "Seller books freight and insurance to the destination port",
    customsClearance: "Buyer clears import customs at destination",
    dutyPaidBy: "Buyer",
    bestFor: "Buyers who want one seller-arranged freight leg but still handle their own import clearance",
  },
  {
    term: "DDP (Delivered Duty Paid)",
    freight: "Seller arranges freight door-to-door",
    customsClearance: "Seller clears both export and import customs",
    dutyPaidBy: "Seller — duty and tariff are built into the quoted price",
    bestFor: "Buyers who want one landed-cost number with no customs surprise, and no in-house import compliance team",
  },
  {
    term: "DAP (Delivered at Place)",
    freight: "Seller arranges freight door-to-door",
    customsClearance: "Buyer clears import customs (duty/tax not prepaid by seller)",
    dutyPaidBy: "Buyer",
    bestFor: "Buyers who want door delivery but prefer to self-file duty for tax-recovery or bonded-warehouse reasons",
  },
];

const hsCandidates = [
  {
    application: "Structural pultruded profile (I-beam, channel, angle, tube, flat bar) — no window/door hardware function",
    heading: "HTSUS 3926.90 or 7019",
    logic: "Classification turns on the General Rules of Interpretation (GRI) essential-character test: a resin-matrix-dominant plastic article is classified under 3926.90 (other articles of plastics), while a glass-fiber-content-dominant article can fall under 7019 (glass fibres and articles thereof). The same physical profile can be classified either way depending on composition ratio, finishing, and the importing country's prior rulings.",
  },
  {
    application: "Window / door frame profile (finished fenestration component)",
    heading: "HTSUS 3925 (in some rulings)",
    logic: "Builders' ware of plastics for windows and doors is its own heading; a finished fenestration profile can be classified here instead of 3926.90 depending on how the importing customs authority treats the finished-component function versus the raw-profile form.",
  },
  {
    application: "Rod, bar, or linear-section stock of reinforced plastic",
    heading: "HTSUS 3916 (in some rulings)",
    logic: "Monofilament, rods, and sticks of plastics have a dedicated heading that some rulings apply to certain linear FRP stock shapes, again subject to essential-character analysis.",
  },
];

const faqs = [
  {
    question: "What HS code applies to pultruded FRP profiles?",
    answer:
      "There is no single universal HS code for pultruded FRP — classification depends on the profile's composition, finishing, and end use, decided under the General Rules of Interpretation (GRI) essential-character test. Standard structural profiles most commonly fall under HTSUS 3926.90 (other articles of plastics) or 7019 (glass fibres and articles thereof); finished window/door components sometimes fall under 3925; certain rod/bar stock under 3916. The only way to get a number you can rely on is a binding ruling from the destination country's customs authority (a CBP Binding Ruling in the US) for your specific profile.",
  },
  {
    question: "Does Section 301 apply to all FRP profiles imported from China?",
    answer:
      "Section 301 tariffs are applied by HTSUS heading against China-origin goods broadly, not against \"FRP\" as a product category — so if your profile's HTSUS heading is on an active Section 301 list, the tariff applies regardless of whether it is a bulk commodity shape or an engineered custom section. This is distinct from anti-dumping/countervailing duty (AD/CVD) measures, which historically have targeted glass fiber itself (HTSUS 7019) and a narrower set of finished glass-fiber products more specifically than they target pultruded structural profiles generally. Because both regimes are HS-code and origin specific and change over time, always confirm current exposure for your exact classification and shipment date via your customs broker or the current USTR/CBP published lists rather than assuming a blanket rate.",
  },
  {
    question: "What is DDP and why does it matter when importing FRP profiles?",
    answer:
      "DDP (Delivered Duty Paid) is an Incoterms® 2020 rule where the seller handles export clearance, freight, import clearance, and duty payment, delivering to your named destination at one all-in price. For FRP buyers, the practical value is eliminating landed-cost surprises: HS classification disputes, Section 301 tariff exposure, and customs broker fees are the seller's problem to solve before quoting, not a variable the buyer discovers at the port. The trade-off is that DDP pricing embeds the seller's assumptions about classification and duty rate — a buyer who wants to control that assumption directly, or who can recover duty through their own bonded-warehouse or FTZ arrangement, may prefer FOB or CIF instead.",
  },
  {
    question: "How do I get a binding customs ruling for my FRP profile?",
    answer:
      "In the United States, importers or their customs brokers can request a Binding Ruling from US Customs and Border Protection (CBP) via the Customs Rulings Online Search System (CROSS), submitting the profile's technical drawing, material composition (resin type and glass content by weight), and intended use. Processing typically takes several weeks. Canada and the EU have equivalent National Customs Ruling / Binding Tariff Information (BTI) systems. For a recurring import program, a binding ruling removes classification risk for every future shipment of that exact profile.",
  },
  {
    question: "Can I avoid Section 301 tariffs on FRP sourced from China?",
    answer:
      "Not through misclassification — that is a compliance risk, not a savings strategy, and correcting an under-declared classification after the fact typically costs far more than the original duty. Legitimate levers are: (1) confirming your profile is classified under its correct, lowest-applicable heading rather than a higher-duty default; (2) checking whether your specific HTSUS subheading currently holds an active USTR exclusion; (3) longer term, Foreign Trade Zone (FTZ) delivery or a non-China production step that changes country of origin under substantial-transformation rules. There is no shortcut that avoids a correctly-classified, currently-tariffed heading.",
  },
  {
    question: "Is DDP more expensive than FOB in total landed cost?",
    answer:
      "Not necessarily. DDP pricing bundles freight, customs brokerage, and duty into one number, which can carry a margin for the seller's risk-taking on classification and duty accuracy. FOB/CIF shift that same freight, brokerage, and duty cost onto the buyer directly, plus the buyer's own broker fees and the risk of a classification dispute. For buyers without an existing import compliance function, DDP is frequently cost-neutral or cheaper once broker fees and classification risk are counted — the real difference is who carries the compliance risk, not just which number is larger.",
  },
];

export default function DdpTariffHsCodeGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: absoluteUrl(`${pagePath}/opengraph-image`),
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Person", name: authorName },
    editor: { "@type": "Person", name: reviewedBy },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    about: [
      { "@type": "Thing", name: "Incoterms" },
      { "@type": "Thing", name: "HS / HTSUS tariff classification" },
      { "@type": "Thing", name: "Section 301 tariffs" },
      { "@type": "Thing", name: "DDP import pricing" },
    ],
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="Import & Trade Compliance"
        title="DDP, Tariffs & HS Codes for FRP Profile Imports"
        description="A practical guide to Incoterms, HS/HTSUS classification, and Section 301 tariff exposure for buyers importing pultruded FRP profiles — so the price you're quoted is the price that lands at your jobsite."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "DDP, Tariffs & HS Codes" },
        ]}
      />

      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={authorName}
        authorRole={authorRole}
        authorHref={authorHref}
        reviewedBy={reviewedBy}
        standards={referencedStandards}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why Landed-Cost Surprises Happen</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Three variables, quoted separately, that should be quoted together
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            A landed-cost surprise on an FRP import almost always traces back to one of three things being left out of the initial quote: which Incoterm actually applies (who pays freight and duty, and when risk transfers), which HS/HTSUS heading the profile is classified under, and whether that heading currently carries Section 301 or other trade-remedy exposure. Any one of these left unstated turns a clean FOB unit-price quote into a landed cost that is 20&ndash;30% higher once the shipment clears customs.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            This page lays out all three in one place. For country-specific detail already worked through for real projects, see the{" "}
            <Link href="/regions/frp-pultrusion-supplier-usa" className="text-teal-text hover:underline">
              United States sourcing page
            </Link>{" "}
            and the{" "}
            <Link href="/regions/frp-passive-house-windows-canada" className="text-teal-text hover:underline">
              Canada passive house window page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Incoterms for FRP Imports</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            FOB vs CIF vs DDP vs DAP — who does what
          </h2>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[900px] border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Incoterm</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Freight</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Import clearance</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Duty paid by</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Best for</th>
                </tr>
              </thead>
              <tbody>
                {incoterms.map((row, i) => (
                  <tr key={row.term} className={`border-b border-border-default ${i % 2 === 0 ? "bg-white" : "bg-bg2/40"} ${row.term.startsWith("DDP") ? "bg-teal/5" : ""}`}>
                    <td className="px-[13px] py-[13px] font-semibold text-t1">{row.term}</td>
                    <td className="px-[13px] py-[13px] text-t2">{row.freight}</td>
                    <td className="px-[13px] py-[13px] text-t2">{row.customsClearance}</td>
                    <td className="px-[13px] py-[13px] text-t2">{row.dutyPaidBy}</td>
                    <td className="px-[13px] py-[13px] text-t2">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            F1 Composite quotes FOB, CIF, and DDP on request. DDP USA and DDP Canada quotes carry the current Section 301 / GST exposure pre-quoted inline, so the number in the quote is the number that lands at the jobsite.
          </p>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>HS / HTSUS Classification</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            One profile, more than one possible heading
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Pultruded FRP does not have a single dedicated HS heading. Customs classification runs on the General Rules of Interpretation (GRI) &ldquo;essential character&rdquo; test — is the article&rsquo;s defining characteristic its plastic resin matrix, or its glass-fiber content and form? The table below is illustrative of the candidate headings that show up in practice; it is not exhaustive and is not a substitute for a binding ruling on your exact profile.
          </p>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {hsCandidates.map((row) => (
              <div key={row.application} className="rounded-[8px] border border-border-default bg-bg2 p-[29px]">
                <p className="text-f12 font-bold uppercase tracking-[0.08em] text-teal-text">{row.heading}</p>
                <h3 className="mt-[8px] text-f15 font-bold text-t1">{row.application}</h3>
                <p className="mt-[13px] text-f13 leading-golden text-t2">{row.logic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Section 301 &amp; Trade-Remedy Exposure</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Two different regimes, often conflated
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Section 301 tariffs apply by HTSUS heading against China-origin goods on the active USTR lists — if your profile&rsquo;s heading is listed, the tariff applies to the shipment regardless of what the part is used for. Anti-dumping and countervailing duty (AD/CVD) measures are a separate regime that, for the composites industry, has historically targeted glass fiber itself (HTSUS 7019) and a narrower set of finished glass-fiber products more specifically than it targets pultruded structural profiles as a category. In practice this means: assume Section 301 exposure applies to most China-origin FRP profile headings, and check AD/CVD exposure specifically for your HS classification and origin rather than assuming it applies uniformly across every FRP product. Both lists change; confirm current rates for your exact heading and shipment date via your customs broker or the current USTR/CBP publications before finalizing a PO.
          </p>
        </div>
      </section>

      <AnswerBlocks
        tag="Quick Answers"
        title="DDP, HS codes, and Section 301 — frequently asked"
        items={faqs}
      />

      <RelatedLinks
        groups={[
          {
            title: "Country-specific sourcing pages",
            links: [
              { href: "/regions/frp-pultrusion-supplier-usa", label: "FRP sourcing for US projects (Section 301 detail)" },
              { href: "/regions/frp-passive-house-windows-canada", label: "FRP passive house windows — Canada (HS & GST detail)" },
            ],
          },
          {
            title: "Sourcing & supplier vetting",
            links: [
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose an FRP pultrusion supplier" },
              { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "China alternative to Strongwell / Exel" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion capability" },
            ],
          },
          {
            title: "Explore further",
            links: [
              { href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles hub" },
              { href: "/fiberglass-pultruded-profile-price", label: "Fiberglass profile price estimator (FOB baseline)" },
              { href: "/resources/glossary", label: "FRP & pultrusion glossary" },
              { href: "/resources/technical-data", label: "Technical data sheets" },
            ],
          },
        ]}
      />

      <InnerCTA title="Need a DDP quote with tariffs pre-disclosed?" />
    </>
  );
}
