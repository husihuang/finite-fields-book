/* Square symmetries use exact integer matrices at every completed step. */
document.addEventListener('DOMContentLoaded', () => {
  const I = [1, 0, 0, 1], R = [0, -1, 1, 0], S = [-1, 0, 0, 1];
  const vertices = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  const letters = ['A', 'B', 'C', 'D'];
  const colors = ['#b43b32', '#186bba', '#267b50', '#8054ad'];
  const multiply = (a, b) => [a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3], a[2]*b[0]+a[3]*b[2], a[2]*b[1]+a[3]*b[3]];
  const point = (m, v) => [m[0]*v[0]+m[1]*v[1], m[2]*v[0]+m[3]*v[1]];
  const equal = (a, b) => a.every((x, i) => x === b[i]);
  const elements = [];
  let power = I;
  for (let k = 0; k < 4; k++) {
    const rotation = k === 0 ? 'e' : k === 1 ? 'r' : `r${k === 2 ? '²' : '³'}`;
    elements.push({ matrix: power, name: rotation });
    elements.push({ matrix: multiply(S, power), name: k === 0 ? 's' : k === 1 ? 'sr' : `sr${k === 2 ? '²' : '³'}` });
    power = multiply(R, power);
  }
  const nameOf = matrix => elements.find(e => equal(e.matrix, matrix)).name;
  const placeOf = ([x, y]) => `${x === 1 ? '右' : '左'}${y === 1 ? '上' : '下'}`;
  const wordMatrix = word => [...word].reduce((m, op) => multiply(op === 'r' ? R : S, m), I);
  const ns = 'http://www.w3.org/2000/svg';
  function node(tag, attrs, parent) {
    const element = document.createElementNS(ns, tag);
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, String(value));
    parent.append(element); return element;
  }
  class View {
    constructor(svg, output, changed = () => {}) {
      this.svg = svg; this.output = output; this.changed = changed; this.token = 0; this.matrix = I;
      node('rect', {x: 1, y: 1, width: 318, height: 318, rx: 14, class: 'symmetry-background'}, svg);
      node('path', {d: 'M80 80H240V240H80Z', class: 'symmetry-ghost'}, svg);
      node('line', {x1:160, y1:28, x2:160, y2:292, class:'symmetry-axis'}, svg);
      const axisLabel = node('text', {x:170, y:30, class:'symmetry-axis-label'}, svg); axisLabel.textContent='反射轴';
      node('circle', {cx:160, cy:160, r:3, class:'symmetry-center'}, svg);
      this.polygon = node('polygon', {class: 'symmetry-polygon'}, svg);
      this.markers = letters.map((letter, i) => {
        const circle = node('circle', {r:17, fill:colors[i], stroke:'white', 'stroke-width':2}, svg);
        const text = node('text', {'text-anchor':'middle', 'dominant-baseline':'central', class:'symmetry-vertex'}, svg);
        text.textContent=letter; return {circle, text};
      });
      this.set(I);
    }
    draw(points) {
      const screen = points.map(([x,y]) => [160+80*x,160-80*y]);
      this.polygon.setAttribute('points', screen.map(v=>v.join(',')).join(' '));
      screen.forEach(([x,y], i) => {
        this.markers[i].circle.setAttribute('cx', x); this.markers[i].circle.setAttribute('cy', y);
        this.markers[i].text.setAttribute('x', x); this.markers[i].text.setAttribute('y', y);
      });
    }
    set(matrix) {
      this.matrix = matrix;
      const points = vertices.map(v => point(matrix, v));
      this.draw(points);
      this.svg.dataset.matrix = matrix.join(',');
      this.svg.dataset.permutation = points.map(v=>vertices.findIndex(w=>equal(v,w))).join(',');
      this.output.textContent = `当前元素：${nameOf(matrix)}；${points.map((v,i)=>`${letters[i]} → ${placeOf(v)}角`).join('，')}。`;
      this.changed(matrix);
    }
    reset() { this.token++; this.set(I); }
    async apply(op) {
      const token = ++this.token, start = this.matrix;
      const end = multiply(op === 'r' ? R : S, start);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { this.set(end); return true; }
      const initial = vertices.map(v=>point(start,v));
      this.output.textContent = `正在${op === 'r' ? '逆时针旋转 90°' : '关于竖直轴反射'}……`;
      return new Promise(resolve => {
        let began;
        const frame = time => {
          if (this.token !== token) { resolve(false); return; }
          began ??= time;
          const fraction = Math.min((time - began)/650, 1);
          const t = fraction*fraction*(3-2*fraction);
          if (op === 'r') {
            const angle = t*Math.PI/2, c = Math.cos(angle), s = Math.sin(angle);
            this.draw(initial.map(([x,y])=>[c*x-s*y,s*x+c*y]));
          } else { this.draw(initial.map(([x,y])=>[x*Math.cos(Math.PI*t),y])); }
          if (fraction < 1) requestAnimationFrame(frame);
          else { this.set(end); resolve(true); }
        };
        requestAnimationFrame(frame);
      });
    }
  }
  document.querySelectorAll('.square-symmetry').forEach(widget => {
    const elementButtons = [...widget.querySelectorAll('.symmetry-elements button')];
    const view = new View(widget.querySelector('.symmetry-main'), widget.querySelector('.symmetry-state'), matrix => {
      elementButtons.forEach(button => button.setAttribute('aria-pressed', equal(matrix, wordMatrix(button.dataset.word === 'e' ? '' : button.dataset.word)) ? 'true' : 'false'));
    });
    const controls = [...widget.querySelectorAll('.symmetry-controls button:not([data-reset])')];
    const history = widget.querySelector('.symmetry-history'); let steps = [], run = 0;
    const setBusy = busy => { controls.forEach(button=>button.disabled=busy); widget.setAttribute('aria-busy',String(busy)); };
    const updateHistory = () => { history.textContent = steps.length ? `操作顺序：${steps.slice(-12).join(' → ')}${steps.length > 12 ? '（仅列出最近 12 步）' : ''}；复合结果 = ${nameOf(view.matrix)}。` : '从单位元 e 开始。'; };
    async function play(word, reset) {
      const generation = ++run;
      if (reset) { view.reset(); steps=[]; }
      setBusy(true);
      try {
        for (const op of word) {
          if (!await view.apply(op) || generation !== run) return;
          steps.push(op); updateHistory();
        }
        updateHistory();
      } finally { if (generation === run) setBusy(false); }
    }
    widget.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>play(button.dataset.step,false)));
    widget.querySelectorAll('[data-word]').forEach(button=>button.addEventListener('click',()=>play(button.dataset.word === 'e' ? '' : button.dataset.word,true)));
    const sr = new View(widget.querySelector('.symmetry-sr'),widget.querySelector('.symmetry-sr-state'));
    const rs = new View(widget.querySelector('.symmetry-rs'),widget.querySelector('.symmetry-rs-state'));
    sr.set(wordMatrix('rs')); rs.set(wordMatrix('sr'));
    const compare = widget.querySelector('[data-compare]');
    let compareRun = 0;
    widget.querySelector('[data-reset]').addEventListener('click',()=>{
      run++; compareRun++;
      view.reset(); sr.reset(); rs.reset(); steps=[];
      setBusy(false); compare.disabled=false; updateHistory();
    });
    compare.addEventListener('click',async()=>{
      const generation = ++compareRun;
      compare.disabled=true; sr.reset(); rs.reset();
      try {
        const completed = await Promise.all([sr.apply('r'),rs.apply('s')]);
        if (generation !== compareRun || completed.some(done=>!done)) return;
        await Promise.all([sr.apply('s'),rs.apply('r')]);
      } finally {if (generation === compareRun) compare.disabled=false;}
    });
    updateHistory();
  });
});
