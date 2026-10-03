# 参考文献与延伸阅读

以下文献用于深入学习有限域理论、多项式方法与计算工具。

1. Noga Alon, *Combinatorial Nullstellensatz*, Combinatorics, Probability and Computing 8 (1999), 7–29。[作者论文](https://web.math.princeton.edu/~nalon/PDFS/null2.pdf)。可结合组合零点定理与加法组合章节，阅读有限网格消失理想和系数判别。
2. [SageMath 有限域构造器官方文档](https://doc.sagemath.org/html/en/reference/finite_rings/sage/rings/finite_rings/finite_field_constructor.html)。比较不同不可约模多项式和域元素表示。
3. [SageMath 有限域基类官方文档](https://doc.sagemath.org/html/en/reference/finite_rings/sage/rings/finite_rings/finite_field_base.html)。继续学习基、对偶基与有限域 API。

4. J. S. Milne, *Fields and Galois Theory*, v5.10 (2022)。[作者课程讲义](https://www.jmilne.org/math/CourseNotes/FT.pdf)。用于对照域扩张、有限域、正规基、迹和范数的条件与证明。

## SageMath 扩展实验

以下示例**需要 SageMath 内核**，不由附带的标准 Python Notebook 执行：

```python
F = GF(9, name='a', modulus=PolynomialRing(GF(3), 'x').gen()**2 + 1)
a = F.gen()
zeta = 1 + a
print(a**2, a.multiplicative_order())
print(zeta.multiplicative_order())
print([zeta**i for i in range(1, 9)])
```

在此模型中，$a$ 的阶为 4，$\zeta$ 的阶为 8，二者都生成 $\mathbb F_9/\mathbb F_3$，但只有后者是本原元。变量名 `a` 本身不保证本原性。
