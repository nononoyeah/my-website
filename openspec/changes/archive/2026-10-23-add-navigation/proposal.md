# Proposal

## Why

站点目前只有首屏 Hero，没有导航栏：访客无法感知 Hero 之外还有内容，也无法快速跳转；固定顶部导航是个人品牌站的标准信息架构入口。同时「项目」「联系我」两个区域尚不存在，需要先建立占位结构使导航真实可用。

## What Changes

- 新增固定顶部导航栏（sticky/fixed，始终可见）：
  - 左侧显示站点所有者名称，来源于现有内容配置常量（`profile.name`，无 logo 图片素材，名字即品牌标识——已确认的假设）
  - 右侧三个导航链接：首页、项目、联系我
- 点击导航链接平滑滚动到对应 section；「首页」锚向现有 Hero，「项目」「联系我」锚向本次新增的占位 Section
- 导航栏滚动离开页面顶部后应用毛玻璃效果（半透明背景 + backdrop-blur 回填模糊），处于顶部时保持透明无模糊（已确认：模糊对象是导航栏自身，非页面内容）
- 新增「项目」「联系我」两个占位 Section（标题 + 占位说明文案），真实内容填充留给后续变更
- 移动端窄屏：右侧三个链接压缩间距、缩小字号横向排一行，不引入任何展开/下拉交互（已确认）
- 新组件在亮/暗两种模式下正确呈现（复用 `theme-mode` 能力已建立的 `dark:` 变体约定）
- 所有固定定位元素不遮挡内容：锚点跳转配合导航栏高度的 scroll-margin 偏移

## Capabilities

### New Capabilities

- `navigation`: 固定顶部导航栏的行为——布局（左名右链）、锚点平滑滚动、滚动态毛玻璃背景切换、移动端压缩横排、亮暗自适应
- `content-sections`: 站点内容分区的结构行为——首页（Hero）、项目、联系我三个 section 的存在性、锚点 id 与占位展示约定（真实内容由后续变更演进）

### Modified Capabilities

（无——`hero-section` 与 `theme-mode` 的既有需求均不变：Hero 不改展示行为，`ThemeToggle` 保持右下角独立悬浮）

## Impact

- **对现有功能的影响**：
  - `src/App.tsx`：`ThemeProvider` 内新增挂载 `Navbar` 与两个占位 Section（`HeroSection`、`ThemeToggle` 不改）
  - `hero-section`：仅给根元素添加锚点 `id` 属性（不改变任何已承诺的展示行为，主 spec 无需变更）
  - `theme-mode`：无变化；`ThemeToggle` 的 z 层级与导航栏互不重叠（右上与右下），保持「独立于导航栏存在」的既有约定
  - 平滑滚动是本变更显式引入的新行为；上一变更 out-of-scope 中的「不做动画」仅限定该变更自身范围，且 `theme-mode` spec 的「无过渡动画」仅约束主题切换（不涉及滚动），无规范冲突
- **代码**：新增 `src/components/Navbar.tsx` 与占位 Section 组件；导航项配置来自内容常量的扩展
- **性能**：平滑滚动使用 CSS `scroll-behavior` 原生实现，无 JS 逐帧；毛玻璃 backdrop-filter 为合成层渲染，遵守首屏 < 2s 约束；无新增图片资源
- **部署**：锚点为纯 hash 跳转（GitHub Pages base path `/my-website/` 已配置），无路由变更

## Out of Scope

- 多级/任何形式的下拉菜单（含移动端汉堡/全屏展开菜单——移动端采用压缩横排）
- 用户登录与注册
- 站内搜索
- 「项目」「联系我」的真实内容填充（本变更只交付占位结构与文案）
- 将 `ThemeToggle` 移入导航栏或改变其位置（`theme-mode` 既有约定不变）
- 「首页」之外新增导航项或重构导航栏为多页面路由
