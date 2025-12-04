import z from 'zod'

const MAX_TIME_MINUTES = 1000 * 60 + 59

export const habitFormSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Название привычки обязательно')
      .max(100, 'Название не должно превышать 100 символов')
      .trim(),
    is_beneficial: z.boolean({
      message: 'Выберите тип привычки',
    }),
    type: z.enum(['binary', 'count', 'time'], {
      message: 'Выберите формат отслеживания',
    }),
    value: z.string().optional(),
    unit: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'binary') {
      return
    }

    if (!data.value) {
      ctx.addIssue({
        code: 'custom',
        path: ['value'],
        message: 'Укажите целевое значение',
      })
      return
    }

    const num = Number.parseInt(data.value, 10)

    if (Number.isNaN(num) || num <= 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['value'],
        message: 'Значение должно быть положительным числом',
      })
      return
    }

    if (data.type === 'count') {
      if (!data.unit) {
        ctx.addIssue({
          code: 'custom',
          path: ['unit'],
          message: 'Укажите единицу измерения',
        })
      }
      return
    }

    if (data.type === 'time' && num > MAX_TIME_MINUTES) {
      ctx.addIssue({
        code: 'custom',
        path: ['value'],
        message: 'Максимальное значение — 1000 часов и 59 минут',
      })
    }
  })

export type HabitFormData = z.infer<typeof habitFormSchema>
