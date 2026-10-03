from pathlib import Path
import json,hashlib,urllib.request
path=Path('_build/revision-validation.json')
report=json.loads(path.read_text(encoding='utf-8'))
math=json.loads(Path('_build/mathjax-validation.json').read_text(encoding='utf-8'))
assert not math['errors']
manifest=json.loads(Path('SOURCE_MANIFEST.json').read_text(encoding='utf-8'))
digest=hashlib.sha256(Path('original/lecture.pptx').read_bytes()).hexdigest()
assert digest==manifest['sha256']
report['validation'].update({'mathjax_parser':'3.2.2; TeX base/ams/newcommand; SVG output','mathjax_formulas':math['count'],'mathjax_errors':0,'original_ppt_sha256':digest,'original_ppt_matches_manifest':True,'display_formulas_over_100ex':len(math['wide'])})
for name in ('c02','c19'):
    with urllib.request.urlopen('http://127.0.0.1:8000/chapters/'+name+'.html') as response:
        assert response.status==200
report['validation']['preview_http']=200
path.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
lines=['第 2—19 章修订记录','',
       '主要修改：按完整定义、定理、命题、引理、推论、例子和练习组织内容框；保持各类框颜色。',
       '新增解释移至内容框末，统一为按章连续编号的备注，采用实心黑点；相关公式留在对应要点内。',
       '合并映射、等式链和余类列表，修复矩阵、判别式、表格及转换遗留数学格式。',
       '595 个原段落锚点全部保留；合并公式的旧段落改为锚点别名，导航不保留空白单元。',
       '第一章源文件未改变；附录、original/、原页图和 reader.js 未修改。样式修改限于 statement-box 和章内编号备注。',
       '', '各章预览（本地预览服务运行期间有效）：']
for info in report['chapters']:
    name=info['chapter']; title=Path('chapters',name+'.md').read_text(encoding='utf-8').splitlines()[0].removeprefix('# ')
    lines.append(f'{name} {title}：{info["frames"]} 框，{info["remarks"]} 备注；http://127.0.0.1:8000/chapters/{name}.html')
lines+=['','正文纠错（按原页顺序）：']
for c in sorted(report['corrections'],key=lambda x:x['anchor']):
    lines.append(c['anchor']+'：'+c['correction'])
lines+=['','待确认：']+[item['anchor']+'：'+item['issue'] for item in report['uncertain']]
lines+=['','验证结果：',
        'Jupyter Book / Sphinx 严格编译通过（--warningiserror --keep-going）。',
        f'MathJax 解析并生成 SVG：{math["count"]} 条公式，0 个解析错误。未发现宽度超过 100ex 的显示公式。该宽度检测不能代替实际页面中的换行及溢出检查。',
        '已检查 HTML 中的备注连续编号、黑点列表、备注所在框及位置、公式列表归属、原段落与原页锚点、阅读按钮、对照图、自测和笔记输入框。',
        '原始 PPT 的 SHA-256 与 SOURCE_MANIFEST.json 一致。预览页面 HTTP 返回 200。',
        '当前 CUA 未提供浏览器，未进行实际浏览器视觉检查或点击交互检查。',
        '', '机器可读结果：_build/revision-validation.json、_build/mathjax-validation.json',
        '编译日志：_build/remaining-build.log',
        '修订前章节备份：_build/revision-backup/chapters/']
Path('_build/revision-report.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print('修订记录与验证结果已写入 _build/revision-report.txt')
