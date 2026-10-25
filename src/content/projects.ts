/**
 * 项目数据常量 —— 【替换真实内容入口】
 * 站主修改本项目列表即可（增删改均即时生效，无需改组件）；
 * image 为项目截图相对路径（置于 src/assets/ 或 public/assets/），缺省时卡片自动渲染渐变占位图块，
 * 此时图片 lazy loading 约定暂不生效，待真实截图填入 image 字段后自动接管。
 */
export interface ProjectItem {
  title: string
  description: string
  githubUrl: string
  image?: string
}

export const projects: ProjectItem[] = [
  {
    title: '数据目录平台',
    description: '面向企业数据资产的编目与检索服务。',
    githubUrl: 'https://github.com/owner/data-catalog',
  },
  {
    title: '实时日志流',
    description: '高吞吐日志采集与实时可视化流水线。',
    githubUrl: 'https://github.com/owner/log-stream',
  },
  {
    title: '个人品牌站',
    description: 'React + Tailwind 驱动的响应式个人主页。',
    githubUrl: 'https://github.com/owner/personal-site',
  },
  {
    title: '算法可视化实验室',
    description: '常见数据结构与算法的交互式演示工具。',
    githubUrl: 'https://github.com/owner/algoviz',
  },
]
