import { useTheme } from '../theme/useTheme'

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme()
  const next: 'light' | 'dark' = mode === 'dark' ? 'light' : 'dark'
  const label = next === 'light' ? '切换到明亮模式' : '切换到暗黑模式'

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={`切换到${next === 'light' ? '明亮' : '暗黑'}模式`}
      title={label}
      className="fixed right-4 bottom-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
    >
      {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
