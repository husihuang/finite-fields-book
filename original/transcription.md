ZZSLIDE001ZZ

1.1 群的定义和例子

定义

设 $S$ 为一个非空集合，我们将映射

$$\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \  \circ \ \ :S \times S\  \rightarrow \ S$$

$\ \ (a,\ \ b) \longmapsto a \circ b(或\ ab)$

称为 $S$ 上的二元运算.

例子

整数集 $\mathbb{Z}$ 上的加法：

$\ \ \ \  + \ \ :{\mathbb{Z}} \times {\mathbb{Z}}\ \  \rightarrow \ {\mathbb{Z}}$

$(a,\ \ \ b) \longmapsto a + b$

ZZSLIDE002ZZ

定义

给定一个非空集合$\ G\ $及其上的一个二元运算 $\circ$，我们说 $G$ 对于 $\circ$ 构成一个群，若:

1\) 结合律：$\forall\ a,b,c \in G,\ \ a \circ (b \circ c) = (a \circ b) \circ c$

2\) 单位元： $\exists\ e \in G\ \ \ s.t.\ \ \forall\ a \in G\ \ a \circ e = e \circ a$

我们称 $e$ 为 $G\ $中的单位元，也写成$\ 1_{G}$ 或 $1$.

3\) 逆元：$\forall\ a \in G,\exists\ b \in G\ \ s.t.\ \ a \circ b = b \circ a = e$

我们称此元素 $b$ 为 $a$ 的逆元，记成 $a^{- 1}$.

4\) Abel（交换）群：$\forall\ a,b \in G,\ a \circ b = b \circ a$.

ZZSLIDE003ZZ

ZZSLIDE004ZZ

记号

对于 Abel 群，我们常将 $a \circ b$ 写成 $a + b$，$\text{~}e\text{~写成~}0$，$a^{- 1}\ $写成 $- a\text{.}$

2\) $a^{n} = a \circ a \circ a \circ \cdots \circ a\ (n\ 个\ a).$

$a^{0} = e.$

$a^{- n} = {(a^{- 1})}^{n}.$

$na = a + a + a + \ldots + a\ (n\ 个\ a).$

例子

所有整数 $\mathbb{Z}$ 在加法运算下构成一个交换群，记为$({\mathbb{Z}}, + ).$ 同样地，还有 $({\mathbb{Q}}, + ),\left. （{\mathbb{R}}, + \right.）,({\mathbb{C}}, + ).$

ZZSLIDE005ZZ

例子

所有整数 $\mathbb{Z}$ 在加法运算下构成一个交换群，记为$({\mathbb{Z}}, + ).$ 同样地，还有 $({\mathbb{Q}}, + ),\left. （{\mathbb{R}}, + \right.）,({\mathbb{C}}, + ).$

例子

令 $G = \left\{ 0,1,2,3,4,5 \right\}.则\ G\ 在$模 $6$ 加运算下

$+ \ \ :G \times G \rightarrow G$

$$(a,b) \longmapsto a + b\ mod\ 6$$

构造一个 Abel 群。

例子

所有非零的有理数在乘法运算下构成一个交换群，记为 $({\mathbb{Q}}\backslash\left\{ 0 \right\},\ \  \bullet )$. 同样地还有 $\left( {\mathbb{R}}\backslash\left\{ 0 \right\},\ \  \bullet \right),$ $({\mathbb{C}}\backslash\left\{ 0 \right\},\ \  \bullet )$.

ZZSLIDE006ZZ

定义

若群 $G$ 中含有有限多个元素，则称其为有限群. 群 $G$ 元素的个数称为 $G$ 的阶，记为$\ |G|.$

定义

给定群 $(G,\ \  \bullet )$. 若

$$\exists\ a \in G\ \ s.t.\ \ \left( \forall\ b \in G\ \ \exists\ j \in {\mathbb{Z}}\ \ s.t.\ \ b = a^{j} \right)$$

则称群 $G$ 为循环群，$a$ 为 $G$ 的一个生成元. 也记 $G = \left\langle a \right\rangle.$

ZZSLIDE007ZZ

定义

给定群 $(G,\ \  \bullet )$ 及其子集 $H.$ 如果 $H$ 自身在 $G$ 的运算$\bullet$下构成一个群，则称 $H$ 为 $G$ 的一个子群. 记 $H \leq G$.

例子

给定元素 $a \in G.$ 我们用 $\left\langle a \right\rangle$ 表示由 $a$ 的所有幂构成的子群，即

$\left\langle a \right\rangle = \left\{ a^{m} \right.\ :\left. \ m \in {\mathbb{Z}} \right\}.$

定义

若子群 $\left\langle a \right\rangle$ 为有限群，则将群 $\left\langle a \right\rangle$ 的阶 $\left. \ \left| \left\langle a \right\rangle \right.\  \right|\ $也称为元素 $a$ 的阶.

定义

给定群 $G$ 的子集 $S$. 我们用 $\left\langle S \right\rangle$ 表示由 $S$ 中所有有限多个元素幂乘积形成的子群.

若 $\left\langle S \right\rangle = G$，则称 $S$ 生成 $G$.

ZZSLIDE008ZZ

定义

给定群 $(G,\ \  \bullet )$ 及其子集 $H.$ 如果 $H$ 自身在 $G$ 的运算$\bullet$下构成一个群，则称 $H$ 为 $G$ 的一个子群. 记 $H \leq G$.

例子

由单位元构成的平凡子群 $\left\langle e \right\rangle.$

例子

给定元素 $a \in G.$ 我们用 $\left\langle a \right\rangle$ 表示由 $a$ 的所有幂构成的子群，即

$\left\langle a \right\rangle = \left\{ a^{m} \right.\ :\left. \ m \in {\mathbb{Z}} \right\}.$

ZZSLIDE009ZZ

定义

若子群 $\left\langle a \right\rangle$ 为有限群，则将群 $\left\langle a \right\rangle$ 的阶 $\left. \ \left| \left\langle a \right\rangle \right.\  \right|\ $也称为元素 $a$ 的阶.

验证元素 $a$ 的阶 $\left. \ \left| \left\langle a \right\rangle \right.\  \right|$ 是使得 $a^{\left. \ \left| \left\langle a \right\rangle \right.\  \right|} = 1$ 成立的最小正整数.

练习

例子

给定群 $G$ 的子集 $S$. 我们用 $\left\langle S \right\rangle$ 表示由 $S$ 中所有有限多个元素幂乘积形成的子群.

若 $\left\langle S \right\rangle = G$，则称 $S$ 生成 $G$.

ZZSLIDE010ZZ

1.2 等价关系和等价类

定义

我们称集合 $S \times S\ $的一个子集 $R$ 为等价关系，若:

1\) 自反性：$\forall s \in S,\ \ (s,s) \in R.$

2\) 对称性： 若 $(s,t) \in R,\ $则 $(t,s) \in R$.

3\) 传递性： 若 $(s,t) \in R,(t,u) \in R$, 则 $(s,u) \in R$.取 $s \in S$, 我们记 $s$ 的等价类为

