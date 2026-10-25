# Proposal

## Why

站点已完成导航与三分区结构，但「项目」区仍是占位展示。个人品牌站的核心说服力来自真实作品，需要把项目区从占位升级为卡片式项目展示区，同时补上 Hero 到项目区的转化入口（CTA 按钮），形成「首屏 → 项目」的完整访客路径。

## What Changes

- **新能力 `projects-section`**：项目区改为卡片式布局——每张卡片含项目截图（渐变占位图块，素材到位后仅换数据）、名称、简介、GitHub 链接（新窗口打开）；最少展示 4 个项目；鼠标悬浮出现 CSS 微特效（缩放/投影/抬升类）；项目数据集中在 `src/content/projects.ts` 常量（沿用「替换真实内容入口」约定），支持亮暗模式与图片 lazy loading
- **修改能力 `hero-section`**：Hero 新增 CTA 按钮「查看我的项目」，锚向 `#projects`，复用已归档的原生平滑滚动与顶部偏移行为
- **修改能力 `content-sections`**：既有需求「占位 Section 展示」收窄为仅约束联系我 section（项目 section 由 `projects-section` 能力接管），消除「项目区既要求占位又要求卡片」的规范冲突

## Capabilities

### New Capabilities

- `projects-section`: 项目卡片的网格布局、卡片内容构成（截图/名称/简介/GitHub 链接）、最小数量、悬浮微特效与内容可替换性

### Modified Capabilities

- `hero-section`: **ADDED** 需求「行动号召按钮」——Hero 新增锚向 `#projects` 的 CTA 按钮（不触碰既有三段文字与背景需求）；文字表述「查看我的项目」
- `content-sections`: **MODIFIED** 需求「占位 Section 展示」——适用范围收窄为联系我 section；既有需求「三分区结构与锚点 id」保持不变

## Impact on Existing Functionality

- `navigation` 主 spec 无需变更：`#projects` 锚点目标继续存在，点击导航「项目」的平滑滚动/偏移/毛玻璃行为不变，仅滚动目的地内容升级
- `content-sections` 依序呈现三 section、总高大于首屏的要求不受影响（项目卡片网格仍保证页面高度）
- `theme-mode` 主题切换不影响：新 UI 全部通过 `dark:` 变体适配
- 无移除行为、无 BREAKING 变更

## Out of Scope

- 项目详情页（严禁开发）
- 项目搜索 (严禁开发)
- 真实截图素材处理（以渐变占位图块交付，素材到位后仅替换数据）
- CMS / 后台数据管理（项目数据仍为前端常量）
- Hero 既有三段文字与粒子背景的布局调整（本次仅附加 CTA 按钮）
