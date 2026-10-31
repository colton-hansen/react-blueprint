import {
  type AnimationEvent,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
  useRef,
} from 'react'

export type RoundButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> & {
  icon: ReactNode
  'aria-label': string
}

export function RoundButton({
  icon,
  type = 'button',
  className,
  onClick,
  onAnimationEnd,
  disabled,
  ...rest
}: RoundButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const classes = [
    'bp-round-button-hit',
    'bp-main-outline',
    'w-12',
    'h-12',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'p-2',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const playPressAnimation = () => {
    const el = buttonRef.current
    if (!el || disabled) return
    el.classList.remove('is-press-anim')
    void el.offsetWidth
    el.classList.add('is-press-anim')
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    playPressAnimation()
    onClick?.(event)
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLButtonElement>) => {
    if (event.animationName === 'bp-round-button-press') {
      buttonRef.current?.classList.remove('is-press-anim')
    }
    onAnimationEnd?.(event)
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      {...rest}
    >
      <span className="bp-round-button__icon h-full w-full">{icon}</span>
    </button>
  )
}
