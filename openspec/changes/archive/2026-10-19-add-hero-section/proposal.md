# Proposal

## Why

个人品牌站目前仍是 Vite 脚手架模板页（计数器 + 宣传文案），没有任何展示个人品牌的内容。Hero Section 是访客对站点技术人员的第一印象，需要先完成它作为站点内容的起点。

## What Changes

- 新增全屏高度（100vh）的 Hero Section，居中展示：姓名、职业、一句话介绍
- Hero 背景为「CSS 渐变底 + Canvas 静态粒子」双层叠加：Canvas 仅渲染一次固定分布的星点粒子，无逐帧动画（遵守「不做动画效果」红线）
- 新增明亮/暗黑模式切换能力：右下角悬浮切换按钮（独立于导航栏，全站可复用），切换结果持久化到 localStorage，并跟随系统 `prefers-color-scheme` 作为默认值
- 支持 Tailwind `dark:` 前缀暗色样式
- 姓名、职业、介绍文案以源码常量（content 配置）提供，占位内容可后续替换

## Capabilities

### New Capabilities

- `hero-section`: 首屏 Hero 区域的展示行为——全屏布局、视觉层叠（渐变背景 + 静态粒子 Canvas）、居中个人信息、亮/暗两种主题下的呈现
- `theme-mode`: 站点主题模式切换行为——手动切换、切换结果持久化、跟随系统偏好作为初始值、DOM 根元素 `class="dark"` 驱动 Tailwind 暗色变体

### Modified Capabilities

（无——站点尚无任何既有能力）

## Impact

- **代码**：
  - `src/App.tsx`：替换脚手架模板内容，改为渲染 Hero Section（模板的 counter / next-steps 区块移除）
  - 新增 `src/components/HeroSection.tsx`、`src/components/ThemeToggle.tsx`、静态粒子 Canvas 组件
  - 新增个人内容配置常量（姓名、职业、一句话介绍）
  - `src/index.css`：注册 Tailwind v4 `@custom-variant dark`（基于 class 的暗色变体）
- **无后端 / 无 API**：纯前端静态实现
- **性能约束**：静态粒子 Canvas 一次性渲染、无 requestAnimationFrame 循环；首屏加载 < 2s
- **部署**：GitHub Pages（base path `/my-website/`，通过 Vite `base` 配置），无路由变更
- **可访问性**：ThemeToggle 为带 `aria-label` 的真实 button

## Out of Scope

- 任何动画效果（粒子漂移、入场动画、过渡动画、滚动动画等均不做）
- 导航栏及站点其他 Section（关于、项目、联系方式等）
- 后端 API / 任何服务端逻辑
- 运行时动态数据（内容不支持 CMS 或远端配置，仅源码常量）
