import type { TabConfig } from './types'

export const HABIT_TABS: TabConfig[] = [
  {
    value: 'all',
    label: 'Все',
    variant: 'primary',
    emptyMessage: 'У вас пока нет привычек',
    filter: (h) => h.is_active !== false,
  },
  {
    value: 'good',
    label: 'Полезные',
    variant: 'success',
    emptyMessage: 'У вас нет полезных привычек',
    filter: (h) => h.is_beneficial === true && h.is_active !== false,
  },
  {
    value: 'bad',
    label: 'Вредные',
    variant: 'danger',
    emptyMessage: 'У вас нет вредных привычек',
    filter: (h) => h.is_beneficial === false && h.is_active !== false,
  },
  {
    value: 'inactive',
    label: 'Неактивные',
    variant: 'neutral',
    emptyMessage: 'Нет неактивных привычек',
    filter: (h) => h.is_active === false,
  },
]
