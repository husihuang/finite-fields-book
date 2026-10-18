const assert=require('node:assert/strict'), fs=require('node:fs');
const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const gcd=(a,b)=>b?gcd(b,a%b):a;
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/chapters/c15.html');await page.evaluate(()=>MathJax.startup.promise);
  assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  const circle=page.locator('.cyclotomic-circle');
  for(let k=0;k<6;k++){
   await circle.locator('select').selectOption(String(k));const order=6/gcd(6,k);assert.equal(await circle.getAttribute('data-order'),String(order));
   for(let j=1;j<=order;j++){await circle.locator('[data-action=step]').click();assert.equal(await circle.getAttribute('data-current'),String(j*k%6));}
   assert.equal(await circle.getAttribute('data-current'),'0');assert.equal(await circle.locator('[data-action=step]').isDisabled(),true);
   await circle.locator('[data-action=reset]').click();assert.equal(await circle.getAttribute('data-step'),'0');
  }
  await circle.locator('select').selectOption('2');await circle.locator('[data-action=play]').click();
  await page.waitForFunction(()=>document.querySelector('.cyclotomic-circle').dataset.step==='3');assert.equal(await circle.getAttribute('data-current'),'0');await circle.locator('[data-action=reset]').click();
  await page.locator('#c15-preview-sixth-roots .ff-present-button').click();await circle.locator('[data-action=step]').click();await page.locator('.ff-presentation-close').click();assert.equal(await circle.getAttribute('data-current'),'2');
  const widget=page.locator('[data-kind=cyclotomic]');
  let cases=0;
  const set=async(q,n)=>{
   await widget.evaluate((w,{q,n})=>{w.querySelector('select').value=String(q);w.querySelector('input').value=String(n);w.querySelector('input').dispatchEvent(new Event('input',{bubbles:true}));},{q,n});
   const orbits=await widget.locator('.cyclotomic-orbit-card').evaluateAll(cards=>cards.map(c=>[...c.querySelectorAll('.cyclotomic-orbit-node')].map(n=>Number(n.dataset.exponent))));
   if(gcd(q,n)!==1){assert.equal(orbits.length,0);assert.ok(await widget.locator('.lesson-result [data-tex]').count());}
   else{
    const expected=Array.from({length:n},(_,i)=>i).filter(i=>gcd(i,n)===1);
    assert.deepEqual(orbits.flat().sort((a,b)=>a-b),expected);
    for(const orbit of orbits)for(let i=0;i<orbit.length;i++)assert.equal(q*orbit[i]%n,orbit[(i+1)%orbit.length]);
    assert.equal(new Set(orbits.map(o=>o.length)).size,1);
   }
   cases++;
  };
  for(const q of [2,3,4,5,7,8,9,16])for(const n of [1,2,3,5,7,8,11,13,31,59,60])await set(q,n);
  await set(2,7);assert.equal(await widget.locator('.cyclotomic-orbit-card').count(),2);
  const card=widget.locator('.cyclotomic-orbit-card').first();for(const value of [2,4,1]){await card.locator('button').first().click();assert.equal(await card.getAttribute('data-current'),String(value));}
  await card.locator('button').nth(1).click();assert.equal(await card.getAttribute('data-current'),'1');
  await set(3,8);assert.equal(await widget.locator('.cyclotomic-orbit-card').count(),2);assert.deepEqual(await widget.locator('.cyclotomic-orbit-card').evaluateAll(cs=>cs.map(c=>c.dataset.length)),['2','2']);
  await widget.locator('input').fill('0');assert.equal(await widget.locator('.lesson-error').count(),1);assert.equal(await widget.locator('.cyclotomic-orbit-card').count(),0);await set(2,7);
  for(const theme of ['light','dark']){
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   await page.locator('#c15-preview-sixth-roots .ff-present-button').click();await page.locator('.ff-presentation-size').fill('22');await page.screenshot({path:`_build/c15-circle-${theme}.png`});await page.locator('.ff-presentation-next').click();assert.equal(await page.locator('.ff-presentation-content > *').getAttribute('id'),'c15-preview-root-groups');await page.locator('.ff-presentation-close').click();
   await page.locator('#c15-preview-orbit-experiment .ff-present-button').click();await page.locator('.ff-presentation-size').fill('22');
   const contrast=await widget.locator('.lesson-result').evaluate(el=>{
    const luminance=value=>{const rgb=value.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];};
    const s=getComputedStyle(el),a=luminance(s.color),b=luminance(s.backgroundColor);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   });assert.ok(contrast>=4.5,theme+' classroom result contrast '+contrast);
   await page.screenshot({path:`_build/c15-orbits-${theme}.png`});await page.locator('.ff-presentation-close').click();
  }
  await page.setViewportSize({width:390,height:844});await widget.scrollIntoViewIfNeeded();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.locator('#c15-preview-orbit-experiment .ff-present-button').click();assert.equal(await page.locator('.ff-presentation-toolbar').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);await page.screenshot({path:'_build/c15-orbits-mobile.png'});await page.locator('.ff-presentation-close').click();
  await page.evaluate(()=>MathJax.startup.promise);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.deepEqual(errors,[]);
  function mul(a,b){let r=0;while(b){if(b&1)r^=a;b>>=1;a<<=1;if(a&8)a^=11;}return r;}
  function pow(a,n){let r=1;for(let i=0;i<n;i++)r=mul(r,a);return r;}
  function factor(exponents){let c=[1];for(const s of exponents){const next=Array(c.length+1).fill(0);for(let i=0;i<c.length;i++){next[i]^=mul(c[i],pow(2,s));next[i+1]^=c[i];}c=next;}return c;}
  assert.deepEqual(factor([1,2,4]),[1,1,0,1]);assert.deepEqual(factor([3,6,5]),[1,0,1,1]);
  fs.writeFileSync('_build/cyclotomic-preview-validation.json',JSON.stringify({parameterCases:cases,circleMultipliers:6,manualSteps:true,autoplay:true,reset:true,orbitSteps:true,classroomState:true,themes:['light','dark'],mobile:true,invalidInput:true,factorizationVerified:true,errors},null,2));
  console.log(`Passed: ${cases} orbit parameter cases, all six circle multipliers, stepping, playback, reset, classroom state, themes, mobile and exact F8 factorization.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
