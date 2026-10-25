import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { siteUrl } from './content/site'
import App from './App.tsx'

// canonical 写入（seo-basics）：site.ts 为唯一替换入口；标签缺失时防御性追加
const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
if (canonical) {
  canonical.setAttribute('href', siteUrl)
} else {
  const link = document.createElement('link')
  link.rel = 'canonical'
  link.setAttribute('href', siteUrl)
  document.head.append(link)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
