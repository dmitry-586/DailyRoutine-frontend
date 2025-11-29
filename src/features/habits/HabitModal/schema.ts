import z from 'zod'

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
    target: z
      .string()
      .refine(
        (val) => {
          if (!val) return false
          const num = parseInt(val, 10)
          return !Number.isNaN(num) && num > 0
        },
        { message: 'Значение должно быть положительным числом' },
      )
      .optional(),
    unit: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.format !== 'binary') {
        return data.target !== undefined && data.unit !== undefined
      }
      return true
    },
    {
      message: 'Укажите целевое значение и единицу измерения',
      path: ['target'],
    },
  )

export type HabitFormData = z.infer<typeof habitFormSchema>
