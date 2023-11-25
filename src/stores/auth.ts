import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { type User } from '@/schemas/users'
import router from '@/router'
import { getCurrentUser } from '@/api/users'
import { ApiError } from '@/api/utils'
import { pushErrorPage } from '@/utils'

const AUTH_CREDENTIALS_KEY = 'authCredentials'

export const useAuthStore = defineStore('auth', () => {
  const _credentials = ref<string | null>(localStorage.getItem(AUTH_CREDENTIALS_KEY))
  const _user = ref<User | null>(null)

  const credentials = computed(() => _credentials.value)
  const user = computed(() => _user.value)
  const password = computed(() =>
    _credentials.value === null ? null : atob(_credentials.value).split(':')[1]
  )
  const isAuthorized = computed(() => _user.value !== null)

  async function tryLogin(login: string, password: string): Promise<boolean> {
    try {
      _credentials.value = btoa(`${login}:${password}`)
      _user.value = await getCurrentUser()
      return true
    } catch (error) {
      _credentials.value = null
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
    if (_credentials.value === null) {
      return
    }

    try {
      _user.value = await getCurrentUser()
    } catch (error) {
      if (error instanceof ApiError && error.statusCode == 401) {
        _credentials.value = null
      } else {
        pushErrorPage(error)
      }
    }
  }

  watch(_credentials, () => {
    if (_credentials.value === null) {
      localStorage.removeItem(AUTH_CREDENTIALS_KEY)
    } else {
      localStorage.setItem(AUTH_CREDENTIALS_KEY, _credentials.value)
    }
  })

  return { credentials, password, user, isAuthorized, tryLogin, logout, updateUser }
})
