import type { LucideIcon } from 'lucide-react'
import { CircleHelp, GitBranch, Send } from 'lucide-react'

export type SocialLinkItem = {
  href: string
  labelKey: `sidebar.contacts.${string}`
  icon: LucideIcon
}

export const socialLinks = [
  {
    href: 'https://github.com/colton-hansen',
    labelKey: 'sidebar.contacts.github',
    icon: GitBranch,
  },
  {
    href: 'https://t.me/redmorrayne',
    labelKey: 'sidebar.contacts.telegram',
    icon: Send,
  },
] as const satisfies readonly SocialLinkItem[]

export const helpLink = {
  href: 'https://t.me/redmorrayne',
  labelKey: 'sidebar.help',
  icon: CircleHelp,
} as const
