export type ThemeMode = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'my-website:theme'

export function systemPrefersDark(): boolean {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

export function readStoredMode(): ThemeMode | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    return raw === 'dark' || raw === 'light' ? raw : null
  } catch {
    return null
  }
}

export function resolveInitialMode(): ThemeMode {
  return readStoredMode() ?? (systemPrefersDark() ? 'dark' : 'light')
}

export function applyModeToRoot(mode: ThemeMode): void {
  document.documentElement.classList.toggle('dark', mode === 'dark')
}

export function persistMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    /* 存储不可用（隐私模式/禁用）时静默降级：仅本次会话生效 */
  }
}
