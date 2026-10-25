## MODIFIED Requirements

### Requirement: 占位 Section 展示

联系我 section SHALL 展示占位内容：section 标题与一句占位说明文案，来源于站点内容配置常量；占位说明 SHALL 明示「内容建设中」。占位文案 SHALL 可由站点所有者替换且不影响结构行为。项目 section 不受本需求约束（其内容行为由 `projects-section` 能力定义），其后展示形式为项目卡片而非占位文案。

#### Scenario: 占位内容渲染

- **WHEN** 使用默认内容配置构建站点
- **THEN** 联系我 section 展示标题、一句占位说明与「内容建设中」提示，无空文本或渲染错误

#### Scenario: 替换真实内容

- **WHEN** 占位文案在内容配置中被替换为真实内容
- **THEN** 联系我 section 直接展示新文案，无需修改组件逻辑

#### Scenario: 占位 section 滚动可达

- **WHEN** 用户通过导航或直接滚动到达页面底部
- **THEN** 联系我 section 内容完整可见，页面总高度大于首屏（保证可产生离顶滚动状态）