$$\text{[}s\rbrack = \{ t \in S\ :(s,t) \in R\}$$

练习

如果两个等价类 $\text{[}s\rbrack$ 和 $\text{[}s’\rbrack\ $不相等，那么

$$\text{[}s\rbrack \cap \text{[}s’\rbrack = \varnothing$$

从而所有不同的等价类构成集合 $S$ 的一个划分.

ZZSLIDE011ZZ

例子

整数集 $\mathbb{Z}$ 上的模 $n$ 同余关系是 $\mathbb{Z}$ 上的一个等价关系，并将 $\mathbb{Z}$ 划分成了 $n$ 个互不相交的等价类：

$$\lbrack 0\rbrack = \{\cdots, - 2n, - n,0,n,2n,\cdots\}$$

$$\lbrack 1\rbrack = \{\cdots, - 2n + 1, - n + 1,1,n + 1,2n + 1,\cdots\}$$

$\vdots$

$$\lbrack n - 1\rbrack = \{\cdots, - n - 1, - 1,n - 1,2n - 1,\cdots\}$$

ZZSLIDE012ZZ

例子

我们在以上 $n$ 个等价类的集合 $\{\lbrack 0\rbrack,\lbrack 1\rbrack,\cdots,\lbrack n - 1\rbrack\}$上定义如下二元关系：

$$\lbrack a\rbrack + \lbrack b\rbrack = \lbrack a + b\rbrack.$$

可以验证$\ (\{\lbrack 0\rbrack,\lbrack 1\rbrack,\cdots,\lbrack n - 1\rbrack\},\ \  + )$ 构成一个群.

我们称其为 模 $n$ 的剩余类群，记为 ${\mathbb{Z}}_{n}$.

群 ${\mathbb{Z}}_{n}$ 为循环群，且 $\lbrack 1\rbrack$ 为其一生成元.

练习

ZZSLIDE013ZZ

练习

给定群 $H < G.$ 在群 $G$ 上定义如下关系 $R_{H}$:

$$(a,b) \in R_{H} \Leftrightarrow \exists\ h \in H\ \ \ s.t.\ \ a = bh.$$

是一个等价关系.

定义

给定群 $H < G$ 及以上等价关系 $R_{H}.\ $我们用

$aH = \{ ah:h \in H\}$

来表示元素 $a$ 所在的等价类，并称这些等价类为 $G$关于 $H$ 的陪集.

练习

给定群 $H < G.$ 我们有

$$\forall\ a \in G,\ \left. \ \left| aH \right.\  \right| = \left. \ \left| H \right.\  \right|.$$

ZZSLIDE014ZZ

定义

给定群 $H < G$ 及以上等价关系 $R_{H}.\ $我们用

$aH = \{ ah:h \in H\}$

来表示元素 $a$ 所在的等价类，并称这些等价类为 $G$关于 $H$ 的陪集.

练习

给定群 $H < G.$ 我们有

$$\forall a \in G,\ \left. \ \left| aH \right.\  \right| = \left. \ \left| H \right.\  \right|.$$

ZZSLIDE015ZZ

定义

给定群 $H < G.$ 我们将 $G$ 关于 $H$ 的不同陪集的数目记为 $\left. \ \left| G/H \right.\  \right|$，并称之为 $H$ 在 $G$ 中的指标.

\(1\) $\left. \ \left| G \right.\  \right| = \left. \ \left| H \right.\  \right| \cdot \left. \ \left| G/H \right.\  \right|.$

\(2\) 作为 (1) 的特例，$\forall\ a \in G$，$\left. \ \left| \left\langle a \right\rangle \right.\  \right|$ 整除 $\left. \ \left| G \right.\  \right|.$

定理

$G$ 关于 $H$ 的所有不同陪集构成 $G$ 的一个划分.

证明

ZZSLIDE016ZZ

1.3 循环群基本定理

定理

令 $\left\langle a \right\rangle$ 为阶为 $m$ 的循环群. 我们有

（1）循环群的子群皆为循环群.

（2）$\left. \ \left| \left\langle a^{k} \right\rangle \right.\  \right| = \frac{m}{\gcd(k,m)}.$

（3）若 $d|m$，则群 $\left\langle a \right\rangle$ 有且仅有一个指标为 $d$ 的子群.

若 $f|m$，则群 $\left\langle a \right\rangle\ $有且仅有一个阶为 $f$ 的子群.

（4）若 $f|m$，则群 $\left\langle a \right\rangle$ 包含 $\phi(f)$ 个阶为 $f$ 的元素.

（5）群 $\left\langle a \right\rangle$ 包含 $\phi(m)$ 个生成元. 它们是元素 $a^{r}$，其中 $\gcd(r,m) = 1$.

下面我们将依次证明结论（1）-（5）

ZZSLIDE017ZZ

定理

令 $\left\langle a \right\rangle$ 为阶为 $m$ 的循环群. 我们有

（1）循环群的子群皆为循环群.

证明

ZZSLIDE018ZZ

定理

令 $\left\langle a \right\rangle$ 为阶为 $m$ 的循环群. 我们有

（2）$\left. \ \left| \left\langle a^{k} \right\rangle \right.\  \right| = \frac{m}{\gcd(k,m)}.$

证明

ZZSLIDE019ZZ

定理

令 $\left\langle a \right\rangle$ 为阶为 $m$ 的循环群. 我们有

（3）若 $d|m$，则群 $\left\langle a \right\rangle$ 有且仅有一个指标为 $d$ 的子群.

若 $f|m$，则群 $\left\langle a \right\rangle\ $有且仅有一个阶为 $f$ 的子群.

证明

ZZSLIDE020ZZ

定理

令 $\left\langle a \right\rangle$ 为阶为 $m$ 的循环群. 我们有

（4）若 $f|m$，则群 $\left\langle a \right\rangle$ 包含 $\phi(f)$ 个阶为 $f$ 的元素.

证明

ZZSLIDE021ZZ

定理

令 $\left\langle a \right\rangle$ 为阶为 $m$ 的循环群. 我们有

（5）群 $\left\langle a \right\rangle$ 包含 $\phi(m)$ 个生成元. 它们是元素 $a^{r}$，其中 $\gcd(r,m) = 1$.

证明

ZZSLIDE022ZZ

2.1 环和域的定义

定义

环 $(R,\ \  + ,\ \  \bullet )$ 是一个集合 $R$，并在其上定义满足如下性质的两类二元运算：

（1）$(R,\ \  + )$是交换群.

（2）运算$`` \bullet "$满足结合律，即 $\forall\ a,\ b,c \in R$

$$(ab)c = a(bc)$$

（3）分配律，即 $\forall\ a,b,c \in R$

$$a \bullet (b + c) = ab + ac$$

$$(b + c) \bullet a = ba + ca$$

ZZSLIDE023ZZ

\(1\) 幺环：具有单位元的环，即

$$\exists e \in R,\ \ \ \ ae = ea = a$$

\(2\) 交换环：运算$`` \bullet "$是交换的，即

$$\forall a,b \in R,\ \ \ \ ab = ba$$

\(3\) 整环：具有非零单位元的交换环，且满足：

$$ab = 0 \Rightarrow a = 0\ 或\ b = 0$$

\(4\) 域: 交换环，且 $R$ 中的非零元素在二元运算$`` \bullet "$

下构成群

定义

ZZSLIDE024ZZ

例子

环：${Mat}_{2 \times 2}({\mathbb{R}})$

交换环：${\mathbb{Z}}_{4}$

整环：${\mathbb{Z}},{\mathbb{Z}}\lbrack x\rbrack$

域：$\mathbb{Q}$,$\ \ {\mathbb{R}}$, $\mathbb{C}$

ZZSLIDE025ZZ

定理

任一有限整环均为域.

证明

ZZSLIDE026ZZ

定义

我们称环 $R$ 的一个子集 $S$ 为 $R$ 的子环，如果 $S$ 在 $R$ 的两类二元运算 $`` + "$ 和 $`` \bullet "$ 下封闭，并且在这两类运算下构成环.

定义

我们称环 $R$ 的一个子集 $J$ 为 $R$ 的理想，如果 $J$ 是 $R$ 的子环，并且

$$\forall\ a \in J,\ \forall\ r \in R,\ a \cdot r \in J$$

练习

给定交换环 $R$ 和它的元素 $a$. 容易验证最小的包含 $a$ 的理想是 $(a) = \text{\{}ra + na:\ r \in R,\ n \in {\mathbb{Z}}\text{\}}$. 进一步地，如果 $R$ 包含单位元，那么$(a) = \text{\{}ra:\ r \in R\text{\}}$.

ZZSLIDE027ZZ

定义

给定环 $R$ 和环$\ S$ . 我们称映射$\ \varphi:\ R \rightarrow S$ 为一个同态，如果

$$\forall a,b \in R\ ,\ \ \varphi(a + b) = \varphi(a) + \varphi(b)$$

$\varphi(ab) = \varphi(a)\varphi(b).$

同态映射 $\varphi$ 的核为 $\ker\varphi = \left\{ a \in R:\varphi(a) = 0 \right\}.$

命题

如上定义的核$\ \ker\varphi\ $是环$\ R$ 的理想.

ZZSLIDE028ZZ

定义

给定交换环 $R$ 和它的一个理想 $\ J$. 如果$\ \exists\ a \in R,\ \ \ J = (a)，$则我们称 $J$ 为主理想，也称 $J$ 是由元素 $a$ 生成的主理想.

练习

验证我们可以在陪集 $(R, + )/(J, + )$ 上定义如下运算，使其构成环：

$$(a + J) + (b + J)\  : = \ (a + b) + J\ \ \ \ (1)$$

$(a + J)\  \bullet \ (b + J)\  : = \ \ ab + J\ \ \ \ \ \ \ \ \ \ \ \ \ (2)\ $

我们称如上定义的环为$\ R\ $模 $\ J$ 的剩余类环.

例子

集合$\ (n)$ 是由整数集 $\mathbb{Z}$ 中由元素 $n$ 生成的主理想环，即所有 $n$ 的倍数. 于是我们得到剩余类环 ${\mathbb{Z}}/(n).$

ZZSLIDE029ZZ

下面验证 $(2)$ 式是良定义的：

假设 $a + J = a^{’} + J,\ \ b + J = b^{’} + J,\ \ $即

$\ \exists r,s \in J,\ \ \ \ \ a = a^{’} + r,\ \ \ \ \ b = b^{’} + s$

$\left( a^{’} + J \right)\left( b^{’} + J \right) = a^{’}b^{’} + J$

$= (a - r)(b - r) + J$

$= ab - as - rb + rs + J$

$= ab + J$

$= (a + J)(b + J)$

ZZSLIDE030ZZ

整数环 Z 作为有理数域 Q 的子环。

第一步：验证 Z 是 Q 的一个子环 (Subring)

第二步：验证 Z 是不是 Q 的一个理想 (Ideal)

为什么"吸收性质"如此重要？

\[0.25\]=?\[0.75\]

例子

ZZSLIDE031ZZ

例子

集合$\ (n)$ 是由整数集 $\mathbb{Z}$ 中由元素 $n$ 生成的主理想环，即所有 $n$ 的倍数. 于是我们得到剩余类环 ${\mathbb{Z}}/(n).$

定理

（环同态基本定理）给定两个环 $R$ 和 $S$，以及环同态 $\varphi:R \rightarrow S$. 我们有核 $\ker\varphi$ 是 $R$ 的理想，且 $S \cong R/\ker\varphi.\ \ 反之，给定\ R\ 的$任一理想 $\ J$ ，映射

${\mathit{Ψ}}:R \rightarrow R/J$

$\ \ \ \ \ \ a \mapsto {\mathit{Ψ}}(a) = a + J$

是环同态，且其核$\ker\varphi = J$.

ZZSLIDE032ZZ

定理

给定任一素数 $p$，剩余类环 ${\mathbb{Z}}/(p)$ 构成一个大小为 $p$ 的域.

证明

ZZSLIDE033ZZ

例子

给定素数 $p$. 令 ${\mathbb{F}}_{p} = \left\{ 0,1,\cdots,p - 1 \right\}.$ 定义映射

$\ \varphi\ :\ {\mathbb{Z}}/(p) \longrightarrow {\mathbb{F}}_{p}$

$\ \ a + (p) \longmapsto a,\ \ \ \ a \in {\mathbb{F}}_{p}$

可以验证 ${\mathbb{F}}_{p}$ 在如下定义的两类运算下

$$a + b\  : = \varphi\left( a + b + (p) \right)$$

$$ab\  : = \ \varphi\left( ab + (p) \right)$$

构成阶为 $p$ 的有限域.

ZZSLIDE034ZZ

定义

给定环 $R$. 若存在正整数 $n$ 使得

$\forall\ r \in R,\ \ \ \ n \cdot r = 0\ \ \ \ \ \ ( \ast )$

我们称使得$\ ( \ast )$ 式成立的最小正整数为 $R$ 的特征，记为 $char(R)$. 如果不存在这样的正整数，则称 $R$ 的特征为 0.

例子

特征为 $0$ 的域$:\ {\mathbb{Q}},{\mathbb{R}},{\mathbb{C}}.$

ZZSLIDE035ZZ

定理

令 $R \neq \left\{ 0 \right\}$ 为一整环. 若 $R$ 的特征为某一正整数 $n$，则 $n$ 必定为素数.

证明

推论

有限域的特征是素数.

证明

ZZSLIDE036ZZ

练习

令 $R$ 为一个交换环且其特征为素数 $p$. 我们有

$$(a + b)^{p^{n}} = a^{p^{n}} + b^{p^{n}}$$

$$(a - b)^{p^{n}} = a^{p^{n}} - b^{p^{n}}$$

ZZSLIDE037ZZ

2.2 域上多项式

定义

给定环 $R$ 及自变量 $x$. 环 $R$ 上的多项式可以写成

$$f(x) = a_{0} + a_{1}x + \cdots + a_{n}x^{n} = \sum_{i = 0}^{n}a_{i}x^{i}$$

其中 $n$ 是非负整数，系数 $a_{i},\ \ 0 \leq i \leq n,$ 是环 $R$ 中的元素. 给定两个多项式

$$f(x) = \sum_{i = 0}^{n}a_{i}x^{i}，g(x) = \sum_{j = 0}^{m}b_{j}x^{j}$$

ZZSLIDE038ZZ

不妨假定 $n \leq m$. 我们定义

$$f(x) + g(x) = \sum_{i = 0}^{m}{(a}_{i} + b_{i})x^{i}\ \ \ {(a}_{i} = 0,n \leq i \leq m)$$

$$f(x) \bullet g(x) = \sum_{k = 0}^{n + m}c_{k}x^{k},\ c_{k} = \sum_{\begin{array}{r}
i + j = k \\
0 \leq i \leq n \\
0 \leq j \leq m
\end{array}}^{}a_{i}b_{j}$$

我们称 $R$ 上全体多项式在以上两类运算下构成的环为多项式环，并记成 $R\lbrack x\rbrack.$

ZZSLIDE039ZZ

定义

给定 $R$ 上多项式

$f(x) = \sum_{i = 0}^{n}{a_{i}x^{i}},\ \ a_{n} \neq 0$

我们称

· $a_{n}:$ 首项系数

· $a_{0}:$ 常数项

· $n$: 多项式 $f$ 的度数，记为 $deg(f)$

· $\deg(0) = - \infty$

· 首 1 多项式若 $a_{n}$=1.

ZZSLIDE040ZZ

练习

给定环 $R$ 和 $f(x)$，$g(x) \in R\lbrack x\rbrack.$ 我们有

$\deg(f + g) \leq \max(\deg(f),\deg(g))$

$$\deg(fg) \leq \deg(f) + \deg(g)$$

若环 $R$ 是一个整环，则

$$\deg(fg) = \deg(f) + \deg(g)$$

ZZSLIDE041ZZ

从现在开始我们令 $\mathbb{F}$ 为一个域并考虑多项式环${\mathbb{F}}\lbrack{\mathbf{x}}\rbrack$.

记号

给定 $f,g \in {\mathbb{F}}\lbrack x\rbrack.$ 若存在 $h \in {\mathbb{F}}\lbrack x\rbrack$，使得 $g = f \bullet h$ 成立，则称 $f$ 整除 $g$，记为 $f|g.$

定理

（带余除法）给定非零多项式 $g \in {\mathbb{F}}\lbrack x\rbrack.$ 我们有

$$\forall\ f \in {\mathbb{F}}\lbrack x\rbrack,\ \exists\ q,\ r \in {\mathbb{F}}\lbrack x\rbrack,\ s.t.\ f = qg + r,$$

其中 $r = 0$ 或者 $\deg(r) < \deg(g).\ $

证明

略.

ZZSLIDE042ZZ

定理

（1）多项式环 ${\mathbb{F}}\lbrack x\rbrack$ 是主理想环.

（2）且对于 ${\mathbb{F}}\lbrack x\rbrack$ 中的任一非零理想 $J( \neq \left\{ 0 \right\})$，我们均可以找到唯一的首1多项式 $g(x) \in {\mathbb{F}}\lbrack x\rbrack$，使得 $J$=($g(x)$).

ZZSLIDE043ZZ

练习

给定两个不全为 $0$ 的多项式 $f_{1},f_{2} \in {\mathbb{F}}\lbrack x\rbrack.$ 存在唯一一个首 $1$ 多项式 $d$ 满足以下性质：

（1）$d|f_{i},\ 1 \leq i \leq 2$

（2）每个整除 $f_{1}$ 和 $f_{2}$ 的多项式 $c$ 都会整除 $d.$

我们还可以将 $d$ 写成

$$d = b_{1}f_{1} + b_{2}f_{2},\ \ \ \ \ \ \ b_{1},b_{2} \in {\mathbb{F}}\lbrack x\rbrack.$$

练习

利用带余除法找出一组 $b_{1}$ 和 $b_{2}.$

ZZSLIDE044ZZ

定义

我们称上述 $d$ 为 $f_{1}$ 和 $f_{2}$ 的最大公因子，并记为 $d = \gcd(f_{1},f_{2}).$ 若 $d = 1,$ 则称 $f_{1}$ 和 $f_{2}$ 互素.

注记

我们可以将上述定义类比地推广到任意 $n$ 个多项式 $f_{1},f_{2},\cdots f_{n} \in {\mathbb{F}}\lbrack x\rbrack.$

ZZSLIDE045ZZ

2.3 不可约多项式

定义

给定多项式 $p \in {\mathbb{F}}\lbrack x\rbrack.$ 若 $p$ 不是常数，且满足以下性质：

$p = bc,\ \ b,c \in {\mathbb{F}}\lbrack x\rbrack \Rightarrow b \in {\mathbb{F}}$ 或 $c \in {\mathbb{F}}$

则称 $p$ 在 $\mathbb{F}$ 上不可约.

ZZSLIDE046ZZ

定理

给定 $f \in {\mathbb{F}}\lbrack x\rbrack.$ 剩余类环 ${\mathbb{F}}\lbrack x\rbrack/(f)$ 构成一个域当且仅当 $f$ 在 $\mathbb{F}$ 上不可约.

ZZSLIDE047ZZ

推论

给定不可约多项式 $p \in {\mathbb{F}}\lbrack x\rbrack.$ 若 $p|f_{1}f_{2}\cdots f_{m},\ $

$f_{i} \in {\mathbb{F}}\lbrack x\rbrack.$ 则存在 $j,\ 1 \leq j \leq m,$ 使得 $p|f_{j}.$

ZZSLIDE048ZZ

练习

（域上多项式唯一分解定理）给定非常数多项式 $f \in {\mathbb{F}}\lbrack x\rbrack.$ 我们有以下分解式：

$$\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ f = ap_{1}^{e_{1}}\cdots p_{k}^{e_{k}}\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ ( \ast )\ \ \ \ $$

其中 $a \in {\mathbb{F}},\ e_{i} \in {\mathbb{Z}}_{> 0},\ 1 \leq i \leq k,\ \ p_{1},\cdots,p_{k}$ 为 ${\mathbb{F}}\lbrack x\rbrack$ 中不同的首1不可约多项式，并且分解式 $( \ast )$ 在不计次序的意义下是唯一的.

ZZSLIDE049ZZ

2.4 多项式的零点和Lagrange插值多项式

定义

如果 $f(b) = 0,$ 我们称元素 $b \in {\mathbb{F}}$ 是多项式 $f \in {\mathbb{F}}\lbrack x\rbrack$ 的根.

定理

$f(b) = 0$ 当且仅当 $(x - b)|f(x).$

定义

设 $f(b) = 0$. 若 ${(x - b)}^{k}|f(x)$, 但 ${(x - b)}^{k + 1} \nmid f(x),$ 我们称 $k$ 是根 $b$ 的重数，特别地

$k = 1:$ 单根

$k \geq 2:$ 重根

ZZSLIDE050ZZ

定理

（度数紧箍咒）给定 $f \in {\mathbb{F}}\lbrack x\rbrack,\ \deg(f) > 0.$ 如果 $b_{1},b_{2},\cdots,b_{m}$ 是 $f$ 在 $\mathbb{F}$ 中的 $m$ 个不同的根, 其对应的重数分别为 $k_{1},k_{2},\cdots,k_{m}$, 那么

$${{(x}_{1} - b_{1})}^{k_{1}}{{(x}_{2} - b_{2})}^{k_{2}}\cdots{{(x}_{m} - b_{m})}^{k_{m}}|f.$$

特别地$,\ k_{1} + k_{2} + \cdots + k_{m} \leq n,$ 从而 $f$ 在 $\mathbb{F}$ 中至多有 $n$ 个不同的根.

ZZSLIDE051ZZ

定义

给定 $f = a_{0} + a_{1}x + \cdots + a_{n}x^{n}.$ 其形式导数为

$$f’ = a_{1} + 2a_{2}x + \cdots + na_{n}x^{n - 1}.$$

元素 $b \in {\mathbb{F}}$ 是多项式 $f$ 的一个重根当且仅当

$$f(b) = f’(b) = 0.$$

练习

练习

给定 $f \in {\mathbb{F}}\lbrack x\rbrack,\ \deg(f) = 2$ 或 $3.$ 我们有 $f$ 是不可约多项式当且仅当 $f$ 在 $\mathbb{F}$ 中没有根.

ZZSLIDE052ZZ

定理

（Lagrange插值公式）令 $n \geq 0.$ 给定 $n + 1$ 个 $\mathbb{F}$ 中不同的元素 $a_{0},a_{1},\cdots,a_{n}$, 以及 $\mathbb{F}$ 中任意 $n + 1$ 个元素 $b_{0},b_{1},\cdots,b_{n}.$ 我们可以找到唯一的次数不高于 $n$ 的多项式 $f \in {\mathbb{F}}\lbrack x\rbrack,$ 满足 $f(a_{i}) = b_{i},\ 0 \leq i \leq n.$

ZZSLIDE053ZZ

3.1 子域和扩域

定义

给定域 $\mathbb{F}$. 若 $\mathbb{F}$ 的子集 $K$ 在 $\mathbb{F}$ 的运算下也构成一个域，则我们称 $K$ 为 $\mathbb{F}$ 的子域. 也称 $\mathbb{F}$为 $K$ 的扩域.

例子

域 $\mathbb{F}$ 是其本身的一个子域，我们称之为平凡子域. 其余与 $\mathbb{F}$ 不同的子域称为真子域.

定义

若域 $\mathbb{F}$ 中没有真子域，则称 $\mathbb{F}$ 为素域.

ZZSLIDE054ZZ

定理

给定域 ${\mathbb{F}}.$ 我们有:

1\) 若 $char({\mathbb{F}}) = p$, $p为某一素数，则\ {\mathbb{F}}$ 包含的素域同构于 ${\mathbb{F}}_{p}$.

2\) 若 $char({\mathbb{F}}) = 0$, $则\ {\mathbb{F}}$ 包含的素域同构于 $\mathbb{Q}$.

ZZSLIDE055ZZ

定义

给定域 $K < {\mathbb{F}}$ 以及 $M\ \text{⊂}\ {\mathbb{F}}.$ 我们定义域 $K(M)$ 为 $\mathbb{F}$ 中所有同时包含 $K$ 和 $M$ 的子域的交，并称之为由域 $K$ 添加 $M$ 中元素所得到的扩域.

1\) 若 $M = \left\{ _{1},\cdots,_{n} \right\},$ 我们也记 $K(M) = K\left( _{1},\cdots,_{n} \right).$

2\) 若 $M = \left\{  \right\},$ 则称 $L = K()$ 为域 $K$ 的单扩张，并称元素 $$ 为 $L$ 在 $K$ 上的一个定义元.

3\) 可以验证 $K(M)$ 是 $\mathbb{F}$ 中最小的同时包含 $K$ 和 $M$ 的子域.

