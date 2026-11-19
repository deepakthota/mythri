import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
const root=process.cwd();const out=join(root,'dist');
// Root deployments use an empty base path. GitHub Pages project sites use /<repo>.
const basePath=(process.env.PUBLIC_BASE_PATH||'').replace(/\/+$/,'');
if(basePath && !/^\/[a-zA-Z0-9_-]+$/.test(basePath))throw Error('Invalid PUBLIC_BASE_PATH');
// Rewrite only root-relative HTML href/src attributes, never external URLs or anchors.
const withBasePath=html=>html.replace(/(\b(?:href|src))="\/(?!\/)/g,(_,attr)=>attr+'="'+basePath+'/');
mkdirSync(join(out,'assets'),{recursive:true});
copyFileSync(join(root,'public/assets/mythri-mark.svg'),join(out,'assets/mythri-mark.svg'));
const read=p=>readFileSync(join(root,p),'utf8');
const escapeHtml=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const sharedFooter=read('src/components/footer.html');
const injectFooter=html=>{if(!html.includes('<!-- BUILD:SHARED_FOOTER -->'))throw Error('Shared footer slot missing');return html.replace('<!-- BUILD:SHARED_FOOTER -->',sharedFooter)};
const menu=JSON.parse(read('src/menu.json'));
const cats=JSON.parse(read('src/categories.json'));
let js=read('src/main.js').replace("import MENU from './menu.json';", `const MENU=${JSON.stringify(menu)};`).replace("import CATEGORIES from './categories.json';", `const CATEGORIES=${JSON.stringify(cats)};`);
if(js.includes('import MENU')||js.includes('import CATEGORIES'))throw Error('Failed to inline menu JSON');
writeFileSync(join(out,'assets/main.js'),js);
copyFileSync(join(root,'src/styles.css'),join(out,'assets/styles.css'));
// The menu browser history URLs also need the Pages project prefix.
writeFileSync(join(out,'assets/menu-logic.js'),read('src/menu-logic.js').replace("return '/menu/'+","return '"+basePath+"/menu/'+"));
copyFileSync(join(root,'src/dish-images.js'),join(out,'assets/dish-images.js'));
let menuJs=read('src/menu-page.js').replace("import MENU from './menu.json';",`const MENU=${JSON.stringify(menu)};`).replace("import CATEGORIES from './categories.json';",`const CATEGORIES=${JSON.stringify(cats)};`);
if(menuJs.includes('import MENU')||menuJs.includes('import CATEGORIES'))throw Error('Failed to inline menu page JSON');
writeFileSync(join(out,'assets/menu-page.js'),menuJs);
mkdirSync(join(out,'menu'),{recursive:true});
// Include menu content in the initial HTML for search engines and no-JS visitors.
const formatPrice=new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD'});
const staticMenu=menu.map(dish=>'<article class="menu-dish"><div class="dish-avatar '+(dish.veg?'avatar-veg':'avatar-nonveg')+'" aria-hidden="true">✳</div><div class="menu-dish-body"><div class="menu-dish-title-row"><h3>'+escapeHtml(dish.name)+'</h3><span class="menu-dish-price">'+formatPrice.format(dish.price)+'</span></div><p>'+escapeHtml(dish.desc)+'</p><span class="diet-label">'+(dish.veg?'Vegetarian':'Non-vegetarian')+'</span></div></article>').join('');
const template=read('menu/index.html');
if(!template.includes('<!-- BUILD:STATIC_MENU -->'))throw Error('Static menu slot missing');
writeFileSync(join(out,'menu/index.html'),withBasePath(injectFooter(template.replace('<!-- BUILD:STATIC_MENU -->',staticMenu).replace('/src/styles.css','/assets/styles.css').replace('/src/menu-page.js','/assets/menu-page.js'))));
let html=read('index.html').replace('/src/styles.css','/assets/styles.css').replace('/src/main.js','/assets/main.js');
writeFileSync(join(out,'index.html'),withBasePath(injectFooter(html)));
for(const file of ['_headers','robots.txt']) copyFileSync(join(root,'public',file),join(out,file));
writeFileSync(join(out,'.nojekyll'),'');
const siteUrl=(process.env.PUBLIC_SITE_URL||('https://deepakthota.github.io'+basePath+'/')).replace(/\/+$/,'')+'/';
if(!/^https:\/\/[a-z0-9.-]+\//i.test(siteUrl))throw Error('Invalid site URL');
const sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[siteUrl,siteUrl+'menu/'].map(url=>'  <url><loc>'+url+'</loc></url>').join('\n')+'\n</urlset>\n';
writeFileSync(join(out,'sitemap.xml'),sitemap);
writeFileSync(join(out,'robots.txt'),'User-agent: *\nAllow: /\n\nSitemap: '+siteUrl+'sitemap.xml\n');
console.log(`Built site: ${menu.length} dishes, ${cats.length} categories → dist/ (base path: ${basePath||"/"})`);