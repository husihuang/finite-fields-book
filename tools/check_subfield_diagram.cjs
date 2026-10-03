const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await b.newPage({viewport:{width:1100,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/chapters/c10.html');const w=page.locator('[data-kind="subfields"]'),input=w.locator('input');await page.waitForFunction(()=>!!document.querySelector('.subfield-detail mjx-container'));await page.waitForFunction(()=>!!document.querySelector('.lesson-result mjx-container'));
 for(let n=1;n<=60;n++){
  await input.fill(String(n));const ds=Array.from({length:n},(_,i)=>i+1).filter(d=>n%d===0);
  assert.deepEqual(await w.locator('.subfield-node').evaluateAll(es=>es.map(e=>Number(e.dataset.degree))),ds);
  const expected=[];for(const a of ds)for(const c of ds)if(a<c&&c%a===0&&!ds.some(d=>a<d&&d<c&&d%a===0&&c%d===0))expected.push(`${a}:${c}`);
  assert.deepEqual(await w.locator('.subfield-edge').evaluateAll(es=>es.map(e=>`${e.dataset.from}:${e.dataset.to}`)),expected);
  assert.equal(await w.locator('table').count(),0);
 }
 await input.fill('30');await w.locator('[data-degree="6"]').click();
 assert.deepEqual(await w.locator('.is-contained').evaluateAll(es=>es.map(e=>Number(e.dataset.degree))),[1,2,3]);assert.deepEqual(await w.locator('.is-containing').evaluateAll(es=>es.map(e=>Number(e.dataset.degree))),[30]);
 await w.locator('[data-degree="5"]').focus();await page.keyboard.press('Enter');assert.equal(await w.locator('[data-degree="5"]').getAttribute('aria-pressed'),'true');
 await w.locator('[data-degree="1"]').focus();await page.keyboard.press(' ');assert.equal(await w.locator('[data-degree="1"]').getAttribute('aria-pressed'),'true');
 await w.locator('select').selectOption('3');assert.match(await w.locator('.subfield-node').last().getAttribute('aria-label'),/3\^30/);
 await w.locator('select').selectOption('2');await w.locator('[data-degree="6"]').click();await page.waitForFunction(()=>!!document.querySelector('.subfield-detail mjx-container'));await w.screenshot({path:'finite-fields-book/_build/chapter-review/subfields-desktop.png'});
 await page.setViewportSize({width:390,height:844});await input.fill('60');await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await w.screenshot({path:'finite-fields-book/_build/chapter-review/subfields-mobile.png'});
 await page.evaluate(()=>document.documentElement.dataset.theme='dark');await w.screenshot({path:'finite-fields-book/_build/chapter-review/subfields-dark.png'});
 await input.fill('0');assert.equal(await w.locator('.lesson-error').count(),1);assert.equal(await w.locator('.subfield-node').count(),0);await input.fill('1');await page.waitForFunction(()=>!!document.querySelector('.subfield-detail mjx-container'));assert.equal(await w.locator('[data-mml-node="merror"]').count(),0);assert.deepEqual(errors,[]);
 console.log('Passed all n=1..60 node sets and Hasse edges; containment highlighting, keyboard, p changes, invalid input, formulas, mobile and dark theme.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
