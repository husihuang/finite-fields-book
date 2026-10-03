from pathlib import Path
import re,json
MATH = re.compile(r'\$\$[\s\S]*?\$\$|(?<!\$)\$(?!\$)[^\n$]*?\$(?!\$)')
for p in sorted(Path('chapters').glob('c*.md')):
    if p.stem=='c01':continue
    s=p.read_text(encoding='utf-8')
    for m in MATH.finditer(s):
        t=re.sub(r'\\text\{[^}]*\}','',m[0])
        if re.search('[\u4e00-\u9fff]',t):print('CHINESE',p.name,s[:m.start()].count('\n')+1,repr(m[0]))
        braces=re.sub(r'\\[{}]','',t)
        balance=0
        for c in braces:
            if c=='{':balance+=1
            if c=='}':balance-=1
        if balance:print('BRACES',p.name,s[:m.start()].count('\n')+1,repr(m[0]))
    inline=re.sub(r'\$\$[\s\S]*?\$\$',lambda m:'\n'*m[0].count('\n'),s)
    for number,line in enumerate(inline.splitlines(),1):
        if line.count('$')%2:print('DOLLAR',p.name,number,repr(line))
    if '\uf071' in s:print('PRIVATEGLYPH',p.name)
