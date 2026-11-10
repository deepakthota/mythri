import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filterDishes, getState, stateUrl, prioritizedDishes, toSlug, PAGE_SIZE, FEATURED_NAMES } from '../src/menu-logic.js';
const menu = JSON.parse(readFileSync(new URL('../src/menu.json', import.meta.url), 'utf8'));
const cats = JSON.parse(readFileSync(new URL('../src/categories.json', import.meta.url), 'utf8'));
test('category URLs are shareable and restore selection on reload', () => {
 const state={category:'Dum Biryanis',search:'chicken',veg:false};
 const url=stateUrl(state,cats);
 assert.equal(url,'/menu/?category=dum-biryanis&q=chicken');
 assert.deepEqual(getState(new URL(url,'https://example.org').search,cats),state);
 assert.equal(getState('?category=bad-value',cats).category,'All');
});
test('search, vegetarian and category combine without losing source data',()=>{
 const matches=filterDishes(menu,{category:'Dum Biryanis',search:'vegetable',veg:true});
 assert.equal(matches.length,1);assert.equal(matches[0].name,'Vegetable Dum Biryani');
 assert.equal(menu.length,99);
});
test('homepage feature names exist and include both dietary types',()=>{
 const featured=FEATURED_NAMES.slice(0,4).map(name=>menu.find(d=>d.name===name));
 assert.ok(featured.every(Boolean));assert.ok(featured.some(d=>d.veg));assert.ok(featured.some(d=>!d.veg));
});
test('default menu prioritizes featured dishes but honors filters',()=>{
 const state={category:'All',search:'',veg:false};
 const list=prioritizedDishes(filterDishes(menu,state),state);
 assert.equal(list[0].name,FEATURED_NAMES[0]);assert.equal(list.length,99);
 assert.equal(list.slice(0,PAGE_SIZE).length,10);
 const only=filterDishes(menu,{category:'Chicken Curries',search:'butter',veg:false});
 assert.ok(only.some(d=>d.name==='Butter Chicken'));assert.ok(only.every(d=>d.cat==='Chicken Curries'));
});
test('URL state rejects unknown categories and trims overlong search terms',()=>{
 assert.equal(toSlug('Vegetarian Entrées'),'vegetarian-entrees');
 const state=getState('?category=unknown&q='+ 'x'.repeat(250),cats);
 assert.equal(state.category,'All');assert.equal(state.search.length,120);
 assert.equal(state.veg,false);
});