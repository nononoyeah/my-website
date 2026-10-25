import { useEffect, useRef } from 'react'
import { useTheme } from '../theme/useTheme'
import type { ThemeMode } from '../theme/theme'

/** 数量与容器面积成正比：约每 9000px² 一颗星点 */
const PARTICLE_DENSITY = 1 / 9000
/** 数量上限封顶 */
const MAX_PARTICLES = 300
/** resize 防抖：150–200ms 区间取中值 */
const RESIZE_DEBOUNCE_MS = 170

function particleColor(mode: ThemeMode): string {
  return mode === 'dark'
    ? 'rgba(226, 232, 240, 0.7)'
    : 'rgba(41, 37, 36, 0.5)'
}

/**
 * 静态粒子绘制：无 rAF / 无 setInterval，仅在下述时机各调用一次：
 * 挂载、resize（防抖后）、主题切换。
 * Canvas 无法初始化或绘制抛错时静默降级，组件不重试、不报错。
 * 【验证方式】代码走查本函数 catch 分支与 getContext 判空分支；
 * 运行期可临时在 getContext 前注入 null 验证降级路径不被触发。
 */
function drawParticles(canvas: HTMLCanvasElement, mode: ThemeMode): boolean {
  const parent = canvas.parentElement ?? canvas
  const { width, height } = parent.getBoundingClientRect()
  if (width <= 0 || height <= 0) return true

  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)

  const ctx = canvas.getContext('2d')
  if (!ctx) return false

  try {
    const count = Math.min(
      MAX_PARTICLES,
      Math.max(1, Math.round(width * height * PARTICLE_DENSITY)),
    )
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = particleColor(mode)
    for (let i = 0; i < count; i++) {
      const radius = (Math.random() * 1.1 + 0.4) * dpr
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    return true
  } catch {
    return false
  }
}

export function StaticParticles() {
  const { mode } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const disabledRef = useRef(false)
  const modeRef = useRef<ThemeMode>(mode)

  useEffect(() => {
    modeRef.current = mode
    const canvas = canvasRef.current
    if (!canvas || disabledRef.current) return
    if (!drawParticles(canvas, modeRef.current)) {
      disabledRef.current = true
    }
  }, [mode])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      if (timer !== undefined) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = undefined
        const canvas = canvasRef.current
        if (!canvas || disabledRef.current) return
        if (!drawParticles(canvas, modeRef.current)) {
          disabledRef.current = true
        }
      }, RESIZE_DEBOUNCE_MS)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (timer !== undefined) clearTimeout(timer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  )
}
