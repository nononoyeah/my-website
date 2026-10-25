# Proposal

## Why

站点目前只有首屏（Hero）、项目、联系我三个区块，缺少传递个人理念与个性的「关于我」。品牌站的说服力结构「作品 → 人 → 触达」中，项目区解决「作品」，联系我解决「触达」，但「人」的一环缺位；补充关于我区（照片 + 三段简介 + 品牌标签），同时把它接入导航，保证访客可直达。

## What Changes

- **新能力 `about-section`**：「关于我」section（锚点 `about`）——左侧个人照片（渐变占位图块，素材到位后仅换数据字段，真实照片自动启用 lazy loading）、右侧三段个人简介、下方品牌标签「nononoyeah」（装饰性）；窄屏两栏退化为单列堆叠；内容集中于 `src/content/about.ts` 常量（沿用【替换真实内容入口】约定），亮暗模式 `dark:` 适配
- **修改能力 `navigation`**：导航项从三个增至四个（首页、项目、关于我、联系我，顺序与分区一致）；组件 map 驱动零改动，仅内容常量增项
- **修改能力 `content-sections`**：「三分区结构与锚点 id」演进为四分区（home → projects → about → contact），并重命名该需求以匹配事实

## Capabilities

### New Capabilities

- `about-section`: 关于我区的两栏布局、个人照片占位策略、三段简介与品牌标签的渲染及内容可替换性

### Modified Capabilities

- `navigation`: **MODIFIED** 需求「固定顶部导航布局」（三个链接 → 四个链接，及对应场景）与「移动端压缩横排」（四个链接单行，及对应场景）
- `content-sections`: **RENAMED + MODIFIED**——「三分区结构与锚点 id」重命名为「四分区结构与锚点 id」，正文与「顺序与锚点齐全」场景更新为四个 section

## Impact on Existing Functionality

- Navbar 组件由 `navItems.map` 驱动，新增导航项不改动组件代码；平滑滚动/顶部偏移/毛玻璃行为不变
- 导航「联系我」「项目」锚点目标不变；`#about` 新增锚点与分区，链接语义不变
- 窄屏 360px 单行为四链接后的最大风险点，验收中重点核查（必要时压缩间距/名称限宽）
- 无移除行为、无 BREAKING 变更

## Out of Scope

- 联系我表单（严禁开发；联系区维持占位展示不变）
- 真实照片素材处理（渐变占位图块交付，素材到位仅替换数据字段）
- 个人简介真实文案撰写（三段占位文案由站主替换）
- 关于麦小节的二级导航/下拉、关于我详情页
- Hero 与既有三区布局调整（仅新增分区并在 Nav/App 注册）
