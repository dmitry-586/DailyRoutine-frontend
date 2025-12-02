import {
  Home,
  ListChecks,
  LucideIcon,
  SettingsIcon,
  // ShoppingBag,
  Target,
} from 'lucide-react'

interface INavItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
}

export const NAV_ITEMS: INavItem[] = [
  { id: 'dashboard', label: 'Главная', icon: Home, href: '/dashboard' },
  {
    id: 'habits',
    label: 'Привычки',
    icon: ListChecks,
    href: '/dashboard/habits',
  },
  { id: 'sprints', label: 'Спринты', icon: Target, href: '/dashboard/sprints' },
  // { id: 'shop', label: 'Магазин', icon: ShoppingBag, href: '/dashboard/shop' },
  {
    id: 'settings',
    label: 'Настройки',
    icon: SettingsIcon,
    href: '/dashboard/settings',
  },
]
