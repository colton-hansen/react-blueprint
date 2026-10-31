import {
  CircleUserRound,
  Languages,
  Palette,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '@/config/navigation'
import { helpLink, socialLinks } from '@/config/sidebar'
import i18n from '@/i18n'
import { cycleLanguage, type LanguageId } from '@/lib/language'
import { cycleTheme, type ThemeId } from '@/lib/theme'

type SidebarMenuProps = {
  collapsed?: boolean
  id?: string
  onNavigate?: () => void
}

export function SidebarMenu({
  collapsed = false,
  id,
  onNavigate,
}: SidebarMenuProps) {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<ThemeId>(
    () => (document.documentElement.dataset.theme as ThemeId) || 'dark',
  )
  const [language, setLanguage] = useState<LanguageId>(
    () => (i18n.language as LanguageId) || 'en',
  )

  const onThemeClick = () => {
    setTheme((current) => cycleTheme(current))
  }

  const onLanguageClick = () => {
    const next = cycleLanguage(language)
    setLanguage(next)
    void i18n.changeLanguage(next)
  }

  const linkTitle = (label: string) => (collapsed ? label : undefined)
  const HelpIcon = helpLink.icon

  return (
    <div className="bp-sidebar__menu" id={id}>
      <div className="bp-sidebar__body">
        <section className="bp-sidebar__section">
          <h2 className="bp-sidebar__section-title">{t('sidebar.mainMenu')}</h2>
          <ul className="bp-sidebar__list">
            {navigationItems.map(({ to, labelKey, icon: Icon }) => {
              const label = t(labelKey)
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/home'}
                    className={({ isActive }) =>
                      `bp-sidebar__link${isActive ? ' is-active' : ''}`
                    }
                    title={linkTitle(label)}
                    onClick={onNavigate}
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                    <span className="bp-sidebar__link-text">{label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="bp-sidebar__section">
          <h2 className="bp-sidebar__section-title">
            {t('sidebar.contactsTitle')}
          </h2>
          <ul className="bp-sidebar__list">
            {socialLinks.map(({ href, labelKey, icon: Icon }) => {
              const label = t(labelKey)
              return (
                <li key={labelKey}>
                  <a
                    className="bp-sidebar__link"
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={linkTitle(label)}
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                    <span className="bp-sidebar__link-text">{label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="bp-sidebar__section">
          <h2 className="bp-sidebar__section-title">
            {t('sidebar.settingsTitle')}
          </h2>
          <ul className="bp-sidebar__list">
            <li>
              <button
                type="button"
                className="bp-sidebar__action"
                title={linkTitle(
                  `${t('sidebar.theme')}: ${t(`theme.${theme}`)}`,
                )}
                onClick={onThemeClick}
              >
                <Palette size={16} strokeWidth={1.75} aria-hidden />
                <span className="bp-sidebar__action-label">
                  {t('sidebar.theme')}
                </span>
                <span className="bp-sidebar__action-value">
                  {t(`theme.${theme}`)}
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="bp-sidebar__action"
                title={linkTitle(
                  `${t('sidebar.language')}: ${language.toUpperCase()}`,
                )}
                onClick={onLanguageClick}
              >
                <Languages size={16} strokeWidth={1.75} aria-hidden />
                <span className="bp-sidebar__action-label">
                  {t('sidebar.language')}
                </span>
                <span className="bp-sidebar__action-value">
                  {language.toUpperCase()}
                </span>
              </button>
            </li>
            <li>
              <a
                className="bp-sidebar__link"
                href={helpLink.href}
                target="_blank"
                rel="noreferrer noopener"
                title={linkTitle(t(helpLink.labelKey))}
              >
                <HelpIcon size={16} strokeWidth={1.75} aria-hidden />
                <span className="bp-sidebar__link-text">
                  {t(helpLink.labelKey)}
                </span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="bp-sidebar__footer">
        <button
          type="button"
          className="bp-sidebar__action"
          disabled
          title={linkTitle(t('sidebar.account'))}
        >
          <CircleUserRound size={16} strokeWidth={1.75} aria-hidden />
          <span className="bp-sidebar__action-label">{t('sidebar.account')}</span>
          <span className="bp-sidebar__action-value">—</span>
        </button>
      </div>
    </div>
  )
}
