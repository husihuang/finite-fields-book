# 有限域及其应用

**整理与编写：胡四煌**

一部面向课程教学与自主学习的中文交互式教材讲义。从群、环和多项式出发，介绍域扩张与有限域的基本理论，进一步讨论迹、范数、基、割圆多项式、有限域计算及多项式的组合应用。

**[在线阅读教材](https://husihuang.github.io/finite-fields-book/)** · **[期末复习纲要](https://husihuang.github.io/finite-fields-book/final-review.html)** · **[知识图谱与学习状态](https://husihuang.github.io/finite-fields-book/knowledge.html)** · **[提交勘误与建议](https://github.com/husihuang/finite-fields-book/issues)**

直接打开在线教材即可阅读和使用浏览器实验，无需安装 Python。支持电脑、平板和手机，以及浅色、夜间显示模式。

## 教材内容

全书共 20 章，按五个部分组织：

| 部分 | 章节 | 主要内容 |
|---|---|---|
| 代数基础 | 第 1–7 章 | 群与循环群、陪集、环与理想、多项式、不可约性、根与插值 |
| 域扩张与有限域 | 第 8–12 章 | 子域、极小多项式、扩张次数、分裂域、有限域的存在与子域、本原元、共轭 |
| 有限域的进一步结构 | 第 13–15 章 | 自同构、迹与范数、对偶基与正规基、判别式、割圆多项式 |
| 表示与计算 | 第 16 章 | 多项式表示、幂表示、矩阵表示、二进制编码及运算实现 |
| 多项式的组合应用 | 第 17–20 章 | 组合零点定理、加法组合与零和问题、Schwartz–Zippel 引理及其在算法与密码学中的应用 |

附录提供统一记号、常用结论、Python 实现、Jupyter Notebook 实验及参考文献。

课程结课实践提供四个可下载的学生版 Notebook，分别研究有限域构造、Frobenius 轨道与极小多项式、Lagrange 插值与秘密共享，以及 Schwartz–Zippel 引理与随机验证。项目说明、提交要求和评分标准见[课程实践项目](projects/index.md)。

## 可以怎样使用

- **学生自主学习**：从每章学习目标开始，阅读定义与定理，尝试独立证明，再展开证明和参考解答；结合实验与章末学习检查巩固理解。
- **教师课堂教学**：使用正方形旋转与反射、有限域子域包含图、迹与范数等实验演示抽象概念；按课程安排选择章节和选读证明。
- **跨章节复习**：在知识图谱中搜索概念、查看前置知识与后续应用，并直接跳转到相关正文。

建议具备集合与映射、整数整除、基础多项式运算及线性代数知识。群、环与域扩张的基础概念会在正文中介绍。标为“高阶选读”的证明适合掌握前置知识后进一步学习。

交互实验用于观察例子和检验计算，不能替代一般证明。阅读公式时请注意基域、定理假设，以及域元素与整数存储编码的区别。

## 交互学习功能

- 正方形对称群动画：旋转、反射、复合次序比较与复原。
- 课堂展示：单独放大定义、定理、例子与证明框，用上一框 / 下一框连续切换，调整字号、切换全屏，并选择是否显示附带注释。
- 逐章计算实验：陪集、循环群、多项式、有限域元素、共轭、迹与范数、基及组合应用。
- 有限域子域包含图：通过节点与连线观察子域之间的关系。
- 知识图谱：按章节或概念搜索，筛选学习关系，展开前置与后续联系，并沿学习路线浏览。
- 学习状态：自行记录掌握程度、困难点与复习时间，查看各章进度和下一步建议。
- 学习笔记：逐章记录问题与推理过程，并导出为文本。

**学习数据保存在当前浏览器。** 章末笔记与概念学习记录分别保存；学习状态支持 JSON 导出、导入，便于备份或迁移。更换设备、浏览器、网址或清除浏览器数据前，请先导出。进度依据读者自评，不代表测验成绩，也不会自动发送给教师。

## Python 与 Notebook 实验

浏览器实验可以直接使用。需要修改和运行 Python 实验的读者，可下载仓库中的 [实验 Notebook](appendices/experiments.ipynb)，与 [finitefield.py](appendices/finitefield.py) 放在同一目录，并使用 Python 3 内核从首个代码单元顺序运行。SageMath 示例需要相应的 SageMath 环境。

本地阅读、安装与构建步骤见 [开发与维护说明](DEVELOPMENT.md)。

## 参考资料与编写说明

本讲义由课程讲义整理而成，相关数学内容建立在已有教材、讲义和研究文献的基础上。整理工作包括教学内容的组织、证明与例子的讲解，以及网页交互与计算实验的设计。感谢相关作者对有限域理论与教学的贡献。

以下书目供对照学习与延伸阅读；具体例题、证明或图示的编写来源应在相应位置注明，延伸阅读书目不等同于逐项来源声明。

- **中文代数基础与有限域**：林东岱，《代数学基础与有限域》，第 2 版，高等教育出版社，2022。ISBN：978-7-04-057742-6。[出版社页面](https://xuanshu.hep.com.cn/front/h5Mobile/bookDetails?bookId=61df098c938b7cc2960ee14b)。
- **中文有限域理论**：冯荣权编著，《有限域基础》，高等教育出版社，2025。ISBN：978-7-04-064377-0。[出版社页面](https://xuanshu.hep.com.cn/front/h5Mobile/bookDetails?bookId=67ae28663e46f5f63ffe38e0)。
- **中文入门与应用**：冯克勤、廖群英，《有限域及其应用》，大连理工大学出版社，2011。ISBN：978-7-5611-5787-9。[出版社书目](https://www.dutp.cn/index/product/prolist.html?category_id=169&page=14)。
- **英文课程教材**：Rudolf Lidl and Harald Niederreiter, *Introduction to Finite Fields and their Applications*, 2nd ed., Cambridge University Press, 1994。[出版社页面](https://doi.org/10.1017/CBO9781139172769)。
- **英文系统参考书**：Rudolf Lidl and Harald Niederreiter, *Finite Fields*, 2nd ed., Cambridge University Press, 1996。[出版社页面](https://doi.org/10.1017/CBO9780511525926)。
- **进阶专题手册**：Gary L. Mullen and Daniel Panario (eds.), *Handbook of Finite Fields*, Chapman and Hall/CRC, 2013。[编者页面](https://people.math.carleton.ca/~daniel/hff/)。

详细阅读建议、章节对应、公开课程讲义与论文见 [参考文献与延伸阅读](appendices/references.md)（[在线阅读](https://husihuang.github.io/finite-fields-book/appendices/references.html)）。

## 勘误与建议

教材持续校订，欢迎老师和同学通过 [GitHub Issues](https://github.com/husihuang/finite-fields-book/issues) 提交问题。为便于定位，请提供：

- 正文问题：章节名称、定理或段落位置、页面链接，以及问题描述或建议修改。
- 计算问题：实验名称、输入参数、实际结果与预期结果。
- 显示或交互问题：设备、浏览器、深浅色模式、复现步骤；如方便，可附截图。

## 引用与授权

引用本教材时，建议注明作者、教材名称、在线地址与访问日期。例如：

> 胡四煌：《有限域及其应用》，交互式教材讲义，https://husihuang.github.io/finite-fields-book/，访问日期：YYYY-MM-DD。

如引用特定版本的内容，可同时注明仓库的提交编号或发行版本。

本仓库目前尚未设置许可证文件。关于教材正文或程序代码的转载、改编及再分发，请先通过仓库 Issues 与作者确认。
