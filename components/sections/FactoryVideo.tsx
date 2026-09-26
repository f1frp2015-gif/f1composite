"use client";

import { useState } from "react";
import Image from "next/image";

const VIDEO_ID = "VEgnOV4G9EM";
const VIDEO_TITLE = "How pultruded FRP profiles are made — F1 Composite factory tour";

export default function FactoryVideo() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
        title={VIDEO_TITLE}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block h-full w-full cursor-pointer overflow-hidden text-left"
      aria-label={`Play video: ${VIDEO_TITLE}`}
    >
      <Image
        src="/images/factory/pultruded-frp-manufacturer-video-cover.jpg"
        alt="Pultruded FRP manufacturer factory tour by F1 Composite"
        width={1672}
        height={941}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-full w-full object-cover transition-transform duration-[0.55s] group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-deep/20 transition-colors duration-[0.34s] group-hover:bg-deep/30" />
      {/* The cover has its title baked into the left half and the logo in the
          bottom-right corner; keep the button in the clear area between them. */}
      <span className="absolute left-[72%] top-[62%] flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal text-white shadow-card transition-transform duration-[0.34s] group-hover:scale-105 sm:h-[64px] sm:w-[64px]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
