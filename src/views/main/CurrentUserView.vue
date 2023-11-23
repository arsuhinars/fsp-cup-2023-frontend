<template>
  <div>
    <h2>Мой профиль</h2>
    <div class="current-user-view__container">
      <div class="current-user-view__form border me-4">
        <h3>Личная информация</h3>
        <UpdateUserForm
          class="mt-3"
          :user="auth.user ?? emptyUser"
          :is-loading="isLoading"
          :extra-error-text="userFormError"
          @submitted="userSubmittedHandler"
        />
      </div>
      <div class="current-user-view__form border">
        <h3>Смена пароля</h3>
        <UpdateUserPasswordForm
          class="mt-3"
          :is-loading="isLoading"
          @submitted="passwordSubmittedHandler"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';

.current-user-view__container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.current-user-view__form {
  flex-grow: 1;
  flex-shrink: 0;
  border-radius: $border-radius-lg;
  padding: $spacer * 2;
  border-width: $border-width;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import UpdateUserForm from '@/components/forms/UpdateUserForm.vue'
import UpdateUserPasswordForm from '@/components/forms/UpdateUserPasswordForm.vue'
import { UserRole, type User, type UpdateUser } from '@/schemas/users'
import { updateCurrentUser, updateCurrentUserPassword } from '@/api/users'
import { useAuthStore } from '@/stores/auth'
import { pushErrorPage } from '@/utils'
import { ApiError } from '@/api/utils'

const auth = useAuthStore()

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
const isLoading = ref<boolean>(false)
const userFormError = ref<string | undefined>(undefined)

async function userSubmittedHandler(updateUser: UpdateUser) {
  isLoading.value = true
  userFormError.value = undefined

  try {
    await updateCurrentUser(updateUser)
    await auth.updateUser()
  } catch (error) {
    if (error instanceof ApiError && error.statusCode == 409) {
      userFormError.value = 'Пользователь с данной почтой уже существует'
    } else {
      pushErrorPage(error)
    }
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
