export interface HabitHistoryEntry {
  date: string
  value: number
  completed: boolean
}

export interface Habit {
  id: number
  user_id: number
  title: string
  type: 'time' | 'count' | 'binary'
  unit?: string
  value: number
  is_active: boolean
  is_done: boolean
  is_beneficial: boolean
  series: number
  created_at: string
}

export interface CreateHabitRequest {
  title: string
  type: 'time' | 'count' | 'binary'
  unit?: string
  value: number
  is_active?: boolean
  is_beneficial?: boolean
}

export interface UpdateHabitRequest {
  title?: string
  type?: 'time' | 'count' | 'binary'
  unit?: string
  value?: number
  is_active?: boolean
  is_done?: boolean
  is_beneficial?: boolean
  series?: number
}
