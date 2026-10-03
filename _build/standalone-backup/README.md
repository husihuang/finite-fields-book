# 有限域交互式 JupyterBook

解压后，已编译书籍位于 `_build/html/index.html`。建议通过本地 HTTP 服务阅读，以获得稳定的浏览器笔记保存与资源加载。

## 打开已编译版本

在本目录运行：

```bash
python -m http.server 8000 --directory _build/html
```

然后打开 http://localhost:8000 。无需先安装 Jupyter Book。

## 修改与重新编译

需要 Python 3.10 或更新版本：

```bash
python -m pip install -r requirements.txt
jupyter-book build .
```

源目录中 `chapters/` 为正文，`appendices/` 为附录和 Notebook，`_static/` 为样式、交互代码、原页图和本地 MathJax。`original/lecture.pptx` 是字节未变的原始讲义。`_config.yml` 与 `_toc.yml` 控制构建及目录。

## 运行实验

```bash
python -m pip install notebook
python -m notebook appendices/experiments.ipynb
```

使用 Python 3 内核，从首个单元顺序执行。模块 `finitefield.py` 与 Notebook 保持在同一目录。SageMath 示例单独列在延伸阅读页，需要 SageMath 环境。

逐行导航、自测和浏览器计算器不依赖远程内核；Notebook 中的自由代码修改与运行需要本地 Jupyter。不要把保存到浏览器的页内笔记视为永久备份。

构建默认使用已保存的 Notebook 输出。新增或修改代码后，请在本地 Jupyter 中重新运行并保存 Notebook，再编译书籍。交付验证采用标准 Python 顺序执行全部代码单元，未依赖 Jupyter 内核。

## 教材结构与交互实验

全部 19 章按概念组织。章首给出学习目标，各节附 PPT 原页入口；每章末集中保留原页图片与逐页笔记。正文订正与新增内容、逐章审阅记录见 `TEXTBOOK_REVIEW.txt` 和 `CHAPTER_REVIEW.json`。

各章的实验分别对应陪集、循环群、剩余类环、多项式 Euclid 算法、不可约性、插值、极小多项式、幂基、子域、本原元、共轭、迹范数、对偶基、割圆因子、位编码、网格取值、和集及随机检验。第 16 章另保留通用四则计算；第一章提供正方形对称群动画。均在浏览器本地运行。

本轮备份保存在 `_build/textbook-backup/chapters/`。验证脚本在 `tools/`，验证记录在 `_build/textbook-browser-validation.json` 与 `_build/textbook-math-validation.json`。重新组织章节的脚本供追踪本轮修改，勿对已改完的正文重复执行。
