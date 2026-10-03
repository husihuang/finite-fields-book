from pathlib import Path
import re, json, hashlib, sys
sys.path.insert(0,str(Path(__file__).resolve().parent))
from inspect_chapters import parse, UNIT, NOTE, PAGE_NOTE

ROOT = Path(__file__).resolve().parent.parent
BACKUP = ROOT / '_build/revision-backup/chapters'
# Each interval is one complete statement, independently of the PPT text boxes.
PLAN = '''
10 2-7:definition 8-11:exercise
11 1-6:example
12 1-7:example
13 1-4:exercise 5-8:definition 9-11:exercise
14 1-4:definition 5-7:exercise
15 1-2:definition 3-4:proposition 5-7:theorem
16 2-10:theorem
17 1-4:theorem
18 1-4:theorem
19 1-5:theorem
20 1-4:theorem
21 1-4:theorem
22 2-9:definition
23 1-2:definition 3-4:definition 5-6:definition 7-9:definition
24 1-5:example
25 1-3:theorem
26 1-2:definition 3-5:definition 6-7:exercise
27 1-5:definition 6-7:proposition
28 1-2:definition 3-7:exercise 8-9:example
29 1-8:proof
30 1-6:example
31 1-2:example 3-7:theorem
32 1-3:theorem
33 1-8:example
34 1-4:definition 5-6:example
35 1-3:theorem 4-6:corollary
36 1-4:exercise
37 2-6:definition
38 1-4:notation
39 1-9:definition
40 1-6:exercise
41 2-3:notation 4-9:theorem
42 1-3:theorem
43 1-6:exercise 7-8:exercise
44 1-4:definition
45 2-5:definition
46 1-2:theorem
47 1-3:corollary
48 1-4:exercise
49 2-3:definition 4-5:theorem 6-9:definition
50 1-4:theorem
51 1-3:definition 4-6:exercise 7-8:exercise
52 1-2:theorem
53 2-3:definition 4-5:example 6-7:definition
54 1-4:theorem
55 1-5:definition
56 1-4:definition
57 1-4:theorem 5-6:definition
58 1-5:theorem
59 2-10:definition
60 1-2:exercise 3-4:definition
61 1-2:theorem
62 1-2:theorem
63 1-5:theorem
64 1-2:theorem
65 1-2:theorem
66 1-4:definition
67 1-4:theorem
68 2-3:lemma
69 1-2:theorem
70 1-3:lemma 4-6:lemma
71 1-2:example
72 1-2:theorem
73 1-2:theorem
74 1-2:example
75 2-3:theorem 4-5:definition 6-7:corollary
76 1-2:theorem 3-4:corollary
77 2-3:lemma 4-5:lemma
78 1-3:theorem 4-5:corollary
79 1-2:corollary 3-6:definition
80 1-4:corollary 5-6:theorem
81 2-5:definition
82 1-4:theorem
83 1-4:definition
84 1-5:definition
85 1-7:proof
86 1-7:theorem
87 1-5:theorem
88 1-3:theorem
89 1-3:theorem
90 1-3:definition
91 1-7:theorem
92 1-4:theorem
93 2-8:example
94 1-2:definition 3-4:definition 5-6:theorem
95 1-4:definition
96 1-3:theorem
97 1-3:corollary
98 2-3:definition
99 1-5:theorem
100 1-2:definition 3-5:corollary
101 1-4:definition
102 1-4:theorem
103 1-6:example
104 1-4:theorem
105 1-2:theorem
106 1-2:lemma
107 3-4:notation
108 1-5:example
109 1-2:notation 3-4:exercise 5-9:example
110 1-3:example
111 1-5:definition 6-7:lemma
112 2-8:example
113 2-5:example
114 1-7:example
115 1-2:example
116 1-3:example 4-8:example
117 2-7:lemma
118 1-4:theorem
119 1-2:theorem
120 1-3:theorem
121 1-8:theorem 9-10:exercise
122 1-2:definition 3-4:proposition 5-6:theorem 7-8:proposition
123 1-2:lemma 3-4:exercise
124 1-2:lemma
'''
groups = {}
for row in PLAN.strip().splitlines():
    page, *ranges = row.split()
    groups[int(page)] = [(int(a), int(b), kind) for a,b,kind in (re.split('[-:]', r) for r in ranges)]

