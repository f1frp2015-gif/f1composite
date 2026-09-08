import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { BEAM_BRIDGE_METHOD_SOURCES } from "@/lib/engineering/beam-bridge";
import BeamExplorer from "./BeamExplorer";
import BridgeConceptDiagram from "./BridgeConceptDiagram";
import { caseStudies, faqs, sourceUrls } from "./bridge-data";
import "./beam-bridge.css";

const pagePath = "/case-studies/beam-bridge";
const title = "FRP Beam Bridge Design: Four Manufacturing Routes";
const description =
  "Explore four FRP pedestrian bridge concepts, F1 fabrication capabilities, transparent beam calculations and documented bridge case studies.";
export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});
const inquiry = "/contact?source=beam-bridge-guide&inquiry_type=engineering";
const pengshuiPath =
  "/resources/blog/china-first-all-composite-truss-bridge-pengshui";

const routes = [
  {
    id: "A",
    title: "Three straight modules",
    subtitle: "Repeat the module. Shorten the span.",
    process: "Modular multicell construction",
    geometry: "3 × 4 m modules · 4 support locations",
    depth: "≈250 mm reference depth",
    benefit:
      "A shallow profile and smaller transport units where intermediate supports are feasible.",
    scope:
      "Profile and deck selection, module detailing, connection coordination and packing development.",
    resolve:
      "Confirm actual bearing centres, foundations, joints and local cell-wall stability. The three 4 m dimensions describe module lengths; final structural spans follow the support design.",
    link: "/products/frp-deck-panels",
    label: "Explore deck and section options",
  },
  {
    id: "B",
    title: "Straight deep box",
    subtitle: "Make structural depth do the work.",
    process: "Custom multicell box development",
    geometry: "12 m bridge body · 2 support locations",
    depth: "≈970 mm reference depth",
    benefit:
      "A concept for a crossing with end supports and space for a deeper structure below the deck.",
    scope:
      "Custom section development, laminate and connection coordination, manufacturing and long-load review.",
    resolve:
      "Establish the actual support span, laminate, shear webs, end diaphragms and bearings. Review lifting, mould or assembly strategy and the long-load transport envelope.",
    link: "/products/custom-pultruded-profiles",
    label: "Explore custom section development",
  },
  {
    id: "C",
    title: "Standard I-beam assembly",
    subtitle: "Start with the standard-profile route.",
    process: "Pultrusion + component assembly",
    geometry: "12 m overall assembly · supports by design",
    depth: "Member depth selected by calculation",
    benefit:
      "A practical starting point for a cost study using longitudinal I-beams, cross-members and a selected deck.",
    scope:
      "Pultruded profiles, cut-to-length and drilling coordination, deck and handrail integration, and assembly detailing.",
    resolve:
      "Confirm section and tooling availability. Calculate girder spacing, support spacing, lateral restraint, deck distribution and every connection; 12 m overall does not establish a 12 m clear span.",
    link: "/products/fiberglass-structural-shapes/frp-i-beam",
    label: "Explore FRP I-beams",
  },
  {
    id: "D",
    title: "Custom curved GRP",
    subtitle: "Let geometry shape the process.",
    process: "Bespoke mould + hand-laid laminate",
    geometry: "12 m along the bridge · curved alignment",
    depth: "Section and laminate developed to brief",
    benefit:
      "A bespoke route for landscape crossings where the alignment and architectural form drive the design.",
    scope:
      "Geometry, tooling and process development, with bonded-web details and a controlled cure plan.",
    resolve:
      "Confirm large-mould production capacity for the project, laminate placement, bond qualification and inspection access. Curvature needs a spatial model for bending, shear and torsion; mould, labour and transport shape the cost.",
    link: inquiry,
    label: "Discuss a bespoke bridge form",
  },
] as const;

