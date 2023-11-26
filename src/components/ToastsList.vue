<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div class="toast" v-for="toast in toastsStore.toasts" :key="toast._id">
      <div class="toast-header">
        <i class="bi bi-emoji-tear-fill"></i>
        <strong class="me-auto">{{ toast.title }}</strong>
        <button type="button" class="btn-close"></button>
      </div>
      <div class="toast-body">{{ toast.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastsStore } from '@/stores/toasts'
import { ref } from 'vue'

const toastsStore = useToastsStore()

const toasts = ref()
</script>
