from pathlib import Path
import re,json
root=Path('finite-fields-book')
for n in range(2,20):
 p=root/f'chapters/c{n:02}.md';s=p.read_text(encoding='utf-8');original=(root/f'_build/textbook-backup/chapters/c{n:02}.md').read_text(encoding='utf-8')
 oldblocks={m[1]:m[0] for m in re.finditer(r'^:::::\{container\} statement-box[^\n]*\n:name: (c\d+-statement-\d+)\n.*?^:::::\s*$',original,re.M|re.S)}
 aliases=re.findall(r'<span id="([^"]+)"></span>',s)
 if not aliases:continue
 s=re.sub(r'```\{raw\} html\n(?:<span id="[^"]+"></span>)+\n```\n?','',s)
 newblocks={m[1]:m[0] for m in re.finditer(r'^:::::\{container\} statement-box[^\n]*\n:name: (c\d+-statement-\d+)\n.*?^:::::\s*$',s,re.M|re.S)}
 targetmap={f'c02-statement-008':'c02-statement-006',f'c02-statement-009':'c02-statement-007',f'c04-statement-018':'c04-statement-015'}
 groups={}
 for anchor in aliases:
  containing=next((id for id,b in oldblocks.items() if anchor==id or re.search(rf':name: {re.escape(anchor)}\b|\({re.escape(anchor)}\)=',b)),None)
  target=targetmap.get(containing,containing)
  if target not in newblocks:
   page=re.match(r'p(\d+)-',anchor)
   target=next((id for id,b in newblocks.items() if page and f':name: p{page[1]}-' in b),next(iter(newblocks)))
  groups.setdefault(target,[]).append(anchor)
 for target,anchors in groups.items():
  needle=f':name: {target}\n'
  alias='\n```{raw} html\n'+''.join(f'<span id="{a}"></span>' for a in anchors)+'\n```\n'
  s=s.replace(needle,needle+alias,1)
 p.write_text(s,encoding='utf-8')
# Provide the primary theoretical reference without changing the lecture attribution.
p=root/'appendices/references.md';s=p.read_text(encoding='utf-8')
s=s.replace('## SageMath 扩展实验','5. J. S. Milne, *Fields and Galois Theory*, v5.10 (2022)。[作者课程讲义](https://www.jmilne.org/math/CourseNotes/FT.pdf)。用于对照域扩张、有限域、正规基、迹和范数的条件与证明。\n\n## SageMath 扩展实验')
p.write_text(s,encoding='utf-8')