ZZSLIDE056ZZ

定义

给定域 $K < {\mathbb{F}}$ 以及 $ \in {\mathbb{F}}.$ 若 $$ 满足代数方程

$a_{n}^{n} + a_{n - 1}^{n - 1} +$ $\cdots + a_{1} + a_{0} = 0,\ a_{i} \in$ $K$(不全为$0$)

则称 $$ 在 $K$ 上是代数的. 若不存在如上的代数方程，则称 $$ 在 $K$ 上是超越的. 如果 $\mathbb{F}$ 中的每一个元素在 $K$上都是代数的，则称 $\mathbb{F}$ 是 $K$ 的代数扩张. 反之，若 $\mathbb{F}$ 中存在至少一个在 $K$ 上超越的元素，则称 $\mathbb{F}$ 是 $K$ 的超越扩张.

ZZSLIDE057ZZ

定理

假定元素 $ \in {\mathbb{F}}$ 是 $K$ 上的代数元. 令

$$J = \left\{ f \in K\lbrack x\rbrack:f() = 0 \right\}.$$

则存在唯一的首$1$多项式 $g \in K\lbrack x\rbrack$ 使得 $J = (g).$ 并且多项式 $g$ 在 $K$ 上不可约.

定义

我们称 $g$ 为元素 $$ 在 $K$ 上的极小多项式，也将 $g$ 的次数称为元素 $$ 在 $K$ 上的次数.