# Supplements are authored once, immediately after the statement they explain.
# A blank line in a note separates bullet points (not separate note boxes).
NOTES = {
'01002': r'等价类收集与同一元素等价的全部元素。等价关系的三条性质保证任意两个等价类要么相同，要么不交。',
'01101': r'整数除以 $n$ 的余数唯一，故每个整数恰属于 $[0],\ldots,[n-1]$ 中的一个类。这里的 $[a]$ 表示整个剩余类，而不是选定的代表元 $a$。',
'01201': r"需要检查运算与代表元的选择无关：若 $a\equiv a'\pmod n$、$b\equiv b'\pmod n$，则 $a+b\equiv a'+b'\pmod n$。加法单位元是 $[0]$，$[a]$ 的逆元是 $[-a]$。",
'01301': r'条件 $a=bh$ 等价于 $b^{-1}a\in H$；验证对称性和传递性时分别使用 $H$ 对逆元和乘法的封闭性。',
'01305': r'左陪集 $aH$ 的代表元一般不唯一；其中任一元素都可以作为同一陪集的代表元。',
'01309': r'映射 $H\to aH$，$h\mapsto ah$ 是双射，其逆映射为 $x\mapsto a^{-1}x$。因此这里的基数相等也适用于无限群。',
'01401': r'记号 $G/H$ 在这里表示左陪集的集合。只有当 $H$ 为正规子群，即对所有 $g\in G$ 均有 $gH=Hg$ 时，陪集乘法 $(aH)(bH)=abH$ 才给出商群结构。',
'01405': r'两个左陪集若有公共元素，就可由该元素重新选取代表元，从而证明两个陪集相等。',
'01503': r'有限群的陪集分划与每个陪集的大小相同，给出拉格朗日公式。取 $H=\langle a\rangle$，即可得到元素阶整除群阶。',
'01602': r'欧拉函数 $\phi(t)$ 表示 $1,\ldots,t$ 中与 $t$ 互素的整数个数，约定 $\phi(1)=1$。若 $t=\prod_i p_i^{e_i}$，则 $\phi(t)=t\prod_i(1-1/p_i)$。\n\n子群的阶与指数分别是 $|H|$ 和 $[G:H]$，二者满足 $|G|=|H|[G:H]$；阅读本定理的第三、四条时应区分这两个量。',
'01701': r'对非平凡子群 $H\leq\langle a\rangle$，选取使 $a^r\in H$ 的最小正整数 $r$。将任意指数除以 $r$，余数的最小性给出 $H=\langle a^r\rangle$；平凡子群另取单位元为生成元。',
'01801': r'令 $d=\gcd(m,k)$，则 $(a^k)^j=e$ 等价于 $m\mid kj$，也等价于 $(m/d)\mid j$。最小的正整数 $j$ 因而是 $m/d$。',
'01901': r'若 $f\mid m$，阶为 $f$ 的子群是 $\langle a^{m/f}\rangle$，其指数为 $m/f$。循环群的子群均为循环群，这一表示同时说明唯一性。',
'02001': r'阶为 $f$ 的元素必须位于唯一的阶为 $f$ 的子群中，并且恰好是该子群的生成元，故共有 $\phi(f)$ 个。',
'02101': r'由 $\operatorname{ord}(a^k)=m/\gcd(m,k)$，$a^k$ 生成全群当且仅当 $\gcd(m,k)=1$。',
'02202': r'本讲义不在环的定义中预设乘法交换性或单位元。左右分配律都属于环公理；后文的交换环、幺环、整环分别附加相应条件。',
'02305': r'“非零单位元”排除了零环。无零因子条件保证非零元素的乘积仍非零，也是后续消去律的依据。',
'02401': r'$\mathbb Z_4$ 中 $2\cdot2=0$，说明交换环可以有零因子；$\mathbb Z$ 中 $2$ 没有乘法逆元，说明整环未必是域。',
'02501': r'固定 $a\ne0$，若 $ax=ay$，则 $a(x-y)=0$，故 $x=y$。有限集合上的单射也是满射，所以某个 $x$ 满足 $ax=1$；此处有限性不可省略。',
'02603': r'理想的吸收条件允许另一因子取自整个环，比子环的乘法封闭性更强。这里采用双边理想的定义，以保证后文商环的乘法良定义。',
'02606': r'环可能没有单位元，因此生成理想时必须允许整数倍 $na$。若环有单位元，整数倍项已可写成环元素与 $a$ 的乘积。',
'02706': r'若 $a\in\ker\varphi$、$r\in R$，则 $\varphi(ra)=\varphi(r)\varphi(a)=0$，同样 $\varphi(ar)=0$，从而核满足两侧吸收条件。',
'02803': r'商环的元素是陪集 $a+J$。定义运算时必须验证，更换 $a$ 或 $b$ 的代表元不会改变结果所在的陪集。',
'02901': r'展开后多出的三项 $-as$、$-rb$、$rs$ 都属于 $J$，所以它们不改变模 $J$ 的陪集。',
'03001': r'$\mathbb Z$ 是 $\mathbb Q$ 的子环，却不是其理想，因为 $1\in\mathbb Z$ 而 $(1/2)\cdot1\notin\mathbb Z$。\n\n在加法商群 $\mathbb Q/\mathbb Z$ 中，$1/4$ 与 $5/4$ 代表同一陪集；分别乘以 $3/4$ 后得到 $3/16$ 与 $15/16$，两者相差 $3/4\notin\mathbb Z$，故通常乘法不能下降为商环运算。',
'03103': r'像 $\operatorname{im}\varphi=\{\varphi(r):r\in R\}$ 可能只是 $S$ 的真子环。只有当 $\varphi$ 满射时，同态基本定理才给出 $R/\ker\varphi\cong S$。',
'03201': r'对 $1\leq a<p$，由 $\gcd(a,p)=1$ 可取整数 $u,v$ 使 $ua+vp=1$，于是 $u+(p)$ 是 $a+(p)$ 的乘法逆元。',
'03301': r'$\{0,\ldots,p-1\}$ 是剩余类的代表元模型；其中运算结果需模 $p$ 约化，而不是直接保留通常整数运算的结果。',
'03401': r'在有单位元的环中，$nr=(n\cdot1)r$，因此只需考察单位元的加法阶。特征为 $0$ 表示不存在使所有元素的整数倍同时为零的正整数。',
'03501': r'若特征 $n=ab$ 且 $1<a,b<n$，则 $(a\cdot1)(b\cdot1)=0$，而两因子均非零，与整环的无零因子条件矛盾。',
'03601': r'对于 $0<i<p$，二项式系数 $\binom pi$ 被 $p$ 整除。由二项式展开得到 $p$ 次幂公式，再迭代得到 $p^n$ 次幂公式；交换性用于二项式展开。',
'03702': r'多项式是形式表达式，不能仅由在系数环上的取值确定。例如 $\mathbb F_2[x]$ 中的 $x^2-x$ 非零，但代入 $\mathbb F_2$ 的任一元素都得到零。',
'03801': r'加法逐项相加，乘法按指数之和收集系数。补齐系数只影响原多项式次数之外的位置，不能将首项系数置零。',
'03901': r'首项系数必须非零才能确定次数。约定 $\deg0=-\infty$ 后，可统一书写涉及零多项式的次数不等式。',
'04001': r'加法中最高次项可能抵消。整环中非零首项系数的乘积仍非零，故乘积的次数等于两次数之和；有零因子时这个等式可能失效。',
'04104': r'每一步用除式首项系数的逆消去被除式的最高次项，因此系数域条件十分关键。若有两组商、余式，作差并比较次数即可证明它们相同。',
'04201': r'对非零理想，选取次数最小的非零元素并将其首项系数归一化。任一理想元素除以它所得的余式也在理想中，最小性迫使余式为零。',
'04301': r'Euclid 算法以次数更小的余式不断替换多项式，最后一个非零余式归一化后给出最大公因子。',
'04307': r'将各步带余除法的等式倒推，就可把最后的余式写成原来两个多项式的线性组合。',
'04401': r'规定最大公因子为首一多项式，消除了非零常数倍造成的不唯一性。互素等价于存在 $u,v$ 使 $uf_1+vf_2=1$。',
'04502': r'不可约性总是相对于系数域而言。非零常数是多项式环的单位，因而定义中要求多项式非常数，并排除仅由单位造成的分解。',
'04601': r'若 $f$ 不可约，任一非零剩余类的代表元都与 $f$ 互素，Bézout 等式给出其逆元。反之，若 $f$ 有两个正次数真因子，它们的剩余类构成零因子。',
'04701': r'在域上的多项式环中，不可约多项式具有素元性质：若 $p\nmid f$，则 $\gcd(p,f)=1$，用 Bézout 等式即可推出 $p\mid g$。',
'04801': r'将各不可约因子规定为首一，非零常数因子就统一收集到 $a$ 中；唯一性允许调换各因子的排列顺序。',
'04904': r'带余除法给出 $f(x)=(x-b)q(x)+r$，其中 $r=f(b)$，所以代入为零恰好等价于被 $x-b$ 整除。',
'04906': r'重数表示因子 $x-b$ 在分解中出现的次数。零多项式可被任意次幂整除，因此这里的定义限定为非零多项式。',
'05001': r'每个不同的根都贡献一个不同的一次因子，这些因子两两互素；它们的乘积整除 $f$，故根的个数不超过 $\deg f$。',
'05101': r"这是形式导数，系数 $i$ 在系数域中解释。在正特征下，非恒定多项式也可能导数为零，例如特征 $p$ 时 $(x^p)'=0$。",
'05104': r"由 $f=(x-b)g$ 得 $f'=g+(x-b)g'$，故 $f'(b)=g(b)$。于是 $f(b)=f'(b)=0$ 等价于 $(x-b)^2\mid f$。",
'05107': r'二次或三次多项式若可约，分解中必有一次因子，所以必有根。次数更高时，可约多项式未必有基域中的根。',
'05201': r'可显式取\n\n  $$f(x)=\sum_{i=0}^n b_i\prod_{\substack{0\leq j\leq n\\j\ne i}}\frac{x-a_j}{a_i-a_j}.$$\n\n  各分母非零。若两个次数不超过 $n$ 的多项式满足同样的插值条件，它们的差有 $n+1$ 个不同根，只能为零。',
'05306': r'素域并不限于有限域；有理数域也是素域。每个域都含一个唯一的素子域。',
'05401': r'整数映射 $n\mapsto n\cdot1$ 在特征 $p$ 时给出 $\mathbb F_p$；特征 $0$ 时为单射，再加入非零整数像的逆元就得到 $\mathbb Q$。',
'05501': r'$K(M)$ 的交集定义刻画了“最小的子域”。与只允许多项式表达式的 $K[M]$ 相比，$K(M)$ 还允许非零分母；代数单扩张中二者相等。',
'05601': r'“在 $K$ 上”指定方程系数的来源，因而代数性与基域有关。有限扩张一定是代数扩张，但代数扩张未必具有有限次数。',
'05701': r'代入映射 $\operatorname{ev}_\theta:K[x]\to\mathbb F$，$f\mapsto f(\theta)$ 是环同态，且核为 $J$。代数性使 $J$ 非零；其首一生成元的不可约性来自域中无零因子及次数的最小性。',
'05801': r'任意使 $\theta$ 归零的多项式都属于代入同态的核，因而都被极小多项式整除。首一条件保证极小多项式的唯一性。',
'05902': r'向量空间有两个不同层次的运算：向量相加与标量乘向量。标量来自 $K$，向量来自 $V$；公理中的乘法结合性连接这两种对象。',
'06003': r'扩张次数 $[L:K]$ 是向量空间维数，不是元素个数。若 $|K|=q$ 且 $[L:K]=m$，则每个基坐标有 $q$ 种选择，故 $|L|=q^m$。',
'06101': r'将 $L$ 在 $K$ 上的一组基与 $M$ 在 $L$ 上的一组基两两相乘，可得到 $M$ 在 $K$ 上的一组基，从而维数相乘。',
'06201': r'若 $[L:K]=m$，则任取 $\alpha\in L$，$1,\alpha,\ldots,\alpha^m$ 必线性相关，由此得到一个非零的 $K$ 系数多项式使 $\alpha$ 归零。',
'06301': r'代入同态的核由极小多项式 $g$ 生成。带余除法使每个剩余类具有次数小于 $\deg g$ 的唯一代表元，因此给出所列幂基及扩张次数。',
'06401': r'在 $K[x]/(f)$ 中，剩余类 $x+(f)$ 是 $f$ 的一个根；不可约性保证这个商环是域。',
'06501': r'两个单扩张都同构于 $K[x]/(f)$。所得同构固定 $K$，并把一个指定的根送到另一个指定的根。',
'06601': r'分裂域要求多项式完全分裂，且域由全部根生成；仅仅包含全部根的更大域未必是分裂域。',
'06701': r'逐次添加尚未分裂的不可约因子的根即可构造分裂域。唯一性是指固定基域的同构意义下唯一，并不表示相应同构映射只有一个。',
'06802': r'每个元素由 $m$ 个 $K$ 坐标唯一表示，每个坐标有 $q$ 种选择，故共有 $q^m$ 个元素。',
'06901': r'有限域包含特征为 $p$ 的素子域 $\mathbb F_p$，作为其上的有限维向量空间，元素个数必为 $p$ 的正整数次幂。',
'07001': r'对非零元素应用乘法群的拉格朗日定理，得到 $a^{q-1}=1$；零元素也满足 $a^q=a$。',
'07004': r'$x^q-x$ 的导数为 $-1$，故没有重根。域中的 $q$ 个元素已经给出全部根。',
'07101': r'$x^2+x+1$ 在 $\mathbb F_2$ 中无根。令其根为 $\theta$，则 $\theta^2=\theta+1$，因而 $\theta^3=1$，且 $\theta\ne1$。',
'07201': r'在 $\mathbb F_p$ 上取 $x^{p^n}-x$ 的分裂域。其根集对加法、乘法和非零元素的逆封闭，且导数为 $-1$，由此构造出恰有 $p^n$ 个元素的域。',
'07301': r'若 $\mathbb F_{p^m}\subseteq\mathbb F_{p^n}$，塔式法则给出 $m\mid n$。反向可用 $x^{p^m}-x$ 的根集构造子域，根集也说明其唯一性。',
'07401': r'$30$ 的正因子为 $1,2,3,5,6,10,15,30$，所以子域恰为相应的 $\mathbb F_{2^d}$。子域之间的包含关系也由指数的整除关系决定。',
'07502': r'循环性比“每个元素的阶整除 $q-1$”更强：它断言存在阶恰为 $q-1$ 的元素。证明还需使用多项式根数界来排除最大元素阶过小的可能。',
'07504': r'本原元是乘法群的生成元，故必为非零元素；它的阶恰好是 $q-1$。',
'07601': r'本原元的幂包含扩域的全部非零元素，故添加该元素就得到整个扩域。其极小多项式的次数因此等于扩张次数。',
'07702': r'以 $f$ 除 $h$，余式次数小于 $\deg f$。若 $h(\alpha)=0$，余式也在 $\alpha$ 处为零，极小多项式的最小次数迫使余式为零。',
'07704': r'$f$ 的一个根生成 $\mathbb F_{q^m}$；它属于 $\mathbb F_{q^n}$ 当且仅当 $m\mid n$。这把多项式整除问题转化为有限域的子域问题。',
'07801': r'Frobenius 映射 $\alpha\mapsto\alpha^q$ 固定系数域，故把根送到根。根的轨道长度恰为极小多项式的次数 $m$，因而所列 $m$ 个根彼此不同。',
'07903': r'在次数为 $m$ 的扩张中列出的 $m$ 个共轭元可能重复。若元素在基域上的次数为 $d$，不同的共轭元只有 $d$ 个。',
'08001': r'共轭序列以 $d$ 为周期；由塔式法则 $d\mid m$，所以每个不同共轭元恰好出现 $m/d$ 次。',
'08005': r'Frobenius 是域自同构，限制到非零元素后也是群自同构，因而保持元素的乘法阶。',
'08102': r'保持加法、乘法且固定 $K$ 的映射具有零核，所以是单射。由于 $F$ 有限，它也为满射，因此确为自同构。',
'08201': r'Frobenius 的前 $m$ 个幂彼此不同，而任一固定 $K$ 的自同构由一个定义元的像确定；该像必须是极小多项式的根，故至多有 $m$ 种。',
'08301': r'迹是全部共轭元之和，并落在基域中：对和取 $q$ 次幂仅循环置换各项。若元素的次数小于扩张次数，共轭元按重数计入。',
'08401': r'若 $\alpha$ 在 $K$ 上的次数为 $d$，每个不同共轭元重复 $m/d$ 次，故特征多项式是极小多项式的 $m/d$ 次幂。',
'08501': r'这里假设 $\alpha$ 生成整个扩域，才可用 $1,\alpha,\ldots,\alpha^{m-1}$ 作为基。乘以 $\alpha$ 的矩阵是伴随矩阵，对角元之和为 $-a_{m-1}$，与共轭根之和一致。',
'08601': r'迹的满射性不能只由 $\operatorname{Tr}_{F/K}(1)=m$ 推出，因为特征可能整除 $m$。迹多项式非零且次数小于 $|F|$，故迹映射非零；其像是 $K$ 的非零 $K$ 子空间，因此为整个 $K$。',
'08701': r'若 $\beta\ne0$，乘以 $\beta$ 是 $F$ 上的双射，结合迹的满射性说明迹配对非退化。因此 $\beta\mapsto L_\beta$ 单射；定义域与 $K$ 线性泛函空间维数相同，故也是满射。',
'08801': r'映射 $D(\beta)=\beta^q-\beta$ 的核为 $K$，像的维数为 $m-1$。又有 $\operatorname{Tr}_{F/K}(D(\beta))=0$，而迹核同样具有维数 $m-1$，故两者相等。',
'08901': r'先在 $E/F$ 中求共轭和，再在 $F/K$ 中求共轭和，恰好遍历 $E/K$ 的全部共轭元，从而得到传递公式。',
'09001': r'范数是共轭元的乘积，指数是几何级数 $1+q+\cdots+q^{m-1}$。零的范数为零，非零元素的范数属于 $K^\ast$。',
'09101': r'范数保持乘法，通常不保持加法。取 $F^\ast$ 的生成元 $g$，$N_{F/K}(g)$ 的阶恰为 $q-1$，由此得到非零范数映射的满射性。',
'09201': r'指数公式给出直接核验：若 $|K|=q$、$[F:K]=a$、$[E:F]=b$，则两次范数的指数乘积为 $(q^{ab}-1)/(q-1)$，恰是 $E/K$ 的范数指数。',
'09302': r'坐标映射 $c_j$ 是 $K$ 线性泛函，由迹配对可唯一写成 $c_j(\beta)=\operatorname{Tr}_{F/K}(\beta\alpha_j^\ast)$。代入各基向量就得到对偶条件。',
'09401': r'右端为 Kronecker 符号 $\delta_{ij}$：$i=j$ 时为 $1$，其余为 $0$。对偶基使任意 $\beta\in F$ 的第 $j$ 个坐标直接由 $\operatorname{Tr}_{F/K}(\beta\alpha_j^\ast)$ 求得。',
'09403': r'正规基由一个元素及其 Frobenius 共轭组成。它首先必须是一组基；仅有 $m$ 个不同的共轭元还不足以保证线性无关。',
'09501': r'这是迹配对在所给元素组上的 Gram 行列式。它同时使用两项元素的乘积与迹，不应把矩阵误读成各元素迹的外积。',
'09601': r'迹配对非退化，故在一组基上的矩阵可逆。若元素线性相关，对应矩阵也有相同的线性关系，从而行列式为零。',
'09701': r'该矩阵称为 Moore 矩阵。其行列式非零刻画相对于 $\mathbb F_q$ 的线性无关，而不是相对于整个扩域的线性无关。',
'09802': r'单位根满足 $x^n=1$；本原单位根还要求乘法阶恰为 $n$。正特征下若特征整除 $n$，不同根的个数可能小于多项式次数。',
'09901': r'写 $n=mp^e$、$p\nmid m$，则 $x^n-1=(x^m-1)^{p^e}$。后者的 $m$ 个不同根各有重数 $p^e$，所以分裂域与根集都不变。',
'10003': r'这里的本原单位根位于割圆扩域，未必位于基域 $K$。对 $K=\mathbb F_q$，全部 $n$ 次单位根属于 $K$ 当且仅当 $n\mid q-1$。',
'10101': r'割圆多项式的根恰是乘法阶为 $n$ 的单位根，故次数为 $\phi(n)$。它也常记为 $\Phi_n$；这里沿用原讲义的 $Q_n$。',
'10201': r'按每个单位根的乘法阶 $d\mid n$ 对根分组，即得乘积分解。特征为 $p$ 时，割圆多项式也可由整数系数割圆多项式模 $p$ 约化得到。',
'10301': r'公式来自等比数列求和，亦可写成 $Q_{r^k}(x)=\sum_{j=0}^{r-1}x^{jr^{k-1}}$。其中 $k\geq1$，每个指数都是 $j$ 与 $r^{k-1}$ 的乘积。',
'10401': r'当 $n>1$ 时，$d=\operatorname{ord}_n(q)$ 是 $q$ 模 $n$ 的乘法阶。每个本原单位根的 Frobenius 轨道长度都为 $d$，故每个不可约因子次数相同；$n=1$ 时约定 $d=1$。',
'10501': r'$\mathbb F_q^\ast$ 的全部元素都是 $(q-1)$ 次单位根。在任一子域上添加这些根，即得到整个 $\mathbb F_q$。',
'10601': r'$Q_n$ 出现在 $x^n-1$ 的割圆分解中，却不出现在 $x^d-1$ 的分解中，因为 $n\nmid d$；因而它整除相应商式。',
'10703': r'基坐标用于加法，乘法则先作多项式乘法再模 $f$ 约化。构造域只要求 $f$ 不可约，不要求它一定是本原多项式。',
'10801': r'在 $\mathbb F_3$ 中，$x^2+1$ 无根，故不可约。约化规则为 $\alpha^2=2$，两项系数各有三种取值，恰得到九个不同元素。',
'10903': r'若 $\ell$ 遍历 $q-1$ 的不同素因子，非零元素 $\zeta$ 为本原元当且仅当对每个 $\ell$ 均有 $\zeta^{(q-1)/\ell}\ne1$。本原多项式则是本原元在基域上的极小多项式。',
'11001': r'逐行将上一行乘以 $1+\alpha$，再用 $\alpha^2=2$ 约化，便可核验对应表；第八次幂回到 $1$，之前均不为 $1$。',
'11101': r'伴随矩阵表达在幂基下“乘以根”的线性算子。矩阵的单位元素为 $I$；负号和系数都在给定系数域中计算。',
'11202': r'矩阵模型是 $\mathbb F_3[A]$，同构于 $\mathbb F_3[x]/(f)$。这里只取多项式代入 $A$ 所得的矩阵，并不是所有二阶矩阵。',
'11302': r'整数是系数位串的编码。例如编码 $2$ 表示 $x$，并非域中的 $1+1$；域加法由逐位 XOR 实现。',
'11401': r'三个表示之间是集合上的一一对应。最低位对应常数项，编码不保持通常的整数加法或乘法，因此不能把这些对应当作环同构。',
'11501': r'用 $x^4=x+1$ 约化 $x$ 的 successive powers（逐次幂），即可生成原页表格；非零元素的指数以 $15$ 为周期。',
'11601': r'例子中的整数均为四位二进制编码，符号 $+$ 表示域加法，计算由 XOR 完成。',
'11604': r'$\operatorname{gflog}$ 只对非零元素定义；$\operatorname{gfilog}$ 将指数映回域元素，指数按 $15$ 取模。实现乘除时须另行处理零元素及除零情形。',
'11702': r'这里要求逐变量次数满足 $\deg_{x_i}f<|S_i|$。证明可固定其余变量，先对一个变量应用根数界，再归纳到全部变量；总次数界不能代替这些逐变量界。',
'11801': r'$g_i$ 在 $S_i$ 的全部元素处为零。逐变量带余除法将 $f$ 约化为逐变量次数均低于 $|S_i|$ 的余式；前一引理迫使该余式为零。',
'11901': r'总次数是所有非零单项式指数和的最大值。关键单项式位于最高总次数层，并且其系数非零；这些条件共同排除在整个网格上恒为零的可能。',
'12001': r'和集定义为 $A+B=\{a+b:a\in A,b\in B\}$，重复出现的和只计一次。若和集过小，可构造在 $A\times B$ 消失的多项式，再应用组合零点定理得到矛盾。',
'12101': r'在 $\mathbb F_p$ 中对所有点求和，表达式 $\prod_i(1-P_i(x)^{p-1})$ 只在公共零点取 $1$。次数条件使其总和为零，从而公共零点数被 $p$ 整除；这不保证一定有非零解。',
'12201': r'序列允许重复元素；子序列由不同下标选取。因而“选取 $n$ 项”与从互异元素组成的集合中选取 $n$ 个元素不同。',
'12203': r'当 $n\geq2$ 时，取 $n-1$ 个 $0$ 和 $n-1$ 个 $1$。任意 $n$ 项的和均在 $1,\ldots,n-1$ 之间，不能被 $n$ 整除，从而长度 $2n-2$ 不足。',
'12301': r'该上界使用总次数 $d$，不是逐变量次数的乘积。除以 $|S|^n$ 后可得下一页的概率上界。',
'12303': r'多线性条件是必要的：$x_1^2-x_1$ 在二元立方体上处处为零，虽是非零形式多项式，却不满足结论。多线性表示要求每个变量的次数至多为 $1$。',
'12401': r'独立且均匀的抽样使每个点的概率均为 $|S|^{-n}$。实际可用的界为 $\min\{1,d/|S|\}$；重复独立试验可降低非零多项式被误判为零的概率。',
}

