// Photographs are real, freely reusable Unsplash images matched only to
// dishes explicitly identified by the photographer or the photo description.
// They are representative imagery, not pictures of Mythri's own preparations.
// Source, photographer and license details: IMAGE_CREDITS.md.
export const DISH_IMAGES=Object.freeze({
  'Hyderabadi Chicken Dum Biryani':{
    src:'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=640&q=82',
    alt:'Chicken biryani in a white bowl, representative food photography'
  },
  'Butter Chicken':{
    src:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=640&q=82',
    alt:'Butter chicken curry in a wooden bowl, representative food photography'
  },
  'Masala Dosa':{
    src:'https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?auto=format&fit=crop&w=640&q=82',
    alt:'Masala dosa served with chutneys, representative food photography'
  }
});
export const getDishImage=(name)=>Object.prototype.hasOwnProperty.call(DISH_IMAGES,name)?DISH_IMAGES[name]:null;
export function buildDishAvatar(dish,featured=false){
 const avatar=document.createElement('div');
 avatar.className='dish-avatar '+(dish.veg?'avatar-veg':'avatar-nonveg')+(featured?' featured-avatar':'');
 const symbol=document.createElement('span');
 symbol.textContent='✳';
 symbol.setAttribute('aria-hidden','true');
 avatar.append(symbol);
 const photo=getDishImage(dish.name);
 if(photo){
   const img=document.createElement('img');
   img.className='dish-photo';
   img.src=photo.src;
   img.alt=photo.alt;
   img.loading='lazy';
   img.decoding='async';
   img.addEventListener('load',()=>avatar.classList.add('has-photo'),{once:true});
   img.addEventListener('error',()=>img.remove(),{once:true});
   avatar.append(img);
 }
 return avatar;
}
