from pathlib import Path
import re,json
root=Path('finite-fields-book')
backup=root/'_build/textbook-backup/chapters';backup.mkdir(parents=True,exist_ok=True)
pattern=re.compile(r'^:::::\{container\} statement-box[^\n]*\n:name: (c\d+-statement-\d+)\n.*?^:::::\s*$',re.M|re.S)
configs={
2:('等价类将集合划分，陪集把这一思想用于群。学完本章，你应能验证代表元无关性，并用陪集划分证明拉格朗日定理。',[( '等价关系与等价类',[1,2]),('模 n 剩余类与加法群',[3,4]),('左陪集及其划分',[5,6,7,12]),('指标与拉格朗日定理',[10,11])],'cosets','模加法群中的陪集'),
3:('本章把循环群的子群、元素阶和生成元统一到整数的整除关系中。学完后应能由最大公因数计算元素阶，列出全部子群，并统计生成元。',[('循环群结构定理总览',[1]),('子群为什么仍是循环群',[2]),('元素的阶与最大公因数',[3]),('子群的存在与唯一性',[4]),('生成元与指定阶元素的计数',[6,5])],'cyclic','循环群的阶与子群'),
4:('从两种运算构成的环出发，本章说明理想如何保证商运算良定义，最后构造素数阶有限域并讨论特征。注意本书的环不预设单位元。',[('环、整环与域',[1,2,3,4,5,6,7]),('子环、理想与主理想',[8,9,10,13,17]),('商环及代表元无关性',[14,16,15]),('同态、核与同态基本定理',[11,12,19]),('素数阶有限域',[20,21]),('环的特征与 Frobenius 公式',[22,23,24,25,26])],'residues','剩余类环的单位与零因子'),
5:('多项式是形式对象。学完本章应能区分多项式与多项式函数，执行带余除法，并用 Euclid 算法求最大公因子和 Bézout 系数。',[('形式多项式及其运算',[1,2]),('次数、首项与整除',[3,4,5]),('带余除法与唯一性',[6]),('多项式理想的生成元',[7]),('最大公因子与 Bézout 等式',[8,10,9])],'division','二元多项式的 Euclid 算法'),
6:('不可约多项式是构造有限域的关键。学完本章应能解释不可约性与商域的等价关系，使用素元性质，并区分不可约与本原。',[('不可约性的定义与系数域',[1]),('不可约多项式与商域',[2]),('素元性质与唯一分解',[3,4])],'irreducible','二元多项式的不可约判别'),
7:('本章用根与一次因子的对应建立根数界，再用它证明插值的唯一性。重数和形式导数需要特别注意正特征。',[('根、因子与重数',[1,2,3]),('根数界与不可约性判别',[4,7]),('形式导数与重根',[5,6]),('Lagrange 插值',[8])],'interpolation','三个节点的有限域插值'),
8:('从素子域出发，通过添加元素构造扩域。学完后应能区分代数元与超越元，并利用代入同态确定极小多项式。',[('子域与素子域',[1,2,3,4]),('添加元素与生成子域',[5]),('代数元与超越元',[6]),('代入同态与极小多项式',[7,8,9])],'minimal','由 Frobenius 轨道计算极小多项式'),
9:('把扩域看作基域上的向量空间，才能精确计算扩张次数。本章依次介绍塔式法则、代数单扩张和分裂域。',[('扩域作为向量空间',[1,2,3]),('塔式法则与有限扩张的代数性',[4,5]),('代数单扩张的幂基',[6,7,8]),('分裂域的定义、存在与唯一性',[9,10])],'coordinates','扩张次数与幂基坐标'),
10:('有限域的大小必须是素数幂，但每个素数幂也确实对应一个有限域。本章通过 x^q−x 的根集证明存在性，并用整除关系描述子域。',[('大小、特征与扩张次数',[1,2]),('x^q−x 的根与分解',[3,4,5]),('有限域的存在与唯一性',[6]),('子域判别与包含关系',[7,8])],'subfields','有限域子域的整除关系'),
11:('本原元生成有限域的非零乘法群。学完后应能区分乘法群生成元与域扩张定义元，理解为什么每个正次数都有不可约多项式。',[('有限域乘法群的循环性',[1]),('本原元与个数',[2,3]),('单扩张与各次数不可约多项式',[4,5])],'primitive','寻找 GF(16) 的本原元'),
12:('Frobenius 把不可约多项式的根组织成一个轨道。本章区分元素的次数与所在扩域的次数，说明共轭元何时重复。',[('极小多项式与整除判据',[1,2]),('不可约多项式的根与分裂域',[3,4,5]),('共轭元、轨道长度与重复',[6,7,8])],'conjugates','观察共轭轨道与重复次数'),
13:('迹是共轭元之和，范数是共轭元之积。学完本章应能区分它们的线性与乘法性质，并用特征多项式解释矩阵迹与行列式。',[('Frobenius 与自同构',[1,2]),('迹、特征多项式与乘法算子',[3,4,5]),('迹的性质、配对与零迹元素',[6,7,8,9]),('范数及其传递性',[10,11,12])],'trace','绝对与相对迹、范数'),
14:('基决定坐标，迹配对决定对偶基，Frobenius 共轭给出正规基。本章用判别式与 Moore 矩阵检验线性无关。',[('坐标映射与对偶基',[1,2]),('正规基及其存在性',[3,4]),('迹矩阵与判别式',[5,6]),('Moore 行列式判据',[7])],'basis','GF(4) 的基、对偶基与迹矩阵'),
15:('单位根的乘法阶连接循环群和多项式分解。学完后应能区分本原单位根与普通单位根，并由 q 模 n 的乘法阶确定有限域上的割圆因子次数。',[('单位根与割圆域',[1,2]),('本原单位根与割圆多项式',[3,4,5]),('乘积分解与素数幂公式',[6,7,10]),('不同基域上的割圆扩张',[8,9])],'cyclotomic','q-陪集与割圆因子次数'),
16:('同一个有限域可以用多项式、幂或矩阵表示。学完后应能明确各表示的运算规则，理解整数编码仅用于存储而不保持普通整数运算。',[('多项式坐标表示',[1,2]),('本原元与幂表示',[3,4,5,6]),('伴随矩阵表示',[7,8,9]),('位串、整数编码与 XOR',[10,11,12,13]),('对数表实现乘除法',[14])],'encoding','GF(16) 的位编码与对数表'),
17:('先用逐变量根数界判定网格上的恒零多项式，再描述消失理想，最后由最高次数层的系数推出非零取值。',[('有限网格上的根数界',[1]),('网格消失理想与带余除法',[2]),('组合零点定理的系数判别',[3])],'grid','网格取值与逐变量次数'),
18:('本章把多项式的非零系数和零点计数用于加法组合。依次学习和集下界、Chevalley–Warning 的整除结论与指定长度零和子序列。',[('和集与 Cauchy–Davenport 定理',[1]),('Chevalley–Warning 的零点计数',[2,3]),('零和问题及最优下界',[4,5]),('Erdős–Ginzburg–Ziv 定理',[6,7])],'sumsets','计算有限域中的和集'),
19:('多项式检验依赖零点比例上界。学完后应能明确独立均匀抽样的作用，区分非零形式多项式与非零函数，并理解二元多线性情形的特殊下界。',[('Schwartz–Zippel 零点数上界',[1]),('随机检验的错误概率',[3]),('二元多线性多项式的非零点下界',[2])],'identity','网格零点比例与随机检验')
}
fixes={
2:[('H < G','H\\leq G')],
3:[('指数分别是','指标分别是'),('其指数为','其指标为')],
4:[('[0.25]\\overset{?}{=}[0.75]',r'\tfrac14+\mathbb Z\ne\tfrac34+\mathbb Z'),('交换环，且 $R$ 中的非零元素', '非零交换环，且 $R$ 中的非零元素'),('令 $R$ 为一个交换环且其特征为素数 $p$.','令 $R$ 为一个交换环且其特征为素数 $p$，设 $n\\geq0$ 为整数。')],
5:[('\\exists q,r\\in\\mathbb F[x]', '\\exists! (q,r)\\in\\mathbb F[x]^2')],
6:[('给定非常数多项式 $f', '给定非零非常数多项式 $f'),('其中 $a \\in {\\mathbb{F}},', '其中 $a \\in \\mathbb F^\\ast,' )],
7:[('元素 $b \\in {\\mathbb{F}}$ 是多项式 $f$ 的一个重根','设 $f\\ne0$。元素 $b \\in {\\mathbb{F}}$ 是多项式 $f$ 的一个重根')],
10:[('\\prod_{a \\in {\\mathbb{F}}_{q}}^{}','\\prod_{a \\in \\mathbb F}')],
15:[('特征为 $p $的域','特征为 $p\\geq0$ 的域'),('特征为 $p $的域，','特征为 $p\\geq0$ 的域，'),('特征为 $p$ 且 $p\\nmid n$','特征为 $0$，或特征为素数 $p$ 且 $p\\nmid n$'),('如果 $p \\nmid n$','如果 $p=0$ 或 $p \\nmid n$'),('如果 $p\\mid n$','如果 $p>0$ 且 $p\\mid n$'),('为不被 $p$ 整除的正整数','为正整数，且 $p=0$ 或 $p\\nmid n$'),('是一个不被 $p $整除的正整数','是正整数，且 $p=0$ 或 $p\\nmid n$'),('设 $r$ 为素数且 $k$ 为正整数。则','设 $r$ 为素数且 $k$ 为正整数，并设 $K$ 的特征为 $0$ 或不等于 $r$。则')],
16:[('\\mathbb{F}}_{q}$ 是$ {\\mathbb{F}}_{p} $的单扩张.', '\\mathbb{F}}_{q}$ 是$ {\\mathbb{F}}_{p} $的单扩张，其中 $q=p^n$。'),('\\mathbb{F}}_{4} = {\\mathbb{F}}_{2}[ x]/(x^{2} + x + 1) =', '\\mathbb{F}}_{4} = {\\mathbb{F}}_{2}[ x]/(x^{2} + x + 1)\\cong'),('GF}(2^w)=','GF}(2^w)\\cong')],
17:[('（Hilbert 零点定理）','（有限网格上的消失理想定理）'),('${s_{1} \\in S}_{1},{s_{2} \\in S}_{2,}\\cdots,s_{n}{\\in S}_{n},',' $s_1\\in S_1,\\ldots,s_n\\in S_n$，')],
18:[('(Erdos-Ginzburg-Ziv)','（Erdős–Ginzburg–Ziv）')],
19:[('则\\n\\n$$','则\n\n$$')]
}
reports=[]
for n,(goal,groups,kind,widget_title) in configs.items():
 p=root/f'chapters/c{n:02}.md';original=p.read_text(encoding='utf-8');(backup/p.name).write_text(original,encoding='utf-8')
 s=original
 for a,b in fixes.get(n,[]):s=s.replace(a,b)
 blocks={int(m[1].rsplit('-',1)[1]):m[0] for m in pattern.finditer(s)}
 allpages=list(map(int,re.findall(r'^\(slide-(\d+)\)=',s,re.M)))
 title=s.splitlines()[0]
 toolbar=re.search(r'```\{raw\} html\n<div class="reader-toolbar".*?\n```',s,re.S).group(0)
 text=title+f'\n\n<span class="lecture-meta">对应原讲义第 {min(allpages)}–{max(allpages)} 页 · 教材结构 · 保留 PPT 对照</span>\n\n'+goal+'\n\n正文按概念组织，已订正核实的笔误与条件；“备注”和“新增”标记教材补充。原页图片、原始转写和原文件用于对照。\n\n'+toolbar+'\n\n点击正文段落可聚焦；正文获得焦点时可用 ↑ / ↓ 移动。每个数学陈述保留完整内容框，浏览器保存阅读进度和逐页笔记。\n\n'
 # Retain preparatory material once, after the learning goals.
 pre=s[:s.index(f'(slide-{allpages[0]:03})=')]
 extras=re.findall(r'```\{admonition\} (?:补充[^\n]*)\n.*?\n```',pre,re.S)
 if extras:text+='\n\n'.join(extras)+'\n\n'
 # Merge the two genuine repeated coset statements, retaining all explanatory notes.
 if n==2:
  for keep,drop in [(6,8),(7,9)]:
   notes=re.findall(r'```\{admonition\} 备注 \d+\n.*?\n```',blocks[drop],re.S)
   blocks[keep]=blocks[keep].rsplit(':::::',1)[0]+'\n\n'+'\n\n'.join(notes)+'\n:::::'
 for heading,ids in groups:
  pages=sorted({int(x) for i in ids for x in re.findall(r':name: p(\d+)-',blocks[i])})
  links='、'.join(f'[第 {x} 页](#slide-{x:03})' for x in pages)
  text+=f'## {heading}\n\n原页对照：{links}。\n\n'
  text+='\n\n'.join(blocks[i] for i in ids)+'\n\n'
 # Preserve the prior chapter-specific computations, tests, and solutions.
 suffix=s[s.index('## 交互计算（新增）'):] if '## 交互计算（新增）' in s else s[s.index('## 本节自测（新增）'):]
 text+=f'## 交互实验：{widget_title}（新增）\n\n```{{raw}} html\n<div class="lesson-widget" data-kind="{kind}" aria-label="{widget_title}"></div>\n```\n\n'+suffix+'\n\n'
 text+='## 原页对照与笔记\n\n正文已按概念重组；以下保留每一张原页及逐页笔记。重复页合并后的内容可在前文相应概念中找到。\n\n'
 for page in allpages:
  section=re.search(rf'\(slide-{page:03}\)=\n.*?(?=\(slide-\d+\)=|## (?:交互计算|本节自测)|\Z)',s,re.S).group(0)
  originals=re.findall(r'```\{raw\} html\n<details class="reader-original".*?\n```',section,re.S)
  notes=re.findall(r'```\{raw\} html\n<label for="note-\d+".*?\n```',section,re.S)
  assert len(originals)==len(notes)==1,(n,page)
  text+=f'(slide-{page:03})=\n### 原讲义第 {page} 页\n\n'+originals[0]+'\n\n'+notes[0]+'\n\n'
 # Keep every old mathematical anchor, including the anchors of merged duplicates.
 getids=lambda t:{a or b for a,b in re.findall(r'^:name: ([\w-]+)|^\(([\w-]+)\)=',t,re.M)}
 missing=getids(original)-getids(text)
 if missing:text+='```{raw} html\n'+''.join(f'<span id="{id}"></span>' for id in sorted(missing))+'\n```\n'
 counter=[0]
 def renumber(m):counter[0]+=1;return m[1]+str(counter[0])
 text=re.sub(r'(```\{admonition\} 备注 )\d+',renumber,text)
 # Replace empty slide-style proof headings with a precise pointer to their explanatory notes.
 text=text.replace('\n证明\n::::','\n证明要点见本框备注。\n::::').replace('\n证明\n:::::', '\n证明要点见本框备注。\n:::::')
 # This corollary lacked a proof note: supply the reason explicitly.
 if n==4:text=text.replace('有限域的特征是素数.','有限域的特征是素数。有限性保证单位元的加法阶为正整数，再应用整环特征定理。')
 p.write_text(text,encoding='utf-8')
 reports.append({'chapter':n,'title':title[2:],'concept_sections':[h for h,_ in groups],'old_blocks':len(blocks),'new_blocks':sum(len(ids) for _,ids in groups),'pages':allpages,'anchors_retained':True,'remarks':counter[0],'experiment':kind,'math_fixes':[a for a,b in fixes.get(n,[]) if a in original]})
(root/'_build/textbook-restructure.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
print('Reorganized 18 chapters; source pages and anchors retained.')
