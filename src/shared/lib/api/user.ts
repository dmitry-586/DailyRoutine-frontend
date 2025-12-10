import { User } from '@/shared/types/auth.types'
import { apiFetch } from './client'

export interface UpdateUserRequest {
  username?: string
  photo_url?: string
}

export async function getUser(): Promise<User> {
  return apiFetch<User>('/user/me')
}

export async function updateUser(data: UpdateUserRequest): Promise<User> {
  return apiFetch<User>('/user/me', {
    method: 'PATCH',
    data,
  })
}
