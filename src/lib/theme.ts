export const THEME_STORAGE_KEY = 'bp-theme'

export const THEMES = ['white', 'light', 'dark', 'black'] as const
export type ThemeId = (typeof THEMES)[number]

export function resolveSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function getStoredTheme(): ThemeId | null {
  const raw = localStorage.getItem(THEME_STORAGE_KEY)
  if (raw && THEMES.includes(raw as ThemeId)) return raw as ThemeId
  return null
}

export function getInitialTheme(): ThemeId {
  return getStoredTheme() ?? resolveSystemTheme()
}

export function applyTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

export function cycleTheme(current: ThemeId): ThemeId {
  const index = THEMES.indexOf(current)
  const next = THEMES[(index + 1) % THEMES.length]
  applyTheme(next)
  return next
}
