const fs = require('fs');
const {mathjax} = require('./.tools/mathjax-full/js/mathjax.js');
const {TeX} = require('./.tools/mathjax-full/js/input/tex.js');
const {SVG} = require('./.tools/mathjax-full/js/output/svg.js');
const {liteAdaptor} = require('./.tools/mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler} = require('./.tools/mathjax-full/js/handlers/html.js');
require('./.tools/mathjax-full/js/input/tex/ams/AmsConfiguration.js');
require('./.tools/mathjax-full/js/input/tex/newcommand/NewcommandConfiguration.js');
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX({packages:['base','ams','newcommand']});
const doc = mathjax.document('',{InputJax:tex,OutputJax:new SVG({fontCache:'none'})});
const formulas = JSON.parse(fs.readFileSync('_build/math-formulas.json','utf8'));
const errors=[], wide=[];
for(const [i,f] of formulas.entries()) {
  try {
    const node=doc.convert(f.tex,{display:f.display});
    const svg=adaptor.outerHTML(node);
    if(/data-mjx-error=/.test(svg)) errors.push({...f,i,error:svg.match(/data-mjx-error="([^"]+)/)?.[1]});
    const width=+(svg.match(/width="([\d.]+)ex"/)?.[1]||0);
    if(f.display && width>100)wide.push({...f,i,width_ex:width});
  } catch(e) {errors.push({...f,i,error:String(e)});}
}
fs.writeFileSync('_build/mathjax-validation.json',JSON.stringify({count:formulas.length,errors,wide},null,2));
console.log(JSON.stringify({count:formulas.length,errors,wide},null,2));
if(errors.length)process.exitCode=1;
