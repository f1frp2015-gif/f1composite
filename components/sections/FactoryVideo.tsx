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
        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
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
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-[0.55s] group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-deep/20 transition-colors duration-[0.34s] group-hover:bg-deep/30" />
      <span className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal text-white shadow-lg transition-transform duration-[0.34s] group-hover:scale-105">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
