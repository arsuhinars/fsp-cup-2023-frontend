import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type User } from '@/schemas/user'

export const useAuthStore = defineStore('auth', () => {
  const _credentials = ref<string | null>(null)
  const _user = ref<User | null>(null)

  const credentials = computed(() => _credentials)
  const user = computed(() => _user)
  const isAuthorized = computed(() => _user.value !== null)

  async function tryLogin(login: string, password: string): Promise<boolean> {
    _credentials.value = btoa(`${login}:${password}`)
    _user.value = {}
    return true
  }

  async function logout() {
    _credentials.value = null
    _user.value = null
  }

  return { credentials, user, isAuthorized, tryLogin, logout }
})
