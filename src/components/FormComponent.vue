<template>
  <form novalidate ref="form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const form = ref<HTMLFormElement | null>(null)

defineExpose({
  isValid: () => form.value?.checkValidity() ?? false,
  invalidate: () => form.value?.classList.remove('was-validated')
})

onMounted(() => {
  if (form.value === null) {
    return
  }

  form.value.addEventListener('submit', (event) => {
    if (!form.value?.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.value?.classList.add('was-validated')
  })
})
</script>
