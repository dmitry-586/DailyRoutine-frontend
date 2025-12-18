import { apiFetch } from './client'

export type SprintType = 'all_habits' | 'new_habit'

export interface Sprint {
  id: number
  title: string
  description: string
  type: SprintType
  target_days: number
  coins_reward: number
  is_active: boolean
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
