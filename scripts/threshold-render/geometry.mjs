// Section coordinates are in mm, traced from the four user-supplied sketches.
// Unspecified wall details are illustrative. One polygon and its two holes
// are extruded without taper or intermediate geometry, including every rib.
import * as THREE from 'three';

const upper = (wide) => wide
  ? [[27,53],[39,53],[40,55],[46,55],[47,53],[56,53],[57,55],[63,55],[64,53],[73,53],[74,55],[80,55],[81,53],[90,53],[91,55],[97,55],[98,53],[107,53],[108,55],[114,55],[115,53],[120,53]]
  : [[71.5,53],[88,53],[89,55],[95,55],[96,53],[105,53],[106,55],[120,55]];

export const sections = [
  { id:'inward-closed', name:'Inward-opening · closed base', wide:false, hook:false },
  { id:'inward-hook', name:'Inward-opening · hooked base', wide:false, hook:true },
  { id:'outward-closed', name:'Outward-opening · closed base', wide:true, hook:false },
  { id:'outward-hook', name:'Outward-opening · hooked base', wide:true, hook:true },
];

export function sectionContours(section) {
  const {wide,hook}=section;
  const top=upper(wide);
  const shoulder=wide?27:71.5;
  const lowRoof=wide?36:38;
  const outer=hook
    ? [[0,0],[17,0],[17,4],[4,4],[4,31],[13,31],[13,20],[120,20],...top.slice().reverse(),[shoulder,lowRoof],[0,35]]
    : [[0,0],[9,0],[10,1],[51,1],[52,0],[72,0],[73,1],[109,1],[110,0],[120,0],...top.slice().reverse(),[shoulder,lowRoof],[0,35]];
  const holes=wide
    ? [hook
      ? [[17,24],[78,24],[78,49],[31,49],[31,32],[17,31]]
      : [[4,5],[78,5],[78,49],[31,49],[31,32],[4,31]],
      [[82,hook?24:5],[116,hook?24:5],[116,49],[82,49]]]
    : [hook
      ? [[17,24],[73,24],[73,34],[17,31]]
      : [[4,5],[73,5],[73,34],[4,31]],
      [[77,hook?24:5],[116,hook?24:5],[116,49],[77,49]]];
  return {outer,holes};
}

export function buildGeometry(section, length=180) {
  const {outer,holes}=sectionContours(section);
  const rounded=(points,ShapeClass)=>{
    const result=new ShapeClass();
    const corners=points.map(([x,y],i)=>{
      const prev=new THREE.Vector2(...points[(i+points.length-1)%points.length]);
      const next=new THREE.Vector2(...points[(i+1)%points.length]);
      const p=new THREE.Vector2(x,y),a=prev.sub(p),b=next.sub(p);
      const r=Math.min(0.35,a.length()*0.2,b.length()*0.2);
      return {p,incoming:p.clone().add(a.normalize().multiplyScalar(r)),outgoing:p.clone().add(b.normalize().multiplyScalar(r))};
    });
    result.moveTo(corners[0].outgoing.x,corners[0].outgoing.y);
    for(let i=1;i<=corners.length;i++){const c=corners[i%corners.length];result.lineTo(c.incoming.x,c.incoming.y);result.quadraticCurveTo(c.p.x,c.p.y,c.outgoing.x,c.outgoing.y);}
    result.closePath();return result;
  };
  const shape=rounded(outer,THREE.Shape);
  for(const hole of holes)shape.holes.push(rounded(hole,THREE.Path));
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:length,steps:1,bevelEnabled:false,curveSegments:5});
  geometry.translate(-60,0,-length/2);
  return geometry;
}
