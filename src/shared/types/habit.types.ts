export type HabitType = 'beneficial' | 'harmful'
export type HabitFormat = 'time' | 'count' | 'binary'

interface HabitBase {
  title: string
  type: HabitType
  format: HabitFormat
  value: number
  is_active?: boolean
  unit?: string | null
}

export interface HabitCreate extends HabitBase {}

export interface HabitUpdate extends Partial<HabitBase> {
  current_value?: number
  is_done?: boolean
  series?: number
}

export interface Habit extends Required<HabitUpdate> {
  id: number
  user_id: number
  created_at: string
}
