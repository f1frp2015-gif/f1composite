# Agriculture and horticulture stakes application

Route: `/applications/agriculture-horticulture-stakes`  
Research date: September 21, 2026

## Buyer journey

The application guide serves growers, commercial nurseries, vineyard and orchard operators, planting contractors and agricultural supply distributors. It connects the growing task to selection inputs, installation/field-trial checks, a sample decision, a defined quotation and repeat supply.

The project brief offers selection help, sample/field-trial enquiries and bulk quotations. It sends the selected stage and optional project inputs to the existing contact form using `buildRfqHref`; the user reviews the prefilled message and adds contact details before submitting. No new lead backend, automatic outbound message or sample-order commitment is introduced. Existing source/product attribution remains intact.

## Source decisions

| Primary source | Used for | Boundary |
| --- | --- | --- |
| [Plantra Trunk Builder](https://www.plantra.com/Trunk-Builder-Reinforced-Fiberglass-Stakes--6-ft-10-Pack_p_418.html) | Treat shelter, stake and attachment as a coordinated system; ask for shelter model and interface | Proprietary three-sided reinforced stake, not F1's round rod; no transfer of comparative strength, plant-growth or durability claims |
| [Plantra product instructions](https://www.plantra.com/product-instructions.html) and [SunFlex instructions](https://www.plantra.com/assets/images/Knowledge%20Center/Instructions/Plantra-SunFlex-Tree-Green-House-Grow-Tube-Shelter-Installation-Instruction.pdf) | Compatibility and approved installation matter | Internal installation and driving instructions belong to the named proprietary system; no generic substitution instructions |
| [Pulwell nursery stakes](https://www.pulwellfrp.com/en/Products.aspx?id=281) | Nursery, vine, orchard, vegetable and flower application coverage | Supplier dimensions, performance and service claims are not F1 specifications; netting/low-tunnel supports require a separate review |
| [Unicomposite plant stake page](https://www.unicomposite.com/product/frp-plant-stake/) | Diameter, length, quantity, application, destination and existing sample/photo as quote inputs | No import of its wider size range, alternate sections or supplier promises |
| [University of Maryland Extension](https://www.extension.umd.edu/resource/planting-tree-or-shrub) | Need-based tree staking, flexible attachment, growth inspection and temporary support removal | Agronomic guidance rather than F1 performance evidence; avoid universal staking requirement or fixed tie/spacing prescription |
| [Penn State Extension](https://extension.psu.edu/a-stepwise-guide-to-dormant-pruning-and-training-young-grapevines) | Young vine training toward the fruiting wire and distinction from permanent trellis | Does not establish an FRP stake capacity or universal vineyard design |
| F1 `content/data/frpStakeSpecs.ts` | Existing public-market reference sizes and illustration assets | Reuse one data source; explicitly not F1 stock, certified capacities or crop-specific recommended diameters |

Page content is original synthesis. Supplier references do not imply commercial relationships or endorsement. Existing F1 images are labeled as visualizations, not case-study photographs.

## Commercial and technical boundaries

- No invented stock, price, MOQ, fixed lead time, free sample offer, durability warranty or savings percentage.
- Accessories, shelters, netting and trellis structures are separate quote scopes.
- Dimension references support an enquiry only. No automatic stake sizing or embedment recommendation is calculated.
- The numerical exposed-length example is arithmetic, not an installation specification.
- Sample trials check fit and handling; short trials do not substantiate long-term UV or extreme-weather performance.
- Repeat use requires inspection; thermoset FRP is not presented as biodegradable.

## Integration and verification

The shared application registry supplies the dynamic route, sitemap and public knowledge listing. Entry points are added to the application taxonomy, application navigation and F1 stakes product page. Metadata uses the application image and canonical route. The main body stays server-rendered; only the brief is a client component.

Run `npm run lint`, `npm run build`, `node --test scripts/agriculture-inquiry.test.mjs scripts/fiberglass-stakes-page.test.mjs scripts/navigation-ia.test.mjs`, and `npm run check:sitemap`. Browser checks cover section navigation, FAQ disclosure, project-brief stage selection and the contact-form handoff without submitting a lead.

Verification completed: 18 related tests passed; sitemap coverage passed; production build generated all 359 pages including this route. Lint has no errors and one pre-existing `SectionViewer3D.tsx` hook dependency warning. Desktop sample and mobile bulk-quote handoffs preserved their brief fields without submitting a lead. A mobile grid overflow identified at 390 px was corrected. The development-only React CSP diagnostic is unrelated to this page; production checks use the compiled build.
