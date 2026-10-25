/**
 * 个人信息内容配置 —— 【替换真实内容入口】
 * 站主只需修改下方三个字段的文案，无需改动任何组件逻辑。
 */
export interface Profile {
  name: string
  title: string
  tagline: string
}

export const profile: Profile = {
  name: '你的名字',
  title: '你的职业',
  tagline: '一句话介绍你自己',
}
