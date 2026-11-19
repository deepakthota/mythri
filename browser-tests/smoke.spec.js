import {test,expect} from '@playwright/test';
test('homepage loads real brand logo and native navigation',async({page})=>{
 await page.goto('/');
 await expect(page.locator('header .logo-mark')).toBeVisible();
 await expect(page.getByRole('link',{name:'The Menu'})).toBeVisible();
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
 await expect(page.locator('#featured-dishes article')).toHaveCount(4);
});
test('menu category filters and browser back work',async({page})=>{
 await page.goto('/menu/');
 await expect(page.locator('#menugrid article')).toHaveCount(10);
 const first=page.locator('#menu-categories button').nth(1);
 const name=await first.textContent();
 await first.focus();
 await first.press('Enter');
 await expect(page.locator('#results-heading')).toHaveText(name);
 await expect(first).toBeFocused();
 await page.goBack();
 await expect(page.locator('#results-heading')).toHaveText('Explore our favourites');
});
test('search, vegetarian filter and clear controls work',async({page})=>{
 await page.goto('/menu/');
 const field=page.locator('#search');
 await field.fill('Masala Dosa');
 await expect(page.locator('#menugrid article')).toContainText(['Masala Dosa']);
 await page.locator('#vegonly').check();
 await expect(page.locator('#menugrid article').first()).toContainText('Vegetarian');
 await page.locator('#filter-reset').click();
 await expect(page.locator('#menugrid article')).toHaveCount(10);
});
test('mobile menu supports keyboard Escape',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('/');
 await page.locator('#mobilebutton').click();
 await expect(page.locator('#navlinks')).toHaveClass(/open/);
 await page.keyboard.press('Escape');
 await expect(page.locator('#mobilebutton')).toHaveAttribute('aria-expanded','false');
 await expect(page.locator('#mobilebutton')).toBeFocused();
});
test('reduced motion preserves content visibility',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('.story .reveal').first()).toHaveCSS('opacity','1');
});

test('shared footer and real visit CTA replace nonfunctional form',async({page})=>{
 await page.goto('/');
 await expect(page.locator('footer .footer-contact')).toBeVisible();
 await expect(page.locator('#bookingform')).toHaveCount(0);
 await expect(page.locator('.visit-call')).toHaveAttribute('href','tel:+61397047684');
 await page.getByRole('link',{name:'The Menu'}).click();
 await expect(page.locator('footer .footer-contact')).toBeVisible();
 await expect(page.locator('.menu-endcap .primary-cta')).toHaveAttribute('href','/#visit');
});
test('menu cards display image-led gallery and no horizontal overflow',async({page})=>{
 for(const width of [320,375,600,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto('/menu/');
  await expect(page.locator('#menugrid article')).toHaveCount(10);
  const cols=await page.locator('#menugrid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
  expect(cols).toBe(width<=650?1:width>=1320?3:2);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  expect(overflow, 'horizontal overflow at '+width+'px').toBe(false);
 }
});
