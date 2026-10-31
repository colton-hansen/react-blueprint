import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="bp-page bp-page--center">
      <p className="bp-h1">{t('notFound.code')}</p>
    </div>
  )
}
