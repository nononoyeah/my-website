# theme-mode Specification

## Purpose

定义站点主题模式（明亮/暗黑）的切换行为：右下角悬浮切换按钮、切换结果持久化、跟随系统偏好作为初始值，并以根元素 class 驱动 Tailwind 暗色变体。该能力为全站复用的基础设施，不依赖导航栏。

## Requirements

### Requirement: 悬浮切换按钮

站点 SHALL 在页面右下角固定展示一个主题切换按钮，该按钮独立于导航栏存在。点击按钮 SHALL 立即在明亮/暗黑两种模式间切换，切换效果即时生效且无过渡动画。

#### Scenario: 点击切换

- **WHEN** 页面处于明亮模式，用户点击主题切换按钮
- **THEN** 页面立即切换为暗黑模式，无页面刷新、无过渡动画

#### Scenario: 按钮状态可辨识

- **WHEN** 页面处于任一主题模式
- **THEN** 切换按钮的图标/样式明确反映当前可选动作（在暗黑模式下提供切换到明亮的入口，反之亦然）

### Requirement: 根元素 class 驱动暗色变体

主题模式 SHALL 通过 `<html>` 根元素的 `class="dark"` 表达，驱动 Tailwind 的基于 class 的暗色变体（`dark:` 前缀），切换后全站配色立即随模式统一变化。

#### Scenario: 根元素 class 变化

- **WHEN** 用户切换主题模式
- **THEN** 根元素 `dark` class 与当前模式一致，全站使用 `dark:` 前缀的样式同步生效

### Requirement: 切换结果持久化

用户手动选择的模式 SHALL 在切换时写入 localStorage（键名以主题为唯一命名空间），并在后续访问时优先应用。

#### Scenario: 刷新后保持选择

- **WHEN** 用户手动切换为暗黑模式后刷新页面
- **THEN** 页面仍以暗黑模式呈现

#### Scenario: localStorage 不可用时降级

- **WHEN** localStorage 访问被禁用或抛出异常（如隐私模式）
- **THEN** 切换功能仍正常工作（本次会话内生效），页面不报错，仅不做持久化

### Requirement: 跟随系统偏好作为初始值

站点 SHALL 以系统 `prefers-color-scheme` 作为无已保存偏好时（首次访问）的初始主题：系统偏好暗色则初始为暗黑模式，否则为明亮模式。手动切换后 SHALL 以手动选择为准，不再跟随系统。

#### Scenario: 首次访问跟随系统

- **WHEN** 用户首次访问（无 localStorage 记录）且系统偏好为暗色
- **THEN** 页面初始以暗黑模式呈现

#### Scenario: 手动选择优先于系统

- **WHEN** 用户手动选择过模式后，系统的 prefers-color-scheme 发生变化（如随日程自动切换）
- **THEN** 页面主题保持用户手动选择，不随系统变化

#### Scenario: 系统偏好不可用

- **WHEN** 环境不支持 prefers-color-scheme 查询，且无 localStorage 记录
- **THEN** 页面初始为明亮模式
