import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export interface ToastMessage {
  _id?: number
  title: string
  text: string
  iconClass?: string
}

export const useToastsStore = defineStore('toasts', () => {
  const _toasts = reactive<ToastMessage[]>([])
  const idCounter = ref<number>(1)

  const toasts = computed(() => _toasts)

  function showToast(message: ToastMessage) {
    _toasts.push(Object.assign(message, { _id: idCounter.value++ }))
  }

  function hideToast(message: ToastMessage) {
    const idx = _toasts.indexOf(message)
    _toasts.splice(idx, 1)
  }

  return { showToast, hideToast, toasts }
})
