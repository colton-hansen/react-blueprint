export const LANG_STORAGE_KEY = 'bp-lang'

export const LANGUAGES = ['en', 'ru'] as const
export type LanguageId = (typeof LANGUAGES)[number]

export function getStoredLanguage(): LanguageId | null {
  const raw = localStorage.getItem(LANG_STORAGE_KEY)
  if (raw && LANGUAGES.includes(raw as LanguageId)) return raw as LanguageId
  return null
}

export function cycleLanguage(current: LanguageId): LanguageId {
  const index = LANGUAGES.indexOf(current)
  const next = LANGUAGES[(index + 1) % LANGUAGES.length]
  localStorage.setItem(LANG_STORAGE_KEY, next)
  return next
}
