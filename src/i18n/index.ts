import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getStoredLanguage, LANG_STORAGE_KEY } from '@/lib/language'
import en from '@/i18n/locales/en.json'
import ru from '@/i18n/locales/ru.json'

const initialLng = getStoredLanguage() ?? 'en'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: initialLng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANG_STORAGE_KEY, lng)
  document.documentElement.lang = lng
})

document.documentElement.lang = initialLng

export default i18n
