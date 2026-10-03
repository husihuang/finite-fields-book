const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await b.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/chapters/c09.html');const w=page.locator('[data-kind="coordinates"]'),model=w.locator('select').nth(0),mode=w.locator('select').nth(1),input=w.locator('input'),out=w.locator('.lesson-result');
 let cases=0;
 for(const [m,poly] of [[4,19],[2,7],[8,285]]){
  await input.fill('0');await model.selectOption(String(m));let value=1,seen=new Set();
  for(let k=0;k<(1<<m)-1;k++){
   await input.fill(String(k));const actual=await w.locator('tbody td:nth-child(2)').allTextContents();assert.deepEqual(actual,Array.from({length:m},(_,i)=>String((value>>i)&1)));assert.match(await out.innerText(),new RegExp('a = α\\^'+k+' ='));seen.add(value);cases++;
   value<<=1;if(value&(1<<m))value^=poly;
  }
  assert.equal(value,1);assert.equal(seen.size,(1<<m)-1);
  await mode.selectOption('zero');assert.equal(await input.isDisabled(),true);assert.deepEqual(await w.locator('tbody td:nth-child(2)').allTextContents(),Array(m).fill('0'));await mode.selectOption('power');
  await input.fill(String((1<<m)-1));assert.equal(await w.locator('.lesson-error').count(),1);await input.fill('0');assert.match(await out.innerText(),/a = α\^0 = 1/);
 }
 await model.selectOption('4');await input.fill('4');assert.match(await out.innerText(),/a = α\^4 = α \+ 1/);
 await input.fill('');assert.equal(await w.locator('.lesson-error').count(),1);await input.fill('1');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.deepEqual(errors,[]);
 console.log(`Passed ${cases} powers in GF(4), GF(16), GF(256); zero, exponent bounds, α^0, α^4, mobile layout and script errors.`);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
