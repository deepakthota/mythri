// Pure filtering and URL-state helpers, shared by the menu page and automated tests.
export const PAGE_SIZE=10;
export const FEATURED_NAMES=[
 'Hyderabadi Chicken Dum Biryani','Butter Chicken','Masala Dosa','Paneer Tikka',
 'Veg Samosa (2 pcs)','Chicken 65','Vegetable Dum Biryani','Paneer 65 Biryani'
];
export const toSlug=value=>String(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function getState(search,categories){
 const params=new URLSearchParams(search);
 const found=categories.find(cat=>toSlug(cat.name)===params.get('category'));
 return {category:found?.name??'All',search:(params.get('q')??'').slice(0,120),veg:params.get('veg')==='1'};
}
export function stateUrl(state,categories){
 const params=new URLSearchParams();
 if(state.category!=='All'&&categories.some(cat=>cat.name===state.category))params.set('category',toSlug(state.category));
 if(state.search.trim())params.set('q',state.search.trim());
 if(state.veg)params.set('veg','1');
 const query=params.toString();return '/menu/'+(query?'?'+query:'');
}
export function filterDishes(menu,state){
 const q=state.search.trim().toLocaleLowerCase();
 return menu.filter(item=>(state.category==='All'||item.cat===state.category)&&(!state.veg||item.veg)&&(!q||`${item.name} ${item.desc} ${item.cat}`.toLocaleLowerCase().includes(q)));
}
export function prioritizedDishes(items,state){
 if(state.category!=='All'||state.search.trim()||state.veg)return items;
 const ranks=new Map(FEATURED_NAMES.map((name,i)=>[name,i]));
 return [...items].sort((a,b)=>(ranks.get(a.name)??999)-(ranks.get(b.name)??999));
}