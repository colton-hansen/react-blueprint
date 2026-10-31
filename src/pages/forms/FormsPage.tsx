import { useTranslation } from 'react-i18next'

export function FormsPage() {
  const { t } = useTranslation()
  return (
    <div className="bp-page">
      <h1 className="bp-h1">{t('forms.title')}</h1>
    </div>
  )
}