OVERRIDES = {}
CORRECTIONS = []
def settext(page, line, text, reason=None):
    key=f'p{page:03d}-l{line:02d}'
    OVERRIDES[key]=text
    if reason: CORRECTIONS.append({'anchor':key,'correction':reason})

def display(s): return '$$\n'+s+'\n$$'
def aligned(*rows): return display('\\begin{aligned}\n'+' \\\\\n'.join(rows)+'\n\\end{aligned}')

settext(23,2,display(r'\exists e\in R,\quad\forall a\in R,\quad ae=ea=a'), '补全单位元定义中对所有环元素的量词。')
settext(11,2,r'设 $n$ 为正整数。整数集 $\mathbb Z$ 上的模 $n$ 同余关系是 $\mathbb Z$ 上的一个等价关系，并将 $\mathbb Z$ 划分成 $n$ 个互不相交的等价类：','明确模 n 同余类计数要求 n 为正整数。')
settext(23,6,display(r'ab=0\ \Longrightarrow\ a=0\text{ 或 }b=0'))
settext(26,5,display(r'\forall a\in J,\ \forall r\in R,\quad ar\in J,\quad ra\in J'), '补全双边理想的两侧吸收条件，与一般环的商环定义一致。')
settext(28,5,aligned(r'(a+J)+(b+J)&:=(a+b)+J,\qquad\text{(1)}',r'(a+J)(b+J)&:=ab+J.\qquad\text{(2)}'))
settext(31,4,r'（环同态基本定理）给定两个环 $R$ 和 $S$，以及环同态 $\varphi:R\to S$。核 $\ker\varphi$ 是 $R$ 的理想，且 $\operatorname{im}\varphi\cong R/\ker\varphi$。反之，给定 $R$ 的任一理想 $J$，映射', '同态未假设满射，将结论中的 S 改为同态的像。')
settext(31,5,aligned(r'\Psi:R&\longrightarrow R/J,',r'a&\longmapsto\Psi(a)=a+J.'))
settext(31,7,r'是环同态，且其核 $\ker\Psi=J$。','自然投影的核记号改为 ker Ψ。')
settext(30,5,display(r'[0.25]\overset{?}{=}[0.75]'))
settext(33,3,aligned(r'\varphi:\mathbb Z/(p)&\longrightarrow\mathbb F_p,',r'a+(p)&\longmapsto a,\qquad 0\leq a<p.'))
settext(33,6,aligned(r'a+b&:=\varphi\bigl((a+b)+(p)\bigr),',r'ab&:=\varphi\bigl(ab+(p)\bigr).'))
settext(37,6,aligned(r'f(x)&=\sum_{i=0}^n a_ix^i,',r'g(x)&=\sum_{j=0}^m b_jx^j.'))
settext(38,2,display(r'f(x)+g(x)=\sum_{i=0}^m(a_i+b_i)x^i,\qquad a_i=0\quad(n<i\leq m).'), '补零范围 n≤i≤m 改为 n<i≤m，保留原首项系数。')
settext(38,3,aligned(r'f(x)g(x)&=\sum_{k=0}^{n+m}c_kx^k,',r'c_k&=\sum_{\substack{i+j=k\\0\leq i\leq n\\0\leq j\leq m}}a_ib_j.'))
settext(40,3,aligned(r'\deg(f+g)&\leq\max\{\deg f,\deg g\},',r'\deg(fg)&\leq\deg f+\deg g.'))
settext(41,6,display(r'\forall f\in\mathbb F[x],\quad\exists q,r\in\mathbb F[x],\quad f=qg+r.'))
settext(43,6,display(r'd=b_1f_1+b_2f_2,\qquad b_1,b_2\in\mathbb F[x].'))
settext(50,3,display(r'(x-b_1)^{k_1}(x-b_2)^{k_2}\cdots(x-b_m)^{k_m}\mid f.'),'根因子乘积统一使用同一个多项式变量 x。')
settext(63,4,r'2）$[K(\theta):K]=n$，且 $\{1,\theta,\theta^2,\ldots,\theta^{n-1}\}$ 是 $K(\theta)$ 在 $K$ 上的一组基。故 $K(\theta)$ 中任一元素均可唯一表示为 $a_0+a_1\theta+\cdots+a_{n-1}\theta^{n-1}$，其中 $a_i\in K$，$0\leq i\leq n-1$。','修复幂基中 θ² 的括号位置。')
settext(78,2,r'令 $f\in\mathbb F_q[x]$ 是次数为 $m$ 的不可约多项式，则 $f$ 在 $\mathbb F_{q^m}$ 中有一个根 $\alpha$。$f$ 的所有根都是单根，并由以下 $m$ 个不同的元素给出：')
settext(78,5,r'令 $f\in\mathbb F_q[x]$ 是次数为 $m$ 的不可约多项式，则 $f$ 在 $\mathbb F_q$ 上的分裂域为 $\mathbb F_{q^m}$。')
settext(79,2,r'$\mathbb F_q[x]$ 中任何两个次数相同的不可约多项式的分裂域都是同构的。')
settext(54,3,r'1）若 $\operatorname{char}(\mathbb F)=p$，其中 $p$ 为素数，则 $\mathbb F$ 包含的素域同构于 $\mathbb F_p$。')
settext(54,4,r'2）若 $\operatorname{char}(\mathbb F)=0$，则 $\mathbb F$ 包含的素域同构于 $\mathbb Q$。')
settext(56,3,display(r'a_n\theta^n+a_{n-1}\theta^{n-1}+\cdots+a_1\theta+a_0=0,\qquad a_i\in K.')+'\n\n其中各系数不全为 $0$。')
settext(71,2,r'$\mathbb F_4=\{0,1,\theta,\theta+1\}$，其中 $\theta$ 满足 $\theta^2+\theta+1=0$。','补明 F4 元素表示中 θ 所满足的方程。')
settext(81,3,r'令 $F=\mathbb F_{q^m}$、$K=\mathbb F_q$。如果映射 $\sigma:F\to F$ 满足以下条件：')
settext(81,4,aligned(r'\sigma(\alpha+\beta)&=\sigma(\alpha)+\sigma(\beta),&&\alpha,\beta\in F,',r'\sigma(\alpha\beta)&=\sigma(\alpha)\sigma(\beta),&&\alpha,\beta\in F,',r'\sigma(a)&=a,&&a\in K.'))
settext(84,2,r'给定域 $F=\mathbb F_{q^m}$、$K=\mathbb F_q$ 和元素 $\alpha\in F$。令 $f\in K[x]$ 是 $\alpha$ 在 $K$ 上的极小多项式，可知其次数 $d=\deg f$ 整除 $m$。我们称 $g(x)=f(x)^{m/d}\in K[x]$ 为 $\alpha$ 在 $K$ 上的特征多项式。','将元素所属域记号统一为 F，保留有限域大小记号。')
settext(84,4,aligned(r'f(x)&=\prod_{j=0}^{d-1}\bigl(x-\alpha^{q^j}\bigr),',r'g(x)&=\prod_{j=0}^{m-1}\bigl(x-\alpha^{q^j}\bigr)',r'&=f(x)^{m/d}=x^m+a_{m-1}x^{m-1}+\cdots+a_1x+a_0.'))
settext(85,5,aligned(r'\alpha\cdot(1,\alpha,\ldots,\alpha^{m-1})&=(\alpha,\alpha^2,\ldots,\alpha^m)',r'&=(1,\alpha,\ldots,\alpha^{m-1})A,'))
settext(85,6,'其中\n\n'+display(r'A=\begin{pmatrix}0&0&\cdots&0&-a_0\\1&0&\cdots&0&-a_1\\0&1&\cdots&0&-a_2\\\vdots&\vdots&\ddots&\vdots&\vdots\\0&0&\cdots&1&-a_{m-1}\end{pmatrix}.'))
settext(85,7,r'从而可知 $\operatorname{Tr}_{F/K}(\alpha)=\operatorname{trace}(A)$。')
settext(87,2,r'设 $F$ 是有限域 $K$ 的一个有限扩张。对于 $\beta\in F$，我们定义映射')
settext(88,2,r'设 $F$ 是 $K=\mathbb F_q$ 的一个有限扩张。对于 $\alpha\in F$，有 $\operatorname{Tr}_{F/K}(\alpha)=0$ 当且仅当存在 $\beta\in F$ 使得 $\alpha=\beta^q-\beta$。','将未定义的域记号统一为 F。')
settext(90,3,aligned(r'N_{F/K}(\alpha)&=\alpha\alpha^q\cdots\alpha^{q^{m-1}}',r'&=\alpha^{(q^m-1)/(q-1)}.'))
settext(93,5,r'容易验证坐标映射'+ '\n\n'+aligned(r'c_j:F&\longrightarrow K,',r'\alpha&\longmapsto c_j(\alpha)')+'\n\n'+r'是线性变换。因此存在 $\beta_j\in F$ 使得 $c_j(\alpha)=\operatorname{Tr}_{F/K}(\beta_j\alpha)$ 对所有 $\alpha\in F$ 成立。')
settext(93,7,display(r'\operatorname{Tr}_{F/K}(\beta_j\alpha_i)=\begin{cases}0,&i\ne j,\\1,&i=j.\end{cases}\qquad\text{(*)}'))
settext(94,4,r'令 $K=\mathbb F_q<F=\mathbb F_{q^m}$。$F/K$ 的一组形如 $\{\alpha,\alpha^q,\ldots,\alpha^{q^{m-1}}\}$ 的基称为 $F/K$ 的正规基。')
settext(95,3,display(r'\Delta_{F/K}(\alpha_1,\ldots,\alpha_m)=\begin{vmatrix}\operatorname{Tr}_{F/K}(\alpha_1\alpha_1)&\cdots&\operatorname{Tr}_{F/K}(\alpha_1\alpha_m)\\\vdots&\ddots&\vdots\\\operatorname{Tr}_{F/K}(\alpha_m\alpha_1)&\cdots&\operatorname{Tr}_{F/K}(\alpha_m\alpha_m)\end{vmatrix}.'))
settext(97,3,display(r'\det\begin{pmatrix}\alpha_1&\alpha_2&\cdots&\alpha_m\\\alpha_1^q&\alpha_2^q&\cdots&\alpha_m^q\\\vdots&\vdots&\ddots&\vdots\\\alpha_1^{q^{m-1}}&\alpha_2^{q^{m-1}}&\cdots&\alpha_m^{q^{m-1}}\end{pmatrix}\ne0'))
settext(98,3,r'设 $n$ 为正整数。多项式 $x^n-1$ 在域 $K$ 上的分裂域称为 $K$ 上的 $n$ 次割圆域，记为 $K^{(n)}$。多项式 $x^n-1$ 在 $K^{(n)}$ 中的根称为 $K$ 上的 $n$ 次单位根，所有这些根的集合记为 $E^{(n)}$。')
settext(99,4,r'如果 $p\mid n$，则写成 $n=mp^e$，其中 $\gcd(m,p)=1$。我们有 $K^{(n)}=K^{(m)}$、$E^{(n)}=E^{(m)}$。多项式 $x^n-1$ 在 $K^{(n)}$ 中的根是 $E^{(m)}$ 的 $m$ 个元素，每个根的重数为 $p^e$。')
settext(100,4,r'在 $K^{(n)}$ 中恰好有 $\phi(n)$ 个不同的 $n$ 次本原单位根。如果 $\zeta$ 是一个 $n$ 次本原单位根，那么所有的 $n$ 次本原单位根是：','本原单位根的所在域明确为割圆扩域。')
settext(101,3,display(r'Q_n(x)=\prod_{\substack{1\leq s\leq n\\\gcd(s,n)=1}}(x-\zeta^s).'))
settext(102,4,r'$Q_n(x)$ 的系数属于 $K$ 的素子域。如果 $K$ 的素子域为有理数域，那么这些系数属于 $\mathbb Z$。')
settext(103,2,r'设 $r$ 为素数且 $k$ 为正整数。则','明确素数幂割圆公式要求 k≥1。')
settext(103,3,display(r'Q_{r^k}(x)=1+x^{r^{k-1}}+x^{2r^{k-1}}+\cdots+x^{(r-1)r^{k-1}}.'),'订正素数幂割圆多项式中乘积指数的括号。')
settext(103,5,aligned(r'Q_{r^k}(x)&=\frac{x^{r^k}-1}{Q_1(x)Q_r(x)\cdots Q_{r^{k-1}}(x)}',r'&=\frac{x^{r^k}-1}{x^{r^{k-1}}-1}.'))
settext(104,2,r'割圆域 $K^{(n)}$ 是 $K$ 的一个单代数扩张。并且')
settext(104,4,r'如果 $K=\mathbb F_q$ 且 $\gcd(q,n)=1$，当 $n>1$ 时令 $d$ 为满足 $q^d\equiv1\pmod n$ 的最小正整数；当 $n=1$ 时令 $d=1$。则 $Q_n$ 可分解为 $\phi(n)/d$ 个在 $K[x]$ 中不同的首一不可约多项式，它们的次数均为 $d$。$K^{(n)}$ 是任何一个这样的不可约因式在 $K$ 上的分裂域，且 $[K^{(n)}:K]=d$。','补明 n=1 时模 n 乘法阶的约定。')
settext(106,2,r'沿用前文条件，设 $K$ 的特征为 $p$ 且 $p\nmid n$。如果 $d$ 是正整数 $n$ 的一个因子，且 $1\leq d<n$，那么 $Q_n(x)$ 整除 $\dfrac{x^n-1}{x^d-1}$。','显式保留割圆定义所用的 p∤n 条件。')
settext(108,4,aligned(r'\mathbb F_9&=\{a_1\alpha+a_0:a_1,a_0\in\mathbb F_3\}',r'&=\{0,1,2,\alpha,\alpha+1,\alpha+2,',r'&\qquad 2\alpha,2\alpha+1,2\alpha+2\}.'),'补全 a0∈F3 的条件。')
settext(110,3,display(r'\begin{array}{c|c|l}i&\text{幂表示}&\text{多项式表示}\\\hline1&\zeta&1+\alpha\\2&\zeta^2&2\alpha\\3&\zeta^3&1+2\alpha\\4&\zeta^4&2\\5&\zeta^5&2+2\alpha\\6&\zeta^6&\alpha\\7&\zeta^7&2+\alpha\\8&1&1\end{array}'))
settext(113,4,display(r'\begin{array}{c|c|c|c}\text{生成元幂}&\text{多项式}&\text{二元序列}&\text{整数编码}\\\hline0&0&00&0\\x^0=1&1&01&1\\x&x&10&2\\x^2&x+1&11&3\end{array}'))
settext(114,3,'于是有如下表示与编码对应：','将多项式、位串和整数间的集合相等改为编码对应。')
settext(114,4,display(r'\operatorname{GF}(2^w)=\{a_0+a_1x+\cdots+a_{w-1}x^{w-1}:a_i\in\mathbb F_2\}.'))
settext(114,5,aligned(r'a_0+a_1x+\cdots+a_{w-1}x^{w-1}&\longleftrightarrow(a_{w-1}\cdots a_1a_0)',r'&\longleftrightarrow\sum_{i=0}^{w-1}a_i2^i,\qquad a_i\in\mathbb F_2.'))
settext(114,7,display(r'[2^w-1]=\{0,1,\ldots,2^w-1\}.')+'\n\n此处沿用原讲义的 $[2^w-1]$ 记号表示上述整数编码集。')
settext(116,6,aligned(r'3\times7&=\operatorname{gfilog}\bigl(\operatorname{gflog}(3)+\operatorname{gflog}(7)\bigr)',r'&=\operatorname{gfilog}(4+10)=\operatorname{gfilog}(14)=9.'))
settext(116,7,aligned(r'13\div10&=\operatorname{gfilog}\bigl(\operatorname{gflog}(13)-\operatorname{gflog}(10)\bigr)',r'&=\operatorname{gfilog}(13-9)=\operatorname{gfilog}(4)=3.'))
settext(121,3,aligned(r'P_1&=P_1(x_1,x_2,\ldots,x_n),',r'&\vdots',r'P_m&=P_m(x_1,x_2,\ldots,x_n).'))
settext(121,6,r'如果 $n>\sum_{i=1}^m\deg(P_i)$，则 $P_1,\ldots,P_m$ 的公共零点数是 $p$ 的倍数。')
settext(123,2,r'（Schwartz–Zippel）给定域 $\mathbb F$ 以及总次数不超过 $d$ 的非零多项式 $f(x_1,\ldots,x_n)$。令 $S$ 为 $\mathbb F$ 的非空有限子集，则 $f$ 在 $S^n$ 中最多有 $d|S|^{n-1}$ 个零点。','订正 Schwartz 名称、零点数上界，并明确 S 非空。')
settext(123,4,r'证明：若 $f\in\mathbb F_2[x_1,\ldots,x_n]$ 是总次数不超过 $d$ 的非零多线性多项式，且 $0\leq d\leq n$，则 $f$ 在 $\mathbb F_2^n$ 中至少有 $2^{n-d}$ 个非零点。','补全二元立方体非零点界所需的多线性条件及 0≤d≤n。')
settext(124,2,r'（Schwartz–Zippel）给定域 $\mathbb F$ 以及总次数为 $d$ 的非零多项式 $f(x_1,\ldots,x_n)$。令 $S$ 为 $\mathbb F$ 的非空有限子集，独立且均匀地从 $S$ 中随机选取 $r_1,\ldots,r_n$，则\n\n'+display(r'\Pr\bigl[f(r_1,\ldots,r_n)=0\bigr]\leq\frac d{|S|}.'),'明确随机抽样集合非空，并修复概率公式。')
settext(118,2,r'（Hilbert 零点定理）给定域 $\mathbb F$ 及多项式 $f=f(x_1,\ldots,x_n)$。令 $S_1,\ldots,S_n$ 为 $\mathbb F$ 中的非空有限集合。如果','网格零点定理补全各 Si 为有限集合的条件。')

