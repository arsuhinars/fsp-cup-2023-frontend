<template>
  <main>
    <div class="centered-container">
      <h2 class="mb-4">Произошла ошибка!</h2>

      <p>Попробуйте вернуться через некоторое время</p>
      <p
        class="font-monospace text-start bg-dark text-light p-2 rounded"
        v-if="errorDetails.length > 0"
      >
        {{ errorDetails }}
      </p>

      <RouterLink :to="{ name: 'main' }" class="btn btn-primary mt-3">
        Вернуться на главную
      </RouterLink>
    </div>
  </main>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const errorDetails = ref<string>('')

watchEffect(() => {
  const currRoute = router.currentRoute.value
  if (typeof currRoute.params.details !== 'string') {
    errorDetails.value = ''
  } else {
    errorDetails.value = currRoute.params.details
  }
})
</script>
