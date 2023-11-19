<template>
  <form novalidate ref="form">
    <slot></slot>

    <button
      type="submit"
      class="btn btn-primary mt-3 d-flex align-items-center"
      v-if="submitText !== undefined"
    >
      <div class="spinner-border spinner-border-sm me-2" v-if="props.isLoading"></div>
      {{ props.submitText }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'

interface Props {
  readOnly: boolean
  submitText?: string
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), { readOnly: false, isLoading: false })

const form = ref<HTMLFormElement | null>(null)

defineExpose({
  isValid: () => form.value?.checkValidity() ?? false,
  invalidate: () => form.value?.classList.remove('was-validated')
})

onMounted(() => {
  form.value?.addEventListener('submit', (event) => {
    if (!form.value?.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.value?.classList.add('was-validated')
  })
})

watchEffect(() => {
  if (form.value === null) {
    return
  }

  for (let input of form.value.querySelectorAll('input')) {
    input.readOnly = props.readOnly
    input.disabled = props.isLoading
  }

  for (let select of form.value.querySelectorAll('select')) {
    select.disabled = props.readOnly || props.isLoading
  }

  for (let submit of form.value.querySelectorAll('button[type=submit], input[type=submit]')) {
    if (submit instanceof HTMLButtonElement || submit instanceof HTMLInputElement) {
      submit.disabled = props.readOnly || props.isLoading
    }
  }
})
</script>
