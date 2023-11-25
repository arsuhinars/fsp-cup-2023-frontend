<template>
  <RouterView v-if="!isLoading" />
</template>

<style></style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { pushErrorPage } from './utils'

const auth = useAuthStore()

const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true

  try {
    await auth.updateUser()
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
})
</script>
