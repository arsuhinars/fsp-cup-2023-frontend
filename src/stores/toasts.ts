import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export interface ToastMessage {
  title: string
  text: string
}

// export const useToastsStore = defineStore('toasts', () => {
//   const _toasts = reactive<ToastMessage[]>([])

//   const toasts = computed(() => _toasts)

//   function showToast(message: ToastMessage) {
//     _toasts.p
//   }

//   function hideToast()
// })
