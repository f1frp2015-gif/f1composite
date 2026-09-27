import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import CoverCard from "@/components/ui/CoverCard";
import { caseStudyCovers } from "@/lib/covers";

// Window projects F1 has supplied, each opening on its case account. Shared by
// the window hub and the windows guide so both show the same four accounts.
export const windowProjects = [
  { href: "/case-studies/qinling-station-antarctic-passive-windows", place: "Ross Sea, Antarctica · 2024", title: "Qinling Station", text: "90-series GFRP windows with insulated glazing for China's Ross Sea research station, designed for a −60\u00a0°C low." },
  { href: "/case-studies/yancheng-talent-apartment-fenestration", place: "Yancheng, China · 2024", title: "Yancheng talent apartments", text: "65-series casements, 90-series sliding windows and matching facade frames across about 20 coastal buildings." },
  { href: "/case-studies/baotou-industrial-gfrp-pu-windows", place: "Baotou, China · 2024", title: "Baotou industrial park", text: "70, 80 and 90-series GFRP-PU profiles for workshops with chemical exposure in China's severe-cold zone." },
  { href: "/case-studies/wanhua-yantai-zero-carbon-windows", place: "Yantai, China · 2022", title: "Wanhua Yantai zero-carbon community", text: "65 and 90-series GFRP-PU profiles for a zero-carbon dormitory envelope, with a whole-window U of 0.99 W/m²·K." },
] as const;

export default function WindowProjects({ tone = "white" }: { tone?: "white" | "muted" }) {
  return (
    <PageSection id="projects" title="Window projects we have supplied" count={`${windowProjects.length} projects`} tone={tone} intro="From an Antarctic research station to a severe-cold industrial park. Each account names the series supplied; a project reference does not establish performance for a different assembly." aside={<Link href="/case-studies" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">All case studies</Link>}>
      <ul className="grid grid-cols-2 gap-[12px] lg:grid-cols-4 lg:gap-[16px]">
        {windowProjects.map((project) => (
          <li key={project.href}>
            <CoverCard href={project.href} cover={caseStudyCovers[project.href]} label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{project.place}</span>} title={project.title} text={project.text} action="Read the project" compact sizes="(max-width: 1023px) 46vw, 290px" />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
