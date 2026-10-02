/**
 * Photos the group took itself: FengDu production halls, product samples on
 * the line and the FRP access staircase in F1 Composite's Chongqing plant.
 * scripts/mark-owned-photos.mjs puts the "© f1composite.com" mark on each and
 * writes copyright metadata (XMP and EXIF) into the file.
 *
 * Only list a photo when the group owns it. Stock ("Illustrative photo"),
 * supplier, catalog and reference images stay off this list, as does any
 * photo whose labels disagree across pages until the owner confirms it.
 */

export const OWNED_PHOTO_DIR = "/images/f1-photos";

export const photoRights = {
  creator: "F1 Composite",
  credit: "F1 Composite",
  notice: "© Chongqing F1 Composites Co., Ltd. All rights reserved.",
  rightsUrl: "https://www.f1composite.com/terms#image-use",
  licensorUrl: "https://www.f1composite.com/contact?source=image-license&inquiry_type=general",
} as const;

export interface OwnedPhoto {
  /** File name under OWNED_PHOTO_DIR. */
  file: string;
  /** Former path; next.config.ts redirects it here. */
  from: string;
  label: "Production photo" | "Project photo";
  description: string;
}

export const ownedPhotos: OwnedPhoto[] = [
  { file: "f1-composite-pultrusion-hall-krauss-maffei-lines.webp", from: "/images/technology/f1-composite-pultrusion-hall-krauss-maffei-lines.webp", label: "Production photo", description: "Pultrusion lines in a FengDu production hall" },
  { file: "f1-composite-pultrusion-plant-floor.webp", from: "/images/technology/f1-composite-pultrusion-plant-floor.webp", label: "Production photo", description: "Finished pultruded profiles on inspection tables in a FengDu plant" },
  { file: "f1-composite-pultrusion-production-line-aerial.webp", from: "/images/technology/f1-composite-pultrusion-production-line-aerial.webp", label: "Production photo", description: "Parallel pultrusion lines in production at a FengDu plant" },
  { file: "frp-factory-access-staircase-hero.webp", from: "/images/case-studies/frp-factory-access-staircase-hero.webp", label: "Project photo", description: "FRP access staircase and platform in F1 Composite's Chongqing plant" },
  { file: "frp-factory-staircase-assembly-detail.webp", from: "/images/case-studies/frp-factory-staircase-assembly-detail.webp", label: "Project photo", description: "Bolted connection detail of the FRP access staircase in F1 Composite's Chongqing plant" },
  { file: "frp-factory-staircase-grating-treads.webp", from: "/images/case-studies/frp-factory-staircase-grating-treads.webp", label: "Project photo", description: "Grating treads of the FRP access staircase in F1 Composite's Chongqing plant" },
  { file: "frp-factory-staircase-platform-handrail.webp", from: "/images/case-studies/frp-factory-staircase-platform-handrail.webp", label: "Project photo", description: "Platform and handrail of the FRP access staircase in F1 Composite's Chongqing plant" },
  { file: "frp-factory-staircase-structural-view.webp", from: "/images/case-studies/frp-factory-staircase-structural-view.webp", label: "Project photo", description: "FRP I-beam stringers of the access staircase in F1 Composite's Chongqing plant" },
  { file: "pultruded-fiberglass-sheet-black-surface.webp", from: "/images/products/fiberglass-sheets/pultruded-fiberglass-sheet-black-surface.webp", label: "Production photo", description: "Pultruded fiberglass sheet surface during production" },
  { file: "pultruded-frp-sheet-formed-edge-sample.webp", from: "/images/products/fiberglass-sheets/pultruded-frp-sheet-formed-edge-sample.webp", label: "Production photo", description: "Thin-wall pultruded FRP sample with formed returns" },
  { file: "pultruded-frp-sunshade-plate-multilayer-fabric-e40.webp", from: "/images/products/facade-sunshade/pultruded-frp-sunshade-plate-multilayer-fabric-e40.webp", label: "Production photo", description: "Multi-layer fabric-reinforced E40 plate on the pultrusion line" },
];

export const ownedPhotoPath = (photo: OwnedPhoto) => `${OWNED_PHOTO_DIR}/${photo.file}`;
