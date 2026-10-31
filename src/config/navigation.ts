import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Layers,
  MousePointerClick,
  PanelTop,
  Type,
} from 'lucide-react'

export type NavigationItem = {
  to: string
  labelKey: `nav.${string}`
  icon: LucideIcon
}

/** Max tabs on the mobile bar before overflow goes to More */
export const MOBILE_NAV_MAX_PRIMARY = 4

/** When items exceed MOBILE_NAV_MAX_PRIMARY, bar shows this many + More */
export const MOBILE_NAV_BAR_SLOTS_WITH_MORE = 3

export const navigationItems = [
  { to: '/home', labelKey: 'nav.home', icon: Home },
  { to: '/fonts', labelKey: 'nav.fonts', icon: Type },
  { to: '/forms', labelKey: 'nav.forms', icon: PanelTop },
  { to: '/buttons', labelKey: 'nav.buttons', icon: MousePointerClick },
  { to: '/popups', labelKey: 'nav.popups', icon: Layers },
] as const satisfies readonly NavigationItem[]

export type NavigationItemId = (typeof navigationItems)[number]['to']

export type MobileNavigationSplit = {
  bar: readonly NavigationItem[]
  overflow: readonly NavigationItem[]
}

export function splitNavigationForMobile(
  items: readonly NavigationItem[] = navigationItems,
): MobileNavigationSplit {
  if (items.length <= MOBILE_NAV_MAX_PRIMARY) {
    return { bar: items, overflow: [] }
  }

  return {
    bar: items.slice(0, MOBILE_NAV_BAR_SLOTS_WITH_MORE),
    overflow: items.slice(MOBILE_NAV_BAR_SLOTS_WITH_MORE),
  }
}

/** Stable reference for layout effects (avoid new arrays each render) */
export const mobileNavigationSplit =
  splitNavigationForMobile(navigationItems)
