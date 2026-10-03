from pathlib import Path
import re, sys, json
UNIT = re.compile(r'^::::\{container\} source-line([^\n]*)\n:name: (p\d{3}-l\d{2})\n\n(.*?)\n::::$', re.M | re.S)
NOTE = re.compile(r'\n\n```\{raw\} html\n<details><summary>本段阅读说明（新增）</summary><div class="reader-note">.*?</div></details>\n```', re.S)
PAGE_NOTE = re.compile(r'```\{admonition\} 逐页解释（新增）\n:class: reading-note\n\n(.*?)\n```', re.S)
def parse(path):
    s = path.read_text(encoding='utf-8')
    units = [{'id':m[2], 'kind':m[1].strip(), 'text':NOTE.sub('',m[3]),'block':m[0]} for m in UNIT.finditer(s)]
    pages={}
    for u in units: pages.setdefault(int(u['id'][1:4]),[]).append(u)
    explanations={}
    for m in re.finditer(r'\(slide-(\d+)\)=\n.*?(?=\(slide-\d+\)=|\Z)',s,re.S):
        n=PAGE_NOTE.search(m[0])
        explanations[int(m[1])] = n[1] if n else ''
    extra=re.search(r'```\{admonition\} 补充定义[^\n]*\n:class: [^\n]+\n\n(.*?)\n```',s,re.S)
    return {'name':path.name,'title':s.splitlines()[0],'source':s,'units':units,'pages':pages,'explanations':explanations,'extra':extra[1] if extra else ''}
def compact(t):
    return re.sub(r'\s+',' ',t.replace('\\left.','').replace('\\right.','').replace('\\ ',' ')).strip()
if __name__=='__main__':
    for name in sys.argv[1:]:
        d=parse(Path('chapters')/(name+'.md'))
        print('\n'+name+' '+d['title']+'\nEXTRA: '+d['extra'])
        for page,us in d['pages'].items():
            print('PAGE',page,'NOTE:',d['explanations'].get(page,''))
            for u in us: print(u['id'],u['kind'],compact(u['text']))
