(() => {
'use strict';
const KEY='finitefields:learning:v1';
const statuses={unseen:'尚未学习',read:'已阅读',learning:'正在理解',mastered:'能够独立运用'};
const difficulties={none:'暂无困难',concept:'概念与条件',proof:'证明思路',calculation:'计算与表示',application:'应用与迁移'};
const hints={concept:'先写出定义与条件，再找一个满足条件的例子和一个反例。',proof:'先明确已知与待证，把正文证明拆成若干步，标出每一步使用的结论。',calculation:'先固定基域、域模型与表示方式，再手算一个小例子，最后用实验核对。',application:'先判断定理的假设是否成立，再把问题中的量与定理中的记号逐项对应。'};
let D,records={},persistent=true;
function element(tag,attrs={},text){const e=document.createElement(tag);for(const [k,v] of Object.entries(attrs)){if(k==='class')e.className=v;else e.setAttribute(k,v);}if(text!==undefined)e.textContent=text;return e;}
function button(label,action,attrs={}){const b=element('button',{type:'button',...attrs},label);b.addEventListener('click',action);return b;}
function select(options,attrs={}){const s=element('select',attrs);for(const [v,t] of Object.entries(options))s.append(element('option',{value:v},t));return s;}
function labeled(label,control){const l=element('label',{class:'kg-field'});l.append(element('span',{},label),control);return l;}
function entry(id){return records[id]||{status:'unseen',difficulty:'none',note:'',updated:'',reviewed:''};}
function validate(payload){
  if(!payload||payload.version!==1||payload.book!=='finite-fields'||!payload.records||Array.isArray(payload.records)||typeof payload.records!=='object')throw new Error('记录格式不正确，请使用本教材导出的 JSON 文件。');
  const valid={};let skipped=0;
  for(const [id,r] of Object.entries(payload.records)){
    if(!D.byId.has(id)){skipped++;continue;}
    if(!r||!Object.hasOwn(statuses,r.status)||!Object.hasOwn(difficulties,r.difficulty)||typeof r.note!=='string'||r.note.length>2000)throw new Error('记录中有无效的状态或过长的笔记，未导入。');
    for(const field of ['updated','reviewed'])if(typeof r[field]!=='string'||(r[field]&&!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(r[field]))||(r[field]&&!Number.isFinite(Date.parse(r[field]))))throw new Error('记录日期格式不正确，未导入。');
    valid[id]={status:r.status,difficulty:r.difficulty,note:r.note,updated:r.updated,reviewed:r.reviewed};
  }
  return {valid,skipped};
}
function payload(){return {version:1,book:'finite-fields',exported:new Date().toISOString(),records};}
function load(){try{const saved=localStorage.getItem(KEY);if(saved)records=validate(JSON.parse(saved)).valid;}catch(e){persistent=false;}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(payload()));persistent=true;return true;}catch(e){persistent=false;return false;}}
function stats(nodes){const result={total:nodes.length,started:0,mastered:0,learning:0,difficult:0};for(const n of nodes){const r=entry(n.id);if(r.status!=='unseen')result.started++;if(r.status==='mastered')result.mastered++;if(r.status==='learning')result.learning++;if(r.difficulty!=='none')result.difficult++;}return result;}
function sourceLink(node,extra=false){const a=element('a',{href:`chapters/${node.chapter}.html#${extra?node.extra.anchor:node.anchor}`},extra?node.extra.label:'阅读正文 ↗');return a;}
let mathQueue=Promise.resolve();
function typeset(target){mathQueue=mathQueue.catch(()=>{}).then(async()=>{if(!target.isConnected)return;if(window.MathJax?.startup?.promise)await window.MathJax.startup.promise;if(target.isConnected&&window.MathJax?.typesetPromise)await window.MathJax.typesetPromise([target]);});}
function clear(target){window.MathJax?.typesetClear?.([target]);target.replaceChildren();}
function start(){
  D=window.FFKnowledge;if(!D)return;load();
  const app=document.getElementById('knowledge-app');
  if(!app){chapterPanel();return;}
  app.className='kg-app';
  let selected=null,zoom=1,expanded=false;
  const header=element('div',{class:'kg-header'});header.append(element('p',{class:'kg-eyebrow'},'学习导航 · 自我评估'),element('p',{},`${D.nodes.length} 个核心概念 · ${D.edges.length} 条学习联系 · 19 章`));
  const tabs=element('div',{class:'kg-tabs','aria-label':'导航视图'});
  const mapTab=button('知识图谱',()=>switchTab('map'),{id:'kg-map-tab','aria-pressed':'true'}),studyTab=button('我的学习状态',()=>switchTab('study'),{id:'kg-study-tab','aria-pressed':'false'});tabs.append(mapTab,studyTab);
  const alert=element('p',{id:'kg-storage-message',role:'status','aria-live':'polite'});
  const map=element('section',{id:'kg-map','aria-label':'知识图谱'}),study=element('section',{id:'kg-study','aria-label':'我的学习状态',hidden:''});
  app.append(header,tabs,alert,map,study);
  function storageMessage(message=''){alert.textContent=persistent?message:'当前浏览器不能可靠保存记录，请在离开前导出学习记录。'+(message?' '+message:'');}
  function switchTab(which,hash=true){const isMap=which==='map';map.hidden=!isMap;study.hidden=isMap;mapTab.setAttribute('aria-pressed',String(isMap));studyTab.setAttribute('aria-pressed',String(!isMap));if(!isMap)renderStudy();if(hash){const p=new URLSearchParams(location.hash.slice(1));p.set('view',which);history.replaceState(null,'','#'+p.toString());}}
  const overview=element('div',{class:'kg-overview'});map.append(element('h2',{},'全书结构'),overview);
  D.parts.forEach((name,i)=>{const card=element('section',{class:'kg-part'});card.append(element('h3',{},name));D.chapters.filter(c=>c.part===i).forEach(c=>card.append(button(`${c.number}. ${c.name}`,()=>chooseChapter(c.id),{'data-chapter':c.id})));overview.append(card);});
  const paths=element('details',{class:'kg-paths'});paths.append(element('summary',{},'按学习路线浏览'));D.routes.forEach(r=>{const row=element('div',{class:'kg-route'});row.append(element('strong',{},r.name));r.ids.forEach((id,i)=>{if(i)row.append(element('span',{'aria-hidden':'true'},' → '));row.append(nodeButton(id));});paths.append(row);});map.append(paths);
  const search=element('input',{type:'search',id:'kg-search',placeholder:'搜索概念、公式记号或关键词','aria-label':'搜索概念'});
  const chapterSelect=select({'':'全书各章',...Object.fromEntries(D.chapters.map(c=>[c.id,`第 ${c.number} 章 ${c.name}`]))},{id:'kg-chapter'});
  const kindSelect=select({'':'所有内容类型',定义:'定义',定理:'定理',方法:'方法',例子:'例子'},{id:'kg-kind'});
  const filters=element('div',{class:'kg-filters'});filters.append(labeled('概念搜索',search),labeled('章节',chapterSelect),labeled('类型',kindSelect));map.append(element('h2',{},'概念索引'),filters);
  const resultCount=element('p',{id:'kg-result-count',role:'status'}),catalog=element('div',{id:'kg-catalog',class:'kg-catalog'}),more=button('显示全部匹配概念',()=>{expanded=true;renderCatalog();},{id:'kg-more'});map.append(resultCount,catalog,more);
  const work=element('section',{class:'kg-work',id:'kg-work','aria-label':'所选概念及其联系'});map.append(work);
  const empty=element('p',{class:'kg-empty'},'选择上面的章节或概念，查看正文摘要、知识联系和学习记录。');work.append(empty);
  const workspace=element('div',{hidden:''});work.append(workspace);
  const graphHeading=element('h2',{},'概念联系');
  const depth=select({'1':'直接联系','2':'扩展两层'},{id:'kg-depth'}),direction=select({both:'前置与后续',before:'只看前置',after:'只看后续'},{id:'kg-direction'});
  const tools=element('div',{class:'kg-graph-tools'});tools.append(labeled('范围',depth),labeled('方向',direction),button('缩小',()=>scale(-0.2),{'aria-label':'缩小图谱'}),button('放大',()=>scale(0.2),{'aria-label':'放大图谱'}),button('恢复大小',()=>{zoom=1;drawGraph();}));
  const legend=element('fieldset',{class:'kg-legend'});legend.append(element('legend',{},'关系筛选（线型与文字共同区分）'));
  for(const [id,r] of Object.entries(D.relations)){const check=element('input',{type:'checkbox',value:id,checked:'','data-relation':id});const l=element('label');const swatch=element('span',{class:'kg-swatch',style:`--edge-color:${r.color};--edge-style:${r.dash?'dashed':'solid'}`});l.append(check,swatch,document.createTextNode(r.label));check.addEventListener('change',()=>{drawGraph();renderRelationships();});legend.append(l);}
  const graphInfo=element('p',{id:'kg-graph-info',role:'status'}),canvas=element('div',{id:'kg-canvas',class:'kg-canvas',tabindex:'0','aria-label':'概念联系图，可滚动；节点可用 Tab 和回车选择'}),details=element('section',{id:'kg-detail',class:'kg-detail','aria-label':'概念详情'}),relations=element('details',{class:'kg-relations',open:''});relations.append(element('summary',{},'联系的文字列表（也可用键盘浏览）'));const relationList=element('div');relations.append(relationList);
  workspace.append(graphHeading,tools,legend,graphInfo,canvas,details,relations);
  for(const input of [search,chapterSelect,kindSelect])input.addEventListener(input===search?'input':'change',()=>{expanded=false;renderCatalog();});
  for(const s of [depth,direction])s.addEventListener('change',drawGraph);
  function nodeButton(id,label){const n=D.byId.get(id);return button(label||n.title,()=>choose(id),{'data-node-id':id,class:'kg-node-link'});}
  function enabledEdges(){const enabled=new Set([...legend.querySelectorAll('input:checked')].map(c=>c.value));return D.edges.filter(e=>enabled.has(e.type));}
  function chooseChapter(ch){chapterSelect.value=ch;search.value='';kindSelect.value='';expanded=true;renderCatalog();choose(D.nodes.find(n=>n.chapter===ch).id);}
  function choose(id,hash=true){const n=D.byId.get(id);if(!n)return;selected=n;empty.hidden=true;workspace.hidden=false;graphHeading.textContent=`${n.title} · 概念联系`;renderDetail();drawGraph();renderRelationships();renderCatalog();if(hash){const p=new URLSearchParams({node:id,view:'map'});history.pushState(null,'','#'+p.toString());}switchTab('map',false);if(hash)work.scrollIntoView({block:'start',behavior:'auto'});}
  function renderCatalog(){
    const term=search.value.trim().toLowerCase();const matches=D.nodes.filter(n=>(!chapterSelect.value||n.chapter===chapterSelect.value)&&(!kindSelect.value||n.kind===kindSelect.value)&&(!term||[n.title,n.summary,n.conditions,n.formula,n.id,D.chapters.find(c=>c.id===n.chapter).name].join(' ').toLowerCase().includes(term)));
    catalog.replaceChildren();resultCount.textContent=`匹配 ${matches.length} 个概念${!expanded&&matches.length>12?'，先显示前 12 个':''}。`;more.hidden=expanded||matches.length<=12;
    for(const n of matches.slice(0,expanded?matches.length:12)){const b=nodeButton(n.id);b.className='kg-concept';b.setAttribute('aria-pressed',String(n.id===selected?.id));b.replaceChildren(element('strong',{},n.title),element('span',{},`第 ${Number(n.chapter.slice(1))} 章 · ${n.kind}`),element('small',{'data-status':entry(n.id).status},statuses[entry(n.id).status]+(entry(n.id).difficulty!=='none'?' · 有困难':'')));catalog.append(b);}
    if(!matches.length)catalog.append(element('p',{},'没有找到匹配概念。试试“迹”“极小多项式”或“Frobenius”。'));
  }
  function renderDetail(){
    clear(details);const n=selected,r=entry(n.id);details.append(element('p',{class:'kg-eyebrow'},`第 ${Number(n.chapter.slice(1))} 章 · ${n.kind}`),element('h3',{},n.title),element('p',{class:'mathjax_process'},n.summary));
    const formula=element('div',{class:'kg-formula mathjax_process'},`\\[${n.formula}\\]`);details.append(formula,element('strong',{},'条件与易错点'),element('p',{class:'mathjax_process'},n.conditions));const links=element('div',{class:'kg-link-row'});links.append(sourceLink(n));if(n.extra)links.append(sourceLink(n,true));details.append(links);
    const form=element('div',{class:'kg-record'});form.append(element('h4',{},'这个概念的学习记录'));
    const status=select(statuses,{id:'kg-status'}),difficulty=select(difficulties,{id:'kg-difficulty'});status.value=r.status;difficulty.value=r.difficulty;
    const note=element('textarea',{id:'kg-note',rows:'3',maxlength:'2000',placeholder:'例如：为什么迹零等价于 a=b^q−b？我卡在维数比较这一步。'});note.value=r.note;
    const row=element('div',{class:'kg-filters'});row.append(labeled('掌握程度（自评）',status),labeled('当前困难',difficulty));form.append(row,labeled('困难点或复习笔记（最多 2000 字）',note));
    const message=element('p',{id:'kg-record-message',role:'status','aria-live':'polite'}),reviewed=element('p',{class:'kg-muted'},r.reviewed?'最近复习：'+new Date(r.reviewed).toLocaleString('zh-CN'):'尚未记录复习时间');
    form.append(button('保存学习记录',()=>{records[n.id]={status:status.value,difficulty:difficulty.value,note:note.value,updated:new Date().toISOString(),reviewed:entry(n.id).reviewed};const ok=save();message.textContent=ok?'已保存。':'已在本页记录，请导出备份。';storageMessage();renderCatalog();drawGraph();renderStudy();}),button('记录一次复习',()=>{const now=new Date().toISOString();records[n.id]={status:status.value,difficulty:difficulty.value,note:note.value,updated:now,reviewed:now};save();reviewed.textContent='最近复习：'+new Date(now).toLocaleString('zh-CN');message.textContent=persistent?'已记录复习时间，掌握程度按你的选择保存。':'已在本页记录，请导出备份。';storageMessage();renderCatalog();drawGraph();renderStudy();}),reviewed,message);
    details.append(form);typeset(details);
  }
  function renderRelationships(){relationList.replaceChildren();if(!selected)return;const edges=enabledEdges().filter(e=>e.from===selected.id||e.to===selected.id);if(!edges.length){relationList.append(element('p',{},'当前筛选下没有直接联系。'));return;}for(const e of edges){const row=element('p',{class:'kg-relation-row'});row.append(nodeButton(e.from),element('span',{},` → ${D.relations[e.type].label} → `),nodeButton(e.to));relationList.append(row);}}
  function scale(delta){zoom=Math.max(0.6,Math.min(1.8,zoom+delta));drawGraph();}
  function drawGraph(){
    if(!selected)return;canvas.replaceChildren();const edges=enabledEdges(),levels=new Map([[selected.id,0]]),max=Number(depth.value),dir=direction.value;
    for(const sign of [-1,1]){if(sign===-1&&dir==='after'||sign===1&&dir==='before')continue;let frontier=[selected.id];const visited=new Set(frontier);for(let step=1;step<=max;step++){const next=[];for(const id of frontier)for(const e of edges){const target=sign===-1?(e.to===id?e.from:null):(e.from===id?e.to:null);if(target&&!visited.has(target)){visited.add(target);next.push(target);if(!levels.has(target))levels.set(target,sign*step);}}frontier=next;}}
    const columns=new Map();for(const [id,level] of levels){if(!columns.has(level))columns.set(level,[]);columns.get(level).push(id);}for(const ids of columns.values())ids.sort((a,b)=>D.byId.get(a).chapter.localeCompare(D.byId.get(b).chapter));
    const min=Math.min(...columns.keys()),maximum=Math.max(...columns.keys()),width=Math.max(620,(maximum-min+1)*224+72),height=Math.max(240,Math.max(...[...columns.values()].map(ids=>ids.length))*82+100),pos=new Map();
    for(const [level,ids] of columns)ids.forEach((id,i)=>pos.set(id,{x:44+(level-min)*224,y:56+(height-100-ids.length*82)/2+i*82}));
    const NS='http://www.w3.org/2000/svg';function svgEl(tag,attrs={},text){const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;}
    const svg=svgEl('svg',{viewBox:`0 0 ${width} ${height}`,width:width*zoom,height:height*zoom,role:'group','aria-label':selected.title+' 的知识联系图'}),defs=svgEl('defs');
    for(const [id,r] of Object.entries(D.relations)){const marker=svgEl('marker',{id:'kg-arrow-'+id,viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'6',markerHeight:'6',orient:'auto-start-reverse'});marker.append(svgEl('path',{d:'M0 0 L10 5 L0 10 Z',fill:r.color}));defs.append(marker);}svg.append(defs);
    for(const [level] of columns)svg.append(svgEl('text',{x:44+(level-min)*224,y:26,class:'kg-column-label'},level===0?'当前概念':level<0?`前置 · 第 ${-level} 层`:`后续 · 第 ${level} 层`));
    const visible=edges.filter(e=>levels.has(e.from)&&levels.has(e.to));
    visible.forEach((e,i)=>{const a=pos.get(e.from),b=pos.get(e.to),r=D.relations[e.type],forward=b.x>=a.x,ax=a.x+(forward?180:0),bx=b.x+(forward?0:180),ay=a.y+28,by=b.y+28;const d=a.x===b.x?`M${a.x+180},${ay} C${a.x+216+(i%3)*7},${ay} ${b.x+216+(i%3)*7},${by} ${b.x+180},${by}`:`M${ax},${ay} C${(ax+bx)/2},${ay} ${(ax+bx)/2},${by} ${bx},${by}`;const path=svgEl('path',{d,fill:'none',stroke:r.color,'stroke-width':e.from===selected.id||e.to===selected.id?'2':'1.2','stroke-dasharray':r.dash,'marker-end':`url(#kg-arrow-${e.type})`,opacity:'.8'});path.append(svgEl('title',{},`${D.byId.get(e.from).title} → ${r.label} → ${D.byId.get(e.to).title}`));svg.append(path);});
    for(const [id,p] of pos){const n=D.byId.get(id),r=entry(id),g=svgEl('g',{class:'kg-svg-node'+(id===selected.id?' is-selected':''),transform:`translate(${p.x},${p.y})`,tabindex:'0',role:'button','aria-label':`${n.title}，${statuses[r.status]}${r.difficulty!=='none'?'，有困难':''}`,'data-node-id':id,'data-status':r.status});g.append(svgEl('title',{},n.title+' · '+statuses[r.status]),svgEl('rect',{width:'180',height:'62',rx:'9'}));
      const title=n.title.length>12?[n.title.slice(0,12),n.title.slice(12)]:[n.title];title.forEach((t,i)=>g.append(svgEl('text',{x:'11',y:19+i*16,class:'kg-node-title'},t)));g.append(svgEl('text',{x:'11',y:'53',class:'kg-node-meta'},`第 ${Number(n.chapter.slice(1))} 章 · ${statuses[r.status]}${r.difficulty!=='none'?' !':''}`));g.addEventListener('click',()=>choose(id));g.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();choose(id);}});svg.append(g);
    }
    canvas.append(svg);const center=pos.get(selected.id);requestAnimationFrame(()=>{if(svg.isConnected&&!map.hidden){canvas.scrollLeft=Math.max(0,(center.x+90)*zoom-canvas.clientWidth/2);canvas.scrollTop=Math.max(0,(center.y+31)*zoom-canvas.clientHeight/2);}});graphInfo.textContent=`${levels.size} 个概念 · ${visible.length} 条联系 · 大小 ${Math.round(zoom*100)}%。箭头指向使用知识的一方。图内可横向或纵向滚动；下方有全部直接联系的文字列表。`;
  }
  function renderStudy(){
    study.replaceChildren();const s=stats(D.nodes);study.append(element('h2',{},'目前的学习状态'));
    const cards=element('div',{class:'kg-metrics'});for(const [value,label] of [[`${s.started}/${s.total}`,'已开始学习'],[`${s.mastered}/${s.total}`,'能够独立运用'],[s.learning,'正在理解'],[s.difficult,'标记了困难']]){const card=element('div',{class:'kg-metric'});card.append(element('strong',{},String(value)),element('span',{},label));cards.append(card);}study.append(cards,element('p',{class:'kg-muted'},'“已开始”包含已阅读、正在理解和能够独立运用。完成率仅按“能够独立运用”计，不是测验成绩。'));
    const actions=element('div',{class:'kg-link-row'}),file=element('input',{type:'file',accept:'.json,application/json',id:'kg-import',hidden:''});
    actions.append(button('导出学习记录',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(payload(),null,2)],{type:'application/json;charset=utf-8'}));const a=element('a',{href:url,download:'finite-fields-learning-'+new Date().toISOString().slice(0,10)+'.json'});a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}),button('导入学习记录',()=>file.click()),file);file.addEventListener('change',async()=>{try{const f=file.files[0];if(!f)return;if(f.size>1024*1024)throw new Error('文件超过 1 MB，请选择本教材导出的记录。');const {valid,skipped}=validate(JSON.parse(await f.text()));let count=0;for(const [id,r] of Object.entries(valid))if(!records[id]||r.updated>records[id].updated){records[id]=r;count++;}save();renderStudy();renderCatalog();if(selected){renderDetail();drawGraph();}storageMessage(`已合并 ${count} 条较新的记录${skipped?`，忽略 ${skipped} 个不属于此版本的概念`:''}。`);}catch(e){storageMessage('导入失败：'+e.message);}finally{file.value='';}});study.append(actions);
    study.append(element('h3',{},'各章进度'),element('p',{class:'kg-muted'},'进度条：绿色为能够独立运用，橙色为正在理解，蓝色为已阅读，灰色为尚未学习。点击章节可查看和更新该章概念。'));const chapterGrid=element('div',{class:'kg-chapter-progress'});
    for(const c of D.chapters){const ns=D.nodes.filter(n=>n.chapter===c.id),cs=stats(ns),card=button('',()=>chooseChapter(c.id),{'data-progress-chapter':c.id,class:'kg-progress-card'});card.append(element('strong',{},`${c.number}. ${c.name}`));const bar=element('div',{class:'kg-progress-bar','aria-hidden':'true'});for(const status of ['mastered','learning','read']){const count=ns.filter(n=>entry(n.id).status===status).length;bar.append(element('span',{'data-status':status,style:`width:${count/ns.length*100}%`}));}card.append(bar,element('span',{},`已学 ${cs.started}/${cs.total} · 掌握 ${cs.mastered}/${cs.total} · 困难 ${cs.difficult}`));chapterGrid.append(card);}study.append(chapterGrid);
    study.append(element('h3',{},'困难点清单'));const hard=D.nodes.filter(n=>entry(n.id).difficulty!=='none').sort((a,b)=>entry(b.id).updated.localeCompare(entry(a.id).updated));
    if(!hard.length)study.append(element('p',{class:'kg-empty'},'还没有标记困难点。在任一概念的详情中选择困难类型并保存，就会出现在这里。'));
    for(const n of hard){const r=entry(n.id),card=element('section',{class:'kg-hard'});card.append(nodeButton(n.id),element('span',{class:'kg-badge'},difficulties[r.difficulty]),element('p',{class:'kg-note-text'},r.note||'尚未填写具体问题。'),element('p',{},hints[r.difficulty]));const prereqs=[...new Set(D.edges.filter(e=>e.to===n.id&&e.type==='prerequisite').map(e=>e.from))].filter(id=>entry(id).status!=='mastered');if(prereqs.length){const links=element('div',{class:'kg-link-row'});links.append(element('span',{},'可先回顾：'));prereqs.forEach(id=>links.append(nodeButton(id)));card.append(links);}card.append(sourceLink(n));if(n.extra)card.append(document.createTextNode(' · '),sourceLink(n,true));study.append(card);}
    study.append(element('h3',{},'下一步学习建议'));const pending=D.nodes.filter(n=>entry(n.id).status==='learning'&&entry(n.id).difficulty==='none');const candidates=hard.length?hard.slice(0,3):pending.length?pending.slice(0,3):D.nodes.filter(n=>entry(n.id).status!=='mastered').slice(0,3);
    study.append(element('p',{class:'kg-muted'},hard.length?'先处理你标记的困难点，并回顾相关先修知识。':pending.length?'先巩固正在理解的概念，再进入新内容。':'按教材顺序从尚未掌握的概念继续。这些建议依据自评记录，不是自动诊断。'));
    candidates.forEach(n=>{const row=element('p');row.append(nodeButton(n.id),document.createTextNode(' · '+statuses[entry(n.id).status]+' · '),sourceLink(n));study.append(row);});if(!candidates.length)study.append(element('p',{},'所有核心概念都已标为能够独立运用。可以回到章末学习检查，尝试脱离参考答案独立解题。'));
    const reviewed=D.nodes.filter(n=>entry(n.id).reviewed).sort((a,b)=>entry(b.id).reviewed.localeCompare(entry(a.id).reviewed)).slice(0,5);if(reviewed.length){study.append(element('h3',{},'最近复习'));for(const n of reviewed){const row=element('p');row.append(nodeButton(n.id),document.createTextNode(' · '+new Date(entry(n.id).reviewed).toLocaleString('zh-CN')));study.append(row);}}
  }
  function route(){const p=new URLSearchParams(location.hash.slice(1));if(D.byId.has(p.get('node')))choose(p.get('node'),false);else if(D.chapters.some(c=>c.id===p.get('chapter'))){chapterSelect.value=p.get('chapter');expanded=true;renderCatalog();choose(D.nodes.find(n=>n.chapter===p.get('chapter')).id,false);}switchTab(p.get('view')==='study'?'study':'map',false);}
  window.addEventListener('hashchange',route);window.addEventListener('storage',e=>{if(e.key===KEY){load();renderCatalog();renderStudy();if(selected){renderDetail();drawGraph();}storageMessage('已同步此浏览器另一标签页的学习记录。');}});
  renderCatalog();renderStudy();storageMessage();route();
}
function chapterPanel(){
  const match=location.pathname.match(/\/chapters\/(c\d{2})\.html$/);if(!match)return;const ch=match[1],nodes=D.nodes.filter(n=>n.chapter===ch),toolbar=document.querySelector('.reader-toolbar');if(!toolbar)return;
  const panel=element('aside',{class:'kg-chapter-panel','aria-label':'本章学习状态'});toolbar.after(panel);
  function render(){const s=stats(nodes);panel.replaceChildren();panel.append(element('strong',{},'本章学习状态'),element('span',{},`已学 ${s.started}/${s.total} · 掌握 ${s.mastered}/${s.total} · 困难 ${s.difficult}`),element('a',{href:`../knowledge.html#chapter=${ch}&view=map`},'概念图谱与记录'),element('a',{href:'../knowledge.html#view=study'},'查看全书学习状态'));if(!persistent)panel.append(element('small',{},'本浏览器的记录暂不可读取或保存，请到学习状态页检查并导出备份。'));}render();window.addEventListener('storage',e=>{if(e.key===KEY){load();render();}});
}
document.addEventListener('DOMContentLoaded',start);
})();
