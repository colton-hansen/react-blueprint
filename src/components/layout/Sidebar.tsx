import { PanelLeft, PanelLeftClose } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SidebarMenu } from '@/components/layout/SidebarMenu'
import {
  getStoredSidebarCollapsed,
  setSidebarCollapsed,
} from '@/lib/sidebar-collapse'

export function Sidebar() {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(() => getStoredSidebarCollapsed())

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current
      setSidebarCollapsed(next)
      return next
    })
  }

  return (
    <aside
      className={`bp-sidebar${collapsed ? ' is-collapsed' : ''}`}
      aria-label="Sidebar"
      data-collapsed={collapsed}
    >
      <div className="bp-sidebar__controller">
        <button
          type="button"
          className={`bp-sidebar__collapse-btn${collapsed ? ' is-collapsed-toggle' : ''}`}
          aria-expanded={!collapsed}
          aria-controls="bp-sidebar-menu"
          aria-label={
            collapsed ? t('sidebar.expand') : t('sidebar.collapse')
          }
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <PanelLeft size={18} strokeWidth={1.75} aria-hidden />
          ) : (
            <>
              <PanelLeftClose size={18} strokeWidth={1.75} aria-hidden />
              <span className="bp-sidebar__collapse-label">
                {t('sidebar.collapseShort')}
              </span>
            </>
          )}
        </button>
      </div>
      <SidebarMenu collapsed={collapsed} id="bp-sidebar-menu" />
    </aside>
  )
}
