import type { CreateUser, UpdateUser, User, UserRole } from '@/schemas/users'
import { apiDelete, apiGet, apiPost, apiPut } from './utils'

export async function getCurrentUser() {
  return (await apiGet(`/users/current`)) as User
}

export async function getUserById(id: number) {
  return (await apiGet(`/users/${id}`)) as User
}

export async function updateCurrentUser(updateUser: UpdateUser) {
  return (await apiPut(`/users/current`, updateUser)) as User
}

export async function updateUserById(id: number, updateUser: UpdateUser) {
  return (await apiPut(`/users/${id}`, updateUser)) as User
}

export async function updateCurrentUserPassword(new_password: string) {
  await apiPut(`/users/current/password`, { new_password })
}

export async function getAllUsers(userRole: UserRole | null) {
  return (await apiGet(`/users`, { role: userRole ?? undefined })) as User[]
}

export async function createUser(user: CreateUser) {
  return (await apiPost(`/users`, user)) as User
}

export async function deleteUserById(id: number) {
  await apiDelete(`/users/${id}`)
}
