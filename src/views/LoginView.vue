<template>
  <main>
    <div class="centered-container">
      <h2 class="mb-4">Авторизация</h2>

      <FormComponent
        class="text-start"
        :fields="formFields"
        :item-prototype="loginFormPrototype"
        submit-text="Войти"
        submit-class="w-100"
        :error-text="errorText"
        error-class="text-center"
        :is-loading="isLoading"
        @submitted="formSubmitted"
        ref="form"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FormComponent, { type FormField } from '@/components/FormComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

interface LoginForm {
  email: string
  password: string
}

const formFields: FormField[] = [
  {
    inputType: 'email',
    name: 'email',
    displayName: 'Адрес электронной почты'
  },
  {
    inputType: 'password',
    name: 'password',
    displayName: 'Пароль',
    pattern: '^[ -9;-~]*$'
  }
]
const loginFormPrototype: LoginForm = {
  email: '',
  password: ''
}

const form = ref<InstanceType<typeof FormComponent> | null>(null)
const isLoading = ref<boolean>(false)
const errorText = ref<string | undefined>(undefined)

async function formSubmitted(loginForm: LoginForm) {
  if (form.value === null) {
    return
  }

  errorText.value = undefined
  isLoading.value = true

  let result: boolean
  try {
    result = await auth.tryLogin(loginForm.email, loginForm.password)
  } catch (error) {
    console.log(error)
    errorText.value = 'Произошла непредвиденная ошибка. Попробуйте еще раз через некоторое время.'
    return
  } finally {
    isLoading.value = false
  }

  if (result) {
    router.push({ name: 'main' })
  } else {
    errorText.value = 'Неверный логин или пароль'
  }
}

onMounted(() => {
  if (auth.isAuthorized) {
    router.replace({ name: 'main' })
  }
})
</script>
