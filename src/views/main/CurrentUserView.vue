<template>
  <div>
    <h2>Мой профиль</h2>
    <UserUpdateForm
      class="mt-3"
      :user="auth.user ?? emptyUser"
      :is-loading="isLoading"
      @submitted-user="userSubmittedHandler"
      @submitted-password="passwordSubmittedHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserUpdateForm from '@/components/forms/UserUpdateForm.vue'
import { UserRole, type User, type UpdateUser } from '@/schemas/users'
import { updateCurrentUser, updateCurrentUserPassword } from '@/api/users'
import { useAuthStore } from '@/stores/auth'
import { pushErrorPage } from '@/utils'

const emptyUser: User = {
  id: 0,
  last_name: '',
  first_name: '',
  patronymic: '',
  birth_date: '',
  country: '',
  city: '',
  phone: '',
  email: '',
  role: UserRole.Admin,
  judge_rank: null
}

const auth = useAuthStore()

const isLoading = ref<boolean>(false)

async function userSubmittedHandler(updateUser: UpdateUser) {
  isLoading.value = true

  try {
    await updateCurrentUser(updateUser)
    await auth.updateUser()
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
}

async function passwordSubmittedHandler(newPassword: string) {
  isLoading.value = true

  try {
    await updateCurrentUserPassword(newPassword)
    await auth.tryLogin(auth.user?.email ?? '', newPassword)
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
}
</script>
