<template>
  <div class="modal fade" tabindex="-1" ref="modalElement">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ props.titleText }}</h2>
          <button type="button" class="btn-close" @click="() => tryHide()"></button>
        </div>
        <div class="modal-body">
          <FormComponent
            :fields="props.fields"
            :item-prototype="props.itemPrototype"
            :is-loading="props.isLoading"
            :read-only="props.readOnly"
            :error-text="props.errorText"
            ref="form"
            @submitted="(item) => emit('submitted', item)"
          />
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" :disabled="props.isLoading" @click="() => tryHide()">
            {{ props.cancelText }}
          </button>
          <button
            class="btn btn-primary"
            :disabled="props.isLoading"
            v-if="!props.readOnly"
            @click="() => form?.submit()"
          >
            <div class="spinner-border spinner-border-sm me-2" v-if="props.isLoading"></div>
            <span class="mx-auto">{{ props.submitText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import FormComponent, { type FormField, type FormItem } from './FormComponent.vue'

export interface Props {
  fields: Array<FormField>
  itemPrototype: FormItem
  isLoading?: boolean
  readOnly?: boolean
  titleText: string
  submitText: string
  cancelText: string
  errorText?: string
}

const props = withDefaults(defineProps<Props>(), { readOnly: false, isLoading: false })
const emit = defineEmits(['submitted'])

const modalElement = ref<Element | null>(null)
const form = ref<InstanceType<typeof FormComponent> | null>(null)
const modal = ref<Modal | null>(null)

function tryHide() {
  if (!props.isLoading) {
    hide()
  }
}

function show() {
  form.value?.clear()
  modal.value?.show()
}

function hide() {
  modal.value?.hide()
}

defineExpose({ show, hide })

onMounted(() => {
  if (modalElement.value === null) {
    return
  }

  modal.value = new Modal(modalElement.value, { keyboard: false, backdrop: 'static' })
})
</script>
