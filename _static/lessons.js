/* Chapter-specific experiments. All calculations are local and use exact finite arithmetic. */
document.addEventListener('DOMContentLoaded', () => {
 const mod=(a,p)=>((a%p)+p)%p;
 const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
 const degree=a=>a===0?-1:31-Math.clz32(a);
 const binpoly=a=>a===0?'0':Array.from({length:degree(a)+1},(_,i)=>i).reverse().filter(i=>(a>>>i)&1).map(i=>i===0?'1':i===1?'x':`x^${i}`).join(' + ');
 function divide(a,b){if(!b)throw Error('除式不能为零。');let q=0,r=a;while(r&&degree(r)>=degree(b)){const k=degree(r)-degree(b);q^=1<<k;r^=b<<k;}return[q,r];}
 function binaryMultiply(a,b){let r=0;while(b){if(b&1)r^=a;a<<=1;b>>>=1;}return r;}
 function irreducible(a){const d=degree(a);if(d<1)return false;for(let k=1;k<=Math.floor(d/2);k++)for(let f=1<<k;f<(1<<(k+1));f++)if(divide(a,f)[1]===0)return false;return true;}
 const phi=n=>Array.from({length:n},(_,i)=>i+1).filter(i=>gcd(i,n)===1).length;
 const divisors=n=>Array.from({length:n},(_,i)=>i+1).filter(i=>n%i===0);
 function field(m,f={2:7,4:19,8:283}[m]){const q=1<<m;
  const mul=(a,b)=>{let r=0;while(b){if(b&1)r^=a;b>>>=1;a<<=1;if(a&q)a^=f;}return r;};
  const pow=(a,n)=>{let r=1;while(n){if(n%2)r=mul(r,a);a=mul(a,a);n=Math.floor(n/2);}return r;};
  const orbit=(a,base=2)=>{const o=[];let v=a;do{o.push(v);v=pow(v,base);}while(v!==a);return o;};
  const trace=(a,base=2)=>{let t=0,v=a;const steps=Math.round(m/Math.log2(base));for(let i=0;i<steps;i++){t^=v;v=pow(v,base);}return t;};
  const order=a=>{if(!a)return 0;let v=1;for(let k=1;k<q;k++){v=mul(v,a);if(v===1)return k;}throw Error('乘法阶计算失败。');};
  const minimal=a=>{let coeff=[1];for(const v of orbit(a)){const next=Array(coeff.length+1).fill(0);coeff.forEach((c,i)=>{next[i]^=mul(c,v);next[i+1]^=c;});coeff=next;}if(coeff.some(c=>c>1))throw Error('极小多项式系数未落在 F₂。');return coeff.reduce((b,c,i)=>b|(c<<i),0);};
  return{m,f,q,mul,pow,orbit,trace,order,minimal};
 }
 const el=(tag,text,parent,attrs={})=>{const e=document.createElement(tag);if(text!==null)e.textContent=text;Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));parent.append(e);return e;};
 function input(parent,label,value,min,max){const l=el('label',label+' ',parent);return el('input',null,l,{type:'number',value,min,max,step:1});}
 function textInput(parent,label,value){const l=el('label',label+' ',parent);return el('input',null,l,{type:'text',value});}
 function select(parent,label,options){const l=el('label',label+' ',parent);const s=el('select',null,l);options.forEach(([v,t])=>el('option',t,s,{value:v}));return s;}
 const math=(parent,tex)=>el('span',`\\(${tex}\\)`,parent,{class:'mathjax_process','data-tex':tex});
 function powerControls(parent,name,initial=1){const mode=select(parent,`元素 ${name}`, [['power',`${name} = α^k`],['zero',`${name} = 0`]]),exponent=input(parent,`${name} 的指数 k`,initial,0,254);return{mode,exponent,read(F){exponent.max=F.q-2;exponent.disabled=mode.value==='zero';return mode.value==='zero'?0:F.pow(2,integer(exponent,0,F.q-2));}};}
 function powerNames(F){const names=new Map([[0,'0'],[1,'1']]);let value=1;for(let k=1;k<F.q-1;k++){value=F.mul(value,2);names.set(value,k===1?'\\alpha':`\\alpha^{${k}}`);}return a=>names.get(a);}
 function integer(input,min,max){const n=Number(input.value);if(!input.value.trim()||!Number.isInteger(n)||n<min||n>max)throw Error(`请输入 ${min} 到 ${max} 的整数。`);return n;}
 function list(input,p){const raw=input.value.trim();if(!raw)throw Error('请输入至少一个元素，以逗号或空格分隔。');const vals=raw.split(/[,，\s]+/).map(Number);if(vals.length>20||vals.some(n=>!Number.isInteger(n)||n<0||n>=p))throw Error(`最多输入 20 个元素，每个为 0 到 ${p-1} 的整数。`);return [...new Set(vals)];}
 function table(parent,headers,rows){const t=el('table',null,parent,{class:'lesson-table'});const h=el('tr',null,el('thead',null,t));headers.forEach(x=>el('th',String(x),h,{scope:'col'}));const body=el('tbody',null,t);rows.forEach(row=>{const tr=el('tr',null,body);row.forEach(v=>el('td',String(v),tr));});return t;}
 document.querySelectorAll('.lesson-widget').forEach(w=>{
  const kind=w.dataset.kind;
  const controls=el('div',null,w,{class:'lesson-controls'}), output=el(['subfields','primitive','minimal','conjugates','trace','basis'].includes(kind)?'div':'pre','',w,{'aria-live':'polite',class:'lesson-result'}), visual=el('div',null,w,{class:'lesson-visual'});
  let compute;
  if(['cosets','cyclic','residues'].includes(kind)){
   const n=input(controls,'模数 n',kind==='cyclic'?12:kind==='cosets'?12:6,2,30);
   const a=kind==='residues'?null:input(controls,kind==='cosets'?'子群生成元 a':'元素 a',kind==='cosets'?4:8,0,29);
   compute=()=>{
    const N=integer(n,2,30);
    if(kind==='residues'){
     const rows=Array.from({length:N},(_,v)=>{const inv=Array.from({length:N},(_,b)=>b).find(b=>v*b%N===1);const annihilators=Array.from({length:N-1},(_,b)=>b+1).filter(b=>v*b%N===0);return[v,gcd(v,N),inv===undefined?'不存在':inv,v===0?'零元素':annihilators.length?`零因子；与 ${annihilators.join(', ')} 相乘为 0`:'非零非零因子'];});
     output.textContent=`Z/${N}Z 的特征 = ${N}。\n单位共有 φ(${N}) = ${phi(N)} 个；是否为域：${divisors(N).length===2?'是，模数为素数':'否，模数为合数'}。`;
     table(visual,['元素','与模数的 gcd','乘法逆元','零因子判别'],rows);return;
    }
    a.max=N-1;const A=integer(a,0,N-1),d=gcd(N,A),H=Array.from({length:N/d},(_,i)=>(i*A)%N);
    if(kind==='cosets'){
     const unused=new Set(Array.from({length:N},(_,i)=>i)),rows=[];
     while(unused.size){const r=unused.values().next().value;const coset=H.map(h=>(r+h)%N).sort((x,y)=>x-y);coset.forEach(x=>unused.delete(x));rows.push([`${r} + H`,coset.join(', '),coset.length]);}
     output.textContent=`H = ⟨${A}⟩ = {${H.slice().sort((x,y)=>x-y).join(', ')}}\n群的阶 ${N} = 子群阶 ${H.length} × 指标 ${rows.length}。\n陪集互不相交，并覆盖全部元素。`;
     table(visual,['陪集代表元','陪集元素','大小'],rows);
    }else{
     output.textContent=`ord(${A}) = ${N}/gcd(${N},${A}) = ${H.length}\n生成子群：{${H.join(', ')}}\n全群生成元：${Array.from({length:N},(_,i)=>i).filter(i=>gcd(i,N)===1).join(', ')}。`;
     table(visual,['子群阶 f','唯一子群的生成元 n/f','子群的生成元个数 φ(f)'],divisors(N).map(f=>[f,N/f,phi(f)]));
    }
   };
  }else if(['division','irreducible'].includes(kind)){
   el('p','整数的二进制位是 F₂ 多项式系数：19 对应 x⁴+x+1，7 对应 x²+x+1。这里的加减法均为 XOR。',w);
   const a=input(controls,'多项式 f 的编码',19,kind==='division'?0:2,511);
   const b=kind==='division'?input(controls,'多项式 g 的编码',7,1,511):null;
   compute=()=>{
    const A=integer(a,kind==='division'?0:2,511);
    if(kind==='irreducible'){
     const factors=[];for(let k=1;k<=Math.floor(degree(A)/2);k++)for(let f=1<<k;f<(1<<(k+1));f++)if(divide(A,f)[1]===0)factors.push([binpoly(f),binpoly(divide(A,f)[0])]);
     output.textContent=`f = ${binpoly(A)}\n次数 = ${degree(A)}\n${irreducible(A)?'不可约：不存在次数不超过一半的非平凡因子。':'可约：下面给出非平凡因式分解。'}\n在 F₂ 上的取值：f(0) = ${A&1}，f(1) = ${A.toString(2).split('').reduce((v,c)=>v^Number(c),0)}。\n无根仅对二次、三次多项式足以推出不可约。`;
     if(factors.length)table(visual,['因子','对应商'],factors);
    }else{
     const B=integer(b,1,511);let x=A,y=B,rows=[],ux=1,vx=0,uy=0,vy=1;
     while(y){const[q,r]=divide(x,y);rows.push([binpoly(x),binpoly(y),binpoly(q),binpoly(r)]);[x,y]=[y,r];[ux,uy]=[uy,ux^binaryMultiply(q,uy)];[vx,vy]=[vy,vx^binaryMultiply(q,vy)];}
     output.textContent=`f = ${binpoly(A)}\ng = ${binpoly(B)}\ngcd(f,g) = ${binpoly(x)}\nu = ${binpoly(ux)}，v = ${binpoly(vx)}\nu·f + v·g = ${binpoly(binaryMultiply(ux,A)^binaryMultiply(vx,B))}（Bézout 等式）。`;
     table(visual,['被除式','除式','商','余式'],rows);
    }
   };
  }else if(kind==='interpolation'){
   const p=select(controls,'系数域',[[7,'F₇'],[3,'F₃'],[5,'F₅'],[11,'F₁₁']]);const ys=[1,4,2].map((v,i)=>input(controls,`f(${i})`,v,0,10));
   compute=()=>{const P=Number(p.value),Y=ys.map(x=>{x.max=P-1;return integer(x,0,P-1);});const inv=a=>Array.from({length:P-1},(_,i)=>i+1).find(b=>mod(a*b,P)===1);let c=[0,0,0];
    for(let i=0;i<3;i++){let poly=[1],den=1;for(let j=0;j<3;j++)if(j!==i){let next=Array(poly.length+1).fill(0);poly.forEach((v,k)=>{next[k]=mod(next[k]-j*v,P);next[k+1]=mod(next[k+1]+v,P);});poly=next;den=mod(den*(i-j),P);}poly.forEach((v,k)=>c[k]=mod(c[k]+Y[i]*v*inv(den),P));}
    output.textContent=`F${P} 上唯一的次数不超过 2 的插值多项式：\nf(x) = ${c[2]}x² + ${c[1]}x + ${c[0]}。\n所有系数和取值按模 ${P} 计算。`;
    table(visual,['x','f(x)','是否为指定节点'],Array.from({length:P},(_,i)=>[i,mod(c[0]+c[1]*i+c[2]*i*i,P),i<3?'是':'否']));
   };
  }else if(kind==='coordinates'){
   const m=select(controls,'扩域模型',[[4,'GF(16)，α⁴+α+1=0'],[2,'GF(4)，α²+α+1=0'],[8,'GF(256)，α⁸+α⁴+α³+α²+1=0']]);
   const mode=select(controls,'元素 a', [['power','非零元素 a = α^k'],['zero','零元素 a = 0']]);
   const exponent=input(controls,'指数 k（a = α^k）',1,0,14);
   compute=()=>{const M=Number(m.value),F=field(M,M===8?285:undefined),zero=mode.value==='zero';exponent.max=F.q-2;exponent.disabled=zero;
    const k=zero?null:integer(exponent,0,F.q-2),A=zero?0:F.pow(2,k),coordinates=Array.from({length:F.m},(_,i)=>(A>>i)&1);
    output.textContent=`GF(2^${F.m}) / F₂ 的扩张次数 = ${F.m}，元素个数 = ${F.q}。\n本实验采用本原多项式模型：${binpoly(F.f).replaceAll('x','α')} = 0。\nα 的乘法阶为 ${F.q-1}；α^0 = 1，α^${F.q-1} = 1，零元素单独选择。\n幂基：(${Array.from({length:F.m},(_,i)=>i===0?'1':i===1?'α':`α^${i}`).join(', ')})。\n${zero?'a = 0':`a = α^${k}`} = ${binpoly(A).replaceAll('x','α')}\n幂基坐标（从常数项开始）：(${coordinates.join(', ')})。\n任意非零元素的指数按 ${F.q-1} 取模；输入范围为 0 到 ${F.q-2}。\n一般定义元不一定是本原元；这里特意选择本原元 α，以使其整数幂覆盖全部非零元素。`;
    table(visual,['基向量','坐标（F₂ 中）'],coordinates.map((c,i)=>[i===0?'1':i===1?'α':`α^${i}`,c]));
   };
  }else if(kind==='primitive'){
   const m=select(controls,'扩域模型',[[4,'GF(16)，α⁴+α+1=0'],[2,'GF(4)，α²+α+1=0'],[8,'GF(256)，α⁸+α⁴+α³+α²+1=0']]);
   const mode=select(controls,'元素 a',[['power','非零元素 a = α^k'],['zero','零元素 a = 0']]);
   const exponent=input(controls,'指数 k（a = α^k）',1,0,14);
   const math=(parent,tex)=>el('span',`\\(${tex}\\)`,parent,{class:'mathjax_process','data-tex':tex});
   compute=()=>{const M=Number(m.value),F=field(M,M===8?285:undefined),N=F.q-1,zero=mode.value==='zero';exponent.max=N-1;exponent.disabled=zero;
    const k=zero?null:integer(exponent,0,N-1),A=zero?0:F.pow(2,k),ord=F.order(A),isPrimitive=A!==0&&ord===N;
    const poly=(value,variable='\\alpha')=>binpoly(value).replaceAll('x',variable),line=text=>el('p',text,output);
    output.replaceChildren();
    math(line('本实验选用本原多项式模型：'),`${poly(F.f)}=0`);
    const definition=line('其中 ');math(definition,'\\alpha');definition.append(` 的乘法阶为 ${N}，它的幂覆盖全部 ${N} 个非零元素。`);
    math(line('当前元素：'),zero?'a=0':`a=\\alpha^{${k}}=${poly(A)}`);
    const orderLine=line('乘法阶：');el('strong',zero?'未定义（零元素）':String(ord),orderLine,{class:'primitive-order'});
    const resultLine=line('是否为本原元：');el('strong',isPrimitive?'是':'否',resultLine,{class:'primitive-verdict'});
    const minimalLine=line('极小多项式：');math(minimalLine,poly(F.minimal(A),'x'));minimalLine.append(`；是否生成整个域扩张：${degree(F.minimal(A))===F.m?'是':'否'}。`);
    line(`本原元共有 ${phi(N)} 个。`);
    if(zero){line('零元素不属于乘法群，不能使用非零元素的本原元判别。');}
    else{
     const explanation=line('在本实验所选模型中，');math(explanation,`\\operatorname{ord}(\\alpha^k)=\\frac{${N}}{\\gcd(k,${N})}`);explanation.append('，因此 ');math(explanation,`\\alpha^k`);explanation.append(' 是本原元当且仅当 ');math(explanation,`\\gcd(k,${N})=1`);explanation.append('。');
     const primes=divisors(N).filter(d=>d>1&&divisors(d).length===2);
     const t=table(visual,['q−1 的素因子 ℓ','本原元判别计算','是否不等于 1'],primes.map(l=>[l,'',F.pow(A,N/l)!==1?'是':'否']));
     [...t.querySelectorAll('tbody tr')].forEach((tr,i)=>math(tr.children[1],`a^{${N/primes[i]}}=${poly(F.pow(A,N/primes[i]))}`));
    }
    const note=line('注意：');math(note,'\\alpha^0=1');note.append(`；指数按 ${N} 取模。零元素需单独选择。一般的代数定义元未必是本原元，本实验特意选取了本原元 α。`);
    if(window.MathJax?.typesetPromise)window.MathJax.startup.promise.then(()=>window.MathJax.typesetPromise([output,visual])).catch(()=>{});
   };
  }else if(['minimal','conjugates','trace'].includes(kind)){
   const m=select(controls,'扩域模型',[[4,'GF(16)，α⁴+α+1=0'],[2,'GF(4)，α²+α+1=0'],[8,'GF(256)，α⁸+α⁴+α³+α²+1=0']]);
   const a=powerControls(controls,'a');const base=kind==='trace'?select(controls,'基域',[[2,'F₂（绝对迹与范数）'],[4,'GF(4)（相对迹与范数）']]):null;
   compute=()=>{const M=Number(m.value),F=field(M,M===8?285:undefined),A=a.read(F),name=powerNames(F),Q=base?Number(base.value):2,steps=F.m/Math.log2(Q),orbit=F.orbit(A,Q);
    output.replaceChildren();const line=text=>el('p',text,output);
    math(line('本原多项式模型：'),`${binpoly(F.f).replaceAll('x','\\alpha')}=0`);line(`α 的乘法阶为 ${F.q-1}；α⁰ = 1，零元素单独选择。`);
    math(line('当前元素：'),`a=${name(A)}=${binpoly(A).replaceAll('x','\\alpha')}`);
    if(kind==='trace'){
     const terms=Array.from({length:steps},(_,i)=>F.pow(A,Q**i)),tr=terms.reduce((v,x)=>v^x,0),norm=terms.reduce((v,x)=>F.mul(v,x),1);
     line(`扩张 GF(${F.q}) / GF(${Q}) 的次数：${steps}；不同共轭元个数：${orbit.length}。`);
     math(line('迹：'),`\\operatorname{Tr}(a)=${name(tr)}`);math(line('范数：'),`\\operatorname{N}(a)=${name(norm)}`);math(line('单位元的迹：'),`\\operatorname{Tr}(1)=${steps%2}`);
     const subfield=line('基域在本模型中的元素：');Array.from({length:F.q},(_,i)=>i).filter(i=>F.pow(i,Q)===i).forEach((v,i)=>{if(i)subfield.append('，');math(subfield,name(v));});subfield.append('。相对迹与范数都属于这个子域。');
     const t=table(visual,['共轭项编号 j','共轭元（按扩张次数列出）'],terms.map((v,i)=>[i,'']));[...t.querySelectorAll('tbody tr')].forEach((row,i)=>math(row.children[1],`a^{${Q}^{${i}}}=${name(terms[i])}`));
    }else{
     const minimal=F.minimal(A);math(line('极小多项式：'),binpoly(minimal));line(`极小多项式次数：${degree(minimal)}；所在扩域次数：${F.m}。`);
     line(`不同 Frobenius 共轭元个数：${orbit.length}；在完整的 ${F.m} 项序列中，每个不同共轭重复 ${F.m/orbit.length} 次。`);
     const t=table(visual,['j','Frobenius 共轭','幂基表达式'],Array.from({length:F.m},(_,j)=>[j,'','']));[...t.querySelectorAll('tbody tr')].forEach((row,j)=>{const value=orbit[j%orbit.length];math(row.children[1],`a^{2^{${j}}}=${name(value)}`);math(row.children[2],binpoly(value).replaceAll('x','\\alpha'));});
    }
   };
  }else if(kind==='encoding'){
   const m=select(controls,'扩域模型',[[4,'GF(16)，x⁴+x+1'],[2,'GF(4)，x²+x+1'],[8,'GF(256)，x⁸+x⁴+x³+x+1']]),a=input(controls,'元素 a 的系数位串编码',2,0,255);
   compute=()=>{const F=field(Number(m.value));a.max=F.q-1;const A=integer(a,0,F.q-1),generator=Array.from({length:F.q-1},(_,i)=>i+1).find(v=>F.order(v)===F.q-1);let powers=[],v=1;for(let i=0;i<F.q-1;i++){powers.push(v);v=F.mul(v,generator);}
    output.textContent=`输入的是系数位串的存储编码，不是域中的普通整数。\na 的编码 = ${A}，位串 = ${A.toString(2).padStart(F.m,'0')}，多项式 = ${binpoly(A)}。\n本表基于生成元编码 ${generator}（${binpoly(generator)}）。\nlog(a) = ${A?powers.indexOf(A):'未定义（零元素）'}；指数按 ${F.q-1} 取模。\n域加法为 XOR；不要使用整数编码的普通加法。`;
    table(visual,['指数 i','生成元的 i 次幂编码','位串','多项式'],powers.map((v,i)=>[i,v,v.toString(2).padStart(F.m,'0'),binpoly(v)]));
   };
  }else if(kind==='subfields'){
   const p=select(controls,'特征 p',[[2,'2'],[3,'3'],[5,'5']]),n=input(controls,'次数 n',30,1,60);
   compute=()=>{const P=Number(p.value),N=integer(n,1,60),ds=divisors(N);
    output.classList.add('mathjax_process');
    output.textContent=`\\(\\mathbb F_{${P}^{${N}}}\\) 的子域与 \\(n=${N}\\) 的正因子一一对应。\n\\(\\mathbb F_{p^a}\\subseteq\\mathbb F_{p^b}\\) 当且仅当 \\(a\\mid b\\)。\n每个子域由 \\(x^{p^d}=x\\) 的根集给出，在固定代数闭包中唯一。`;
    if(window.MathJax?.typesetPromise)window.MathJax.startup.promise.then(()=>window.MathJax.typesetPromise([output])).catch(()=>{});
    visual.classList.add('subfield-visual');
    const rank=d=>{let r=0;for(let p=2;p<=d;p++)while(d%p===0){d/=p;r++;}return r;};
    const levels=Array.from({length:rank(N)+1},(_,i)=>ds.filter(d=>rank(d)===i));
    const width=Math.max(340,(Math.max(...levels.map(l=>l.length))+1)*116),height=levels.length*102+16;
    const svgNS='http://www.w3.org/2000/svg';
    const svgEl=(tag,parent,attrs={},text)=>{const e=document.createElementNS(svgNS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;parent.append(e);return e;};
    const svg=svgEl('svg',visual,{viewBox:`0 0 ${width} ${height}`,class:'subfield-diagram',role:'group','aria-label':`F_(${P}^${N}) 的子域包含图：箭头从小子域指向大子域`});
    svgEl('title',svg,{},'子域包含关系图');
    svgEl('desc',svg,{},'节点表示子域，向上的箭头表示包含。省略能由路径推出的连线。点击节点或用 Tab 与回车选择，查看相关子域。');
    const positions=new Map();levels.forEach((level,r)=>level.forEach((d,i)=>positions.set(d,{x:width*(i+1)/(level.length+1),y:height-60-r*102})));
    const defs=svgEl('defs',svg),markerId=`subfield-arrow-${P}-${N}`;
    const marker=svgEl('marker',defs,{id:markerId,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto'});
    svgEl('path',marker,{d:'M 0 0 L 10 5 L 0 10 z',class:'subfield-arrowhead'});
    const edges=[];
    for(const a of ds)for(const b of ds)if(a<b&&b%a===0&&!ds.some(c=>a<c&&c<b&&c%a===0&&b%c===0)){
     const A=positions.get(a),B=positions.get(b);
     const edge=svgEl('path',svg,{d:`M ${A.x} ${A.y-28} L ${B.x} ${B.y+28}`,class:'subfield-edge','data-from':a,'data-to':b,'marker-end':`url(#${markerId})`});edges.push({a,b,edge});
    }
    const nodes=new Map(),detail=el('div',null,visual,{class:'subfield-detail','aria-live':'polite'});
    const tex=d=>`\\mathbb F_{${P}${d===1?'':`^{${d}}`}}`;
    const mathLine=text=>el('p',text,detail,{class:'math'});
    const selectNode=d=>{
     nodes.forEach((node,k)=>{node.classList.toggle('is-selected',k===d);node.classList.toggle('is-contained',k!==d&&d%k===0);node.classList.toggle('is-containing',k!==d&&k%d===0);node.setAttribute('aria-pressed',String(k===d));});
     edges.forEach(({a,b,edge})=>edge.classList.toggle('is-related',(d%a===0&&d%b===0)||(a%d===0&&b%d===0)));
     window.MathJax?.typesetClear?.([detail]);detail.replaceChildren();
     mathLine(`选中子域：\\(${tex(d)}\\)。它在素子域上的次数为 ${d}，原域在它上面的次数为 ${N/d}。`);
     const lower=ds.filter(k=>k<d&&d%k===0),upper=ds.filter(k=>k>d&&k%d===0);
     const listLine=(label,degrees,empty)=>{const line=el('p',label,detail);if(!degrees.length)line.append(empty);degrees.forEach((k,i)=>{if(i)line.append('，');el('span',`\\(${tex(k)}\\)`,line,{class:'math'});});line.append('。');};
     listLine('它包含的真子域：',lower,'无（已是素子域）');
     listLine('包含它的更大子域：',upper,'无（已是原域）');
     if(window.MathJax?.typesetPromise)window.MathJax.startup.promise.then(()=>window.MathJax.typesetPromise([detail])).catch(()=>{});
    };
    for(const d of ds){const {x,y}=positions.get(d);
     const node=svgEl('g',svg,{transform:`translate(${x},${y})`,class:'subfield-node',role:'button',tabindex:0,'data-degree':d,'aria-pressed':'false','aria-label':`选择子域 F_(${P}^${d})，在素子域上的次数 ${d}`});nodes.set(d,node);
     svgEl('rect',node,{x:-53,y:-28,width:106,height:56,rx:10});
     const label=svgEl('text',node,{x:0,y:-5,'text-anchor':'middle',class:'subfield-label'});
     svgEl('tspan',label,{},'𝔽');const sub=svgEl('tspan',label,{dy:5,'font-size':13},String(P));if(d!==1)svgEl('tspan',label,{dy:-5,'font-size':10},String(d));
     svgEl('text',node,{x:0,y:18,'text-anchor':'middle',class:'subfield-degree'},`次数 ${d}`);
     node.addEventListener('click',()=>selectNode(d));node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectNode(d);}});
    }
    el('p','箭头向上表示“小子域包含于大子域”；沿路径也能读出包含关系。点击节点：绿色表示它包含的子域，蓝色表示包含它的子域。',visual,{class:'subfield-legend'});
    selectNode(N);

   };
  }else if(kind==='basis'){
   const a=powerControls(controls,'a',1),b=powerControls(controls,'b',2);
   compute=()=>{const F=field(2),A=a.read(F),B=b.read(F),name=powerNames(F),vs=[A,B],M=vs.map(x=>vs.map(y=>F.trace(F.mul(x,y)))),det=(M[0][0]*M[1][1])^(M[0][1]*M[1][0]);
    output.replaceChildren();const line=text=>el('p',text,output);math(line('域模型：'),'\\mathrm{GF}(4)/\\mathbb F_2,\\quad\\alpha^2=\\alpha+1');math(line('所选向量：'),`a=${name(A)},\\quad b=${name(B)}`);line(`迹矩阵行列式：${det}。${det?'这两个元素构成一组基。':'这两个元素线性相关，不是一组基。'}`);line(`是否为正规基：${det&&B===F.pow(A,2)?'是，第二向量为第一向量的 Frobenius 共轭':'否'}。`);
    table(visual,['迹配对','a','b'],M.map((row,i)=>[i===0?'a':'b',...row]));
    if(det){const dual=vs.map((_,i)=>Array.from({length:4},(_,v)=>v).find(v=>vs.every((x,j)=>F.trace(F.mul(v,x))===(i===j?1:0))));math(line('对偶基：'),`(${dual.map(name).join(',')})`);const t=table(visual,['原基向量','对偶基向量'],vs.map(()=>['','']));[...t.querySelectorAll('tbody tr')].forEach((row,i)=>{math(row.children[0],name(vs[i]));math(row.children[1],name(dual[i]));});}
   };
  }else if(kind==='cyclotomic'){
   const q=select(controls,'基域大小 q',[[3,'3'],[2,'2'],[4,'4'],[5,'5'],[7,'7'],[8,'8'],[9,'9'],[16,'16']]),n=input(controls,'单位根阶 n',8,1,60);
   compute=()=>{const Q=Number(q.value),N=integer(n,1,60),p=Q%2===0?2:Q%3===0?3:Q;
    if(gcd(Q,N)!==1){let M=N,e=0;while(M%p===0){M/=p;e++;}output.textContent=`特征 ${p} 整除 n=${N}，互素情形的因子次数公式不适用。\nx^${N}−1 = (x^${M}−1)^${p**e}。\n不同单位根只有 ${M} 个，每根重数 ${p**e}；不存在乘法阶为 ${N} 的元素。`;return;}
    if(N===1){output.textContent='Q₁(x) = x−1，次数和分裂域次数均为 1；唯一单位根为 1。';return;}
    const remaining=new Set(Array.from({length:N},(_,i)=>i).filter(i=>gcd(i,N)===1)),orbits=[];
    while(remaining.size){const first=remaining.values().next().value;let v=first,o=[];do{o.push(v);remaining.delete(v);v=Q*v%N;}while(v!==first);orbits.push(o);}
    const d=orbits[0].length;
    output.textContent=`ord_${N}(${Q}) = ${d}；φ(${N}) = ${phi(N)}。\nQ_${N} 在 F_${Q} 上分为 ${orbits.length} 个不同不可约因子，每个次数 ${d}。\n分裂域为 F_(${Q}^${d})。以下是本原单位根指数的 q-轨道。`;
    table(visual,['轨道编号','指数轨道','对应因子次数'],orbits.map((o,i)=>[i+1,o.join(' → '),o.length]));
   };
  }else if(['grid','identity'].includes(kind)){
   const p=select(controls,'系数域',[[5,'F₅'],[2,'F₂'],[3,'F₃'],[7,'F₇']]),poly=select(controls,'多项式',[[0,'x+y'],[1,'xy'],[2,'x^p−x（形式非零，函数恒零）']]),size=input(controls,'每个变量的抽样集合大小 k',3,1,7);
   const repeats=kind==='identity'?input(controls,'独立检验次数 t',3,1,20):null;
   let snapshot;
   compute=()=>{const P=Number(p.value),which=Number(poly.value);size.max=P;const K=integer(size,1,P),d=which===0?1:which===1?2:P,dx=which===2?P:1,dy=which===2?0:1;
    const f=(x,y)=>which===0?(x+y)%P:which===1?(x*y)%P:mod(x**P-x,P);
    let zeros=0;const rows=[];for(let x=0;x<K;x++){const row=[x];for(let y=0;y<K;y++){const value=f(x,y);row.push(value);if(value===0)zeros++;}rows.push(row);}
    const bound=Math.min(1,d/K),fraction=zeros/(K*K);snapshot={P,K,f,zeros};
    output.textContent=`S = {0,…,${K-1}}；总次数 d = ${d}；逐变量次数 = (${dx},${dy})。\n网格共有 ${K*K} 个点，零点 ${zeros} 个，实际零点比例 = ${zeros}/${K*K} = ${fraction.toFixed(4)}。\nSchwartz–Zippel 上界 min(1,d/k) = ${bound.toFixed(4)}。\n逐变量根数引理的次数条件${dx<K&&dy<K?'成立':'不成立'}。`;
    if(kind==='identity'){const T=integer(repeats,1,20);output.textContent+=`\n${T} 次独立抽样均取到零的实际概率 = ${fraction**T}，理论上界 = ${bound**T}。\n一次非零取值即可证实形式多项式非零；零取值本身不能证实它是零多项式。`;}else{output.textContent+='\n表格行表示 x，列表示 y；它展示具体取值，不替代组合零点定理的系数条件。';}
    const t=table(visual,['x \\ y',...Array.from({length:K},(_,i)=>i)],rows);t.querySelectorAll('tbody tr').forEach(tr=>[...tr.children].slice(1).forEach(td=>td.classList.add(td.textContent==='0'?'lesson-zero':'lesson-nonzero')));
   };
   if(kind==='identity'){const button=el('button','独立抽样一次',controls,{type:'button'});const sample=el('p','',w,{'aria-live':'polite'});button.addEventListener('click',()=>{try{compute();const x=Math.floor(Math.random()*snapshot.K),y=Math.floor(Math.random()*snapshot.K);sample.textContent=`本次抽样：(x,y)=(${x},${y})，f(x,y)=${snapshot.f(x,y)}。`;}catch(e){sample.textContent=e.message;}});}
  }else if(kind==='sumsets'){
   const p=select(controls,'素数 p',[[7,'7'],[2,'2'],[3,'3'],[5,'5'],[11,'11']]),a=textInput(controls,'集合 A','0,1,2'),b=textInput(controls,'集合 B','0,2,4');
   compute=()=>{const P=Number(p.value),A=list(a,P),B=list(b,P),sums=[...new Set(A.flatMap(x=>B.map(y=>(x+y)%P)))].sort((x,y)=>x-y),bound=Math.min(P,A.length+B.length-1);
    output.textContent=`A = {${A.join(', ')}}，B = {${B.join(', ')}}\nA+B = {${sums.join(', ')}}\n|A+B| = ${sums.length}；Cauchy–Davenport 下界 = ${bound}。\n重复的和只计一次；这是集合，输入中的重复元素已合并。`;
    table(visual,['a \\ b',...B],A.map(x=>[x,...B.map(y=>(x+y)%P)]));
   };
  }else{output.textContent='未知实验类型。';return;}
  const run=()=>{window.MathJax?.typesetClear?.([visual,output]);visual.replaceChildren();try{compute();output.classList.remove('lesson-error');if(['minimal','conjugates','trace','basis'].includes(kind)&&window.MathJax?.typesetPromise)window.MathJax.startup.promise.then(()=>window.MathJax.typesetPromise([output,visual])).catch(()=>{});}catch(e){output.textContent=e.message;output.classList.add('lesson-error');}};
  controls.addEventListener('input',run);controls.addEventListener('change',run);run();
  el('p','所有运算均在浏览器中完成。改变参数可以观察具体例子；数值实验用于理解，证明仍需使用正文中的定理与条件。',w,{class:'lesson-caption'});
 });
});
