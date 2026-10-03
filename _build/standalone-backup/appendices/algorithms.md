# 原算法与代码说明

原讲义第 113–116 页主要给出算法表示和查表公式。下面逐页照录转写内容，新增实现见下一附录。

## 原讲义第 113 页（原文转写）

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

![原页第 113 页](../_static/slides/113.png)

## 原讲义第 114 页（原文转写）

例子

给定有限域 $\text{GF}(2^{w})$ 以及${\ {\mathbb{F}}}_{2}$ 上的 $w$ 次本原多项式.

于是

$$\text{GF}(2^{w}) = \{ a_{0} + a_{1}x + \cdots + a_{w - 1}x^{w - 1}:\ a_{i} \in {\mathbb{F}}_{2}\}$$

$$= \{(a_{w - 1}a_{w - 2}\cdots a_{1}a_{0}):\ a_{i} \in {\mathbb{F}}_{2}\}$$

$$= \{ a_{w - 1} \cdot 2^{w - 1} + \cdots + a_{1} \cdot 2 + a_{0}:\ a_{1} \in {\mathbb{F}}_{2}\}$$

$$= \lbrack 2^{w} - 1\rbrack = \{ 0,1,\cdots,2^{w} - 1\}$$

![原页第 114 页](../_static/slides/114.png)

## 原讲义第 115 页（原文转写）

$$\text{GF}(2^{4})$$

本原多项式$\ f(x) = x^{4} + x + 1$

![原页第 115 页](../_static/slides/115.png)

## 原讲义第 116 页（原文转写）

加法

$$11 + 7 = 1011 \oplus 0111 = 1100 = 12$$

需 $w$ 次XOR运算

首先我们需要定义如下对数表

乘法

$$3 \times 7 = gfilog\left\lbrack gflog\lbrack 3\rbrack + gflog\lbrack 7\rbrack \right\rbrack = gfilog\lbrack 4 + 10\rbrack = gfilog\lbrack 14\rbrack = 9$$

$$13 \div 10 = gfilog\left\lbrack gflog\lbrack 13\rbrack - gflog\lbrack 10\rbrack \right\rbrack = gfilog\lbrack 13 - 9\rbrack = gfilog\lbrack 4\rbrack = 3$$

需 3 次查表，和 1 次模运算

![原页第 116 页](../_static/slides/116.png)

## 实现说明（新增）

`gflog` 只对非零元素定义；`gfilog` 的指数取模 $2^w-1$。为避免查表中的零例外漏掉，代码先处理零与除零。

位编码乘法循环中，`b & 1` 检查当前项，`out ^= a` 累加无进位乘积，左移对应乘 $x$；若出现 $x^m$ 项，使用模多项式 XOR 约化。平方乘算法通过指数的二进制位计算幂，非零元素的逆为 $a^{2^m-2}$。

不可约验证采用试除至一半次数的教学方法，适用于小次数示例；这里不声称它适合大规模有限域计算。本原性通过乘法阶检验，避免把不可约多项式与本原多项式混同。

```{literalinclude} finitefield.py
:language: python
:linenos:
```

[下载完整 Python 实现](finitefield.py)。Notebook 中可逐个修改实验参数，其输出与本页原例相互核对。