# Adjacent display rows are merged, retaining all original paragraph anchors.
MERGES = {
11: [(3,6)], 22:[(8,9)],27:[(3,4)],28:[(5,6)],29:[(4,8)],31:[(5,6)],
33:[(3,4),(6,7)],36:[(3,4)],40:[(3,4)],95:[(3,4)],108:[(4,5)],
114:[(5,6)],121:[(3,5)],
}

def math_cleanup(text):
    text=text.replace('\uf071',r'\theta').replace('Schwarz-Zippel','Schwartz–Zippel')
    text=text.replace('$`` + "$','$+$').replace('$`` \\bullet "$',r'$\bullet$')
    def clean(m):
        t=m[0].replace('’',"'").replace('‘',"'")
        t=t.replace(r'\left.', '').replace(r'\right.', '')
        t=re.sub(r'\\(?:left|right)(?![A-Za-z])','',t)
        t=t.replace(r'\lbrack','[').replace(r'\rbrack',']')
        t=t.replace(r'\text{[}','[').replace(r'\text{]}',']')
        t=t.replace(r'\text{\{}',r'\{').replace(r'\text{\}}',r'\}')
        t=t.replace(r'\text{⊂}',r'\subset').replace(r'\#','')
        t=t.replace('，',r'\quad ').replace('；',r'\quad ')
        t=re.sub(r'(?<![\\a-zA-Z])char\(',r'\\operatorname{char}(',t)
        t=re.sub(r'(?<![\\a-zA-Z])deg\(',r'\\deg(',t)
        t=re.sub(r'(?<![\\a-zA-Z])det\(',r'\\det(',t)
        t=re.sub(r'(?<!\\operatorname)\{\s*Tr\}',r'\\operatorname{Tr}',t)
        t=t.replace('{cTr}',r'c\operatorname{Tr}')
        t=t.replace(r'\mathit{Ψ}',r'\Psi')
        t=re.sub(r'\\ ', ' ', t)
        t=t.replace(r'\cdot \cdot \cdot',r'\cdots')
        t=t.replace('{dim}',r'\dim')
        t=t.replace('s.t.',r'\text{s.t.}')
        return t
    return re.sub(r'\$\$[\s\S]*?\$\$|(?<!\$)\$(?!\$)[^\n$]*?\$(?!\$)',clean,text)

