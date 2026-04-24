import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import { industries } from "@/content/data/industries";

function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M3 21V7l6-4 6 4v14M15 21V11l6-4v14M3 21h18M7 10h2M7 14h2M7 18h2M17 11h2M17 15h2M17 19h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BridgeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M2 12h20M4 12v6M20 12v6M7 12V8a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnchorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <circle cx="12" cy="5" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v14M5 15a7 7 0 0 0 14 0M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M3 21V10l6 4V10l6 4V6l6 4v11zM3 21h18M7 17h2M13 17h2M17 17h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VehicleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M3 17h2l1-5h12l1 5h2v3H3zM6 17a2 2 0 1 0 4 0M14 17a2 2 0 1 0 4 0M6 12V7h12v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const industryIcons: Record<string, React.ReactNode> = {
  building: <BuildingIcon />,
  bridge: <BridgeIcon />,
  bolt: <BoltIcon />,
  anchor: <AnchorIcon />,
  factory: <FactoryIcon />,
  vehicle: <VehicleIcon />,
};

export default function IndustriesSnapshot() {
  return (
    <section className="bg-bg2 py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="mb-[34px] flex items-end justify-between">
          <div>
            <SectionTag>Industries We Serve</SectionTag>
            <h2 className="mt-[13px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
              Pultruded FRP solutions across six industries
            </h2>
            <p className="mt-[8px] max-w-[700px] text-f15 leading-golden text-t2">
              From Passive House residential envelopes to Antarctic research stations, coastal marinas, solar farms, and chemical plants — F1 Composite profiles carry projects in the most demanding environments on Earth.
            </p>
          </div>
          <LinkArrow href="/industries" className="hidden sm:inline-flex">
            All industries
          </LinkArrow>
        </div>

        <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={ind.href}
              className="group relative block rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <div className="card-topbar absolute inset-x-0 top-0 rounded-t-[8px]" />
              <div className="mb-[13px] flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-teal-bg">
                {industryIcons[ind.icon]}
              </div>
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">{ind.title}</h3>
              <p className="text-f13 leading-golden text-t2">{ind.description}</p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Explore {ind.title.toLowerCase()} applications →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-[21px] sm:hidden">
          <LinkArrow href="/industries">All industries</LinkArrow>
        </div>
      </div>
    </section>
  );
}
