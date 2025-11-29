export const TIME_UNITS = [
  { value: 'мин', label: 'минут' },
  { value: 'ч', label: 'часов' },
] as const

export const COUNT_UNITS = [
  { value: 'раз', label: 'раз' },
  { value: 'шт', label: 'штук' },
  { value: 'стр', label: 'страниц' },
  { value: 'км', label: 'километров' },
  { value: 'стаканов', label: 'стаканов' },
] as const

export const habitTypeOptions = [
  {
    value: 'good',
    label: 'Полезная привычка',
    description: 'Отмечайте выполнение каждый день',
  },
  {
    value: 'bad',
    label: 'Вредная привычка',
    description: 'Отмечайте день, когда сорвались',
  },
] as const

export const habitFormatOptions = [
  {
    value: 'binary',
    label: 'Да / Нет',
    description: 'Простое выполнение (выполнено / не выполнено)',
  },
  {
    value: 'count',
    label: 'Количество',
    description: 'Отслеживание числовых значений (страницы, шаги и т.д.)',
  },
  {
    value: 'time',
    label: 'Время',
    description: 'Отслеживание времени (минуты, часы)',
  },
] as const
