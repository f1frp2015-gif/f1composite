// Local render workbench only, never exposed as a production route.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const server=http.createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost');
  const p=url.pathname;
  const local=p==='/'?'scripts/threshold-render/index.html':p.startsWith('/three/')?`node_modules/three/build/${p.slice(7)}`:p.startsWith('/addons/')?`node_modules/three/examples/jsm/${p.slice(8)}`:`scripts/threshold-render/${p.slice(1)}`;
  if(local.includes('..')){res.writeHead(400);res.end();return;}
  try{const data=await readFile(path.join(root,local));res.setHeader('Content-Type',p==='/'?'text/html':'text/javascript');res.end(data);}catch{res.writeHead(404);res.end('Not found');}
});
server.listen(3026,'127.0.0.1',()=>console.log('Threshold geometry renderer: http://localhost:3026'));
