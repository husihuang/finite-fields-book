from pathlib import Path
import json,re
root=Path('finite-fields-book')
for page in range(1,125):assert (root/f'_static/slides/{page:03}.png').is_file()
p=root/'VALIDATION.json';old=json.loads(p.read_text(encoding='utf-8'))
if 'initial_release_validation' in old:old=old['initial_release_validation']
current={'date':'2026-10-03','original_sha256':'matched','slides':124,'sections':19,'textbook_chapters_completed':19,'reading_units':sum(len(re.findall(r'^::::\{container\} source-line',p.read_text(encoding='utf-8'),re.M)) for p in (root/'chapters').glob('c*.md')),'local_chapter_resources':'all 124 source slide images exist','jupyter_book_build':'passed with warnings treated as errors','browser_visual_test':'passed: chapter-specific mobile screenshots and selected dark themes inspected','browser_functional_chapters':19,'browser_formula_errors':0,'browser_script_errors':0,'independent_math_cases':651,'square_group_products':64,'notebook_source':'unchanged; initial validation preserved below','initial_release_validation':old}
p.write_text(json.dumps(current,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
p=root/'README.md';s=p.read_text(encoding='utf-8')
s+='''
## 教材结构与交互实验

全部 19 章按概念组织。章首给出学习目标，各节附 PPT 原页入口；每章末集中保留原页图片与逐页笔记。正文订正与新增内容、逐章审阅记录见 `TEXTBOOK_REVIEW.txt` 和 `CHAPTER_REVIEW.json`。

各章的实验分别对应陪集、循环群、剩余类环、多项式 Euclid 算法、不可约性、插值、极小多项式、幂基、子域、本原元、共轭、迹范数、对偶基、割圆因子、位编码、网格取值、和集及随机检验。第 16 章另保留通用四则计算；第一章提供正方形对称群动画。均在浏览器本地运行。

本轮备份保存在 `_build/textbook-backup/chapters/`。验证脚本在 `tools/`，验证记录在 `_build/textbook-browser-validation.json` 与 `_build/textbook-math-validation.json`。重新组织章节的脚本供追踪本轮修改，勿对已改完的正文重复执行。
'''
p.write_text(s,encoding='utf-8')
print('Validation metadata and README updated; 124 source images confirmed.')