const questions = [
  {
    question: "Can F1 support different FRP bridge manufacturing routes?",
    answer:
      "F1 supports standard pultruded profiles, deck and handrail integration, fabrication and engineering coordination. A project can begin with a standard I-beam assembly or develop a modular, custom box or curved moulded concept. Bespoke sections, large moulds, laminate processes and testing are confirmed for the specific project before manufacturing is committed.",
  },
  {
    question: "Does a 12 m bridge body mean a 12 m clear span?",
    answer:
      "No. Overall body length, module length, distance between bearing centres and clear opening are different dimensions. Three nominal 4 m modules may have four support locations, while a 12 m body on two supports has a different structural demand. The structural model uses the actual support arrangement and bearing-centre span.",
  },
  ...faqs.filter(
    (faq) =>
      !faq.question.includes("How wide") &&
      !faq.question.includes("Why do footbridges") &&
      !faq.question.includes("How long"),
  ),
];
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${absoluteUrl(pagePath)}#article`,
      headline: title,
      description,
      url: absoluteUrl(pagePath),
      mainEntityOfPage: absoluteUrl(pagePath),
      datePublished: "2026-08-31",
      dateModified: "2026-09-08",
      isAccessibleForFree: true,
      author: {
        "@type": "Organization",
        name: "F1 Composite",
        url: absoluteUrl("/about"),
      },
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
      image: caseStudies.map((item) => absoluteUrl(item.image)),
      citation: [
        sourceUrls.tmrGuide,
        sourceUrls.jrcVibration,
        sourceUrls.ats5880,
        sourceUrls.aashtoFrp,
        sourceUrls.moggill,
        sourceUrls.saoSilvestre,
        sourceUrls.saoSilvestreDynamic,
        BEAM_BRIDGE_METHOD_SOURCES[0].href,
        absoluteUrl(pengshuiPath),
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: questions.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl(pagePath)}#case-studies`,
      name: "Public bridge engineering references",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${absoluteUrl(pagePath)}#${item.id}`,
        name: item.name,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case Studies",
          item: absoluteUrl("/case-studies"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Beam Bridge",
          item: absoluteUrl(pagePath),
        },
      ],
    },
  ],
};
function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="bb-text-link">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
function SectionTitle({
  number,
  eyebrow,
  title: heading,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="bb-section-heading">
      <div>
        <p className="bb-eyebrow">
          <span>{number}</span> {eyebrow}
        </p>
        <h2>{heading}</h2>
      </div>
      {children && <div className="bb-section-intro">{children}</div>}
    </div>
  );
}

