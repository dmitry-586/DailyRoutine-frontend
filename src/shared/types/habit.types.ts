export interface HabitHistoryEntry {
  date: string
  value: number
  completed: boolean
}

export interface Habit {
  id: string
  title: string
  type: 'good' | 'bad'
  format: 'time' | 'count' | 'binary'
  current: number
  target: number
  unit?: string
  streak: number
  completed?: boolean
  isActive?: boolean
  history?: HabitHistoryEntry[]
}
