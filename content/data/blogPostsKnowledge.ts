import type { BlogPost } from "./blogPosts";
import { supplyTerms } from "./company";

// 8 ft = 2.4384 m; stakes per minimum order of one rod diameter (A071).
const STAKES_8FT_PER_MOQ = Math.floor(supplyTerms.moqMeters / 2.4384);

/**
 * Knowledge articles added 2026-11-24 for single-keyword clusters (A069).
 * Each article owns one query; facts are sourced in sourceLinks. Landmark
 * articles credit the original project teams; F1 Composite is only the
 * editorial publisher and claims no role in those projects.
 */
export const knowledgeBlogPosts: BlogPost[] = [
  {
    slug: "golden-hand-bridge-vietnam-fiberglass-hands",
    title: "Golden Hand Bridge, Vietnam: How the Giant Hands Were Built",
    seoTitle: "Golden Hand Bridge, Vietnam: How the Giant Hands Were Built",
    answerBox:
      "The Golden Hand Bridge (Cầu Vàng) at Ba Na Hills, Da Nang, is a 150 m pedestrian bridge opened in June 2018. Its two giant 'stone' hands are decorative: most published accounts describe them as fiberglass over a steel frame and wire mesh, while steel piers carry the bridge.",
    category: "Industry Perspectives",
    date: "2026-11-24",
    updatedAt: "2026-11-24",
    readTime: "5 min",
    excerpt:
      "The Golden Hand Bridge in Da Nang looks as if two stone hands lift it. They are fiberglass over steel and mesh, and they carry no load.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Independent industry commentary",
    reviewedBy: "Editorial source check",
    standards: [],
    coverImage: "/images/blog/golden-hand-bridge-ba-na-hills-da-nang.webp",
    coverAlt: "The Golden Bridge at Ba Na Hills, Vietnam, in mist: a gold-railed walkway passing through the fingers of a giant weathered hand, with visitors on the deck and the second hand fading into the fog",
    coverNote: "Reference photo",
    coverAttribution: {
      creator: "lumoplank",
      href: "https://commons.wikimedia.org/wiki/File:Ba_Na_Hills_-_BaNa1519.jpg",
      source: "Wikimedia Commons",
      license: "CC0 1.0",
      licenseHref: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    supportingImage: "/images/blog/golden-hand-bridge-fiberglass-hand-layers.webp",
    supportingAlt: "Schematic cut through a sculpted hand: steel frame, wire mesh, fiberglass laminate and a stone-effect paint finish, beside the steel pier that carries the deck",
    supportingImageFit: "contain",
    supportingCaption:
      "Original editorial schematic of how fiberglass-over-steel sculpture is typically built. It is not an as-built drawing of the Golden Bridge; layer thicknesses and the frame are illustrative.",
    highlights: [
      "150 m long, 5 m wide, opened June 2018 at Ba Na Hills near Da Nang.",
      "The hands are decorative: steel piers carry the bridge.",
      "Most accounts describe fiberglass over a steel frame and wire mesh; one report calls them concrete.",
    ],
    ogDescription:
      "The Golden Hand Bridge in Da Nang: 150 m long, opened 2018. How the giant hands were built from fiberglass over steel and mesh, and why they carry no load.",
    ogChips: ["Ba Na Hills", "Fiberglass sculpture", "Independent reference"],
    relatedLinks: [
      { label: "What is FRP?", href: "/what-is-frp" },
      { label: "FRP pedestrian bridges", href: "/applications/frp-pedestrian-bridge-superstructures" },
    ],
    sourceLinks: [
      { label: "Wikipedia: Golden Bridge (Vietnam)", href: "https://en.wikipedia.org/wiki/Golden_Bridge_(Vietnam)" },
      { label: "Dezeen: Golden Bridge by TA Landscape Architecture, August 2018", href: "https://www.dezeen.com/2018/08/09/golden-bridge-vietnam-hands-ta-landscape-architecture/" },
      { label: "Danang Fantasticity (city tourism portal): Golden Bridge", href: "https://danangfantasticity.com/en/discovery/golden-bridge-a-new-brand-of-tourism-in-danang" },
      { label: "The Irish Times / Reuters: Vietnam's Golden Bridge, June 2018", href: "https://www.irishtimes.com/news/world/asia-pacific/handy-engineering-vietnam-s-golden-bridge-has-giant-support-1.3583229" },
      { label: "VnExpress: five years of the Golden Bridge", href: "https://e.vnexpress.net/news/travel/5-year-journey-of-golden-bridge-a-vietnam-s-tourism-phenomenon-4642349.html" },
    ],
    faq: {
      title: "Golden Hand Bridge questions",
      items: [
        { question: "Are the hands of the Golden Bridge real stone?", answer: "No. Most published accounts, including the designers' and the city tourism portal, describe a steel frame and wire mesh finished with fiberglass, then painted with cracks and moss to look like old stone. One news report described them as concrete." },
        { question: "Do the hands hold the bridge up?", answer: "No. The deck is carried by steel piers on concrete foundations. The hands are decorative and wrap around the structure." },
        { question: "How long and how high is the Golden Bridge?", answer: "It is 150 m long and 5 m wide. Sources give its elevation as about 1,400 m above sea level (the city portal says 1,414 m), while some outlets say over 1,000 m." },
        { question: "Who designed the Golden Bridge?", answer: "TA Landscape Architecture of Ho Chi Minh City, for Sun Group's Sun World Ba Na Hills resort. It opened in June 2018." },
      ],
    },
    content: `The Golden Hand Bridge, Cầu Vàng in Vietnamese, is a pedestrian walkway on Ba Na Hills west of Da Nang. A gold-railed deck loops along the mountainside, and two enormous weathered hands seem to lift it out of the forest. The bridge opened in June 2018 and quickly became one of the most photographed structures in Southeast Asia.

**Editorial note:** F1 Composite had no role in this project. This article explains the materials publicly reported for the bridge and credits the original teams.

## The bridge in numbers

| Item | Reported value |
| --- | --- |
| Location | Ba Na Hills, Da Nang, Vietnam |
| Opened | June 2018 |
| Length | 150 m, in eight spans |
| Width | 5 m: a 3 m walkway between two 1 m planting beds |
| Elevation | About 1,400 m above sea level (1,414 m per the city portal; some reports say over 1,000 m) |
| Designer | TA Landscape Architecture, Ho Chi Minh City |
| Owner and operator | Sun Group, Sun World Ba Na Hills |

The deck sits on seven pillars and two abutments: steel pipe piers on reinforced concrete foundations, according to the city's tourism portal. The walkway has a timber deck and gold stainless steel handrails.

## What the hands are made of

The hands look like carved stone, but they are a sculptural shell. The designers and the city portal describe a frame of steel with wire mesh shaped over it, finished with fiberglass and then painted with cracks and moss to look aged. [Dezeen](https://www.dezeen.com/2018/08/09/golden-bridge-vietnam-hands-ta-landscape-architecture/) and [Wikipedia](https://en.wikipedia.org/wiki/Golden_Bridge_(Vietnam)) report the same construction. One Reuters report, reprinted by [The Irish Times](https://www.irishtimes.com/news/world/asia-pacific/handy-engineering-vietnam-s-golden-bridge-has-giant-support-1.3583229), called the hands concrete; we found no technical source that confirms a concrete shell.

The important point for anyone studying the structure is that the hands do not carry the bridge. The steel piers do. The hands wrap around the structure as decoration, which is why a lightweight shell over a steel frame makes sense: it gives a large, durable sculptural surface without adding much weight to the mountainside.

## How fiberglass-over-steel sculpture is usually built

Large outdoor sculptures and theme-park rockwork are often built in the same general way. The steps below describe the typical method, not a record of this project.

1. A welded steel frame is designed to carry the sculpture's own weight, wind and anchorage loads.
2. Wire mesh, and sometimes foam, is shaped over the frame to form the surface.
3. Glass fiber is laid up with resin over the form, or into molds taken from a model, and cured.
4. Large pieces are made in sections; joints are ground, filled and sanded.
5. A paint system gives the stone, moss or patina finish; outdoor work needs UV-stable coatings.

This is hand lay-up, a different composite process from the pultrusion F1 Composite uses for straight structural profiles. Both use glass fiber in a thermoset resin, but hand lay-up suits one-off three-dimensional shapes, while pultrusion makes constant-section members such as beams, tubes and grating bars. [What is FRP](/what-is-frp) explains the material family.

## Why the bridge works as a design

The bridge is short and structurally simple, but the hands turn it into a landmark. The combination is typical of how fiberglass is used in architecture: the structure is designed conventionally, and the composite shell provides a shape that would be heavy, slow or expensive in stone or concrete. The same logic of a light composite skin over a proven structure appears in many [FRP pedestrian bridges](/applications/frp-pedestrian-bridge-superstructures), where the deck or parapets are composite and the load path is designed by bridge engineers.

## Visiting

Ba Na Hills is reached by cable car from the foot of the mountain. The resort reported nearly 4 million visitors in 2018 and about 5 million in 2019, according to VnExpress. Check the operator's site for current tickets and opening hours.`,
  },
  {
    slug: "tower-bridge-sacramento-frp-sidewalk",
    title: "Tower Bridge Sacramento: The First FRP Cantilever Sidewalk",
    seoTitle: "Tower Bridge Sacramento: The First FRP Cantilever Sidewalk",
    answerBox:
      "Tower Bridge in Sacramento is a 1935 vertical lift bridge over the Sacramento River. In 2007 Caltrans widened its sidewalks, and because the lift machinery could not take extra weight, the 209 ft lift span received fiber-reinforced polymer (FRP) cantilever sidewalks weighing 13 psf instead of 42 psf for lightweight concrete.",
    category: "Industry Perspectives",
    date: "2026-11-24",
    updatedAt: "2026-11-24",
    readTime: "6 min",
    excerpt:
      "Sacramento's gold Tower Bridge carries the first FRP cantilever sidewalk: the lift span could not take heavier concrete, so the new walkways are composite.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Independent industry commentary",
    reviewedBy: "Editorial source check",
    standards: [],
    coverImage: "/images/blog/tower-bridge-sacramento-dusk.webp",
    coverAlt: "Tower Bridge in Sacramento at dusk: the gold lift towers and truss span lit over the Sacramento River, with boats moored below",
    coverNote: "Reference photo",
    coverAttribution: {
      creator: "Michael Grindstaff, edited by Fir0002",
      href: "https://commons.wikimedia.org/wiki/File:Tower_Bridge_Sacramento_edit.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Tower_Bridge_Sacramento_edit.jpg",
    },
    supportingImage: "/images/blog/tower-bridge-frp-cantilever-sidewalk-section.webp",
    supportingAlt: "Schematic cross-section of a cantilever sidewalk: FRP deck panels on steel stringers outside the truss, with a polymer concrete overlay, curb and railing",
    supportingImageFit: "contain",
    supportingCaption:
      "Original editorial schematic of an FRP cantilever sidewalk on a steel truss. Proportions are illustrative; it is not the Caltrans construction drawing.",
    highlights: [
      "Vertical lift bridge, dedicated 15 December 1935; gold since 2002.",
      "The lift machinery could not take a heavier deck, so the lift span got FRP sidewalks.",
      "FRP deck about 13 psf against 42 psf for a 5 in lightweight concrete deck.",
    ],
    ogDescription:
      "Tower Bridge Sacramento: history, the gold lift span, and why its 2007 sidewalk widening used the first FRP cantilever sidewalk on a weight-limited lift span.",
    ogChips: ["Sacramento landmark", "FRP sidewalk", "Independent reference"],
    relatedLinks: [
      { label: "FRP deck panels", href: "/products/frp-deck-panels" },
      { label: "FRP pedestrian bridges", href: "/applications/frp-pedestrian-bridge-superstructures" },
    ],
    sourceLinks: [
      { label: "Wikipedia: Tower Bridge (Sacramento, California)", href: "https://en.wikipedia.org/wiki/Tower_Bridge_(Sacramento,_California)" },
      { label: "Caltrans and City of Sacramento: Tower Bridge pedestrian/bicycle improvement project (presentation, Western Bridge Engineers' Seminar 2009)", href: "https://wsdot.wa.gov/eesc/bridge/WBES/2009/A/9A3/9A3.pdf" },
      { label: "California CEQA database: Tower Bridge sidewalk widening environmental document", href: "https://ceqanet.lci.ca.gov/2004012020/4" },
      { label: "Caltrans Mile Marker 2019 Q2: movable bridges", href: "https://dot.ca.gov/-/media/dot-media/programs/risk-strategic-management/documents/mile-marker/mm-2019-q2-movable-bridges-a11y.pdf" },
    ],
    faq: {
      title: "Tower Bridge Sacramento questions",
      items: [
        { question: "When was Tower Bridge in Sacramento built?", answer: "It was dedicated on 15 December 1935 as the first vertical lift bridge in California's state highway system. It links Sacramento and West Sacramento across the Sacramento River and carries State Route 275." },
        { question: "Why is Tower Bridge gold?", answer: "It was first painted silver, then yellow-ochre in 1976 to match the State Capitol, and gold in 2002 after a public vote." },
        { question: "Why was FRP used for the Tower Bridge sidewalks?", answer: "The sidewalks were widened in 2007, and the lift machinery could not take added weight on the lift span. Caltrans replaced the concrete deck there with an FRP deck of about 13 psf, against 42 psf for 5 in of lightweight concrete." },
        { question: "Does the whole bridge have FRP sidewalks?", answer: "No. According to the Caltrans presentation, only the 209 ft lift span received the FRP deck; the fixed truss and approach spans use lightweight concrete." },
        { question: "Can you walk across Tower Bridge?", answer: "Yes. It carries cars, bicycles and pedestrians, with sidewalks on both sides." },
      ],
    },
    content: `Tower Bridge is the gold lift bridge that frames Sacramento's riverfront. Built in 1935, it also holds a less visible first: its widened sidewalks over the lift span are made of fiber-reinforced polymer (FRP), because a concrete deck would have been too heavy for the machinery that raises the span.

**Editorial note:** F1 Composite had no role in this project. The facts below come from Caltrans and other public sources listed at the end.

## The bridge

| Item | Value |
| --- | --- |
| Type | Vertical lift bridge |
| River | Sacramento River, between Sacramento and West Sacramento |
| Dedicated | 15 December 1935 |
| Route | State Route 275 (formerly US 40 and US 99W) |
| Total length | About 737 ft over eight spans |
| Lift span | 209 ft 6 in (Span 6) |
| Towers | 160 ft |
| National Register | Listed 1982 |
| Color | Gold since 2002 (silver at first, yellow-ochre from 1976) |

Trains crossed until 1962 and the tracks were removed in 1963. Today the bridge carries cars, bicycles and pedestrians, and it still lifts for river traffic. Caltrans calls it the first vertical lift bridge in the California highway system.

## Why the sidewalks became FRP

In the 2000s, Caltrans and the cities of Sacramento and West Sacramento set out to widen the narrow walkways. The original sidewalk on the truss spans was about 4 ft wide; the project's environmental document gives the new width as 10 ft on the fixed and lift spans and 8 ft on the approaches.

The limit was the lift span. A movable span is balanced by counterweights, and its machinery is sized for a known weight. Adding wider concrete sidewalks would have added weight the hoist system could not take. The design team therefore replaced the whole concrete sidewalk deck on the lift span with a fiber-reinforced polymer deck. The Caltrans presentation compares the two: about 42 psf for a 5 in lightweight concrete deck against about 13 psf for a 5 in FRP deck.

Only the lift span received FRP. The fixed truss spans and the approaches kept lightweight concrete decks.

## How the FRP deck was built

According to the Caltrans and city presentation:

- The deck panels were a patented FRP system with a trapezoidal tube core, spanning across the sidewalk between steel stringers.
- Typical panels were about 13 ft 6 in wide and 8 ft long, spliced in the field.
- Panels were fixed with threaded studs welded to the stringers, nuts and oversized washers; FRP cover plates sealed the access holes and FRP strips covered the bond lines.
- The deck was sanded in the shop and given a polymer concrete overlay in the field for wear and slip resistance.
- Historic light posts and railings were reused, and a reinforced concrete curb was cast on the FRP deck.

Because the lift span had to stay balanced, the contractor locked it with a temporary counterweight system during construction and added balance blocks as material went on.

## Project team and dates

Caltrans led the project with the City of Sacramento and the City of West Sacramento. The presentation credits Parsons Brinckerhoff with design, Golden State Bridge as contractor and Martin Marietta Composites as fabricator and installer of the FRP deck. Construction started in December 2006 and the widened sidewalks opened in December 2007; some later company sources give 2008, the year the project began collecting awards. The project received the 2008 ASCE Region 9 History and Heritage Project of the Year and Engineering News-Record California's Best of 2008.

## What the project shows about FRP decks

Tower Bridge is a clear case for composite decks: when the structure underneath has no spare capacity, cutting dead load is the only way to add width or use. The same reasoning drives FRP decks on movable bridges, historic trusses and pedestrian crossings. F1 Composite makes [structural FRP deck panels](/products/frp-deck-panels) and profiles for [FRP pedestrian bridges](/applications/frp-pedestrian-bridge-superstructures); each project still needs a bridge engineer's design for loads, deflection, vibration and connections.`,
  },
  {
    slug: "switchback-ramp-ada-design",
    title: "Switchback Ramp Design: ADA Dimensions and Layout",
    seoTitle: "Switchback Ramp Design: ADA Dimensions and Layout",
    answerBox:
      "A switchback ramp turns 180° at a level landing so two runs sit side by side. Under the 2010 ADA Standards each run rises no more than 30 in at a slope no steeper than 1:12, the turning landing is at least 60 × 60 in, and the inside handrail must run continuously around the turn.",
    category: "Design Guide",
    date: "2026-11-24",
    updatedAt: "2026-11-24",
    readTime: "7 min",
    excerpt:
      "ADA rules for a switchback ramp: 1:12 slope, 30 in rise per run, 60 in landings, continuous inside handrail, and a worked footprint for a 60 in rise.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Access structures and code references",
    reviewedBy: "Editorial source check",
    standards: ["ADA 2010 Standards 405", "ADA 2010 Standards 505", "IBC 1012"],
    coverImage: "/images/covers/blog/switchback-ramp-ada-plan.webp",
    coverAlt: "Plan of an ADA switchback ramp: two parallel 1:12 runs with a 60 in turning landing, top and bottom landings and continuous handrails, dimensioned for a 60 in rise",
    coverNote: "Schematic",
    coverImageFit: "contain",
    supportingImage: "/images/f1-photos/frp-factory-staircase-platform-handrail.webp",
    supportingAlt: "Underside of an FRP stair flight with I-beam stringers and an orange FRP handrail inside F1 Composite's factory",
    supportingCaption: "FRP stair and handrail at F1 Composite's factory. Ramps use the same components: stringers or beams, grating or deck, and handrails.",
    highlights: [
      "Each run: slope no steeper than 1:12 and no more than 30 in of rise.",
      "Turning landing at least 60 × 60 in and as wide as the runs.",
      "A 60 in rise fits in about 40 ft as a switchback, against 75 ft straight.",
    ],
    ogDescription:
      "Switchback ramp design to ADA: 1:12 slope, 30 in max rise per run, 60 × 60 in turning landing, continuous handrails and a worked footprint for a 60 in rise.",
    ogChips: ["ADA 405", "Worked layout", "Access structures"],
    relatedLinks: [
      { label: "FRP access platforms, stairs and crossovers", href: "/products/frp-access-platforms-stairs" },
      { label: "ADA fiberglass grating", href: "/products/ada-frp-grating" },
    ],
    sourceLinks: [
      { label: "US Access Board: 2010 ADA Standards, section 405 Ramps", href: "https://www.access-board.gov/ada/#ada-405" },
      { label: "US Access Board: 2010 ADA Standards, section 505 Handrails", href: "https://www.access-board.gov/ada/#ada-505" },
      { label: "OSHA 29 CFR 1910.21: walking-working surface definitions", href: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.21" },
    ],
    faq: {
      title: "Switchback ramp questions",
      items: [
        { question: "What is a switchback ramp?", answer: "A ramp that reverses direction 180° at a level landing, so two or more runs sit parallel and side by side. It fits a long ramp into a short site." },
        { question: "How big must a switchback landing be?", answer: "Under ADA 405.7.4 a landing where the ramp changes direction must be at least 60 × 60 in clear, and every landing must be at least as wide as the widest run it serves." },
        { question: "What is the maximum rise per ramp run?", answer: "30 in (ADA 405.6). At the maximum 1:12 slope that is a 30 ft run, after which a level landing is required." },
        { question: "Do handrails continue around a switchback landing?", answer: "The inside handrail on a switchback or dogleg ramp must be continuous between runs (ADA 505.3), and it needs no extensions at that inside turn. Outside rails extend 12 in at the top and bottom of each run." },
        { question: "How much space does a switchback ramp need for a 60 in rise?", answer: "Two 30 ft runs side by side plus 60 in landings at each end: about 40 ft long and 6 to 7.5 ft wide, depending on handrail and edge details. A straight ramp would be about 75 ft long." },
      ],
    },
    content: `A switchback ramp folds a long accessible ramp back on itself. Two runs climb side by side, joined by a level landing where the user turns 180°. It is the usual answer when a building entrance, platform or loading dock is high above grade and the site is too short for a straight ramp.

The rules below are from the [2010 ADA Standards](https://www.access-board.gov/ada/#ada-405). Local codes, including the IBC and ICC A117.1 adopted by your jurisdiction, can add requirements; check them before design.

## ADA ramp rules that shape a switchback

| Requirement | 2010 ADA Standards | Section |
| --- | --- | --- |
| Running slope | No steeper than 1:12 | 405.2 |
| Cross slope | No steeper than 1:48 | 405.3 |
| Rise per run | 30 in maximum | 405.6 |
| Clear width | 36 in minimum between handrails | 405.5 |
| Landings | At top and bottom of every run, 60 in long minimum, as wide as the widest run | 405.7 |
| Change of direction | Landing at least 60 × 60 in clear | 405.7.4 |
| Landing slope | No steeper than 1:48 | 405.7.1 |
| Handrails | Both sides where rise exceeds 6 in, 34–38 in high | 405.8, 505.4 |
| Handrail extensions | 12 in horizontal at top and bottom of each run | 505.10 |
| Inside rail at turns | Continuous on switchback and dogleg ramps; no extension needed there | 505.3, 505.10 |
| Edge protection | Surface extending 12 in beyond the rail, or a curb or barrier that stops a 4 in sphere within 4 in of the surface | 405.9 |
| Wet landings | Must not accumulate water | 405.10 |

Existing sites with space limits may use steeper slopes for very small rises (1:10 for a 6 in rise, 1:8 for a 3 in rise, under Table 405.2), but a new switchback ramp is designed at 1:12 or flatter.

## Switchback, dogleg or straight

- **Straight ramp:** one direction, with intermediate landings every 30 in of rise. Simple, but long.
- **Dogleg ramp:** a 90° turn at a landing, forming an L.
- **Switchback ramp:** a 180° turn at a landing, forming a U. It uses the least length for a given rise.

## Worked example: a 60 in rise

At 1:12, a 60 in rise needs 720 in (60 ft) of ramp run. The 30 in limit per run splits it into two runs, each rising 30 in over 360 in (30 ft).

**Switchback layout**

- Length: 60 in bottom landing + 360 in run + 60 in turning landing = **480 in (40 ft)**. The top landing sits beside the bottom landing, at the same end.
- Width: two runs of 36 in clear = **72 in clear**, which also satisfies the 60 in landing width.
- Allowing roughly 4 in for each of the four handrail lines gives about 88 in, or about **7.3 ft** overall, before posts and curbs.

**Straight layout for comparison:** 60 + 360 + 60 + 360 + 60 in = 900 in, about **75 ft long** and 3 to 3.7 ft wide.

The switchback roughly halves the length at the cost of doubling the width, which is why it suits entrances, platforms and docks with a short frontage.

## Handrails and edges on a switchback

The inside handrail follows the turn without a break, so a user can keep a hand on the rail from one run to the next. Outside rails extend 12 in horizontally at the top and bottom of each run. Each run and landing needs edge protection on both sides; on an elevated ramp, guards are also required where the drop exceeds the local code limit, which is commonly 30 in under the IBC.

## Building a switchback ramp in FRP

Industrial and outdoor ramps are often built as bolted structures: beams or stringers, a walking surface of grating or deck panels, and a handrail system. Fiberglass versions are used where steel would corrode, for example at wastewater plants, marinas and chemical sites. The geometry rules above still apply in full, and the walking surface must be firm, stable and slip resistant, with openings small enough for an accessible route.

- Components and code tables for complete structures: [FRP access platforms, stairs and crossovers](/products/frp-access-platforms-stairs).
- Walking surfaces with small openings for accessible routes: [ADA fiberglass grating](/products/ada-frp-grating).
- Guardrail and handrail loads by code: [industrial handrail systems](/products/frp-handrail-systems).

OSHA treats ramps in workplaces as walking-working surfaces under 29 CFR 1910, but it does not set accessibility geometry; the ADA and local building code do.`,
  },
  {
    slug: "ipe-alternatives-decking-comparison",
    title: "Ipe Alternatives: Decking Options Compared",
    seoTitle: "Ipe Alternatives: Hardwood, Composite, Aluminum and FRP",
    answerBox:
      "The main ipe alternatives are other tropical hardwoods such as garapa and tigerwood, thermally modified or acetylated wood, black locust, wood-plastic composite and PVC boards, aluminum, and fiberglass (FRP) planks or grating. Since 25 November 2024 ipe and cumaru both need CITES documents for international trade.",
    category: "Materials Guide",
    date: "2026-11-24",
    updatedAt: "2026-11-24",
    readTime: "7 min",
    excerpt:
      "Ipe is hard, heavy and now CITES-listed. Compare the alternatives: other hardwoods, modified wood, composite, PVC, aluminum and fiberglass decking.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Materials comparison",
    reviewedBy: "Editorial source check",
    standards: ["CITES Appendix II", "ASTM E84"],
    coverImage: "/images/covers/blog/ipe-alternatives-decking-comparison.webp",
    coverAlt: "Comparison chart of ipe and decking alternatives: Janka hardness of tropical hardwoods and black locust, and notes on modified wood, composite, PVC, aluminum and FRP",
    coverNote: "Comparison chart",
    coverImageFit: "contain",
    supportingImage: "/images/products/frp-structural-deck-panel-hero.webp",
    supportingAlt: "Pultruded FRP deck panel with a flat walking surface over three hollow cells and interlocking edges",
    supportingImageFit: "contain",
    supportingCaption: "Pultruded FRP deck sections. Their stiffness comes from the cross-section shape rather than the material alone.",
    highlights: [
      "Ipe and cumaru are both CITES Appendix II since 25 November 2024.",
      "Ipe is very hard (about 3,500 lbf Janka) and stiff, but heavy and slow to work.",
      "FRP suits boardwalks, marinas and commercial decks where rot, corrosion and weight matter.",
    ],
    ogDescription:
      "Ipe alternatives compared: garapa, tigerwood, black locust, modified wood, composite, PVC, aluminum and FRP decking, with hardness, CITES status and trade-offs.",
    ogChips: ["Decking", "CITES 2024", "Materials comparison"],
    relatedLinks: [
      { label: "FRP deck panels", href: "/products/frp-deck-panels" },
      { label: "Pultruded FRP grating", href: "/products/frp-gratings" },
    ],
    sourceLinks: [
      { label: "The Wood Database: Ipe", href: "https://www.wood-database.com/ipe/" },
      { label: "US Fish and Wildlife Service: CITES CoP19 timber listings, letter to importers", href: "https://fws.gov/sites/default/files/documents/CoP19%20timber%20outcomes%20importer%20ltr%20FIN.pdf" },
      { label: "USDA APHIS: Lacey Act declaration", href: "https://www.aphis.usda.gov/plant-imports/lacey-act/filing-declaration" },
      { label: "The Wood Database: Cumaru, Garapa, Goncalo alves, Black locust", href: "https://www.wood-database.com/cumaru/" },
      { label: "Greenpeace: ipe logging in Pará, 2018", href: "https://www.greenpeace.org/international/press-release/15437/illegal-logging-of-ipe-tree-is-causing-irreversible-damage-to-the-amazon/" },
      { label: "Wikipedia: Thermally modified wood; Wood-plastic composite", href: "https://en.wikipedia.org/wiki/Thermally_modified_wood" },
    ],
    faq: {
      title: "Ipe alternative questions",
      items: [
        { question: "Is ipe still legal to buy?", answer: "Yes, but since 25 November 2024 the ipe genera (Handroanthus, Roseodendron, Tabebuia) are listed in CITES Appendix II, so international shipments need CITES documents. US imports also need a Lacey Act declaration naming the species." },
        { question: "What is the hardest alternative to ipe?", answer: "Cumaru, at about 3,330 lbf Janka against about 3,500 for ipe. It is listed under CITES Appendix II on the same terms, so it does not avoid the trade controls." },
        { question: "Is ipe fire rated Class A?", answer: "Some ipe lots have tested Class A under ASTM E84, but the result belongs to the tested product; others are accepted as Class B. Ask for the test report for the material you buy." },
        { question: "Why use fiberglass decking instead of ipe?", answer: "FRP planks and grating do not rot, rust or splinter, resist salt water and many chemicals, are light to handle and are non-conductive. They are used for boardwalks, marinas, piers and commercial decks. Ipe wood is stiffer than the FRP laminate, so FRP decks get their stiffness from the section shape." },
        { question: "Do composite deck boards get hotter than wood?", answer: "Generally yes in full sun, and darker colors run hotter. Retailer tests have recorded composite boards over 140 °F where hardwood stayed around 120 °F; independent data are limited." },
      ],
    },
    content: `Ipe has been the benchmark for premium decking and boardwalks for decades: extremely hard, naturally durable and handsome as it weathers. It is also heavy, slow to work, increasingly expensive and, since November 2024, under international trade controls. This guide compares the realistic alternatives.

## Why people look for ipe alternatives

- **Trade controls.** Ipe (Handroanthus, Roseodendron and Tabebuia) was listed in CITES Appendix II with effect from 25 November 2024, covering logs, sawn wood, veneer and plywood. Cumaru (Dipteryx) was listed on the same terms. International shipments now need CITES documents, and US imports need a Lacey Act declaration.
- **Legality concerns.** A Greenpeace review of logging authorizations in Pará, Brazil, found that most reported ipe volumes well above what the forests could naturally hold, a sign of laundered timber.
- **Weight and workability.** Ipe weighs about 1,050 kg/m³ (65 lb/ft³) and is hard to cut; boards need pre-drilling.
- **Cost.** Supply pressure and the new listing push prices up.

## Ipe in numbers

| Property | Ipe |
| --- | --- |
| Janka hardness | About 3,500 lbf (sources range up to about 3,680) |
| Density | About 1,050 kg/m³ |
| Elastic modulus | About 3.1 million psi |
| Durability | Very durable outdoors; susceptible to marine borers |
| Fire | Some lots tested Class A (ASTM E84); product-specific |

## The alternatives compared

| Alternative | What it is | Strengths | Trade-offs |
| --- | --- | --- | --- |
| Cumaru | Tropical hardwood | About 3,330 lbf Janka, very durable | Same CITES Appendix II listing as ipe |
| Garapa | Tropical hardwood | About 1,650 lbf Janka, durable, not CITES-listed | Softer; susceptible to termites |
| Tigerwood (goncalo alves) | Tropical hardwood | About 2,170 lbf Janka, very durable, not CITES-listed | Strong grain figure divides opinion |
| Black locust | North American hardwood | About 1,700 lbf Janka, very durable, domestic in the US | Limited lengths; invasive in some regions |
| Thermally modified wood | Wood heated above about 180 °C without oxygen | Much lower shrink and swell, improved durability | Bending strength can fall by up to 30% |
| Acetylated wood | Chemically modified softwood, usually radiata pine | High durability class, stable | Premium price |
| Wood-plastic composite | Wood fiber and plastic | Does not rot, low maintenance | Less stiff, moves with temperature, runs hot in sun |
| PVC (cellular or capped) | All-polymer boards | Moisture and fade resistant | Higher cost; can be slippery wet |
| Aluminum | Extruded planks | Does not burn, rot or attract insects | Expensive, noisy, hot in sun |
| FRP (fiberglass) | Pultruded planks, deck panels or grating | No rot, rust or splinters; light; non-conductive | Lower material stiffness than ipe; industrial look |

Janka values are from The Wood Database. Composite and PVC notes follow general buying guides; check the maker's data for the product you choose.

## Where fiberglass decking fits

Fiberglass is not a like-for-like visual substitute for a hardwood deck. It is the alternative when the deck lives in water, salt air or chemicals, or when weight matters:

- **Boardwalks and trails** over wetlands, where wood rots and steel corrodes.
- **Marinas, piers and floating docks**, where salt water attacks steel fixings and timber.
- **Commercial and industrial decks**, such as cooling towers, wastewater walkways and rooftop plant areas.
- **Pool surrounds and splash zones**, where a gritted, slip-resistant surface helps.

Glass FRP laminate is less stiff than ipe: a pultruded laminate is roughly 1.9 million psi against about 3.1 million psi for ipe. FRP decks reach their stiffness through the cross-section: hollow multi-cell planks and deck panels, or deep grating bars. Span tables for the chosen section, not the material alone, set the joist spacing.

Explore [structural FRP deck panels](/products/frp-deck-panels) and [pultruded FRP grating](/products/frp-gratings) for boardwalk and walkway decks.

## How to choose

1. **Start with exposure.** Fresh water and garden use: hardwoods, modified wood or composite. Salt water, chemicals or constant wet: FRP or aluminum.
2. **Check the trade status.** For ipe and cumaru, confirm CITES and Lacey Act paperwork before ordering.
3. **Match the span.** Compare deck boards at the same joist spacing and load.
4. **Look at heat and slip.** Dark synthetic boards run hot in sun; wet PVC and smooth surfaces can be slippery.
5. **Price the whole life.** Include fixings, finishing, maintenance and replacement, not just the board.`,
  },
  {
    slug: "fiberglass-roof-deck-guide",
    title: "Fiberglass Roof Deck: Walkable GRP Roofs and FRP Panels",
    seoTitle: "Fiberglass Roof Deck: Walkable GRP Roofs and FRP Panels",
    answerBox:
      "A fiberglass roof deck is either a walkable GRP laminate (glass mat and resin) over a timber deck, used on flat roofs and balconies, or an industrial FRP roof deck or panel system used where steel decks corrode. Walkable GRP needs a heavier mat and a non-slip topcoat; corrugated FRP panels are not walkable.",
    category: "Materials Guide",
    date: "2026-11-24",
    updatedAt: "2026-11-24",
    readTime: "6 min",
    excerpt:
      "Two things go by 'fiberglass roof deck': walkable GRP laminate roofs and industrial FRP roof panels. How each is built, rated and when to use it.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Materials comparison",
    reviewedBy: "Editorial source check",
    standards: ["ASTM E108", "UL 790", "ASTM D3841", "ASTM E84", "BS 6229"],
    coverImage: "/images/covers/blog/fiberglass-roof-deck-layers.webp",
    coverAlt: "Two fiberglass roof deck build-ups: a walkable GRP laminate over a timber deck, and an industrial FRP roof panel on purlins",
    coverNote: "Schematic",
    coverImageFit: "contain",
    supportingImage: "/images/products/frp-structural-deck-panel-cover.webp",
    supportingAlt: "Multi-cell pultruded FRP deck panel seen from the end, showing the webs and interlocking edge",
    supportingImageFit: "contain",
    supportingCaption: "Pultruded FRP deck panels are structural closed sections; roof applications are approved project by project.",
    highlights: [
      "Walkable GRP roofs: glass mat and resin over plywood or OSB, finished with a topcoat.",
      "Certified GRP systems state service lives of 25 years or more with maintenance.",
      "Industrial FRP roof panels resist corrosion; light-transmitting panels have strict code limits.",
    ],
    ogDescription:
      "Fiberglass roof deck explained: walkable GRP laminate roofs and balconies versus industrial FRP roof panels, with build-ups, falls, fire ratings and limits.",
    ogChips: ["GRP roofs", "Industrial FRP", "Fire ratings"],
    relatedLinks: [
      { label: "FRP deck panels", href: "/products/frp-deck-panels" },
      { label: "Fiberglass siding panels", href: "/products/fiberglass-siding-panels" },
    ],
    sourceLinks: [
      { label: "JLC: Installing fiberglass roof decks", href: "https://www.jlconline.com/deck-builder/installing-fiberglass-roof-decks_o" },
      { label: "IIBEC: Roof decks A to Z, part 19: fiber-reinforced polymer", href: "https://iibec.org/publication-post/roof-decks-a-to-z-part-19-fiber-reinforced-polymer-frp" },
      { label: "NFRC: BS 6229:2025 key points", href: "https://www.nfrc.co.uk/resource/bs-6229-2025-update-key-points-for-members.html" },
      { label: "ASTM D3841: glass-fiber-reinforced polyester panels", href: "https://store.astm.org/d3841-21.html" },
      { label: "California Building Code 2609: light-transmitting plastic roof panels", href: "https://gocodebook.com/library/us/ca/ca-building-code/chapter-26-plastic/section-2609-light-transmitting-plastic-roof-panels" },
    ],
    faq: {
      title: "Fiberglass roof deck questions",
      items: [
        { question: "Can you walk on a fiberglass roof?", answer: "A GRP laminate roof built for foot traffic, with a heavier glass mat and a non-slip topcoat, is walkable. Corrugated FRP roofing panels are not walkable; they need crawling boards." },
        { question: "How long does a fiberglass (GRP) roof last?", answer: "Certified GRP roofing systems in the UK state service lives of at least 25 years, assuming normal maintenance and no abnormal movement of the deck." },
        { question: "What fall does a fiberglass flat roof need?", answer: "UK practice under BS 6229:2025 asks for a finished fall of at least 1:80; US walkable deck systems are commonly laid at about ¼ in per foot. Design falls are steeper to allow for deflection and tolerance." },
        { question: "Is a fiberglass roof deck fire rated?", answer: "Roof coverings are rated with ASTM E108 or UL 790 in the US (Class A is the highest) and with BROOF tests in Europe. Ratings belong to a tested system on a stated substrate, so ask for the system's report." },
        { question: "When is an industrial FRP roof deck used?", answer: "Where humidity or chemicals corrode steel decks or rot timber, such as pools, paper mills, food and fertilizer plants. Building codes do not cover structural FRP decks directly, so the building official approves them project by project." },
      ],
    },
    content: `Search for "fiberglass roof deck" and you meet two different things. On houses, it means a walkable GRP (glass-reinforced plastic) laminate that waterproofs a flat roof or balcony. In industry, it means an FRP roof deck or panel system that replaces steel or timber where they corrode. This guide covers both.

## 1. Walkable GRP roof decks and balconies

A GRP roof is a liquid-applied membrane made on site: glass fiber mat wetted with resin over a timber deck, then sealed with a pigmented topcoat. It is seamless, light and repairable.

**Typical build-up**

| Layer | Typical specification |
| --- | --- |
| Deck | 18 mm OSB3 or plywood, tongue-and-groove, fully supported (not chipboard) |
| Edge details | Cant strips at walls, trims at edges and drips |
| Laminate | Chopped strand mat: 450 g/m² minimum, 600 g/m² recommended, two layers of 450 g/m² for balconies |
| Resin | Roughly 2 to 2.5 times the mat weight |
| Topcoat | About 500 g/m²; non-slip grade where people walk |

Figures follow UK system guidance; a US build described by JLC used a single 1.5 oz/ft² mat over a plywood deck laid to ¼ in per foot.

**Falls and weather.** UK practice under BS 6229:2025 requires a finished fall of at least 1:80, so water does not pond. Resin should not be applied in rain or on very hot decks.

**Life and fire.** Certified UK systems state at least 25 years of service with maintenance. In the US, roof coverings are classed by ASTM E108 or UL 790 (Class A, B or C); a rating belongs to the tested system on its stated substrate.

## 2. Industrial FRP roof decks and panels

Industrial buildings use fiberglass on roofs in two ways:

- **Structural FRP roof deck:** ribbed or closed-section panels, typically isophthalic polyester or vinyl ester, spanning between purlins. They are used in pools, paper mills, food plants and fertilizer stores where humidity and chemicals destroy steel decks. Building codes do not cover structural FRP decks directly, so the building official approves them project by project.
- **Corrugated FRP roof panels:** glass-fiber-reinforced polyester sheets to ASTM D3841, often translucent for daylight. They are not walkable.

**Code limits for light-transmitting panels.** Under the International Building Code and the California version (section 2609), light-transmitting plastic roof panels are classed CC1 or CC2 and limited in panel area and total roof area; for example CC1 panels up to 300 ft² each and 30% of the floor area, with limits doubled in fully sprinklered buildings. They are not allowed in some occupancies.

## Which one do you need?

| Situation | Usual choice |
| --- | --- |
| House flat roof, balcony or terrace | Walkable GRP laminate system |
| Daylight in a warehouse or barn roof | Translucent corrugated FRP panels |
| Corrosive industrial roof (pool, chemical plant) | Structural FRP roof deck, approved per project |
| Walkway across an industrial roof | FRP grating or deck panels on supports |

## FRP products for roof areas

F1 Composite does not make GRP roofing laminates or roof deck systems. For industrial roofs it supplies pultruded components: [structural FRP deck panels](/products/frp-deck-panels) and [FRP grating](/products/frp-gratings) for rooftop walkways, [fiberglass siding panels](/products/fiberglass-siding-panels) for walls, and [rooftop solar supports](/products/frp-solar-mounting-systems). Each roof application is reviewed for loads, uplift, fire class and local approval.`,
  },
  {
    slug: "fiberglass-utility-poles-guide",
    title: "Fiberglass Utility Poles: Standards, Classes and Limits",
    seoTitle: "Fiberglass Utility Poles: Standards, Classes and Limits",
    answerBox:
      "Fiberglass utility poles are hollow fiber-reinforced polymer poles used instead of wood, steel or concrete for distribution, some transmission and telecom lines. They are specified to ANSI/ACMA/UCSC-FRP Composite Utility Poles-1-2018, usually as wood-equivalent ANSI O5.1 classes, and resist rot, woodpeckers and corrosion.",
    category: "Industry Perspectives",
    date: "2026-11-24",
    updatedAt: "2026-11-24",
    readTime: "7 min",
    excerpt:
      "How fiberglass utility poles are made, the standard that covers them, how wood-equivalent classes work, and where they beat wood, steel and concrete.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Power distribution materials",
    reviewedBy: "Editorial source check",
    standards: ["ANSI/ACMA/UCSC-FRP Composite Utility Poles-1-2018", "ANSI O5.1", "NESC", "ASTM D8019"],
    coverImage: "/images/covers/blog/fiberglass-utility-pole-anatomy.webp",
    coverAlt: "Schematic fiberglass distribution pole with crossarm, insulators, step locations, no-drill zone near the ground line and embedment depth",
    coverNote: "Schematic",
    coverImageFit: "contain",
    supportingImage: "/images/applications/frp-utility-crossarm-schematic.svg",
    supportingAlt: "End-on FRP crossarm with separate phase A, B and C conductors, individual insulators, a center pole mount and two braces.",
    supportingImageFit: "contain",
    supportingCaption: "End-on schematic of an FRP crossarm on a distribution pole. Crossarms are tested to ASTM D8019; poles have their own standard.",
    highlights: [
      "Pole standard: ANSI/ACMA/UCSC-FRP Composite Utility Poles-1-2018 (ASTM D8019 covers crossarms).",
      "Usually specified as wood-equivalent ANSI O5.1 classes with NESC strength factors.",
      "No rot, woodpeckers or corrosion; higher first cost and more deflection than wood.",
    ],
    ogDescription:
      "Fiberglass utility poles: how they are made, the ANSI/ACMA pole standard, wood-equivalent classes, NESC factors, field drilling and limits versus wood.",
    ogChips: ["Distribution poles", "ANSI/ACMA standard", "Wood-equivalent classes"],
    relatedLinks: [
      { label: "FRP utility crossarms", href: "/applications/frp-utility-crossarms" },
      { label: "FRP for energy and substations", href: "/industries/energy" },
    ],
    sourceLinks: [
      { label: "Oak Ridge National Laboratory: composite utility pole review", href: "https://info.ornl.gov/sites/publications/Files/Pub160200.pdf" },
      { label: "ACMA: ANSI/ACMA/UCSC-FRP Composite Utility Poles standard", href: "https://acmanet.org/?p=18492" },
      { label: "ASTM D8019: test method for FRP crossarms", href: "https://store.astm.org/d8019-23e01.html" },
      { label: "USDA Rural Utilities Service: FRP distribution poles acceptance, 2008", href: "https://webarchive.library.unt.edu/eot2008/20090508155456id_/http://www.usda.gov/rus/electric/engineering/UEP-FRP_poles.pdf" },
      { label: "Snohomish County PUD: FRP pole material specification", href: "https://esr.snopud.com/Content/Material/P-Poles_Posts/1001408.1.htm" },
    ],
    faq: {
      title: "Fiberglass utility pole questions",
      items: [
        { question: "What standard covers fiberglass utility poles?", answer: "ANSI/ACMA/UCSC-FRP Composite Utility Poles-1-2018 covers the design, materials, manufacture, quality control, installation and inspection of direct-embedded FRP poles. ASTM D8019 is a test method for FRP crossarms, not poles." },
        { question: "Are fiberglass poles rated like wood poles?", answer: "Usually yes. Utilities specify them as wood-equivalent ANSI O5.1 classes, applying the NESC strength factor for wood. Equivalence holds for the stated load case, so engineers check each case." },
        { question: "How long do fiberglass utility poles last?", answer: "Manufacturers and an Oak Ridge National Laboratory review project around 80 years with modern UV protection. Early 1960s poles in Hawaii were replaced after about 45 to 50 years because UV frayed the surface." },
        { question: "Can linemen drill and climb fiberglass poles?", answer: "Yes, with fiberglass-rated bits, through-bolts and hardware without cleats, outside the no-drill zone near the ground line. Steps or step holes are provided for climbing." },
        { question: "Are fiberglass poles more expensive than wood?", answer: "Up front, yes: distribution poles cost close to twice as much as wood in the ORNL review, with the gap narrowing at transmission sizes. Lower weight, long life and no treatment chemicals offset part of the difference over the life." },
      ],
    },
    content: `Fiberglass utility poles are still a small share of the world's poles, about 1% by one estimate, but utilities use them where wood rots, woodpeckers drill, wildfire and storms recur, or access is hard. This guide explains how they are made, specified and installed.

## How fiberglass poles are made

- **Filament winding:** glass fiber wound around a tapered or cylindrical mandrel, giving tapered single-piece or modular poles. This is the most common route for distribution poles.
- **Pultrusion:** continuous constant-section tubes, which suit poles of uniform diameter, sections joined into modular poles, and arms.

Both use glass fiber in a thermoset resin, with a UV-resistant surface coating; polyurethane coatings are common.

## The standards

| Standard | What it covers |
| --- | --- |
| ANSI/ACMA/UCSC-FRP Composite Utility Poles-1-2018 | Design, materials, manufacturing, quality control, installation and inspection of direct-embedded FRP poles; revision opened in 2025 |
| ANSI O5.1 | Wood pole classes; FRP poles are commonly specified as wood-equivalent classes |
| NESC (Rule 261) | Strength and overload factors for structures, including the wood strength factor used for equivalence |
| ASTM D8019 | Test method for FRP crossarms, not poles |
| USDA RUS (2008) | Case-by-case acceptance of FRP distribution poles for RUS borrowers |

## Wood-equivalent classes

Utilities usually buy FRP poles as equivalents of wood classes, so the same framing and design tables can be reused. One utility specification sets the FRP pole strength equal to the ANSI O5.1 wood class strength multiplied by the NESC wood strength factor of 0.65 for Grade B construction. Its example design loads are 2,925 lb for Class 1 and 2,405 lb for Class 2.

The equivalence holds for the load case it was derived from. NESC strength factors differ between wood (0.65 for Grade B, 0.85 for Grade C) and steel or concrete (1.0), so a pole that matches wood in one case may not in another. RUS guidance asks engineers to calculate loads rather than substitute the same class for wood in Grade C construction, and to use Grade B overload factors at angle and deadend poles.

## Why utilities choose fiberglass

- **No rot, insects or woodpeckers**, and no wood preservatives in the ground.
- **Low weight.** One pultruded transmission pole was cited at about 30% of the weight of wood; one utility caps a 35 ft Class 2 FRP pole at 400 lb.
- **Low conductivity** and good resistance to corrosion near the coast or in contaminated soils.
- **Fire resistance**, though not fireproof; fire-retardant coatings are available.

## Limits to plan for

- **First cost:** close to twice that of wood for distribution poles in the ORNL review; published figures are collected in [composite utility pole cost](/resources/blog/composite-utility-pole-cost).
- **Deflection:** FRP is more flexible than steel; poles are rarely used above 230 kV.
- **UV:** coatings protect the fibers; scratched coatings need repair.
- **Field data:** long-term inspection guidance is less mature than for wood.

## Installing and working on FRP poles

Field guides for FRP poles commonly call for:

1. Direct embedment at 10% of length plus 2 ft, as for wood.
2. No drilling in the zone from the base to about 8 ft above the ground line.
3. Fiberglass-rated drill bits, holes at least six diameters apart, and plugs in unused holes.
4. Through-bolts with curved washers and hardware without cleats; ground clips in galvanized or stainless steel.
5. Steps or step holes for climbing, each step rated for the specified load.

## Related FRP products

F1 Composite does not manufacture utility poles. For overhead lines it supplies [FRP utility crossarms](/applications/frp-utility-crossarms) and pultruded profiles for [energy and substation](/industries/energy) structures; crossarms are tested to ASTM D8019 and selected for the pole's framing and loads.`,
  },
  // ── A071 (2026-11-25): three single-keyword articles ──────────────────────
  {
    slug: "composite-utility-pole-cost",
    title: "Composite Utility Pole Cost: Price, Installed Cost and Life",
    seoTitle: "Composite Utility Pole Cost: Price, Installed Cost, Life",
    answerBox:
      "A composite utility pole costs more to buy than a wood pole: nearly twice as much for distribution sizes in an Oak Ridge National Laboratory review, three to four times according to Manitoba Hydro, and 2 to 10 times for non-wood poles in a 2024 US Department of Energy report. A 40 ft wood pole is typically under $1,000. Published pole replacement costs run from about $7,500 to more than $10,000, so the pole is a small part of the installed cost.",
    category: "Industry Perspectives",
    date: "2026-11-25",
    updatedAt: "2026-11-25",
    readTime: "7 min",
    excerpt:
      "What published sources say a composite utility pole costs against wood, what a pole replacement costs installed, and how service life and weight change the comparison.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Power distribution materials",
    reviewedBy: "Editorial source check",
    standards: ["ANSI/ACMA/UCSC-FRP Composite Utility Poles-1-2018", "ANSI O5.1"],
    coverImage: "/images/covers/blog/composite-utility-pole-cost-premium.webp",
    coverAlt: "Chart of the published purchase-price premium of composite utility poles over wood: nearly 2 times (ORNL 2021), 2 times (CompositesWorld 2004), 3 to 4 times (Manitoba Hydro 2023), 2 to 10 times for non-wood poles (US DOE 2024)",
    coverNote: "Chart",
    coverImageFit: "contain",
    supportingImage: "/images/applications/frp-utility-crossarm-schematic.svg",
    supportingAlt: "End-on FRP crossarm with separate phase A, B and C conductors, individual insulators, a center pole mount and two braces.",
    supportingImageFit: "contain",
    supportingCaption: "An FRP crossarm on a distribution pole. Framing and conductor transfer are part of the installed cost whatever the pole is made of.",
    highlights: [
      "Purchase premium over wood: nearly 2× (ORNL), 3 to 4× (Manitoba Hydro), 2 to 10× for non-wood (US DOE).",
      "A 40 ft wood distribution pole is typically under $1,000; replacement costs about $7,500 to $10,800 installed in published figures.",
      "Published service life: 60 to 100 years for composite against 25 to 50 for wood.",
    ],
    ogDescription:
      "Composite utility pole cost from published sources: price premium over wood, installed replacement cost, service life, weight and the main cost drivers.",
    ogChips: ["2 to 4× wood", "Installed cost", "60 to 100 year life"],
    relatedLinks: [
      { label: "Fiberglass utility poles: standards and classes", href: "/resources/blog/fiberglass-utility-poles-guide" },
      { label: "FRP utility crossarms", href: "/applications/frp-utility-crossarms" },
    ],
    sourceLinks: [
      { label: "Oak Ridge National Laboratory: composite utility pole review (ORNL/TM-2021/2068)", href: "https://info.ornl.gov/sites/publications/Files/Pub160200.pdf" },
      { label: "US Department of Energy: Utility Pole Maintenance and Upgrades, 2024", href: "https://www.energy.gov/sites/default/files/2024-11/111524_Utility_Pole_Maintenance_and_Upgrades.pdf" },
      { label: "Manitoba Hydro: wood poles compared with steel, concrete and fibreglass, 2023", href: "https://www.hydro.mb.ca/articles/2023/07/wood_poles_old_fashioned_or_stands_the_test_of_time" },
      { label: "CompositesWorld: Composites on the line, 2004", href: "https://www.compositesworld.com/articles/composites-on-the-line" },
      { label: "Southern California Edison 2025 general rate case, pole programs (CPUC)", href: "https://docs.cpuc.ca.gov/PublishedDocs/SupDoc/A2305010/6059/508571727.pdf" },
      { label: "MacLean Power Systems: Gridcore composite pole brochure (weights)", href: "https://www.macleanpower.com/wp-content/uploads/MPS_Gridcore-CompositeUtilityPoles_V6_20260429-2.pdf" },
      { label: "T&D World: selecting pole material with wildfires in mind, 2023", href: "https://tdworld.com/wildfire/article/21262421/how-to-select-pole-material-with-wildfires-in-mind" },
    ],
    faq: {
      title: "Composite utility pole cost questions",
      items: [
        { question: "How much does a composite utility pole cost?", answer: "Utilities rarely publish contract prices. Published comparisons put a composite distribution pole at nearly twice the price of wood (Oak Ridge National Laboratory, 2021) to three or four times (Manitoba Hydro, 2023), against a 40 ft wood pole that is typically under $1,000." },
        { question: "Why do utilities pay more for composite poles?", answer: "For longer published service life, lower weight where access is hard, no rot or woodpecker damage, and wildfire hardening. San Diego Gas & Electric, for example, requires steel or fiberglass poles in its high fire threat districts." },
        { question: "How much does it cost to replace a utility pole?", answer: "Published figures include about $7,500 for condemning and replacing a pole in a study cited by Oak Ridge National Laboratory, and $10,800 per pole for a Duke Energy Florida hardening program that includes reinforcement or replacement as needed. Location and program type move the number widely." },
        { question: "How long do composite utility poles last?", answer: "Published estimates range from 60 to 80 years (ACMA) through 80 years (US Department of Energy) to 70 to 100 years (Oak Ridge National Laboratory). The earliest fiberglass poles in Hawaii were replaced after about 45 to 50 years because of ultraviolet damage." },
        { question: "Does the premium shrink for larger poles?", answer: "Yes, according to two sources. Oak Ridge National Laboratory says the difference diminishes significantly at transmission sizes, and Manitoba Hydro says fibreglass poles of 75 ft and larger are closer in price to wood." },
      ],
    },
    content: `Utilities do not publish what they pay for poles, so the cost of a composite utility pole has to be read from government reviews, utility statements and rate filings. This article collects the published figures, with the source and year for each, and separates the price of the pole from the cost of installing it.

## Purchase price against wood

| Source | Year | What it says |
| --- | --- | --- |
| Oak Ridge National Laboratory | 2021 | Composite poles are nearly twice the cost of wood for distribution; the difference diminishes significantly at transmission sizes |
| US Department of Energy | 2024 | Non-wood poles can be 2 to 10 times more expensive than wood, with composite at the higher end |
| Manitoba Hydro | 2023 | Fibreglass is 3 to 4 times the price of wood; poles of 75 ft and larger are closer in price |
| CompositesWorld (pole maker quoted) | 2004 | A small composite distribution pole is still two times the unit cost of wood |

The wood baseline in the first two sources is the same: a standard 40 ft wood distribution pole is typically under $1,000, and each step up in class adds roughly $100.

The sources disagree, and they are not measuring the same thing. The Department of Energy range covers steel, concrete and composite together, and the Manitoba figure is one utility's experience in one market. Read them as a range of about two to four times wood for distribution poles, with higher multiples possible.

## Installed cost

The pole is a small part of what a utility spends to put it in the ground. Published program costs:

| Program or study | Cost | Notes |
| --- | --- | --- |
| Study cited by Oak Ridge National Laboratory | About $7,500 per pole | Condemning and replacing a pole; the same study puts a wind failure at about $60,000 |
| Duke Energy Florida, lateral hardening, 2023 to 2025 | $10,800 per pole | Includes treatment, reinforcement or replacement as needed |
| Southern California Edison, 2025 rate case | Varies by up to $12,000 per pole | Depends on program type and location |
| Duke and FPL, wood to steel transmission | $26,000 per structure | 2020 dollars |
| Hawaiian Electric, critical pole hardening, 2022 | $93,700 per pole | Includes guying and intermediate poles |

Dividing a wood pole of under $1,000 by a replacement cost of $7,500 to $10,800 puts the pole at roughly a tenth of the job. Crew, traffic control, equipment, framing and conductor transfer make up the rest and are similar for any pole material. That is why a pole that costs two or three times as much does not double the installed cost.

## Service life

| Source | Composite | Wood |
| --- | --- | --- |
| Oak Ridge National Laboratory, 2021 | 70 to 100 years in its comparison table; over 80 projected | 45 years treated; 25 to 50 depending on climate |
| US Department of Energy, 2024 | 80 years | 30 to 50 years |
| Manitoba Hydro, 2023 | Over 100 years with minimal maintenance | Not stated |
| ACMA, 2018 | 60 to 80 years | 20 to 40 years |

These are projections. The longest field record is the first fiberglass poles in Hawaii, which were replaced after about 45 to 50 years because ultraviolet light had degraded the surface. Current poles use UV-stable resins and coatings, and one comparison chart notes that the coating has to be maintained.

Fewer inspections are part of the case. Southern California Edison told its regulator that fewer inspections will be required as wood poles are replaced with composite or steel. Oak Ridge cites a mean inspection cost of about $23 to $104 per pole in Australia.

## Weight

| Pole | Composite | Wood |
| --- | --- | --- |
| 40 ft, Class 4 (MacLean Gridcore brochure) | 707 lb | 1,160 lb, southern yellow pine |
| 45 ft, Class 3 (MacLean Gridcore brochure) | 795 lb | 1,630 lb |
| 45 ft (Oak Ridge National Laboratory table) | Not listed | 1,315 lb; steel 631 lb; concrete 3,793 lb |

Lower weight cuts freight per pole and allows smaller trucks, hand carrying or smaller helicopters where access is difficult. On those sites the installation saving can outweigh the price premium.

## What drives the price of a composite pole

- **Height and class.** Longer and stronger poles use more glass and resin. For wood the step is about $100 per class.
- **Process.** Modular poles are filament wound, a batch process; single-piece poles and crossarms are pultruded continuously.
- **Resin and UV protection.** Polyurethane resins and UV-stable coatings are used on poles sold for long outdoor life.
- **Fire protection.** Composite fire shields are added in wildfire areas. Oak Ridge lists poor fire resistance as a disadvantage of unprotected composite poles.
- **Freight.** Light poles load in greater numbers on a truck or railcar.

## Comparing poles over their life

A life-cycle comparison needs five inputs for each material: the pole price, the installed cost, the expected life at the site, the inspection and treatment cost per cycle, and the cost and likelihood of a failure. The pole price alone favors wood. Long life, hard access, woodpeckers, decay and wildfire exposure move the result toward composite.

## Related FRP products

F1 Composite does not manufacture utility poles and does not quote them. For overhead lines it supplies [FRP utility crossarms](/applications/frp-utility-crossarms). For standards, classes and field rules, see the guide to [fiberglass utility poles](/resources/blog/fiberglass-utility-poles-guide).`,
  },
  {
    slug: "composite-retaining-wall",
    title: "Composite Retaining Wall: Types, Heights and Design Checks",
    seoTitle: "Composite Retaining Wall: Types, Heights and Design Checks",
    answerBox:
      "A composite retaining wall holds back soil with a fiber-reinforced polymer or other composite facing in place of timber, steel or concrete. The term covers two products: interlocking FRP sheet piles driven for seawalls, bulkheads and canal banks, and composite sleepers or panels stacked between posts for landscape walls. One manufacturer builds FRP sheet pile walls from 3 ft to over 20 ft; landscape walls usually stay under the 4 ft or 1 m permit threshold.",
    category: "Design Guide",
    date: "2026-11-25",
    updatedAt: "2026-11-25",
    readTime: "7 min",
    excerpt:
      "The two kinds of composite retaining wall, the heights manufacturers publish, permit thresholds, and the checks an FRP sheet pile wall has to pass.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Waterfront and civil structures",
    reviewedBy: "Editorial source check",
    standards: ["ASTM D7290", "USACE EM 1110-2-2504", "IBC 105.2"],
    coverImage: "/images/covers/blog/composite-retaining-wall-types.webp",
    coverAlt: "Two sections: an anchored FRP sheet pile wall with cap, waler, tie rod, deadman anchor, exposed height and embedment; and a landscape wall of composite sleepers between posts with drainage gravel",
    coverNote: "Schematic",
    coverImageFit: "contain",
    supportingImage: "/images/applications/frp-waterfront-retaining-walls.svg",
    supportingAlt: "Anchored sheet-pile wall section showing a buried tie rod, anchor block, waler, water and bed levels, and embedment below the bed.",
    supportingImageFit: "contain",
    supportingCaption: "Anchored sheet pile wall: bed and water levels separate the exposed height from the embedment.",
    highlights: [
      "Two products share the name: driven FRP sheet pile walls and composite sleeper walls between posts.",
      "Published FRP sheet pile wall heights: 3 ft to over 20 ft, most economical between 6 and 18 ft.",
      "Permits: walls over 4 ft (IBC 105.2) or 1 m (Queensland) need approval, as do walls carrying a surcharge.",
    ],
    ogDescription:
      "Composite retaining wall types explained: FRP sheet pile walls and composite sleeper walls, published heights, permit thresholds and design checks.",
    ogChips: ["FRP sheet piles", "Sleeper walls", "Heights and permits"],
    relatedLinks: [
      { label: "FRP sheet piling", href: "/products/frp-sheet-piling" },
      { label: "FRP waterfront retaining walls", href: "/applications/frp-waterfront-retaining-walls" },
    ],
    sourceLinks: [
      { label: "Creative Composites Group: FRP sheet pile walls, heights and installation", href: "https://www.creativecompositesgroup.com/industries-products/waterfront-infrastructure/stormstrong-sheet-piles" },
      { label: "Creative Composites Group: FRP sheet pile walls webinar Q&A", href: "https://www.creativecompositesgroup.com/blog/frp-sheet-pile-walls-webinar-qa" },
      { label: "ACMA technical day slides: FRP sheet piling design values", href: "https://acmanet.org/wp-content/uploads/2024/02/B1-Troutman-2021-ACMA-CI-Tech-Day-Sheet-Piling-1.pdf" },
      { label: "ASTM D7290: characteristic values for polymeric composites in civil structures", href: "https://store.astm.org/d7290-06r22.html" },
      { label: "2015 IBC Section 105.2: work exempt from permit", href: "https://rigov.org/DocumentCenter/View/19564/2015-IBC-Work-Exempt-from-Permits" },
      { label: "City of Moreton Bay, Queensland: retaining walls", href: "https://www.moretonbay.qld.gov.au/Services/Building-Development/Building/Building-And-Structure-Types/Retaining-Walls" },
      { label: "Narangba Timbers: composite sleeper retaining walls", href: "https://narangbatimbers.com.au/?p=13135" },
    ],
    faq: {
      title: "Composite retaining wall questions",
      items: [
        { question: "What is a composite retaining wall?", answer: "A retaining wall whose facing is fiber-reinforced polymer or another composite. In waterfront and civil work it means interlocking FRP sheet piles; in landscaping it means composite sleepers or panels held between posts." },
        { question: "How high can a composite retaining wall be?", answer: "One FRP sheet pile manufacturer quotes walls from 3 ft to over 20 ft depending on soil, surcharge and tie-backs, and says composites are most economical between 6 and 18 ft. Composite sleeper walls are usually kept to about 4 ft or 1 m unless engineered." },
        { question: "Do I need a permit for a composite retaining wall?", answer: "Often, above a set height. IBC 105.2 exempts walls not over 4 ft measured from the bottom of the footing to the top of the wall, unless they support a surcharge. In Queensland a wall more than one metre high needs building approval. Check the local rule." },
        { question: "How deep are FRP sheet piles driven?", answer: "A manufacturer's rule of thumb is half the pile in the ground and half out, rising to two thirds in the ground in poor soils. The geotechnical design sets the actual embedment." },
        { question: "How long does a composite retaining wall last?", answer: "Manufacturers of FRP sheet piling claim 75 years or more based on their own testing, and landscape wall suppliers claim 30 to 50 years. These are supplier claims; ask for the durability evidence behind the offered section." },
      ],
    },
    content: `"Composite retaining wall" is used for two different products. Searching the term returns landscape walls built from composite sleepers next to driven FRP sheet pile walls for waterfronts. They share a material family and little else, so the first step is to know which one a project needs.

## The two kinds of composite retaining wall

| | FRP sheet pile wall | Composite sleeper wall |
| --- | --- | --- |
| Where | Seawalls, bulkheads, canal and pond banks, flood walls | Gardens, terraces, property boundaries |
| How it works | Interlocking pultruded sections driven into the ground; taller walls are tied back | Boards or panels stacked between posts set in footings |
| Typical height | 3 ft to over 20 ft (one manufacturer) | Up to about 4 ft or 1 m without engineering |
| Designed by | Geotechnical and structural engineers | Installer up to the permit threshold, engineer above it |

A third use of the word belongs to geotechnical engineering, where reinforced soil is described as a composite structure of backfill and reinforcement. That is a design method, not a facing material.

## FRP sheet pile walls

Pultruded glass-fiber sheet piles interlock along their edges to form a continuous wall. They are used where steel would corrode and timber would rot: salt water, brackish canals and chemically aggressive ground.

**Height.** Creative Composites Group, a US manufacturer, describes walls from 3 ft to over 20 ft depending on soil conditions, surcharge loads and tie-back design, and says composites are most economical between 6 and 18 ft. Taller walls use tie-backs, deadman anchors or more than one waler.

**Embedment.** The same manufacturer's rule of thumb is half the pile length in the ground and half out, and up to two thirds in the ground depending on the soil.

**Design values.** Strength is published as moment capacity per foot of wall, with section modulus per foot. Industry guidance presented at an ACMA technical day says characteristic strengths should be published to ASTM D7290, which defines the characteristic value as the 80% lower confidence bound on the 5th percentile, and applies safety factors of 2.0 to 2.5 in flexure for allowable stress design. USACE EM 1110-2-2504 is the general design manual for sheet pile walls.

**Stiffness and creep.** FRP is less stiff than steel, so deflection often governs. Earth and water pressure act for the whole life of the wall, and manufacturers handle creep with a time-effect factor on the properties. Ask for the long-term values of the offered section, not only short-term coupon results.

**Installation.** Piles are driven with vibratory hammers, impact hammers or excavator-mounted drivers, with jetting in very dense soils. Thin-walled sections often need a mandrel or guide frame.

**Service life.** Manufacturers claim 75 years or more from their own testing and analysis. Treat this as a supplier claim and review the evidence for the submerged zone and the exposed zone separately.

## Composite sleeper and panel walls

Landscape systems stack composite boards between posts. An Australian supplier allows any sleeper length up to 0.6 m high and recommends its shorter 1,950 mm sleeper between 0.8 m and 2 m. A US contractor describes standard walls up to about 4 ft, with engineered posts and tie-backs above that, and puts the installed cost at $20 to $45 per square foot of wall face.

The appeal is low weight and no rot. One supplier quotes 4 to 6 kg per sleeper against 70 kg for concrete. The limits are height and load: for a tall, heavily loaded wall the same contractor says concrete is more economical.

## Permit thresholds

| Jurisdiction | Rule |
| --- | --- |
| International Building Code 105.2 (US model code) | No permit for retaining walls not over 4 ft (1,219 mm) measured from the bottom of the footing to the top of the wall, unless supporting a surcharge |
| City of Moreton Bay, Queensland | Building approval for a wall more than one metre high, within 1.5 m of a building or another retaining wall, or carrying a surcharge |

Local amendments vary. The measurement runs from the bottom of the footing, so a wall showing 3 ft above ground can still exceed 4 ft.

## Checks before specifying an FRP sheet pile wall

1. **Ground and water:** soil strata, groundwater and surface-water levels, surcharge and scour.
2. **Wall:** long-term bending, shear, local stability and deflection for the offered section.
3. **Interlocks and anchors:** interlock loads, seepage limits, walers and tie-rod connections.
4. **Exposure:** water chemistry, UV, abrasion and impact in the zone between low water and the cap.
5. **Installation:** delivery lengths, driving method and a trial in representative ground.

## Related FRP products

F1 Composite supplies pultruded [FRP sheet piling](/products/frp-sheet-piling) sections, caps and corner pieces to an agreed drawing; the wall design stays with the project engineer. The inquiry inputs are listed under [FRP waterfront retaining walls](/applications/frp-waterfront-retaining-walls). F1 does not sell landscape sleeper systems; those described above are other companies' products.`,
  },
  {
    slug: "8-ft-fiberglass-tree-stakes",
    title: "8 ft Fiberglass Tree Stakes: Diameter, Depth and Ties",
    seoTitle: "8 ft Fiberglass Tree Stakes: Diameter, Depth and Ties",
    answerBox:
      "An 8 ft fiberglass tree stake is a solid pultruded rod 96 in (2.44 m) long, sold in diameters from 3/8 in to about 7/8 in. Driven 12 to 18 in into undisturbed soil, it leaves 6.5 to 7 ft above ground. University guidance places ties 18 to 24 in above the ground and removes stakes after one growing season.",
    category: "Materials Guide",
    date: "2026-11-25",
    updatedAt: "2026-11-25",
    readTime: "5 min",
    excerpt:
      "Which diameters come in 8 ft, how deep to drive the stake, where the ties go, what each stake weighs and how many make a factory order.",
    authorName: "F1 Composite Editorial Team",
    authorType: "Organization",
    authorRole: "Pultruded rod products",
    reviewedBy: "Editorial source check",
    standards: [],
    coverImage: "/images/covers/blog/8-ft-fiberglass-tree-stake-depth.webp",
    coverAlt: "Young tree between two 8 ft fiberglass stakes, each driven 12 to 18 in into undisturbed soil outside the root ball, with loose ties 18 to 24 in above ground",
    coverNote: "Schematic",
    coverImageFit: "contain",
    supportingImage: "/images/products/fiberglass-stakes/fiberglass-tree-stakes-loose-ties-concept.webp",
    supportingAlt: "Young nursery tree supported by two dark green fiberglass tree stakes and wide soft ties",
    supportingCaption: "Two stakes outside the root ball with wide, loose ties.",
    highlights: [
      "8 ft is 96 in (2.44 m); 12 to 18 in goes in the ground, leaving 6.5 to 7 ft above it.",
      "Listed diameters at 8 ft run from 3/8 in to about 7/8 in; an 8 ft stake weighs 0.34 to 1.68 kg.",
      "Ties sit 18 to 24 in above ground; stakes come out after one growing season.",
    ],
    ogDescription:
      "8 ft fiberglass tree stakes: listed diameters, driving depth, tie height, weight per stake by diameter and how many stakes make a factory order.",
    ogChips: ["96 in / 2.44 m", "3/8 to 7/8 in", "12 to 18 in deep"],
    relatedLinks: [
      { label: "Fiberglass tree stakes and plant supports", href: "/products/fiberglass-stakes" },
      { label: "Solid fiberglass rod sizes", href: "/products/fiberglass-structural-shapes/frp-rod" },
    ],
    sourceLinks: [
      { label: "Kansas State University MF1120: staking and guying landscape trees", href: "https://bookstore.ksre.ksu.edu/download/staking-and-guying-landscape-trees_MF1120" },
      { label: "University of Minnesota Extension: staking and guying trees", href: "https://extension.umn.edu/planting-and-growing-guides/staking-and-guying-trees" },
      { label: "Royal Horticultural Society: tree staking", href: "https://www.rhs.org.uk/plants/types/trees/staking" },
      { label: "Colorado State University Extension: tree staking", href: "https://extension.colostate.edu/resource/tree-staking-and-underground-stabilization/" },
      { label: "ISA Trees Are Good: planting a tree", href: "https://www.treesaregood.org/treeowner/plantingatree" },
      { label: "UC Master Gardeners of Contra Costa: tree staking", href: "https://ucanr.edu/blog/hort-coco-uc-master-gardener-program-contra-costa/article/tree-staking" },
      { label: "Ultrastake: nursery fiberglass stake sizes", href: "https://ultrastake.com/products" },
    ],
    faq: {
      title: "8 ft fiberglass tree stake questions",
      items: [
        { question: "How deep should an 8 ft tree stake go?", answer: "Kansas State University advises driving a stake 12 to 18 in into undisturbed soil outside the planting pit, and the Royal Horticultural Society says at least 40 cm (16 in). That leaves 6.5 to 7 ft of an 8 ft stake above ground." },
        { question: "What diameter should an 8 ft fiberglass tree stake be?", answer: "A US nursery supplier stocks 8 ft stakes in 3/8 in and 1/2 in, and retail listings go up to about 7/8 in. Thin stakes train a leader in nursery rows; thicker stakes resist more wind load on a landscape tree. No extension guide ties a diameter to a tree size." },
        { question: "How much does an 8 ft fiberglass stake weigh?", answer: "From the F1 solid rod catalog: about 0.34 kg at 10 mm, 0.59 kg at 13 mm, 0.90 kg at 16 mm, 1.27 kg at 19 mm and 1.68 kg at 22 mm." },
        { question: "How long should tree stakes stay in?", answer: "Kansas State, Colorado State, the University of Minnesota and the International Society of Arboriculture all say to remove stakes after one growing season or the first year. The Royal Horticultural Society allows eighteen months to three years." },
        { question: "Can I order 8 ft fiberglass tree stakes from the factory?", answer: "Yes. F1 Composite cuts stakes from pultruded rod, so 8 ft is a cut length. Diameter, color, surface veil and a pointed end are confirmed on the quotation and the approved sample." },
      ],
    },
    content: `An 8 ft stake is the length buyers choose when a 6 ft stake is too short to hold a taller leader or to stay above the lowest branches. This guide covers the diameters sold in 8 ft, how the stake is installed, and what an order looks like from a pultrusion factory.

## What 8 ft gives you above ground

| | Imperial | Metric |
| --- | --- | --- |
| Stake length | 8 ft (96 in) | 2.44 m |
| In the ground | 12 to 18 in | 0.30 to 0.46 m |
| Above ground | 6.5 to 7 ft | 1.98 to 2.13 m |

The driving depth comes from Kansas State University, which advises 12 to 18 in into undisturbed soil outside the planting pit. The Royal Horticultural Society gives at least 40 cm (16 in).

## Diameters sold in 8 ft

| Nominal diameter | Nearest catalog rod | Weight per 8 ft stake |
| --- | --- | --- |
| 3/8 in | 10 mm | 0.34 kg |
| 1/2 in | 13 mm | 0.59 kg |
| 5/8 in | 16 mm | 0.90 kg |
| 3/4 in | 19 mm | 1.27 kg |
| 7/8 in | 22 mm | 1.68 kg |

Weights are the F1 solid rod catalog weight per meter multiplied by 2.44 m. One US nursery supplier stocks 8 ft stakes in 3/8 in and 1/2 in, with 10 ft and 12 ft lengths starting at 1/2 in; retail listings in November 2026 showed 8 ft stakes up to about 7/8 in.

No university guide links a stake diameter to a tree size. The published limits are for wooden stakes: Kansas State says a tree up to 1-1/2 to 1-3/4 in caliper, 10 to 12 ft tall, can be staked with a 2 × 2 in stake 5 ft long.

## Two jobs for an 8 ft stake

- **Training in the nursery.** A thin stake is tied along the trunk to grow a straight leader. This stake comes off at planting: the University of California Master Gardeners advise removing the nursery stake and its ties after the tree is in the ground.
- **Support after planting.** One or two stakes outside the root ball hold a tree that cannot stand alone or sits in a windy spot. Many newly planted trees need no stakes.

## Installing support stakes

1. Drive each stake 12 to 18 in into undisturbed soil outside the planting pit. Colorado State University places posts at least 15 to 18 in out from the trunk.
2. Tie low. Kansas State supports the tree 18 to 24 in above the ground; the University of Minnesota uses one third or two thirds of the distance from the ground to the first branches.
3. Use broad, flexible ties and leave them loose enough for the trunk to move.
4. Remove stakes and ties after one growing season. Kansas State allows a second season only if the tree still needs support.

A fiberglass stake bends under wind and returns to upright, and does not rot or rust. Suppliers claim service lives of 20 years or more; these are supplier claims, and no independent test data on stake life was found.

## Ordering from the factory

Stakes are cut from continuous pultruded rod, so 8 ft is a cut length and any other length costs the same per meter. The minimum order is ${supplyTerms.moqMeters.toLocaleString("en-US")} m per diameter, which is ${STAKES_8FT_PER_MOQ} stakes at 8 ft. State the diameter, color, whether a surface veil is needed for handling comfort, and whether one end is pointed.

Sizes, colors and the inquiry checklist are on the [fiberglass tree stakes](/products/fiberglass-stakes) page. Plain rod without stake finishing is listed under [fiberglass rods](/products/fiberglass-structural-shapes/frp-rod).`,
  },
];
