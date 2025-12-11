import { UpdateUserRequest, User } from '@/shared/types/auth.types'
import { apiFetch } from './client'

export const getUser = async (): Promise<User> => apiFetch<User>('/user/me')

export const updateUser = async (
  data: UpdateUserRequest,
): Promise<{ message: string }> => {
  return apiFetch('/user/me', {
    method: 'PATCH',
    data,
  })
}
