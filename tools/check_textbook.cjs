const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const root='finite-fields-book';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(let n=2;n<=19;n++){
   const chapter=`c${String(n).padStart(2,'0')}`;
   await page.goto(`http://127.0.0.1:8765/chapters/${chapter}.html`);
   await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));
   await page.evaluate(async()=>{if(window.MathJax?.startup?.promise)await window.MathJax.startup.promise;});
   assert.deepEqual(errors,[],chapter+' browser errors');
   assert.equal(await page.locator('mjx-merror, [data-mml-node="merror"]').count(),0,chapter+' math errors');
   const before=fs.readFileSync(`${root}/_build/textbook-backup/chapters/${chapter}.md`,'utf8');
   const ids=[...before.matchAll(/^:name: ([\w-]+)|^\(([\w-]+)\)=/gm)].map(m=>m[1]||m[2]);
   const missing=await page.evaluate(ids=>ids.filter(id=>!document.getElementById(id)),ids);assert.deepEqual(missing,[],chapter+' missing old anchors');
   const box=page.locator('.lesson-widget');assert.equal(await box.count(),1);
   assert.equal(await box.locator('.lesson-error').count(),0,chapter+' default experiment error');
   assert.equal((await box.locator('.lesson-result').innerText()).length>20,true);
   await page.locator('.quiz [data-correct="yes"]').first().click();assert.match(await page.locator('.quiz-feedback').first().innerText(),/回答正确/);
   const note=page.locator('.local-note').first();await note.fill(`章 ${n} 检验`);await page.reload();assert.equal(await note.inputValue(),`章 ${n} 检验`);await note.fill('');
   await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));
   const source=fs.readFileSync(`${root}/chapters/${chapter}.md`,'utf8');assert.equal(/^## 原讲义第 /m.test(source),false,chapter+' still organized by slide');
   await page.setViewportSize({width:390,height:844});await page.reload();await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));
   await page.waitForTimeout(120);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,chapter+' mobile overflow');
   const longMath=await page.evaluate(()=>[...document.querySelectorAll('mjx-container svg')].filter(e=>e.getBoundingClientRect().width>350).length);
   const kind=await box.getAttribute('data-kind');
   if([2,5,10,13,14,17,19].includes(n)){
    await box.evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(120);
    await page.screenshot({path:`${root}/_build/chapter-review/${chapter}-experiment-mobile.png`});
   }
   if([4,9,15].includes(n)){
    await page.evaluate(()=>document.documentElement.dataset.theme='dark');await page.screenshot({path:`${root}/_build/chapter-review/${chapter}-dark.png`});
   }
   results.push({chapter,kind,formulaNodes:await page.locator('mjx-container').count(),anchors:ids.length,mobilePassed:true,wideFormulas:longMath});
   console.log(chapter+' passed: formulas, '+ids.length+' old anchors, experiment, quiz, notes, mobile.');
   await page.setViewportSize({width:1280,height:900});
  }
  fs.writeFileSync(`${root}/_build/textbook-browser-validation.json`,JSON.stringify({chapters:results,browserErrors:errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
