/**
 * Certificate and report covers shown on the solar page (#certificates) and
 * claimed for its image sitemap entry (lib/pageImages.ts). Rendered from the
 * source PDFs at 110 dpi, 720 px wide.
 *
 * Only certificates and report covers are shown: TÜV Rheinland does not allow
 * its test reports to be reproduced in extracts. The module model on the
 * 2024DMWA20403 cover is masked because it identifies the module maker.
 * CPIC (Chongqing Polycomp International Corp.) is FengDu's parent company and
 * cleared use of its reports on 2026-11-19.
 */
export interface PvCertificate {
  src: string;
  alt: string;
  group: "frame" | "factory";
  kind: string;
  reference: string;
  caption: string;
}

const dir = "/images/products/solar-certificates";

export const pvCertificates: PvCertificate[] = [
  {
    src: `${dir}/frp-pv-module-frame-tuv-rheinland-certificate-ak-50644770.webp`,
    alt: "TÜV Rheinland certificate of conformity AK 50644770 0001 for the GFF polymer composite PV module frame",
    group: "frame",
    kind: "Certificate",
    reference: "TÜV Rheinland AK 50644770 0001",
    caption: "Certificate of conformity to 2 PfG 2923/11.22 for five GFF frame sections, holder Chongqing Fengdu New Material Co., Ltd., 27 August 2024.",
  },
  {
    src: `${dir}/frp-pv-module-frame-tuv-rheinland-constructional-data-form.webp`,
    alt: "TÜV Rheinland constructional data form, appendix 1.2, for the GFF composite PV module frame",
    group: "frame",
    kind: "Certificate appendix",
    reference: "Constructional data form 1.2",
    caption: "Frame dimensions, density, fibre content, coatings and operating temperature (−40 °C to +85 °C), updated 30 September 2025.",
  },
  {
    src: `${dir}/frp-pv-module-frame-cpvt-material-test-report-2025dacs20319-cover.webp`,
    alt: "Cover of CPVT test report 2025DACS20319 on a composite PV module frame",
    group: "frame",
    kind: "Test report cover",
    reference: "CPVT 2025DACS20319",
    caption: "Frame material properties and ageing. The full report with English notes is listed above.",
  },
  {
    src: `${dir}/frp-framed-pv-module-static-load-cpvt-report-2024dmwa20403-cover.webp`,
    alt: "Cover of CPVT test report 2024DMWA20403, static load on a PV module with a composite frame",
    group: "frame",
    kind: "Test report cover",
    reference: "CPVT 2024DMWA20403",
    caption: "IEC 61215-2 static load on a composite-framed 570 W module: 5,400 Pa front and 2,400 Pa rear, Pmax −0.16 % and −0.07 %. Client CPIC; module model masked.",
  },
  {
    src: `${dir}/frp-pv-frame-laminate-durability-cpvt-report-2024dacs20165-cover.webp`,
    alt: "Cover of CPVT test report 2024DACS20165 on the durability of a composite PV frame laminate",
    group: "frame",
    kind: "Test report cover",
    reference: "CPVT 2024DACS20165",
    caption: "Longitudinal tensile strength retained after exposure: 96.2 % after 480 h ammonia, 86.9 % after 480 h salt mist, 64.6 % after 1,680 h salt mist. Client CPIC.",
  },
  {
    src: `${dir}/fengdu-pultrusion-iso-9001-quality-management-certificate.webp`,
    alt: "ISO 9001:2015 quality management certificate of Chongqing Fengdu New Material Co., Ltd., issued by CCSC",
    group: "factory",
    kind: "ISO 9001:2015",
    reference: "CCSC 00524Q0229R1M",
    caption: "Quality management. Valid until 17 January 2027.",
  },
  {
    src: `${dir}/fengdu-pultrusion-iso-14001-environmental-management-certificate.webp`,
    alt: "ISO 14001:2015 environmental management certificate of Chongqing Fengdu New Material Co., Ltd., issued by CCSC",
    group: "factory",
    kind: "ISO 14001:2015",
    reference: "CCSC 00524E0230R1M",
    caption: "Environmental management. Valid until 17 January 2027.",
  },
  {
    src: `${dir}/fengdu-pultrusion-iso-45001-health-safety-management-certificate.webp`,
    alt: "ISO 45001:2018 occupational health and safety certificate of Chongqing Fengdu New Material Co., Ltd., issued by CCSC",
    group: "factory",
    kind: "ISO 45001:2018",
    reference: "CCSC 00524S0231R1M",
    caption: "Occupational health and safety. Valid until 17 January 2027.",
  },
];
