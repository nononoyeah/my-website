## RENAMED Requirements

- FROM: `### Requirement: 三分区结构与锚点 id`
- TO: `### Requirement: 四分区结构与锚点 id`

## MODIFIED Requirements

### Requirement: 四分区结构与锚点 id

站点 SHALL 依序垂直呈现四个内容 section：首页（现有 Hero，锚点 `home`）、项目（锚点 `projects`）、关于我（锚点 `about`）、联系我（锚点 `contact`）。各 section 的锚点 id SHALL 与导航项一一对应且完整可达，作为导航平滑滚动的目标。

#### Scenario: 顺序与锚点齐全

- **WHEN** 用户打开站点并向下滚动
- **THEN** 页面依序出现首页、项目、关于我、联系我四个 section，各 section 可通过对应锚点 id 定位（含直接修改 URL hash 的方式）

#### Scenario: 锚点配置与 section 一致

- **WHEN** 导航配置中的任一锚点 id 在页面中不存在对应 section
- **THEN** 点击该导航项不报错、不发生跳转（防御行为），且正常配置下不出现此情形
