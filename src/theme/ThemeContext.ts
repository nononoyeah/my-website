import { createContext } from 'react'
import type { ThemeMode } from './theme'

export interface ThemeContextValue {
  mode: ThemeMode
  toggleMode: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
