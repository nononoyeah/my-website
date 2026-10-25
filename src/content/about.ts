/**
 * 「关于我」内容常量 —— 【替换真实内容入口】
 * 站主修改本文件即可；paragraphs 元组锁定三段；
 * photo 为照片相对路径（置于 public/assets/ 或 src/assets/），缺省时自动渲染渐变占位图块，
 * 此时图片 lazy loading 约定暂不生效，待真实照片填入后自动接管。
 */
export interface AboutContent {
  title: string
  photo?: string
  paragraphs: [string, string, string]
  brandTag: string
}

export const aboutContent: AboutContent = {
  title: '关于我',
  paragraphs: [
    '这里是我的第一段自我介绍占位文案：讲述我的职业背景与当前所处方向。',
    '这里是我的第二段占位文案：记录我关注的领域、正在做的实践与思考方式。',
    '这里是我的第三段占位文案：说明我期望的协作方式与推荐的联系方式。',
  ],
  brandTag: 'nononoyeah',
}
