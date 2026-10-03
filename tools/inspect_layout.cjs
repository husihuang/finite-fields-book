const { chromium } = require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto('http://127.0.0.1:8765/chapters/c01.html');
  await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));
  await page.evaluate(()=>document.documentElement.dataset.theme='dark');
  await page.waitForTimeout(300);
  const bg=await page.locator('.reader-toolbar').evaluate(e=>getComputedStyle(e).backgroundColor);
  if(bg!=='rgb(32, 42, 48)')throw new Error('Dark toolbar background: '+bg);
  await page.screenshot({path:'finite-fields-book/_build/chapter-review/chapter1-dark.png'});
  await page.setViewportSize({width:1280,height:900});
  await page.evaluate(()=>{document.documentElement.dataset.theme='light';document.querySelector('#c01-binary-operation').scrollIntoView({block:'center'});});
  await page.waitForTimeout(400);
  await page.screenshot({path:'finite-fields-book/_build/chapter-review/chapter1-definition.png'});
  console.log('Dark contrast and definition layout checked.');
 } finally {await browser.close();}
})();

