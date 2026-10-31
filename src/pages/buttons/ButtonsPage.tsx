import { useTranslation } from 'react-i18next'

export function ButtonsPage() {
  const { t } = useTranslation()
  return (
    <div className="bp-page">
      <h1 className="bp-h1">{t('buttons.title')}</h1>
    </div>
  )
}
