/**
 * How to verify each third-party report and certificate in the evidence index.
 * Every holder, reference, date, contact and verification route below is
 * transcribed from the document itself (October 2026). The laboratories'
 * own files are published unaltered: several carry digital signatures, and the
 * reports state that altered copies are invalid. F1's binding note therefore
 * lives on these pages and in the notes column of F1's English copies, never
 * on a laboratory page.
 */

export interface VerificationFile {
  /** Path under /public. */
  path: string;
  role: "Laboratory original" | "Certificate as issued" | "F1 copy with English notes";
}

export interface ReportVerification {
  /** Evidence record id (card anchor on /resources/evidence). */
  evidenceId: string;
  /** URL segment under /resources/evidence/. */
  slug: string;
  issuer: string;
  issuerShort: string;
  documentType: "Test report" | "Component certificate";
  reference: string;
  otherReferences: { label: string; value: string }[];
  holderRole: "Client" | "Applicant" | "Manufacturer";
  /** As printed, in English where the document is in Chinese. */
  holder: string;
  item: string;
  /** YYYY-MM-DD; absent when the document does not print it. */
  issued?: string;
  validUntil?: string;
  files: VerificationFile[];
  /** Verification route printed in the document, in order. */
  steps: string[];
  /** Use restrictions printed in the document. */
  restrictions: string;
}

const SGS_DOC_CHECK = "Or contact SGS's document check, printed at the foot of every page: telephone +86 755 8307 1443 or CN.Doccheck@sgs.com. Quote the report number.";
const ACROBAT_SIGNATURE = "Open the laboratory's PDF in Adobe Acrobat Reader and look at the signature panel. It shows whether the file has changed since it was signed.";

