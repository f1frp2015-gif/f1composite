"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Server-rendered SVGs stay still until the reader explicitly starts them. */
export function AnimatedConcept({ children, label }: { children: ReactNode; label: string }) {
  const container = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const svgs = container.current?.querySelectorAll("svg");
    svgs?.forEach((svg) => {
      svg.pauseAnimations?.();
      svg.setCurrentTime?.(0);
    });
    // A change to reduced motion also stops an animation the reader started.
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (preference.matches) {
        svgs?.forEach((svg) => svg.pauseAnimations?.());
        setPlaying(false);
      }
    };
    preference.addEventListener("change", stop);
    return () => preference.removeEventListener("change", stop);
  }, []);

  function toggle() {
    const svgs = container.current?.querySelectorAll("svg");
    if (playing) {
      svgs?.forEach((svg) => svg.pauseAnimations?.());
    } else {
      svgs?.forEach((svg) => {
        if (!initialized.current) {
          svg.setCurrentTime?.(0);
          svg.querySelectorAll<SVGAnimationElement>("animate, animateTransform, animateMotion")
            .forEach((animation) => animation.beginElement?.());
        }
        svg.unpauseAnimations?.();
      });
      initialized.current = true;
    }
    setPlaying(!playing);
  }

  return (
    <div ref={container}>
      {children}
      <button type="button" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        aria-pressed={playing}
        className="mt-[12px] rounded-control border border-border-default px-[12px] py-[6px] text-f12 font-semibold text-t1 focus-visible:outline-2 focus-visible:outline-offset-4">
        {playing ? "Pause animation" : "Play animation"}
      </button>
    </div>
  );
}
