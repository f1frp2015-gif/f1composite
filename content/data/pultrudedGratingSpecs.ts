export interface PultrudedGratingSpec {
  type: string;
  depth: string;
  bearingBarCenter: string;
  crossBarCenter: string;
  openArea: string;
  weight: string;
}

export interface PultrudedGratingSpecGroup {
  name: string;
  description: string;
  rows: readonly PultrudedGratingSpec[];
}

const CROSS_BAR_CENTER = "152.40";

/**
 * Nominal summary-table values transcribed from the supplied pultruded-grating
 * manual (catalog pages 16-17). Detailed sheets in the same manual occasionally
 * differ from the summary; the approved order datasheet controls.
 */
export const pultrudedGratingSpecGroups: readonly PultrudedGratingSpecGroup[] = [
  {
    name: "Pedestrian T-bar series",
    description: "Wide-top T bearing bars for pedestrian access and reduced clear openings.",
    rows: [
      { type: "T-1210", depth: "25", bearingBarCenter: "43.4", crossBarCenter: CROSS_BAR_CENTER, openArea: "12%", weight: "14.5" },
      { type: "T-1810", depth: "25", bearingBarCenter: "50.8", crossBarCenter: CROSS_BAR_CENTER, openArea: "18%", weight: "13.8" },
      { type: "T-2510", depth: "25", bearingBarCenter: "50.8", crossBarCenter: CROSS_BAR_CENTER, openArea: "25%", weight: "13.6" },
      { type: "T-3310", depth: "25", bearingBarCenter: "61.0", crossBarCenter: CROSS_BAR_CENTER, openArea: "33%", weight: "11.2" },
      { type: "T-3810", depth: "25", bearingBarCenter: "61.0", crossBarCenter: CROSS_BAR_CENTER, openArea: "38%", weight: "10.2" },
      { type: "T-1215", depth: "38", bearingBarCenter: "43.3", crossBarCenter: CROSS_BAR_CENTER, openArea: "12%", weight: "19.6" },
      { type: "T-2515", depth: "38", bearingBarCenter: "50.8", crossBarCenter: CROSS_BAR_CENTER, openArea: "25%", weight: "16.7" },
      { type: "T-3815", depth: "38", bearingBarCenter: "61.0", crossBarCenter: CROSS_BAR_CENTER, openArea: "38%", weight: "14.2" },
    ],
  },
  {
    name: "Industrial I-bar series",
    description: "Pultruded I bearing bars for one-way industrial platform spans.",
    rows: [
      { type: "I-4010", depth: "25", bearingBarCenter: "25.4", crossBarCenter: CROSS_BAR_CENTER, openArea: "40%", weight: "17.1" },
      { type: "I-5010", depth: "25", bearingBarCenter: "30.0", crossBarCenter: CROSS_BAR_CENTER, openArea: "50%", weight: "14.2" },
      { type: "I-6010", depth: "25", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "60%", weight: "11.2" },
      { type: "I-40125", depth: "30", bearingBarCenter: "25.4", crossBarCenter: CROSS_BAR_CENTER, openArea: "40%", weight: "19.8" },
      { type: "I-50125", depth: "30", bearingBarCenter: "30.5", crossBarCenter: CROSS_BAR_CENTER, openArea: "50%", weight: "17.4" },
      { type: "I-60125", depth: "30", bearingBarCenter: "37.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "60%", weight: "13.5" },
      { type: "I-4015", depth: "38", bearingBarCenter: "25.4", crossBarCenter: CROSS_BAR_CENTER, openArea: "40%", weight: "22.0" },
      { type: "I-5015", depth: "38", bearingBarCenter: "30.5", crossBarCenter: CROSS_BAR_CENTER, openArea: "50%", weight: "19.1" },
      { type: "I-6015", depth: "38", bearingBarCenter: "37.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "60%", weight: "16.1" },
      { type: "T-3320", depth: "50", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "33%", weight: "20.3" },
      { type: "T-5020", depth: "50", bearingBarCenter: "50.8", crossBarCenter: CROSS_BAR_CENTER, openArea: "50%", weight: "15.7" },
    ],
  },
  {
    name: "High-load HI / HL series",
    description: "Deeper, denser bearing-bar systems; final load and allowable span come from the project table.",
    rows: [
      { type: "HI-4710", depth: "25", bearingBarCenter: "30.2", crossBarCenter: CROSS_BAR_CENTER, openArea: "47%", weight: "27.6" },
      { type: "HI-4715", depth: "38", bearingBarCenter: "30.2", crossBarCenter: CROSS_BAR_CENTER, openArea: "47%", weight: "40.0" },
      { type: "HI-4720", depth: "50", bearingBarCenter: "30.2", crossBarCenter: CROSS_BAR_CENTER, openArea: "47%", weight: "54.5" },
      { type: "HI-4725", depth: "64", bearingBarCenter: "30.2", crossBarCenter: CROSS_BAR_CENTER, openArea: "47%", weight: "61.6" },
      { type: "HI-4730", depth: "76", bearingBarCenter: "30.2", crossBarCenter: CROSS_BAR_CENTER, openArea: "47%", weight: "73.6" },
      { type: "HI-5810", depth: "25", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "58%", weight: "21.0" },
      { type: "HI-5815", depth: "38", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "58%", weight: "31.8" },
      { type: "HI-5820", depth: "50", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "58%", weight: "42.5" },
      { type: "HI-5825", depth: "64", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "58%", weight: "48.9" },
      { type: "HI-5830", depth: "76", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "58%", weight: "58.6" },
      { type: "HL-4020", depth: "50", bearingBarCenter: "25.4", crossBarCenter: CROSS_BAR_CENTER, openArea: "40%", weight: "70.4" },
      { type: "HL-5020", depth: "50", bearingBarCenter: "30.0", crossBarCenter: CROSS_BAR_CENTER, openArea: "50%", weight: "52.2" },
      { type: "HL-6020", depth: "50", bearingBarCenter: "38.1", crossBarCenter: CROSS_BAR_CENTER, openArea: "60%", weight: "43.5" },
    ],
  },
  {
    name: "High-open SI series",
    description: "Large-open-area I-bar rows for airflow-sensitive applications such as cooling-tower walkways.",
    rows: [
      { type: "SI-7310", depth: "25", bearingBarCenter: "30.2", crossBarCenter: CROSS_BAR_CENTER, openArea: "73%", weight: "13.2" },
      { type: "SI-7315", depth: "38", bearingBarCenter: "30.2", crossBarCenter: CROSS_BAR_CENTER, openArea: "73%", weight: "18.6" },
      { type: "SI-8310", depth: "25", bearingBarCenter: "47.6", crossBarCenter: CROSS_BAR_CENTER, openArea: "83%", weight: "8.5" },
      { type: "SI-8315", depth: "38", bearingBarCenter: "47.6", crossBarCenter: CROSS_BAR_CENTER, openArea: "83%", weight: "12.0" },
    ],
  },
] as const;

export const pultrudedGratingManualImages = {
  hero: "/images/products/pultruded-frp-grating/pultruded-grating-rooftop-walkway.webp",
  closeup: "/images/products/pultruded-frp-grating/pultruded-grating-t-bar-closeup.webp",
} as const;
