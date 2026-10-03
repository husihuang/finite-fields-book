from pathlib import Path
import re
for p in sorted(Path('finite-fields-book/chapters').glob('c*.md')):
 if int(p.stem[1:])<4:continue
 print('\n'+p.stem+' '+p.read_text(encoding='utf-8').splitlines()[0])
 s=p.read_text(encoding='utf-8')
 for m in re.finditer(r'^:::::\{container\} statement-box[^\n]*\n:name: ([^\n]+)\n(.*?)^:::::\s*$',s,re.M|re.S):
  t=re.sub(r'^:{4}\{container\}.*\n:name:.*\n|^:{4}$|^\([^\n]+\)=|^:class:.*$|^:name:.*$|^```.*$', '',m[2],flags=re.M)
  print(m[1]+': '+re.sub(r'\s+',' ',t).strip())
