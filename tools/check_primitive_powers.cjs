const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');const assert=require('node:assert/strict');
const gcd=(a,b)=>b?gcd(b,a%b):a;
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await b.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/chapters/c11.html');const w=page.locator('[data-kind="primitive"]'),model=w.locator('select').nth(0),mode=w.locator('select').nth(1),input=w.locator('input');await page.waitForFunction(()=>!!document.querySelector('[data-kind="primitive"] .lesson-result mjx-container'));
 let cases=0;
 for(const m of [4,2,8]){await input.fill('0');await model.selectOption(String(m));const n=(1<<m)-1;let primitives=0;
  for(let k=0;k<n;k++){await input.fill(String(k));const expected=n/gcd(k,n);assert.equal(await w.locator('.primitive-order').innerText(),String(expected));assert.equal(await w.locator('.primitive-verdict').innerText(),expected===n?'是':'否');if(expected===n)primitives++;cases++;}
  assert.equal(primitives,[...Array(n)].filter((_,i)=>gcd(i,n)===1).length);
  await mode.selectOption('zero');assert.equal(await input.isDisabled(),true);assert.equal(await w.locator('.primitive-verdict').innerText(),'否');assert.equal(await w.locator('table').count(),0);assert.match(await w.locator('.primitive-order').innerText(),/未定义/);await mode.selectOption('power');
  await input.fill(String(n));assert.equal(await w.locator('.lesson-error').count(),1);await input.fill('0');assert.equal(await w.locator('.primitive-order').innerText(),'1');
 }
 await input.fill('1');await model.selectOption('4');await input.fill('5');assert.equal(await w.locator('.primitive-order').innerText(),'3');assert.equal(await w.locator('.primitive-verdict').innerText(),'否');await page.waitForTimeout(250);assert.equal(await w.locator('[data-mml-node="merror"]').count(),0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await w.screenshot({path:'finite-fields-book/_build/chapter-review/primitive-powers-mobile.png'});
 await input.fill('');assert.equal(await w.locator('.lesson-error').count(),1);assert.deepEqual(errors,[]);console.log(`Passed ${cases} exponent cases, zero, k=0, bounds, primitive counts, formulas, mobile layout and no script errors.`);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
