# 有限域及其应用

本项目是一部包含 19 章的独立教材讲义，提供数学正文、可展开证明与参考解答、浏览器交互实验和 Python Notebook。

## 阅读

已编译网页位于 `_build/html/index.html`。建议在本目录运行：

```bash
python -m http.server 8000 --directory _build/html
```

打开 http://localhost:8000 。浏览器实验无需安装 Python 或连接远程内核。章末笔记保存于当前浏览器，可以导出文本文件。

## 知识图谱与学习状态

目录中的“学习导航”提供 `knowledge.html`，覆盖 19 章、134 个核心概念和 216 条学习联系。可以搜索、按章节与类型筛选、展开两层联系、切换关系类型，并从节点跳转到正文或选读证明。五条学习路线连接不同章节；图中的关系是经编辑的学习联系，并非自动推断的证明依赖。

“我的学习状态”显示已开始学习、能够独立运用、正在理解与有困难的概念数量，以及各章进度、困难点、下一步建议和最近复习时间。先在概念详情中选择状态、困难类型并填写笔记，再点击“保存学习记录”。记录一次复习会同时保存当前填写内容。各章正文阅读栏下方显示本章统计，并提供图谱和学习状态入口。

学习记录保存在浏览器本地，以 `finitefields:learning:v1` 为键，不上传服务器。进度按核心概念的自评状态统计，不代表考试成绩或阅读时长。导出为 JSON 后可以备份或迁移；导入时逐概念合并，同一概念的较新记录优先，格式无效的文件不会修改现有记录。改变浏览器、网址、端口或清理浏览器数据可能使原记录无法访问，请先导出。章末文本笔记与该记录独立保存。

`_static/knowledge-data.js` 维护概念摘要、公式、条件、稳定正文锚点及五类关系；`knowledge.js` 负责浏览与记录，`knowledge.css` 负责显示。扩充图谱时应明确定理假设及边的含义，避免将一般学习关联标为逻辑推导。`tools/check_knowledge.cjs` 核对全部锚点与公式，并测试记录保存、导出、导入冲突、无效文件、键盘操作、离线交互和移动端。

## 构建

需要 Python 3.10 或更新版本：

```bash
python -m pip install -r requirements.txt
jupyter-book build . --all
```

`chapters/` 保存正文，`appendices/` 保存记号说明、Python 实现、Notebook 和参考文献，`_static/` 保存样式、交互脚本及本地 MathJax。`_config.yml` 和 `_toc.yml` 控制书名、构建与目录。修改交互脚本或样式后，使用 `--all` 确保资源同步更新。

## Python 实验

```bash
python -m pip install notebook
python -m notebook appendices/experiments.ipynb
```

使用 Python 3 内核并顺序执行。`finitefield.py` 与 Notebook 应保持在同一目录；SageMath 示例需要 SageMath 环境。构建默认使用已保存的 Notebook 输出，修改代码后需重新运行并保存。

## 验证与维护

浏览器实验采用有限域精确运算。数学验证和浏览器检查脚本位于 `tools/`，构建与测试记录位于 `_build/`。重构脚本仅用于追踪编辑过程，不能重复作用于已经完成的正文。

网页中的数值实验帮助理解定理，不能替代一般证明。导出的学习笔记是普通文本，请自行保存。
