
'use strict';
import MENU from './menu.json';
import CATEGORIES from './categories.json';
import {buildDishAvatar} from './dish-images.js';
const $=id=>document.getElementById(id);
const featuredNames=['Hyderabadi Chicken Dum Biryani','Butter Chicken','Masala Dosa','Paneer Tikka'];
const fmt=x=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',minimumFractionDigits:Number.isInteger(x)?0:2,maximumFractionDigits:2}).format(x);
const featured=$('featured-dishes');
for(const name of featuredNames){
 const dish=MENU.find(item=>item.name===name);if(!dish)continue;
 const card=document.createElement('article');card.className='featured-dish';
 const avatar=buildDishAvatar(dish,true);
 const info=document.createElement('div');info.className='featured-dish-info';
 const tag=document.createElement('span');tag.className='featured-category';tag.textContent=dish.cat;
 const h=document.createElement('h3');h.textContent=dish.name;
 const desc=document.createElement('p');desc.textContent=dish.desc;
 const price=document.createElement('span');price.className='featured-price';price.textContent=fmt(dish.price);
 const diet=document.createElement('span');diet.className='diet-label';diet.textContent=dish.veg?'Vegetarian':'Non-vegetarian';
 info.append(tag,h,desc,diet);card.append(avatar,info,price);featured.append(card);
}
$('mobilebutton').addEventListener('click',()=>{const open=$('navlinks').classList.toggle('open');$('mobilebutton').setAttribute('aria-expanded',String(open));$('mobilebutton').textContent=open?'×':'☰'});document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{$('navlinks').classList.remove('open');$('mobilebutton').setAttribute('aria-expanded','false');$('mobilebutton').textContent='☰'}));
$('year').textContent=new Date().getFullYear();
// Content stays visible by default if scripts or observation fail.
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const reveals=[...document.querySelectorAll('.reveal')];
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}
 },{threshold:.09});
 // Only enable the effect after the observer has been created.
 for(const el of reveals){observer.observe(el)}
 document.documentElement.classList.add('motion-ready');
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));window.addEventListener('scroll',()=>{$('totop').classList.toggle('show',window.scrollY>900)},{passive:true});

$('totop').addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
// Escape closes the mobile menu in every browser that supports keyboard input.
document.addEventListener('keydown',event=>{
 if(event.key==='Escape' && $('navlinks').classList.contains('open')){
  $('navlinks').classList.remove('open');
  $('mobilebutton').setAttribute('aria-expanded','false');
  $('mobilebutton').textContent='☰';
  $('mobilebutton').focus();
 }
});
