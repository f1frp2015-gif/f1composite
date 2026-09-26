import Link from "next/link";
import ApplicationCards from "@/components/products/ApplicationCards";
import ProductSection from "@/components/products/ProductSection";
import { beamBridgeGuide, chongqingRooftopPv, factoryStaircase } from "@/lib/familyApplications";

// Projects shown with their own photographs, and the bridge guide's drawing.
const projects = [
  { ...factoryStaircase, used: "I-beams, square tubes, round tube, flat bar and molded grating" },
  chongqingRooftopPv,
  beamBridgeGuide,
];

export default function SocialProof() {
  return (
    <ProductSection
      id="projects"
      title="Selected supply projects"
      intro="See the components supplied, how they were used and the project-specific supporting information."
      aside={
        <Link href="/case-studies" className="font-bold text-teal-text">
          All case studies →
        </Link>
      }
    >
      <ApplicationCards cards={projects} />
    </ProductSection>
  );
}
