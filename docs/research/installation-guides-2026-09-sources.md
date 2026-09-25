# Installation guides (cable tray, handrail, GFRP rebar): source record, 2026-09-25

Three guides were added to `content/data/blogPosts.ts`:

- `how-to-install-frp-cable-tray`
- `how-to-install-frp-handrail`
- `how-to-install-gfrp-rebar`

Each one links back to its commercial page, and that page links to it:

- `/applications/frp-cable-tray-supports`
- `/products/frp-handrail-systems`
- `/products/frp-rebar`

## How the facts were checked

**Read in full.** The network policy for this session allowed only the WBDG document store. These three documents were downloaded from it and read in full:

- UFGS 06 82 14 (August 2023);
- UFC 3-301-01 Change 5 (January 2026), Appendix G;
- UFGS 03 31 29 (May 2024).

**Checked through search extracts.** Other hosts were blocked, including:

- the NEMA, CTI, MP Husky, FDOT, Øglænd and Fibergrate sites;
- the ABB library.

Facts from those sources were taken from search-result extracts only, and only where two or more independent extracts agreed. Numbers that appeared in a single extract, or only in a competitor's blog, were left out. For example:

- a fiberglass-specific expansion-joint spacing;
- FDOT support spacing;
- sidewall-pressure limits.

## Claim ledger

| Claim | Source | Check |
| --- | --- | --- |
| Splice about ¼ span from a support, not over supports or at midspan; support span no longer than one straight section | NEMA VE 2 (2006, 2013 and 2018 editions, via extracts) | Two independent extracts agree |
| Supports within 600 mm (2 ft) of each fitting end; 90° horizontal elbow supported at the 45° point | NEMA VE 2 (extract) | Consistent with VE 2 figures described in two extracts |
| Support within 2 ft of each side of expansion splices; hold-down at the support nearest the midpoint, expansion guides elsewhere | Cable Tray Institute thermal expansion bulletin (extracts) | Two extracts agree |
| VE 1 metal tray: expansion joint every 128 ft (steel) and 65 ft (aluminum) at 100 °F differential | CTI bulletin citing NEMA VE 1 Table 6-1 (extract) | Metal values only; no FRP value published |
| NEC 392.44 expansion splice plates; 392.30(B)(1) cables fastened in non-horizontal runs; 392.60 metal tray as EGC; 392.10(B)(1)(c) single EGC 4 AWG or larger; 392.80(A)(1)(b) 95% ampacity under solid covers over 6 ft; 392.100 flame-retardant nonmetallic tray; 300.21 firestopping | NFPA 70 as summarized by code references (extracts) | Each section confirmed by at least two extracts |
| FOE load data assume an end span of ¾ of the support spacing with no end-span splice | Øglænd FOE page | Already in `frp-cable-tray-trunking-ladder-sources.md` |
| Worked expansion example uses an assumed coefficient of 9 × 10⁻⁶ per °C | Editorial assumption, stated as such in the text | Not presented as a product value |
| Railing loads 50 lbf/ft and 200 lbf; infill 50 lbf on 1 ft² or 25 lbf/ft² | UFGS 06 82 14, 2.1.4.1 | Read in full |
| Posts no more than 72 in (1.83 m) apart; rails joined by bonding and riveting; post bases reinforced to 8.5 in (22 cm); all cuts coated with vinyl ester resin | UFGS 06 82 14, 2.2 | Read in full |
| Type 316 stainless fasteners; anchors 4× design load in concrete and 6× in masonry by ASTM E488; ASTM C1107 grout | UFGS 06 82 14, 2.3 | Read in full |
| Posts plumb within 1/16 in in 3 ft; rails within 1/4 in in 12 ft | UFGS 06 82 14, 3.1 | Read in full |
| Storage 70–85 °F in dry indoor facilities; UV inhibitors, surfacing veil and UV coating; manufacturer's certification of installation | UFGS 06 82 14, 1.4, 2.1.3, 3.1 and 3.2.2 | Read in full |
| F1 handrail catalog values (1,500 mm post spacing, 1,220 mm height, rail, splice, kick-plate and fitting sizes, M6 × 90 foot-base anchors) | `content/data/frpHandrailSpecs.ts` | Catalog references, not compliance proof |
| Replace bars with surface damage; cover from sun after 2 months (UFGS) or 4 months (ACI 440.5); do not exceed 120 °F; dielectric or dielectric-coated supports; field cutting permitted, field bending not | UFC 3-301-01 Change 5, G-5.3 and G-6 | Read in full |
| D7957 mean Tg at least 100 °C; ACI 440.11 service limit about 85 °C | UFC 3-301-01 Change 5, G-5.3 | Read in full |
| GFRP bar specific gravity 1.92 | University of Kentucky / FHWA (2000), via `fiberglass-rebar-vs-steel-report-source.md` | Product-specific; used only to explain flotation |
| GFRP bars a permitted alternative, not an in-kind replacement for steel | UFGS 03 31 29, 2.7.2.10 | Read in full |

## Images

- **Cable tray guide:** both images are the existing AI-generated product and concept illustrations from the application page. The caption says so.
- **Handrail and rebar guides:** they reuse catalog images already on the product pages.
