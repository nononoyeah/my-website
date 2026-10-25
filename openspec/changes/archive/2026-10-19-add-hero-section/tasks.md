# Tasks

> 执行规则：每个 Phase 完成后停下来向用户汇报并等待确认，确认后才进入下一 Phase。

## Phase 1: 主题模式基础设施（theme-mode）

- [x] 1.1 在 `src/index.css` 注册 Tailwind v4 基于 class 的暗色变体（`@import "tailwindcss"` + `@custom-variant dark`），并用一个临时 `dark:` 元素在 dev 首页验证：根元素带/不带 `dark` class 时样式切换生效
- [x] 1.2 在 `index.html` `<head>` 添加内联预设主题脚本：try/catch 读取 localStorage 主题键，无记录时读取 `prefers-color-scheme`，据结果为 `<html>` 设置 `dark` class；验证：刷新页面无明暗闪烁（FOUC）
- [x] 1.3 新增 `src/theme`（ThemeProvider + useTheme hook）：Context 管理当前模式，切换时同步根元素 `dark` class 并持久化到 localStorage（写读均包 try/catch，禁用环境静默降级）；初始值优先级 = localStorage > 系统偏好 > 明亮；验证：控制台抛错路径走查 + 手动切换即时变色
- [x] 1.4 新增 `src/components/ThemeToggle.tsx`：右下角 `fixed` 悬浮按钮，`aria-label` 标注动作，图标按当前模式渲染，无过渡动画；验证：点击即时切换、刷新后保持、按钮图标可辨识
- [x] 1.5 Phase 1 集成验证：SPA 已挂 ThemeProvider；依次验证「无记录首次访问跟随系统」「手动选择后系统偏好变化不再跟随」「localStorage 禁用时不报错仅不持久化」，记录验证结果

## Phase 2: 静态粒子 Canvas 背景（hero-section 背景层）

- [x] 2.1 新增 `src/components/StaticParticles.tsx`：Canvas 2D 一次性绘制静态星点（数量与容器面积成正比、上限封顶 300、`devicePixelRatio` 适配、粒子颜色取自当前主题色）；验证：dev 页面渲染出固定分布星点、代码中无 rAF/setInterval 循环
- [x] 2.2 为 StaticParticles 接入两类一次性重绘时机：`resize` 防抖（约 150–200ms）后按新尺寸重绘一次；主题切换时按新模式取色重绘一次；验证：拉动窗口与点击 ThemeToggle 后粒子重新铺满/换色
- [x] 2.3 实现降级路径：`getContext("2d")` 返回空或绘制抛错时静默降级为不渲染粒子（组件不重试、不报错）；验证：代码走查 catch 分支 + 注释标明验证方式

## Phase 3: Hero Section 与内容集成（hero-section）

- [x] 3.1 新增 `src/content/profile.ts`：导出 `name` / `title` / `tagline` 三字段常量并附 Type 定型，填入占位文案，文件头注释标明「替换真实内容入口」；验证：`tsc` 通过、字段类型齐全
- [x] 3.2 新增 `src/components/HeroSection.tsx`：`min-h-[100svh]`（`100vh` 回退）、内容垂直水平居中、线性 CSS 渐变底（亮/暗各配色）、叠加 StaticParticles、消费 profile 常量；验证：桌面窗口下三行文案居中且背景完整
- [x] 3.3 模板清理：改写 `src/App.tsx` 为 ThemeProvider + HeroSection + ThemeToggle，删除模板资源（`App.css`、脚手架图片与 counter/next-steps 区块）；验证：`npm run lint` 与 `npm run build` 通过
- [x] 3.4 变更级集成验收：首屏加载 < 2s、亮/暗模式下渐变与粒子配色正确、极小视口内容不裁剪可滚动、Canvas 不可用假设下页面无报错、无任何动画效果（对照红线逐条检查），记录验收结果

## Workflow follow-up

- 每个 Phase 结束：向用户汇报本 Phase 变更并等待确认，未确认不得进入下一 Phase
- 全部验收通过后，按项目约定执行 archive 流程归档本变更
