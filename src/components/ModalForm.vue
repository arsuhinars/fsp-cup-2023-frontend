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
          <button class="btn btn-primary" @click="submit" ref="submitButton">
            {{ props.submitText }}
          </button>
          <button class="btn btn-secondary" @click="hide" ref="cancelButton">
            {{ props.cancelText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { Modal } from 'bootstrap'

export interface Props {
  readOnly: boolean
  isLoading: boolean
  submitText: string
  cancelText: string
}

const props = withDefaults(defineProps<Props>(), { readOnly: false, isLoading: false })

const emit = defineEmits(['canceled', 'submited'])

const form = ref<HTMLFormElement | null>(null)
const modalElement = ref<Element | null>(null)
const modal = ref<Modal | null>(null)
const submitButton = ref<HTMLButtonElement | null>(null)
const cancelButton = ref<HTMLButtonElement | null>(null)
let inputs = new Array<HTMLInputElement>(0)
let selects = new Array<HTMLSelectElement>(0)

function show() {
  modal.value?.show()
}

function hide() {
  modal.value?.hide()
  emit('canceled')
}

function clear() {
  if (form.value === null) {
    return
  }

  form.value.classList.remove('was-validated')

  for (let input of inputs) {
    input.value = ''
  }

  for (let select of selects) {
    select.value = ''
  }
}

defineExpose({ show, hide, clear })

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

watchEffect(() => {
  if (submitButton.value === null) {
    return
  }

  submitButton.value.disabled = props.isLoading || props.readOnly

  for (let input of inputs) {
    input.readOnly = props.readOnly
    input.disabled = props.isLoading
  }

  for (let select of selects) {
    select.disabled = props.isLoading || props.readOnly
  }
})

onMounted(() => {
  if (modalElement.value === null || form.value === null) {
    return
  }

  inputs = Array.from(form.value.querySelectorAll('input'))
  selects = Array.from(form.value.querySelectorAll('select'))

  modal.value = new Modal(modalElement.value)

  modalElement.value.addEventListener('hidePrevented.bs.modal', () => {
    emit('canceled')
  })
})
</script>