ZZSLIDE058ZZ

定理

假定元素 $ \in {\mathbb{F}}$ 是域 $K$ 上的代数元. 我们有以下关于 $$ 的极小多项式 $g$ 的性质:

1\) $g$ 是 $K\lbrack x\rbrack$ 中的不可约多项式.

2\) 对于 $f \in K\lbrack x\rbrack,$ 有 $f() = 0$ 当且仅当 $g|f.$

3\) $g$ 是 $K\lbrack x\rbrack$ 中以 $$ 为根的次数最低的首$1$多项式.

ZZSLIDE059ZZ

3.2 域扩张

定义

一个域 $K$ 上向量空间 $V$ 是一个非空集合，其中的元素称之为向量，并且对以下两种运算封闭：

1）加法：对于任意的 $u,\ v \in V,\ u + v \in V.$

2）数乘：对于任意的 $u \in V$ 和 $k \in K,\ ku \in V.$

另外 $(V, + )$ 构成一个Abel群, 且数乘满足如下性质：

1） $1u = u,\ \forall\ u \in V.$

2）结合律：$k_{1}\left( k_{2}u \right) = \left( k_{1}k_{2} \right)u.$

3）线性性：$k(u + v) = ku + kv.$

4）分配律：$\left( k_{1} + k_{2} \right)u\  = k_{1}u + k_{2}u.$

ZZSLIDE060ZZ

练习

给定域 $K \leq L$，可以验证 $L$ 是 $K$ 上的向量空间.

定义

给定域 $K \leq L.$ 若 $L$ 作为 $K$ 上的向量空间的维数 ${dim}_{K}L$ 是有限的，则我们称 $L$ 是 $K$ 的有限扩张，也称 $L$ 在 $K$ 上的次数为 ${dim}_{K}L$，记为 $\lbrack L:K\rbrack.$

ZZSLIDE061ZZ

定理

（链式法则）假定 $K \leq L$ 和 $L \leq M$均为有限扩张. 则 $\lbrack M:K\rbrack = \lbrack M:L\rbrack\lbrack L:K\rbrack$

ZZSLIDE062ZZ

定理

域 $K$ 的任一有限扩张都是代数扩张.

ZZSLIDE063ZZ

定理

令 $ \in {\mathbb{F}}$ 是域 $K$ 上次数为 $n$ 的代数元，其在 $K$ 上的极小多项式是 $g$. 我们有

1)$K\lbrack\theta\rbrack = K() \cong K\lbrack x\rbrack/(g)$.

2\) $\left\lbrack K():K \right\rbrack = n,$ 且 ${\{ 1,,}^{2}, \cdot \cdot \cdot ,^{n - 1}\}$是 $K()$ 在 $K$ 上的一组基. 故而 $K()$ 中的任一元素均可以唯一表示成 $a_{0} + a_{1} + \cdots + a_{n - 1}^{n - 1},\ $ 其中$a_{i} \in$ $K,\ \ 0 \leq i \leq n - 1.$

3\) 任一元素 $\alpha \in K()$ 在 $K$ 上均是代数的，且其在 $K$ 上的次数整除 $n$.

ZZSLIDE064ZZ

定理

令 $f \in K\lbrack x\rbrack$ 为域 $K$ 上的不可约多项式. 则存在 $K$ 的一个以 $f$ 的某个根为定义元的单扩张.

ZZSLIDE065ZZ

定理

令 $f \in K\lbrack x\rbrack$ 为域 $K$ 上的不可约多项式，$\alpha$ 和 $\beta$为 $f$ 的两个根. 则 $K(\alpha) \cong K(\beta)$，且存在一个保持 $K$ 中元素不动同时将 $\alpha$ 映射到$\ \beta\ $的同构映射.

ZZSLIDE066ZZ

定义

令 $f \in K\lbrack x\rbrack$ 为一非常数多项式，且 $\mathbb{F}$ 为 $K$ 的扩域. 若 $\exists\alpha_{1},{\cdots,\alpha}_{n} \in {\mathbb{F}}$ 使得

$$f = a\left( x - \alpha_{1} \right)\left( x - \alpha_{2} \right)\cdots\left( x - \alpha_{n} \right)$$

其中 $a$ 为 $f$ 的首项系数，则称 $f$ 在 $\mathbb{F}$ 中分裂. 更进一步地，若 $f$ 在 $\mathbb{F}$ 中分裂且 ${\mathbb{F}} = K\left( \alpha_{1},{\cdots,\alpha}_{n} \right)\ $，则称 $\mathbb{F}$ 为 $f$ 的分裂域.

ZZSLIDE067ZZ

定理

（分裂域的存在＆唯一性）令 $K$ 为一个域，$f$ 为 $K\lbrack x\rbrack$ 中任一非常数的多项式. 则

（1）存在 $f$ 的一个包含 $K$ 的分裂域；

（2） $f$ 的任意两个包含 $K$ 的分裂域都是同构的，并且这个同构映射保持 $K$ 中元素不动，而把 $f$ 的根映射到 $f$ 的根.

ZZSLIDE068ZZ

3.3 有限域的性质

引理

假设有限域 $\mathbb{F}$ 中包含一个大小为 $q$ 的子域 $K$. 我们有 $|{\mathbb{F}}| = q^{m}$，其中 $m = \lbrack{\mathbb{F}}\ :K\rbrack$.

ZZSLIDE069ZZ

定理

给定有限域 $\mathbb{F}$ 并假设 $char({\mathbb{F}}) = p$. 则有 $|{\mathbb{F}}| = p^{n}\ $，其中$\ n = \left\lbrack {\mathbb{F}}\ :{\mathbb{F}}_{p} \right\rbrack$ .

ZZSLIDE070ZZ

