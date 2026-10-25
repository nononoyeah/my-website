import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { applyModeToRoot, persistMode, resolveInitialMode } from './theme'
import type { ThemeMode } from './theme'
import { ThemeContext } from './ThemeContext'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(resolveInitialMode)

  useEffect(() => {
    applyModeToRoot(mode)
  }, [mode])

  const toggleMode = () => {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    persistMode(next)
    setMode(next)
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