def replace_known(text, old, new, anchor, reason):
    if old not in text: raise ValueError(f'{anchor}: missing {old!r}')
    CORRECTIONS.append({'anchor':anchor,'correction':reason})
    return text.replace(old,new)

def source_text(u):
    t=u['text']; key=u['id']
    if key=='p012-l02': t=replace_known(t,'二元关系','二元运算',key,'将剩余类加法称为二元运算。')
    if key=='p015-l03': t='当 $G$ 为有限群时，\n\n'+t; CORRECTIONS.append({'anchor':key,'correction':'显式补上陪集基数乘法与元素阶整除结论的有限群条件。'})
    if key in ('p028-l09','p031-l02'): t=replace_known(t,'主理想环','主理想',key,'(n) 是主理想，不是主理想环。')
    if key=='p029-l05': t=replace_known(t,'(b - r)','(b - s)',key,'商环良定义证明中的第二因子改为 b-s。')
    if key=='p049-l07':
        t='以下设 $f$ 为非零多项式。\n\n'+t
        CORRECTIONS.append({'anchor':key,'correction':'根的有限重数定义限定非零多项式。'})
    if key=='p050-l02':
        t=r'以下记 $n=\deg f$。'+'\n\n'+t
        CORRECTIONS.append({'anchor':key,'correction':'根数界中明确定义 n 为 f 的次数。'})
    if key=='p077-l05':
        t='设 $n$ 为正整数。\n\n'+t
        CORRECTIONS.append({'anchor':key,'correction':'整除 x^(q^n)-x 的次数判据中明确 n≥1。'})
    if key in ('p086-l03','p086-l04','p086-l05','p091-l03','p091-l06'):
        t=t.replace(r'{\mathbb{F}}','F').replace(r'\mathbb{F}','F')
        CORRECTIONS.append({'anchor':key,'correction':'将未定义的通用域记号统一为本定理的 F。'})
    if key in ('p112-l05','p112-l08'):
        t=t.replace(r'{\mathbb{F}}_{q}',r'\mathbb F_9')
        CORRECTIONS.append({'anchor':key,'correction':'九元素矩阵模型的域大小标为 F9。'})
    if key=='p121-l08': t=replace_known(t,'Waning','Warning',key,'订正 Warning 姓名的拼写。')
    if key=='p122-l02': t=t.replace(r'a_{1,...,}a_{m}',r'a_1,\ldots,a_m')
    return math_cleanup(OVERRIDES.get(key,t))

