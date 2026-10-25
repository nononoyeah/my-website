# seo-basics Specification

## Purpose

定义站点 SEO 基础能力：页面标题/描述/规范链接的静态 head 治理、robots.txt 抓取许可与语义化结构（main 标注、单 h1、alt 约定）的交付要求。社交标签与结构化数据由后续变更按需演进（本能力明确不含）。

## Requirements

### Requirement: 页面标题与描述

HTML head SHALL 提供与站点内容一致的 `<title>`（占位形式「站主姓名 ｜ 个人品牌站」，来源提示见 index.html 替换入口注释）与 `<meta name="description">`（一句站主定位占位文案）。两者 SHALL 可由站点所有者直接在 index.html 中替换且不影响运行行为；`<html>` 根元素 SHALL 声明与站点内容语言一致（`lang="zh-CN"`）；`<title>` SHALL 不再保留工程默认值「my-website」。

#### Scenario: 标题与描述完整呈现

- **WHEN** 爬虫或浏览器请求站点根路径
- **THEN** 返回的 HTML head 含非默认值的 `<title>` 与非空的 `<meta name="description">`，且未出现占位工程名「my-website」

#### Scenario: 站主替换文案

- **WHEN** 站主在 index.html 中替换标题/描述文案并重新构建
- **THEN** 页面 head 呈现新文案，脚本与主题初始化行为不变

#### Scenario: 语言声明一致性

- **WHEN** 检查 HTML 根元素
- **THEN** `lang` 属性为 `"zh-CN"`，与页面内容语言一致（本变更交付时已满足，作为防回退约束固化）

### Requirement: 规范链接与抓取许可

HTML head SHALL 包含 `<link rel="canonical">`：构建产物中 SHALL 静态存在该标签（无 JS 兜底占位 URL，与 GitHub Pages base 一致），其有效值 SHALL 由内容常量 `siteUrl`（`src/content/site.ts`，站主替换入口）在应用启动时写入/校正为生产环境绝对 URL。站点 SHALL 附带 `robots.txt` 于部署根路径，内容为显式允许所有爬虫抓取全部路径（`User-agent: *` 下 `Allow: /`）。

#### Scenario: canonical 指向生产地址

- **WHEN** 支持脚本渲染的爬虫解析站点（或访客浏览）
- **THEN** canonical href 为生产环境的绝对 URL（含 `/my-website/` 路径，由常量写入），不指向开发端口或相对路径

#### Scenario: 常量替换 canonical 即生效

- **WHEN** 站点所有者替换 `site.ts` 中的 `siteUrl` 常量
- **THEN** canonical href 随之更新，无需修改 index.html 或组件逻辑

#### Scenario: robots.txt 允许抓取

- **WHEN** 爬虫请求部署根路径下 `robots.txt`
- **THEN** 文件存在且显式允许所有 User-agent 抓取全部路径（无 Disallow 拦截）

#### Scenario: 构建产物自包含

- **WHEN** 本地执行生产构建
- **THEN** `dist/robots.txt` 存在于部署根路径层级，`dist/index.html` 含静态 canonical 标签占位

### Requirement: 语义化结构

页面内容分区 SHALL 包裹于唯一 `<main>` landmark 标注（固定导航栏的 `<header>` 与悬浮组件位于 `main` 之外）；页面 SHALL 有且仅有一个 `h1`（Hero 标题），其余分区标题 SHALL 使用 `h2` 及其下层级；所有现存及未来的 `<img>` SHALL 携带非空 `alt` 替代文本。结构修复 SHALL 在构建产物可断言、防止后续变更回退。

#### Scenario: main 标注包裹分区

- **WHEN** 检查构建产物的 DOM 结构
- **THEN** 固定导航栏在 `<main>` 之外，各内容分区位于唯一 `<main>` 标注内

#### Scenario: 标题层级单 h1

- **WHEN** 检查页面标题层级
- **THEN** 有且仅有一个 `h1`（Hero 姓名），项目/关于我/联系我分区标题为 `h2`，无跳级或多个 `h1`

#### Scenario: 图片替代文本无缺省

- **WHEN** 页面渲染任一 `<img>`（本期真实照片缺省故为空集；素材替换后生效）
- **THEN** 每个 `<img>` 均携带非空、可读的 `alt`（约定由组件承接，防回退纳入验收）
