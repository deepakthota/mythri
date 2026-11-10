import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const menu = JSON.parse(readFileSync(new URL('../src/menu.json', import.meta.url), 'utf8'));
const categories = JSON.parse(readFileSync(new URL('../src/categories.json', import.meta.url), 'utf8'));
test('menu has unique items by category and name', () => {
  const keys=menu.map(x=>`${x.cat}:${x.name}`);
  assert.equal(new Set(keys).size, keys.length);
});
test('every item has a known category and valid price', () => {
  const names=new Set(categories.map(x=>x.name));
  for(const item of menu){
    assert.ok(names.has(item.cat), `${item.name} category`);
    assert.ok(item.name.trim());
    assert.ok(typeof item.desc==='string' && item.desc.trim());
    assert.ok(Number.isFinite(item.price) && item.price>0, item.name);
    assert.equal(typeof item.veg, 'boolean');
  }
});
test('full imported menu is present',()=>{assert.equal(menu.length, 99);assert.equal(categories.length,13)});