<template>
  <div>
    <h2>Создать нового пользователя</h2>
    <CreateUserForm
      class="mt-3"
      :is-loading="isLoading"
      :extra-error-text="errorText"
      @submitted="formSubmitHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateUserForm from '@/components/forms/CreateUserForm.vue'
import type { CreateUser } from '@/schemas/users'
import { createUser } from '@/api/users'
import { useRouter } from 'vue-router'
import { ApiError } from '@/api/utils'

const router = useRouter()

const isLoading = ref<boolean>(false)
const errorText = ref<string | undefined>(undefined)

async function formSubmitHandler(userSchema: CreateUser) {
  isLoading.value = true
  errorText.value = undefined

  try {
    const user = await createUser(userSchema)
    router.push({
      name: 'user',
      params: { id: user.id }
    })
  } catch (error) {
    if (error instanceof ApiError && error.statusCode == 409) {
      errorText.value = 'Аккаунт с данной почтой уже существует'
    } else {
      errorText.value = 'Произошла непредвиденная ошибка. Попробуйте еще раз через некоторое время.'
      throw error
    }
  } finally {
    isLoading.value = false
  }
}
</script>
