from pathlib import Path
import re
root=Path('finite-fields-book')
for n in range(2,20):
 p=root/f'chapters/c{n:02}.md';s=p.read_text(encoding='utf-8')
 s=s.replace('aria-label="'+re.search(r'<div class="lesson-widget" data-kind="[^"]+" aria-label="([^"]+)"',s)[1]+'"></div>', 'aria-label="'+re.search(r'<div class="lesson-widget" data-kind="[^"]+" aria-label="([^"]+)"',s)[1]+'"><noscript>此实验需要 JavaScript。可阅读正文中的定理与章末推理练习。</noscript></div>')
 if n!=16:
  s=re.sub(r'## 交互计算（新增）\s*```\{raw\} html\n<div class="ff-widget">.*?\n```\s*','',s,flags=re.S)
 else:
  s=s.replace('## 交互计算（新增）','(field-arithmetic)=\n## 有限域四则计算（新增）')
 if n==13:
  s=re.sub(r'## 矩阵视角（新增）\n.*?(?=## 本节自测)', '',s,flags=re.S)
  needle='因此$ \\operatorname{Tr}_{F/K}(\\alpha) = - a_{m - 1}.$'
  s=s.replace(needle,needle+' 同时 $N_{F/K}(\\alpha)=(-1)^m a_0$；这些系数来自完整特征多项式，即使 $\\alpha$ 不生成整个扩域也成立。')
 p.write_text(s,encoding='utf-8')
p=root/'intro.md';s=p.read_text(encoding='utf-8').replace('原文件的编号重复（如两个 3.5、两个 3.6）保留在正文，本书目录用主题名称区分。','原文件中重复的节编号（如两个 3.5、两个 3.6）可在 PPT 对照中查看；教材正文用概念标题区分。').replace('色框外的原文标记和文字仍保留；不只通过颜色区分类别。逐段颜色按原页定义、定理等标记归类，版面顺序异常时同时参考原页。','数学内容框保留定义、定理、例子等文字标记，类别不只由颜色区分。备注和新增证明位于对应内容框内；如需核对讲授顺序，可查看原页。');p.write_text(s,encoding='utf-8')
p=root/'tools/check_chapter1.cjs';s=p.read_text(encoding='utf-8').replace('/chapters/c10.html','/chapters/c16.html');p.write_text(s,encoding='utf-8')
