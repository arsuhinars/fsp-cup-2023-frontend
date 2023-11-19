<template>
  <div class="modal fade" tabindex="-1" ref="modalElement">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <form ref="form" @submit="submit">
            <slot name="body"></slot>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="submit">{{ props.submitText }}</button>
          <button class="btn btn-secondary" @click="hide">{{ props.cancelText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  submitText: string
  cancelText: string
}>()

const emit = defineEmits(['canceled', 'submited'])

const form = ref<HTMLFormElement | null>(null)
const modalElement = ref<Element | null>(null)
const modal = ref<Modal | null>(null)

function show() {
  form.value?.classList.remove('was-validated')
  modal.value?.show()
}

function hide() {
  modal.value?.hide()
  emit('canceled')
}

defineExpose({ show, hide })

function submit() {
  if (form.value === null) {
    return
  }

  if (form.value.checkValidity()) {
    modal.value?.hide()
    emit('submited')
  }

  form.value.classList.add('was-validated')
}

onMounted(() => {
  if (modalElement.value === null) {
    return
  }

  modal.value = new Modal(modalElement.value)

  modalElement.value.addEventListener('hidePrevented.bs.modal', () => {
    emit('canceled')
  })
})
</script>
