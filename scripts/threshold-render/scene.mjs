import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { sections,buildGeometry } from './geometry.mjs';

const key=new URLSearchParams(location.search).get('section')||'outward-hook';
const section=sections.find(s=>s.id===key);
if(!section)throw new Error('Unknown section');
document.title=`F1 ${section.name} — continuous extrusion`;
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.2;
document.body.prepend(renderer.domElement);
renderer.domElement.setAttribute('aria-label',`${section.name}, a bare full-length pultruded profile with two through cavities`);
const scene=new THREE.Scene();scene.background=new THREE.Color('#f5f5f5');
const pmrem=new THREE.PMREMGenerator(renderer);
scene.environment=pmrem.fromScene(new RoomEnvironment(),0.06).texture;
scene.environmentIntensity=0.8;
const camera=new THREE.PerspectiveCamera(29,innerWidth/innerHeight,1,2500);
camera.position.set(-275,212,375);camera.lookAt(0,26,0);

const dark=new THREE.MeshStandardMaterial({color:'#292c30',roughness:0.34,metalness:0.08});
const cut=section.id==='inward-hook'
  ? new THREE.MeshBasicMaterial({color:'#c5c7c2',toneMapped:false})
  : new THREE.MeshStandardMaterial({color:'#dadbd5',roughness:0.88,metalness:0});
for(const [material,isCut] of [[dark,false],[cut,true]]){
  material.onBeforeCompile=shader=>{
    shader.vertexShader='varying vec3 vProfilePosition;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvProfilePosition = position;');
    shader.fragmentShader='varying vec3 vProfilePosition;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      float fiber = sin(vProfilePosition.x * 59.0 + vProfilePosition.y * 63.0 + sin(vProfilePosition.z * 0.2) * 0.12);
      float grain = fract(sin(dot(vProfilePosition.xy, vec2(12.9898,78.233))) * 43758.5453);
      diffuseColor.rgb *= ${isCut?'0.94 + grain * 0.06':'0.975 + fiber * 0.025'};`);
  };
}
const geometry=buildGeometry(section);
const mesh=new THREE.Mesh(geometry,[cut,dark]);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);
// Thin creases follow the exact mesh; never draw fictitious longitudinal edges.
const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,35),new THREE.LineBasicMaterial({color:'#111820',transparent:true,opacity:0.04}));scene.add(edges);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),new THREE.MeshStandardMaterial({color:'#f5f5f5',roughness:1,metalness:0}));
floor.rotation.x=-Math.PI/2;floor.position.y=-0.15;floor.receiveShadow=true;scene.add(floor);
scene.add(new THREE.HemisphereLight('#ffffff','#c4c8d0',0.65));
for(let i=0;i<9;i++){
  const keyLight=new THREE.DirectionalLight('#fffaf2',3.5/9);
  keyLight.position.set(-160+((i%3)-1)*65,330,150+(Math.floor(i/3)-1)*65);keyLight.castShadow=true;
  keyLight.shadow.mapSize.set(2048,2048);Object.assign(keyLight.shadow.camera,{left:-240,right:240,top:240,bottom:-240,near:1,far:1000});keyLight.shadow.normalBias=0.04;keyLight.shadow.bias=-0.0001;keyLight.shadow.radius=4;scene.add(keyLight);
}
const fill=new THREE.DirectionalLight('#eaf1ff',0.9);fill.position.set(200,120,180);scene.add(fill);
// Cavity ambient darkening uses the same profile geometry's physical occlusion
// from the key light rather than caps placed over the openings.
renderer.render(scene,camera);
document.getElementById('status').textContent='';
document.body.dataset.renderReady=key;
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.render(scene,camera);});
