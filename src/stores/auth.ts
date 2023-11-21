import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type User } from '@/schemas/users'
import router from '@/router'
import { getCurrentUser } from '@/api/users'
import { ApiError } from '@/api/utils'
import { pushErrorPage } from '@/utils'

export const useAuthStore = defineStore('auth', () => {
  const _credentials = ref<string | null>(null)
  const _password = ref<string | null>(null)
  const _user = ref<User | null>(null)

  const credentials = computed(() => _credentials.value)
  const user = computed(() => _user.value)
  const password = computed(() => _password.value)
  const isAuthorized = computed(() => _user.value !== null)

  async function tryLogin(login: string, password: string): Promise<boolean> {
    try {
      _credentials.value = btoa(`${login}:${password}`)
      _password.value = password
      _user.value = await getCurrentUser()
      return true
    } catch (error) {
      _credentials.value = null
      _password.value = null
      _user.value = null
      if (error instanceof ApiError && error.statusCode == 401) {
        return false
      }
      throw error
    }
  }

  async function logout() {
    _credentials.value = null
    _user.value = null
    router.push({ name: 'login' })
  }

  async function updateUser() {
    if (!isAuthorized.value) {
      return
    }

    try {
      _user.value = await getCurrentUser()
    } catch (error) {
      pushErrorPage(error)
    }
  }

  return { credentials, password, user, isAuthorized, tryLogin, logout, updateUser }
})
