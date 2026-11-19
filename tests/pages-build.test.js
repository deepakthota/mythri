import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';

const root=process.cwd();
const build=base=>{
 const env={...process.env};
 if(base)env.PUBLIC_BASE_PATH=base;
 else delete env.PUBLIC_BASE_PATH;
 const result=spawnSync(process.execPath,['build.mjs'],{cwd:root,env,encoding:'utf8'});
 assert.equal(result.status,0,result.stderr||result.stdout);
};
const read=path=>readFileSync(join(root,'dist',path),'utf8');

test('GitHub Pages build keeps home, menu, logo and browser-history paths under /mythri/',()=>{
 try{
  build('/mythri');
  const home=read('index.html');
  const menu=read('menu/index.html');
  const logic=read('assets/menu-logic.js');
  assert.match(home,/href="\/mythri\/menu\/"/);
  assert.match(home,/src="\/mythri\/assets\/mythri-mark\.svg"/);
  assert.match(home,/href="\/mythri\/assets\/styles\.css"/);
  assert.match(menu,/href="\/mythri\/#visit"/);
  assert.match(menu,/src="\/mythri\/assets\/menu-page\.js"/);
  assert.match(logic,/return '\/mythri\/menu\/'\+/);
  assert.ok(existsSync(join(root,'dist','assets','mythri-mark.svg')));
  assert.ok(existsSync(join(root,'dist','.nojekyll')));
  assert.match(home,/<footer class="footer">/);
  assert.match(menu,/<footer class="footer">/);
  assert.doesNotMatch(home,/BUILD:SHARED_FOOTER/);
  assert.doesNotMatch(menu,/BUILD:SHARED_FOOTER/);
 }finally{build('')}
});
test('default build preserves root-relative paths for non-Pages hosting',()=>{
 build('');
 assert.match(read('index.html'),/href="\/menu\/"/);
 assert.match(read('assets/menu-logic.js'),/return '\/menu\/'\+/);
});