引理

令 $\mathbb{F}$ 为大小为 $q$ 的有限域. 那么

$$\forall a \in {\mathbb{F}},{\ a}^{q} = a.$$

引理

令 $\mathbb{F}$ 为大小为 $q$ 的有限域，且 $K$ 为 $\mathbb{F}$ 的子域. 则$K\lbrack x\rbrack$中多项式 $x^{q} - x$ 在 ${\mathbb{F}}\lbrack x\rbrack$ 中有如下分解:

$$x^{q} - x = \prod_{a \in {\mathbb{F}}_{q}}^{}(x - a)$$

ZZSLIDE071ZZ

例子

${\mathbb{F}}_{4} = \left\{ 0,1,\theta,\theta + 1 \right\}.$

ZZSLIDE072ZZ

定理

（有限域的存在＆唯一性）对于任一素数 $p$ 和正整数 $n$，存在一个大小为 $p^{n}$ 的有限域. 并且任一大小为 $q = p^{n}$ 的有限域都和 $x^{q} - x$ 在 ${\mathbb{F}}_{p}$ 上的分裂域同构.

ZZSLIDE073ZZ

定理

（子域判别法则）令 ${\mathbb{F}}_{q}$ 为大小为 $q = p^{n}$ 的有限域.那么 ${\mathbb{F}}_{q}$ 的任一子域的大小为 $p^{m}$ ，其中 $m\left| n \right.\ $. 反之，若 $m\left| n \right.\ \ $则存在唯一的 大小为 $p^{m}$的${\mathbb{F}}_{q}$的子域.

ZZSLIDE074ZZ

例子

${\mathbb{F}}_{2^{30}}$的子域.

ZZSLIDE075ZZ

3.4 本原元

定理

对于每一个有限域$\ {\mathbb{F}}_{q}$ ，其非零元素构成的乘法群 ${\mathbb{F}}_{q}^{\ast}$ 是循环群.

定义

我们称循环群$\ {\mathbb{F}}_{q}^{\ast}\ $的生成元为域 ${\mathbb{F}}_{q}$ 的本原元.

推论

${\ {\mathbb{F}}}_{q}$包含 $\phi(q - 1)$ 个本原元.

ZZSLIDE076ZZ

定理

令 ${\mathbb{F}}_{q}$ 为一个有限域，${\mathbb{F}}_{r}$ 为其有限扩域. 那么$\ {\mathbb{F}}_{r}\ $是${\mathbb{F}}_{q}\ $的一个单代数扩张，且$\ {\mathbb{F}}_{r}\ $的每一个本原元都可以作为${\ {\mathbb{F}}}_{r}/$ ${\mathbb{F}}_{q}$ 的定义元.

推论

对于每个有限域${\ {\mathbb{F}}}_{q}$ 和每个正整数$\ n$，在${\ {\mathbb{F}}}_{q}\lbrack x\rbrack$ 中存在一个次数为$\ n$ 的不可约多项式.

ZZSLIDE077ZZ

3.5 不可约多项式的根

引理

令${\ f \in {\mathbb{F}}}_{q}\lbrack x\rbrack\ $是$\ {\mathbb{F}}_{q}\ $上的一个不可约多项式，且$\ \alpha\ $是 $f$ 在 ${\mathbb{F}}_{q}$ 的某个扩域中的一个根. 那么对于多项式${\ h \in {\mathbb{F}}}_{q}\lbrack x\rbrack\ $，我们有 $h(\alpha) = 0$ 成立当且仅当 $f|h$.

引理

令${\ f \in {\mathbb{F}}}_{q}\lbrack x\rbrack\ $是$\ {\mathbb{F}}_{q}\ $上次数为$\ m\ $的不可约多项式，那么 $f(x)|x^{q^{n}} - x$ 当且仅当$\ m|n$.

ZZSLIDE078ZZ

定理

令${\ f\ 是\ {\mathbb{F}}}_{q}\lbrack x\rbrack\ $中次数为$\ m\ $的不可约多项式，那么 $f\ $在 ${\mathbb{F}}_{q^{m}}$ 中有一个根$\ \alpha$. 并且$\ f$ 的所有根都是单根，且由以下 $m$ 个不同的元素给出：

$$\alpha,\ \alpha^{q},\ \alpha^{q^{2}},\cdots,\alpha^{q^{m - 1}}.$$

推论

令${\ f\ 是\ {\mathbb{F}}}_{q}\lbrack x\rbrack\ $中次数为$\ m\ $的不可约多项式，则${\ f\ 在\ {\mathbb{F}}}_{q}$ 上的分裂域为 ${\mathbb{F}}_{q^{m}}$ .

ZZSLIDE079ZZ

推论

在${\ {\mathbb{F}}}_{q}\lbrack x\rbrack\ 中，$任何两个次数相同的不可约多项式的分裂域都是同构的.

定义

令 ${\mathbb{F}}_{q^{m}} > {\mathbb{F}}_{q}.\ $对于 ${\alpha \in {\mathbb{F}}}_{q^{m}},\ $我们称元素

$$\alpha,\alpha^{q},\cdots,\alpha^{q^{m - 1}}$$

为 $\alpha$ 关于${\ {\mathbb{F}}}_{q}$ 的共轭元.

ZZSLIDE080ZZ

推论

元素${\ \alpha \in {\mathbb{F}}}_{q^{m}}\ $关于$\ {\mathbb{F}}_{q}\ \text{的共轭}$元都是不同的，当且仅当$\ \alpha\ $在$\ {\mathbb{F}}_{q}\ $上的最小多项式的次数为$\ m$. 否则，该最小多项式的次数$\ d$ 是$\ m$ 的一个真因子，并且$\ \alpha\ $关于$\ {\mathbb{F}}_{q}\ \text{的}$共轭元为

$$\alpha,\alpha^{q},\cdots,\alpha^{q^{d - 1}},$$

其中每个共轭元重复出现 $m/d$ 次.

定理

元素$\ \alpha \in {\mathbb{F}}_{q^{m}}^{\ast}$ 关于${\ {\mathbb{F}}}_{q}$ 的共轭元在$\ {\mathbb{F}}_{q^{m}}^{\ast}$ 中具有相同的阶.

ZZSLIDE081ZZ

3.5 迹和范数

定义

如果映射$\ \sigma:{\mathbb{F}}_{q^{m}}{\rightarrow {\mathbb{F}}}_{q^{m}}\ $满足以下条件：

$$\begin{aligned}
\# \\
\sigma(\alpha + \beta) & = \sigma(\alpha) + \sigma(\beta)\ \ \ \forall\alpha,\beta \in {\mathbb{F}}_{q^{m}},\# \\
\sigma(\alpha\beta) = \sigma(\alpha)\sigma(\beta)\ \ \ \forall\alpha,\beta \in {\mathbb{F}}_{q^{m}},\# \\
\sigma(a) & = a\ \ \ \forall a \in {\mathbb{F}}_{q},
\end{aligned}$$

则称$\ \sigma\ $为$\ {\mathbb{F}}_{q^{m}}\ $在$\ {\mathbb{F}}_{q}\ $上的自同构.

ZZSLIDE082ZZ

对于$\ 0 \leq j \leq m - 1,\ $我们定义映射

$$\ \sigma_{j}(\alpha) = \alpha^{q^{j}},\forall\ \alpha \in {\mathbb{F}}_{q^{m}}.$$

那么域$\ {\mathbb{F}}_{q^{m}}\ $在$\ {\mathbb{F}}_{q}\ $上所有不同的自同构正好是映射$\ \sigma_{0},\sigma_{1},\cdots{,\sigma}_{m - 1}.$

定理

ZZSLIDE083ZZ

定义

给定域$\ F = {\mathbb{F}}_{q^{m}}\ $和${\ K = {\mathbb{F}}}_{q}.$ 元素$\ \alpha \in F\ $在$\ K\ $上的迹定义为

$${Tr}_{F/K}(\alpha) = \alpha + \alpha^{q} + \cdots + \alpha^{q^{m - 1}}$$

如果$\ K\ $是$\ F\ $的素子域，则称${\ Tr}_{F/K}(\alpha)$为$\ \alpha\ $的绝对迹，并简写为 ${\ Tr}_{F}(\alpha).$

ZZSLIDE084ZZ

定义

给定域$\ F = {\mathbb{F}}_{q^{m}},\ {\ K = {\mathbb{F}}}_{q}\ $和元素$\ \alpha \in {\mathbb{F}}$. 令$\ f \in K\lbrack x\rbrack\ $是元素$\ \alpha\ $在$\ K\ $上的极小多项式，可知其次数$\ d = \deg(f)|\ m.$ 我们称$\ g(x) = f({x)}^{m/d} \in K\lbrack x\rbrack$为$\ \alpha\ $在$\ K\ $ 上的特征多项式.

可以验证：

$$\begin{aligned}
f & = (x - \alpha)\left( x - \alpha^{q} \right)\cdots\left( x - \alpha^{q^{d - 1}} \right)\# \\
g & = (x - \alpha)\left( x - \alpha^{q} \right)\cdots\left( x - \alpha^{q^{m - 1}} \right)\# \\
 & = f^{\frac{m}{d}}\text{~}\# \\
 & = x^{m} + a_{m - 1}x^{m - 1} + \cdots + a_{1}x + a_{0}
\end{aligned}$$

因此$\ {Tr}_{F/K}(\alpha) = - a_{m - 1}.$

ZZSLIDE085ZZ

注释

假设${\ {\mathbb{F}}}_{q}\lbrack\alpha\rbrack = {\mathbb{F}}_{q^{m}}.$ 令$\ f \in K\lbrack x\rbrack\ $是元素$\ \alpha\ $在$\ K\ $上的极小多项式，可知其次数为$\ m.$ 令

