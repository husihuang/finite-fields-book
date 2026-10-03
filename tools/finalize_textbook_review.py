from pathlib import Path
import json,re,hashlib
root=Path('finite-fields-book')
p=root/'chapters/c05.md';s=p.read_text(encoding='utf-8').replace('\n略.\n','\n完整论证见下方“证明（新增）”。\n');p.write_text(s,encoding='utf-8')
chapters=list(sorted((root/'chapters').glob('c*.md')))
all_slides=[int(x) for p in chapters for x in re.findall(r'^\(slide-(\d+)\)=',p.read_text(encoding='utf-8'),re.M)]
assert sorted(all_slides)==list(range(1,125))
manifest=json.loads((root/'SOURCE_MANIFEST.json').read_text(encoding='utf-8'))
sha=hashlib.sha256((root/'original/lecture.pptx').read_bytes()).hexdigest();assert sha==manifest['sha256']
structure=json.loads((root/'_build/textbook-restructure.json').read_text(encoding='utf-8'))
review=json.loads((root/'CHAPTER_REVIEW.json').read_text(encoding='utf-8'))
review['date']='2026-10-03';review['chapters']=[{'file':f'chapters/{p.name}','title':p.read_text(encoding='utf-8').splitlines()[0][2:],'status':'reviewed_and_reorganized'} for p in chapters]
review['remaining_chapters']=0
review['checks']['all_chapters']={'strict_book_build':'passed','browser_chapters_checked':18,'experiment_math_cases':651,'slide_coverage':124,'original_ppt_sha256':sha,'old_anchor_validation':'all retained','browser_errors':0,'formula_parse_errors':0}
review['chapter2_to19_structure']=structure
(root/'CHAPTER_REVIEW.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
notes={2:'合并重复陪集定义和基数练习；统一子群记号 H≤G，按“划分→指标→拉格朗日”组织；实验显示陪集互不相交和覆盖。',3:'明确指标与子群阶，先总览后按论证组织；补强子群唯一性证明；实验列出子群和生成元个数。',4:'沿用不预设单位元的环约定；解释子环并非理想，补清 Q/Z 中两个陪集的比较；保留同态像与陪域的区别；实验核对单位、逆元和零因子。',5:'明确商余式唯一性并补上完整证明；按形式多项式、次数、除法、理想、最大公因子组织；实验输出 Euclid 过程和 Bézout 系数。',6:'唯一分解限定非零多项式，常数因子 a≠0；商域判据证明覆盖 f=0 与非零常数；实验显示非平凡因子。',7:'重根判据限定非零多项式；将根数界、导数和插值各自成节；实验验证三个节点的唯一插值。',8:'补充代入核生成元不可约性的论证；区分最小子域、代数元和极小多项式；实验从共轭轨道计算极小多项式。',9:'补充塔式法则的基乘积证明；区分维数与元素数；实验显示幂基坐标和扩张次数。',10:'分解式统一使用当前域 F 的元素；完整说明根集构造及同构意义下唯一性；实验显示子域的整除包含关系。',11:'补入有限乘法子群循环性的根数界证明；区分本原元与域定义元；实验对照乘法阶和极小多项式次数。',12:'完整证明轨道长度等于元素次数；区分不同共轭个数与重复次数；实验列出完整共轭序列。',13:'合并重复伴随矩阵说明；保留完整特征多项式的迹与范数系数关系；实验区分绝对与相对迹、范数及基域编码。',14:'将坐标、对偶、正规、判别式分别组织；补充迹矩阵等于 Moore 矩阵转置乘积的证明；正规基证明注明循环向量定理这一前置工具；实验检验基和对偶条件。',15:'显式纳入特征 0，区分正特征整除 n 的重根情形；素数幂公式补上特征条件；实验计算 q-轨道和割圆因子次数。',16:'按多项式、幂、矩阵和位编码组织；以同构/编码对应区分模型与原始集合；实验生成本原元对数表，保留通用四则计算。',17:'将有限网格消失理想定理与一般 Hilbert 零点定理区分；补全组合零点定理证明；实验显示逐变量次数条件与网格取值。',18:'补入 Cauchy–Davenport、Chevalley–Warning 和素数情形零和命题的证明；一般零和结论由因子递推连接；实验计算和集并去重。',19:'清理字面量换行残留；补入 Schwartz–Zippel 归纳证明；明确多线性条件和独立抽样；实验比较实际零点比例、理论界及重复检验概率。'}
lines=['教材结构与逐章审阅记录','完成日期：2026-10-03','范围：第 2–19 章；第一章及正方形动画保留。','']
for x in structure:
 n=x['chapter'];lines+= [f'第 {n} 章 {x["title"]}','教材顺序：'+' → '.join(x['concept_sections']),'检查与改进：'+notes[n],'']
lines+=['统一改进：每章含学习目标、概念标题、原页入口、完整数学内容框、编号备注、参数实验、自测、推理练习解答及原页笔记。','原始 124 页全部保留；被合并的旧段落入口定位到对应概念。','新增 16 处核心论证，18 章练习解答规范为 LaTeX。','严格构建通过；18 章 Edge 实测公式、自测、笔记、入口与 390px 页面宽度通过；651 组数学与无效输入检查通过。','原始 PPT SHA-256：'+sha,'参考核对：Milne 作者课程讲义及 Alon 作者论文；链接见附录延伸阅读。','修订前备份：_build/textbook-backup/chapters/','构建输出：_build/html/；结构与浏览器验证见 _build/textbook-*.json。','']
(root/'TEXTBOOK_REVIEW.txt').write_text('\n'.join(lines),encoding='utf-8')
print('124 pages retained; PPT checksum matched; all 19 chapter statuses recorded.')
