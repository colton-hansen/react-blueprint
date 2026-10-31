import { LayoutGrid, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="bp-home">
      <section className="bp-home__upper" aria-label={t('home.workspace')}>
        <div className="bp-home__upper-noise" aria-hidden />
        <div className="bp-home__upper-inner">
          <p className="bp-home__eyebrow">
            <LayoutGrid size={16} strokeWidth={1.75} aria-hidden />
            {t('home.workspace')}
          </p>
          <p className="bp-home__greeting">{t('home.greeting')}</p>
          <h1 className="bp-home__title">{t('home.title')}</h1>
          <div className="bp-home__prompt">
            <div className="bp-home__prompt-card" role="presentation">
              <span className="bp-home__prompt-icon">
                <Plus size={18} strokeWidth={1.75} aria-hidden />
              </span>
              <span>{t('home.promptPlaceholder')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bp-home__lower" aria-labelledby="home-build-heading">
        <h2 className="bp-home__section-title" id="home-build-heading">
          {t('home.buildTitle')}
        </h2>
        <p className="bp-home__section-lead">{t('home.buildLead')}</p>
        <ul className="bp-home__cards">
          <li className="bp-home__card" aria-hidden />
          <li className="bp-home__card" aria-hidden />
        </ul>
      </section>
    </div>
  )
}