$$f = x^{m} + a_{m - 1}x^{m - 1} + \cdots + a_{1}x + a_{0}.$$

那么$\ 1,\ \alpha,\cdots,\alpha^{m - 1}$ 是$\ {\mathbb{F}}_{q^{m}}/{\ {\mathbb{F}}}_{q}$ 的一组基，且

$$\begin{array}{r}
\alpha \cdot \left( 1,\ \alpha,\cdots,\alpha^{m - 1} \right) = \left( \alpha,\alpha^{2},\cdots,\alpha^{m - 1},\alpha^{m} \right)\#
\end{array}$$

$$= \left( 1,\ \alpha,\cdots,\alpha^{m - 1} \right)\begin{pmatrix}
\begin{matrix}
0 & 0 \\
1 & 0 \\
0 & 1
\end{matrix} & \cdots & \begin{matrix}
0\  - a_{0} \\
0\  - a_{1} \\
0\  - a_{2}
\end{matrix} \\
 \vdots & \ddots & \ \ \ \  \vdots \\
\begin{matrix}
0 & 0 \\
0 & 0
\end{matrix} & \cdots & \begin{matrix}
\ \ \ 0\  - a_{m - 2} \\
\ \ \ 1 - a_{m - 1}
\end{matrix}
\end{pmatrix}$$

从而$可知{\ Tr}_{F/K}(\alpha) = trace(A)$

ZZSLIDE086ZZ

定理

给定域$\ F = {\mathbb{F}}_{q^{m}},\ {\ K = {\mathbb{F}}}_{q}.\ $我们有

1\. ${Tr}_{F/K}(\alpha + \beta) = {Tr}_{F/K}(\alpha) + {Tr}_{F/K}(\beta)\ \ \ \forall\alpha,\beta \in {\mathbb{F}}$

2\. ${Tr}_{F/K}(c\alpha) = {cTr}_{F/K}(\alpha)\ \ \ \forall c \in K,\ \forall\alpha \in {\mathbb{F}}$

3\. ${Tr}_{F/K}$ 是从$\ {\mathbb{F}}$ 到$\ K$ 的线性变换且是满射，其中$\ F\ $ 和$\ K\ $被看作是 $K$ 上的向量空间.

4\. ${Tr}_{F/K}(a) = ma$ $\ \ \forall a \in K$

5\. ${Tr}_{F/K}\left( \alpha^{q} \right) =$ ${Tr}_{F/K}(\alpha)\ \ \ \forall\alpha \in F$

ZZSLIDE087ZZ

定理

设$\ F\ 是有限域\ K\ $的一个有限扩张. 对于$\ \beta \in F\ $我们定义映射

$${\ L}_{\beta}(\alpha) = {Tr}_{F/K}(\beta\alpha),\forall\alpha \in F.$$

那么当 $\beta \neq \gamma$ 时我们有${\ L}_{\beta} \neq L_{\gamma}.$ 并且从$\ F$ 到 $K$ 的所有线性变换就是映射 $L_{\beta},$ $\beta \in F.$

证明

ZZSLIDE088ZZ

定理

设$\ F\ 是{\ K = {\mathbb{F}}}_{q}$ 的一个有限扩张. 那么对于 $\alpha \in {\mathbb{F}}$，我们有 ${Tr}_{F/K}(\alpha) = 0\ 当且$仅当存在$\ \beta \in {\mathbb{F}}\ $使得 $\alpha = \beta^{q} - \beta.$

证明

ZZSLIDE089ZZ

定理

（迹的传递性）设 $F$ 是 $K$ 的一个有限扩张，$E$ 是 $F$ 的一个有限扩张. 那么

$${Tr}_{E/K}(\alpha) = {Tr}_{F/K}\left( {Tr}_{E/F}(\alpha) \right),\ \forall\alpha \in E.$$

ZZSLIDE090ZZ

定义

给定域 $F = {\mathbb{F}}_{q^{m}}$ 和 ${K = {\mathbb{F}}}_{q}$，我们定义元素$\ \alpha \in F\ $在$\ K\ $上的范数$\ N_{F/K}(\alpha)$ 为

$$N_{F/K}(\alpha) = \alpha \bullet \alpha^{q} \bullet \cdots \bullet \alpha^{q^{m - 1}} = \alpha^{{(q}^{m} - 1)/(q - 1)}$$

ZZSLIDE091ZZ

定理

给定$\ \ {K = {\mathbb{F}}}_{q}\ $和$\ F = {\mathbb{F}}_{q^{m}}.$ 我们有

1\. $N_{F/K}(\alpha\beta) = N_{F/K}(\alpha)N_{F/K}(\beta),\ \ \ \forall\alpha,\beta \in {\mathbb{F}}$

2\. $N_{F/K}$ 是从$\ F$ 到$\ K$ 的满射，也是从$\ F^{\ast}$ 到$\ K^{\ast}$的满射.

3\. $N_{F/K}(a) = a^{m},$ $\ \ \forall a \in K$

4\. $N_{F/K}\left( \alpha^{q} \right) =$ $N_{F/K}(\alpha),\ \ \ \forall\alpha \in {\mathbb{F}}$

证明

ZZSLIDE092ZZ

定理

（范数的传递性）设 $F$ 是 $K$ 的一个有限扩张， $E$ 是 $F$ 的一个有限扩张. 那么

$$N_{E/K}(\alpha) = N_{F/K}\left( N_{E/F}(\alpha) \right),\forall\alpha \in E.$$

证明

ZZSLIDE093ZZ

3.6 有限域的基

例子

如果 $(\alpha_{1},\cdots,\alpha_{m})$ 是 $F/K$ 的一组基，那么

$$\forall\alpha \in F,\alpha = c_{1}(\alpha)\alpha_{1} + c_{2}(\alpha)\alpha_{2} + \cdots + c_{m}(\alpha)\alpha_{m}.$$

容易验证${\ c}_{j}:{\alpha \rightarrow c}_{j}(\alpha)$ 是从$\ F$ 到$\ K$ 的一个线性变换. 因此，$\exists\ \beta_{j} \in F,\ c_{j}(\alpha) = {Tr}_{F/K}(\beta_{j}\alpha)，\forall\alpha \in F$.

特别地

