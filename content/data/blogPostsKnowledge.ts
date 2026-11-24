import type { BlogPost } from "./blogPosts";

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

- **First cost:** close to twice that of wood for distribution poles in the ORNL review.
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
];
