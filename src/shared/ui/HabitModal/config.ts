export const COUNT_UNITS = [
  { value: 'раз', label: 'раз' },
  { value: 'шт', label: 'штук' },
  { value: 'стр', label: 'страниц' },
  { value: 'км', label: 'километров' },
  { value: 'л', label: 'литров' },
] as const

export const habitBeneficialOptions = [
  {
    value: true,
    label: 'Полезная привычка',
    description: 'Отмечайте выполнение каждый день',
  },
  {
    value: false,
    label: 'Вредная привычка',
    description: 'Отмечайте день, когда сорвались',
  },
] as const

export const habitTypeOptions = [
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

export const DEFAULT_FORM_VALUES = {
  title: '',
  is_beneficial: true,
  type: 'binary' as const,
  value: '1',
  unit: 'раз',
}
