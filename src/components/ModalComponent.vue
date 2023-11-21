<template>
  <div class="modal fade" tabindex="-1" ref="modalElement">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ props.titleText }}</h2>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="button.classList"
            v-for="button in props.buttons"
            :key="button.name"
            @click="
              () => {
                emit('submitted', button.name)
                modal?.hide()
              }
            "
          >
            {{ button.displayText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

export interface ModalButton {
  name: string
  displayText: string
  classList: string
}

const props = defineProps<{
  titleText: string
  buttons: ModalButton[]
  cancelButtonName?: string
}>()

const emit = defineEmits(['submitted'])

const modalElement = ref<Element | null>(null)
const modal = ref<Modal | null>(null)

function show() {
  modal.value?.show()
}

function hide() {
  modal.value?.hide()
  emit('submitted', props.cancelButtonName)
}

defineExpose({ show, hide })

onMounted(() => {
  if (modalElement.value === null) {
    return
  }

  modal.value = new Modal(modalElement.value, {
    backdrop: props.cancelButtonName != null ? true : 'static'
  })

  modalElement.value.addEventListener('hidePrevented.bs.modal', () => {
    emit('submitted', props.cancelButtonName)
  })
})
</script>
