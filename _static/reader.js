document.addEventListener('DOMContentLoaded',()=>{
const lines=[...document.querySelectorAll('.source-line')]; let current=-1; lines.forEach((l,i)=>{l.dataset.line=`第 ${i+1} 段`;l.setAttribute('tabindex','0');l.addEventListener('keydown',e=>{if(e.key==='Enter')l.click()})});
const key='finitefields:'+location.pathname; const out=document.querySelector('#reader-position');
function safeGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function safeSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function focus(i,scroll=true){if(!lines.length)return;current=Math.max(0,Math.min(lines.length-1,i));lines.forEach((l,j)=>l.classList.toggle('is-active',j===current));if(out)out.textContent=`${current+1} / ${lines.length} 段`;if(scroll){lines[current].focus({preventScroll:true});lines[current].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}safeSet(key,current)}
lines.forEach((l,i)=>l.addEventListener('click',e=>{if(!e.target.closest('a,summary,button,textarea'))focus(i,false)}));
document.querySelector('#reader-prev')?.addEventListener('click',()=>focus(current<0?0:current-1));document.querySelector('#reader-next')?.addEventListener('click',()=>focus(current+1));
document.querySelector('#reader-notes')?.addEventListener('click',e=>{document.body.classList.toggle('hide-notes');e.target.setAttribute('aria-pressed',document.body.classList.contains('hide-notes'));e.target.textContent=document.body.classList.contains('hide-notes')?'显示注释':'隐藏注释'});
document.querySelector('#reader-reset')?.addEventListener('click',()=>focus(0));
document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,button,a,summary,[contenteditable]')||!e.target.closest('.source-line')||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();focus(current+(e.key==='ArrowDown'?1:-1))}});
const stored=Number(safeGet(key));if(lines.length)focus(Number.isFinite(stored)?stored:0,false);
document.querySelectorAll('.local-note').forEach(t=>{const k=key+':'+t.dataset.page;let saved=safeGet(k);
 if(saved===null&&t.dataset.legacyPages){const legacy=t.dataset.legacyPages.split(',').map(p=>safeGet(key+':'+p)).filter(v=>v&&v.trim());saved=legacy.join('\n\n---\n\n');if(saved)safeSet(k,saved);}
 t.value=saved||'';t.addEventListener('input',()=>safeSet(k,t.value));
});
document.querySelectorAll('.export-notes').forEach(b=>b.addEventListener('click',()=>{const note=b.parentElement.querySelector('.chapter-note')||document.querySelector('.chapter-note');if(!note)return;const blob=new Blob([document.querySelector('h1')?.textContent+'\n\n'+note.value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=location.pathname.split('/').pop().replace('.html','')+'-notes.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}));
document.querySelectorAll('.quiz button').forEach(b=>b.addEventListener('click',()=>{const box=b.closest('.quiz');const feedback=box.querySelector('.quiz-feedback');window.MathJax?.typesetClear?.([feedback]);feedback.classList.add('math');feedback.textContent=b.dataset.correct==='yes'?'回答正确。'+box.dataset.explain:'再想一想：'+box.dataset.hint;if(window.MathJax?.typesetPromise)window.MathJax.startup.promise.then(()=>window.MathJax.typesetPromise([feedback])).catch(()=>{})}));
function mul(a,b,m,mod){let r=0;while(b){if(b&1)r^=a;b>>=1;a<<=1;if(a&(1<<m))a^=mod}return r}
function pow(a,n,m,mod){let r=1;while(n){if(n&1)r=mul(r,a,m,mod);a=mul(a,a,m,mod);n=Math.floor(n/2)}return r}
function pol(a){if(!a)return '0';const ts=[];for(let i=0;i<16;i++)if(a&(1<<i))ts.unshift(i===0?'1':i===1?'x':`x^${i}`);return ts.join(' + ')}
document.querySelectorAll('.ff-widget:not(.cyclic-widget)').forEach(w=>{const run=()=>{const [m,mod]=w.querySelector('.field').value.split(',').map(Number);const q=1<<m,a=Number(w.querySelector('.operand-a').value),b=Number(w.querySelector('.operand-b').value);const o=w.querySelector('.result');if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=q||b>=q){o.textContent=`请输入 0 到 ${q-1} 的整数编码。`;return}let trace=0,t=a;for(let i=0;i<m;i++){trace^=t;t=mul(t,t,m,mod)}const orbit=[];t=a;do{orbit.push(t);t=mul(t,t,m,mod)}while(t!==a&&orbit.length<m);let order='0 不在乘法群中';if(a){for(let k=1;k<q;k++)if(pow(a,k,m,mod)===1){order=k;break}}o.textContent=`GF(2^${m})，模多项式 ${pol(mod)}\na = ${a} = ${pol(a)}\nb = ${b} = ${pol(b)}\na + b = ${a^b} = ${pol(a^b)}\na × b = ${mul(a,b,m,mod)} = ${pol(mul(a,b,m,mod))}\na ÷ b = ${b?mul(a,pow(b,q-2,m,mod),m,mod):'未定义（除数为 0）'}\nord(a) = ${order}\n绝对迹 Tr(a) = ${trace}\n绝对范数 N(a) = ${a?1:0}\nFrobenius 轨道：${orbit.join(' → ')}\n极小多项式次数 = 轨道长度 = ${orbit.length}`};w.querySelector('button').addEventListener('click',run);w.querySelector('.field').addEventListener('change',run);run()});
});

// Additive cyclic groups: enumerate the subgroup until its first return to zero.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cyclic-widget').forEach(widget => {
    const modulus = widget.querySelector('.cyclic-n');
    const element = widget.querySelector('.cyclic-a');
    const result = widget.querySelector('.cyclic-result');
    function run() {
      const n = Number(modulus.value), a = Number(element.value);
      if (!modulus.value.trim() || !Number.isInteger(n) || n < 2 || n > 30) {
        result.textContent = '请输入 2 到 30 的整数模数。'; return;
      }
      element.max = String(n - 1);
      if (!element.value.trim() || !Number.isInteger(a) || a < 0 || a >= n) {
        result.textContent = `请输入 0 到 ${n - 1} 的整数元素。`; return;
      }
      const subgroup = []; let value = 0;
      do { subgroup.push(value); value = (value + a) % n; } while (value !== 0);
      result.textContent = `模 ${n} 加法群，群的阶 = ${n}\n累加轨道：${[...subgroup, 0].join(' → ')}\n生成子群：{${subgroup.join(', ')}}\n元素 ${a} 的阶 = ${subgroup.length}\n加法逆元 = ${(n - a) % n}\n${a} ${subgroup.length === n ? '是' : '不是'}整个群的生成元。`;
    }
    widget.querySelector('.cyclic-run').addEventListener('click', run);
    [modulus, element].forEach(input => {
      input.addEventListener('input', run);
      input.addEventListener('keydown', event => { if (event.key === 'Enter') run(); });
    });
    run();
  });
});
