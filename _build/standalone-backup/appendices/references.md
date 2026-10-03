# 延伸阅读（新增）

这些材料用于继续学习，原课件内容仍以所附原件为准。

1. Noga Alon, *Combinatorial Nullstellensatz*, Combinatorics, Probability and Computing 8 (1999), 7–29。[作者原文](https://web.math.princeton.edu/~nalon/PDFS/null2.pdf)。对照原讲义第 117–120 页阅读有限网格消失理想与系数判别。
2. [SageMath 有限域构造器官方文档](https://doc.sagemath.org/html/en/reference/finite_rings/sage/rings/finite_rings/finite_field_constructor.html)。比较不同不可约模多项式和域元素表示。
3. [SageMath 有限域基类官方文档](https://doc.sagemath.org/html/en/reference/finite_rings/sage/rings/finite_rings/finite_field_base.html)。继续学习基、对偶基与有限域 API。
4. [Jupyter Book 1.x 官方入门](https://jupyterbook.org/v1/start/overview.html) 与 [目录配置](https://jupyterbook.org/v1/structure/configure.html)。本交付固定 1.x 构建版本，避免不同大版本配置混用。

5. J. S. Milne, *Fields and Galois Theory*, v5.10 (2022)。[作者课程讲义](https://www.jmilne.org/math/CourseNotes/FT.pdf)。用于对照域扩张、有限域、正规基、迹和范数的条件与证明。

## SageMath 扩展实验

以下为新增代码，**需要 SageMath 内核**，不由附带的标准 Python Notebook 执行：

```python
F = GF(9, name='a', modulus=PolynomialRing(GF(3), 'x').gen()**2 + 1)
a = F.gen()
zeta = 1 + a
print(a**2, a.multiplicative_order())
print(zeta.multiplicative_order())
print([zeta**i for i in range(1, 9)])
```

它对应原页第 108–110 页：$a$ 的阶为 4，$\zeta$ 的阶为 8，二者都生成 $\mathbb F_9/\mathbb F_3$，但只有后者是本原元。变量名 `a` 本身不保证本原性。
