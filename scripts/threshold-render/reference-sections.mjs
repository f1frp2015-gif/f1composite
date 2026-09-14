// Independent traces of the user-supplied 1130 x 830 section sketch.
// Coordinates follow visible line centres, approximately +/- 1–2 source pixels.
// They are a visual reference, not production CAD or manufacturing tolerances.
export const referenceSections = {
  'inward-closed': {
    bounds: [120,112,440,260],
    shoulder: [311,71.5],
    levels: [[112,55],[166,35],[260,0]],
    outer: [[120,258],[120,173],[122,169],[126,166],[307,156],[311,154],[311,123],[313,119],[354,116],[356,112],[376,112],[378,116],[400,116],[402,112],[440,112],[440,258],[438,260],[415,260],[413,257],[315,257],[313,260],[263,260],[261,257],[148,257],[146,260],[122,260]],
    holes: [
      [[131,178],[133,176],[240,173],[240,171],[312,168],[315,170],[315,244],[313,246],[133,246],[131,244]],
      [[323,130],[325,128],[428,128],[430,130],[430,244],[428,246],[328,246],[326,244],[326,158],[322,156],[322,131]],
    ],
  },
  'inward-hook': {
    bounds: [609,107,930,254],
    shoulder: [800,71.5],
    levels: [[107,55],[161,35],[200,20],[254,0]],
    outer: [[609,251],[609,168],[611,164],[615,161],[796,152],[800,150],[800,119],[802,115],[843,111],[845,107],[865,107],[867,111],[889,111],[891,107],[930,107],[930,198],[928,200],[905,200],[903,198],[803,198],[801,200],[750,200],[748,198],[668,198],[666,200],[646,200],[644,197],[644,173],[641,171],[622,171],[620,173],[620,239],[622,241],[626,241],[628,238],[632,238],[634,241],[655,241],[657,243],[657,251],[655,254],[611,254]],
    holes: [
      [[655,172],[657,169],[729,168],[730,166],[802,162],[804,164],[804,185],[802,187],[657,187],[655,185]],
      [[811,125],[813,122],[917,122],[919,124],[919,185],[917,187],[817,187],[815,185],[815,152],[811,150]],
    ],
  },
  'outward-hook': {
    bounds: [609,546,930,694],
    shoulder: [682,27],
    levels: [[546,55],[600,35],[639,20],[694,0]],
    outer: [[609,691],[609,607],[611,603],[615,600],[678,597],[682,595],[682,557],[684,553],[719,550],[721,546],[740,546],[742,550],[765,550],[767,546],[786,546],[788,550],[812,550],[814,546],[833,546],[835,550],[859,550],[861,546],[880,546],[882,550],[906,550],[908,546],[930,546],[930,637],[928,639],[905,639],[903,637],[803,637],[801,640],[750,640],[748,637],[668,637],[666,639],[646,639],[644,637],[644,613],[641,611],[622,612],[620,614],[620,678],[622,680],[626,680],[628,677],[632,677],[634,680],[655,680],[657,682],[657,692],[655,694],[611,694]],
    holes: [
      [[655,612],[657,610],[688,608],[691,606],[691,564],[694,561],[815,561],[817,563],[817,625],[815,627],[657,627],[655,625]],
      [[828,563],[830,561],[917,561],[919,563],[919,625],[917,627],[830,627],[828,625]],
    ],
  },
};

export function tracedContours(id) {
  const reference = referenceSections[id];
  if (!reference) return null;
  const [left,,right] = reference.bounds;
  // Anchor the visible shoulders to the supplied 48.5 / 93 mm deck widths.
  // The hook's 55 mm envelope is inferred; its two marked 35 mm spans are kept.
  const interpolate = (value, anchors) => {
    const i = Math.max(0, anchors.findIndex((a,j) => j < anchors.length-1 && value <= anchors[j+1][0]));
    const [a,b] = [anchors[i],anchors[i+1]];
    return a[1]+(value-a[0])*(b[1]-a[1])/(b[0]-a[0]);
  };
  const xAnchors = [[left,0],reference.shoulder,[right,120]];
  const toMm = ([x,y]) => [interpolate(x,xAnchors),interpolate(y,reference.levels)];
  const clockwise = points => points.reduce((area,p,i) => {
    const next=points[(i+1)%points.length];
    return area+p[0]*next[1]-next[0]*p[1];
  },0)<0;
  const orient = (points,wantedClockwise) => clockwise(points)===wantedClockwise?points:points.slice().reverse();
  // ExtrudeGeometry only auto-corrects hole winding when it reverses the outer
  // outline. Explicitly oppose the loops so internal walls face the cavities.
  return {
    outer: orient(reference.outer.map(toMm),true),
    holes: reference.holes.map(h => orient(h.map(toMm),false)),
  };
}