export default function BeamBridgeCaseStudiesPage() {
  return (
    <div className="bridge-page">
      <JsonLd data={structuredData} />
      <header className="bb-hero">
        <div className="bb-shell">
          <nav className="bb-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/case-studies">Case studies</Link>
            <span>/</span>
            <span>Beam bridges</span>
          </nav>
          <div className="bb-hero-layout">
            <div className="bb-hero-copy">
              <p className="bb-eyebrow">F1 COMPOSITE / BRIDGE ENGINEERING</p>
              <h1>
                FRP beam bridges.
                <br />
                <span>
                  Built around
                  <br />
                  your crossing.
                </span>
              </h1>
              <p className="bb-hero-description">
                From pultruded I-beam assemblies to bespoke moulded forms.
                Connect the right process, a clear load path and a practical
                delivery plan.
              </p>
              <div className="bb-actions">
                <a
                  className="bb-button bb-button-primary"
                  href="#bridge-options"
                >
                  Explore the four routes <span>↗</span>
                </a>
                <a className="bb-button bb-button-quiet" href="#calculation">
                  Follow the calculation <span>↓</span>
                </a>
              </div>
              <p className="bb-hero-caption">
                Pedestrian bridges · Landscape crossings · Cycleways
              </p>
            </div>
            <figure className="bb-hero-figure">
              <div className="bb-drawing-label">
                <span>STRUCTURAL SYSTEM / EXPLODED VIEW</span>
                <span>FIG. 01</span>
              </div>
              <BridgeConceptDiagram variant="C" hero />
              <figcaption>
                <span>
                  <i /> Deck
                </span>
                <span>
                  <i /> Cross-members
                </span>
                <span>
                  <i /> Main girders
                </span>
              </figcaption>
              <p>Concept assembly · support spacing established by design</p>
            </figure>
          </div>
          <div className="bb-hero-bottom">
            <span>ONE PROJECT BRIEF. FOUR FABRICATION ROUTES.</span>
            <div>
              <span>
                <b>A</b> Modular box
              </span>
              <span>
                <b>B</b> Deep box
              </span>
              <span>
                <b>C</b> I-beam assembly
              </span>
              <span>
                <b>D</b> Curved moulding
              </span>
            </div>
          </div>
        </div>
      </header>
      <nav className="bb-page-nav" aria-label="On this page">
        <div className="bb-shell">
          <a href="#capability">01 / F1 capability</a>
          <a href="#bridge-options">02 / Four routes</a>
          <a href="#calculation">03 / Calculation</a>
          <a href="#load-path">04 / Design checks</a>
          <a href="#case-studies">05 / Case evidence</a>
          <a href="#delivery">06 / Your project</a>
        </div>
      </nav>

      <section id="capability" className="bb-section">
        <div className="bb-shell">
          <SectionTitle
            number="01"
            eyebrow="CAPABILITY, CONNECTED"
            title="A bridge is a system. So is our approach."
          >
            <p>
              F1 brings pultruded profiles, walking surfaces, connection
              detailing and fabrication support into one project conversation.
              The route develops around your site, geometry and performance
              requirements.
            </p>
          </SectionTitle>
          <div className="bb-capability-layout">
            <figure className="bb-factory-proof">
              <Image
                src="/images/case-studies/frp-factory-access-staircase-hero.webp"
                alt="F1 factory FRP staircase and elevated access platform assembled from composite structural profiles and grating"
                width={1200}
                height={900}
                sizes="(max-width: 767px) 100vw, 50vw"
              />
              <figcaption>
                <span>F1 FACTORY / CHONGQING</span>
                <strong>Our profiles. An assembled structure.</strong>
                <Link href="/case-studies/factory-access-staircase">
                  View the factory access case <span>↗</span>
                </Link>
              </figcaption>
            </figure>
            <div className="bb-capability-copy">
              <p className="bb-eyebrow">FROM COMPONENT TO ASSEMBLY</p>
              <h3>Practical experience behind the bridge conversation.</h3>
              <p>
                Our in-house staircase and platform bring together pultruded
                structural members, grating, handrails and bolted connections.
                This is a tangible reference for component fabrication and
                assembly—the same disciplines that a bridge package needs.
              </p>
              <div className="bb-capability-lines">
                {[
                  [
                    "01",
                    "Pultruded structural components",
                    "I-beams, hollow sections, channels and project-specific profiles.",
                  ],
                  [
                    "02",
                    "Fabrication and system integration",
                    "Cut lengths, hole patterns, walking surfaces, handrails and connection coordination.",
                  ],
                  [
                    "03",
                    "Custom route development",
                    "Section geometry, moulding strategy, laminate requirements and production qualification.",
                  ],
                  [
                    "04",
                    "A coordinated delivery package",
                    "Drawings, quality records, module packing and installation planning.",
                  ],
                ].map(([n, heading, body]) => (
                  <div key={n}>
                    <span>{n}</span>
                    <div>
                      <h4>{heading}</h4>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="bb-small">
                The factory case demonstrates fabrication and assembly. Bridge
                loads, fatigue, dynamics and owner acceptance require their own
                verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="bridge-options" className="bb-section bb-tinted">
        <div className="bb-shell">
          <SectionTitle
            number="02"
            eyebrow="THE MANUFACTURING ROUTES"
            title="One crossing. Four ways to make it."
          >
            <p>
              Compare the structural arrangement first, then the manufacturing
              process. Each route below has a different balance of supports,
              structural depth, tooling and site work.
            </p>
          </SectionTitle>
          <div className="bb-brief-strip">
            <div>
              <span>COMMON CONCEPT BRIEF</span>
              <strong>
                12 m <small>bridge body</small>
              </strong>
            </div>
            <div>
              <span>WIDTH TARGET</span>
              <strong>2.15 m</strong>
            </div>
            <p>
              Concept geometry for comparison. Define whether the width is
              overall or clear between barriers. The ≈250 mm and ≈970 mm depths
              are reference dimensions requiring structural verification.
            </p>
          </div>
          <div className="bb-routes">
            {routes.map((route) => (
              <article
                className="bb-route"
                id={`route-${route.id.toLowerCase()}`}
                key={route.id}
              >
                <div className="bb-route-top">
                  <span className="bb-route-letter">{route.id}</span>
                  <div>
                    <p className="bb-eyebrow">{route.process}</p>
                    <h3>{route.title}</h3>
                  </div>
                </div>
                <figure className="bb-route-drawing">
                  <BridgeConceptDiagram variant={route.id} />
                  <figcaption>{route.depth}</figcaption>
                </figure>
                <div className="bb-route-body">
                  <p className="bb-route-geometry">{route.geometry}</p>
                  <h4>{route.subtitle}</h4>
                  <p>{route.benefit}</p>
                  <div className="bb-route-scope">
                    <span>F1 PROJECT SCOPE</span>
                    <p>{route.scope}</p>
                  </div>
                  <details>
                    <summary>
                      What the design must resolve{" "}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{route.resolve}</p>
                  </details>
                  <Link className="bb-text-link" href={route.link}>
                    {route.label} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="bb-decision-note">
            <strong>Start with C for a standard-profile cost study.</strong>
            <p>
              Study A where intermediate supports are feasible; B where depth
              can support an end-supported concept; D where curvature is
              essential. Bespoke boxes and large mouldings proceed through
              tooling, process-capacity and structural review before production.
            </p>
          </div>
        </div>
      </section>

      <section id="calculation" className="bb-section">
        <div className="bb-shell">
          <SectionTitle
            number="03"
            eyebrow="MAKE THE ENGINEERING LEGIBLE"
            title="The support span changes everything."
          >
            <p>
              A 12 m bridge body is a geometric brief. The distance between
              supports drives the beam response. Explore one straight, simply
              supported girder to see how the calculation connects.
            </p>
          </SectionTitle>
          <BeamExplorer />
          <p className="bb-source-note">
            Beam-theory reference:{" "}
            <SourceLink href={BEAM_BRIDGE_METHOD_SOURCES[0].href}>
              University of South Florida, uniform-load deflection
            </SourceLink>
            . The explorer illustrates mechanics; it does not size the four
            concept sections.
          </p>
        </div>
      </section>

      <section id="load-path" className="bb-section bb-navy">
        <div className="bb-shell">
          <SectionTitle
            number="04"
            eyebrow="FROM FORCES TO PERFORMANCE"
            title="Trace the load. Check the whole bridge."
          >
            <p>
              A beam bridge carries its deck on longitudinal beams or girders
              between supports. Every interface must transfer its share of the
              load, from the walking surface down to the ground.
            </p>
          </SectionTitle>
          <ol className="bb-load-path">
            {[
              [
                "01",
                "Deck & surface",
                "Users and permanent weight enter the deck.",
              ],
              [
                "02",
                "Girders & cross-members",
                "Bending and shear carry the distributed load.",
              ],
              [
                "03",
                "Bearings & end details",
                "Reactions and movement reach the supports.",
              ],
              [
                "04",
                "Foundations & ground",
                "Abutments and piers complete the load path.",
              ],
            ].map(([n, heading, body]) => (
              <li key={n}>
                <span>
                  {n} <b aria-hidden="true">→</b>
                </span>
                <h3>{heading}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <div className="bb-check-grid">
            <article id="active-use-design">
              <p className="bb-eyebrow">GEOMETRY & USE</p>
              <h3>Start with the people using it.</h3>
              <p>
                Define clear width, user mix, passing, accessible approaches,
                barrier height and the maintenance-vehicle decision. Coordinate
                slip resistance, drainage and smooth joints for small wheels.
              </p>
              <div className="bb-check-emphasis">
                The 2.15 m target is a concept input. It does not establish a
                compliant shared pedestrian–cycle width.
              </div>
              <SourceLink href={sourceUrls.tmrGuide}>
                Queensland TMR design guidance
              </SourceLink>
            </article>
            <article id="vibration">
              <p className="bb-eyebrow">DYNAMIC SERVICEABILITY</p>
              <h3>Comfort needs more than stiffness.</h3>
              <p>
                Walking and running excite vertical, lateral and torsional
                modes. Establish mode shapes, modal mass, damping and pedestrian
                loading, then compare accelerations with the adopted comfort
                criteria.
              </p>
              <div className="bb-check-emphasis">
                Natural frequency is a screening variable. Static deflection
                alone cannot demonstrate pedestrian comfort.
              </div>
              <SourceLink href={sourceUrls.jrcVibration}>
                JRC guide to human-induced vibration
              </SourceLink>
            </article>
            <article id="frp-design">
              <p className="bb-eyebrow">MATERIAL & CONNECTIONS</p>
              <h3>Detail for directional properties.</h3>
              <p>
                Specify longitudinal and transverse properties, shear stiffness,
                environmental reductions and creep. Check local buckling, bolt
                bearing, net sections, bonded interfaces and concentrated
                support loads.
              </p>
              <div className="bb-check-emphasis">
                A multicell outline is not a laminate design. Skin thickness,
                fibre direction and web connections create its stiffness.
              </div>
              <SourceLink href={sourceUrls.ats5880}>
                Austroads FRP manufacturing specification
              </SourceLink>
            </article>
          </div>
          <div className="bb-technical-links">
            <a
              href="/images/case-studies/beam-bridge/pedestrian-cycle-beam-bridge-load-path.svg"
              target="_blank"
              rel="noreferrer"
            >
              Load-path drawing ↗
            </a>
            <a
              href="/images/case-studies/beam-bridge/pedestrian-cycle-bridge-section.svg"
              target="_blank"
              rel="noreferrer"
            >
              Pedestrian / cycle section ↗
            </a>
            <a
              href="/images/case-studies/beam-bridge/footbridge-vibration-serviceability.svg"
              target="_blank"
              rel="noreferrer"
            >
              Vibration workflow ↗
            </a>
          </div>
        </div>
      </section>

      <section id="case-studies" className="bb-section">
        <div className="bb-shell">
          <SectionTitle
            number="05"
            eyebrow="LEARN FROM BUILT STRUCTURES"
            title="Different projects. Useful engineering lessons."
          >
            <p>
              The following public projects show how bridge teams use
              prefabrication, composite members and system testing. They are
              industry references; they were not designed, supplied or
              constructed by F1.
            </p>
          </SectionTitle>
          <article className="bb-pengshui">
            <div>
              <p className="bb-eyebrow">PENGSHUI / CHONGQING, CHINA</p>
              <h3>
                Factory modules.
                <br />A site-ready assembly strategy.
              </h3>
              <p>
                The Pengshui composite truss bridge demonstrates factory
                prefabrication in three transport sections followed by site
                assembly. Its lesson for this brief is the coordination of
                members, joints, transport and erection.
              </p>
              <div className="bb-case-metrics">
                <div>
                  <strong>20 m</strong>
                  <span>reported bridge span</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>prefabricated sections</span>
                </div>
              </div>
              <p className="bb-small">
                Transport sections do not create three structural spans. This is
                a truss reference, distinct from the three supported modules in
                route A.
              </p>
              <Link href={pengshuiPath} className="bb-text-link">
                Read the Pengshui case and sources ↗
              </Link>
            </div>
            <figure>
              <Image
                src="/images/blog/pengshui-frp-bridge-prefabrication.svg"
                alt="Concept diagram linking factory prefabrication, transport planning and site assembly"
                width={1600}
                height={900}
                sizes="(max-width: 767px) 100vw, 50vw"
              />
              <figcaption>
                Prefabrication concept only; not the Pengshui erection
                procedure.
              </figcaption>
            </figure>
          </article>
          <div className="bb-case-grid">
            {caseStudies.map((item, index) => (
              <article className="bb-case" id={item.id} key={item.id}>
                <div className="bb-case-heading">
                  <span>REFERENCE 0{index + 1}</span>
                  <span>{index === 0 ? "CONCRETE" : "FRP HYBRID"}</span>
                </div>
                <h3>{item.name}</h3>
                <p className="bb-case-location">{item.location}</p>
                <div className="bb-case-key">
                  <strong>
                    {index === 0 ? "218 m" : index === 1 ? "6 girders" : "10 m"}
                  </strong>
                  <span>
                    {index === 0
                      ? "overall length · nine spans"
                      : index === 1
                        ? "glued pultruded hollow sections"
                        : "installed support span"}
                  </span>
                </div>
                <p>
                  {index === 0
                    ? "A conventional T-girder bridge connects structural design with ride quality, prefabrication and inspection access. A useful cycleway-system reference."
                    : index === 1
                      ? "Pultruded hollow-section girders and an ECC plate deck demonstrate how bonded components become a bridge system. A reference for connection and deck integration."
                      : "Two pultruded GFRP I-girders work with a concrete deck. Full-scale static, dynamic and creep testing shows the validation route behind a hybrid bridge."}
                </p>
                <details>
                  <summary>
                    Project data & design lessons{" "}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <dl>
                    {item.stats.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul>
                    {item.lessons.map((lesson) => (
                      <li key={lesson}>{lesson}</li>
                    ))}
                  </ul>
                  <SourceLink href={item.image}>
                    Open the explanatory diagram
                  </SourceLink>
                  {"secondarySource" in item && (
                    <p>
                      <SourceLink href={item.secondarySource}>
                        {item.secondarySourceLabel}
                      </SourceLink>
                    </p>
                  )}
                </details>
                <SourceLink href={item.source}>{item.sourceLabel}</SourceLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="bb-section bb-tinted">
        <div className="bb-shell">
          <SectionTitle
            number="06"
            eyebrow="FROM CONCEPT TO DELIVERY"
            title="Turn a bridge idea into a defined package."
          >
            <p>
              Bring F1 into the conversation with your site constraints and
              design basis. We can help organise the component scope,
              manufacturing route and information needed for a meaningful
              quotation.
            </p>
          </SectionTitle>
          <div className="bb-delivery-grid">
            {[
              [
                "01",
                "Define",
                "Site and owner brief",
                "Support locations, body length, clear width, access, governing code, pedestrian and wind loads, and maintenance vehicles.",
              ],
              [
                "02",
                "Develop",
                "System and fabrication",
                "Girder or box geometry, laminate, deck, joints, bearings, tooling and the intended manufacturing process.",
              ],
              [
                "03",
                "Verify",
                "Calculations and qualification",
                "Strength, stability, serviceability, fatigue, accidental actions, connection tests, process records, exposure, fire and quality requirements.",
              ],
              [
                "04",
                "Deliver",
                "Factory-to-site plan",
                "Approved drawings, part identification, assembly sequence, lifting, packing, transport and inspection access.",
              ],
            ].map(([n, title, sub, copy]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <h4>{sub}</h4>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="bb-project-cta">
            <div>
              <p className="bb-eyebrow">LET’S START WITH YOUR CROSSING</p>
              <h3>
                Send the geometry.
                <br />
                Define the right route with F1.
              </h3>
              <p>
                Site sketch · support span · width · load criteria · delivery
                location
              </p>
            </div>
            <div>
              <Link className="bb-button bb-button-primary" href={inquiry}>
                Discuss your bridge concept <span>↗</span>
              </Link>
              <Link className="bb-text-link" href="/frp-profile-calculator">
                Open the FRP member calculator ↗
              </Link>
              <Link className="bb-text-link" href="/frp-span-tables">
                Explore preliminary span tables ↗
              </Link>
            </div>
          </div>
          <FAQ items={questions} />
        </div>
      </section>
      <section id="sources" className="bb-sources">
        <div className="bb-shell">
          <div className="bb-source-heading">
            <div>
              <p className="bb-eyebrow">REFERENCES & METHOD</p>
              <h2>Follow the evidence.</h2>
            </div>
            <p>
              Published 31 August 2026 · Updated 8 September 2026
              <br />
              F1 Composite · Engineering and application guide
            </p>
          </div>
          <div className="bb-source-grid">
            {[
              [
                "01 / Manufacturing & system design",
                [
                  [
                    "F1 factory access structure",
                    absoluteUrl("/case-studies/factory-access-staircase"),
                  ],
                  [
                    "Austroads ATS 5880-25: pultruded and vacuum-infused members",
                    sourceUrls.ats5880,
                  ],
                  ["AASHTO: FRP pedestrian bridge guide", sourceUrls.aashtoFrp],
                ],
              ],
              [
                "02 / Loads, geometry & comfort",
                [
                  [
                    "Queensland TMR: pedestrian and cyclist bridge options",
                    sourceUrls.tmrGuide,
                  ],
                  [
                    "JRC: human-induced vibration of footbridges",
                    sourceUrls.jrcVibration,
                  ],
                  [
                    "USF: uniform-load beam deflection",
                    BEAM_BRIDGE_METHOD_SOURCES[0].href,
                  ],
                ],
              ],
              [
                "03 / Public project records",
                [
                  ["Queensland TMR: Moggill Road", sourceUrls.moggill],
                  [
                    "São Silvestre: full-scale bridge research",
                    sourceUrls.saoSilvestre,
                  ],
                  [
                    "Pengshui: sourced prefabrication report",
                    absoluteUrl(pengshuiPath),
                  ],
                ],
              ],
            ].map(([heading, links]) => (
              <div key={heading as string}>
                <h3>{heading as string}</h3>
                <ul>
                  {(links as string[][]).map(([label, href]) => (
                    <li key={href}>
                      <SourceLink href={href}>{label}</SourceLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="bb-source-note">
            The four route drawings are original explanatory schematics
            developed from the concept brief, not project drawings or
            construction details. Timber-coloured surfaces indicate a finish
            concept. Manufacturing standards must match the selected process:
            vacuum infusion and hand lay-up are distinct methods. All project
            requirements and the adopted standard editions are agreed with the
            bridge owner.
          </p>
        </div>
      </section>
    </div>
  );
}
