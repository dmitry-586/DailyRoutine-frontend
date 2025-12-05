import z from 'zod'

const MAX_TIME_MINUTES = 1000 * 60 + 59

// Базовая схема с обязательным title
const baseEditSchema = z.object({
  title: z
    .string()
    .min(1, 'Название привычки обязательно')
    .max(100, 'Название не должно превышать 100 символов')
    .trim(),
})

// Схема для binary типа (только title)
export const binaryEditSchema = baseEditSchema.extend({
  value: z.string().optional(),
  unit: z.string().optional(),
})

// Схема для count типа (title + value + unit)
export const countEditSchema = baseEditSchema.extend({
  value: z
    .string()
    .min(1, 'Укажите целевое значение')
    .refine(
      (val) => {
        const num = Number.parseInt(val, 10)
        return !Number.isNaN(num) && num > 0
      },
      {
        message: 'Значение должно быть положительным числом',
      },
    ),
  unit: z
    .string()
    .min(1, 'Укажите единицу измерения')
    .max(20, 'Единица измерения слишком длинная'),
})

// Схема для time типа (title + value)
export const timeEditSchema = baseEditSchema.extend({
  value: z
    .string()
    .min(1, 'Укажите целевое время')
    .refine(
      (val) => {
        const num = Number.parseInt(val, 10)
        return !Number.isNaN(num) && num >= 0
      },
      {
        message: 'Время должно быть неотрицательным числом (в минутах)',
      },
    )
    .refine(
      (val) => {
        const num = Number.parseInt(val, 10)
        return num <= MAX_TIME_MINUTES
      },
      {
        message: `Максимальное значение — ${Math.floor(MAX_TIME_MINUTES / 60)} часов и ${MAX_TIME_MINUTES % 60} минут`,
      },
    ),
  unit: z.string().optional(),
})

// Базовый тип с опциональными полями для удобства работы
export type EditHabitFormData = {
  title: string
  value?: string
  unit?: string
}
