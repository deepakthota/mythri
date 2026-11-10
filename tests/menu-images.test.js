import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DISH_IMAGES,getDishImage} from '../src/dish-images.js';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const menu=JSON.parse(read('src/menu.json'));

test('licensed images correspond only to known menu dish names',()=>{
 for(const [name,photo] of Object.entries(DISH_IMAGES)){
  assert.ok(menu.some(d=>d.name===name),name);
  assert.match(photo.src,/^https:\/\/images\.unsplash\.com\/photo-[\w-]+\?/);
  assert.ok(photo.alt.length>15);
 }
 assert.equal(Object.keys(DISH_IMAGES).length,3);
 assert.equal(getDishImage('Paneer Tikka'),null);
});

test('build includes reusable image helper and both menu entrypoints import it',()=>{
 assert.match(read('build.mjs'),/src\/dish-images\.js/);
 assert.match(read('src/main.js'),/import \{buildDishAvatar\} from '\.\/dish-images\.js'/);
 assert.match(read('src/menu-page.js'),/import \{buildDishAvatar\} from '\.\/dish-images\.js'/);
});

test('navigation labels are title cased on both pages',()=>{
 for(const page of ['index.html','menu/index.html']){
  const html=read(page);
  for(const label of ['Our Story','The Experience','The Menu','Find Us','Table Enquiries'])assert.ok(html.includes('>'+label+'<')||html.includes('>'+label+' '),page+' missing '+label);
 }
});
test('desktop kitchen image aligns with menu panel while mobile heights remain bounded',()=>{
 const css=read('src/styles.css');
 assert.match(css,/\.experience-layout\{[^}]*align-items:stretch/);
 assert.match(css,/\.experience-photo\{[^}]*min-height:500px/);
 assert.match(css,/@media\(max-width:600px\)\{\.experience-photo\{height:300px/);
});
