# Design

## Context

站点目前是 Vite 脚手架模板页（`src/App.tsx` 中的计数器与宣传区块），无任何业务组件。技术栈为 React 19 + Vite + TypeScript + Tailwind CSS v4，部署到 GitHub Pages（base path `/my-website/`）。本变更为站点建立第一块内容（Hero）与第一块全站基础设施（主题切换），动机见 proposal.md 的 Why，行为契约见两个 delta spec。

## Goals / Non-Goals

**Goals:**

- 建立基于 Tailwind `dark:` 变体的暗色模式基础设施，后续所有 Section 直接复用
- 静态粒子 Canvas 不引入任何动画循环，守住「不做动画」红线
- 首屏无主题闪烁（FOUC）——进入页面时应直接呈现最终主题
- 个人内容与组件解耦，替换文案不改组件

**Non-Goals:**

- 复用第三方粒子库（tsparticles、particles.js 等）
- 主题过渡动画、粒子缓动
- 导航栏、其余 Section、后端（见 proposal Out of Scope）

## Decisions

**D1. 主题实现：根元素 `class="dark"` + Tailwind v4 `@custom-variant`**

`src/index.css` 中显式注册基于 class 的暗色变体：

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

主题状态由根元素 `class` 表达而非 `class="dark"` 之外的方案，理由：
- 与 Tailwind v4 官方推荐方式一致，`dark:` 前缀零成本扩展到全站
- 不依赖 JS 状态渲染配色，CSS 一等公民；即使 React 尚未挂载也能正确着色（配合 D2）

*Alternative considered*：`media` 模式的 `prefers-color-scheme`（Tailwind 默认）——无法支持手动切换，排除。CSS `light-dark()` 函数——浏览器兼容性要求超出本站目标，排除。

**D2. 首屏防 FOUC：`index.html` 内联脚本预设主题**

在 `<head>` 中加一段极小的内联脚本，React 挂载前同步读取 localStorage / `prefers-color-scheme` 并给 `<html>` 设置 `dark` class。读取操作全部包 try/catch，异常时静默跳过。

*Alternative considered*：所有样式由 React 状态驱动、挂载后再应用——首帧会用默认主题着色，暗色用户会看到一次明亮的闪烁（FOUC），违反「首屏即最终主题」目标；内联脚本是该问题的标准解法，体积 < 300 bytes。

**D3. 主题状态共享：`ThemeProvider` Context + `useTheme` hook**

`ThemeToggle` 与未来其他需要感知主题的组件通过 React Context 读取/切换模式。持久化逻辑（写 localStorage）集中在 `ThemeProvider` 内。按钮图标按当前模式渲染，无 CSS 过渡。

*Alternative considered*：ThemeToggle 自管状态不共享——theme-mode 能力定义为全站基础设施，Hero 之外的组件（后续）需要读取模式决定粒子颜色等，Context 是最小且可扩展的方案。

**D4. 静态粒子：原生 Canvas 2D 自绘，事件驱动重绘**

不引库。首挂载时按视口尺寸一次性绘制粒子（数量与面积成正比，约每 9000px² 一颗），颜色取自当前主题的星点色（亮色模式下深色小点、暗色模式下浅色小点）。仅三种时机触发「绘制一次」：

```
mount ──────┐
resize(防抖) ─┼──> drawParticles(canvas, {width, height, theme})   [无 rAF、无 setInterval]
theme 切换 ──┘
```

- 每次绘制都是完整重画，不做增量更新
- `devicePixelRatio` 按 retina 屏适配以保证清晰度
- 切换主题触发的一次性重绘是渲染行为而非动画，与红线不冲突
- Canvas 2D context 获取失败时静默降级（组件返回 null 或不重试）

*Alternative considered*：使用角度/半径固定的无随机 seed 分布（伪随机确定性）——用户体验无差异，仅增加复杂度，不必要；`Math.random()` 一次即可。

**D5. 个人内容配置：`src/content/profile.ts` 常量**

姓名、职业、一句话介绍导出为常量对象，`HeroSection` 只消费不内嵌文案。TypeScript 类型约束字段齐全（`name`、`title`、`tagline`）。占位文案初始为通用占位值。

**D6. App 结构清理**

`src/App.tsx` 改为渲染 `<HeroSection />` + `<ThemeToggle />`；模板的 `App.css` 样式、hero/react/vite 图片资源删除（本次渲染不使用图片，lazy loading 约束自然满足）。移动端视口高度通过自定义工具类 `.min-h-hero`（定义于 `src/index.css`）实现：默认 `100vh`，`@supports (min-height: 100svh)` 时提升为 `100svh`。不采用两个 Tailwind 任意值类（`min-h-[100vh]` + `min-h-[100svh]`）叠加，因其生效顺序取决于样式表输出顺序而非 class 顺序，回退语义不可靠；显式 `@supports` 保证回退确定性，避免移动浏览器地址栏导致的首屏不准。实施补充记录：`index.html` 的 `lang` 同步改为 `zh-CN`。

## Risks / Trade-offs

- **[内联脚本与 React 挂载点先后执行顺序]** → 内联脚本只在 `<head>` 同步执行一次并在必要时改根 class，与 React 生命周期完全解耦；ThemeProvider 初始值重复同样逻辑，两者结论一致才不会互相覆盖（ThemeProvider 读 localStorage 应后于内联脚本，结论相同，无竞争）
- **[粒子绘制在低端/窄屏设备的成本]** → 数量与面积成正比且上限封顶（如 300 颗），单次绘制 O(n)，可忽略
- **[resize 防抖期间画布短暂不贴合]** → 可接受：粒子是背景装饰，防抖 150–200ms 无感知问题
- **[localStorage 禁用环境]** → 全部访问包 try/catch（D2、D3），切 JS 内存态继续工作，仅不持久化（spec 已定降级行为）
- **[占位文案上线后被误认为真实内容]** → design/tasks 中标注占位语义，内容常量文件内注释说明替换入口

## Migration Plan

1. 新增 ThemeProvider / ThemeToggle / index.css custom variant（独立可验证：手动切换即时变色）
2. 新增静态粒子 Canvas 组件（独立可验证：resize/切模式各重绘一次、无动画）
3. 新增 profile 常量与 HeroSection，改写 App.tsx，删除模板资源
4. 部署侧实施补充：`vite.config.ts` 已设置 `base: '/my-website/'`（原 config.yaml 声称 base path 已定，实际构建配置未设，Phase 3 一并补上，产物资源路径已验证）；回滚即 git revert，无数据/接口迁移
