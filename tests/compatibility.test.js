import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const file=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('reveal content defaults visible without JavaScript',()=>{
 const css=file('src/styles.css');
 assert.match(css,/\.motion-ready \.reveal\{opacity:0/);
 assert.doesNotMatch(css,/(^|})\.reveal\{opacity:0/);
 assert.match(file('src/main.js'),/classList\.add\('motion-ready'\)/);
});
test('native hidden state takes precedence over component display styles',()=>{
 assert.match(file('src/styles.css'),/\[hidden\]\{display:none!important\}/);
});
test('category controls retain DOM nodes and keyboard focus across render',()=>{
 const js=file('src/menu-page.js');
 assert.match(js,/if\(!cats\.childElementCount\)/);
 assert.match(js,/button\.setAttribute\('aria-pressed'/);
 assert.doesNotMatch(js,/function renderCategories\(\)\{cats\.replaceChildren/);
});
test('mobile menus provide Escape keyboard dismissal on both entrypoints',()=>{
 for(const path of ['src/main.js','src/menu-page.js']){
  const js=file(path);
  assert.match(js,/event\.key==='Escape'/);
  assert.match(js,/\$\('mobilebutton'\)\.focus\(\)/);
 }
});
test('preview server returns standard SVG media type',()=>{
 assert.match(file('dev-server.mjs'),/image\/svg\+xml/);
});
test('full menu still supports semantic search and native filtering controls',()=>{
 const html=file('menu/index.html');
 assert.match(html,/type="search"/);
 assert.match(html,/type="checkbox"/);
 assert.match(html,/id="menu-categories"/);
});
