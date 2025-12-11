import z from 'zod'

const MIN_PROGRESS_STEP = 1

export const createProgressSchema = (remaining: number) =>
  z.object({
    value: z
      .string()
      .min(1, 'Введите значение')
      .refine(
        (val) => {
          const num = Number.parseInt(val, 10)
          return !Number.isNaN(num) && num >= MIN_PROGRESS_STEP
        },
        {
          message: `Минимальное значение — ${MIN_PROGRESS_STEP}`,
        },
      )
      .refine(
        (val) => {
          const num = Number.parseInt(val, 10)
          return !Number.isNaN(num) && num <= remaining
        },
        {
          message: `Максимальное значение — ${remaining}`,
        },
      ),
  })

export type ProgressFormData = z.infer<ReturnType<typeof createProgressSchema>>
