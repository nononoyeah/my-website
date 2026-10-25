# Spec Delta

## Purpose

定义站点内容分区的结构行为：首页（Hero）、项目、联系我三个 section 的存在性、垂直排序与锚点 id 约定，以及项目/联系我的占位展示。真实内容填充由后续变更在本能力上演进。

## ADDED Requirements

### Requirement: 三分区结构与锚点 id

站点 SHALL 依序垂直呈现三个内容 section：首页（现有 Hero，锚点 `home`）、项目（锚点 `projects`）、联系我（锚点 `contact`）。各 section 的锚点 id SHALL 与导航项一一对应且完整可达，作为导航平滑滚动的目标。

#### Scenario: 顺序与锚点齐全

- **WHEN** 用户打开站点并向下滚动
- **THEN** 页面依序出现首页、项目、联系我三个 section，各 section 可通过对应锚点 id 定位（含直接修改 URL hash 的方式）

#### Scenario: 锚点配置与 section 一致

- **WHEN** 导航配置中的任一锚点 id 在页面中不存在对应 section
- **THEN** 点击该导航项不报错、不发生跳转（防御行为），且正常配置下不出现此情形

### Requirement: 占位 Section 展示

项目与联系我 section 在本变更交付时 SHALL 展示占位内容：section 标题与一句占位说明文案，来源于站点内容配置常量；占位说明 SHALL 明示「内容建设中」。占位文案 SHALL 可由站点所有者替换且不影响结构行为。占位 section 的背景 SHALL 与 Hero 的粒子背景无关（粒子仅属首屏）。

#### Scenario: 占位内容渲染

- **WHEN** 使用默认内容配置构建站点
- **THEN** 项目与联系我 section 各自展示标题、一句占位说明与「内容建设中」提示，无空文本或渲染错误

#### Scenario: 替换真实内容

- **WHEN** 占位文案在内容配置中被替换为真实内容
- **THEN** 对应 section 直接展示新文案，无需修改组件逻辑

#### Scenario: 占位 section 滚动可达

- **WHEN** 用户通过导航或直接滚动到达页面底部
- **THEN** 联系我 section 内容完整可见，页面总高度大于首屏（保证可产生离顶滚动状态）
