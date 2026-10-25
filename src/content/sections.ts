/**
 * 占位 Section 内容配置 —— 【替换真实内容入口】
 * 站主修改各字段文案即可，无需改动组件逻辑；
 * 「内容建设中」提示独占 placeholderNote 字段，替换真实内容时可删除该字段引用。
 */
export interface SectionContent {
  title: string
  description: string
  placeholderNote: string
}

export const sectionsContent: Record<'contact', SectionContent> = {
  contact: {
    title: '联系我',
    description: '这里将提供联系方式与合作渠道。',
    placeholderNote: '内容建设中',
  },
}
