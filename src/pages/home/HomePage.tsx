import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()
  return (
    <div className="bp-page">
      <h1 className="bp-h1">{t('nav.home')}</h1>
    </div>
  )
}
