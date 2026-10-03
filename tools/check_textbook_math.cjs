const {chromium}=require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const fixtures=JSON.parse(fs.readFileSync('finite-fields-book/_build/chapter-review/math-fixtures.json','utf8'));
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});let cases=0;
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const load=async n=>{await page.goto(`http://127.0.0.1:8765/chapters/c${String(n).padStart(2,'0')}.html`);await page.locator('.lesson-result').waitFor();};
  const set=async values=>page.evaluate(values=>{const inputs=[...document.querySelectorAll('.lesson-controls input')];values.forEach((v,i)=>inputs[i].value=String(v));inputs[0].dispatchEvent(new Event('input',{bubbles:true}));return document.querySelector('.lesson-result').textContent;},values);
  const choose=async(index,value)=>page.evaluate(([i,v])=>{const el=document.querySelectorAll('.lesson-controls select')[i];el.value=String(v);el.dispatchEvent(new Event('change',{bubbles:true}));},[index,value]);
  const rows=async()=>page.locator('.lesson-table tbody tr').evaluateAll(rs=>rs.map(r=>[...r.children].map(c=>c.textContent)));
  await load(2);
  for(let n=2;n<=14;n++)for(let a=0;a<n;a++){
   await set([n,a]);const r=await rows(),sets=r.map(x=>x[1].split(', ').map(Number)),flat=sets.flat();
   assert.equal(new Set(flat).size,n);assert.equal(flat.length,n);assert.equal(new Set(sets.map(s=>s.length)).size,1);assert.equal(sets.length*sets[0].length,n);cases++;
  }
  await load(4);
  for(let n=2;n<=20;n++){
   await set([n]);for(const row of await rows()){const a=Number(row[0]);if(row[2]!=='不存在')assert.equal(a*Number(row[2])%n,1);else if(a)assert.notEqual(Number(row[1]),1);}cases++;
  }
  await load(5);for(const f of fixtures.gcd){const out=await set([f.a,f.b]);assert.ok(out.includes(`gcd(f,g) = ${f.expected}\n`),JSON.stringify(f));cases++;}
  await load(6);for(const f of fixtures.irreducible){const out=await set([f.f]);assert.equal(/\n不可约：/.test(out),f.expected,JSON.stringify(f));cases++;}
  await load(7);await choose(0,3);
  for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){await set([a,b,c]);assert.deepEqual((await rows()).slice(0,3).map(r=>Number(r[1])),[a,b,c]);cases++;}
  const fieldInput=async f=>{await choose(1,f.a?'power':'zero');if(f.a)await set([f.exponent]);};
  const tex=async label=>page.locator('.lesson-result p').filter({hasText:label}).locator('[data-tex]').first().getAttribute('data-tex');
  const name=a=>a===0?'0':a===1?'1':a===2?'\\alpha':`\\alpha^{${fixtures.field.find(f=>f.a===a).exponent}}`;
  await load(8);for(const f of fixtures.field){await fieldInput(f);assert.equal(await tex('极小多项式：'),f.minimal);assert.match(await page.locator('.lesson-result').innerText(),new RegExp(`极小多项式次数：${f.degree}`));cases++;}
  await load(9);assert.match(await set([fixtures.field.find(f=>f.a===15).exponent]),/幂基坐标（从常数项开始）：\(1, 1, 1, 1\)/);cases++;
  await load(10);assert.equal(await page.locator('.subfield-node').count(),8);cases++;
  await load(11);for(const f of fixtures.field){await fieldInput(f);assert.equal(await page.locator('.primitive-verdict').innerText(),f.order===15?'是':'否');cases++;}
  await load(12);for(const f of fixtures.field){await fieldInput(f);assert.match(await page.locator('.lesson-result').innerText(),new RegExp(`重复 ${4/f.degree} 次`));cases++;}
  await load(13);for(const f of fixtures.field){await fieldInput(f);assert.equal(await tex('迹：'),`\\operatorname{Tr}(a)=${name(f.trace)}`);cases++;}
  await choose(2,4);for(const f of fixtures.field){await fieldInput(f);assert.equal(await tex('迹：'),`\\operatorname{Tr}(a)=${name(f.relative_trace)}`);assert.equal(await tex('范数：'),`\\operatorname{N}(a)=${name(f.relative_norm)}`);cases++;}
  await load(14);const exponents=[0,0,1,2];for(let a=0;a<4;a++)for(let b=0;b<4;b++){await choose(0,a?'power':'zero');await choose(1,b?'power':'zero');const out=await set([exponents[a],exponents[b]]);assert.equal(out.includes('这两个元素构成一组基。'),!!a&&!!b&&a!==b);cases++;}
  await load(15);await set([8]);assert.equal((await rows()).length,2);assert.match(await page.locator('.lesson-result').innerText(),/每个次数 2/);cases++;
  await set([3]);assert.match(await page.locator('.lesson-result').innerText(),/特征 3 整除/);cases++;
  await set([1]);assert.match(await page.locator('.lesson-result').innerText(),/唯一单位根为 1/);cases++;
  await load(16);const table=await rows();assert.equal(table.length,15);assert.equal(table[4][1],'3');assert.equal(table[10][1],'7');assert.equal(table[14][1],'9');cases+=3;
  await load(17);await choose(0,2);await choose(1,2);const out=await set([2]);assert.match(out,/零点 4 个/);assert.match(out,/次数条件不成立/);cases++;
  await load(18);await page.locator('.lesson-controls input').nth(0).fill('6,6');await page.locator('.lesson-controls input').nth(1).fill('2');assert.match(await page.locator('.lesson-result').innerText(),/A\+B = \{1\}/);cases++;
  await load(19);await choose(0,2);await choose(1,2);assert.match(await set([2,3]),/实际概率 = 1，理论上界 = 1/);cases++;
  await page.locator('.lesson-controls button').click();assert.match(await page.locator('.lesson-widget p[aria-live]').innerText(),/f\(x,y\)=0/);cases++;
  for(const n of [2,5,6,7,8,9,10,11,12,13,14,15,16,17,19]){await load(n);const first=page.locator('.lesson-controls input').first();await first.fill('');assert.equal(await page.locator('.lesson-error').count(),1);cases++;}
  assert.deepEqual(errors,[]);
  fs.writeFileSync('finite-fields-book/_build/textbook-math-validation.json',JSON.stringify({cases,pythonFixtures:'original finitefield.py',allPassed:true,browserErrors:errors},null,2));
  console.log(`${cases} independent mathematical and invalid-input cases passed.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
