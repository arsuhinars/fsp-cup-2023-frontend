<template>
  <h2>Пользователь</h2>
  <UserUpdateForm
    class="mt-3"
    :user="user"
    :is-loading="isLoading"
    :extra-error-text="errorText"
    @submitted="submitHandler"
  />
</template>

<script setup lang="ts">
import { getUserById, updateUserById } from '@/api/users'
import { ApiError } from '@/api/utils'
import UserUpdateForm from '@/components/forms/UpdateUserForm.vue'
import { UserRole, type User, type UpdateUser } from '@/schemas/users'
import { pushErrorPage } from '@/utils'
import { ref, watchEffect } from 'vue'

export interface Props {
  id: number
}

const props = defineProps<Props>()

const isLoading = ref<boolean>(false)
const errorText = ref<string | undefined>(undefined)
const user = ref<User>({
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
})

async function submitHandler(updateUser: UpdateUser) {
  isLoading.value = true
  errorText.value = undefined

  try {
    user.value = await updateUserById(props.id, updateUser)
  } catch (error) {
    if (error instanceof ApiError && error.statusCode == 409) {
      errorText.value = 'Пользователь с данной почтой уже существует'
    } else {
      pushErrorPage(error)
    }
  } finally {
    isLoading.value = false
  }
}

watchEffect(async () => {
  isLoading.value = true

  try {
    user.value = await getUserById(props.id)
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
})
</script>
