const windowTypes = [
  ["Casement", "Side-hung; full opening and strong compression sealing."],
  ["Awning", "Top-hung; ventilates while helping shed light rain."],
  ["Tilt & turn", "Tilt ventilation plus inward opening for access and cleaning."],
  ["Fixed light", "Maximum glazed area and the lowest whole-window U-value."],
  ["Single hung", "A familiar North American format with one moving sash."],
  ["Lift & slide", "Large glazed door leaves with a sealed closed position."],
] as const;

/** Semantic, server-rendered alternative to six animated inline SVGs. */
export default function WindowTypesGrid() {
  return (
    <div className="grid gap-[13px] sm:grid-cols-2 lg:grid-cols-3">
      {windowTypes.map(([name, description]) => (
        <div key={name} className="rounded-[8px] border border-border-default bg-white p-[16px]">
          <div aria-hidden className="mb-[13px] flex h-[72px] items-center justify-center rounded-[6px] bg-bg2">
            <div className="relative h-[48px] w-[38px] rounded-[3px] border-2 border-teal">
              <span className="absolute left-1/2 top-0 h-full border-l border-teal/40" />
              <span className="absolute left-0 top-1/2 w-full border-t border-teal/40" />
            </div>
          </div>
          <h3 className="text-f15 font-bold text-t1">{name}</h3>
          <p className="mt-[5px] text-f13 leading-golden text-t2">{description}</p>
        </div>
      ))}
    </div>
  );
}
