import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
const b=spawnSync(process.execPath,['build.mjs'],{stdio:'inherit'});if(b.status!==0)process.exit(b.status??1);
const root=resolve('dist');const port=Number(process.env.PORT)||4173;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8'};
createServer((req,res)=>{
 const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!(path===root||path.startsWith(root+sep))){res.writeHead(403);res.end();return;}
 const file=existsSync(path)&&extname(path)?path:resolve(root,'index.html');
 try{res.writeHead(200,{'content-type':mime[extname(file)]||'application/octet-stream','x-content-type-options':'nosniff'});res.end(readFileSync(file));}catch{res.writeHead(404);res.end('Not found');}
}).listen(port,()=>console.log(`Preview: http://localhost:${port}`));