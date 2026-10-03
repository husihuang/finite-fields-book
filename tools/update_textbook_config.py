from pathlib import Path
p=Path('finite-fields-book/_config.yml');s=p.read_text(encoding='utf-8').replace('"symmetry.js"]','"symmetry.js", "lessons.js"]');p.write_text(s,encoding='utf-8')
p=Path('finite-fields-book/_toc.yml');s=p.read_text(encoding='utf-8').replace('caption: 逐页讲义','caption: 教材正文');p.write_text(s,encoding='utf-8')
p=Path('finite-fields-book/intro.md');s=p.read_text(encoding='utf-8').replace('第一章已按教材概念重组，合并重复定义并保留原页对照；其余章节目前沿用逐页结构，等待逐章检查。','全部 19 章均按教材概念重组，合并重复定义，保留每张原页对照、旧段落入口与逐页笔记。').replace('1. 每节先读补充定义，建立记号和背景。','1. 先阅读章首学习目标，再沿概念标题理解定义、定理、证明和例子。').replace('3. 需要时查看原页对照图；用逐页解释理解证明，或用页内笔记记录疑问。','3. 每节通过原页入口与 PPT 对照；原页对照和逐页笔记集中在各章末尾。').replace('4. 使用自测与浏览器计算器核验理解。','4. 使用各章对应的参数实验、自测和浏览器计算器核验理解。');p.write_text(s,encoding='utf-8')