def formula(t):
    t=t.strip()
    if t.startswith('$$') and t.endswith('$$'): return t[2:-2].strip()
    if t.startswith('$') and t.endswith('$'): return t[1:-1].strip()
    return None

def unit(u,t,kind=''):
    if t.strip() in ('定义','定理','命题','引理','推论','例子','练习','习题','证明','注记','下界','记号','第1种','第2种','第3种','加法','乘法'):
        kind='source-label'
    return f'::::{{container}} source-line'+(' '+kind if kind else '')+f'\n:name: {u["id"]}\n\n{t}\n::::'

def merge_units(us,texts,page):
    for a,b in MERGES.get(page,[]):
        seq=[u for u in us if a<=int(u['id'][-2:])<=b]
        if not seq: continue
        assert len(seq)==b-a+1,(page,a,b)
        first=seq[0]['id']
        if first not in OVERRIDES:
            fs=[formula(texts[u['id']]) for u in seq]
            assert all(f is not None for f in fs),(page,a,b,fs)
            if page==11:
                rows=[]
                for f in fs:
                    if '=' in f: rows.append(f.replace('=','&=',1))
                    else: rows.append('&'+f)
                merged=aligned(*rows)
            else:
                rows=[]
                for i,f in enumerate(fs):
                    if i==0 and '=' in f: rows.append(f.replace('=','&=',1))
                    elif f.startswith('='): rows.append('&'+f)
                    elif '=' in f: rows.append(f.replace('=','&=',1))
                    else: rows.append('&'+f)
                merged=aligned(*rows)
            texts[first]=merged
        texts[first]='\n'.join(f'({u["id"]})=' for u in seq[1:])+'\n\n'+texts[first]
        for u in seq[1:]:texts[u['id']]=None

