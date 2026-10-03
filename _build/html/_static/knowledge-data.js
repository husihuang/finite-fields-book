/* Authored learning relationships, not an automatically inferred proof graph. */
(() => {
'use strict';
const chapters = ['群与运算','等价关系与陪集','循环群基本定理','环、理想与域','多项式与 Euclid 算法','不可约多项式','根与 Lagrange 插值','子域与极小多项式','域扩张与分裂域','有限域的存在与子域','本原元','不可约多项式的根','迹与范数','基、对偶基与判别式','割圆域与割圆多项式','有限域的表示与实现','组合零点定理','加法组合与零和问题','Schwartz–Zippel 与多项式检验'].map((name,i)=>({id:`c${String(i+1).padStart(2,'0')}`,name,number:i+1,part:i<7?0:i<12?1:i<15?2:i<16?3:4}));
const parts=['代数基础','域扩张与有限域','有限域的进一步结构','表示与计算','多项式的组合应用'];
// id | chapter | statement number or named anchor | title | kind | summary | formula | conditions / common confusion
const rows=String.raw`
operation|1|binary-operation|二元运算|定义|运算把有序对映到同一集合中，封闭性是讨论代数结构的起点。|*:G\times G\to G|结合律与交换律是不同的条件。
group|1|group-definition|群|定义|结合律、单位元和逆元使运算可以消去与求解。|a a^{-1}=a^{-1}a=e|群的运算不一定交换。
abelian|1|abelian-group|交换群|定义|所有元素两两交换的群，也是环的加法结构。|ab=ba|交换性不能从群公理推出。
subgroup|1|subgroup|子群|定义|子集在原运算下仍是群，可用封闭与逆元条件检验。|H\le G|非空性及逆元条件不可遗漏。
cyclic|1|cyclic-group|循环群|定义|由一个元素的整数次幂生成的群。|G=\langle a\rangle|有限循环群与无限循环群都存在。
order|1|element-order|元素的阶|定义|使元素的正整数次幂首次等于单位元的指数。|\operatorname{ord}(a)=\min\{n\ge1:a^n=e\}|不存在这样的正整数时，阶为无穷。
generated|1|generated-subgroup|生成子群|定义|包含指定集合的最小子群。|\langle S\rangle=\bigcap_{S\subseteq H\le G}H|生成元的个数不等于群的阶。
square|1|remark-05|正方形对称群|例子|四种旋转和四种反射组成八阶群；复合次序可以改变结果。|r^4=s^2=e,\quad srs=r^{-1}|八阶二面体群不是交换群。
equivalence|2|001|等价关系|定义|自反、对称和传递的关系把集合分成互不相交的类。|a\sim b|三项条件都必须成立。
partition|2|002|等价类与划分|定义|等价类覆盖全集，两类相交时必相同。|A=\bigcup_{a\in A}[a]|等价类是集合，不是单个代表元。
residue|2|003|整数剩余类|例子|模整数的同余给出剩余类，是商结构的基本模型。|[a]=a+n\mathbb Z|剩余类加法应与代表元的选择无关。
coset|2|006|陪集|定义|固定元素平移子群得到陪集，陪集划分群。|aH=\{ah:h\in H\}|一般群的左陪集与右陪集可能不同。
coset-size|2|007|陪集的大小|定理|平移给出子群与每个陪集之间的双射。|\lvert aH\rvert=\lvert H\rvert|这里只比较大小，不断言陪集本身是子群。
index|2|010|子群的指数|定义|子群在群中的左陪集个数称为指数。|[G:H]|无限群也可定义指数。
lagrange|2|011|Lagrange 定理|定理|有限群的阶等于子群的阶与指数之积。|\lvert G\rvert=[G:H]\lvert H\rvert|阶数的整除关系不保证一般群存在每种阶的子群。
cyclic-subgroups|3|002|循环群的子群|定理|循环群的每个子群仍为循环群。|H\le\langle a\rangle\Longrightarrow H=\langle a^d\rangle|最小正指数的论证需要单独处理平凡子群。
power-order|3|003|幂的阶|定理|有限阶元素的幂的阶由最大公因数控制。|\operatorname{ord}(a^k)=n/\gcd(n,k)|前提是元素 a 的阶为有限数 n。
unique-subgroups|3|004|循环群子群的唯一性|定理|有限循环群对群阶的每个正因子恰有一个对应阶的子群。|d\mid n,\quad H_d=\langle a^{n/d}\rangle|唯一性是循环群的特殊性质。
generators|3|006|循环群的生成元|定理|生成元对应与群阶互素的指数。|\gcd(k,n)=1\Longleftrightarrow\langle a^k\rangle=\langle a\rangle|基点 a 必须是整个群的生成元。
order-count|3|005|给定阶元素的个数|定理|有限循环群中每个允许的阶对应欧拉函数个元素。|\#\{a:\operatorname{ord}(a)=d\}=\varphi(d)|要求 d 整除群的阶。
ring|4|001|环|定义|加法构成交换群，乘法结合，并满足左右分配律。|a(b+c)=ab+ac|本书另外区分含幺环和交换环。
unit-ring|4|002|含幺环|定义|乘法具有单位元的环。|1a=a1=a|单位元与可逆元的概念不同。
comm-ring|4|003|交换环|定义|乘法也满足交换律的环。|ab=ba|环的加法本来就要求交换。
domain|4|004|整环|定义|没有零因子的非零交换含幺环。|ab=0\Longrightarrow a=0\text{ 或 }b=0|整环中的非零元素未必可逆。
field|4|005|域|定义|非零元素在乘法下组成交换群。|F^\times=F\setminus\{0\}|零没有乘法逆元。
finite-domain|4|007|有限整环是域|定理|乘以非零元素的映射单射，由有限性得到满射与逆元。|R\text{ 有限整环}\Longrightarrow R\text{ 是域}|有限性是关键条件。
subring|4|008|子环|定义|在原加法、乘法下仍是环的子集。|S\subseteq R|子环约定与单位元条件要结合正文使用。
ideal|4|009|理想|定义|加法子群且吸收与环中元素的乘法。|rI\subseteq I,\quad Ir\subseteq I|子环不一定是理想。
principal|4|013|主理想|定义|由一个元素生成的理想。|(a)=\{ra:r\in R\}|该公式在交换含幺环中使用。
quotient|4|014|商环|定义|用理想的陪集定义加法与乘法得到新的环。|R/I|理想条件保证运算与代表元选择无关。
hom|4|011|环同态|定义|保持加法与乘法的映射，把结构从一个环送到另一个环。|\phi(ab)=\phi(a)\phi(b)|同态是否保持单位元需按正文约定确认。
kernel|4|012|同态的核|定义|映到零的元素构成理想，刻画同态的单射性。|\ker\phi=\{a:\phi(a)=0\}|零核等价于单射，不等价于满射。
isomorphism|4|019|环同态基本定理|定理|像与用核取商得到的环同构。|R/\ker\phi\cong\operatorname{im}\phi|只有满射时像才是整个目标环。
characteristic|4|022|特征|定义|单位元的加法阶；不存在正整数关系时特征为零。|\operatorname{char}(F)=0\text{ 或素数 }p|域的特征与域的元素个数不同。
frobenius|4|026|Frobenius 映射|定理|特征 p 下 p 次幂保持加法、乘法，在有限域中是自同构。|(a+b)^p=a^p+b^p|p 为素数；一般环中不能任意去掉交叉项。
polynomial|5|001|多项式环|定义|域上的形式多项式通过系数运算构成环。|K[x]|多项式与它在有限域上定义的函数可能不同。
degree|5|003|多项式次数|定义|非零多项式最高非零系数的位置。|\deg(fg)=\deg f+\deg g|零多项式的次数采用另行约定。
divisibility|5|005|多项式整除|定义|一个多项式是另一个多项式的倍数。|g\mid f\Longleftrightarrow f=gh|运算所在的系数域必须固定。
division|5|006|带余除法|定理|除以非零多项式可唯一得到商和低次余式。|f=qg+r,\quad\deg r<\deg g|系数在域中，且除式非零。
pid|5|007|多项式环的主理想性质|定理|域上一元多项式环中的每个理想都由一个多项式生成。|I=(g)\subseteq K[x]|多元多项式环一般不具有此性质。
gcd|5|010|Euclid 算法|方法|反复带余除法求最大公因式，取首一形式消除常数因子的歧义。|\gcd(f,g)=\gcd(g,r)|最后一个非零余式应归一化。
bezout|5|008|Bézout 恒等式|定理|最大公因式可以写成两个多项式的线性组合。|uf+vg=\gcd(f,g)|系数 u、v 也是系数域上的多项式。
irreducible|6|001|不可约多项式|定义|正次数多项式不能分解成两个正次数因子。|f=gh\Longrightarrow\deg g=0\text{ 或 }\deg h=0|不可约性依赖系数域。
quotient-field|6|002|不可约多项式构造域|定理|用不可约多项式生成的理想取商得到域。|K[x]/(f)\text{ 是域}\Longleftrightarrow f\text{ 不可约}|f 为正次数多项式；仅无根不总能判断不可约。
irreducible-prime|6|003|不可约元的整除性质|定理|不可约多项式整除一个乘积时至少整除其中一个因子。|f\mid gh\Longrightarrow f\mid g\text{ 或 }f\mid h|系数域上的一元多项式环。
factorization|6|004|唯一因子分解|定理|非零多项式可分解为常数与首一不可约因子的乘积。|f=c\prod_i f_i^{e_i}|唯一性允许调换因子的顺序。
root|7|001|多项式的根|定义|代入使多项式为零的元素。|f(\alpha)=0|根可以在基域中，也可以在扩域中。
factor|7|002|因式定理|定理|一个元素是根恰好对应一个一次因子。|f(\alpha)=0\Longleftrightarrow(x-\alpha)\mid f|根与系数应在同一个用于运算的域中。
multiplicity|7|003|根的重数|定义|一次因子在分解中出现的最大次数。|(x-\alpha)^r\mid f|根的个数与按重数计算的根数不同。
root-bound|7|004|一元多项式根数界|定理|非零多项式的不同根的个数不超过次数。|\#\{a:f(a)=0\}\le\deg f|非零假设不可省略。
derivative|7|005|形式导数|定义|按形式幂法则定义导数，不涉及极限。|(x^i)'=i x^{i-1}|正特征下非恒定多项式的导数也可能为零。
repeated-root|7|006|重根判据|定理|根同时使多项式及其导数为零时是重根。|f(\alpha)=f'(\alpha)=0|可用 gcd(f,f') 检查是否存在重根。
interpolation|7|008|Lagrange 插值|方法|互不相同的取值点唯一确定给定次数范围内的多项式。|f(x)=\sum_i f(a_i)\prod_{j\ne i}\frac{x-a_j}{a_i-a_j}|n 个互异点确定次数小于 n 的多项式。
subfield|8|001|子域与扩域|定义|一个域包含另一个域并保持原运算。|K\le L|仅是子环并不自动成为子域。
prime-subfield|8|004|素子域|定理|每个域包含唯一的最小子域，由特征决定其同构类型。|\mathbb F_p\text{ 或 }\mathbb Q|有限域的素子域是 \(\mathbb F_p\)。
adjoining|8|005|添加元素生成域|定义|包含基域和指定元素的最小子域。|K(\alpha)|一般情况下 K[α] 不一定等于 K(α)。
algebraic|8|006|代数元|定义|某个基域上的非零多项式以该元素为根。|f(\alpha)=0,\quad0\ne f\in K[x]|是否代数依赖于基域。
transcendental|8|006|超越元|定义|没有基域上的非零多项式以它为根的元素。|f(\alpha)\ne0\quad(0\ne f\in K[x])|有限域扩张中的元素都是代数元。
minimal-kernel|8|007|代入映射的核|定理|代数元的代入映射核由唯一首一不可约多项式生成。|\ker(f\mapsto f(\alpha))=(m_\alpha)|把同态、理想与极小多项式连接起来。
minimal|8|008|极小多项式|定义|以代数元为根的首一最低次非零多项式。|m_\alpha(x)\in K[x]|极小多项式必须注明基域。
vector-extension|9|002|扩域作为向量空间|方法|扩域以自身加法和基域标量乘法成为向量空间。|L\text{ 是 }K\text{ 上向量空间}|维数计算采用基域标量。
extension-degree|9|003|扩张次数|定义|扩域作为基域向量空间的维数。|[L:K]=\dim_K L|与元素的乘法阶是两个概念。
tower|9|004|塔式法则|定理|有限扩张链上的次数相乘。|[M:K]=[M:L][L:K]|要求 K≤L≤M 且所涉扩张有限。
finite-algebraic|9|005|有限扩张是代数扩张|定理|维数有限使元素的若干幂线性相关，得到多项式关系。|[L:K]<\infty\Longrightarrow L/K\text{ 代数}|代数扩张不一定具有有限次数。
power-basis|9|006|单代数扩张与幂基|定理|极小多项式次数给出扩张次数与标准幂基。|K(\alpha)\cong K[x]/(m_\alpha),\quad1,\alpha,\ldots,\alpha^{n-1}|α 代数，n 为其极小多项式次数；α 不必本原。
root-adjoin|9|007|添加一个根|方法|不可约多项式取商后，x 的剩余类成为它的根。|\alpha=x+(f)\in K[x]/(f)|用于构造时 f 不可约。
root-isomorphism|9|008|同一不可约多项式的根|定理|两个根生成的单扩张存在固定基域且送一个根到另一个根的同构。|K(\alpha)\cong_K K(\beta)|同一个基域上同一个不可约多项式。
splitting|9|009|分裂域|定义|多项式完全分裂且由它的全部根生成的扩域。|L=K(\alpha_1,\ldots,\alpha_r)|完全分裂的任意扩域不一定是分裂域。
splitting-unique|9|010|分裂域的存在与唯一性|定理|逐次添加根构造分裂域，延拓基域同构得到唯一性。|L_1\cong_K L_2|非恒定多项式；唯一是指固定基域的同构意义下唯一。
field-size|10|001|有限扩域的大小|定理|基域有 q 个元素、扩张次数为 m 时，每个坐标独立取 q 个值。|\lvert L\rvert=q^m|L/K 是有限扩张，K 有限。
prime-power|10|002|有限域阶为素数幂|定理|对素子域应用向量空间计数得到有限域的大小。|\lvert F\rvert=p^n|p 为特征，n 为对素子域的扩张次数。
xq|10|003|有限域元素的幂恒等式|定理|非零元素用 Lagrange 定理，零单独处理。|a^q=a\quad(a\in\mathbb F_q)|q 是该有限域的大小。
rootset|10|004|有限域与根集|定理|有限域的所有元素恰是指定多项式的根。|x^q-x=\prod_{a\in\mathbb F_q}(x-a)|等式在包含该域的多项式环中理解。
finite-exist|10|006|有限域的存在|定理|素数幂次 Frobenius 的固定点在分裂域中构成所需大小的域。|\mathbb F_{p^n}\text{ 存在}|p 是素数，n 是正整数。
finite-unique|10|006|有限域的唯一性|定理|同阶有限域都是同一个多项式的分裂域，因此同构。|\lvert F\rvert=\lvert E\rvert=q\Longrightarrow F\cong E|同构不意味着两个具体集合完全相同。
subfields|10|007|有限域的子域分类|定理|子域对应扩张指数的正因子，且每个允许的子域唯一。|\mathbb F_{p^d}\subseteq\mathbb F_{p^n}\Longleftrightarrow d\mid n|两个域需放在同一代数闭包或固定嵌入下比较包含关系。
mult-cyclic|11|001|有限域乘法群是循环群|定理|元素阶与根数界结合，保证存在阶为 q−1 的非零元素。|\mathbb F_q^\times\text{ 为循环群}|群中不包含零；证明需要一般结论而非有限次实验。
primitive|11|002|本原元|定义|有限域乘法群的生成元。|\operatorname{ord}(\alpha)=q-1|本原元与生成扩域的元素不同，前者要求满乘法阶。
primitive-count|11|003|本原元的个数|定理|循环群生成元计数给出本原元的个数。|\#\{\text{本原元}\}=\varphi(q-1)|q 为有限域的大小。
simple-extension|11|004|有限域是单扩张|定理|本原元的幂覆盖所有非零元素，因而也生成整个扩域。|\mathbb F_{q^m}=\mathbb F_q(\alpha)|α 为上层域本原元时成立；逆命题一般不成立。
finite-irreducible|11|005|每个次数的不可约多项式|定理|有限域中取适当扩域的本原元可得到指定次数的极小多项式。|\exists f\in\mathbb F_q[x],\quad\deg f=m|m 为正整数；本原多项式是特殊的不可约多项式。
degree-orbit|12|003|极小多项式次数与轨道|定理|Frobenius 轨道长度等于元素相对于基域的极小多项式次数，也等于生成子域的扩张次数。|\deg m_\alpha=[\mathbb F_q(\alpha):\mathbb F_q]|基域必须为指定的 \(\mathbb F_q\)；轨道长度取最短返回起点的次数。
irreducible-divisibility|12|002|不可约多项式的整除判据|定理|不可约多项式的次数决定它整除哪些有限域根多项式。|f\mid x^{q^m}-x\Longleftrightarrow\deg f\mid m|\(f\) 在 \(\mathbb F_q\) 上首一不可约。
separable|12|003|有限域多项式的可分性|定理|有限域上的不可约多项式没有重根。|\gcd(f,f')=1|仅对不可约多项式而言，一般多项式可能有重根。
irreducible-split|12|004|不可约多项式的分裂域|定理|n 次不可约多项式在 n 次有限域扩张中完全分裂。|f\in\mathbb F_q[x],\quad\deg f=n\Longrightarrow\mathbb F_{q^n}\text{ 为其分裂域}|f 必须不可约。
conjugates|12|006|Frobenius 共轭|定义|重复施加 q 次幂得到共轭元，轨道给出极小多项式的根。|\alpha,\alpha^q,\ldots,\alpha^{q^{d-1}}|\(d\) 为相对于 \(\mathbb F_q\) 的最短回到起点的长度。
conjugate-order|12|008|共轭元的乘法阶|定理|非零元素的共轭元具有相同的乘法阶。|\operatorname{ord}(\alpha^{q^i})=\operatorname{ord}(\alpha)|零不在乘法群内。
automorphism|13|001|基域自同构|定义|保持域运算并固定基域的双射。|\sigma\in\operatorname{Aut}_K(F)|自同构与任意基域线性映射不同。
finite-automorphism|13|002|有限域自同构群|定理|固定 \(\mathbb F_q\) 的自同构正好是 \(m\) 个 Frobenius 幂。|\operatorname{Aut}_{\mathbb F_q}(\mathbb F_{q^m})=\langle a\mapsto a^q\rangle|相对于 \(\mathbb F_q\)；绝对自同构群以素子域为基域。
trace|13|003|相对迹|定义|把扩张中的所有基域自同构作用结果相加。|\operatorname{Tr}_{F/K}(a)=\sum_{i=0}^{m-1}a^{q^i}|\(F=\mathbb F_{q^m}\)，\(K=\mathbb F_q\)；轨道较短时仍有 \(m\) 项。
characteristic-polynomial|13|004|元素的特征多项式|定义|含全部共轭的带重数乘积，连接极小多项式与扩张次数。|\chi_a(x)=m_a(x)^{m/d}|d=deg m_a，m=[F:K]，有限域情形。
multiplication-operator|13|005|乘法算子|方法|固定元素的乘法是基域线性算子，矩阵迹和行列式给出迹与范数。|M_a:z\mapsto az|选择不同基得到相似矩阵。
trace-linear|13|006|迹的线性|定理|相对迹是从扩域到基域的非零线性映射。|\operatorname{Tr}(ua+vb)=u\operatorname{Tr}(a)+v\operatorname{Tr}(b)|u、v 属于基域；Tr(1) 可能为零。
trace-pair|13|007|迹配对的非退化性|定理|非零元素总能找到另一个元素使乘积的迹非零。|a\ne0\Longrightarrow\exists b:\operatorname{Tr}(ab)\ne0|有限域扩张；用于构造对偶基。
trace-zero|13|008|迹零元素|定理|迹零元素恰好是 Frobenius 与恒等映射之差的像。|\operatorname{Tr}(a)=0\Longleftrightarrow a=b^q-b|F/K 为有限域扩张，q 为基域大小。
trace-tower|13|009|迹的传递性|定理|沿有限域扩张塔逐层取迹等于直接取迹。|\operatorname{Tr}_{F/K}=\operatorname{Tr}_{L/K}\circ\operatorname{Tr}_{F/L}|K≤L≤F，明确每一层的基域。
norm|13|010|相对范数|定义|自同构作用结果的乘积可以写成一次幂。|N_{F/K}(a)=a^{(q^m-1)/(q-1)}|\(F=\mathbb F_{q^m}\)，\(K=\mathbb F_q\)；零的范数是零。
norm-multiplicative|13|011|范数的乘法性|定理|范数保持乘法，在非零元素群上满射到基域的乘法群。|N(ab)=N(a)N(b)|范数一般不保持加法。
norm-tower|13|012|范数的传递性|定理|沿有限域扩张塔逐层取范数等于直接取范数。|N_{F/K}=N_{L/K}\circ N_{F/L}|K≤L≤F。
basis-coordinates|14|001|基与坐标|定义|相对于给定基，每个元素唯一表示为基域系数的线性组合。|a=\sum_i a_i\beta_i|a_i 属于基域；整数存储编码不是抽象域元素。
dual-basis|14|002|对偶基|定义|利用迹配对与原基逐项对应，能直接提取坐标。|\operatorname{Tr}(\beta_i\gamma_j)=\delta_{ij}|存在唯一性依赖迹配对的非退化性。
normal-basis|14|003|正规基|定义|由一个元素的 Frobenius 共轭构成的基。|\beta,\beta^q,\ldots,\beta^{q^{m-1}}|共轭互不相同不自动保证线性无关。
normal-exist|14|004|正规基存在定理|定理|每个有限域扩张都可以找到正规基。|\mathbb F_{q^m}/\mathbb F_q\text{ 存在正规基}|正规元与本原元的定义不同。
trace-matrix|14|005|迹矩阵|方法|基元素乘积的迹组成 Gram 矩阵，检验非退化性与构造对偶基。|G_{ij}=\operatorname{Tr}(\beta_i\beta_j)|使用相同的基域和相对迹。
discriminant|14|005|判别式|定义|迹矩阵的行列式刻画基向量的独立性；非零时这些元素构成基。|\Delta(\beta_1,\ldots,\beta_m)=\det G|换基使判别式乘以换基行列式的平方。
moore|14|007|Moore 行列式|方法|Frobenius 幂构成的矩阵行列式检测基域线性无关。|\det(\beta_j^{q^i})_{0\le i<m,1\le j\le m}|β_j 在有限域扩张内；q 为基域大小。
unit-root|15|001|单位根与割圆域|定义|x 的 n 次幂等于 1 的根生成割圆域。|\zeta^n=1|讨论互异的 n 个单位根时，特征不能整除 n。
unit-root-group|15|002|单位根群|定理|在适当分裂域中，n 次单位根形成 n 阶循环群。|\mu_n=\langle\zeta\rangle|特征为零，或为不整除 n 的素数。
primitive-root|15|003|本原单位根|定义|乘法阶恰为 n 的单位根。|\operatorname{ord}(\zeta)=n|本原单位根与整个有限域的本原元须分别说明。
cyclotomic|15|005|割圆多项式|定义|所有本原 n 次单位根对应一次因子的乘积。|\Phi_n(x)=\prod_{\operatorname{ord}(\zeta)=n}(x-\zeta)|本书正文也使用 Q_n 记号；在适合的特征下讨论。
cyclotomic-product|15|006|割圆分解|定理|按单位根的阶分类，可把 x^n−1 分成割圆多项式的乘积。|x^n-1=\prod_{d\mid n}\Phi_d(x)|整数割圆多项式可约化到有限域；互异根解释需特征不整除 n。
cyclotomic-prime|15|007|素数幂的割圆多项式|例子|素数幂指数时由等比数列直接得到显式公式。|\Phi_{r^k}(x)=\sum_{j=0}^{r-1}x^{jr^{k-1}}|r 为素数，k≥1。
finite-cyclotomic|15|008|有限域割圆扩张的次数|定理|Frobenius 对单位根的作用把扩张次数转为模 n 的乘法阶。|[\mathbb F_q(\zeta):\mathbb F_q]=\operatorname{ord}_n(q)|ζ 为本原 n 次单位根，n>1，gcd(q,n)=1；n=1 时次数为 1。
field-cyclotomic|15|009|有限域作为割圆域|定理|有限域由其乘法群生成元产生，因此可看成素子域上的割圆域。|\mathbb F_q=\mathbb F_p(\zeta),\quad\operatorname{ord}(\zeta)=q-1|q=p^m。
polynomial-model|16|001|多项式表示|方法|在不可约多项式模下，用次数小于扩张次数的多项式表示域元素。|\mathbb F_{p^n}\cong\mathbb F_p[x]/(f)|f 首一不可约且次数 n。
power-model|16|003|幂表示|方法|选定本原元后，每个非零元素对应一个模 q−1 的指数。|a=\alpha^k,\quad0\le k<q-1|零单独表示；一般根不一定是本原元。
primitive-test|16|004|本原元检验|方法|对群阶的每个不同素因子进行幂测试即可验证满阶。|a^{(q-1)/\ell}\ne1\quad(\ell\mid q-1\text{ 为素数})|a 非零；需覆盖所有不同素因子。
companion|16|007|伴随矩阵|定义|把多项式关系编码成线性变换的矩阵。|f(A)=0|f 首一，A 为其伴随矩阵。
matrix-model|16|009|矩阵表示|例子|不可约多项式的伴随矩阵生成与商域同构的矩阵代数。|\mathbb F_p[A]\cong\mathbb F_p[x]/(f)|不可约性保证这是域。
binary-model|16|011|二进制系数表示|方法|特征二下，将幂基坐标存储为位串。|a=\sum_{i=0}^{w-1}a_i\alpha^i,\quad a_i\in\mathbb F_2|位串整数仅是存储编码，不是整数环运算。
xor|16|013|XOR 加法|方法|二进制坐标逐位相加等于异或。|(a+b)_i=a_i\oplus b_i|仅对应特征二及固定的二进制基坐标。
log-table|16|014|指数表与对数表|方法|非零元素的乘除化为指数的模运算。|\alpha^i\alpha^j=\alpha^{i+j\bmod(q-1)}|零没有离散对数；幂表示不直接简化加法。
grid-root|17|001|网格上的非零点|定理|每个变量次数低于网格对应边长时，非零多项式不可能在整个网格上消失。|\deg_{x_i}f<\lvert S_i\rvert|各 S_i 为非空有限集；f 非零。
grid-vanishing|17|002|网格消失与理想表示|定理|网格上恒为零的多项式可用各坐标的消失多项式组合表达。|f=\sum_i h_i\prod_{s\in S_i}(x_i-s)|使用本书的次数控制条件与结论。
coefficient|17|003|组合零点定理|定理|最高总次数层的一个非零系数保证适当网格上存在非零值。|[x_1^{t_1}\cdots x_n^{t_n}]f\ne0|总次数为 Σt_i；每个 S_i 的大小大于 t_i。
sumset|18|001|和集|定义|把两个集合中元素逐对相加得到新的集合。|A+B=\{a+b:a\in A,b\in B\}|和集的大小不等于有序数对的数量。
cauchy-davenport|18|001|Cauchy–Davenport 定理|定理|素数阶域中非空集合的和集有线性大小下界。|\lvert A+B\rvert\ge\min(p,\lvert A\rvert+\lvert B\rvert-1)|\(A,B\) 为 \(\mathbb F_p\) 中非空子集，\(p\) 为素数。
chevalley-warning|18|002|Chevalley–Warning 定理|定理|变量数超过方程总次数之和时，共同零点数是特征的倍数。|\sum_i\deg P_i<n\Longrightarrow p\mid N|在特征 p 的有限域上计数；整除结论本身不保证 N>0。
zero-sequence|18|004|零和子序列|方法|寻找指定长度且和为零的子序列，可转化为有限域多项式方程。|\sum_{j=1}^n a_{i_j}\equiv0\pmod n|序列允许重复值，但选取的是不同位置。
egz|18|006|Erdős–Ginzburg–Ziv 定理|定理|任意 2n−1 个整数中可选 n 个使总和被 n 整除。|\operatorname{EGZ}(n)=2n-1|n 为正整数；素数情形与合数归纳步骤应分别理解。
schwartz-zippel|19|001|Schwartz–Zippel 引理|定理|非零多元多项式在有限网格上为零的比例由总次数控制。|\Pr[f(a_1,\ldots,a_n)=0]\le\min(1,d/\lvert S\rvert)|f 非零，总次数 d；各 a_i 独立均匀取自同一非空有限集 S。
multilinear|19|002|多线性多项式|定义|每个变量的次数至多为一，适合在布尔立方体上估计支撑大小。|\deg_{x_i}f\le1|这是分别次数条件，不等于总次数至多一。
nonzero-bound|19|002|布尔立方体非零点下界|定理|非零多线性多项式的低总次数保证有较多非零取值点。|\#\{a\in\{0,1\}^n:f(a)\ne0\}\ge2^{n-d}|系数在 \(\mathbb F_2\)，非零多线性，总次数 \(d\le n\)。
identity-test|19|003|随机多项式恒等检验|方法|独立取样代入，多次零结果降低将非零多项式误判为零的概率。|\Pr[\text{误判}]\le(d/\lvert S\rvert)^k|要求采样集大小大于总次数 d，k 次独立采样；这是单侧概率保证。
`.trim().split('\n');
const nodes=rows.map(row=>{const [id,c,a,title,kind,summary,formula,conditions]=row.split('|');const chapter=chapters[Number(c)-1];return {id,chapter:chapter.id,part:chapter.part,title,kind,summary,formula,conditions,anchor:`${chapter.id}-${/^\d+$/.test(a)?'statement-':''}${a}`};});
const relations={prerequisite:{label:'先修知识',color:'#64748b',dash:'5 4'},characterization:{label:'定义与刻画',color:'#9564bc',dash:'2 3'},deduction:{label:'定理推导',color:'#247bb5',dash:''},construction:{label:'构造方法',color:'#22866b',dash:''},application:{label:'计算与应用',color:'#be7026',dash:''}};
const edges=[];
function connect(type,pairs){pairs.trim().split(/\s+/).filter(Boolean).forEach(pair=>{const [from,to]=pair.split('>');edges.push({from,to,type});});}
connect('prerequisite',`
operation>group group>subgroup group>order subgroup>generated subgroup>cyclic subgroup>coset equivalence>partition partition>coset subgroup>index cyclic>cyclic-subgroups order>power-order cyclic>generators cyclic>order-count
abelian>ring operation>ring unit-ring>domain comm-ring>domain ring>subring ring>ideal ideal>quotient hom>kernel quotient>isomorphism kernel>isomorphism field>polynomial polynomial>degree polynomial>divisibility polynomial>irreducible
division>gcd pid>minimal-kernel irreducible>quotient-field field>root root>multiplicity degree>root-bound polynomial>derivative derivative>repeated-root root-bound>interpolation
field>subfield subfield>adjoining adjoining>algebraic algebraic>minimal minimal>power-basis subfield>vector-extension vector-extension>extension-degree extension-degree>tower extension-degree>finite-algebraic
root>splitting splitting>splitting-unique root-isomorphism>splitting-unique prime-subfield>prime-power extension-degree>field-size splitting>finite-exist characteristic>finite-exist
cyclic>mult-cyclic lagrange>mult-cyclic root-bound>mult-cyclic abelian>mult-cyclic mult-cyclic>primitive primitive>primitive-test order>conjugate-order
minimal>degree-orbit frobenius>conjugates subfields>degree-orbit irreducible>irreducible-divisibility derivative>separable splitting>irreducible-split
hom>automorphism frobenius>finite-automorphism conjugates>trace conjugates>norm extension-degree>trace extension-degree>norm minimal>characteristic-polynomial vector-extension>multiplication-operator
trace>trace-linear trace>trace-pair trace>trace-zero tower>trace-tower norm>norm-multiplicative tower>norm-tower
vector-extension>basis-coordinates basis-coordinates>dual-basis basis-coordinates>normal-basis conjugates>normal-basis normal-basis>normal-exist trace>trace-matrix trace-matrix>discriminant frobenius>moore
root>unit-root order>primitive-root unit-root>unit-root-group primitive-root>cyclotomic cyclotomic>cyclotomic-product cyclotomic>cyclotomic-prime conjugates>finite-cyclotomic power-order>finite-cyclotomic
field>polynomial-model power-basis>polynomial-model primitive>power-model polynomial>companion companion>matrix-model characteristic>binary-model basis-coordinates>binary-model binary-model>xor power-model>log-table
degree>grid-root root-bound>grid-root divisibility>grid-vanishing grid-root>coefficient interpolation>coefficient coefficient>cauchy-davenport sumset>cauchy-davenport field>chevalley-warning zero-sequence>egz
degree>schwartz-zippel root-bound>schwartz-zippel multilinear>nonzero-bound schwartz-zippel>identity-test
`);
connect('characterization',`
group>abelian generated>cyclic order>cyclic residue>quotient coset>index domain>field ring>unit-ring ring>comm-ring ideal>principal algebraic>transcendental minimal-kernel>minimal prime-power>characteristic primitive>power-model unit-root>primitive-root
`);
connect('deduction',`
equivalence>partition coset>coset-size coset-size>lagrange index>lagrange lagrange>power-order power-order>generators cyclic-subgroups>unique-subgroups generators>order-count domain>finite-domain
division>pid division>bezout bezout>irreducible-prime irreducible-prime>factorization factor>root-bound factor>repeated-root root-bound>grid-root
characteristic>prime-subfield minimal-kernel>power-basis extension-degree>finite-algebraic tower>subfields field-size>prime-power lagrange>xq xq>rootset
splitting-unique>finite-unique finite-exist>finite-unique mult-cyclic>primitive-count generators>primitive-count primitive>simple-extension simple-extension>finite-irreducible
degree-orbit>irreducible-divisibility repeated-root>separable irreducible-divisibility>irreducible-split conjugates>degree-orbit power-order>conjugate-order
conjugates>finite-automorphism finite-automorphism>trace-linear characteristic-polynomial>multiplication-operator trace-linear>trace-zero trace-pair>dual-basis trace-matrix>discriminant moore>discriminant
unit-root-group>cyclotomic-product cyclotomic-product>cyclotomic-prime subfields>finite-cyclotomic primitive>field-cyclotomic grid-root>grid-vanishing coefficient>cauchy-davenport chevalley-warning>egz multilinear>nonzero-bound
`);
connect('construction',`
quotient>quotient-field bezout>quotient-field quotient-field>root-adjoin root-adjoin>splitting-unique root-isomorphism>splitting-unique rootset>finite-exist frobenius>finite-exist
power-basis>polynomial-model trace-pair>dual-basis trace-matrix>dual-basis companion>matrix-model finite-irreducible>polynomial-model
`);
connect('application',`
group>square subgroup>square frobenius>conjugates gcd>repeated-root gcd>quotient-field minimal>basis-coordinates power-basis>basis-coordinates tower>field-size
subfields>irreducible-divisibility finite-automorphism>trace finite-automorphism>norm trace-linear>trace-tower norm-multiplicative>norm-tower multiplication-operator>trace-matrix trace>dual-basis
normal-basis>binary-model power-order>primitive-test mult-cyclic>log-table primitive-root>finite-cyclotomic quotient-field>polynomial-model polynomial-model>binary-model
coefficient>zero-sequence chevalley-warning>zero-sequence schwartz-zippel>identity-test
`);
const routes=[
{name:'从代数基础到有限域的构造',ids:['group','ring','field','polynomial','division','irreducible','quotient-field','root-adjoin','splitting','splitting-unique','finite-exist','finite-unique']},
{name:'有限域的子域与本原元',ids:['extension-degree','tower','field-size','subfields','cyclic','power-order','mult-cyclic','primitive','simple-extension']},
{name:'共轭、迹、范数与基',ids:['minimal','conjugates','finite-automorphism','trace','norm','trace-pair','basis-coordinates','dual-basis','normal-basis']},
{name:'从抽象域到计算实现',ids:['quotient-field','power-basis','primitive','polynomial-model','power-model','primitive-test','binary-model','xor','log-table']},
{name:'多项式方法与组合应用',ids:['root-bound','interpolation','grid-root','coefficient','cauchy-davenport','chevalley-warning','egz','schwartz-zippel','identity-test']}
];
const byId=new Map(nodes.map(n=>[n.id,n]));
nodes.find(n=>n.id==='splitting-unique').extra={label:'高阶选读证明',anchor:'c09-splitting-field-proof'};
nodes.find(n=>n.id==='mult-cyclic').extra={label:'完整证明',anchor:'c11-cyclicity-proof'};
window.FFKnowledge={version:1,chapters,parts,nodes,edges,relations,routes,byId};
})();