export const reportVerifications: ReportVerification[] = [
  {
    evidenceId: "sgs-e40-cm01",
    slug: "sgs-shin2608002943cm01",
    issuer: "SGS-CSTC Standards Technical Services (Shanghai) Co., Ltd.",
    issuerShort: "SGS",
    documentType: "Test report",
    reference: "SHIN2608002943CM01_EN",
    otherReferences: [{ label: "SGS reference", value: "NBIN2608000196CM01" }],
    holderRole: "Client",
    holder: "Chongqing Xianju New Material Co., Ltd.",
    item: "Fiber-reinforced composite profile, product specification 60605; full-section test to EN 13706-2 Annex D",
    issued: "2026-09-07",
    files: [{ path: "/downloads/sgs-full-section-modulus-shin2608002943cm01-en.pdf", role: "Laboratory original" }],
    steps: [
      "Scan the QR code at the foot of page 1. The caption under it names SGS's report check, check.sgsonline.com.cn.",
      SGS_DOC_CHECK,
      ACROBAT_SIGNATURE,
    ],
    restrictions: "SGS states that the results refer only to the samples tested and that the report is for the client's research, internal quality control and product development, for internal reference only. It may not be reproduced except in full without SGS's written approval.",
  },
  {
    evidenceId: "sgs-e40-cm02",
    slug: "sgs-shin2608002943cm02",
    issuer: "SGS-CSTC Standards Technical Services (Shanghai) Co., Ltd.",
    issuerShort: "SGS",
    documentType: "Test report",
    reference: "SHIN2608002943CM02_EN",
    otherReferences: [{ label: "SGS reference", value: "NBIN2608000196CM02" }],
    holderRole: "Client",
    holder: "Chongqing Xianju New Material Co., Ltd.",
    item: "Fiber-reinforced composite profile, product specification 90905; full-section test to EN 13706-2 Annex D",
    issued: "2026-09-07",
    files: [{ path: "/downloads/sgs-full-section-modulus-shin2608002943cm02-en.pdf", role: "Laboratory original" }],
    steps: [
      "Scan the QR code at the foot of page 1. The caption under it names SGS's report check, check.sgsonline.com.cn.",
      SGS_DOC_CHECK,
      ACROBAT_SIGNATURE,
    ],
    restrictions: "SGS states that the results refer only to the samples tested and that the report is for the client's research, internal quality control and product development, for internal reference only. It may not be reproduced except in full without SGS's written approval.",
  },
  {
    evidenceId: "phi-2491wi03",
    slug: "phi-2491wi03",
    issuer: "Passive House Institute, Darmstadt",
    issuerShort: "PHI",
    documentType: "Component certificate",
    reference: "2491wi03",
    otherReferences: [{ label: "Category", value: "Window frame" }],
    holderRole: "Manufacturer",
    holder: "Chongqing Xianju New Material Co., Ltd.",
    item: "Fengdu Passive GFRP 90 Series window frame, cool-temperate climate zone, efficiency class phB, Uw 0.78 W/(m²·K) with Ug 0.70 W/(m²·K)",
    validUntil: "2026-12-31",
    files: [{ path: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf", role: "Certificate as issued" }],
    steps: [
      "Search the Passive House Institute's component database (database.passivehouse.com) for component ID 2491wi03, and compare the manufacturer, product name and climate zone with the certificate.",
      "Check the validity date printed on the certificate, 31 December 2026. After that date, ask us for the renewed certificate.",
    ],
    restrictions: "The certificate states the criteria for the cool, temperate climate zone and the glazing it was awarded with. It does not certify other window series, glazing or climate zones.",
  },
  {
    evidenceId: "intertek-turn-tilt",
    slug: "intertek-240821010shf-001",
    issuer: "Intertek Testing Services Shenzhen Ltd. Shanghai Fengxian Branch",
    issuerShort: "Intertek",
    documentType: "Test report",
    reference: "240821010SHF-001",
    otherReferences: [],
    holderRole: "Applicant",
    holder: "Fengdu New Material (Yancheng) Co., Ltd.",
    item: "80 Series turn-and-tilt window, 1200 × 1800 mm, tested to the AS/NZS 4420.1-2016 sequence against AS 2047-2014 (Amdt 2-2017)",
    issued: "2024-12-11",
    files: [{ path: "/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf", role: "Laboratory original" }],
    steps: [
      "The report is digitally signed by Intertek, and its statement 9 asks readers to check the signature in Adobe Acrobat Reader. Open the PDF there and look at the signature panel.",
      "For questions about the report, the issuing laboratory prints its telephone number on every page: +86 21 6113 6116.",
    ],
    restrictions: "Intertek states that the report is invalid if altered, that only the client may permit copying or distribution, and then only of the whole report, and that the results relate only to the samples tested.",
  },
  {
    evidenceId: "intertek-sliding",
    slug: "intertek-240821010shf-002",
    issuer: "Intertek Testing Services Shenzhen Ltd. Shanghai Fengxian Branch",
    issuerShort: "Intertek",
    documentType: "Test report",
    reference: "240821010SHF-002",
    otherReferences: [],
    holderRole: "Applicant",
    holder: "Fengdu New Material (Yancheng) Co., Ltd.",
    item: "Historical 140 Series lift-sliding door, 3000 × 2400 mm, tested to the AS/NZS 4420.1-2016 sequence against AS 2047-2014 (Amdt 2-2017)",
    issued: "2024-12-11",
    files: [{ path: "/downloads/intertek-report-240821010SHF-002-lift-sliding-door.pdf", role: "Laboratory original" }],
    steps: [
      "The report is digitally signed by Intertek, and its statement 9 asks readers to check the signature in Adobe Acrobat Reader. Open the PDF there and look at the signature panel.",
      "For questions about the report, the issuing laboratory prints its telephone number on every page: +86 21 6113 6116.",
    ],
    restrictions: "Intertek states that the report is invalid if altered, that only the client may permit copying or distribution, and then only of the whole report, and that the results relate only to the samples tested.",
  },
  {
    evidenceId: "cpvt-2025dacs20319",
    slug: "cpvt-2025dacs20319",
    issuer: "National Center for Quality Inspection and Testing of Solar Photovoltaic Products / Wuxi Institute of Inspection, Testing and Certification",
    issuerShort: "Wuxi / CPVT",
    documentType: "Test report",
    reference: "2025DACS20319",
    otherReferences: [{ label: "Report verification code", value: "12266369" }],
    holderRole: "Client",
    holder: "Chongqing Xianju New Material Co., Ltd.",
    item: "Composite material frame for PV modules, all-weather modified resin",
    issued: "2026-06-15",
    files: [
      { path: "/downloads/frp-pv-module-frame-material-performance-test-report-2025dacs20319-original-zh.pdf", role: "Laboratory original" },
      { path: "/downloads/frp-pv-module-frame-material-performance-test-report-2025dacs20319-en.pdf", role: "F1 copy with English notes" },
    ],
    steps: [
      "Scan the QR code on the cover, or go to www.witc.org.cn and choose Online services, Quality inspection online services, Report inquiry, New inquiry. Enter the report verification code 12266369.",
      "To check that the electronic original has not been changed, open the Chinese original in Adobe Acrobat Reader and click its signature and seal, as notice 11 of the report describes.",
      "The laboratory prints its contacts in the report: telephone +86 510 8820 6953, wxt@wxzjs.com.",
    ],
    restrictions: "The report's notices state that it is invalid if altered, that copies are invalid unless the testing seal is affixed again, and that it is responsible only for the samples tested.",
  },
  {
    evidenceId: "tuv-cn24kz3a-002",
    slug: "tuv-rheinland-cn24kz3a-002",
    issuer: "TÜV Rheinland (Shanghai) Co., Ltd.",
    issuerShort: "TÜV Rheinland",
    documentType: "Test report",
    reference: "CN24KZ3A 002",
    otherReferences: [{ label: "Order number", value: "326034308" }],
    holderRole: "Client",
    holder: "Chongqing Fengdu New Material Co., Ltd.",
    item: "Polymer composite PV module frames GFF-SS-3023, GFF-SD-3018, GFF-SD-3023, GFF-SD-3320 and GFF-SD-3323 with Jotun Jota Solar CL coating, to 2 PfG 2923/11.22",
    issued: "2025-03-14",
    files: [{ path: "/downloads/frp-pv-module-frame-jotun-coating-tuv-test-report-cn24kz3a-002.pdf", role: "Laboratory original" }],
    steps: [
      "The report states that it is signed digitally only. The copy published here carries no embedded signature, so Acrobat Reader cannot check it; ask us for the signed file.",
      "TÜV Rheinland confirms the validity of the digital signature in a separate document when its client, the holder named above, asks for it. Tell us which project needs it and we will make the request.",
      "TÜV Rheinland's contacts as printed on the report: service@de.tuv.com, www.tuv.com.",
    ],
    restrictions: "TÜV Rheinland states that the report relates only to the test sample, may not be reproduced in extracts without the test center's permission, must be used complete, and does not entitle anyone to carry a test mark.",
  },
  {
    evidenceId: "tuv-cn24kz3a-003",
    slug: "tuv-rheinland-cn24kz3a-003",
    issuer: "TÜV Rheinland (Shanghai) Co., Ltd.",
    issuerShort: "TÜV Rheinland",
    documentType: "Test report",
    reference: "CN24KZ3A 003",
    otherReferences: [{ label: "Order number", value: "326093213" }],
    holderRole: "Client",
    holder: "Chongqing Fengdu New Material Co., Ltd.",
    item: "Polymer composite PV module frames GFF-SS-3023, GFF-SD-3018, GFF-SD-3023, GFF-SD-3320 and GFF-SD-3323 with B9986S polyester coating, to 2 PfG 2923/11.22",
    issued: "2025-10-10",
    files: [{ path: "/downloads/frp-pv-module-frame-b9986s-coating-tuv-test-report-cn24kz3a-003.pdf", role: "Laboratory original" }],
    steps: [
      "The report states that it is signed digitally only. The copy published here carries no embedded signature, so Acrobat Reader cannot check it; ask us for the signed file.",
      "TÜV Rheinland confirms the validity of the digital signature in a separate document when its client, the holder named above, asks for it. Tell us which project needs it and we will make the request.",
      "TÜV Rheinland's contacts as printed on the report: service@de.tuv.com, www.tuv.com.",
    ],
    restrictions: "TÜV Rheinland states that the report relates only to the test sample, may not be reproduced in extracts without the test center's permission, must be used complete, and does not entitle anyone to carry a test mark.",
  },
  {
    evidenceId: "sgs-gzmr260702529004",
    slug: "sgs-gzmr260702529004",
    issuer: "SGS-CSTC Standards Technical Services Co., Ltd., Guangzhou Branch",
    issuerShort: "SGS",
    documentType: "Test report",
    reference: "GZMR260702529004",
    otherReferences: [{ label: "SGS reference", value: "CQP26-009118" }],
    holderRole: "Client",
    holder: "Chongqing Xianju New Material Co., Ltd.",
    item: "Glass-fiber-reinforced composite profile material E-TS-AB, 10.1 mm specimens, UL 94-2023 Rev.2-2024 Section 8 vertical burning",
    issued: "2026-07-30",
    files: [
      { path: "/downloads/frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-original-zh.pdf", role: "Laboratory original" },
      { path: "/downloads/frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-en.pdf", role: "F1 copy with English notes" },
    ],
    steps: [
      "Scan the QR code beside the report number on page 1 of the Chinese original.",
      SGS_DOC_CHECK,
      "Open the Chinese original in Adobe Acrobat Reader and look at the signature panel. It shows whether the file has changed since it was signed. F1's English copy adds notes beside each page and carries no laboratory signature, so check against the original.",
    ],
    restrictions: "SGS states that the results relate only to the tested samples and that the report is for the client's research, internal quality control and product development, for internal reference only.",
  },
];

export const verificationPath = (slug: string) => `/resources/evidence/${slug}`;

export function verificationForEvidence(evidenceId: string) {
  return reportVerifications.find((item) => item.evidenceId === evidenceId);
}

const documentWord = (item: ReportVerification) => (item.documentType === "Component certificate" ? "Certificate" : "Report");

export function verificationTitle(item: ReportVerification) {
  return `${item.issuerShort} ${item.reference}: How to Verify This ${documentWord(item)}`;
}

export function verificationDescription(item: ReportVerification) {
  return `Check ${item.issuerShort} ${documentWord(item).toLowerCase()} ${item.reference}: the holder it names, what it covers, how to confirm it with the issuer, and the SHA-256 of the PDF.`;
}

/** The FengDu company named in every document above, and F1's place in the group. */
export const holderGroupNote = "is part of FengDu New Material. F1 Composite is FengDu's export company and supplies products made in FengDu's plants.";
