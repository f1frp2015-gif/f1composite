import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Concept linework, not production CAD. Wall thickness and radii are illustrative.
const output = fileURLToPath(new URL("../public/images/products/door-frames/", import.meta.url));
const text = (x, y, value, size = 22) => `<text x="${x}" y="${y}" font-size="${size}">${value}</text>`;
const line = (x1, y1, x2, y2, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
const arrow = (x1, y1, x2, y2) => line(x1, y1, x2, y2, 'marker-start="url(#arrow)" marker-end="url(#arrow)"');

for (const [name, title, face, closed] of [
  ["double-rebate-section", "Open-back double rebate", 174, false],
  ["deep-face-section", "Deep-face frame", 348, false],
  ["closed-mullion-section", "Closed mullion", 174, true],
]) {
  const bottom = 170 + face;
  const outer = closed
    ? `M100 170H268V116H432V170H600V${bottom}H432V${bottom + 54}H268V${bottom}H100Z M112 182V${bottom - 12}H280V${bottom + 42}H420V${bottom - 12}H588V182H420V128H280V182Z`
    : `M100 170H268V116H432V170H600V${bottom}H558V${bottom - 12}H588V182H112V${bottom - 12}H142V${bottom}H100Z M280 128H420V170H280Z`;
  const throat = !closed ? `${line(142,bottom+6,142,bottom+55)}${line(558,bottom+6,558,bottom+55)}${arrow(146,bottom+43,554,bottom+43)}${text(340,bottom+34,"T")}` : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="640" viewBox="0 0 800 640">
<defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#007A74"/></marker></defs>
<rect width="800" height="640" rx="18" fill="#F3F6F8"/>
<g font-family="Arial,sans-serif" fill="#142337">${text(42,48,title,27)}
<path d="${outer}" fill="#D5E7E6" fill-rule="evenodd" stroke="#142337" stroke-width="3" stroke-linejoin="round"/>
<g stroke="#007A74" stroke-width="2">${line(100,162,100,78)}${line(600,162,600,78)}${arrow(105,88,595,88)}${line(610,170,670,170)}${line(610,bottom,670,bottom)}${arrow(655,175,655,bottom-5)}${throat}</g>
${text(340,79,"D")}${text(675,174+face/2,"F")}
${text(42,610,"SCHEMATIC SECTION · WALLS &amp; RADII TO BE SPECIFIED",18)}
</g></svg>`;
  writeFileSync(`${output}${name}.svg`, svg);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="560" viewBox="0 0 1200 560">
<rect width="1200" height="560" rx="18" fill="#F3F6F8"/>
<g font-family="Arial,sans-serif" fill="#142337" font-size="23" text-anchor="middle">
<text x="158" y="64">Single opening</text><text x="435" y="64">Paired doors</text><text x="728" y="64">With transom</text><text x="1030" y="64">With sidelight</text>
<g stroke="#031697" stroke-width="12" fill="none" stroke-linejoin="miter">
<path d="M70 438V132H246V438"/><path d="M320 438V132H552V438"/>
<path d="M640 438V132H816V438M640 212H816"/><path d="M918 438V132H1140V438M1000 132V438M918 438H1000"/>
</g>
<g stroke="#8B9BAE" stroke-width="2" fill="white">
<rect x="85" y="147" width="146" height="289"/><rect x="335" y="147" width="96" height="289"/><rect x="441" y="147" width="96" height="289"/>
<rect x="655" y="227" width="146" height="209"/><rect x="1015" y="147" width="110" height="289"/>
</g>
<g fill="#BCE3E1" stroke="#007A74" stroke-width="2"><rect x="655" y="147" width="146" height="50"/><rect x="933" y="147" width="52" height="276"/></g>
<g fill="#007A74"><circle cx="216" cy="320" r="4"/><circle cx="418" cy="320" r="4"/><circle cx="454" cy="320" r="4"/><circle cx="786" cy="320" r="4"/><circle cx="1110" cy="320" r="4"/></g>
<text x="600" y="505" font-size="20">ELEVATION CONCEPTS · LEAVES, INFILL AND HARDWARE SPECIFIED SEPARATELY</text>
</g></svg>`;
writeFileSync(`${output}door-opening-layouts.svg`, svg);
console.log("Created three section diagrams and one opening-layout diagram.");
