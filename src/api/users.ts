import type { CreateUser, UpdateUser, User, UserRole } from '@/schemas/users'
import { apiDelete, apiGet, apiPost, apiPut } from './utils'

export async function getCurrentUser(): Promise<User> {
  const result = await apiGet(`/users/current`, {})
  return result as User
}

export async function getUserById(id: number): Promise<User> {
  const result = await apiGet(`/users/${id}`, {})
  return result as User
}

export async function updateCurrentUser(updateUser: UpdateUser): Promise<User> {
  const result = await apiPut(`/users/current`, updateUser, {})
  return result as User
}

export async function updateUserById(id: number, updateUser: UpdateUser): Promise<User> {
  const result = await apiPut(`/users/${id}`, updateUser, {})
  return result as User
}

export async function updateCurrentUserPassword(new_password: string): Promise<void> {
  await apiPut(`/users/current/password`, { new_password }, {})
}

export async function getAllUsers(userRole: UserRole | null): Promise<User[]> {
  const result = await apiGet(`/users`, { role: userRole ?? undefined })
  return result as User[]
}

export async function createUser(user: CreateUser): Promise<User> {
  const result = await apiPost(`/users`, user, {})
  return result as User
}

export async function deleteUserById(id: number) {
  await apiDelete(`/users/${id}`, {})
}
