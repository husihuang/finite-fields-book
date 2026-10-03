const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));let formulas=0;
 for(let chapter=1;chapter<=19;chapter++){
  const id=String(chapter).padStart(2,'0');await page.goto(`http://127.0.0.1:8765/chapters/c${id}.html`);await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));await page.evaluate(()=>window.MathJax.startup.promise);
  assert.equal(await page.locator('[data-mml-node="merror"]').count(),0,`c${id} initial math`);
  const quiz=page.locator('.quiz');
  for(const answer of ['yes','no']){
   await quiz.locator(`[data-correct="${answer}"]`).click();await page.waitForFunction(()=>!document.querySelector('.quiz-feedback').textContent.includes('\\('));
   assert.equal(await quiz.locator('[data-mml-node="merror"]').count(),0,`c${id} feedback`);
  }
  if(chapter===10){assert.equal(await page.locator('p').filter({hasText:/^有限域的大小必须是素数幂/}).locator('mjx-container').count()>0,true);assert.equal(await page.locator('h2').filter({has:page.locator('mjx-container')}).count(),1);assert.equal(await quiz.locator('mjx-container').count(),2);}
  if(chapter===1){assert.equal(await page.locator('.symmetry-relations mjx-container').count(),3);}
  formulas+=await page.locator('mjx-container').count();console.log(`Chapter ${id}: formulas and both quiz responses passed.`);
 }
 for(const name of ['source','references','algorithms']){await page.goto(`http://127.0.0.1:8765/appendices/${name}.html`);await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));await page.evaluate(()=>window.MathJax.startup.promise);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);}
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:8765/chapters/c10.html');await page.waitForFunction(()=>!!document.querySelector('mjx-container svg'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 assert.deepEqual(errors,[]);console.log(`Passed all 19 chapters, 3 appendices, 38 quiz responses, ${formulas} chapter math containers, mobile layout and no script errors.`);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
