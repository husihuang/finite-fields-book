const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const paths=['intro','knowledge','final-review',...Array.from({length:20},(_,i)=>'chapters/c'+String(i+1).padStart(2,'0')),'appendices/source','appendices/algorithms','appendices/experiments','appendices/references'];let cases=0;
 for(const theme of ['light','dark'])for(const path of paths){
  await page.goto(`http://127.0.0.1:8765/${path}.html`);await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  assert.equal(await page.locator('.secondary-toggle:visible').count(),0,path+' secondary toggle hidden');
  if(await page.locator('#pst-page-toc-nav a').count()){
   assert.equal(await page.locator('.ff-inline-page-toc').count(),1,path+' page toc merged');
   assert.ok(await page.locator('.ff-inline-page-toc #pst-page-toc-nav a').count(),path+' merged toc has links');
   assert.equal(await page.locator('.ff-inline-page-toc summary').count(),0,path+' redundant page toc heading removed');
  }
  for(const kind of ['primary','secondary']){
   const toggle=page.locator(`.${kind}-toggle:visible`).first();if(!await toggle.count())continue;const modal=page.locator(`#pst-${kind}-sidebar-modal`);
   await toggle.tap();await page.waitForFunction(id=>document.getElementById(id).matches(':modal'),`pst-${kind}-sidebar-modal`);assert.equal(await toggle.getAttribute('aria-expanded'),'true');
   const box=await modal.boundingBox();assert.ok(box.x>=-1&&box.x+box.width<=391&&box.height>100,path+' '+kind+' visible');assert.ok(await modal.locator('a').count());
   await modal.locator('.ff-sidebar-close').tap();await page.waitForFunction(id=>!document.getElementById(id).open,`pst-${kind}-sidebar-modal`);assert.equal(await toggle.getAttribute('aria-expanded'),'false');cases++;
  }
 }
 await page.goto('http://127.0.0.1:8765/chapters/c09.html');const toggle=page.locator('.primary-toggle:visible').first(),modal=page.locator('#pst-primary-sidebar-modal');
 await page.evaluate(()=>window.scrollTo(0,1300));await toggle.tap();await page.waitForFunction(()=>document.getElementById('pst-primary-sidebar-modal').open);await page.screenshot({path:'finite-fields-book/_build/sidebar-mobile.png'});
 const box=await modal.boundingBox();await page.touchscreen.tap(Math.min(389,box.x+box.width+30),400);await page.waitForFunction(()=>!document.getElementById('pst-primary-sidebar-modal').open);
 await toggle.tap();await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.getElementById('pst-primary-sidebar-modal').open);
 await toggle.tap();const link=modal.locator('a[href="c10.html"]').first();await link.tap();await page.waitForURL('**/chapters/c10.html');assert.equal(await page.locator('#pst-primary-sidebar-modal').getAttribute('open'),null);
 for(const width of [320,768]){await page.setViewportSize({width,height:844});await page.reload();await page.locator('.primary-toggle:visible').first().tap();assert.equal(await page.locator('#pst-primary-sidebar-modal').evaluate(e=>e.open),true);await page.locator('#pst-primary-sidebar-modal .ff-sidebar-close').tap();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);}
 await page.setViewportSize({width:390,height:844});await page.reload();await page.locator('.primary-toggle:visible').first().tap();await page.setViewportSize({width:1280,height:900});await page.waitForFunction(()=>!document.getElementById('pst-primary-sidebar-modal').open);await page.reload();const desktop=page.locator('.primary-toggle:visible').first();await desktop.click();assert.equal(await page.locator('#pst-primary-sidebar').evaluate(e=>e.classList.contains('pst-sidebar-hidden')),true);await desktop.click();assert.equal(await page.locator('#pst-primary-sidebar').evaluate(e=>e.classList.contains('pst-sidebar-hidden')),false);
 assert.equal(await page.locator('#pst-secondary-sidebar').evaluate(e=>getComputedStyle(e).display),'none');
 assert.ok(await page.locator('.ff-inline-page-toc #pst-page-toc-nav a').count());
 assert.deepEqual(errors,[]);fs.writeFileSync('finite-fields-book/_build/sidebar-validation.json',JSON.stringify({pages:paths.length,themes:2,toggleCases:cases,pageTocMerged:true,secondarySidebarHidden:true,touch:true,outsideClose:true,escapeClose:true,chapterNavigation:true,widths:[320,390,768,1280],resize:true,desktopCollapse:true,errors},null,2));console.log('Sidebar passed: page TOC merged left, right sidebar hidden, '+cases+' touch open/close cases, overlay, Escape, chapter links, resizing and desktop collapse.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
