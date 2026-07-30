import type { ReactNode } from "react";

type EmbedShellProps = {
  children: ReactNode;
  toolName: string;
  canonicalPath: string;
};

export default function EmbedShell({ children, toolName, canonicalPath }: EmbedShellProps) {
  const campaignUrl = `${canonicalPath}?utm_source=embed&utm_medium=referral&utm_campaign=frp_tool_embed`;

  return (
    <div data-embed-shell className="min-h-screen bg-white">
      <style>{`
        body > header,
        body > footer,
        body > a[href="#main"] { display: none !important; }
        body > main#main { padding-top: 0 !important; }
      `}</style>
      {children}
      <aside className="sticky bottom-0 z-40 border-t border-border-default bg-white/95 px-[16px] py-[10px] shadow-[0_-4px_18px_rgba(11,24,56,0.08)] backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-[8px] text-f12 text-t3">
          <span>Engineering reference only — confirm final design with a qualified engineer.</span>
          <a
            href={campaignUrl}
            target="_blank"
            rel="nofollow noopener"
            className="font-semibold text-teal-text hover:underline"
          >
            {toolName} by F1 Composite — Pultruded FRP Profiles Manufacturer
          </a>
        </div>
      </aside>
    </div>
  );
}
