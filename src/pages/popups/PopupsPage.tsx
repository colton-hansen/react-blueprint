import { useTranslation } from 'react-i18next'

export function PopupsPage() {
  const { t } = useTranslation()
  return (
    <div className="bp-page">
      <h1 className="bp-h1">{t('popups.title')}</h1>
    </div>
  )
}
