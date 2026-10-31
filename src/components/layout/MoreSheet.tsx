import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import type { NavigationItem } from '@/config/navigation'

type MoreSheetProps = {
  open: boolean
  onClose: () => void
  items: readonly NavigationItem[]
}

export function MoreSheet({ open, onClose, items }: MoreSheetProps) {
  const { t } = useTranslation()

  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="bp-more-sheet__backdrop"
        aria-label={t('common.close')}
        onClick={onClose}
      />
      <div
        className="bp-more-sheet bp-main-outline"
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.more')}
      >
        <ul className="bp-more-sheet__list">
          {items.map(({ to, labelKey, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/home'}
                className={({ isActive }) =>
                  `bp-more-sheet__link${isActive ? ' is-active' : ''}`
                }
                onClick={onClose}
              >
                <Icon size={18} strokeWidth={1.75} aria-hidden />
                <span>{t(labelKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
