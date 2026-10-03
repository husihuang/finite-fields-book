from pathlib import Path
from bs4 import BeautifulSoup
import re,json,hashlib,urllib.request

report=json.loads(Path('_build/revision-report.json').read_text(encoding='utf-8'))
formulas=[]
for info in report['chapters']:
    name=info['chapter']
    source=Path('chapters',name+'.md').read_text(encoding='utf-8')
    original=Path('_build/revision-backup/chapters',name+'.md').read_text(encoding='utf-8')
    html=BeautifulSoup(Path('_build/html/chapters',name+'.html').read_text(encoding='utf-8'),'html.parser')
    article=html.select_one('article.bd-article')
    assert article is not None
    ids=[el['id'] for el in article.select('[id]')]
    assert len(ids)==len(set(ids)),name+' duplicate IDs'
    expected=re.findall(r':name: (p\d{3}-l\d{2})',original)
    assert all(i in ids for i in expected),(name,'missing original anchor')
    frames=article.select('.statement-box')
    remarks=article.select('.chapter-remark')
    assert len(frames)==info['frames'] and len(remarks)==info['remarks'],name
    for i,note in enumerate(remarks,1):
        assert note['id']==f'{name}-remark-{i:02d}'
        title=note.select_one('.admonition-title')
        assert title and title.get_text().strip()==f'备注 {i}'
        assert note.find_parent(class_='statement-box')
        assert note.find('ul',recursive=False) and not note.find('ol')
        assert len(note.find('ul',recursive=False).find_all('li',recursive=False))>=1
        if name=='c07' and i==7:
            assert note.select_one('ul > li .math'), 'interpolation formula escaped its bullet'
    for frame in frames:
        assert len(frame.select('.chapter-remark'))<=1
        if frame.select_one('.chapter-remark'):
            assert list(frame.children)[-2].get('class') and 'chapter-remark' in list(frame.children)[-2]['class'], 'remark is not at frame end'
        for u in frame.select('.source-line'):
            assert u.get_text(strip=True), 'empty reading unit'
    assert len(article.select('.source-line'))==info['reading_units']
    for control in ['reader-prev','reader-next','reader-reset','reader-notes','reader-position']:
        assert article.find(id=control)
    assert len(article.select('.local-note'))==len(info['slides'])
    assert len(article.select('.reader-original'))==len(info['slides'])
    assert len(article.select('.quiz'))==original.count('class="quiz"')
    assert len(article.select('.ff-widget'))==original.count('class="ff-widget"')
    for slide in info['slides']:
        assert f'slide-{slide:03d}' in ids
        image=article.select_one(f'.reader-original img[src$="/{slide:03d}.png"]')
        assert image and Path('_static/slides',f'{slide:03d}.png').exists()
    for element in article.select('.math'):
        t=element.get_text().strip()
        if t.startswith(r'\['):t=t[2:-2]
        elif t.startswith(r'\('):t=t[2:-2]
        formulas.append({'chapter':name,'tex':t,'display':element.name=='div'})
    info['validated']=True
assert Path('chapters/c01.md').read_bytes()==Path('_build/revision-backup/chapters/c01.md').read_bytes(), 'chapter 1 changed'
Path('_build/math-formulas.json').write_text(json.dumps(formulas,ensure_ascii=False),encoding='utf-8')
report['validation']={'strict_build':True,'original_paragraph_anchors':sum(x['original_anchors'] for x in report['chapters']),'frames':sum(x['frames'] for x in report['chapters']),'remarks':sum(x['remarks'] for x in report['chapters']),'formulas':len(formulas),'chapter_1_unchanged':True,'visual_check':'No browser surfaces are available through CUA.'}
Path('_build/revision-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report['validation'],ensure_ascii=False,indent=2))
