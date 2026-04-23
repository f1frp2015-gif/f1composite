"use client";

import ReactDOM from "react-dom";

export default function HeroPreload() {
  ReactDOM.preload("/images/hero/frp-composite-material-hero.webp", {
    as: "image",
    fetchPriority: "high",
  });
  return null;
}
