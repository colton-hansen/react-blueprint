import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { RoundButton } from '@/components/buttons/RoundButton'

export function ButtonsPage() {
  const { t } = useTranslation()
  return (
    <div className="screen">
      <h1 className="bp-h1">{t('buttons.title')}</h1>
      <RoundButton
        icon={<ChevronLeft aria-hidden />}
        aria-label={t('buttons.back')}
      />
    </div>
  )
}
