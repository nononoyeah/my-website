/**
 * 导航项内容配置 —— 【替换真实内容入口】
 * 新增/调整导航项只需修改本文件；
 * 注意：锚点 id 必须与对应 section 的 id 保持一致。
 */
export interface NavItem {
  id: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: '首页' },
  { id: 'projects', label: '项目' },
  { id: 'about', label: '关于我' },
  { id: 'contact', label: '联系我' },
]
