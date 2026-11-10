import MENU from './menu.json';
import CATEGORIES from './categories.json';
import {buildDishAvatar} from './dish-images.js';
import {PAGE_SIZE,getState,stateUrl,filterDishes,prioritizedDishes,toSlug} from './menu-logic.js';
const $=id=>document.getElementById(id);
const fmt=x=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',minimumFractionDigits:Number.isInteger(x)?0:2,maximumFractionDigits:2}).format(x);
let state=getState(location.search,CATEGORIES),visible=PAGE_SIZE;
const search=$('search'),veg=$('vegonly'),cats=$('menu-categories'),items=$('menugrid'),more=$('showmore'),count=$('menucount'),heading=$('results-heading');
function setState(patch,{replace=false}={}){
 state={...state,...patch};visible=PAGE_SIZE;
 const url=stateUrl(state,CATEGORIES);
 if(url!==location.pathname+location.search)history[replace?'replaceState':'pushState']({},'',url);
 render();
}
function createCategory(name){
 const b=document.createElement('button');b.type='button';b.className='category-option'+(state.category===name?' active':'');
 b.textContent=name;b.setAttribute('aria-pressed',String(state.category===name));
 b.addEventListener('click',()=>setState({category:name}));return b;
}
function renderCategories(){cats.replaceChildren();cats.append(createCategory('All'));for(const cat of CATEGORIES)cats.append(createCategory(cat.name));}
function makeDish(dish){
 const card=document.createElement('article');card.className='menu-dish';
 const avatar=buildDishAvatar(dish);
 const body=document.createElement('div');body.className='menu-dish-body';
 const title=document.createElement('h3');title.textContent=dish.name;
 const description=document.createElement('p');description.textContent=dish.desc;
 const diet=document.createElement('span');diet.className='diet-label';diet.textContent=dish.veg?'Vegetarian':'Non-vegetarian';
 body.append(title,description,diet);
 const price=document.createElement('span');price.className='menu-dish-price';price.textContent=fmt(dish.price);
 card.append(avatar,body,price);return card;
}
function render(){
 search.value=state.search;veg.checked=state.veg;renderCategories();
 const found=prioritizedDishes(filterDishes(MENU,state),state);const shown=found.slice(0,visible);
 heading.textContent=state.category==='All'?(state.search||state.veg?'Search results':'Explore our favourites'):state.category;
 count.textContent=`${found.length} ${found.length===1?'dish':'dishes'}`;
 items.replaceChildren();
 if(!found.length){const box=document.createElement('div');box.className='menu-empty';
 const h=document.createElement('h3');h.textContent='No dishes found';
 const p=document.createElement('p');p.textContent='Try a different search or clear your filters.';
 const reset=document.createElement('button');reset.className='clear-filters';reset.type='button';reset.textContent='Clear filters';reset.addEventListener('click',()=>setState({category:'All',search:'',veg:false}));box.append(h,p,reset);items.append(box);
 }else{const frag=document.createDocumentFragment();for(const dish of shown)frag.append(makeDish(dish));items.append(frag);}
 const remaining=found.length-shown.length;more.hidden=remaining<=0;
 if(remaining>0)more.textContent=`Show ${Math.min(remaining,PAGE_SIZE)} more dishes ↓`;
 $('filter-reset').hidden=state.category==='All'&&!state.search&&!state.veg;
}
let debounce;
search.addEventListener('input',()=>{clearTimeout(debounce);const q=search.value;debounce=setTimeout(()=>setState({search:q},{replace:true}),180)});
search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();clearTimeout(debounce);setState({search:search.value})}});
veg.addEventListener('change',()=>setState({veg:veg.checked}));
more.addEventListener('click',()=>{visible+=PAGE_SIZE;render()});
$('filter-reset').addEventListener('click',()=>setState({category:'All',search:'',veg:false}));
window.addEventListener('popstate',()=>{state=getState(location.search,CATEGORIES);visible=PAGE_SIZE;render()});
$('mobilebutton').addEventListener('click',()=>{const open=$('navlinks').classList.toggle('open');$('mobilebutton').setAttribute('aria-expanded',String(open));$('mobilebutton').textContent=open?'×':'☰'});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{$('navlinks').classList.remove('open');$('mobilebutton').setAttribute('aria-expanded','false');$('mobilebutton').textContent='☰'}));
$('year').textContent=new Date().getFullYear();
render();