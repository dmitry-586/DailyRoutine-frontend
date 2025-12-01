import z from 'zod'

const MAX_TIME_MINUTES = 1000 * 60 + 59

export const habitFormSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Название привычки обязательно')
      .max(100, 'Название не должно превышать 100 символов')
      .trim(),
    type: z.enum(['good', 'bad'], {
      message: 'Выберите тип привычки',
    }),
    format: z.enum(['binary', 'count', 'time'], {
      message: 'Выберите формат отслеживания',
    }),
    target: z.string().optional(),
    unit: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.format === 'binary') {
      return
    }

    if (!data.target) {
      ctx.addIssue({
        code: 'custom',
        path: ['target'],
        message: 'Укажите целевое значение',
      })
      return
    }

    const num = Number.parseInt(data.target, 10)

    if (Number.isNaN(num) || num <= 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['target'],
        message: 'Значение должно быть положительным числом',
      })
      return
    }

    if (data.format === 'count') {
      if (!data.unit) {
        ctx.addIssue({
          code: 'custom',
          path: ['unit'],
          message: 'Укажите единицу измерения',
        })
      }
      return
    }

    if (data.format === 'time' && num > MAX_TIME_MINUTES) {
      ctx.addIssue({
        code: 'custom',
        path: ['target'],
        message: 'Максимальное значение — 1000 часов и 59 минут',
      })
    }
  })

export type HabitFormData = z.infer<typeof habitFormSchema>
