/* Exact exponent arithmetic drives both diagrams; angles only illustrate complex roots. */
(() => {
  let serial = 0;
  const ns = 'http://www.w3.org/2000/svg';
  const gcd = (a,b) => b ? gcd(b,a%b) : a;
  const superscript = n => String(n).split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)]).join('');
  const root = s => s === 0 ? '1' : s === 1 ? 'ζ' : `ζ${superscript(s)}`;
  function element(tag, parent, text, attrs={}) {
    const el = document.createElement(tag);
    if (text !== null) el.textContent = text;
    for (const [key,value] of Object.entries(attrs)) el.setAttribute(key,value);
    parent.append(el); return el;
  }
  function svgElement(tag, parent, attrs={}, text=null) {
    const el = document.createElementNS(ns,tag);
    for (const [key,value] of Object.entries(attrs)) el.setAttribute(key,value);
    if (text !== null) el.textContent=text;
    parent.append(el); return el;
  }
  function arrow(svg) {
    const id = `ff-cyclotomic-arrow-${++serial}`;
    const marker = svgElement('marker',svgElement('defs',svg),{id,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse'});
    svgElement('path',marker,{d:'M 0 0 L 10 5 L 0 10 z',class:'cyclotomic-arrowhead'});
    return `url(#${id})`;
  }
  function renderOrbits(parent, orbits, q, n) {
    parent.classList.add('cyclotomic-orbits');
    orbits.forEach((orbit, index) => {
      const card = element('section',parent,null,{class:'cyclotomic-orbit-card','data-length':orbit.length});
      element('h3',card,`轨道 ${index+1}：${orbit.length} 个共轭根 → 一个 ${orbit.length} 次不可约因子`);
      const panel = element('div',card,null,{class:'cyclotomic-diagram-scroll',tabindex:0,'aria-label':`轨道 ${index+1} 图示，可横向滚动`});
      const columns = Math.min(6,orbit.length), rows = Math.ceil(orbit.length/columns);
      const width = Math.max(280,columns*120+40), height = Math.max(180,rows*100+80);
      const svg = svgElement('svg',panel,{viewBox:`0 0 ${width} ${height}`,style:`width:${width}px;height:auto`,class:'cyclotomic-orbit-svg',role:'img','aria-label':`指数轨道 ${[...orbit,orbit[0]].join(' → ')}，每步乘以 ${q} 再模 ${n}`});
      const marker = arrow(svg);
      const points = orbit.map((s,i) => {const row=Math.floor(i/columns), col=i%columns; return {x:80+(row%2 ? columns-1-col : col)*120,y:60+row*100};});
      for(let i=0;i<points.length-1;i++) {
        const a=points[i], b=points[i+1], dx=b.x-a.x, dy=b.y-a.y;
        const trim=Math.min(dx?49/Math.abs(dx):Infinity,dy?27/Math.abs(dy):Infinity);
        svgElement('path',svg,{d:`M ${a.x+dx*trim} ${a.y+dy*trim} L ${b.x-dx*trim} ${b.y-dy*trim}`,class:'cyclotomic-edge','marker-end':marker,'data-step':i});
      }
      const first=points[0], last=points.at(-1);
      const closure = orbit.length === 1
        ? `M ${last.x+49} ${last.y+8} C ${last.x+120} ${last.y+15} ${last.x+120} ${last.y-75} ${last.x+12} ${last.y-28}`
        : `M ${last.x} ${last.y+27} V ${height-22} H ${width-14} V 15 H ${first.x} V ${first.y-28}`;
      svgElement('path',svg,{d:closure,class:'cyclotomic-edge cyclotomic-return','marker-end':marker,'data-step':orbit.length-1});
      points.forEach((point,i)=>{
        const node=svgElement('g',svg,{transform:`translate(${point.x},${point.y})`,class:'cyclotomic-orbit-node','data-exponent':orbit[i]});
        svgElement('rect',node,{x:-47,y:-24,width:94,height:48,rx:9});
        svgElement('text',node,{x:0,y:-1,'text-anchor':'middle',class:'cyclotomic-root-label'},root(orbit[i]));
        svgElement('text',node,{x:0,y:17,'text-anchor':'middle',class:'cyclotomic-exponent-label'},`s = ${orbit[i]}`);
      });
      const controls=element('div',card,null,{class:'cyclotomic-orbit-controls'});
      const next=element('button',controls,'追踪一步 →',{type:'button'});
      const reset=element('button',controls,'复原',{type:'button'});
      const status=element('p',card,'',{'aria-live':'polite',class:'cyclotomic-orbit-status'});
      let current=0, steps=0;
      const update=()=>{
        svg.querySelectorAll('.cyclotomic-orbit-node').forEach((node,i)=>node.classList.toggle('is-current',i===current));
        svg.querySelectorAll('.cyclotomic-edge').forEach((path,i)=>path.classList.toggle('is-current',i===current));
        const from=orbit[current], to=orbit[(current+1)%orbit.length];
        status.textContent=`当前根 ${root(from)}；下一步 ${root(from)} ↦ ${root(to)}，因为 ${q} × ${from} ≡ ${to} (mod ${n})。${steps&&current===0?`已经走完 ${steps} 步并回到起点；本轨道长度为 ${orbit.length}。`:''}`;
        card.dataset.current=String(from);
      };
      next.addEventListener('click',()=>{current=(current+1)%orbit.length;steps++;update();});
      reset.addEventListener('click',()=>{current=0;steps=0;update();});
      update();
    });
  }
  window.FFCyclotomic = {renderOrbits};

  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.cyclotomic-circle').forEach(lab=>{
      const controls=element('div',lab,null,{class:'cyclotomic-circle-controls'});
      const label=element('label',controls,'每次乘以 ');
      const select=element('select',label,null,{'aria-label':'每次乘以的六次单位根'});
      for(let k=0;k<6;k++)element('option',select,k===0?'1 = ζ⁰':k===3?'−1 = ζ³':root(k),{value:k});
      select.value='1';
      const step=element('button',controls,'乘一次 →',{type:'button','data-action':'step'});
      const play=element('button',controls,'自动演示',{type:'button','data-action':'play'});
      const reset=element('button',controls,'复原',{type:'button','data-action':'reset'});
      const status=element('p',lab,'',{'aria-live':'polite',class:'cyclotomic-circle-status'});
      const svg=svgElement('svg',lab,{viewBox:'0 0 560 410',class:'cyclotomic-circle-svg',role:'group','aria-label':'复平面中的六次单位根；点击圆上的点可选择每次乘以的元素'});
      const explanation=element('p',lab,'',{class:'cyclotomic-circle-route'});
      element('p',lab,'实线圆表示复平面的单位圆；箭头表示已执行的乘法。蓝绿色实心点是当前结果。点击圆上的点也可选择乘数。',{class:'lesson-caption'});
      let k=1, steps=0, playing=false, timer=null;
      const coordinates=Array.from({length:6},(_,i)=>({x:280+125*Math.cos(i*Math.PI/3),y:195-125*Math.sin(i*Math.PI/3)}));
      function stop(){clearTimeout(timer);timer=null;playing=false;}
      function render(){
        const order=6/gcd(6,k), current=steps*k%6;
        Object.assign(lab.dataset,{generator:String(k),order:String(order),step:String(steps),current:String(current)});
        status.textContent=`乘数 ${root(k)} 的阶为 ${order}：走 ${order} 步首次回到 1。${order===6?'它是本原六次单位根。':'它不是本原六次单位根。'} 当前已走 ${steps} 步，结果为 ${root(current)}。`;
        const route=Array.from({length:order+1},(_,i)=>root(i*k%6));
        explanation.textContent=`完整轨道：${route.join(' → ')}。其中 ζ³ = −1。`;
        step.disabled=steps===order||playing;play.textContent=playing?'暂停':'自动演示';
        svg.replaceChildren();const marker=arrow(svg);
        svgElement('circle',svg,{cx:280,cy:195,r:125,class:'cyclotomic-unit-circle'});
        for(let i=0;i<steps;i++){
          const from=coordinates[i*k%6],to=coordinates[(i+1)*k%6];let d;
          if(k===0)d=`M ${from.x+17} ${from.y} C ${from.x+80} ${from.y-75} ${from.x-30} ${from.y-75} ${from.x} ${from.y-19}`;
          else {const dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy),sx=from.x+dx/length*20,sy=from.y+dy/length*20,tx=to.x-dx/length*23,ty=to.y-dy/length*23;d=`M ${sx} ${sy} Q ${(sx+tx)/2-dy/length*14} ${(sy+ty)/2+dx/length*14} ${tx} ${ty}`;}
          svgElement('path',svg,{d,class:'cyclotomic-edge','marker-end':marker});
        }
        const visited=new Set(Array.from({length:steps+1},(_,i)=>i*k%6));
        coordinates.forEach((point,i)=>{
          const node=svgElement('g',svg,{class:`cyclotomic-circle-node${visited.has(i)?' is-visited':''}${i===current?' is-current':''}`,role:'button',tabindex:0,'aria-label':`选择乘数 ${root(i)}`,'aria-pressed':String(i===k),'data-exponent':i});
          svgElement('circle',node,{cx:point.x,cy:point.y,r:17});
          const angle=i*Math.PI/3;
          svgElement('text',node,{x:280+165*Math.cos(angle),y:201-165*Math.sin(angle),'text-anchor':'middle'},i===3?'−1':root(i));
          const choose=()=>{stop();k=i;select.value=String(k);steps=0;render();select.focus();};
          node.addEventListener('click',choose);node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}});
        });
      }
      function advance(){steps++;render();}
      function tick(){advance();if(steps<6/gcd(6,k)&&playing)timer=setTimeout(tick,650);else{stop();render();}}
      select.addEventListener('change',()=>{stop();k=Number(select.value);steps=0;render();});
      step.addEventListener('click',advance);
      reset.addEventListener('click',()=>{stop();steps=0;render();});
      play.addEventListener('click',()=>{if(playing){stop();render();return;}if(steps===6/gcd(6,k))steps=0;playing=true;render();timer=setTimeout(tick,350);});
      render();
    });
  });
})();
