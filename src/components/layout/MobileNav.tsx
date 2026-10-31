import { Menu } from 'lucide-react'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { MoreSheet } from '@/components/layout/MoreSheet'
import { mobileNavigationSplit } from '@/config/navigation'

type IndicatorRect = {
  x: number
  y: number
  width: number
  height: number
}

const hiddenIndicator: IndicatorRect = { x: 0, y: 0, width: 0, height: 0 }

function barItemActive(pathname: string, to: string) {
  if (to === '/home') {
    return pathname === '/' || pathname === '/home'
  }
  return pathname.startsWith(to)
}

function rectsEqual(a: IndicatorRect, b: IndicatorRect) {
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height
  )
}

export function MobileNav() {
  const { t } = useTranslation()
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const indicatorInnerRef = useRef<HTMLDivElement>(null)
  const slideAnimRef = useRef(false)

  const [indicator, setIndicator] = useState<IndicatorRect>(hiddenIndicator)
  const [slideAnim, setSlideAnim] = useState(false)

  const { bar, overflow } = mobileNavigationSplit
  const hasMore = overflow.length > 0

  const moreActive =
    moreOpen ||
    overflow.some((item) => location.pathname.startsWith(item.to))

  const activeBarIndex = useMemo(
    () => bar.findIndex((item) => barItemActive(location.pathname, item.to)),
    [bar, location.pathname],
  )

  const measure = (index: number) => {
    const track = trackRef.current
    const active = index >= 0 ? itemRefs.current[index] : null
    if (!track || !active) {
      setIndicator((prev) =>
        rectsEqual(prev, hiddenIndicator) ? prev : hiddenIndicator,
      )
      return
    }

    // offset* — размер и позиция как у tab (64×46), в координатах track
    const next: IndicatorRect = {
      x: Math.round(active.offsetLeft),
      y: Math.round(active.offsetTop),
      width: Math.round(active.offsetWidth),
      height: Math.round(active.offsetHeight),
    }

    setIndicator((prev) => (rectsEqual(prev, next) ? prev : next))
  }

  useLayoutEffect(() => {
    measure(activeBarIndex)
    if (slideAnimRef.current) {
      setSlideAnim(true)
      slideAnimRef.current = false
    }

    const track = trackRef.current
    if (!track) return

    const onResize = () => {
      measure(activeBarIndex)
    }

    const ro = new ResizeObserver(onResize)
    ro.observe(track)
    window.addEventListener('resize', onResize)
    void document.fonts?.ready?.then(onResize)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [activeBarIndex, t])

  const playIndicatorPress = () => {
    const inner = indicatorInnerRef.current
    if (!inner) return
    inner.classList.remove('is-press-anim')
    void inner.offsetWidth
    inner.classList.add('is-press-anim')
  }

  const onBarLinkClick = () => {
    slideAnimRef.current = true
    playIndicatorPress()
  }

  const indicatorVisible = activeBarIndex >= 0 && indicator.width > 0

  return (
    <>
      <nav className="bp-mobile-nav" aria-label={t('sidebar.mainMenu')}>
        <div className="bp-mobile-nav__row">
          <div
            ref={trackRef}
            className={`bp-mobile-nav__track bp-main-outline flex w-fit rounded-4xl${slideAnim ? ' bp-mobile-nav__track--animate' : ''}`}
          >
            <div
              className="bp-mobile-nav__indicator"
              aria-hidden
              style={{
                opacity: indicatorVisible ? 1 : 0,
                transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
                width: indicator.width,
                height: indicator.height,
              }}
              onTransitionEnd={(event) => {
                if (event.propertyName === 'transform') setSlideAnim(false)
              }}
            >
              <div
                ref={indicatorInnerRef}
                className="bp-mobile-nav__indicator-inner"
                onAnimationEnd={(event) => {
                  if (event.animationName === 'bp-round-button-press') {
                    event.currentTarget.classList.remove('is-press-anim')
                  }
                }}
              />
            </div>
            {bar.map(({ to, labelKey, icon: Icon }, index) => (
              <NavLink
                key={to}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                to={to}
                end={to === '/home'}
                onClick={onBarLinkClick}
                className={({ isActive }) =>
                  `bp-mobile-nav__tab flex flex-col items-center justify-center gap-0.5${isActive ? ' is-active' : ''}`
                }
              >
                <Icon size={22} strokeWidth={1.75} aria-hidden />
                <span className="text-[10px] font-semibold">{t(labelKey)}</span>
              </NavLink>
            ))}
          </div>

          {hasMore ? (
            <div className="bp-mobile-nav__track--solo bp-main-outline flex w-fit items-center rounded-4xl">
              <button
                type="button"
                className={`bp-mobile-nav__tab bp-mobile-nav__tab--solo flex flex-col items-center justify-center gap-0.5 border-0 bg-transparent font-[inherit]${moreActive ? ' is-active' : ''}`}
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen(true)}
              >
                <Menu size={22} strokeWidth={1.75} aria-hidden />
                <span className="text-[10px] font-semibold">{t('nav.more')}</span>
              </button>
            </div>
          ) : null}
        </div>
      </nav>

      {hasMore ? (
        <MoreSheet
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
          items={overflow}
        />
      ) : null}
    </>
  )
}