$${Tr}_{F/K}\left( \beta_{j}\alpha_{i} \right) = \left\{ \begin{array}{r}
0\ \ \ \ i \neq j \\
1\ \ \ \ i = j
\end{array} \right.\ \ \ \ \ ( \ast )$$

可以验证 $(\beta_{1},\cdots,\beta_{m})$ 是 $F/K$ 的另一组基.

ZZSLIDE094ZZ

定义

我们称满足$\ ( \ast )\ $式的两组基 $(\alpha_{1},\cdots,\alpha_{m})$ 和$\ \left( \beta_{1},\cdots,\beta_{m} \right)\ $互为对偶基.

定义

令$\ {K = {\mathbb{F}}}_{q} < F = {\mathbb{F}}_{q^{m}}.\ 那么\ F/K$ 的一组形如$\{\alpha,\alpha^{q},\cdots,\alpha^{q^{m - 1}}\}$ 的基被称为 $F/K$ 的正规基.

定理

对于一个有限域$\ K$ 及其有限扩张$\ F/K$，都存在$\ F/K$ 的一组正规基.

ZZSLIDE095ZZ

定义

设$\ F/K$ 的次数为 $m\ .\ $我们定义元素 $\alpha_{1},\cdots,\alpha_{m} \in F$ 的判别式为

$\mathrm{\Delta}_{F/K}(\alpha_{1},\cdots,\alpha_{m})$

$$= \left| \begin{matrix}
\begin{array}{r}
\begin{matrix}
{Tr}_{F/K}\left( \alpha_{1}\alpha_{1} \right) & {Tr}_{F/K}\left( \alpha_{1}\alpha_{2} \right) \\
{Tr}_{F/K}\left( \alpha_{2}\alpha_{1} \right) & {Tr}_{F/K}\left( \alpha_{2}\alpha_{2} \right)
\end{matrix} \\
 \vdots 
\end{array} & \begin{matrix}
\cdots & {Tr}_{F/K}\left( \alpha_{1}\alpha_{m} \right) \\
\cdots & \begin{array}{r}
{Tr}_{F/K}\left( \alpha_{2}\alpha_{m} \right) \\
 \vdots 
\end{array}
\end{matrix} \\
\begin{matrix}
{Tr}_{F/K}\left( \alpha_{m}\alpha_{1} \right) & {Tr}_{F/K}\left( \alpha_{m}\alpha_{2} \right)
\end{matrix} & \begin{matrix}
\cdots & {Tr}_{F/K}\left( \alpha_{m}\alpha_{m} \right)
\end{matrix}
\end{matrix} \right|$$

ZZSLIDE096ZZ

定理

设$\ F/K$ 的次数为 $m\ ，$且 $\alpha_{1},\cdots,\alpha_{m} \in F$. 那么${\{\alpha}_{1},\cdots,\alpha_{m}\}$ 是 $F\ $在 $K$ 上的一组基，当且仅当$\mathrm{\Delta}_{F/K}(\alpha_{1},\cdots,\alpha_{m}) \neq 0$.

证明

ZZSLIDE097ZZ

推论

设 $\alpha_{1},\cdots,\alpha_{m} \in {\mathbb{F}}_{q^{m}}$. 那么$\ {\{\alpha}_{1},\cdots,\alpha_{m}\}\ $ 是 ${\mathbb{F}}_{q^{m}}/{\mathbb{F}}_{q}$ 的一组基，当且仅当

$$\left| \begin{matrix}
\begin{array}{r}
\begin{matrix}
\alpha_{1} & \alpha_{2} \\
\alpha_{1}^{q} & \alpha_{2}^{q}
\end{matrix} \\
 \vdots 
\end{array} & \begin{matrix}
\cdots & \alpha_{m} \\
\cdots & \begin{array}{r}
\alpha_{m}^{q} \\
 \vdots 
\end{array}
\end{matrix} \\
\begin{matrix}
\alpha_{1}^{q^{m - 1}} & \alpha_{2}^{q^{m - 1}}
\end{matrix} & \begin{matrix}
\cdots & \alpha_{m}^{q^{m - 1}}
\end{matrix}
\end{matrix} \right| \neq 0$$

ZZSLIDE098ZZ

3.6 割圆域和割圆多项式

定义

设$\ n$ 为正整数. 多项式$\ x^{n} - 1\ $在域 $K\ $上的分裂域称为 $K\ $上的 $\mathbf{n}$ 次割圆域，记为 $K^{(n)}.\ \ 多项式\ x^{n} - 1在\ K^{(n)}\text{~}\text{中的根称为}\text{~}K\ $上的 $\mathbf{n}$ 次单位根，所有这些根的集合记为 $E^{(n)}.$

ZZSLIDE099ZZ

定理

设$\ n$ 为正整数，$K\ $为特征为 $p\ $的域.

如果 $p \nmid n$，那么$\ n$ 次单位根集合$\ E^{(n)}\ $在 $K^{(n)}$ 中关于乘法构成一个阶为$\ n\ $的循环群.

如果$\ p|n$，则$\ n = mp^{e}，$其中 $(m,p) = 1.\ 我们有{\ K}^{(n)} = K^{(m)},$ $E^{(n)} = E^{(m)}$，并且 $x^{n} - 1\ 在\ K^{(n)}\text{~}\text{中的根}$是 $E^{(m)}$ 的 $m$ 个元素，且每个根的重数为${\ p}^{e}.$

证明

ZZSLIDE100ZZ

定义

设$\ K\ $为特征为 $p\ $的域，$n$ 为不被 $p$ 整除的正整数. 那么循环群 $E^{(n)}$ 的一个生成元称为 $K$ 上的一个 $\mathbf{n}$ 次本原单位根.

推论

$\text{~}K\text{~上}恰好有$ $\phi(n)\ 个不同的\ n$ 次本原单位根. 如果 $\zeta\ 是$一个$\ n$ 次本原单位根，那么所有的 $n$ 次本原单位根是：

$$\zeta^{s},1 \leq s \leq n,\gcd(s,n) = 1.$$

ZZSLIDE101ZZ

定义

多项式

$$Q_{n}(x) = \prod_{\begin{matrix}
s = 1 \\
\gcd(s,n) = 1
\end{matrix}}^{n}{(x -}\zeta^{s})$$

称为 $K$ 上的 $\mathbf{n}$ 次割圆多项式.

ZZSLIDE102ZZ

定理

设$\ K\ $为特征为 $p\ $的域，$n$ 是一个不被 $p\ $整除的正整数. 我们有

$x^{n} - 1 = \prod_{d|n}^{}{Q_{d}(x)}.$

$Q_{n}(x)$ 的系数属于 $K\text{~}\text{的素子域}\text{.}$ 并且如果$\ K\ $的素子域为有理数域，那么这些系数属于$\ {\mathbb{Z}}.$

ZZSLIDE103ZZ

例子

设 $r\ $为一个素数且 $k \in {\mathbb{N}}$. 则

$$Q_{r^{k}}(x) = 1 + x^{r^{k - 1}} + x^{{2r}^{k - 1}} + \cdots + x^{{(r - 1)r}^{k - 1}}.$$

特别地

$$Q_{r^{k}}(x) = \frac{x^{r^{k}} - 1}{Q_{1}(x)Q_{r}(x){\cdots Q}_{r^{k - 1}}(x)} = \frac{x^{r^{k}} - 1}{x^{r^{k - 1}} - 1}$$

当$\ k = 1$ 时，有$Q_{r}(x) = 1 + x + x^{2} + \cdots + x^{r - 1}.$

ZZSLIDE104ZZ

定理

$$\text{割圆}域\ K^{(n)}\ 是\ K\ \text{的一个单代数扩张}.\ \ 并且$$

如果$\ K = {\mathbb{Q}}\ $，则割圆多项式 $Q_{n}$ 在 $K$ 上不可约，且 $\left\lbrack K^{(n)}:K \right\rbrack = \phi(n)$.

如果$\ K = {\mathbb{F}}_{q}\ $且 $\gcd(q,n) = 1，$我们令$\ d$ 是满足 $q^{d} \equiv 1\ (mod\ n)$ 的最小正整数，则${\ Q}_{n}$ 可以分解为$\ \phi(n)/d$ 个在 $K\lbrack x\rbrack$ 中的不同的首一不可约多项式，它们的次数均为 $d$， $K^{(n)}\ $是任何一个这样的不可约因式在 $K$上的分裂域，且 $\left\lbrack K^{(n)}:K \right\rbrack = d.$

ZZSLIDE105ZZ

定理

有限域${\ {\mathbb{F}}}_{q}$ 是其任一子域上的 $(q - 1)$ 次割圆域.

ZZSLIDE106ZZ

引理

如果 $d$ 是正整数 $n$ 的一个因子，且 $1 \leq d < n$，那么 $Q_{n}(x)$ 整除 ${(x}^{n} - 1)/{(x}^{d} - 1)$.

ZZSLIDE107ZZ

§ 有限域元素的表示方法

给定有限域${\ {\mathbb{F}}}_{q}$ ，其中 $q = p^{n}$ ， $p$ 为域${\ {\mathbb{F}}}_{q}$的特征. 我们将介绍${\ {\mathbb{F}}}_{q}$中元素的三种表示方法.

第1种

我们知道 ${\mathbb{F}}_{q}$ 是$\ {\mathbb{F}}_{p}\ $的单扩张. 不妨设 ${\mathbb{F}}_{q} = {\mathbb{F}}_{p}\lbrack\alpha\rbrack\ $ ，多项式 $f \in {\mathbb{F}}_{p}\text{[}x\text{]}$ 为 $\alpha$ 在 ${\mathbb{F}}_{p}$ 上的极小多项式. 于是 $\deg(f) = n\ $ ，且 ${\mathbb{F}}_{q} \cong {\mathbb{F}}_{p}\lbrack x\rbrack/(f)$ . 从而我们可以将$\ {\mathbb{F}}_{q}$ 中元素表述为 $a_{n - 1}\alpha^{n - 1} + a_{n - 2}\alpha^{n - 2} + \cdots + a_{1}\alpha + a_{0},\ {\ a}_{i} \in {\mathbb{F}}_{p}$ ，或者$\ a_{n - 1}x^{n - 1} + a_{n - 2}x^{n - 2} + \cdots + a_{1}x + a_{0} + (f),a_{i} \in {\mathbb{F}}_{p}$

ZZSLIDE108ZZ

给定有限域${\ {\mathbb{F}}}_{9}$ 和${\ {\mathbb{F}}}_{3}$ 上的二次不可约多项式

$f(x) = x^{2} + 1$. 设 $\alpha \in {\mathbb{F}}_{9}$ 为 $f(x)$ 的一个根，即 $f(\alpha) = \alpha^{2} + 1 = 0$. 那么

例子

$${\mathbb{F}}_{9} = \left\{ a_{1}\alpha + a_{0}:\ a_{1} \in {\mathbb{F}}_{3} \right\}$$

$= \{ 0,\ 1,\ 2,\ \alpha,\ \alpha + 1,\alpha + 2,\ 2\alpha,2\alpha + 1,\ 2\alpha + 2$}

ZZSLIDE109ZZ

第2种

假设 $\zeta\ $为${\ {\mathbb{F}}}_{q}$的本原元. 那么 ${\mathbb{F}}_{q}^{\ast} = \left\langle \zeta \right\rangle.$

问题

如何寻找本原元或者本原多项式？

给定有限域${\ {\mathbb{F}}}_{9}$. 注意到 ${\mathbb{F}}_{9} = {\mathbb{F}}_{3}^{(8)}$，即 ${\mathbb{F}}_{9}$ 是 ${\mathbb{F}}_{3}$ 上的 $8$ 次割圆域。通过计算可以得到

$$Q_{8}(x) = x^{4} + 1 = (x^{2} + x + 2)(x^{2} + 2x + 2).$$

令$\ \zeta \in {\mathbb{F}}_{9}$ 为不可约多项式 $x^{2} + x + 2$ 的根. 那么可知，$\zeta$ 是 ${\mathbb{F}}_{9}$ 的本原元. 于是

$${\mathbb{F}}_{9} = \{ 0,\zeta,\ \zeta^{2},\ \zeta^{3},\ \zeta^{4},\zeta^{5},\zeta^{6},\zeta^{7},\ \zeta^{8}( = 1)\}$$

例子

ZZSLIDE110ZZ

注意到元素$\ \zeta = 1 + \alpha$ 为 $x^{2} + x + 2$ 的根，其中 $\alpha^{2} + 1 = 0.$

于是我们有如下的元素对应表

$$\begin{matrix}
i & & \\
1 & \zeta & 1 + \alpha \\
2 & \zeta^{2} & 2\alpha \\
3 & \zeta^{3} & 1 + 2\alpha \\
4 & \zeta^{4} & 2 \\
5 & \zeta^{5} & 2 + 2\alpha \\
6 & \zeta^{6} & \alpha \\
7 & \zeta^{7} & 2 + \alpha \\
8 & 1 & 1
\end{matrix}$$

ZZSLIDE111ZZ

第3种

给定 $n$ 次首$\ 1\ $多项式 $f(x) = a_{0} + a_{1}x + \ldots + a_{n - 1}x^{n - 1} + x^{n}$. 我们称如下矩阵

$$A = \begin{pmatrix}
0 & 0 & 0 & \cdots & 0 & - a_{0} \\
1 & 0 & 0 & \cdots & 0 & - a_{1} \\
0 & 1 & 0 & \cdots & 0 & - a_{2} \\
 \vdots & \vdots & \vdots & \  & \vdots & \vdots \\
0 & 0 & 0 & \cdots & 1 & - a_{n - 1}
\end{pmatrix}$$

为 $f(x)$ 的伴随矩阵. 可以验证

$$det(xI - A) = f(x).$$

引理

$f(A) = a_{0}I + a_{1}A + \cdots + a_{n - 1}A^{n - 1} + A^{n} = 0$ ，其中 I 为 $n$ 阶单位阵.

ZZSLIDE112ZZ

因此若 $f(x)$ 是 ${\mathbb{F}}_{p}$ 上的$\ n\ $次首$\ 1\ $不可约多项式，那么其伴随矩阵 $A$ 满足 $f(A) = 0$ . 我们可以将 $A$ 看成是 $f$ 的一个根.

例子

令 $f(x) = x^{2} + 1 \in {\mathbb{F}}_{3}\lbrack x\rbrack\ $. 其伴随矩阵

$$A = \begin{pmatrix}
0 & 2 \\
1 & 0
\end{pmatrix}$$

$${\mathbb{F}}_{q} = \{ 0,I,2I,A,I + A,2I + A,2A,2A + I,2A + 2I\}$$

还可以取 $h(x) = x^{2} + x + 2$ 及其伴随矩阵

$$C = \begin{pmatrix}
0 & 1 \\
1 & 2
\end{pmatrix}$$

$${\mathbb{F}}_{q} = \{ 0,C,C^{2},\cdots,C^{8}\}$$

ZZSLIDE113ZZ

有限域 $\text{GF}(2^{w})$ 在系统中的实现

例子

给定${\ {\mathbb{F}}}_{2}$ 上的二次本原多项式 $x^{2} + x + 1$. 我们有 ${\mathbb{F}}_{4} = {\mathbb{F}}_{2}\lbrack x\rbrack/(x^{2} + x + 1) = \{ 0,1,x,x + 1\}.$

$$\begin{matrix}
生成元 & 多项式 & 二元序列 & 二进制整数 \\
0 & 0 & 00 & 0 \\
x^{0} = 1 & 1 & 01 & 1 \\
x & x & 10 & 2 \\
x^{2} & x + 1 & 11 & 3 \\
 & & & 
\end{matrix}$$

加法：二元序列XOR运算

ZZSLIDE114ZZ

例子

给定有限域 $\text{GF}(2^{w})$ 以及${\ {\mathbb{F}}}_{2}$ 上的 $w$ 次本原多项式.

于是

$$\text{GF}(2^{w}) = \{ a_{0} + a_{1}x + \cdots + a_{w - 1}x^{w - 1}:\ a_{i} \in {\mathbb{F}}_{2}\}$$

$$= \{(a_{w - 1}a_{w - 2}\cdots a_{1}a_{0}):\ a_{i} \in {\mathbb{F}}_{2}\}$$

$$= \{ a_{w - 1} \cdot 2^{w - 1} + \cdots + a_{1} \cdot 2 + a_{0}:\ a_{1} \in {\mathbb{F}}_{2}\}$$

$$= \lbrack 2^{w} - 1\rbrack = \{ 0,1,\cdots,2^{w} - 1\}$$

ZZSLIDE115ZZ

$$\text{GF}(2^{4})$$

本原多项式$\ f(x) = x^{4} + x + 1$

ZZSLIDE116ZZ

加法

$$11 + 7 = 1011 \oplus 0111 = 1100 = 12$$

需 $w$ 次XOR运算

首先我们需要定义如下对数表

乘法

$$3 \times 7 = gfilog\left\lbrack gflog\lbrack 3\rbrack + gflog\lbrack 7\rbrack \right\rbrack = gfilog\lbrack 4 + 10\rbrack = gfilog\lbrack 14\rbrack = 9$$

$$13 \div 10 = gfilog\left\lbrack gflog\lbrack 13\rbrack - gflog\lbrack 10\rbrack \right\rbrack = gfilog\lbrack 13 - 9\rbrack = gfilog\lbrack 4\rbrack = 3$$

需 3 次查表，和 1 次模运算

ZZSLIDE117ZZ

组合零点定理

引理

给定域 $\mathbb{F}$ 及其上 $n$ 个变量的多项式

$$P = P(x_{1},x_{2},\cdots,x_{n})$$

假设对于 $1 \leq i \leq n$, 多项式 $P$ 关于变量 $x_{i}$ 的次数至多是 $t_{i}$, 并且我们令 $S_{i} \subset {\mathbb{F}}$ 至少包含 $t_{i} + 1$ 个不同的域元素. 如果

$$P(x_{1},x_{2},\cdots,x_{n}) = 0\ ,\forall(x_{1},\cdots,x_{n}) \in S_{1} \times \cdots \times S_{n}$$

那么 $P$ 是零多项式.

ZZSLIDE118ZZ

定理

（Hilbert 零点定理）给定域$\ {\mathbb{F}}\ $及其上 $n$ 个变量的多项式 $f = f(x_{1},x_{2},\cdots,x_{n}).$ 令 $S_{1},\cdots,S_{n}$ 为$\ {\mathbb{F}}\ $中非空集合$.$ 如果

$$f\left( s_{1},s_{2},\cdots,s_{n} \right) = 0,\forall\left( s_{1},\cdots,s_{n} \right) \in S_{1} \times \cdots \times S_{n},$$

那么存在多项式 $h_{1},h_{2},\cdots,h_{n} \in {\mathbb{F}}\lbrack x_{1},x_{2},\cdots,x_{n}\rbrack$ 使得 $f = \sum_{i = 1}^{n}{h_{i}g_{i}},\ $其中$g_{i}(x_{i}) = \prod_{s \in S_{i}}^{}{(x_{i} - s)}$ $,\deg\left( h_{i} \right) \leq \deg(f) - deg\left( g_{i} \right).$

ZZSLIDE119ZZ

定理

（组合零点定理）给定域 ${\mathbb{F}}\ $及其上 $n$ 个变量的多项式 $f = f(x_{1},x_{2},\cdots,x_{n}).$假设 $f$ 的次数 $\deg(f) = \sum_{i = 1}^{n}t_{i},t_{i} \geq 0,$ 并且单项式 $\prod_{i = 1}^{n}x_{i}^{t_{i}}$ 在 $f$ 中的系数不为 $0$. 如果 $S_{1},\cdots,S_{n}$ 是 $\mathbb{F}$ 中满足 ${|S}_{i}| > t_{i}$ 的子集, 那么可以找到 ${s_{1} \in S}_{1},{s_{2} \in S}_{2,}\cdots,s_{n}{\in S}_{n},$ 使得 $f(s_{1},s_{2},\cdots,s_{n}) \neq 0$.

ZZSLIDE120ZZ

定理

(Cauchy-Davenport) 令 $p$ 为素数, 并且 $A,\ B$ 为 ${\mathbb{F}}_{p}$ 中两个非空子集. 我们有

$$|A + B| \geq \min\{ p,|A| + |B| - 1\}.$$

ZZSLIDE121ZZ

定理

（Chevalley-Warning定理）令 $p$ 为素数. 给定环 ${\mathbb{F}}_{p}\lbrack x_{1},\cdots,x_{n}\rbrack$ 中 $m$ 个多项式

$$P_{1} = P_{1}\left( x_{1},x_{2},\cdots,x_{n} \right),$$

$$\cdots$$

$$P_{m} = P_{m}(x_{1},x_{2},\cdots,x_{n}).$$

如果 $n > \sum_{i = 1}^{m}{\deg(P_{i})},$ 则$P_{1},...P_{m}$的公共零点数目$是p$的倍数.

注记

Artin于1934年提出猜想, Chevalley在1935年给出证明, 并由Waning在1935年推广.

习题

证明若在任意有限域$\mathbb{F}$上考虑该问题，结论换成公共零点数目是域的特征的倍数

ZZSLIDE122ZZ

定义

(零和问题) 给定正整数$n$，求最小的正整数$m$，使得任意$m$ 长的整数序列$a_{1,...,}a_{m}$，都存在$n$长的子序列$a_{i_{1}},...,a_{i_{n}}$，使得其和被$n$整除。

下界

$$m \geq 2n - 1$$

定理

(Erdos-Ginzburg-Ziv) $m = 2n - 1$

命题

给定素数 $p.$ 任意一条 ${\mathbb{F}}_{p}$ 中长 $2p - 1$ 的序列都包含一条$p$长子序列且其元素之和为 $0$.

ZZSLIDE123ZZ

引理

(Schwarz-Zippel) 给定域 $\mathbb{F}$ 以及一个次数不超过 $d$ 的非零多项式 $f(x_{1},x_{2},\cdots,x_{n}).$ 令 $S$ 为 $\mathbb{F}$ 的一个有限子集. 则$f$在$S^{n}中$最多有${d|S|}^{n - 1}$个根.

习题

证明若$f(x_{1},x_{2},\cdots,x_{n})$是二元域上次数不超过 $d$ 的非零多项式 ，则$f$至少有$2^{n - d}个非零点$。

ZZSLIDE124ZZ

引理

(Schwarz-Zippel) 给定域 $\mathbb{F}$ 以及一个度数为 $d$ 的多项式 $f(x_{1},x_{2},\cdots,x_{n}).$ 假设 $f$ 不是零多项式. 令 $S$ 为 $\mathbb{F}$ 的一个有限子集. 现在我们从 $S$ 中均匀独立随机选取 $n$ 个元素 $r_{1},r_{2},\cdots,r_{n}$, 那么 ${f(r}_{1},r_{2},\cdots,r_{n}) = 0$ 的概率 $\leq d/|S|.$
