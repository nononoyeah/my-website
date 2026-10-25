import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import type { ThemeContextValue } from './ThemeContext'

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme 必须在 ThemeProvider 内使用')
  }
  return ctx
}
