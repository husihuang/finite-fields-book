const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1280,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/chapters/c01.html#square-symmetry');
  const w=page.locator('.square-symmetry'),main=w.locator('.symmetry-main');await w.waitFor();
  assert.equal(await w.getByRole('button',{name:'复原',exact:true}).count(),1);
  const I=[1,0,0,1],R=[0,-1,1,0],S=[-1,0,0,1];
  const mul=(a,b)=>[a[0]*b[0]+a[1]*b[2],a[0]*b[1]+a[1]*b[3],a[2]*b[0]+a[3]*b[2],a[2]*b[1]+a[3]*b[3]].map(x=>x||0);
  const mat=word=>[...word].reduce((m,o)=>mul(o==='r'?R:S,m),I);
  const matrix=async()=>(await main.getAttribute('data-matrix')).split(',').map(Number);
  const words=['','r','rr','rrr','s','rs','rrs','rrrs']; const perms=[[0,1,2,3],[1,2,3,0],[2,3,0,1],[3,0,1,2],[1,0,3,2],[0,3,2,1],[3,2,1,0],[2,1,0,3]];assert.equal(new Set(words.map(x=>mat(x).join(','))).size,8);
  for(const right of words)for(const left of words){
   await w.locator(`.symmetry-elements [data-word="${right||'e'}"]`).click();
   for(const op of left)await w.locator(`[data-step="${op}"]`).click();
   assert.deepEqual(await matrix(),mul(mat(left),mat(right))); assert.equal(await main.getAttribute('data-permutation'),perms[words.indexOf(right)].map(i=>perms[words.indexOf(left)][i]).join(','));
  }
  for(const word of ['rrrr','ss','srs']){
   await w.locator(`.symmetry-relations [data-word="${word}"]`).click();assert.deepEqual(await matrix(),mat(word));
  }
  await w.locator('[data-compare]').click();
  assert.equal(await w.locator('.symmetry-sr').getAttribute('data-permutation'),'0,3,2,1');
  assert.equal(await w.locator('.symmetry-rs').getAttribute('data-permutation'),'2,1,0,3');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await w.locator('[data-reset]').click();await w.locator('[data-step="r"]').click();await page.waitForTimeout(180);
  await w.locator('[data-reset]').click();await page.waitForTimeout(700);assert.deepEqual(await matrix(),I);
  assert.equal(await w.locator('.symmetry-history').innerText(),'从单位元 e 开始。');
  assert.equal(await w.locator('.symmetry-elements [data-word="e"]').getAttribute('aria-pressed'),'true');
  for(const svg of ['.symmetry-main','.symmetry-sr','.symmetry-rs'])assert.equal(await w.locator(svg).getAttribute('data-permutation'),'0,1,2,3');
  assert.equal(await w.locator('[data-step="r"]').isEnabled(),true);
  await w.locator('[data-compare]').click();await page.waitForTimeout(180);
  await w.getByRole('button',{name:'复原',exact:true}).click();await page.waitForTimeout(1500);
  for(const svg of ['.symmetry-main','.symmetry-sr','.symmetry-rs'])assert.equal(await w.locator(svg).getAttribute('data-permutation'),'0,1,2,3');
  assert.equal(await w.locator('[data-compare]').isEnabled(),true);
  await w.locator('[data-step="r"]').click();
  await page.waitForFunction(()=>document.querySelector('.square-symmetry').getAttribute('aria-busy')==='false');assert.deepEqual(await matrix(),R);
  await w.locator('[data-compare]').click();await page.waitForFunction(()=>!document.querySelector('[data-compare]').disabled);
  assert.equal(await w.locator('.symmetry-sr').getAttribute('data-permutation'),'0,3,2,1');
  await w.locator('[data-reset]').click();await w.scrollIntoViewIfNeeded();
  await page.screenshot({path:'finite-fields-book/_build/chapter-review/symmetry-desktop.png'});
  await page.setViewportSize({width:390,height:844});await page.reload();await w.waitFor();await w.scrollIntoViewIfNeeded();await page.waitForTimeout(300);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  await page.screenshot({path:'finite-fields-book/_build/chapter-review/symmetry-mobile.png'});
  await page.evaluate(()=>document.documentElement.dataset.theme='dark');await page.screenshot({path:'finite-fields-book/_build/chapter-review/symmetry-dark.png'});
  assert.deepEqual(errors,[]);assert.match(await page.locator('.cyclic-result').innerText(),/元素 2 的阶 = 3/);
  console.log('Passed: all 64 group products, eight elements, three relations, sr vs rs, cancellation, animations, mobile width and no browser errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
