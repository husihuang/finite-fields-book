const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await b.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/chapters/c13.html');await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));
 await page.evaluate(async()=>{if(window.MathJax?.startup?.promise)await window.MathJax.startup.promise;});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
 await page.locator('.lesson-controls select').nth(0).selectOption('8');await page.locator('.lesson-controls select').nth(2).selectOption('4');await page.locator('.lesson-controls input').fill('254');assert.equal(await page.locator('.lesson-error').count(),0);
 await page.goto('http://127.0.0.1:8765/chapters/c16.html');await page.locator('.lesson-controls select').selectOption('8');assert.equal(await page.locator('.lesson-table tbody tr').count(),255);assert.match(await page.locator('.lesson-result').innerText(),/生成元编码 3/);
 assert.match(await page.locator('.ff-widget .result').innerText(),/a × b = 9/);
 await page.goto('http://127.0.0.1:8765/chapters/c10.html');await page.locator('.lesson-controls input').fill('60');assert.equal(await page.locator('.subfield-node').count(),12);
 await page.goto('http://127.0.0.1:8765/chapters/c15.html');await page.locator('.lesson-controls input').fill('60');assert.match(await page.locator('.lesson-result').innerText(),/特征 3 整除/);
 await page.goto('http://127.0.0.1:8765/chapters/c05.html');await page.locator('.lesson-widget').evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(300);await page.screenshot({path:'finite-fields-book/_build/chapter-review/c05-final-mobile.png'});
 assert.deepEqual(errors,[]);console.log('Passed: final norm formula, GF(256), 255-row log table, arithmetic regression and maximum-degree inputs.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
