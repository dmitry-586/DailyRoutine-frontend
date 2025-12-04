import type {
  CreateHabitRequest,
  Habit,
  UpdateHabitRequest,
} from '@/shared/types/habit.types'
import { apiFetch } from './client'

export async function getHabits(): Promise<Habit[]> {
  return await apiFetch<Habit[]>('/habits')
}

export async function getHabit(id: number): Promise<Habit> {
  return await apiFetch<Habit>(`/habits/${id}`)
}

export async function createHabit(data: CreateHabitRequest): Promise<Habit> {
  return await apiFetch<Habit>('/habits', {
    method: 'POST',
    data,
  })
}

export async function updateHabit(
  id: number,
  data: UpdateHabitRequest,
): Promise<Habit> {
  return await apiFetch<Habit>(`/habits/${id}`, {
    method: 'PUT',
    data,
  })
}

export async function deleteHabit(id: number): Promise<void> {
  await apiFetch(`/habits/${id}`, {
    method: 'DELETE',
  })
}
