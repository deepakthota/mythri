import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('homepage and menu have distinct canonical URLs and local titles',()=>{
 const homepage=read('index.html');
 const menu=read('menu/index.html');
 assert.match(homepage,/rel="canonical" href="https:\/\/deepakthota\.github\.io\/mythri\/"/);
 assert.match(menu,/rel="canonical" href="https:\/\/deepakthota\.github\.io\/mythri\/menu\/"/);
 assert.match(homepage,/<h1[^>]*>Indian dining in/);
 assert.match(menu,/<h1>Explore our Indian menu/);
 assert.match(homepage,/type="application\/ld\+json"/);
 assert.match(homepage,/"@type":"Restaurant"/);
});
test('build includes 99 crawlable dishes and two sitemap URLs',()=>{
 const p=spawnSync(process.execPath,['build.mjs'],{encoding:'utf8',env:{...process.env,PUBLIC_BASE_PATH:'/mythri'}});
 assert.equal(p.status,0,p.stderr);
 const html=read('dist/menu/index.html');
 const sitemap=read('dist/sitemap.xml');
 assert.equal((html.match(/class="menu-dish"/g)||[]).length,99);
 assert.match(html,/<h3>Hyderabadi Chicken Dum Biryani<\/h3>/);
 assert.match(sitemap,/https:\/\/deepakthota\.github\.io\/mythri\/menu\//);
 assert.equal((sitemap.match(/<url>/g)||[]).length,2);
});
test('call and directions affordances are present without unverified checkout',()=>{
 const home=read('index.html');
 assert.match(home,/href="tel:\+61397047684"/);
 assert.match(home,/Get directions/);
 assert.doesNotMatch(home,/href="[^"]*"[^>]*>Order Online/i);
});