def main():
    result=[]
    for number in range(2,20):
        name=f'c{number:02d}'; path=ROOT/'chapters'/f'{name}.md'
        d=parse(BACKUP/path.name); s=d['source']
        s=re.sub(r'```\{admonition\} 补充定义[^\n]*\n:class: [^\n]+\n\n.*?\n```\n*','',s,flags=re.S)
        s=PAGE_NOTE.sub('',s)
        s=s.replace('原文与新增内容分别标明','正文与备注分别标明')
        toolbar=s.index('```{raw} html')
        s=s[:toolbar]+'本章正文沿用原讲义，并直接订正已确认的笔误与缺失条件。标为“备注”的内容是本书新增的教材解释；备注按本章出现顺序连续编号。\n\n'+s[toolbar:]
        s=s.replace('这里的“行”以原幻灯片的段落或完整公式为单位。','阅读导航以正文段落或完整公式为单位；同一定义或结论的各段共同置于一个内容框中。')
        count=0; frames=0; units_after=0
        for page, us in d['pages'].items():
            texts={u['id']:source_text(u) for u in us}
            merge_units(us,texts,page)
            output=[]; covered=set()
            for a,b,kind in groups[page]:
                seq=[u for u in us if a<=int(u['id'][-2:])<=b]
                assert len(seq)==b-a+1,(page,a,b,len(seq))
                covered.update(u['id'] for u in seq)
                parts=[unit(u,texts[u['id']]) for u in seq if texts[u['id']] is not None]
                units_after+=len(parts)
                note=NOTES.get(f'{page:03d}{a:02d}')
                if note:
                    count+=1
                    note=note.replace(r'\n\n','\n\n')
                    bullets='\n\n'.join('- '+p for p in note.split('\n\n') if p and not p.startswith('  '))
                    # Indented continuations belong to the immediately preceding bullet.
                    bullets='- '+note.replace('\n\n','\n\n- ') if '\n\n  ' not in note else '- '+note
                    parts.append(f'```{{admonition}} 备注 {count}\n:class: dropdown reading-note chapter-remark\n:name: {name}-remark-{count:02d}\n\n{bullets}\n```')
                frames+=1
                output.append((a,f':::::{{container}} statement-box {kind}\n:name: {name}-statement-{frames:03d}\n\n'+'\n\n'.join(parts)+'\n:::::'))
            for u in us:
                if u['id'] not in covered:
                    output.append((int(u['id'][-2:]),unit(u,texts[u['id']],'source-heading'))); units_after+=1
            output.sort()
            matches=[m for m in UNIT.finditer(s) if int(m[2][1:4])==page]
            assert len(matches)==len(us),(name,page)
            s=s[:matches[0].start()]+'\n\n'.join(t for _,t in output)+s[matches[-1].end():]
        # Math in self-tests is preserved; simple typesetting artifacts are cleaned there too.
        s=s.replace('successive powers（逐次幂）','逐次幂')
        assert '本段阅读说明（新增）' not in s and '逐页解释（新增）' not in s
        oldids={u['id'] for u in d['units']}
        newids=set(re.findall(r':name: (p\d{3}-l\d{2})|\((p\d{3}-l\d{2})\)=',s))
        flat={x for pair in newids for x in pair if x}
        assert oldids==flat,(name,oldids-flat,flat-oldids)
        path.write_text(s,encoding='utf-8')
        result.append({'chapter':name,'frames':frames,'remarks':count,'original_anchors':len(oldids),'reading_units':units_after,'slides':list(d['pages'])})
    (ROOT/'_build/revision-report.json').write_text(json.dumps({'chapters':result,'corrections':[x for x in CORRECTIONS if x['correction']],'uncertain':[{'anchor':'p030-l05','issue':'原讲义的 [0.25]=?[0.75] 未说明比较语境，原文保留；备注给出子环并非理想及商乘法不良定义的独立例子。'}]},ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False,indent=2))

if __name__=='__main__': main()
