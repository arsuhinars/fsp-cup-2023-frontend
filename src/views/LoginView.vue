<template>
  <main>
    <div class="centered-container">
      <h2 class="mb-4">Авторизация</h2>

      <FormComponent @submit="submitHandler" ref="form">
        <div class="mb-4 mt-4">
          <input
            id="login"
            class="form-control"
            type="text"
            placeholder="Логин"
            required
            ref="loginInput"
          />
          <div class="invalid-feedback">Необходимое поле</div>
        </div>

        <div class="mb-4">
          <input
            id="login"
            class="form-control"
            type="password"
            placeholder="Пароль"
            required
            ref="passwordInput"
          />
          <div class="invalid-feedback">Необходимое поле</div>
        </div>

        <div class="form-text text-danger" v-if="errorMessage !== null">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary mt-2 mb-3 w-100">Войти</button>
      </FormComponent>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FormComponent from '@/components/FormComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const form = ref<InstanceType<typeof FormComponent> | null>(null)
const loginInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)
const errorMessage = ref<string | null>(null)

async function submitHandler(event: SubmitEvent) {
  event.preventDefault()

  errorMessage.value = null

  if (loginInput.value === null || passwordInput.value === null || !form.value?.isValid()) {
    return
  }

  let loginResult = await auth.tryLogin(loginInput.value.value, passwordInput.value.value)
  if (loginResult) {
    router.push({ name: 'main' })
  } else {
    form.value.invalidate()
    errorMessage.value = 'Неправильный логин или пароль'
  }
}

onMounted(() => {
  if (auth.isAuthorized) {
    router.replace({ name: 'main' })
  }
})
</script>
