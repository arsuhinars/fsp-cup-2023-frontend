<template>
  <h2>Пользователь</h2>
  <UserUpdateForm
    class="mt-3"
    :user="user"
    :is-loading="isLoading"
    :include-password-form="false"
    @submitted-user="submitHandler"
  />
</template>

<script setup lang="ts">
import { getUserById, updateUserById } from '@/api/users'
import UserUpdateForm from '@/components/forms/UserUpdateForm.vue'
import { UserRole, type User, type UpdateUser } from '@/schemas/users'
import { pushErrorPage } from '@/utils'
import { ref, watchEffect } from 'vue'

export interface Props {
  id: number
}

const props = defineProps<Props>()

const isLoading = ref<boolean>(false)
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

  try {
    user.value = await updateUserById(props.id, updateUser)
  } catch (error) {
    pushErrorPage(error)
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
