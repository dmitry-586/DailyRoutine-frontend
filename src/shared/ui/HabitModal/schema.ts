import z from 'zod'

const MAX_TIME_MINUTES = 1000 * 60 + 59

// Базовые поля для всех типов привычек
const baseHabitFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Название привычки обязательно')
    .max(100, 'Название не должно превышать 100 символов')
    .trim(),
  is_beneficial: z.boolean('Выберите тип привычки'),
})

// Схема для binary типа (не требует value и unit)
const binaryHabitFormSchema = baseHabitFormSchema.extend({
  type: z.literal('binary'),
  value: z.string().optional(),
  unit: z.string().optional(),
})

// Схема для count типа (требует value и unit)
const countHabitFormSchema = baseHabitFormSchema.extend({
  type: z.literal('count'),
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

// Схема для time типа (требует value, не требует unit)
const timeHabitFormSchema = baseHabitFormSchema.extend({
  type: z.literal('time'),
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

// Объединенная схема с discriminated union
export const habitFormSchema = z
  .discriminatedUnion('type', [
    binaryHabitFormSchema,
    countHabitFormSchema,
    timeHabitFormSchema,
  ])
  .superRefine((data, ctx) => {
    if (!data.is_beneficial && data.type !== 'binary') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['type'],
        message: 'Для вредной привычки доступен только формат «Да / Нет»',
      })
    }
  })

export type HabitFormData = z.infer<typeof habitFormSchema>
