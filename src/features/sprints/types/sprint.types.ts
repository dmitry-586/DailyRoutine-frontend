export interface SprintWithProgress {
  id: number
  title: string
  reward: number
  progress: number
  total: number
  isCompleted: boolean
}

export type SprintTab = 'active' | 'available'
