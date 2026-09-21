# Fasteners and fittings — source record

Reviewed: 2026-09-21. Public route: `/products/frp-fasteners-fittings`.

## Catalog sources

- [NHC range](https://www.nhcfrp.com/GRP-Fasteners.html): scope of threaded rods, nuts, washers, molded fittings and associated hardware. F1 copy is independently written. Supplier certifications, company claims, stock and delivery promises are not transferred to F1.
- [Vinyl ester threaded rods](https://www.nhcfrp.com/VE-Threaded-Rods-14415-product_3.html): UNC thread designations, nominal diameters and catalog lengths only.
- [Epoxy threaded rods](https://www.nhcfrp.com/Epoxy-Threaded-Rods1.html): metric nominal sizes and lengths only. Source thread field says “National”; pitch and tolerance are not established. The source was retrieved directly with curl because the search fetch failed.
- [Hex nuts](https://www.nhcfrp.com/Hex-Nut.html): nominal metric / UNC series and UP, VE, EP material options. Square-nut and bolt-set requests require drawing confirmation.
- [Washers](https://www.nhcfrp.com/Washer1.html): diameter labels and UP / VE options. Labels do not establish bore versus outside diameter or thickness, so the public page explicitly requests all three dimensions.
- [Molded fittings](https://www.nhcfrp.com/fiber-glass-reinforced-plastic-wholesales.html): product type and reference image only. The page mixes generic component dimensions and load statements with unrelated applications; no strength, size or load values are adopted.

## Limits and review decisions

- No thread strength, electrical rating, fire rating, safe load or installation torque is offered as an F1 design value. Source torque rows cite ASTM D635 (a burning test), so they are omitted pending an applicable procedure and report.
- Metric and UNC connections remain distinct; nominal metric conversions are not compatibility claims.
- Existing F1 grating guides own the 316 stainless-steel M/C/J and M/J/T hardware. These are clearly separated from composite fasteners.
- No supplier article numbers become F1 SKUs. All sizes are quotation references, subject to order confirmation.
- No invented price, inventory, certification, author or reviewer is emitted in structured data.

## Product images

Reference images were retrieved from the user-provided supplier catalog, visually inspected, and converted to WebP at the original 600 × 400 size. No logos were present or removed. These are catalog references, not F1 project photography. The washer is an illustration. Source rights are not independently established by this record.

Source prefix: `https://www.nhcfrp.com/uploadfiles/128.1.164.27/webid1809/source/202407/`

| Local filename under `public/images/products/frp-fasteners-fittings/` | Source filename |
| --- | --- |
| vinyl-ester-threaded-rods.webp | 8215817210212280.jpg |
| epoxy-threaded-rods.webp | 889417210211321.jpg |
| frp-hex-nuts.webp | 36008172102123810.jpg |
| frp-washers.webp | 3446817223218022.jpg |
| frp-molded-fittings.webp | 3145517210216803.jpg |

The grating image reuses the existing `molded-frp-grating/grating-clips-hardware-reference.webp` asset.
