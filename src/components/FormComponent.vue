<template>
  <form novalidate ref="form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  readOnly: boolean
}

const props = withDefaults(defineProps<Props>(), { readOnly: false })

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

  if (props.readOnly) {
    let inputs = form.value.querySelectorAll('input')
    let selects = form.value.querySelectorAll('select')
    let submits = form.value.querySelectorAll('button[type=submit], input[type=submit]')

    for (let input of inputs) {
      input.readOnly = true
    }

    for (let select of selects) {
      select.disabled = true
    }

    for (let submit of submits) {
      if (submit instanceof HTMLButtonElement || submit instanceof HTMLInputElement) {
        submit.disabled = true
      }
    }
  }
})
</script>
