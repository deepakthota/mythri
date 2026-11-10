
'use strict';
import MENU from './menu.json';
import CATEGORIES from './categories.json';
const $=id=>document.getElementById(id);
const featuredNames=['Hyderabadi Chicken Dum Biryani','Butter Chicken','Masala Dosa','Paneer Tikka'];
const fmt=x=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',minimumFractionDigits:Number.isInteger(x)?0:2,maximumFractionDigits:2}).format(x);
const featured=$('featured-dishes');
for(const name of featuredNames){
 const dish=MENU.find(item=>item.name===name);if(!dish)continue;
 const card=document.createElement('article');card.className='featured-dish';
 const avatar=document.createElement('div');avatar.className='dish-avatar featured-avatar';avatar.setAttribute('aria-hidden','true');avatar.textContent='✳';
 const dot=document.createElement('span');dot.className='diet-dot '+(dish.veg?'veg':'nonveg');dot.setAttribute('aria-hidden','true');avatar.append(dot);
 const info=document.createElement('div');info.className='featured-dish-info';
 const tag=document.createElement('span');tag.className='featured-category';tag.textContent=dish.cat;
 const h=document.createElement('h3');h.textContent=dish.name;
 const desc=document.createElement('p');desc.textContent=dish.desc;
 const price=document.createElement('span');price.className='featured-price';price.textContent=fmt(dish.price);
 const diet=document.createElement('span');diet.className='diet-label';diet.textContent=dish.veg?'Vegetarian':'Non-vegetarian';
 info.append(tag,h,desc,diet);card.append(avatar,info,price);featured.append(card);
}
$('mobilebutton').addEventListener('click',()=>{const open=$('navlinks').classList.toggle('open');$('mobilebutton').setAttribute('aria-expanded',String(open));$('mobilebutton').textContent=open?'×':'☰'});document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{$('navlinks').classList.remove('open');$('mobilebutton').setAttribute('aria-expanded','false');$('mobilebutton').textContent='☰'}));
const today=new Date();const localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);$('bookdate').min=localDate;$('year').textContent=today.getFullYear();
$('bookingform').addEventListener('submit',e=>{e.preventDefault();const dt=$('bookdate').value;if(!dt||dt<localDate){$('bookingresult').textContent='Choose today or a later date.';return}const name=$('bookname').value.trim(),phone=$('bookphone').value.trim();if(!name||!phone)return;const msg=`MYTHRI TABLE ENQUIRY\nName: ${name}\nPhone: ${phone}\nPreferred date: ${dt}\nPreferred time: ${$('booktime').value}\nGuests: ${$('guests').value}\nNotes: ${$('booknotes').value.trim()||'None'}\n\nThis is an enquiry, not a confirmed booking.`;const wrap=$('bookingresult');wrap.replaceChildren();const p=document.createElement('p');p.className='note';p.textContent='Your enquiry is ready. Copy the details and call Mythri on (03) 9704 7684. Your reservation is not confirmed.';const b=document.createElement('button');b.type='button';b.className='pill';b.classList.add('copy-btn');b.textContent='Copy enquiry details ↗';b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(msg);b.textContent='Copied ✓'}catch{const t=document.createElement('textarea');t.value=msg;wrap.append(t);t.focus();t.select();b.textContent='Select and copy details below'}});wrap.append(p,b)});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.09});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e))}else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));window.addEventListener('scroll',()=>{$('totop').classList.toggle('show',window.scrollY>900)},{passive:true});

$('totop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));