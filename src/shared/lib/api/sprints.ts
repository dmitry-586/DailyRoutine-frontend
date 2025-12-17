import { apiFetch } from './client'

export type SprintType = 'habit_series' | 'all_habits' | 'habit_increase'

export interface Sprint {
  id: number
  title: string
  description: string
  type: SprintType
  target_days: number
  coins_reward: number
  is_active: boolean
  habit_id?: number | null
  min_series?: number | null
  percent_increase?: number | null
  created_at: string
  updated_at: string
}

export interface UserSprintProgress {
  id: number
  user_id: number
  sprint_id: number
  current_days: number
  is_completed: boolean
  completed_at?: string | null
  created_at: string
  updated_at: string
}

export async function getSprints(): Promise<Sprint[]> {
  return apiFetch<Sprint[]>('/sprints')
}

export async function getSprintProgress(): Promise<UserSprintProgress[]> {
  return apiFetch<UserSprintProgress[]>('/sprints/progress')
}
