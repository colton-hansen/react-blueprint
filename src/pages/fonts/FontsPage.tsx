import { useTranslation } from 'react-i18next'

export function FontsPage() {
  const { t } = useTranslation()
  return (
    <div className="bp-page">
      <h1 className="bp-h1">{t('fonts.title')}</h1>
    </div>
  )
}
